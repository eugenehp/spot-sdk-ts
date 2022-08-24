/* eslint-disable */
import { TimeSyncUpdateResponse, TimeSyncUpdateRequest } from "./time_sync";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/**
 * The time-sync service estimates the difference between server and client clocks.
 * Time synchronization is a tool which allows applications to work in a unified timebase with
 * precision. It is useful in cases where a precise time must be set, independently of network
 * communication lag. In distributed systems and robotics, hardware, system-level, and per-process
 * approaches can be used to obtain synchronization.
 * This service implements a stand alone time synchronization service. It enables clients to
 * establish a per-process offset between two processes which may be on separate systems.
 */
export interface TimeSyncService {
  /**
   * See the exchange documentation in time_sync.proto. This call makes one client/server
   * round trip toward clock synchronization.
   */
  TimeSyncUpdate(
    request: TimeSyncUpdateRequest
  ): Promise<TimeSyncUpdateResponse>;
}

export class TimeSyncServiceClientImpl implements TimeSyncService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.TimeSyncUpdate = this.TimeSyncUpdate.bind(this);
  }
  TimeSyncUpdate(
    request: TimeSyncUpdateRequest
  ): Promise<TimeSyncUpdateResponse> {
    const data = TimeSyncUpdateRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.TimeSyncService",
      "TimeSyncUpdate",
      data
    );
    return promise.then((data) =>
      TimeSyncUpdateResponse.decode(new _m0.Reader(data))
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
