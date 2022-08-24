/* eslint-disable */
import {
  GetServiceEntryResponse,
  ListServiceEntriesResponse,
  GetServiceEntryRequest,
  ListServiceEntriesRequest,
} from "./directory";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/** DirectoryService lets clients discover which API services are available on a robot. */
export interface DirectoryService {
  /** Get information about a specific service. */
  GetServiceEntry(
    request: GetServiceEntryRequest
  ): Promise<GetServiceEntryResponse>;
  /** List all known services at time of call. */
  ListServiceEntries(
    request: ListServiceEntriesRequest
  ): Promise<ListServiceEntriesResponse>;
}

export class DirectoryServiceClientImpl implements DirectoryService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetServiceEntry = this.GetServiceEntry.bind(this);
    this.ListServiceEntries = this.ListServiceEntries.bind(this);
  }
  GetServiceEntry(
    request: GetServiceEntryRequest
  ): Promise<GetServiceEntryResponse> {
    const data = GetServiceEntryRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.DirectoryService",
      "GetServiceEntry",
      data
    );
    return promise.then((data) =>
      GetServiceEntryResponse.decode(new _m0.Reader(data))
    );
  }

  ListServiceEntries(
    request: ListServiceEntriesRequest
  ): Promise<ListServiceEntriesResponse> {
    const data = ListServiceEntriesRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.DirectoryService",
      "ListServiceEntries",
      data
    );
    return promise.then((data) =>
      ListServiceEntriesResponse.decode(new _m0.Reader(data))
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
