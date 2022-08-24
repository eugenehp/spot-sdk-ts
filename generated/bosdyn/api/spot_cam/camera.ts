/* eslint-disable */
import { Vec2, SE3Pose } from "../geometry";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api.spot_cam";

export interface Camera {
  /** Identifier for the camera. */
  name: string;
  /** Resolution of the sensor, where x = width and y = height. */
  resolution: Vec2 | undefined;
  /**
   * The frame name for the parent frame of this camera. This frame will show up in the FrameTreeSnapshot
   * grabbed from the payload registration service.
   */
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
  /** Physical cameras */
  pinhole: Camera_PinholeIntrinsics | undefined;
  /** Only synthetic spherical panoramas */
  spherical: Camera_SphericalLimits | undefined;
}

export interface Camera_PinholeIntrinsics {
  /** Focal_length in pixels */
  focalLength: Vec2 | undefined;
  /** Center point in pixels */
  centerPoint: Vec2 | undefined;
  /**
   * The following 4 parameters are radial distortion coefficeints to 4 orders.
   * See: https://en.wikipedia.org/wiki/Distortion_(optics)#Software_correction
   * If all 4 of these values are 0, do not apply any correction.
   */
  k1: number;
  k2: number;
  k3: number;
  k4: number;
}

/**
 * Spherical limits are the minimum and maximum angle of the image.
 * IE the upper left pixel is at min_angle.x, min_angle.y
 * and the lower right pixel is at max_angle.x, max_angle.y
 * for a full-FOV image this will be (-180, 90) and (180, -90)
 */
export interface Camera_SphericalLimits {
  minAngle: Vec2 | undefined;
  maxAngle: Vec2 | undefined;
}

function createBaseCamera(): Camera {
  return {
    name: "",
    resolution: undefined,
    baseFrameName: "",
    baseTfromSensor: undefined,
    baseTformSensor: undefined,
    pinhole: undefined,
    spherical: undefined,
  };
}

