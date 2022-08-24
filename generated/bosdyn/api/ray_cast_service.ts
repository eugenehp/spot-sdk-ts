/* eslint-disable */
import { RaycastResponse, RaycastRequest } from "./ray_cast";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

export interface RayCastService {
  /**
   * Asks robot to cast the desired ray against its map of the
   * surrounding environment to find the nearest intersection point.
   */
  Raycast(request: RaycastRequest): Promise<RaycastResponse>;
}

export class RayCastServiceClientImpl implements RayCastService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Raycast = this.Raycast.bind(this);
  }
  Raycast(request: RaycastRequest): Promise<RaycastResponse> {
    const data = RaycastRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.RayCastService",
      "Raycast",
      data
    );
    return promise.then((data) => RaycastResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}
