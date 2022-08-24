/* eslint-disable */
import {
  ListImageSourcesResponse,
  GetImageResponse,
  ListImageSourcesRequest,
  GetImageRequest,
} from "./image";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/**
 * An Image service provides access to one or more images, for example from cameras. It
 * supports querying for the list of available images provided by the service and then
 * supports requesting a latest given image by source name.
 */
export interface ImageService {
  /**
   * Obtain the list of ImageSources for this given service.
   * Note that there may be multiple ImageServices running, each with their own set of sources
   * The name field keys access to individual images when calling GetImage.
   */
  ListImageSources(
    request: ListImageSourcesRequest
  ): Promise<ListImageSourcesResponse>;
  /** Request an image by name, with optional parameters for requesting image quality level. */
  GetImage(request: GetImageRequest): Promise<GetImageResponse>;
}

export class ImageServiceClientImpl implements ImageService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ListImageSources = this.ListImageSources.bind(this);
    this.GetImage = this.GetImage.bind(this);
  }
  ListImageSources(
    request: ListImageSourcesRequest
  ): Promise<ListImageSourcesResponse> {
    const data = ListImageSourcesRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.ImageService",
      "ListImageSources",
      data
    );
    return promise.then((data) =>
      ListImageSourcesResponse.decode(new _m0.Reader(data))
    );
  }

  GetImage(request: GetImageRequest): Promise<GetImageResponse> {
    const data = GetImageRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.ImageService",
      "GetImage",
      data
    );
    return promise.then((data) =>
      GetImageResponse.decode(new _m0.Reader(data))
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
