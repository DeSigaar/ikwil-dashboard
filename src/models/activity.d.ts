interface iActivity {
  name: string;
  room: string;
  id?: string;
  createdBy?: string;
  creatorId?: string;
  category: string;
  repeats?: boolean;
  organisers: string[];
  day?: iOnce;
  days?: iDay[];
}
