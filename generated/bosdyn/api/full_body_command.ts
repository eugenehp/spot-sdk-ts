/* eslint-disable */
import {
  RobotCommandFeedbackStatus_Status,
  StopCommand_Request,
  FreezeCommand_Request,
  SelfRightCommand_Request,
  SafePowerOffCommand_Request,
  BatteryChangePoseCommand_Request,
  ConstrainedManipulationCommand_Request,
  StopCommand_Feedback,
  FreezeCommand_Feedback,
  SelfRightCommand_Feedback,
  SafePowerOffCommand_Feedback,
  BatteryChangePoseCommand_Feedback,
  ConstrainedManipulationCommand_Feedback,
  robotCommandFeedbackStatus_StatusFromJSON,
  robotCommandFeedbackStatus_StatusToJSON,
} from "./basic_command";
import {
  PayloadEstimationCommand_Request,
  PayloadEstimationCommand_Feedback,
} from "./payload_estimation";
import { Any } from "../../google/protobuf/any";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/**
 * The robot command message to specify a basic command that requires full control of the entire
 * robot to be completed.
 */
export interface FullBodyCommand {}

/** The full body request must be one of the basic command primitives. */
export interface FullBodyCommand_Request {
  /** Command to stop the robot. */
  stopRequest: StopCommand_Request | undefined;
  /** Command to freeze all joints of the robot. */
  freezeRequest: FreezeCommand_Request | undefined;
  /** Command to self-right the robot to a ready position. */
  selfrightRequest: SelfRightCommand_Request | undefined;
  /** Command to safely power off the robot. */
  safePowerOffRequest: SafePowerOffCommand_Request | undefined;
  /** Command to put the robot in a position to easily change the battery. */
  batteryChangePoseRequest: BatteryChangePoseCommand_Request | undefined;
  /** Command to perform payload mass property estimation */
  payloadEstimationRequest: PayloadEstimationCommand_Request | undefined;
  /** Command to perform full body constrained manipulation moves */
  constrainedManipulationRequest:
    | ConstrainedManipulationCommand_Request
    | undefined;
  /** Robot specific command parameters. */
  params: Any | undefined;
}

/**
 * The feedback for the fully body command that will provide information on the progress
 * of the robot command.
 */
export interface FullBodyCommand_Feedback {
  /** Feedback for the stop command request. */
  stopFeedback: StopCommand_Feedback | undefined;
  /** Feedback for the freeze command request. */
  freezeFeedback: FreezeCommand_Feedback | undefined;
  /** Feedback for the self-right command request. */
  selfrightFeedback: SelfRightCommand_Feedback | undefined;
  /** Feedback for the safe power off command request. */
  safePowerOffFeedback: SafePowerOffCommand_Feedback | undefined;
  /** Feedback for the battery change pose command request. */
  batteryChangePoseFeedback: BatteryChangePoseCommand_Feedback | undefined;
  /** Feedback for the payload estimation command request. */
  payloadEstimationFeedback: PayloadEstimationCommand_Feedback | undefined;
  /** Feedback for the constrained manipulation command request */
  constrainedManipulationFeedback:
    | ConstrainedManipulationCommand_Feedback
    | undefined;
  status: RobotCommandFeedbackStatus_Status;
}

function createBaseFullBodyCommand(): FullBodyCommand {
  return {};
}

