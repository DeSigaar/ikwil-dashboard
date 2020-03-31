interface iActivity {
  name: string;
  room: string;
  id?: string;
  createdBy?: string;
  creatorId?: string;
  category: string;
  organisers: string[];
  day?: iOnce;
  days?: iDay[];
}
