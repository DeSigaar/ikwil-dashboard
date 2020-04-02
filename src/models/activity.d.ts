interface iActivity {
  name: string;
  description: string;
  room: string;
  id?: string;
  createdBy?: string;
  creatorId?: string;
  category: string;
  organisers: string[];
  day?: iOnce;
  days?: iDay[];
}
