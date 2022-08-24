/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Struct } from "../../google/protobuf/struct";

export const protobufPackage = "bosdyn.api";

/**
 * Structured data indicating an alert detected off the robot that can be stored in the DataBuffer
 * and associated with with previously stored data.
 */
export interface AlertData {
  /** Severity of this alert. */
  severity: AlertData_SeverityLevel;
  /** Human readable alert title/summary. */
  title: string;
  /** The source that triggered the alert. */
  source: string;
  /** JSON data for any additional info attached to this alert. */
  additionalData: { [key: string]: any } | undefined;
}

export enum AlertData_SeverityLevel {
  SEVERITY_LEVEL_UNKNOWN = 0,
  SEVERITY_LEVEL_INFO = 1,
  SEVERITY_LEVEL_WARN = 2,
  SEVERITY_LEVEL_ERROR = 3,
  SEVERITY_LEVEL_CRITICAL = 4,
  UNRECOGNIZED = -1,
}

export function alertData_SeverityLevelFromJSON(
  object: any
): AlertData_SeverityLevel {
  switch (object) {
    case 0:
    case "SEVERITY_LEVEL_UNKNOWN":
      return AlertData_SeverityLevel.SEVERITY_LEVEL_UNKNOWN;
    case 1:
    case "SEVERITY_LEVEL_INFO":
      return AlertData_SeverityLevel.SEVERITY_LEVEL_INFO;
    case 2:
    case "SEVERITY_LEVEL_WARN":
      return AlertData_SeverityLevel.SEVERITY_LEVEL_WARN;
    case 3:
    case "SEVERITY_LEVEL_ERROR":
      return AlertData_SeverityLevel.SEVERITY_LEVEL_ERROR;
    case 4:
    case "SEVERITY_LEVEL_CRITICAL":
      return AlertData_SeverityLevel.SEVERITY_LEVEL_CRITICAL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AlertData_SeverityLevel.UNRECOGNIZED;
  }
}

export function alertData_SeverityLevelToJSON(
  object: AlertData_SeverityLevel
): string {
  switch (object) {
    case AlertData_SeverityLevel.SEVERITY_LEVEL_UNKNOWN:
      return "SEVERITY_LEVEL_UNKNOWN";
    case AlertData_SeverityLevel.SEVERITY_LEVEL_INFO:
      return "SEVERITY_LEVEL_INFO";
    case AlertData_SeverityLevel.SEVERITY_LEVEL_WARN:
      return "SEVERITY_LEVEL_WARN";
    case AlertData_SeverityLevel.SEVERITY_LEVEL_ERROR:
      return "SEVERITY_LEVEL_ERROR";
    case AlertData_SeverityLevel.SEVERITY_LEVEL_CRITICAL:
      return "SEVERITY_LEVEL_CRITICAL";
    case AlertData_SeverityLevel.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseAlertData(): AlertData {
  return { severity: 0, title: "", source: "", additionalData: undefined };
}

export const AlertData = {
  encode(
    message: AlertData,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.severity !== 0) {
      writer.uint32(8).int32(message.severity);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.source !== "") {
      writer.uint32(26).string(message.source);
    }
    if (message.additionalData !== undefined) {
      Struct.encode(
        Struct.wrap(message.additionalData),
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AlertData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAlertData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.severity = reader.int32() as any;
          break;
        case 2:
          message.title = reader.string();
          break;
        case 3:
          message.source = reader.string();
          break;
        case 4:
          message.additionalData = Struct.unwrap(
            Struct.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AlertData {
    return {
      severity: isSet(object.severity)
        ? alertData_SeverityLevelFromJSON(object.severity)
        : 0,
      title: isSet(object.title) ? String(object.title) : "",
      source: isSet(object.source) ? String(object.source) : "",
      additionalData: isObject(object.additionalData)
        ? object.additionalData
        : undefined,
    };
  },

  toJSON(message: AlertData): unknown {
    const obj: any = {};
    message.severity !== undefined &&
      (obj.severity = alertData_SeverityLevelToJSON(message.severity));
    message.title !== undefined && (obj.title = message.title);
    message.source !== undefined && (obj.source = message.source);
    message.additionalData !== undefined &&
      (obj.additionalData = message.additionalData);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AlertData>, I>>(
    object: I
  ): AlertData {
    const message = createBaseAlertData();
    message.severity = object.severity ?? 0;
    message.title = object.title ?? "";
    message.source = object.source ?? "";
    message.additionalData = object.additionalData ?? undefined;
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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