export const FullBodyCommand = {
  encode(
    _: FullBodyCommand,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FullBodyCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFullBodyCommand();
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

  fromJSON(_: any): FullBodyCommand {
    return {};
  },

  toJSON(_: FullBodyCommand): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FullBodyCommand>, I>>(
    _: I
  ): FullBodyCommand {
    const message = createBaseFullBodyCommand();
    return message;
  },
};

function createBaseFullBodyCommand_Request(): FullBodyCommand_Request {
  return {
    stopRequest: undefined,
    freezeRequest: undefined,
    selfrightRequest: undefined,
    safePowerOffRequest: undefined,
    batteryChangePoseRequest: undefined,
    payloadEstimationRequest: undefined,
    constrainedManipulationRequest: undefined,
    params: undefined,
  };
}

export const FullBodyCommand_Request = {
  encode(
    message: FullBodyCommand_Request,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.stopRequest !== undefined) {
      StopCommand_Request.encode(
        message.stopRequest,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.freezeRequest !== undefined) {
      FreezeCommand_Request.encode(
        message.freezeRequest,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.selfrightRequest !== undefined) {
      SelfRightCommand_Request.encode(
        message.selfrightRequest,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.safePowerOffRequest !== undefined) {
      SafePowerOffCommand_Request.encode(
        message.safePowerOffRequest,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.batteryChangePoseRequest !== undefined) {
      BatteryChangePoseCommand_Request.encode(
        message.batteryChangePoseRequest,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.payloadEstimationRequest !== undefined) {
      PayloadEstimationCommand_Request.encode(
        message.payloadEstimationRequest,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.constrainedManipulationRequest !== undefined) {
      ConstrainedManipulationCommand_Request.encode(
        message.constrainedManipulationRequest,
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
  ): FullBodyCommand_Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFullBodyCommand_Request();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stopRequest = StopCommand_Request.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.freezeRequest = FreezeCommand_Request.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.selfrightRequest = SelfRightCommand_Request.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.safePowerOffRequest = SafePowerOffCommand_Request.decode(
            reader,
            reader.uint32()
          );
          break;
        case 5:
          message.batteryChangePoseRequest =
            BatteryChangePoseCommand_Request.decode(reader, reader.uint32());
          break;
        case 6:
          message.payloadEstimationRequest =
            PayloadEstimationCommand_Request.decode(reader, reader.uint32());
          break;
        case 7:
          message.constrainedManipulationRequest =
            ConstrainedManipulationCommand_Request.decode(
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

  fromJSON(object: any): FullBodyCommand_Request {
    return {
      stopRequest: isSet(object.stopRequest)
        ? StopCommand_Request.fromJSON(object.stopRequest)
        : undefined,
      freezeRequest: isSet(object.freezeRequest)
        ? FreezeCommand_Request.fromJSON(object.freezeRequest)
        : undefined,
      selfrightRequest: isSet(object.selfrightRequest)
        ? SelfRightCommand_Request.fromJSON(object.selfrightRequest)
        : undefined,
      safePowerOffRequest: isSet(object.safePowerOffRequest)
        ? SafePowerOffCommand_Request.fromJSON(object.safePowerOffRequest)
        : undefined,
      batteryChangePoseRequest: isSet(object.batteryChangePoseRequest)
        ? BatteryChangePoseCommand_Request.fromJSON(
            object.batteryChangePoseRequest
          )
        : undefined,
      payloadEstimationRequest: isSet(object.payloadEstimationRequest)
        ? PayloadEstimationCommand_Request.fromJSON(
            object.payloadEstimationRequest
          )
        : undefined,
      constrainedManipulationRequest: isSet(
        object.constrainedManipulationRequest
      )
        ? ConstrainedManipulationCommand_Request.fromJSON(
            object.constrainedManipulationRequest
          )
        : undefined,
      params: isSet(object.params) ? Any.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: FullBodyCommand_Request): unknown {
    const obj: any = {};
    message.stopRequest !== undefined &&
      (obj.stopRequest = message.stopRequest
        ? StopCommand_Request.toJSON(message.stopRequest)
        : undefined);
    message.freezeRequest !== undefined &&
      (obj.freezeRequest = message.freezeRequest
        ? FreezeCommand_Request.toJSON(message.freezeRequest)
        : undefined);
    message.selfrightRequest !== undefined &&
      (obj.selfrightRequest = message.selfrightRequest
        ? SelfRightCommand_Request.toJSON(message.selfrightRequest)
        : undefined);
    message.safePowerOffRequest !== undefined &&
      (obj.safePowerOffRequest = message.safePowerOffRequest
        ? SafePowerOffCommand_Request.toJSON(message.safePowerOffRequest)
        : undefined);
    message.batteryChangePoseRequest !== undefined &&
      (obj.batteryChangePoseRequest = message.batteryChangePoseRequest
        ? BatteryChangePoseCommand_Request.toJSON(
            message.batteryChangePoseRequest
          )
        : undefined);
    message.payloadEstimationRequest !== undefined &&
      (obj.payloadEstimationRequest = message.payloadEstimationRequest
        ? PayloadEstimationCommand_Request.toJSON(
            message.payloadEstimationRequest
          )
        : undefined);
    message.constrainedManipulationRequest !== undefined &&
      (obj.constrainedManipulationRequest =
        message.constrainedManipulationRequest
          ? ConstrainedManipulationCommand_Request.toJSON(
              message.constrainedManipulationRequest
            )
          : undefined);
    message.params !== undefined &&
      (obj.params = message.params ? Any.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FullBodyCommand_Request>, I>>(
    object: I
  ): FullBodyCommand_Request {
    const message = createBaseFullBodyCommand_Request();
    message.stopRequest =
      object.stopRequest !== undefined && object.stopRequest !== null
        ? StopCommand_Request.fromPartial(object.stopRequest)
        : undefined;
    message.freezeRequest =
      object.freezeRequest !== undefined && object.freezeRequest !== null
        ? FreezeCommand_Request.fromPartial(object.freezeRequest)
        : undefined;
    message.selfrightRequest =
      object.selfrightRequest !== undefined && object.selfrightRequest !== null
        ? SelfRightCommand_Request.fromPartial(object.selfrightRequest)
        : undefined;
    message.safePowerOffRequest =
      object.safePowerOffRequest !== undefined &&
      object.safePowerOffRequest !== null
        ? SafePowerOffCommand_Request.fromPartial(object.safePowerOffRequest)
        : undefined;
    message.batteryChangePoseRequest =
      object.batteryChangePoseRequest !== undefined &&
      object.batteryChangePoseRequest !== null
        ? BatteryChangePoseCommand_Request.fromPartial(
            object.batteryChangePoseRequest
          )
        : undefined;
    message.payloadEstimationRequest =
      object.payloadEstimationRequest !== undefined &&
      object.payloadEstimationRequest !== null
        ? PayloadEstimationCommand_Request.fromPartial(
            object.payloadEstimationRequest
          )
        : undefined;
    message.constrainedManipulationRequest =
      object.constrainedManipulationRequest !== undefined &&
      object.constrainedManipulationRequest !== null
        ? ConstrainedManipulationCommand_Request.fromPartial(
            object.constrainedManipulationRequest
          )
        : undefined;
    message.params =
      object.params !== undefined && object.params !== null
        ? Any.fromPartial(object.params)
        : undefined;
    return message;
  },
};

function createBaseFullBodyCommand_Feedback(): FullBodyCommand_Feedback {
  return {
    stopFeedback: undefined,
    freezeFeedback: undefined,
    selfrightFeedback: undefined,
    safePowerOffFeedback: undefined,
    batteryChangePoseFeedback: undefined,
    payloadEstimationFeedback: undefined,
    constrainedManipulationFeedback: undefined,
    status: 0,
  };
}

export const FullBodyCommand_Feedback = {
  encode(
    message: FullBodyCommand_Feedback,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.stopFeedback !== undefined) {
      StopCommand_Feedback.encode(
        message.stopFeedback,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.freezeFeedback !== undefined) {
      FreezeCommand_Feedback.encode(
        message.freezeFeedback,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.selfrightFeedback !== undefined) {
      SelfRightCommand_Feedback.encode(
        message.selfrightFeedback,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.safePowerOffFeedback !== undefined) {
      SafePowerOffCommand_Feedback.encode(
        message.safePowerOffFeedback,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.batteryChangePoseFeedback !== undefined) {
      BatteryChangePoseCommand_Feedback.encode(
        message.batteryChangePoseFeedback,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.payloadEstimationFeedback !== undefined) {
      PayloadEstimationCommand_Feedback.encode(
        message.payloadEstimationFeedback,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.constrainedManipulationFeedback !== undefined) {
      ConstrainedManipulationCommand_Feedback.encode(
        message.constrainedManipulationFeedback,
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
  ): FullBodyCommand_Feedback {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFullBodyCommand_Feedback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stopFeedback = StopCommand_Feedback.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.freezeFeedback = FreezeCommand_Feedback.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.selfrightFeedback = SelfRightCommand_Feedback.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.safePowerOffFeedback = SafePowerOffCommand_Feedback.decode(
            reader,
            reader.uint32()
          );
          break;
        case 5:
          message.batteryChangePoseFeedback =
            BatteryChangePoseCommand_Feedback.decode(reader, reader.uint32());
          break;
        case 6:
          message.payloadEstimationFeedback =
            PayloadEstimationCommand_Feedback.decode(reader, reader.uint32());
          break;
        case 7:
          message.constrainedManipulationFeedback =
            ConstrainedManipulationCommand_Feedback.decode(
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

  fromJSON(object: any): FullBodyCommand_Feedback {
    return {
      stopFeedback: isSet(object.stopFeedback)
        ? StopCommand_Feedback.fromJSON(object.stopFeedback)
        : undefined,
      freezeFeedback: isSet(object.freezeFeedback)
        ? FreezeCommand_Feedback.fromJSON(object.freezeFeedback)
        : undefined,
      selfrightFeedback: isSet(object.selfrightFeedback)
        ? SelfRightCommand_Feedback.fromJSON(object.selfrightFeedback)
        : undefined,
      safePowerOffFeedback: isSet(object.safePowerOffFeedback)
        ? SafePowerOffCommand_Feedback.fromJSON(object.safePowerOffFeedback)
        : undefined,
      batteryChangePoseFeedback: isSet(object.batteryChangePoseFeedback)
        ? BatteryChangePoseCommand_Feedback.fromJSON(
            object.batteryChangePoseFeedback
          )
        : undefined,
      payloadEstimationFeedback: isSet(object.payloadEstimationFeedback)
        ? PayloadEstimationCommand_Feedback.fromJSON(
            object.payloadEstimationFeedback
          )
        : undefined,
      constrainedManipulationFeedback: isSet(
        object.constrainedManipulationFeedback
      )
        ? ConstrainedManipulationCommand_Feedback.fromJSON(
            object.constrainedManipulationFeedback
          )
        : undefined,
      status: isSet(object.status)
        ? robotCommandFeedbackStatus_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: FullBodyCommand_Feedback): unknown {
    const obj: any = {};
    message.stopFeedback !== undefined &&
      (obj.stopFeedback = message.stopFeedback
        ? StopCommand_Feedback.toJSON(message.stopFeedback)
        : undefined);
    message.freezeFeedback !== undefined &&
      (obj.freezeFeedback = message.freezeFeedback
        ? FreezeCommand_Feedback.toJSON(message.freezeFeedback)
        : undefined);
    message.selfrightFeedback !== undefined &&
      (obj.selfrightFeedback = message.selfrightFeedback
        ? SelfRightCommand_Feedback.toJSON(message.selfrightFeedback)
        : undefined);
    message.safePowerOffFeedback !== undefined &&
      (obj.safePowerOffFeedback = message.safePowerOffFeedback
        ? SafePowerOffCommand_Feedback.toJSON(message.safePowerOffFeedback)
        : undefined);
    message.batteryChangePoseFeedback !== undefined &&
      (obj.batteryChangePoseFeedback = message.batteryChangePoseFeedback
        ? BatteryChangePoseCommand_Feedback.toJSON(
            message.batteryChangePoseFeedback
          )
        : undefined);
    message.payloadEstimationFeedback !== undefined &&
      (obj.payloadEstimationFeedback = message.payloadEstimationFeedback
        ? PayloadEstimationCommand_Feedback.toJSON(
            message.payloadEstimationFeedback
          )
        : undefined);
    message.constrainedManipulationFeedback !== undefined &&
      (obj.constrainedManipulationFeedback =
        message.constrainedManipulationFeedback
          ? ConstrainedManipulationCommand_Feedback.toJSON(
              message.constrainedManipulationFeedback
            )
          : undefined);
    message.status !== undefined &&
      (obj.status = robotCommandFeedbackStatus_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FullBodyCommand_Feedback>, I>>(
    object: I
  ): FullBodyCommand_Feedback {
    const message = createBaseFullBodyCommand_Feedback();
    message.stopFeedback =
      object.stopFeedback !== undefined && object.stopFeedback !== null
        ? StopCommand_Feedback.fromPartial(object.stopFeedback)
        : undefined;
    message.freezeFeedback =
      object.freezeFeedback !== undefined && object.freezeFeedback !== null
        ? FreezeCommand_Feedback.fromPartial(object.freezeFeedback)
        : undefined;
    message.selfrightFeedback =
      object.selfrightFeedback !== undefined &&
      object.selfrightFeedback !== null
        ? SelfRightCommand_Feedback.fromPartial(object.selfrightFeedback)
        : undefined;
    message.safePowerOffFeedback =
      object.safePowerOffFeedback !== undefined &&
      object.safePowerOffFeedback !== null
        ? SafePowerOffCommand_Feedback.fromPartial(object.safePowerOffFeedback)
        : undefined;
    message.batteryChangePoseFeedback =
      object.batteryChangePoseFeedback !== undefined &&
      object.batteryChangePoseFeedback !== null
        ? BatteryChangePoseCommand_Feedback.fromPartial(
            object.batteryChangePoseFeedback
          )
        : undefined;
    message.payloadEstimationFeedback =
      object.payloadEstimationFeedback !== undefined &&
      object.payloadEstimationFeedback !== null
        ? PayloadEstimationCommand_Feedback.fromPartial(
            object.payloadEstimationFeedback
          )
        : undefined;
    message.constrainedManipulationFeedback =
      object.constrainedManipulationFeedback !== undefined &&
      object.constrainedManipulationFeedback !== null
        ? ConstrainedManipulationCommand_Feedback.fromPartial(
            object.constrainedManipulationFeedback
          )
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
