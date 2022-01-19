import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  button: {
    backgroundColor: "#55586A",
    width: "52px",
    height: "52px",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    color: "white",
    padding: "12px 16px",
    fontSize: "16px",
    "&:disabled": {
      backgroundColor: "#55586A",
    },
    outline: 0,
  },
});

export default useStyles;
