import React, { FC } from "react";
import Card from "../../Card";
import ColorPick from "../ColorPick";
import RatedGame from "../RatedGame";
import Shortcut from "../Shortcut";
import Subtitle from "../../Subtitle";
import TimeOptions from "../TimeOptions";
import { EComponents, ICommonGameSetup } from "../types";
import StandardButton from "/client/app/shared/Buttons/StandardButton";
import { useTranslate } from "/client/app/hooks";
import { onPickTimeMock } from "../mocks";

interface ICustomChallengeProps extends ICommonGameSetup {}

const CustomChallenge: FC<ICustomChallengeProps> = ({ navigate }) => {
  const { t } = useTranslate();

  return (
    <div className="customChallenge">
      <TimeOptions
        onPickTime={onPickTimeMock}
        className="customChallenge__card"
        subtitle={t("launchNewChallenge")}
      />
      <RatedGame className="customChallenge__card" />
      <Card className="customChallenge__card">
        <Subtitle>{t("ratingRange")}</Subtitle>

        <div className="customChallenge__ratings d-flex space-between">
          <span className="customChallenge__decrease customChallenge__rating">
            1000{" "}
            <button type="button" className="customChallenge__btnRating">
              -
            </button>
          </span>
          <span className="customChallenge__middle customChallenge__rating">
            1200{" "}
          </span>
          <span className="customChallenge__increase customChallenge__rating">
            1400{" "}
            <button type="button" className="customChallenge__btnRating">
              +
            </button>
          </span>
        </div>
      </Card>

      <ColorPick onColorPick={() => {}} className="customChallenge__card" />

      <Shortcut className="customChallenge__card " />

      <div className="customChallenge__actions">
        <StandardButton
          color="primary"
          height="small"
          onClick={() => navigate(EComponents.CHALLENGE)}
        >
          {t("launchChallenge")}
        </StandardButton>
        <StandardButton
          color="regular"
          height="small"
          onClick={() => navigate(EComponents.SHARE)}
        >
          {t("shareChallenge")}
        </StandardButton>
      </div>
    </div>
  );
};

export default CustomChallenge;
