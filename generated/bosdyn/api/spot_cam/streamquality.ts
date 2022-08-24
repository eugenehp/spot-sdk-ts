/* eslint-disable */
import { RequestHeader, ResponseHeader } from "../header";
import _m0 from "protobufjs/minimal";
import { Int64Value } from "../../../google/protobuf/wrappers";

export const protobufPackage = "bosdyn.api.spot_cam";

/** Parameters for how the video stream should be processed and compressed. */
export interface StreamParams {
  /** The compression level in target BPS */
  targetbitrate: number | undefined;
  /**
   * How often should the entire feed be refreshed? (in frames)
   * Note: the feed is refreshed on a macroblock level; there are no full I-frames
   */
  refreshinterval: number | undefined;
  /** How often should an IDR message get sent? (in frames) */
  idrinterval: number | undefined;
  /** Optional setting of automatic white balancing mode. */
  awb: StreamParams_AwbMode | undefined;
}

/** Options for automatic white balancing mode. */
export enum StreamParams_AwbModeEnum {
  OFF = 0,
  AUTO = 1,
  INCANDESCENT = 2,
  FLUORESCENT = 3,
  WARM_FLUORESCENT = 4,
  DAYLIGHT = 5,
  CLOUDY = 6,
  TWILIGHT = 7,
  SHADE = 8,
  /** @deprecated */
  DARK = 9,
  UNRECOGNIZED = -1,
}

export function streamParams_AwbModeEnumFromJSON(
  object: any
): StreamParams_AwbModeEnum {
  switch (object) {
    case 0:
    case "OFF":
      return StreamParams_AwbModeEnum.OFF;
    case 1:
    case "AUTO":
      return StreamParams_AwbModeEnum.AUTO;
    case 2:
    case "INCANDESCENT":
      return StreamParams_AwbModeEnum.INCANDESCENT;
    case 3:
    case "FLUORESCENT":
      return StreamParams_AwbModeEnum.FLUORESCENT;
    case 4:
    case "WARM_FLUORESCENT":
      return StreamParams_AwbModeEnum.WARM_FLUORESCENT;
    case 5:
    case "DAYLIGHT":
      return StreamParams_AwbModeEnum.DAYLIGHT;
    case 6:
    case "CLOUDY":
      return StreamParams_AwbModeEnum.CLOUDY;
    case 7:
    case "TWILIGHT":
      return StreamParams_AwbModeEnum.TWILIGHT;
    case 8:
    case "SHADE":
      return StreamParams_AwbModeEnum.SHADE;
    case 9:
    case "DARK":
      return StreamParams_AwbModeEnum.DARK;
    case -1:
    case "UNRECOGNIZED":
    default:
      return StreamParams_AwbModeEnum.UNRECOGNIZED;
  }
}

export function streamParams_AwbModeEnumToJSON(
  object: StreamParams_AwbModeEnum
): string {
  switch (object) {
    case StreamParams_AwbModeEnum.OFF:
      return "OFF";
    case StreamParams_AwbModeEnum.AUTO:
      return "AUTO";
    case StreamParams_AwbModeEnum.INCANDESCENT:
      return "INCANDESCENT";
    case StreamParams_AwbModeEnum.FLUORESCENT:
      return "FLUORESCENT";
    case StreamParams_AwbModeEnum.WARM_FLUORESCENT:
      return "WARM_FLUORESCENT";
    case StreamParams_AwbModeEnum.DAYLIGHT:
      return "DAYLIGHT";
    case StreamParams_AwbModeEnum.CLOUDY:
      return "CLOUDY";
    case StreamParams_AwbModeEnum.TWILIGHT:
      return "TWILIGHT";
    case StreamParams_AwbModeEnum.SHADE:
      return "SHADE";
    case StreamParams_AwbModeEnum.DARK:
      return "DARK";
    case StreamParams_AwbModeEnum.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Wrapper for AwbModeEnum to allow it to be optionally set. */
export interface StreamParams_AwbMode {
  awb: StreamParams_AwbModeEnum;
}

/** Request the current video stream parameters. */
export interface GetStreamParamsRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/** Provides the current video stream parameters. */
export interface GetStreamParamsResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Current video stream parameters. */
  params: StreamParams | undefined;
}

/** Modify the video stream parameters. */
export interface SetStreamParamsRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Set only the fields that should be modified. */
  params: StreamParams | undefined;
}

