import { useEffect } from "react";
import api from "../api/problems";

const ProblemFetcher = ({ setData }) => {
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await api.get("/questions");
        setData(response.data);
      } catch (err) {
        // if no problems are found or there is an error, log it to the console
        if (err.response) {
          console.error(err.response.data.message);
          console.error(err.response.data.status);
          console.error(err.response.data.headers);
        } else {
          console.error("Error", err.message);
        }
      }
    };
    fetchProblems();
  }, [setData]);

  return null; // Since this component doesn't render anything, return null
};

export default ProblemFetcher;
