import { defineApp } from "@slflows/sdk/v1";
import { recordMessage } from "./blocks/recordMessage";
import { getConversation } from "./blocks/getConversation";

export const app = defineApp({
  name: "Conversations",
  config: {
    ttl: {
      name: "Conversation TTL",
      description: "Time-to-live for messages in seconds",
      type: "number",
      required: false,
      default: 10800, // 3 hours in seconds
    },
  },
  blocks: {
    recordUserMessage: recordMessage("user"),
    recordAssistantMessage: recordMessage("assistant"),
    getConversation,
  },
});
