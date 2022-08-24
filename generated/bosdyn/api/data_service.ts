/* eslint-disable */
import {
  GetDataIndexResponse,
  GetEventsCommentsResponse,
  GetDataBufferStatusResponse,
  GetDataPagesResponse,
  DeleteDataPagesResponse,
  GetDataIndexRequest,
  GetEventsCommentsRequest,
  GetDataBufferStatusRequest,
  GetDataPagesRequest,
  DeleteDataPagesRequest,
} from "./data_index";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/** DataBufferService allows adding information to the robot's log files. */

/** The DataService is a mechanism for querying and managing data stored on robot. */
export interface DataService {
  /** Get index of current data matching a given DataQuery. */
  GetDataIndex(request: GetDataIndexRequest): Promise<GetDataIndexResponse>;
  /** Get events and comments. */
  GetEventsComments(
    request: GetEventsCommentsRequest
  ): Promise<GetEventsCommentsResponse>;
  /** Get basic stats on data buffer storage. */
  GetDataBufferStatus(
    request: GetDataBufferStatusRequest
  ): Promise<GetDataBufferStatusResponse>;
  /** Get a list pf pages matching a given time range */
  GetDataPages(request: GetDataPagesRequest): Promise<GetDataPagesResponse>;
  /** Delete a list of pages matching a given time range or page ids */
  DeleteDataPages(
    request: DeleteDataPagesRequest
  ): Promise<DeleteDataPagesResponse>;
}

export class DataServiceClientImpl implements DataService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetDataIndex = this.GetDataIndex.bind(this);
    this.GetEventsComments = this.GetEventsComments.bind(this);
    this.GetDataBufferStatus = this.GetDataBufferStatus.bind(this);
    this.GetDataPages = this.GetDataPages.bind(this);
    this.DeleteDataPages = this.DeleteDataPages.bind(this);
  }
  GetDataIndex(request: GetDataIndexRequest): Promise<GetDataIndexResponse> {
    const data = GetDataIndexRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.DataService",
      "GetDataIndex",
      data
    );
    return promise.then((data) =>
      GetDataIndexResponse.decode(new _m0.Reader(data))
    );
  }

  GetEventsComments(
    request: GetEventsCommentsRequest
  ): Promise<GetEventsCommentsResponse> {
    const data = GetEventsCommentsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.DataService",
      "GetEventsComments",
      data
    );
    return promise.then((data) =>
      GetEventsCommentsResponse.decode(new _m0.Reader(data))
    );
  }

  GetDataBufferStatus(
    request: GetDataBufferStatusRequest
  ): Promise<GetDataBufferStatusResponse> {
    const data = GetDataBufferStatusRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.DataService",
      "GetDataBufferStatus",
      data
    );
    return promise.then((data) =>
      GetDataBufferStatusResponse.decode(new _m0.Reader(data))
    );
  }

  GetDataPages(request: GetDataPagesRequest): Promise<GetDataPagesResponse> {
    const data = GetDataPagesRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.DataService",
      "GetDataPages",
      data
    );
    return promise.then((data) =>
      GetDataPagesResponse.decode(new _m0.Reader(data))
    );
  }

  DeleteDataPages(
    request: DeleteDataPagesRequest
  ): Promise<DeleteDataPagesResponse> {
    const data = DeleteDataPagesRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.DataService",
      "DeleteDataPages",
      data
    );
    return promise.then((data) =>
      DeleteDataPagesResponse.decode(new _m0.Reader(data))
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
