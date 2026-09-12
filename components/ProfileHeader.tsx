import Image from "next/image";
import type { GithubProfile } from "@/types/github";

export default function ProfileHeader({ profile }: { profile: GithubProfile }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:text-left">
      <Image
        src={profile.avatar_url}
        alt={`${profile.login}'s avatar`}
        width={96}
        height={96}
        className="rounded-full border border-zinc-800"
        priority
      />
      <div>
        <h1 className="text-2xl font-bold text-zinc-50">
          {profile.name ?? profile.login}
        </h1>
        <a
          href={profile.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-zinc-400 hover:text-brand"
        >
          @{profile.login}
        </a>
        {profile.bio && (
          <p className="mt-2 max-w-md text-sm text-zinc-400">{profile.bio}</p>
        )}
        <p className="mt-2 text-sm text-zinc-500">
          {profile.followers} followers · {profile.following} following
        </p>
      </div>
    </div>
  );
}
