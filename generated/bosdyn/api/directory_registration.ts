/* eslint-disable */
import { RequestHeader, ResponseHeader } from "./header";
import { Endpoint, ServiceEntry } from "./directory";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/**
 * The RegisterService request message sends the service's entry and endpoint to the robot's directory.
 * This Request serves as a heartbeat to the Directory.
 */
export interface RegisterServiceRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** The endpoint at which this service may be contacted. */
  endpoint: Endpoint | undefined;
  /** The service to create. The name must not match any existing service. */
  serviceEntry: ServiceEntry | undefined;
}

/** The RegisterService response message has information of whether the service was registered correctly. */
export interface RegisterServiceResponse {
  /** Common response Header. */
  header: ResponseHeader | undefined;
  /** Return status for the request. */
  status: RegisterServiceResponse_Status;
}

export enum RegisterServiceResponse_Status {
  /** STATUS_UNKNOWN - UNKNOWN should never be used. An internal DirectoryRegistrationService issue has happened if UNKNOWN is set. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Success. The new service record is available. */
  STATUS_OK = 1,
  /** STATUS_ALREADY_EXISTS - RegisterService failed because a service with this name already exists. */
  STATUS_ALREADY_EXISTS = 2,
  UNRECOGNIZED = -1,
}

export function registerServiceResponse_StatusFromJSON(
  object: any
): RegisterServiceResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return RegisterServiceResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return RegisterServiceResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_ALREADY_EXISTS":
      return RegisterServiceResponse_Status.STATUS_ALREADY_EXISTS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RegisterServiceResponse_Status.UNRECOGNIZED;
  }
}

export function registerServiceResponse_StatusToJSON(
  object: RegisterServiceResponse_Status
): string {
  switch (object) {
    case RegisterServiceResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case RegisterServiceResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case RegisterServiceResponse_Status.STATUS_ALREADY_EXISTS:
      return "STATUS_ALREADY_EXISTS";
    case RegisterServiceResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** The UnregisterService request message will unregister a service based on name. */
export interface UnregisterServiceRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** The unique user-friendly name of the service. */
  serviceName: string;
}

/** The UnregisterService response message has information of whether the service was unregistered. */
export interface UnregisterServiceResponse {
  /** Common response Header. */
  header: ResponseHeader | undefined;
  /** Return status for the request. */
  status: UnregisterServiceResponse_Status;
}

export enum UnregisterServiceResponse_Status {
  /**
   * STATUS_UNKNOWN - UNKNOWN should never be used. An internal DirectoryRegistrationService issue has
   * happened if UNKNOWN is set.
   */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Success.  The service record was deleted. */
  STATUS_OK = 1,
  /** STATUS_NONEXISTENT_SERVICE - The provided service name was not found. */
  STATUS_NONEXISTENT_SERVICE = 2,
  UNRECOGNIZED = -1,
}

export function unregisterServiceResponse_StatusFromJSON(
  object: any
): UnregisterServiceResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return UnregisterServiceResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return UnregisterServiceResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_NONEXISTENT_SERVICE":
      return UnregisterServiceResponse_Status.STATUS_NONEXISTENT_SERVICE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return UnregisterServiceResponse_Status.UNRECOGNIZED;
  }
}

export function unregisterServiceResponse_StatusToJSON(
  object: UnregisterServiceResponse_Status
): string {
  switch (object) {
    case UnregisterServiceResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case UnregisterServiceResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case UnregisterServiceResponse_Status.STATUS_NONEXISTENT_SERVICE:
      return "STATUS_NONEXISTENT_SERVICE";
    case UnregisterServiceResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * The UpdateService request message will update a service based on name to include the new endpoint and service entry.
 * This Request serves as a heartbeat to the Directory.
 */
export interface UpdateServiceRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** The endpoint at which this service may be contacted. */
  endpoint: Endpoint | undefined;
  /** New record for service.  The name field is used as lookup key. */
  serviceEntry: ServiceEntry | undefined;
}

/** The UpdateService response message has information of whether the service was updated on robot. */
export interface UpdateServiceResponse {
  /** Common response Header. */
  header: ResponseHeader | undefined;
  /** Return status for the request. */
  status: UpdateServiceResponse_Status;
}

export enum UpdateServiceResponse_Status {
  /** STATUS_UNKNOWN - UNKNOWN should never be used. An internal DirectoryRegistrationService issue has happened if UNKNOWN is set. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Success.  The new service record is available. */
  STATUS_OK = 1,
  /** STATUS_NONEXISTENT_SERVICE - The provided service name was not found. */
  STATUS_NONEXISTENT_SERVICE = 2,
  UNRECOGNIZED = -1,
}

export function updateServiceResponse_StatusFromJSON(
  object: any
): UpdateServiceResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return UpdateServiceResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return UpdateServiceResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_NONEXISTENT_SERVICE":
      return UpdateServiceResponse_Status.STATUS_NONEXISTENT_SERVICE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return UpdateServiceResponse_Status.UNRECOGNIZED;
  }
}

