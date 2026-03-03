export interface Ticket {
  id: string;
  equipment: string;
  description: string;
  user_name: string;
  status: "open" | "on progress" | "closed";
  created_at: Date;
  updated_at: Date;
}
