import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileTabs from "@/components/ProfileTabs";
import GalleryGrid from "@/components/GalleryGrid";
import PostFeed, { type Post } from "@/components/PostFeed";

import bannerImg from "@/assets/banner.jpg";
import avatarImg from "@/assets/avatar.jpg";
import gallery1 from "@/assets/gallery1.jpg";
import gallery2 from "@/assets/gallery2.jpg";
import gallery3 from "@/assets/gallery3.jpg";
import gallery4 from "@/assets/gallery4.jpg";

const galleryItems = [
  {
    id: "1",
    imageUrl: gallery1,
    likes: 7,
    comments: [
      { id: "c1", author: "minh_thanh", content: "Đẹp quá sốp ơi!", likes: 3 },
      { id: "c2", author: "luna_art", content: "Bức này dễ thương ghê ✨", likes: 5 },
    ],
  },
  {
    id: "2",
    imageUrl: gallery2,
    likes: 6,
    comments: [
      { id: "c3", author: "khoa_ng", content: "Nhìn mà muốn cosplay luôn", likes: 2 },
      { id: "c4", author: "aki_fan", content: "Boa lụa xinh quá", likes: 1 },
    ],
  },
  {
    id: "3",
    imageUrl: gallery3,
    likes: 6,
    comments: [
      { id: "c5", author: "tomoko", content: "Cười tít mắt luôn 🌸", likes: 4 },
      { id: "c6", author: "thanh_dz", content: "Nụ cười làm say lòng người", likes: 2 },
    ],
  },
  {
    id: "4",
    imageUrl: gallery4,
    likes: 25,
    comments: [
      { id: "c7", author: "rin_oka", content: "Ánh mắt cuốn hút quá", likes: 8 },
      { id: "c8", author: "bao_neo", content: "Mắt đẹp ghê!", likes: 6 },
      { id: "c9", author: "yuki_chan", content: "Ngắm mãi không chán 💖", likes: 11 },
    ],
  },
];

const posts: Post[] = [
  {
    id: "p1",
    author: { name: "Thorcon", avatarUrl: avatarImg },
    createdAt: "2 giờ trước",
    body: "Hôm nay vibe anime đỉnh thật 🌸 — lướt Twitter thấy artwork của Luna làm mình mê cả ngày. Mọi người đang follow artist nào hay không?",
    likes: 24,
    comments: [
      { id: "p1c1", author: "minh_thanh", content: "Vibe này chill ghê!", likes: 3 },
      { id: "p1c2", author: "luna_art", content: "Mấy bức hôm nay đỉnh lắm ✨", likes: 5 },
      { id: "p1c3", author: "aki_fan", content: "Boa lụa xinh quá", likes: 1 },
    ],
  },
  {
    id: "p2",
    author: { name: "Thorcon", avatarUrl: avatarImg },
    createdAt: "1 ngày trước",
    body: "Chán quá mí cậu có gì chơi không ?",
    likes: 7,
    comments: [
      { id: "p2c1", author: "khoa_ng", content: "Đi dạo phố đi bro", likes: 5 },
      { id: "p2c2", author: "bao_neo", content: "Có anime mới hay lắm nè", likes: 3 },
      { id: "p2c2a", author: "Thorcon", content: " Anime gì?", likes: 1, replyTo: "bao_neo" },
      { id: "p2c3", author: "rin_oka", content: "Rủ đi cafe chém gió đi ☕", likes: 8 },
    ],
  },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<"portfolio" | "post">("portfolio");
  const [followers, setFollowers] = useState(205);

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
            followers={followers}
            onFollowChange={(next) => setFollowers((n) => n + (next ? 1 : -1))}
          />

          <div className="px-4">
            <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {activeTab === "portfolio" ? (
            <GalleryGrid items={galleryItems} poster={{ name: "Thorcon", avatarUrl: avatarImg }} />
          ) : (
            <PostFeed posts={posts} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
