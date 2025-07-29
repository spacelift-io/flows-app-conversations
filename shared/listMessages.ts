import { kv } from "@slflows/sdk/v1";

export default async function listMessages(conversationId: string) {
  const messages = [];
  let startingKey: string | undefined;

  do {
    const { pairs, nextStartingKey } = await kv.app.list({
      keyPrefix: `${conversationId}::`,
      startingKey,
    });

    messages.push(...pairs.map((p) => p.value));
    startingKey = nextStartingKey;
  } while (startingKey);

  return messages.sort((a, b) => a.timestamp - b.timestamp);
}
