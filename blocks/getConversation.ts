import { AppBlock, events } from "@slflows/sdk/v1";
import outputs from "../shared/outputs";
import listMessages from "../shared/listMessages";

export const getConversation: AppBlock = {
  name: "Get conversation",
  description: "Retrieves a conversation by its ID",
  inputs: {
    default: {
      config: {
        conversationId: {
          name: "Conversation ID",
          description: "The ID of the conversation to retrieve",
          type: "string",
          required: true,
        },
      },
      onEvent: async ({ event }) => {
        const { conversationId } = event.inputConfig;

        const messages = await listMessages(conversationId);
        const found = messages.length > 0;

        await events.emit({ conversationId, found, messages });
      },
    },
  },
  outputs,
};
