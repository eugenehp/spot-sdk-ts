/* eslint-disable */
import { RequestHeader, ResponseHeader } from "../header";
import { Camera } from "./camera";
import _m0 from "protobufjs/minimal";
import { BoolValue } from "../../../google/protobuf/wrappers";

export const protobufPackage = "bosdyn.api.spot_cam";

/**
 * A "Screen" represents a particular layout of camera images
 * used by the video stream.
 */
export interface ScreenDescription {
  /** Unique identifer for a screen. */
  name: string;
}

/** Request the current screen in use. */
export interface GetScreenRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/** Specify which screen is currently being displayed in the video stream. */
export interface GetScreenResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Identifier of the current screen. */
  name: string;
}

/** Request information about the current cameras in the video stream. */
export interface GetVisibleCamerasRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/**
 * Description of the parameters and locations of each camera in the
 * current video stream.
 */
export interface GetVisibleCamerasResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** List of all camera streams visible in the current video stream. */
  streams: GetVisibleCamerasResponse_Stream[];
}

/** The location and camera parameters for a single camera. */
export interface GetVisibleCamerasResponse_Stream {
  /** The location of this camera stream within the larger stream. */
  window: GetVisibleCamerasResponse_Stream_Window | undefined;
  /**
   * The name field in this camera member is of the form 'c:w',
   * where c is the name of the camera and w is the name of the
   * window that's projecting it.
   */
  camera: Camera | undefined;
}

/** The location of a sub-image within a larger image. */
export interface GetVisibleCamerasResponse_Stream_Window {
  xoffset: number;
  yoffset: number;
  /**
   * The image should be cropped out of the stream at this
   * resolution, and then scaled to the resolution described
   * in the 'camera' member, below.  once that scaling takes
   * place, the intrinsics will be valid.
   */
  width: number;
  height: number;
}

/** Request the different screen layouts available. */
export interface ListScreensRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/** Response with all screen layouts available. */
export interface ListScreensResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** List of all screen layouts that can be selected. */
  screens: ScreenDescription[];
}

/** Switch the camera layout in the video stream to the one specified. */
export interface SetScreenRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Identifier as specified in ListScreensResponse. */
  name: string;
}

/** Result of setting the camera layout. */
export interface SetScreenResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Identifier of the screen used. */
  name: string;
}

/** the colormap is a mapping of radiometric data to color, to make the images easier for people to look at in real time. */
export interface IrColorMap {
  colormap: IrColorMap_ColorMap;
  scale: IrColorMap_ScalingPair | undefined;
  /**
   * if auto_scale is true, then the min and max values are derived from the data itself, and the settings
   * above are ignored
   */
  autoScale: boolean | undefined;
}

export enum IrColorMap_ColorMap {
  COLORMAP_UNKNOWN = 0,
  /** COLORMAP_GREYSCALE - the greyscale colormap maps the minimum value (defined below) to black and the maximum value (defined below) to white */
  COLORMAP_GREYSCALE = 1,
  /** COLORMAP_JET - the jet colormap uses blues for values closer to the minimum, and red values for values closer to the maximum. */
  COLORMAP_JET = 2,
  /**
   * COLORMAP_INFERNO - the inferno colormap maps the minimum value to black and the maximum value to light yellow RGB(252, 252, 164). It is also
   * easier to view by those with color blindness
   */
  COLORMAP_INFERNO = 3,
  /**
   * COLORMAP_TURBO - the turbo colormap uses blues for values closer to the minumum, red values for values closer to the maximum,
   * and addresses some short comings of the jet color map such as false detail, banding and color blindness
   */
  COLORMAP_TURBO = 4,
  UNRECOGNIZED = -1,
}

export function irColorMap_ColorMapFromJSON(object: any): IrColorMap_ColorMap {
  switch (object) {
    case 0:
    case "COLORMAP_UNKNOWN":
      return IrColorMap_ColorMap.COLORMAP_UNKNOWN;
    case 1:
    case "COLORMAP_GREYSCALE":
      return IrColorMap_ColorMap.COLORMAP_GREYSCALE;
    case 2:
    case "COLORMAP_JET":
      return IrColorMap_ColorMap.COLORMAP_JET;
    case 3:
    case "COLORMAP_INFERNO":
      return IrColorMap_ColorMap.COLORMAP_INFERNO;
    case 4:
    case "COLORMAP_TURBO":
      return IrColorMap_ColorMap.COLORMAP_TURBO;
    case -1:
    case "UNRECOGNIZED":
    default:
      return IrColorMap_ColorMap.UNRECOGNIZED;
  }
}

