/* eslint-disable */
import {
  FullBodyCommand_Request,
  FullBodyCommand_Feedback,
} from "./full_body_command";
import {
  SynchronizedCommand_Request,
  SynchronizedCommand_Feedback,
} from "./synchronized_command";
import {
  MobilityCommand_Request,
  MobilityCommand_Feedback,
} from "./mobility_command";
import { RequestHeader, ResponseHeader } from "./header";
import { Lease, LeaseUseResult } from "./lease";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/**
 * A command for a robot to execute.
 * The server decides if a set of commands is valid for a given robot and configuration.
 */
export interface RobotCommand {
  /** Commands which require control of entire robot. */
  fullBodyCommand: FullBodyCommand_Request | undefined;
  /** A synchronized command, for partial or full control of robot. */
  synchronizedCommand: SynchronizedCommand_Request | undefined;
  /**
   * ** Deprecation Warning ***
   * DEPRECATED as of 2.1.0: A mobility command for a robot to execute.
   * The following fields will be deprecated and moved to 'reserved' in a future release.
   *
   * @deprecated
   */
  mobilityCommand: MobilityCommand_Request | undefined;
}

/**
 * Command specific feedback. Distance to goal, estimated time remaining, probability of
 * success, etc. Note that the feedback should directly mirror the command request.
 */
export interface RobotCommandFeedback {
  /** Commands which require control of entire robot. */
  fullBodyFeedback: FullBodyCommand_Feedback | undefined;
  /** A synchronized command, for partial or full control of robot. */
  synchronizedFeedback: SynchronizedCommand_Feedback | undefined;
  /**
   * ** Deprecation Warning ***
   * DEPRECATED as of 2.1.0: Command to control mobility system of a robot.
   * The following fields will be deprecated and moved to 'reserved' in a future release.
   *
   * @deprecated
   */
  mobilityFeedback: MobilityCommand_Feedback | undefined;
}

/**
 * A RobotCommand request message includes the lease and command as well as a clock
 * identifier to ensure timesync when issuing commands with a fixed length.
 */
export interface RobotCommandRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** The Lease to show ownership of the robot. */
  lease: Lease | undefined;
  /** A command for a robot to execute. A command can be comprised of several subcommands. */
  command: RobotCommand | undefined;
  /** Identifier provided by the time sync service to verify time sync between robot and client. */
  clockIdentifier: string;
}

/**
 * The RobotCommand response message contains a robot command id that can be used to poll the
 * robot command service for feedback on the state of the command.
 */
export interface RobotCommandResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Details about how the lease was used. */
  leaseUseResult: LeaseUseResult | undefined;
  /** Return status for a request. */
  status: RobotCommandResponse_Status;
  /** Human-readable error description.  Not for programmatic analysis. */
  message: string;
  /** Unique identifier for the command, If empty, command was not accepted. */
  robotCommandId: number;
}

export enum RobotCommandResponse_Status {
  /** STATUS_UNKNOWN - An unknown / unexpected error occurred. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Request was accepted. */
  STATUS_OK = 1,
  /** STATUS_INVALID_REQUEST - [Programming Error] Request was invalid / malformed in some way. */
  STATUS_INVALID_REQUEST = 2,
  /** STATUS_UNSUPPORTED - [Programming Error] The robot does not understand this command. */
  STATUS_UNSUPPORTED = 3,
  /** STATUS_NO_TIMESYNC - [Timesync Error] Client has not done timesync with robot. */
  STATUS_NO_TIMESYNC = 4,
  /** STATUS_EXPIRED - [Timesync Error] The command was received after its end_time had already passed. */
  STATUS_EXPIRED = 5,
  /** STATUS_TOO_DISTANT - [Timesync Error] The command end time was too far in the future. */
  STATUS_TOO_DISTANT = 6,
  /** STATUS_NOT_POWERED_ON - [Hardware Error] The robot must be powered on to accept a command. */
  STATUS_NOT_POWERED_ON = 7,
  /** STATUS_BEHAVIOR_FAULT - [Robot State Error] The robot must not have behavior faults. */
  STATUS_BEHAVIOR_FAULT = 9,
  /** STATUS_DOCKED - [Robot State Error] The robot cannot be docked for certain commands. */
  STATUS_DOCKED = 10,
  /** STATUS_UNKNOWN_FRAME - [Frame Error] The frame_name for a command was not a known frame. */
  STATUS_UNKNOWN_FRAME = 8,
  UNRECOGNIZED = -1,
}

