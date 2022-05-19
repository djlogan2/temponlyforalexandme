import clsx from "clsx";
import React, { FC } from "react";
import { useTranslate } from "../../hooks";
import { ActionButton } from "../../shared/Buttons/ActionButton";
import { Card } from "../Card";
import { Facebook } from "../icons/Facebook";
import { Instagram } from "../icons/Instagram";
import { Twitter } from "../icons/Twitter";
import { Subtitle } from "../Subtitle";
import "./index.scss";

type SocialMediaProps = {
  className?: string;
};

export const SocialMedia: FC<SocialMediaProps> = ({ className }) => {
  const { t } = useTranslate();

  return (
    <Card className={clsx("socialMedia", className)}>
      <Subtitle className="socialMedia__subtitle" size="small">
        {t("shareSocialMedia")}
      </Subtitle>

      <div className="d-flex space-evenly socialMeda__actions">
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
  );
};
