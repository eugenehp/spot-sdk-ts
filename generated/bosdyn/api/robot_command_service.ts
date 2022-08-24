/* eslint-disable */
import {
  RobotCommandResponse,
  RobotCommandFeedbackResponse,
  ClearBehaviorFaultResponse,
  RobotCommandRequest,
  RobotCommandFeedbackRequest,
  ClearBehaviorFaultRequest,
} from "./robot_command";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/** The robot command service allows a client application to control and move the robot. */
export interface RobotCommandService {
  /**
   * Starts a behavior command on the robot. Issuing a new command overrides the active command.
   * Each command is issued a UID for feedback retrieval.
   */
  RobotCommand(request: RobotCommandRequest): Promise<RobotCommandResponse>;
  /**
   * A client queries this RPC to determine a robot's progress towards completion of a command.
   * This updates the client with metrics like "distance to goal."
   * The client should use this feedback to determine whether the current command has
   * succeeeded or failed, and thus send the next command.
   */
  RobotCommandFeedback(
    request: RobotCommandFeedbackRequest
  ): Promise<RobotCommandFeedbackResponse>;
  /** Clear robot behavior fault. */
  ClearBehaviorFault(
    request: ClearBehaviorFaultRequest
  ): Promise<ClearBehaviorFaultResponse>;
}

export class RobotCommandServiceClientImpl implements RobotCommandService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.RobotCommand = this.RobotCommand.bind(this);
    this.RobotCommandFeedback = this.RobotCommandFeedback.bind(this);
    this.ClearBehaviorFault = this.ClearBehaviorFault.bind(this);
  }
  RobotCommand(request: RobotCommandRequest): Promise<RobotCommandResponse> {
    const data = RobotCommandRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.RobotCommandService",
      "RobotCommand",
      data
    );
    return promise.then((data) =>
      RobotCommandResponse.decode(new _m0.Reader(data))
    );
  }

  RobotCommandFeedback(
    request: RobotCommandFeedbackRequest
  ): Promise<RobotCommandFeedbackResponse> {
    const data = RobotCommandFeedbackRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.RobotCommandService",
      "RobotCommandFeedback",
      data
    );
    return promise.then((data) =>
      RobotCommandFeedbackResponse.decode(new _m0.Reader(data))
    );
  }

  ClearBehaviorFault(
    request: ClearBehaviorFaultRequest
  ): Promise<ClearBehaviorFaultResponse> {
    const data = ClearBehaviorFaultRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.RobotCommandService",
      "ClearBehaviorFault",
      data
    );
    return promise.then((data) =>
      ClearBehaviorFaultResponse.decode(new _m0.Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}
