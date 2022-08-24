/* eslint-disable */
import { RequestHeader, ResponseHeader } from "./header";
import { Ray, Vec3, FrameTreeSnapshot } from "./geometry";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

export interface RaycastRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** The ray's coordinate frame. When unset, this will default to vision frame. */
  rayFrameName: string;
  /** The ray, containing and origin and an direction. */
  ray: Ray | undefined;
  /**
   * Ignore intersections closer than this location on the ray.
   * Defaults to 0 if not provided.
   */
  minIntersectionDistance: number;
  /**
   * Type of the raycast you want to perform.  If multiple are set, the result will wait until
   * all raycasts are complete and return a single result proto.
   *
   * If this field is left empty, all available sources are used.
   */
  intersectionTypes: RayIntersection_Type[];
}

export interface RayIntersection {
  /** Type of the raycast intersection that was performed. */
  type: RayIntersection_Type;
  /** Position of ray cast hit in the RaycastResponse hit_frame. */
  hitPositionInHitFrame: Vec3 | undefined;
  /** Distance of hit from ray origin. */
  distanceMeters: number;
}

export enum RayIntersection_Type {
  /** TYPE_UNKNOWN - TYPE_UNKNOWN should not be used. */
  TYPE_UNKNOWN = 0,
  /** TYPE_GROUND_PLANE - Intersected against estimated ground plane. */
  TYPE_GROUND_PLANE = 1,
  /** TYPE_TERRAIN_MAP - Intersected against the terrain map. */
  TYPE_TERRAIN_MAP = 2,
  /** TYPE_VOXEL_MAP - Intersected against the full 3D voxel map. */
  TYPE_VOXEL_MAP = 3,
  /** TYPE_HAND_DEPTH - Intersected against the hand depth data. */
  TYPE_HAND_DEPTH = 4,
  UNRECOGNIZED = -1,
}

export function rayIntersection_TypeFromJSON(
  object: any
): RayIntersection_Type {
  switch (object) {
    case 0:
    case "TYPE_UNKNOWN":
      return RayIntersection_Type.TYPE_UNKNOWN;
    case 1:
    case "TYPE_GROUND_PLANE":
      return RayIntersection_Type.TYPE_GROUND_PLANE;
    case 2:
    case "TYPE_TERRAIN_MAP":
      return RayIntersection_Type.TYPE_TERRAIN_MAP;
    case 3:
    case "TYPE_VOXEL_MAP":
      return RayIntersection_Type.TYPE_VOXEL_MAP;
    case 4:
    case "TYPE_HAND_DEPTH":
      return RayIntersection_Type.TYPE_HAND_DEPTH;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RayIntersection_Type.UNRECOGNIZED;
  }
}

export function rayIntersection_TypeToJSON(
  object: RayIntersection_Type
): string {
  switch (object) {
    case RayIntersection_Type.TYPE_UNKNOWN:
      return "TYPE_UNKNOWN";
    case RayIntersection_Type.TYPE_GROUND_PLANE:
      return "TYPE_GROUND_PLANE";
    case RayIntersection_Type.TYPE_TERRAIN_MAP:
      return "TYPE_TERRAIN_MAP";
    case RayIntersection_Type.TYPE_VOXEL_MAP:
      return "TYPE_VOXEL_MAP";
    case RayIntersection_Type.TYPE_HAND_DEPTH:
      return "TYPE_HAND_DEPTH";
    case RayIntersection_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface RaycastResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Return status for a request. */
  status: RaycastResponse_Status;
  /** Human-readable error description.  Not for programmatic analysis. */
  message: string;
  /**
   * The frame raycast hits are returned in. Generally this should be the same frame the client
   * initially requested in.
   */
  hitFrameName: string;
  /** Ray cast hits, sorted with the closest hit first along the ray's extent. */
  hits: RayIntersection[];
  /**
   * A tree-based collection of transformations, which will include the
   * transformations to each of the returned world objects in addition to
   * transformations to the common frames ("vision", "body", "odom").  All
   * transforms within the snapshot are taken at the time when the request is received.
   *
   * Note that each object's frame names are defined within the properties
   * submessage e.g. "frame_name".
   */
  transformsSnapshot: FrameTreeSnapshot | undefined;
}

export enum RaycastResponse_Status {
  /** STATUS_UNKNOWN - An unknown / unexpected error occurred. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Request was accepted. */
  STATUS_OK = 1,
  /** STATUS_INVALID_REQUEST - [Programming Error] Request was invalid / malformed in some way. */
  STATUS_INVALID_REQUEST = 2,
  /** STATUS_INVALID_INTERSECTION_TYPE - [Programming Error] Requested source not valid for current robot configuration. */
  STATUS_INVALID_INTERSECTION_TYPE = 3,
  /** STATUS_UNKNOWN_FRAME - [Frame Error] The frame_name for a command was not a known frame. */
  STATUS_UNKNOWN_FRAME = 4,
  UNRECOGNIZED = -1,
}

export function raycastResponse_StatusFromJSON(
  object: any
): RaycastResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return RaycastResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return RaycastResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_INVALID_REQUEST":
      return RaycastResponse_Status.STATUS_INVALID_REQUEST;
    case 3:
    case "STATUS_INVALID_INTERSECTION_TYPE":
      return RaycastResponse_Status.STATUS_INVALID_INTERSECTION_TYPE;
    case 4:
    case "STATUS_UNKNOWN_FRAME":
      return RaycastResponse_Status.STATUS_UNKNOWN_FRAME;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RaycastResponse_Status.UNRECOGNIZED;
  }
}

