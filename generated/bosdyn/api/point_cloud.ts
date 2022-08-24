/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp";
import { FrameTreeSnapshot } from "./geometry";
import { RequestHeader, ResponseHeader } from "./header";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/** Information about a sensor or process that produces point clouds. */
export interface PointCloudSource {
  /**
   * The name of the point cloud source. This is intended to be unique accross all point cloud sources,
   * and should be human readable.
   */
  name: string;
  /**
   * The frame name of the sensor. The transformation from vision_tform_sensor can be computed
   * by traversing the tree in the FrameTreeSnapshot.
   */
  frameNameSensor: string;
  /** Time that the data was produced on the sensor in the robot's clock. */
  acquisitionTime: Date | undefined;
  /**
   * A tree-based collection of transformations, which will include the transformations
   * to the point cloud data frame and the point cloud sensor frame.
   */
  transformsSnapshot: FrameTreeSnapshot | undefined;
}

/** Data from a point-cloud producing sensor or process. */
export interface PointCloud {
  /** The sensor or process that produced the point cloud. */
  source: PointCloudSource | undefined;
  /** The number of points in the point cloud. */
  numPoints: number;
  /** Representation of the underlying point cloud data. */
  encoding: PointCloud_Encoding;
  /** Constants needed to decode the point cloud. */
  encodingParameters: PointCloud_EncodingParameters | undefined;
  /** Raw byte data representing the points. */
  data: Uint8Array;
}

/** Point clouds may be encoded in different ways to preserve bandwidth or disk space. */
export enum PointCloud_Encoding {
  /** ENCODING_UNKNOWN - The point cloud has an unknown encoding. */
  ENCODING_UNKNOWN = 0,
  /**
   * ENCODING_XYZ_32F - Each point is x,y,z float32 value (12 bytes, little-endian) stored sequentially. This allows
   * the point cloud to be expressed in any range and resolution represented by floating point
   * numbers, but the point cloud will be larger than if one of the other encodings is used.
   */
  ENCODING_XYZ_32F = 1,
  /**
   * ENCODING_XYZ_4SC - Each point is 3 signed int8s plus an extra shared signed int8s (4 byte).
   * byte layout: [..., p1_x, p1_y, p1_z, x, ...]
   * Each coordinate is mapped to a value between -1 and +1 (corresponding to a
   * minimum and maximum range).
   * The resulting point is:
   *   P = remap(p1 * f + p2, c * f, m)
   * Where:
   *   p1 = the highest byte in each dimension of the point.
   *   p2 = a vector of "extra" bytes converted to metric units.
   *     = [mod (x, f), mod(x/f, f), mod(x/(f^2), f)] - f/2
   *   x = the "extra" byte for each point.
   *   f = An integer scale factor.
   *   m = [max_x, max_y, max_z], the point cloud max bounds in meters.
   *   c = a remapping constant.
   * And:
   *  remap(a, b, c) = (a + b)/(2 * b) - c
   * Point clouds use 1/3 the memory of XYZ_32F, but have limits on resolution
   * and range. Points must not lie outside of the box of size [-m, m]. Within that box,
   * the resolution of the point cloud will depend on the encoding parameters.
   * For example if m = [10, 10, 10], and f = 5 with c = 127 the resolution is
   * approximately 1.5 cm per point.
   */
  ENCODING_XYZ_4SC = 2,
  /**
   * ENCODING_XYZ_5SC - Each point is 3 signed int8s plus two extra shared signed int8s (5 byte).
   * The encoding is the same as XYZ_4SC, except the "extra" value x is a 16 bit integer.
   * This encoding has roughly double the resolution of XYZ_4SC, but takes up
   * an additional byte for each point.
   */
  ENCODING_XYZ_5SC = 3,
  UNRECOGNIZED = -1,
}

