/* eslint-disable */
import {
  AddLogAnnotationResponse,
  AddLogAnnotationRequest,
} from "./log_annotation";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/**
 * DEPRECATED as of 2.1.0: Please use the DataBufferService instead of the LogAnnotationService.
 * The LogAnnotationService is deprecated in release 2.1 and may be removed in the
 * future.
 * LogAnnotationService allows adding information to the robot's log files.
 * This service is a mechanism for adding information to the robot's log files.
 */
export interface LogAnnotationService {
  /** Add the specified information to the robot's log files. */
  AddLogAnnotation(
    request: AddLogAnnotationRequest
  ): Promise<AddLogAnnotationResponse>;
}

export class LogAnnotationServiceClientImpl implements LogAnnotationService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.AddLogAnnotation = this.AddLogAnnotation.bind(this);
  }
  AddLogAnnotation(
    request: AddLogAnnotationRequest
  ): Promise<AddLogAnnotationResponse> {
    const data = AddLogAnnotationRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.LogAnnotationService",
      "AddLogAnnotation",
      data
    );
    return promise.then((data) =>
      AddLogAnnotationResponse.decode(new _m0.Reader(data))
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
