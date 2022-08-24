/* eslint-disable */
import {
  DockingCommandResponse,
  DockingCommandFeedbackResponse,
  GetDockingConfigResponse,
  GetDockingStateResponse,
  DockingCommandRequest,
  DockingCommandFeedbackRequest,
  GetDockingConfigRequest,
  GetDockingStateRequest,
} from "./docking";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api.docking";

/**
 * The DockingService provides an interface to dock and undock the robot from Spot Docks,
 * as well as get feedback on command status, and get the current docked status of the robot.
 */
export interface DockingService {
  /** Starts a docking command on the robot. */
  DockingCommand(
    request: DockingCommandRequest
  ): Promise<DockingCommandResponse>;
  /** Check the status of a docking command. */
  DockingCommandFeedback(
    request: DockingCommandFeedbackRequest
  ): Promise<DockingCommandFeedbackResponse>;
  /** Get the configured dock ID ranges. */
  GetDockingConfig(
    request: GetDockingConfigRequest
  ): Promise<GetDockingConfigResponse>;
  /** Get the robot's docking state */
  GetDockingState(
    request: GetDockingStateRequest
  ): Promise<GetDockingStateResponse>;
}

export class DockingServiceClientImpl implements DockingService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.DockingCommand = this.DockingCommand.bind(this);
    this.DockingCommandFeedback = this.DockingCommandFeedback.bind(this);
    this.GetDockingConfig = this.GetDockingConfig.bind(this);
    this.GetDockingState = this.GetDockingState.bind(this);
  }
  DockingCommand(
    request: DockingCommandRequest
  ): Promise<DockingCommandResponse> {
    const data = DockingCommandRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.docking.DockingService",
      "DockingCommand",
      data
    );
    return promise.then((data) =>
      DockingCommandResponse.decode(new _m0.Reader(data))
    );
  }

  DockingCommandFeedback(
    request: DockingCommandFeedbackRequest
  ): Promise<DockingCommandFeedbackResponse> {
    const data = DockingCommandFeedbackRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.docking.DockingService",
      "DockingCommandFeedback",
      data
    );
    return promise.then((data) =>
      DockingCommandFeedbackResponse.decode(new _m0.Reader(data))
    );
  }

  GetDockingConfig(
    request: GetDockingConfigRequest
  ): Promise<GetDockingConfigResponse> {
    const data = GetDockingConfigRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.docking.DockingService",
      "GetDockingConfig",
      data
    );
    return promise.then((data) =>
      GetDockingConfigResponse.decode(new _m0.Reader(data))
    );
  }

  GetDockingState(
    request: GetDockingStateRequest
  ): Promise<GetDockingStateResponse> {
    const data = GetDockingStateRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.docking.DockingService",
      "GetDockingState",
      data
    );
    return promise.then((data) =>
      GetDockingStateResponse.decode(new _m0.Reader(data))
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
