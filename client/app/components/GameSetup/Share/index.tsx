import React, { FC } from "react";
import Close from "../../icons/Close";
import Copy from "../../icons/Copy";
import Facebook from "../../icons/Facebook";
import Instagram from "../../icons/Instagram";
import Mail from "../../icons/Mail";
import Twitter from "../../icons/Twitter";
import OpenChallengeItem from "../../OpenChallengeItem";
import UserItem from "../../UserItem";
import Card from "../Card";
import Subtitle from "../Subtitle";
import { EComponents } from "../types";
import ActionButton from "/client/app/shared/Buttons/ActionButton";
import StandardButton from "/client/app/shared/Buttons/StandardButton";
import Input from "/client/app/shared/Input";

interface IShareProps {
  navigate: (tab: EComponents) => void;
}

const Share: FC<IShareProps> = ({ navigate }) => (
  <div className="share">
    <OpenChallengeItem
      className="share__challengeItem"
      username=""
      userStatus="offline"
      size="small"
      gameTime={15}
      icon={<Close className="share__closeIcon" />}
    />

    <Card className="share__card">
      <Subtitle className="share__subtitle" size="small">
        Share this link with anyone to play
      </Subtitle>
      <Input name="link" label="Description" icon={<Copy />} />
    </Card>
    <Card className="share__card">
      <Subtitle className="share__subtitle" size="small">
        Send to mail
      </Subtitle>
      <Input
        name="link"
        label="Description"
        placeholder="Email"
        icon={<Mail />}
      />
    </Card>
    <Card className="share__card">
      <Subtitle className="share__subtitle" size="small">
        Share social media
      </Subtitle>

      <div className="d-flex space-evenly">
        <ActionButton color="primary">
          <Instagram />
        </ActionButton>
        <ActionButton color="primary">
          <Facebook />
        </ActionButton>
        <ActionButton color="primary">
          <Twitter />
        </ActionButton>
        <ActionButton color="primary">
          <Instagram />
        </ActionButton>
      </div>
    </Card>
    <StandardButton onClick={() => navigate(EComponents.CUSTOM)}>
      Cancel
    </StandardButton>
  </div>
);

export default Share;
