import React, { FCICC } from "react";
import "./index.scss";
import DummyChessboard from "/client/app/components/DummyChessboard";
import Flip from "/client/app/components/icons/Flip";
import Movelist from "/client/app/components/Movelist";
import PlayerInfo from "/client/app/components/PlayerInfo";
import DigitalClock from "/client/app/shared/Clocks/DigitalClock";
import GameTitle from "/client/app/shared/GameTitle";

interface IGameMarkup {}

const GameMarkup: FCICC<IGameMarkup> = () => (
  <div className="container">
    <div className="player-info-container">
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
    <div className="center-container">
      <div className="game-title-container">
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
      <div className="flip-container">
        <Flip onClick={() => null} />
      </div>
    </div>
    <div className="move-list-container">
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
