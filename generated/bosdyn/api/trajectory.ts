/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp";
import { SE2Pose, SE3Pose, SE3Velocity, Vec3, Wrench } from "./geometry";
import { Duration } from "../../google/protobuf/duration";
import _m0 from "protobufjs/minimal";
import { DoubleValue } from "../../google/protobuf/wrappers";

export const protobufPackage = "bosdyn.api";

/** Parameters for how positional trajectories will be interpolated on robot. */
export enum PositionalInterpolation {
  /** POS_INTERP_UNKNOWN - Unknown interpolation, do not use. */
  POS_INTERP_UNKNOWN = 0,
  /** POS_INTERP_LINEAR - Linear interpolation for positional data. */
  POS_INTERP_LINEAR = 1,
  /** POS_INTERP_CUBIC - Cubic interpolation for positional data. */
  POS_INTERP_CUBIC = 2,
  UNRECOGNIZED = -1,
}

export function positionalInterpolationFromJSON(
  object: any
): PositionalInterpolation {
  switch (object) {
    case 0:
    case "POS_INTERP_UNKNOWN":
      return PositionalInterpolation.POS_INTERP_UNKNOWN;
    case 1:
    case "POS_INTERP_LINEAR":
      return PositionalInterpolation.POS_INTERP_LINEAR;
    case 2:
    case "POS_INTERP_CUBIC":
      return PositionalInterpolation.POS_INTERP_CUBIC;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PositionalInterpolation.UNRECOGNIZED;
  }
}

