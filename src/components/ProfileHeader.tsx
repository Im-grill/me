import { useState } from "react";
import {
  MoreHorizontal,
  Check,
  Share2,
  Link2,
  Flag,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProfileHeaderProps {
  bannerUrl: string;
  avatarUrl: string;
  displayName: string;
  role: string;
  username: string;
  following: number;
  followers: number;
  onFollowChange?: (isFollowing: boolean) => void;
}

const ProfileHeader = ({
  bannerUrl,
  avatarUrl,
  displayName,
  role,
  username,
  following,
  followers,
  onFollowChange,
}: ProfileHeaderProps) => {
  const [avatarOpen, setAvatarOpen] = useState(false);
  const followKey = `follow:${username}`;
  const [isFollowing, setIsFollowing] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(followKey) === "1";
  });

  const toggleFollow = () =>
    setIsFollowing((prev) => {
      const next = !prev;
      localStorage.setItem(followKey, next ? "1" : "0");
      onFollowChange?.(next);
      return next;
    });

  const profileUrl =
    typeof window !== "undefined" ? `${window.location.origin}/@${username}` : "";

  const handleCopyLink = () => {
    if (!profileUrl) return;
    navigator.clipboard.writeText(profileUrl);
    toast.success("Đã sao chép link profile!");
  };

  return (
    <div className="relative">
      {/* Banner */}
      <div className="h-56 md:h-64 w-full overflow-hidden rounded-b-2xl">
        <img
          src={bannerUrl}
          alt="Profile banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Card */}
      <div className="relative -mt-16 px-4">
        <div className="flex items-end gap-4">
          {/* Avatar */}
          <div className="relative">
            <Dialog open={avatarOpen} onOpenChange={setAvatarOpen}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden avatar-ring bg-card cursor-pointer p-0 block"
                  aria-label={`Zoom ảnh đại diện của ${displayName}`}
                >
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className="w-full h-full object-cover"
                  />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl w-[90vw] bg-transparent border-none shadow-none p-0">
                <DialogTitle className="sr-only">{displayName}</DialogTitle>
                <DialogDescription className="sr-only">
                  Phóng to ảnh đại diện
                </DialogDescription>
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Info Card */}
          <div className="flex-1 bg-card/90 backdrop-blur-sm rounded-xl p-4 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-2">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  {displayName}
                </h2>
                <span className="px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded uppercase tracking-wide">
                  {role}
                </span>
                <span className="font-medium">♂</span>
              </div>
              <p className="text-muted-foreground text-sm mt-0.5 truncate">@{username}</p>
            </div>

            <div className="flex items-center gap-2 self-end md:self-auto">
              <Button
                onClick={toggleFollow}
                className={`rounded-full px-6 transition-colors ${
                  isFollowing
                    ? "bg-secondary text-secondary-foreground hover:bg-destructive hover:text-destructive-foreground"
                    : ""
                }`}
              >
                {isFollowing ? (
                  <>
                    <Check className="h-4 w-4" />
                    Following
                  </>
                ) : (
                  "Follow"
                )}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors">
                    <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: displayName,
                          text: `Xem profile của ${displayName}`,
                          url: profileUrl,
                        });
                      } else {
                        handleCopyLink();
                      }
                    }}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleCopyLink}>
                    <Link2 className="h-4 w-4 mr-2" />
                    Copy link
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => toast.error("Report submitted")}
                    className="text-destructive focus:text-destructive"
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    Report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 mt-4 pl-36">
          <button className="text-sm hover:underline">
            <span className="font-bold text-foreground">{following}</span>
            <span className="text-muted-foreground ml-1">Following</span>
          </button>
          <button className="text-sm hover:underline">
            <span className="font-bold text-foreground">{followers}</span>
            <span className="text-muted-foreground ml-1">Followers</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
