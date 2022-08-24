/* eslint-disable */
import {
  Image_PixelFormat,
  ImageSource,
  image_PixelFormatFromJSON,
  image_PixelFormatToJSON,
} from "./image";
import {
  NetworkComputeStatus,
  NetworkComputeServerConfiguration,
  ModelLabels,
  NetworkComputeInputData,
  networkComputeStatusFromJSON,
  networkComputeStatusToJSON,
} from "./network_compute_bridge";
import { Timestamp } from "../../google/protobuf/timestamp";
import { AlertData } from "./alerts";
import { Any } from "../../google/protobuf/any";
import { RequestHeader, ResponseHeader } from "./header";
import { Duration } from "../../google/protobuf/duration";
import _m0 from "protobufjs/minimal";
import { Struct } from "../../google/protobuf/struct";

export const protobufPackage = "bosdyn.api";

/**
 * Description of a data acquisition capability. A data acquisition plugin service will have a
 * set of capabilities for which it can acquire and save the appropriate data.
 */
export interface DataAcquisitionCapability {
  /**
   * Unique identifier for the data acquisition capability. Used for identification purposes
   * when making acquire data requests.
   */
  name: string;
  /** A human readable name of the data acquisition capability that will be shown on the tablet. */
  description: string;
  /**
   * Channel name that will be associated with all data stored in the data buffer through
   * each data acquisition plugin. Metadata acquirers do not specify this field.
   */
  channelName: string;
  /** The data acquisition plugin service's service name used in directory registration. */
  serviceName: string;
}

/**
 * Description of an image acquisition capability. The image acquisition capabilities will be available
 * through the main data acquisition service on robot and are populated based on all bosdyn.api.ImageService
 * services registered to the robot's directory.
 */
export interface ImageAcquisitionCapability {
  /** The image service's service name used in directory registration. */
  serviceName: string;
  /**
   * (Depricate) Please use "image_sources" below for information regarding the image source
   * associated with the service.
   */
  imageSourceNames: string[];
  /** List of image sources reported by the image service (through the ListImageSources RPC). */
  imageSources: ImageSource[];
}

export interface NetworkComputeCapability {
  /** Service information. */
  serverConfig: NetworkComputeServerConfiguration | undefined;
  /** Provide list of available models */
  availableModels: string[];
  labels: ModelLabels[];
}

/**
 * A list of all capabilities (data and images) that a specific data acquisition plugin service can successfully
 * acquire and save the data specified in each capability.
 */
export interface AcquisitionCapabilityList {
  /** List of non-image data acquisition capabilities. */
  dataSources: DataAcquisitionCapability[];
  /** List of image data acquisition capabilities. */
  imageSources: ImageAcquisitionCapability[];
  /** List of network compute capabilities. */
  networkComputeSources: NetworkComputeCapability[];
}

/**
 * The CaptureActionId describes the entire capture action for an AcquireData request and will be used
 * to uniquely identify that full request's set of stored data.
 */
export interface CaptureActionId {
  /**
   * The action name is used to group all pieces of data associated with a single AcquireData
   * request. The action name must be unique for the given group name, meaning no two actions
   * with the same group name can have the same action name.
   */
  actionName: string;
  /**
   * The group name is used to group a "session" of data, such as a mission or a teleop capture session, which
   * includes multiple capture actions (from multiple AcquireData RPCs).
   */
  groupName: string;
  /**
   * Time (in the robot's clock) at which this capture was triggered. If the timestamp is not specified
   * in the AcquireData RPC, the main data acquisition service on robot will populate the timestamp field
   * with the timestamp of when the RPC was recieved.
   */
  timestamp: Date | undefined;
}

/** A way to identify an individual piece of data stored in the data buffer. */
export interface DataIdentifier {
  /** The action where the data was acquired. */
  actionId: CaptureActionId | undefined;
  /**
   * Data buffer channel associated with the DataBlob. The channel is used to group data across
   * actions by a specific source, and it can be used in queries to retrieve some subset of data. For example,
   * the channel could be "ptz" and queries can be made for all PTZ images.
   */
  channel: string;
  /**
   * Data-specific identifier that can optionally be used to disambiguate cases where the action_id and
   * channel are insufficient. For example, you save cropped SpotCAM pano image that are detected as gauges to
   * a "detected_gauges" channel, but want a way to further individually identify them as each specific gauge,
   * so you give each detection a unique data_name.
   */
  dataName: string;
}

/**
 * Structured data that can be included within a AcquireData RPC and saved in association with
 * that capture action.
 */
export interface Metadata {
  /** JSON representation of metadata. */
  data: { [key: string]: any } | undefined;
}

/**
 * This message can be stored as a DataBlob in the data buffer in order to be recognized as
 * metadata that is associated with previously stored data.
 */
export interface AssociatedMetadata {
  /**
   * The data that this metadata refers to.
   * The timestamp field is ignored.
   * If only the action_id is filled out, this metadata is associated with the entire capture action.
   */
  referenceId: DataIdentifier | undefined;
  /** Metadata message to be stored. */
  metadata: Metadata | undefined;
}

/**
 * This message can be stored as a DataBlob in the data buffer in order to be recognized as
 * AlertData that is associated with previously stored data.
 */
export interface AssociatedAlertData {
  /**
   * The data that this AlertData refers to.
   * The timestamp field is ignored.
   * If only the action_id is filled out, this AlertData is associated with the entire capture action.
   */
  referenceId: DataIdentifier | undefined;
  /** AlertData message to be stored. */
  alertData: AlertData | undefined;
}

/**
 * An individual capture which can be specified in the AcquireData request to identify a piece of
 * image data to be collected.
 */
export interface ImageSourceCapture {
  /** Name of the image service that the data should be requested from. */
  imageService: string;
  /**
   * Specific image source to use from the list reported by the image service within the
   * ImageAcquisitionCapability message.
   */
  imageSource: string;
  /** Specific pixel format to capture reported by the ImageAcquisitionCapability message. */
  pixelFormat: Image_PixelFormat;
}

/**
 * An individual capture which can be specified in the AcquireData request to identify a piece of
 * non-image data to be collected.
 */
export interface DataCapture {
  /**
   * Name of the data to be captured. This should match the uniquely identifying name from
   * the DataAcquisitionCapability.
   */
  name: string;
}

export interface NetworkComputeCapture {
  /** Data source and model. */
  inputData: NetworkComputeInputData | undefined;
  /** Which service to use. */
  serverConfig: NetworkComputeServerConfiguration | undefined;
}

/** The grouping of all individual image and data captures for a given capture action. */
export interface AcquisitionRequestList {
  /** List of image requests. */
  imageCaptures: ImageSourceCapture[];
  /** List of non-image data and metadata requests. */
  dataCaptures: DataCapture[];
  /** List of Network Compute Bridge requests */
  networkComputeCaptures: NetworkComputeCapture[];
}

/** An error associated with a particular capture action and piece of data. */
export interface DataError {
  /** Identifier for the data to be saved. */
  dataId: DataIdentifier | undefined;
  /** Human-readable message describing the error. */
  errorMessage: string;
  /** Custom plugin-specific data about the problem. */
  errorData: Any | undefined;
}

/** An error associated with a particular data acquisition plugin service that was */
export interface PluginServiceError {
  /** Name of the service with the error */
  serviceName: string;
  /** Failure mode. */
  error: PluginServiceError_ErrorCode;
  /** Description of the error. */
  message: string;
}

/** Possible ways a plugin can fail. */
export enum PluginServiceError_ErrorCode {
  STATUS_UNKNOWN = 0,
  /** STATUS_REQUEST_ERROR - The initial RPC to the plugin failed */
  STATUS_REQUEST_ERROR = 1,
  /** STATUS_GETSTATUS_ERROR - The GetStatus request to the plugin failed with a data error or timeout. */
  STATUS_GETSTATUS_ERROR = 2,
  /** STATUS_INTERNAL_ERROR - The plugin reported an internal error. */
  STATUS_INTERNAL_ERROR = 3,
  UNRECOGNIZED = -1,
}

