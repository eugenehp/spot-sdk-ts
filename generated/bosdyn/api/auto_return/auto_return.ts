/* eslint-disable */
import { Any } from "../../../google/protobuf/any";
import { Duration } from "../../../google/protobuf/duration";
import { RequestHeader, ResponseHeader } from "../header";
import { Lease } from "../lease";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api.auto_return";

/** Parameters to AutoReturn actions. */
export interface Params {
  /**
   * Robot-specific mobility parameters to use.
   * For example, see bosdyn.api.spot.MobilityParams.
   */
  mobilityParams: Any | undefined;
  /**
   * Allow AutoReturn to move the robot this far in the XY plane from the location where
   * AutoReturn started. Travel along the Z axis (which is gravity-aligned) does not count.
   * Must be > 0.
   */
  maxDisplacement: number;
  /**
   * Optionally specify the maximum amount of time AutoReturn can take.
   * If this duration is exceeded, AutoReturn will stop trying to move the robot.
   * Omit to try indefinitely. Robot may become stuck and never take other comms loss actions!
   */
  maxDuration: Duration | undefined;
}

/** Configure the AutoReturn system. */
export interface ConfigureRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /**
   * Leases that AutoReturn may use to accomplish its goals when AutoReturn automatically
   * triggers. If left empty, AutoReturn will not automatically trigger.
   */
  leases: Lease[];
  /** Parameters to use when AutoReturn automatically triggers. */
  params: Params | undefined;
  /**
   * Forget any buffered locations the robot may be remembering. Defaults to false.
   * Set to true if the robot has just crossed an area it should not traverse in AutoReturn.
   */
  clearBuffer: boolean;
}

/** Response to a configuration request. */
export interface ConfigureResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Return status for the request. */
  status: ConfigureResponse_Status;
  /** If status is STATUS_INVALID_PARAMS, this contains the settings that were invalid. */
  invalidParams: Params | undefined;
}

export enum ConfigureResponse_Status {
  STATUS_UNKNOWN = 0,
  STATUS_OK = 1,
  STATUS_INVALID_PARAMS = 2,
  UNRECOGNIZED = -1,
}

export function configureResponse_StatusFromJSON(
  object: any
): ConfigureResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return ConfigureResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return ConfigureResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_INVALID_PARAMS":
      return ConfigureResponse_Status.STATUS_INVALID_PARAMS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ConfigureResponse_Status.UNRECOGNIZED;
  }
}

export function configureResponse_StatusToJSON(
  object: ConfigureResponse_Status
): string {
  switch (object) {
    case ConfigureResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case ConfigureResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case ConfigureResponse_Status.STATUS_INVALID_PARAMS:
      return "STATUS_INVALID_PARAMS";
    case ConfigureResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Ask for the current configuration. */
export interface GetConfigurationRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/** Response to a "get configuration" request. */
export interface GetConfigurationResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** A simple yes/no, will AutoReturn automatically trigger. */
  enabled: boolean;
  /**
   * The most recent successful ConfigureRequest.
   * Will be empty if service has not successfully been configured.
   */
  request: ConfigureRequest | undefined;
}

/** Start AutoReturn behavior now. */
export interface StartRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

export interface StartResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
}

function createBaseParams(): Params {
  return {
    mobilityParams: undefined,
    maxDisplacement: 0,
    maxDuration: undefined,
  };
}

