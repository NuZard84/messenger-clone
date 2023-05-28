"use client";

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    //This way, the messageHandler function ensures that new messages are added to the messages state only if they are not already present, avoiding duplicates in the array.
    const messageHandler = (msg: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((curr) => {
        if (find(curr, { id: msg?.id })) {
          return curr;
        }
        return [...curr, msg];
      });

      bottomRef?.current?.scrollIntoView();
    };

    // the newMsg replaces the old message in the updated messages state array. This way, the updateMessageHandler function ensures that the specific message in the messages state array is correctly updated when a message update event occurs.
    const updateMessageHandler = (newMsg: FullMessageType) => {
      setMessages((curr) =>
        curr.map((currMsg) => {
          if (currMsg?.id === newMsg?.id) {
            return newMsg;
          }

          return currMsg;
        })
      );
    };

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);

      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((msg, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={msg.id}
          data={msg}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default Body;
