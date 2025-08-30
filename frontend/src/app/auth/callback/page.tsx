import { useEffect } from "react";

function Dashboard() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      console.log("JWT Token:", token);
    } else {
      console.warn("No token found!");
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Welcome to Dashboard</h1>
    </div>
  );
}

export default Dashboard;
