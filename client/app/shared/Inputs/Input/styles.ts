import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  formControlError: {
    color: "#ff0000",

    "& $inputContainer": {
      color: "inherit",
      outline: "2px solid #ff0000",
    },

    "& $label": {
      color: "inherit",
    },

    "& $inputContainer:focus-within": {
      outline: "2px solid #ff0000",
      color: "inherit",
    },

    "& $msg": {
      color: "inherit",
    },
  },

  inputContainer: {
    maxWidth: "312px",
    height: "63px",
    width: "100%",
    padding: "8px 16px",
    backgroundColor: "#f5f5f5",
    boxSizing: "border-box",
    borderRadius: "8px",
    fontFamily: "Helvetica, sans-serif",
    color: "#101010",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    "&:focus-within": {
      outline: "2px solid #d2d2d2",
      color: "#0F5AB6",

      label: {
        color: "inherit",
      },
    },
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "10px",
  },

  input: {
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    fontSize: "16px",
    padding: 0,

    "&:disabled": {
      color: "#9698A1",
    },

    "&::placeholder": {
      color: "#55586a",
    },

    "&[type='password']": {
      color: "#665959",
    },
  },

  msg: {
    color: "#55586a",
    fontSize: "14px",
    margin: {
      bottom: 0,
      left: "16px",
      top: "1.5px",
    },
  },
});

export default useStyles;
