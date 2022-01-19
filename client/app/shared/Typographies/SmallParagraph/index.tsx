import React, { FC } from "react";
import useStyles from "./styles";

interface SmallParagraphProps {
  name: string;
  className?: string;
  link?: string;
}

const SmallParagraph: FC<SmallParagraphProps> = ({
  name,
  children,
  link,
  ...rest
}) => {
  const classes = useStyles();

  return link ? (
    <a id={name} className={classes.link} href={link}>
      {children}
    </a>
  ) : (
    <div id={name} className={classes.smallParagraph} {...rest}>
      {children}
    </div>
  );
};

export default SmallParagraph;
