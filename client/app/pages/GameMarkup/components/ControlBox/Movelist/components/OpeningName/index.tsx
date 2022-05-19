import React, { FC, HTMLAttributes } from "react";
import { SmallParagraph } from "/client/app/shared/Typographies/SmallParagraph";

interface IOpeningNameProps extends HTMLAttributes<HTMLDivElement> {
  openingName: string;
}

export const OpeningName: FC<IOpeningNameProps> = ({
  openingName,
  ...rest
}) => (
  <div {...rest}>
    <SmallParagraph>{openingName}</SmallParagraph>
  </div>
);
