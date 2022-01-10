import AbstractTimestampNode from "/lib/AbstractTimestampNode";
import { PingMessage } from "/lib/records/PingMessage";
import { PongMessage } from "/lib/records/PongMessage";
import { PongResponse } from "/lib/records/PongResponse";
import EventEmitter from "eventemitter3";
import { expect } from "chai";

class AbstractTimestampNodeTest extends AbstractTimestampNode {
  public sendFunctionCalled: boolean = false;

  public sendFunctionMessage?: PingMessage | PongMessage | PongResponse;

  public events?: EventEmitter;

  constructor(emitter?: EventEmitter) {
    super(null, 60);
    this.events = emitter;
  }

  protected sendFunction(msg: PingMessage | PongMessage | PongResponse): void {
    this.sendFunctionCalled = true;
    this.sendFunctionMessage = msg;
    if (this.events) this.events.emit("called", msg);
  }

  public process(msg: PingMessage | PongMessage | PongResponse) {
    this.processIncomingMessage(msg);
  }
}

describe("AbstractTimestampNode", function () {
  //    protected constructor(parent: Stoppable | null, pingcount: number) {
  it("should call sendFunction when sending a various messages", function (done) {
    let type = "ping";
    const emitter = new EventEmitter();
    const timestamp = new AbstractTimestampNodeTest(emitter);
    emitter.on("called", (msg) => {
      const newmsg = { ...msg };
      switch (type) {
        case "ping":
          type = "pong";
          expect(msg.type).to.equal("ping");
          timestamp.process(msg);
          break;
        case "pong":
          type = "rslt";
          expect(msg.type).to.equal("pong");
          newmsg.receive += 5000;
          timestamp.process(newmsg);
          break;
        case "rslt":
          expect(msg.type).to.equal("rslt");
          timestamp.process(msg);
          emitter.removeAllListeners();
          timestamp.stop();
          done();
          break;
        default:
          throw new Error("unknown type");
      }
    });
    timestamp.start();
  });

  //    protected PingReceived(ping: PingMessage): void {
  //    protected PongReceived(pong: PongMessage): void {
  //    protected PongResponseReceived(msg: PongResponse) {
  //    protected processIncomingMessage(msg: PingMessage | PongMessage | PongResponse): void {
  //    public getMilliseconds(): number {
  //    public start(): void {
  //    protected stopping(): void {
  //      private intervalHandle?: number;
  //      private cleanupHandle?: number;
});
