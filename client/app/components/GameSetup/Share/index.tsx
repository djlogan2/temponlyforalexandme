import React, { FC } from "react";
import Close from "../../icons/Close";
import OpenChallengeItem from "../../OpenChallengeItem";
import SendToMail from "../../SendToMail";
import ShareLink from "../../ShareLink";
import SocialMedia from "../../SocialMedia";
import { Components, CommonGameSetup } from "../types";
import { useTranslate } from "/client/app/hooks";
import StandardButton from "/client/app/shared/Buttons/StandardButton";

type ShareProps = CommonGameSetup;

const Share: FC<ShareProps> = ({ navigate }) => {
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
      <StandardButton onClick={() => navigate(Components.CUSTOM)}>
        {t("cancel")}
      </StandardButton>
    </div>
  );
};

export default Share;
