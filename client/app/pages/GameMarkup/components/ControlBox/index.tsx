import clsx from "clsx";
import React, { FC, useState } from "react";
import TabButton from "../../../../shared/Buttons/TabButton";
import Actions from "./Actions";
import Chat from "./Chat";
import { tabs } from "./constants";
import "./index.scss";
import Movelist from "./Movelist";
import { ETabs, TTabs } from "./types";
import { useTranslate } from "/client/app/hooks";
import { TMoveItem } from "/client/app/types";

interface IControlBoxProps {
  moves: TMoveItem[];
  messages: { id: string; me?: boolean; text: string }[];
  onResign: () => void;
  className?: string;
}

const ControlBox: FC<IControlBoxProps> = ({
  moves,
  messages,
  className,
  onResign,
}) => {
  const [openedTab, setOpenedTab] = useState<TTabs>(ETabs.MOVELIST);
  const { t } = useTranslate();

  return (
    <div className={clsx("controlBox", className)}>
      <div className="controlBox__buttons d-flex justify-center">
        {tabs.map((tab, i) => (
          <TabButton
            key={tab}
            onClick={() => setOpenedTab(i as TTabs)}
            color={openedTab === i ? "primary" : undefined}
            isColorless
          >
            {t(tab)}
          </TabButton>
        ))}
      </div>

      {openedTab === ETabs.MOVELIST && <Movelist moves={moves} />}
      {openedTab === ETabs.CHAT && <Chat messages={messages} />}

      <Actions className="controlBox__actions" onResign={onResign} />
    </div>
  );
};

export default ControlBox;