export function pointCloud_EncodingFromJSON(object: any): PointCloud_Encoding {
  switch (object) {
    case 0:
    case "ENCODING_UNKNOWN":
      return PointCloud_Encoding.ENCODING_UNKNOWN;
    case 1:
    case "ENCODING_XYZ_32F":
      return PointCloud_Encoding.ENCODING_XYZ_32F;
    case 2:
    case "ENCODING_XYZ_4SC":
      return PointCloud_Encoding.ENCODING_XYZ_4SC;
    case 3:
    case "ENCODING_XYZ_5SC":
      return PointCloud_Encoding.ENCODING_XYZ_5SC;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PointCloud_Encoding.UNRECOGNIZED;
  }
}

export function pointCloud_EncodingToJSON(object: PointCloud_Encoding): string {
  switch (object) {
    case PointCloud_Encoding.ENCODING_UNKNOWN:
      return "ENCODING_UNKNOWN";
    case PointCloud_Encoding.ENCODING_XYZ_32F:
      return "ENCODING_XYZ_32F";
    case PointCloud_Encoding.ENCODING_XYZ_4SC:
      return "ENCODING_XYZ_4SC";
    case PointCloud_Encoding.ENCODING_XYZ_5SC:
      return "ENCODING_XYZ_5SC";
    case PointCloud_Encoding.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Parameters needed to decode the point cloud. */
export interface PointCloud_EncodingParameters {
  /** Used in the remapping process from bytes to metric units. (unitless) */
  scaleFactor: number;
  /**
   * In XYZ_4SC and XYZ_5SC, the point cloud is assumed to lie inside a box
   * centered in the data frame. max_x, max_y, max_z are half the dimensions
   * of that box. These dimensions should be assumed to be meters.
   */
  maxX: number;
  /**
   * max_y is half the dimensions of the assumed box (for XYZ_4SC and XYZ_5SC). These
   * dimensions should be assumed to be meters.
   */
  maxY: number;
  /**
   * max_z is half the dimensions of the assumed box (for XYZ_4SC and XYZ_5SC). These
   * dimensions should be assumed to be meters.
   */
  maxZ: number;
  /**
   * Used in the remapping process from bytes to metric units. (unitless)
   * For XYZ_4SC and XYZ_5C, this should equal 127.
   */
  remappingConstant: number;
  /** Number of bytes in each point in this encoding. */
  bytesPerPoint: number;
}

export interface ListPointCloudSourcesRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/** The GetPointCloud response message which returns any point cloud data associated with that service. */
export interface ListPointCloudSourcesResponse {
  /** Common response Header. */
  header: ResponseHeader | undefined;
  /**
   * The set of PointCloudSources available from this service.
   * May be empty if the service serves no point clouds (e.g., if no sensors were found on startup).
   */
  pointCloudSources: PointCloudSource[];
}

export interface PointCloudRequest {
  /** Name of the point cloud source to request from. */
  pointCloudSourceName: string;
}

/** The GetPointCloud request message to ask a specific point cloud service for data. */
export interface GetPointCloudRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Sources to retrieve from. The service will return a response for each PointCloudRequest. */
  pointCloudRequests: PointCloudRequest[];
}

export interface PointCloudResponse {
  /** Return status for the request. */
  status: PointCloudResponse_Status;
  /** The current point cloud from the service. */
  pointCloud: PointCloud | undefined;
}

export enum PointCloudResponse_Status {
  /**
   * STATUS_UNKNOWN - UNKNOWN should never be used.
   * An internal PointCloudService issue has happened if UNKNOWN is set.
   * None of the other fields are filled out.
   */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Call succeeded at filling out all the fields. */
  STATUS_OK = 1,
  /** STATUS_SOURCE_DATA_ERROR - Failed to fill out PointCloudSource. All the other fields are not filled out. */
  STATUS_SOURCE_DATA_ERROR = 2,
  /** STATUS_POINT_CLOUD_DATA_ERROR - There was a problem with the point cloud data.  Only the PointCloudSource is filled out. */
  STATUS_POINT_CLOUD_DATA_ERROR = 3,
  /** STATUS_UNKNOWN_SOURCE - Provided point cloud source was not found. One */
  STATUS_UNKNOWN_SOURCE = 4,
  UNRECOGNIZED = -1,
}

export function pointCloudResponse_StatusFromJSON(
  object: any
): PointCloudResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return PointCloudResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return PointCloudResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_SOURCE_DATA_ERROR":
      return PointCloudResponse_Status.STATUS_SOURCE_DATA_ERROR;
    case 3:
    case "STATUS_POINT_CLOUD_DATA_ERROR":
      return PointCloudResponse_Status.STATUS_POINT_CLOUD_DATA_ERROR;
    case 4:
    case "STATUS_UNKNOWN_SOURCE":
      return PointCloudResponse_Status.STATUS_UNKNOWN_SOURCE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PointCloudResponse_Status.UNRECOGNIZED;
  }
}

