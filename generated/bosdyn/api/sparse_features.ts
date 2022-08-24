/* eslint-disable */
import { Vec2 } from "./geometry";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/** A point of interest in an image expressed as a pixel coordinate with associated metadata. */
export interface Keypoint {
  /** The image pixel coordinates of the keypoint. */
  coordinates: Vec2 | undefined;
  /** A binary descriptor representing the keypoint. */
  binaryDescriptor: Uint8Array;
  /** The score of this keypoint from the underlying keypoint detector, if applicable. */
  score: number;
  /** The diameter in pixels of the local neighborhood used to construct the descriptor. */
  size: number;
  /** The orientation of the keypoint, if applicable. */
  angle: number;
}

/** A set of keypoints detected in a single image. */
export interface KeypointSet {
  /** A set of detected keypoints and associated metadata. */
  keypoints: Keypoint[];
  /** The algorithm used to compute this keypoint and its descriptor. */
  type: KeypointSet_KeypointType;
}

export enum KeypointSet_KeypointType {
  KEYPOINT_UNKNOWN = 0,
  /**
   * KEYPOINT_SIMPLE - Keypoints that consist only of image coordinates. Simple keypoints do not have
   * descriptors.
   */
  KEYPOINT_SIMPLE = 1,
  /**
   * KEYPOINT_ORB - Keypoints detected by the ORB feature extraction algorithm (Oriented FAST and Rotated
   * BRIEF.)
   */
  KEYPOINT_ORB = 2,
  UNRECOGNIZED = -1,
}

export function keypointSet_KeypointTypeFromJSON(
  object: any
): KeypointSet_KeypointType {
  switch (object) {
    case 0:
    case "KEYPOINT_UNKNOWN":
      return KeypointSet_KeypointType.KEYPOINT_UNKNOWN;
    case 1:
    case "KEYPOINT_SIMPLE":
      return KeypointSet_KeypointType.KEYPOINT_SIMPLE;
    case 2:
    case "KEYPOINT_ORB":
      return KeypointSet_KeypointType.KEYPOINT_ORB;
    case -1:
    case "UNRECOGNIZED":
    default:
      return KeypointSet_KeypointType.UNRECOGNIZED;
  }
}

