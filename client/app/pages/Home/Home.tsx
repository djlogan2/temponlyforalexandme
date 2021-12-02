import * as React from "react";
import ClientICCServer from "../../../../imports/client/clienticcserver";

const Home = () => (
  <div
    style={{
      width: "100%",
      height: "98.41vh",
      padding: "0",
      margin: "0",
    }}
  >
    <button onClick={() => ClientICCServer.logout()}>logout</button>
    <img
      src="https://v2a.chessclub.com/images/home-page/home-top.jpg"
      alt="chess club"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  </div>
);

export default Home;
