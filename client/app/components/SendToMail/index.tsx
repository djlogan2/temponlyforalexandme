import clsx from "clsx";
import React, { FC } from "react";
import { useTranslate } from "../../hooks";
import Input from "../../shared/Input";
import Card from "../Card";
import Mail from "../icons/Mail";
import Subtitle from "../Subtitle";
import "./index.scss";

interface ISendToMailProps {
  className?: string;
}

const SendToMail: FC<ISendToMailProps> = ({ className }) => {
  const { t } = useTranslate();

  return (
    <Card className={clsx("sendToMail", className)}>
      <Subtitle className="sendToMail__subtitle" size="small">
        {t("sendToMail")}
      </Subtitle>
      <Input
        name="link"
        label={t("description")}
        placeholder={t("email")}
        icon={<Mail />}
      />
    </Card>
  );
};

export default SendToMail;
