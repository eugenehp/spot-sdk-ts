/* eslint-disable */
import {
  GripperCameraParamResponse,
  GripperCameraGetParamResponse,
  GripperCameraParamRequest,
  GripperCameraGetParamRequest,
} from "./gripper_camera_param";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

export interface GripperCameraParamService {
  SetParams(
    request: GripperCameraParamRequest
  ): Promise<GripperCameraParamResponse>;
  GetParams(
    request: GripperCameraGetParamRequest
  ): Promise<GripperCameraGetParamResponse>;
}

export class GripperCameraParamServiceClientImpl
  implements GripperCameraParamService
{
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.SetParams = this.SetParams.bind(this);
    this.GetParams = this.GetParams.bind(this);
  }
  SetParams(
    request: GripperCameraParamRequest
  ): Promise<GripperCameraParamResponse> {
    const data = GripperCameraParamRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.GripperCameraParamService",
      "SetParams",
      data
    );
    return promise.then((data) =>
      GripperCameraParamResponse.decode(new _m0.Reader(data))
    );
  }

  GetParams(
    request: GripperCameraGetParamRequest
  ): Promise<GripperCameraGetParamResponse> {
    const data = GripperCameraGetParamRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.GripperCameraParamService",
      "GetParams",
      data
    );
    return promise.then((data) =>
      GripperCameraGetParamResponse.decode(new _m0.Reader(data))
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
