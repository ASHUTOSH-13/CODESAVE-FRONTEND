import React from "react";
import { Button, Result } from "antd";
import PageLayout from "../Layouts/pageLayout";

const Error404 = () => {
  return (
    <>
      <PageLayout>
        <div
          style={{ height: "80vh" }}
          className="d-flex justify-content-center align-items-center"
        >
          <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
              <Button href="/" type="primary">
                Back Home
              </Button>
            }
          />
        </div>
      </PageLayout>
    </>
  );
};

export default Error404;
