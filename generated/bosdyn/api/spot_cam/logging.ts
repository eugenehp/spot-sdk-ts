/* eslint-disable */
import {
  Image_PixelFormat,
  image_PixelFormatFromJSON,
  image_PixelFormatToJSON,
} from "../image";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { SE3Pose } from "../geometry";
import { Camera_PinholeIntrinsics, Camera } from "./camera";
import { RequestHeader, ResponseHeader } from "../header";
import { DataChunk } from "../data_chunk";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api.spot_cam";

/** A representation of a stored data acquisition. */
export interface Logpoint {
  /** Unique identifier for a data acquisition event. */
  name: string;
  /** Type of data held in this log point. */
  type: Logpoint_RecordType;
  /** Current stage of acquisition. */
  status: Logpoint_LogStatus;
  /** Only filled out when status == QUEUED */
  queueStatus: Logpoint_QueueStatus;
  /** An arbitrary string to be stored with the log data. */
  tag: string;
  /** Time of acquisition. */
  timestamp: Date | undefined;
  /** Image format of the stored data. */
  imageParams: Logpoint_ImageParams | undefined;
  /** Camera data for all sub-images contained within the image data. */
  calibration: Logpoint_Calibration[];
}

/** Possible types of media that can be stored. */
export enum Logpoint_RecordType {
  STILLIMAGE = 0,
  UNRECOGNIZED = -1,
}

export function logpoint_RecordTypeFromJSON(object: any): Logpoint_RecordType {
  switch (object) {
    case 0:
    case "STILLIMAGE":
      return Logpoint_RecordType.STILLIMAGE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Logpoint_RecordType.UNRECOGNIZED;
  }
}

export function logpoint_RecordTypeToJSON(object: Logpoint_RecordType): string {
  switch (object) {
    case Logpoint_RecordType.STILLIMAGE:
      return "STILLIMAGE";
    case Logpoint_RecordType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Possible stages of data acquisition. */
export enum Logpoint_LogStatus {
  FAILED = 0,
  /** QUEUED - the logpoint has been queued to be downloaded from the renderer */
  QUEUED = 1,
  /** COMPLETE - the logpoint is written to the disk */
  COMPLETE = 2,
  UNKNOWN = -1,
  UNRECOGNIZED = -1,
}

export function logpoint_LogStatusFromJSON(object: any): Logpoint_LogStatus {
  switch (object) {
    case 0:
    case "FAILED":
      return Logpoint_LogStatus.FAILED;
    case 1:
    case "QUEUED":
      return Logpoint_LogStatus.QUEUED;
    case 2:
    case "COMPLETE":
      return Logpoint_LogStatus.COMPLETE;
    case -1:
    case "UNKNOWN":
      return Logpoint_LogStatus.UNKNOWN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Logpoint_LogStatus.UNRECOGNIZED;
  }
}

export function logpoint_LogStatusToJSON(object: Logpoint_LogStatus): string {
  switch (object) {
    case Logpoint_LogStatus.FAILED:
      return "FAILED";
    case Logpoint_LogStatus.QUEUED:
      return "QUEUED";
    case Logpoint_LogStatus.COMPLETE:
      return "COMPLETE";
    case Logpoint_LogStatus.UNKNOWN:
      return "UNKNOWN";
    case Logpoint_LogStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum Logpoint_QueueStatus {
  QUEUED_UNKNOWN = 0,
  /** QUEUED_RENDER - The logpoint has been queued to be downloaded from the renderer */
  QUEUED_RENDER = 1,
  /** QUEUED_DISK - The logpoint is in general ram, and will be written to the disk when resources allow */
  QUEUED_DISK = 2,
  UNRECOGNIZED = -1,
}

export function logpoint_QueueStatusFromJSON(
  object: any
): Logpoint_QueueStatus {
  switch (object) {
    case 0:
    case "QUEUED_UNKNOWN":
      return Logpoint_QueueStatus.QUEUED_UNKNOWN;
    case 1:
    case "QUEUED_RENDER":
      return Logpoint_QueueStatus.QUEUED_RENDER;
    case 2:
    case "QUEUED_DISK":
      return Logpoint_QueueStatus.QUEUED_DISK;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Logpoint_QueueStatus.UNRECOGNIZED;
  }
}

export function logpoint_QueueStatusToJSON(
  object: Logpoint_QueueStatus
): string {
  switch (object) {
    case Logpoint_QueueStatus.QUEUED_UNKNOWN:
      return "QUEUED_UNKNOWN";
    case Logpoint_QueueStatus.QUEUED_RENDER:
      return "QUEUED_RENDER";
    case Logpoint_QueueStatus.QUEUED_DISK:
      return "QUEUED_DISK";
    case Logpoint_QueueStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Description of image format. */
export interface Logpoint_ImageParams {
  width: number;
  height: number;
  format: Image_PixelFormat;
}

/** Data describing the camera intrinsics and extrinsics for a window of the image. */
export interface Logpoint_Calibration {
  xoffset: number;
  yoffset: number;
  width: number;
  height: number;
  baseFrameName: string;
  /**
   * 'base_tfrom_sensor' defines the transform from the specific camera to the named base from.
   * This is deprecated in favor of 'base_tform_sensor' which follows the intended naming convention
   * and FrameTree directionality convention of the Spot system as defined in geometry.proto.
   *
   * @deprecated
   */
  baseTfromSensor: SE3Pose | undefined;
  /** The transform from the named base frame to this specific camera */
  baseTformSensor: SE3Pose | undefined;
  intrinsics: Camera_PinholeIntrinsics | undefined;
}

/** Delete a log point from the store. */
export interface DeleteRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Log point to delete.  Only the name is used. */
  point: Logpoint | undefined;
}

/** Response to a deletion with any errors that occurred. */
export interface DeleteResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
}

/** Request for status about the current stage of data acquisition. */
export interface GetStatusRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Log point to query.  Only the name is used. */
  point: Logpoint | undefined;
}

/** Provide an update on the stage of data acquisition. */
export interface GetStatusResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** The logpoint returned here can be used to add a tag to the Logpoint later */
  point: Logpoint | undefined;
}

/** Retrieve the binary data associated with a log point. */
export interface RetrieveRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Log point to retrieve.  Only the name is used. */
  point: Logpoint | undefined;
}

/**
 * Provide the data stored at a log point.
 * Store() dictates what processing happens in this response.
 * c0 -> c4 will return the raw (rgb24) fisheye image of the camera at that index.
 * Storing a panorama will process the data into a stitched image.
 */
export interface RetrieveResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Log point retrieved. */
  logpoint: Logpoint | undefined;
  /** Data chunk bytes field should be concatenated together to recover the binary data. */
  data: DataChunk | undefined;
}

