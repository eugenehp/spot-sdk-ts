/* eslint-disable */
import { RequestHeader, ResponseHeader } from "../header";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api.spot_cam";

/** Request the current state of LEDs on the SpotCam. */
export interface GetLEDBrightnessRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/** Describes the current brightnesses of all LEDs. */
export interface GetLEDBrightnessResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Brightness [0, 1] of the LED located at indices [0, 3]. */
  brightnesses: number[];
}

/** Set individual LED brightnesses. */
export interface SetLEDBrightnessRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Brightness [0, 1] to assign to the LED located at indices [0, 3]. */
  brightnesses: { [key: number]: number };
}

export interface SetLEDBrightnessRequest_BrightnessesEntry {
  key: number;
  value: number;
}

/** Response with any errors setting LED brightnesses. */
export interface SetLEDBrightnessResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
}

function createBaseGetLEDBrightnessRequest(): GetLEDBrightnessRequest {
  return { header: undefined };
}

export const GetLEDBrightnessRequest = {
  encode(
    message: GetLEDBrightnessRequest,
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
  ): GetLEDBrightnessRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLEDBrightnessRequest();
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

  fromJSON(object: any): GetLEDBrightnessRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: GetLEDBrightnessRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetLEDBrightnessRequest>, I>>(
    object: I
  ): GetLEDBrightnessRequest {
    const message = createBaseGetLEDBrightnessRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseGetLEDBrightnessResponse(): GetLEDBrightnessResponse {
  return { header: undefined, brightnesses: [] };
}

export const GetLEDBrightnessResponse = {
  encode(
    message: GetLEDBrightnessResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(18).fork();
    for (const v of message.brightnesses) {
      writer.float(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetLEDBrightnessResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLEDBrightnessResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.brightnesses.push(reader.float());
            }
          } else {
            message.brightnesses.push(reader.float());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetLEDBrightnessResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      brightnesses: Array.isArray(object?.brightnesses)
        ? object.brightnesses.map((e: any) => Number(e))
        : [],
    };
  },

  toJSON(message: GetLEDBrightnessResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.brightnesses) {
      obj.brightnesses = message.brightnesses.map((e) => e);
    } else {
      obj.brightnesses = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetLEDBrightnessResponse>, I>>(
    object: I
  ): GetLEDBrightnessResponse {
    const message = createBaseGetLEDBrightnessResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.brightnesses = object.brightnesses?.map((e) => e) || [];
    return message;
  },
};

function createBaseSetLEDBrightnessRequest(): SetLEDBrightnessRequest {
  return { header: undefined, brightnesses: {} };
}

export const SetLEDBrightnessRequest = {
  encode(
    message: SetLEDBrightnessRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    Object.entries(message.brightnesses).forEach(([key, value]) => {
      SetLEDBrightnessRequest_BrightnessesEntry.encode(
        { key: key as any, value },
        writer.uint32(18).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SetLEDBrightnessRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetLEDBrightnessRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          const entry2 = SetLEDBrightnessRequest_BrightnessesEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry2.value !== undefined) {
            message.brightnesses[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetLEDBrightnessRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      brightnesses: isObject(object.brightnesses)
        ? Object.entries(object.brightnesses).reduce<{ [key: number]: number }>(
            (acc, [key, value]) => {
              acc[Number(key)] = Number(value);
              return acc;
            },
            {}
          )
        : {},
    };
  },

  toJSON(message: SetLEDBrightnessRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    obj.brightnesses = {};
    if (message.brightnesses) {
      Object.entries(message.brightnesses).forEach(([k, v]) => {
        obj.brightnesses[k] = v;
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetLEDBrightnessRequest>, I>>(
    object: I
  ): SetLEDBrightnessRequest {
    const message = createBaseSetLEDBrightnessRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.brightnesses = Object.entries(object.brightnesses ?? {}).reduce<{
      [key: number]: number;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[Number(key)] = Number(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseSetLEDBrightnessRequest_BrightnessesEntry(): SetLEDBrightnessRequest_BrightnessesEntry {
  return { key: 0, value: 0 };
}

export const SetLEDBrightnessRequest_BrightnessesEntry = {
  encode(
    message: SetLEDBrightnessRequest_BrightnessesEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== 0) {
      writer.uint32(8).int32(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(21).float(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SetLEDBrightnessRequest_BrightnessesEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetLEDBrightnessRequest_BrightnessesEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.int32();
          break;
        case 2:
          message.value = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetLEDBrightnessRequest_BrightnessesEntry {
    return {
      key: isSet(object.key) ? Number(object.key) : 0,
      value: isSet(object.value) ? Number(object.value) : 0,
    };
  },

  toJSON(message: SetLEDBrightnessRequest_BrightnessesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = Math.round(message.key));
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<SetLEDBrightnessRequest_BrightnessesEntry>, I>
  >(object: I): SetLEDBrightnessRequest_BrightnessesEntry {
    const message = createBaseSetLEDBrightnessRequest_BrightnessesEntry();
    message.key = object.key ?? 0;
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseSetLEDBrightnessResponse(): SetLEDBrightnessResponse {
  return { header: undefined };
}

export const SetLEDBrightnessResponse = {
  encode(
    message: SetLEDBrightnessResponse,
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
  ): SetLEDBrightnessResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetLEDBrightnessResponse();
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

  fromJSON(object: any): SetLEDBrightnessResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: SetLEDBrightnessResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetLEDBrightnessResponse>, I>>(
    object: I
  ): SetLEDBrightnessResponse {
    const message = createBaseSetLEDBrightnessResponse();
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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
