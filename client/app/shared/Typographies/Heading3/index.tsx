import React, { FC } from "react";
import useStyles from "./styles";

interface Heading3Props {
  name: string;
  className?: string;
}

const Heading3: FC<Heading3Props> = ({ name, children, ...rest }) => {
  const classes = useStyles();

  return (
    <div id={name} className={classes.heading3} {...rest}>
      {children}
    </div>
  );
};

export default Heading3;