/**
 * Retrieve the binary data associated with a log point, with no processing applied.
 * Storing a panorama will retrieve tiled individual images.
 * For IR, the temperature at each pixel is 0.1 * the int value in Kelvin.
 */
export interface RetrieveRawDataRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Log point to retrieve.  Only the name is used. */
  point: Logpoint | undefined;
}

export interface RetrieveRawDataResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Log point retrieved. */
  logpoint: Logpoint | undefined;
  /** Data chunk bytes field should be concatenated together to recover the binary data. */
  data: DataChunk | undefined;
}

/** Trigger a data acquisition. */
export interface StoreRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Which camera to capture. */
  camera: Camera | undefined;
  /** Type of data capture to perform. */
  type: Logpoint_RecordType;
  /** Metadata to associate with the store. */
  tag: string;
}

/** Result of data acquisition trigger. */
export interface StoreResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /**
   * The log point returned here can be used to add a tag to the Logpoint later
   * It will very likely be in th 'QUEUED' state.
   */
  point: Logpoint | undefined;
}

/** Add tag metadata to an existing log point. */
export interface TagRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Logpoint to add metadata to. Name and tag are used. */
  point: Logpoint | undefined;
}

/** Result of adding tag metadata to a log point. */
export interface TagResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
}

/** Request the available cameras. */
export interface ListCamerasRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/** Provide the list of available cameras. */
export interface ListCamerasResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** List of all cameras which can be used in a StoreRequest. */
  cameras: Camera[];
}

/** List all available log points, whether they have completed or not. */
export interface ListLogpointsRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/** Provide all log points in the system. */
export interface ListLogpointsResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /**
   * List of all the individual log points concatenated into a list.
   * This stream may take a long time to complete if there are a lot of stored images.
   */
  logpoints: Logpoint[];
}

/** Set encryption for the disk. */
export interface SetPassphraseRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /**
   * After setting the passphrase, please reboot the system to
   * remount the encrypted filesystem layer.
   */
  passphrase: string;
}

/**
 * Response from setting the disk encryption.
 * After setting the passphrase, please reboot the system to
 * remount the encrypted filesystem layer.
 */
export interface SetPassphraseResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
}

