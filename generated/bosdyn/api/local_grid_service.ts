/* eslint-disable */
import {
  GetLocalGridTypesResponse,
  GetLocalGridsResponse,
  GetLocalGridTypesRequest,
  GetLocalGridsRequest,
} from "./local_grid";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/**
 * The map service provides access multiple kinds of cell-based map data.
 * It supports querying for the list of available types of local grids provided by the service,
 * and supports requesting a set of the latest local grids by map type name.
 */
export interface LocalGridService {
  /**
   * Obtain the list of available map types.
   * The name field keys access to individual local grids when calling GetLocalGrids.
   */
  GetLocalGridTypes(
    request: GetLocalGridTypesRequest
  ): Promise<GetLocalGridTypesResponse>;
  /** Request a set of local grids by type name. */
  GetLocalGrids(request: GetLocalGridsRequest): Promise<GetLocalGridsResponse>;
}

export class LocalGridServiceClientImpl implements LocalGridService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetLocalGridTypes = this.GetLocalGridTypes.bind(this);
    this.GetLocalGrids = this.GetLocalGrids.bind(this);
  }
  GetLocalGridTypes(
    request: GetLocalGridTypesRequest
  ): Promise<GetLocalGridTypesResponse> {
    const data = GetLocalGridTypesRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.LocalGridService",
      "GetLocalGridTypes",
      data
    );
    return promise.then((data) =>
      GetLocalGridTypesResponse.decode(new _m0.Reader(data))
    );
  }

  GetLocalGrids(request: GetLocalGridsRequest): Promise<GetLocalGridsResponse> {
    const data = GetLocalGridsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.LocalGridService",
      "GetLocalGrids",
      data
    );
    return promise.then((data) =>
      GetLocalGridsResponse.decode(new _m0.Reader(data))
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
