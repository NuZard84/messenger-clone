import { useEffect, useState } from "react";
import { pusherClient } from "../libs/pusher";
import useActiveList from "./useActiveList";
import { Channel, Members } from "pusher-js";

const useActiveChannel = () => {
  const { set, add, remove } = useActiveList();
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

  useEffect(() => {
    let channel = activeChannel;

    //it will execute when pusher-authorization completed and channel is created...
    if (!channel) {
      channel = pusherClient.subscribe("presence-messenger");
      setActiveChannel(channel);
    }

    //this is array of all members we have and we have put them together in a list for globally work...
    channel.bind("pusher:subscription_succeeded", (members: Members) => {
      //setting up members to globalStore...
      const initialMembers: string[] = [];

      //bind-event: who already looged in befor main user...
      members.each((member: Record<string, any>) =>
        initialMembers.push(member.id)
      );
      set(initialMembers);
    });

    //bind-add-event: when new user logged in...
    channel.bind("pusher:member_added", (member: Record<string, any>) => {
      add(member.id);
    });

    //bind-remove-event: when user logged out...
    channel.bind("pusher:member_removed", (member: Record<string, any>) => {
      remove(member.id);
    });

    return () => {
      if (activeChannel) {
        pusherClient.unsubscribe("presence-messenger");
        setActiveChannel(null);
      }
    };
  }, [activeChannel, set, add, remove]);
};

export default useActiveChannel;
