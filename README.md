# Conversations - Flows App

A Flows app for managing conversation messages with automatic TTL-based cleanup.

## Overview

This app provides blocks for recording and retrieving conversation messages with configurable time-to-live (TTL) settings. It's designed to maintain conversation state temporarily, making it ideal for chat applications or conversational AI systems.

## Features

- **Message Recording**: Store user and assistant messages with role-based categorization
- **Conversation Retrieval**: Get complete conversation history by ID
- **Automatic Cleanup**: Messages expire automatically based on configurable TTL
- **Type Safety**: Full TypeScript implementation with proper error handling

## Configuration

The app accepts one configuration parameter:

- **ttl** (optional): Time-to-live for messages in seconds (default: 10800 = 3 hours)

## Blocks

### Record User Message (`recordUserMessage`)

Records a user message in a conversation.

**Inputs:**

- `content` (string, required): The message content
- `conversationId` (string, required): The conversation identifier

**Outputs:**

- `conversationId`: The conversation ID
- `found`: Boolean indicating if other messages exist in the conversation
- `messages`: Array of all messages in the conversation

### Record Assistant Message (`recordAssistantMessage`)

Records an assistant message in a conversation.

**Inputs:**

- `content` (string, required): The message content
- `conversationId` (string, required): The conversation identifier

**Outputs:**

- `conversationId`: The conversation ID
- `found`: Boolean indicating if other messages exist in the conversation
- `messages`: Array of all messages in the conversation

### Get Conversation (`getConversation`)

Retrieves all messages from a conversation by ID.

**Inputs:**

- `conversationId` (string, required): The conversation identifier

**Outputs:**

- `conversationId`: The conversation ID
- `found`: Boolean indicating if messages were found
- `messages`: Array of all messages in the conversation

## Message Format

Each message in the conversation has the following structure:

```typescript
{
  content: string; // The message text
  role: "user" | "assistant"; // Who sent the message
}
```

## Development

### Setup

```bash
npm install
```

### Available Scripts

- `npm run typecheck` - Type check the code
- `npm run format` - Format code with Prettier
- `npm run bundle` - Bundle the app for deployment

### Project Structure

```
conversations/
├── blocks/                    # Block implementations
│   ├── recordMessage.ts       # Message recording block factory
│   └── getConversation.ts     # Conversation retrieval block
├── shared/                    # Shared utilities
│   ├── outputs.ts             # Common output schema
│   └── listMessages.ts        # Message listing utility
├── main.ts                    # App definition and configuration
└── package.json               # Dependencies and scripts
```

## Usage Example

1. **Record a user message:**
   - Use `recordUserMessage` block with content and conversationId
   - Returns conversation state and message history

2. **Record an assistant response:**
   - Use `recordAssistantMessage` block with response content
   - Messages are automatically linked by conversationId

3. **Retrieve conversation:**
   - Use `getConversation` block with conversationId
   - Returns complete message history

## Technical Details

- Messages are stored in key-value storage with UUID v7 keys for chronological ordering
- TTL is applied at storage level for automatic cleanup
- All blocks share common output schema for consistency
- Type-safe implementation with comprehensive error handling
