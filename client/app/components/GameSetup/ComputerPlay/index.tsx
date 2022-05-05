import React, { FC } from "react";

import { useFormik } from "formik";

import { gameservice } from "/client/app/Root";
import StandardButton from "/client/app/shared/Buttons/StandardButton";
import { useTranslate } from "/client/app/hooks";
import { TChallengeButton } from "/client/app/types";
import { PieceColor } from "/lib/records/ChallengeRecord";
import RangeSlider from "/client/app/shared/RangeSlider";
import Input from "/client/app/shared/Input";
import LongArrow from "../../icons/LongArrow";
import Card from "../../Card";
import RatedGame from "../RatedGame";
import Subtitle from "../../Subtitle";
import ColorPick from "../ColorPick";
import TimeOptions from "../TimeOptions";
import { ICommonGameSetup } from "../types";
import "./index.scss";

interface IComputerPlayProps extends ICommonGameSetup {}

const ComputerPlay: FC<IComputerPlayProps> = ({ onCloseModal }) => {
  const { t } = useTranslate();

  const formik = useFormik<{
    color: PieceColor | "random";
    skill: number;
    time: number;
    opponentTime?: number;
  }>({
    initialValues: {
      color: "random",
      time: 0,
      skill: 1,
    },
    onSubmit: (values) => {
      gameservice.startComputerGame({
        skill_level: Math.max(1, Math.round((values.skill - 1000) / 100)),
        color: values.color === "random" ? undefined : values.color,
        clocks: { minutes: values.time },
        opponentclocks: values.opponentTime
          ? { minutes: values.opponentTime }
          : undefined,
      });
      onCloseModal();
    },
  });

  const handleTimeChange = async (
    value: TChallengeButton | number,
  ): Promise<void> => {
    if (typeof value === "number") {
      await formik.setFieldValue("time", value);
      await formik.setFieldValue("opponentTime", undefined);
    } else {
      await formik.setFieldValue("time", value.time);
      await formik.setFieldValue("opponentTime", value.opponentTime);

      formik.handleSubmit();
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="computerPlay">
      <TimeOptions
        className="computerPlay__card"
        subtitle={t("setGameOptions")}
        onPickTime={handleTimeChange}
      />

      <Card className="computerPlay__card computerPlay__rangeSlider">
        <Subtitle size="small" className="computerPlay__sliderSubtitle">
          {t("computerProfile")}
        </Subtitle>
        <RangeSlider
          min={1000}
          max={2000}
          value={1500}
          onPickSkill={formik.setFieldValue}
        />
      </Card>

      <ColorPick
        className="computerPlay__card computerPlay__colors"
        onColorPick={formik.setFieldValue}
      />

      <RatedGame className="computerPlay__card computerPlay__rated" />

      <Card className="computerPlay__card computerPlay__fen">
        <Subtitle size="small" className="computerPlay__positionSubtitle">
          {t("computerProfile")}
        </Subtitle>

        <Input
          name="startingFen"
          label={t("description")}
          icon={<LongArrow />}
          className="computerPlay__fen-input"
          placeholder={t("shareFen")}
        />
      </Card>

      <StandardButton type="submit" color="primary">
        {t("play")}
      </StandardButton>
    </form>
  );
};

export default ComputerPlay;
