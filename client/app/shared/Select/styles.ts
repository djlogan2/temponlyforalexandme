import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    maxWidth: 305,
    width: "100%",
    position: "relative",
  },
  list: {
    position: "absolute",
    listStyleType: "none",
    marginTop: "8px",
    boxSizing: "border-box",
    "box-shadow": "0px 4px 15px rgba(0, 0, 0, 0.08)",
    "border-radius": "8px",
    width: "100%",
    padding: 0,
    backgroundColor: "#FFFFFF",
  },
  item: {
    padding: "6px 16px",
    cursor: "pointer",

    "&:hover": {
      backgroundColor: "#ECEFF5",
      color: "#0F5AB6",
    },
  },
});

export default useStyles;
