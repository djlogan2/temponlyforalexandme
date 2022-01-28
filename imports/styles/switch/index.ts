export default {
  switchToggle: {
    parent: "system",
    position: "relative",
    display: "inline-block",
    width: "35px",
    height: "18px",

    "& input[type='checkbox']": {
      display: "none",
    },

    "& input[type='checkbox']:checked + $switch::before": {
      transform: "translateX(17px)",
    },

    "& input[type='checkbox']:checked + $switch": {
      backgroundColor: "#0F5AB6",
      border: "1px solid #0F5AB6",
    },

    "& input[type='checkbox']:checked + $switch:before": {
      backgroundColor: "#FFF",
    },

    "& $switch:before": {
      position: "absolute",
      content: '""',
      left: "2px",
      top: "2px",
      width: "12px",
      height: "12px",
      backgroundColor: "#9698A1",
      borderRadius: "50%",
      transition: "0.3s ease",
    },
  },

  switch: {
    parent: "system",
    position: "absolute",
    cursor: "pointer",
    borderRadius: "25px",
    border: "1px solid #9698A1",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    transition: "0.2s ease",
  },
};
