/** @jsxImportSource @emotion/react */
import { Typography, useTheme } from "@mui/material";
import { MdErrorOutline } from "react-icons/md";
import React from "react";
import { css } from "@emotion/react";

const Error: React.FC = () => {
  const theme = useTheme();
  return (
    <div
      css={css`
        padding-top: ${theme.spacing(13)};
        text-align: center;
      `}
    >
      <MdErrorOutline size={128} color={theme.palette.text.primary} />
      <Typography variant="h4" component="p" color="textPrimary">
        Something went wrong
      </Typography>
    </div>
  );
};

export default Error;