export function irColorMap_ColorMapToJSON(object: IrColorMap_ColorMap): string {
  switch (object) {
    case IrColorMap_ColorMap.COLORMAP_UNKNOWN:
      return "COLORMAP_UNKNOWN";
    case IrColorMap_ColorMap.COLORMAP_GREYSCALE:
      return "COLORMAP_GREYSCALE";
    case IrColorMap_ColorMap.COLORMAP_JET:
      return "COLORMAP_JET";
    case IrColorMap_ColorMap.COLORMAP_INFERNO:
      return "COLORMAP_INFERNO";
    case IrColorMap_ColorMap.COLORMAP_TURBO:
      return "COLORMAP_TURBO";
    case IrColorMap_ColorMap.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface IrColorMap_ScalingPair {
  /** the minimum value to do color mapping, in degrees Celsius */
  min: number;
  /** the maximum value to do color mapping, in degrees Celsius */
  max: number;
}

export interface SetIrColormapRequest {
  header: RequestHeader | undefined;
  map: IrColorMap | undefined;
}

export interface SetIrColormapResponse {
  header: ResponseHeader | undefined;
}

export interface GetIrColormapRequest {
  header: RequestHeader | undefined;
}

export interface GetIrColormapResponse {
  header: ResponseHeader | undefined;
  map: IrColorMap | undefined;
}

/** the ir meter overlay allows for pixel-accurate measurements to be taken and displayed to the user */
export interface IrMeterOverlay {
  /** If enable isn't true, don't overlay any IR meter */
  enable: boolean;
  coords: IrMeterOverlay_NormalizedCoordinates | undefined;
}

/**
 * these coordinates, normalized from 0-1, are within the ir camera 'window'
 * note: if the coordinates lie within an 'invalid' region of the window, then
 * the meter will be disabled.
 */
export interface IrMeterOverlay_NormalizedCoordinates {
  x: number;
  y: number;
}

export interface SetIrMeterOverlayRequest {
  header: RequestHeader | undefined;
  overlay: IrMeterOverlay | undefined;
}

export interface SetIrMeterOverlayResponse {
  header: ResponseHeader | undefined;
}

function createBaseScreenDescription(): ScreenDescription {
  return { name: "" };
}

export const ScreenDescription = {
  encode(
    message: ScreenDescription,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ScreenDescription {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScreenDescription();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ScreenDescription {
    return {
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: ScreenDescription): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ScreenDescription>, I>>(
    object: I
  ): ScreenDescription {
    const message = createBaseScreenDescription();
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseGetScreenRequest(): GetScreenRequest {
  return { header: undefined };
}

export const GetScreenRequest = {
  encode(
    message: GetScreenRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetScreenRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetScreenRequest();
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

  fromJSON(object: any): GetScreenRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: GetScreenRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetScreenRequest>, I>>(
    object: I
  ): GetScreenRequest {
    const message = createBaseGetScreenRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseGetScreenResponse(): GetScreenResponse {
  return { header: undefined, name: "" };
}

export const GetScreenResponse = {
  encode(
    message: GetScreenResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetScreenResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetScreenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetScreenResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: GetScreenResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetScreenResponse>, I>>(
    object: I
  ): GetScreenResponse {
    const message = createBaseGetScreenResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseGetVisibleCamerasRequest(): GetVisibleCamerasRequest {
  return { header: undefined };
}

export const GetVisibleCamerasRequest = {
  encode(
    message: GetVisibleCamerasRequest,
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
  ): GetVisibleCamerasRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetVisibleCamerasRequest();
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

  fromJSON(object: any): GetVisibleCamerasRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: GetVisibleCamerasRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetVisibleCamerasRequest>, I>>(
    object: I
  ): GetVisibleCamerasRequest {
    const message = createBaseGetVisibleCamerasRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseGetVisibleCamerasResponse(): GetVisibleCamerasResponse {
  return { header: undefined, streams: [] };
}

export const GetVisibleCamerasResponse = {
  encode(
    message: GetVisibleCamerasResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.streams) {
      GetVisibleCamerasResponse_Stream.encode(
        v!,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetVisibleCamerasResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetVisibleCamerasResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.streams.push(
            GetVisibleCamerasResponse_Stream.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetVisibleCamerasResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      streams: Array.isArray(object?.streams)
        ? object.streams.map((e: any) =>
            GetVisibleCamerasResponse_Stream.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: GetVisibleCamerasResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.streams) {
      obj.streams = message.streams.map((e) =>
        e ? GetVisibleCamerasResponse_Stream.toJSON(e) : undefined
      );
    } else {
      obj.streams = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetVisibleCamerasResponse>, I>>(
    object: I
  ): GetVisibleCamerasResponse {
    const message = createBaseGetVisibleCamerasResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.streams =
      object.streams?.map((e) =>
        GetVisibleCamerasResponse_Stream.fromPartial(e)
      ) || [];
    return message;
  },
};

function createBaseGetVisibleCamerasResponse_Stream(): GetVisibleCamerasResponse_Stream {
  return { window: undefined, camera: undefined };
}

export const GetVisibleCamerasResponse_Stream = {
  encode(
    message: GetVisibleCamerasResponse_Stream,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.window !== undefined) {
      GetVisibleCamerasResponse_Stream_Window.encode(
        message.window,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.camera !== undefined) {
      Camera.encode(message.camera, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetVisibleCamerasResponse_Stream {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetVisibleCamerasResponse_Stream();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.window = GetVisibleCamerasResponse_Stream_Window.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.camera = Camera.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetVisibleCamerasResponse_Stream {
    return {
      window: isSet(object.window)
        ? GetVisibleCamerasResponse_Stream_Window.fromJSON(object.window)
        : undefined,
      camera: isSet(object.camera) ? Camera.fromJSON(object.camera) : undefined,
    };
  },

  toJSON(message: GetVisibleCamerasResponse_Stream): unknown {
    const obj: any = {};
    message.window !== undefined &&
      (obj.window = message.window
        ? GetVisibleCamerasResponse_Stream_Window.toJSON(message.window)
        : undefined);
    message.camera !== undefined &&
      (obj.camera = message.camera ? Camera.toJSON(message.camera) : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<GetVisibleCamerasResponse_Stream>, I>
  >(object: I): GetVisibleCamerasResponse_Stream {
    const message = createBaseGetVisibleCamerasResponse_Stream();
    message.window =
      object.window !== undefined && object.window !== null
        ? GetVisibleCamerasResponse_Stream_Window.fromPartial(object.window)
        : undefined;
    message.camera =
      object.camera !== undefined && object.camera !== null
        ? Camera.fromPartial(object.camera)
        : undefined;
    return message;
  },
};

function createBaseGetVisibleCamerasResponse_Stream_Window(): GetVisibleCamerasResponse_Stream_Window {
  return { xoffset: 0, yoffset: 0, width: 0, height: 0 };
}

export const GetVisibleCamerasResponse_Stream_Window = {
  encode(
    message: GetVisibleCamerasResponse_Stream_Window,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.xoffset !== 0) {
      writer.uint32(8).int32(message.xoffset);
    }
    if (message.yoffset !== 0) {
      writer.uint32(16).int32(message.yoffset);
    }
    if (message.width !== 0) {
      writer.uint32(24).int32(message.width);
    }
    if (message.height !== 0) {
      writer.uint32(32).int32(message.height);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetVisibleCamerasResponse_Stream_Window {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetVisibleCamerasResponse_Stream_Window();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.xoffset = reader.int32();
          break;
        case 2:
          message.yoffset = reader.int32();
          break;
        case 3:
          message.width = reader.int32();
          break;
        case 4:
          message.height = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetVisibleCamerasResponse_Stream_Window {
    return {
      xoffset: isSet(object.xoffset) ? Number(object.xoffset) : 0,
      yoffset: isSet(object.yoffset) ? Number(object.yoffset) : 0,
      width: isSet(object.width) ? Number(object.width) : 0,
      height: isSet(object.height) ? Number(object.height) : 0,
    };
  },

  toJSON(message: GetVisibleCamerasResponse_Stream_Window): unknown {
    const obj: any = {};
    message.xoffset !== undefined &&
      (obj.xoffset = Math.round(message.xoffset));
    message.yoffset !== undefined &&
      (obj.yoffset = Math.round(message.yoffset));
    message.width !== undefined && (obj.width = Math.round(message.width));
    message.height !== undefined && (obj.height = Math.round(message.height));
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<GetVisibleCamerasResponse_Stream_Window>, I>
  >(object: I): GetVisibleCamerasResponse_Stream_Window {
    const message = createBaseGetVisibleCamerasResponse_Stream_Window();
    message.xoffset = object.xoffset ?? 0;
    message.yoffset = object.yoffset ?? 0;
    message.width = object.width ?? 0;
    message.height = object.height ?? 0;
    return message;
  },
};

function createBaseListScreensRequest(): ListScreensRequest {
  return { header: undefined };
}

export const ListScreensRequest = {
  encode(
    message: ListScreensRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListScreensRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListScreensRequest();
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

  fromJSON(object: any): ListScreensRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: ListScreensRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListScreensRequest>, I>>(
    object: I
  ): ListScreensRequest {
    const message = createBaseListScreensRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseListScreensResponse(): ListScreensResponse {
  return { header: undefined, screens: [] };
}

export const ListScreensResponse = {
  encode(
    message: ListScreensResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.screens) {
      ScreenDescription.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListScreensResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListScreensResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.screens.push(
            ScreenDescription.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListScreensResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      screens: Array.isArray(object?.screens)
        ? object.screens.map((e: any) => ScreenDescription.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListScreensResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.screens) {
      obj.screens = message.screens.map((e) =>
        e ? ScreenDescription.toJSON(e) : undefined
      );
    } else {
      obj.screens = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListScreensResponse>, I>>(
    object: I
  ): ListScreensResponse {
    const message = createBaseListScreensResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.screens =
      object.screens?.map((e) => ScreenDescription.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSetScreenRequest(): SetScreenRequest {
  return { header: undefined, name: "" };
}

export const SetScreenRequest = {
  encode(
    message: SetScreenRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetScreenRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetScreenRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetScreenRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: SetScreenRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetScreenRequest>, I>>(
    object: I
  ): SetScreenRequest {
    const message = createBaseSetScreenRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseSetScreenResponse(): SetScreenResponse {
  return { header: undefined, name: "" };
}

export const SetScreenResponse = {
  encode(
    message: SetScreenResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetScreenResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetScreenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetScreenResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: SetScreenResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetScreenResponse>, I>>(
    object: I
  ): SetScreenResponse {
    const message = createBaseSetScreenResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseIrColorMap(): IrColorMap {
  return { colormap: 0, scale: undefined, autoScale: undefined };
}

export const IrColorMap = {
  encode(
    message: IrColorMap,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.colormap !== 0) {
      writer.uint32(8).int32(message.colormap);
    }
    if (message.scale !== undefined) {
      IrColorMap_ScalingPair.encode(
        message.scale,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.autoScale !== undefined) {
      BoolValue.encode(
        { value: message.autoScale! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IrColorMap {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIrColorMap();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.colormap = reader.int32() as any;
          break;
        case 2:
          message.scale = IrColorMap_ScalingPair.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.autoScale = BoolValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): IrColorMap {
    return {
      colormap: isSet(object.colormap)
        ? irColorMap_ColorMapFromJSON(object.colormap)
        : 0,
      scale: isSet(object.scale)
        ? IrColorMap_ScalingPair.fromJSON(object.scale)
        : undefined,
      autoScale: isSet(object.autoScale)
        ? Boolean(object.autoScale)
        : undefined,
    };
  },

  toJSON(message: IrColorMap): unknown {
    const obj: any = {};
    message.colormap !== undefined &&
      (obj.colormap = irColorMap_ColorMapToJSON(message.colormap));
    message.scale !== undefined &&
      (obj.scale = message.scale
        ? IrColorMap_ScalingPair.toJSON(message.scale)
        : undefined);
    message.autoScale !== undefined && (obj.autoScale = message.autoScale);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<IrColorMap>, I>>(
    object: I
  ): IrColorMap {
    const message = createBaseIrColorMap();
    message.colormap = object.colormap ?? 0;
    message.scale =
      object.scale !== undefined && object.scale !== null
        ? IrColorMap_ScalingPair.fromPartial(object.scale)
        : undefined;
    message.autoScale = object.autoScale ?? undefined;
    return message;
  },
};

function createBaseIrColorMap_ScalingPair(): IrColorMap_ScalingPair {
  return { min: 0, max: 0 };
}

export const IrColorMap_ScalingPair = {
  encode(
    message: IrColorMap_ScalingPair,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.min !== 0) {
      writer.uint32(9).double(message.min);
    }
    if (message.max !== 0) {
      writer.uint32(17).double(message.max);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): IrColorMap_ScalingPair {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIrColorMap_ScalingPair();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.min = reader.double();
          break;
        case 2:
          message.max = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): IrColorMap_ScalingPair {
    return {
      min: isSet(object.min) ? Number(object.min) : 0,
      max: isSet(object.max) ? Number(object.max) : 0,
    };
  },

  toJSON(message: IrColorMap_ScalingPair): unknown {
    const obj: any = {};
    message.min !== undefined && (obj.min = message.min);
    message.max !== undefined && (obj.max = message.max);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<IrColorMap_ScalingPair>, I>>(
    object: I
  ): IrColorMap_ScalingPair {
    const message = createBaseIrColorMap_ScalingPair();
    message.min = object.min ?? 0;
    message.max = object.max ?? 0;
    return message;
  },
};

function createBaseSetIrColormapRequest(): SetIrColormapRequest {
  return { header: undefined, map: undefined };
}

export const SetIrColormapRequest = {
  encode(
    message: SetIrColormapRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.map !== undefined) {
      IrColorMap.encode(message.map, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SetIrColormapRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetIrColormapRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.map = IrColorMap.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetIrColormapRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      map: isSet(object.map) ? IrColorMap.fromJSON(object.map) : undefined,
    };
  },

  toJSON(message: SetIrColormapRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.map !== undefined &&
      (obj.map = message.map ? IrColorMap.toJSON(message.map) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetIrColormapRequest>, I>>(
    object: I
  ): SetIrColormapRequest {
    const message = createBaseSetIrColormapRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.map =
      object.map !== undefined && object.map !== null
        ? IrColorMap.fromPartial(object.map)
        : undefined;
    return message;
  },
};

function createBaseSetIrColormapResponse(): SetIrColormapResponse {
  return { header: undefined };
}

export const SetIrColormapResponse = {
  encode(
    message: SetIrColormapResponse,
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
  ): SetIrColormapResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetIrColormapResponse();
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

  fromJSON(object: any): SetIrColormapResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: SetIrColormapResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetIrColormapResponse>, I>>(
    object: I
  ): SetIrColormapResponse {
    const message = createBaseSetIrColormapResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseGetIrColormapRequest(): GetIrColormapRequest {
  return { header: undefined };
}

export const GetIrColormapRequest = {
  encode(
    message: GetIrColormapRequest,
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
  ): GetIrColormapRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetIrColormapRequest();
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

  fromJSON(object: any): GetIrColormapRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: GetIrColormapRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetIrColormapRequest>, I>>(
    object: I
  ): GetIrColormapRequest {
    const message = createBaseGetIrColormapRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseGetIrColormapResponse(): GetIrColormapResponse {
  return { header: undefined, map: undefined };
}

export const GetIrColormapResponse = {
  encode(
    message: GetIrColormapResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.map !== undefined) {
      IrColorMap.encode(message.map, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetIrColormapResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetIrColormapResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.map = IrColorMap.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetIrColormapResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      map: isSet(object.map) ? IrColorMap.fromJSON(object.map) : undefined,
    };
  },

  toJSON(message: GetIrColormapResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.map !== undefined &&
      (obj.map = message.map ? IrColorMap.toJSON(message.map) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetIrColormapResponse>, I>>(
    object: I
  ): GetIrColormapResponse {
    const message = createBaseGetIrColormapResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.map =
      object.map !== undefined && object.map !== null
        ? IrColorMap.fromPartial(object.map)
        : undefined;
    return message;
  },
};

function createBaseIrMeterOverlay(): IrMeterOverlay {
  return { enable: false, coords: undefined };
}

export const IrMeterOverlay = {
  encode(
    message: IrMeterOverlay,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.enable === true) {
      writer.uint32(8).bool(message.enable);
    }
    if (message.coords !== undefined) {
      IrMeterOverlay_NormalizedCoordinates.encode(
        message.coords,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IrMeterOverlay {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIrMeterOverlay();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.enable = reader.bool();
          break;
        case 2:
          message.coords = IrMeterOverlay_NormalizedCoordinates.decode(
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

  fromJSON(object: any): IrMeterOverlay {
    return {
      enable: isSet(object.enable) ? Boolean(object.enable) : false,
      coords: isSet(object.coords)
        ? IrMeterOverlay_NormalizedCoordinates.fromJSON(object.coords)
        : undefined,
    };
  },

  toJSON(message: IrMeterOverlay): unknown {
    const obj: any = {};
    message.enable !== undefined && (obj.enable = message.enable);
    message.coords !== undefined &&
      (obj.coords = message.coords
        ? IrMeterOverlay_NormalizedCoordinates.toJSON(message.coords)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<IrMeterOverlay>, I>>(
    object: I
  ): IrMeterOverlay {
    const message = createBaseIrMeterOverlay();
    message.enable = object.enable ?? false;
    message.coords =
      object.coords !== undefined && object.coords !== null
        ? IrMeterOverlay_NormalizedCoordinates.fromPartial(object.coords)
        : undefined;
    return message;
  },
};

function createBaseIrMeterOverlay_NormalizedCoordinates(): IrMeterOverlay_NormalizedCoordinates {
  return { x: 0, y: 0 };
}

export const IrMeterOverlay_NormalizedCoordinates = {
  encode(
    message: IrMeterOverlay_NormalizedCoordinates,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.x !== 0) {
      writer.uint32(9).double(message.x);
    }
    if (message.y !== 0) {
      writer.uint32(17).double(message.y);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): IrMeterOverlay_NormalizedCoordinates {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIrMeterOverlay_NormalizedCoordinates();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.x = reader.double();
          break;
        case 2:
          message.y = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): IrMeterOverlay_NormalizedCoordinates {
    return {
      x: isSet(object.x) ? Number(object.x) : 0,
      y: isSet(object.y) ? Number(object.y) : 0,
    };
  },

  toJSON(message: IrMeterOverlay_NormalizedCoordinates): unknown {
    const obj: any = {};
    message.x !== undefined && (obj.x = message.x);
    message.y !== undefined && (obj.y = message.y);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<IrMeterOverlay_NormalizedCoordinates>, I>
  >(object: I): IrMeterOverlay_NormalizedCoordinates {
    const message = createBaseIrMeterOverlay_NormalizedCoordinates();
    message.x = object.x ?? 0;
    message.y = object.y ?? 0;
    return message;
  },
};

function createBaseSetIrMeterOverlayRequest(): SetIrMeterOverlayRequest {
  return { header: undefined, overlay: undefined };
}

export const SetIrMeterOverlayRequest = {
  encode(
    message: SetIrMeterOverlayRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.overlay !== undefined) {
      IrMeterOverlay.encode(message.overlay, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SetIrMeterOverlayRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetIrMeterOverlayRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.overlay = IrMeterOverlay.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetIrMeterOverlayRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      overlay: isSet(object.overlay)
        ? IrMeterOverlay.fromJSON(object.overlay)
        : undefined,
    };
  },

  toJSON(message: SetIrMeterOverlayRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.overlay !== undefined &&
      (obj.overlay = message.overlay
        ? IrMeterOverlay.toJSON(message.overlay)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetIrMeterOverlayRequest>, I>>(
    object: I
  ): SetIrMeterOverlayRequest {
    const message = createBaseSetIrMeterOverlayRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.overlay =
      object.overlay !== undefined && object.overlay !== null
        ? IrMeterOverlay.fromPartial(object.overlay)
        : undefined;
    return message;
  },
};

function createBaseSetIrMeterOverlayResponse(): SetIrMeterOverlayResponse {
  return { header: undefined };
}

export const SetIrMeterOverlayResponse = {
  encode(
    message: SetIrMeterOverlayResponse,
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
  ): SetIrMeterOverlayResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetIrMeterOverlayResponse();
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

  fromJSON(object: any): SetIrMeterOverlayResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: SetIrMeterOverlayResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetIrMeterOverlayResponse>, I>>(
    object: I
  ): SetIrMeterOverlayResponse {
    const message = createBaseSetIrMeterOverlayResponse();
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
