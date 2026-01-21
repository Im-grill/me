import { Heart, MessageCircle } from "lucide-react";

interface GalleryItem {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
}

interface GalleryGridProps {
  items: GalleryItem[];
}

const GalleryGrid = ({ items }: GalleryGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 animate-fade-in">
      {items.map((item) => (
        <div key={item.id} className="gallery-item aspect-[3/4] group">
          <img
            src={item.imageUrl}
            alt="Gallery item"
            className="w-full h-full object-cover"
          />
          <div className="gallery-overlay flex items-end justify-start p-3">
            <div className="flex items-center gap-4 text-white text-sm">
              <span className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                {item.likes}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                {item.comments}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
