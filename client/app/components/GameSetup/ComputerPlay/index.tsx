import { useFormik } from "formik";
import React, { FC } from "react";
import LongArrow from "../../icons/LongArrow";
import Card from "../../Card";
import ColorPick from "../ColorPick";
import RatedGame from "../RatedGame";
import Subtitle from "../../Subtitle";
import TimeOptions from "../TimeOptions";
import { ICommonGameSetup } from "../types";
import "./index.scss";
import { gameservice } from "/client/app/Root";
import StandardButton from "/client/app/shared/Buttons/StandardButton";
import Input from "/client/app/shared/Input";
import RangeSlider from "/client/app/shared/RangeSlider";
import { PieceColor } from "/lib/records/ChallengeRecord";
import { useTranslate } from "/client/app/hooks";

interface IComputerPlayProps extends ICommonGameSetup {}

const ComputerPlay: FC<IComputerPlayProps> = ({ onCloseModal }) => {
  const formik = useFormik({
    initialValues: {
      color: "",
      time: 0,
      skill: 1,
    },
    onSubmit: (values) => {
      gameservice.startComputerGame({
        skill_level: Math.max(1, Math.round((values.skill - 1000) / 100)),
        color: values.color as PieceColor,
        clock: { minutes: values.time },
      });
      onCloseModal();
    },
  });

  const { t } = useTranslate();

  return (
    <form onSubmit={formik.handleSubmit} className="computerPlay">
      <TimeOptions
        className="computerPlay__card"
        subtitle={t("setGameOptions")}
        onPickTime={formik.setFieldValue}
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
