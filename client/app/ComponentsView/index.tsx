import React, { FCICC } from "react";
import "./index.scss";
import { useHistory } from "react-router-dom";
import Movelist from "../components/Movelist";
import Avatar from "../shared/Avatar";
import StandardButton from "../shared/Buttons/StandardButton";
import CapturedPieces from "/client/app/components/CapturedPieces";
import DummyChessboard from "/client/app/components/DummyChessboard";
import PlayerInfo from "/client/app/components/PlayerInfo";
import ActionButton from "/client/app/shared/Buttons/ActionButton";
import Checkbox from "/client/app/shared/Checkbox";
import DigitalClock from "/client/app/shared/Clocks/DigitalClock";
import GameTitle from "/client/app/shared/GameTitle";
import Input from "/client/app/shared/Input";
import Select from "/client/app/shared/Select";
import Switch from "/client/app/shared/Switch";
import TextArea from "/client/app/shared/TextArea";
import Heading1 from "/client/app/shared/Typographies/Heading1";
import Heading2 from "/client/app/shared/Typographies/Heading2";
import Heading3 from "/client/app/shared/Typographies/Heading3";
import Heading4 from "/client/app/shared/Typographies/Heading4";
import Heading5 from "/client/app/shared/Typographies/Heading5";
import Heading6 from "/client/app/shared/Typographies/Heading6";
import Paragraph from "/client/app/shared/Typographies/Paragraph";
import SmallParagraph from "/client/app/shared/Typographies/SmallParagraph";
import Title from "/client/app/shared/Typographies/Title";
import Backdrop from "../shared/Backdrop";
import GameSetup from "../components/GameSetup";

interface IComponentsView {}

const ComponentsView: FCICC<IComponentsView> = () => {
  const history = useHistory();

  return (
    <div className="container">
      <div className="elements-container">
        <div>
          <Avatar
            picture="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            username="username"
            status="online"
          />
        </div>
        <div>
          <h2>Buttons</h2>
          <ActionButton
            name="fakeButton"
            hoverText="report"
            token={{ token: "FAKE_BUTTON", args: [] }}
            keyboardFunctions={[]}
            classes={[]}
          >
            M
          </ActionButton>

          <ActionButton
            name="fakeButton"
            hoverText="1234"
            token={{ token: "FAKE_BUTTON", args: [] }}
            disabled
            keyboardFunctions={[]}
            classes={[]}
          >
            M
          </ActionButton>

          <StandardButton>Button</StandardButton>
          <StandardButton color="blue">Button</StandardButton>
          <StandardButton disabled>Button</StandardButton>
        </div>
        <CapturedPieces color="black" soliders={{ k: 3, q: 2, p: 4 }} />
        {/* <DigitalClock
          time="00:00:30"
          keyboardFunctions={[]}
          token={{
            token: "",
            args: [],
          }}
          classes={[]}
          status="in"
        /> */}
        <GameSetup />
        <div>
          <h2>Movelist</h2>
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
        </div>
        <GameTitle
          minutes={10}
          instance="game_title_semifinal"
          date="May 22, 2022"
          keyboardFunctions={[]}
          token={{
            token: "",
            args: [],
          }}
          classes={[]}
        />

        <Title
          name="test"
          token={{ token: "FAKE_TEXT", args: [] }}
          keyboardFunctions={[]}
          classes={[]}
        />
        <div>
          <h1>PlayerInfo component</h1>

          <div>
            <PlayerInfo
              userStatus="online"
              picture="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              rank={2500}
              username="Grand_Master01"
              title="WGM"
              lagLevel={3}
            />
            <PlayerInfo
              userStatus="online"
              picture="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              rank={2500}
              username="Grand_Master01"
              title="GM"
              lagLevel={1}
              flip
            />
          </div>
        </div>
        <Heading1>Heading 1</Heading1>
        <Heading2>Heading 2</Heading2>
        <Heading3>Heading 3</Heading3>
        <Heading4>Heading 4</Heading4>
        <Heading5>Heading 5</Heading5>
        <Heading6>Heading 6</Heading6>
        <Paragraph
          name="testPar"
          token={{ token: "FAKE_TEXT", args: [] }}
          keyboardFunctions={[]}
          classes={[]}
        />
        <Paragraph
          name="testParLink"
          link="https://www.google.com"
          token={{ token: "FAKE_TEXT", args: [] }}
          keyboardFunctions={[]}
          classes={[]}
        />
        <SmallParagraph
          name="testSmallPar"
          token={{ token: "FAKE_TEXT", args: [] }}
          keyboardFunctions={[]}
          classes={[]}
        />
        <SmallParagraph
          name="testSmallParLink"
          link="https://www.google.com"
          token={{ token: "FAKE_TEXT", args: [] }}
          keyboardFunctions={[]}
          classes={[]}
        />
        <Input
          name="fakeInput1"
          keyboardFunctions={[]}
          classes={[]}
          token={{
            token: "FAKE_INPUT",
            args: [],
          }}
          msgText={{
            token: "FAKE_MSG_TEXT",
            args: [],
          }}
        />
        <Input
          error
          name="fakeInput2"
          keyboardFunctions={[]}
          classes={[]}
          token={{
            token: "FAKE_INPUT",
            args: [],
          }}
          msgText={{
            token: "FAKE_MSG_TEXT",
            args: [],
          }}
        />
        <Input
          type="password"
          name="fakeInput3"
          keyboardFunctions={[]}
          classes={[]}
          token={{
            token: "FAKE_INPUT",
            args: [],
          }}
          msgText={{
            token: "FAKE_MSG_TEXT",
            args: [],
          }}
        />
        <Select
          options={["Fake item 1", "Fake item 2"]}
          onSelect={() => null}
          keyboardFunctions={[]}
          classes={[]}
          token={{
            token: "FAKE_INPUT",
            args: [],
          }}
          placeHolder={{
            token: "FAKE_PLACEHOLDER",
            args: [],
          }}
        />

        <div>
          <Switch
            name="fakeSwitch1"
            keyboardFunctions={[]}
            classes={[]}
            token={{
              token: "",
              args: [],
            }}
          />
        </div>
        <Checkbox
          name="fakeCheckbox1"
          keyboardFunctions={[]}
          classes={[]}
          token={{
            token: "",
            args: [],
          }}
        />
        <Checkbox
          name="fakeCheckbox2"
          disabled
          keyboardFunctions={[]}
          classes={[]}
          token={{
            token: "",
            args: [],
          }}
        />
        <TextArea
          name="fakeTextArea1"
          keyboardFunctions={[]}
          classes={[]}
          token={{
            token: "FAKE_INPUT",
            args: [],
          }}
          msgText={{
            token: "FAKE_MSG_TEXT",
            args: [],
          }}
          placeHolder={{
            token: "FAKE_PLACEHOLDER",
            args: [],
          }}
        />
      </div>
      <div className="board-contaier">
        <ActionButton
          name="redirect-button"
          hoverText="Click on me!"
          keyboardFunctions={[]}
          token={{
            token: "Play page",
            args: [],
          }}
          classes={[]}
          onButtonClick={() => {
            history.push("/game");
          }}
        />
        <div className="board-wrapper">
          {/* @ts-ignore */}
          <DummyChessboard />
        </div>
      </div>
    </div>
  );
};

export default ComponentsView;
