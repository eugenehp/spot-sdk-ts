/* eslint-disable */
import { RequestHeader, ResponseHeader } from "./header";
import { Image, ImageResponse } from "./image";
import { Any } from "../../google/protobuf/any";
import { WorldObject } from "./world_object";
import { AlertData } from "./alerts";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

export enum NetworkComputeStatus {
  /** NETWORK_COMPUTE_STATUS_UNKNOWN - Status is not specified. */
  NETWORK_COMPUTE_STATUS_UNKNOWN = 0,
  /** NETWORK_COMPUTE_STATUS_SUCCESS - Succeeded. */
  NETWORK_COMPUTE_STATUS_SUCCESS = 1,
  /** NETWORK_COMPUTE_STATUS_EXTERNAL_SERVICE_NOT_FOUND - External service not found in the robot's directory. */
  NETWORK_COMPUTE_STATUS_EXTERNAL_SERVICE_NOT_FOUND = 2,
  /** NETWORK_COMPUTE_STATUS_EXTERNAL_SERVER_ERROR - The call to the external server did not succeed. */
  NETWORK_COMPUTE_STATUS_EXTERNAL_SERVER_ERROR = 3,
  /** NETWORK_COMPUTE_STATUS_ROTATION_ERROR - The robot failed to rotate the image as requested. */
  NETWORK_COMPUTE_STATUS_ROTATION_ERROR = 4,
  UNRECOGNIZED = -1,
}

export function networkComputeStatusFromJSON(
  object: any
): NetworkComputeStatus {
  switch (object) {
    case 0:
    case "NETWORK_COMPUTE_STATUS_UNKNOWN":
      return NetworkComputeStatus.NETWORK_COMPUTE_STATUS_UNKNOWN;
    case 1:
    case "NETWORK_COMPUTE_STATUS_SUCCESS":
      return NetworkComputeStatus.NETWORK_COMPUTE_STATUS_SUCCESS;
    case 2:
    case "NETWORK_COMPUTE_STATUS_EXTERNAL_SERVICE_NOT_FOUND":
      return NetworkComputeStatus.NETWORK_COMPUTE_STATUS_EXTERNAL_SERVICE_NOT_FOUND;
    case 3:
    case "NETWORK_COMPUTE_STATUS_EXTERNAL_SERVER_ERROR":
      return NetworkComputeStatus.NETWORK_COMPUTE_STATUS_EXTERNAL_SERVER_ERROR;
    case 4:
    case "NETWORK_COMPUTE_STATUS_ROTATION_ERROR":
      return NetworkComputeStatus.NETWORK_COMPUTE_STATUS_ROTATION_ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return NetworkComputeStatus.UNRECOGNIZED;
  }
}

