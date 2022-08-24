/* eslint-disable */
import {
  RobotCommandFeedbackStatus_Status,
  robotCommandFeedbackStatus_StatusFromJSON,
  robotCommandFeedbackStatus_StatusToJSON,
} from "../basic_command";
import { RequestHeader, ResponseHeader } from "../header";
import { Lease, LeaseUseResult } from "../lease";
import { Vec3 } from "../geometry";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api.spot";

/** A door command for the robot to execute plus a lease. */
export interface OpenDoorCommandRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** The Lease to show ownership of the robot. */
  lease: Lease | undefined;
  /** The command to execute. */
  doorCommand: DoorCommand_Request | undefined;
}

/** Response to the door command request. */
export interface OpenDoorCommandResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Details about how the lease was used. */
  leaseUseResult: LeaseUseResult | undefined;
  /** Return status for a request. */
  status: OpenDoorCommandResponse_Status;
  /** Human-readable error description.  Not for programmatic analysis. */
  message: string;
  /** Unique identifier for the command, If empty, command was not accepted. */
  doorCommandId: number;
}

export enum OpenDoorCommandResponse_Status {
  /** STATUS_UNKNOWN - An unknown / unexpected error occurred. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Request was accepted. */
  STATUS_OK = 1,
  /** STATUS_ROBOT_COMMAND_ERROR - Error sending command to RobotCommandService. */
  STATUS_ROBOT_COMMAND_ERROR = 2,
  UNRECOGNIZED = -1,
}

export function openDoorCommandResponse_StatusFromJSON(
  object: any
): OpenDoorCommandResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return OpenDoorCommandResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return OpenDoorCommandResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_ROBOT_COMMAND_ERROR":
      return OpenDoorCommandResponse_Status.STATUS_ROBOT_COMMAND_ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return OpenDoorCommandResponse_Status.UNRECOGNIZED;
  }
}

export function openDoorCommandResponse_StatusToJSON(
  object: OpenDoorCommandResponse_Status
): string {
  switch (object) {
    case OpenDoorCommandResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case OpenDoorCommandResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case OpenDoorCommandResponse_Status.STATUS_ROBOT_COMMAND_ERROR:
      return "STATUS_ROBOT_COMMAND_ERROR";
    case OpenDoorCommandResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** A request for feedback of a specific door command. */
export interface OpenDoorFeedbackRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Unique identifier for the command, provided by OpenDoorResponse. */
  doorCommandId: number;
}

/** Feedback for a specific door command. This RPC reports the robot's progress opening a door. */
export interface OpenDoorFeedbackResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Generic robot command feedback. */
  status: RobotCommandFeedbackStatus_Status;
  /** Specific door full body command feedback. */
  feedback: DoorCommand_Feedback | undefined;
}

/** Door Command specific request and Feedback. */
export interface DoorCommand {}

/**
 * Specify if the hinge is on the left or right side of the door, when looking at the door,
 * relative to the door handle.
 */
export enum DoorCommand_HingeSide {
  HINGE_SIDE_UNKNOWN = 0,
  HINGE_SIDE_LEFT = 1,
  HINGE_SIDE_RIGHT = 2,
  UNRECOGNIZED = -1,
}

export function doorCommand_HingeSideFromJSON(
  object: any
): DoorCommand_HingeSide {
  switch (object) {
    case 0:
    case "HINGE_SIDE_UNKNOWN":
      return DoorCommand_HingeSide.HINGE_SIDE_UNKNOWN;
    case 1:
    case "HINGE_SIDE_LEFT":
      return DoorCommand_HingeSide.HINGE_SIDE_LEFT;
    case 2:
    case "HINGE_SIDE_RIGHT":
      return DoorCommand_HingeSide.HINGE_SIDE_RIGHT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DoorCommand_HingeSide.UNRECOGNIZED;
  }
}

