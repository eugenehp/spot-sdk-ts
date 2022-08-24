/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp";
import { Any } from "../../google/protobuf/any";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/** Standard header attached to all GRPC requests to services. */
export interface RequestHeader {
  /** Time that the request was sent, as measured by the client's local system clock. */
  requestTimestamp: Date | undefined;
  /**
   * Name of the client to identify itself. The name will typically include a
   * symbolic string to identify the program, and a unique integer to identify
   * the specific instance of the process running.
   */
  clientName: string;
  /**
   * If Set to true, request that request and response messages for this call are not recorded
   * in the GRPC log.
   */
  disableRpcLogging: boolean;
}

/**
 * General error code are returned in the header to facilitate error-handling which is not
 * message-specific.
 * This can be used for generic error handlers, aggregation, and trend analysis.
 */
export interface CommonError {
  /** The different error codes that can be returned on a grpc response message. */
  code: CommonError_Code;
  /** Human-readable error description.  Not for programmatic analysis. */
  message: string;
  /** Extra information that can optionally be provided for generic error handling/analysis. */
  data: Any | undefined;
}

export enum CommonError_Code {
  /** CODE_UNSPECIFIED - Code is not specified. */
  CODE_UNSPECIFIED = 0,
  /** CODE_OK - Not an error.  Request was successful. */
  CODE_OK = 1,
  /** CODE_INTERNAL_SERVER_ERROR - Service experienced an unexpected error state. */
  CODE_INTERNAL_SERVER_ERROR = 2,
  /** CODE_INVALID_REQUEST - Ill-formed request.  Request arguments were not valid. */
  CODE_INVALID_REQUEST = 3,
  UNRECOGNIZED = -1,
}

export function commonError_CodeFromJSON(object: any): CommonError_Code {
  switch (object) {
    case 0:
    case "CODE_UNSPECIFIED":
      return CommonError_Code.CODE_UNSPECIFIED;
    case 1:
    case "CODE_OK":
      return CommonError_Code.CODE_OK;
    case 2:
    case "CODE_INTERNAL_SERVER_ERROR":
      return CommonError_Code.CODE_INTERNAL_SERVER_ERROR;
    case 3:
    case "CODE_INVALID_REQUEST":
      return CommonError_Code.CODE_INVALID_REQUEST;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CommonError_Code.UNRECOGNIZED;
  }
}