export function robotCommandResponse_StatusFromJSON(
  object: any
): RobotCommandResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return RobotCommandResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return RobotCommandResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_INVALID_REQUEST":
      return RobotCommandResponse_Status.STATUS_INVALID_REQUEST;
    case 3:
    case "STATUS_UNSUPPORTED":
      return RobotCommandResponse_Status.STATUS_UNSUPPORTED;
    case 4:
    case "STATUS_NO_TIMESYNC":
      return RobotCommandResponse_Status.STATUS_NO_TIMESYNC;
    case 5:
    case "STATUS_EXPIRED":
      return RobotCommandResponse_Status.STATUS_EXPIRED;
    case 6:
    case "STATUS_TOO_DISTANT":
      return RobotCommandResponse_Status.STATUS_TOO_DISTANT;
    case 7:
    case "STATUS_NOT_POWERED_ON":
      return RobotCommandResponse_Status.STATUS_NOT_POWERED_ON;
    case 9:
    case "STATUS_BEHAVIOR_FAULT":
      return RobotCommandResponse_Status.STATUS_BEHAVIOR_FAULT;
    case 10:
    case "STATUS_DOCKED":
      return RobotCommandResponse_Status.STATUS_DOCKED;
    case 8:
    case "STATUS_UNKNOWN_FRAME":
      return RobotCommandResponse_Status.STATUS_UNKNOWN_FRAME;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RobotCommandResponse_Status.UNRECOGNIZED;
  }
}

export function robotCommandResponse_StatusToJSON(
  object: RobotCommandResponse_Status
): string {
  switch (object) {
    case RobotCommandResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case RobotCommandResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case RobotCommandResponse_Status.STATUS_INVALID_REQUEST:
      return "STATUS_INVALID_REQUEST";
    case RobotCommandResponse_Status.STATUS_UNSUPPORTED:
      return "STATUS_UNSUPPORTED";
    case RobotCommandResponse_Status.STATUS_NO_TIMESYNC:
      return "STATUS_NO_TIMESYNC";
    case RobotCommandResponse_Status.STATUS_EXPIRED:
      return "STATUS_EXPIRED";
    case RobotCommandResponse_Status.STATUS_TOO_DISTANT:
      return "STATUS_TOO_DISTANT";
    case RobotCommandResponse_Status.STATUS_NOT_POWERED_ON:
      return "STATUS_NOT_POWERED_ON";
    case RobotCommandResponse_Status.STATUS_BEHAVIOR_FAULT:
      return "STATUS_BEHAVIOR_FAULT";
    case RobotCommandResponse_Status.STATUS_DOCKED:
      return "STATUS_DOCKED";
    case RobotCommandResponse_Status.STATUS_UNKNOWN_FRAME:
      return "STATUS_UNKNOWN_FRAME";
    case RobotCommandResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * The RobotCommandFeedback request message, which can get the feedback for a specific
 * robot command id number.
 */
export interface RobotCommandFeedbackRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Unique identifier for the command, provided by StartRequest. */
  robotCommandId: number;
}

/** The RobotCommandFeedback response message, which contains the progress of the robot command. */
export interface RobotCommandFeedbackResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Details about how the lease was used. */
  leaseUseResult: LeaseUseResult | undefined;
  /**
   * DEPRECATED as of 2.1.0: General status whether or not command is still processing.
   *
   * @deprecated
   */
  status: RobotCommandFeedbackResponse_Status;
  /**
   * DEPRECATED as of 2.1.0: Human-readable status message.  Not for programmatic analysis.
   *
   * @deprecated
   */
  message: string;
  /** Command specific feedback. */
  feedback: RobotCommandFeedback | undefined;
}

