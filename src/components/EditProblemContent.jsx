import React from "react";
import { useParams } from "react-router-dom";
import { Input } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/problems";
import { Button, Dropdown, Space, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { blue } from "@ant-design/colors";
import { Editor } from "@monaco-editor/react";
import { Select } from "antd";
import tagoptions from "../utils/constants/Tags";
import items from "../utils/constants/Difficulty";

const EditProblemContent = () => {
  console.log("Edit Problem Content component renders");
  const { id } = useParams();
  const { TextArea } = Input;
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const code = `#include <iostream>
using namespace std;
int main() {
    cout << "Hello, World!";
    return 0;
}`;
  const [solution, setSolution] = useState(code);
  const [difficulty, setdifficulty] = useState("Easy");
  const [description, setDescription] = useState("");
  const [showProblem, setShowProblem] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

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

  const handleTagChange = (value) => {
    setSelectedTags(value);
  };

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await api.get(`/questions/${id}`);
        setTitle(response.data.title);
        setdifficulty(response.data.difficulty);
        setSolution(response.data.solution);
        setDescription(response.data.description);
        setSelectedTags(response.data.tags);
        console.log(response.data);
      } catch (err) {
        // if no problems are found or there is an error, log it to the console
        if (err.response) {
          navigate("*");
          console.error(err.response.data.message);
          console.error(err.response.data.status);
          console.error(err.response.data.headers);
        } else {
          console.error("Error", err.message);
        }
      }
    };
    fetchProblem();
  }, [id]);

  const handlesubmit = () => {
    api
      .put(`/questions/${id}`, {
        title: title,
        difficulty: difficulty,
        solution: solution,
        description: description,
        tags: selectedTags,
      })
      .then(function (response) {
        message.success("Problem Updated Successfully");
        setShowProblem(true);

        navigate(`/questions/${id}`);

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
              value={title}
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
              value={selectedTags}
              placeholder="Select Tags  "
              onChange={handleTagChange}
              options={tagoptions}
            />
          </div>
          <div className="col d-flex flex-column align-items-end">
            <h2>Enter The Solution</h2>
            <Editor
              height="70vh"
              value={solution}
              theme="vs-dark"
              defaultLanguage="cpp"
              defaultValue={code}
              onChange={(value, event) => {
                setSolution(value);
              }}
              loading={"Loading..."}
            />
            <br />
            <br />
            <Button onClick={handlesubmit} style={{ backgroundColor: blue[1] }}>
              Update
            </Button>
          </div>
        </div>
      </div>

      <br />
    </>
  );
};

export default EditProblemContent;
