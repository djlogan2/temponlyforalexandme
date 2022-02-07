import React, { FCICC } from "react";
import useTranslate from "/client/app/hooks/useTranslate";
import "./index.scss";

interface SmallParagraphProps {
  name: string;
  className?: string;
  link?: string;
}

const SmallParagraph: FCICC<SmallParagraphProps> = ({
  name,
  token,
  link,
  ...rest
}) => {
  const translation = useTranslate(token);

  return link ? (
    <a id={name} className="smallParagraphLink" href={link}>
      {translation}
    </a>
  ) : (
    <div id={name} className="smallParagraph" {...rest}>
      {translation}
    </div>
  );
};

export default SmallParagraph;
