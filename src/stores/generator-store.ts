"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { StorySlide } from "@/lib/types/story";
import { createDefaultStorySlide, normalizeStorySlide } from "@/lib/utils/story-slide";
import type { GeneratorState } from "@/lib/types";
import type { ChatState } from "@/lib/types/chat";
import type { PostState } from "@/lib/types/post";
import type { CommentState } from "@/lib/types/comment";
import type { StoryState } from "@/lib/types/story";
import type { EmailState } from "@/lib/types/email";
import { getPlatform } from "@/lib/platform-registry";
import { createId } from "@/lib/utils/id";

/** Stable fallbacks for selectors — never use inline `[]` in useGeneratorStore. */
export const EMPTY_CHAT_MESSAGES: ChatState["messages"] = [];
export const EMPTY_PARTICIPANTS: ChatState["participants"] = [];
export const EMPTY_COMMENTS: CommentState["comments"] = [];
export const EMPTY_STORY_SLIDES: StoryState["slides"] = [];

interface GeneratorStore {
  slug: string;
  data: GeneratorState | null;
  init: (slug: string) => void;
  setData: (data: GeneratorState) => void;
  // Chat actions
  addMessage: () => void;
  updateMessage: (id: string, updates: Partial<ChatState["messages"][0]>) => void;
  removeMessage: (id: string) => void;
  reorderMessages: (from: number, to: number) => void;
  updateChatSettings: (settings: Partial<ChatState["settings"]>) => void;
  updateParticipants: (participants: ChatState["participants"]) => void;
  setChatMode: (mode: ChatState["mode"]) => void;
  // Post actions
  updatePost: (updates: Partial<PostState>) => void;
  // Comment actions
  addComment: () => void;
  updateComment: (id: string, updates: Partial<CommentState["comments"][0]>) => void;
  removeComment: (id: string) => void;
  updateCommentState: (updates: Partial<CommentState>) => void;
  // Story actions
  addSlide: () => void;
  updateSlide: (index: number, updates: Partial<StorySlide>) => void;
  removeSlide: (index: number) => void;
  updateStory: (updates: Partial<StoryState>) => void;
  // Email actions
  updateEmail: (updates: Partial<EmailState>) => void;
}

export const useGeneratorStore = create<GeneratorStore>()(
  persist(
    (set, get) => ({
      slug: "",
      data: null,

      init: (slug) => {
        const platform = getPlatform(slug);
        if (!platform) return;
        const stored = get().data;
        if (get().slug === slug && stored) return;
        set({ slug, data: platform.createDefaultState() });
      },

      setData: (data) => set({ data }),

      addMessage: () => {
        const { data } = get();
        if (!data || (data.category !== "chat" && data.category !== "ai")) return;
        const state = data.state;
        const newMsg = {
          id: createId(),
          senderId: state.participants[0]?.id ?? "user",
          type: "text" as const,
          text: "New message",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          status: "sent" as const,
        };
        set({
          data: {
            ...data,
            state: { ...state, messages: [...state.messages, newMsg] },
          },
        });
      },

      updateMessage: (id, updates) => {
        const { data } = get();
        if (!data || (data.category !== "chat" && data.category !== "ai")) return;
        const state = data.state;
        set({
          data: {
            ...data,
            state: {
              ...state,
              messages: state.messages.map((m) =>
                m.id === id ? { ...m, ...updates } : m,
              ),
            },
          },
        });
      },

      removeMessage: (id) => {
        const { data } = get();
        if (!data || (data.category !== "chat" && data.category !== "ai")) return;
        const state = data.state;
        set({
          data: {
            ...data,
            state: {
              ...state,
              messages: state.messages.filter((m) => m.id !== id),
            },
          },
        });
      },

      reorderMessages: (from, to) => {
        const { data } = get();
        if (!data || (data.category !== "chat" && data.category !== "ai")) return;
        const state = data.state;
        const messages = [...state.messages];
        const [removed] = messages.splice(from, 1);
        messages.splice(to, 0, removed);
        set({
          data: { ...data, state: { ...state, messages } },
        });
      },

      updateChatSettings: (settings) => {
        const { data } = get();
        if (!data || (data.category !== "chat" && data.category !== "ai")) return;
        set({
          data: {
            ...data,
            state: {
              ...data.state,
              settings: { ...data.state.settings, ...settings },
            },
          },
        });
      },

      updateParticipants: (participants) => {
        const { data } = get();
        if (!data || (data.category !== "chat" && data.category !== "ai")) return;
        set({
          data: { ...data, state: { ...data.state, participants } },
        });
      },

      setChatMode: (mode) => {
        const { data } = get();
        if (!data || (data.category !== "chat" && data.category !== "ai")) return;
        set({
          data: { ...data, state: { ...data.state, mode } },
        });
      },

      updatePost: (updates) => {
        const { data } = get();
        if (!data || data.category !== "post") return;
        set({
          data: { ...data, state: { ...data.state, ...updates } },
        });
      },

      addComment: () => {
        const { data } = get();
        if (!data || data.category !== "comment") return;
        const newComment = {
          id: createId(),
          author: "New User",
          avatar: "",
          text: "New comment",
          likes: 0,
          timestamp: "now",
        };
        set({
          data: {
            ...data,
            state: {
              ...data.state,
              comments: [...data.state.comments, newComment],
            },
          },
        });
      },

      updateComment: (id, updates) => {
        const { data } = get();
        if (!data || data.category !== "comment") return;
        set({
          data: {
            ...data,
            state: {
              ...data.state,
              comments: data.state.comments.map((c) =>
                c.id === id ? { ...c, ...updates } : c,
              ),
            },
          },
        });
      },

      removeComment: (id) => {
        const { data } = get();
        if (!data || data.category !== "comment") return;
        set({
          data: {
            ...data,
            state: {
              ...data.state,
              comments: data.state.comments.filter((c) => c.id !== id),
            },
          },
        });
      },

      updateCommentState: (updates) => {
        const { data } = get();
        if (!data || data.category !== "comment") return;
        set({
          data: { ...data, state: { ...data.state, ...updates } },
        });
      },

      addSlide: () => {
        const { data } = get();
        if (!data || data.category !== "story") return;
        set({
          data: {
            ...data,
            state: {
              ...data.state,
              slides: [
                ...data.state.slides,
                createDefaultStorySlide({ text: "New slide" }),
              ],
            },
          },
        });
      },

      updateSlide: (index, updates) => {
        const { data } = get();
        if (!data || data.category !== "story") return;
        const slides = [...data.state.slides];
        slides[index] = { ...normalizeStorySlide(slides[index]), ...updates };
        set({
          data: { ...data, state: { ...data.state, slides } },
        });
      },

      removeSlide: (index) => {
        const { data } = get();
        if (!data || data.category !== "story") return;
        set({
          data: {
            ...data,
            state: {
              ...data.state,
              slides: data.state.slides.filter((_, i) => i !== index),
            },
          },
        });
      },

      updateStory: (updates) => {
        const { data } = get();
        if (!data || data.category !== "story") return;
        set({
          data: { ...data, state: { ...data.state, ...updates } },
        });
      },

      updateEmail: (updates) => {
        const { data } = get();
        if (!data || data.category !== "email") return;
        set({
          data: { ...data, state: { ...data.state, ...updates } },
        });
      },
    }),
    {
      name: "open-mock-generator",
      partialize: (state) => ({ slug: state.slug, data: state.data }),
    },
  ),
);
