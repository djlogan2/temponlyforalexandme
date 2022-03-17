import React, { useState } from "react";
import Actions from "../Actions";
import BoardSetup from "../BoardSetupTab";
import ObserversTab from "../ObserversTab";
import Share from "../Share";
import { ETabs } from "./constants";
import "./index.scss";
import { TTabs } from "./types";
import TabButton from "/client/app/shared/Buttons/TabButton";

const AnalysisControlBox = () => {
  const [activeTab, setActiveTab] = useState<TTabs>(ETabs.ANALYSIS);
  const [showShare, setShowShare] = useState(false);

  return (
    <div className="analysisControlBox">
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
              Analysis
            </TabButton>
            <TabButton
              onClick={() => setActiveTab(ETabs.BOARDSETUP)}
              isColorless
              color={activeTab === ETabs.BOARDSETUP ? "secondary" : undefined}
            >
              Board Setup
            </TabButton>
            <TabButton
              onClick={() => setActiveTab(ETabs.OBSERVERS)}
              isColorless
              color={activeTab === ETabs.OBSERVERS ? "secondary" : undefined}
            >
              Observers
            </TabButton>
          </div>

          {activeTab === ETabs.OBSERVERS && <ObserversTab />}
          {activeTab === ETabs.BOARDSETUP && <BoardSetup />}

          <Actions onShareClick={() => setShowShare(true)} />
        </>
      )}
    </div>
  );
};

export default AnalysisControlBox;