export function updateServiceResponse_StatusToJSON(
  object: UpdateServiceResponse_Status
): string {
  switch (object) {
    case UpdateServiceResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case UpdateServiceResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case UpdateServiceResponse_Status.STATUS_NONEXISTENT_SERVICE:
      return "STATUS_NONEXISTENT_SERVICE";
    case UpdateServiceResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseRegisterServiceRequest(): RegisterServiceRequest {
  return { header: undefined, endpoint: undefined, serviceEntry: undefined };
}

export const RegisterServiceRequest = {
  encode(
    message: RegisterServiceRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.endpoint !== undefined) {
      Endpoint.encode(message.endpoint, writer.uint32(18).fork()).ldelim();
    }
    if (message.serviceEntry !== undefined) {
      ServiceEntry.encode(
        message.serviceEntry,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RegisterServiceRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterServiceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.endpoint = Endpoint.decode(reader, reader.uint32());
          break;
        case 3:
          message.serviceEntry = ServiceEntry.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegisterServiceRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      endpoint: isSet(object.endpoint)
        ? Endpoint.fromJSON(object.endpoint)
        : undefined,
      serviceEntry: isSet(object.serviceEntry)
        ? ServiceEntry.fromJSON(object.serviceEntry)
        : undefined,
    };
  },

  toJSON(message: RegisterServiceRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.endpoint !== undefined &&
      (obj.endpoint = message.endpoint
        ? Endpoint.toJSON(message.endpoint)
        : undefined);
    message.serviceEntry !== undefined &&
      (obj.serviceEntry = message.serviceEntry
        ? ServiceEntry.toJSON(message.serviceEntry)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RegisterServiceRequest>, I>>(
    object: I
  ): RegisterServiceRequest {
    const message = createBaseRegisterServiceRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.endpoint =
      object.endpoint !== undefined && object.endpoint !== null
        ? Endpoint.fromPartial(object.endpoint)
        : undefined;
    message.serviceEntry =
      object.serviceEntry !== undefined && object.serviceEntry !== null
        ? ServiceEntry.fromPartial(object.serviceEntry)
        : undefined;
    return message;
  },
};

function createBaseRegisterServiceResponse(): RegisterServiceResponse {
  return { header: undefined, status: 0 };
}

export const RegisterServiceResponse = {
  encode(
    message: RegisterServiceResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RegisterServiceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterServiceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegisterServiceResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? registerServiceResponse_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: RegisterServiceResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = registerServiceResponse_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RegisterServiceResponse>, I>>(
    object: I
  ): RegisterServiceResponse {
    const message = createBaseRegisterServiceResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseUnregisterServiceRequest(): UnregisterServiceRequest {
  return { header: undefined, serviceName: "" };
}

export const UnregisterServiceRequest = {
  encode(
    message: UnregisterServiceRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.serviceName !== "") {
      writer.uint32(18).string(message.serviceName);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UnregisterServiceRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnregisterServiceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.serviceName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UnregisterServiceRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      serviceName: isSet(object.serviceName) ? String(object.serviceName) : "",
    };
  },

  toJSON(message: UnregisterServiceRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.serviceName !== undefined &&
      (obj.serviceName = message.serviceName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UnregisterServiceRequest>, I>>(
    object: I
  ): UnregisterServiceRequest {
    const message = createBaseUnregisterServiceRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.serviceName = object.serviceName ?? "";
    return message;
  },
};

function createBaseUnregisterServiceResponse(): UnregisterServiceResponse {
  return { header: undefined, status: 0 };
}

export const UnregisterServiceResponse = {
  encode(
    message: UnregisterServiceResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UnregisterServiceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnregisterServiceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UnregisterServiceResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? unregisterServiceResponse_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: UnregisterServiceResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = unregisterServiceResponse_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UnregisterServiceResponse>, I>>(
    object: I
  ): UnregisterServiceResponse {
    const message = createBaseUnregisterServiceResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseUpdateServiceRequest(): UpdateServiceRequest {
  return { header: undefined, endpoint: undefined, serviceEntry: undefined };
}

export const UpdateServiceRequest = {
  encode(
    message: UpdateServiceRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.endpoint !== undefined) {
      Endpoint.encode(message.endpoint, writer.uint32(18).fork()).ldelim();
    }
    if (message.serviceEntry !== undefined) {
      ServiceEntry.encode(
        message.serviceEntry,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UpdateServiceRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateServiceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.endpoint = Endpoint.decode(reader, reader.uint32());
          break;
        case 3:
          message.serviceEntry = ServiceEntry.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateServiceRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      endpoint: isSet(object.endpoint)
        ? Endpoint.fromJSON(object.endpoint)
        : undefined,
      serviceEntry: isSet(object.serviceEntry)
        ? ServiceEntry.fromJSON(object.serviceEntry)
        : undefined,
    };
  },

  toJSON(message: UpdateServiceRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.endpoint !== undefined &&
      (obj.endpoint = message.endpoint
        ? Endpoint.toJSON(message.endpoint)
        : undefined);
    message.serviceEntry !== undefined &&
      (obj.serviceEntry = message.serviceEntry
        ? ServiceEntry.toJSON(message.serviceEntry)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdateServiceRequest>, I>>(
    object: I
  ): UpdateServiceRequest {
    const message = createBaseUpdateServiceRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.endpoint =
      object.endpoint !== undefined && object.endpoint !== null
        ? Endpoint.fromPartial(object.endpoint)
        : undefined;
    message.serviceEntry =
      object.serviceEntry !== undefined && object.serviceEntry !== null
        ? ServiceEntry.fromPartial(object.serviceEntry)
        : undefined;
    return message;
  },
};

function createBaseUpdateServiceResponse(): UpdateServiceResponse {
  return { header: undefined, status: 0 };
}

export const UpdateServiceResponse = {
  encode(
    message: UpdateServiceResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UpdateServiceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateServiceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateServiceResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? updateServiceResponse_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: UpdateServiceResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = updateServiceResponse_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdateServiceResponse>, I>>(
    object: I
  ): UpdateServiceResponse {
    const message = createBaseUpdateServiceResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
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
