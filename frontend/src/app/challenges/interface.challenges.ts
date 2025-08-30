export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: string;
  startAt: string | undefined;
  endAt: string | undefined;
  points: number;
  participantsCount: number | undefined;
}
