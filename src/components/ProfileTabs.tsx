import { cn } from "@/lib/utils";

interface ProfileTabsProps {
  activeTab: "portfolio" | "post";
  onTabChange: (tab: "portfolio" | "post") => void;
}

const ProfileTabs = ({ activeTab, onTabChange }: ProfileTabsProps) => {
  return (
    <div className="flex border-b border-border mt-6">
      <button
        onClick={() => onTabChange("portfolio")}
        className={cn(
          "flex-1 py-3 text-center font-medium transition-colors relative",
          activeTab === "portfolio" ? "tab-active" : "tab-inactive"
        )}
      >
        Portfolio
      </button>
      <button
        onClick={() => onTabChange("post")}
        className={cn(
          "flex-1 py-3 text-center font-medium transition-colors relative",
          activeTab === "post" ? "tab-active" : "tab-inactive"
        )}
      >
        Post
      </button>
    </div>
  );
};

export default ProfileTabs;
