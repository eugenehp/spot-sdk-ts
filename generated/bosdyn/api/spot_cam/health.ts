/* eslint-disable */
import Long from "long";
import { RequestHeader, ResponseHeader } from "../header";
import { SystemFault } from "../robot_state";
import { DataChunk } from "../data_chunk";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api.spot_cam";

/** The temperature of a particular component. */
export interface Temperature {
  /** Identifier of the hardware measured. */
  channelName: string;
  /** Temperature is expressed in millidegrees C. */
  temperature: number;
}

/** Clear Built-in Test events. */
export interface ClearBITEventsRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/** Response to clearing built-in test events. */
export interface ClearBITEventsResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
}

/** Request the status of all built-in tests. */
export interface GetBITStatusRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/** Data on the current status of built-in tests. */
export interface GetBITStatusResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Fault events that have been reported. */
  events: SystemFault[];
  /** List of system states that may effect performance. */
  degradations: GetBITStatusResponse_Degradation[];
}

/**
 * Degredations are not necessesarily faults; a unit
 * with no installed mechanical PTZ will behave differently,
 * but nothing's actually wrong.
 */
export interface GetBITStatusResponse_Degradation {
  /** System affected. */
  type: GetBITStatusResponse_Degradation_DegradationType;
  /** Description of the kind of degradation being experienced. */
  description: string;
}

/** Systems that can experience performance degredations. */
export enum GetBITStatusResponse_Degradation_DegradationType {
  STORAGE = 0,
  PTZ = 1,
  LED = 2,
  UNRECOGNIZED = -1,
}

export function getBITStatusResponse_Degradation_DegradationTypeFromJSON(
  object: any
): GetBITStatusResponse_Degradation_DegradationType {
  switch (object) {
    case 0:
    case "STORAGE":
      return GetBITStatusResponse_Degradation_DegradationType.STORAGE;
    case 1:
    case "PTZ":
      return GetBITStatusResponse_Degradation_DegradationType.PTZ;
    case 2:
    case "LED":
      return GetBITStatusResponse_Degradation_DegradationType.LED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GetBITStatusResponse_Degradation_DegradationType.UNRECOGNIZED;
  }
}

