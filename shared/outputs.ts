export default {
  default: {
    default: true,
    possiblePrimaryParents: ["default"],
    type: {
      type: "object",
      properties: {
        conversationId: { type: "string" },
        found: { type: "boolean" },
        messages: {
          type: "array",
          items: {
            type: "object",
            properties: {
              message: { type: "string" },
              role: { type: "string", enum: ["user", "assistant"] },
            },
            required: ["content", "role"],
          },
        },
      },
      required: ["conversationId", "found", "messages"],
    },
  },
};
