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
                h-8
                w-8
                md:h-10
                md:w-10
            "
      >
        <Image
          alt="Avatar"
          src={user?.image || "/images/placeholder.jpg"}
          fill
        />
      </div>
      <span
        className="
                absolute
                block
                rounded-full
                bg-green-500
                ring-2
                ring-white
                top-0
                right-0
                h-2
                w-2
                md:h-3
                md:w-3
              "
      />
    </div>
  );
};

export default Avatar;