/** Change debug logging settings on the SpotCam. */
export interface DebugRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Set true to enable logging of temperature data; */
  enableTemperature: boolean;
  /** Set true to enable logging of humidity data; */
  enableHumidity: boolean;
  /**
   * Set true to enable logging of BIT events;
   * BIT events are always recorded to volatile memory
   * and can be viewed (and cleared) with the Health service,
   * but this enables writing them to disk.
   */
  enableBIT: boolean;
  /**
   * Set true to enable logging of Shock data;
   * this is on by default.
   */
  enableShock: boolean;
  /**
   * Set to true to enable logging of system load stats
   * cpu, gpu, memory, and network utilization
   */
  enableSystemStat: boolean;
}

/** Response with any errors for debug setting changes. */
export interface DebugResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
}

function createBaseLogpoint(): Logpoint {
  return {
    name: "",
    type: 0,
    status: 0,
    queueStatus: 0,
    tag: "",
    timestamp: undefined,
    imageParams: undefined,
    calibration: [],
  };
}

export const Logpoint = {
  encode(
    message: Logpoint,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    if (message.status !== 0) {
      writer.uint32(24).int32(message.status);
    }
    if (message.queueStatus !== 0) {
      writer.uint32(64).int32(message.queueStatus);
    }
    if (message.tag !== "") {
      writer.uint32(34).string(message.tag);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestamp),
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.imageParams !== undefined) {
      Logpoint_ImageParams.encode(
        message.imageParams,
        writer.uint32(50).fork()
      ).ldelim();
    }
    for (const v of message.calibration) {
      Logpoint_Calibration.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Logpoint {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLogpoint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.type = reader.int32() as any;
          break;
        case 3:
          message.status = reader.int32() as any;
          break;
        case 8:
          message.queueStatus = reader.int32() as any;
          break;
        case 4:
          message.tag = reader.string();
          break;
        case 5:
          message.timestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 6:
          message.imageParams = Logpoint_ImageParams.decode(
            reader,
            reader.uint32()
          );
          break;
        case 7:
          message.calibration.push(
            Logpoint_Calibration.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Logpoint {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      type: isSet(object.type) ? logpoint_RecordTypeFromJSON(object.type) : 0,
      status: isSet(object.status)
        ? logpoint_LogStatusFromJSON(object.status)
        : 0,
      queueStatus: isSet(object.queueStatus)
        ? logpoint_QueueStatusFromJSON(object.queueStatus)
        : 0,
      tag: isSet(object.tag) ? String(object.tag) : "",
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
      imageParams: isSet(object.imageParams)
        ? Logpoint_ImageParams.fromJSON(object.imageParams)
        : undefined,
      calibration: Array.isArray(object?.calibration)
        ? object.calibration.map((e: any) => Logpoint_Calibration.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Logpoint): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.type !== undefined &&
      (obj.type = logpoint_RecordTypeToJSON(message.type));
    message.status !== undefined &&
      (obj.status = logpoint_LogStatusToJSON(message.status));
    message.queueStatus !== undefined &&
      (obj.queueStatus = logpoint_QueueStatusToJSON(message.queueStatus));
    message.tag !== undefined && (obj.tag = message.tag);
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp.toISOString());
    message.imageParams !== undefined &&
      (obj.imageParams = message.imageParams
        ? Logpoint_ImageParams.toJSON(message.imageParams)
        : undefined);
    if (message.calibration) {
      obj.calibration = message.calibration.map((e) =>
        e ? Logpoint_Calibration.toJSON(e) : undefined
      );
    } else {
      obj.calibration = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Logpoint>, I>>(object: I): Logpoint {
    const message = createBaseLogpoint();
    message.name = object.name ?? "";
    message.type = object.type ?? 0;
    message.status = object.status ?? 0;
    message.queueStatus = object.queueStatus ?? 0;
    message.tag = object.tag ?? "";
    message.timestamp = object.timestamp ?? undefined;
    message.imageParams =
      object.imageParams !== undefined && object.imageParams !== null
        ? Logpoint_ImageParams.fromPartial(object.imageParams)
        : undefined;
    message.calibration =
      object.calibration?.map((e) => Logpoint_Calibration.fromPartial(e)) || [];
    return message;
  },
};

function createBaseLogpoint_ImageParams(): Logpoint_ImageParams {
  return { width: 0, height: 0, format: 0 };
}

export const Logpoint_ImageParams = {
  encode(
    message: Logpoint_ImageParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.width !== 0) {
      writer.uint32(8).int32(message.width);
    }
    if (message.height !== 0) {
      writer.uint32(16).int32(message.height);
    }
    if (message.format !== 0) {
      writer.uint32(24).int32(message.format);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): Logpoint_ImageParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLogpoint_ImageParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.width = reader.int32();
          break;
        case 2:
          message.height = reader.int32();
          break;
        case 3:
          message.format = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Logpoint_ImageParams {
    return {
      width: isSet(object.width) ? Number(object.width) : 0,
      height: isSet(object.height) ? Number(object.height) : 0,
      format: isSet(object.format)
        ? image_PixelFormatFromJSON(object.format)
        : 0,
    };
  },

  toJSON(message: Logpoint_ImageParams): unknown {
    const obj: any = {};
    message.width !== undefined && (obj.width = Math.round(message.width));
    message.height !== undefined && (obj.height = Math.round(message.height));
    message.format !== undefined &&
      (obj.format = image_PixelFormatToJSON(message.format));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Logpoint_ImageParams>, I>>(
    object: I
  ): Logpoint_ImageParams {
    const message = createBaseLogpoint_ImageParams();
    message.width = object.width ?? 0;
    message.height = object.height ?? 0;
    message.format = object.format ?? 0;
    return message;
  },
};

function createBaseLogpoint_Calibration(): Logpoint_Calibration {
  return {
    xoffset: 0,
    yoffset: 0,
    width: 0,
    height: 0,
    baseFrameName: "",
    baseTfromSensor: undefined,
    baseTformSensor: undefined,
    intrinsics: undefined,
  };
}

export const Logpoint_Calibration = {
  encode(
    message: Logpoint_Calibration,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.xoffset !== 0) {
      writer.uint32(8).int32(message.xoffset);
    }
    if (message.yoffset !== 0) {
      writer.uint32(16).int32(message.yoffset);
    }
    if (message.width !== 0) {
      writer.uint32(24).int32(message.width);
    }
    if (message.height !== 0) {
      writer.uint32(32).int32(message.height);
    }
    if (message.baseFrameName !== "") {
      writer.uint32(58).string(message.baseFrameName);
    }
    if (message.baseTfromSensor !== undefined) {
      SE3Pose.encode(
        message.baseTfromSensor,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.baseTformSensor !== undefined) {
      SE3Pose.encode(
        message.baseTformSensor,
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.intrinsics !== undefined) {
      Camera_PinholeIntrinsics.encode(
        message.intrinsics,
        writer.uint32(50).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): Logpoint_Calibration {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLogpoint_Calibration();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.xoffset = reader.int32();
          break;
        case 2:
          message.yoffset = reader.int32();
          break;
        case 3:
          message.width = reader.int32();
          break;
        case 4:
          message.height = reader.int32();
          break;
        case 7:
          message.baseFrameName = reader.string();
          break;
        case 5:
          message.baseTfromSensor = SE3Pose.decode(reader, reader.uint32());
          break;
        case 8:
          message.baseTformSensor = SE3Pose.decode(reader, reader.uint32());
          break;
        case 6:
          message.intrinsics = Camera_PinholeIntrinsics.decode(
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

  fromJSON(object: any): Logpoint_Calibration {
    return {
      xoffset: isSet(object.xoffset) ? Number(object.xoffset) : 0,
      yoffset: isSet(object.yoffset) ? Number(object.yoffset) : 0,
      width: isSet(object.width) ? Number(object.width) : 0,
      height: isSet(object.height) ? Number(object.height) : 0,
      baseFrameName: isSet(object.baseFrameName)
        ? String(object.baseFrameName)
        : "",
      baseTfromSensor: isSet(object.baseTfromSensor)
        ? SE3Pose.fromJSON(object.baseTfromSensor)
        : undefined,
      baseTformSensor: isSet(object.baseTformSensor)
        ? SE3Pose.fromJSON(object.baseTformSensor)
        : undefined,
      intrinsics: isSet(object.intrinsics)
        ? Camera_PinholeIntrinsics.fromJSON(object.intrinsics)
        : undefined,
    };
  },

  toJSON(message: Logpoint_Calibration): unknown {
    const obj: any = {};
    message.xoffset !== undefined &&
      (obj.xoffset = Math.round(message.xoffset));
    message.yoffset !== undefined &&
      (obj.yoffset = Math.round(message.yoffset));
    message.width !== undefined && (obj.width = Math.round(message.width));
    message.height !== undefined && (obj.height = Math.round(message.height));
    message.baseFrameName !== undefined &&
      (obj.baseFrameName = message.baseFrameName);
    message.baseTfromSensor !== undefined &&
      (obj.baseTfromSensor = message.baseTfromSensor
        ? SE3Pose.toJSON(message.baseTfromSensor)
        : undefined);
    message.baseTformSensor !== undefined &&
      (obj.baseTformSensor = message.baseTformSensor
        ? SE3Pose.toJSON(message.baseTformSensor)
        : undefined);
    message.intrinsics !== undefined &&
      (obj.intrinsics = message.intrinsics
        ? Camera_PinholeIntrinsics.toJSON(message.intrinsics)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Logpoint_Calibration>, I>>(
    object: I
  ): Logpoint_Calibration {
    const message = createBaseLogpoint_Calibration();
    message.xoffset = object.xoffset ?? 0;
    message.yoffset = object.yoffset ?? 0;
    message.width = object.width ?? 0;
    message.height = object.height ?? 0;
    message.baseFrameName = object.baseFrameName ?? "";
    message.baseTfromSensor =
      object.baseTfromSensor !== undefined && object.baseTfromSensor !== null
        ? SE3Pose.fromPartial(object.baseTfromSensor)
        : undefined;
    message.baseTformSensor =
      object.baseTformSensor !== undefined && object.baseTformSensor !== null
        ? SE3Pose.fromPartial(object.baseTformSensor)
        : undefined;
    message.intrinsics =
      object.intrinsics !== undefined && object.intrinsics !== null
        ? Camera_PinholeIntrinsics.fromPartial(object.intrinsics)
        : undefined;
    return message;
  },
};

function createBaseDeleteRequest(): DeleteRequest {
  return { header: undefined, point: undefined };
}

export const DeleteRequest = {
  encode(
    message: DeleteRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.point !== undefined) {
      Logpoint.encode(message.point, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.point = Logpoint.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      point: isSet(object.point) ? Logpoint.fromJSON(object.point) : undefined,
    };
  },

  toJSON(message: DeleteRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.point !== undefined &&
      (obj.point = message.point ? Logpoint.toJSON(message.point) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeleteRequest>, I>>(
    object: I
  ): DeleteRequest {
    const message = createBaseDeleteRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.point =
      object.point !== undefined && object.point !== null
        ? Logpoint.fromPartial(object.point)
        : undefined;
    return message;
  },
};

function createBaseDeleteResponse(): DeleteResponse {
  return { header: undefined };
}

export const DeleteResponse = {
  encode(
    message: DeleteResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: DeleteResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeleteResponse>, I>>(
    object: I
  ): DeleteResponse {
    const message = createBaseDeleteResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseGetStatusRequest(): GetStatusRequest {
  return { header: undefined, point: undefined };
}

export const GetStatusRequest = {
  encode(
    message: GetStatusRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.point !== undefined) {
      Logpoint.encode(message.point, writer.uint32(18).fork()).ldelim();
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
          message.point = Logpoint.decode(reader, reader.uint32());
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
      point: isSet(object.point) ? Logpoint.fromJSON(object.point) : undefined,
    };
  },

  toJSON(message: GetStatusRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.point !== undefined &&
      (obj.point = message.point ? Logpoint.toJSON(message.point) : undefined);
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
    message.point =
      object.point !== undefined && object.point !== null
        ? Logpoint.fromPartial(object.point)
        : undefined;
    return message;
  },
};

function createBaseGetStatusResponse(): GetStatusResponse {
  return { header: undefined, point: undefined };
}

export const GetStatusResponse = {
  encode(
    message: GetStatusResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.point !== undefined) {
      Logpoint.encode(message.point, writer.uint32(18).fork()).ldelim();
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
          message.point = Logpoint.decode(reader, reader.uint32());
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
      point: isSet(object.point) ? Logpoint.fromJSON(object.point) : undefined,
    };
  },

  toJSON(message: GetStatusResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.point !== undefined &&
      (obj.point = message.point ? Logpoint.toJSON(message.point) : undefined);
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
    message.point =
      object.point !== undefined && object.point !== null
        ? Logpoint.fromPartial(object.point)
        : undefined;
    return message;
  },
};

function createBaseRetrieveRequest(): RetrieveRequest {
  return { header: undefined, point: undefined };
}

export const RetrieveRequest = {
  encode(
    message: RetrieveRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.point !== undefined) {
      Logpoint.encode(message.point, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RetrieveRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRetrieveRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.point = Logpoint.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RetrieveRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      point: isSet(object.point) ? Logpoint.fromJSON(object.point) : undefined,
    };
  },

  toJSON(message: RetrieveRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.point !== undefined &&
      (obj.point = message.point ? Logpoint.toJSON(message.point) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RetrieveRequest>, I>>(
    object: I
  ): RetrieveRequest {
    const message = createBaseRetrieveRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.point =
      object.point !== undefined && object.point !== null
        ? Logpoint.fromPartial(object.point)
        : undefined;
    return message;
  },
};

function createBaseRetrieveResponse(): RetrieveResponse {
  return { header: undefined, logpoint: undefined, data: undefined };
}

export const RetrieveResponse = {
  encode(
    message: RetrieveResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.logpoint !== undefined) {
      Logpoint.encode(message.logpoint, writer.uint32(18).fork()).ldelim();
    }
    if (message.data !== undefined) {
      DataChunk.encode(message.data, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RetrieveResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRetrieveResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.logpoint = Logpoint.decode(reader, reader.uint32());
          break;
        case 3:
          message.data = DataChunk.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RetrieveResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      logpoint: isSet(object.logpoint)
        ? Logpoint.fromJSON(object.logpoint)
        : undefined,
      data: isSet(object.data) ? DataChunk.fromJSON(object.data) : undefined,
    };
  },

  toJSON(message: RetrieveResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.logpoint !== undefined &&
      (obj.logpoint = message.logpoint
        ? Logpoint.toJSON(message.logpoint)
        : undefined);
    message.data !== undefined &&
      (obj.data = message.data ? DataChunk.toJSON(message.data) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RetrieveResponse>, I>>(
    object: I
  ): RetrieveResponse {
    const message = createBaseRetrieveResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.logpoint =
      object.logpoint !== undefined && object.logpoint !== null
        ? Logpoint.fromPartial(object.logpoint)
        : undefined;
    message.data =
      object.data !== undefined && object.data !== null
        ? DataChunk.fromPartial(object.data)
        : undefined;
    return message;
  },
};

function createBaseRetrieveRawDataRequest(): RetrieveRawDataRequest {
  return { header: undefined, point: undefined };
}

export const RetrieveRawDataRequest = {
  encode(
    message: RetrieveRawDataRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.point !== undefined) {
      Logpoint.encode(message.point, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RetrieveRawDataRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRetrieveRawDataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.point = Logpoint.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RetrieveRawDataRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      point: isSet(object.point) ? Logpoint.fromJSON(object.point) : undefined,
    };
  },

  toJSON(message: RetrieveRawDataRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.point !== undefined &&
      (obj.point = message.point ? Logpoint.toJSON(message.point) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RetrieveRawDataRequest>, I>>(
    object: I
  ): RetrieveRawDataRequest {
    const message = createBaseRetrieveRawDataRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.point =
      object.point !== undefined && object.point !== null
        ? Logpoint.fromPartial(object.point)
        : undefined;
    return message;
  },
};

function createBaseRetrieveRawDataResponse(): RetrieveRawDataResponse {
  return { header: undefined, logpoint: undefined, data: undefined };
}

export const RetrieveRawDataResponse = {
  encode(
    message: RetrieveRawDataResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.logpoint !== undefined) {
      Logpoint.encode(message.logpoint, writer.uint32(18).fork()).ldelim();
    }
    if (message.data !== undefined) {
      DataChunk.encode(message.data, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RetrieveRawDataResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRetrieveRawDataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.logpoint = Logpoint.decode(reader, reader.uint32());
          break;
        case 3:
          message.data = DataChunk.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RetrieveRawDataResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      logpoint: isSet(object.logpoint)
        ? Logpoint.fromJSON(object.logpoint)
        : undefined,
      data: isSet(object.data) ? DataChunk.fromJSON(object.data) : undefined,
    };
  },

  toJSON(message: RetrieveRawDataResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.logpoint !== undefined &&
      (obj.logpoint = message.logpoint
        ? Logpoint.toJSON(message.logpoint)
        : undefined);
    message.data !== undefined &&
      (obj.data = message.data ? DataChunk.toJSON(message.data) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RetrieveRawDataResponse>, I>>(
    object: I
  ): RetrieveRawDataResponse {
    const message = createBaseRetrieveRawDataResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.logpoint =
      object.logpoint !== undefined && object.logpoint !== null
        ? Logpoint.fromPartial(object.logpoint)
        : undefined;
    message.data =
      object.data !== undefined && object.data !== null
        ? DataChunk.fromPartial(object.data)
        : undefined;
    return message;
  },
};

function createBaseStoreRequest(): StoreRequest {
  return { header: undefined, camera: undefined, type: 0, tag: "" };
}

export const StoreRequest = {
  encode(
    message: StoreRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.camera !== undefined) {
      Camera.encode(message.camera, writer.uint32(18).fork()).ldelim();
    }
    if (message.type !== 0) {
      writer.uint32(24).int32(message.type);
    }
    if (message.tag !== "") {
      writer.uint32(34).string(message.tag);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StoreRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStoreRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.camera = Camera.decode(reader, reader.uint32());
          break;
        case 3:
          message.type = reader.int32() as any;
          break;
        case 4:
          message.tag = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StoreRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      camera: isSet(object.camera) ? Camera.fromJSON(object.camera) : undefined,
      type: isSet(object.type) ? logpoint_RecordTypeFromJSON(object.type) : 0,
      tag: isSet(object.tag) ? String(object.tag) : "",
    };
  },

  toJSON(message: StoreRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.camera !== undefined &&
      (obj.camera = message.camera ? Camera.toJSON(message.camera) : undefined);
    message.type !== undefined &&
      (obj.type = logpoint_RecordTypeToJSON(message.type));
    message.tag !== undefined && (obj.tag = message.tag);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StoreRequest>, I>>(
    object: I
  ): StoreRequest {
    const message = createBaseStoreRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.camera =
      object.camera !== undefined && object.camera !== null
        ? Camera.fromPartial(object.camera)
        : undefined;
    message.type = object.type ?? 0;
    message.tag = object.tag ?? "";
    return message;
  },
};

function createBaseStoreResponse(): StoreResponse {
  return { header: undefined, point: undefined };
}

export const StoreResponse = {
  encode(
    message: StoreResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.point !== undefined) {
      Logpoint.encode(message.point, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StoreResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStoreResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.point = Logpoint.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StoreResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      point: isSet(object.point) ? Logpoint.fromJSON(object.point) : undefined,
    };
  },

  toJSON(message: StoreResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.point !== undefined &&
      (obj.point = message.point ? Logpoint.toJSON(message.point) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StoreResponse>, I>>(
    object: I
  ): StoreResponse {
    const message = createBaseStoreResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.point =
      object.point !== undefined && object.point !== null
        ? Logpoint.fromPartial(object.point)
        : undefined;
    return message;
  },
};

function createBaseTagRequest(): TagRequest {
  return { header: undefined, point: undefined };
}

export const TagRequest = {
  encode(
    message: TagRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.point !== undefined) {
      Logpoint.encode(message.point, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TagRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTagRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.point = Logpoint.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TagRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      point: isSet(object.point) ? Logpoint.fromJSON(object.point) : undefined,
    };
  },

  toJSON(message: TagRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.point !== undefined &&
      (obj.point = message.point ? Logpoint.toJSON(message.point) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TagRequest>, I>>(
    object: I
  ): TagRequest {
    const message = createBaseTagRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.point =
      object.point !== undefined && object.point !== null
        ? Logpoint.fromPartial(object.point)
        : undefined;
    return message;
  },
};

function createBaseTagResponse(): TagResponse {
  return { header: undefined };
}

export const TagResponse = {
  encode(
    message: TagResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TagResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTagResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TagResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: TagResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TagResponse>, I>>(
    object: I
  ): TagResponse {
    const message = createBaseTagResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseListCamerasRequest(): ListCamerasRequest {
  return { header: undefined };
}

export const ListCamerasRequest = {
  encode(
    message: ListCamerasRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListCamerasRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListCamerasRequest();
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

  fromJSON(object: any): ListCamerasRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: ListCamerasRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListCamerasRequest>, I>>(
    object: I
  ): ListCamerasRequest {
    const message = createBaseListCamerasRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseListCamerasResponse(): ListCamerasResponse {
  return { header: undefined, cameras: [] };
}

export const ListCamerasResponse = {
  encode(
    message: ListCamerasResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.cameras) {
      Camera.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListCamerasResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListCamerasResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.cameras.push(Camera.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListCamerasResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      cameras: Array.isArray(object?.cameras)
        ? object.cameras.map((e: any) => Camera.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListCamerasResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.cameras) {
      obj.cameras = message.cameras.map((e) =>
        e ? Camera.toJSON(e) : undefined
      );
    } else {
      obj.cameras = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListCamerasResponse>, I>>(
    object: I
  ): ListCamerasResponse {
    const message = createBaseListCamerasResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.cameras = object.cameras?.map((e) => Camera.fromPartial(e)) || [];
    return message;
  },
};

function createBaseListLogpointsRequest(): ListLogpointsRequest {
  return { header: undefined };
}

export const ListLogpointsRequest = {
  encode(
    message: ListLogpointsRequest,
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
  ): ListLogpointsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListLogpointsRequest();
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

  fromJSON(object: any): ListLogpointsRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: ListLogpointsRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListLogpointsRequest>, I>>(
    object: I
  ): ListLogpointsRequest {
    const message = createBaseListLogpointsRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseListLogpointsResponse(): ListLogpointsResponse {
  return { header: undefined, logpoints: [] };
}

export const ListLogpointsResponse = {
  encode(
    message: ListLogpointsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.logpoints) {
      Logpoint.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListLogpointsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListLogpointsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.logpoints.push(Logpoint.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListLogpointsResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      logpoints: Array.isArray(object?.logpoints)
        ? object.logpoints.map((e: any) => Logpoint.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListLogpointsResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.logpoints) {
      obj.logpoints = message.logpoints.map((e) =>
        e ? Logpoint.toJSON(e) : undefined
      );
    } else {
      obj.logpoints = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListLogpointsResponse>, I>>(
    object: I
  ): ListLogpointsResponse {
    const message = createBaseListLogpointsResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.logpoints =
      object.logpoints?.map((e) => Logpoint.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSetPassphraseRequest(): SetPassphraseRequest {
  return { header: undefined, passphrase: "" };
}

export const SetPassphraseRequest = {
  encode(
    message: SetPassphraseRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.passphrase !== "") {
      writer.uint32(18).string(message.passphrase);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SetPassphraseRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetPassphraseRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.passphrase = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetPassphraseRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      passphrase: isSet(object.passphrase) ? String(object.passphrase) : "",
    };
  },

  toJSON(message: SetPassphraseRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.passphrase !== undefined && (obj.passphrase = message.passphrase);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetPassphraseRequest>, I>>(
    object: I
  ): SetPassphraseRequest {
    const message = createBaseSetPassphraseRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.passphrase = object.passphrase ?? "";
    return message;
  },
};

function createBaseSetPassphraseResponse(): SetPassphraseResponse {
  return { header: undefined };
}

export const SetPassphraseResponse = {
  encode(
    message: SetPassphraseResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SetPassphraseResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetPassphraseResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetPassphraseResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: SetPassphraseResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetPassphraseResponse>, I>>(
    object: I
  ): SetPassphraseResponse {
    const message = createBaseSetPassphraseResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseDebugRequest(): DebugRequest {
  return {
    header: undefined,
    enableTemperature: false,
    enableHumidity: false,
    enableBIT: false,
    enableShock: false,
    enableSystemStat: false,
  };
}

export const DebugRequest = {
  encode(
    message: DebugRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.enableTemperature === true) {
      writer.uint32(16).bool(message.enableTemperature);
    }
    if (message.enableHumidity === true) {
      writer.uint32(24).bool(message.enableHumidity);
    }
    if (message.enableBIT === true) {
      writer.uint32(32).bool(message.enableBIT);
    }
    if (message.enableShock === true) {
      writer.uint32(40).bool(message.enableShock);
    }
    if (message.enableSystemStat === true) {
      writer.uint32(48).bool(message.enableSystemStat);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DebugRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDebugRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.enableTemperature = reader.bool();
          break;
        case 3:
          message.enableHumidity = reader.bool();
          break;
        case 4:
          message.enableBIT = reader.bool();
          break;
        case 5:
          message.enableShock = reader.bool();
          break;
        case 6:
          message.enableSystemStat = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DebugRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      enableTemperature: isSet(object.enableTemperature)
        ? Boolean(object.enableTemperature)
        : false,
      enableHumidity: isSet(object.enableHumidity)
        ? Boolean(object.enableHumidity)
        : false,
      enableBIT: isSet(object.enableBIT) ? Boolean(object.enableBIT) : false,
      enableShock: isSet(object.enableShock)
        ? Boolean(object.enableShock)
        : false,
      enableSystemStat: isSet(object.enableSystemStat)
        ? Boolean(object.enableSystemStat)
        : false,
    };
  },

  toJSON(message: DebugRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.enableTemperature !== undefined &&
      (obj.enableTemperature = message.enableTemperature);
    message.enableHumidity !== undefined &&
      (obj.enableHumidity = message.enableHumidity);
    message.enableBIT !== undefined && (obj.enableBIT = message.enableBIT);
    message.enableShock !== undefined &&
      (obj.enableShock = message.enableShock);
    message.enableSystemStat !== undefined &&
      (obj.enableSystemStat = message.enableSystemStat);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DebugRequest>, I>>(
    object: I
  ): DebugRequest {
    const message = createBaseDebugRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.enableTemperature = object.enableTemperature ?? false;
    message.enableHumidity = object.enableHumidity ?? false;
    message.enableBIT = object.enableBIT ?? false;
    message.enableShock = object.enableShock ?? false;
    message.enableSystemStat = object.enableSystemStat ?? false;
    return message;
  },
};

function createBaseDebugResponse(): DebugResponse {
  return { header: undefined };
}

export const DebugResponse = {
  encode(
    message: DebugResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DebugResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDebugResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DebugResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: DebugResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DebugResponse>, I>>(
    object: I
  ): DebugResponse {
    const message = createBaseDebugResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
