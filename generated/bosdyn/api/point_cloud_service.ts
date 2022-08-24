/* eslint-disable */
import {
  ListPointCloudSourcesResponse,
  GetPointCloudResponse,
  ListPointCloudSourcesRequest,
  GetPointCloudRequest,
} from "./point_cloud";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/**
 * The point cloud service provides access to one or more point cloud sources, for example
 * from a lidar. It supports querying the list of available sources provided by the service
 * and it supports requesting the latest point cloud data for each source by name.
 */
export interface PointCloudService {
  /**
   * Obtain the list of PointCloudSources for this given service.
   * Note that there may be multiple PointCloudServices running, each with their own set of sources
   * The name field keys access to individual point clouds when calling GetPointCloud.
   */
  ListPointCloudSources(
    request: ListPointCloudSourcesRequest
  ): Promise<ListPointCloudSourcesResponse>;
  /** Request point clouds by source name. */
  GetPointCloud(request: GetPointCloudRequest): Promise<GetPointCloudResponse>;
}

export class PointCloudServiceClientImpl implements PointCloudService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ListPointCloudSources = this.ListPointCloudSources.bind(this);
    this.GetPointCloud = this.GetPointCloud.bind(this);
  }
  ListPointCloudSources(
    request: ListPointCloudSourcesRequest
  ): Promise<ListPointCloudSourcesResponse> {
    const data = ListPointCloudSourcesRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.PointCloudService",
      "ListPointCloudSources",
      data
    );
    return promise.then((data) =>
      ListPointCloudSourcesResponse.decode(new _m0.Reader(data))
    );
  }

  GetPointCloud(request: GetPointCloudRequest): Promise<GetPointCloudResponse> {
    const data = GetPointCloudRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.PointCloudService",
      "GetPointCloud",
      data
    );
    return promise.then((data) =>
      GetPointCloudResponse.decode(new _m0.Reader(data))
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
