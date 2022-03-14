import React, { FC, HTMLAttributes } from "react";
import SmallParagraph from "/client/app/shared/Typographies/SmallParagraph";

interface IOpeningNameProps extends HTMLAttributes<HTMLDivElement> {
  openingName: string;
}

const OpeningName: FC<IOpeningNameProps> = ({ openingName, ...rest }) => (
  <div {...rest}>
    <SmallParagraph>{openingName}</SmallParagraph>
  </div>
);

export default OpeningName;
