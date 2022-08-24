/* eslint-disable */
import { RequestHeader, ResponseHeader } from "./header";
import { Vec2 } from "./geometry";
import _m0 from "protobufjs/minimal";
import { FloatValue, BoolValue } from "../../google/protobuf/wrappers";

export const protobufPackage = "bosdyn.api";

/**
 * High dynamic range (HDR) modes available. HDR sets the camera to take multiple frames to
 * get exposure in a large range.  HDR will reduce framerate in high-framerate modes.
 */
export enum HdrParameters {
  /** HDR_UNKNOWN - (or not set): will not change HDR settings. */
  HDR_UNKNOWN = 0,
  /** HDR_OFF - HDR disabled */
  HDR_OFF = 1,
  /** HDR_AUTO - Camera's on-board processor determines how much HDR is needed */
  HDR_AUTO = 2,
  /** HDR_MANUAL_1 - Manual HDR enabled (minimum) */
  HDR_MANUAL_1 = 3,
  /** HDR_MANUAL_2 -  */
  HDR_MANUAL_2 = 4,
  /** HDR_MANUAL_3 -  */
  HDR_MANUAL_3 = 5,
  /** HDR_MANUAL_4 - Manual HDR enabled (maximum) */
  HDR_MANUAL_4 = 6,
  UNRECOGNIZED = -1,
}

export function hdrParametersFromJSON(object: any): HdrParameters {
  switch (object) {
    case 0:
    case "HDR_UNKNOWN":
      return HdrParameters.HDR_UNKNOWN;
    case 1:
    case "HDR_OFF":
      return HdrParameters.HDR_OFF;
    case 2:
    case "HDR_AUTO":
      return HdrParameters.HDR_AUTO;
    case 3:
    case "HDR_MANUAL_1":
      return HdrParameters.HDR_MANUAL_1;
    case 4:
    case "HDR_MANUAL_2":
      return HdrParameters.HDR_MANUAL_2;
    case 5:
    case "HDR_MANUAL_3":
      return HdrParameters.HDR_MANUAL_3;
    case 6:
    case "HDR_MANUAL_4":
      return HdrParameters.HDR_MANUAL_4;
    case -1:
    case "UNRECOGNIZED":
    default:
      return HdrParameters.UNRECOGNIZED;
  }
}

export function hdrParametersToJSON(object: HdrParameters): string {
  switch (object) {
    case HdrParameters.HDR_UNKNOWN:
      return "HDR_UNKNOWN";
    case HdrParameters.HDR_OFF:
      return "HDR_OFF";
    case HdrParameters.HDR_AUTO:
      return "HDR_AUTO";
    case HdrParameters.HDR_MANUAL_1:
      return "HDR_MANUAL_1";
    case HdrParameters.HDR_MANUAL_2:
      return "HDR_MANUAL_2";
    case HdrParameters.HDR_MANUAL_3:
      return "HDR_MANUAL_3";
    case HdrParameters.HDR_MANUAL_4:
      return "HDR_MANUAL_4";
    case HdrParameters.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** The GripperCameraParam request message sets new gripper sensor parameters. Gripper sensor parameters do not persist across reboots. */
export interface GripperCameraParamRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  params: GripperCameraParams | undefined;
}

export interface GripperCameraParamResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
}

/** The GripperCameraGetParam request message queries the robot for the current gripper sensor parameters. */
export interface GripperCameraGetParamRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/** The GripperCameraGetParam response message contains the current gripper sensor parameters. Gripper sensor parameters do not persist across reboots. */
export interface GripperCameraGetParamResponse {
  /** Common request header. */
  header: ResponseHeader | undefined;
  params: GripperCameraParams | undefined;
}

