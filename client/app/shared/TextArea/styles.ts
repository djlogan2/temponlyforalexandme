import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  containerError: {
    "& $areaContainer": {
      outline: "2px solid #FF0000",

      "&:focus-within": {
        outline: "2px solid #FF0000",
      },

      "&label": {
        color: "#FF0000 !important",
      },
    },

    "& $label": {
      color: "#FF0000",
    },

    "& $msg": {
      color: "#FF0000",
    },
  },
  container: {
    boxSizing: "border-box",
    fontFamily: "Helvetica Neue",
  },
  areaContainer: {
    color: "#101010",
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
    boxSizing: "border-box",

    "&:focus-within": {
      outline: "2px solid #D2D2D2",
      color: "#0F5AB6",
    },
  },
  label: {
    display: "flex",
    flexDirection: "column",
    fontSize: 10,
    color: "inherit",
    padding: "8px 16px",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    height: 142,
    backgroundColor: "transparent",
    color: "#55586A",
    padding: 0,
    border: 0,
    outline: 0,
    marginTop: 8,

    "&:placeholder": {
      backgroundColor: "#55586A",
    },
  },
  msg: {
    color: "#55586A",
    fontSize: 12,
    marginLeft: 16,
  },
});

export default useStyles;
