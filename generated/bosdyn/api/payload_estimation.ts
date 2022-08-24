/* eslint-disable */
import { Payload } from "./payload";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/**
 * Command the robot to stand and execute a routine to estimate the mass properties of an
 * unregistered payload attached to the robot.
 */
export interface PayloadEstimationCommand {}

/**
 * PayloadEstimation command request takes no additional arguments. The estimation routine
 * takes about ~1min to run. Subsequent PayloadEstimationCommand requests issued while the
 * routine is in progress are ignored until the routine is completed.
 */
export interface PayloadEstimationCommand_Request {}

/**
 * The PayloadEstimationCommand provides several pieces of feedback:
 *   - If the routine is finished running (and its current progress).
 *   - If the routine encountered any errors while running.
 *   - The resulting payload estimated by the routine.
 */
export interface PayloadEstimationCommand_Feedback {
  /** Status of the estimation routine. */
  status: PayloadEstimationCommand_Feedback_Status;
  /** The approximate progress of the routine, range [0-1]. */
  progress: number;
  /** Error status of the estimation routine. */
  error: PayloadEstimationCommand_Feedback_Error;
  /** The resulting payload estimated by the estimation routine. */
  estimatedPayload: Payload | undefined;
}

export enum PayloadEstimationCommand_Feedback_Status {
  STATUS_UNKNOWN = 0,
  /** STATUS_COMPLETED - Completed estimation routine successfully; estimated_payload is populated. */
  STATUS_COMPLETED = 1,
  /**
   * STATUS_SMALL_MASS - Completed estimation routine successfully, but estimated mass is small enough to
   * not significantly impact mobility; estimated_payload is empty.
   */
  STATUS_SMALL_MASS = 2,
  /** STATUS_IN_PROGRESS - Estimation routine is currently running; estimated_payload is empty. */
  STATUS_IN_PROGRESS = 3,
  /** STATUS_ERROR - Error occurred during the routine; estaimted_payload is empty. */
  STATUS_ERROR = 4,
  UNRECOGNIZED = -1,
}

export function payloadEstimationCommand_Feedback_StatusFromJSON(
  object: any
): PayloadEstimationCommand_Feedback_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return PayloadEstimationCommand_Feedback_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_COMPLETED":
      return PayloadEstimationCommand_Feedback_Status.STATUS_COMPLETED;
    case 2:
    case "STATUS_SMALL_MASS":
      return PayloadEstimationCommand_Feedback_Status.STATUS_SMALL_MASS;
    case 3:
    case "STATUS_IN_PROGRESS":
      return PayloadEstimationCommand_Feedback_Status.STATUS_IN_PROGRESS;
    case 4:
    case "STATUS_ERROR":
      return PayloadEstimationCommand_Feedback_Status.STATUS_ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PayloadEstimationCommand_Feedback_Status.UNRECOGNIZED;
  }
}

