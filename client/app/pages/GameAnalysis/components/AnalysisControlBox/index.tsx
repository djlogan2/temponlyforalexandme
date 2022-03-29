import clsx from "clsx";
import React, { useState } from "react";
import Actions from "./components/Actions";
import AnalysisTab from "./components/AnalysisTab";
import BoardSetup from "./components/BoardSetupTab";
import ObserversTab from "./components/ObserversTab";
import Share from "./components/Share";
import { ETabs } from "./constants";
import "./index.scss";
import { TTabs } from "./types";
import { useTranslate } from "/client/app/hooks";
import TabButton from "/client/app/shared/Buttons/TabButton";

interface IAnalysisControlBoxProps {
  className?: string;
}

const AnalysisControlBox = ({ className }: IAnalysisControlBoxProps) => {
  const [activeTab, setActiveTab] = useState<TTabs>(ETabs.ANALYSIS);
  const [showShare, setShowShare] = useState(false);
  const { t } = useTranslate();

  return (
    <div className={clsx("analysisControlBox", className)}>
      {showShare ? (
        <Share onBackHandler={() => setShowShare(false)} />
      ) : (
        <>
          <div className="analysisControlBox__tabs">
            <TabButton
              onClick={() => setActiveTab(ETabs.ANALYSIS)}
              isColorless
              color={activeTab === ETabs.ANALYSIS ? "secondary" : undefined}
            >
              {t("analysis")}
            </TabButton>
            <TabButton
              onClick={() => setActiveTab(ETabs.BOARDSETUP)}
              isColorless
              color={activeTab === ETabs.BOARDSETUP ? "secondary" : undefined}
            >
              {t("boardSetup")}
            </TabButton>
            <TabButton
              onClick={() => setActiveTab(ETabs.OBSERVERS)}
              isColorless
              color={activeTab === ETabs.OBSERVERS ? "secondary" : undefined}
            >
              {t("observers")}
            </TabButton>
          </div>

          {activeTab === ETabs.ANALYSIS && <AnalysisTab />}
          {activeTab === ETabs.BOARDSETUP && <BoardSetup />}
          {activeTab === ETabs.OBSERVERS && <ObserversTab />}

          <Actions onShareClick={() => setShowShare(true)} />
        </>
      )}
    </div>
  );
};

export default AnalysisControlBox;
