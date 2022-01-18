import React, { FC } from "react";
import useStyles from "./styles";

interface Heading6Props {
  name: string;
  className?: string;
}

const Heading6: FC<Heading6Props> = ({ name, children, ...rest }) => {
  const classes = useStyles();

  return (
    <div id={name} className={classes.heading6} {...rest}>
      {children}
    </div>
  );
};

export default Heading6;
