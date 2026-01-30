import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileHeaderProps {
  bannerUrl: string;
  avatarUrl: string;
  displayName: string;
  role: string;
  username: string;
  following: number;
  followers: number;
}

const ProfileHeader = ({
  bannerUrl,
  avatarUrl,
  displayName,
  role,
  username,
  following,
  followers,
}: ProfileHeaderProps) => {
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
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full overflow-hidden avatar-ring bg-card">
              <img
                src={avatarUrl}
                alt={displayName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info Card */}
          <div className="flex-1 bg-card/90 backdrop-blur-sm rounded-xl p-4 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between mb-2 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg md:text-2xl font-bold text-foreground">
                  {displayName}
                </h2>
                <span className="px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded uppercase tracking-wide">
                  {role}
                </span>
                <span className="font-medium">♂</span>
              </div>
              <p className="text-muted-foreground text-sm mt-0.5">@{username}</p>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <Button className="rounded-full px-4 md:px-6 w-full md:w-auto">Follow</Button>
              <button aria-label="More options" title="More options" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors">
                <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-4 mt-4 md:pl-36 pl-0">
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