export enum RobotCommandFeedbackResponse_Status {
  /** STATUS_UNKNOWN - Status enum is DEPRECATED as of 2.1.0. Behavior execution is in an unknown / unexpected state. */
  STATUS_UNKNOWN = 0,
  /** STATUS_PROCESSING - Status enum is DEPRECATED as of 2.1.0. The robot is actively working on the command */
  STATUS_PROCESSING = 1,
  /** STATUS_COMMAND_OVERRIDDEN - Status enum is DEPRECATED as of 2.1.0. The command was replaced by a new command */
  STATUS_COMMAND_OVERRIDDEN = 2,
  /** STATUS_COMMAND_TIMED_OUT - Status enum is DEPRECATED as of 2.1.0. The command expired */
  STATUS_COMMAND_TIMED_OUT = 3,
  /** STATUS_ROBOT_FROZEN - Status enum is DEPRECATED as of 2.1.0. The robot is in an unsafe state, and will only respond to known safe commands. */
  STATUS_ROBOT_FROZEN = 4,
  UNRECOGNIZED = -1,
}

export function robotCommandFeedbackResponse_StatusFromJSON(
  object: any
): RobotCommandFeedbackResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return RobotCommandFeedbackResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_PROCESSING":
      return RobotCommandFeedbackResponse_Status.STATUS_PROCESSING;
    case 2:
    case "STATUS_COMMAND_OVERRIDDEN":
      return RobotCommandFeedbackResponse_Status.STATUS_COMMAND_OVERRIDDEN;
    case 3:
    case "STATUS_COMMAND_TIMED_OUT":
      return RobotCommandFeedbackResponse_Status.STATUS_COMMAND_TIMED_OUT;
    case 4:
    case "STATUS_ROBOT_FROZEN":
      return RobotCommandFeedbackResponse_Status.STATUS_ROBOT_FROZEN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RobotCommandFeedbackResponse_Status.UNRECOGNIZED;
  }
}

export function robotCommandFeedbackResponse_StatusToJSON(
  object: RobotCommandFeedbackResponse_Status
): string {
  switch (object) {
    case RobotCommandFeedbackResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case RobotCommandFeedbackResponse_Status.STATUS_PROCESSING:
      return "STATUS_PROCESSING";
    case RobotCommandFeedbackResponse_Status.STATUS_COMMAND_OVERRIDDEN:
      return "STATUS_COMMAND_OVERRIDDEN";
    case RobotCommandFeedbackResponse_Status.STATUS_COMMAND_TIMED_OUT:
      return "STATUS_COMMAND_TIMED_OUT";
    case RobotCommandFeedbackResponse_Status.STATUS_ROBOT_FROZEN:
      return "STATUS_ROBOT_FROZEN";
    case RobotCommandFeedbackResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** A ClearBehaviorFault request message has the associated behavior fault id to be cleared. */
export interface ClearBehaviorFaultRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** The Lease to show ownership of the robot. */
  lease: Lease | undefined;
  /** Unique identifier for the error */
  behaviorFaultId: number;
}

/**
 * A ClearBehaviorFault response message has status indicating whether the service cleared
 * the fault or not.
 */
export interface ClearBehaviorFaultResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Details about how the lease was used. */
  leaseUseResult: LeaseUseResult | undefined;
  /** Return status for a request. */
  status: ClearBehaviorFaultResponse_Status;
}

export enum ClearBehaviorFaultResponse_Status {
  /** STATUS_UNKNOWN - An unknown / unexpected error occurred. */
  STATUS_UNKNOWN = 0,
  /** STATUS_CLEARED - The BehaviorFault has been cleared. */
  STATUS_CLEARED = 1,
  /** STATUS_NOT_CLEARED - The BehaviorFault could not be cleared. */
  STATUS_NOT_CLEARED = 2,
  UNRECOGNIZED = -1,
}

