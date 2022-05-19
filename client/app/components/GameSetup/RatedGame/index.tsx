import clsx from "clsx";
import React from "react";
import { Card } from "../../Card";
import { Subtitle } from "../../Subtitle";
import "./index.scss";
import { useTranslate } from "/client/app/hooks";
import { Switch } from "/client/app/shared/Switch";

interface IRatedGameProps {
  className?: string;
}

export const RatedGame = ({ className }: IRatedGameProps) => {
  const { t } = useTranslate();

  return (
    <Card className={clsx("ratedGame d-flex space-between", className)}>
      <Subtitle>{t("ratedGame")}</Subtitle>
      <Switch name="rated" />
    </Card>
  );
};
