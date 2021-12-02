/** @jsxImportSource @emotion/react */
import { useTheme } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";
import Appbar from "../../components/Appbar";

const Home: React.FC = () => {
  const theme = useTheme();
  return (
    <div
      css={{
        background: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <Appbar />
      <Outlet />
    </div>
  );
};

export default Home;
