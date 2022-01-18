import React, { FC } from "react";
import useStyles from "./styles";

interface TitleProps {
  name: string;
  className?: string;
}

const Title: FC<TitleProps> = ({ name, children, ...rest }) => {
  const classes = useStyles();

  return (
    <div id={name} className={classes.title} {...rest}>
      {children}
    </div>
  );
};

export default Title;
