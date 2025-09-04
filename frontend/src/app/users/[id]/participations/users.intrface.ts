interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  type: string;
}

export interface Participation {
  id: string;
  submission: string | null;
  submissionUrl: string | null;
  awardedPoints: number;
  createdAt: string;
  challenge: Challenge;
}
