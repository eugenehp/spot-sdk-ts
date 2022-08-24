/* eslint-disable */
import {
  IREnableDisableResponse,
  IREnableDisableRequest,
} from "./ir_enable_disable";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

export interface IREnableDisableService {
  IREnableDisable(
    request: IREnableDisableRequest
  ): Promise<IREnableDisableResponse>;
}

export class IREnableDisableServiceClientImpl
  implements IREnableDisableService
{
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.IREnableDisable = this.IREnableDisable.bind(this);
  }
  IREnableDisable(
    request: IREnableDisableRequest
  ): Promise<IREnableDisableResponse> {
    const data = IREnableDisableRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.IREnableDisableService",
      "IREnableDisable",
      data
    );
    return promise.then((data) =>
      IREnableDisableResponse.decode(new _m0.Reader(data))
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
