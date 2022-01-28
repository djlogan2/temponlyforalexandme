export default {
  textareaContainerError: {
    parent: "system",
    "& $textareaAreaContainer": {
      outline: "2px solid #FF0000",

      "&:focus-within": {
        outline: "2px solid #FF0000",
      },

      "& $textareaLabel": {
        color: "#FF0000 !important",
      },
    },

    "& $textareaLabel": {
      color: "#FF0000",
    },

    "& $textareaMsg": {
      color: "#FF0000",
    },
  },
  textareaContainer: {
    parent: "system",
    boxSizing: "border-box",
    fontFamily: "Helvetica Neue",
  },
  textareaAreaContainer: {
    parent: "system",
    color: "#101010",
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
    boxSizing: "border-box",

    "&:focus-within": {
      outline: "2px solid #D2D2D2",
      color: "#0F5AB6",
    },
  },
  textareaLabel: {
    parent: "system",
    display: "flex",
    flexDirection: "column",
    fontSize: 10,
    color: "inherit",
    padding: "8px 16px",
    boxSizing: "border-box",
  },
  textarea: {
    parent: "system",
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
  textareaMsg: {
    parent: "system",
    color: "#55586A",
    fontSize: 12,
    marginLeft: 16,
  },
};
