import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const ProblemDisplay = ({ title, description, solution, difficulty }) => {

  console.log("Problem Display component renders");
  return (
    <div
      className="container"
      style={{
        marginTop: "20px",
        border: "1px solid #e8e8e8",
        padding: "20px",
      }}
    >
      <h2>{title}</h2>
      <p>Difficulty: {difficulty}</p>
      <p>Description: {description}</p>
      <p>Solution:</p>
      <SyntaxHighlighter showLineNumbers language="cpp" style={a11yDark}>
        {solution}
      </SyntaxHighlighter>
    </div>
  );
};

export default ProblemDisplay;
