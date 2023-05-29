"use client";

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";

import MobileItem from "./MobileItem";
import { useState } from "react";
import SettingModal from "./SettingModal";
import { User } from "@prisma/client";
import clsx from "clsx";
import Avatar from "../avatar";

interface MobileFooterProps {
  currentUser: User;
}

const MobileFooter: React.FC<MobileFooterProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isOpen) {
    return null;
  }

  const PortableSideItems = routes.map((route, index) => {
    if (index === 0) {
      return (
        <div
          key={route.label}
          onClick={() => setIsModalOpen(true)}
          className={clsx(
            `
            group
            flex
            gap-x-3
            text-sm
            leading-6
            font-semibold
            w-full
            justify-center
            p-4
            text-gray-500
            hover:text-black
            hover:bg-gray-100
            
          `,
            route.active && "text-black bg-gray-100"
          )}
        >
          <div className="h-7 w-8">
            <Avatar user={currentUser} />
          </div>
        </div>
      );
    } else {
      return (
        <MobileItem
          key={route.href}
          href={route.href as string}
          active={route.active}
          icon={route.icon}
          onClick={route.onClick}
        />
      );
    }
  });

  return (
    <>
      <SettingModal
        currentUser={currentUser}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div
        className="
            fixed
            justify-between
            w-full
            bottom-0
            z-40
            flex
            items-center
            bg-white
            border-t-[1px]
            lg:hidden
        "
      >
        {PortableSideItems}
      </div>
    </>
  );
};

export default MobileFooter;
