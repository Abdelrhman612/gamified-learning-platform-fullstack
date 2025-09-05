export interface Message {
  role: "user" | "model";
  text: string;
  timestamp: Date;
}

export interface ChatHistory {
  id: string;
  title: string;
  timestamp: Date;
  messages: Message[];
}