export function payloadEstimationCommand_Feedback_StatusToJSON(
  object: PayloadEstimationCommand_Feedback_Status
): string {
  switch (object) {
    case PayloadEstimationCommand_Feedback_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case PayloadEstimationCommand_Feedback_Status.STATUS_COMPLETED:
      return "STATUS_COMPLETED";
    case PayloadEstimationCommand_Feedback_Status.STATUS_SMALL_MASS:
      return "STATUS_SMALL_MASS";
    case PayloadEstimationCommand_Feedback_Status.STATUS_IN_PROGRESS:
      return "STATUS_IN_PROGRESS";
    case PayloadEstimationCommand_Feedback_Status.STATUS_ERROR:
      return "STATUS_ERROR";
    case PayloadEstimationCommand_Feedback_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum PayloadEstimationCommand_Feedback_Error {
  ERROR_UNKNOWN = 0,
  /** ERROR_NONE - No error has occurred. */
  ERROR_NONE = 1,
  /** ERROR_FAILED_STAND - Robot failed to stand/change stance. */
  ERROR_FAILED_STAND = 2,
  /** ERROR_NO_RESULTS - Failed to calculate results. */
  ERROR_NO_RESULTS = 3,
  UNRECOGNIZED = -1,
}

export function payloadEstimationCommand_Feedback_ErrorFromJSON(
  object: any
): PayloadEstimationCommand_Feedback_Error {
  switch (object) {
    case 0:
    case "ERROR_UNKNOWN":
      return PayloadEstimationCommand_Feedback_Error.ERROR_UNKNOWN;
    case 1:
    case "ERROR_NONE":
      return PayloadEstimationCommand_Feedback_Error.ERROR_NONE;
    case 2:
    case "ERROR_FAILED_STAND":
      return PayloadEstimationCommand_Feedback_Error.ERROR_FAILED_STAND;
    case 3:
    case "ERROR_NO_RESULTS":
      return PayloadEstimationCommand_Feedback_Error.ERROR_NO_RESULTS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PayloadEstimationCommand_Feedback_Error.UNRECOGNIZED;
  }
}

export function payloadEstimationCommand_Feedback_ErrorToJSON(
  object: PayloadEstimationCommand_Feedback_Error
): string {
  switch (object) {
    case PayloadEstimationCommand_Feedback_Error.ERROR_UNKNOWN:
      return "ERROR_UNKNOWN";
    case PayloadEstimationCommand_Feedback_Error.ERROR_NONE:
      return "ERROR_NONE";
    case PayloadEstimationCommand_Feedback_Error.ERROR_FAILED_STAND:
      return "ERROR_FAILED_STAND";
    case PayloadEstimationCommand_Feedback_Error.ERROR_NO_RESULTS:
      return "ERROR_NO_RESULTS";
    case PayloadEstimationCommand_Feedback_Error.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBasePayloadEstimationCommand(): PayloadEstimationCommand {
  return {};
}

export const PayloadEstimationCommand = {
  encode(
    _: PayloadEstimationCommand,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): PayloadEstimationCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePayloadEstimationCommand();
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

  fromJSON(_: any): PayloadEstimationCommand {
    return {};
  },

  toJSON(_: PayloadEstimationCommand): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PayloadEstimationCommand>, I>>(
    _: I
  ): PayloadEstimationCommand {
    const message = createBasePayloadEstimationCommand();
    return message;
  },
};

function createBasePayloadEstimationCommand_Request(): PayloadEstimationCommand_Request {
  return {};
}

export const PayloadEstimationCommand_Request = {
  encode(
    _: PayloadEstimationCommand_Request,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): PayloadEstimationCommand_Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePayloadEstimationCommand_Request();
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

  fromJSON(_: any): PayloadEstimationCommand_Request {
    return {};
  },

  toJSON(_: PayloadEstimationCommand_Request): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<PayloadEstimationCommand_Request>, I>
  >(_: I): PayloadEstimationCommand_Request {
    const message = createBasePayloadEstimationCommand_Request();
    return message;
  },
};

function createBasePayloadEstimationCommand_Feedback(): PayloadEstimationCommand_Feedback {
  return { status: 0, progress: 0, error: 0, estimatedPayload: undefined };
}

export const PayloadEstimationCommand_Feedback = {
  encode(
    message: PayloadEstimationCommand_Feedback,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    if (message.progress !== 0) {
      writer.uint32(21).float(message.progress);
    }
    if (message.error !== 0) {
      writer.uint32(24).int32(message.error);
    }
    if (message.estimatedPayload !== undefined) {
      Payload.encode(
        message.estimatedPayload,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): PayloadEstimationCommand_Feedback {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePayloadEstimationCommand_Feedback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32() as any;
          break;
        case 2:
          message.progress = reader.float();
          break;
        case 3:
          message.error = reader.int32() as any;
          break;
        case 4:
          message.estimatedPayload = Payload.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PayloadEstimationCommand_Feedback {
    return {
      status: isSet(object.status)
        ? payloadEstimationCommand_Feedback_StatusFromJSON(object.status)
        : 0,
      progress: isSet(object.progress) ? Number(object.progress) : 0,
      error: isSet(object.error)
        ? payloadEstimationCommand_Feedback_ErrorFromJSON(object.error)
        : 0,
      estimatedPayload: isSet(object.estimatedPayload)
        ? Payload.fromJSON(object.estimatedPayload)
        : undefined,
    };
  },

  toJSON(message: PayloadEstimationCommand_Feedback): unknown {
    const obj: any = {};
    message.status !== undefined &&
      (obj.status = payloadEstimationCommand_Feedback_StatusToJSON(
        message.status
      ));
    message.progress !== undefined && (obj.progress = message.progress);
    message.error !== undefined &&
      (obj.error = payloadEstimationCommand_Feedback_ErrorToJSON(
        message.error
      ));
    message.estimatedPayload !== undefined &&
      (obj.estimatedPayload = message.estimatedPayload
        ? Payload.toJSON(message.estimatedPayload)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<PayloadEstimationCommand_Feedback>, I>
  >(object: I): PayloadEstimationCommand_Feedback {
    const message = createBasePayloadEstimationCommand_Feedback();
    message.status = object.status ?? 0;
    message.progress = object.progress ?? 0;
    message.error = object.error ?? 0;
    message.estimatedPayload =
      object.estimatedPayload !== undefined && object.estimatedPayload !== null
        ? Payload.fromPartial(object.estimatedPayload)
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