export function networkComputeStatusToJSON(
  object: NetworkComputeStatus
): string {
  switch (object) {
    case NetworkComputeStatus.NETWORK_COMPUTE_STATUS_UNKNOWN:
      return "NETWORK_COMPUTE_STATUS_UNKNOWN";
    case NetworkComputeStatus.NETWORK_COMPUTE_STATUS_SUCCESS:
      return "NETWORK_COMPUTE_STATUS_SUCCESS";
    case NetworkComputeStatus.NETWORK_COMPUTE_STATUS_EXTERNAL_SERVICE_NOT_FOUND:
      return "NETWORK_COMPUTE_STATUS_EXTERNAL_SERVICE_NOT_FOUND";
    case NetworkComputeStatus.NETWORK_COMPUTE_STATUS_EXTERNAL_SERVER_ERROR:
      return "NETWORK_COMPUTE_STATUS_EXTERNAL_SERVER_ERROR";
    case NetworkComputeStatus.NETWORK_COMPUTE_STATUS_ROTATION_ERROR:
      return "NETWORK_COMPUTE_STATUS_ROTATION_ERROR";
    case NetworkComputeStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum ListAvailableModelsStatus {
  /** LIST_AVAILABLE_MODELS_STATUS_UNKNOWN - Status is not specified. */
  LIST_AVAILABLE_MODELS_STATUS_UNKNOWN = 0,
  /** LIST_AVAILABLE_MODELS_STATUS_SUCCESS - Succeeded. */
  LIST_AVAILABLE_MODELS_STATUS_SUCCESS = 1,
  /** LIST_AVAILABLE_MODELS_STATUS_EXTERNAL_SERVICE_NOT_FOUND - External service not found in the robot's directory. */
  LIST_AVAILABLE_MODELS_STATUS_EXTERNAL_SERVICE_NOT_FOUND = 2,
  /** LIST_AVAILABLE_MODELS_STATUS_EXTERNAL_SERVER_ERROR - The call to the external server did not succeed. */
  LIST_AVAILABLE_MODELS_STATUS_EXTERNAL_SERVER_ERROR = 3,
  UNRECOGNIZED = -1,
}

export function listAvailableModelsStatusFromJSON(
  object: any
): ListAvailableModelsStatus {
  switch (object) {
    case 0:
    case "LIST_AVAILABLE_MODELS_STATUS_UNKNOWN":
      return ListAvailableModelsStatus.LIST_AVAILABLE_MODELS_STATUS_UNKNOWN;
    case 1:
    case "LIST_AVAILABLE_MODELS_STATUS_SUCCESS":
      return ListAvailableModelsStatus.LIST_AVAILABLE_MODELS_STATUS_SUCCESS;
    case 2:
    case "LIST_AVAILABLE_MODELS_STATUS_EXTERNAL_SERVICE_NOT_FOUND":
      return ListAvailableModelsStatus.LIST_AVAILABLE_MODELS_STATUS_EXTERNAL_SERVICE_NOT_FOUND;
    case 3:
    case "LIST_AVAILABLE_MODELS_STATUS_EXTERNAL_SERVER_ERROR":
      return ListAvailableModelsStatus.LIST_AVAILABLE_MODELS_STATUS_EXTERNAL_SERVER_ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ListAvailableModelsStatus.UNRECOGNIZED;
  }
}

export function listAvailableModelsStatusToJSON(
  object: ListAvailableModelsStatus
): string {
  switch (object) {
    case ListAvailableModelsStatus.LIST_AVAILABLE_MODELS_STATUS_UNKNOWN:
      return "LIST_AVAILABLE_MODELS_STATUS_UNKNOWN";
    case ListAvailableModelsStatus.LIST_AVAILABLE_MODELS_STATUS_SUCCESS:
      return "LIST_AVAILABLE_MODELS_STATUS_SUCCESS";
    case ListAvailableModelsStatus.LIST_AVAILABLE_MODELS_STATUS_EXTERNAL_SERVICE_NOT_FOUND:
      return "LIST_AVAILABLE_MODELS_STATUS_EXTERNAL_SERVICE_NOT_FOUND";
    case ListAvailableModelsStatus.LIST_AVAILABLE_MODELS_STATUS_EXTERNAL_SERVER_ERROR:
      return "LIST_AVAILABLE_MODELS_STATUS_EXTERNAL_SERVER_ERROR";
    case ListAvailableModelsStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ListAvailableModelsRequest {
  /** Common request header */
  header: RequestHeader | undefined;
  /** Configuration about which server to use. */
  serverConfig: NetworkComputeServerConfiguration | undefined;
}

export interface ListAvailableModelsResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Provide list of available models */
  availableModels: string[];
  /** Optional information about available classes for each model */
  labels: ModelLabels[];
  /** Command status */
  status: ListAvailableModelsStatus;
}

export interface ModelLabels {
  /** Model name. */
  modelName: string;
  /** List of class labels returned by this model. */
  availableLabels: string[];
}

export interface NetworkComputeRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Input data. */
  inputData: NetworkComputeInputData | undefined;
  /** Configuration about which server to use. */
  serverConfig: NetworkComputeServerConfiguration | undefined;
}

export interface ImageSourceAndService {
  /** Image source. */
  imageSource: string;
  /** Image service.  If blank, it is assumed to be the robot's default image service. */
  imageService: string;
}

export interface NetworkComputeInputData {
  /** Image source to collect an image from. */
  imageSourceAndService: ImageSourceAndService | undefined;
  /** Image to process, if you are not using an image source. */
  image: Image | undefined;
  /**
   * Other data that isn't an image.  NetworkComputeBridge service will pass it through
   * to the remote server so you can do computation on arbitrary data.
   */
  otherData: Any | undefined;
  /** Name of the model to be run on the input data. */
  modelName: string;
  /**
   * Minimum confidence [0.0 - 1.0] an object must have to be returned. Detections below this
   * confidence threshold will be suppressed in the response.
   */
  minConfidence: number;
  /**
   * Options for rotating the image before processing. When unset, no rotation is applied.
   * Rotation is supported for data from image services that provide a FrameTreeSnapshot
   * defining the sensor's frame with respect to Spot's body and vision frames.
   * Field is ignored for non-image input.
   */
  rotateImage: NetworkComputeInputData_RotateImage;
}

export enum NetworkComputeInputData_RotateImage {
  /** ROTATE_IMAGE_UNKNOWN - Unspecified rotation method. Do not use. */
  ROTATE_IMAGE_UNKNOWN = 0,
  /** ROTATE_IMAGE_NO_ROTATION - No rotation applied. */
  ROTATE_IMAGE_NO_ROTATION = 3,
  /** ROTATE_IMAGE_ALIGN_HORIZONTAL - Rotate the images so the horizon is not rolled with respect to gravity. */
  ROTATE_IMAGE_ALIGN_HORIZONTAL = 1,
  /**
   * ROTATE_IMAGE_ALIGN_WITH_BODY - Rotate the images so that the horizon in the image is aligned with the inclination of
   * the body. For example, when applied to the left body camera this option rotates the image
   * so that the world does not appear upside down when the robot is standing upright, but if the
   * body is pitched up, the image will appear rotated.
   */
  ROTATE_IMAGE_ALIGN_WITH_BODY = 2,
  UNRECOGNIZED = -1,
}

export function networkComputeInputData_RotateImageFromJSON(
  object: any
): NetworkComputeInputData_RotateImage {
  switch (object) {
    case 0:
    case "ROTATE_IMAGE_UNKNOWN":
      return NetworkComputeInputData_RotateImage.ROTATE_IMAGE_UNKNOWN;
    case 3:
    case "ROTATE_IMAGE_NO_ROTATION":
      return NetworkComputeInputData_RotateImage.ROTATE_IMAGE_NO_ROTATION;
    case 1:
    case "ROTATE_IMAGE_ALIGN_HORIZONTAL":
      return NetworkComputeInputData_RotateImage.ROTATE_IMAGE_ALIGN_HORIZONTAL;
    case 2:
    case "ROTATE_IMAGE_ALIGN_WITH_BODY":
      return NetworkComputeInputData_RotateImage.ROTATE_IMAGE_ALIGN_WITH_BODY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return NetworkComputeInputData_RotateImage.UNRECOGNIZED;
  }
}

export function networkComputeInputData_RotateImageToJSON(
  object: NetworkComputeInputData_RotateImage
): string {
  switch (object) {
    case NetworkComputeInputData_RotateImage.ROTATE_IMAGE_UNKNOWN:
      return "ROTATE_IMAGE_UNKNOWN";
    case NetworkComputeInputData_RotateImage.ROTATE_IMAGE_NO_ROTATION:
      return "ROTATE_IMAGE_NO_ROTATION";
    case NetworkComputeInputData_RotateImage.ROTATE_IMAGE_ALIGN_HORIZONTAL:
      return "ROTATE_IMAGE_ALIGN_HORIZONTAL";
    case NetworkComputeInputData_RotateImage.ROTATE_IMAGE_ALIGN_WITH_BODY:
      return "ROTATE_IMAGE_ALIGN_WITH_BODY";
    case NetworkComputeInputData_RotateImage.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface NetworkComputeServerConfiguration {
  /** Service name in the robot's Directory for the worker that will process the request. */
  serviceName: string;
}

export interface NetworkComputeResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Detection information. May include bounding boxes, image coordinates, 3D pose information, etc. */
  objectInImage: WorldObject[];
  /**
   * The image we computed the data on. If the input image itself was provided in the request,
   * this field is not populated.  This field is not set for non-image input.
   */
  imageResponse: ImageResponse | undefined;
  /**
   * If the image was rotated for processing, this field will contain the amount it was rotated by
   * (counter-clockwise, in radians).
   *
   * Note that the image returned is *not* rotated, regardless of if it was rotated
   * for processing.  This ensures that all other calibration and metadata remains valid.
   */
  imageRotationAngle: number;
  /** Non image-type data that can optionally be returned by a remote server. */
  otherData: Any | undefined;
  /** Command status */
  status: NetworkComputeStatus;
  /** Optional field to indicate an alert detected by this model. */
  alertData: AlertData | undefined;
}

function createBaseListAvailableModelsRequest(): ListAvailableModelsRequest {
  return { header: undefined, serverConfig: undefined };
}

export const ListAvailableModelsRequest = {
  encode(
    message: ListAvailableModelsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
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
  ): ListAvailableModelsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListAvailableModelsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
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

  fromJSON(object: any): ListAvailableModelsRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      serverConfig: isSet(object.serverConfig)
        ? NetworkComputeServerConfiguration.fromJSON(object.serverConfig)
        : undefined,
    };
  },

  toJSON(message: ListAvailableModelsRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.serverConfig !== undefined &&
      (obj.serverConfig = message.serverConfig
        ? NetworkComputeServerConfiguration.toJSON(message.serverConfig)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListAvailableModelsRequest>, I>>(
    object: I
  ): ListAvailableModelsRequest {
    const message = createBaseListAvailableModelsRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.serverConfig =
      object.serverConfig !== undefined && object.serverConfig !== null
        ? NetworkComputeServerConfiguration.fromPartial(object.serverConfig)
        : undefined;
    return message;
  },
};

function createBaseListAvailableModelsResponse(): ListAvailableModelsResponse {
  return { header: undefined, availableModels: [], labels: [], status: 0 };
}

export const ListAvailableModelsResponse = {
  encode(
    message: ListAvailableModelsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.availableModels) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.labels) {
      ModelLabels.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(40).int32(message.status);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListAvailableModelsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListAvailableModelsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.availableModels.push(reader.string());
          break;
        case 6:
          message.labels.push(ModelLabels.decode(reader, reader.uint32()));
          break;
        case 5:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListAvailableModelsResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      availableModels: Array.isArray(object?.availableModels)
        ? object.availableModels.map((e: any) => String(e))
        : [],
      labels: Array.isArray(object?.labels)
        ? object.labels.map((e: any) => ModelLabels.fromJSON(e))
        : [],
      status: isSet(object.status)
        ? listAvailableModelsStatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: ListAvailableModelsResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
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
    message.status !== undefined &&
      (obj.status = listAvailableModelsStatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListAvailableModelsResponse>, I>>(
    object: I
  ): ListAvailableModelsResponse {
    const message = createBaseListAvailableModelsResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.availableModels = object.availableModels?.map((e) => e) || [];
    message.labels =
      object.labels?.map((e) => ModelLabels.fromPartial(e)) || [];
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseModelLabels(): ModelLabels {
  return { modelName: "", availableLabels: [] };
}

export const ModelLabels = {
  encode(
    message: ModelLabels,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.modelName !== "") {
      writer.uint32(10).string(message.modelName);
    }
    for (const v of message.availableLabels) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModelLabels {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModelLabels();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.modelName = reader.string();
          break;
        case 2:
          message.availableLabels.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ModelLabels {
    return {
      modelName: isSet(object.modelName) ? String(object.modelName) : "",
      availableLabels: Array.isArray(object?.availableLabels)
        ? object.availableLabels.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: ModelLabels): unknown {
    const obj: any = {};
    message.modelName !== undefined && (obj.modelName = message.modelName);
    if (message.availableLabels) {
      obj.availableLabels = message.availableLabels.map((e) => e);
    } else {
      obj.availableLabels = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ModelLabels>, I>>(
    object: I
  ): ModelLabels {
    const message = createBaseModelLabels();
    message.modelName = object.modelName ?? "";
    message.availableLabels = object.availableLabels?.map((e) => e) || [];
    return message;
  },
};

function createBaseNetworkComputeRequest(): NetworkComputeRequest {
  return { header: undefined, inputData: undefined, serverConfig: undefined };
}

export const NetworkComputeRequest = {
  encode(
    message: NetworkComputeRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.inputData !== undefined) {
      NetworkComputeInputData.encode(
        message.inputData,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.serverConfig !== undefined) {
      NetworkComputeServerConfiguration.encode(
        message.serverConfig,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): NetworkComputeRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNetworkComputeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.inputData = NetworkComputeInputData.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
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

  fromJSON(object: any): NetworkComputeRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      inputData: isSet(object.inputData)
        ? NetworkComputeInputData.fromJSON(object.inputData)
        : undefined,
      serverConfig: isSet(object.serverConfig)
        ? NetworkComputeServerConfiguration.fromJSON(object.serverConfig)
        : undefined,
    };
  },

  toJSON(message: NetworkComputeRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
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

  fromPartial<I extends Exact<DeepPartial<NetworkComputeRequest>, I>>(
    object: I
  ): NetworkComputeRequest {
    const message = createBaseNetworkComputeRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
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

function createBaseImageSourceAndService(): ImageSourceAndService {
  return { imageSource: "", imageService: "" };
}

export const ImageSourceAndService = {
  encode(
    message: ImageSourceAndService,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.imageSource !== "") {
      writer.uint32(10).string(message.imageSource);
    }
    if (message.imageService !== "") {
      writer.uint32(18).string(message.imageService);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ImageSourceAndService {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImageSourceAndService();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.imageSource = reader.string();
          break;
        case 2:
          message.imageService = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ImageSourceAndService {
    return {
      imageSource: isSet(object.imageSource) ? String(object.imageSource) : "",
      imageService: isSet(object.imageService)
        ? String(object.imageService)
        : "",
    };
  },

  toJSON(message: ImageSourceAndService): unknown {
    const obj: any = {};
    message.imageSource !== undefined &&
      (obj.imageSource = message.imageSource);
    message.imageService !== undefined &&
      (obj.imageService = message.imageService);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ImageSourceAndService>, I>>(
    object: I
  ): ImageSourceAndService {
    const message = createBaseImageSourceAndService();
    message.imageSource = object.imageSource ?? "";
    message.imageService = object.imageService ?? "";
    return message;
  },
};

function createBaseNetworkComputeInputData(): NetworkComputeInputData {
  return {
    imageSourceAndService: undefined,
    image: undefined,
    otherData: undefined,
    modelName: "",
    minConfidence: 0,
    rotateImage: 0,
  };
}

export const NetworkComputeInputData = {
  encode(
    message: NetworkComputeInputData,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.imageSourceAndService !== undefined) {
      ImageSourceAndService.encode(
        message.imageSourceAndService,
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.image !== undefined) {
      Image.encode(message.image, writer.uint32(18).fork()).ldelim();
    }
    if (message.otherData !== undefined) {
      Any.encode(message.otherData, writer.uint32(26).fork()).ldelim();
    }
    if (message.modelName !== "") {
      writer.uint32(34).string(message.modelName);
    }
    if (message.minConfidence !== 0) {
      writer.uint32(45).float(message.minConfidence);
    }
    if (message.rotateImage !== 0) {
      writer.uint32(48).int32(message.rotateImage);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): NetworkComputeInputData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNetworkComputeInputData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 7:
          message.imageSourceAndService = ImageSourceAndService.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.image = Image.decode(reader, reader.uint32());
          break;
        case 3:
          message.otherData = Any.decode(reader, reader.uint32());
          break;
        case 4:
          message.modelName = reader.string();
          break;
        case 5:
          message.minConfidence = reader.float();
          break;
        case 6:
          message.rotateImage = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NetworkComputeInputData {
    return {
      imageSourceAndService: isSet(object.imageSourceAndService)
        ? ImageSourceAndService.fromJSON(object.imageSourceAndService)
        : undefined,
      image: isSet(object.image) ? Image.fromJSON(object.image) : undefined,
      otherData: isSet(object.otherData)
        ? Any.fromJSON(object.otherData)
        : undefined,
      modelName: isSet(object.modelName) ? String(object.modelName) : "",
      minConfidence: isSet(object.minConfidence)
        ? Number(object.minConfidence)
        : 0,
      rotateImage: isSet(object.rotateImage)
        ? networkComputeInputData_RotateImageFromJSON(object.rotateImage)
        : 0,
    };
  },

  toJSON(message: NetworkComputeInputData): unknown {
    const obj: any = {};
    message.imageSourceAndService !== undefined &&
      (obj.imageSourceAndService = message.imageSourceAndService
        ? ImageSourceAndService.toJSON(message.imageSourceAndService)
        : undefined);
    message.image !== undefined &&
      (obj.image = message.image ? Image.toJSON(message.image) : undefined);
    message.otherData !== undefined &&
      (obj.otherData = message.otherData
        ? Any.toJSON(message.otherData)
        : undefined);
    message.modelName !== undefined && (obj.modelName = message.modelName);
    message.minConfidence !== undefined &&
      (obj.minConfidence = message.minConfidence);
    message.rotateImage !== undefined &&
      (obj.rotateImage = networkComputeInputData_RotateImageToJSON(
        message.rotateImage
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NetworkComputeInputData>, I>>(
    object: I
  ): NetworkComputeInputData {
    const message = createBaseNetworkComputeInputData();
    message.imageSourceAndService =
      object.imageSourceAndService !== undefined &&
      object.imageSourceAndService !== null
        ? ImageSourceAndService.fromPartial(object.imageSourceAndService)
        : undefined;
    message.image =
      object.image !== undefined && object.image !== null
        ? Image.fromPartial(object.image)
        : undefined;
    message.otherData =
      object.otherData !== undefined && object.otherData !== null
        ? Any.fromPartial(object.otherData)
        : undefined;
    message.modelName = object.modelName ?? "";
    message.minConfidence = object.minConfidence ?? 0;
    message.rotateImage = object.rotateImage ?? 0;
    return message;
  },
};

function createBaseNetworkComputeServerConfiguration(): NetworkComputeServerConfiguration {
  return { serviceName: "" };
}

export const NetworkComputeServerConfiguration = {
  encode(
    message: NetworkComputeServerConfiguration,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.serviceName !== "") {
      writer.uint32(26).string(message.serviceName);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): NetworkComputeServerConfiguration {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNetworkComputeServerConfiguration();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 3:
          message.serviceName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NetworkComputeServerConfiguration {
    return {
      serviceName: isSet(object.serviceName) ? String(object.serviceName) : "",
    };
  },

  toJSON(message: NetworkComputeServerConfiguration): unknown {
    const obj: any = {};
    message.serviceName !== undefined &&
      (obj.serviceName = message.serviceName);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<NetworkComputeServerConfiguration>, I>
  >(object: I): NetworkComputeServerConfiguration {
    const message = createBaseNetworkComputeServerConfiguration();
    message.serviceName = object.serviceName ?? "";
    return message;
  },
};

function createBaseNetworkComputeResponse(): NetworkComputeResponse {
  return {
    header: undefined,
    objectInImage: [],
    imageResponse: undefined,
    imageRotationAngle: 0,
    otherData: undefined,
    status: 0,
    alertData: undefined,
  };
}

export const NetworkComputeResponse = {
  encode(
    message: NetworkComputeResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.objectInImage) {
      WorldObject.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.imageResponse !== undefined) {
      ImageResponse.encode(
        message.imageResponse,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.imageRotationAngle !== 0) {
      writer.uint32(49).double(message.imageRotationAngle);
    }
    if (message.otherData !== undefined) {
      Any.encode(message.otherData, writer.uint32(34).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(40).int32(message.status);
    }
    if (message.alertData !== undefined) {
      AlertData.encode(message.alertData, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): NetworkComputeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNetworkComputeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.objectInImage.push(
            WorldObject.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.imageResponse = ImageResponse.decode(reader, reader.uint32());
          break;
        case 6:
          message.imageRotationAngle = reader.double();
          break;
        case 4:
          message.otherData = Any.decode(reader, reader.uint32());
          break;
        case 5:
          message.status = reader.int32() as any;
          break;
        case 7:
          message.alertData = AlertData.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NetworkComputeResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      objectInImage: Array.isArray(object?.objectInImage)
        ? object.objectInImage.map((e: any) => WorldObject.fromJSON(e))
        : [],
      imageResponse: isSet(object.imageResponse)
        ? ImageResponse.fromJSON(object.imageResponse)
        : undefined,
      imageRotationAngle: isSet(object.imageRotationAngle)
        ? Number(object.imageRotationAngle)
        : 0,
      otherData: isSet(object.otherData)
        ? Any.fromJSON(object.otherData)
        : undefined,
      status: isSet(object.status)
        ? networkComputeStatusFromJSON(object.status)
        : 0,
      alertData: isSet(object.alertData)
        ? AlertData.fromJSON(object.alertData)
        : undefined,
    };
  },

  toJSON(message: NetworkComputeResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.objectInImage) {
      obj.objectInImage = message.objectInImage.map((e) =>
        e ? WorldObject.toJSON(e) : undefined
      );
    } else {
      obj.objectInImage = [];
    }
    message.imageResponse !== undefined &&
      (obj.imageResponse = message.imageResponse
        ? ImageResponse.toJSON(message.imageResponse)
        : undefined);
    message.imageRotationAngle !== undefined &&
      (obj.imageRotationAngle = message.imageRotationAngle);
    message.otherData !== undefined &&
      (obj.otherData = message.otherData
        ? Any.toJSON(message.otherData)
        : undefined);
    message.status !== undefined &&
      (obj.status = networkComputeStatusToJSON(message.status));
    message.alertData !== undefined &&
      (obj.alertData = message.alertData
        ? AlertData.toJSON(message.alertData)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NetworkComputeResponse>, I>>(
    object: I
  ): NetworkComputeResponse {
    const message = createBaseNetworkComputeResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.objectInImage =
      object.objectInImage?.map((e) => WorldObject.fromPartial(e)) || [];
    message.imageResponse =
      object.imageResponse !== undefined && object.imageResponse !== null
        ? ImageResponse.fromPartial(object.imageResponse)
        : undefined;
    message.imageRotationAngle = object.imageRotationAngle ?? 0;
    message.otherData =
      object.otherData !== undefined && object.otherData !== null
        ? Any.fromPartial(object.otherData)
        : undefined;
    message.status = object.status ?? 0;
    message.alertData =
      object.alertData !== undefined && object.alertData !== null
        ? AlertData.fromPartial(object.alertData)
        : undefined;
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