export function getBITStatusResponse_Degradation_DegradationTypeToJSON(
  object: GetBITStatusResponse_Degradation_DegradationType
): string {
  switch (object) {
    case GetBITStatusResponse_Degradation_DegradationType.STORAGE:
      return "STORAGE";
    case GetBITStatusResponse_Degradation_DegradationType.PTZ:
      return "PTZ";
    case GetBITStatusResponse_Degradation_DegradationType.LED:
      return "LED";
    case GetBITStatusResponse_Degradation_DegradationType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface GetTemperatureRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

export interface GetTemperatureResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** List of all temperatures measured. */
  temps: Temperature[];
}

export interface GetSystemLogRequest {
  header: RequestHeader | undefined;
}

export interface GetSystemLogResponse {
  header: ResponseHeader | undefined;
  data: DataChunk | undefined;
}

function createBaseTemperature(): Temperature {
  return { channelName: "", temperature: 0 };
}

export const Temperature = {
  encode(
    message: Temperature,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.channelName !== "") {
      writer.uint32(10).string(message.channelName);
    }
    if (message.temperature !== 0) {
      writer.uint32(16).int64(message.temperature);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Temperature {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTemperature();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channelName = reader.string();
          break;
        case 2:
          message.temperature = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Temperature {
    return {
      channelName: isSet(object.channelName) ? String(object.channelName) : "",
      temperature: isSet(object.temperature) ? Number(object.temperature) : 0,
    };
  },

  toJSON(message: Temperature): unknown {
    const obj: any = {};
    message.channelName !== undefined &&
      (obj.channelName = message.channelName);
    message.temperature !== undefined &&
      (obj.temperature = Math.round(message.temperature));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Temperature>, I>>(
    object: I
  ): Temperature {
    const message = createBaseTemperature();
    message.channelName = object.channelName ?? "";
    message.temperature = object.temperature ?? 0;
    return message;
  },
};

function createBaseClearBITEventsRequest(): ClearBITEventsRequest {
  return { header: undefined };
}

export const ClearBITEventsRequest = {
  encode(
    message: ClearBITEventsRequest,
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
  ): ClearBITEventsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClearBITEventsRequest();
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

  fromJSON(object: any): ClearBITEventsRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: ClearBITEventsRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ClearBITEventsRequest>, I>>(
    object: I
  ): ClearBITEventsRequest {
    const message = createBaseClearBITEventsRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseClearBITEventsResponse(): ClearBITEventsResponse {
  return { header: undefined };
}

export const ClearBITEventsResponse = {
  encode(
    message: ClearBITEventsResponse,
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
  ): ClearBITEventsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClearBITEventsResponse();
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

  fromJSON(object: any): ClearBITEventsResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: ClearBITEventsResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ClearBITEventsResponse>, I>>(
    object: I
  ): ClearBITEventsResponse {
    const message = createBaseClearBITEventsResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseGetBITStatusRequest(): GetBITStatusRequest {
  return { header: undefined };
}

export const GetBITStatusRequest = {
  encode(
    message: GetBITStatusRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetBITStatusRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBITStatusRequest();
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

  fromJSON(object: any): GetBITStatusRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: GetBITStatusRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetBITStatusRequest>, I>>(
    object: I
  ): GetBITStatusRequest {
    const message = createBaseGetBITStatusRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseGetBITStatusResponse(): GetBITStatusResponse {
  return { header: undefined, events: [], degradations: [] };
}

export const GetBITStatusResponse = {
  encode(
    message: GetBITStatusResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.events) {
      SystemFault.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.degradations) {
      GetBITStatusResponse_Degradation.encode(
        v!,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetBITStatusResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBITStatusResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.events.push(SystemFault.decode(reader, reader.uint32()));
          break;
        case 3:
          message.degradations.push(
            GetBITStatusResponse_Degradation.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetBITStatusResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      events: Array.isArray(object?.events)
        ? object.events.map((e: any) => SystemFault.fromJSON(e))
        : [],
      degradations: Array.isArray(object?.degradations)
        ? object.degradations.map((e: any) =>
            GetBITStatusResponse_Degradation.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: GetBITStatusResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.events) {
      obj.events = message.events.map((e) =>
        e ? SystemFault.toJSON(e) : undefined
      );
    } else {
      obj.events = [];
    }
    if (message.degradations) {
      obj.degradations = message.degradations.map((e) =>
        e ? GetBITStatusResponse_Degradation.toJSON(e) : undefined
      );
    } else {
      obj.degradations = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetBITStatusResponse>, I>>(
    object: I
  ): GetBITStatusResponse {
    const message = createBaseGetBITStatusResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.events =
      object.events?.map((e) => SystemFault.fromPartial(e)) || [];
    message.degradations =
      object.degradations?.map((e) =>
        GetBITStatusResponse_Degradation.fromPartial(e)
      ) || [];
    return message;
  },
};

function createBaseGetBITStatusResponse_Degradation(): GetBITStatusResponse_Degradation {
  return { type: 0, description: "" };
}

export const GetBITStatusResponse_Degradation = {
  encode(
    message: GetBITStatusResponse_Degradation,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetBITStatusResponse_Degradation {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBITStatusResponse_Degradation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetBITStatusResponse_Degradation {
    return {
      type: isSet(object.type)
        ? getBITStatusResponse_Degradation_DegradationTypeFromJSON(object.type)
        : 0,
      description: isSet(object.description) ? String(object.description) : "",
    };
  },

  toJSON(message: GetBITStatusResponse_Degradation): unknown {
    const obj: any = {};
    message.type !== undefined &&
      (obj.type = getBITStatusResponse_Degradation_DegradationTypeToJSON(
        message.type
      ));
    message.description !== undefined &&
      (obj.description = message.description);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<GetBITStatusResponse_Degradation>, I>
  >(object: I): GetBITStatusResponse_Degradation {
    const message = createBaseGetBITStatusResponse_Degradation();
    message.type = object.type ?? 0;
    message.description = object.description ?? "";
    return message;
  },
};

function createBaseGetTemperatureRequest(): GetTemperatureRequest {
  return { header: undefined };
}

export const GetTemperatureRequest = {
  encode(
    message: GetTemperatureRequest,
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
  ): GetTemperatureRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetTemperatureRequest();
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

  fromJSON(object: any): GetTemperatureRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: GetTemperatureRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetTemperatureRequest>, I>>(
    object: I
  ): GetTemperatureRequest {
    const message = createBaseGetTemperatureRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseGetTemperatureResponse(): GetTemperatureResponse {
  return { header: undefined, temps: [] };
}

export const GetTemperatureResponse = {
  encode(
    message: GetTemperatureResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.temps) {
      Temperature.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetTemperatureResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetTemperatureResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.temps.push(Temperature.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetTemperatureResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      temps: Array.isArray(object?.temps)
        ? object.temps.map((e: any) => Temperature.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetTemperatureResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.temps) {
      obj.temps = message.temps.map((e) =>
        e ? Temperature.toJSON(e) : undefined
      );
    } else {
      obj.temps = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetTemperatureResponse>, I>>(
    object: I
  ): GetTemperatureResponse {
    const message = createBaseGetTemperatureResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.temps = object.temps?.map((e) => Temperature.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetSystemLogRequest(): GetSystemLogRequest {
  return { header: undefined };
}

export const GetSystemLogRequest = {
  encode(
    message: GetSystemLogRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSystemLogRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSystemLogRequest();
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

  fromJSON(object: any): GetSystemLogRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: GetSystemLogRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetSystemLogRequest>, I>>(
    object: I
  ): GetSystemLogRequest {
    const message = createBaseGetSystemLogRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseGetSystemLogResponse(): GetSystemLogResponse {
  return { header: undefined, data: undefined };
}

export const GetSystemLogResponse = {
  encode(
    message: GetSystemLogResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.data !== undefined) {
      DataChunk.encode(message.data, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetSystemLogResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSystemLogResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.data = DataChunk.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetSystemLogResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      data: isSet(object.data) ? DataChunk.fromJSON(object.data) : undefined,
    };
  },

  toJSON(message: GetSystemLogResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.data !== undefined &&
      (obj.data = message.data ? DataChunk.toJSON(message.data) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetSystemLogResponse>, I>>(
    object: I
  ): GetSystemLogResponse {
    const message = createBaseGetSystemLogResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.data =
      object.data !== undefined && object.data !== null
        ? DataChunk.fromPartial(object.data)
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

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
