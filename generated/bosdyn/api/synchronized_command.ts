/* eslint-disable */
import { ArmCommand_Request, ArmCommand_Feedback } from "./arm_command";
import {
  MobilityCommand_Request,
  MobilityCommand_Feedback,
} from "./mobility_command";
import {
  GripperCommand_Request,
  GripperCommand_Feedback,
} from "./gripper_command";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

export interface SynchronizedCommand {}

export interface SynchronizedCommand_Request {
  armCommand: ArmCommand_Request | undefined;
  mobilityCommand: MobilityCommand_Request | undefined;
  gripperCommand: GripperCommand_Request | undefined;
}

export interface SynchronizedCommand_Feedback {
  armCommandFeedback: ArmCommand_Feedback | undefined;
  mobilityCommandFeedback: MobilityCommand_Feedback | undefined;
  gripperCommandFeedback: GripperCommand_Feedback | undefined;
}

function createBaseSynchronizedCommand(): SynchronizedCommand {
  return {};
}

export const SynchronizedCommand = {
  encode(
    _: SynchronizedCommand,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SynchronizedCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSynchronizedCommand();
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

  fromJSON(_: any): SynchronizedCommand {
    return {};
  },

  toJSON(_: SynchronizedCommand): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SynchronizedCommand>, I>>(
    _: I
  ): SynchronizedCommand {
    const message = createBaseSynchronizedCommand();
    return message;
  },
};

function createBaseSynchronizedCommand_Request(): SynchronizedCommand_Request {
  return {
    armCommand: undefined,
    mobilityCommand: undefined,
    gripperCommand: undefined,
  };
}

export const SynchronizedCommand_Request = {
  encode(
    message: SynchronizedCommand_Request,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.armCommand !== undefined) {
      ArmCommand_Request.encode(
        message.armCommand,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.mobilityCommand !== undefined) {
      MobilityCommand_Request.encode(
        message.mobilityCommand,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.gripperCommand !== undefined) {
      GripperCommand_Request.encode(
        message.gripperCommand,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SynchronizedCommand_Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSynchronizedCommand_Request();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.armCommand = ArmCommand_Request.decode(
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
        case 3:
          message.gripperCommand = GripperCommand_Request.decode(
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

  fromJSON(object: any): SynchronizedCommand_Request {
    return {
      armCommand: isSet(object.armCommand)
        ? ArmCommand_Request.fromJSON(object.armCommand)
        : undefined,
      mobilityCommand: isSet(object.mobilityCommand)
        ? MobilityCommand_Request.fromJSON(object.mobilityCommand)
        : undefined,
      gripperCommand: isSet(object.gripperCommand)
        ? GripperCommand_Request.fromJSON(object.gripperCommand)
        : undefined,
    };
  },

  toJSON(message: SynchronizedCommand_Request): unknown {
    const obj: any = {};
    message.armCommand !== undefined &&
      (obj.armCommand = message.armCommand
        ? ArmCommand_Request.toJSON(message.armCommand)
        : undefined);
    message.mobilityCommand !== undefined &&
      (obj.mobilityCommand = message.mobilityCommand
        ? MobilityCommand_Request.toJSON(message.mobilityCommand)
        : undefined);
    message.gripperCommand !== undefined &&
      (obj.gripperCommand = message.gripperCommand
        ? GripperCommand_Request.toJSON(message.gripperCommand)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SynchronizedCommand_Request>, I>>(
    object: I
  ): SynchronizedCommand_Request {
    const message = createBaseSynchronizedCommand_Request();
    message.armCommand =
      object.armCommand !== undefined && object.armCommand !== null
        ? ArmCommand_Request.fromPartial(object.armCommand)
        : undefined;
    message.mobilityCommand =
      object.mobilityCommand !== undefined && object.mobilityCommand !== null
        ? MobilityCommand_Request.fromPartial(object.mobilityCommand)
        : undefined;
    message.gripperCommand =
      object.gripperCommand !== undefined && object.gripperCommand !== null
        ? GripperCommand_Request.fromPartial(object.gripperCommand)
        : undefined;
    return message;
  },
};

function createBaseSynchronizedCommand_Feedback(): SynchronizedCommand_Feedback {
  return {
    armCommandFeedback: undefined,
    mobilityCommandFeedback: undefined,
    gripperCommandFeedback: undefined,
  };
}

export const SynchronizedCommand_Feedback = {
  encode(
    message: SynchronizedCommand_Feedback,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.armCommandFeedback !== undefined) {
      ArmCommand_Feedback.encode(
        message.armCommandFeedback,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.mobilityCommandFeedback !== undefined) {
      MobilityCommand_Feedback.encode(
        message.mobilityCommandFeedback,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.gripperCommandFeedback !== undefined) {
      GripperCommand_Feedback.encode(
        message.gripperCommandFeedback,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SynchronizedCommand_Feedback {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSynchronizedCommand_Feedback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.armCommandFeedback = ArmCommand_Feedback.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.mobilityCommandFeedback = MobilityCommand_Feedback.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.gripperCommandFeedback = GripperCommand_Feedback.decode(
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

  fromJSON(object: any): SynchronizedCommand_Feedback {
    return {
      armCommandFeedback: isSet(object.armCommandFeedback)
        ? ArmCommand_Feedback.fromJSON(object.armCommandFeedback)
        : undefined,
      mobilityCommandFeedback: isSet(object.mobilityCommandFeedback)
        ? MobilityCommand_Feedback.fromJSON(object.mobilityCommandFeedback)
        : undefined,
      gripperCommandFeedback: isSet(object.gripperCommandFeedback)
        ? GripperCommand_Feedback.fromJSON(object.gripperCommandFeedback)
        : undefined,
    };
  },

  toJSON(message: SynchronizedCommand_Feedback): unknown {
    const obj: any = {};
    message.armCommandFeedback !== undefined &&
      (obj.armCommandFeedback = message.armCommandFeedback
        ? ArmCommand_Feedback.toJSON(message.armCommandFeedback)
        : undefined);
    message.mobilityCommandFeedback !== undefined &&
      (obj.mobilityCommandFeedback = message.mobilityCommandFeedback
        ? MobilityCommand_Feedback.toJSON(message.mobilityCommandFeedback)
        : undefined);
    message.gripperCommandFeedback !== undefined &&
      (obj.gripperCommandFeedback = message.gripperCommandFeedback
        ? GripperCommand_Feedback.toJSON(message.gripperCommandFeedback)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SynchronizedCommand_Feedback>, I>>(
    object: I
  ): SynchronizedCommand_Feedback {
    const message = createBaseSynchronizedCommand_Feedback();
    message.armCommandFeedback =
      object.armCommandFeedback !== undefined &&
      object.armCommandFeedback !== null
        ? ArmCommand_Feedback.fromPartial(object.armCommandFeedback)
        : undefined;
    message.mobilityCommandFeedback =
      object.mobilityCommandFeedback !== undefined &&
      object.mobilityCommandFeedback !== null
        ? MobilityCommand_Feedback.fromPartial(object.mobilityCommandFeedback)
        : undefined;
    message.gripperCommandFeedback =
      object.gripperCommandFeedback !== undefined &&
      object.gripperCommandFeedback !== null
        ? GripperCommand_Feedback.fromPartial(object.gripperCommandFeedback)
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
