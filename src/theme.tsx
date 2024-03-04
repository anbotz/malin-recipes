"use client";
import { Poppins } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const poppins = Poppins({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const darkTheme = createTheme({
  typography: {
    fontFamily: poppins.style.fontFamily,
  },
  palette: {
    mode: "dark",
  },
});

export default darkTheme;