/** Result of setting video stream parameters. */
export interface SetStreamParamsResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Applied video stream parameters. */
  params: StreamParams | undefined;
}

export interface EnableCongestionControlRequest {
  header: RequestHeader | undefined;
  /** A boolean 'true' enables receiver congestion control while 'false' disables it */
  enableCongestionControl: boolean;
}

export interface EnableCongestionControlResponse {
  header: ResponseHeader | undefined;
}

function createBaseStreamParams(): StreamParams {
  return {
    targetbitrate: undefined,
    refreshinterval: undefined,
    idrinterval: undefined,
    awb: undefined,
  };
}

export const StreamParams = {
  encode(
    message: StreamParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.targetbitrate !== undefined) {
      Int64Value.encode(
        { value: message.targetbitrate! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.refreshinterval !== undefined) {
      Int64Value.encode(
        { value: message.refreshinterval! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.idrinterval !== undefined) {
      Int64Value.encode(
        { value: message.idrinterval! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.awb !== undefined) {
      StreamParams_AwbMode.encode(
        message.awb,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.targetbitrate = Int64Value.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 2:
          message.refreshinterval = Int64Value.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 3:
          message.idrinterval = Int64Value.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 4:
          message.awb = StreamParams_AwbMode.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamParams {
    return {
      targetbitrate: isSet(object.targetbitrate)
        ? Number(object.targetbitrate)
        : undefined,
      refreshinterval: isSet(object.refreshinterval)
        ? Number(object.refreshinterval)
        : undefined,
      idrinterval: isSet(object.idrinterval)
        ? Number(object.idrinterval)
        : undefined,
      awb: isSet(object.awb)
        ? StreamParams_AwbMode.fromJSON(object.awb)
        : undefined,
    };
  },

  toJSON(message: StreamParams): unknown {
    const obj: any = {};
    message.targetbitrate !== undefined &&
      (obj.targetbitrate = message.targetbitrate);
    message.refreshinterval !== undefined &&
      (obj.refreshinterval = message.refreshinterval);
    message.idrinterval !== undefined &&
      (obj.idrinterval = message.idrinterval);
    message.awb !== undefined &&
      (obj.awb = message.awb
        ? StreamParams_AwbMode.toJSON(message.awb)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamParams>, I>>(
    object: I
  ): StreamParams {
    const message = createBaseStreamParams();
    message.targetbitrate = object.targetbitrate ?? undefined;
    message.refreshinterval = object.refreshinterval ?? undefined;
    message.idrinterval = object.idrinterval ?? undefined;
    message.awb =
      object.awb !== undefined && object.awb !== null
        ? StreamParams_AwbMode.fromPartial(object.awb)
        : undefined;
    return message;
  },
};

function createBaseStreamParams_AwbMode(): StreamParams_AwbMode {
  return { awb: 0 };
}

export const StreamParams_AwbMode = {
  encode(
    message: StreamParams_AwbMode,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.awb !== 0) {
      writer.uint32(8).int32(message.awb);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamParams_AwbMode {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamParams_AwbMode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.awb = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamParams_AwbMode {
    return {
      awb: isSet(object.awb) ? streamParams_AwbModeEnumFromJSON(object.awb) : 0,
    };
  },

  toJSON(message: StreamParams_AwbMode): unknown {
    const obj: any = {};
    message.awb !== undefined &&
      (obj.awb = streamParams_AwbModeEnumToJSON(message.awb));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamParams_AwbMode>, I>>(
    object: I
  ): StreamParams_AwbMode {
    const message = createBaseStreamParams_AwbMode();
    message.awb = object.awb ?? 0;
    return message;
  },
};

function createBaseGetStreamParamsRequest(): GetStreamParamsRequest {
  return { header: undefined };
}

export const GetStreamParamsRequest = {
  encode(
    message: GetStreamParamsRequest,
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
  ): GetStreamParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetStreamParamsRequest();
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

  fromJSON(object: any): GetStreamParamsRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: GetStreamParamsRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetStreamParamsRequest>, I>>(
    object: I
  ): GetStreamParamsRequest {
    const message = createBaseGetStreamParamsRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseGetStreamParamsResponse(): GetStreamParamsResponse {
  return { header: undefined, params: undefined };
}

export const GetStreamParamsResponse = {
  encode(
    message: GetStreamParamsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.params !== undefined) {
      StreamParams.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetStreamParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetStreamParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.params = StreamParams.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetStreamParamsResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      params: isSet(object.params)
        ? StreamParams.fromJSON(object.params)
        : undefined,
    };
  },

  toJSON(message: GetStreamParamsResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.params !== undefined &&
      (obj.params = message.params
        ? StreamParams.toJSON(message.params)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetStreamParamsResponse>, I>>(
    object: I
  ): GetStreamParamsResponse {
    const message = createBaseGetStreamParamsResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.params =
      object.params !== undefined && object.params !== null
        ? StreamParams.fromPartial(object.params)
        : undefined;
    return message;
  },
};

function createBaseSetStreamParamsRequest(): SetStreamParamsRequest {
  return { header: undefined, params: undefined };
}

export const SetStreamParamsRequest = {
  encode(
    message: SetStreamParamsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.params !== undefined) {
      StreamParams.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SetStreamParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetStreamParamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.params = StreamParams.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetStreamParamsRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      params: isSet(object.params)
        ? StreamParams.fromJSON(object.params)
        : undefined,
    };
  },

  toJSON(message: SetStreamParamsRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.params !== undefined &&
      (obj.params = message.params
        ? StreamParams.toJSON(message.params)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetStreamParamsRequest>, I>>(
    object: I
  ): SetStreamParamsRequest {
    const message = createBaseSetStreamParamsRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.params =
      object.params !== undefined && object.params !== null
        ? StreamParams.fromPartial(object.params)
        : undefined;
    return message;
  },
};

function createBaseSetStreamParamsResponse(): SetStreamParamsResponse {
  return { header: undefined, params: undefined };
}

export const SetStreamParamsResponse = {
  encode(
    message: SetStreamParamsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.params !== undefined) {
      StreamParams.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SetStreamParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetStreamParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.params = StreamParams.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetStreamParamsResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      params: isSet(object.params)
        ? StreamParams.fromJSON(object.params)
        : undefined,
    };
  },

  toJSON(message: SetStreamParamsResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.params !== undefined &&
      (obj.params = message.params
        ? StreamParams.toJSON(message.params)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetStreamParamsResponse>, I>>(
    object: I
  ): SetStreamParamsResponse {
    const message = createBaseSetStreamParamsResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.params =
      object.params !== undefined && object.params !== null
        ? StreamParams.fromPartial(object.params)
        : undefined;
    return message;
  },
};

function createBaseEnableCongestionControlRequest(): EnableCongestionControlRequest {
  return { header: undefined, enableCongestionControl: false };
}

export const EnableCongestionControlRequest = {
  encode(
    message: EnableCongestionControlRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.enableCongestionControl === true) {
      writer.uint32(16).bool(message.enableCongestionControl);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): EnableCongestionControlRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEnableCongestionControlRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.enableCongestionControl = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EnableCongestionControlRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      enableCongestionControl: isSet(object.enableCongestionControl)
        ? Boolean(object.enableCongestionControl)
        : false,
    };
  },

  toJSON(message: EnableCongestionControlRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.enableCongestionControl !== undefined &&
      (obj.enableCongestionControl = message.enableCongestionControl);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EnableCongestionControlRequest>, I>>(
    object: I
  ): EnableCongestionControlRequest {
    const message = createBaseEnableCongestionControlRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.enableCongestionControl = object.enableCongestionControl ?? false;
    return message;
  },
};

function createBaseEnableCongestionControlResponse(): EnableCongestionControlResponse {
  return { header: undefined };
}

export const EnableCongestionControlResponse = {
  encode(
    message: EnableCongestionControlResponse,
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
  ): EnableCongestionControlResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEnableCongestionControlResponse();
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

  fromJSON(object: any): EnableCongestionControlResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: EnableCongestionControlResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EnableCongestionControlResponse>, I>>(
    object: I
  ): EnableCongestionControlResponse {
    const message = createBaseEnableCongestionControlResponse();
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