export function doorCommand_HingeSideToJSON(
  object: DoorCommand_HingeSide
): string {
  switch (object) {
    case DoorCommand_HingeSide.HINGE_SIDE_UNKNOWN:
      return "HINGE_SIDE_UNKNOWN";
    case DoorCommand_HingeSide.HINGE_SIDE_LEFT:
      return "HINGE_SIDE_LEFT";
    case DoorCommand_HingeSide.HINGE_SIDE_RIGHT:
      return "HINGE_SIDE_RIGHT";
    case DoorCommand_HingeSide.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Specify if the door is push or pull, when looking at the door. */
export enum DoorCommand_SwingDirection {
  SWING_DIRECTION_UNKNOWN = 0,
  /** @deprecated */
  SWING_DIRECTION_INSWING = 1,
  SWING_DIRECTION_PULL = 1,
  /** @deprecated */
  SWING_DIRECTION_OUTSWING = 2,
  SWING_DIRECTION_PUSH = 2,
  UNRECOGNIZED = -1,
}

export function doorCommand_SwingDirectionFromJSON(
  object: any
): DoorCommand_SwingDirection {
  switch (object) {
    case 0:
    case "SWING_DIRECTION_UNKNOWN":
      return DoorCommand_SwingDirection.SWING_DIRECTION_UNKNOWN;
    case 1:
    case "SWING_DIRECTION_INSWING":
      return DoorCommand_SwingDirection.SWING_DIRECTION_INSWING;
    case 1:
    case "SWING_DIRECTION_PULL":
      return DoorCommand_SwingDirection.SWING_DIRECTION_PULL;
    case 2:
    case "SWING_DIRECTION_OUTSWING":
      return DoorCommand_SwingDirection.SWING_DIRECTION_OUTSWING;
    case 2:
    case "SWING_DIRECTION_PUSH":
      return DoorCommand_SwingDirection.SWING_DIRECTION_PUSH;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DoorCommand_SwingDirection.UNRECOGNIZED;
  }
}

export function doorCommand_SwingDirectionToJSON(
  object: DoorCommand_SwingDirection
): string {
  switch (object) {
    case DoorCommand_SwingDirection.SWING_DIRECTION_UNKNOWN:
      return "SWING_DIRECTION_UNKNOWN";
    case DoorCommand_SwingDirection.SWING_DIRECTION_INSWING:
      return "SWING_DIRECTION_INSWING";
    case DoorCommand_SwingDirection.SWING_DIRECTION_PULL:
      return "SWING_DIRECTION_PULL";
    case DoorCommand_SwingDirection.SWING_DIRECTION_OUTSWING:
      return "SWING_DIRECTION_OUTSWING";
    case DoorCommand_SwingDirection.SWING_DIRECTION_PUSH:
      return "SWING_DIRECTION_PUSH";
    case DoorCommand_SwingDirection.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Specify type of door handle. */
export enum DoorCommand_HandleType {
  HANDLE_TYPE_UNKNOWN = 0,
  HANDLE_TYPE_LEVER = 1,
  HANDLE_TYPE_KNOB = 2,
  HANDLE_TYPE_FIXED_GRASP = 3,
  UNRECOGNIZED = -1,
}

export function doorCommand_HandleTypeFromJSON(
  object: any
): DoorCommand_HandleType {
  switch (object) {
    case 0:
    case "HANDLE_TYPE_UNKNOWN":
      return DoorCommand_HandleType.HANDLE_TYPE_UNKNOWN;
    case 1:
    case "HANDLE_TYPE_LEVER":
      return DoorCommand_HandleType.HANDLE_TYPE_LEVER;
    case 2:
    case "HANDLE_TYPE_KNOB":
      return DoorCommand_HandleType.HANDLE_TYPE_KNOB;
    case 3:
    case "HANDLE_TYPE_FIXED_GRASP":
      return DoorCommand_HandleType.HANDLE_TYPE_FIXED_GRASP;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DoorCommand_HandleType.UNRECOGNIZED;
  }
}

export function doorCommand_HandleTypeToJSON(
  object: DoorCommand_HandleType
): string {
  switch (object) {
    case DoorCommand_HandleType.HANDLE_TYPE_UNKNOWN:
      return "HANDLE_TYPE_UNKNOWN";
    case DoorCommand_HandleType.HANDLE_TYPE_LEVER:
      return "HANDLE_TYPE_LEVER";
    case DoorCommand_HandleType.HANDLE_TYPE_KNOB:
      return "HANDLE_TYPE_KNOB";
    case DoorCommand_HandleType.HANDLE_TYPE_FIXED_GRASP:
      return "HANDLE_TYPE_FIXED_GRASP";
    case DoorCommand_HandleType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * The robot searches along a ray for the door handle and automatically grasp it before
 * executing door opening.
 */
export interface DoorCommand_AutoGraspCommand {
  /** The name of the frame that the following fields are expressed in. */
  frameName: string;
  /** The start of the ray the robot searches along for the door handle. */
  searchRayStartInFrame: Vec3 | undefined;
  /** The end of the ray the robot searches along for the door handle. */
  searchRayEndInFrame: Vec3 | undefined;
  /** The side of the hinge with respect to the robot when facing the door. */
  hingeSide: DoorCommand_HingeSide;
  /** The direction the door moves with respect to the robot. */
  swingDirection: DoorCommand_SwingDirection;
}

/**
 * The robot is already grasping the door handle and will continue opening the door based on
 * user specified params.
 */
export interface DoorCommand_WarmstartCommand {
  /** The side of the hinge with respect to the robot when facing the door. */
  hingeSide: DoorCommand_HingeSide;
  /** The direction the door moves with respect to the robot. */
  swingDirection: DoorCommand_SwingDirection;
  /** The type of handle on the door. */
  handleType: DoorCommand_HandleType;
}

/**
 * Open doors that do not require a grasp, just a push. This could be a door with no latching
 * mechanism that just requires a push, or a door with a pushbar.
 * The robot will automatically push the door open and walk through.
 */
export interface DoorCommand_AutoPushCommand {
  /** The name of the frame that the following fields are expressed in. */
  frameName: string;
  /** The point that the robot will push on. */
  pushPointInFrame: Vec3 | undefined;
  /** The side of the hinge with respect to the robot when facing the door. */
  hingeSide: DoorCommand_HingeSide;
}

export interface DoorCommand_Request {
  autoGraspCommand: DoorCommand_AutoGraspCommand | undefined;
  warmstartCommand: DoorCommand_WarmstartCommand | undefined;
  autoPushCommand: DoorCommand_AutoPushCommand | undefined;
}

export interface DoorCommand_Feedback {
  /** Current status of the command. */
  status: DoorCommand_Feedback_Status;
}

export enum DoorCommand_Feedback_Status {
  /** STATUS_UNKNOWN - STATUS_UNKNOWN should never be used. If used, an internal error has happened. */
  STATUS_UNKNOWN = 0,
  /** STATUS_COMPLETED - Robot has finished opening the door. */
  STATUS_COMPLETED = 1,
  /** STATUS_IN_PROGRESS - Robot is attempting to open the door. */
  STATUS_IN_PROGRESS = 2,
  UNRECOGNIZED = -1,
}

export function doorCommand_Feedback_StatusFromJSON(
  object: any
): DoorCommand_Feedback_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return DoorCommand_Feedback_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_COMPLETED":
      return DoorCommand_Feedback_Status.STATUS_COMPLETED;
    case 2:
    case "STATUS_IN_PROGRESS":
      return DoorCommand_Feedback_Status.STATUS_IN_PROGRESS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DoorCommand_Feedback_Status.UNRECOGNIZED;
  }
}

export function doorCommand_Feedback_StatusToJSON(
  object: DoorCommand_Feedback_Status
): string {
  switch (object) {
    case DoorCommand_Feedback_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case DoorCommand_Feedback_Status.STATUS_COMPLETED:
      return "STATUS_COMPLETED";
    case DoorCommand_Feedback_Status.STATUS_IN_PROGRESS:
      return "STATUS_IN_PROGRESS";
    case DoorCommand_Feedback_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseOpenDoorCommandRequest(): OpenDoorCommandRequest {
  return { header: undefined, lease: undefined, doorCommand: undefined };
}

export const OpenDoorCommandRequest = {
  encode(
    message: OpenDoorCommandRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.lease !== undefined) {
      Lease.encode(message.lease, writer.uint32(18).fork()).ldelim();
    }
    if (message.doorCommand !== undefined) {
      DoorCommand_Request.encode(
        message.doorCommand,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): OpenDoorCommandRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOpenDoorCommandRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.lease = Lease.decode(reader, reader.uint32());
          break;
        case 4:
          message.doorCommand = DoorCommand_Request.decode(
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

  fromJSON(object: any): OpenDoorCommandRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      lease: isSet(object.lease) ? Lease.fromJSON(object.lease) : undefined,
      doorCommand: isSet(object.doorCommand)
        ? DoorCommand_Request.fromJSON(object.doorCommand)
        : undefined,
    };
  },

  toJSON(message: OpenDoorCommandRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.lease !== undefined &&
      (obj.lease = message.lease ? Lease.toJSON(message.lease) : undefined);
    message.doorCommand !== undefined &&
      (obj.doorCommand = message.doorCommand
        ? DoorCommand_Request.toJSON(message.doorCommand)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<OpenDoorCommandRequest>, I>>(
    object: I
  ): OpenDoorCommandRequest {
    const message = createBaseOpenDoorCommandRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.lease =
      object.lease !== undefined && object.lease !== null
        ? Lease.fromPartial(object.lease)
        : undefined;
    message.doorCommand =
      object.doorCommand !== undefined && object.doorCommand !== null
        ? DoorCommand_Request.fromPartial(object.doorCommand)
        : undefined;
    return message;
  },
};

function createBaseOpenDoorCommandResponse(): OpenDoorCommandResponse {
  return {
    header: undefined,
    leaseUseResult: undefined,
    status: 0,
    message: "",
    doorCommandId: 0,
  };
}

export const OpenDoorCommandResponse = {
  encode(
    message: OpenDoorCommandResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.leaseUseResult !== undefined) {
      LeaseUseResult.encode(
        message.leaseUseResult,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(24).int32(message.status);
    }
    if (message.message !== "") {
      writer.uint32(34).string(message.message);
    }
    if (message.doorCommandId !== 0) {
      writer.uint32(40).uint32(message.doorCommandId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): OpenDoorCommandResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOpenDoorCommandResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.leaseUseResult = LeaseUseResult.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.status = reader.int32() as any;
          break;
        case 4:
          message.message = reader.string();
          break;
        case 5:
          message.doorCommandId = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): OpenDoorCommandResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      leaseUseResult: isSet(object.leaseUseResult)
        ? LeaseUseResult.fromJSON(object.leaseUseResult)
        : undefined,
      status: isSet(object.status)
        ? openDoorCommandResponse_StatusFromJSON(object.status)
        : 0,
      message: isSet(object.message) ? String(object.message) : "",
      doorCommandId: isSet(object.doorCommandId)
        ? Number(object.doorCommandId)
        : 0,
    };
  },

  toJSON(message: OpenDoorCommandResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.leaseUseResult !== undefined &&
      (obj.leaseUseResult = message.leaseUseResult
        ? LeaseUseResult.toJSON(message.leaseUseResult)
        : undefined);
    message.status !== undefined &&
      (obj.status = openDoorCommandResponse_StatusToJSON(message.status));
    message.message !== undefined && (obj.message = message.message);
    message.doorCommandId !== undefined &&
      (obj.doorCommandId = Math.round(message.doorCommandId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<OpenDoorCommandResponse>, I>>(
    object: I
  ): OpenDoorCommandResponse {
    const message = createBaseOpenDoorCommandResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.leaseUseResult =
      object.leaseUseResult !== undefined && object.leaseUseResult !== null
        ? LeaseUseResult.fromPartial(object.leaseUseResult)
        : undefined;
    message.status = object.status ?? 0;
    message.message = object.message ?? "";
    message.doorCommandId = object.doorCommandId ?? 0;
    return message;
  },
};

function createBaseOpenDoorFeedbackRequest(): OpenDoorFeedbackRequest {
  return { header: undefined, doorCommandId: 0 };
}

export const OpenDoorFeedbackRequest = {
  encode(
    message: OpenDoorFeedbackRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.doorCommandId !== 0) {
      writer.uint32(16).uint32(message.doorCommandId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): OpenDoorFeedbackRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOpenDoorFeedbackRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.doorCommandId = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): OpenDoorFeedbackRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      doorCommandId: isSet(object.doorCommandId)
        ? Number(object.doorCommandId)
        : 0,
    };
  },

  toJSON(message: OpenDoorFeedbackRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.doorCommandId !== undefined &&
      (obj.doorCommandId = Math.round(message.doorCommandId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<OpenDoorFeedbackRequest>, I>>(
    object: I
  ): OpenDoorFeedbackRequest {
    const message = createBaseOpenDoorFeedbackRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.doorCommandId = object.doorCommandId ?? 0;
    return message;
  },
};

function createBaseOpenDoorFeedbackResponse(): OpenDoorFeedbackResponse {
  return { header: undefined, status: 0, feedback: undefined };
}

export const OpenDoorFeedbackResponse = {
  encode(
    message: OpenDoorFeedbackResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(800).int32(message.status);
    }
    if (message.feedback !== undefined) {
      DoorCommand_Feedback.encode(
        message.feedback,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): OpenDoorFeedbackResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOpenDoorFeedbackResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 100:
          message.status = reader.int32() as any;
          break;
        case 2:
          message.feedback = DoorCommand_Feedback.decode(
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

  fromJSON(object: any): OpenDoorFeedbackResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? robotCommandFeedbackStatus_StatusFromJSON(object.status)
        : 0,
      feedback: isSet(object.feedback)
        ? DoorCommand_Feedback.fromJSON(object.feedback)
        : undefined,
    };
  },

  toJSON(message: OpenDoorFeedbackResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = robotCommandFeedbackStatus_StatusToJSON(message.status));
    message.feedback !== undefined &&
      (obj.feedback = message.feedback
        ? DoorCommand_Feedback.toJSON(message.feedback)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<OpenDoorFeedbackResponse>, I>>(
    object: I
  ): OpenDoorFeedbackResponse {
    const message = createBaseOpenDoorFeedbackResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    message.feedback =
      object.feedback !== undefined && object.feedback !== null
        ? DoorCommand_Feedback.fromPartial(object.feedback)
        : undefined;
    return message;
  },
};

function createBaseDoorCommand(): DoorCommand {
  return {};
}

export const DoorCommand = {
  encode(_: DoorCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DoorCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDoorCommand();
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

  fromJSON(_: any): DoorCommand {
    return {};
  },

  toJSON(_: DoorCommand): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DoorCommand>, I>>(_: I): DoorCommand {
    const message = createBaseDoorCommand();
    return message;
  },
};

function createBaseDoorCommand_AutoGraspCommand(): DoorCommand_AutoGraspCommand {
  return {
    frameName: "",
    searchRayStartInFrame: undefined,
    searchRayEndInFrame: undefined,
    hingeSide: 0,
    swingDirection: 0,
  };
}

export const DoorCommand_AutoGraspCommand = {
  encode(
    message: DoorCommand_AutoGraspCommand,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.frameName !== "") {
      writer.uint32(10).string(message.frameName);
    }
    if (message.searchRayStartInFrame !== undefined) {
      Vec3.encode(
        message.searchRayStartInFrame,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.searchRayEndInFrame !== undefined) {
      Vec3.encode(
        message.searchRayEndInFrame,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.hingeSide !== 0) {
      writer.uint32(32).int32(message.hingeSide);
    }
    if (message.swingDirection !== 0) {
      writer.uint32(40).int32(message.swingDirection);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DoorCommand_AutoGraspCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDoorCommand_AutoGraspCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.frameName = reader.string();
          break;
        case 2:
          message.searchRayStartInFrame = Vec3.decode(reader, reader.uint32());
          break;
        case 3:
          message.searchRayEndInFrame = Vec3.decode(reader, reader.uint32());
          break;
        case 4:
          message.hingeSide = reader.int32() as any;
          break;
        case 5:
          message.swingDirection = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DoorCommand_AutoGraspCommand {
    return {
      frameName: isSet(object.frameName) ? String(object.frameName) : "",
      searchRayStartInFrame: isSet(object.searchRayStartInFrame)
        ? Vec3.fromJSON(object.searchRayStartInFrame)
        : undefined,
      searchRayEndInFrame: isSet(object.searchRayEndInFrame)
        ? Vec3.fromJSON(object.searchRayEndInFrame)
        : undefined,
      hingeSide: isSet(object.hingeSide)
        ? doorCommand_HingeSideFromJSON(object.hingeSide)
        : 0,
      swingDirection: isSet(object.swingDirection)
        ? doorCommand_SwingDirectionFromJSON(object.swingDirection)
        : 0,
    };
  },

  toJSON(message: DoorCommand_AutoGraspCommand): unknown {
    const obj: any = {};
    message.frameName !== undefined && (obj.frameName = message.frameName);
    message.searchRayStartInFrame !== undefined &&
      (obj.searchRayStartInFrame = message.searchRayStartInFrame
        ? Vec3.toJSON(message.searchRayStartInFrame)
        : undefined);
    message.searchRayEndInFrame !== undefined &&
      (obj.searchRayEndInFrame = message.searchRayEndInFrame
        ? Vec3.toJSON(message.searchRayEndInFrame)
        : undefined);
    message.hingeSide !== undefined &&
      (obj.hingeSide = doorCommand_HingeSideToJSON(message.hingeSide));
    message.swingDirection !== undefined &&
      (obj.swingDirection = doorCommand_SwingDirectionToJSON(
        message.swingDirection
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DoorCommand_AutoGraspCommand>, I>>(
    object: I
  ): DoorCommand_AutoGraspCommand {
    const message = createBaseDoorCommand_AutoGraspCommand();
    message.frameName = object.frameName ?? "";
    message.searchRayStartInFrame =
      object.searchRayStartInFrame !== undefined &&
      object.searchRayStartInFrame !== null
        ? Vec3.fromPartial(object.searchRayStartInFrame)
        : undefined;
    message.searchRayEndInFrame =
      object.searchRayEndInFrame !== undefined &&
      object.searchRayEndInFrame !== null
        ? Vec3.fromPartial(object.searchRayEndInFrame)
        : undefined;
    message.hingeSide = object.hingeSide ?? 0;
    message.swingDirection = object.swingDirection ?? 0;
    return message;
  },
};

function createBaseDoorCommand_WarmstartCommand(): DoorCommand_WarmstartCommand {
  return { hingeSide: 0, swingDirection: 0, handleType: 0 };
}

export const DoorCommand_WarmstartCommand = {
  encode(
    message: DoorCommand_WarmstartCommand,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.hingeSide !== 0) {
      writer.uint32(8).int32(message.hingeSide);
    }
    if (message.swingDirection !== 0) {
      writer.uint32(16).int32(message.swingDirection);
    }
    if (message.handleType !== 0) {
      writer.uint32(24).int32(message.handleType);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DoorCommand_WarmstartCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDoorCommand_WarmstartCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hingeSide = reader.int32() as any;
          break;
        case 2:
          message.swingDirection = reader.int32() as any;
          break;
        case 3:
          message.handleType = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DoorCommand_WarmstartCommand {
    return {
      hingeSide: isSet(object.hingeSide)
        ? doorCommand_HingeSideFromJSON(object.hingeSide)
        : 0,
      swingDirection: isSet(object.swingDirection)
        ? doorCommand_SwingDirectionFromJSON(object.swingDirection)
        : 0,
      handleType: isSet(object.handleType)
        ? doorCommand_HandleTypeFromJSON(object.handleType)
        : 0,
    };
  },

  toJSON(message: DoorCommand_WarmstartCommand): unknown {
    const obj: any = {};
    message.hingeSide !== undefined &&
      (obj.hingeSide = doorCommand_HingeSideToJSON(message.hingeSide));
    message.swingDirection !== undefined &&
      (obj.swingDirection = doorCommand_SwingDirectionToJSON(
        message.swingDirection
      ));
    message.handleType !== undefined &&
      (obj.handleType = doorCommand_HandleTypeToJSON(message.handleType));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DoorCommand_WarmstartCommand>, I>>(
    object: I
  ): DoorCommand_WarmstartCommand {
    const message = createBaseDoorCommand_WarmstartCommand();
    message.hingeSide = object.hingeSide ?? 0;
    message.swingDirection = object.swingDirection ?? 0;
    message.handleType = object.handleType ?? 0;
    return message;
  },
};

function createBaseDoorCommand_AutoPushCommand(): DoorCommand_AutoPushCommand {
  return { frameName: "", pushPointInFrame: undefined, hingeSide: 0 };
}

export const DoorCommand_AutoPushCommand = {
  encode(
    message: DoorCommand_AutoPushCommand,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.frameName !== "") {
      writer.uint32(10).string(message.frameName);
    }
    if (message.pushPointInFrame !== undefined) {
      Vec3.encode(message.pushPointInFrame, writer.uint32(18).fork()).ldelim();
    }
    if (message.hingeSide !== 0) {
      writer.uint32(24).int32(message.hingeSide);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DoorCommand_AutoPushCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDoorCommand_AutoPushCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.frameName = reader.string();
          break;
        case 2:
          message.pushPointInFrame = Vec3.decode(reader, reader.uint32());
          break;
        case 3:
          message.hingeSide = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DoorCommand_AutoPushCommand {
    return {
      frameName: isSet(object.frameName) ? String(object.frameName) : "",
      pushPointInFrame: isSet(object.pushPointInFrame)
        ? Vec3.fromJSON(object.pushPointInFrame)
        : undefined,
      hingeSide: isSet(object.hingeSide)
        ? doorCommand_HingeSideFromJSON(object.hingeSide)
        : 0,
    };
  },

  toJSON(message: DoorCommand_AutoPushCommand): unknown {
    const obj: any = {};
    message.frameName !== undefined && (obj.frameName = message.frameName);
    message.pushPointInFrame !== undefined &&
      (obj.pushPointInFrame = message.pushPointInFrame
        ? Vec3.toJSON(message.pushPointInFrame)
        : undefined);
    message.hingeSide !== undefined &&
      (obj.hingeSide = doorCommand_HingeSideToJSON(message.hingeSide));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DoorCommand_AutoPushCommand>, I>>(
    object: I
  ): DoorCommand_AutoPushCommand {
    const message = createBaseDoorCommand_AutoPushCommand();
    message.frameName = object.frameName ?? "";
    message.pushPointInFrame =
      object.pushPointInFrame !== undefined && object.pushPointInFrame !== null
        ? Vec3.fromPartial(object.pushPointInFrame)
        : undefined;
    message.hingeSide = object.hingeSide ?? 0;
    return message;
  },
};

function createBaseDoorCommand_Request(): DoorCommand_Request {
  return {
    autoGraspCommand: undefined,
    warmstartCommand: undefined,
    autoPushCommand: undefined,
  };
}

export const DoorCommand_Request = {
  encode(
    message: DoorCommand_Request,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.autoGraspCommand !== undefined) {
      DoorCommand_AutoGraspCommand.encode(
        message.autoGraspCommand,
        writer.uint32(82).fork()
      ).ldelim();
    }
    if (message.warmstartCommand !== undefined) {
      DoorCommand_WarmstartCommand.encode(
        message.warmstartCommand,
        writer.uint32(90).fork()
      ).ldelim();
    }
    if (message.autoPushCommand !== undefined) {
      DoorCommand_AutoPushCommand.encode(
        message.autoPushCommand,
        writer.uint32(98).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DoorCommand_Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDoorCommand_Request();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 10:
          message.autoGraspCommand = DoorCommand_AutoGraspCommand.decode(
            reader,
            reader.uint32()
          );
          break;
        case 11:
          message.warmstartCommand = DoorCommand_WarmstartCommand.decode(
            reader,
            reader.uint32()
          );
          break;
        case 12:
          message.autoPushCommand = DoorCommand_AutoPushCommand.decode(
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

  fromJSON(object: any): DoorCommand_Request {
    return {
      autoGraspCommand: isSet(object.autoGraspCommand)
        ? DoorCommand_AutoGraspCommand.fromJSON(object.autoGraspCommand)
        : undefined,
      warmstartCommand: isSet(object.warmstartCommand)
        ? DoorCommand_WarmstartCommand.fromJSON(object.warmstartCommand)
        : undefined,
      autoPushCommand: isSet(object.autoPushCommand)
        ? DoorCommand_AutoPushCommand.fromJSON(object.autoPushCommand)
        : undefined,
    };
  },

  toJSON(message: DoorCommand_Request): unknown {
    const obj: any = {};
    message.autoGraspCommand !== undefined &&
      (obj.autoGraspCommand = message.autoGraspCommand
        ? DoorCommand_AutoGraspCommand.toJSON(message.autoGraspCommand)
        : undefined);
    message.warmstartCommand !== undefined &&
      (obj.warmstartCommand = message.warmstartCommand
        ? DoorCommand_WarmstartCommand.toJSON(message.warmstartCommand)
        : undefined);
    message.autoPushCommand !== undefined &&
      (obj.autoPushCommand = message.autoPushCommand
        ? DoorCommand_AutoPushCommand.toJSON(message.autoPushCommand)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DoorCommand_Request>, I>>(
    object: I
  ): DoorCommand_Request {
    const message = createBaseDoorCommand_Request();
    message.autoGraspCommand =
      object.autoGraspCommand !== undefined && object.autoGraspCommand !== null
        ? DoorCommand_AutoGraspCommand.fromPartial(object.autoGraspCommand)
        : undefined;
    message.warmstartCommand =
      object.warmstartCommand !== undefined && object.warmstartCommand !== null
        ? DoorCommand_WarmstartCommand.fromPartial(object.warmstartCommand)
        : undefined;
    message.autoPushCommand =
      object.autoPushCommand !== undefined && object.autoPushCommand !== null
        ? DoorCommand_AutoPushCommand.fromPartial(object.autoPushCommand)
        : undefined;
    return message;
  },
};

function createBaseDoorCommand_Feedback(): DoorCommand_Feedback {
  return { status: 0 };
}

export const DoorCommand_Feedback = {
  encode(
    message: DoorCommand_Feedback,
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
  ): DoorCommand_Feedback {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDoorCommand_Feedback();
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

  fromJSON(object: any): DoorCommand_Feedback {
    return {
      status: isSet(object.status)
        ? doorCommand_Feedback_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: DoorCommand_Feedback): unknown {
    const obj: any = {};
    message.status !== undefined &&
      (obj.status = doorCommand_Feedback_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DoorCommand_Feedback>, I>>(
    object: I
  ): DoorCommand_Feedback {
    const message = createBaseDoorCommand_Feedback();
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
