import React, { useState } from "react";
import GameSetup from "../../components/GameSetup";
import useTranslate from "../../hooks/useTranslate";
import Avatar from "../../shared/Avatar";
import StandardButton from "../../shared/Buttons/StandardButton";
import "./index.scss";
import CapturedPieces from "/client/app/components/CapturedPieces";
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

const ComponentsView = () => {
  const [showGameSetupModal, setShowGameSetupModal] = useState(false);
  const { t } = useTranslate();

  return (
    <div className="container">
      <p>{t("TEST_TOKEN")}</p>
      <div className="elements-container">
        <StandardButton onClick={() => setShowGameSetupModal(true)}>
          Game setup
        </StandardButton>
        {showGameSetupModal && (
          <GameSetup onCloseModal={() => setShowGameSetupModal(false)} />
        )}
        <img alt="test svg" className="testSvg" />
        <div>
          <Avatar
            picture="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            status="online"
            alt="test picture"
          />
        </div>
        <div>
          <h2>Buttons</h2>
          <ActionButton name="fakeButton" hoverText="report">
            M
          </ActionButton>

          <ActionButton name="fakeButton" hoverText="1234" disabled>
            M
          </ActionButton>

          <StandardButton>Button</StandardButton>
          <StandardButton color="primary">Button</StandardButton>
          <StandardButton disabled>Button</StandardButton>
        </div>
        <CapturedPieces color="black" soliders={{ k: 3, q: 2, p: 4 }} />
        <DigitalClock time={3000} isMyTurn />
        <GameTitle
          minutes={10}
          instance="game_title_semifinal"
          date="May 22, 2022"
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
        <Paragraph>Paragraph</Paragraph>
        <Paragraph link="https://www.google.com">Link</Paragraph>
        <SmallParagraph>Small Paragraph</SmallParagraph>
        <SmallParagraph link="https://www.google.com">
          Small Link Paragraph
        </SmallParagraph>
        <Input name="input1" label="Input1" />
        <Input name="input2" label="Input2" error errorText="Error text" />
        <Input name="input2" label="Input2" disabled />
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
          <Switch name="fakeSwitch1" />
        </div>
        <Checkbox name="fakeCheckbox1" />
        <Checkbox name="fakeCheckbox2" disabled />
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
        <div className="board-wrapper">{/* @ts-ignore */}</div>
      </div>
    </div>
  );
};

export default ComponentsView;
