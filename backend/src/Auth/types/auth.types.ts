export interface JwtPayload {
  id: string;
  name: string;
  email: string;
  role: string;
  points: number;
}
export interface OAuthUser {
  id: string;
  username: string;
  email: string | null;
  accessToken: string;
}
