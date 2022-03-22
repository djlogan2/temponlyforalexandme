import React from "react";
import ObserverItem from "./components/ObserverItem";
import ScrollBar from "/client/app/shared/ScrollBar";

const ObserversTab = () => (
  <div className="analysisControlBox__table-container">
    <ScrollBar>
      <table className="analysisControlBox__table">
        <thead>
          <tr className="analysisControlBox__headers">
            <th className="analysisControlBox__header">Username</th>
            <th className="analysisControlBox__header">Title</th>
            <th className="analysisControlBox__header" colSpan={2}>
              Moves
            </th>
            <th className="analysisControlBox__header">Chat</th>
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

export default ObserversTab;
