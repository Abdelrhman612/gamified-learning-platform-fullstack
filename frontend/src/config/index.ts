export const config = {
  apiUrl:
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3000/api/v1" ||
    "https://gamified-learning-platform-fullstack-production.up.railway.app/api/v1",
};
