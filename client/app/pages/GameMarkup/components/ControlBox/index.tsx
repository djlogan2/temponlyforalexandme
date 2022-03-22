import clsx from "clsx";
import React, { FC, useState } from "react";
import TabButton from "../../../../shared/Buttons/TabButton";
import { IMoveItem } from "../../../../components/Movelist";
import Actions from "./Actions";
import Chat from "./Chat";
import { tabs } from "./constants";
import "./index.scss";
import Movelist from "./Movelist";
import { ETabs, TTabs } from "./types";

interface IControlBoxProps {
  moves: IMoveItem[];
  messages: { id: string; me?: boolean; text: string }[];
  className?: string;
}

const ControlBox: FC<IControlBoxProps> = ({ moves, messages, className }) => {
  const [openedTab, setOpenedTab] = useState<TTabs>(ETabs.MOVELIST);

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
            {tab}
          </TabButton>
        ))}
      </div>

      {openedTab === ETabs.MOVELIST && <Movelist moves={moves} />}
      {openedTab === ETabs.CHAT && <Chat messages={messages} />}

      <Actions className="controlBox__actions" />
    </div>
  );
};

export default ControlBox;
