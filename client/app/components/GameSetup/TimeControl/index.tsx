import React, { FC, useEffect, useState } from "react";

import clsx from "clsx";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useTranslate } from "/client/app/hooks";
import TextButton from "/client/app/shared/Buttons/TextButton";
import Checkbox from "/client/app/shared/Checkbox";
import Input from "/client/app/shared/Input";
import LongArrow from "../../icons/LongArrow";
import Card from "../../Card";
import Subtitle from "../../Subtitle";
import "./index.scss";

const hasRestrictedInputChar = (char: string) =>
  ["e", "E", "+", "-"].includes(char);

const inputs = [
  {
    name: "minutes",
    max: 90,
    placeholder: { key: "minutesWithAmount", params: { min: "00" } },
  },
  {
    name: "seconds",
    max: 60,
    placeholder: { key: "secondsWithAmount", params: { sec: "00" } },
  },
] as const;

const validationSchema = Yup.object({
  minutes: Yup.number()
    .moreThan(-1, "Should be positive number")
    .lessThan(91, "Should be less than 90"),

  seconds: Yup.number()
    .moreThan(-1, "Should be positive number")
    .lessThan(61, "Should be less than 60")
    .when("minutes", {
      is: (minutes: number) => minutes === 90,
      then: (schema) => schema.lessThan(1, "Max game length is 90 minutes"),
    }),
});

type TimeControlProps = {
  className?: string;
  onReturn: () => void;
  onPickTime: (value: number) => void;
  onValidChange?: (value: boolean) => void;
  onUnlimitedChange?: (value: boolean) => void;
};

const TimeControl: FC<TimeControlProps> = ({
  className,
  onReturn,
  onPickTime,
  onValidChange,
  onUnlimitedChange,
}) => {
  const { t } = useTranslate();

  const formik = useFormik<{
    minutes?: number;
    seconds: number;
  }>({
    initialValues: {
      minutes: 0,
      seconds: 0,
    },
    validationSchema,
    validateOnChange: true,

    onSubmit: () => {},
  });

  const [unlimited, setUnlimited] = useState(false);

  useEffect(() => {
    const { minutes, seconds } = formik.values;

    let time = 0;

    if (minutes) {
      time = minutes;
    }

    if (seconds) {
      time += Number((seconds / 60).toFixed(2));
    }

    if (formik.isValid) {
      onPickTime(time);
    }
  }, [formik.values]);

  useEffect(() => {
    if (onValidChange) {
      onValidChange(formik.isValid);
    }
  }, [formik.isValid, onValidChange]);

  useEffect(() => {
    if (onUnlimitedChange) {
      onUnlimitedChange(unlimited);
    }
  }, [unlimited, onUnlimitedChange]);

  const Inputs = inputs.map(({ name, max, placeholder }) => (
    <Input
      key={name}
      max={max}
      min={0}
      disabled={unlimited}
      onKeyDown={(evt) =>
        (hasRestrictedInputChar(evt.key) ||
          (formik.values[name] === 0 && evt.key === "0")) &&
        evt.preventDefault()
      }
      value={formik.values[name] === 0 ? "" : formik.values[name]}
      label={t(name)}
      name={name}
      placeholder={t(placeholder.key, placeholder.params)}
      type="number"
      onChange={(e) =>
        formik.setFieldValue(name, e.target.value === "" ? 0 : +e.target.value)
      }
      error={!!formik.errors[name] && !unlimited}
      errorText={formik.errors[name]}
    />
  ));

  return (
    <Card className={clsx("timeControl", className)}>
      <Subtitle className="timeControl__subtitle">{t("timeControl")}</Subtitle>
      <div className="timeControl__inputs">{Inputs}</div>
      <p className="timeControl__checkbox">
        <Checkbox
          name="checkbox"
          checked={unlimited}
          onChange={() => setUnlimited(!unlimited)}
        />
        <span className="timeControl__textPlaceholder">{t("unlimited")}</span>
      </p>

      <TextButton className="timeControl__popularTimes" onClick={onReturn}>
        {t("popularTimes")} <LongArrow />
      </TextButton>
    </Card>
  );
};

export default TimeControl;
