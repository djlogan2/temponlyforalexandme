import React, { FC, HTMLAttributes } from "react";
import Draw from "/client/app/components/icons/Draw";
import More from "/client/app/components/icons/More";
import Resign from "/client/app/components/icons/Resign";
import ActionButton from "/client/app/shared/Buttons/ActionButton";

interface IActionsProps extends HTMLAttributes<HTMLDivElement> {}

const Actions: FC<IActionsProps> = ({ ...rest }) => (
  <div {...rest}>
    <ActionButton
      className="controlBox__action-btn"
      color="danger"
      size="small"
    >
      <Resign />
    </ActionButton>

    <ActionButton className="controlBox__action-btn" color="dark" size="medium">
      <Draw />
    </ActionButton>

    <ActionButton
      className="controlBox__action-btn"
      color="secondary"
      size="small"
    >
      <More className="controlBox__moreIcon" />
    </ActionButton>
  </div>
);

export default Actions;
