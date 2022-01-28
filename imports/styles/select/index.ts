export default {
  selectContainer: {
    parent: "system",
    maxWidth: 305,
    width: "100%",
    position: "relative",
  },
  selectList: {
    parent: "system",
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
  selectItem: {
    parent: "system",
    padding: "6px 16px",
    cursor: "pointer",

    "&:hover": {
      backgroundColor: "#ECEFF5",
      color: "#0F5AB6",
    },
  },
};
