/* eslint-disable */
import { RequestHeader, ResponseHeader } from "./header";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

export interface IREnableDisableRequest {
  /** /< Common request header. */
  header: RequestHeader | undefined;
  request: IREnableDisableRequest_Request;
}

export enum IREnableDisableRequest_Request {
  /** REQUEST_UNKNOWN - Unspecified value -- should not be used. */
  REQUEST_UNKNOWN = 0,
  /** REQUEST_OFF - Disable emissions. */
  REQUEST_OFF = 1,
  /** REQUEST_ON - Enable emissions. */
  REQUEST_ON = 2,
  UNRECOGNIZED = -1,
}

export function iREnableDisableRequest_RequestFromJSON(
  object: any
): IREnableDisableRequest_Request {
  switch (object) {
    case 0:
    case "REQUEST_UNKNOWN":
      return IREnableDisableRequest_Request.REQUEST_UNKNOWN;
    case 1:
    case "REQUEST_OFF":
      return IREnableDisableRequest_Request.REQUEST_OFF;
    case 2:
    case "REQUEST_ON":
      return IREnableDisableRequest_Request.REQUEST_ON;
    case -1:
    case "UNRECOGNIZED":
    default:
      return IREnableDisableRequest_Request.UNRECOGNIZED;
  }
}

export function iREnableDisableRequest_RequestToJSON(
  object: IREnableDisableRequest_Request
): string {
  switch (object) {
    case IREnableDisableRequest_Request.REQUEST_UNKNOWN:
      return "REQUEST_UNKNOWN";
    case IREnableDisableRequest_Request.REQUEST_OFF:
      return "REQUEST_OFF";
    case IREnableDisableRequest_Request.REQUEST_ON:
      return "REQUEST_ON";
    case IREnableDisableRequest_Request.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface IREnableDisableResponse {
  /** /< Common response header. */
  header: ResponseHeader | undefined;
}

function createBaseIREnableDisableRequest(): IREnableDisableRequest {
  return { header: undefined, request: 0 };
}

export const IREnableDisableRequest = {
  encode(
    message: IREnableDisableRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.request !== 0) {
      writer.uint32(16).int32(message.request);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): IREnableDisableRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIREnableDisableRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.request = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): IREnableDisableRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      request: isSet(object.request)
        ? iREnableDisableRequest_RequestFromJSON(object.request)
        : 0,
    };
  },

  toJSON(message: IREnableDisableRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.request !== undefined &&
      (obj.request = iREnableDisableRequest_RequestToJSON(message.request));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<IREnableDisableRequest>, I>>(
    object: I
  ): IREnableDisableRequest {
    const message = createBaseIREnableDisableRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.request = object.request ?? 0;
    return message;
  },
};

function createBaseIREnableDisableResponse(): IREnableDisableResponse {
  return { header: undefined };
}

export const IREnableDisableResponse = {
  encode(
    message: IREnableDisableResponse,
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
  ): IREnableDisableResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIREnableDisableResponse();
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

  fromJSON(object: any): IREnableDisableResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: IREnableDisableResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<IREnableDisableResponse>, I>>(
    object: I
  ): IREnableDisableResponse {
    const message = createBaseIREnableDisableResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
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
