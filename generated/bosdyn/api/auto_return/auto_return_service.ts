/* eslint-disable */
import {
  ConfigureResponse,
  GetConfigurationResponse,
  StartResponse,
  ConfigureRequest,
  GetConfigurationRequest,
  StartRequest,
} from "./auto_return";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api.auto_return";

export interface AutoReturnService {
  /** Configure the service. */
  Configure(request: ConfigureRequest): Promise<ConfigureResponse>;
  /** Get the current configuration. */
  GetConfiguration(
    request: GetConfigurationRequest
  ): Promise<GetConfigurationResponse>;
  /** Start AutoReturn now. */
  Start(request: StartRequest): Promise<StartResponse>;
}

export class AutoReturnServiceClientImpl implements AutoReturnService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Configure = this.Configure.bind(this);
    this.GetConfiguration = this.GetConfiguration.bind(this);
    this.Start = this.Start.bind(this);
  }
  Configure(request: ConfigureRequest): Promise<ConfigureResponse> {
    const data = ConfigureRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.auto_return.AutoReturnService",
      "Configure",
      data
    );
    return promise.then((data) =>
      ConfigureResponse.decode(new _m0.Reader(data))
    );
  }

  GetConfiguration(
    request: GetConfigurationRequest
  ): Promise<GetConfigurationResponse> {
    const data = GetConfigurationRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.auto_return.AutoReturnService",
      "GetConfiguration",
      data
    );
    return promise.then((data) =>
      GetConfigurationResponse.decode(new _m0.Reader(data))
    );
  }

  Start(request: StartRequest): Promise<StartResponse> {
    const data = StartRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.auto_return.AutoReturnService",
      "Start",
      data
    );
    return promise.then((data) => StartResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}
