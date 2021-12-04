import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

type Props = {
  text: string;
  path: string;
  startIcon?: React.ReactNode;
};

const LinkButton: React.FC<Props> = ({ text, path, startIcon }) => {
  return (
    <Link to={path} style={{ display: "inline-block", textDecoration: "none" }}>
      <Button
        color="primary"
        variant="contained"
        size="small"
        startIcon={startIcon}
        sx={{
          fontWeight: "fontWeightLight",
          boxShadow: 7,
          textTransform: "none",
          "&:hover": {
            bgcolor: "primary.main",
          },
          px: 3,
        }}
      >
        {text}
      </Button>
    </Link>
  );
};

export default LinkButton;