export function positionalInterpolationToJSON(
  object: PositionalInterpolation
): string {
  switch (object) {
    case PositionalInterpolation.POS_INTERP_UNKNOWN:
      return "POS_INTERP_UNKNOWN";
    case PositionalInterpolation.POS_INTERP_LINEAR:
      return "POS_INTERP_LINEAR";
    case PositionalInterpolation.POS_INTERP_CUBIC:
      return "POS_INTERP_CUBIC";
    case PositionalInterpolation.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Parameters for how angular trajectories will be interpolated on robot. */
export enum AngularInterpolation {
  /** ANG_INTERP_UNKNOWN - Unknown interpolation, do not use. */
  ANG_INTERP_UNKNOWN = 0,
  /** ANG_INTERP_LINEAR - Linear interpolation for angular data. */
  ANG_INTERP_LINEAR = 1,
  /** ANG_INTERP_CUBIC_EULER - Cubic interpolation (using Euler method) for angular data. */
  ANG_INTERP_CUBIC_EULER = 2,
  UNRECOGNIZED = -1,
}

export function angularInterpolationFromJSON(
  object: any
): AngularInterpolation {
  switch (object) {
    case 0:
    case "ANG_INTERP_UNKNOWN":
      return AngularInterpolation.ANG_INTERP_UNKNOWN;
    case 1:
    case "ANG_INTERP_LINEAR":
      return AngularInterpolation.ANG_INTERP_LINEAR;
    case 2:
    case "ANG_INTERP_CUBIC_EULER":
      return AngularInterpolation.ANG_INTERP_CUBIC_EULER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AngularInterpolation.UNRECOGNIZED;
  }
}

export function angularInterpolationToJSON(
  object: AngularInterpolation
): string {
  switch (object) {
    case AngularInterpolation.ANG_INTERP_UNKNOWN:
      return "ANG_INTERP_UNKNOWN";
    case AngularInterpolation.ANG_INTERP_LINEAR:
      return "ANG_INTERP_LINEAR";
    case AngularInterpolation.ANG_INTERP_CUBIC_EULER:
      return "ANG_INTERP_CUBIC_EULER";
    case AngularInterpolation.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * A 2D pose trajectory, which specified multiple points and the desired times the robot should
 * reach these points.
 */
export interface SE2Trajectory {
  /** The points in trajectory */
  points: SE2TrajectoryPoint[];
  /**
   * All trajectories specify times relative to this reference time. The reference time should be
   * in robot clock. If this field is not included, this time will be the receive time of the
   * command.
   */
  referenceTime: Date | undefined;
  /** Parameters for how trajectories will be interpolated on robot. */
  interpolation: PositionalInterpolation;
}

/** A SE2 pose that can be used as a point within a trajectory. */
export interface SE2TrajectoryPoint {
  /** Required pose the robot will try and achieve. */
  pose: SE2Pose | undefined;
  /** The duration to reach the point relative to the trajectory reference time. */
  timeSinceReference: Duration | undefined;
}

/**
 * A 3D pose trajectory, which specified multiple poses (and velocities for each pose)
 * and the desired times the robot should reach these points.
 */
export interface SE3Trajectory {
  /** The points in trajectory */
  points: SE3TrajectoryPoint[];
  /**
   * All trajectories specify times relative to this reference time. The reference time should be
   * in robot clock. If this field is not included, this time will be the receive time of the
   * command.
   */
  referenceTime: Date | undefined;
  /** Parameters for how trajectories will be interpolated on robot. */
  posInterpolation: PositionalInterpolation;
  angInterpolation: AngularInterpolation;
}

/** A SE3 pose and velocity that can be used as a point within a trajectory. */
export interface SE3TrajectoryPoint {
  /** Required pose the robot will try and achieve. */
  pose: SE3Pose | undefined;
  /** Optional velocity (linear and angular) the robot will try and achieve. */
  velocity: SE3Velocity | undefined;
  /** The duration to reach the point relative to the trajectory reference time. */
  timeSinceReference: Duration | undefined;
}

/**
 * A 3D point trajectory, described by 3D points, a starting and ending velocity, and
 * a reference time.
 */
export interface Vec3Trajectory {
  /** The points in trajectory. */
  points: Vec3TrajectoryPoint[];
  /**
   * All trajectories specify times relative to this reference time. The reference time should be
   * in robot clock. If this field is not included, this time will be the receive time of the
   * command.
   */
  referenceTime: Date | undefined;
  /** Parameters for how trajectories will be interpolated on robot. */
  posInterpolation: PositionalInterpolation;
  /** Velocity at the starting point of the trajectory. */
  startingVelocity: Vec3 | undefined;
  /** Velocity at the ending point of the trajectory. */
  endingVelocity: Vec3 | undefined;
}

/** A 3D point (and linear velocity) that can be used as a point within a trajectory. */
export interface Vec3TrajectoryPoint {
  /** The point 3D position. */
  point: Vec3 | undefined;
  /**
   * These are all optional.  If nothing is specified, good defaults will be chosen
   * server-side.
   */
  linearSpeed: number;
  /** The duration to reach the point relative to the trajectory reference time. */
  timeSinceReference: Duration | undefined;
}

/** A time-based trajectories of wrenches. */
export interface WrenchTrajectory {
  /** The wrenches in the trajectory */
  points: WrenchTrajectoryPoint[];
  /**
   * All trajectories specify times relative to this reference time. The reference time should be
   * in robot clock. If this field is not included, this time will be the receive time of the
   * command.
   */
  referenceTime: Date | undefined;
}

export interface WrenchTrajectoryPoint {
  /** The wrench to apply at this point in time. */
  wrench: Wrench | undefined;
  /** The duration to reach the point relative to the trajectory reference time. */
  timeSinceReference: Duration | undefined;
}

/** A Point trajectory. */
export interface ScalarTrajectory {
  /** The points in trajectory */
  points: ScalarTrajectoryPoint[];
  /**
   * All trajectories specify times relative to this reference time. The reference time should be
   * in robot clock. If this field is not included, this time will be the receive time of the
   * command.
   */
  referenceTime: Date | undefined;
  /**
   * Parameters for how trajectories will be interpolated on robot.
   * (Note: ignored for ClawGripperCommand.Request, which will automatically
   * select between cubic interpolation or a minimum time trajectory)
   */
  interpolation: PositionalInterpolation;
}

export interface ScalarTrajectoryPoint {
  /** Required position at the trajectory point's reference time. */
  point: number;
  /** Optional speed at the trajectory point's reference time. */
  velocity: number | undefined;
  /** The duration to reach the point relative to the trajectory reference time. */
  timeSinceReference: Duration | undefined;
}

function createBaseSE2Trajectory(): SE2Trajectory {
  return { points: [], referenceTime: undefined, interpolation: 0 };
}

export const SE2Trajectory = {
  encode(
    message: SE2Trajectory,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.points) {
      SE2TrajectoryPoint.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.referenceTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.referenceTime),
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.interpolation !== 0) {
      writer.uint32(32).int32(message.interpolation);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SE2Trajectory {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSE2Trajectory();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.points.push(
            SE2TrajectoryPoint.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.referenceTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.interpolation = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SE2Trajectory {
    return {
      points: Array.isArray(object?.points)
        ? object.points.map((e: any) => SE2TrajectoryPoint.fromJSON(e))
        : [],
      referenceTime: isSet(object.referenceTime)
        ? fromJsonTimestamp(object.referenceTime)
        : undefined,
      interpolation: isSet(object.interpolation)
        ? positionalInterpolationFromJSON(object.interpolation)
        : 0,
    };
  },

  toJSON(message: SE2Trajectory): unknown {
    const obj: any = {};
    if (message.points) {
      obj.points = message.points.map((e) =>
        e ? SE2TrajectoryPoint.toJSON(e) : undefined
      );
    } else {
      obj.points = [];
    }
    message.referenceTime !== undefined &&
      (obj.referenceTime = message.referenceTime.toISOString());
    message.interpolation !== undefined &&
      (obj.interpolation = positionalInterpolationToJSON(
        message.interpolation
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SE2Trajectory>, I>>(
    object: I
  ): SE2Trajectory {
    const message = createBaseSE2Trajectory();
    message.points =
      object.points?.map((e) => SE2TrajectoryPoint.fromPartial(e)) || [];
    message.referenceTime = object.referenceTime ?? undefined;
    message.interpolation = object.interpolation ?? 0;
    return message;
  },
};

function createBaseSE2TrajectoryPoint(): SE2TrajectoryPoint {
  return { pose: undefined, timeSinceReference: undefined };
}

export const SE2TrajectoryPoint = {
  encode(
    message: SE2TrajectoryPoint,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pose !== undefined) {
      SE2Pose.encode(message.pose, writer.uint32(10).fork()).ldelim();
    }
    if (message.timeSinceReference !== undefined) {
      Duration.encode(
        message.timeSinceReference,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SE2TrajectoryPoint {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSE2TrajectoryPoint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pose = SE2Pose.decode(reader, reader.uint32());
          break;
        case 3:
          message.timeSinceReference = Duration.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SE2TrajectoryPoint {
    return {
      pose: isSet(object.pose) ? SE2Pose.fromJSON(object.pose) : undefined,
      timeSinceReference: isSet(object.timeSinceReference)
        ? Duration.fromJSON(object.timeSinceReference)
        : undefined,
    };
  },

  toJSON(message: SE2TrajectoryPoint): unknown {
    const obj: any = {};
    message.pose !== undefined &&
      (obj.pose = message.pose ? SE2Pose.toJSON(message.pose) : undefined);
    message.timeSinceReference !== undefined &&
      (obj.timeSinceReference = message.timeSinceReference
        ? Duration.toJSON(message.timeSinceReference)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SE2TrajectoryPoint>, I>>(
    object: I
  ): SE2TrajectoryPoint {
    const message = createBaseSE2TrajectoryPoint();
    message.pose =
      object.pose !== undefined && object.pose !== null
        ? SE2Pose.fromPartial(object.pose)
        : undefined;
    message.timeSinceReference =
      object.timeSinceReference !== undefined &&
      object.timeSinceReference !== null
        ? Duration.fromPartial(object.timeSinceReference)
        : undefined;
    return message;
  },
};

function createBaseSE3Trajectory(): SE3Trajectory {
  return {
    points: [],
    referenceTime: undefined,
    posInterpolation: 0,
    angInterpolation: 0,
  };
}

export const SE3Trajectory = {
  encode(
    message: SE3Trajectory,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.points) {
      SE3TrajectoryPoint.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.referenceTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.referenceTime),
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.posInterpolation !== 0) {
      writer.uint32(32).int32(message.posInterpolation);
    }
    if (message.angInterpolation !== 0) {
      writer.uint32(40).int32(message.angInterpolation);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SE3Trajectory {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSE3Trajectory();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.points.push(
            SE3TrajectoryPoint.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.referenceTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.posInterpolation = reader.int32() as any;
          break;
        case 5:
          message.angInterpolation = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SE3Trajectory {
    return {
      points: Array.isArray(object?.points)
        ? object.points.map((e: any) => SE3TrajectoryPoint.fromJSON(e))
        : [],
      referenceTime: isSet(object.referenceTime)
        ? fromJsonTimestamp(object.referenceTime)
        : undefined,
      posInterpolation: isSet(object.posInterpolation)
        ? positionalInterpolationFromJSON(object.posInterpolation)
        : 0,
      angInterpolation: isSet(object.angInterpolation)
        ? angularInterpolationFromJSON(object.angInterpolation)
        : 0,
    };
  },

  toJSON(message: SE3Trajectory): unknown {
    const obj: any = {};
    if (message.points) {
      obj.points = message.points.map((e) =>
        e ? SE3TrajectoryPoint.toJSON(e) : undefined
      );
    } else {
      obj.points = [];
    }
    message.referenceTime !== undefined &&
      (obj.referenceTime = message.referenceTime.toISOString());
    message.posInterpolation !== undefined &&
      (obj.posInterpolation = positionalInterpolationToJSON(
        message.posInterpolation
      ));
    message.angInterpolation !== undefined &&
      (obj.angInterpolation = angularInterpolationToJSON(
        message.angInterpolation
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SE3Trajectory>, I>>(
    object: I
  ): SE3Trajectory {
    const message = createBaseSE3Trajectory();
    message.points =
      object.points?.map((e) => SE3TrajectoryPoint.fromPartial(e)) || [];
    message.referenceTime = object.referenceTime ?? undefined;
    message.posInterpolation = object.posInterpolation ?? 0;
    message.angInterpolation = object.angInterpolation ?? 0;
    return message;
  },
};

function createBaseSE3TrajectoryPoint(): SE3TrajectoryPoint {
  return {
    pose: undefined,
    velocity: undefined,
    timeSinceReference: undefined,
  };
}

export const SE3TrajectoryPoint = {
  encode(
    message: SE3TrajectoryPoint,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pose !== undefined) {
      SE3Pose.encode(message.pose, writer.uint32(10).fork()).ldelim();
    }
    if (message.velocity !== undefined) {
      SE3Velocity.encode(message.velocity, writer.uint32(18).fork()).ldelim();
    }
    if (message.timeSinceReference !== undefined) {
      Duration.encode(
        message.timeSinceReference,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SE3TrajectoryPoint {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSE3TrajectoryPoint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pose = SE3Pose.decode(reader, reader.uint32());
          break;
        case 2:
          message.velocity = SE3Velocity.decode(reader, reader.uint32());
          break;
        case 3:
          message.timeSinceReference = Duration.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SE3TrajectoryPoint {
    return {
      pose: isSet(object.pose) ? SE3Pose.fromJSON(object.pose) : undefined,
      velocity: isSet(object.velocity)
        ? SE3Velocity.fromJSON(object.velocity)
        : undefined,
      timeSinceReference: isSet(object.timeSinceReference)
        ? Duration.fromJSON(object.timeSinceReference)
        : undefined,
    };
  },

  toJSON(message: SE3TrajectoryPoint): unknown {
    const obj: any = {};
    message.pose !== undefined &&
      (obj.pose = message.pose ? SE3Pose.toJSON(message.pose) : undefined);
    message.velocity !== undefined &&
      (obj.velocity = message.velocity
        ? SE3Velocity.toJSON(message.velocity)
        : undefined);
    message.timeSinceReference !== undefined &&
      (obj.timeSinceReference = message.timeSinceReference
        ? Duration.toJSON(message.timeSinceReference)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SE3TrajectoryPoint>, I>>(
    object: I
  ): SE3TrajectoryPoint {
    const message = createBaseSE3TrajectoryPoint();
    message.pose =
      object.pose !== undefined && object.pose !== null
        ? SE3Pose.fromPartial(object.pose)
        : undefined;
    message.velocity =
      object.velocity !== undefined && object.velocity !== null
        ? SE3Velocity.fromPartial(object.velocity)
        : undefined;
    message.timeSinceReference =
      object.timeSinceReference !== undefined &&
      object.timeSinceReference !== null
        ? Duration.fromPartial(object.timeSinceReference)
        : undefined;
    return message;
  },
};

function createBaseVec3Trajectory(): Vec3Trajectory {
  return {
    points: [],
    referenceTime: undefined,
    posInterpolation: 0,
    startingVelocity: undefined,
    endingVelocity: undefined,
  };
}

export const Vec3Trajectory = {
  encode(
    message: Vec3Trajectory,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.points) {
      Vec3TrajectoryPoint.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.referenceTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.referenceTime),
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.posInterpolation !== 0) {
      writer.uint32(32).int32(message.posInterpolation);
    }
    if (message.startingVelocity !== undefined) {
      Vec3.encode(message.startingVelocity, writer.uint32(42).fork()).ldelim();
    }
    if (message.endingVelocity !== undefined) {
      Vec3.encode(message.endingVelocity, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Vec3Trajectory {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVec3Trajectory();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.points.push(
            Vec3TrajectoryPoint.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.referenceTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.posInterpolation = reader.int32() as any;
          break;
        case 5:
          message.startingVelocity = Vec3.decode(reader, reader.uint32());
          break;
        case 6:
          message.endingVelocity = Vec3.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Vec3Trajectory {
    return {
      points: Array.isArray(object?.points)
        ? object.points.map((e: any) => Vec3TrajectoryPoint.fromJSON(e))
        : [],
      referenceTime: isSet(object.referenceTime)
        ? fromJsonTimestamp(object.referenceTime)
        : undefined,
      posInterpolation: isSet(object.posInterpolation)
        ? positionalInterpolationFromJSON(object.posInterpolation)
        : 0,
      startingVelocity: isSet(object.startingVelocity)
        ? Vec3.fromJSON(object.startingVelocity)
        : undefined,
      endingVelocity: isSet(object.endingVelocity)
        ? Vec3.fromJSON(object.endingVelocity)
        : undefined,
    };
  },

  toJSON(message: Vec3Trajectory): unknown {
    const obj: any = {};
    if (message.points) {
      obj.points = message.points.map((e) =>
        e ? Vec3TrajectoryPoint.toJSON(e) : undefined
      );
    } else {
      obj.points = [];
    }
    message.referenceTime !== undefined &&
      (obj.referenceTime = message.referenceTime.toISOString());
    message.posInterpolation !== undefined &&
      (obj.posInterpolation = positionalInterpolationToJSON(
        message.posInterpolation
      ));
    message.startingVelocity !== undefined &&
      (obj.startingVelocity = message.startingVelocity
        ? Vec3.toJSON(message.startingVelocity)
        : undefined);
    message.endingVelocity !== undefined &&
      (obj.endingVelocity = message.endingVelocity
        ? Vec3.toJSON(message.endingVelocity)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Vec3Trajectory>, I>>(
    object: I
  ): Vec3Trajectory {
    const message = createBaseVec3Trajectory();
    message.points =
      object.points?.map((e) => Vec3TrajectoryPoint.fromPartial(e)) || [];
    message.referenceTime = object.referenceTime ?? undefined;
    message.posInterpolation = object.posInterpolation ?? 0;
    message.startingVelocity =
      object.startingVelocity !== undefined && object.startingVelocity !== null
        ? Vec3.fromPartial(object.startingVelocity)
        : undefined;
    message.endingVelocity =
      object.endingVelocity !== undefined && object.endingVelocity !== null
        ? Vec3.fromPartial(object.endingVelocity)
        : undefined;
    return message;
  },
};

function createBaseVec3TrajectoryPoint(): Vec3TrajectoryPoint {
  return { point: undefined, linearSpeed: 0, timeSinceReference: undefined };
}

export const Vec3TrajectoryPoint = {
  encode(
    message: Vec3TrajectoryPoint,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.point !== undefined) {
      Vec3.encode(message.point, writer.uint32(10).fork()).ldelim();
    }
    if (message.linearSpeed !== 0) {
      writer.uint32(33).double(message.linearSpeed);
    }
    if (message.timeSinceReference !== undefined) {
      Duration.encode(
        message.timeSinceReference,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Vec3TrajectoryPoint {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVec3TrajectoryPoint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.point = Vec3.decode(reader, reader.uint32());
          break;
        case 4:
          message.linearSpeed = reader.double();
          break;
        case 3:
          message.timeSinceReference = Duration.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Vec3TrajectoryPoint {
    return {
      point: isSet(object.point) ? Vec3.fromJSON(object.point) : undefined,
      linearSpeed: isSet(object.linearSpeed) ? Number(object.linearSpeed) : 0,
      timeSinceReference: isSet(object.timeSinceReference)
        ? Duration.fromJSON(object.timeSinceReference)
        : undefined,
    };
  },

  toJSON(message: Vec3TrajectoryPoint): unknown {
    const obj: any = {};
    message.point !== undefined &&
      (obj.point = message.point ? Vec3.toJSON(message.point) : undefined);
    message.linearSpeed !== undefined &&
      (obj.linearSpeed = message.linearSpeed);
    message.timeSinceReference !== undefined &&
      (obj.timeSinceReference = message.timeSinceReference
        ? Duration.toJSON(message.timeSinceReference)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Vec3TrajectoryPoint>, I>>(
    object: I
  ): Vec3TrajectoryPoint {
    const message = createBaseVec3TrajectoryPoint();
    message.point =
      object.point !== undefined && object.point !== null
        ? Vec3.fromPartial(object.point)
        : undefined;
    message.linearSpeed = object.linearSpeed ?? 0;
    message.timeSinceReference =
      object.timeSinceReference !== undefined &&
      object.timeSinceReference !== null
        ? Duration.fromPartial(object.timeSinceReference)
        : undefined;
    return message;
  },
};

function createBaseWrenchTrajectory(): WrenchTrajectory {
  return { points: [], referenceTime: undefined };
}

export const WrenchTrajectory = {
  encode(
    message: WrenchTrajectory,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.points) {
      WrenchTrajectoryPoint.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.referenceTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.referenceTime),
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WrenchTrajectory {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWrenchTrajectory();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.points.push(
            WrenchTrajectoryPoint.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.referenceTime = fromTimestamp(
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

  fromJSON(object: any): WrenchTrajectory {
    return {
      points: Array.isArray(object?.points)
        ? object.points.map((e: any) => WrenchTrajectoryPoint.fromJSON(e))
        : [],
      referenceTime: isSet(object.referenceTime)
        ? fromJsonTimestamp(object.referenceTime)
        : undefined,
    };
  },

  toJSON(message: WrenchTrajectory): unknown {
    const obj: any = {};
    if (message.points) {
      obj.points = message.points.map((e) =>
        e ? WrenchTrajectoryPoint.toJSON(e) : undefined
      );
    } else {
      obj.points = [];
    }
    message.referenceTime !== undefined &&
      (obj.referenceTime = message.referenceTime.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WrenchTrajectory>, I>>(
    object: I
  ): WrenchTrajectory {
    const message = createBaseWrenchTrajectory();
    message.points =
      object.points?.map((e) => WrenchTrajectoryPoint.fromPartial(e)) || [];
    message.referenceTime = object.referenceTime ?? undefined;
    return message;
  },
};

function createBaseWrenchTrajectoryPoint(): WrenchTrajectoryPoint {
  return { wrench: undefined, timeSinceReference: undefined };
}

export const WrenchTrajectoryPoint = {
  encode(
    message: WrenchTrajectoryPoint,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.wrench !== undefined) {
      Wrench.encode(message.wrench, writer.uint32(10).fork()).ldelim();
    }
    if (message.timeSinceReference !== undefined) {
      Duration.encode(
        message.timeSinceReference,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): WrenchTrajectoryPoint {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWrenchTrajectoryPoint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.wrench = Wrench.decode(reader, reader.uint32());
          break;
        case 2:
          message.timeSinceReference = Duration.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WrenchTrajectoryPoint {
    return {
      wrench: isSet(object.wrench) ? Wrench.fromJSON(object.wrench) : undefined,
      timeSinceReference: isSet(object.timeSinceReference)
        ? Duration.fromJSON(object.timeSinceReference)
        : undefined,
    };
  },

  toJSON(message: WrenchTrajectoryPoint): unknown {
    const obj: any = {};
    message.wrench !== undefined &&
      (obj.wrench = message.wrench ? Wrench.toJSON(message.wrench) : undefined);
    message.timeSinceReference !== undefined &&
      (obj.timeSinceReference = message.timeSinceReference
        ? Duration.toJSON(message.timeSinceReference)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WrenchTrajectoryPoint>, I>>(
    object: I
  ): WrenchTrajectoryPoint {
    const message = createBaseWrenchTrajectoryPoint();
    message.wrench =
      object.wrench !== undefined && object.wrench !== null
        ? Wrench.fromPartial(object.wrench)
        : undefined;
    message.timeSinceReference =
      object.timeSinceReference !== undefined &&
      object.timeSinceReference !== null
        ? Duration.fromPartial(object.timeSinceReference)
        : undefined;
    return message;
  },
};

function createBaseScalarTrajectory(): ScalarTrajectory {
  return { points: [], referenceTime: undefined, interpolation: 0 };
}

export const ScalarTrajectory = {
  encode(
    message: ScalarTrajectory,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.points) {
      ScalarTrajectoryPoint.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.referenceTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.referenceTime),
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.interpolation !== 0) {
      writer.uint32(24).int32(message.interpolation);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ScalarTrajectory {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScalarTrajectory();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.points.push(
            ScalarTrajectoryPoint.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.referenceTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.interpolation = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ScalarTrajectory {
    return {
      points: Array.isArray(object?.points)
        ? object.points.map((e: any) => ScalarTrajectoryPoint.fromJSON(e))
        : [],
      referenceTime: isSet(object.referenceTime)
        ? fromJsonTimestamp(object.referenceTime)
        : undefined,
      interpolation: isSet(object.interpolation)
        ? positionalInterpolationFromJSON(object.interpolation)
        : 0,
    };
  },

  toJSON(message: ScalarTrajectory): unknown {
    const obj: any = {};
    if (message.points) {
      obj.points = message.points.map((e) =>
        e ? ScalarTrajectoryPoint.toJSON(e) : undefined
      );
    } else {
      obj.points = [];
    }
    message.referenceTime !== undefined &&
      (obj.referenceTime = message.referenceTime.toISOString());
    message.interpolation !== undefined &&
      (obj.interpolation = positionalInterpolationToJSON(
        message.interpolation
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ScalarTrajectory>, I>>(
    object: I
  ): ScalarTrajectory {
    const message = createBaseScalarTrajectory();
    message.points =
      object.points?.map((e) => ScalarTrajectoryPoint.fromPartial(e)) || [];
    message.referenceTime = object.referenceTime ?? undefined;
    message.interpolation = object.interpolation ?? 0;
    return message;
  },
};

function createBaseScalarTrajectoryPoint(): ScalarTrajectoryPoint {
  return { point: 0, velocity: undefined, timeSinceReference: undefined };
}

export const ScalarTrajectoryPoint = {
  encode(
    message: ScalarTrajectoryPoint,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.point !== 0) {
      writer.uint32(9).double(message.point);
    }
    if (message.velocity !== undefined) {
      DoubleValue.encode(
        { value: message.velocity! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.timeSinceReference !== undefined) {
      Duration.encode(
        message.timeSinceReference,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ScalarTrajectoryPoint {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScalarTrajectoryPoint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.point = reader.double();
          break;
        case 2:
          message.velocity = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.timeSinceReference = Duration.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ScalarTrajectoryPoint {
    return {
      point: isSet(object.point) ? Number(object.point) : 0,
      velocity: isSet(object.velocity) ? Number(object.velocity) : undefined,
      timeSinceReference: isSet(object.timeSinceReference)
        ? Duration.fromJSON(object.timeSinceReference)
        : undefined,
    };
  },

  toJSON(message: ScalarTrajectoryPoint): unknown {
    const obj: any = {};
    message.point !== undefined && (obj.point = message.point);
    message.velocity !== undefined && (obj.velocity = message.velocity);
    message.timeSinceReference !== undefined &&
      (obj.timeSinceReference = message.timeSinceReference
        ? Duration.toJSON(message.timeSinceReference)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ScalarTrajectoryPoint>, I>>(
    object: I
  ): ScalarTrajectoryPoint {
    const message = createBaseScalarTrajectoryPoint();
    message.point = object.point ?? 0;
    message.velocity = object.velocity ?? undefined;
    message.timeSinceReference =
      object.timeSinceReference !== undefined &&
      object.timeSinceReference !== null
        ? Duration.fromPartial(object.timeSinceReference)
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
