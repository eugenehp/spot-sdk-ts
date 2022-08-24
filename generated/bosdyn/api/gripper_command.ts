/* eslint-disable */
import {
  RobotCommandFeedbackStatus_Status,
  robotCommandFeedbackStatus_StatusFromJSON,
  robotCommandFeedbackStatus_StatusToJSON,
} from "./basic_command";
import { ScalarTrajectory } from "./trajectory";
import _m0 from "protobufjs/minimal";
import { DoubleValue } from "../../google/protobuf/wrappers";

export const protobufPackage = "bosdyn.api";

/**
 * The synchronized command message for commanding the gripper to move.
 * A synchronized commands is one of the possible robot command messages for controlling the robot.
 */
export interface GripperCommand {}

/** The gripper request must be one of the basic command primitives. */
export interface GripperCommand_Request {
  /** Control opening and closing the gripper. */
  clawGripperCommand: ClawGripperCommand_Request | undefined;
}

/**
 * The feedback for the gripper command that will provide information on the progress
 * of the command.
 */
export interface GripperCommand_Feedback {
  /** Feedback for the claw gripper command. */
  clawGripperFeedback: ClawGripperCommand_Feedback | undefined;
  status: RobotCommandFeedbackStatus_Status;
}

/** Command to open and close the gripper. */
export interface ClawGripperCommand {}

export interface ClawGripperCommand_Request {
  /**
   * Scalar trajectory for opening/closing the gripper. If 1 point is specified
   * with no end time, we will execute a minimum time trajectory that observes
   * velocity and acceleration constraints. Otherwise, we will use piecewise
   * cubic interpolation, meaning there will be a cubic polynomial between each
   * trajectory point, with continuous position and velocity at each trajectory
   * point. If the requested trajectory violates the velocity or acceleration
   * constraints below, a trajectory that is as close as possible but still
   * obeys the constraints will be executed instead.
   * position is radians: 0 is fully closed -1.5708 (-90 degrees) is fully open
   * velocity is radians / sec.
   */
  trajectory: ScalarTrajectory | undefined;
  /** If unspecified, a default value of 10 (rad/s) will be used. */
  maximumOpenCloseVelocity: number | undefined;
  /** If unspecified, a default value of 40 (rad/s/s) will be used. */
  maximumOpenCloseAcceleration: number | undefined;
  /** Maximum torque applied. If unspecified, a default value of 5.5 (Nm) will be used. */
  maximumTorque: number | undefined;
  /**
   * By default the gripper transitions to force control when it detects an object closing.
   * Setting this field to true disables the transition to force control on contact detection
   * and always keeps the gripper in position control.
   */
  disableForceOnContact: boolean;
}

export interface ClawGripperCommand_Feedback {
  /** Current status of the command. */
  status: ClawGripperCommand_Feedback_Status;
}

export enum ClawGripperCommand_Feedback_Status {
  /** STATUS_UNKNOWN - STATUS_UNKNOWN should never be used. If used, an internal error has happened. */
  STATUS_UNKNOWN = 0,
  /** STATUS_IN_PROGRESS - The gripper is opening or closing. */
  STATUS_IN_PROGRESS = 1,
  /** STATUS_AT_GOAL - The gripper is at the final point of the trajectory. */
  STATUS_AT_GOAL = 2,
  /** STATUS_APPLYING_FORCE - During a close, detected contact and transitioned to force control. */
  STATUS_APPLYING_FORCE = 3,
  UNRECOGNIZED = -1,
}

export function clawGripperCommand_Feedback_StatusFromJSON(
  object: any
): ClawGripperCommand_Feedback_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return ClawGripperCommand_Feedback_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_IN_PROGRESS":
      return ClawGripperCommand_Feedback_Status.STATUS_IN_PROGRESS;
    case 2:
    case "STATUS_AT_GOAL":
      return ClawGripperCommand_Feedback_Status.STATUS_AT_GOAL;
    case 3:
    case "STATUS_APPLYING_FORCE":
      return ClawGripperCommand_Feedback_Status.STATUS_APPLYING_FORCE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ClawGripperCommand_Feedback_Status.UNRECOGNIZED;
  }
}

