import React, { FCICC } from "react";
import { useAppSelector } from "/client/app/store/hooks";

interface ParagraphProps {
  name: string;
  className?: string;
  link?: string;
}

const Paragraph: FCICC<ParagraphProps> = ({ name, token, link, ...rest }) => {
  const classes = useAppSelector((state) => state.theming.classes);

  return link ? (
    <a id={name} className={classes.paragraphLink} href={link}>
      {window.i18n.translate(token.token, ...token.args)}
    </a>
  ) : (
    <div id={name} className={classes.paragraph} {...rest}>
      {window.i18n.translate(token.token, ...token.args)}
    </div>
  );
};

export default Paragraph;
