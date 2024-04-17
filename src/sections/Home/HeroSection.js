import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <>
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src="hero.jpg"
              className="d-block mx-lg-auto img-fluid"
              alt="code"
              width={700}
              height={500}
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 text-body-emphasis lh-1 mb-3">
              Welcome to CodeSave !
            </h1>
            <p className="lh-2 lead">
              Quickly Save your Codes and Problems online , and see your
              previous solved questions. With CodeSave it is easy to track down
              the questions that you have solved previously.
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <Link to="/questions/new">
                <Button href="" type="primary" size="large">
                  Add a problem
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
