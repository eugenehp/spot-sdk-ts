/* eslint-disable */
import {
  RegisterEstopEndpointResponse,
  DeregisterEstopEndpointResponse,
  EstopCheckInResponse,
  GetEstopConfigResponse,
  SetEstopConfigResponse,
  GetEstopSystemStatusResponse,
  RegisterEstopEndpointRequest,
  DeregisterEstopEndpointRequest,
  EstopCheckInRequest,
  GetEstopConfigRequest,
  SetEstopConfigRequest,
  GetEstopSystemStatusRequest,
} from "./estop";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/**
 * The software robot E-Stop system:
 *  1. Uses challenge-style communication to enforce end user (aka "originators") connection
 *     for Authority to Operate (ATO).
 *  2. Offers the ability to issue a direct denial of  ATO.
 * The EstopService provides a service interface for the robot EStop/Authority to operate the system.
 */
export interface EstopService {
  /**
   * Register an Estop "originator" or "endpoint".
   * This may be a replacement for another active endpoint.
   */
  RegisterEstopEndpoint(
    request: RegisterEstopEndpointRequest
  ): Promise<RegisterEstopEndpointResponse>;
  /** Deregister the requested estop endpoint. */
  DeregisterEstopEndpoint(
    request: DeregisterEstopEndpointRequest
  ): Promise<DeregisterEstopEndpointResponse>;
  /**
   * Answer challenge from previous response (unless this is the first call), and request
   * a stop level.
   */
  EstopCheckIn(request: EstopCheckInRequest): Promise<EstopCheckInResponse>;
  /** Request the current EstopConfig, describing the expected set of endpoints. */
  GetEstopConfig(
    request: GetEstopConfigRequest
  ): Promise<GetEstopConfigResponse>;
  /** Set a new active EstopConfig. */
  SetEstopConfig(
    request: SetEstopConfigRequest
  ): Promise<SetEstopConfigResponse>;
  /** Ask for the current status of the estop system. */
  GetEstopSystemStatus(
    request: GetEstopSystemStatusRequest
  ): Promise<GetEstopSystemStatusResponse>;
}

export class EstopServiceClientImpl implements EstopService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.RegisterEstopEndpoint = this.RegisterEstopEndpoint.bind(this);
    this.DeregisterEstopEndpoint = this.DeregisterEstopEndpoint.bind(this);
    this.EstopCheckIn = this.EstopCheckIn.bind(this);
    this.GetEstopConfig = this.GetEstopConfig.bind(this);
    this.SetEstopConfig = this.SetEstopConfig.bind(this);
    this.GetEstopSystemStatus = this.GetEstopSystemStatus.bind(this);
  }
  RegisterEstopEndpoint(
    request: RegisterEstopEndpointRequest
  ): Promise<RegisterEstopEndpointResponse> {
    const data = RegisterEstopEndpointRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.EstopService",
      "RegisterEstopEndpoint",
      data
    );
    return promise.then((data) =>
      RegisterEstopEndpointResponse.decode(new _m0.Reader(data))
    );
  }

  DeregisterEstopEndpoint(
    request: DeregisterEstopEndpointRequest
  ): Promise<DeregisterEstopEndpointResponse> {
    const data = DeregisterEstopEndpointRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.EstopService",
      "DeregisterEstopEndpoint",
      data
    );
    return promise.then((data) =>
      DeregisterEstopEndpointResponse.decode(new _m0.Reader(data))
    );
  }

  EstopCheckIn(request: EstopCheckInRequest): Promise<EstopCheckInResponse> {
    const data = EstopCheckInRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.EstopService",
      "EstopCheckIn",
      data
    );
    return promise.then((data) =>
      EstopCheckInResponse.decode(new _m0.Reader(data))
    );
  }

  GetEstopConfig(
    request: GetEstopConfigRequest
  ): Promise<GetEstopConfigResponse> {
    const data = GetEstopConfigRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.EstopService",
      "GetEstopConfig",
      data
    );
    return promise.then((data) =>
      GetEstopConfigResponse.decode(new _m0.Reader(data))
    );
  }

  SetEstopConfig(
    request: SetEstopConfigRequest
  ): Promise<SetEstopConfigResponse> {
    const data = SetEstopConfigRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.EstopService",
      "SetEstopConfig",
      data
    );
    return promise.then((data) =>
      SetEstopConfigResponse.decode(new _m0.Reader(data))
    );
  }

  GetEstopSystemStatus(
    request: GetEstopSystemStatusRequest
  ): Promise<GetEstopSystemStatusResponse> {
    const data = GetEstopSystemStatusRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.EstopService",
      "GetEstopSystemStatus",
      data
    );
    return promise.then((data) =>
      GetEstopSystemStatusResponse.decode(new _m0.Reader(data))
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
