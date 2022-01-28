export default {
  checkboxDisabled: {
    parent: "system",
    "& $checkbox": {
      borderColor: "rgba(15, 90, 182, 0.5)",
    },

    "& $checkboxActive": {
      backgroundColor: "rgba(15, 90, 182, 0.5)",
      borderColor: "rgba(15, 90, 182, 0.5)",
    },
  },
  checkboxLabel: {
    parent: "system",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  checkboxCircled: {
    parent: "system",
    "& $checkbox": {
      borderRadius: "50%",
      border: "1px solid #019DF4",
    },

    "& $checkboxActive": {
      background: "#000",
    },
  },
  checkboxNative: {
    parent: "system",
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    whiteSpace: "nowrap",
    width: 1,
  },
  checkbox: {
    parent: "system",
    display: "inline-block",
    height: 22,
    width: 22,
    background: "#FFF",
    border: "1px #55586A solid",
    marginRight: 4,
    borderRadius: 2,
  },
  checkboxActive: {
    parent: "system",
    borderColor: "#0F5AB6",
    background: "#0F5AB6",
  },
};
