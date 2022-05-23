import React, { FC, useRef, useState } from "react";

import Backdrop from "/client/app/shared/Backdrop";
import ScrollBar from "/client/app/shared/ScrollBar";
import { useServices } from "/client/app/contexts/services";
import { useTranslate, useClickOutside } from "/client/app/hooks";

import { gameSetupComponents, title } from "./constants";
import { Components } from "./types";
import Controls from "./Controls";
import PlayOptions from "./PlayOptions";

type GameSetupProps = {
  onCloseModal: () => void;
};

const GameSetup: FC<GameSetupProps> = ({ onCloseModal }) => {
  const { t } = useTranslate();
  const { challengeService } = useServices();

  const [components, setComponent] = useState<Components[]>([
    Components.ANYONE,
  ]);
  const backdropRef = useRef<HTMLDivElement>(null);
  useClickOutside(backdropRef, onCloseModal);

  const currentTab = components[components.length - 1];

  const navigate = (component: Components) => {
    if (currentTab === component) {
      return;
    }

    setComponent((prev) => [...prev, component]);
  };

  const returnBack = () => {
    if (components.length === 1) {
      return;
    }

    const copiedComponents = [...components];
    copiedComponents.pop();
    setComponent(copiedComponents);
  };

  challengeService.buttonEvents.on("ready", () => {
    const buttons = challengeService.getButtons();
    console.log("COMPONENt: ", buttons);
  });

  const Component = gameSetupComponents[currentTab];

  return (
    <Backdrop>
      <div className="gameSetup" ref={backdropRef}>
        <ScrollBar
          autoHeight={false}
          height={768}
          style={{
            backgroundColor: "var(--colorOneThree)",
          }}
        >
          <div className="gameSetup__scrollContainer">
            <Controls onCloseModal={onCloseModal} onReturnBack={returnBack} />
            <div className="gameSetup__container">
              <div className="gameSetup__title">{t(title[currentTab])}</div>
              {currentTab !== Components.CHALLENGE && (
                <PlayOptions
                  onClick={(tab) => {
                    navigate(tab);
                  }}
                  gameOption={currentTab}
                />
              )}

              <Component navigate={navigate} onCloseModal={onCloseModal} />
            </div>
          </div>
        </ScrollBar>
      </div>
    </Backdrop>
  );
};

export default GameSetup;
