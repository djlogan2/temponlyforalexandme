import React, { FC, useRef, useState } from "react";
import { useTranslate } from "../../hooks";
import useOnClickOutside from "../../hooks/useClickOutside";
import Backdrop from "../../shared/Backdrop";
import ScrollBar from "../../shared/ScrollBar";
import { gameSetupComponents, title } from "./constants";
import Controls from "./Controls";
import PlayOptions from "./PlayOptions";
import { EComponents } from "./types";
import { challenges } from "/client/app/Root";

interface IGameSetupProps {
  onCloseModal: () => void;
}

const GameSetup: FC<IGameSetupProps> = ({ onCloseModal }) => {
  const { t } = useTranslate();

  const [components, setComponent] = useState<EComponents[]>([
    EComponents.ANYONE,
  ]);
  const backdropRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(backdropRef, onCloseModal);

  const currentTab = components[components.length - 1];

  const navigate = (component: EComponents) => {
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

  challenges.buttonEvents.on("ready", () => {
    const buttons = challenges.getButtons();
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
              {currentTab !== EComponents.CHALLENGE && (
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