export interface GripperCameraParams {
  /** CameraMode sets the resolution, frame rate and image format. */
  cameraMode: GripperCameraParams_CameraMode;
  /**
   * Set the image brightness level.
   * Min 0, max 1
   */
  brightness: number | undefined;
  /**
   * Set the image contrast level.
   * Min 0, max 1
   */
  contrast: number | undefined;
  /**
   * Set the image saturation level.
   * Min 0, max 1
   */
  saturation: number | undefined;
  /**
   * Set the image gain level.
   * Min 0, max 1
   */
  gain: number | undefined;
  /**
   * Whether the camera should use auto exposure.
   * Defaults to true.
   */
  exposureAuto: boolean | undefined;
  /**
   * Manually set the image exposure level. This value is only used if exposure_auto is false.
   * Min 0, max 1
   */
  exposureAbsolute: number | undefined;
  /**
   * Region of interest for exposure.  Specify a spot exposure on a
   * certain part of the image.  Only used in auto-exposure mode.
   */
  exposureRoi: RoiParameters | undefined;
  /**
   * Whether the camera should automatically focus the image.
   * Default true
   */
  focusAuto: boolean | undefined;
  /**
   * Manually set the image focus. This value is only used if focus_auto is false.
   * Min 0, max 1
   * 0 corresponds to focus at infinity, 1 corresponds to a focal point close to the camera.
   */
  focusAbsolute: number | undefined;
  /** Region of interest for focus.  Only used when in auto-focus mode. */
  focusRoi: RoiParameters | undefined;
  /**
   * Set to true to draw a rectangle in the image where the focus ROI is.
   * Default: false
   */
  drawFocusRoiRectangle: boolean | undefined;
  /**
   * High dynamic range (HDR) mode sets the camera to take multiple frames to get exposure
   * in a large range.  HDR will reduce framerate in high-framerate modes.
   */
  hdr: HdrParameters;
  /** Set the LED mode. */
  ledMode: GripperCameraParams_LedMode;
  /**
   * Brightness of the LED in torch mode.  Min = 0, max = 1.
   * Note: A brightness value of 0 is *not* off, but is the minimum brightness.
   *       To turn off the LED, set the led_mode to LED_MODE_OFF
   */
  ledTorchBrightness: number | undefined;
}

export enum GripperCameraParams_CameraMode {
  /** MODE_UNKNOWN - MODE_UNKNOWN should not be used. */
  MODE_UNKNOWN = 0,
  /** MODE_1280_720_60FPS_UYVY - 1280x720 pixels at 60 frames per second in UYVY format */
  MODE_1280_720_60FPS_UYVY = 1,
  /**
   * MODE_640_480_120FPS_UYVY - 640x480 pixels at 120 frames per second in UYVY format
   * Warning: this frame rate may not be achievable with long exposure times.
   */
  MODE_640_480_120FPS_UYVY = 11,
  /** MODE_1920_1080_60FPS_MJPG - 1920x1080 pixels at 60 frames per second in Motion JPG format */
  MODE_1920_1080_60FPS_MJPG = 14,
  /** MODE_3840_2160_30FPS_MJPG - 3840x2160 pixels at 30 frames per second in Motion JPG format */
  MODE_3840_2160_30FPS_MJPG = 15,
  /** MODE_4208_3120_20FPS_MJPG - 4208x3120 pixels at 20 frames per second in Motion JPG format */
  MODE_4208_3120_20FPS_MJPG = 16,
  /** MODE_4096_2160_30FPS_MJPG - 4096x2160 pixels at 30 frames per second in Motion JPG format */
  MODE_4096_2160_30FPS_MJPG = 17,
  UNRECOGNIZED = -1,
}

export function gripperCameraParams_CameraModeFromJSON(
  object: any
): GripperCameraParams_CameraMode {
  switch (object) {
    case 0:
    case "MODE_UNKNOWN":
      return GripperCameraParams_CameraMode.MODE_UNKNOWN;
    case 1:
    case "MODE_1280_720_60FPS_UYVY":
      return GripperCameraParams_CameraMode.MODE_1280_720_60FPS_UYVY;
    case 11:
    case "MODE_640_480_120FPS_UYVY":
      return GripperCameraParams_CameraMode.MODE_640_480_120FPS_UYVY;
    case 14:
    case "MODE_1920_1080_60FPS_MJPG":
      return GripperCameraParams_CameraMode.MODE_1920_1080_60FPS_MJPG;
    case 15:
    case "MODE_3840_2160_30FPS_MJPG":
      return GripperCameraParams_CameraMode.MODE_3840_2160_30FPS_MJPG;
    case 16:
    case "MODE_4208_3120_20FPS_MJPG":
      return GripperCameraParams_CameraMode.MODE_4208_3120_20FPS_MJPG;
    case 17:
    case "MODE_4096_2160_30FPS_MJPG":
      return GripperCameraParams_CameraMode.MODE_4096_2160_30FPS_MJPG;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GripperCameraParams_CameraMode.UNRECOGNIZED;
  }
}

