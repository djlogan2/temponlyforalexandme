import React from "react";
import SocialMedia from "/client/app/components/SocialMedia";
import "./index.scss";
import SendToMail from "/client/app/components/SendToMail";
import ShareLink from "/client/app/components/ShareLink";
import SearchPeople from "/client/app/components/SearchPeople";
import Arrow from "/client/app/components/icons/Arrow";
import Heading4 from "/client/app/shared/Typographies/Heading4";

interface IShareProps {
  onBackHandler: () => void;
}

const Share = ({ onBackHandler }: IShareProps) => (
  <div className="share">
    <div className="share__header">
      <button className="share__btnBack" type="button" onClick={onBackHandler}>
        <Arrow className="share__backIcon" />
        <span>Back</span>
      </button>

      <Heading4 className="share__title">Share Class name</Heading4>
    </div>
    <div className="share__content">
      <ShareLink className="share__card" />
      <SearchPeople subtitle="Invite to Analysis" />
      <SendToMail className="share__card" />
      <SocialMedia className="share__card" />
    </div>
  </div>
);

export default Share;
