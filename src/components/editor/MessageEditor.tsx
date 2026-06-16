"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import {
  EMPTY_CHAT_MESSAGES,
  EMPTY_PARTICIPANTS,
  useGeneratorStore,
} from "@/stores/generator-store";
import { Button } from "@/components/ui/button";
import { FormField, FormSection, ItemCard } from "@/components/ui/form";
import { Input, Select, Textarea } from "@/components/ui/input";

export function MessageEditor() {
  const messages = useGeneratorStore((s) =>
    s.data?.category === "chat" || s.data?.category === "ai"
      ? s.data.state.messages
      : EMPTY_CHAT_MESSAGES,
  );
  const participants = useGeneratorStore((s) =>
    s.data?.category === "chat" || s.data?.category === "ai"
      ? s.data.state.participants
      : EMPTY_PARTICIPANTS,
  );
  const addMessage = useGeneratorStore((s) => s.addMessage);
  const updateMessage = useGeneratorStore((s) => s.updateMessage);
  const removeMessage = useGeneratorStore((s) => s.removeMessage);
  const reorderMessages = useGeneratorStore((s) => s.reorderMessages);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = messages.findIndex((m) => m.id === active.id);
      const newIndex = messages.findIndex((m) => m.id === over.id);
      reorderMessages(oldIndex, newIndex);
    }
  };

  return (
    <FormSection
      title="Messages"
      description="Build the conversation. Drag to reorder."
      action={
        <Button variant="ghost" size="sm" onClick={addMessage}>
          <Plus size={14} />
          Add message
        </Button>
      }
    >
      {messages.length === 0 ? (
        <p className="rounded-lg border border-dashed border-zinc-200 px-4 py-8 text-center text-sm text-zinc-500 dark:border-zinc-700">
          No messages yet. Add one to get started.
        </p>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={messages.map((m) => m.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {messages.map((msg) => (
                <SortableMessage
                  key={msg.id}
                  msg={msg}
                  participants={participants}
                  onUpdate={(updates) => updateMessage(msg.id, updates)}
                  onRemove={() => removeMessage(msg.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </FormSection>
  );
}

function SortableMessage({
  msg,
  participants,
  onUpdate,
  onRemove,
}: {
  msg: {
    id: string;
    senderId: string;
    text?: string;
    timestamp: string;
    status?: string;
  };
  participants: { id: string; name: string }[];
  onUpdate: (updates: Record<string, unknown>) => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: msg.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <ItemCard ref={setNodeRef} style={style} className="space-y-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="cursor-grab rounded-md p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 active:cursor-grabbing dark:hover:bg-zinc-800"
          aria-label="Drag to reorder"
        >
          <GripVertical size={16} />
        </button>

        <div className="flex-1">
          <FormField label="Sender">
            <Select
              value={msg.senderId}
              onChange={(e) => onUpdate({ senderId: e.target.value })}
            >
              {participants.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </Select>
          </FormField>
        </div>

        <Button
          variant="danger"
          size="icon"
          onClick={onRemove}
          aria-label="Remove message"
        >
          <Trash2 size={14} />
        </Button>
      </div>

      <FormField label="Message">
        <Textarea
          value={msg.text ?? ""}
          onChange={(e) => onUpdate({ text: e.target.value })}
          rows={2}
          placeholder="Type a message..."
        />
      </FormField>

      <div className="grid gap-3 sm:grid-cols-2">
        <FormField label="Timestamp">
          <Input
            type="text"
            value={msg.timestamp}
            onChange={(e) => onUpdate({ timestamp: e.target.value })}
            placeholder="9:41 AM"
          />
        </FormField>
        <FormField label="Status">
          <Select
            value={msg.status ?? "sent"}
            onChange={(e) => onUpdate({ status: e.target.value })}
          >
            <option value="sent">Sent</option>
            <option value="delivered">Delivered</option>
            <option value="read">Read</option>
          </Select>
        </FormField>
      </div>
    </ItemCard>
  );
}
