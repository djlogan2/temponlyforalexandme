import React from "react";
import InputElement from "../InputElement";
import LongArrow from "/client/app/components/icons/LongArrow";
import Smile from "/client/app/components/icons/Smile";
import { useTranslate } from "/client/app/hooks";

const InputMessage = () => {
  const { t } = useTranslate();

  return (
    <div className="chat__inputMessage">
      <input
        type="text"
        className="chat__input"
        placeholder={t("typeMessage")}
      />
      <div className="chat__inputElements">
        <InputElement>
          <Smile />
        </InputElement>
        <InputElement>
          <LongArrow />
        </InputElement>
        <InputElement>
          <LongArrow />
        </InputElement>
      </div>
    </div>
  );
};

export default InputMessage;
