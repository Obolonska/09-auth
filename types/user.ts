export type RegisterRequest = {
  email: string;
  password: string;
  // userName: string;
};

export type User = {
  id: string;
  email: string;
  userName?: string;
  photoUrl?: string;
  createdAt: string;
  updatedAt: string;
};