export function gripperCameraParams_CameraModeToJSON(
  object: GripperCameraParams_CameraMode
): string {
  switch (object) {
    case GripperCameraParams_CameraMode.MODE_UNKNOWN:
      return "MODE_UNKNOWN";
    case GripperCameraParams_CameraMode.MODE_1280_720_60FPS_UYVY:
      return "MODE_1280_720_60FPS_UYVY";
    case GripperCameraParams_CameraMode.MODE_640_480_120FPS_UYVY:
      return "MODE_640_480_120FPS_UYVY";
    case GripperCameraParams_CameraMode.MODE_1920_1080_60FPS_MJPG:
      return "MODE_1920_1080_60FPS_MJPG";
    case GripperCameraParams_CameraMode.MODE_3840_2160_30FPS_MJPG:
      return "MODE_3840_2160_30FPS_MJPG";
    case GripperCameraParams_CameraMode.MODE_4208_3120_20FPS_MJPG:
      return "MODE_4208_3120_20FPS_MJPG";
    case GripperCameraParams_CameraMode.MODE_4096_2160_30FPS_MJPG:
      return "MODE_4096_2160_30FPS_MJPG";
    case GripperCameraParams_CameraMode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum GripperCameraParams_LedMode {
  /** LED_MODE_UNKNOWN - LED_MODE_UNKNOWN should not be used. */
  LED_MODE_UNKNOWN = 0,
  /** LED_MODE_OFF - Off */
  LED_MODE_OFF = 1,
  /** LED_MODE_TORCH - Constantly on. Brightness level can be set in the led_torch_brightness field. */
  LED_MODE_TORCH = 2,
  UNRECOGNIZED = -1,
}

export function gripperCameraParams_LedModeFromJSON(
  object: any
): GripperCameraParams_LedMode {
  switch (object) {
    case 0:
    case "LED_MODE_UNKNOWN":
      return GripperCameraParams_LedMode.LED_MODE_UNKNOWN;
    case 1:
    case "LED_MODE_OFF":
      return GripperCameraParams_LedMode.LED_MODE_OFF;
    case 2:
    case "LED_MODE_TORCH":
      return GripperCameraParams_LedMode.LED_MODE_TORCH;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GripperCameraParams_LedMode.UNRECOGNIZED;
  }
}

export function gripperCameraParams_LedModeToJSON(
  object: GripperCameraParams_LedMode
): string {
  switch (object) {
    case GripperCameraParams_LedMode.LED_MODE_UNKNOWN:
      return "LED_MODE_UNKNOWN";
    case GripperCameraParams_LedMode.LED_MODE_OFF:
      return "LED_MODE_OFF";
    case GripperCameraParams_LedMode.LED_MODE_TORCH:
      return "LED_MODE_TORCH";
    case GripperCameraParams_LedMode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Region of interest (ROI) indicates the region within the image that should be used for
 * determination of automatic focus or exposure.
 */
export interface RoiParameters {
  /**
   * Center point of the ROI in the image. The upper lefthand corner of the image is (0, 0) and
   * the lower righthand corner is (1, 1). The middle of the image is (0.5, 0.5).
   */
  roiPercentageInImage: Vec2 | undefined;
  /** Size of the region of interest. */
  windowSize: RoiParameters_RoiWindowSize;
}

export enum RoiParameters_RoiWindowSize {
  /** ROI_WINDOW_SIZE_UNKNOWN - ROI window size, 1 is the smallest, 8 is the largest. */
  ROI_WINDOW_SIZE_UNKNOWN = 0,
  ROI_WINDOW_SIZE_1 = 1,
  ROI_WINDOW_SIZE_2 = 2,
  ROI_WINDOW_SIZE_3 = 3,
  ROI_WINDOW_SIZE_4 = 4,
  ROI_WINDOW_SIZE_5 = 5,
  ROI_WINDOW_SIZE_6 = 6,
  ROI_WINDOW_SIZE_7 = 7,
  ROI_WINDOW_SIZE_8 = 8,
  UNRECOGNIZED = -1,
}

export function roiParameters_RoiWindowSizeFromJSON(
  object: any
): RoiParameters_RoiWindowSize {
  switch (object) {
    case 0:
    case "ROI_WINDOW_SIZE_UNKNOWN":
      return RoiParameters_RoiWindowSize.ROI_WINDOW_SIZE_UNKNOWN;
    case 1:
    case "ROI_WINDOW_SIZE_1":
      return RoiParameters_RoiWindowSize.ROI_WINDOW_SIZE_1;
    case 2:
    case "ROI_WINDOW_SIZE_2":
      return RoiParameters_RoiWindowSize.ROI_WINDOW_SIZE_2;
    case 3:
    case "ROI_WINDOW_SIZE_3":
      return RoiParameters_RoiWindowSize.ROI_WINDOW_SIZE_3;
    case 4:
    case "ROI_WINDOW_SIZE_4":
      return RoiParameters_RoiWindowSize.ROI_WINDOW_SIZE_4;
    case 5:
    case "ROI_WINDOW_SIZE_5":
      return RoiParameters_RoiWindowSize.ROI_WINDOW_SIZE_5;
    case 6:
    case "ROI_WINDOW_SIZE_6":
      return RoiParameters_RoiWindowSize.ROI_WINDOW_SIZE_6;
    case 7:
    case "ROI_WINDOW_SIZE_7":
      return RoiParameters_RoiWindowSize.ROI_WINDOW_SIZE_7;
    case 8:
    case "ROI_WINDOW_SIZE_8":
      return RoiParameters_RoiWindowSize.ROI_WINDOW_SIZE_8;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RoiParameters_RoiWindowSize.UNRECOGNIZED;
  }
}

export function roiParameters_RoiWindowSizeToJSON(
  object: RoiParameters_RoiWindowSize
): string {
  switch (object) {
    case RoiParameters_RoiWindowSize.ROI_WINDOW_SIZE_UNKNOWN:
      return "ROI_WINDOW_SIZE_UNKNOWN";
    case RoiParameters_RoiWindowSize.ROI_WINDOW_SIZE_1:
      return "ROI_WINDOW_SIZE_1";
    case RoiParameters_RoiWindowSize.ROI_WINDOW_SIZE_2:
      return "ROI_WINDOW_SIZE_2";
    case RoiParameters_RoiWindowSize.ROI_WINDOW_SIZE_3:
      return "ROI_WINDOW_SIZE_3";
    case RoiParameters_RoiWindowSize.ROI_WINDOW_SIZE_4:
      return "ROI_WINDOW_SIZE_4";
    case RoiParameters_RoiWindowSize.ROI_WINDOW_SIZE_5:
      return "ROI_WINDOW_SIZE_5";
    case RoiParameters_RoiWindowSize.ROI_WINDOW_SIZE_6:
      return "ROI_WINDOW_SIZE_6";
    case RoiParameters_RoiWindowSize.ROI_WINDOW_SIZE_7:
      return "ROI_WINDOW_SIZE_7";
    case RoiParameters_RoiWindowSize.ROI_WINDOW_SIZE_8:
      return "ROI_WINDOW_SIZE_8";
    case RoiParameters_RoiWindowSize.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseGripperCameraParamRequest(): GripperCameraParamRequest {
  return { header: undefined, params: undefined };
}

export const GripperCameraParamRequest = {
  encode(
    message: GripperCameraParamRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.params !== undefined) {
      GripperCameraParams.encode(
        message.params,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GripperCameraParamRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGripperCameraParamRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.params = GripperCameraParams.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GripperCameraParamRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      params: isSet(object.params)
        ? GripperCameraParams.fromJSON(object.params)
        : undefined,
    };
  },

  toJSON(message: GripperCameraParamRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.params !== undefined &&
      (obj.params = message.params
        ? GripperCameraParams.toJSON(message.params)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GripperCameraParamRequest>, I>>(
    object: I
  ): GripperCameraParamRequest {
    const message = createBaseGripperCameraParamRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.params =
      object.params !== undefined && object.params !== null
        ? GripperCameraParams.fromPartial(object.params)
        : undefined;
    return message;
  },
};

function createBaseGripperCameraParamResponse(): GripperCameraParamResponse {
  return { header: undefined };
}

export const GripperCameraParamResponse = {
  encode(
    message: GripperCameraParamResponse,
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
  ): GripperCameraParamResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGripperCameraParamResponse();
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

  fromJSON(object: any): GripperCameraParamResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: GripperCameraParamResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GripperCameraParamResponse>, I>>(
    object: I
  ): GripperCameraParamResponse {
    const message = createBaseGripperCameraParamResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseGripperCameraGetParamRequest(): GripperCameraGetParamRequest {
  return { header: undefined };
}

export const GripperCameraGetParamRequest = {
  encode(
    message: GripperCameraGetParamRequest,
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
  ): GripperCameraGetParamRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGripperCameraGetParamRequest();
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

  fromJSON(object: any): GripperCameraGetParamRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: GripperCameraGetParamRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GripperCameraGetParamRequest>, I>>(
    object: I
  ): GripperCameraGetParamRequest {
    const message = createBaseGripperCameraGetParamRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseGripperCameraGetParamResponse(): GripperCameraGetParamResponse {
  return { header: undefined, params: undefined };
}

export const GripperCameraGetParamResponse = {
  encode(
    message: GripperCameraGetParamResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.params !== undefined) {
      GripperCameraParams.encode(
        message.params,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GripperCameraGetParamResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGripperCameraGetParamResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.params = GripperCameraParams.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GripperCameraGetParamResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      params: isSet(object.params)
        ? GripperCameraParams.fromJSON(object.params)
        : undefined,
    };
  },

  toJSON(message: GripperCameraGetParamResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.params !== undefined &&
      (obj.params = message.params
        ? GripperCameraParams.toJSON(message.params)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GripperCameraGetParamResponse>, I>>(
    object: I
  ): GripperCameraGetParamResponse {
    const message = createBaseGripperCameraGetParamResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.params =
      object.params !== undefined && object.params !== null
        ? GripperCameraParams.fromPartial(object.params)
        : undefined;
    return message;
  },
};

function createBaseGripperCameraParams(): GripperCameraParams {
  return {
    cameraMode: 0,
    brightness: undefined,
    contrast: undefined,
    saturation: undefined,
    gain: undefined,
    exposureAuto: undefined,
    exposureAbsolute: undefined,
    exposureRoi: undefined,
    focusAuto: undefined,
    focusAbsolute: undefined,
    focusRoi: undefined,
    drawFocusRoiRectangle: undefined,
    hdr: 0,
    ledMode: 0,
    ledTorchBrightness: undefined,
  };
}

export const GripperCameraParams = {
  encode(
    message: GripperCameraParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.cameraMode !== 0) {
      writer.uint32(8).int32(message.cameraMode);
    }
    if (message.brightness !== undefined) {
      FloatValue.encode(
        { value: message.brightness! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.contrast !== undefined) {
      FloatValue.encode(
        { value: message.contrast! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.saturation !== undefined) {
      FloatValue.encode(
        { value: message.saturation! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.gain !== undefined) {
      FloatValue.encode(
        { value: message.gain! },
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.exposureAuto !== undefined) {
      BoolValue.encode(
        { value: message.exposureAuto! },
        writer.uint32(82).fork()
      ).ldelim();
    }
    if (message.exposureAbsolute !== undefined) {
      FloatValue.encode(
        { value: message.exposureAbsolute! },
        writer.uint32(90).fork()
      ).ldelim();
    }
    if (message.exposureRoi !== undefined) {
      RoiParameters.encode(
        message.exposureRoi,
        writer.uint32(130).fork()
      ).ldelim();
    }
    if (message.focusAuto !== undefined) {
      BoolValue.encode(
        { value: message.focusAuto! },
        writer.uint32(106).fork()
      ).ldelim();
    }
    if (message.focusAbsolute !== undefined) {
      FloatValue.encode(
        { value: message.focusAbsolute! },
        writer.uint32(98).fork()
      ).ldelim();
    }
    if (message.focusRoi !== undefined) {
      RoiParameters.encode(
        message.focusRoi,
        writer.uint32(114).fork()
      ).ldelim();
    }
    if (message.drawFocusRoiRectangle !== undefined) {
      BoolValue.encode(
        { value: message.drawFocusRoiRectangle! },
        writer.uint32(146).fork()
      ).ldelim();
    }
    if (message.hdr !== 0) {
      writer.uint32(136).int32(message.hdr);
    }
    if (message.ledMode !== 0) {
      writer.uint32(152).int32(message.ledMode);
    }
    if (message.ledTorchBrightness !== undefined) {
      FloatValue.encode(
        { value: message.ledTorchBrightness! },
        writer.uint32(162).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GripperCameraParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGripperCameraParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cameraMode = reader.int32() as any;
          break;
        case 2:
          message.brightness = FloatValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.contrast = FloatValue.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.saturation = FloatValue.decode(reader, reader.uint32()).value;
          break;
        case 7:
          message.gain = FloatValue.decode(reader, reader.uint32()).value;
          break;
        case 10:
          message.exposureAuto = BoolValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 11:
          message.exposureAbsolute = FloatValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 16:
          message.exposureRoi = RoiParameters.decode(reader, reader.uint32());
          break;
        case 13:
          message.focusAuto = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 12:
          message.focusAbsolute = FloatValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 14:
          message.focusRoi = RoiParameters.decode(reader, reader.uint32());
          break;
        case 18:
          message.drawFocusRoiRectangle = BoolValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 17:
          message.hdr = reader.int32() as any;
          break;
        case 19:
          message.ledMode = reader.int32() as any;
          break;
        case 20:
          message.ledTorchBrightness = FloatValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GripperCameraParams {
    return {
      cameraMode: isSet(object.cameraMode)
        ? gripperCameraParams_CameraModeFromJSON(object.cameraMode)
        : 0,
      brightness: isSet(object.brightness)
        ? Number(object.brightness)
        : undefined,
      contrast: isSet(object.contrast) ? Number(object.contrast) : undefined,
      saturation: isSet(object.saturation)
        ? Number(object.saturation)
        : undefined,
      gain: isSet(object.gain) ? Number(object.gain) : undefined,
      exposureAuto: isSet(object.exposureAuto)
        ? Boolean(object.exposureAuto)
        : undefined,
      exposureAbsolute: isSet(object.exposureAbsolute)
        ? Number(object.exposureAbsolute)
        : undefined,
      exposureRoi: isSet(object.exposureRoi)
        ? RoiParameters.fromJSON(object.exposureRoi)
        : undefined,
      focusAuto: isSet(object.focusAuto)
        ? Boolean(object.focusAuto)
        : undefined,
      focusAbsolute: isSet(object.focusAbsolute)
        ? Number(object.focusAbsolute)
        : undefined,
      focusRoi: isSet(object.focusRoi)
        ? RoiParameters.fromJSON(object.focusRoi)
        : undefined,
      drawFocusRoiRectangle: isSet(object.drawFocusRoiRectangle)
        ? Boolean(object.drawFocusRoiRectangle)
        : undefined,
      hdr: isSet(object.hdr) ? hdrParametersFromJSON(object.hdr) : 0,
      ledMode: isSet(object.ledMode)
        ? gripperCameraParams_LedModeFromJSON(object.ledMode)
        : 0,
      ledTorchBrightness: isSet(object.ledTorchBrightness)
        ? Number(object.ledTorchBrightness)
        : undefined,
    };
  },

  toJSON(message: GripperCameraParams): unknown {
    const obj: any = {};
    message.cameraMode !== undefined &&
      (obj.cameraMode = gripperCameraParams_CameraModeToJSON(
        message.cameraMode
      ));
    message.brightness !== undefined && (obj.brightness = message.brightness);
    message.contrast !== undefined && (obj.contrast = message.contrast);
    message.saturation !== undefined && (obj.saturation = message.saturation);
    message.gain !== undefined && (obj.gain = message.gain);
    message.exposureAuto !== undefined &&
      (obj.exposureAuto = message.exposureAuto);
    message.exposureAbsolute !== undefined &&
      (obj.exposureAbsolute = message.exposureAbsolute);
    message.exposureRoi !== undefined &&
      (obj.exposureRoi = message.exposureRoi
        ? RoiParameters.toJSON(message.exposureRoi)
        : undefined);
    message.focusAuto !== undefined && (obj.focusAuto = message.focusAuto);
    message.focusAbsolute !== undefined &&
      (obj.focusAbsolute = message.focusAbsolute);
    message.focusRoi !== undefined &&
      (obj.focusRoi = message.focusRoi
        ? RoiParameters.toJSON(message.focusRoi)
        : undefined);
    message.drawFocusRoiRectangle !== undefined &&
      (obj.drawFocusRoiRectangle = message.drawFocusRoiRectangle);
    message.hdr !== undefined && (obj.hdr = hdrParametersToJSON(message.hdr));
    message.ledMode !== undefined &&
      (obj.ledMode = gripperCameraParams_LedModeToJSON(message.ledMode));
    message.ledTorchBrightness !== undefined &&
      (obj.ledTorchBrightness = message.ledTorchBrightness);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GripperCameraParams>, I>>(
    object: I
  ): GripperCameraParams {
    const message = createBaseGripperCameraParams();
    message.cameraMode = object.cameraMode ?? 0;
    message.brightness = object.brightness ?? undefined;
    message.contrast = object.contrast ?? undefined;
    message.saturation = object.saturation ?? undefined;
    message.gain = object.gain ?? undefined;
    message.exposureAuto = object.exposureAuto ?? undefined;
    message.exposureAbsolute = object.exposureAbsolute ?? undefined;
    message.exposureRoi =
      object.exposureRoi !== undefined && object.exposureRoi !== null
        ? RoiParameters.fromPartial(object.exposureRoi)
        : undefined;
    message.focusAuto = object.focusAuto ?? undefined;
    message.focusAbsolute = object.focusAbsolute ?? undefined;
    message.focusRoi =
      object.focusRoi !== undefined && object.focusRoi !== null
        ? RoiParameters.fromPartial(object.focusRoi)
        : undefined;
    message.drawFocusRoiRectangle = object.drawFocusRoiRectangle ?? undefined;
    message.hdr = object.hdr ?? 0;
    message.ledMode = object.ledMode ?? 0;
    message.ledTorchBrightness = object.ledTorchBrightness ?? undefined;
    return message;
  },
};

function createBaseRoiParameters(): RoiParameters {
  return { roiPercentageInImage: undefined, windowSize: 0 };
}

export const RoiParameters = {
  encode(
    message: RoiParameters,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.roiPercentageInImage !== undefined) {
      Vec2.encode(
        message.roiPercentageInImage,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.windowSize !== 0) {
      writer.uint32(16).int32(message.windowSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RoiParameters {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRoiParameters();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.roiPercentageInImage = Vec2.decode(reader, reader.uint32());
          break;
        case 2:
          message.windowSize = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RoiParameters {
    return {
      roiPercentageInImage: isSet(object.roiPercentageInImage)
        ? Vec2.fromJSON(object.roiPercentageInImage)
        : undefined,
      windowSize: isSet(object.windowSize)
        ? roiParameters_RoiWindowSizeFromJSON(object.windowSize)
        : 0,
    };
  },

  toJSON(message: RoiParameters): unknown {
    const obj: any = {};
    message.roiPercentageInImage !== undefined &&
      (obj.roiPercentageInImage = message.roiPercentageInImage
        ? Vec2.toJSON(message.roiPercentageInImage)
        : undefined);
    message.windowSize !== undefined &&
      (obj.windowSize = roiParameters_RoiWindowSizeToJSON(message.windowSize));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RoiParameters>, I>>(
    object: I
  ): RoiParameters {
    const message = createBaseRoiParameters();
    message.roiPercentageInImage =
      object.roiPercentageInImage !== undefined &&
      object.roiPercentageInImage !== null
        ? Vec2.fromPartial(object.roiPercentageInImage)
        : undefined;
    message.windowSize = object.windowSize ?? 0;
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
