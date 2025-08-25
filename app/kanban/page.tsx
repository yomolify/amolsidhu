"use client";

import { useEffect, useMemo, useState } from "react";
import { Section } from "@/components/section";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";

type Card = { id: string; text: string };
type ColumnKey = "backlog" | "inprogress" | "done";
type Board = Record<ColumnKey, Card[]>;

const initialBoard: Board = {
  backlog: [
    { id: "c1", text: "Set up project visuals" },
    { id: "c2", text: "Hero + Navbar polish" },
  ],
  inprogress: [{ id: "c3", text: "Add Parallax page" }],
  done: [{ id: "c4", text: "Dark mode toggle" }],
};

function useLocalBoard() {
  const [board, setBoard] = useState<Board>(initialBoard);
  useEffect(() => {
    const raw = localStorage.getItem("kanban-board");
    if (raw) setBoard(JSON.parse(raw));
  }, []);
  useEffect(() => {
    localStorage.setItem("kanban-board", JSON.stringify(board));
  }, [board]);
  return [board, setBoard] as const;
}

function findColumnOf(board: Board, cardId: string): ColumnKey | null {
  for (const col of Object.keys(board) as ColumnKey[]) {
    if (board[col].some((c) => c.id === cardId)) return col;
  }
  return null;
}

function SortableCard({
  card,
  isOverlay = false,
}: {
  card: Card;
  isOverlay?: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id, data: { type: "card", cardId: card.id } });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const visibilityWhileDragging = isDragging ? "opacity-0" : "opacity-100";
  const overlayClasses = isOverlay
    ? "pointer-events-none z-[9999] shadow-glow"
    : "";

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`glass p-3 rounded-xl text-sm cursor-grab active:cursor-grabbing transition ${visibilityWhileDragging} ${overlayClasses}`}
    >
      {card.text}
    </div>
  );
}

function Column({
  title,
  id,
  items,
  onAdd,
}: {
  title: string;
  id: ColumnKey;
  items: Card[];
  onAdd: (id: ColumnKey, text: string) => void;
}) {
  const [text, setText] = useState("");
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: { type: "column", columnId: id },
  });

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">{title}</h3>

      <div
        ref={setNodeRef}
        className={[
          "space-y-3 min-h-[200px] rounded-2xl p-2",
          "relative z-0 overflow-visible",
          isOver
            ? "ring-2 ring-primary/40 bg-primary/5"
            : "ring-1 ring-border/50",
        ].join(" ")}
      >
        <SortableContext
          items={items.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.length > 0 ? (
            items.map((c) => <SortableCard key={c.id} card={c} />)
          ) : (
            <div className="grid h-24 place-content-center rounded-xl border border-dashed text-xs text-muted-foreground">
              Drop cards here
            </div>
          )}
        </SortableContext>
      </div>

      {/* Submit on Enter */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (text.trim()) {
            onAdd(id, text.trim());
            setText("");
          }
        }}
        className="flex gap-2"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add card..."
          className="flex-1 px-3 py-2 rounded-xl glass outline-none"
        />
        <button
          type="submit"
          className="px-3 py-2 rounded-xl btn-shimmer text-white"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default function KanbanPage() {
  const [board, setBoard] = useLocalBoard();
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  // ✅ Client-only gate to avoid hydration ID mismatches from @dnd-kit
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } })
  );

  const activeCard = useMemo(() => {
    if (!activeCardId) return null;
    const col = findColumnOf(board, activeCardId);
    if (!col) return null;
    return board[col].find((c) => c.id === activeCardId) ?? null;
  }, [activeCardId, board]);

  function handleDragStart(e: DragStartEvent) {
    const cardId = e.active?.data?.current?.cardId as string | undefined;
    if (cardId) setActiveCardId(cardId);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveCardId(null);
    if (!over) return;

    const activeId = active?.data?.current?.cardId as string | undefined;
    const overType = over?.data?.current?.type as "card" | "column" | undefined;
    if (!activeId || !overType) return;

    const fromCol = findColumnOf(board, activeId);
    if (!fromCol) return;

    let toCol: ColumnKey | null = null;
    let toIndex: number | null = null;

    if (!over?.data?.current) return;
    if (overType === "column") {
      toCol = over.data.current.columnId as ColumnKey;
      toIndex = board[toCol].length;
    } else if (overType === "card") {
      const overCardId = over.data.current.cardId as string;
      toCol = findColumnOf(board, overCardId);
      if (!toCol) return;
      toIndex = board[toCol].findIndex((c) => c.id === overCardId);
    }

    if (!toCol || toIndex === null) return;

    setBoard((prev) => {
      if (fromCol === toCol) {
        const list = prev[fromCol];
        const fromIndex = list.findIndex((c) => c.id === activeId);
        if (fromIndex === -1) return prev;
        return { ...prev, [fromCol]: arrayMove(list, fromIndex, toIndex) };
      }

      const fromList = [...prev[fromCol]];
      const toList = [...prev[toCol]];
      const fromIndex = fromList.findIndex((c) => c.id === activeId);
      if (fromIndex === -1) return prev;
      const [moved] = fromList.splice(fromIndex, 1);
      toList.splice(toIndex, 0, moved);
      return { ...prev, [fromCol]: fromList, [toCol]: toList };
    });
  }

  function handleAdd(col: ColumnKey, text: string) {
    const id = "c" + Math.random().toString(36).slice(2, 8);
    setBoard((prev) => ({ ...prev, [col]: [...prev[col], { id, text }] }));
  }

  return (
    <main className="pt-24" id="board">
      <Section
        title="Draggable Kanban"
        subtitle="Reorder and move cards between columns. Saved to localStorage."
      >
        {!mounted ? (
          // Skeleton renders on server AND before hydration, so markup matches and no warning
          <div className="grid md:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="glass p-4 rounded-2xl h-[260px] animate-pulse"
              />
            ))}
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-3 gap-6"
            >
              <div className="glass p-4 rounded-2xl">
                <Column
                  title="Backlog"
                  id="backlog"
                  items={board.backlog}
                  onAdd={handleAdd}
                />
              </div>
              <div className="glass p-4 rounded-2xl">
                <Column
                  title="In Progress"
                  id="inprogress"
                  items={board.inprogress}
                  onAdd={handleAdd}
                />
              </div>
              <div className="glass p-4 rounded-2xl">
                <Column
                  title="Done"
                  id="done"
                  items={board.done}
                  onAdd={handleAdd}
                />
              </div>
            </motion.div>

            <DragOverlay dropAnimation={null}>
              {activeCard ? <SortableCard card={activeCard} isOverlay /> : null}
            </DragOverlay>
          </DndContext>
        )}
      </Section>
    </main>
  );
}
