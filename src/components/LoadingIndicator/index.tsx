import { Skeleton } from "@mui/material";
import React from "react";

const LoadingIndicator: React.FC = () => {
  return (
    <React.Fragment>
      <Skeleton variant="rectangular" animation="wave" height={70} />
      <div style={{ display: "flex", marginTop: 16 }}>
        <Skeleton
          variant="circular"
          width={100}
          height={100}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={100}
          sx={{ flexGrow: 1, ml: 2 }}
        />
      </div>
      <Skeleton
        variant="rectangular"
        animation="wave"
        height={30}
        sx={{ mt: 2 }}
      />
      <div style={{ display: "flex", marginTop: 16 }}>
        <Skeleton
          variant="circular"
          width={100}
          height={100}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={100}
          sx={{ flexGrow: 1, ml: 2 }}
        />
      </div>
      <Skeleton
        variant="rectangular"
        animation="wave"
        height={120}
        sx={{ mt: 2 }}
      />
      <div style={{ display: "flex", marginTop: 16 }}>
        <Skeleton
          variant="circular"
          width={100}
          height={100}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={100}
          sx={{ flexGrow: 1, ml: 2 }}
        />
      </div>
      <Skeleton
        variant="rectangular"
        animation="wave"
        height={20}
        sx={{ mt: 2 }}
      />
      <Skeleton
        variant="rectangular"
        animation="wave"
        height={50}
        sx={{ mt: 2 }}
      />
    </React.Fragment>
  );
};

export default LoadingIndicator;
