/* eslint-disable */
import {
  PowerCommandResponse,
  PowerCommandFeedbackResponse,
  PowerCommandRequest,
  PowerCommandFeedbackRequest,
} from "./power";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/** The power service for the robot that can power on/off the robot's motors. */
export interface PowerService {
  /**
   * Starts a power command on the robot. A robot can only accept one power command at once.
   * Power commands, are not interruptible. Once a command is issued, it must complete before
   * another command can be issued.
   */
  PowerCommand(request: PowerCommandRequest): Promise<PowerCommandResponse>;
  /** Check the status of a power command. */
  PowerCommandFeedback(
    request: PowerCommandFeedbackRequest
  ): Promise<PowerCommandFeedbackResponse>;
}

export class PowerServiceClientImpl implements PowerService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.PowerCommand = this.PowerCommand.bind(this);
    this.PowerCommandFeedback = this.PowerCommandFeedback.bind(this);
  }
  PowerCommand(request: PowerCommandRequest): Promise<PowerCommandResponse> {
    const data = PowerCommandRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.PowerService",
      "PowerCommand",
      data
    );
    return promise.then((data) =>
      PowerCommandResponse.decode(new _m0.Reader(data))
    );
  }

  PowerCommandFeedback(
    request: PowerCommandFeedbackRequest
  ): Promise<PowerCommandFeedbackResponse> {
    const data = PowerCommandFeedbackRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.PowerService",
      "PowerCommandFeedback",
      data
    );
    return promise.then((data) =>
      PowerCommandFeedbackResponse.decode(new _m0.Reader(data))
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
