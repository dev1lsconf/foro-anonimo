
export interface User {
  id: string;
  username: string;
  password: string;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  timestamp: number;
}

export interface Topic {
  id: string;
  title: string;
  authorId: string;
  timestamp: number;
  comments: Comment[];
}