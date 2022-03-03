import { Meteor } from "meteor/meteor";
import Stoppable from "/lib/Stoppable";
import LambdaChessEngine from "/lib/server/chessengine/LambdaChessEngine";

export default class ChessEngineService extends Stoppable {
  public acquireFairPlayUnit(): void {
    throw new Meteor.Error("NOT_IMPLEMENTED");
  }

  public acquireComputerPlayUnit(): LambdaChessEngine {
    return new LambdaChessEngine(this);
  }

  public acquireEvaluationUnit(): void {
    throw new Meteor.Error("NOT_IMPLEMENTED");
  }

  public acquireAnalysisUnit(): void {
    throw new Meteor.Error("NOT_IMPLEMENTED");
  }

  public acquireBatchUnit(): void {
    throw new Meteor.Error("NOT_IMPLEMENTED");
  }

  protected stopping(): void {
    throw new Meteor.Error("NOT_IMPLEMENTED");
  }
}
