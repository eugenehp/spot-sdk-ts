/* eslint-disable */
import { SE3Pose } from "./geometry";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

export interface StairTransform {
  /** The staircase origin is the bottom-center of the first rise. */
  frameTformStairs: SE3Pose | undefined;
  frameName: string;
}

export interface StraightStaircase {
  /**
   * It is expressed in ko frame of the from_waypoint.
   * This field is only used in GraphNav.
   */
  fromKoTformStairs: SE3Pose | undefined;
  /** Outside GraphNav, this field specifies the stair origin. */
  tform: StairTransform | undefined;
  /** Each stair should be rise followed by run. The last stair will have zero run. */
  stairs: StraightStaircase_Stair[];
  /**
   * The lowermost landing of the stairs. The robot will try to
   * align itself to the stairs while on this landing.
   */
  bottomLanding: StraightStaircase_Landing | undefined;
  /** The uppermost landing of the stairs. */
  topLanding: StraightStaircase_Landing | undefined;
}

/** A single stair from a staircase. */
export interface StraightStaircase_Stair {
  /** Height of each stair. */
  rise: number;
  /** Depth of each stair. */
  run: number;
}

/**
 * Straight staircases have two landings, one at the top and one at the bottom.
 * Landings are areas of free space before and after the stairs, and are represented
 * as oriented bounding boxes.
 */
export interface StraightStaircase_Landing {
  /** Pose of the landing's center relative to the stairs frame. */
  stairsTformLandingCenter: SE3Pose | undefined;
  /** The half-size of the box representing the landing in the x axis. */
  landingExtentX: number;
  /** The half-size of the box representing the landing in the y axis. */
  landingExtentY: number;
}

function createBaseStairTransform(): StairTransform {
  return { frameTformStairs: undefined, frameName: "" };
}

