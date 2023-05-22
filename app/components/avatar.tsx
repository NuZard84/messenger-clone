"use client";

import Image from "next/image";
import { User } from "@prisma/client";

interface AvatarProp {
  user?: User;
}

const Avatar: React.FC<AvatarProp> = ({ user }) => {
  return (
    <div className="relative">
      <div
        className="
                relative
                inline-block
                rounded-full
                overflow-hidden
                h-9
                w-9
                md:h-11
                md-w-11
            "
      >
        <Image
          alt="Avatar"
          src={user?.image || "/images/placeholder.jpg"}
          fill
        />
      </div>
    </div>
  );
};

export default Avatar;
