/* eslint-disable */
import { RequestHeader, ResponseHeader } from "../header";
import _m0 from "protobufjs/minimal";
import { BoolValue } from "../../../google/protobuf/wrappers";

export const protobufPackage = "bosdyn.api.spot_cam";

/** Power on or off of components of the SpotCam. */
export interface PowerStatus {
  /** these switches are 'true' for power-on, 'false' for power-off */
  ptz: boolean | undefined;
  aux1: boolean | undefined;
  aux2: boolean | undefined;
  externalMic: boolean | undefined;
}

/** Request component power status. */
export interface GetPowerStatusRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/** Provides the power status of all components. */
export interface GetPowerStatusResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /**
   * status indicates the power status of the controllable devices
   * 'true' for power-on, 'false' for power-off
   */
  status: PowerStatus | undefined;
}

/** Turn components on or off. */
export interface SetPowerStatusRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /**
   * status indicates the requested power status of the controllable devices
   * 'true' for power-on, 'false' for power-off
   */
  status: PowerStatus | undefined;
}

/** Result of turning components on or off. */
export interface SetPowerStatusResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /**
   * status indicates the requested changes upon success
   * 'true' for power-on, 'false' for power-off
   */
  status: PowerStatus | undefined;
}

/** Turn components off and then back on without needing two separate requests. */
export interface CyclePowerRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /**
   * status indicates the devices for which cycle-power is requested
   * 'true' for cycle-power, else no effect
   * power cycle will not be performed on a given device if its state is power-off prior to this call
   */
  status: PowerStatus | undefined;
}

/** Result of power cycling components. */
export interface CyclePowerResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /**
   * status indicates the power status of the controllable devices after a successful power cycle
   * 'true' for power-on, 'false' for power-off
   */
  status: PowerStatus | undefined;
}

function createBasePowerStatus(): PowerStatus {
  return {
    ptz: undefined,
    aux1: undefined,
    aux2: undefined,
    externalMic: undefined,
  };
}

