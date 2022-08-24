/* eslint-disable */
import {
  ListCaptureActionsResponse,
  ListStoredDataResponse,
  StoreDataResponse,
  ListStoredImagesResponse,
  StoreImageResponse,
  ListStoredMetadataResponse,
  StoreMetadataResponse,
  ListStoredAlertDataResponse,
  StoreAlertDataResponse,
  ListCaptureActionsRequest,
  ListStoredDataRequest,
  StoreDataRequest,
  ListStoredImagesRequest,
  StoreImageRequest,
  ListStoredMetadataRequest,
  StoreMetadataRequest,
  ListStoredAlertDataRequest,
  StoreAlertDataRequest,
} from "./data_acquisition_store";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/**
 * The DataAcquisitionStoreService is used to store data (images, data, metadata) on the robot
 * in association with the DataIdentifiers specified by the DataAcquisitionService. Additionally,
 * requests can be made to the DataAcquisitionStoreService to identify different pieces of data or entire
 * capture actions which match query parameters, such as time ranges or action/group names.
 */
export interface DataAcquisitionStoreService {
  /**
   * List all CaptureActionIds (which identify an entire AcquireData RPC's data captures)
   * that match the query parameters provided in the request.
   */
  ListCaptureActions(
    request: ListCaptureActionsRequest
  ): Promise<ListCaptureActionsResponse>;
  /**
   * List data identifiers (which identify specific pieces of data from
   * an action) for stored data that satisfy the query parameters in the request.
   */
  ListStoredData(
    request: ListStoredDataRequest
  ): Promise<ListStoredDataResponse>;
  /** Store arbitrary data associated with a DataIdentifier. */
  StoreData(request: StoreDataRequest): Promise<StoreDataResponse>;
  /**
   * Type-safe to images: list data identifiers (which identify specific images
   * from an action) for stored images that satisfy the
   * query parameters in the request.
   */
  ListStoredImages(
    request: ListStoredImagesRequest
  ): Promise<ListStoredImagesResponse>;
  /** Type-safe to images: store image data associated with a DataIdentifier. */
  StoreImage(request: StoreImageRequest): Promise<StoreImageResponse>;
  /**
   * Type-safe to JSON metadata: list data identifiers (which identify specific metadata from
   * an action) for stored metadata that satisfy the query parameters in the request.
   */
  ListStoredMetadata(
    request: ListStoredMetadataRequest
  ): Promise<ListStoredMetadataResponse>;
  /** Type-safe to JSON metadata: store metadata associated with a DataIdentifier. */
  StoreMetadata(request: StoreMetadataRequest): Promise<StoreMetadataResponse>;
  /**
   * List data identifiers (which identify specific AlertData from
   * an action) for stored AlertData that satisfy the query parameters in the request.
   */
  ListStoredAlertData(
    request: ListStoredAlertDataRequest
  ): Promise<ListStoredAlertDataResponse>;
  /** Store AlertData associated with a DataIdentifier. */
  StoreAlertData(
    request: StoreAlertDataRequest
  ): Promise<StoreAlertDataResponse>;
}

export class DataAcquisitionStoreServiceClientImpl
  implements DataAcquisitionStoreService
{
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ListCaptureActions = this.ListCaptureActions.bind(this);
    this.ListStoredData = this.ListStoredData.bind(this);
    this.StoreData = this.StoreData.bind(this);
    this.ListStoredImages = this.ListStoredImages.bind(this);
    this.StoreImage = this.StoreImage.bind(this);
    this.ListStoredMetadata = this.ListStoredMetadata.bind(this);
    this.StoreMetadata = this.StoreMetadata.bind(this);
    this.ListStoredAlertData = this.ListStoredAlertData.bind(this);
    this.StoreAlertData = this.StoreAlertData.bind(this);
  }
  ListCaptureActions(
    request: ListCaptureActionsRequest
  ): Promise<ListCaptureActionsResponse> {
    const data = ListCaptureActionsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.DataAcquisitionStoreService",
      "ListCaptureActions",
      data
    );
    return promise.then((data) =>
      ListCaptureActionsResponse.decode(new _m0.Reader(data))
    );
  }

  ListStoredData(
    request: ListStoredDataRequest
  ): Promise<ListStoredDataResponse> {
    const data = ListStoredDataRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.DataAcquisitionStoreService",
      "ListStoredData",
      data
    );
    return promise.then((data) =>
      ListStoredDataResponse.decode(new _m0.Reader(data))
    );
  }

  StoreData(request: StoreDataRequest): Promise<StoreDataResponse> {
    const data = StoreDataRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.DataAcquisitionStoreService",
      "StoreData",
      data
    );
    return promise.then((data) =>
      StoreDataResponse.decode(new _m0.Reader(data))
    );
  }

  ListStoredImages(
    request: ListStoredImagesRequest
  ): Promise<ListStoredImagesResponse> {
    const data = ListStoredImagesRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.DataAcquisitionStoreService",
      "ListStoredImages",
      data
    );
    return promise.then((data) =>
      ListStoredImagesResponse.decode(new _m0.Reader(data))
    );
  }

  StoreImage(request: StoreImageRequest): Promise<StoreImageResponse> {
    const data = StoreImageRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.DataAcquisitionStoreService",
      "StoreImage",
      data
    );
    return promise.then((data) =>
      StoreImageResponse.decode(new _m0.Reader(data))
    );
  }

  ListStoredMetadata(
    request: ListStoredMetadataRequest
  ): Promise<ListStoredMetadataResponse> {
    const data = ListStoredMetadataRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.DataAcquisitionStoreService",
      "ListStoredMetadata",
      data
    );
    return promise.then((data) =>
      ListStoredMetadataResponse.decode(new _m0.Reader(data))
    );
  }

  StoreMetadata(request: StoreMetadataRequest): Promise<StoreMetadataResponse> {
    const data = StoreMetadataRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.DataAcquisitionStoreService",
      "StoreMetadata",
      data
    );
    return promise.then((data) =>
      StoreMetadataResponse.decode(new _m0.Reader(data))
    );
  }

  ListStoredAlertData(
    request: ListStoredAlertDataRequest
  ): Promise<ListStoredAlertDataResponse> {
    const data = ListStoredAlertDataRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.DataAcquisitionStoreService",
      "ListStoredAlertData",
      data
    );
    return promise.then((data) =>
      ListStoredAlertDataResponse.decode(new _m0.Reader(data))
    );
  }

  StoreAlertData(
    request: StoreAlertDataRequest
  ): Promise<StoreAlertDataResponse> {
    const data = StoreAlertDataRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.DataAcquisitionStoreService",
      "StoreAlertData",
      data
    );
    return promise.then((data) =>
      StoreAlertDataResponse.decode(new _m0.Reader(data))
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
