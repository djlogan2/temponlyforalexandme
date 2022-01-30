import React, { FCICC } from "react";
import useTranslate from "/client/app/hooks/useTranslate";
import { useAppSelector } from "/client/app/store/hooks";

interface ParagraphProps {
  name: string;
  className?: string;
  link?: string;
}

const Paragraph: FCICC<ParagraphProps> = ({ name, token, link, ...rest }) => {
  const classes = useAppSelector((state) => state.theming.classes);
  const translation = useTranslate(token);

  return link ? (
    <a id={name} className={classes.paragraphLink} href={link}>
      {translation}
    </a>
  ) : (
    <div id={name} className={classes.paragraph} {...rest}>
      {translation}
    </div>
  );
};

export default Paragraph;
