import { Meteor } from "meteor/meteor";
import WritableECODao from "/imports/server/dao/WritableECODao";
import { Chess, ChessInstance } from "chess.js";
import {
  BasicMoveListNode,
  ECOObject,
  MoveZero,
  VariationsInterface,
} from "/lib/records/GameRecord";

interface MoveObject {
  moves: string[];
  move_string: string;
}

export default class ECOService {
  private dao: WritableECODao;

  constructor(dao: WritableECODao) {
    this.dao = dao;
    ECOService.initialLoad(this.dao);
  }

  private recursive_eco(
    chessObj: ChessInstance,
    movelist: (BasicMoveListNode | MoveZero)[],
    cmi: number,
  ): ECOObject {
    if (!cmi) {
      // Only times we will enter here are when the previous node is node 0 or
      // We started on node 0 and are passing in an undefined cmi.
      // movelist[0].eco = {
      //     // Setting Node 0 specifically in case cmi is undefined.
      //     name: "NO_ECO",
      //     code: "NO_ECO",
      // };
      return {
        name: "NO_ECO",
        code: "NO_ECO",
      };
    }

    const argh = movelist[cmi] as BasicMoveListNode;

    if (argh.eco?.name && argh.eco?.code) return argh.eco;

    const ecorecord = this.dao.readOne({ fen: chessObj.fen() });
    if (ecorecord) {
      const ecoElements: ECOObject = {
        name: ecorecord.name,
        code: ecorecord.eco,
      };
      (movelist[cmi] as BasicMoveListNode).eco = ecoElements;
      return ecoElements;
    }
    const { prev } = argh;
    chessObj.undo();
    // eslint-disable-next-line no-undef
    (movelist[cmi] as BasicMoveListNode).eco = this.recursive_eco(
      chessObj,
      movelist,
      prev,
    );
    return (movelist[cmi] as BasicMoveListNode).eco as ECOObject;
  }

  public load_eco(chessObj: ChessInstance, variations: VariationsInterface) {
    const argh = variations.movelist[
      variations.currentmoveindex
    ] as BasicMoveListNode;
    if (argh.eco?.name && argh.eco?.code) return;

    const ecorecord = this.dao.readOne({
      fen: chessObj.fen(),
    });
    if (ecorecord) {
      (
        variations.movelist[variations.currentmoveindex] as BasicMoveListNode
      ).eco = {
        name: ecorecord.name,
        code: ecorecord.eco,
      };
      return;
    }
    const { prev } = argh;
    const prevargh = variations.movelist[prev] as BasicMoveListNode;

    if (prevargh.eco) {
      (
        variations.movelist[variations.currentmoveindex] as BasicMoveListNode
      ).eco = prevargh.eco;
      return;
    }

    const chessInstance = new Chess();
    chessObj.history().forEach((move) => {
      chessInstance.move(move);
    });
    chessInstance.undo();
    (
      variations.movelist[variations.currentmoveindex] as BasicMoveListNode
    ).eco = this.recursive_eco(chessInstance, variations.movelist, prev);
  }

  private static initialLoad(dao: WritableECODao) {
    if (dao.count({})) return;

    const content: string = Assets.getText("eco.txt");
    const chess = new Chess();

    let lineNumber = 0;
    content.split("\n").forEach((line) => {
      lineNumber += 1;
      if (line.trim().length) {
        const pieces = line.split(": ");
        if (pieces.length !== 3)
          throw new Meteor.Error(
            "Unable to load ECO codes",
            `Line ${lineNumber} has a syntax error`,
          );
        const eco = pieces[0];
        const name = pieces[1];
        try {
          const moves = ECOService.parseMoves(pieces[2]);
          if (moves) {
            moves.forEach((move) => {
              chess.move(move);
            });
            const fen = chess.fen();
            chess.reset();
            dao.insert({ name, eco, fen });
          }
        } catch (e: any) {
          throw new Meteor.Error(
            "Unable to load ECO codes",
            `Line ${lineNumber} has an error: ${e.toString()}`,
          );
        }
      }
    });
  }

  private static trim_whitespace(object: MoveObject) {
    if (!object.move_string || !object.move_string.length) return false;
    object.move_string = object.move_string.trim();
    return true;
  }

  private static trim_move_number(object: MoveObject) {
    if (!object.move_string || !object.move_string.length) return false;
    object.move_string = object.move_string.replace("\\d+.s*(.*)", "$1");
    return true;
  }

  private static get_move(object: MoveObject) {
    if (!object.move_string || !object.move_string.length) return false;
    const found = object.move_string.match(
      "((([RQKBN]?[a-h]?[1-8]?x?[a-h][1-8](=[RQBN])?)|O-O(?:-O)?)[+#]?)(.*)",
    );
    if (!found) return false;
    object.moves.push(found[1]);
    // eslint-disable-next-line prefer-destructuring
    object.move_string = found[5];
    return true;
  }

  private static parseMoves(moveString: string): string[] | undefined {
    const object: MoveObject = {
      moves: [],
      move_string: moveString,
    };
    if (!this.trim_whitespace(object)) return object.moves;
    if (!this.trim_move_number(object)) return object.moves;
    if (!this.get_move(object)) return object.moves;
    if (!this.trim_whitespace(object)) return object.moves;
    if (!this.get_move(object)) return object.moves;
  }
}
