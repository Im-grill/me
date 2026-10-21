import { useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface Comment {
  id: string;
  author: string;
  content: string;
  likes: number;
  replyTo?: string;
}

interface GalleryItem {
  id: string;
  imageUrl: string;
  likes: number;
  comments: Comment[];
}

interface GalleryGridProps {
  items: GalleryItem[];
  poster: { name: string; avatarUrl: string };
}

const GalleryGrid = ({ items, poster }: GalleryGridProps) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>(
    () => {
      if (typeof window === "undefined") return {};
      try {
        const merged: Record<string, boolean> = {};
        items.forEach((it) => {
          const raw = localStorage.getItem(`gallery-comment-like:${it.id}`);
          if (!raw) return;
          const parsed = JSON.parse(raw) as Record<string, boolean>;
          for (const [cid, liked] of Object.entries(parsed)) {
            merged[`${it.id}:${cid}`] = liked;
          }
        });
        return merged;
      } catch {
        return {};
      }
    }
  );

  const toggleCommentLike = (itemId: string, cid: string) =>
    setLikedComments((prev) => {
      const key = `${itemId}:${cid}`;
      const next = { ...prev, [key]: !prev[key] };
      const perItem: Record<string, boolean> = {};
      for (const [k, v] of Object.entries(next)) {
        if (k.startsWith(`${itemId}:`)) {
          perItem[k.slice(itemId.length + 1)] = v;
        }
      }
      localStorage.setItem(
        `gallery-comment-like:${itemId}`,
        JSON.stringify(perItem)
      );
      return next;
    });

  const [likedItems, setLikedItems] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(localStorage.getItem("gallery-item-likes") || "{}");
    } catch {
      return {};
    }
  });

  const toggleItemLike = (itemId: string) =>
    setLikedItems((prev) => {
      const next = { ...prev, [itemId]: !prev[itemId] };
      localStorage.setItem("gallery-item-likes", JSON.stringify(next));
      return next;
    });

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 animate-fade-in">
      {items.map((item) => (
        <Dialog
          key={item.id}
          open={openId === item.id}
          onOpenChange={(o) => setOpenId(o ? item.id : null)}
        >
          <DialogTrigger asChild>
            <button
              type="button"
              className="gallery-item aspect-[3/4] group cursor-pointer block w-full text-left p-0 m-0"
            >
              <img
                src={item.imageUrl}
                alt="Gallery item"
                className="w-full h-full object-cover"
              />
              <div className="gallery-overlay flex items-end justify-start p-3">
                <div className="flex items-center gap-4 text-white text-sm">
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {item.likes + (likedItems[item.id] ? 1 : 0)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    {item.comments.length}
                  </span>
                </div>
              </div>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl w-[95vw] p-0 overflow-hidden">
            <DialogTitle className="sr-only">Gallery image</DialogTitle>
              <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] max-h-[85vh]">
              <div className="bg-black flex items-center justify-center min-h-[300px]">
                <img
                  src={item.imageUrl}
                  alt="Gallery item"
                  className="w-full h-full max-h-[85vh] object-contain"
                />
              </div>
              <div className="p-4 flex flex-col gap-4 overflow-y-auto">
                <div className="flex flex-col gap-2 pr-8">
                  <div className="flex items-center gap-2">
                    <img
                      src={poster.avatarUrl}
                      alt={poster.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-semibold">{poster.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleItemLike(item.id)}
                    className={`flex items-center gap-1 text-sm transition-colors w-fit ${
                      likedItems[item.id]
                        ? "text-red-500"
                        : "text-muted-foreground hover:text-red-500"
                    }`}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        likedItems[item.id] ? "fill-current" : ""
                      }`}
                    />
                    {item.likes + (likedItems[item.id] ? 1 : 0)} likes
                  </button>
                </div>
                <div className="border-t" />
                <div className="space-y-4">
                  {item.comments.map((c) => {
                    const liked = !!likedComments[`${item.id}:${c.id}`];
                    return (
                      <div key={c.id} className="flex flex-col gap-1">
                        <div className="text-sm">
                          <span className="font-semibold">{c.author}</span>{" "}
                          <span className="text-muted-foreground">
                            {c.content}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleCommentLike(item.id, c.id)}
                          className={`flex items-center gap-1 text-xs w-fit transition-colors ${
                            liked
                              ? "text-red-500"
                              : "text-muted-foreground hover:text-red-500"
                          }`}
                        >
                          <Heart
                            className={`h-3.5 w-3.5 ${liked ? "fill-current" : ""}`}
                          />
                          {c.likes + (liked ? 1 : 0)}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default GalleryGrid;
