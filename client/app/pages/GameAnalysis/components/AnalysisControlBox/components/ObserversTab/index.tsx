import React from "react";
import { ObserverItem } from "./components/ObserverItem";
import { useTranslate } from "/client/app/hooks";
import { ScrollBar } from "/client/app/shared/ScrollBar";

export const ObserversTab = () => {
  const { t } = useTranslate();

  return (
    <div className="analysisControlBox__table-container">
      <ScrollBar>
        <table className="analysisControlBox__table">
          <thead>
            <tr className="analysisControlBox__headers">
              <th className="analysisControlBox__header">{t("username")}</th>
              <th className="analysisControlBox__header">{t("title")}</th>
              <th className="analysisControlBox__header" colSpan={2}>
                {t("moves")}
              </th>
              <th className="analysisControlBox__header">{t("chat")}</th>
            </tr>
          </thead>
          <tbody>
            {new Array(20).fill(0).map((_, i) => (
              <ObserverItem
                key={i}
                picture="https://picsum.photos/id/237/536/354"
                username="BigMAMMA456"
                rating={2200}
                chessTitle="GM"
                flag="DE"
                className="analysisControlBox__observerItem"
              />
            ))}
          </tbody>
        </table>
      </ScrollBar>
    </div>
  );
};
