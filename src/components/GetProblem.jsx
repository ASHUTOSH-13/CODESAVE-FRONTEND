import React, { useState } from "react";
import { Input, Select, Button, Dropdown, Space, message } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../api/problems";
import { DownOutlined } from "@ant-design/icons";
import { gold } from "@ant-design/colors";
import ProblemDisplay from "./ProblemDisplay";
import { Editor } from "@monaco-editor/react";
import Code from "../utils/constants/Codesnippet";
import tagoptions from "../utils/constants/Tags";
import items from "../utils/constants/Difficulty";

//post problem on /questions

const GetProblem = () => {
  console.log("Get Problem component renders");
  const { TextArea } = Input;

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [solution, setSolution] = useState(Code);
  const [difficulty, setdifficulty] = useState("Easy");
  const [description, setDescription] = useState("");
  const [showProblem, setShowProblem] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagChange = (value) => {
    setSelectedTags(value);
  };

  const handletitle = (e) => {
    setTitle(e.target.value);
  };
  const handleMenuClick = (e) => {
    if (e.key === "1") setdifficulty("Easy");
    else if (e.key === "2") setdifficulty("Medium");
    else setdifficulty("Hard");
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const handlesubmit = () => {
    api
      .post("/questions", {
        title: title,
        difficulty: difficulty,
        solution: solution,
        description: description,
        tags: selectedTags,
      })
      .then(function (response) {
        message.success("Problem Added Successfully");
        setShowProblem(true);
        const newProblemId = response.data._id;

        setTimeout(() => {
          navigate(`/questions/${newProblemId}`);
        }, 5000);

        console.log(response);
        console.log(response.data._id);
      })
      .catch(function (error) {
        console.log(error.response.data.message);
      });
  };

  return (
    <>
      <div className="container mt-5 d-flex flex-row flex-col-md">
        <div
          style={{ width: "100%" }}
          className="row d-flex justify-content-around"
        >
          <div className="col-4">
            <h2>Enter The Title</h2>
            <TextArea
              onChange={handletitle}
              rows={4}
              placeholder="Enter The Problem Title"
            />
            <br />
            <br />
            <br />
            <h2>Enter The Description</h2>
            <TextArea
              value={description}
              onChange={handleDescriptionChange}
              rows={12}
              placeholder="Enter The Description"
            />
            <br />
            <br />
            <h2>Select difficulty</h2>
            <Dropdown menu={menuProps}>
              <Button>
                <Space>
                  {difficulty === "Easy" ? (
                    <span>🟢</span>
                  ) : difficulty === "Medium" ? (
                    <span>🟡</span>
                  ) : (
                    <span>🔴</span>
                  )}{" "}
                  {difficulty}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
            <br></br>
            <br></br>
            <br></br>
            <h2>Select Tags</h2>
            <Select
              mode="tags"
              style={{
                width: "100%",
              }}
              placeholder="Select Tags  "
              onChange={handleTagChange}
              options={tagoptions}
            />
          </div>
          <div className="col d-flex flex-column align-items-end">
            <h2>Enter The Solution</h2>

            <Editor
              height="70vh"
              theme="vs-dark"
              defaultLanguage="cpp"
              defaultValue={Code}
              onChange={(value, event) => {
                setSolution(value);
              }}
              loading={"Loading..."}
            />
            <br />
            <br />
            <Button onClick={handlesubmit} style={{ backgroundColor: gold[1] }}>
              Save
            </Button>
          </div>
        </div>
      </div>

      <br />
      {showProblem && (
        <ProblemDisplay
          title={title}
          description={description}
          solution={solution}
          difficulty={difficulty}
        />
      )}
    </>
  );
};

export default GetProblem;
