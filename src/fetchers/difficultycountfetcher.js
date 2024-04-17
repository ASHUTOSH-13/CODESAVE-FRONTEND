import React, { useEffect } from "react";
import api from "../api/problems";

const DifficultyProgressFetcher = ({
  setTotal,
  setEasyCount,
  setMediumCount,
  setHardCount,
}) => {
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await api.get("/api/count");
        setTotal(response.data.count);
        setEasyCount(response.data.easyproblemcount);
        setMediumCount(response.data.mediumproblemcount);
        setHardCount(response.data.hardproblemcount);
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
    fetchCount();
  }, [setTotal, setEasyCount, setMediumCount, setHardCount]);

  return null; // Since this component doesn't render anything, return null
};

export default DifficultyProgressFetcher;
