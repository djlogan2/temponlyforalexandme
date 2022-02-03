export default {
  activeButton: {
    parent: "button",
    borderRadius: "50%",
  },

  activeButtonDark: {
    parent: "system",
    backgroundColor: "#131314",
  },
  activeButtonRed: {
    parent: "system",
    backgroundColor: "#FF0000",
  },
  activeButtonDarkLight: {
    parent: "system",
    backgroundColor: "#55586A",
  },
  activeButtonMedium: {
    parent: "system",
    width: 48,
    height: 48,
  },
  activeButtonSmall: {
    parent: "system",
    width: 36,
    height: 36,
  },
  activeButtonBig: {
    parent: "system",
    width: 52,
    height: 52,
  },

  activeButtonContainer: {
    parent: "system",
    position: "relative",
    width: "min-content",
    "& $activeButton:active + $activeButtonHoverElement": {
      opacity: 0,
    },
  },

  activeButtonContainerHover: {
    parent: "system",
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
