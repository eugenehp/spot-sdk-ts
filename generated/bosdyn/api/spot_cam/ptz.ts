/* eslint-disable */
import { RequestHeader, ResponseHeader } from "../header";
import _m0 from "protobufjs/minimal";
import { FloatValue } from "../../../google/protobuf/wrappers";

export const protobufPackage = "bosdyn.api.spot_cam";

/**
 * PtzDescription provides information about a given PTZ. The name is usually all that's required to
 * describe a PTZ, but ListPtzResponse will include more information.
 */
export interface PtzDescription {
  /** Identifier of a particular controllable PTZ mechanism (real or virtual). */
  name: string;
  /** If a limit is not set, all positions are valid */
  panLimit: PtzDescription_Limits | undefined;
  /** Limits in degrees. */
  tiltLimit: PtzDescription_Limits | undefined;
  /** Limits in zoom level. */
  zoomLimit: PtzDescription_Limits | undefined;
}

/** Limits for a single axis. */
export interface PtzDescription_Limits {
  /** Units depend on the axis being controlled. */
  min: number | undefined;
  /** Units depend on the axis being controlled. */
  max: number | undefined;
}

/** Doubles as a description of current state, or a command for a new position. */
export interface PtzPosition {
  /**
   * The "mech" ptz can pan [0, 360] degrees,
   * tilt approximately [-30, 100] degrees where 0 is the horizon, IR and PTZ models differ
   * and zoom between 1x and 30x.
   */
  ptz: PtzDescription | undefined;
  /** degrees */
  pan: number | undefined;
  /** degrees */
  tilt: number | undefined;
  /** zoom level */
  zoom: number | undefined;
}

/** Doubles as a description of current state, or a command for a new velocity. */
export interface PtzVelocity {
  /** The "mech" ptz cannot be used with Velocity. */
  ptz: PtzDescription | undefined;
  /** degrees/second */
  pan: number | undefined;
  /** degrees/second */
  tilt: number | undefined;
  /** zoom level/second */
  zoom: number | undefined;
}

/** Request the current position of a ptz. */
export interface GetPtzPositionRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Only the name is used. */
  ptz: PtzDescription | undefined;
}

/** Provides the current measured position. */
export interface GetPtzPositionResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Current position of the mechanism. */
  position: PtzPosition | undefined;
}

/** Request the velocity of a ptz */
export interface GetPtzVelocityRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Only the name is used. */
  ptz: PtzDescription | undefined;
}

/** Provides the current measured velocity. */
export interface GetPtzVelocityResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Current velocity of the mechanism. */
  velocity: PtzVelocity | undefined;
}

/** Request all available ptzs on the SpotCam. */
export interface ListPtzRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/** Provide all available ptz on the SpotCam. */
export interface ListPtzResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** List of ptzs, real and virtual. */
  ptzs: PtzDescription[];
}

/** Command the ptz to move to a position. */
export interface SetPtzPositionRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Desired position to achieve. */
  position: PtzPosition | undefined;
}

/** Result of a SetPtzPositionRequest. */
export interface SetPtzPositionResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Applied desired position. */
  position: PtzPosition | undefined;
}

/** Command a velocity for a ptz. */
export interface SetPtzVelocityRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Desired velocity to achieve. */
  velocity: PtzVelocity | undefined;
}

/** Result of a SetPtzVelocityRequest. */
export interface SetPtzVelocityResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Applied desired position. */
  velocity: PtzVelocity | undefined;
}

/** Command to reset PTZ autofocus */
export interface InitializeLensRequest {
  /** Common response header. */
  header: RequestHeader | undefined;
}

/** Result of a InitializeLensRequest. */
export interface InitializeLensResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
}

function createBasePtzDescription(): PtzDescription {
  return {
    name: "",
    panLimit: undefined,
    tiltLimit: undefined,
    zoomLimit: undefined,
  };
}

