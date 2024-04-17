import React, { useState, useEffect } from "react";
import { Progress } from "antd";
import api from "../api/problems";
import DifficultyProgressFetcher from "../fetchers/difficultycountfetcher";

const DifficultyProgress = () => {
  console.log("Difficulty Progress component renders");
  const [Total, setTotal] = useState(0);
  const [EasyCount, setEasyCount] = useState(0);
  const [MediumCount, setMediumCount] = useState(0);
  const [HardCount, setHardCount] = useState(0);

  return (
    <>
      <div className="container mt-5 pt-5 flex-column d-flex">
        <div className="mt-3 mb-4 px-5">
          <h3>You have solved {Total} problems</h3>
        </div>

        <DifficultyProgressFetcher
          setTotal={setTotal}
          setEasyCount={setEasyCount}
          setMediumCount={setMediumCount}
          setHardCount={setHardCount}
        />

        <div className="d-flex w-100 justify-content-evenly">
          <div className="d-flex flex-column justify-content-between align-items-center">
            <Progress
              strokeColor="green"
              type="circle"
              percent={Math.floor((EasyCount / Total) * 100)}
            />
            <p style={{ fontSize: "18px" }}>Easy</p>
          </div>

          <div className="d-flex flex-column justify-content-between align-items-center">
            {" "}
            <Progress
              strokeColor="gold"
              type="circle"
              percent={Math.floor((MediumCount / Total) * 100)}
            />
            <p style={{ fontSize: "18px" }}>Medium</p>
          </div>

          <div className="d-flex flex-column justify-content-between align-items-center">
            <Progress
              strokeColor="red"
              type="circle"
              percent={Math.ceil((HardCount / Total) * 100)}
            />
            <p style={{ fontSize: "18px" }}>Hard</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DifficultyProgress;
