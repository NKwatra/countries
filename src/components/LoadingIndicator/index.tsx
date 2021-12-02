import { CircularProgress } from "@mui/material";

const LoadingIndicator: React.FC = () => {
  return (
    <CircularProgress
      sx={{
        mt: {
          xs: 10,
          sm: 15,
          lg: 20,
        },
        color: "text.primary",
        ml: "calc(50% - 20px)",
        transform: "trans",
      }}
    />
  );
};

export default LoadingIndicator;