export function raycastResponse_StatusToJSON(
  object: RaycastResponse_Status
): string {
  switch (object) {
    case RaycastResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case RaycastResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case RaycastResponse_Status.STATUS_INVALID_REQUEST:
      return "STATUS_INVALID_REQUEST";
    case RaycastResponse_Status.STATUS_INVALID_INTERSECTION_TYPE:
      return "STATUS_INVALID_INTERSECTION_TYPE";
    case RaycastResponse_Status.STATUS_UNKNOWN_FRAME:
      return "STATUS_UNKNOWN_FRAME";
    case RaycastResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseRaycastRequest(): RaycastRequest {
  return {
    header: undefined,
    rayFrameName: "",
    ray: undefined,
    minIntersectionDistance: 0,
    intersectionTypes: [],
  };
}

export const RaycastRequest = {
  encode(
    message: RaycastRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.rayFrameName !== "") {
      writer.uint32(42).string(message.rayFrameName);
    }
    if (message.ray !== undefined) {
      Ray.encode(message.ray, writer.uint32(18).fork()).ldelim();
    }
    if (message.minIntersectionDistance !== 0) {
      writer.uint32(37).float(message.minIntersectionDistance);
    }
    writer.uint32(58).fork();
    for (const v of message.intersectionTypes) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RaycastRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRaycastRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 5:
          message.rayFrameName = reader.string();
          break;
        case 2:
          message.ray = Ray.decode(reader, reader.uint32());
          break;
        case 4:
          message.minIntersectionDistance = reader.float();
          break;
        case 7:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.intersectionTypes.push(reader.int32() as any);
            }
          } else {
            message.intersectionTypes.push(reader.int32() as any);
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RaycastRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      rayFrameName: isSet(object.rayFrameName)
        ? String(object.rayFrameName)
        : "",
      ray: isSet(object.ray) ? Ray.fromJSON(object.ray) : undefined,
      minIntersectionDistance: isSet(object.minIntersectionDistance)
        ? Number(object.minIntersectionDistance)
        : 0,
      intersectionTypes: Array.isArray(object?.intersectionTypes)
        ? object.intersectionTypes.map((e: any) =>
            rayIntersection_TypeFromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: RaycastRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.rayFrameName !== undefined &&
      (obj.rayFrameName = message.rayFrameName);
    message.ray !== undefined &&
      (obj.ray = message.ray ? Ray.toJSON(message.ray) : undefined);
    message.minIntersectionDistance !== undefined &&
      (obj.minIntersectionDistance = message.minIntersectionDistance);
    if (message.intersectionTypes) {
      obj.intersectionTypes = message.intersectionTypes.map((e) =>
        rayIntersection_TypeToJSON(e)
      );
    } else {
      obj.intersectionTypes = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RaycastRequest>, I>>(
    object: I
  ): RaycastRequest {
    const message = createBaseRaycastRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.rayFrameName = object.rayFrameName ?? "";
    message.ray =
      object.ray !== undefined && object.ray !== null
        ? Ray.fromPartial(object.ray)
        : undefined;
    message.minIntersectionDistance = object.minIntersectionDistance ?? 0;
    message.intersectionTypes = object.intersectionTypes?.map((e) => e) || [];
    return message;
  },
};

function createBaseRayIntersection(): RayIntersection {
  return { type: 0, hitPositionInHitFrame: undefined, distanceMeters: 0 };
}

export const RayIntersection = {
  encode(
    message: RayIntersection,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.hitPositionInHitFrame !== undefined) {
      Vec3.encode(
        message.hitPositionInHitFrame,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.distanceMeters !== 0) {
      writer.uint32(25).double(message.distanceMeters);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RayIntersection {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRayIntersection();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.hitPositionInHitFrame = Vec3.decode(reader, reader.uint32());
          break;
        case 3:
          message.distanceMeters = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RayIntersection {
    return {
      type: isSet(object.type) ? rayIntersection_TypeFromJSON(object.type) : 0,
      hitPositionInHitFrame: isSet(object.hitPositionInHitFrame)
        ? Vec3.fromJSON(object.hitPositionInHitFrame)
        : undefined,
      distanceMeters: isSet(object.distanceMeters)
        ? Number(object.distanceMeters)
        : 0,
    };
  },

  toJSON(message: RayIntersection): unknown {
    const obj: any = {};
    message.type !== undefined &&
      (obj.type = rayIntersection_TypeToJSON(message.type));
    message.hitPositionInHitFrame !== undefined &&
      (obj.hitPositionInHitFrame = message.hitPositionInHitFrame
        ? Vec3.toJSON(message.hitPositionInHitFrame)
        : undefined);
    message.distanceMeters !== undefined &&
      (obj.distanceMeters = message.distanceMeters);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RayIntersection>, I>>(
    object: I
  ): RayIntersection {
    const message = createBaseRayIntersection();
    message.type = object.type ?? 0;
    message.hitPositionInHitFrame =
      object.hitPositionInHitFrame !== undefined &&
      object.hitPositionInHitFrame !== null
        ? Vec3.fromPartial(object.hitPositionInHitFrame)
        : undefined;
    message.distanceMeters = object.distanceMeters ?? 0;
    return message;
  },
};

function createBaseRaycastResponse(): RaycastResponse {
  return {
    header: undefined,
    status: 0,
    message: "",
    hitFrameName: "",
    hits: [],
    transformsSnapshot: undefined,
  };
}

export const RaycastResponse = {
  encode(
    message: RaycastResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(40).int32(message.status);
    }
    if (message.message !== "") {
      writer.uint32(50).string(message.message);
    }
    if (message.hitFrameName !== "") {
      writer.uint32(26).string(message.hitFrameName);
    }
    for (const v of message.hits) {
      RayIntersection.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.transformsSnapshot !== undefined) {
      FrameTreeSnapshot.encode(
        message.transformsSnapshot,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RaycastResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRaycastResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 5:
          message.status = reader.int32() as any;
          break;
        case 6:
          message.message = reader.string();
          break;
        case 3:
          message.hitFrameName = reader.string();
          break;
        case 2:
          message.hits.push(RayIntersection.decode(reader, reader.uint32()));
          break;
        case 4:
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

  fromJSON(object: any): RaycastResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? raycastResponse_StatusFromJSON(object.status)
        : 0,
      message: isSet(object.message) ? String(object.message) : "",
      hitFrameName: isSet(object.hitFrameName)
        ? String(object.hitFrameName)
        : "",
      hits: Array.isArray(object?.hits)
        ? object.hits.map((e: any) => RayIntersection.fromJSON(e))
        : [],
      transformsSnapshot: isSet(object.transformsSnapshot)
        ? FrameTreeSnapshot.fromJSON(object.transformsSnapshot)
        : undefined,
    };
  },

  toJSON(message: RaycastResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = raycastResponse_StatusToJSON(message.status));
    message.message !== undefined && (obj.message = message.message);
    message.hitFrameName !== undefined &&
      (obj.hitFrameName = message.hitFrameName);
    if (message.hits) {
      obj.hits = message.hits.map((e) =>
        e ? RayIntersection.toJSON(e) : undefined
      );
    } else {
      obj.hits = [];
    }
    message.transformsSnapshot !== undefined &&
      (obj.transformsSnapshot = message.transformsSnapshot
        ? FrameTreeSnapshot.toJSON(message.transformsSnapshot)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RaycastResponse>, I>>(
    object: I
  ): RaycastResponse {
    const message = createBaseRaycastResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    message.message = object.message ?? "";
    message.hitFrameName = object.hitFrameName ?? "";
    message.hits =
      object.hits?.map((e) => RayIntersection.fromPartial(e)) || [];
    message.transformsSnapshot =
      object.transformsSnapshot !== undefined &&
      object.transformsSnapshot !== null
        ? FrameTreeSnapshot.fromPartial(object.transformsSnapshot)
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
