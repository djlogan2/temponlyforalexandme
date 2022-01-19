import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  disabled: {
    "& $checkbox": {
      borderColor: "rgba(15, 90, 182, 0.5)",
    },

    "& $checkboxActive": {
      backgroundColor: "rgba(15, 90, 182, 0.5)",
      borderColor: "rgba(15, 90, 182, 0.5)",
    },
  },
  label: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  circled: {
    "& $checkbox": {
      borderRadius: "50%",
      border: "1px solid #019DF4",
    },

    "& $checkboxActive": {
      background: "#000",
    },
  },
  nativeCheckBox: {
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    whiteSpace: "nowrap",
    width: 1,
  },
  checkbox: {
    display: "inline-block",
    height: 22,
    width: 22,
    background: "#FFF",
    border: "1px #55586A solid",
    marginRight: 4,
    borderRadius: 2,
  },
  checkboxActive: {
    borderColor: "#0F5AB6",
    background: "#0F5AB6",
  },
});

export default useStyles;