export function clearBehaviorFaultResponse_StatusFromJSON(
  object: any
): ClearBehaviorFaultResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return ClearBehaviorFaultResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_CLEARED":
      return ClearBehaviorFaultResponse_Status.STATUS_CLEARED;
    case 2:
    case "STATUS_NOT_CLEARED":
      return ClearBehaviorFaultResponse_Status.STATUS_NOT_CLEARED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ClearBehaviorFaultResponse_Status.UNRECOGNIZED;
  }
}

export function clearBehaviorFaultResponse_StatusToJSON(
  object: ClearBehaviorFaultResponse_Status
): string {
  switch (object) {
    case ClearBehaviorFaultResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case ClearBehaviorFaultResponse_Status.STATUS_CLEARED:
      return "STATUS_CLEARED";
    case ClearBehaviorFaultResponse_Status.STATUS_NOT_CLEARED:
      return "STATUS_NOT_CLEARED";
    case ClearBehaviorFaultResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseRobotCommand(): RobotCommand {
  return {
    fullBodyCommand: undefined,
    synchronizedCommand: undefined,
    mobilityCommand: undefined,
  };
}

export const RobotCommand = {
  encode(
    message: RobotCommand,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.fullBodyCommand !== undefined) {
      FullBodyCommand_Request.encode(
        message.fullBodyCommand,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.synchronizedCommand !== undefined) {
      SynchronizedCommand_Request.encode(
        message.synchronizedCommand,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.mobilityCommand !== undefined) {
      MobilityCommand_Request.encode(
        message.mobilityCommand,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RobotCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRobotCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fullBodyCommand = FullBodyCommand_Request.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.synchronizedCommand = SynchronizedCommand_Request.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.mobilityCommand = MobilityCommand_Request.decode(
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

  fromJSON(object: any): RobotCommand {
    return {
      fullBodyCommand: isSet(object.fullBodyCommand)
        ? FullBodyCommand_Request.fromJSON(object.fullBodyCommand)
        : undefined,
      synchronizedCommand: isSet(object.synchronizedCommand)
        ? SynchronizedCommand_Request.fromJSON(object.synchronizedCommand)
        : undefined,
      mobilityCommand: isSet(object.mobilityCommand)
        ? MobilityCommand_Request.fromJSON(object.mobilityCommand)
        : undefined,
    };
  },

  toJSON(message: RobotCommand): unknown {
    const obj: any = {};
    message.fullBodyCommand !== undefined &&
      (obj.fullBodyCommand = message.fullBodyCommand
        ? FullBodyCommand_Request.toJSON(message.fullBodyCommand)
        : undefined);
    message.synchronizedCommand !== undefined &&
      (obj.synchronizedCommand = message.synchronizedCommand
        ? SynchronizedCommand_Request.toJSON(message.synchronizedCommand)
        : undefined);
    message.mobilityCommand !== undefined &&
      (obj.mobilityCommand = message.mobilityCommand
        ? MobilityCommand_Request.toJSON(message.mobilityCommand)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RobotCommand>, I>>(
    object: I
  ): RobotCommand {
    const message = createBaseRobotCommand();
    message.fullBodyCommand =
      object.fullBodyCommand !== undefined && object.fullBodyCommand !== null
        ? FullBodyCommand_Request.fromPartial(object.fullBodyCommand)
        : undefined;
    message.synchronizedCommand =
      object.synchronizedCommand !== undefined &&
      object.synchronizedCommand !== null
        ? SynchronizedCommand_Request.fromPartial(object.synchronizedCommand)
        : undefined;
    message.mobilityCommand =
      object.mobilityCommand !== undefined && object.mobilityCommand !== null
        ? MobilityCommand_Request.fromPartial(object.mobilityCommand)
        : undefined;
    return message;
  },
};

function createBaseRobotCommandFeedback(): RobotCommandFeedback {
  return {
    fullBodyFeedback: undefined,
    synchronizedFeedback: undefined,
    mobilityFeedback: undefined,
  };
}

export const RobotCommandFeedback = {
  encode(
    message: RobotCommandFeedback,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.fullBodyFeedback !== undefined) {
      FullBodyCommand_Feedback.encode(
        message.fullBodyFeedback,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.synchronizedFeedback !== undefined) {
      SynchronizedCommand_Feedback.encode(
        message.synchronizedFeedback,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.mobilityFeedback !== undefined) {
      MobilityCommand_Feedback.encode(
        message.mobilityFeedback,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RobotCommandFeedback {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRobotCommandFeedback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.fullBodyFeedback = FullBodyCommand_Feedback.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.synchronizedFeedback = SynchronizedCommand_Feedback.decode(
            reader,
            reader.uint32()
          );
          break;
        case 1:
          message.mobilityFeedback = MobilityCommand_Feedback.decode(
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

  fromJSON(object: any): RobotCommandFeedback {
    return {
      fullBodyFeedback: isSet(object.fullBodyFeedback)
        ? FullBodyCommand_Feedback.fromJSON(object.fullBodyFeedback)
        : undefined,
      synchronizedFeedback: isSet(object.synchronizedFeedback)
        ? SynchronizedCommand_Feedback.fromJSON(object.synchronizedFeedback)
        : undefined,
      mobilityFeedback: isSet(object.mobilityFeedback)
        ? MobilityCommand_Feedback.fromJSON(object.mobilityFeedback)
        : undefined,
    };
  },

  toJSON(message: RobotCommandFeedback): unknown {
    const obj: any = {};
    message.fullBodyFeedback !== undefined &&
      (obj.fullBodyFeedback = message.fullBodyFeedback
        ? FullBodyCommand_Feedback.toJSON(message.fullBodyFeedback)
        : undefined);
    message.synchronizedFeedback !== undefined &&
      (obj.synchronizedFeedback = message.synchronizedFeedback
        ? SynchronizedCommand_Feedback.toJSON(message.synchronizedFeedback)
        : undefined);
    message.mobilityFeedback !== undefined &&
      (obj.mobilityFeedback = message.mobilityFeedback
        ? MobilityCommand_Feedback.toJSON(message.mobilityFeedback)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RobotCommandFeedback>, I>>(
    object: I
  ): RobotCommandFeedback {
    const message = createBaseRobotCommandFeedback();
    message.fullBodyFeedback =
      object.fullBodyFeedback !== undefined && object.fullBodyFeedback !== null
        ? FullBodyCommand_Feedback.fromPartial(object.fullBodyFeedback)
        : undefined;
    message.synchronizedFeedback =
      object.synchronizedFeedback !== undefined &&
      object.synchronizedFeedback !== null
        ? SynchronizedCommand_Feedback.fromPartial(object.synchronizedFeedback)
        : undefined;
    message.mobilityFeedback =
      object.mobilityFeedback !== undefined && object.mobilityFeedback !== null
        ? MobilityCommand_Feedback.fromPartial(object.mobilityFeedback)
        : undefined;
    return message;
  },
};

function createBaseRobotCommandRequest(): RobotCommandRequest {
  return {
    header: undefined,
    lease: undefined,
    command: undefined,
    clockIdentifier: "",
  };
}

export const RobotCommandRequest = {
  encode(
    message: RobotCommandRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.lease !== undefined) {
      Lease.encode(message.lease, writer.uint32(18).fork()).ldelim();
    }
    if (message.command !== undefined) {
      RobotCommand.encode(message.command, writer.uint32(26).fork()).ldelim();
    }
    if (message.clockIdentifier !== "") {
      writer.uint32(34).string(message.clockIdentifier);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RobotCommandRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRobotCommandRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.lease = Lease.decode(reader, reader.uint32());
          break;
        case 3:
          message.command = RobotCommand.decode(reader, reader.uint32());
          break;
        case 4:
          message.clockIdentifier = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RobotCommandRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      lease: isSet(object.lease) ? Lease.fromJSON(object.lease) : undefined,
      command: isSet(object.command)
        ? RobotCommand.fromJSON(object.command)
        : undefined,
      clockIdentifier: isSet(object.clockIdentifier)
        ? String(object.clockIdentifier)
        : "",
    };
  },

  toJSON(message: RobotCommandRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.lease !== undefined &&
      (obj.lease = message.lease ? Lease.toJSON(message.lease) : undefined);
    message.command !== undefined &&
      (obj.command = message.command
        ? RobotCommand.toJSON(message.command)
        : undefined);
    message.clockIdentifier !== undefined &&
      (obj.clockIdentifier = message.clockIdentifier);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RobotCommandRequest>, I>>(
    object: I
  ): RobotCommandRequest {
    const message = createBaseRobotCommandRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.lease =
      object.lease !== undefined && object.lease !== null
        ? Lease.fromPartial(object.lease)
        : undefined;
    message.command =
      object.command !== undefined && object.command !== null
        ? RobotCommand.fromPartial(object.command)
        : undefined;
    message.clockIdentifier = object.clockIdentifier ?? "";
    return message;
  },
};

function createBaseRobotCommandResponse(): RobotCommandResponse {
  return {
    header: undefined,
    leaseUseResult: undefined,
    status: 0,
    message: "",
    robotCommandId: 0,
  };
}

export const RobotCommandResponse = {
  encode(
    message: RobotCommandResponse,
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
    if (message.robotCommandId !== 0) {
      writer.uint32(40).uint32(message.robotCommandId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RobotCommandResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRobotCommandResponse();
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
          message.robotCommandId = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RobotCommandResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      leaseUseResult: isSet(object.leaseUseResult)
        ? LeaseUseResult.fromJSON(object.leaseUseResult)
        : undefined,
      status: isSet(object.status)
        ? robotCommandResponse_StatusFromJSON(object.status)
        : 0,
      message: isSet(object.message) ? String(object.message) : "",
      robotCommandId: isSet(object.robotCommandId)
        ? Number(object.robotCommandId)
        : 0,
    };
  },

  toJSON(message: RobotCommandResponse): unknown {
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
      (obj.status = robotCommandResponse_StatusToJSON(message.status));
    message.message !== undefined && (obj.message = message.message);
    message.robotCommandId !== undefined &&
      (obj.robotCommandId = Math.round(message.robotCommandId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RobotCommandResponse>, I>>(
    object: I
  ): RobotCommandResponse {
    const message = createBaseRobotCommandResponse();
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
    message.robotCommandId = object.robotCommandId ?? 0;
    return message;
  },
};

function createBaseRobotCommandFeedbackRequest(): RobotCommandFeedbackRequest {
  return { header: undefined, robotCommandId: 0 };
}

export const RobotCommandFeedbackRequest = {
  encode(
    message: RobotCommandFeedbackRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.robotCommandId !== 0) {
      writer.uint32(16).uint32(message.robotCommandId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RobotCommandFeedbackRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRobotCommandFeedbackRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.robotCommandId = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RobotCommandFeedbackRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      robotCommandId: isSet(object.robotCommandId)
        ? Number(object.robotCommandId)
        : 0,
    };
  },

  toJSON(message: RobotCommandFeedbackRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.robotCommandId !== undefined &&
      (obj.robotCommandId = Math.round(message.robotCommandId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RobotCommandFeedbackRequest>, I>>(
    object: I
  ): RobotCommandFeedbackRequest {
    const message = createBaseRobotCommandFeedbackRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.robotCommandId = object.robotCommandId ?? 0;
    return message;
  },
};

function createBaseRobotCommandFeedbackResponse(): RobotCommandFeedbackResponse {
  return {
    header: undefined,
    leaseUseResult: undefined,
    status: 0,
    message: "",
    feedback: undefined,
  };
}

export const RobotCommandFeedbackResponse = {
  encode(
    message: RobotCommandFeedbackResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.leaseUseResult !== undefined) {
      LeaseUseResult.encode(
        message.leaseUseResult,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.message !== "") {
      writer.uint32(26).string(message.message);
    }
    if (message.feedback !== undefined) {
      RobotCommandFeedback.encode(
        message.feedback,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RobotCommandFeedbackResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRobotCommandFeedbackResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 5:
          message.leaseUseResult = LeaseUseResult.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        case 3:
          message.message = reader.string();
          break;
        case 4:
          message.feedback = RobotCommandFeedback.decode(
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

  fromJSON(object: any): RobotCommandFeedbackResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      leaseUseResult: isSet(object.leaseUseResult)
        ? LeaseUseResult.fromJSON(object.leaseUseResult)
        : undefined,
      status: isSet(object.status)
        ? robotCommandFeedbackResponse_StatusFromJSON(object.status)
        : 0,
      message: isSet(object.message) ? String(object.message) : "",
      feedback: isSet(object.feedback)
        ? RobotCommandFeedback.fromJSON(object.feedback)
        : undefined,
    };
  },

  toJSON(message: RobotCommandFeedbackResponse): unknown {
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
      (obj.status = robotCommandFeedbackResponse_StatusToJSON(message.status));
    message.message !== undefined && (obj.message = message.message);
    message.feedback !== undefined &&
      (obj.feedback = message.feedback
        ? RobotCommandFeedback.toJSON(message.feedback)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RobotCommandFeedbackResponse>, I>>(
    object: I
  ): RobotCommandFeedbackResponse {
    const message = createBaseRobotCommandFeedbackResponse();
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
    message.feedback =
      object.feedback !== undefined && object.feedback !== null
        ? RobotCommandFeedback.fromPartial(object.feedback)
        : undefined;
    return message;
  },
};

function createBaseClearBehaviorFaultRequest(): ClearBehaviorFaultRequest {
  return { header: undefined, lease: undefined, behaviorFaultId: 0 };
}

export const ClearBehaviorFaultRequest = {
  encode(
    message: ClearBehaviorFaultRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.lease !== undefined) {
      Lease.encode(message.lease, writer.uint32(18).fork()).ldelim();
    }
    if (message.behaviorFaultId !== 0) {
      writer.uint32(24).uint32(message.behaviorFaultId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ClearBehaviorFaultRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClearBehaviorFaultRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.lease = Lease.decode(reader, reader.uint32());
          break;
        case 3:
          message.behaviorFaultId = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClearBehaviorFaultRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      lease: isSet(object.lease) ? Lease.fromJSON(object.lease) : undefined,
      behaviorFaultId: isSet(object.behaviorFaultId)
        ? Number(object.behaviorFaultId)
        : 0,
    };
  },

  toJSON(message: ClearBehaviorFaultRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.lease !== undefined &&
      (obj.lease = message.lease ? Lease.toJSON(message.lease) : undefined);
    message.behaviorFaultId !== undefined &&
      (obj.behaviorFaultId = Math.round(message.behaviorFaultId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ClearBehaviorFaultRequest>, I>>(
    object: I
  ): ClearBehaviorFaultRequest {
    const message = createBaseClearBehaviorFaultRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.lease =
      object.lease !== undefined && object.lease !== null
        ? Lease.fromPartial(object.lease)
        : undefined;
    message.behaviorFaultId = object.behaviorFaultId ?? 0;
    return message;
  },
};

function createBaseClearBehaviorFaultResponse(): ClearBehaviorFaultResponse {
  return { header: undefined, leaseUseResult: undefined, status: 0 };
}

export const ClearBehaviorFaultResponse = {
  encode(
    message: ClearBehaviorFaultResponse,
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
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ClearBehaviorFaultResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClearBehaviorFaultResponse();
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
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClearBehaviorFaultResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      leaseUseResult: isSet(object.leaseUseResult)
        ? LeaseUseResult.fromJSON(object.leaseUseResult)
        : undefined,
      status: isSet(object.status)
        ? clearBehaviorFaultResponse_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: ClearBehaviorFaultResponse): unknown {
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
      (obj.status = clearBehaviorFaultResponse_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ClearBehaviorFaultResponse>, I>>(
    object: I
  ): ClearBehaviorFaultResponse {
    const message = createBaseClearBehaviorFaultResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.leaseUseResult =
      object.leaseUseResult !== undefined && object.leaseUseResult !== null
        ? LeaseUseResult.fromPartial(object.leaseUseResult)
        : undefined;
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
