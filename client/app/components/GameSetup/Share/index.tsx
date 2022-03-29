import React, { FC } from "react";
import Close from "../../icons/Close";
import OpenChallengeItem from "../../OpenChallengeItem";
import SendToMail from "../../SendToMail";
import ShareLink from "../../ShareLink";
import SocialMedia from "../../SocialMedia";
import { EComponents, ICommonGameSetup } from "../types";
import { useTranslate } from "/client/app/hooks";
import StandardButton from "/client/app/shared/Buttons/StandardButton";

interface IShareProps extends ICommonGameSetup {}

const Share: FC<IShareProps> = ({ navigate }) => {
  const { t } = useTranslate();

  return (
    <div className="share">
      <OpenChallengeItem
        className="share__challengeItem"
        username=""
        userStatus="offline"
        size="small"
        gameTime={15}
        icon={<Close className="share__closeIcon" />}
      />

      <ShareLink className="share__card" />
      <SendToMail className="share__card" />
      <SocialMedia className="share__card" />
      <StandardButton onClick={() => navigate(EComponents.CUSTOM)}>
        {t("cancel")}
      </StandardButton>
    </div>
  );
};

export default Share;