export const Params = {
  encode(
    message: Params,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.mobilityParams !== undefined) {
      Any.encode(message.mobilityParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.maxDisplacement !== 0) {
      writer.uint32(21).float(message.maxDisplacement);
    }
    if (message.maxDuration !== undefined) {
      Duration.encode(message.maxDuration, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.mobilityParams = Any.decode(reader, reader.uint32());
          break;
        case 2:
          message.maxDisplacement = reader.float();
          break;
        case 3:
          message.maxDuration = Duration.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      mobilityParams: isSet(object.mobilityParams)
        ? Any.fromJSON(object.mobilityParams)
        : undefined,
      maxDisplacement: isSet(object.maxDisplacement)
        ? Number(object.maxDisplacement)
        : 0,
      maxDuration: isSet(object.maxDuration)
        ? Duration.fromJSON(object.maxDuration)
        : undefined,
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.mobilityParams !== undefined &&
      (obj.mobilityParams = message.mobilityParams
        ? Any.toJSON(message.mobilityParams)
        : undefined);
    message.maxDisplacement !== undefined &&
      (obj.maxDisplacement = message.maxDisplacement);
    message.maxDuration !== undefined &&
      (obj.maxDuration = message.maxDuration
        ? Duration.toJSON(message.maxDuration)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.mobilityParams =
      object.mobilityParams !== undefined && object.mobilityParams !== null
        ? Any.fromPartial(object.mobilityParams)
        : undefined;
    message.maxDisplacement = object.maxDisplacement ?? 0;
    message.maxDuration =
      object.maxDuration !== undefined && object.maxDuration !== null
        ? Duration.fromPartial(object.maxDuration)
        : undefined;
    return message;
  },
};

function createBaseConfigureRequest(): ConfigureRequest {
  return {
    header: undefined,
    leases: [],
    params: undefined,
    clearBuffer: false,
  };
}

export const ConfigureRequest = {
  encode(
    message: ConfigureRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.leases) {
      Lease.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(26).fork()).ldelim();
    }
    if (message.clearBuffer === true) {
      writer.uint32(32).bool(message.clearBuffer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConfigureRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConfigureRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.leases.push(Lease.decode(reader, reader.uint32()));
          break;
        case 3:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 4:
          message.clearBuffer = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ConfigureRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      leases: Array.isArray(object?.leases)
        ? object.leases.map((e: any) => Lease.fromJSON(e))
        : [],
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      clearBuffer: isSet(object.clearBuffer)
        ? Boolean(object.clearBuffer)
        : false,
    };
  },

  toJSON(message: ConfigureRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    if (message.leases) {
      obj.leases = message.leases.map((e) => (e ? Lease.toJSON(e) : undefined));
    } else {
      obj.leases = [];
    }
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    message.clearBuffer !== undefined &&
      (obj.clearBuffer = message.clearBuffer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ConfigureRequest>, I>>(
    object: I
  ): ConfigureRequest {
    const message = createBaseConfigureRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.leases = object.leases?.map((e) => Lease.fromPartial(e)) || [];
    message.params =
      object.params !== undefined && object.params !== null
        ? Params.fromPartial(object.params)
        : undefined;
    message.clearBuffer = object.clearBuffer ?? false;
    return message;
  },
};

function createBaseConfigureResponse(): ConfigureResponse {
  return { header: undefined, status: 0, invalidParams: undefined };
}

export const ConfigureResponse = {
  encode(
    message: ConfigureResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.invalidParams !== undefined) {
      Params.encode(message.invalidParams, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConfigureResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConfigureResponse();
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
          message.invalidParams = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ConfigureResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? configureResponse_StatusFromJSON(object.status)
        : 0,
      invalidParams: isSet(object.invalidParams)
        ? Params.fromJSON(object.invalidParams)
        : undefined,
    };
  },

  toJSON(message: ConfigureResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = configureResponse_StatusToJSON(message.status));
    message.invalidParams !== undefined &&
      (obj.invalidParams = message.invalidParams
        ? Params.toJSON(message.invalidParams)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ConfigureResponse>, I>>(
    object: I
  ): ConfigureResponse {
    const message = createBaseConfigureResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    message.invalidParams =
      object.invalidParams !== undefined && object.invalidParams !== null
        ? Params.fromPartial(object.invalidParams)
        : undefined;
    return message;
  },
};

function createBaseGetConfigurationRequest(): GetConfigurationRequest {
  return { header: undefined };
}

export const GetConfigurationRequest = {
  encode(
    message: GetConfigurationRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetConfigurationRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetConfigurationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetConfigurationRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: GetConfigurationRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetConfigurationRequest>, I>>(
    object: I
  ): GetConfigurationRequest {
    const message = createBaseGetConfigurationRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseGetConfigurationResponse(): GetConfigurationResponse {
  return { header: undefined, enabled: false, request: undefined };
}

export const GetConfigurationResponse = {
  encode(
    message: GetConfigurationResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.enabled === true) {
      writer.uint32(16).bool(message.enabled);
    }
    if (message.request !== undefined) {
      ConfigureRequest.encode(
        message.request,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetConfigurationResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetConfigurationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.enabled = reader.bool();
          break;
        case 3:
          message.request = ConfigureRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetConfigurationResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      enabled: isSet(object.enabled) ? Boolean(object.enabled) : false,
      request: isSet(object.request)
        ? ConfigureRequest.fromJSON(object.request)
        : undefined,
    };
  },

  toJSON(message: GetConfigurationResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.enabled !== undefined && (obj.enabled = message.enabled);
    message.request !== undefined &&
      (obj.request = message.request
        ? ConfigureRequest.toJSON(message.request)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetConfigurationResponse>, I>>(
    object: I
  ): GetConfigurationResponse {
    const message = createBaseGetConfigurationResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.enabled = object.enabled ?? false;
    message.request =
      object.request !== undefined && object.request !== null
        ? ConfigureRequest.fromPartial(object.request)
        : undefined;
    return message;
  },
};

function createBaseStartRequest(): StartRequest {
  return { header: undefined };
}

export const StartRequest = {
  encode(
    message: StartRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StartRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStartRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StartRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: StartRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StartRequest>, I>>(
    object: I
  ): StartRequest {
    const message = createBaseStartRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseStartResponse(): StartResponse {
  return { header: undefined };
}

export const StartResponse = {
  encode(
    message: StartResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StartResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStartResponse();
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

  fromJSON(object: any): StartResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: StartResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StartResponse>, I>>(
    object: I
  ): StartResponse {
    const message = createBaseStartResponse();
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