export function pointCloudResponse_StatusToJSON(
  object: PointCloudResponse_Status
): string {
  switch (object) {
    case PointCloudResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case PointCloudResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case PointCloudResponse_Status.STATUS_SOURCE_DATA_ERROR:
      return "STATUS_SOURCE_DATA_ERROR";
    case PointCloudResponse_Status.STATUS_POINT_CLOUD_DATA_ERROR:
      return "STATUS_POINT_CLOUD_DATA_ERROR";
    case PointCloudResponse_Status.STATUS_UNKNOWN_SOURCE:
      return "STATUS_UNKNOWN_SOURCE";
    case PointCloudResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface GetPointCloudResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** The resulting point clouds for each requested source. */
  pointCloudResponses: PointCloudResponse[];
}

function createBasePointCloudSource(): PointCloudSource {
  return {
    name: "",
    frameNameSensor: "",
    acquisitionTime: undefined,
    transformsSnapshot: undefined,
  };
}

export const PointCloudSource = {
  encode(
    message: PointCloudSource,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.frameNameSensor !== "") {
      writer.uint32(26).string(message.frameNameSensor);
    }
    if (message.acquisitionTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.acquisitionTime),
        writer.uint32(242).fork()
      ).ldelim();
    }
    if (message.transformsSnapshot !== undefined) {
      FrameTreeSnapshot.encode(
        message.transformsSnapshot,
        writer.uint32(250).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PointCloudSource {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePointCloudSource();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 3:
          message.frameNameSensor = reader.string();
          break;
        case 30:
          message.acquisitionTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 31:
          message.transformsSnapshot = FrameTreeSnapshot.decode(
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

  fromJSON(object: any): PointCloudSource {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      frameNameSensor: isSet(object.frameNameSensor)
        ? String(object.frameNameSensor)
        : "",
      acquisitionTime: isSet(object.acquisitionTime)
        ? fromJsonTimestamp(object.acquisitionTime)
        : undefined,
      transformsSnapshot: isSet(object.transformsSnapshot)
        ? FrameTreeSnapshot.fromJSON(object.transformsSnapshot)
        : undefined,
    };
  },

  toJSON(message: PointCloudSource): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.frameNameSensor !== undefined &&
      (obj.frameNameSensor = message.frameNameSensor);
    message.acquisitionTime !== undefined &&
      (obj.acquisitionTime = message.acquisitionTime.toISOString());
    message.transformsSnapshot !== undefined &&
      (obj.transformsSnapshot = message.transformsSnapshot
        ? FrameTreeSnapshot.toJSON(message.transformsSnapshot)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PointCloudSource>, I>>(
    object: I
  ): PointCloudSource {
    const message = createBasePointCloudSource();
    message.name = object.name ?? "";
    message.frameNameSensor = object.frameNameSensor ?? "";
    message.acquisitionTime = object.acquisitionTime ?? undefined;
    message.transformsSnapshot =
      object.transformsSnapshot !== undefined &&
      object.transformsSnapshot !== null
        ? FrameTreeSnapshot.fromPartial(object.transformsSnapshot)
        : undefined;
    return message;
  },
};

function createBasePointCloud(): PointCloud {
  return {
    source: undefined,
    numPoints: 0,
    encoding: 0,
    encodingParameters: undefined,
    data: new Uint8Array(),
  };
}

export const PointCloud = {
  encode(
    message: PointCloud,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.source !== undefined) {
      PointCloudSource.encode(
        message.source,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.numPoints !== 0) {
      writer.uint32(16).int32(message.numPoints);
    }
    if (message.encoding !== 0) {
      writer.uint32(24).int32(message.encoding);
    }
    if (message.encodingParameters !== undefined) {
      PointCloud_EncodingParameters.encode(
        message.encodingParameters,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.data.length !== 0) {
      writer.uint32(42).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PointCloud {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePointCloud();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.source = PointCloudSource.decode(reader, reader.uint32());
          break;
        case 2:
          message.numPoints = reader.int32();
          break;
        case 3:
          message.encoding = reader.int32() as any;
          break;
        case 4:
          message.encodingParameters = PointCloud_EncodingParameters.decode(
            reader,
            reader.uint32()
          );
          break;
        case 5:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PointCloud {
    return {
      source: isSet(object.source)
        ? PointCloudSource.fromJSON(object.source)
        : undefined,
      numPoints: isSet(object.numPoints) ? Number(object.numPoints) : 0,
      encoding: isSet(object.encoding)
        ? pointCloud_EncodingFromJSON(object.encoding)
        : 0,
      encodingParameters: isSet(object.encodingParameters)
        ? PointCloud_EncodingParameters.fromJSON(object.encodingParameters)
        : undefined,
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
    };
  },

  toJSON(message: PointCloud): unknown {
    const obj: any = {};
    message.source !== undefined &&
      (obj.source = message.source
        ? PointCloudSource.toJSON(message.source)
        : undefined);
    message.numPoints !== undefined &&
      (obj.numPoints = Math.round(message.numPoints));
    message.encoding !== undefined &&
      (obj.encoding = pointCloud_EncodingToJSON(message.encoding));
    message.encodingParameters !== undefined &&
      (obj.encodingParameters = message.encodingParameters
        ? PointCloud_EncodingParameters.toJSON(message.encodingParameters)
        : undefined);
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PointCloud>, I>>(
    object: I
  ): PointCloud {
    const message = createBasePointCloud();
    message.source =
      object.source !== undefined && object.source !== null
        ? PointCloudSource.fromPartial(object.source)
        : undefined;
    message.numPoints = object.numPoints ?? 0;
    message.encoding = object.encoding ?? 0;
    message.encodingParameters =
      object.encodingParameters !== undefined &&
      object.encodingParameters !== null
        ? PointCloud_EncodingParameters.fromPartial(object.encodingParameters)
        : undefined;
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};

function createBasePointCloud_EncodingParameters(): PointCloud_EncodingParameters {
  return {
    scaleFactor: 0,
    maxX: 0,
    maxY: 0,
    maxZ: 0,
    remappingConstant: 0,
    bytesPerPoint: 0,
  };
}

export const PointCloud_EncodingParameters = {
  encode(
    message: PointCloud_EncodingParameters,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.scaleFactor !== 0) {
      writer.uint32(8).int32(message.scaleFactor);
    }
    if (message.maxX !== 0) {
      writer.uint32(17).double(message.maxX);
    }
    if (message.maxY !== 0) {
      writer.uint32(25).double(message.maxY);
    }
    if (message.maxZ !== 0) {
      writer.uint32(33).double(message.maxZ);
    }
    if (message.remappingConstant !== 0) {
      writer.uint32(41).double(message.remappingConstant);
    }
    if (message.bytesPerPoint !== 0) {
      writer.uint32(48).int32(message.bytesPerPoint);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): PointCloud_EncodingParameters {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePointCloud_EncodingParameters();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.scaleFactor = reader.int32();
          break;
        case 2:
          message.maxX = reader.double();
          break;
        case 3:
          message.maxY = reader.double();
          break;
        case 4:
          message.maxZ = reader.double();
          break;
        case 5:
          message.remappingConstant = reader.double();
          break;
        case 6:
          message.bytesPerPoint = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PointCloud_EncodingParameters {
    return {
      scaleFactor: isSet(object.scaleFactor) ? Number(object.scaleFactor) : 0,
      maxX: isSet(object.maxX) ? Number(object.maxX) : 0,
      maxY: isSet(object.maxY) ? Number(object.maxY) : 0,
      maxZ: isSet(object.maxZ) ? Number(object.maxZ) : 0,
      remappingConstant: isSet(object.remappingConstant)
        ? Number(object.remappingConstant)
        : 0,
      bytesPerPoint: isSet(object.bytesPerPoint)
        ? Number(object.bytesPerPoint)
        : 0,
    };
  },

  toJSON(message: PointCloud_EncodingParameters): unknown {
    const obj: any = {};
    message.scaleFactor !== undefined &&
      (obj.scaleFactor = Math.round(message.scaleFactor));
    message.maxX !== undefined && (obj.maxX = message.maxX);
    message.maxY !== undefined && (obj.maxY = message.maxY);
    message.maxZ !== undefined && (obj.maxZ = message.maxZ);
    message.remappingConstant !== undefined &&
      (obj.remappingConstant = message.remappingConstant);
    message.bytesPerPoint !== undefined &&
      (obj.bytesPerPoint = Math.round(message.bytesPerPoint));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PointCloud_EncodingParameters>, I>>(
    object: I
  ): PointCloud_EncodingParameters {
    const message = createBasePointCloud_EncodingParameters();
    message.scaleFactor = object.scaleFactor ?? 0;
    message.maxX = object.maxX ?? 0;
    message.maxY = object.maxY ?? 0;
    message.maxZ = object.maxZ ?? 0;
    message.remappingConstant = object.remappingConstant ?? 0;
    message.bytesPerPoint = object.bytesPerPoint ?? 0;
    return message;
  },
};

function createBaseListPointCloudSourcesRequest(): ListPointCloudSourcesRequest {
  return { header: undefined };
}

export const ListPointCloudSourcesRequest = {
  encode(
    message: ListPointCloudSourcesRequest,
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
  ): ListPointCloudSourcesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListPointCloudSourcesRequest();
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

  fromJSON(object: any): ListPointCloudSourcesRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: ListPointCloudSourcesRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListPointCloudSourcesRequest>, I>>(
    object: I
  ): ListPointCloudSourcesRequest {
    const message = createBaseListPointCloudSourcesRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseListPointCloudSourcesResponse(): ListPointCloudSourcesResponse {
  return { header: undefined, pointCloudSources: [] };
}

export const ListPointCloudSourcesResponse = {
  encode(
    message: ListPointCloudSourcesResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.pointCloudSources) {
      PointCloudSource.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListPointCloudSourcesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListPointCloudSourcesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.pointCloudSources.push(
            PointCloudSource.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListPointCloudSourcesResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      pointCloudSources: Array.isArray(object?.pointCloudSources)
        ? object.pointCloudSources.map((e: any) => PointCloudSource.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListPointCloudSourcesResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.pointCloudSources) {
      obj.pointCloudSources = message.pointCloudSources.map((e) =>
        e ? PointCloudSource.toJSON(e) : undefined
      );
    } else {
      obj.pointCloudSources = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListPointCloudSourcesResponse>, I>>(
    object: I
  ): ListPointCloudSourcesResponse {
    const message = createBaseListPointCloudSourcesResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.pointCloudSources =
      object.pointCloudSources?.map((e) => PointCloudSource.fromPartial(e)) ||
      [];
    return message;
  },
};

function createBasePointCloudRequest(): PointCloudRequest {
  return { pointCloudSourceName: "" };
}

export const PointCloudRequest = {
  encode(
    message: PointCloudRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pointCloudSourceName !== "") {
      writer.uint32(10).string(message.pointCloudSourceName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PointCloudRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePointCloudRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pointCloudSourceName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PointCloudRequest {
    return {
      pointCloudSourceName: isSet(object.pointCloudSourceName)
        ? String(object.pointCloudSourceName)
        : "",
    };
  },

  toJSON(message: PointCloudRequest): unknown {
    const obj: any = {};
    message.pointCloudSourceName !== undefined &&
      (obj.pointCloudSourceName = message.pointCloudSourceName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PointCloudRequest>, I>>(
    object: I
  ): PointCloudRequest {
    const message = createBasePointCloudRequest();
    message.pointCloudSourceName = object.pointCloudSourceName ?? "";
    return message;
  },
};

function createBaseGetPointCloudRequest(): GetPointCloudRequest {
  return { header: undefined, pointCloudRequests: [] };
}

export const GetPointCloudRequest = {
  encode(
    message: GetPointCloudRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.pointCloudRequests) {
      PointCloudRequest.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetPointCloudRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPointCloudRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.pointCloudRequests.push(
            PointCloudRequest.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetPointCloudRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      pointCloudRequests: Array.isArray(object?.pointCloudRequests)
        ? object.pointCloudRequests.map((e: any) =>
            PointCloudRequest.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: GetPointCloudRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    if (message.pointCloudRequests) {
      obj.pointCloudRequests = message.pointCloudRequests.map((e) =>
        e ? PointCloudRequest.toJSON(e) : undefined
      );
    } else {
      obj.pointCloudRequests = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetPointCloudRequest>, I>>(
    object: I
  ): GetPointCloudRequest {
    const message = createBaseGetPointCloudRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.pointCloudRequests =
      object.pointCloudRequests?.map((e) => PointCloudRequest.fromPartial(e)) ||
      [];
    return message;
  },
};

function createBasePointCloudResponse(): PointCloudResponse {
  return { status: 0, pointCloud: undefined };
}

export const PointCloudResponse = {
  encode(
    message: PointCloudResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    if (message.pointCloud !== undefined) {
      PointCloud.encode(message.pointCloud, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PointCloudResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePointCloudResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32() as any;
          break;
        case 2:
          message.pointCloud = PointCloud.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PointCloudResponse {
    return {
      status: isSet(object.status)
        ? pointCloudResponse_StatusFromJSON(object.status)
        : 0,
      pointCloud: isSet(object.pointCloud)
        ? PointCloud.fromJSON(object.pointCloud)
        : undefined,
    };
  },

  toJSON(message: PointCloudResponse): unknown {
    const obj: any = {};
    message.status !== undefined &&
      (obj.status = pointCloudResponse_StatusToJSON(message.status));
    message.pointCloud !== undefined &&
      (obj.pointCloud = message.pointCloud
        ? PointCloud.toJSON(message.pointCloud)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PointCloudResponse>, I>>(
    object: I
  ): PointCloudResponse {
    const message = createBasePointCloudResponse();
    message.status = object.status ?? 0;
    message.pointCloud =
      object.pointCloud !== undefined && object.pointCloud !== null
        ? PointCloud.fromPartial(object.pointCloud)
        : undefined;
    return message;
  },
};

function createBaseGetPointCloudResponse(): GetPointCloudResponse {
  return { header: undefined, pointCloudResponses: [] };
}

export const GetPointCloudResponse = {
  encode(
    message: GetPointCloudResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.pointCloudResponses) {
      PointCloudResponse.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetPointCloudResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPointCloudResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 4:
          message.pointCloudResponses.push(
            PointCloudResponse.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetPointCloudResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      pointCloudResponses: Array.isArray(object?.pointCloudResponses)
        ? object.pointCloudResponses.map((e: any) =>
            PointCloudResponse.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: GetPointCloudResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.pointCloudResponses) {
      obj.pointCloudResponses = message.pointCloudResponses.map((e) =>
        e ? PointCloudResponse.toJSON(e) : undefined
      );
    } else {
      obj.pointCloudResponses = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetPointCloudResponse>, I>>(
    object: I
  ): GetPointCloudResponse {
    const message = createBaseGetPointCloudResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.pointCloudResponses =
      object.pointCloudResponses?.map((e) =>
        PointCloudResponse.fromPartial(e)
      ) || [];
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

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
