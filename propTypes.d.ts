type Message = {
  role: string;
  content: string;
  timestamp: number;
  conversationID: number;
  reply: string;
}

export type PropTypes = {
  conversation: number;
  setConversation: (value: number) => void;
  messages: Message[];
  setMessage: (value: Message) => void;
  feedback: string[];
  setFeedback: (value: string) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  conversationList: number[];
  setConversationList: (value: number) => void;
}