import React from "react";
import ImportPgn from "./components/ImportPgn";
import GameControls from "/client/app/components/GameControls";
import LongArrow from "/client/app/components/icons/LongArrow";
import Input from "/client/app/shared/Input";
import "./index.scss";
import Accordeon from "./components/Accordeon";
import Checkbox from "/client/app/shared/Checkbox";
import Switch from "/client/app/shared/Switch";
import ScrollBar from "/client/app/shared/ScrollBar";

const BoardSetup = () => (
  <ScrollBar className="boardSetupTab__scroll">
    <div className="boardSetupTab">
      <Accordeon title="Load opening" className="boardSetupTab__row">
        <p className="boardSetupTab__opening">Openening name 1</p>
        <p className="boardSetupTab__opening">Openening name 1</p>
        <p className="boardSetupTab__opening">Openening name 1</p>
      </Accordeon>
      <Accordeon title="Move settings" className="boardSetupTab__row">
        <div className="d-flex space-between boardSetupTab__colorToMove">
          <Checkbox circled name="whiteToMove" text="White to move" />
          <Checkbox circled name="blackToMove" text="Black to move" />
          <Switch name="enPassant" text="En passant" />
        </div>
        <div className="d-flex space-between">
          <div className="boardSetupTab__castling">
            <span className="boardSetupTab__castling-title">
              White Castling
            </span>
            <Checkbox name="white-(0-0)" text="(0-0)" checked />
            <Checkbox name="white-(0-0-0)" text="(0-0-0)" />
          </div>
          <div className="boardSetupTab__castling">
            <span className="boardSetupTab__castling-title">
              Black Castling
            </span>
            <Checkbox name="black-(0-0)" text="(0-0)" checked />
            <Checkbox name="black-(0-0-0)" text="(0-0-0)" />
          </div>
        </div>
      </Accordeon>
      <Accordeon title="PGN detail" />
      <GameControls
        className="boardSetupTab__row boardSetupTab__gameControls"
        onNextClick={() => {}}
        onNextEndClick={() => {}}
        onPrevClick={() => {}}
        onPrevEndClick={() => {}}
      />
      <div className="boardSetupTab__row">
        <Input
          name="loadFen"
          label="Load FEN"
          icon={<LongArrow className="boardSetupTab__longArrowIcon" />}
        />
      </div>
      <div className="boardSetupTab__row">
        <ImportPgn />
      </div>
    </div>
  </ScrollBar>
);

export default BoardSetup;
