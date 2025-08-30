export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: string;
  startAt: string;
  endAt: string;
  points: number;
  participantsCount: number;
}
