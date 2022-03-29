import React from "react";
import "./index.scss";
import GameControls from "/client/app/components/GameControls";
import Settings from "/client/app/components/icons/Settings";
import Moves from "/client/app/components/Moves";
import { useTranslate } from "/client/app/hooks";
import Switch from "/client/app/shared/Switch";

const AnalysisTab = () => {
  const { t } = useTranslate();

  return (
    <div className="analysisTab">
      <div className="analysisTab__row analysisTab__settings">
        <Switch name="computerAnalysis" text={t("computerAnalysis")} />
        <Switch name="engine" text={t("engine")} />
        <Settings className="pointer analysisTab__settingsIcon" />
      </div>
      <p className="analysisTab__row analysisTab__opening">
        Nimzowitsch Defense: Scandinavian, Advance Variation
      </p>
      <GameControls
        className="analysisTab__row analysisTab__controls"
        onNextClick={() => {}}
        onNextEndClick={() => {}}
        onPrevClick={() => {}}
        onPrevEndClick={() => {}}
      />

      <Moves className="analysisTab__moves" moves={[]} />
    </div>
  );
};

export default AnalysisTab;
