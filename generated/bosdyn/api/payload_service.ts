/* eslint-disable */
import { ListPayloadsResponse, ListPayloadsRequest } from "./payload";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/** This service provides a way to query for the currently-registered payloads. */
export interface PayloadService {
  /** List all payloads the robot knows about. */
  ListPayloads(request: ListPayloadsRequest): Promise<ListPayloadsResponse>;
}

export class PayloadServiceClientImpl implements PayloadService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ListPayloads = this.ListPayloads.bind(this);
  }
  ListPayloads(request: ListPayloadsRequest): Promise<ListPayloadsResponse> {
    const data = ListPayloadsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.PayloadService",
      "ListPayloads",
      data
    );
    return promise.then((data) =>
      ListPayloadsResponse.decode(new _m0.Reader(data))
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
