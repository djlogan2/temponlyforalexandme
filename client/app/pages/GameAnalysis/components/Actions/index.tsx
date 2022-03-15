import React from "react";
import Computer from "/client/app/components/icons/Computer";
import Download from "/client/app/components/icons/Download";
import Library from "/client/app/components/icons/Library";
import Plus from "/client/app/components/icons/Plus";
import Reset from "/client/app/components/icons/Reset";
import Share from "/client/app/components/icons/Share";
import Upload from "/client/app/components/icons/Upload";
import ActionButton from "/client/app/shared/Buttons/ActionButton";

const Actions = () => (
  <div className="analysisControlBox__actions d-flex space-between">
    <ActionButton size="small" color="secondary">
      <Plus />
    </ActionButton>
    <ActionButton size="small" color="secondary" disabled>
      <Reset />
    </ActionButton>
    <ActionButton size="small" color="secondary">
      <Computer />
    </ActionButton>
    <ActionButton size="small" color="secondary" disabled>
      <Library />
    </ActionButton>
    <ActionButton size="small" color="secondary" disabled>
      <Download />
    </ActionButton>
    <ActionButton size="small" color="secondary">
      <Upload />
    </ActionButton>
    <ActionButton size="small" color="secondary">
      <Share />
    </ActionButton>
  </div>
);

export default Actions;
