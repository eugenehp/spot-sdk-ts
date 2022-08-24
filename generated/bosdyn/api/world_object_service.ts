/* eslint-disable */
import {
  ListWorldObjectResponse,
  MutateWorldObjectResponse,
  ListWorldObjectRequest,
  MutateWorldObjectRequest,
} from "./world_object";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/** The world object service provides a way to track and store objects detected in the world around the robot. */
export interface WorldObjectService {
  /** Request a list of all the world objects in the robot's perception scene. */
  ListWorldObjects(
    request: ListWorldObjectRequest
  ): Promise<ListWorldObjectResponse>;
  /** Mutate (add, change, or delete) the world objects. */
  MutateWorldObjects(
    request: MutateWorldObjectRequest
  ): Promise<MutateWorldObjectResponse>;
}

export class WorldObjectServiceClientImpl implements WorldObjectService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ListWorldObjects = this.ListWorldObjects.bind(this);
    this.MutateWorldObjects = this.MutateWorldObjects.bind(this);
  }
  ListWorldObjects(
    request: ListWorldObjectRequest
  ): Promise<ListWorldObjectResponse> {
    const data = ListWorldObjectRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.WorldObjectService",
      "ListWorldObjects",
      data
    );
    return promise.then((data) =>
      ListWorldObjectResponse.decode(new _m0.Reader(data))
    );
  }

  MutateWorldObjects(
    request: MutateWorldObjectRequest
  ): Promise<MutateWorldObjectResponse> {
    const data = MutateWorldObjectRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.WorldObjectService",
      "MutateWorldObjects",
      data
    );
    return promise.then((data) =>
      MutateWorldObjectResponse.decode(new _m0.Reader(data))
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
