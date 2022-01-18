import React, { FC } from "react";
import useStyles from "./styles";

interface Heading4Props {
  name: string;
  className?: string;
}

const Heading4: FC<Heading4Props> = ({ name, children, ...rest }) => {
  const classes = useStyles();

  return (
    <div id={name} className={classes.heading4} {...rest}>
      {children}
    </div>
  );
};

export default Heading4;
