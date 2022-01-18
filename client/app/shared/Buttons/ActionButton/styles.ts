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
  container: {
    position: "relative",
    width: "min-content",
    "& $button:active + $hoverElement": {
      opacity: 0,
    },
    "&:hover": {
      "& $button:disabled + $hoverElement": {
        opacity: 0,
      },
      "& $button:disabled": {
        backgroundColor: "#55586A",
      },
      "& $hoverElement": {
        opacity: 1,
      },
      "& $button": {
        backgroundColor: "#131314",
      },
    },
  },
  hoverElement: {
    opacity: 0,
    textAlign: "center",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    bottom: "-5px",
    fontSize: "8px",
    background: "#FFFFFF",
    borderRadius: "10px",
    border: "2px solid #000000",
    padding: "3px 6px",
  },
});

export default useStyles;
