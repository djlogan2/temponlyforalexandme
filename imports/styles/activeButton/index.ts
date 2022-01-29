export default {
  activeButton: {
    parent: "button",
    backgroundColor: "purple",
  },

  activeButtonContainer: {
    parent: "system",
    position: "relative",
    width: "min-content",
    "& $activeButton:active + $activeButtonHoverElement": {
      opacity: 0,
    },
    "&:hover": {
      "& $activeButton:disabled + $activeButtonHoverElement": {
        opacity: 0,
      },
      "& $activeButton:disabled": {
        backgroundColor: "#55586A",
      },
      "& $activeButtonHoverElement": {
        opacity: 1,
      },
      "& $activeButton": {
        backgroundColor: "#131314",
      },
    },
  },

  activeButtonHoverElement: {
    parent: "system",
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
};
