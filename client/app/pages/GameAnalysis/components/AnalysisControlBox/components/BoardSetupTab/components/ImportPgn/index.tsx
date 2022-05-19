import React, { ChangeEvent, useRef } from "react";
import { LongArrow } from "/client/app/components/icons/LongArrow";
import { useTranslate } from "/client/app/hooks";
import { Input } from "/client/app/shared/Input";

export const ImportPgn = () => {
  const { t } = useTranslate();
  const ref = useRef<HTMLInputElement>(null);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {};

  return (
    <>
      <Input
        type="text"
        name="importPgn"
        label={t("importPgn")}
        icon={<LongArrow className="boardSetupTab__longArrowIcon" />}
        onContainerClick={() => ref.current?.click()}
      />
      <input type="file" ref={ref} hidden onChange={onFileChange} />
    </>
  );
};
