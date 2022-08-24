/* eslint-disable */
import {
  TriggerServiceFaultResponse,
  ClearServiceFaultResponse,
  TriggerServiceFaultRequest,
  ClearServiceFaultRequest,
} from "./service_fault";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/** The service fault service enables modification of the robot state ServiceFaultState. */
export interface FaultService {
  /** Sends a ServiceFault to be reporting in robot state. */
  TriggerServiceFault(
    request: TriggerServiceFaultRequest
  ): Promise<TriggerServiceFaultResponse>;
  /** Clears an active ServiceFault from robot state. */
  ClearServiceFault(
    request: ClearServiceFaultRequest
  ): Promise<ClearServiceFaultResponse>;
}

export class FaultServiceClientImpl implements FaultService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.TriggerServiceFault = this.TriggerServiceFault.bind(this);
    this.ClearServiceFault = this.ClearServiceFault.bind(this);
  }
  TriggerServiceFault(
    request: TriggerServiceFaultRequest
  ): Promise<TriggerServiceFaultResponse> {
    const data = TriggerServiceFaultRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.FaultService",
      "TriggerServiceFault",
      data
    );
    return promise.then((data) =>
      TriggerServiceFaultResponse.decode(new _m0.Reader(data))
    );
  }

  ClearServiceFault(
    request: ClearServiceFaultRequest
  ): Promise<ClearServiceFaultResponse> {
    const data = ClearServiceFaultRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.FaultService",
      "ClearServiceFault",
      data
    );
    return promise.then((data) =>
      ClearServiceFaultResponse.decode(new _m0.Reader(data))
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
