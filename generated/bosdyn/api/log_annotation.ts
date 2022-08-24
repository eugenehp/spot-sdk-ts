/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp";
import { RequestHeader, ResponseHeader } from "./header";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/**
 * DEPRECATED as of 2.1.0: Please use the DataBufferService instead of the LogAnnotationService.
 * The AddLogAnnotation request sends the information that should be added into the log.
 */
export interface AddLogAnnotationRequest {
  /** Common request/response header. */
  header: RequestHeader | undefined;
  /** The annotations to be aded into the log (can be text messages, blobs or robot operator messages). */
  annotations: LogAnnotations | undefined;
}

/**
 * DEPRECATED as of 2.1.0: Please use the DataBufferService instead of the LogAnnotationService.
 * A container for elements to be added to the robot's logs.
 */
export interface LogAnnotations {
  /** Text messages to be added to the log. */
  textMessages: LogAnnotationTextMessage[];
  /** Messages from the robot operator to be added to the log. */
  operatorMessages: LogAnnotationOperatorMessage[];
  /** One or more binary blobs to add to the log. */
  blobData: LogAnnotationLogBlob[];
}

/**
 * DEPRECATED as of 2.1.0: Please use the DataBufferService instead of the LogAnnotationService.
 * A text message to add to the robot's logs.
 * These could be internal text-log messages from a client for use in debugging, for
 * example.
 */
export interface LogAnnotationTextMessage {
  /** String annotation message to add to the log. */
  message: string;
  /** Required timestamp of data in robot clock time. */
  timestamp: Date | undefined;
  /** The service responsible for the annotation. May be omitted. */
  service: string;
  /** Level of significance of the text message. */
  level: LogAnnotationTextMessage_Level;
  /** Optional tag to identify from what code/module this message originated from. */
  tag: string;
  /** Optional source file name originating the log message. */
  filename: string;
  /** Optional source file line number originating the log message. */
  lineNumber: number;
  /** Optional timestamp of data in client clock time. */
  timestampClient: Date | undefined;
}

export enum LogAnnotationTextMessage_Level {
  /** LEVEL_UNKNOWN - Invalid, do not use. */
  LEVEL_UNKNOWN = 0,
  /** LEVEL_DEBUG - Events likely of interest only in a debugging context. */
  LEVEL_DEBUG = 1,
  /** LEVEL_INFO - Informational message during normal operation. */
  LEVEL_INFO = 2,
  /** LEVEL_WARN - Information about an unexpected but recoverable condition. */
  LEVEL_WARN = 3,
  /** LEVEL_ERROR - Information about an operation which did not succeed. */
  LEVEL_ERROR = 4,
  UNRECOGNIZED = -1,
}

export function logAnnotationTextMessage_LevelFromJSON(
  object: any
): LogAnnotationTextMessage_Level {
  switch (object) {
    case 0:
    case "LEVEL_UNKNOWN":
      return LogAnnotationTextMessage_Level.LEVEL_UNKNOWN;
    case 1:
    case "LEVEL_DEBUG":
      return LogAnnotationTextMessage_Level.LEVEL_DEBUG;
    case 2:
    case "LEVEL_INFO":
      return LogAnnotationTextMessage_Level.LEVEL_INFO;
    case 3:
    case "LEVEL_WARN":
      return LogAnnotationTextMessage_Level.LEVEL_WARN;
    case 4:
    case "LEVEL_ERROR":
      return LogAnnotationTextMessage_Level.LEVEL_ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LogAnnotationTextMessage_Level.UNRECOGNIZED;
  }
}

