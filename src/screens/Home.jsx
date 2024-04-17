import React from "react";
import HeroSection from "../sections/Home/HeroSection";
import PageLayout from "../Layouts/pageLayout";
import DifficultyProgress from "../components/DifficultyProgress";

const Home = () => {
  return (
    <>
      <PageLayout>
        <HeroSection />
        <DifficultyProgress />
      </PageLayout>
    </>
  );
};

export default Home;