export function pluginServiceError_ErrorCodeFromJSON(
  object: any
): PluginServiceError_ErrorCode {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return PluginServiceError_ErrorCode.STATUS_UNKNOWN;
    case 1:
    case "STATUS_REQUEST_ERROR":
      return PluginServiceError_ErrorCode.STATUS_REQUEST_ERROR;
    case 2:
    case "STATUS_GETSTATUS_ERROR":
      return PluginServiceError_ErrorCode.STATUS_GETSTATUS_ERROR;
    case 3:
    case "STATUS_INTERNAL_ERROR":
      return PluginServiceError_ErrorCode.STATUS_INTERNAL_ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PluginServiceError_ErrorCode.UNRECOGNIZED;
  }
}

export function pluginServiceError_ErrorCodeToJSON(
  object: PluginServiceError_ErrorCode
): string {
  switch (object) {
    case PluginServiceError_ErrorCode.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case PluginServiceError_ErrorCode.STATUS_REQUEST_ERROR:
      return "STATUS_REQUEST_ERROR";
    case PluginServiceError_ErrorCode.STATUS_GETSTATUS_ERROR:
      return "STATUS_GETSTATUS_ERROR";
    case PluginServiceError_ErrorCode.STATUS_INTERNAL_ERROR:
      return "STATUS_INTERNAL_ERROR";
    case PluginServiceError_ErrorCode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface NetworkComputeError {
  /** Name of the service with the error */
  serviceName: string;
  /** General type of error that occurred. */
  error: NetworkComputeError_ErrorCode;
  /** Any particular failure mode reported. */
  networkComputeStatus: NetworkComputeStatus;
  /** Description of the error. */
  message: string;
}

export enum NetworkComputeError_ErrorCode {
  STATUS_UNKNOWN = 0,
  /** STATUS_REQUEST_ERROR - The request was rejected. */
  STATUS_REQUEST_ERROR = 1,
  /** STATUS_NETWORK_ERROR - The request had an error reaching the worker. */
  STATUS_NETWORK_ERROR = 2,
  /** STATUS_INTERNAL_ERROR - Some other problem prevented the request from succeeding. */
  STATUS_INTERNAL_ERROR = 3,
  UNRECOGNIZED = -1,
}

export function networkComputeError_ErrorCodeFromJSON(
  object: any
): NetworkComputeError_ErrorCode {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return NetworkComputeError_ErrorCode.STATUS_UNKNOWN;
    case 1:
    case "STATUS_REQUEST_ERROR":
      return NetworkComputeError_ErrorCode.STATUS_REQUEST_ERROR;
    case 2:
    case "STATUS_NETWORK_ERROR":
      return NetworkComputeError_ErrorCode.STATUS_NETWORK_ERROR;
    case 3:
    case "STATUS_INTERNAL_ERROR":
      return NetworkComputeError_ErrorCode.STATUS_INTERNAL_ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return NetworkComputeError_ErrorCode.UNRECOGNIZED;
  }
}

export function networkComputeError_ErrorCodeToJSON(
  object: NetworkComputeError_ErrorCode
): string {
  switch (object) {
    case NetworkComputeError_ErrorCode.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case NetworkComputeError_ErrorCode.STATUS_REQUEST_ERROR:
      return "STATUS_REQUEST_ERROR";
    case NetworkComputeError_ErrorCode.STATUS_NETWORK_ERROR:
      return "STATUS_NETWORK_ERROR";
    case NetworkComputeError_ErrorCode.STATUS_INTERNAL_ERROR:
      return "STATUS_INTERNAL_ERROR";
    case NetworkComputeError_ErrorCode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface AcquireDataRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Define the unique action that all data should be saved with. */
  actionId: CaptureActionId | undefined;
  /** Metadata to store with the data capture. The main DAQ service saves it in the DataBuffer. */
  metadata: Metadata | undefined;
  /** List of capability requests that should be collected as part of this capture action. */
  acquisitionRequests: AcquisitionRequestList | undefined;
  /**
   * Optional duration used to extend the amount of time that the data request may take, in
   * the event that a plugin is incorrectly specifying its timeout.
   * The amount of time allowed will be the maximum of this duration and any requests
   * made to plugins or other capture sources.
   */
  minTimeout: Duration | undefined;
}

export interface AcquireDataResponse {
  /** Common response header */
  header: ResponseHeader | undefined;
  /**
   * Result of the AcquirePluginData RPC call. Further monitoring on the success of the
   * acquisition request can be done using the GetStatus RPC.
   */
  status: AcquireDataResponse_Status;
  /** Identifier which can be used to check the status of or cancel the acquisition action.. */
  requestId: number;
}

export enum AcquireDataResponse_Status {
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - The capture action has successfully started acquiring the data. */
  STATUS_OK = 1,
  /** STATUS_UNKNOWN_CAPTURE_TYPE - One of the capability requests in the AcquisitionRequestList is unknown. */
  STATUS_UNKNOWN_CAPTURE_TYPE = 2,
  UNRECOGNIZED = -1,
}

export function acquireDataResponse_StatusFromJSON(
  object: any
): AcquireDataResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return AcquireDataResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return AcquireDataResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_UNKNOWN_CAPTURE_TYPE":
      return AcquireDataResponse_Status.STATUS_UNKNOWN_CAPTURE_TYPE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AcquireDataResponse_Status.UNRECOGNIZED;
  }
}

export function acquireDataResponse_StatusToJSON(
  object: AcquireDataResponse_Status
): string {
  switch (object) {
    case AcquireDataResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case AcquireDataResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case AcquireDataResponse_Status.STATUS_UNKNOWN_CAPTURE_TYPE:
      return "STATUS_UNKNOWN_CAPTURE_TYPE";
    case AcquireDataResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Message sent by main DAQ service to all data acquisition plugin services. */
export interface AcquirePluginDataRequest {
  /** Common request header */
  header: RequestHeader | undefined;
  /**
   * Metadata acquirers use these DataIdentifier objects to associate them with the acquired
   * metadata when storing them in the DataBuffer.
   * Data acquirers simply get the timestamp from these DataIdentifier objects to use when
   * storing the data in the DataBuffer.
   */
  dataId: DataIdentifier[];
  /** Metadata specified by the requestor. */
  metadata: Metadata | undefined;
  /**
   * Id to be associated with all the data buffered for this request. It will be stored
   * in the DataIdentifier field of each piece of data buffered from this request.
   */
  actionId: CaptureActionId | undefined;
  /** List of capability requests specific for this DAQ plugin. */
  acquisitionRequests: AcquisitionRequestList | undefined;
}

export interface AcquirePluginDataResponse {
  /** Common response header */
  header: ResponseHeader | undefined;
  /**
   * Result of the AcquirePluginData RPC call. Further monitoring on the success of the
   * acquisition request can be done using the GetStatus RPC.
   */
  status: AcquirePluginDataResponse_Status;
  /** Identifier which can be used to check the status of or cancel the acquisition action.. */
  requestId: number;
  /**
   * Time (in the robot's clock) by which this capture should definitely be complete.
   * If it is not complete by this time, something has gone wrong.
   */
  timeoutDeadline: Date | undefined;
}

export enum AcquirePluginDataResponse_Status {
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - The capture action has successfully started acquiring the data. */
  STATUS_OK = 1,
  /** STATUS_UNKNOWN_CAPTURE_TYPE - One of the capability requests in the AcquisitionRequestList is unknown. */
  STATUS_UNKNOWN_CAPTURE_TYPE = 2,
  UNRECOGNIZED = -1,
}

export function acquirePluginDataResponse_StatusFromJSON(
  object: any
): AcquirePluginDataResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return AcquirePluginDataResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return AcquirePluginDataResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_UNKNOWN_CAPTURE_TYPE":
      return AcquirePluginDataResponse_Status.STATUS_UNKNOWN_CAPTURE_TYPE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AcquirePluginDataResponse_Status.UNRECOGNIZED;
  }
}

