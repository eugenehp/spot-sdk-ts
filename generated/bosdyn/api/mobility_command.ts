/* eslint-disable */
import {
  RobotCommandFeedbackStatus_Status,
  SE2TrajectoryCommand_Request,
  SE2VelocityCommand_Request,
  SitCommand_Request,
  StandCommand_Request,
  StanceCommand_Request,
  StopCommand_Request,
  FollowArmCommand_Request,
  SE2TrajectoryCommand_Feedback,
  SE2VelocityCommand_Feedback,
  SitCommand_Feedback,
  StandCommand_Feedback,
  StanceCommand_Feedback,
  StopCommand_Feedback,
  FollowArmCommand_Feedback,
  robotCommandFeedbackStatus_StatusFromJSON,
  robotCommandFeedbackStatus_StatusToJSON,
} from "./basic_command";
import { Any } from "../../google/protobuf/any";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/** The robot command message to specify a basic command that moves the robot. */
export interface MobilityCommand {}

/** The mobility request must be one of the basic command primitives. */
export interface MobilityCommand_Request {
  /** Command to move the robot along a trajectory. */
  se2TrajectoryRequest: SE2TrajectoryCommand_Request | undefined;
  /** Command to move the robot at a fixed velocity. */
  se2VelocityRequest: SE2VelocityCommand_Request | undefined;
  /** Command to sit the robot down. */
  sitRequest: SitCommand_Request | undefined;
  /** Command to stand up the robot. */
  standRequest: StandCommand_Request | undefined;
  stanceRequest: StanceCommand_Request | undefined;
  stopRequest: StopCommand_Request | undefined;
  followArmRequest: FollowArmCommand_Request | undefined;
  /** Robot specific command parameters. */
  params: Any | undefined;
}

/**
 * The feedback for the mobility command that will provide information on the progress
 * of the robot command.
 */
export interface MobilityCommand_Feedback {
  /** Feedback for the trajectory command. */
  se2TrajectoryFeedback: SE2TrajectoryCommand_Feedback | undefined;
  /** Feedback for the velocity command. */
  se2VelocityFeedback: SE2VelocityCommand_Feedback | undefined;
  /** Feedback for the sit command. */
  sitFeedback: SitCommand_Feedback | undefined;
  /** Feedback for the stand command. */
  standFeedback: StandCommand_Feedback | undefined;
  stanceFeedback: StanceCommand_Feedback | undefined;
  stopFeedback: StopCommand_Feedback | undefined;
  followArmFeedback: FollowArmCommand_Feedback | undefined;
  status: RobotCommandFeedbackStatus_Status;
}

function createBaseMobilityCommand(): MobilityCommand {
  return {};
}

