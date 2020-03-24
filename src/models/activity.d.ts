interface iActivity {
  name: string;
  startTime: string;
  endTime: string;
  room: string;
  id?: string;
  createdBy?: string;
  creatorId?: string;
  category: string;
  organisers: string[]; 
}
