import { useState, React, useEffect } from "react";
import { Button, List, Tag, Typography, Dropdown, Space, Select } from "antd";
import getTagColor from "../utils/functions/Tagcolor";
import ProblemFetcher from "../fetchers/Problemfetcher";
import { DownOutlined } from "@ant-design/icons";
import tagoptions from "../utils/constants/Tags";
import items from "../utils/constants/Difficulty";

const AllProblems = () => {
  console.log('All problems component renders');
  const [data, setData] = useState([]);
  const [difficulty, setDifficulty] = useState("Easy");
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(() => {
      return data.filter((item) => item.difficulty == difficulty);
    })
  }, [difficulty, selectedTags])



  const handleTagChange = (value) => {
    setSelectedTags(value);
  };


  const handleMenuClick = (e) => {
    let newDifficulty = "Easy";
    if (e.key === "1") newDifficulty = "Easy";
    else if (e.key === "2") newDifficulty = "Medium";
    else newDifficulty = "Hard";
    setDifficulty(newDifficulty);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <>
      <div className="container">
        {selectedTags}
        <br>
        </br>

        <h1 className="display-5">Solved Problems</h1>
        <div className="d-flex mt-4 mb-4">
          <Dropdown menu={menuProps}>
            <Button>
              <Space>{difficulty}</Space>
              <DownOutlined />
            </Button>
          </Dropdown>

          <Select
            mode="tags"
            style={{
              width: "100%",
            }}
            placeholder="Select Tags  "
            onChange={handleTagChange}
            options={tagoptions}
          />



          {/* //here this ends */}
        </div>
        <ProblemFetcher setData={setData} />
        <List
          header={<div>Problems</div>}
          bordered
          dataSource={data || filteredData}
          renderItem={(item, index) => (
            <a href={"/questions/" + item._id}>
              <List.Item key={index}>
                <Tag color={getTagColor(item.difficulty)}>
                  {item.difficulty}
                </Tag>{" "}
                <Typography.Text strong>{item.title}</Typography.Text>
                {"   "}
                {item.tags.map((tag, index) => (
                  <Typography.Text key={index} code>
                    {tag}
                  </Typography.Text>
                ))}
              </List.Item>
            </a>
          )}
        />
      </div>
    </>
  );
};

export default AllProblems;
