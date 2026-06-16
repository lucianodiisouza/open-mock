"use client";

import { forwardRef } from "react";
import type { PlatformConfig } from "@/lib/platform-registry";
import { getTheme } from "@/lib/platform-themes";
import { useGeneratorStore } from "@/stores/generator-store";
import { BubbleChatPreview } from "./templates/BubbleChatPreview";
import { IMessagePreview } from "./templates/IMessagePreview";
import { SlackPreview } from "./templates/SlackPreview";
import { DatingPreview } from "./templates/DatingPreview";
import { SocialDMPreview } from "./templates/SocialDMPreview";
import { TwitterPreview } from "./templates/TwitterPreview";
import { AIChatPreview } from "./templates/AIChatPreview";
import { LinkedInChatPreview } from "./templates/LinkedInChatPreview";
import { RedditChatPreview } from "./templates/RedditChatPreview";
import { PostPreview } from "./templates/PostPreview";
import { FacebookPostPreview } from "./templates/FacebookPostPreview";
import { LinkedInPostPreview } from "./templates/LinkedInPostPreview";
import { CommentListPreview } from "./templates/CommentListPreview";
import { StoryPreview } from "./templates/StoryPreview";
import { EmailPreview } from "./templates/EmailPreview";

interface PlatformPreviewProps {
  platform: PlatformConfig;
}

export const PlatformPreview = forwardRef<HTMLDivElement, PlatformPreviewProps>(
  function PlatformPreview({ platform }, ref) {
    const data = useGeneratorStore((s) => s.data);
    const theme = getTheme(platform.themeSlug);
    const slug = platform.themeSlug;

    if (!data) return null;

    const renderPreview = () => {
      switch (platform.template) {
        case "bubble-chat":
          if (data.category === "chat" || data.category === "ai")
            return <BubbleChatPreview state={data.state} theme={theme} platformSlug={slug} />;
          break;
        case "imessage":
          if (data.category === "chat" || data.category === "ai")
            return <IMessagePreview state={data.state} theme={theme} platformSlug={slug} />;
          break;
        case "slack":
          if (data.category === "chat" || data.category === "ai")
            return <SlackPreview state={data.state} theme={theme} platformSlug={slug} />;
          break;
        case "dating":
          if (data.category === "chat" || data.category === "ai")
            return <DatingPreview state={data.state} theme={theme} platformSlug={slug} />;
          break;
        case "social-dm":
          if (data.category === "chat" || data.category === "ai")
            return <SocialDMPreview state={data.state} theme={theme} platformSlug={slug} />;
          break;
        case "twitter":
          if (data.category === "chat" || data.category === "ai")
            return <TwitterPreview state={data.state} theme={theme} platformSlug={slug} />;
          if (data.category === "post")
            return <PostPreview state={data.state} theme={theme} platformSlug={slug} />;
          break;
        case "ai-chat":
          if (data.category === "chat" || data.category === "ai")
            return <AIChatPreview state={data.state} theme={theme} platformSlug={slug} />;
          break;
        case "linkedin":
          if (data.category === "chat" || data.category === "ai")
            return <LinkedInChatPreview state={data.state} theme={theme} platformSlug={slug} />;
          if (data.category === "post")
            return <LinkedInPostPreview state={data.state} theme={theme} platformSlug={slug} />;
          break;
        case "reddit-chat":
          if (data.category === "chat" || data.category === "ai")
            return <RedditChatPreview state={data.state} theme={theme} platformSlug={slug} />;
          break;
        case "facebook":
          if (data.category === "post")
            return <FacebookPostPreview state={data.state} theme={theme} platformSlug={slug} />;
          break;
        case "post":
          if (data.category === "post")
            return <PostPreview state={data.state} theme={theme} platformSlug={slug} />;
          break;
        case "comment":
          if (data.category === "comment")
            return <CommentListPreview state={data.state} theme={theme} platformSlug={slug} />;
          break;
        case "story":
          if (data.category === "story")
            return <StoryPreview state={data.state} theme={theme} platformSlug={slug} />;
          break;
        case "email":
          if (data.category === "email")
            return <EmailPreview state={data.state} theme={theme} platformSlug={slug} />;
          break;
      }
      return (
        <div className="flex h-[700px] w-[390px] items-center justify-center bg-zinc-100">
          Preview not available
        </div>
      );
    };

    return <div ref={ref}>{renderPreview()}</div>;
  },
);
