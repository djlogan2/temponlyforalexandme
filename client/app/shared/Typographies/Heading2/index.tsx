import React, { FC } from "react";
import useStyles from "./styles";

interface Heading2Props {
  name: string;
  className?: string;
}

const Heading2: FC<Heading2Props> = ({ name, children, ...rest }) => {
  const classes = useStyles();

  return (
    <div id={name} className={classes.heading2} {...rest}>
      {children}
    </div>
  );
};

export default Heading2;
