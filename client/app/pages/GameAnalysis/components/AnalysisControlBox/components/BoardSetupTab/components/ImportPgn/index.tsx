import React, { ChangeEvent, useRef } from "react";
import LongArrow from "/client/app/components/icons/LongArrow";
import Input from "/client/app/shared/Input";

const ImportPgn = () => {
  const ref = useRef<HTMLInputElement>(null);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {};

  return (
    <>
      <Input
        type="text"
        name="importPgn"
        label="Import PGN"
        icon={<LongArrow className="boardSetupTab__longArrowIcon" />}
        onContainerClick={() => ref.current?.click()}
      />
      <input type="file" ref={ref} hidden onChange={onFileChange} />
    </>
  );
};

export default ImportPgn;
