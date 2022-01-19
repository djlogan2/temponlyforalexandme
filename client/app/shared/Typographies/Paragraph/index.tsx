import React, { FC } from "react";
import useStyles from "./styles";

interface ParagraphProps {
  name: string;
  className?: string;
  link?: string;
}

const Paragraph: FC<ParagraphProps> = ({ name, children, link, ...rest }) => {
  const classes = useStyles();

  return link ? (
    <a id={name} className={classes.link} href={link}>
      {children}
    </a>
  ) : (
    <div id={name} className={classes.paragraph} {...rest}>
      {children}
    </div>
  );
};

export default Paragraph;
