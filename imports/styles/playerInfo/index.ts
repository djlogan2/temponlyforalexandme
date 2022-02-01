export default {
  "@media (max-width: 1024px)": {
    parent: "system",

    playerInfoContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },

    playerInfoContainerFlipped: {
      alignItems: "flex-start",
    },

    playerInfoIcons: {
      order: 2,
      margin: 0,
      width: 110,

      "& > :nth-child(2)": {
        display: "none",
      },
    },
    playerInfoUsername: {
      order: 1,
      margin: "0 6px",
    },
    playerInfoImgContainer: {
      width: 27.5,
      height: 27.5,
    },
  },

  "@media (max-width: 768px)": {
    parent: "system",

    playerInfoContainerFlipped: {
      flexDirection: "row-reverse",
      alignItems: "flex-end",

      "& $playerInfoUsername": {
        textAlign: "end",
      },

      "& $playerInfoImgContainer": {
        margin: "0 0 0 6px",
      },

      "& $playerInfoIcons": {},
    },

    playerInfoIcons: {
      order: 1,
      margin: 0,
      width: 80,

      "& > :nth-child(2)": {
        display: "none",
      },

      "& > :nth-child(1)": {
        display: "none",
      },
    },
    playerInfoUsername: {
      order: 2,
      margin: "6px 0 0 0",
      width: "100%",
    },
    playerInfoImgContainer: {
      width: 27.5,
      height: 27.5,
      marginRight: 6,
    },
  },

  playerInfoContainer: {
    parent: "system",
    boxSizing: "border-box",
    width: "max-content",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },

  playerInfoContainerFlipped: {
    parent: "system",
    flexDirection: "column-reverse",
  },

  playerInfoImgContainer: {
    parent: "system",
    width: 48,
    height: 48,
    borderRadius: "50%",
    overflow: "hidden",
  },

  playerInfoImgContainerOnline: {
    parent: "system",

    outline: "2px solid #00B817",
  },
  playerInfoImgContainerIdle: {
    parent: "system",

    outline: "2px solid #55586A",
  },
  playerInfoImgContainerUnavailable: {
    parent: "system",

    outline: "2px solid #0F5AB6",
  },
  playerInfoImgContainerOffline: {
    parent: "system",

    outline: "none",
  },

  playerInfoImg: {
    parent: "system",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  playerInfoIcons: {
    parent: "system",
    width: 143,
    display: "flex",
    justifyContent: "space-between",
    marginTop: "8px",
    marginBottom: "9px",
  },

  playerInfoUsername: {
    parent: "system",
    fontSize: "14px",
    color: "#55586A",
    margin: 0,
  },
};