export const Camera = {
  encode(
    message: Camera,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.resolution !== undefined) {
      Vec2.encode(message.resolution, writer.uint32(18).fork()).ldelim();
    }
    if (message.baseFrameName !== "") {
      writer.uint32(26).string(message.baseFrameName);
    }
    if (message.baseTfromSensor !== undefined) {
      SE3Pose.encode(
        message.baseTfromSensor,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.baseTformSensor !== undefined) {
      SE3Pose.encode(
        message.baseTformSensor,
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.pinhole !== undefined) {
      Camera_PinholeIntrinsics.encode(
        message.pinhole,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.spherical !== undefined) {
      Camera_SphericalLimits.encode(
        message.spherical,
        writer.uint32(50).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Camera {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCamera();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.resolution = Vec2.decode(reader, reader.uint32());
          break;
        case 3:
          message.baseFrameName = reader.string();
          break;
        case 4:
          message.baseTfromSensor = SE3Pose.decode(reader, reader.uint32());
          break;
        case 7:
          message.baseTformSensor = SE3Pose.decode(reader, reader.uint32());
          break;
        case 5:
          message.pinhole = Camera_PinholeIntrinsics.decode(
            reader,
            reader.uint32()
          );
          break;
        case 6:
          message.spherical = Camera_SphericalLimits.decode(
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

  fromJSON(object: any): Camera {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      resolution: isSet(object.resolution)
        ? Vec2.fromJSON(object.resolution)
        : undefined,
      baseFrameName: isSet(object.baseFrameName)
        ? String(object.baseFrameName)
        : "",
      baseTfromSensor: isSet(object.baseTfromSensor)
        ? SE3Pose.fromJSON(object.baseTfromSensor)
        : undefined,
      baseTformSensor: isSet(object.baseTformSensor)
        ? SE3Pose.fromJSON(object.baseTformSensor)
        : undefined,
      pinhole: isSet(object.pinhole)
        ? Camera_PinholeIntrinsics.fromJSON(object.pinhole)
        : undefined,
      spherical: isSet(object.spherical)
        ? Camera_SphericalLimits.fromJSON(object.spherical)
        : undefined,
    };
  },

  toJSON(message: Camera): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.resolution !== undefined &&
      (obj.resolution = message.resolution
        ? Vec2.toJSON(message.resolution)
        : undefined);
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
    message.pinhole !== undefined &&
      (obj.pinhole = message.pinhole
        ? Camera_PinholeIntrinsics.toJSON(message.pinhole)
        : undefined);
    message.spherical !== undefined &&
      (obj.spherical = message.spherical
        ? Camera_SphericalLimits.toJSON(message.spherical)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Camera>, I>>(object: I): Camera {
    const message = createBaseCamera();
    message.name = object.name ?? "";
    message.resolution =
      object.resolution !== undefined && object.resolution !== null
        ? Vec2.fromPartial(object.resolution)
        : undefined;
    message.baseFrameName = object.baseFrameName ?? "";
    message.baseTfromSensor =
      object.baseTfromSensor !== undefined && object.baseTfromSensor !== null
        ? SE3Pose.fromPartial(object.baseTfromSensor)
        : undefined;
    message.baseTformSensor =
      object.baseTformSensor !== undefined && object.baseTformSensor !== null
        ? SE3Pose.fromPartial(object.baseTformSensor)
        : undefined;
    message.pinhole =
      object.pinhole !== undefined && object.pinhole !== null
        ? Camera_PinholeIntrinsics.fromPartial(object.pinhole)
        : undefined;
    message.spherical =
      object.spherical !== undefined && object.spherical !== null
        ? Camera_SphericalLimits.fromPartial(object.spherical)
        : undefined;
    return message;
  },
};

function createBaseCamera_PinholeIntrinsics(): Camera_PinholeIntrinsics {
  return {
    focalLength: undefined,
    centerPoint: undefined,
    k1: 0,
    k2: 0,
    k3: 0,
    k4: 0,
  };
}

export const Camera_PinholeIntrinsics = {
  encode(
    message: Camera_PinholeIntrinsics,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.focalLength !== undefined) {
      Vec2.encode(message.focalLength, writer.uint32(10).fork()).ldelim();
    }
    if (message.centerPoint !== undefined) {
      Vec2.encode(message.centerPoint, writer.uint32(18).fork()).ldelim();
    }
    if (message.k1 !== 0) {
      writer.uint32(29).float(message.k1);
    }
    if (message.k2 !== 0) {
      writer.uint32(37).float(message.k2);
    }
    if (message.k3 !== 0) {
      writer.uint32(45).float(message.k3);
    }
    if (message.k4 !== 0) {
      writer.uint32(53).float(message.k4);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): Camera_PinholeIntrinsics {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCamera_PinholeIntrinsics();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.focalLength = Vec2.decode(reader, reader.uint32());
          break;
        case 2:
          message.centerPoint = Vec2.decode(reader, reader.uint32());
          break;
        case 3:
          message.k1 = reader.float();
          break;
        case 4:
          message.k2 = reader.float();
          break;
        case 5:
          message.k3 = reader.float();
          break;
        case 6:
          message.k4 = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Camera_PinholeIntrinsics {
    return {
      focalLength: isSet(object.focalLength)
        ? Vec2.fromJSON(object.focalLength)
        : undefined,
      centerPoint: isSet(object.centerPoint)
        ? Vec2.fromJSON(object.centerPoint)
        : undefined,
      k1: isSet(object.k1) ? Number(object.k1) : 0,
      k2: isSet(object.k2) ? Number(object.k2) : 0,
      k3: isSet(object.k3) ? Number(object.k3) : 0,
      k4: isSet(object.k4) ? Number(object.k4) : 0,
    };
  },

  toJSON(message: Camera_PinholeIntrinsics): unknown {
    const obj: any = {};
    message.focalLength !== undefined &&
      (obj.focalLength = message.focalLength
        ? Vec2.toJSON(message.focalLength)
        : undefined);
    message.centerPoint !== undefined &&
      (obj.centerPoint = message.centerPoint
        ? Vec2.toJSON(message.centerPoint)
        : undefined);
    message.k1 !== undefined && (obj.k1 = message.k1);
    message.k2 !== undefined && (obj.k2 = message.k2);
    message.k3 !== undefined && (obj.k3 = message.k3);
    message.k4 !== undefined && (obj.k4 = message.k4);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Camera_PinholeIntrinsics>, I>>(
    object: I
  ): Camera_PinholeIntrinsics {
    const message = createBaseCamera_PinholeIntrinsics();
    message.focalLength =
      object.focalLength !== undefined && object.focalLength !== null
        ? Vec2.fromPartial(object.focalLength)
        : undefined;
    message.centerPoint =
      object.centerPoint !== undefined && object.centerPoint !== null
        ? Vec2.fromPartial(object.centerPoint)
        : undefined;
    message.k1 = object.k1 ?? 0;
    message.k2 = object.k2 ?? 0;
    message.k3 = object.k3 ?? 0;
    message.k4 = object.k4 ?? 0;
    return message;
  },
};

function createBaseCamera_SphericalLimits(): Camera_SphericalLimits {
  return { minAngle: undefined, maxAngle: undefined };
}

export const Camera_SphericalLimits = {
  encode(
    message: Camera_SphericalLimits,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.minAngle !== undefined) {
      Vec2.encode(message.minAngle, writer.uint32(10).fork()).ldelim();
    }
    if (message.maxAngle !== undefined) {
      Vec2.encode(message.maxAngle, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): Camera_SphericalLimits {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCamera_SphericalLimits();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.minAngle = Vec2.decode(reader, reader.uint32());
          break;
        case 2:
          message.maxAngle = Vec2.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Camera_SphericalLimits {
    return {
      minAngle: isSet(object.minAngle)
        ? Vec2.fromJSON(object.minAngle)
        : undefined,
      maxAngle: isSet(object.maxAngle)
        ? Vec2.fromJSON(object.maxAngle)
        : undefined,
    };
  },

  toJSON(message: Camera_SphericalLimits): unknown {
    const obj: any = {};
    message.minAngle !== undefined &&
      (obj.minAngle = message.minAngle
        ? Vec2.toJSON(message.minAngle)
        : undefined);
    message.maxAngle !== undefined &&
      (obj.maxAngle = message.maxAngle
        ? Vec2.toJSON(message.maxAngle)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Camera_SphericalLimits>, I>>(
    object: I
  ): Camera_SphericalLimits {
    const message = createBaseCamera_SphericalLimits();
    message.minAngle =
      object.minAngle !== undefined && object.minAngle !== null
        ? Vec2.fromPartial(object.minAngle)
        : undefined;
    message.maxAngle =
      object.maxAngle !== undefined && object.maxAngle !== null
        ? Vec2.fromPartial(object.maxAngle)
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
