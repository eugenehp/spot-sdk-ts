/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp";
import { RequestHeader, ResponseHeader } from "./header";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/**
 * A message representing a discoverable service.  By definition, all services
 * discoverable by this system are expected to be grpc "services" provided by
 * some server.
 */
export interface ServiceEntry {
  /** The unique user-friendly name of this service. */
  name: string;
  /**
   * The type of this service. Usually identifies the underlying implementation.
   * Does not have to be unique among all ServiceEntry objects.
   */
  type: string;
  /**
   * Information used to route to the desired Service. Can either be a full address
   * (aService.spot.robot) or just a DNS label that will be automatically converted to an
   * address (aService).
   */
  authority: string;
  /**
   * Last update time in robot timebase for this service record. This serves as the time of
   * the last heartbeat to the robot.
   */
  lastUpdate: Date | undefined;
  /**
   * If 'user_token_required' field is true, any requests to this service must contain
   * a user token for the machine.  Requests without a user token will result in a
   * 401. Most services will want to require a user_token, but ones like auth_service
   * do not.
   */
  userTokenRequired: boolean;
  /**
   * If 'permission_required' field is non-empty, any requests to this service must
   * have the same string in the "per" claim of the user token.
   */
  permissionRequired: string;
  /**
   * Number of seconds to wait between heartbeats before assuming service in no longer live
   * If unset (0) liveness checks will be disabled for this service.
   */
  livenessTimeoutSecs: number;
  /**
   * The GUID of the payload that this service was registered from. An empty string represents a
   * service that was registered via a client using standard user credentials or internal to the
   * robot. This value is set automatically based on the user token and cannot be set or updated
   * via the API, so it should not be populated by the client at registration time.
   */
  hostPayloadGuid: string;
}

/**
 * A message containing information that allows a client to identify a
 * given endpoint host using an ip and a port.
 */
export interface Endpoint {
  /** The IP address of the computer hosting this endpoint. */
  hostIp: string;
  /** The port number on which the endpoint is provided, between 0 and 65535. */
  port: number;
}

/** The GetServiceEntry request message sends the service name to the robot. */
export interface GetServiceEntryRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** The unique user-friendly name of the service. */
  serviceName: string;
}

/** The GetServiceEntry response message returns a ServiceEntry for the desired service name. */
export interface GetServiceEntryResponse {
  /** Common response Header. */
  header: ResponseHeader | undefined;
  /** Current status of the request. */
  status: GetServiceEntryResponse_Status;
  /** The record for the discovered service.  Only set if 'status' field == STATUS_OK. */
  serviceEntry: ServiceEntry | undefined;
}

export enum GetServiceEntryResponse_Status {
  /** STATUS_UNKNOWN - UNKNOWN should never be used. An internal DirectoryService issue has happened if UNKNOWN is set. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - GetService was successful. The service_entry field is filled out. */
  STATUS_OK = 1,
  /** STATUS_NONEXISTENT_SERVICE - GetService failed because the requested service name does not exist. */
  STATUS_NONEXISTENT_SERVICE = 2,
  UNRECOGNIZED = -1,
}

export function getServiceEntryResponse_StatusFromJSON(
  object: any
): GetServiceEntryResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return GetServiceEntryResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return GetServiceEntryResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_NONEXISTENT_SERVICE":
      return GetServiceEntryResponse_Status.STATUS_NONEXISTENT_SERVICE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GetServiceEntryResponse_Status.UNRECOGNIZED;
  }
}

