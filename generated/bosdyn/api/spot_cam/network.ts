/* eslint-disable */
import { RequestHeader, ResponseHeader } from "../header";
import _m0 from "protobufjs/minimal";
import { UInt32Value } from "../../../google/protobuf/wrappers";

export const protobufPackage = "bosdyn.api.spot_cam";

/** Network configuration data. */
export interface NetworkTuple {
  /** a big-endian representation of an IPv4 address */
  address: number | undefined;
  /** The mask used for defining the system's subnet */
  netmask: number | undefined;
  /** A global routing is set up for the address defined below (if present) */
  gateway: number | undefined;
  /**
   * If MTU is present, and <16 bits wide, then it is set for the ethernet interface's MTU
   * if not, the MTU is set to 1500
   */
  mtu: number | undefined;
}

/** Retrieve current network configuration. */
export interface GetNetworkSettingsRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/** Provides the current network configuration. */
export interface GetNetworkSettingsResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Current network configuration. */
  settings: NetworkTuple | undefined;
}

/** Request the SSL certificate currently in use. */
export interface GetSSLCertRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/** Provides the SSL certificate currently in use. */
export interface GetSSLCertResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** An ASCII-armored representation of the SSL certificate */
  certificate: string;
}

/** Servers used in the ICE resolution process. */
export interface ICEServer {
  /** STUN or TURN server. */
  type: ICEServer_servertype;
  /** Network address of the server. */
  address: string;
  /** Only the least significant 16 bits are used. */
  port: number;
}

/** Possible types of servers */
export enum ICEServer_servertype {
  UNKNOWN = 0,
  STUN = 1,
  TURN = 2,
  UNRECOGNIZED = -1,
}

export function iCEServer_servertypeFromJSON(
  object: any
): ICEServer_servertype {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return ICEServer_servertype.UNKNOWN;
    case 1:
    case "STUN":
      return ICEServer_servertype.STUN;
    case 2:
    case "TURN":
      return ICEServer_servertype.TURN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ICEServer_servertype.UNRECOGNIZED;
  }
}

export function iCEServer_servertypeToJSON(
  object: ICEServer_servertype
): string {
  switch (object) {
    case ICEServer_servertype.UNKNOWN:
      return "UNKNOWN";
    case ICEServer_servertype.STUN:
      return "STUN";
    case ICEServer_servertype.TURN:
      return "TURN";
    case ICEServer_servertype.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Request the servers used for ICE resolution. */
export interface GetICEConfigurationRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/** Provides the ICE resolution servers. */
export interface GetICEConfigurationResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** List of servers used for ICE resolution. */
  servers: ICEServer[];
}

/**
 * Modify the ICE configuration.
 * Note: this configuration replaces any configuration currently present.
 * It is *not* appended.
 */
export interface SetICEConfigurationRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** List of servers used for ICE resolution. */
  servers: ICEServer[];
}

/** Result of modifying the ICE configuration. */
export interface SetICEConfigurationResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
}

function createBaseNetworkTuple(): NetworkTuple {
  return {
    address: undefined,
    netmask: undefined,
    gateway: undefined,
    mtu: undefined,
  };
}

