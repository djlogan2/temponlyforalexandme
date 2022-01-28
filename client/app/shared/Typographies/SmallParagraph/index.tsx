import React, { FCICC } from "react";
import { useAppSelector } from "/client/app/store/hooks";

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
  const classes = useAppSelector((state) => state.theming.classes);

  return link ? (
    <a id={name} className={classes.smallParagraphLink} href={link}>
      {window.i18n.translate(token.token, ...token.args)}
    </a>
  ) : (
    <div id={name} className={classes.smallParagraph} {...rest}>
      {window.i18n.translate(token.token, ...token.args)}
    </div>
  );
};

export default SmallParagraph;