export function acquirePluginDataResponse_StatusToJSON(
  object: AcquirePluginDataResponse_Status
): string {
  switch (object) {
    case AcquirePluginDataResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case AcquirePluginDataResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case AcquirePluginDataResponse_Status.STATUS_UNKNOWN_CAPTURE_TYPE:
      return "STATUS_UNKNOWN_CAPTURE_TYPE";
    case AcquirePluginDataResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface GetStatusRequest {
  /** Common request header */
  header: RequestHeader | undefined;
  /** Which acquisition to check the status of. */
  requestId: number;
}

export interface GetStatusResponse {
  /** Common response header */
  header: ResponseHeader | undefined;
  status: GetStatusResponse_Status;
  /** Data that has been successfully saved into the data buffer for the capture action. */
  dataSaved: DataIdentifier[];
  /**
   * A list of data captures which have failed in some way during the action.
   * For example, the data acquisition plugin is unable to communicate to a sensor and responds with
   * a data error for that specific data capture.
   */
  dataErrors: DataError[];
  /**
   * Services which failed independent of a particular data id.
   * For example, if a plugin times out or crashes, it could be reported here.
   */
  serviceErrors: PluginServiceError[];
  /**
   * Network compute services which failed independent of a particular data id.
   * For example, if a worker times out or crashes, it could be reported here.
   */
  networkComputeErrors: NetworkComputeError[];
}

export enum GetStatusResponse_Status {
  STATUS_UNKNOWN = 0,
  /** STATUS_ACQUIRING - [Status] Data acquisition is still in progress */
  STATUS_ACQUIRING = 1,
  /** STATUS_SAVING - [Status] Data has been acquired, processing and storage is now in progress. */
  STATUS_SAVING = 2,
  /** STATUS_COMPLETE - [Status] Data acquisition is complete. */
  STATUS_COMPLETE = 3,
  /** STATUS_CANCEL_IN_PROGRESS - [Status] The data acquisition service is working to cancel the request. */
  STATUS_CANCEL_IN_PROGRESS = 4,
  /** STATUS_ACQUISITION_CANCELLED - [Status] The data acquisition request was cancelled manually. */
  STATUS_ACQUISITION_CANCELLED = 5,
  /** STATUS_DATA_ERROR - [Error - AcquireData] An error occurred while acquiring, processing, or saving data. */
  STATUS_DATA_ERROR = 10,
  /** STATUS_TIMEDOUT - [Error - AcquireData] The data collection has passed the deadline for completion. */
  STATUS_TIMEDOUT = 11,
  /** STATUS_INTERNAL_ERROR - [Error - AcquireData] An error occurred such that we don't even know our status. */
  STATUS_INTERNAL_ERROR = 12,
  /** STATUS_CANCEL_ACQUISITION_FAILED - [Error -CancelAcquisition] The cancellation request failed to complete. */
  STATUS_CANCEL_ACQUISITION_FAILED = 30,
  /** STATUS_REQUEST_ID_DOES_NOT_EXIST - [Error - GetStatus] The request_id does not exist. */
  STATUS_REQUEST_ID_DOES_NOT_EXIST = 20,
  UNRECOGNIZED = -1,
}

export function getStatusResponse_StatusFromJSON(
  object: any
): GetStatusResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return GetStatusResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_ACQUIRING":
      return GetStatusResponse_Status.STATUS_ACQUIRING;
    case 2:
    case "STATUS_SAVING":
      return GetStatusResponse_Status.STATUS_SAVING;
    case 3:
    case "STATUS_COMPLETE":
      return GetStatusResponse_Status.STATUS_COMPLETE;
    case 4:
    case "STATUS_CANCEL_IN_PROGRESS":
      return GetStatusResponse_Status.STATUS_CANCEL_IN_PROGRESS;
    case 5:
    case "STATUS_ACQUISITION_CANCELLED":
      return GetStatusResponse_Status.STATUS_ACQUISITION_CANCELLED;
    case 10:
    case "STATUS_DATA_ERROR":
      return GetStatusResponse_Status.STATUS_DATA_ERROR;
    case 11:
    case "STATUS_TIMEDOUT":
      return GetStatusResponse_Status.STATUS_TIMEDOUT;
    case 12:
    case "STATUS_INTERNAL_ERROR":
      return GetStatusResponse_Status.STATUS_INTERNAL_ERROR;
    case 30:
    case "STATUS_CANCEL_ACQUISITION_FAILED":
      return GetStatusResponse_Status.STATUS_CANCEL_ACQUISITION_FAILED;
    case 20:
    case "STATUS_REQUEST_ID_DOES_NOT_EXIST":
      return GetStatusResponse_Status.STATUS_REQUEST_ID_DOES_NOT_EXIST;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GetStatusResponse_Status.UNRECOGNIZED;
  }
}

export function getStatusResponse_StatusToJSON(
  object: GetStatusResponse_Status
): string {
  switch (object) {
    case GetStatusResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case GetStatusResponse_Status.STATUS_ACQUIRING:
      return "STATUS_ACQUIRING";
    case GetStatusResponse_Status.STATUS_SAVING:
      return "STATUS_SAVING";
    case GetStatusResponse_Status.STATUS_COMPLETE:
      return "STATUS_COMPLETE";
    case GetStatusResponse_Status.STATUS_CANCEL_IN_PROGRESS:
      return "STATUS_CANCEL_IN_PROGRESS";
    case GetStatusResponse_Status.STATUS_ACQUISITION_CANCELLED:
      return "STATUS_ACQUISITION_CANCELLED";
    case GetStatusResponse_Status.STATUS_DATA_ERROR:
      return "STATUS_DATA_ERROR";
    case GetStatusResponse_Status.STATUS_TIMEDOUT:
      return "STATUS_TIMEDOUT";
    case GetStatusResponse_Status.STATUS_INTERNAL_ERROR:
      return "STATUS_INTERNAL_ERROR";
    case GetStatusResponse_Status.STATUS_CANCEL_ACQUISITION_FAILED:
      return "STATUS_CANCEL_ACQUISITION_FAILED";
    case GetStatusResponse_Status.STATUS_REQUEST_ID_DOES_NOT_EXIST:
      return "STATUS_REQUEST_ID_DOES_NOT_EXIST";
    case GetStatusResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface GetServiceInfoRequest {
  /** Common request header */
  header: RequestHeader | undefined;
}

export interface GetServiceInfoResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /**
   * List of capabilities that the data acquisition (plugin) service can
   * collect and save data for.
   */
  capabilities: AcquisitionCapabilityList | undefined;
}

export interface CancelAcquisitionRequest {
  /** Common request header */
  header: RequestHeader | undefined;
  /** Which acquisition request to cancel. */
  requestId: number;
}

export interface CancelAcquisitionResponse {
  /** Common response header */
  header: ResponseHeader | undefined;
  /**
   * The status of the Cancellation RPC. Further monitoring on the success of the cancellation
   * request can be done using the GetStatus RPC.
   */
  status: CancelAcquisitionResponse_Status;
}

export enum CancelAcquisitionResponse_Status {
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Successfully cancelled the data acquisition request. */
  STATUS_OK = 1,
  /** STATUS_FAILED_TO_CANCEL - Unable to stop the data acquisition request. */
  STATUS_FAILED_TO_CANCEL = 2,
  /** STATUS_REQUEST_ID_DOES_NOT_EXIST - [Error] The request_id does not exist. */
  STATUS_REQUEST_ID_DOES_NOT_EXIST = 3,
  UNRECOGNIZED = -1,
}

export function cancelAcquisitionResponse_StatusFromJSON(
  object: any
): CancelAcquisitionResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return CancelAcquisitionResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return CancelAcquisitionResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_FAILED_TO_CANCEL":
      return CancelAcquisitionResponse_Status.STATUS_FAILED_TO_CANCEL;
    case 3:
    case "STATUS_REQUEST_ID_DOES_NOT_EXIST":
      return CancelAcquisitionResponse_Status.STATUS_REQUEST_ID_DOES_NOT_EXIST;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CancelAcquisitionResponse_Status.UNRECOGNIZED;
  }
}

