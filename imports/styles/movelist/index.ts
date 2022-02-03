export default {
  movelistContainer: {
    parent: "system",
    background: "#fff",
    borderRadius: "15px",
    padding: "10px",
    filter: "drop-shadow(0px 4px 25px rgba(0, 0, 0, 0.12))",
    width: "180px",
  },
  movelistOpeningNameContainer: {
    parent: "system",
    padding: "10px",
    backgroundColor: "#F5F5F5",
    borderRadius: "8px",
    width: "160px",
    marginBottom: "10px",
  },
  movelistOpeningName: {
    parent: "system",
    color: "#55586A",
  },
  movelistMovesContainer: {
    parent: "system",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: "10px 0",
    marginBottom: 2,
    "@media (max-width: 1024px)": {
      padding: "3.5px 0 6.5px 0",
    },
  },
  movelistMoves: {
    parent: "system",
    padding: "0 14px",
    height: 138,

    "@media (max-width: 1024px)": {
      height: 70,
    },
  },
  movelistItem: {
    parent: "system",
    fontSize: "12px",
    padding: "0 2px",
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
    margin: 0,

    "&:not(:last-child)": {
      marginBottom: 4,
    },

    "&:not(:last-child):after": {
      content: "''",
      position: "absolute",
      bottom: -2,
      width: "100%",
      height: 1,
      backgroundColor: "#000",
      opacity: 0.05,
    },

    "&:last-child > div:last-child": {
      background: "#131314",
      color: "#fff",
      fill: "black",
      borderRadius: 2,
    },
  },

  movelistActions: {
    parent: "system",
    display: "flex",
    justifyContent: "space-evenly",
  },

  movelistTopActions: {
    parent: "system",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: "17.34px 28.13px",
    marginBottom: 2,
    display: "flex",
    justifyContent: "space-between",
  },
};
