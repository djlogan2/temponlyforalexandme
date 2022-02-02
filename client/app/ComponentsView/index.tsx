import React, { FCICC } from "react";
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

interface IComponentsView {}

const ComponentsView: FCICC<IComponentsView> = () => (
  <div style={{ display: "flex", margin: "25px" }}>
    <div
      style={{
        width: "50vw",
        height: "calc(100% - 60px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <CapturedPieces color="black" soliders={{ k: 3, q: 2, p: 4 }} />
      <ActionButton
        name="fakeButton"
        hoverText="1234"
        token={{ token: "FAKE_BUTTON", args: [] }}
        keyboardFunctions={[]}
        classes={[]}
      />
      <DigitalClock
        time="00:00:30"
        keyboardFunctions={[]}
        token={{
          token: "",
          args: [],
        }}
        classes={[]}
        status="in"
      />
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
      <ActionButton
        name="fakeButton"
        hoverText="1234"
        token={{ token: "FAKE_BUTTON", args: [] }}
        disabled
        keyboardFunctions={[]}
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
            keyboardFunctions={[]}
            classes={[]}
            token={{ token: "FAKE_TEXT", args: [] }}
          />
          <div
            style={{
              padding: "10px",
            }}
          />
          <PlayerInfo
            userStatus="online"
            picture="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            rank={2500}
            username="Grand_Master01"
            title="GM"
            lagLevel={1}
            keyboardFunctions={[]}
            classes={[]}
            token={{ token: "FAKE_TEXT", args: [] }}
            flip
          />
        </div>
      </div>
      <Heading1
        name="test1"
        token={{ token: "FAKE_TEXT", args: [] }}
        keyboardFunctions={[]}
        classes={[]}
      />
      <Heading2
        name="test2"
        token={{ token: "FAKE_TEXT", args: [] }}
        keyboardFunctions={[]}
        classes={[]}
      />
      <Heading3
        name="test3"
        token={{ token: "FAKE_TEXT", args: [] }}
        keyboardFunctions={[]}
        classes={[]}
      />
      <Heading4
        name="test4"
        token={{ token: "FAKE_TEXT", args: [] }}
        keyboardFunctions={[]}
        classes={[]}
      />
      <Heading5
        name="test5"
        token={{ token: "FAKE_TEXT", args: [] }}
        keyboardFunctions={[]}
        classes={[]}
      />
      <Heading6
        name="test6"
        token={{ token: "FAKE_TEXT", args: [] }}
        keyboardFunctions={[]}
        classes={[]}
      />
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
    <div
      style={{
        width: "100%",
        height: "calc(100vh - 60px)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "40%", height: "auto" }}>
        <DummyChessboard />
      </div>
    </div>
  </div>
);

export default ComponentsView;
