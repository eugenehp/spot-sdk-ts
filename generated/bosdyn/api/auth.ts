/* eslint-disable */
import { RequestHeader, ResponseHeader } from "./header";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/** The GetAuthToken request message includes login information for the robot. */
export interface GetAuthTokenRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Username to authenticate with. Must be set if password is set. */
  username: string;
  /** Password to authenticate with. Not neccessary if token is set. */
  password: string;
  /** Token to authenticate with. Can be used in place of the password, to re-mint a token. */
  token: string;
  /**
   * Deprecated as of 2.0.1. Application Token for authenticating with robots on older releases.
   *
   * @deprecated
   */
  applicationToken: string;
}

/**
 * The GetAuthToken response message includes an authentication token if the login information
 * is correct and succeeds.
 */
export interface GetAuthTokenResponse {
  header: ResponseHeader | undefined;
  /** The status of the grpc GetAuthToken request. */
  status: GetAuthTokenResponse_Status;
  /** Token data. Only specified if status == STATUS_OK. */
  token: string;
}

export enum GetAuthTokenResponse_Status {
  /** STATUS_UNKNOWN - STATUS_UNKNOWN should never be used. If used, an internal error has happend. */
  STATUS_UNKNOWN = 0,
  /**
   * STATUS_OK - STATUS_OK indicates that authentication has succeeded. The 'token' field field will
   * be populated with a session token that can be used to authenticate the user.
   */
  STATUS_OK = 1,
  /**
   * STATUS_INVALID_LOGIN - STATUS_INVALID_LOGIN indicates that authentication has failed since an invalid
   * username and/or password were provided.
   */
  STATUS_INVALID_LOGIN = 2,
  /**
   * STATUS_INVALID_TOKEN - STATUS_INVALID_TOKEN indicates that authentication has failed since the 'token'
   * provided in the request is invalid. Reasons for the token being invalid could be
   * because it has expired, because it is improperly formed, for the wrong robot, the
   * user that the token is for has changed a password, or many other reasons. Clients
   * should use username/password-based authentication when refreshing the token fails.
   */
  STATUS_INVALID_TOKEN = 3,
  /**
   * STATUS_TEMPORARILY_LOCKED_OUT - STATUS_TEMPORARILY_LOCKED_OUT indicates that authentication has failed since
   * authentication for the user is temporarily locked out due to too many unsuccessful
   * attempts. Any new authentication attempts should be delayed so they may happen after
   * the lock out period ends.
   */
  STATUS_TEMPORARILY_LOCKED_OUT = 4,
  /**
   * STATUS_INVALID_APPLICATION_TOKEN - STATUS_INVALID_APPLICATION_TOKEN indicates that the 'application_token' field in the
   * request was invalid.
   */
  STATUS_INVALID_APPLICATION_TOKEN = 5,
  /**
   * STATUS_EXPIRED_APPLICATION_TOKEN - STATUS_EXPIRED_APPLICATION_TOKEN indicates that the 'application_token' field in the
   * request was valid, but has expired.
   */
  STATUS_EXPIRED_APPLICATION_TOKEN = 6,
  UNRECOGNIZED = -1,
}

export function getAuthTokenResponse_StatusFromJSON(
  object: any
): GetAuthTokenResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return GetAuthTokenResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return GetAuthTokenResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_INVALID_LOGIN":
      return GetAuthTokenResponse_Status.STATUS_INVALID_LOGIN;
    case 3:
    case "STATUS_INVALID_TOKEN":
      return GetAuthTokenResponse_Status.STATUS_INVALID_TOKEN;
    case 4:
    case "STATUS_TEMPORARILY_LOCKED_OUT":
      return GetAuthTokenResponse_Status.STATUS_TEMPORARILY_LOCKED_OUT;
    case 5:
    case "STATUS_INVALID_APPLICATION_TOKEN":
      return GetAuthTokenResponse_Status.STATUS_INVALID_APPLICATION_TOKEN;
    case 6:
    case "STATUS_EXPIRED_APPLICATION_TOKEN":
      return GetAuthTokenResponse_Status.STATUS_EXPIRED_APPLICATION_TOKEN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GetAuthTokenResponse_Status.UNRECOGNIZED;
  }
}

