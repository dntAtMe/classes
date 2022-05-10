/**
 * Model for messages coming in from API
 */
export interface Message {
  id: number;
  author: string;
  content: string;
};