export function logAnnotationTextMessage_LevelToJSON(
  object: LogAnnotationTextMessage_Level
): string {
  switch (object) {
    case LogAnnotationTextMessage_Level.LEVEL_UNKNOWN:
      return "LEVEL_UNKNOWN";
    case LogAnnotationTextMessage_Level.LEVEL_DEBUG:
      return "LEVEL_DEBUG";
    case LogAnnotationTextMessage_Level.LEVEL_INFO:
      return "LEVEL_INFO";
    case LogAnnotationTextMessage_Level.LEVEL_WARN:
      return "LEVEL_WARN";
    case LogAnnotationTextMessage_Level.LEVEL_ERROR:
      return "LEVEL_ERROR";
    case LogAnnotationTextMessage_Level.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * DEPRECATED as of 2.1.0: Please use the DataBufferService instead of the LogAnnotationService.
 * An operator message to be added to the robot's logs.
 * These are notes especially intended to mark when logs should be preserved and reviewed
 * to ensure that robot hardware and/or software is working as intended.
 */
export interface LogAnnotationOperatorMessage {
  /** String annotation message to add to the log. */
  message: string;
  /** Required timestamp of data in robot clock time. */
  timestamp: Date | undefined;
  /** Optional timestamp of data in client clock time. */
  timestampClient: Date | undefined;
}

/**
 * DEPRECATED as of 2.1.0: Please use the DataBufferService instead of the LogAnnotationService.
 * A unit of binary data to be entered in a log.
 */
export interface LogAnnotationLogBlob {
  /** Required timestamp of data in robot clock time. */
  timestamp: Date | undefined;
  /**
   * A general label for this blob.
   * This is distinct from type_id, which identifies how the blob is to be parsed.
   */
  channel: string;
  /**
   * A description of the data's content and its encoding.
   * This should be sufficient for deciding how to deserialize the data.
   * For example, this could be the full name of a protobuf message type.
   */
  typeId: string;
  /** Raw data to be included as the blob log. */
  data: Uint8Array;
  /** Optional timestamp of data in client clock time. */
  timestampClient: Date | undefined;
}

/**
 * DEPRECATED as of 2.1.0: Please use the DataBufferService instead of the LogAnnotationService.
 * The AddLogAnnotation response message, which is empty except for any potential header errors/warnings.
 */
export interface AddLogAnnotationResponse {
  /** Common request/response header. */
  header: ResponseHeader | undefined;
}

function createBaseAddLogAnnotationRequest(): AddLogAnnotationRequest {
  return { header: undefined, annotations: undefined };
}

export const AddLogAnnotationRequest = {
  encode(
    message: AddLogAnnotationRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.annotations !== undefined) {
      LogAnnotations.encode(
        message.annotations,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AddLogAnnotationRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddLogAnnotationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.annotations = LogAnnotations.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddLogAnnotationRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      annotations: isSet(object.annotations)
        ? LogAnnotations.fromJSON(object.annotations)
        : undefined,
    };
  },

  toJSON(message: AddLogAnnotationRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.annotations !== undefined &&
      (obj.annotations = message.annotations
        ? LogAnnotations.toJSON(message.annotations)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddLogAnnotationRequest>, I>>(
    object: I
  ): AddLogAnnotationRequest {
    const message = createBaseAddLogAnnotationRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.annotations =
      object.annotations !== undefined && object.annotations !== null
        ? LogAnnotations.fromPartial(object.annotations)
        : undefined;
    return message;
  },
};

function createBaseLogAnnotations(): LogAnnotations {
  return { textMessages: [], operatorMessages: [], blobData: [] };
}

export const LogAnnotations = {
  encode(
    message: LogAnnotations,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.textMessages) {
      LogAnnotationTextMessage.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.operatorMessages) {
      LogAnnotationOperatorMessage.encode(
        v!,
        writer.uint32(18).fork()
      ).ldelim();
    }
    for (const v of message.blobData) {
      LogAnnotationLogBlob.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LogAnnotations {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLogAnnotations();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.textMessages.push(
            LogAnnotationTextMessage.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.operatorMessages.push(
            LogAnnotationOperatorMessage.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.blobData.push(
            LogAnnotationLogBlob.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LogAnnotations {
    return {
      textMessages: Array.isArray(object?.textMessages)
        ? object.textMessages.map((e: any) =>
            LogAnnotationTextMessage.fromJSON(e)
          )
        : [],
      operatorMessages: Array.isArray(object?.operatorMessages)
        ? object.operatorMessages.map((e: any) =>
            LogAnnotationOperatorMessage.fromJSON(e)
          )
        : [],
      blobData: Array.isArray(object?.blobData)
        ? object.blobData.map((e: any) => LogAnnotationLogBlob.fromJSON(e))
        : [],
    };
  },

  toJSON(message: LogAnnotations): unknown {
    const obj: any = {};
    if (message.textMessages) {
      obj.textMessages = message.textMessages.map((e) =>
        e ? LogAnnotationTextMessage.toJSON(e) : undefined
      );
    } else {
      obj.textMessages = [];
    }
    if (message.operatorMessages) {
      obj.operatorMessages = message.operatorMessages.map((e) =>
        e ? LogAnnotationOperatorMessage.toJSON(e) : undefined
      );
    } else {
      obj.operatorMessages = [];
    }
    if (message.blobData) {
      obj.blobData = message.blobData.map((e) =>
        e ? LogAnnotationLogBlob.toJSON(e) : undefined
      );
    } else {
      obj.blobData = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LogAnnotations>, I>>(
    object: I
  ): LogAnnotations {
    const message = createBaseLogAnnotations();
    message.textMessages =
      object.textMessages?.map((e) =>
        LogAnnotationTextMessage.fromPartial(e)
      ) || [];
    message.operatorMessages =
      object.operatorMessages?.map((e) =>
        LogAnnotationOperatorMessage.fromPartial(e)
      ) || [];
    message.blobData =
      object.blobData?.map((e) => LogAnnotationLogBlob.fromPartial(e)) || [];
    return message;
  },
};

function createBaseLogAnnotationTextMessage(): LogAnnotationTextMessage {
  return {
    message: "",
    timestamp: undefined,
    service: "",
    level: 0,
    tag: "",
    filename: "",
    lineNumber: 0,
    timestampClient: undefined,
  };
}

export const LogAnnotationTextMessage = {
  encode(
    message: LogAnnotationTextMessage,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestamp),
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.service !== "") {
      writer.uint32(26).string(message.service);
    }
    if (message.level !== 0) {
      writer.uint32(32).int32(message.level);
    }
    if (message.tag !== "") {
      writer.uint32(42).string(message.tag);
    }
    if (message.filename !== "") {
      writer.uint32(50).string(message.filename);
    }
    if (message.lineNumber !== 0) {
      writer.uint32(56).int32(message.lineNumber);
    }
    if (message.timestampClient !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestampClient),
        writer.uint32(66).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): LogAnnotationTextMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLogAnnotationTextMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.message = reader.string();
          break;
        case 2:
          message.timestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.service = reader.string();
          break;
        case 4:
          message.level = reader.int32() as any;
          break;
        case 5:
          message.tag = reader.string();
          break;
        case 6:
          message.filename = reader.string();
          break;
        case 7:
          message.lineNumber = reader.int32();
          break;
        case 8:
          message.timestampClient = fromTimestamp(
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

  fromJSON(object: any): LogAnnotationTextMessage {
    return {
      message: isSet(object.message) ? String(object.message) : "",
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
      service: isSet(object.service) ? String(object.service) : "",
      level: isSet(object.level)
        ? logAnnotationTextMessage_LevelFromJSON(object.level)
        : 0,
      tag: isSet(object.tag) ? String(object.tag) : "",
      filename: isSet(object.filename) ? String(object.filename) : "",
      lineNumber: isSet(object.lineNumber) ? Number(object.lineNumber) : 0,
      timestampClient: isSet(object.timestampClient)
        ? fromJsonTimestamp(object.timestampClient)
        : undefined,
    };
  },

  toJSON(message: LogAnnotationTextMessage): unknown {
    const obj: any = {};
    message.message !== undefined && (obj.message = message.message);
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp.toISOString());
    message.service !== undefined && (obj.service = message.service);
    message.level !== undefined &&
      (obj.level = logAnnotationTextMessage_LevelToJSON(message.level));
    message.tag !== undefined && (obj.tag = message.tag);
    message.filename !== undefined && (obj.filename = message.filename);
    message.lineNumber !== undefined &&
      (obj.lineNumber = Math.round(message.lineNumber));
    message.timestampClient !== undefined &&
      (obj.timestampClient = message.timestampClient.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LogAnnotationTextMessage>, I>>(
    object: I
  ): LogAnnotationTextMessage {
    const message = createBaseLogAnnotationTextMessage();
    message.message = object.message ?? "";
    message.timestamp = object.timestamp ?? undefined;
    message.service = object.service ?? "";
    message.level = object.level ?? 0;
    message.tag = object.tag ?? "";
    message.filename = object.filename ?? "";
    message.lineNumber = object.lineNumber ?? 0;
    message.timestampClient = object.timestampClient ?? undefined;
    return message;
  },
};

function createBaseLogAnnotationOperatorMessage(): LogAnnotationOperatorMessage {
  return { message: "", timestamp: undefined, timestampClient: undefined };
}

export const LogAnnotationOperatorMessage = {
  encode(
    message: LogAnnotationOperatorMessage,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestamp),
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.timestampClient !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestampClient),
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): LogAnnotationOperatorMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLogAnnotationOperatorMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.message = reader.string();
          break;
        case 2:
          message.timestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.timestampClient = fromTimestamp(
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

  fromJSON(object: any): LogAnnotationOperatorMessage {
    return {
      message: isSet(object.message) ? String(object.message) : "",
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
      timestampClient: isSet(object.timestampClient)
        ? fromJsonTimestamp(object.timestampClient)
        : undefined,
    };
  },

  toJSON(message: LogAnnotationOperatorMessage): unknown {
    const obj: any = {};
    message.message !== undefined && (obj.message = message.message);
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp.toISOString());
    message.timestampClient !== undefined &&
      (obj.timestampClient = message.timestampClient.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LogAnnotationOperatorMessage>, I>>(
    object: I
  ): LogAnnotationOperatorMessage {
    const message = createBaseLogAnnotationOperatorMessage();
    message.message = object.message ?? "";
    message.timestamp = object.timestamp ?? undefined;
    message.timestampClient = object.timestampClient ?? undefined;
    return message;
  },
};

function createBaseLogAnnotationLogBlob(): LogAnnotationLogBlob {
  return {
    timestamp: undefined,
    channel: "",
    typeId: "",
    data: new Uint8Array(),
    timestampClient: undefined,
  };
}

export const LogAnnotationLogBlob = {
  encode(
    message: LogAnnotationLogBlob,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.timestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestamp),
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.channel !== "") {
      writer.uint32(18).string(message.channel);
    }
    if (message.typeId !== "") {
      writer.uint32(26).string(message.typeId);
    }
    if (message.data.length !== 0) {
      writer.uint32(34).bytes(message.data);
    }
    if (message.timestampClient !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestampClient),
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): LogAnnotationLogBlob {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLogAnnotationLogBlob();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.channel = reader.string();
          break;
        case 3:
          message.typeId = reader.string();
          break;
        case 4:
          message.data = reader.bytes();
          break;
        case 5:
          message.timestampClient = fromTimestamp(
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

  fromJSON(object: any): LogAnnotationLogBlob {
    return {
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
      channel: isSet(object.channel) ? String(object.channel) : "",
      typeId: isSet(object.typeId) ? String(object.typeId) : "",
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
      timestampClient: isSet(object.timestampClient)
        ? fromJsonTimestamp(object.timestampClient)
        : undefined,
    };
  },

  toJSON(message: LogAnnotationLogBlob): unknown {
    const obj: any = {};
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp.toISOString());
    message.channel !== undefined && (obj.channel = message.channel);
    message.typeId !== undefined && (obj.typeId = message.typeId);
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array()
      ));
    message.timestampClient !== undefined &&
      (obj.timestampClient = message.timestampClient.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LogAnnotationLogBlob>, I>>(
    object: I
  ): LogAnnotationLogBlob {
    const message = createBaseLogAnnotationLogBlob();
    message.timestamp = object.timestamp ?? undefined;
    message.channel = object.channel ?? "";
    message.typeId = object.typeId ?? "";
    message.data = object.data ?? new Uint8Array();
    message.timestampClient = object.timestampClient ?? undefined;
    return message;
  },
};

function createBaseAddLogAnnotationResponse(): AddLogAnnotationResponse {
  return { header: undefined };
}

export const AddLogAnnotationResponse = {
  encode(
    message: AddLogAnnotationResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AddLogAnnotationResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddLogAnnotationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddLogAnnotationResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: AddLogAnnotationResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddLogAnnotationResponse>, I>>(
    object: I
  ): AddLogAnnotationResponse {
    const message = createBaseAddLogAnnotationResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

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
