export interface Participation {
  id: string;
  submission: string;
  submissionUrl: string;
  awardedPoints: number;
  user: {
    name: string;
    email: string;
  };
  challenge: {
    title: string;
    points: number;
  };
}
