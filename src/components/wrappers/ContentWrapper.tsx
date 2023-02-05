import { Box } from "@mui/material";
import React from "react";

interface ContentBoxProps {
  children: React.ReactNode;
}

const ContentWrapper = ({ children }: ContentBoxProps) => {
  return <Box sx={{ padding: "1rem" }}>{children}</Box>;
};

export default ContentWrapper;
