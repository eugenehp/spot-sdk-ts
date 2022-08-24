/* eslint-disable */
import {
  OpenDoorCommandResponse,
  OpenDoorFeedbackResponse,
  OpenDoorCommandRequest,
  OpenDoorFeedbackRequest,
} from "./door";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api.spot";

export interface DoorService {
  OpenDoor(request: OpenDoorCommandRequest): Promise<OpenDoorCommandResponse>;
  OpenDoorFeedback(
    request: OpenDoorFeedbackRequest
  ): Promise<OpenDoorFeedbackResponse>;
}

export class DoorServiceClientImpl implements DoorService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.OpenDoor = this.OpenDoor.bind(this);
    this.OpenDoorFeedback = this.OpenDoorFeedback.bind(this);
  }
  OpenDoor(request: OpenDoorCommandRequest): Promise<OpenDoorCommandResponse> {
    const data = OpenDoorCommandRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot.DoorService",
      "OpenDoor",
      data
    );
    return promise.then((data) =>
      OpenDoorCommandResponse.decode(new _m0.Reader(data))
    );
  }

  OpenDoorFeedback(
    request: OpenDoorFeedbackRequest
  ): Promise<OpenDoorFeedbackResponse> {
    const data = OpenDoorFeedbackRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot.DoorService",
      "OpenDoorFeedback",
      data
    );
    return promise.then((data) =>
      OpenDoorFeedbackResponse.decode(new _m0.Reader(data))
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
