import clsx from "clsx";
import React, { FC } from "react";
import Input from "../../shared/Input";
import Card from "../Card";
import Mail from "../icons/Mail";
import Subtitle from "../Subtitle";
import "./index.scss";

interface ISendToMailProps {
  className?: string;
}

const SendToMail: FC<ISendToMailProps> = ({ className }) => (
  <Card className={clsx("sendToMail", className)}>
    <Subtitle className="sendToMail__subtitle" size="small">
      Send to mail
    </Subtitle>
    <Input
      name="link"
      label="Description"
      placeholder="Email"
      icon={<Mail />}
    />
  </Card>
);

export default SendToMail;