export function cancelAcquisitionResponse_StatusToJSON(
  object: CancelAcquisitionResponse_Status
): string {
  switch (object) {
    case CancelAcquisitionResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case CancelAcquisitionResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case CancelAcquisitionResponse_Status.STATUS_FAILED_TO_CANCEL:
      return "STATUS_FAILED_TO_CANCEL";
    case CancelAcquisitionResponse_Status.STATUS_REQUEST_ID_DOES_NOT_EXIST:
      return "STATUS_REQUEST_ID_DOES_NOT_EXIST";
    case CancelAcquisitionResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseDataAcquisitionCapability(): DataAcquisitionCapability {
  return { name: "", description: "", channelName: "", serviceName: "" };
}

export const DataAcquisitionCapability = {
  encode(
    message: DataAcquisitionCapability,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.channelName !== "") {
      writer.uint32(26).string(message.channelName);
    }
    if (message.serviceName !== "") {
      writer.uint32(34).string(message.serviceName);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DataAcquisitionCapability {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDataAcquisitionCapability();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.channelName = reader.string();
          break;
        case 4:
          message.serviceName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DataAcquisitionCapability {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
      channelName: isSet(object.channelName) ? String(object.channelName) : "",
      serviceName: isSet(object.serviceName) ? String(object.serviceName) : "",
    };
  },

  toJSON(message: DataAcquisitionCapability): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined &&
      (obj.description = message.description);
    message.channelName !== undefined &&
      (obj.channelName = message.channelName);
    message.serviceName !== undefined &&
      (obj.serviceName = message.serviceName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DataAcquisitionCapability>, I>>(
    object: I
  ): DataAcquisitionCapability {
    const message = createBaseDataAcquisitionCapability();
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.channelName = object.channelName ?? "";
    message.serviceName = object.serviceName ?? "";
    return message;
  },
};

function createBaseImageAcquisitionCapability(): ImageAcquisitionCapability {
  return { serviceName: "", imageSourceNames: [], imageSources: [] };
}

export const ImageAcquisitionCapability = {
  encode(
    message: ImageAcquisitionCapability,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.serviceName !== "") {
      writer.uint32(10).string(message.serviceName);
    }
    for (const v of message.imageSourceNames) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.imageSources) {
      ImageSource.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ImageAcquisitionCapability {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImageAcquisitionCapability();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serviceName = reader.string();
          break;
        case 2:
          message.imageSourceNames.push(reader.string());
          break;
        case 3:
          message.imageSources.push(
            ImageSource.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ImageAcquisitionCapability {
    return {
      serviceName: isSet(object.serviceName) ? String(object.serviceName) : "",
      imageSourceNames: Array.isArray(object?.imageSourceNames)
        ? object.imageSourceNames.map((e: any) => String(e))
        : [],
      imageSources: Array.isArray(object?.imageSources)
        ? object.imageSources.map((e: any) => ImageSource.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ImageAcquisitionCapability): unknown {
    const obj: any = {};
    message.serviceName !== undefined &&
      (obj.serviceName = message.serviceName);
    if (message.imageSourceNames) {
      obj.imageSourceNames = message.imageSourceNames.map((e) => e);
    } else {
      obj.imageSourceNames = [];
    }
    if (message.imageSources) {
      obj.imageSources = message.imageSources.map((e) =>
        e ? ImageSource.toJSON(e) : undefined
      );
    } else {
      obj.imageSources = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ImageAcquisitionCapability>, I>>(
    object: I
  ): ImageAcquisitionCapability {
    const message = createBaseImageAcquisitionCapability();
    message.serviceName = object.serviceName ?? "";
    message.imageSourceNames = object.imageSourceNames?.map((e) => e) || [];
    message.imageSources =
      object.imageSources?.map((e) => ImageSource.fromPartial(e)) || [];
    return message;
  },
};

function createBaseNetworkComputeCapability(): NetworkComputeCapability {
  return { serverConfig: undefined, availableModels: [], labels: [] };
}

export const NetworkComputeCapability = {
  encode(
    message: NetworkComputeCapability,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.serverConfig !== undefined) {
      NetworkComputeServerConfiguration.encode(
        message.serverConfig,
        writer.uint32(10).fork()
      ).ldelim();
    }
    for (const v of message.availableModels) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.labels) {
      ModelLabels.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): NetworkComputeCapability {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNetworkComputeCapability();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serverConfig = NetworkComputeServerConfiguration.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.availableModels.push(reader.string());
          break;
        case 6:
          message.labels.push(ModelLabels.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NetworkComputeCapability {
    return {
      serverConfig: isSet(object.serverConfig)
        ? NetworkComputeServerConfiguration.fromJSON(object.serverConfig)
        : undefined,
      availableModels: Array.isArray(object?.availableModels)
        ? object.availableModels.map((e: any) => String(e))
        : [],
      labels: Array.isArray(object?.labels)
        ? object.labels.map((e: any) => ModelLabels.fromJSON(e))
        : [],
    };
  },

  toJSON(message: NetworkComputeCapability): unknown {
    const obj: any = {};
    message.serverConfig !== undefined &&
      (obj.serverConfig = message.serverConfig
        ? NetworkComputeServerConfiguration.toJSON(message.serverConfig)
        : undefined);
    if (message.availableModels) {
      obj.availableModels = message.availableModels.map((e) => e);
    } else {
      obj.availableModels = [];
    }
    if (message.labels) {
      obj.labels = message.labels.map((e) =>
        e ? ModelLabels.toJSON(e) : undefined
      );
    } else {
      obj.labels = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NetworkComputeCapability>, I>>(
    object: I
  ): NetworkComputeCapability {
    const message = createBaseNetworkComputeCapability();
    message.serverConfig =
      object.serverConfig !== undefined && object.serverConfig !== null
        ? NetworkComputeServerConfiguration.fromPartial(object.serverConfig)
        : undefined;
    message.availableModels = object.availableModels?.map((e) => e) || [];
    message.labels =
      object.labels?.map((e) => ModelLabels.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAcquisitionCapabilityList(): AcquisitionCapabilityList {
  return { dataSources: [], imageSources: [], networkComputeSources: [] };
}

export const AcquisitionCapabilityList = {
  encode(
    message: AcquisitionCapabilityList,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.dataSources) {
      DataAcquisitionCapability.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.imageSources) {
      ImageAcquisitionCapability.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.networkComputeSources) {
      NetworkComputeCapability.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AcquisitionCapabilityList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAcquisitionCapabilityList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dataSources.push(
            DataAcquisitionCapability.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.imageSources.push(
            ImageAcquisitionCapability.decode(reader, reader.uint32())
          );
          break;
        case 5:
          message.networkComputeSources.push(
            NetworkComputeCapability.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AcquisitionCapabilityList {
    return {
      dataSources: Array.isArray(object?.dataSources)
        ? object.dataSources.map((e: any) =>
            DataAcquisitionCapability.fromJSON(e)
          )
        : [],
      imageSources: Array.isArray(object?.imageSources)
        ? object.imageSources.map((e: any) =>
            ImageAcquisitionCapability.fromJSON(e)
          )
        : [],
      networkComputeSources: Array.isArray(object?.networkComputeSources)
        ? object.networkComputeSources.map((e: any) =>
            NetworkComputeCapability.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: AcquisitionCapabilityList): unknown {
    const obj: any = {};
    if (message.dataSources) {
      obj.dataSources = message.dataSources.map((e) =>
        e ? DataAcquisitionCapability.toJSON(e) : undefined
      );
    } else {
      obj.dataSources = [];
    }
    if (message.imageSources) {
      obj.imageSources = message.imageSources.map((e) =>
        e ? ImageAcquisitionCapability.toJSON(e) : undefined
      );
    } else {
      obj.imageSources = [];
    }
    if (message.networkComputeSources) {
      obj.networkComputeSources = message.networkComputeSources.map((e) =>
        e ? NetworkComputeCapability.toJSON(e) : undefined
      );
    } else {
      obj.networkComputeSources = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AcquisitionCapabilityList>, I>>(
    object: I
  ): AcquisitionCapabilityList {
    const message = createBaseAcquisitionCapabilityList();
    message.dataSources =
      object.dataSources?.map((e) =>
        DataAcquisitionCapability.fromPartial(e)
      ) || [];
    message.imageSources =
      object.imageSources?.map((e) =>
        ImageAcquisitionCapability.fromPartial(e)
      ) || [];
    message.networkComputeSources =
      object.networkComputeSources?.map((e) =>
        NetworkComputeCapability.fromPartial(e)
      ) || [];
    return message;
  },
};

function createBaseCaptureActionId(): CaptureActionId {
  return { actionName: "", groupName: "", timestamp: undefined };
}

export const CaptureActionId = {
  encode(
    message: CaptureActionId,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.actionName !== "") {
      writer.uint32(10).string(message.actionName);
    }
    if (message.groupName !== "") {
      writer.uint32(18).string(message.groupName);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestamp),
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CaptureActionId {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCaptureActionId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.actionName = reader.string();
          break;
        case 2:
          message.groupName = reader.string();
          break;
        case 3:
          message.timestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CaptureActionId {
    return {
      actionName: isSet(object.actionName) ? String(object.actionName) : "",
      groupName: isSet(object.groupName) ? String(object.groupName) : "",
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
    };
  },

  toJSON(message: CaptureActionId): unknown {
    const obj: any = {};
    message.actionName !== undefined && (obj.actionName = message.actionName);
    message.groupName !== undefined && (obj.groupName = message.groupName);
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CaptureActionId>, I>>(
    object: I
  ): CaptureActionId {
    const message = createBaseCaptureActionId();
    message.actionName = object.actionName ?? "";
    message.groupName = object.groupName ?? "";
    message.timestamp = object.timestamp ?? undefined;
    return message;
  },
};

function createBaseDataIdentifier(): DataIdentifier {
  return { actionId: undefined, channel: "", dataName: "" };
}

export const DataIdentifier = {
  encode(
    message: DataIdentifier,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.actionId !== undefined) {
      CaptureActionId.encode(
        message.actionId,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.channel !== "") {
      writer.uint32(18).string(message.channel);
    }
    if (message.dataName !== "") {
      writer.uint32(26).string(message.dataName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DataIdentifier {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDataIdentifier();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.actionId = CaptureActionId.decode(reader, reader.uint32());
          break;
        case 2:
          message.channel = reader.string();
          break;
        case 3:
          message.dataName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DataIdentifier {
    return {
      actionId: isSet(object.actionId)
        ? CaptureActionId.fromJSON(object.actionId)
        : undefined,
      channel: isSet(object.channel) ? String(object.channel) : "",
      dataName: isSet(object.dataName) ? String(object.dataName) : "",
    };
  },

  toJSON(message: DataIdentifier): unknown {
    const obj: any = {};
    message.actionId !== undefined &&
      (obj.actionId = message.actionId
        ? CaptureActionId.toJSON(message.actionId)
        : undefined);
    message.channel !== undefined && (obj.channel = message.channel);
    message.dataName !== undefined && (obj.dataName = message.dataName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DataIdentifier>, I>>(
    object: I
  ): DataIdentifier {
    const message = createBaseDataIdentifier();
    message.actionId =
      object.actionId !== undefined && object.actionId !== null
        ? CaptureActionId.fromPartial(object.actionId)
        : undefined;
    message.channel = object.channel ?? "";
    message.dataName = object.dataName ?? "";
    return message;
  },
};

function createBaseMetadata(): Metadata {
  return { data: undefined };
}

export const Metadata = {
  encode(
    message: Metadata,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.data !== undefined) {
      Struct.encode(
        Struct.wrap(message.data),
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Metadata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = Struct.unwrap(Struct.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Metadata {
    return {
      data: isObject(object.data) ? object.data : undefined,
    };
  },

  toJSON(message: Metadata): unknown {
    const obj: any = {};
    message.data !== undefined && (obj.data = message.data);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Metadata>, I>>(object: I): Metadata {
    const message = createBaseMetadata();
    message.data = object.data ?? undefined;
    return message;
  },
};

function createBaseAssociatedMetadata(): AssociatedMetadata {
  return { referenceId: undefined, metadata: undefined };
}

export const AssociatedMetadata = {
  encode(
    message: AssociatedMetadata,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.referenceId !== undefined) {
      DataIdentifier.encode(
        message.referenceId,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AssociatedMetadata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAssociatedMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.referenceId = DataIdentifier.decode(reader, reader.uint32());
          break;
        case 2:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AssociatedMetadata {
    return {
      referenceId: isSet(object.referenceId)
        ? DataIdentifier.fromJSON(object.referenceId)
        : undefined,
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
    };
  },

  toJSON(message: AssociatedMetadata): unknown {
    const obj: any = {};
    message.referenceId !== undefined &&
      (obj.referenceId = message.referenceId
        ? DataIdentifier.toJSON(message.referenceId)
        : undefined);
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AssociatedMetadata>, I>>(
    object: I
  ): AssociatedMetadata {
    const message = createBaseAssociatedMetadata();
    message.referenceId =
      object.referenceId !== undefined && object.referenceId !== null
        ? DataIdentifier.fromPartial(object.referenceId)
        : undefined;
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    return message;
  },
};

function createBaseAssociatedAlertData(): AssociatedAlertData {
  return { referenceId: undefined, alertData: undefined };
}

export const AssociatedAlertData = {
  encode(
    message: AssociatedAlertData,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.referenceId !== undefined) {
      DataIdentifier.encode(
        message.referenceId,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.alertData !== undefined) {
      AlertData.encode(message.alertData, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AssociatedAlertData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAssociatedAlertData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.referenceId = DataIdentifier.decode(reader, reader.uint32());
          break;
        case 2:
          message.alertData = AlertData.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AssociatedAlertData {
    return {
      referenceId: isSet(object.referenceId)
        ? DataIdentifier.fromJSON(object.referenceId)
        : undefined,
      alertData: isSet(object.alertData)
        ? AlertData.fromJSON(object.alertData)
        : undefined,
    };
  },

  toJSON(message: AssociatedAlertData): unknown {
    const obj: any = {};
    message.referenceId !== undefined &&
      (obj.referenceId = message.referenceId
        ? DataIdentifier.toJSON(message.referenceId)
        : undefined);
    message.alertData !== undefined &&
      (obj.alertData = message.alertData
        ? AlertData.toJSON(message.alertData)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AssociatedAlertData>, I>>(
    object: I
  ): AssociatedAlertData {
    const message = createBaseAssociatedAlertData();
    message.referenceId =
      object.referenceId !== undefined && object.referenceId !== null
        ? DataIdentifier.fromPartial(object.referenceId)
        : undefined;
    message.alertData =
      object.alertData !== undefined && object.alertData !== null
        ? AlertData.fromPartial(object.alertData)
        : undefined;
    return message;
  },
};

function createBaseImageSourceCapture(): ImageSourceCapture {
  return { imageService: "", imageSource: "", pixelFormat: 0 };
}

export const ImageSourceCapture = {
  encode(
    message: ImageSourceCapture,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.imageService !== "") {
      writer.uint32(10).string(message.imageService);
    }
    if (message.imageSource !== "") {
      writer.uint32(18).string(message.imageSource);
    }
    if (message.pixelFormat !== 0) {
      writer.uint32(24).int32(message.pixelFormat);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImageSourceCapture {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImageSourceCapture();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.imageService = reader.string();
          break;
        case 2:
          message.imageSource = reader.string();
          break;
        case 3:
          message.pixelFormat = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ImageSourceCapture {
    return {
      imageService: isSet(object.imageService)
        ? String(object.imageService)
        : "",
      imageSource: isSet(object.imageSource) ? String(object.imageSource) : "",
      pixelFormat: isSet(object.pixelFormat)
        ? image_PixelFormatFromJSON(object.pixelFormat)
        : 0,
    };
  },

  toJSON(message: ImageSourceCapture): unknown {
    const obj: any = {};
    message.imageService !== undefined &&
      (obj.imageService = message.imageService);
    message.imageSource !== undefined &&
      (obj.imageSource = message.imageSource);
    message.pixelFormat !== undefined &&
      (obj.pixelFormat = image_PixelFormatToJSON(message.pixelFormat));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ImageSourceCapture>, I>>(
    object: I
  ): ImageSourceCapture {
    const message = createBaseImageSourceCapture();
    message.imageService = object.imageService ?? "";
    message.imageSource = object.imageSource ?? "";
    message.pixelFormat = object.pixelFormat ?? 0;
    return message;
  },
};

function createBaseDataCapture(): DataCapture {
  return { name: "" };
}

export const DataCapture = {
  encode(
    message: DataCapture,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DataCapture {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDataCapture();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DataCapture {
    return {
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: DataCapture): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DataCapture>, I>>(
    object: I
  ): DataCapture {
    const message = createBaseDataCapture();
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseNetworkComputeCapture(): NetworkComputeCapture {
  return { inputData: undefined, serverConfig: undefined };
}

export const NetworkComputeCapture = {
  encode(
    message: NetworkComputeCapture,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.inputData !== undefined) {
      NetworkComputeInputData.encode(
        message.inputData,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.serverConfig !== undefined) {
      NetworkComputeServerConfiguration.encode(
        message.serverConfig,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): NetworkComputeCapture {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNetworkComputeCapture();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.inputData = NetworkComputeInputData.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.serverConfig = NetworkComputeServerConfiguration.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NetworkComputeCapture {
    return {
      inputData: isSet(object.inputData)
        ? NetworkComputeInputData.fromJSON(object.inputData)
        : undefined,
      serverConfig: isSet(object.serverConfig)
        ? NetworkComputeServerConfiguration.fromJSON(object.serverConfig)
        : undefined,
    };
  },

  toJSON(message: NetworkComputeCapture): unknown {
    const obj: any = {};
    message.inputData !== undefined &&
      (obj.inputData = message.inputData
        ? NetworkComputeInputData.toJSON(message.inputData)
        : undefined);
    message.serverConfig !== undefined &&
      (obj.serverConfig = message.serverConfig
        ? NetworkComputeServerConfiguration.toJSON(message.serverConfig)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NetworkComputeCapture>, I>>(
    object: I
  ): NetworkComputeCapture {
    const message = createBaseNetworkComputeCapture();
    message.inputData =
      object.inputData !== undefined && object.inputData !== null
        ? NetworkComputeInputData.fromPartial(object.inputData)
        : undefined;
    message.serverConfig =
      object.serverConfig !== undefined && object.serverConfig !== null
        ? NetworkComputeServerConfiguration.fromPartial(object.serverConfig)
        : undefined;
    return message;
  },
};

function createBaseAcquisitionRequestList(): AcquisitionRequestList {
  return { imageCaptures: [], dataCaptures: [], networkComputeCaptures: [] };
}

export const AcquisitionRequestList = {
  encode(
    message: AcquisitionRequestList,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.imageCaptures) {
      ImageSourceCapture.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.dataCaptures) {
      DataCapture.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.networkComputeCaptures) {
      NetworkComputeCapture.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AcquisitionRequestList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAcquisitionRequestList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.imageCaptures.push(
            ImageSourceCapture.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.dataCaptures.push(
            DataCapture.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.networkComputeCaptures.push(
            NetworkComputeCapture.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AcquisitionRequestList {
    return {
      imageCaptures: Array.isArray(object?.imageCaptures)
        ? object.imageCaptures.map((e: any) => ImageSourceCapture.fromJSON(e))
        : [],
      dataCaptures: Array.isArray(object?.dataCaptures)
        ? object.dataCaptures.map((e: any) => DataCapture.fromJSON(e))
        : [],
      networkComputeCaptures: Array.isArray(object?.networkComputeCaptures)
        ? object.networkComputeCaptures.map((e: any) =>
            NetworkComputeCapture.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: AcquisitionRequestList): unknown {
    const obj: any = {};
    if (message.imageCaptures) {
      obj.imageCaptures = message.imageCaptures.map((e) =>
        e ? ImageSourceCapture.toJSON(e) : undefined
      );
    } else {
      obj.imageCaptures = [];
    }
    if (message.dataCaptures) {
      obj.dataCaptures = message.dataCaptures.map((e) =>
        e ? DataCapture.toJSON(e) : undefined
      );
    } else {
      obj.dataCaptures = [];
    }
    if (message.networkComputeCaptures) {
      obj.networkComputeCaptures = message.networkComputeCaptures.map((e) =>
        e ? NetworkComputeCapture.toJSON(e) : undefined
      );
    } else {
      obj.networkComputeCaptures = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AcquisitionRequestList>, I>>(
    object: I
  ): AcquisitionRequestList {
    const message = createBaseAcquisitionRequestList();
    message.imageCaptures =
      object.imageCaptures?.map((e) => ImageSourceCapture.fromPartial(e)) || [];
    message.dataCaptures =
      object.dataCaptures?.map((e) => DataCapture.fromPartial(e)) || [];
    message.networkComputeCaptures =
      object.networkComputeCaptures?.map((e) =>
        NetworkComputeCapture.fromPartial(e)
      ) || [];
    return message;
  },
};

function createBaseDataError(): DataError {
  return { dataId: undefined, errorMessage: "", errorData: undefined };
}

export const DataError = {
  encode(
    message: DataError,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.dataId !== undefined) {
      DataIdentifier.encode(message.dataId, writer.uint32(10).fork()).ldelim();
    }
    if (message.errorMessage !== "") {
      writer.uint32(18).string(message.errorMessage);
    }
    if (message.errorData !== undefined) {
      Any.encode(message.errorData, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DataError {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDataError();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dataId = DataIdentifier.decode(reader, reader.uint32());
          break;
        case 2:
          message.errorMessage = reader.string();
          break;
        case 3:
          message.errorData = Any.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DataError {
    return {
      dataId: isSet(object.dataId)
        ? DataIdentifier.fromJSON(object.dataId)
        : undefined,
      errorMessage: isSet(object.errorMessage)
        ? String(object.errorMessage)
        : "",
      errorData: isSet(object.errorData)
        ? Any.fromJSON(object.errorData)
        : undefined,
    };
  },

  toJSON(message: DataError): unknown {
    const obj: any = {};
    message.dataId !== undefined &&
      (obj.dataId = message.dataId
        ? DataIdentifier.toJSON(message.dataId)
        : undefined);
    message.errorMessage !== undefined &&
      (obj.errorMessage = message.errorMessage);
    message.errorData !== undefined &&
      (obj.errorData = message.errorData
        ? Any.toJSON(message.errorData)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DataError>, I>>(
    object: I
  ): DataError {
    const message = createBaseDataError();
    message.dataId =
      object.dataId !== undefined && object.dataId !== null
        ? DataIdentifier.fromPartial(object.dataId)
        : undefined;
    message.errorMessage = object.errorMessage ?? "";
    message.errorData =
      object.errorData !== undefined && object.errorData !== null
        ? Any.fromPartial(object.errorData)
        : undefined;
    return message;
  },
};

function createBasePluginServiceError(): PluginServiceError {
  return { serviceName: "", error: 0, message: "" };
}

export const PluginServiceError = {
  encode(
    message: PluginServiceError,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.serviceName !== "") {
      writer.uint32(10).string(message.serviceName);
    }
    if (message.error !== 0) {
      writer.uint32(16).int32(message.error);
    }
    if (message.message !== "") {
      writer.uint32(26).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PluginServiceError {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePluginServiceError();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serviceName = reader.string();
          break;
        case 2:
          message.error = reader.int32() as any;
          break;
        case 3:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PluginServiceError {
    return {
      serviceName: isSet(object.serviceName) ? String(object.serviceName) : "",
      error: isSet(object.error)
        ? pluginServiceError_ErrorCodeFromJSON(object.error)
        : 0,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: PluginServiceError): unknown {
    const obj: any = {};
    message.serviceName !== undefined &&
      (obj.serviceName = message.serviceName);
    message.error !== undefined &&
      (obj.error = pluginServiceError_ErrorCodeToJSON(message.error));
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PluginServiceError>, I>>(
    object: I
  ): PluginServiceError {
    const message = createBasePluginServiceError();
    message.serviceName = object.serviceName ?? "";
    message.error = object.error ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseNetworkComputeError(): NetworkComputeError {
  return { serviceName: "", error: 0, networkComputeStatus: 0, message: "" };
}

export const NetworkComputeError = {
  encode(
    message: NetworkComputeError,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.serviceName !== "") {
      writer.uint32(10).string(message.serviceName);
    }
    if (message.error !== 0) {
      writer.uint32(16).int32(message.error);
    }
    if (message.networkComputeStatus !== 0) {
      writer.uint32(24).int32(message.networkComputeStatus);
    }
    if (message.message !== "") {
      writer.uint32(34).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NetworkComputeError {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNetworkComputeError();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serviceName = reader.string();
          break;
        case 2:
          message.error = reader.int32() as any;
          break;
        case 3:
          message.networkComputeStatus = reader.int32() as any;
          break;
        case 4:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NetworkComputeError {
    return {
      serviceName: isSet(object.serviceName) ? String(object.serviceName) : "",
      error: isSet(object.error)
        ? networkComputeError_ErrorCodeFromJSON(object.error)
        : 0,
      networkComputeStatus: isSet(object.networkComputeStatus)
        ? networkComputeStatusFromJSON(object.networkComputeStatus)
        : 0,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: NetworkComputeError): unknown {
    const obj: any = {};
    message.serviceName !== undefined &&
      (obj.serviceName = message.serviceName);
    message.error !== undefined &&
      (obj.error = networkComputeError_ErrorCodeToJSON(message.error));
    message.networkComputeStatus !== undefined &&
      (obj.networkComputeStatus = networkComputeStatusToJSON(
        message.networkComputeStatus
      ));
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NetworkComputeError>, I>>(
    object: I
  ): NetworkComputeError {
    const message = createBaseNetworkComputeError();
    message.serviceName = object.serviceName ?? "";
    message.error = object.error ?? 0;
    message.networkComputeStatus = object.networkComputeStatus ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseAcquireDataRequest(): AcquireDataRequest {
  return {
    header: undefined,
    actionId: undefined,
    metadata: undefined,
    acquisitionRequests: undefined,
    minTimeout: undefined,
  };
}

export const AcquireDataRequest = {
  encode(
    message: AcquireDataRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.actionId !== undefined) {
      CaptureActionId.encode(
        message.actionId,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(26).fork()).ldelim();
    }
    if (message.acquisitionRequests !== undefined) {
      AcquisitionRequestList.encode(
        message.acquisitionRequests,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.minTimeout !== undefined) {
      Duration.encode(message.minTimeout, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AcquireDataRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAcquireDataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.actionId = CaptureActionId.decode(reader, reader.uint32());
          break;
        case 3:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 4:
          message.acquisitionRequests = AcquisitionRequestList.decode(
            reader,
            reader.uint32()
          );
          break;
        case 5:
          message.minTimeout = Duration.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AcquireDataRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      actionId: isSet(object.actionId)
        ? CaptureActionId.fromJSON(object.actionId)
        : undefined,
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
      acquisitionRequests: isSet(object.acquisitionRequests)
        ? AcquisitionRequestList.fromJSON(object.acquisitionRequests)
        : undefined,
      minTimeout: isSet(object.minTimeout)
        ? Duration.fromJSON(object.minTimeout)
        : undefined,
    };
  },

  toJSON(message: AcquireDataRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.actionId !== undefined &&
      (obj.actionId = message.actionId
        ? CaptureActionId.toJSON(message.actionId)
        : undefined);
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    message.acquisitionRequests !== undefined &&
      (obj.acquisitionRequests = message.acquisitionRequests
        ? AcquisitionRequestList.toJSON(message.acquisitionRequests)
        : undefined);
    message.minTimeout !== undefined &&
      (obj.minTimeout = message.minTimeout
        ? Duration.toJSON(message.minTimeout)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AcquireDataRequest>, I>>(
    object: I
  ): AcquireDataRequest {
    const message = createBaseAcquireDataRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.actionId =
      object.actionId !== undefined && object.actionId !== null
        ? CaptureActionId.fromPartial(object.actionId)
        : undefined;
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    message.acquisitionRequests =
      object.acquisitionRequests !== undefined &&
      object.acquisitionRequests !== null
        ? AcquisitionRequestList.fromPartial(object.acquisitionRequests)
        : undefined;
    message.minTimeout =
      object.minTimeout !== undefined && object.minTimeout !== null
        ? Duration.fromPartial(object.minTimeout)
        : undefined;
    return message;
  },
};

function createBaseAcquireDataResponse(): AcquireDataResponse {
  return { header: undefined, status: 0, requestId: 0 };
}

export const AcquireDataResponse = {
  encode(
    message: AcquireDataResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.requestId !== 0) {
      writer.uint32(24).uint32(message.requestId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AcquireDataResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAcquireDataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        case 3:
          message.requestId = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AcquireDataResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? acquireDataResponse_StatusFromJSON(object.status)
        : 0,
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
    };
  },

  toJSON(message: AcquireDataResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = acquireDataResponse_StatusToJSON(message.status));
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AcquireDataResponse>, I>>(
    object: I
  ): AcquireDataResponse {
    const message = createBaseAcquireDataResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    message.requestId = object.requestId ?? 0;
    return message;
  },
};

function createBaseAcquirePluginDataRequest(): AcquirePluginDataRequest {
  return {
    header: undefined,
    dataId: [],
    metadata: undefined,
    actionId: undefined,
    acquisitionRequests: undefined,
  };
}

export const AcquirePluginDataRequest = {
  encode(
    message: AcquirePluginDataRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.dataId) {
      DataIdentifier.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(26).fork()).ldelim();
    }
    if (message.actionId !== undefined) {
      CaptureActionId.encode(
        message.actionId,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.acquisitionRequests !== undefined) {
      AcquisitionRequestList.encode(
        message.acquisitionRequests,
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AcquirePluginDataRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAcquirePluginDataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.dataId.push(DataIdentifier.decode(reader, reader.uint32()));
          break;
        case 3:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 4:
          message.actionId = CaptureActionId.decode(reader, reader.uint32());
          break;
        case 5:
          message.acquisitionRequests = AcquisitionRequestList.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AcquirePluginDataRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      dataId: Array.isArray(object?.dataId)
        ? object.dataId.map((e: any) => DataIdentifier.fromJSON(e))
        : [],
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
      actionId: isSet(object.actionId)
        ? CaptureActionId.fromJSON(object.actionId)
        : undefined,
      acquisitionRequests: isSet(object.acquisitionRequests)
        ? AcquisitionRequestList.fromJSON(object.acquisitionRequests)
        : undefined,
    };
  },

  toJSON(message: AcquirePluginDataRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    if (message.dataId) {
      obj.dataId = message.dataId.map((e) =>
        e ? DataIdentifier.toJSON(e) : undefined
      );
    } else {
      obj.dataId = [];
    }
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    message.actionId !== undefined &&
      (obj.actionId = message.actionId
        ? CaptureActionId.toJSON(message.actionId)
        : undefined);
    message.acquisitionRequests !== undefined &&
      (obj.acquisitionRequests = message.acquisitionRequests
        ? AcquisitionRequestList.toJSON(message.acquisitionRequests)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AcquirePluginDataRequest>, I>>(
    object: I
  ): AcquirePluginDataRequest {
    const message = createBaseAcquirePluginDataRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.dataId =
      object.dataId?.map((e) => DataIdentifier.fromPartial(e)) || [];
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    message.actionId =
      object.actionId !== undefined && object.actionId !== null
        ? CaptureActionId.fromPartial(object.actionId)
        : undefined;
    message.acquisitionRequests =
      object.acquisitionRequests !== undefined &&
      object.acquisitionRequests !== null
        ? AcquisitionRequestList.fromPartial(object.acquisitionRequests)
        : undefined;
    return message;
  },
};

function createBaseAcquirePluginDataResponse(): AcquirePluginDataResponse {
  return {
    header: undefined,
    status: 0,
    requestId: 0,
    timeoutDeadline: undefined,
  };
}

export const AcquirePluginDataResponse = {
  encode(
    message: AcquirePluginDataResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.requestId !== 0) {
      writer.uint32(24).uint32(message.requestId);
    }
    if (message.timeoutDeadline !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timeoutDeadline),
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AcquirePluginDataResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAcquirePluginDataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        case 3:
          message.requestId = reader.uint32();
          break;
        case 5:
          message.timeoutDeadline = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AcquirePluginDataResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? acquirePluginDataResponse_StatusFromJSON(object.status)
        : 0,
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      timeoutDeadline: isSet(object.timeoutDeadline)
        ? fromJsonTimestamp(object.timeoutDeadline)
        : undefined,
    };
  },

  toJSON(message: AcquirePluginDataResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = acquirePluginDataResponse_StatusToJSON(message.status));
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.timeoutDeadline !== undefined &&
      (obj.timeoutDeadline = message.timeoutDeadline.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AcquirePluginDataResponse>, I>>(
    object: I
  ): AcquirePluginDataResponse {
    const message = createBaseAcquirePluginDataResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    message.requestId = object.requestId ?? 0;
    message.timeoutDeadline = object.timeoutDeadline ?? undefined;
    return message;
  },
};

function createBaseGetStatusRequest(): GetStatusRequest {
  return { header: undefined, requestId: 0 };
}

export const GetStatusRequest = {
  encode(
    message: GetStatusRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.requestId !== 0) {
      writer.uint32(16).uint32(message.requestId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetStatusRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetStatusRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.requestId = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetStatusRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
    };
  },

  toJSON(message: GetStatusRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetStatusRequest>, I>>(
    object: I
  ): GetStatusRequest {
    const message = createBaseGetStatusRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.requestId = object.requestId ?? 0;
    return message;
  },
};

function createBaseGetStatusResponse(): GetStatusResponse {
  return {
    header: undefined,
    status: 0,
    dataSaved: [],
    dataErrors: [],
    serviceErrors: [],
    networkComputeErrors: [],
  };
}

export const GetStatusResponse = {
  encode(
    message: GetStatusResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    for (const v of message.dataSaved) {
      DataIdentifier.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.dataErrors) {
      DataError.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    for (const v of message.serviceErrors) {
      PluginServiceError.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    for (const v of message.networkComputeErrors) {
      NetworkComputeError.encode(v!, writer.uint32(90).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetStatusResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetStatusResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        case 3:
          message.dataSaved.push(
            DataIdentifier.decode(reader, reader.uint32())
          );
          break;
        case 9:
          message.dataErrors.push(DataError.decode(reader, reader.uint32()));
          break;
        case 10:
          message.serviceErrors.push(
            PluginServiceError.decode(reader, reader.uint32())
          );
          break;
        case 11:
          message.networkComputeErrors.push(
            NetworkComputeError.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetStatusResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? getStatusResponse_StatusFromJSON(object.status)
        : 0,
      dataSaved: Array.isArray(object?.dataSaved)
        ? object.dataSaved.map((e: any) => DataIdentifier.fromJSON(e))
        : [],
      dataErrors: Array.isArray(object?.dataErrors)
        ? object.dataErrors.map((e: any) => DataError.fromJSON(e))
        : [],
      serviceErrors: Array.isArray(object?.serviceErrors)
        ? object.serviceErrors.map((e: any) => PluginServiceError.fromJSON(e))
        : [],
      networkComputeErrors: Array.isArray(object?.networkComputeErrors)
        ? object.networkComputeErrors.map((e: any) =>
            NetworkComputeError.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: GetStatusResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = getStatusResponse_StatusToJSON(message.status));
    if (message.dataSaved) {
      obj.dataSaved = message.dataSaved.map((e) =>
        e ? DataIdentifier.toJSON(e) : undefined
      );
    } else {
      obj.dataSaved = [];
    }
    if (message.dataErrors) {
      obj.dataErrors = message.dataErrors.map((e) =>
        e ? DataError.toJSON(e) : undefined
      );
    } else {
      obj.dataErrors = [];
    }
    if (message.serviceErrors) {
      obj.serviceErrors = message.serviceErrors.map((e) =>
        e ? PluginServiceError.toJSON(e) : undefined
      );
    } else {
      obj.serviceErrors = [];
    }
    if (message.networkComputeErrors) {
      obj.networkComputeErrors = message.networkComputeErrors.map((e) =>
        e ? NetworkComputeError.toJSON(e) : undefined
      );
    } else {
      obj.networkComputeErrors = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetStatusResponse>, I>>(
    object: I
  ): GetStatusResponse {
    const message = createBaseGetStatusResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    message.dataSaved =
      object.dataSaved?.map((e) => DataIdentifier.fromPartial(e)) || [];
    message.dataErrors =
      object.dataErrors?.map((e) => DataError.fromPartial(e)) || [];
    message.serviceErrors =
      object.serviceErrors?.map((e) => PluginServiceError.fromPartial(e)) || [];
    message.networkComputeErrors =
      object.networkComputeErrors?.map((e) =>
        NetworkComputeError.fromPartial(e)
      ) || [];
    return message;
  },
};

function createBaseGetServiceInfoRequest(): GetServiceInfoRequest {
  return { header: undefined };
}

export const GetServiceInfoRequest = {
  encode(
    message: GetServiceInfoRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetServiceInfoRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetServiceInfoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetServiceInfoRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: GetServiceInfoRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetServiceInfoRequest>, I>>(
    object: I
  ): GetServiceInfoRequest {
    const message = createBaseGetServiceInfoRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseGetServiceInfoResponse(): GetServiceInfoResponse {
  return { header: undefined, capabilities: undefined };
}

export const GetServiceInfoResponse = {
  encode(
    message: GetServiceInfoResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.capabilities !== undefined) {
      AcquisitionCapabilityList.encode(
        message.capabilities,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetServiceInfoResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetServiceInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.capabilities = AcquisitionCapabilityList.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetServiceInfoResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      capabilities: isSet(object.capabilities)
        ? AcquisitionCapabilityList.fromJSON(object.capabilities)
        : undefined,
    };
  },

  toJSON(message: GetServiceInfoResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.capabilities !== undefined &&
      (obj.capabilities = message.capabilities
        ? AcquisitionCapabilityList.toJSON(message.capabilities)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetServiceInfoResponse>, I>>(
    object: I
  ): GetServiceInfoResponse {
    const message = createBaseGetServiceInfoResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.capabilities =
      object.capabilities !== undefined && object.capabilities !== null
        ? AcquisitionCapabilityList.fromPartial(object.capabilities)
        : undefined;
    return message;
  },
};

function createBaseCancelAcquisitionRequest(): CancelAcquisitionRequest {
  return { header: undefined, requestId: 0 };
}

export const CancelAcquisitionRequest = {
  encode(
    message: CancelAcquisitionRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.requestId !== 0) {
      writer.uint32(16).uint32(message.requestId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CancelAcquisitionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCancelAcquisitionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.requestId = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CancelAcquisitionRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
    };
  },

  toJSON(message: CancelAcquisitionRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CancelAcquisitionRequest>, I>>(
    object: I
  ): CancelAcquisitionRequest {
    const message = createBaseCancelAcquisitionRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.requestId = object.requestId ?? 0;
    return message;
  },
};

function createBaseCancelAcquisitionResponse(): CancelAcquisitionResponse {
  return { header: undefined, status: 0 };
}

export const CancelAcquisitionResponse = {
  encode(
    message: CancelAcquisitionResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CancelAcquisitionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCancelAcquisitionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CancelAcquisitionResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? cancelAcquisitionResponse_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: CancelAcquisitionResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = cancelAcquisitionResponse_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CancelAcquisitionResponse>, I>>(
    object: I
  ): CancelAcquisitionResponse {
    const message = createBaseCancelAcquisitionResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    return message;
  },
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & {
      [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
    };

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
