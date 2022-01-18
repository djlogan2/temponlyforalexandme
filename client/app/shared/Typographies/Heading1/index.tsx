import React, { FC } from "react";
import useStyles from "./styles";

interface Heading1Props {
  name: string;
  className?: string;
}

const Heading1: FC<Heading1Props> = ({ name, children, ...rest }) => {
  const classes = useStyles();

  return (
    <div id={name} className={classes.heading1} {...rest}>
      {children}
    </div>
  );
};

export default Heading1;
