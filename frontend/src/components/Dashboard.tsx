import axios from "axios";
import { useEffect } from "react";

export const Dashboard = ({ userToken }: { userToken: string }) => {
  useEffect(() => {
    const generateEmbedding = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/generate/embedding",
          {
            headers: { Authorization: userToken },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    generateEmbedding();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
    </div>
  );
};

export default Dashboard;