export function commonError_CodeToJSON(object: CommonError_Code): string {
  switch (object) {
    case CommonError_Code.CODE_UNSPECIFIED:
      return "CODE_UNSPECIFIED";
    case CommonError_Code.CODE_OK:
      return "CODE_OK";
    case CommonError_Code.CODE_INTERNAL_SERVER_ERROR:
      return "CODE_INTERNAL_SERVER_ERROR";
    case CommonError_Code.CODE_INVALID_REQUEST:
      return "CODE_INVALID_REQUEST";
    case CommonError_Code.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Standard header attached to all GRPC responses from services. */
export interface ResponseHeader {
  /** Echo-back the RequestHeader for timing information, etc.... */
  requestHeader: RequestHeader | undefined;
  /** Time that the request was received. The server clock is the time basis. */
  requestReceivedTimestamp: Date | undefined;
  /** Time that the response was received. The server clock is the time basis. */
  responseTimestamp: Date | undefined;
  /**
   * Common errors, such as invalid input or internal server problems.
   * If there is a common error, the rest of the response message outside of the
   * ResponseHeader will be invalid.
   */
  error: CommonError | undefined;
  /**
   * Echoed request message. In some cases it may not be present, or it may be a stripped
   * down representation of the request.
   */
  request: Any | undefined;
}

function createBaseRequestHeader(): RequestHeader {
  return {
    requestTimestamp: undefined,
    clientName: "",
    disableRpcLogging: false,
  };
}

export const RequestHeader = {
  encode(
    message: RequestHeader,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requestTimestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.requestTimestamp),
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.clientName !== "") {
      writer.uint32(18).string(message.clientName);
    }
    if (message.disableRpcLogging === true) {
      writer.uint32(24).bool(message.disableRpcLogging);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestHeader {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestHeader();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestTimestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.clientName = reader.string();
          break;
        case 3:
          message.disableRpcLogging = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RequestHeader {
    return {
      requestTimestamp: isSet(object.requestTimestamp)
        ? fromJsonTimestamp(object.requestTimestamp)
        : undefined,
      clientName: isSet(object.clientName) ? String(object.clientName) : "",
      disableRpcLogging: isSet(object.disableRpcLogging)
        ? Boolean(object.disableRpcLogging)
        : false,
    };
  },

  toJSON(message: RequestHeader): unknown {
    const obj: any = {};
    message.requestTimestamp !== undefined &&
      (obj.requestTimestamp = message.requestTimestamp.toISOString());
    message.clientName !== undefined && (obj.clientName = message.clientName);
    message.disableRpcLogging !== undefined &&
      (obj.disableRpcLogging = message.disableRpcLogging);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RequestHeader>, I>>(
    object: I
  ): RequestHeader {
    const message = createBaseRequestHeader();
    message.requestTimestamp = object.requestTimestamp ?? undefined;
    message.clientName = object.clientName ?? "";
    message.disableRpcLogging = object.disableRpcLogging ?? false;
    return message;
  },
};

function createBaseCommonError(): CommonError {
  return { code: 0, message: "", data: undefined };
}

export const CommonError = {
  encode(
    message: CommonError,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.data !== undefined) {
      Any.encode(message.data, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommonError {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommonError();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.code = reader.int32() as any;
          break;
        case 2:
          message.message = reader.string();
          break;
        case 3:
          message.data = Any.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommonError {
    return {
      code: isSet(object.code) ? commonError_CodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? String(object.message) : "",
      data: isSet(object.data) ? Any.fromJSON(object.data) : undefined,
    };
  },

  toJSON(message: CommonError): unknown {
    const obj: any = {};
    message.code !== undefined &&
      (obj.code = commonError_CodeToJSON(message.code));
    message.message !== undefined && (obj.message = message.message);
    message.data !== undefined &&
      (obj.data = message.data ? Any.toJSON(message.data) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommonError>, I>>(
    object: I
  ): CommonError {
    const message = createBaseCommonError();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    message.data =
      object.data !== undefined && object.data !== null
        ? Any.fromPartial(object.data)
        : undefined;
    return message;
  },
};

function createBaseResponseHeader(): ResponseHeader {
  return {
    requestHeader: undefined,
    requestReceivedTimestamp: undefined,
    responseTimestamp: undefined,
    error: undefined,
    request: undefined,
  };
}

export const ResponseHeader = {
  encode(
    message: ResponseHeader,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requestHeader !== undefined) {
      RequestHeader.encode(
        message.requestHeader,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.requestReceivedTimestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.requestReceivedTimestamp),
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.responseTimestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.responseTimestamp),
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.error !== undefined) {
      CommonError.encode(message.error, writer.uint32(34).fork()).ldelim();
    }
    if (message.request !== undefined) {
      Any.encode(message.request, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseHeader {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseHeader();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestHeader = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.requestReceivedTimestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.responseTimestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.error = CommonError.decode(reader, reader.uint32());
          break;
        case 5:
          message.request = Any.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponseHeader {
    return {
      requestHeader: isSet(object.requestHeader)
        ? RequestHeader.fromJSON(object.requestHeader)
        : undefined,
      requestReceivedTimestamp: isSet(object.requestReceivedTimestamp)
        ? fromJsonTimestamp(object.requestReceivedTimestamp)
        : undefined,
      responseTimestamp: isSet(object.responseTimestamp)
        ? fromJsonTimestamp(object.responseTimestamp)
        : undefined,
      error: isSet(object.error)
        ? CommonError.fromJSON(object.error)
        : undefined,
      request: isSet(object.request) ? Any.fromJSON(object.request) : undefined,
    };
  },

  toJSON(message: ResponseHeader): unknown {
    const obj: any = {};
    message.requestHeader !== undefined &&
      (obj.requestHeader = message.requestHeader
        ? RequestHeader.toJSON(message.requestHeader)
        : undefined);
    message.requestReceivedTimestamp !== undefined &&
      (obj.requestReceivedTimestamp =
        message.requestReceivedTimestamp.toISOString());
    message.responseTimestamp !== undefined &&
      (obj.responseTimestamp = message.responseTimestamp.toISOString());
    message.error !== undefined &&
      (obj.error = message.error
        ? CommonError.toJSON(message.error)
        : undefined);
    message.request !== undefined &&
      (obj.request = message.request ? Any.toJSON(message.request) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ResponseHeader>, I>>(
    object: I
  ): ResponseHeader {
    const message = createBaseResponseHeader();
    message.requestHeader =
      object.requestHeader !== undefined && object.requestHeader !== null
        ? RequestHeader.fromPartial(object.requestHeader)
        : undefined;
    message.requestReceivedTimestamp =
      object.requestReceivedTimestamp ?? undefined;
    message.responseTimestamp = object.responseTimestamp ?? undefined;
    message.error =
      object.error !== undefined && object.error !== null
        ? CommonError.fromPartial(object.error)
        : undefined;
    message.request =
      object.request !== undefined && object.request !== null
        ? Any.fromPartial(object.request)
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
