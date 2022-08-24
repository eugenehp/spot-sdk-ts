/* eslint-disable */
import {
  NetworkComputeResponse,
  ListAvailableModelsResponse,
  NetworkComputeRequest,
  ListAvailableModelsRequest,
} from "./network_compute_bridge";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/** RPCs for sending images or other data to networked server for computation. */
export interface NetworkComputeBridge {
  NetworkCompute(
    request: NetworkComputeRequest
  ): Promise<NetworkComputeResponse>;
  ListAvailableModels(
    request: ListAvailableModelsRequest
  ): Promise<ListAvailableModelsResponse>;
}

export class NetworkComputeBridgeClientImpl implements NetworkComputeBridge {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.NetworkCompute = this.NetworkCompute.bind(this);
    this.ListAvailableModels = this.ListAvailableModels.bind(this);
  }
  NetworkCompute(
    request: NetworkComputeRequest
  ): Promise<NetworkComputeResponse> {
    const data = NetworkComputeRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.NetworkComputeBridge",
      "NetworkCompute",
      data
    );
    return promise.then((data) =>
      NetworkComputeResponse.decode(new _m0.Reader(data))
    );
  }

  ListAvailableModels(
    request: ListAvailableModelsRequest
  ): Promise<ListAvailableModelsResponse> {
    const data = ListAvailableModelsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.NetworkComputeBridge",
      "ListAvailableModels",
      data
    );
    return promise.then((data) =>
      ListAvailableModelsResponse.decode(new _m0.Reader(data))
    );
  }
}

/**
 * Set of RPCs for workers of the network compute bridge.  This is seperate from the RPCs for the
 * on-robot network compute bridge so that if they need to diverge in the future it is possible
 * to do so.
 */
export interface NetworkComputeBridgeWorker {
  NetworkCompute(
    request: NetworkComputeRequest
  ): Promise<NetworkComputeResponse>;
  ListAvailableModels(
    request: ListAvailableModelsRequest
  ): Promise<ListAvailableModelsResponse>;
}

export class NetworkComputeBridgeWorkerClientImpl
  implements NetworkComputeBridgeWorker
{
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.NetworkCompute = this.NetworkCompute.bind(this);
    this.ListAvailableModels = this.ListAvailableModels.bind(this);
  }
  NetworkCompute(
    request: NetworkComputeRequest
  ): Promise<NetworkComputeResponse> {
    const data = NetworkComputeRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.NetworkComputeBridgeWorker",
      "NetworkCompute",
      data
    );
    return promise.then((data) =>
      NetworkComputeResponse.decode(new _m0.Reader(data))
    );
  }

  ListAvailableModels(
    request: ListAvailableModelsRequest
  ): Promise<ListAvailableModelsResponse> {
    const data = ListAvailableModelsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.NetworkComputeBridgeWorker",
      "ListAvailableModels",
      data
    );
    return promise.then((data) =>
      ListAvailableModelsResponse.decode(new _m0.Reader(data))
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
