import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/problems";
import { useEffect, useState } from "react";
import { Tag, Button, Popconfirm, message, Typography } from "antd";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import getTagColor from "../utils/functions/Tagcolor";

const ViewProblem = () => {
  console.log("View Problem component renders");
  const navigate = useNavigate();

  const { id } = useParams();
  console.log(id);
  const [problem, setProblem] = useState({});

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await api.get(`/questions/${id}`);
        setProblem(response.data);
        console.log(response.data);
      } catch (err) {
        // if no problems are found or there is an error, log it to the console
        if (err.response) {
          console.error(err.response);
          console.error(err.response.data.message);
          console.error(err.response.data.status);
          console.error(err.response.data.headers);
          navigate("*");
        } else {
          console.error("Error", err.message);
          navigate("*");
        }
      }
    };
    fetchProblem();
  }, [id]);

  const handleDelete = async () => {
    try {
      await api.delete(`/questions/${id}`);
      message.success("Problem deleted successfully");
      navigate("/questions");
    } catch (err) {
      message.error("Failed to delete problem");
      console.error("Error", err.message);
    }
  };

  return (
    <>
      <div className="container">
        <article className="blog-post mt-2">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="display-5 link-body-emphasis mb-1">
                {problem.title}
                <Tag
                  className="mx-1"
                  style={{ fontSize: "20px" }}
                  color={getTagColor(problem.difficulty)}
                >
                  {problem.difficulty}
                </Tag>{" "}
              </h2>
            </div>

            <div>
              {problem.tags &&
                problem.tags.map((tag, index) => (
                  <Typography.Text key={index} code>
                    {tag}
                  </Typography.Text>
                ))}
            </div>
          </div>
          <p className="blog-post-meta">
            {problem.updatedAt}
            <br></br>
            <div className="d-flex">
              <Link to={`/questions/${id}/edit`}>
                <Button type="primary"> Edit</Button>
              </Link>
              <Popconfirm
                placement="right"
                title="Delete the Problem"
                description="Are you sure to delete this Problem?"
                onConfirm={handleDelete}
                okText="Yes"
                cancelText="No"
              >
                <Button className="mx-2" danger>
                  Delete
                </Button>
              </Popconfirm>
            </div>
          </p>
          <hr />

          <p>{problem.description}</p>
          <h3>Solution</h3>

          <SyntaxHighlighter showLineNumbers language="cpp" style={a11yDark}>
            {problem.solution}
          </SyntaxHighlighter>
        </article>
      </div>
    </>
  );
};

export default ViewProblem;
