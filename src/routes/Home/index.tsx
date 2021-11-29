import React from "react";
import { Outlet } from "react-router";
import Appbar from "../../components/Appbar";

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Appbar />
      <Outlet />
    </React.Fragment>
  );
};

export default Home;
