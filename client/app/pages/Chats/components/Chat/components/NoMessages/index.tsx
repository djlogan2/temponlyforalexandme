import React from "react";

const NoMessages = () => {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "30px",
      }}
    >
      No messages yet...
    </div>
  );
};

export default NoMessages;
