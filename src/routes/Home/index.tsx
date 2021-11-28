import React from "react";
import { Outlet } from "react-router";

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <div>Home</div>
      <Outlet />
    </React.Fragment>
  );
};

export default Home;
