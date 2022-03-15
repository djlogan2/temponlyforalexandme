import clsx from "clsx";
import React, { FC } from "react";
import Input from "../../shared/Input";
import Card from "../Card";
import Copy from "../icons/Copy";
import Subtitle from "../Subtitle";
import "./index.scss";

interface IShareLinkProps {
  className?: string;
}

const ShareLink: FC<IShareLinkProps> = ({ className }) => (
  <Card className={clsx(className, "shareLink")}>
    <Subtitle className="shareLink__subtitle" size="small">
      Share this link with anyone to play
    </Subtitle>
    <Input name="link" label="Description" icon={<Copy />} />
  </Card>
);

export default ShareLink;
