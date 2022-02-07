import clsx from "clsx";
import React, { FCICC } from "react";
import useTranslate from "/client/app/hooks/useTranslate";
import "./index.scss";

interface Heading2Props {
  name: string;
  className?: any;
}

const Heading2: FCICC<Heading2Props> = ({
  name,
  token,
  className,
  ...rest
}) => {
  const translation = useTranslate(token);

  return (
    <div id={name} className={clsx("heading2", className)} {...rest}>
      {translation}
    </div>
  );
};

export default Heading2;
