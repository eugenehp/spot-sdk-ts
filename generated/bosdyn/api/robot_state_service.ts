/* eslint-disable */
import {
  RobotStateResponse,
  RobotMetricsResponse,
  RobotHardwareConfigurationResponse,
  RobotLinkModelResponse,
  RobotStateRequest,
  RobotMetricsRequest,
  RobotHardwareConfigurationRequest,
  RobotLinkModelRequest,
} from "./robot_state";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/** The robot state service tracks all information about the measured and computed states of the robot at the current time. */
export interface RobotStateService {
  /** Get robot state information (such as kinematic state, power state, or faults). */
  GetRobotState(request: RobotStateRequest): Promise<RobotStateResponse>;
  /** Get different robot metrics and parameters from the robot. */
  GetRobotMetrics(request: RobotMetricsRequest): Promise<RobotMetricsResponse>;
  /** Get the hardware configuration of the robot, which describes the robot skeleton and urdf. */
  GetRobotHardwareConfiguration(
    request: RobotHardwareConfigurationRequest
  ): Promise<RobotHardwareConfigurationResponse>;
  /**
   * Returns the OBJ file for a specifc robot link. Intended to be called after
   * GetRobotHardwareConfiguration, using the link names returned by that call.
   */
  GetRobotLinkModel(
    request: RobotLinkModelRequest
  ): Promise<RobotLinkModelResponse>;
}

export class RobotStateServiceClientImpl implements RobotStateService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetRobotState = this.GetRobotState.bind(this);
    this.GetRobotMetrics = this.GetRobotMetrics.bind(this);
    this.GetRobotHardwareConfiguration =
      this.GetRobotHardwareConfiguration.bind(this);
    this.GetRobotLinkModel = this.GetRobotLinkModel.bind(this);
  }
  GetRobotState(request: RobotStateRequest): Promise<RobotStateResponse> {
    const data = RobotStateRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.RobotStateService",
      "GetRobotState",
      data
    );
    return promise.then((data) =>
      RobotStateResponse.decode(new _m0.Reader(data))
    );
  }

  GetRobotMetrics(request: RobotMetricsRequest): Promise<RobotMetricsResponse> {
    const data = RobotMetricsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.RobotStateService",
      "GetRobotMetrics",
      data
    );
    return promise.then((data) =>
      RobotMetricsResponse.decode(new _m0.Reader(data))
    );
  }

  GetRobotHardwareConfiguration(
    request: RobotHardwareConfigurationRequest
  ): Promise<RobotHardwareConfigurationResponse> {
    const data = RobotHardwareConfigurationRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.RobotStateService",
      "GetRobotHardwareConfiguration",
      data
    );
    return promise.then((data) =>
      RobotHardwareConfigurationResponse.decode(new _m0.Reader(data))
    );
  }

  GetRobotLinkModel(
    request: RobotLinkModelRequest
  ): Promise<RobotLinkModelResponse> {
    const data = RobotLinkModelRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.RobotStateService",
      "GetRobotLinkModel",
      data
    );
    return promise.then((data) =>
      RobotLinkModelResponse.decode(new _m0.Reader(data))
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
