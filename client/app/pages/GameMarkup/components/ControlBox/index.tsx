import React, { FC, useState } from "react";

import clsx from "clsx";

import { useTranslate } from "/client/app/hooks";
import { MoveItem } from "/client/app/types";
import { TabButton } from "/client/app/shared/Buttons/TabButton";

import { ETabs, TTabs } from "./types";
import { tabs } from "./constants";
import { Actions } from "./Actions";
import { Chat } from "./Chat";
import { Movelist } from "./Movelist";
import "./index.scss";

type ControlBoxProps = {
  moves: MoveItem[];
  messages: { id: string; me?: boolean; text: string }[];
  onResign: () => void;
  className?: string;
};

export const ControlBox: FC<ControlBoxProps> = ({
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
