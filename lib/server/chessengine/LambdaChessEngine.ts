import { Meteor } from "meteor/meteor";
import CommonChessEngine from "/lib/server/chessengine/CommonChessEngine";
import ServerLogger from "/lib/server/ServerLogger";
import * as AWS from "aws-sdk";
import { EngineResult } from "../EngineInterfaces";
import Stoppable from "/lib/Stoppable";

if (!process.env.AWS_ACCESS_KEY_ID) {
  AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: "icc" });
  AWS.config.update({ region: "us-west-1" });
}

const lambda = new AWS.Lambda();

interface LambdaResultObject {
  results: EngineResult | EngineResult[];
  timing: {
    start: Date;
    end: Date;
    moves: [
      {
        start: Date;
        end: Date;
      },
    ];
  };
}

interface EngineResponse {
  statusCode: number;
  body?: string;
}

export default class LambdaChessEngine extends CommonChessEngine {
  private logger: ServerLogger;

  constructor(parent: Stoppable | null) {
    super(parent);
    this.logger = new ServerLogger(this, "LambdaChessEngine_ts");
  }

  public getComputerMove(
    xwtime: number,
    xbtime: number,
    winc: number,
    binc: number,
    skillLevel: number,
    fen: string,
  ): Promise<EngineResult> {
    return new Promise<EngineResult>((resolve, reject) => {
      let ywtime = xwtime / 4;
      const ybtime = xbtime / 4;
      if (ywtime === 0) ywtime = 250;
      if (ybtime === 0) ywtime = 250;

      // const elo = ((2850 - 1350) * game.skill_level) / 10 + 1350;
      const levels = [
        1350, 1450, 1550, 1650, 1700, 1750, 1850, 1900, 1950, 2100, 2300,
      ];
      const elo = levels[skillLevel];
      const params = {
        FunctionName: "icc-stockfish",
        Payload: JSON.stringify({
          options: { UCI_LimitStrength: true, UCI_Elo: elo },
          position: fen,
          gooptions: {
            wtime: ywtime,
            btime: ybtime,
            winc,
            binc,
          },
        }),
      };
      // const start = new Date();
      lambda.invoke(params, (err, data) => {
        // debug("lambda invoke returns: err=" + JSON.stringify(err) + ", data=" + JSON.stringify(data));
        if (err || !data) {
          reject(err);
          return;
        }

        if (!data || !data.Payload) {
          this.logger.error(
            () =>
              `data or its payload is null, payload=${JSON.stringify(data)}`,
          );
          reject(
            new Meteor.Error("SERVER_ERROR", "data or its Payload is null"),
          );
          return;
        }
        const payload: EngineResponse = JSON.parse(data.Payload as string);
        if (!payload || !payload.body) {
          this.logger.error(
            () =>
              `payload or its body is null, payload=${JSON.stringify(data)}`,
          );
          reject(
            new Meteor.Error("SERVER_ERROR", "payload or its body is null"),
          );
          return;
        }

        const body = JSON.parse(payload.body as string) as LambdaResultObject;

        if (!body) {
          this.logger.error(
            () => `body is null, payload=${JSON.stringify(data)}`,
          );
          reject(new Meteor.Error("SERVER_ERROR", "body is null"));
          return;
        }
        // const end = new Date();
        // const server_time = end - start;
        // const computer_start = Date.parse(body.timing.start);
        // const computer_end = Date.parse(body.timing.end);
        // const lambda_time = computer_end - computer_start;
        //
        // You can use time_diff/2 for lag if you wish
        // const time_diff = server_time - lambda_time;
        if (!Array.isArray(body.results)) resolve(body.results);
      });
    });
  }
}