export function clawGripperCommand_Feedback_StatusToJSON(
  object: ClawGripperCommand_Feedback_Status
): string {
  switch (object) {
    case ClawGripperCommand_Feedback_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case ClawGripperCommand_Feedback_Status.STATUS_IN_PROGRESS:
      return "STATUS_IN_PROGRESS";
    case ClawGripperCommand_Feedback_Status.STATUS_AT_GOAL:
      return "STATUS_AT_GOAL";
    case ClawGripperCommand_Feedback_Status.STATUS_APPLYING_FORCE:
      return "STATUS_APPLYING_FORCE";
    case ClawGripperCommand_Feedback_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseGripperCommand(): GripperCommand {
  return {};
}

export const GripperCommand = {
  encode(
    _: GripperCommand,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GripperCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGripperCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): GripperCommand {
    return {};
  },

  toJSON(_: GripperCommand): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GripperCommand>, I>>(
    _: I
  ): GripperCommand {
    const message = createBaseGripperCommand();
    return message;
  },
};

function createBaseGripperCommand_Request(): GripperCommand_Request {
  return { clawGripperCommand: undefined };
}

export const GripperCommand_Request = {
  encode(
    message: GripperCommand_Request,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.clawGripperCommand !== undefined) {
      ClawGripperCommand_Request.encode(
        message.clawGripperCommand,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GripperCommand_Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGripperCommand_Request();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clawGripperCommand = ClawGripperCommand_Request.decode(
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

  fromJSON(object: any): GripperCommand_Request {
    return {
      clawGripperCommand: isSet(object.clawGripperCommand)
        ? ClawGripperCommand_Request.fromJSON(object.clawGripperCommand)
        : undefined,
    };
  },

  toJSON(message: GripperCommand_Request): unknown {
    const obj: any = {};
    message.clawGripperCommand !== undefined &&
      (obj.clawGripperCommand = message.clawGripperCommand
        ? ClawGripperCommand_Request.toJSON(message.clawGripperCommand)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GripperCommand_Request>, I>>(
    object: I
  ): GripperCommand_Request {
    const message = createBaseGripperCommand_Request();
    message.clawGripperCommand =
      object.clawGripperCommand !== undefined &&
      object.clawGripperCommand !== null
        ? ClawGripperCommand_Request.fromPartial(object.clawGripperCommand)
        : undefined;
    return message;
  },
};

function createBaseGripperCommand_Feedback(): GripperCommand_Feedback {
  return { clawGripperFeedback: undefined, status: 0 };
}

export const GripperCommand_Feedback = {
  encode(
    message: GripperCommand_Feedback,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.clawGripperFeedback !== undefined) {
      ClawGripperCommand_Feedback.encode(
        message.clawGripperFeedback,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GripperCommand_Feedback {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGripperCommand_Feedback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clawGripperFeedback = ClawGripperCommand_Feedback.decode(
            reader,
            reader.uint32()
          );
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

  fromJSON(object: any): GripperCommand_Feedback {
    return {
      clawGripperFeedback: isSet(object.clawGripperFeedback)
        ? ClawGripperCommand_Feedback.fromJSON(object.clawGripperFeedback)
        : undefined,
      status: isSet(object.status)
        ? robotCommandFeedbackStatus_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: GripperCommand_Feedback): unknown {
    const obj: any = {};
    message.clawGripperFeedback !== undefined &&
      (obj.clawGripperFeedback = message.clawGripperFeedback
        ? ClawGripperCommand_Feedback.toJSON(message.clawGripperFeedback)
        : undefined);
    message.status !== undefined &&
      (obj.status = robotCommandFeedbackStatus_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GripperCommand_Feedback>, I>>(
    object: I
  ): GripperCommand_Feedback {
    const message = createBaseGripperCommand_Feedback();
    message.clawGripperFeedback =
      object.clawGripperFeedback !== undefined &&
      object.clawGripperFeedback !== null
        ? ClawGripperCommand_Feedback.fromPartial(object.clawGripperFeedback)
        : undefined;
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseClawGripperCommand(): ClawGripperCommand {
  return {};
}

export const ClawGripperCommand = {
  encode(
    _: ClawGripperCommand,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClawGripperCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClawGripperCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): ClawGripperCommand {
    return {};
  },

  toJSON(_: ClawGripperCommand): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ClawGripperCommand>, I>>(
    _: I
  ): ClawGripperCommand {
    const message = createBaseClawGripperCommand();
    return message;
  },
};

function createBaseClawGripperCommand_Request(): ClawGripperCommand_Request {
  return {
    trajectory: undefined,
    maximumOpenCloseVelocity: undefined,
    maximumOpenCloseAcceleration: undefined,
    maximumTorque: undefined,
    disableForceOnContact: false,
  };
}

export const ClawGripperCommand_Request = {
  encode(
    message: ClawGripperCommand_Request,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.trajectory !== undefined) {
      ScalarTrajectory.encode(
        message.trajectory,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.maximumOpenCloseVelocity !== undefined) {
      DoubleValue.encode(
        { value: message.maximumOpenCloseVelocity! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.maximumOpenCloseAcceleration !== undefined) {
      DoubleValue.encode(
        { value: message.maximumOpenCloseAcceleration! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.maximumTorque !== undefined) {
      DoubleValue.encode(
        { value: message.maximumTorque! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.disableForceOnContact === true) {
      writer.uint32(48).bool(message.disableForceOnContact);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ClawGripperCommand_Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClawGripperCommand_Request();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 5:
          message.trajectory = ScalarTrajectory.decode(reader, reader.uint32());
          break;
        case 2:
          message.maximumOpenCloseVelocity = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 3:
          message.maximumOpenCloseAcceleration = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 4:
          message.maximumTorque = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 6:
          message.disableForceOnContact = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClawGripperCommand_Request {
    return {
      trajectory: isSet(object.trajectory)
        ? ScalarTrajectory.fromJSON(object.trajectory)
        : undefined,
      maximumOpenCloseVelocity: isSet(object.maximumOpenCloseVelocity)
        ? Number(object.maximumOpenCloseVelocity)
        : undefined,
      maximumOpenCloseAcceleration: isSet(object.maximumOpenCloseAcceleration)
        ? Number(object.maximumOpenCloseAcceleration)
        : undefined,
      maximumTorque: isSet(object.maximumTorque)
        ? Number(object.maximumTorque)
        : undefined,
      disableForceOnContact: isSet(object.disableForceOnContact)
        ? Boolean(object.disableForceOnContact)
        : false,
    };
  },

  toJSON(message: ClawGripperCommand_Request): unknown {
    const obj: any = {};
    message.trajectory !== undefined &&
      (obj.trajectory = message.trajectory
        ? ScalarTrajectory.toJSON(message.trajectory)
        : undefined);
    message.maximumOpenCloseVelocity !== undefined &&
      (obj.maximumOpenCloseVelocity = message.maximumOpenCloseVelocity);
    message.maximumOpenCloseAcceleration !== undefined &&
      (obj.maximumOpenCloseAcceleration = message.maximumOpenCloseAcceleration);
    message.maximumTorque !== undefined &&
      (obj.maximumTorque = message.maximumTorque);
    message.disableForceOnContact !== undefined &&
      (obj.disableForceOnContact = message.disableForceOnContact);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ClawGripperCommand_Request>, I>>(
    object: I
  ): ClawGripperCommand_Request {
    const message = createBaseClawGripperCommand_Request();
    message.trajectory =
      object.trajectory !== undefined && object.trajectory !== null
        ? ScalarTrajectory.fromPartial(object.trajectory)
        : undefined;
    message.maximumOpenCloseVelocity =
      object.maximumOpenCloseVelocity ?? undefined;
    message.maximumOpenCloseAcceleration =
      object.maximumOpenCloseAcceleration ?? undefined;
    message.maximumTorque = object.maximumTorque ?? undefined;
    message.disableForceOnContact = object.disableForceOnContact ?? false;
    return message;
  },
};

function createBaseClawGripperCommand_Feedback(): ClawGripperCommand_Feedback {
  return { status: 0 };
}

export const ClawGripperCommand_Feedback = {
  encode(
    message: ClawGripperCommand_Feedback,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ClawGripperCommand_Feedback {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClawGripperCommand_Feedback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClawGripperCommand_Feedback {
    return {
      status: isSet(object.status)
        ? clawGripperCommand_Feedback_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: ClawGripperCommand_Feedback): unknown {
    const obj: any = {};
    message.status !== undefined &&
      (obj.status = clawGripperCommand_Feedback_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ClawGripperCommand_Feedback>, I>>(
    object: I
  ): ClawGripperCommand_Feedback {
    const message = createBaseClawGripperCommand_Feedback();
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
