import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileTabs from "@/components/ProfileTabs";
import GalleryGrid from "@/components/GalleryGrid";

import bannerImg from "@/assets/banner.jpg";
import avatarImg from "@/assets/avatar.jpg";
import gallery1 from "@/assets/gallery1.jpg";
import gallery2 from "@/assets/gallery2.jpg";
import gallery3 from "@/assets/gallery3.jpg";
import gallery4 from "@/assets/gallery4.jpg";

const galleryItems = [
  { id: "1", imageUrl: gallery1, likes: 7, comments: 2 },
  { id: "2", imageUrl: gallery2, likes: 6, comments: 1 },
  { id: "3", imageUrl: gallery3, likes: 6, comments: 2 },
  { id: "4", imageUrl: gallery4, likes: 25, comments: 4 },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<"portfolio" | "post">("portfolio");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />

      {/* Main Content */}
      <main className="ml-16 pt-14 pb-16">
        <div className="max-w-4xl mx-auto">
          <ProfileHeader
            bannerUrl={bannerImg}
            avatarUrl={avatarImg}
            displayName="Thorcon"
            role="Coder"
            username="definitely_not_thor"
            following={1}
            followers={205}
          />

          <div className="px-4">
            <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {activeTab === "portfolio" ? (
            <GalleryGrid items={galleryItems} />
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              No posts yet
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