export const PtzDescription = {
  encode(
    message: PtzDescription,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.panLimit !== undefined) {
      PtzDescription_Limits.encode(
        message.panLimit,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.tiltLimit !== undefined) {
      PtzDescription_Limits.encode(
        message.tiltLimit,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.zoomLimit !== undefined) {
      PtzDescription_Limits.encode(
        message.zoomLimit,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PtzDescription {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePtzDescription();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.panLimit = PtzDescription_Limits.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.tiltLimit = PtzDescription_Limits.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.zoomLimit = PtzDescription_Limits.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PtzDescription {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      panLimit: isSet(object.panLimit)
        ? PtzDescription_Limits.fromJSON(object.panLimit)
        : undefined,
      tiltLimit: isSet(object.tiltLimit)
        ? PtzDescription_Limits.fromJSON(object.tiltLimit)
        : undefined,
      zoomLimit: isSet(object.zoomLimit)
        ? PtzDescription_Limits.fromJSON(object.zoomLimit)
        : undefined,
    };
  },

  toJSON(message: PtzDescription): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.panLimit !== undefined &&
      (obj.panLimit = message.panLimit
        ? PtzDescription_Limits.toJSON(message.panLimit)
        : undefined);
    message.tiltLimit !== undefined &&
      (obj.tiltLimit = message.tiltLimit
        ? PtzDescription_Limits.toJSON(message.tiltLimit)
        : undefined);
    message.zoomLimit !== undefined &&
      (obj.zoomLimit = message.zoomLimit
        ? PtzDescription_Limits.toJSON(message.zoomLimit)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PtzDescription>, I>>(
    object: I
  ): PtzDescription {
    const message = createBasePtzDescription();
    message.name = object.name ?? "";
    message.panLimit =
      object.panLimit !== undefined && object.panLimit !== null
        ? PtzDescription_Limits.fromPartial(object.panLimit)
        : undefined;
    message.tiltLimit =
      object.tiltLimit !== undefined && object.tiltLimit !== null
        ? PtzDescription_Limits.fromPartial(object.tiltLimit)
        : undefined;
    message.zoomLimit =
      object.zoomLimit !== undefined && object.zoomLimit !== null
        ? PtzDescription_Limits.fromPartial(object.zoomLimit)
        : undefined;
    return message;
  },
};

function createBasePtzDescription_Limits(): PtzDescription_Limits {
  return { min: undefined, max: undefined };
}

export const PtzDescription_Limits = {
  encode(
    message: PtzDescription_Limits,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.min !== undefined) {
      FloatValue.encode(
        { value: message.min! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.max !== undefined) {
      FloatValue.encode(
        { value: message.max! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): PtzDescription_Limits {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePtzDescription_Limits();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.min = FloatValue.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.max = FloatValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PtzDescription_Limits {
    return {
      min: isSet(object.min) ? Number(object.min) : undefined,
      max: isSet(object.max) ? Number(object.max) : undefined,
    };
  },

  toJSON(message: PtzDescription_Limits): unknown {
    const obj: any = {};
    message.min !== undefined && (obj.min = message.min);
    message.max !== undefined && (obj.max = message.max);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PtzDescription_Limits>, I>>(
    object: I
  ): PtzDescription_Limits {
    const message = createBasePtzDescription_Limits();
    message.min = object.min ?? undefined;
    message.max = object.max ?? undefined;
    return message;
  },
};

function createBasePtzPosition(): PtzPosition {
  return { ptz: undefined, pan: undefined, tilt: undefined, zoom: undefined };
}

export const PtzPosition = {
  encode(
    message: PtzPosition,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.ptz !== undefined) {
      PtzDescription.encode(message.ptz, writer.uint32(18).fork()).ldelim();
    }
    if (message.pan !== undefined) {
      FloatValue.encode(
        { value: message.pan! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.tilt !== undefined) {
      FloatValue.encode(
        { value: message.tilt! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.zoom !== undefined) {
      FloatValue.encode(
        { value: message.zoom! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PtzPosition {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePtzPosition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.ptz = PtzDescription.decode(reader, reader.uint32());
          break;
        case 3:
          message.pan = FloatValue.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.tilt = FloatValue.decode(reader, reader.uint32()).value;
          break;
        case 5:
          message.zoom = FloatValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PtzPosition {
    return {
      ptz: isSet(object.ptz) ? PtzDescription.fromJSON(object.ptz) : undefined,
      pan: isSet(object.pan) ? Number(object.pan) : undefined,
      tilt: isSet(object.tilt) ? Number(object.tilt) : undefined,
      zoom: isSet(object.zoom) ? Number(object.zoom) : undefined,
    };
  },

  toJSON(message: PtzPosition): unknown {
    const obj: any = {};
    message.ptz !== undefined &&
      (obj.ptz = message.ptz ? PtzDescription.toJSON(message.ptz) : undefined);
    message.pan !== undefined && (obj.pan = message.pan);
    message.tilt !== undefined && (obj.tilt = message.tilt);
    message.zoom !== undefined && (obj.zoom = message.zoom);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PtzPosition>, I>>(
    object: I
  ): PtzPosition {
    const message = createBasePtzPosition();
    message.ptz =
      object.ptz !== undefined && object.ptz !== null
        ? PtzDescription.fromPartial(object.ptz)
        : undefined;
    message.pan = object.pan ?? undefined;
    message.tilt = object.tilt ?? undefined;
    message.zoom = object.zoom ?? undefined;
    return message;
  },
};

function createBasePtzVelocity(): PtzVelocity {
  return { ptz: undefined, pan: undefined, tilt: undefined, zoom: undefined };
}

export const PtzVelocity = {
  encode(
    message: PtzVelocity,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.ptz !== undefined) {
      PtzDescription.encode(message.ptz, writer.uint32(18).fork()).ldelim();
    }
    if (message.pan !== undefined) {
      FloatValue.encode(
        { value: message.pan! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.tilt !== undefined) {
      FloatValue.encode(
        { value: message.tilt! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.zoom !== undefined) {
      FloatValue.encode(
        { value: message.zoom! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PtzVelocity {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePtzVelocity();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.ptz = PtzDescription.decode(reader, reader.uint32());
          break;
        case 3:
          message.pan = FloatValue.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.tilt = FloatValue.decode(reader, reader.uint32()).value;
          break;
        case 5:
          message.zoom = FloatValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PtzVelocity {
    return {
      ptz: isSet(object.ptz) ? PtzDescription.fromJSON(object.ptz) : undefined,
      pan: isSet(object.pan) ? Number(object.pan) : undefined,
      tilt: isSet(object.tilt) ? Number(object.tilt) : undefined,
      zoom: isSet(object.zoom) ? Number(object.zoom) : undefined,
    };
  },

  toJSON(message: PtzVelocity): unknown {
    const obj: any = {};
    message.ptz !== undefined &&
      (obj.ptz = message.ptz ? PtzDescription.toJSON(message.ptz) : undefined);
    message.pan !== undefined && (obj.pan = message.pan);
    message.tilt !== undefined && (obj.tilt = message.tilt);
    message.zoom !== undefined && (obj.zoom = message.zoom);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PtzVelocity>, I>>(
    object: I
  ): PtzVelocity {
    const message = createBasePtzVelocity();
    message.ptz =
      object.ptz !== undefined && object.ptz !== null
        ? PtzDescription.fromPartial(object.ptz)
        : undefined;
    message.pan = object.pan ?? undefined;
    message.tilt = object.tilt ?? undefined;
    message.zoom = object.zoom ?? undefined;
    return message;
  },
};

function createBaseGetPtzPositionRequest(): GetPtzPositionRequest {
  return { header: undefined, ptz: undefined };
}

export const GetPtzPositionRequest = {
  encode(
    message: GetPtzPositionRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.ptz !== undefined) {
      PtzDescription.encode(message.ptz, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetPtzPositionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPtzPositionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.ptz = PtzDescription.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetPtzPositionRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      ptz: isSet(object.ptz) ? PtzDescription.fromJSON(object.ptz) : undefined,
    };
  },

  toJSON(message: GetPtzPositionRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.ptz !== undefined &&
      (obj.ptz = message.ptz ? PtzDescription.toJSON(message.ptz) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetPtzPositionRequest>, I>>(
    object: I
  ): GetPtzPositionRequest {
    const message = createBaseGetPtzPositionRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.ptz =
      object.ptz !== undefined && object.ptz !== null
        ? PtzDescription.fromPartial(object.ptz)
        : undefined;
    return message;
  },
};

function createBaseGetPtzPositionResponse(): GetPtzPositionResponse {
  return { header: undefined, position: undefined };
}

export const GetPtzPositionResponse = {
  encode(
    message: GetPtzPositionResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.position !== undefined) {
      PtzPosition.encode(message.position, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetPtzPositionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPtzPositionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.position = PtzPosition.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetPtzPositionResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      position: isSet(object.position)
        ? PtzPosition.fromJSON(object.position)
        : undefined,
    };
  },

  toJSON(message: GetPtzPositionResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.position !== undefined &&
      (obj.position = message.position
        ? PtzPosition.toJSON(message.position)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetPtzPositionResponse>, I>>(
    object: I
  ): GetPtzPositionResponse {
    const message = createBaseGetPtzPositionResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.position =
      object.position !== undefined && object.position !== null
        ? PtzPosition.fromPartial(object.position)
        : undefined;
    return message;
  },
};

function createBaseGetPtzVelocityRequest(): GetPtzVelocityRequest {
  return { header: undefined, ptz: undefined };
}

export const GetPtzVelocityRequest = {
  encode(
    message: GetPtzVelocityRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.ptz !== undefined) {
      PtzDescription.encode(message.ptz, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetPtzVelocityRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPtzVelocityRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.ptz = PtzDescription.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetPtzVelocityRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      ptz: isSet(object.ptz) ? PtzDescription.fromJSON(object.ptz) : undefined,
    };
  },

  toJSON(message: GetPtzVelocityRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.ptz !== undefined &&
      (obj.ptz = message.ptz ? PtzDescription.toJSON(message.ptz) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetPtzVelocityRequest>, I>>(
    object: I
  ): GetPtzVelocityRequest {
    const message = createBaseGetPtzVelocityRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.ptz =
      object.ptz !== undefined && object.ptz !== null
        ? PtzDescription.fromPartial(object.ptz)
        : undefined;
    return message;
  },
};

function createBaseGetPtzVelocityResponse(): GetPtzVelocityResponse {
  return { header: undefined, velocity: undefined };
}

export const GetPtzVelocityResponse = {
  encode(
    message: GetPtzVelocityResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.velocity !== undefined) {
      PtzVelocity.encode(message.velocity, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetPtzVelocityResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPtzVelocityResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.velocity = PtzVelocity.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetPtzVelocityResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      velocity: isSet(object.velocity)
        ? PtzVelocity.fromJSON(object.velocity)
        : undefined,
    };
  },

  toJSON(message: GetPtzVelocityResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.velocity !== undefined &&
      (obj.velocity = message.velocity
        ? PtzVelocity.toJSON(message.velocity)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetPtzVelocityResponse>, I>>(
    object: I
  ): GetPtzVelocityResponse {
    const message = createBaseGetPtzVelocityResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.velocity =
      object.velocity !== undefined && object.velocity !== null
        ? PtzVelocity.fromPartial(object.velocity)
        : undefined;
    return message;
  },
};

function createBaseListPtzRequest(): ListPtzRequest {
  return { header: undefined };
}

export const ListPtzRequest = {
  encode(
    message: ListPtzRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListPtzRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListPtzRequest();
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

  fromJSON(object: any): ListPtzRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: ListPtzRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListPtzRequest>, I>>(
    object: I
  ): ListPtzRequest {
    const message = createBaseListPtzRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseListPtzResponse(): ListPtzResponse {
  return { header: undefined, ptzs: [] };
}

export const ListPtzResponse = {
  encode(
    message: ListPtzResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.ptzs) {
      PtzDescription.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListPtzResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListPtzResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.ptzs.push(PtzDescription.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListPtzResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      ptzs: Array.isArray(object?.ptzs)
        ? object.ptzs.map((e: any) => PtzDescription.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListPtzResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.ptzs) {
      obj.ptzs = message.ptzs.map((e) =>
        e ? PtzDescription.toJSON(e) : undefined
      );
    } else {
      obj.ptzs = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListPtzResponse>, I>>(
    object: I
  ): ListPtzResponse {
    const message = createBaseListPtzResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.ptzs = object.ptzs?.map((e) => PtzDescription.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSetPtzPositionRequest(): SetPtzPositionRequest {
  return { header: undefined, position: undefined };
}

export const SetPtzPositionRequest = {
  encode(
    message: SetPtzPositionRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.position !== undefined) {
      PtzPosition.encode(message.position, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SetPtzPositionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetPtzPositionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.position = PtzPosition.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetPtzPositionRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      position: isSet(object.position)
        ? PtzPosition.fromJSON(object.position)
        : undefined,
    };
  },

  toJSON(message: SetPtzPositionRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.position !== undefined &&
      (obj.position = message.position
        ? PtzPosition.toJSON(message.position)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetPtzPositionRequest>, I>>(
    object: I
  ): SetPtzPositionRequest {
    const message = createBaseSetPtzPositionRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.position =
      object.position !== undefined && object.position !== null
        ? PtzPosition.fromPartial(object.position)
        : undefined;
    return message;
  },
};

function createBaseSetPtzPositionResponse(): SetPtzPositionResponse {
  return { header: undefined, position: undefined };
}

export const SetPtzPositionResponse = {
  encode(
    message: SetPtzPositionResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.position !== undefined) {
      PtzPosition.encode(message.position, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SetPtzPositionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetPtzPositionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.position = PtzPosition.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetPtzPositionResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      position: isSet(object.position)
        ? PtzPosition.fromJSON(object.position)
        : undefined,
    };
  },

  toJSON(message: SetPtzPositionResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.position !== undefined &&
      (obj.position = message.position
        ? PtzPosition.toJSON(message.position)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetPtzPositionResponse>, I>>(
    object: I
  ): SetPtzPositionResponse {
    const message = createBaseSetPtzPositionResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.position =
      object.position !== undefined && object.position !== null
        ? PtzPosition.fromPartial(object.position)
        : undefined;
    return message;
  },
};

function createBaseSetPtzVelocityRequest(): SetPtzVelocityRequest {
  return { header: undefined, velocity: undefined };
}

export const SetPtzVelocityRequest = {
  encode(
    message: SetPtzVelocityRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.velocity !== undefined) {
      PtzVelocity.encode(message.velocity, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SetPtzVelocityRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetPtzVelocityRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.velocity = PtzVelocity.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetPtzVelocityRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      velocity: isSet(object.velocity)
        ? PtzVelocity.fromJSON(object.velocity)
        : undefined,
    };
  },

  toJSON(message: SetPtzVelocityRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.velocity !== undefined &&
      (obj.velocity = message.velocity
        ? PtzVelocity.toJSON(message.velocity)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetPtzVelocityRequest>, I>>(
    object: I
  ): SetPtzVelocityRequest {
    const message = createBaseSetPtzVelocityRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.velocity =
      object.velocity !== undefined && object.velocity !== null
        ? PtzVelocity.fromPartial(object.velocity)
        : undefined;
    return message;
  },
};

function createBaseSetPtzVelocityResponse(): SetPtzVelocityResponse {
  return { header: undefined, velocity: undefined };
}

export const SetPtzVelocityResponse = {
  encode(
    message: SetPtzVelocityResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.velocity !== undefined) {
      PtzVelocity.encode(message.velocity, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SetPtzVelocityResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetPtzVelocityResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.velocity = PtzVelocity.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetPtzVelocityResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      velocity: isSet(object.velocity)
        ? PtzVelocity.fromJSON(object.velocity)
        : undefined,
    };
  },

  toJSON(message: SetPtzVelocityResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.velocity !== undefined &&
      (obj.velocity = message.velocity
        ? PtzVelocity.toJSON(message.velocity)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetPtzVelocityResponse>, I>>(
    object: I
  ): SetPtzVelocityResponse {
    const message = createBaseSetPtzVelocityResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.velocity =
      object.velocity !== undefined && object.velocity !== null
        ? PtzVelocity.fromPartial(object.velocity)
        : undefined;
    return message;
  },
};

function createBaseInitializeLensRequest(): InitializeLensRequest {
  return { header: undefined };
}

export const InitializeLensRequest = {
  encode(
    message: InitializeLensRequest,
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
  ): InitializeLensRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInitializeLensRequest();
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

  fromJSON(object: any): InitializeLensRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: InitializeLensRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<InitializeLensRequest>, I>>(
    object: I
  ): InitializeLensRequest {
    const message = createBaseInitializeLensRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseInitializeLensResponse(): InitializeLensResponse {
  return { header: undefined };
}

export const InitializeLensResponse = {
  encode(
    message: InitializeLensResponse,
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
  ): InitializeLensResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInitializeLensResponse();
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

  fromJSON(object: any): InitializeLensResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: InitializeLensResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<InitializeLensResponse>, I>>(
    object: I
  ): InitializeLensResponse {
    const message = createBaseInitializeLensResponse();
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