export const MobilityCommand = {
  encode(
    _: MobilityCommand,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MobilityCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMobilityCommand();
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

  fromJSON(_: any): MobilityCommand {
    return {};
  },

  toJSON(_: MobilityCommand): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MobilityCommand>, I>>(
    _: I
  ): MobilityCommand {
    const message = createBaseMobilityCommand();
    return message;
  },
};

function createBaseMobilityCommand_Request(): MobilityCommand_Request {
  return {
    se2TrajectoryRequest: undefined,
    se2VelocityRequest: undefined,
    sitRequest: undefined,
    standRequest: undefined,
    stanceRequest: undefined,
    stopRequest: undefined,
    followArmRequest: undefined,
    params: undefined,
  };
}

export const MobilityCommand_Request = {
  encode(
    message: MobilityCommand_Request,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.se2TrajectoryRequest !== undefined) {
      SE2TrajectoryCommand_Request.encode(
        message.se2TrajectoryRequest,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.se2VelocityRequest !== undefined) {
      SE2VelocityCommand_Request.encode(
        message.se2VelocityRequest,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.sitRequest !== undefined) {
      SitCommand_Request.encode(
        message.sitRequest,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.standRequest !== undefined) {
      StandCommand_Request.encode(
        message.standRequest,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.stanceRequest !== undefined) {
      StanceCommand_Request.encode(
        message.stanceRequest,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.stopRequest !== undefined) {
      StopCommand_Request.encode(
        message.stopRequest,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.followArmRequest !== undefined) {
      FollowArmCommand_Request.encode(
        message.followArmRequest,
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.params !== undefined) {
      Any.encode(message.params, writer.uint32(802).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MobilityCommand_Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMobilityCommand_Request();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.se2TrajectoryRequest = SE2TrajectoryCommand_Request.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.se2VelocityRequest = SE2VelocityCommand_Request.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.sitRequest = SitCommand_Request.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.standRequest = StandCommand_Request.decode(
            reader,
            reader.uint32()
          );
          break;
        case 5:
          message.stanceRequest = StanceCommand_Request.decode(
            reader,
            reader.uint32()
          );
          break;
        case 6:
          message.stopRequest = StopCommand_Request.decode(
            reader,
            reader.uint32()
          );
          break;
        case 7:
          message.followArmRequest = FollowArmCommand_Request.decode(
            reader,
            reader.uint32()
          );
          break;
        case 100:
          message.params = Any.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MobilityCommand_Request {
    return {
      se2TrajectoryRequest: isSet(object.se2TrajectoryRequest)
        ? SE2TrajectoryCommand_Request.fromJSON(object.se2TrajectoryRequest)
        : undefined,
      se2VelocityRequest: isSet(object.se2VelocityRequest)
        ? SE2VelocityCommand_Request.fromJSON(object.se2VelocityRequest)
        : undefined,
      sitRequest: isSet(object.sitRequest)
        ? SitCommand_Request.fromJSON(object.sitRequest)
        : undefined,
      standRequest: isSet(object.standRequest)
        ? StandCommand_Request.fromJSON(object.standRequest)
        : undefined,
      stanceRequest: isSet(object.stanceRequest)
        ? StanceCommand_Request.fromJSON(object.stanceRequest)
        : undefined,
      stopRequest: isSet(object.stopRequest)
        ? StopCommand_Request.fromJSON(object.stopRequest)
        : undefined,
      followArmRequest: isSet(object.followArmRequest)
        ? FollowArmCommand_Request.fromJSON(object.followArmRequest)
        : undefined,
      params: isSet(object.params) ? Any.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: MobilityCommand_Request): unknown {
    const obj: any = {};
    message.se2TrajectoryRequest !== undefined &&
      (obj.se2TrajectoryRequest = message.se2TrajectoryRequest
        ? SE2TrajectoryCommand_Request.toJSON(message.se2TrajectoryRequest)
        : undefined);
    message.se2VelocityRequest !== undefined &&
      (obj.se2VelocityRequest = message.se2VelocityRequest
        ? SE2VelocityCommand_Request.toJSON(message.se2VelocityRequest)
        : undefined);
    message.sitRequest !== undefined &&
      (obj.sitRequest = message.sitRequest
        ? SitCommand_Request.toJSON(message.sitRequest)
        : undefined);
    message.standRequest !== undefined &&
      (obj.standRequest = message.standRequest
        ? StandCommand_Request.toJSON(message.standRequest)
        : undefined);
    message.stanceRequest !== undefined &&
      (obj.stanceRequest = message.stanceRequest
        ? StanceCommand_Request.toJSON(message.stanceRequest)
        : undefined);
    message.stopRequest !== undefined &&
      (obj.stopRequest = message.stopRequest
        ? StopCommand_Request.toJSON(message.stopRequest)
        : undefined);
    message.followArmRequest !== undefined &&
      (obj.followArmRequest = message.followArmRequest
        ? FollowArmCommand_Request.toJSON(message.followArmRequest)
        : undefined);
    message.params !== undefined &&
      (obj.params = message.params ? Any.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MobilityCommand_Request>, I>>(
    object: I
  ): MobilityCommand_Request {
    const message = createBaseMobilityCommand_Request();
    message.se2TrajectoryRequest =
      object.se2TrajectoryRequest !== undefined &&
      object.se2TrajectoryRequest !== null
        ? SE2TrajectoryCommand_Request.fromPartial(object.se2TrajectoryRequest)
        : undefined;
    message.se2VelocityRequest =
      object.se2VelocityRequest !== undefined &&
      object.se2VelocityRequest !== null
        ? SE2VelocityCommand_Request.fromPartial(object.se2VelocityRequest)
        : undefined;
    message.sitRequest =
      object.sitRequest !== undefined && object.sitRequest !== null
        ? SitCommand_Request.fromPartial(object.sitRequest)
        : undefined;
    message.standRequest =
      object.standRequest !== undefined && object.standRequest !== null
        ? StandCommand_Request.fromPartial(object.standRequest)
        : undefined;
    message.stanceRequest =
      object.stanceRequest !== undefined && object.stanceRequest !== null
        ? StanceCommand_Request.fromPartial(object.stanceRequest)
        : undefined;
    message.stopRequest =
      object.stopRequest !== undefined && object.stopRequest !== null
        ? StopCommand_Request.fromPartial(object.stopRequest)
        : undefined;
    message.followArmRequest =
      object.followArmRequest !== undefined && object.followArmRequest !== null
        ? FollowArmCommand_Request.fromPartial(object.followArmRequest)
        : undefined;
    message.params =
      object.params !== undefined && object.params !== null
        ? Any.fromPartial(object.params)
        : undefined;
    return message;
  },
};

function createBaseMobilityCommand_Feedback(): MobilityCommand_Feedback {
  return {
    se2TrajectoryFeedback: undefined,
    se2VelocityFeedback: undefined,
    sitFeedback: undefined,
    standFeedback: undefined,
    stanceFeedback: undefined,
    stopFeedback: undefined,
    followArmFeedback: undefined,
    status: 0,
  };
}

export const MobilityCommand_Feedback = {
  encode(
    message: MobilityCommand_Feedback,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.se2TrajectoryFeedback !== undefined) {
      SE2TrajectoryCommand_Feedback.encode(
        message.se2TrajectoryFeedback,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.se2VelocityFeedback !== undefined) {
      SE2VelocityCommand_Feedback.encode(
        message.se2VelocityFeedback,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.sitFeedback !== undefined) {
      SitCommand_Feedback.encode(
        message.sitFeedback,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.standFeedback !== undefined) {
      StandCommand_Feedback.encode(
        message.standFeedback,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.stanceFeedback !== undefined) {
      StanceCommand_Feedback.encode(
        message.stanceFeedback,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.stopFeedback !== undefined) {
      StopCommand_Feedback.encode(
        message.stopFeedback,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.followArmFeedback !== undefined) {
      FollowArmCommand_Feedback.encode(
        message.followArmFeedback,
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(800).int32(message.status);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MobilityCommand_Feedback {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMobilityCommand_Feedback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.se2TrajectoryFeedback = SE2TrajectoryCommand_Feedback.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.se2VelocityFeedback = SE2VelocityCommand_Feedback.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.sitFeedback = SitCommand_Feedback.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.standFeedback = StandCommand_Feedback.decode(
            reader,
            reader.uint32()
          );
          break;
        case 5:
          message.stanceFeedback = StanceCommand_Feedback.decode(
            reader,
            reader.uint32()
          );
          break;
        case 6:
          message.stopFeedback = StopCommand_Feedback.decode(
            reader,
            reader.uint32()
          );
          break;
        case 7:
          message.followArmFeedback = FollowArmCommand_Feedback.decode(
            reader,
            reader.uint32()
          );
          break;
        case 100:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MobilityCommand_Feedback {
    return {
      se2TrajectoryFeedback: isSet(object.se2TrajectoryFeedback)
        ? SE2TrajectoryCommand_Feedback.fromJSON(object.se2TrajectoryFeedback)
        : undefined,
      se2VelocityFeedback: isSet(object.se2VelocityFeedback)
        ? SE2VelocityCommand_Feedback.fromJSON(object.se2VelocityFeedback)
        : undefined,
      sitFeedback: isSet(object.sitFeedback)
        ? SitCommand_Feedback.fromJSON(object.sitFeedback)
        : undefined,
      standFeedback: isSet(object.standFeedback)
        ? StandCommand_Feedback.fromJSON(object.standFeedback)
        : undefined,
      stanceFeedback: isSet(object.stanceFeedback)
        ? StanceCommand_Feedback.fromJSON(object.stanceFeedback)
        : undefined,
      stopFeedback: isSet(object.stopFeedback)
        ? StopCommand_Feedback.fromJSON(object.stopFeedback)
        : undefined,
      followArmFeedback: isSet(object.followArmFeedback)
        ? FollowArmCommand_Feedback.fromJSON(object.followArmFeedback)
        : undefined,
      status: isSet(object.status)
        ? robotCommandFeedbackStatus_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: MobilityCommand_Feedback): unknown {
    const obj: any = {};
    message.se2TrajectoryFeedback !== undefined &&
      (obj.se2TrajectoryFeedback = message.se2TrajectoryFeedback
        ? SE2TrajectoryCommand_Feedback.toJSON(message.se2TrajectoryFeedback)
        : undefined);
    message.se2VelocityFeedback !== undefined &&
      (obj.se2VelocityFeedback = message.se2VelocityFeedback
        ? SE2VelocityCommand_Feedback.toJSON(message.se2VelocityFeedback)
        : undefined);
    message.sitFeedback !== undefined &&
      (obj.sitFeedback = message.sitFeedback
        ? SitCommand_Feedback.toJSON(message.sitFeedback)
        : undefined);
    message.standFeedback !== undefined &&
      (obj.standFeedback = message.standFeedback
        ? StandCommand_Feedback.toJSON(message.standFeedback)
        : undefined);
    message.stanceFeedback !== undefined &&
      (obj.stanceFeedback = message.stanceFeedback
        ? StanceCommand_Feedback.toJSON(message.stanceFeedback)
        : undefined);
    message.stopFeedback !== undefined &&
      (obj.stopFeedback = message.stopFeedback
        ? StopCommand_Feedback.toJSON(message.stopFeedback)
        : undefined);
    message.followArmFeedback !== undefined &&
      (obj.followArmFeedback = message.followArmFeedback
        ? FollowArmCommand_Feedback.toJSON(message.followArmFeedback)
        : undefined);
    message.status !== undefined &&
      (obj.status = robotCommandFeedbackStatus_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MobilityCommand_Feedback>, I>>(
    object: I
  ): MobilityCommand_Feedback {
    const message = createBaseMobilityCommand_Feedback();
    message.se2TrajectoryFeedback =
      object.se2TrajectoryFeedback !== undefined &&
      object.se2TrajectoryFeedback !== null
        ? SE2TrajectoryCommand_Feedback.fromPartial(
            object.se2TrajectoryFeedback
          )
        : undefined;
    message.se2VelocityFeedback =
      object.se2VelocityFeedback !== undefined &&
      object.se2VelocityFeedback !== null
        ? SE2VelocityCommand_Feedback.fromPartial(object.se2VelocityFeedback)
        : undefined;
    message.sitFeedback =
      object.sitFeedback !== undefined && object.sitFeedback !== null
        ? SitCommand_Feedback.fromPartial(object.sitFeedback)
        : undefined;
    message.standFeedback =
      object.standFeedback !== undefined && object.standFeedback !== null
        ? StandCommand_Feedback.fromPartial(object.standFeedback)
        : undefined;
    message.stanceFeedback =
      object.stanceFeedback !== undefined && object.stanceFeedback !== null
        ? StanceCommand_Feedback.fromPartial(object.stanceFeedback)
        : undefined;
    message.stopFeedback =
      object.stopFeedback !== undefined && object.stopFeedback !== null
        ? StopCommand_Feedback.fromPartial(object.stopFeedback)
        : undefined;
    message.followArmFeedback =
      object.followArmFeedback !== undefined &&
      object.followArmFeedback !== null
        ? FollowArmCommand_Feedback.fromPartial(object.followArmFeedback)
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