export const NetworkTuple = {
  encode(
    message: NetworkTuple,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== undefined) {
      UInt32Value.encode(
        { value: message.address! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.netmask !== undefined) {
      UInt32Value.encode(
        { value: message.netmask! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.gateway !== undefined) {
      UInt32Value.encode(
        { value: message.gateway! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.mtu !== undefined) {
      UInt32Value.encode(
        { value: message.mtu! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NetworkTuple {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNetworkTuple();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.address = UInt32Value.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.netmask = UInt32Value.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.gateway = UInt32Value.decode(reader, reader.uint32()).value;
          break;
        case 5:
          message.mtu = UInt32Value.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NetworkTuple {
    return {
      address: isSet(object.address) ? Number(object.address) : undefined,
      netmask: isSet(object.netmask) ? Number(object.netmask) : undefined,
      gateway: isSet(object.gateway) ? Number(object.gateway) : undefined,
      mtu: isSet(object.mtu) ? Number(object.mtu) : undefined,
    };
  },

  toJSON(message: NetworkTuple): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.netmask !== undefined && (obj.netmask = message.netmask);
    message.gateway !== undefined && (obj.gateway = message.gateway);
    message.mtu !== undefined && (obj.mtu = message.mtu);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NetworkTuple>, I>>(
    object: I
  ): NetworkTuple {
    const message = createBaseNetworkTuple();
    message.address = object.address ?? undefined;
    message.netmask = object.netmask ?? undefined;
    message.gateway = object.gateway ?? undefined;
    message.mtu = object.mtu ?? undefined;
    return message;
  },
};

function createBaseGetNetworkSettingsRequest(): GetNetworkSettingsRequest {
  return { header: undefined };
}

export const GetNetworkSettingsRequest = {
  encode(
    message: GetNetworkSettingsRequest,
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
  ): GetNetworkSettingsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetNetworkSettingsRequest();
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

  fromJSON(object: any): GetNetworkSettingsRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: GetNetworkSettingsRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetNetworkSettingsRequest>, I>>(
    object: I
  ): GetNetworkSettingsRequest {
    const message = createBaseGetNetworkSettingsRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseGetNetworkSettingsResponse(): GetNetworkSettingsResponse {
  return { header: undefined, settings: undefined };
}

export const GetNetworkSettingsResponse = {
  encode(
    message: GetNetworkSettingsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.settings !== undefined) {
      NetworkTuple.encode(message.settings, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetNetworkSettingsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetNetworkSettingsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.settings = NetworkTuple.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetNetworkSettingsResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      settings: isSet(object.settings)
        ? NetworkTuple.fromJSON(object.settings)
        : undefined,
    };
  },

  toJSON(message: GetNetworkSettingsResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.settings !== undefined &&
      (obj.settings = message.settings
        ? NetworkTuple.toJSON(message.settings)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetNetworkSettingsResponse>, I>>(
    object: I
  ): GetNetworkSettingsResponse {
    const message = createBaseGetNetworkSettingsResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.settings =
      object.settings !== undefined && object.settings !== null
        ? NetworkTuple.fromPartial(object.settings)
        : undefined;
    return message;
  },
};

function createBaseGetSSLCertRequest(): GetSSLCertRequest {
  return { header: undefined };
}

export const GetSSLCertRequest = {
  encode(
    message: GetSSLCertRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSSLCertRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSSLCertRequest();
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

  fromJSON(object: any): GetSSLCertRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: GetSSLCertRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetSSLCertRequest>, I>>(
    object: I
  ): GetSSLCertRequest {
    const message = createBaseGetSSLCertRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseGetSSLCertResponse(): GetSSLCertResponse {
  return { header: undefined, certificate: "" };
}

export const GetSSLCertResponse = {
  encode(
    message: GetSSLCertResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.certificate !== "") {
      writer.uint32(18).string(message.certificate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSSLCertResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSSLCertResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.certificate = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetSSLCertResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      certificate: isSet(object.certificate) ? String(object.certificate) : "",
    };
  },

  toJSON(message: GetSSLCertResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.certificate !== undefined &&
      (obj.certificate = message.certificate);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetSSLCertResponse>, I>>(
    object: I
  ): GetSSLCertResponse {
    const message = createBaseGetSSLCertResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.certificate = object.certificate ?? "";
    return message;
  },
};

function createBaseICEServer(): ICEServer {
  return { type: 0, address: "", port: 0 };
}

export const ICEServer = {
  encode(
    message: ICEServer,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (message.port !== 0) {
      writer.uint32(24).uint32(message.port);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ICEServer {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseICEServer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.address = reader.string();
          break;
        case 3:
          message.port = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ICEServer {
    return {
      type: isSet(object.type) ? iCEServer_servertypeFromJSON(object.type) : 0,
      address: isSet(object.address) ? String(object.address) : "",
      port: isSet(object.port) ? Number(object.port) : 0,
    };
  },

  toJSON(message: ICEServer): unknown {
    const obj: any = {};
    message.type !== undefined &&
      (obj.type = iCEServer_servertypeToJSON(message.type));
    message.address !== undefined && (obj.address = message.address);
    message.port !== undefined && (obj.port = Math.round(message.port));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ICEServer>, I>>(
    object: I
  ): ICEServer {
    const message = createBaseICEServer();
    message.type = object.type ?? 0;
    message.address = object.address ?? "";
    message.port = object.port ?? 0;
    return message;
  },
};

function createBaseGetICEConfigurationRequest(): GetICEConfigurationRequest {
  return { header: undefined };
}

export const GetICEConfigurationRequest = {
  encode(
    message: GetICEConfigurationRequest,
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
  ): GetICEConfigurationRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetICEConfigurationRequest();
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

  fromJSON(object: any): GetICEConfigurationRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: GetICEConfigurationRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetICEConfigurationRequest>, I>>(
    object: I
  ): GetICEConfigurationRequest {
    const message = createBaseGetICEConfigurationRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseGetICEConfigurationResponse(): GetICEConfigurationResponse {
  return { header: undefined, servers: [] };
}

export const GetICEConfigurationResponse = {
  encode(
    message: GetICEConfigurationResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.servers) {
      ICEServer.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetICEConfigurationResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetICEConfigurationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.servers.push(ICEServer.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetICEConfigurationResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      servers: Array.isArray(object?.servers)
        ? object.servers.map((e: any) => ICEServer.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetICEConfigurationResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.servers) {
      obj.servers = message.servers.map((e) =>
        e ? ICEServer.toJSON(e) : undefined
      );
    } else {
      obj.servers = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetICEConfigurationResponse>, I>>(
    object: I
  ): GetICEConfigurationResponse {
    const message = createBaseGetICEConfigurationResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.servers =
      object.servers?.map((e) => ICEServer.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSetICEConfigurationRequest(): SetICEConfigurationRequest {
  return { header: undefined, servers: [] };
}

export const SetICEConfigurationRequest = {
  encode(
    message: SetICEConfigurationRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.servers) {
      ICEServer.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SetICEConfigurationRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetICEConfigurationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.servers.push(ICEServer.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetICEConfigurationRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      servers: Array.isArray(object?.servers)
        ? object.servers.map((e: any) => ICEServer.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SetICEConfigurationRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    if (message.servers) {
      obj.servers = message.servers.map((e) =>
        e ? ICEServer.toJSON(e) : undefined
      );
    } else {
      obj.servers = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetICEConfigurationRequest>, I>>(
    object: I
  ): SetICEConfigurationRequest {
    const message = createBaseSetICEConfigurationRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.servers =
      object.servers?.map((e) => ICEServer.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSetICEConfigurationResponse(): SetICEConfigurationResponse {
  return { header: undefined };
}

export const SetICEConfigurationResponse = {
  encode(
    message: SetICEConfigurationResponse,
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
  ): SetICEConfigurationResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetICEConfigurationResponse();
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

  fromJSON(object: any): SetICEConfigurationResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: SetICEConfigurationResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetICEConfigurationResponse>, I>>(
    object: I
  ): SetICEConfigurationResponse {
    const message = createBaseSetICEConfigurationResponse();
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
