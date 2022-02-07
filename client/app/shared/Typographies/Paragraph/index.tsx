import React, { FCICC } from "react";
import useTranslate from "/client/app/hooks/useTranslate";
import "./index.scss";

interface ParagraphProps {
  name: string;
  className?: string;
  link?: string;
}

const Paragraph: FCICC<ParagraphProps> = ({ name, token, link, ...rest }) => {
  const translation = useTranslate(token);

  return link ? (
    <a id={name} className="paragraphLink" href={link}>
      {translation}
    </a>
  ) : (
    <div id={name} className="paragraph" {...rest}>
      {translation}
    </div>
  );
};

export default Paragraph;
