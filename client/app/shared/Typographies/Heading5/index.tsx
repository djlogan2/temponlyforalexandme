import React, { FC } from "react";
import useStyles from "./styles";

interface Heading5Props {
  name: string;
  className?: string;
}

const Heading5: FC<Heading5Props> = ({ name, children, ...rest }) => {
  const classes = useStyles();

  return (
    <div id={name} className={classes.heading5} {...rest}>
      {children}
    </div>
  );
};

export default Heading5;