export const PowerStatus = {
  encode(
    message: PowerStatus,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.ptz !== undefined) {
      BoolValue.encode(
        { value: message.ptz! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.aux1 !== undefined) {
      BoolValue.encode(
        { value: message.aux1! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.aux2 !== undefined) {
      BoolValue.encode(
        { value: message.aux2! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.externalMic !== undefined) {
      BoolValue.encode(
        { value: message.externalMic! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PowerStatus {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePowerStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.ptz = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.aux1 = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.aux2 = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 5:
          message.externalMic = BoolValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PowerStatus {
    return {
      ptz: isSet(object.ptz) ? Boolean(object.ptz) : undefined,
      aux1: isSet(object.aux1) ? Boolean(object.aux1) : undefined,
      aux2: isSet(object.aux2) ? Boolean(object.aux2) : undefined,
      externalMic: isSet(object.externalMic)
        ? Boolean(object.externalMic)
        : undefined,
    };
  },

  toJSON(message: PowerStatus): unknown {
    const obj: any = {};
    message.ptz !== undefined && (obj.ptz = message.ptz);
    message.aux1 !== undefined && (obj.aux1 = message.aux1);
    message.aux2 !== undefined && (obj.aux2 = message.aux2);
    message.externalMic !== undefined &&
      (obj.externalMic = message.externalMic);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PowerStatus>, I>>(
    object: I
  ): PowerStatus {
    const message = createBasePowerStatus();
    message.ptz = object.ptz ?? undefined;
    message.aux1 = object.aux1 ?? undefined;
    message.aux2 = object.aux2 ?? undefined;
    message.externalMic = object.externalMic ?? undefined;
    return message;
  },
};

function createBaseGetPowerStatusRequest(): GetPowerStatusRequest {
  return { header: undefined };
}

export const GetPowerStatusRequest = {
  encode(
    message: GetPowerStatusRequest,
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
  ): GetPowerStatusRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPowerStatusRequest();
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

  fromJSON(object: any): GetPowerStatusRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: GetPowerStatusRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetPowerStatusRequest>, I>>(
    object: I
  ): GetPowerStatusRequest {
    const message = createBaseGetPowerStatusRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseGetPowerStatusResponse(): GetPowerStatusResponse {
  return { header: undefined, status: undefined };
}

export const GetPowerStatusResponse = {
  encode(
    message: GetPowerStatusResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== undefined) {
      PowerStatus.encode(message.status, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetPowerStatusResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPowerStatusResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.status = PowerStatus.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetPowerStatusResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? PowerStatus.fromJSON(object.status)
        : undefined,
    };
  },

  toJSON(message: GetPowerStatusResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = message.status
        ? PowerStatus.toJSON(message.status)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetPowerStatusResponse>, I>>(
    object: I
  ): GetPowerStatusResponse {
    const message = createBaseGetPowerStatusResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status =
      object.status !== undefined && object.status !== null
        ? PowerStatus.fromPartial(object.status)
        : undefined;
    return message;
  },
};

function createBaseSetPowerStatusRequest(): SetPowerStatusRequest {
  return { header: undefined, status: undefined };
}

export const SetPowerStatusRequest = {
  encode(
    message: SetPowerStatusRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== undefined) {
      PowerStatus.encode(message.status, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SetPowerStatusRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetPowerStatusRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.status = PowerStatus.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetPowerStatusRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? PowerStatus.fromJSON(object.status)
        : undefined,
    };
  },

  toJSON(message: SetPowerStatusRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = message.status
        ? PowerStatus.toJSON(message.status)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetPowerStatusRequest>, I>>(
    object: I
  ): SetPowerStatusRequest {
    const message = createBaseSetPowerStatusRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.status =
      object.status !== undefined && object.status !== null
        ? PowerStatus.fromPartial(object.status)
        : undefined;
    return message;
  },
};

function createBaseSetPowerStatusResponse(): SetPowerStatusResponse {
  return { header: undefined, status: undefined };
}

export const SetPowerStatusResponse = {
  encode(
    message: SetPowerStatusResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== undefined) {
      PowerStatus.encode(message.status, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SetPowerStatusResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetPowerStatusResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.status = PowerStatus.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetPowerStatusResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? PowerStatus.fromJSON(object.status)
        : undefined,
    };
  },

  toJSON(message: SetPowerStatusResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = message.status
        ? PowerStatus.toJSON(message.status)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetPowerStatusResponse>, I>>(
    object: I
  ): SetPowerStatusResponse {
    const message = createBaseSetPowerStatusResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status =
      object.status !== undefined && object.status !== null
        ? PowerStatus.fromPartial(object.status)
        : undefined;
    return message;
  },
};

function createBaseCyclePowerRequest(): CyclePowerRequest {
  return { header: undefined, status: undefined };
}

export const CyclePowerRequest = {
  encode(
    message: CyclePowerRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== undefined) {
      PowerStatus.encode(message.status, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CyclePowerRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCyclePowerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.status = PowerStatus.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CyclePowerRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? PowerStatus.fromJSON(object.status)
        : undefined,
    };
  },

  toJSON(message: CyclePowerRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = message.status
        ? PowerStatus.toJSON(message.status)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CyclePowerRequest>, I>>(
    object: I
  ): CyclePowerRequest {
    const message = createBaseCyclePowerRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.status =
      object.status !== undefined && object.status !== null
        ? PowerStatus.fromPartial(object.status)
        : undefined;
    return message;
  },
};

function createBaseCyclePowerResponse(): CyclePowerResponse {
  return { header: undefined, status: undefined };
}

export const CyclePowerResponse = {
  encode(
    message: CyclePowerResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== undefined) {
      PowerStatus.encode(message.status, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CyclePowerResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCyclePowerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.status = PowerStatus.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CyclePowerResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? PowerStatus.fromJSON(object.status)
        : undefined,
    };
  },

  toJSON(message: CyclePowerResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = message.status
        ? PowerStatus.toJSON(message.status)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CyclePowerResponse>, I>>(
    object: I
  ): CyclePowerResponse {
    const message = createBaseCyclePowerResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status =
      object.status !== undefined && object.status !== null
        ? PowerStatus.fromPartial(object.status)
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
