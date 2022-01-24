import React, { FC, FCICC } from "react";
import useStyles from "./styles";

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
  const classes = useStyles();

  return link ? (
    <a id={name} className={classes.link} href={link}>
      {window.i18n.translate(token.token, ...token.args)}
    </a>
  ) : (
    <div id={name} className={classes.smallParagraph} {...rest}>
      {window.i18n.translate(token.token, ...token.args)}
    </div>
  );
};

export default SmallParagraph;
