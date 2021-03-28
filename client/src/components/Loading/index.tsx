import React, { FC } from "react";
import { Box, CircularProgress } from "@material-ui/core";

const Loading: FC = () => {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress size={32} />
    </Box>
  );
};

export default Loading;