export const StairTransform = {
  encode(
    message: StairTransform,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.frameTformStairs !== undefined) {
      SE3Pose.encode(
        message.frameTformStairs,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.frameName !== "") {
      writer.uint32(18).string(message.frameName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StairTransform {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStairTransform();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.frameTformStairs = SE3Pose.decode(reader, reader.uint32());
          break;
        case 2:
          message.frameName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StairTransform {
    return {
      frameTformStairs: isSet(object.frameTformStairs)
        ? SE3Pose.fromJSON(object.frameTformStairs)
        : undefined,
      frameName: isSet(object.frameName) ? String(object.frameName) : "",
    };
  },

  toJSON(message: StairTransform): unknown {
    const obj: any = {};
    message.frameTformStairs !== undefined &&
      (obj.frameTformStairs = message.frameTformStairs
        ? SE3Pose.toJSON(message.frameTformStairs)
        : undefined);
    message.frameName !== undefined && (obj.frameName = message.frameName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StairTransform>, I>>(
    object: I
  ): StairTransform {
    const message = createBaseStairTransform();
    message.frameTformStairs =
      object.frameTformStairs !== undefined && object.frameTformStairs !== null
        ? SE3Pose.fromPartial(object.frameTformStairs)
        : undefined;
    message.frameName = object.frameName ?? "";
    return message;
  },
};

function createBaseStraightStaircase(): StraightStaircase {
  return {
    fromKoTformStairs: undefined,
    tform: undefined,
    stairs: [],
    bottomLanding: undefined,
    topLanding: undefined,
  };
}

export const StraightStaircase = {
  encode(
    message: StraightStaircase,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.fromKoTformStairs !== undefined) {
      SE3Pose.encode(
        message.fromKoTformStairs,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.tform !== undefined) {
      StairTransform.encode(message.tform, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.stairs) {
      StraightStaircase_Stair.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.bottomLanding !== undefined) {
      StraightStaircase_Landing.encode(
        message.bottomLanding,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.topLanding !== undefined) {
      StraightStaircase_Landing.encode(
        message.topLanding,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StraightStaircase {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStraightStaircase();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fromKoTformStairs = SE3Pose.decode(reader, reader.uint32());
          break;
        case 5:
          message.tform = StairTransform.decode(reader, reader.uint32());
          break;
        case 2:
          message.stairs.push(
            StraightStaircase_Stair.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.bottomLanding = StraightStaircase_Landing.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.topLanding = StraightStaircase_Landing.decode(
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

  fromJSON(object: any): StraightStaircase {
    return {
      fromKoTformStairs: isSet(object.fromKoTformStairs)
        ? SE3Pose.fromJSON(object.fromKoTformStairs)
        : undefined,
      tform: isSet(object.tform)
        ? StairTransform.fromJSON(object.tform)
        : undefined,
      stairs: Array.isArray(object?.stairs)
        ? object.stairs.map((e: any) => StraightStaircase_Stair.fromJSON(e))
        : [],
      bottomLanding: isSet(object.bottomLanding)
        ? StraightStaircase_Landing.fromJSON(object.bottomLanding)
        : undefined,
      topLanding: isSet(object.topLanding)
        ? StraightStaircase_Landing.fromJSON(object.topLanding)
        : undefined,
    };
  },

  toJSON(message: StraightStaircase): unknown {
    const obj: any = {};
    message.fromKoTformStairs !== undefined &&
      (obj.fromKoTformStairs = message.fromKoTformStairs
        ? SE3Pose.toJSON(message.fromKoTformStairs)
        : undefined);
    message.tform !== undefined &&
      (obj.tform = message.tform
        ? StairTransform.toJSON(message.tform)
        : undefined);
    if (message.stairs) {
      obj.stairs = message.stairs.map((e) =>
        e ? StraightStaircase_Stair.toJSON(e) : undefined
      );
    } else {
      obj.stairs = [];
    }
    message.bottomLanding !== undefined &&
      (obj.bottomLanding = message.bottomLanding
        ? StraightStaircase_Landing.toJSON(message.bottomLanding)
        : undefined);
    message.topLanding !== undefined &&
      (obj.topLanding = message.topLanding
        ? StraightStaircase_Landing.toJSON(message.topLanding)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StraightStaircase>, I>>(
    object: I
  ): StraightStaircase {
    const message = createBaseStraightStaircase();
    message.fromKoTformStairs =
      object.fromKoTformStairs !== undefined &&
      object.fromKoTformStairs !== null
        ? SE3Pose.fromPartial(object.fromKoTformStairs)
        : undefined;
    message.tform =
      object.tform !== undefined && object.tform !== null
        ? StairTransform.fromPartial(object.tform)
        : undefined;
    message.stairs =
      object.stairs?.map((e) => StraightStaircase_Stair.fromPartial(e)) || [];
    message.bottomLanding =
      object.bottomLanding !== undefined && object.bottomLanding !== null
        ? StraightStaircase_Landing.fromPartial(object.bottomLanding)
        : undefined;
    message.topLanding =
      object.topLanding !== undefined && object.topLanding !== null
        ? StraightStaircase_Landing.fromPartial(object.topLanding)
        : undefined;
    return message;
  },
};

function createBaseStraightStaircase_Stair(): StraightStaircase_Stair {
  return { rise: 0, run: 0 };
}

export const StraightStaircase_Stair = {
  encode(
    message: StraightStaircase_Stair,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.rise !== 0) {
      writer.uint32(13).float(message.rise);
    }
    if (message.run !== 0) {
      writer.uint32(21).float(message.run);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StraightStaircase_Stair {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStraightStaircase_Stair();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rise = reader.float();
          break;
        case 2:
          message.run = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StraightStaircase_Stair {
    return {
      rise: isSet(object.rise) ? Number(object.rise) : 0,
      run: isSet(object.run) ? Number(object.run) : 0,
    };
  },

  toJSON(message: StraightStaircase_Stair): unknown {
    const obj: any = {};
    message.rise !== undefined && (obj.rise = message.rise);
    message.run !== undefined && (obj.run = message.run);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StraightStaircase_Stair>, I>>(
    object: I
  ): StraightStaircase_Stair {
    const message = createBaseStraightStaircase_Stair();
    message.rise = object.rise ?? 0;
    message.run = object.run ?? 0;
    return message;
  },
};

function createBaseStraightStaircase_Landing(): StraightStaircase_Landing {
  return {
    stairsTformLandingCenter: undefined,
    landingExtentX: 0,
    landingExtentY: 0,
  };
}

export const StraightStaircase_Landing = {
  encode(
    message: StraightStaircase_Landing,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.stairsTformLandingCenter !== undefined) {
      SE3Pose.encode(
        message.stairsTformLandingCenter,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.landingExtentX !== 0) {
      writer.uint32(17).double(message.landingExtentX);
    }
    if (message.landingExtentY !== 0) {
      writer.uint32(25).double(message.landingExtentY);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StraightStaircase_Landing {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStraightStaircase_Landing();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stairsTformLandingCenter = SE3Pose.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.landingExtentX = reader.double();
          break;
        case 3:
          message.landingExtentY = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StraightStaircase_Landing {
    return {
      stairsTformLandingCenter: isSet(object.stairsTformLandingCenter)
        ? SE3Pose.fromJSON(object.stairsTformLandingCenter)
        : undefined,
      landingExtentX: isSet(object.landingExtentX)
        ? Number(object.landingExtentX)
        : 0,
      landingExtentY: isSet(object.landingExtentY)
        ? Number(object.landingExtentY)
        : 0,
    };
  },

  toJSON(message: StraightStaircase_Landing): unknown {
    const obj: any = {};
    message.stairsTformLandingCenter !== undefined &&
      (obj.stairsTformLandingCenter = message.stairsTformLandingCenter
        ? SE3Pose.toJSON(message.stairsTformLandingCenter)
        : undefined);
    message.landingExtentX !== undefined &&
      (obj.landingExtentX = message.landingExtentX);
    message.landingExtentY !== undefined &&
      (obj.landingExtentY = message.landingExtentY);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StraightStaircase_Landing>, I>>(
    object: I
  ): StraightStaircase_Landing {
    const message = createBaseStraightStaircase_Landing();
    message.stairsTformLandingCenter =
      object.stairsTformLandingCenter !== undefined &&
      object.stairsTformLandingCenter !== null
        ? SE3Pose.fromPartial(object.stairsTformLandingCenter)
        : undefined;
    message.landingExtentX = object.landingExtentX ?? 0;
    message.landingExtentY = object.landingExtentY ?? 0;
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
