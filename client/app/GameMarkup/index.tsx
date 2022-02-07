import DummyChessboard from "/client/app/components/DummyChessboard";
import Flip from "/client/app/components/icons/Flip";
import Movelist from "/client/app/components/Movelist";
import PlayerInfo from "/client/app/components/PlayerInfo";
import DigitalClock from "/client/app/shared/Clocks/DigitalClock";
import GameTitle from "/client/app/shared/GameTitle";
import React, { FCICC } from "react";

interface IGameMarkup {}

const GameMarkup: FCICC<IGameMarkup> = () => (
  <div
    style={{
      display: "flex",
      padding: "5%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      boxSizing: "border-box",
      height: "100%",
    }}
  >
    <div
      style={{
        display: "flex",
        height: `${(576 / 1366) * 100}vw`,
        flexDirection: "column",
        marginRight: "3%",
        justifyContent: "space-between",
      }}
    >
      <PlayerInfo
        userStatus="online"
        picture="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        rank={2500}
        username="Grand_Master01"
        title="WGM"
        lagLevel={3}
        keyboardFunctions={[]}
        classes={[]}
        token={{ token: "FAKE_TEXT", args: [] }}
      />
      <PlayerInfo
        userStatus="online"
        picture="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        rank={2500}
        username="Grand_Master02"
        title="GM"
        lagLevel={5}
        keyboardFunctions={[]}
        classes={[]}
        token={{ token: "FAKE_TEXT", args: [] }}
      />
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <div style={{ marginBottom: "1%" }}>
        <GameTitle
          minutes={15}
          keyboardFunctions={[]}
          token={{
            token: "",
            args: [],
          }}
          classes={[]}
        />
      </div>
      <DummyChessboard />
      <div style={{ textAlign: "right", marginTop: "1%" }}>
        <Flip onClick={() => null} />
      </div>
    </div>
    <div
      style={{
        display: "flex",
        height: `${(576 / 1366) * 100}vw`,
        flexDirection: "column",
        marginLeft: "1.5%",
        justifyContent: "space-between",
      }}
    >
      <DigitalClock
        time="00:00:29"
        status="in"
        keyboardFunctions={[]}
        token={{
          token: "",
          args: [],
        }}
        classes={[]}
      />
      <Movelist
        openingName="FAKE_TEXT"
        token={{ token: "FAKE_TEXT", args: [] }}
        keyboardFunctions={[]}
        classes={[]}
        moves={new Array(10).fill(0).map((_, i) => ({
          first: {
            move: `c${i}`,
            piece: "q",
          },
          second: {
            move: `d${i}`,
            piece: "n",
          },
        }))}
      />
      <DigitalClock
        time="00:00:30"
        status="inactive"
        keyboardFunctions={[]}
        token={{
          token: "",
          args: [],
        }}
        classes={[]}
      />
    </div>
  </div>
);

export default GameMarkup;
