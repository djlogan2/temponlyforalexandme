import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  formControl: {
    position: "relative",
    maxWidth: 305,
    width: "100%",
  },
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
    width: "100%",
    height: "63px",
    padding: "8px 16px",
    backgroundColor: "#f5f5f5",
    boxSizing: "border-box",
    borderRadius: "8px",
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
    width: "100%",

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

  inputWithIcon: {
    display: "flex",
    justifyContent: "space-between",
  },

  icon: {
    width: 16,
    height: 16,
    margin: {
      left: 2,
    },
    cursor: "pointer",
  },
});

export default useStyles;