export function getServiceEntryResponse_StatusToJSON(
  object: GetServiceEntryResponse_Status
): string {
  switch (object) {
    case GetServiceEntryResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case GetServiceEntryResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case GetServiceEntryResponse_Status.STATUS_NONEXISTENT_SERVICE:
      return "STATUS_NONEXISTENT_SERVICE";
    case GetServiceEntryResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** The ListServiceEntries request message will ask the robot for all services. */
export interface ListServiceEntriesRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/**
 * The ListServiceEntries response message returns all known services at the time the request
 * was recieved.
 */
export interface ListServiceEntriesResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** The resources managed by the LeaseService. */
  serviceEntries: ServiceEntry[];
}

function createBaseServiceEntry(): ServiceEntry {
  return {
    name: "",
    type: "",
    authority: "",
    lastUpdate: undefined,
    userTokenRequired: false,
    permissionRequired: "",
    livenessTimeoutSecs: 0,
    hostPayloadGuid: "",
  };
}

export const ServiceEntry = {
  encode(
    message: ServiceEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    if (message.authority !== "") {
      writer.uint32(26).string(message.authority);
    }
    if (message.lastUpdate !== undefined) {
      Timestamp.encode(
        toTimestamp(message.lastUpdate),
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.userTokenRequired === true) {
      writer.uint32(40).bool(message.userTokenRequired);
    }
    if (message.permissionRequired !== "") {
      writer.uint32(58).string(message.permissionRequired);
    }
    if (message.livenessTimeoutSecs !== 0) {
      writer.uint32(65).double(message.livenessTimeoutSecs);
    }
    if (message.hostPayloadGuid !== "") {
      writer.uint32(74).string(message.hostPayloadGuid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ServiceEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseServiceEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.type = reader.string();
          break;
        case 3:
          message.authority = reader.string();
          break;
        case 4:
          message.lastUpdate = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 5:
          message.userTokenRequired = reader.bool();
          break;
        case 7:
          message.permissionRequired = reader.string();
          break;
        case 8:
          message.livenessTimeoutSecs = reader.double();
          break;
        case 9:
          message.hostPayloadGuid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ServiceEntry {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      type: isSet(object.type) ? String(object.type) : "",
      authority: isSet(object.authority) ? String(object.authority) : "",
      lastUpdate: isSet(object.lastUpdate)
        ? fromJsonTimestamp(object.lastUpdate)
        : undefined,
      userTokenRequired: isSet(object.userTokenRequired)
        ? Boolean(object.userTokenRequired)
        : false,
      permissionRequired: isSet(object.permissionRequired)
        ? String(object.permissionRequired)
        : "",
      livenessTimeoutSecs: isSet(object.livenessTimeoutSecs)
        ? Number(object.livenessTimeoutSecs)
        : 0,
      hostPayloadGuid: isSet(object.hostPayloadGuid)
        ? String(object.hostPayloadGuid)
        : "",
    };
  },

  toJSON(message: ServiceEntry): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.type !== undefined && (obj.type = message.type);
    message.authority !== undefined && (obj.authority = message.authority);
    message.lastUpdate !== undefined &&
      (obj.lastUpdate = message.lastUpdate.toISOString());
    message.userTokenRequired !== undefined &&
      (obj.userTokenRequired = message.userTokenRequired);
    message.permissionRequired !== undefined &&
      (obj.permissionRequired = message.permissionRequired);
    message.livenessTimeoutSecs !== undefined &&
      (obj.livenessTimeoutSecs = message.livenessTimeoutSecs);
    message.hostPayloadGuid !== undefined &&
      (obj.hostPayloadGuid = message.hostPayloadGuid);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ServiceEntry>, I>>(
    object: I
  ): ServiceEntry {
    const message = createBaseServiceEntry();
    message.name = object.name ?? "";
    message.type = object.type ?? "";
    message.authority = object.authority ?? "";
    message.lastUpdate = object.lastUpdate ?? undefined;
    message.userTokenRequired = object.userTokenRequired ?? false;
    message.permissionRequired = object.permissionRequired ?? "";
    message.livenessTimeoutSecs = object.livenessTimeoutSecs ?? 0;
    message.hostPayloadGuid = object.hostPayloadGuid ?? "";
    return message;
  },
};

function createBaseEndpoint(): Endpoint {
  return { hostIp: "", port: 0 };
}

export const Endpoint = {
  encode(
    message: Endpoint,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.hostIp !== "") {
      writer.uint32(10).string(message.hostIp);
    }
    if (message.port !== 0) {
      writer.uint32(16).int32(message.port);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Endpoint {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEndpoint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostIp = reader.string();
          break;
        case 2:
          message.port = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Endpoint {
    return {
      hostIp: isSet(object.hostIp) ? String(object.hostIp) : "",
      port: isSet(object.port) ? Number(object.port) : 0,
    };
  },

  toJSON(message: Endpoint): unknown {
    const obj: any = {};
    message.hostIp !== undefined && (obj.hostIp = message.hostIp);
    message.port !== undefined && (obj.port = Math.round(message.port));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Endpoint>, I>>(object: I): Endpoint {
    const message = createBaseEndpoint();
    message.hostIp = object.hostIp ?? "";
    message.port = object.port ?? 0;
    return message;
  },
};

function createBaseGetServiceEntryRequest(): GetServiceEntryRequest {
  return { header: undefined, serviceName: "" };
}

export const GetServiceEntryRequest = {
  encode(
    message: GetServiceEntryRequest,
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
  ): GetServiceEntryRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetServiceEntryRequest();
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

  fromJSON(object: any): GetServiceEntryRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      serviceName: isSet(object.serviceName) ? String(object.serviceName) : "",
    };
  },

  toJSON(message: GetServiceEntryRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.serviceName !== undefined &&
      (obj.serviceName = message.serviceName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetServiceEntryRequest>, I>>(
    object: I
  ): GetServiceEntryRequest {
    const message = createBaseGetServiceEntryRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.serviceName = object.serviceName ?? "";
    return message;
  },
};

function createBaseGetServiceEntryResponse(): GetServiceEntryResponse {
  return { header: undefined, status: 0, serviceEntry: undefined };
}

export const GetServiceEntryResponse = {
  encode(
    message: GetServiceEntryResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
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
  ): GetServiceEntryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetServiceEntryResponse();
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
          message.serviceEntry = ServiceEntry.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetServiceEntryResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? getServiceEntryResponse_StatusFromJSON(object.status)
        : 0,
      serviceEntry: isSet(object.serviceEntry)
        ? ServiceEntry.fromJSON(object.serviceEntry)
        : undefined,
    };
  },

  toJSON(message: GetServiceEntryResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = getServiceEntryResponse_StatusToJSON(message.status));
    message.serviceEntry !== undefined &&
      (obj.serviceEntry = message.serviceEntry
        ? ServiceEntry.toJSON(message.serviceEntry)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetServiceEntryResponse>, I>>(
    object: I
  ): GetServiceEntryResponse {
    const message = createBaseGetServiceEntryResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    message.serviceEntry =
      object.serviceEntry !== undefined && object.serviceEntry !== null
        ? ServiceEntry.fromPartial(object.serviceEntry)
        : undefined;
    return message;
  },
};

function createBaseListServiceEntriesRequest(): ListServiceEntriesRequest {
  return { header: undefined };
}

export const ListServiceEntriesRequest = {
  encode(
    message: ListServiceEntriesRequest,
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
  ): ListServiceEntriesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListServiceEntriesRequest();
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

  fromJSON(object: any): ListServiceEntriesRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: ListServiceEntriesRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListServiceEntriesRequest>, I>>(
    object: I
  ): ListServiceEntriesRequest {
    const message = createBaseListServiceEntriesRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseListServiceEntriesResponse(): ListServiceEntriesResponse {
  return { header: undefined, serviceEntries: [] };
}

export const ListServiceEntriesResponse = {
  encode(
    message: ListServiceEntriesResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.serviceEntries) {
      ServiceEntry.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListServiceEntriesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListServiceEntriesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.serviceEntries.push(
            ServiceEntry.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListServiceEntriesResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      serviceEntries: Array.isArray(object?.serviceEntries)
        ? object.serviceEntries.map((e: any) => ServiceEntry.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListServiceEntriesResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.serviceEntries) {
      obj.serviceEntries = message.serviceEntries.map((e) =>
        e ? ServiceEntry.toJSON(e) : undefined
      );
    } else {
      obj.serviceEntries = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListServiceEntriesResponse>, I>>(
    object: I
  ): ListServiceEntriesResponse {
    const message = createBaseListServiceEntriesResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.serviceEntries =
      object.serviceEntries?.map((e) => ServiceEntry.fromPartial(e)) || [];
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
