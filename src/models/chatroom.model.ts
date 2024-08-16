export interface ChatMember {
  id: string;
  name?: string;
  email?: string;
  avatar?: string;
  status?: string;
}

export interface ChatRoom {
  owner: ChatMember;
  active: number;
}