export function keypointSet_KeypointTypeToJSON(
  object: KeypointSet_KeypointType
): string {
  switch (object) {
    case KeypointSet_KeypointType.KEYPOINT_UNKNOWN:
      return "KEYPOINT_UNKNOWN";
    case KeypointSet_KeypointType.KEYPOINT_SIMPLE:
      return "KEYPOINT_SIMPLE";
    case KeypointSet_KeypointType.KEYPOINT_ORB:
      return "KEYPOINT_ORB";
    case KeypointSet_KeypointType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Match {
  /** The index in the reference KeypointSet of the keypoint in the matching pair. */
  referenceIndex: number;
  /** The index in the live KeypointSet of the keypoint in the matching pair. */
  liveIndex: number;
  /** The distance in descriptor space between the two keypoints. */
  distance: number;
}

/** A pair of keypoint sets containing only features in common that have been matched. */
export interface KeypointMatches {
  /** The set of common keypoints in a first ("reference") image. */
  referenceKeypoints: KeypointSet | undefined;
  /** The set of common keypoints in a second ("live") image. */
  liveKeypoints: KeypointSet | undefined;
  /** Indices of pairs of matches in the two KeypointSets and their distance measure. */
  matches: Match[];
}

function createBaseKeypoint(): Keypoint {
  return {
    coordinates: undefined,
    binaryDescriptor: new Uint8Array(),
    score: 0,
    size: 0,
    angle: 0,
  };
}

export const Keypoint = {
  encode(
    message: Keypoint,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.coordinates !== undefined) {
      Vec2.encode(message.coordinates, writer.uint32(18).fork()).ldelim();
    }
    if (message.binaryDescriptor.length !== 0) {
      writer.uint32(26).bytes(message.binaryDescriptor);
    }
    if (message.score !== 0) {
      writer.uint32(37).float(message.score);
    }
    if (message.size !== 0) {
      writer.uint32(45).float(message.size);
    }
    if (message.angle !== 0) {
      writer.uint32(53).float(message.angle);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Keypoint {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeypoint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.coordinates = Vec2.decode(reader, reader.uint32());
          break;
        case 3:
          message.binaryDescriptor = reader.bytes();
          break;
        case 4:
          message.score = reader.float();
          break;
        case 5:
          message.size = reader.float();
          break;
        case 6:
          message.angle = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Keypoint {
    return {
      coordinates: isSet(object.coordinates)
        ? Vec2.fromJSON(object.coordinates)
        : undefined,
      binaryDescriptor: isSet(object.binaryDescriptor)
        ? bytesFromBase64(object.binaryDescriptor)
        : new Uint8Array(),
      score: isSet(object.score) ? Number(object.score) : 0,
      size: isSet(object.size) ? Number(object.size) : 0,
      angle: isSet(object.angle) ? Number(object.angle) : 0,
    };
  },

  toJSON(message: Keypoint): unknown {
    const obj: any = {};
    message.coordinates !== undefined &&
      (obj.coordinates = message.coordinates
        ? Vec2.toJSON(message.coordinates)
        : undefined);
    message.binaryDescriptor !== undefined &&
      (obj.binaryDescriptor = base64FromBytes(
        message.binaryDescriptor !== undefined
          ? message.binaryDescriptor
          : new Uint8Array()
      ));
    message.score !== undefined && (obj.score = message.score);
    message.size !== undefined && (obj.size = message.size);
    message.angle !== undefined && (obj.angle = message.angle);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Keypoint>, I>>(object: I): Keypoint {
    const message = createBaseKeypoint();
    message.coordinates =
      object.coordinates !== undefined && object.coordinates !== null
        ? Vec2.fromPartial(object.coordinates)
        : undefined;
    message.binaryDescriptor = object.binaryDescriptor ?? new Uint8Array();
    message.score = object.score ?? 0;
    message.size = object.size ?? 0;
    message.angle = object.angle ?? 0;
    return message;
  },
};

function createBaseKeypointSet(): KeypointSet {
  return { keypoints: [], type: 0 };
}

export const KeypointSet = {
  encode(
    message: KeypointSet,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.keypoints) {
      Keypoint.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.type !== 0) {
      writer.uint32(24).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KeypointSet {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeypointSet();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.keypoints.push(Keypoint.decode(reader, reader.uint32()));
          break;
        case 3:
          message.type = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): KeypointSet {
    return {
      keypoints: Array.isArray(object?.keypoints)
        ? object.keypoints.map((e: any) => Keypoint.fromJSON(e))
        : [],
      type: isSet(object.type)
        ? keypointSet_KeypointTypeFromJSON(object.type)
        : 0,
    };
  },

  toJSON(message: KeypointSet): unknown {
    const obj: any = {};
    if (message.keypoints) {
      obj.keypoints = message.keypoints.map((e) =>
        e ? Keypoint.toJSON(e) : undefined
      );
    } else {
      obj.keypoints = [];
    }
    message.type !== undefined &&
      (obj.type = keypointSet_KeypointTypeToJSON(message.type));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<KeypointSet>, I>>(
    object: I
  ): KeypointSet {
    const message = createBaseKeypointSet();
    message.keypoints =
      object.keypoints?.map((e) => Keypoint.fromPartial(e)) || [];
    message.type = object.type ?? 0;
    return message;
  },
};

function createBaseMatch(): Match {
  return { referenceIndex: 0, liveIndex: 0, distance: 0 };
}

export const Match = {
  encode(message: Match, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.referenceIndex !== 0) {
      writer.uint32(16).int32(message.referenceIndex);
    }
    if (message.liveIndex !== 0) {
      writer.uint32(24).int32(message.liveIndex);
    }
    if (message.distance !== 0) {
      writer.uint32(37).float(message.distance);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Match {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMatch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.referenceIndex = reader.int32();
          break;
        case 3:
          message.liveIndex = reader.int32();
          break;
        case 4:
          message.distance = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Match {
    return {
      referenceIndex: isSet(object.referenceIndex)
        ? Number(object.referenceIndex)
        : 0,
      liveIndex: isSet(object.liveIndex) ? Number(object.liveIndex) : 0,
      distance: isSet(object.distance) ? Number(object.distance) : 0,
    };
  },

  toJSON(message: Match): unknown {
    const obj: any = {};
    message.referenceIndex !== undefined &&
      (obj.referenceIndex = Math.round(message.referenceIndex));
    message.liveIndex !== undefined &&
      (obj.liveIndex = Math.round(message.liveIndex));
    message.distance !== undefined && (obj.distance = message.distance);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Match>, I>>(object: I): Match {
    const message = createBaseMatch();
    message.referenceIndex = object.referenceIndex ?? 0;
    message.liveIndex = object.liveIndex ?? 0;
    message.distance = object.distance ?? 0;
    return message;
  },
};

function createBaseKeypointMatches(): KeypointMatches {
  return {
    referenceKeypoints: undefined,
    liveKeypoints: undefined,
    matches: [],
  };
}

export const KeypointMatches = {
  encode(
    message: KeypointMatches,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.referenceKeypoints !== undefined) {
      KeypointSet.encode(
        message.referenceKeypoints,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.liveKeypoints !== undefined) {
      KeypointSet.encode(
        message.liveKeypoints,
        writer.uint32(26).fork()
      ).ldelim();
    }
    for (const v of message.matches) {
      Match.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KeypointMatches {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeypointMatches();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.referenceKeypoints = KeypointSet.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.liveKeypoints = KeypointSet.decode(reader, reader.uint32());
          break;
        case 4:
          message.matches.push(Match.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): KeypointMatches {
    return {
      referenceKeypoints: isSet(object.referenceKeypoints)
        ? KeypointSet.fromJSON(object.referenceKeypoints)
        : undefined,
      liveKeypoints: isSet(object.liveKeypoints)
        ? KeypointSet.fromJSON(object.liveKeypoints)
        : undefined,
      matches: Array.isArray(object?.matches)
        ? object.matches.map((e: any) => Match.fromJSON(e))
        : [],
    };
  },

  toJSON(message: KeypointMatches): unknown {
    const obj: any = {};
    message.referenceKeypoints !== undefined &&
      (obj.referenceKeypoints = message.referenceKeypoints
        ? KeypointSet.toJSON(message.referenceKeypoints)
        : undefined);
    message.liveKeypoints !== undefined &&
      (obj.liveKeypoints = message.liveKeypoints
        ? KeypointSet.toJSON(message.liveKeypoints)
        : undefined);
    if (message.matches) {
      obj.matches = message.matches.map((e) =>
        e ? Match.toJSON(e) : undefined
      );
    } else {
      obj.matches = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<KeypointMatches>, I>>(
    object: I
  ): KeypointMatches {
    const message = createBaseKeypointMatches();
    message.referenceKeypoints =
      object.referenceKeypoints !== undefined &&
      object.referenceKeypoints !== null
        ? KeypointSet.fromPartial(object.referenceKeypoints)
        : undefined;
    message.liveKeypoints =
      object.liveKeypoints !== undefined && object.liveKeypoints !== null
        ? KeypointSet.fromPartial(object.liveKeypoints)
        : undefined;
    message.matches = object.matches?.map((e) => Match.fromPartial(e)) || [];
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
