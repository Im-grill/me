import { useState } from "react";
import { Heart, MessageCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Comment } from "@/components/GalleryGrid";

export interface Post {
  id: string;
  author: { name: string; avatarUrl: string };
  createdAt: string;
  body: string;
  likes: number;
  comments: Comment[];
}

interface PostFeedProps {
  posts: Post[];
}

const INITIAL_COMMENT_COUNT = 2;

const PostFeed = ({ posts }: PostFeedProps) => {
  return (
    <div className="space-y-4 p-4 animate-fade-in">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

const PostCard = ({ post }: { post: Post }) => {
  const postLikeKey = `post-like:${post.id}`;
  const commentsLikeKey = `post-comment-like:${post.id}`;
  const [liked, setLiked] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(postLikeKey) === "1";
  });
  const [expanded, setExpanded] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>(
    () => {
      if (typeof window === "undefined") return {};
      try {
        return JSON.parse(localStorage.getItem(commentsLikeKey) || "{}");
      } catch {
        return {};
      }
    }
  );

  const likeCount = post.likes + (liked ? 1 : 0);
  const toggleLike = () =>
    setLiked((prev) => {
      const next = !prev;
      localStorage.setItem(postLikeKey, next ? "1" : "0");
      return next;
    });
  const toggleCommentLike = (cid: string) =>
    setLikedComments((prev) => {
      const next = { ...prev, [cid]: !prev[cid] };
      localStorage.setItem(commentsLikeKey, JSON.stringify(next));
      return next;
    });

  const visibleComments = expanded
    ? showAll
      ? post.comments
      : post.comments.slice(0, INITIAL_COMMENT_COUNT)
    : [];
  const hiddenCount = post.comments.length - INITIAL_COMMENT_COUNT;

  return (
    <article className="bg-card rounded-xl p-4 shadow-soft">
      <header className="flex items-center gap-2 mb-3">
        <img
          src={post.author.avatarUrl}
          alt={post.author.name}
          className="w-9 h-9 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold text-sm">{post.author.name}</div>
          <div className="text-xs text-muted-foreground">{post.createdAt}</div>
        </div>
      </header>

      <p className="text-sm whitespace-pre-wrap">{post.body}</p>

      <footer className="flex items-center gap-5 mt-3 text-sm">
        <button
          type="button"
          onClick={toggleLike}
          className={`flex items-center gap-1 transition-colors ${
            liked
              ? "text-red-500"
              : "text-muted-foreground hover:text-red-500"
          }`}
        >
          <Heart className={cn("h-4 w-4", liked && "fill-current")} />
          {likeCount}
        </button>
        <button
          type="button"
          onClick={() => {
            setExpanded((v) => !v);
            setShowAll(false);
          }}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          aria-expanded={expanded}
        >
          <MessageCircle className="h-4 w-4" />
          {post.comments.length}
          <ChevronDown
            className={cn(
              "h-3 w-3 transition-transform",
              expanded && "rotate-180"
            )}
          />
        </button>
      </footer>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-border space-y-3">
          {visibleComments.map((c) => {
            const likedC = !!likedComments[c.id];
            const replyClass = c.replyTo
              ? "ml-6 pl-3 border-l-2 border-border/60"
              : "";
            return (
              <div key={c.id} className={replyClass}>
                <div className="flex flex-col gap-1">
                  <div className="text-sm">
                    <span className="font-semibold">{c.author}</span>{" "}
                    {c.replyTo && (
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-foreground hover:underline cursor-pointer"
                      >
                        @{c.replyTo}{" "}
                      </button>
                    )}
                    <span className="text-foreground/90">{c.content}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleCommentLike(c.id)}
                    className={`flex items-center gap-1 text-xs w-fit transition-colors ${
                      likedC
                        ? "text-red-500"
                        : "text-muted-foreground hover:text-red-500"
                    }`}
                  >
                    <Heart
                      className={cn(
                        "h-3.5 w-3.5",
                        likedC && "fill-current"
                      )}
                    />
                    {c.likes + (likedC ? 1 : 0)}
                  </button>
                </div>
              </div>
            );
          })}

          {hiddenCount > 0 && (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="text-xs text-muted-foreground hover:text-foreground font-medium"
            >
              {showAll
                ? "Show less"
                : `Show more ${hiddenCount} ${hiddenCount === 1 ? "comment" : "comments"}`}
            </button>
          )}
        </div>
      )}
    </article>
  );
};

export default PostFeed;
