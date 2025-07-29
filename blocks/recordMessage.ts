import { AppBlock, kv, events } from "@slflows/sdk/v1";
import { v7 as uuidv7 } from "uuid";
import outputs from "../shared/outputs";
import listMessages from "../shared/listMessages";

export const recordMessage = (role: "user" | "assistant"): AppBlock => ({
  name: `Record ${role}`,
  description: `Records ${role} message in a conversation`,
  inputs: {
    default: {
      config: {
        content: {
          name: "Message",
          description: "The content of the message to record",
          type: "string",
          required: true,
        },
        conversationId: {
          name: "Conversation ID",
          description: "The ID of the conversation",
          type: "string",
          required: true,
        },
      },
      onEvent: async ({ app, event }) => {
        const { conversationId, content } = event.inputConfig;

        await kv.app.set({
          key: `${conversationId}::${uuidv7()}`,
          value: { content, role },
          ttl: app.config.ttl,
        });

        const messages = await listMessages(conversationId);
        const found = messages.length > 1;

        await events.emit({ conversationId, found, messages });
      },
    },
  },
  outputs,
});
