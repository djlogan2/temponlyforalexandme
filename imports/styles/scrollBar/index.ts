export default {
  scrollBar: {
    parent: "system",
    height: 140,
    backgroundColor: "#F5F5F5",

    "&:hover $scrollBarThumbVertical": {
      backgroundColor: "#0F5AB6",
    },
  },

  scrollBarThumbVertical: {
    parent: "system",
    backgroundColor: "#888888",
    borderRadius: 15,
  },

  scrollBarTrackVertical: {
    parent: "system",
    backgroundColor: "#D2D2D2",
    width: 6,
    position: "absolute",
    right: 2,
    bottom: 2,
    top: 2,
    borderRadius: 15,
  },
};