export function getAuthTokenResponse_StatusToJSON(
  object: GetAuthTokenResponse_Status
): string {
  switch (object) {
    case GetAuthTokenResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case GetAuthTokenResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case GetAuthTokenResponse_Status.STATUS_INVALID_LOGIN:
      return "STATUS_INVALID_LOGIN";
    case GetAuthTokenResponse_Status.STATUS_INVALID_TOKEN:
      return "STATUS_INVALID_TOKEN";
    case GetAuthTokenResponse_Status.STATUS_TEMPORARILY_LOCKED_OUT:
      return "STATUS_TEMPORARILY_LOCKED_OUT";
    case GetAuthTokenResponse_Status.STATUS_INVALID_APPLICATION_TOKEN:
      return "STATUS_INVALID_APPLICATION_TOKEN";
    case GetAuthTokenResponse_Status.STATUS_EXPIRED_APPLICATION_TOKEN:
      return "STATUS_EXPIRED_APPLICATION_TOKEN";
    case GetAuthTokenResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseGetAuthTokenRequest(): GetAuthTokenRequest {
  return {
    header: undefined,
    username: "",
    password: "",
    token: "",
    applicationToken: "",
  };
}

export const GetAuthTokenRequest = {
  encode(
    message: GetAuthTokenRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.username !== "") {
      writer.uint32(18).string(message.username);
    }
    if (message.password !== "") {
      writer.uint32(26).string(message.password);
    }
    if (message.token !== "") {
      writer.uint32(34).string(message.token);
    }
    if (message.applicationToken !== "") {
      writer.uint32(42).string(message.applicationToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAuthTokenRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAuthTokenRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.username = reader.string();
          break;
        case 3:
          message.password = reader.string();
          break;
        case 4:
          message.token = reader.string();
          break;
        case 5:
          message.applicationToken = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetAuthTokenRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      username: isSet(object.username) ? String(object.username) : "",
      password: isSet(object.password) ? String(object.password) : "",
      token: isSet(object.token) ? String(object.token) : "",
      applicationToken: isSet(object.applicationToken)
        ? String(object.applicationToken)
        : "",
    };
  },

  toJSON(message: GetAuthTokenRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.username !== undefined && (obj.username = message.username);
    message.password !== undefined && (obj.password = message.password);
    message.token !== undefined && (obj.token = message.token);
    message.applicationToken !== undefined &&
      (obj.applicationToken = message.applicationToken);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetAuthTokenRequest>, I>>(
    object: I
  ): GetAuthTokenRequest {
    const message = createBaseGetAuthTokenRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.username = object.username ?? "";
    message.password = object.password ?? "";
    message.token = object.token ?? "";
    message.applicationToken = object.applicationToken ?? "";
    return message;
  },
};

function createBaseGetAuthTokenResponse(): GetAuthTokenResponse {
  return { header: undefined, status: 0, token: "" };
}

export const GetAuthTokenResponse = {
  encode(
    message: GetAuthTokenResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.token !== "") {
      writer.uint32(26).string(message.token);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetAuthTokenResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAuthTokenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        case 3:
          message.token = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetAuthTokenResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? getAuthTokenResponse_StatusFromJSON(object.status)
        : 0,
      token: isSet(object.token) ? String(object.token) : "",
    };
  },

  toJSON(message: GetAuthTokenResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = getAuthTokenResponse_StatusToJSON(message.status));
    message.token !== undefined && (obj.token = message.token);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetAuthTokenResponse>, I>>(
    object: I
  ): GetAuthTokenResponse {
    const message = createBaseGetAuthTokenResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    message.token = object.token ?? "";
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
