/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp";
import { Duration } from "../../google/protobuf/duration";
import { FrameTreeSnapshot, Vec2 } from "./geometry";
import { RequestHeader, ResponseHeader } from "./header";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/** Rectangular color/greyscale/depth images. */
export interface Image {
  /** Number of columns in the image (in pixels). */
  cols: number;
  /** Number of rows in the image (in pixels). */
  rows: number;
  /** Raw image data. */
  data: Uint8Array;
  /** How the image is encoded. */
  format: Image_Format;
  /**
   * Pixel format of the image; this will be set even when the Format implies
   * the pixel format.
   */
  pixelFormat: Image_PixelFormat;
}

export enum Image_Format {
  /** FORMAT_UNKNOWN - Unknown image format. */
  FORMAT_UNKNOWN = 0,
  /**
   * FORMAT_JPEG - Color/greyscale formats.
   * JPEG format.
   */
  FORMAT_JPEG = 1,
  /** FORMAT_RAW - Uncompressed.  Requires pixel_format. */
  FORMAT_RAW = 2,
  /** FORMAT_RLE - 1 byte run-length before each pixel value. */
  FORMAT_RLE = 3,
  UNRECOGNIZED = -1,
}

export function image_FormatFromJSON(object: any): Image_Format {
  switch (object) {
    case 0:
    case "FORMAT_UNKNOWN":
      return Image_Format.FORMAT_UNKNOWN;
    case 1:
    case "FORMAT_JPEG":
      return Image_Format.FORMAT_JPEG;
    case 2:
    case "FORMAT_RAW":
      return Image_Format.FORMAT_RAW;
    case 3:
    case "FORMAT_RLE":
      return Image_Format.FORMAT_RLE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Image_Format.UNRECOGNIZED;
  }
}

export function image_FormatToJSON(object: Image_Format): string {
  switch (object) {
    case Image_Format.FORMAT_UNKNOWN:
      return "FORMAT_UNKNOWN";
    case Image_Format.FORMAT_JPEG:
      return "FORMAT_JPEG";
    case Image_Format.FORMAT_RAW:
      return "FORMAT_RAW";
    case Image_Format.FORMAT_RLE:
      return "FORMAT_RLE";
    case Image_Format.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum Image_PixelFormat {
  /** PIXEL_FORMAT_UNKNOWN - Unspecified value -- should not be used. */
  PIXEL_FORMAT_UNKNOWN = 0,
  /** PIXEL_FORMAT_GREYSCALE_U8 - One byte per pixel. */
  PIXEL_FORMAT_GREYSCALE_U8 = 1,
  /** PIXEL_FORMAT_RGB_U8 - Three bytes per pixel. */
  PIXEL_FORMAT_RGB_U8 = 3,
  /** PIXEL_FORMAT_RGBA_U8 - Four bytes per pixel. */
  PIXEL_FORMAT_RGBA_U8 = 4,
  /** PIXEL_FORMAT_DEPTH_U16 - Little-endian uint16 z-distance from camera (mm). */
  PIXEL_FORMAT_DEPTH_U16 = 5,
  /** PIXEL_FORMAT_GREYSCALE_U16 - Two bytes per pixel. */
  PIXEL_FORMAT_GREYSCALE_U16 = 6,
  UNRECOGNIZED = -1,
}

export function image_PixelFormatFromJSON(object: any): Image_PixelFormat {
  switch (object) {
    case 0:
    case "PIXEL_FORMAT_UNKNOWN":
      return Image_PixelFormat.PIXEL_FORMAT_UNKNOWN;
    case 1:
    case "PIXEL_FORMAT_GREYSCALE_U8":
      return Image_PixelFormat.PIXEL_FORMAT_GREYSCALE_U8;
    case 3:
    case "PIXEL_FORMAT_RGB_U8":
      return Image_PixelFormat.PIXEL_FORMAT_RGB_U8;
    case 4:
    case "PIXEL_FORMAT_RGBA_U8":
      return Image_PixelFormat.PIXEL_FORMAT_RGBA_U8;
    case 5:
    case "PIXEL_FORMAT_DEPTH_U16":
      return Image_PixelFormat.PIXEL_FORMAT_DEPTH_U16;
    case 6:
    case "PIXEL_FORMAT_GREYSCALE_U16":
      return Image_PixelFormat.PIXEL_FORMAT_GREYSCALE_U16;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Image_PixelFormat.UNRECOGNIZED;
  }
}

export function image_PixelFormatToJSON(object: Image_PixelFormat): string {
  switch (object) {
    case Image_PixelFormat.PIXEL_FORMAT_UNKNOWN:
      return "PIXEL_FORMAT_UNKNOWN";
    case Image_PixelFormat.PIXEL_FORMAT_GREYSCALE_U8:
      return "PIXEL_FORMAT_GREYSCALE_U8";
    case Image_PixelFormat.PIXEL_FORMAT_RGB_U8:
      return "PIXEL_FORMAT_RGB_U8";
    case Image_PixelFormat.PIXEL_FORMAT_RGBA_U8:
      return "PIXEL_FORMAT_RGBA_U8";
    case Image_PixelFormat.PIXEL_FORMAT_DEPTH_U16:
      return "PIXEL_FORMAT_DEPTH_U16";
    case Image_PixelFormat.PIXEL_FORMAT_GREYSCALE_U16:
      return "PIXEL_FORMAT_GREYSCALE_U16";
    case Image_PixelFormat.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Sensor parameters associated with an image capture. */
export interface CaptureParameters {
  /** The duration of exposure in microseconds. */
  exposureDuration: Duration | undefined;
  /** Sensor gain in dB. */
  gain: number;
}

/** Rectangular color/greyscale images. */
export interface ImageCapture {
  /** The time at which the image data was acquired in the robot's time basis. */
  acquisitionTime: Date | undefined;
  /**
   * A tree-based collection of transformations, which will include the transformations to each image's
   * sensor in addition to transformations to the common frames ("vision", "body", "odom").
   * All transforms within the snapshot are at the acquistion time of the image.
   */
  transformsSnapshot: FrameTreeSnapshot | undefined;
  /** The frame name for the image's sensor source. This will be included in the transform snapshot. */
  frameNameImageSensor: string;
  /** Image data. */
  image: Image | undefined;
  /** Sensor parameters associated with this image capture. */
  captureParams: CaptureParameters | undefined;
}

/** Proto for a description of an image source on the robot. */
export interface ImageSource {
  /** The name of this image source used to get images. */
  name: string;
  /** Number of columns in the image (in pixels). */
  cols: number;
  /** Number of rows in the image (in pixels). */
  rows: number;
  /**
   * For depth images, the pixel value that represents a depth of one meter.
   * Depth in meters can be computed by dividing the raw pixel value by this scale factor.
   */
  depthScale: number;
  /** Rectilinear camera model. */
  pinhole: ImageSource_PinholeModel | undefined;
  /** The kind of images returned by this image source. */
  imageType: ImageSource_ImageType;
  /** The pixel formats a specific image source supports. */
  pixelFormats: Image_PixelFormat[];
  /** The image formats a specific image source supports. */
  imageFormats: Image_Format[];
}

export enum ImageSource_ImageType {
  /** IMAGE_TYPE_UNKNOWN - Unspecified image type. */
  IMAGE_TYPE_UNKNOWN = 0,
  /** IMAGE_TYPE_VISUAL - Color or greyscale intensity image. */
  IMAGE_TYPE_VISUAL = 1,
  /** IMAGE_TYPE_DEPTH - Pixel values represent distances to objects/surfaces. */
  IMAGE_TYPE_DEPTH = 2,
  UNRECOGNIZED = -1,
}

export function imageSource_ImageTypeFromJSON(
  object: any
): ImageSource_ImageType {
  switch (object) {
    case 0:
    case "IMAGE_TYPE_UNKNOWN":
      return ImageSource_ImageType.IMAGE_TYPE_UNKNOWN;
    case 1:
    case "IMAGE_TYPE_VISUAL":
      return ImageSource_ImageType.IMAGE_TYPE_VISUAL;
    case 2:
    case "IMAGE_TYPE_DEPTH":
      return ImageSource_ImageType.IMAGE_TYPE_DEPTH;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ImageSource_ImageType.UNRECOGNIZED;
  }
}

export function imageSource_ImageTypeToJSON(
  object: ImageSource_ImageType
): string {
  switch (object) {
    case ImageSource_ImageType.IMAGE_TYPE_UNKNOWN:
      return "IMAGE_TYPE_UNKNOWN";
    case ImageSource_ImageType.IMAGE_TYPE_VISUAL:
      return "IMAGE_TYPE_VISUAL";
    case ImageSource_ImageType.IMAGE_TYPE_DEPTH:
      return "IMAGE_TYPE_DEPTH";
    case ImageSource_ImageType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * The camera can be modeled as a pinhole camera described with a matrix.
 * Camera Matrix can be constructed by the camera intrinsics:
 * [[focal_length.x,         skew.x, principal_point.x],
 * [[        skew.y, focal_length.y, principal_point.y],
 * [[             0,              0,                 1]]
 */
export interface ImageSource_PinholeModel {
  /** The camera intrinsics are necessary for descrbing the pinhole camera matrix. */
  intrinsics: ImageSource_PinholeModel_CameraIntrinsics | undefined;
}

/** Intrinsic parameters are in pixel space. */
export interface ImageSource_PinholeModel_CameraIntrinsics {
  /** The focal length of the camera. */
  focalLength: Vec2 | undefined;
  /** The optical center in sensor coordinates. */
  principalPoint: Vec2 | undefined;
  /** The skew for the intrinsic matrix. */
  skew: Vec2 | undefined;
}

/** The ListImageSources request message for the robot image service. */
export interface ListImageSourcesRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/** The ListImageSources response message which contains all known image sources for the robot. */
export interface ListImageSourcesResponse {
  /** Common response Header. */
  header: ResponseHeader | undefined;
  /**
   * The set of ImageSources available from this service.
   * May be empty if the service serves no cameras (e.g., if no cameras were found on startup).
   */
  imageSources: ImageSource[];
}

/** The image request specifying the image source and data format desired. */
export interface ImageRequest {
  /** The string name of the image source to get image data from. */
  imageSourceName: string;
  /**
   * Image quality: a number from 0 (worst) to 100 (highest).
   * Note that jpeg quality 100 is still lossy.
   */
  qualityPercent: number;
  /**
   * Specify the desired image encoding (e.g. JPEG, RAW). If no format is specified (e.g. FORMAT_UNKNOWN), the image
   * service will choose the best format for the data.
   */
  imageFormat: Image_Format;
  /**
   * Optional specification of the desired image dimensions.
   * If the original image is 1920x1080, a resize_ratio of (2/3) will return an image with size 1280x720
   * The range is clipped to [0.01, 1] while maintaining the original aspect ratio.
   * For backwards compatibliity, a value of 0 means no resizing.
   */
  resizeRatio: number;
  /**
   * Specify the desired pixel format (e.g. GREYSCALE_U8, RGB_U8). If no format is specified
   * (e.g. PIXEL_FORMAT_UNKNOWN), the image service will choose the best format for the data.
   */
  pixelFormat: Image_PixelFormat;
}

/** The GetImage request message which can send multiple different image source requests at once. */
export interface GetImageRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** The different image requests for this rpc call. */
  imageRequests: ImageRequest[];
}

/** The image response for each request, that includes image data and image source information. */
export interface ImageResponse {
  /**
   * The image capture contains the image data and information about the state of the camera and robot
   * at the time the image was collected.
   */
  shot: ImageCapture | undefined;
  /** The source describes general information about the camera source the image data was collected from. */
  source: ImageSource | undefined;
  /** Return status of the request. */
  status: ImageResponse_Status;
}

export enum ImageResponse_Status {
  /**
   * STATUS_UNKNOWN - UNKNOWN should never be used.
   * An internal ImageService issue has happened if UNKNOWN is set.
   * None of the other fields are filled out.
   */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Call succeeded at filling out all the fields. */
  STATUS_OK = 1,
  /** STATUS_UNKNOWN_CAMERA - Image source name in request is unknown.  Other fields are not filled out. */
  STATUS_UNKNOWN_CAMERA = 2,
  /** STATUS_SOURCE_DATA_ERROR - Failed to fill out ImageSource.  All the other fields are not filled out. */
  STATUS_SOURCE_DATA_ERROR = 3,
  /** STATUS_IMAGE_DATA_ERROR - There was a problem with the image data.  Only the ImageSource is filled out. */
  STATUS_IMAGE_DATA_ERROR = 4,
  /**
   * STATUS_UNSUPPORTED_IMAGE_FORMAT_REQUESTED - The requested image format is unsupported for the image-source named. The image data will
   * not be filled out. Note, if an image request has "FORMAT_UNKNOWN", the service should choose the
   * best format to provide the data in.
   */
  STATUS_UNSUPPORTED_IMAGE_FORMAT_REQUESTED = 5,
  /**
   * STATUS_UNSUPPORTED_PIXEL_FORMAT_REQUESTED - The requested pixel format is unsupported for the image-source named. The image data will
   * not be filled out. Note, if an image request has "PIXEL_FORMAT_UNKNOWN", the service
   * should choose the best format to provide the data in.
   */
  STATUS_UNSUPPORTED_PIXEL_FORMAT_REQUESTED = 6,
  /** STATUS_UNSUPPORTED_RESIZE_RATIO_REQUESTED - The requested ratio is out of bounds [0,1] or unsupported by the image service */
  STATUS_UNSUPPORTED_RESIZE_RATIO_REQUESTED = 7,
  UNRECOGNIZED = -1,
}

export function imageResponse_StatusFromJSON(
  object: any
): ImageResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return ImageResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return ImageResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_UNKNOWN_CAMERA":
      return ImageResponse_Status.STATUS_UNKNOWN_CAMERA;
    case 3:
    case "STATUS_SOURCE_DATA_ERROR":
      return ImageResponse_Status.STATUS_SOURCE_DATA_ERROR;
    case 4:
    case "STATUS_IMAGE_DATA_ERROR":
      return ImageResponse_Status.STATUS_IMAGE_DATA_ERROR;
    case 5:
    case "STATUS_UNSUPPORTED_IMAGE_FORMAT_REQUESTED":
      return ImageResponse_Status.STATUS_UNSUPPORTED_IMAGE_FORMAT_REQUESTED;
    case 6:
    case "STATUS_UNSUPPORTED_PIXEL_FORMAT_REQUESTED":
      return ImageResponse_Status.STATUS_UNSUPPORTED_PIXEL_FORMAT_REQUESTED;
    case 7:
    case "STATUS_UNSUPPORTED_RESIZE_RATIO_REQUESTED":
      return ImageResponse_Status.STATUS_UNSUPPORTED_RESIZE_RATIO_REQUESTED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ImageResponse_Status.UNRECOGNIZED;
  }
}

export function imageResponse_StatusToJSON(
  object: ImageResponse_Status
): string {
  switch (object) {
    case ImageResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case ImageResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case ImageResponse_Status.STATUS_UNKNOWN_CAMERA:
      return "STATUS_UNKNOWN_CAMERA";
    case ImageResponse_Status.STATUS_SOURCE_DATA_ERROR:
      return "STATUS_SOURCE_DATA_ERROR";
    case ImageResponse_Status.STATUS_IMAGE_DATA_ERROR:
      return "STATUS_IMAGE_DATA_ERROR";
    case ImageResponse_Status.STATUS_UNSUPPORTED_IMAGE_FORMAT_REQUESTED:
      return "STATUS_UNSUPPORTED_IMAGE_FORMAT_REQUESTED";
    case ImageResponse_Status.STATUS_UNSUPPORTED_PIXEL_FORMAT_REQUESTED:
      return "STATUS_UNSUPPORTED_PIXEL_FORMAT_REQUESTED";
    case ImageResponse_Status.STATUS_UNSUPPORTED_RESIZE_RATIO_REQUESTED:
      return "STATUS_UNSUPPORTED_RESIZE_RATIO_REQUESTED";
    case ImageResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** The GetImage response message which includes image data for all requested sources. */
export interface GetImageResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** The ordering of these image responses is defined by the order of the ImageRequests. */
  imageResponses: ImageResponse[];
}

function createBaseImage(): Image {
  return {
    cols: 0,
    rows: 0,
    data: new Uint8Array(),
    format: 0,
    pixelFormat: 0,
  };
}

export const Image = {
  encode(message: Image, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.cols !== 0) {
      writer.uint32(16).int32(message.cols);
    }
    if (message.rows !== 0) {
      writer.uint32(24).int32(message.rows);
    }
    if (message.data.length !== 0) {
      writer.uint32(34).bytes(message.data);
    }
    if (message.format !== 0) {
      writer.uint32(40).int32(message.format);
    }
    if (message.pixelFormat !== 0) {
      writer.uint32(48).int32(message.pixelFormat);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Image {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.cols = reader.int32();
          break;
        case 3:
          message.rows = reader.int32();
          break;
        case 4:
          message.data = reader.bytes();
          break;
        case 5:
          message.format = reader.int32() as any;
          break;
        case 6:
          message.pixelFormat = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Image {
    return {
      cols: isSet(object.cols) ? Number(object.cols) : 0,
      rows: isSet(object.rows) ? Number(object.rows) : 0,
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
      format: isSet(object.format) ? image_FormatFromJSON(object.format) : 0,
      pixelFormat: isSet(object.pixelFormat)
        ? image_PixelFormatFromJSON(object.pixelFormat)
        : 0,
    };
  },

  toJSON(message: Image): unknown {
    const obj: any = {};
    message.cols !== undefined && (obj.cols = Math.round(message.cols));
    message.rows !== undefined && (obj.rows = Math.round(message.rows));
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array()
      ));
    message.format !== undefined &&
      (obj.format = image_FormatToJSON(message.format));
    message.pixelFormat !== undefined &&
      (obj.pixelFormat = image_PixelFormatToJSON(message.pixelFormat));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Image>, I>>(object: I): Image {
    const message = createBaseImage();
    message.cols = object.cols ?? 0;
    message.rows = object.rows ?? 0;
    message.data = object.data ?? new Uint8Array();
    message.format = object.format ?? 0;
    message.pixelFormat = object.pixelFormat ?? 0;
    return message;
  },
};

function createBaseCaptureParameters(): CaptureParameters {
  return { exposureDuration: undefined, gain: 0 };
}

export const CaptureParameters = {
  encode(
    message: CaptureParameters,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.exposureDuration !== undefined) {
      Duration.encode(
        message.exposureDuration,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.gain !== 0) {
      writer.uint32(17).double(message.gain);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CaptureParameters {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCaptureParameters();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.exposureDuration = Duration.decode(reader, reader.uint32());
          break;
        case 2:
          message.gain = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CaptureParameters {
    return {
      exposureDuration: isSet(object.exposureDuration)
        ? Duration.fromJSON(object.exposureDuration)
        : undefined,
      gain: isSet(object.gain) ? Number(object.gain) : 0,
    };
  },

  toJSON(message: CaptureParameters): unknown {
    const obj: any = {};
    message.exposureDuration !== undefined &&
      (obj.exposureDuration = message.exposureDuration
        ? Duration.toJSON(message.exposureDuration)
        : undefined);
    message.gain !== undefined && (obj.gain = message.gain);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CaptureParameters>, I>>(
    object: I
  ): CaptureParameters {
    const message = createBaseCaptureParameters();
    message.exposureDuration =
      object.exposureDuration !== undefined && object.exposureDuration !== null
        ? Duration.fromPartial(object.exposureDuration)
        : undefined;
    message.gain = object.gain ?? 0;
    return message;
  },
};

function createBaseImageCapture(): ImageCapture {
  return {
    acquisitionTime: undefined,
    transformsSnapshot: undefined,
    frameNameImageSensor: "",
    image: undefined,
    captureParams: undefined,
  };
}

export const ImageCapture = {
  encode(
    message: ImageCapture,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.acquisitionTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.acquisitionTime),
        writer.uint32(242).fork()
      ).ldelim();
    }
    if (message.transformsSnapshot !== undefined) {
      FrameTreeSnapshot.encode(
        message.transformsSnapshot,
        writer.uint32(250).fork()
      ).ldelim();
    }
    if (message.frameNameImageSensor !== "") {
      writer.uint32(42).string(message.frameNameImageSensor);
    }
    if (message.image !== undefined) {
      Image.encode(message.image, writer.uint32(26).fork()).ldelim();
    }
    if (message.captureParams !== undefined) {
      CaptureParameters.encode(
        message.captureParams,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImageCapture {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImageCapture();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 30:
          message.acquisitionTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 31:
          message.transformsSnapshot = FrameTreeSnapshot.decode(
            reader,
            reader.uint32()
          );
          break;
        case 5:
          message.frameNameImageSensor = reader.string();
          break;
        case 3:
          message.image = Image.decode(reader, reader.uint32());
          break;
        case 4:
          message.captureParams = CaptureParameters.decode(
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

  fromJSON(object: any): ImageCapture {
    return {
      acquisitionTime: isSet(object.acquisitionTime)
        ? fromJsonTimestamp(object.acquisitionTime)
        : undefined,
      transformsSnapshot: isSet(object.transformsSnapshot)
        ? FrameTreeSnapshot.fromJSON(object.transformsSnapshot)
        : undefined,
      frameNameImageSensor: isSet(object.frameNameImageSensor)
        ? String(object.frameNameImageSensor)
        : "",
      image: isSet(object.image) ? Image.fromJSON(object.image) : undefined,
      captureParams: isSet(object.captureParams)
        ? CaptureParameters.fromJSON(object.captureParams)
        : undefined,
    };
  },

  toJSON(message: ImageCapture): unknown {
    const obj: any = {};
    message.acquisitionTime !== undefined &&
      (obj.acquisitionTime = message.acquisitionTime.toISOString());
    message.transformsSnapshot !== undefined &&
      (obj.transformsSnapshot = message.transformsSnapshot
        ? FrameTreeSnapshot.toJSON(message.transformsSnapshot)
        : undefined);
    message.frameNameImageSensor !== undefined &&
      (obj.frameNameImageSensor = message.frameNameImageSensor);
    message.image !== undefined &&
      (obj.image = message.image ? Image.toJSON(message.image) : undefined);
    message.captureParams !== undefined &&
      (obj.captureParams = message.captureParams
        ? CaptureParameters.toJSON(message.captureParams)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ImageCapture>, I>>(
    object: I
  ): ImageCapture {
    const message = createBaseImageCapture();
    message.acquisitionTime = object.acquisitionTime ?? undefined;
    message.transformsSnapshot =
      object.transformsSnapshot !== undefined &&
      object.transformsSnapshot !== null
        ? FrameTreeSnapshot.fromPartial(object.transformsSnapshot)
        : undefined;
    message.frameNameImageSensor = object.frameNameImageSensor ?? "";
    message.image =
      object.image !== undefined && object.image !== null
        ? Image.fromPartial(object.image)
        : undefined;
    message.captureParams =
      object.captureParams !== undefined && object.captureParams !== null
        ? CaptureParameters.fromPartial(object.captureParams)
        : undefined;
    return message;
  },
};

function createBaseImageSource(): ImageSource {
  return {
    name: "",
    cols: 0,
    rows: 0,
    depthScale: 0,
    pinhole: undefined,
    imageType: 0,
    pixelFormats: [],
    imageFormats: [],
  };
}

export const ImageSource = {
  encode(
    message: ImageSource,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.cols !== 0) {
      writer.uint32(32).int32(message.cols);
    }
    if (message.rows !== 0) {
      writer.uint32(40).int32(message.rows);
    }
    if (message.depthScale !== 0) {
      writer.uint32(49).double(message.depthScale);
    }
    if (message.pinhole !== undefined) {
      ImageSource_PinholeModel.encode(
        message.pinhole,
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.imageType !== 0) {
      writer.uint32(72).int32(message.imageType);
    }
    writer.uint32(82).fork();
    for (const v of message.pixelFormats) {
      writer.int32(v);
    }
    writer.ldelim();
    writer.uint32(90).fork();
    for (const v of message.imageFormats) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImageSource {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImageSource();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.name = reader.string();
          break;
        case 4:
          message.cols = reader.int32();
          break;
        case 5:
          message.rows = reader.int32();
          break;
        case 6:
          message.depthScale = reader.double();
          break;
        case 8:
          message.pinhole = ImageSource_PinholeModel.decode(
            reader,
            reader.uint32()
          );
          break;
        case 9:
          message.imageType = reader.int32() as any;
          break;
        case 10:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.pixelFormats.push(reader.int32() as any);
            }
          } else {
            message.pixelFormats.push(reader.int32() as any);
          }
          break;
        case 11:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.imageFormats.push(reader.int32() as any);
            }
          } else {
            message.imageFormats.push(reader.int32() as any);
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ImageSource {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      cols: isSet(object.cols) ? Number(object.cols) : 0,
      rows: isSet(object.rows) ? Number(object.rows) : 0,
      depthScale: isSet(object.depthScale) ? Number(object.depthScale) : 0,
      pinhole: isSet(object.pinhole)
        ? ImageSource_PinholeModel.fromJSON(object.pinhole)
        : undefined,
      imageType: isSet(object.imageType)
        ? imageSource_ImageTypeFromJSON(object.imageType)
        : 0,
      pixelFormats: Array.isArray(object?.pixelFormats)
        ? object.pixelFormats.map((e: any) => image_PixelFormatFromJSON(e))
        : [],
      imageFormats: Array.isArray(object?.imageFormats)
        ? object.imageFormats.map((e: any) => image_FormatFromJSON(e))
        : [],
    };
  },

  toJSON(message: ImageSource): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.cols !== undefined && (obj.cols = Math.round(message.cols));
    message.rows !== undefined && (obj.rows = Math.round(message.rows));
    message.depthScale !== undefined && (obj.depthScale = message.depthScale);
    message.pinhole !== undefined &&
      (obj.pinhole = message.pinhole
        ? ImageSource_PinholeModel.toJSON(message.pinhole)
        : undefined);
    message.imageType !== undefined &&
      (obj.imageType = imageSource_ImageTypeToJSON(message.imageType));
    if (message.pixelFormats) {
      obj.pixelFormats = message.pixelFormats.map((e) =>
        image_PixelFormatToJSON(e)
      );
    } else {
      obj.pixelFormats = [];
    }
    if (message.imageFormats) {
      obj.imageFormats = message.imageFormats.map((e) => image_FormatToJSON(e));
    } else {
      obj.imageFormats = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ImageSource>, I>>(
    object: I
  ): ImageSource {
    const message = createBaseImageSource();
    message.name = object.name ?? "";
    message.cols = object.cols ?? 0;
    message.rows = object.rows ?? 0;
    message.depthScale = object.depthScale ?? 0;
    message.pinhole =
      object.pinhole !== undefined && object.pinhole !== null
        ? ImageSource_PinholeModel.fromPartial(object.pinhole)
        : undefined;
    message.imageType = object.imageType ?? 0;
    message.pixelFormats = object.pixelFormats?.map((e) => e) || [];
    message.imageFormats = object.imageFormats?.map((e) => e) || [];
    return message;
  },
};

function createBaseImageSource_PinholeModel(): ImageSource_PinholeModel {
  return { intrinsics: undefined };
}

export const ImageSource_PinholeModel = {
  encode(
    message: ImageSource_PinholeModel,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.intrinsics !== undefined) {
      ImageSource_PinholeModel_CameraIntrinsics.encode(
        message.intrinsics,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ImageSource_PinholeModel {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImageSource_PinholeModel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.intrinsics = ImageSource_PinholeModel_CameraIntrinsics.decode(
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

  fromJSON(object: any): ImageSource_PinholeModel {
    return {
      intrinsics: isSet(object.intrinsics)
        ? ImageSource_PinholeModel_CameraIntrinsics.fromJSON(object.intrinsics)
        : undefined,
    };
  },

  toJSON(message: ImageSource_PinholeModel): unknown {
    const obj: any = {};
    message.intrinsics !== undefined &&
      (obj.intrinsics = message.intrinsics
        ? ImageSource_PinholeModel_CameraIntrinsics.toJSON(message.intrinsics)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ImageSource_PinholeModel>, I>>(
    object: I
  ): ImageSource_PinholeModel {
    const message = createBaseImageSource_PinholeModel();
    message.intrinsics =
      object.intrinsics !== undefined && object.intrinsics !== null
        ? ImageSource_PinholeModel_CameraIntrinsics.fromPartial(
            object.intrinsics
          )
        : undefined;
    return message;
  },
};

function createBaseImageSource_PinholeModel_CameraIntrinsics(): ImageSource_PinholeModel_CameraIntrinsics {
  return { focalLength: undefined, principalPoint: undefined, skew: undefined };
}

export const ImageSource_PinholeModel_CameraIntrinsics = {
  encode(
    message: ImageSource_PinholeModel_CameraIntrinsics,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.focalLength !== undefined) {
      Vec2.encode(message.focalLength, writer.uint32(10).fork()).ldelim();
    }
    if (message.principalPoint !== undefined) {
      Vec2.encode(message.principalPoint, writer.uint32(18).fork()).ldelim();
    }
    if (message.skew !== undefined) {
      Vec2.encode(message.skew, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ImageSource_PinholeModel_CameraIntrinsics {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImageSource_PinholeModel_CameraIntrinsics();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.focalLength = Vec2.decode(reader, reader.uint32());
          break;
        case 2:
          message.principalPoint = Vec2.decode(reader, reader.uint32());
          break;
        case 3:
          message.skew = Vec2.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ImageSource_PinholeModel_CameraIntrinsics {
    return {
      focalLength: isSet(object.focalLength)
        ? Vec2.fromJSON(object.focalLength)
        : undefined,
      principalPoint: isSet(object.principalPoint)
        ? Vec2.fromJSON(object.principalPoint)
        : undefined,
      skew: isSet(object.skew) ? Vec2.fromJSON(object.skew) : undefined,
    };
  },

  toJSON(message: ImageSource_PinholeModel_CameraIntrinsics): unknown {
    const obj: any = {};
    message.focalLength !== undefined &&
      (obj.focalLength = message.focalLength
        ? Vec2.toJSON(message.focalLength)
        : undefined);
    message.principalPoint !== undefined &&
      (obj.principalPoint = message.principalPoint
        ? Vec2.toJSON(message.principalPoint)
        : undefined);
    message.skew !== undefined &&
      (obj.skew = message.skew ? Vec2.toJSON(message.skew) : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<ImageSource_PinholeModel_CameraIntrinsics>, I>
  >(object: I): ImageSource_PinholeModel_CameraIntrinsics {
    const message = createBaseImageSource_PinholeModel_CameraIntrinsics();
    message.focalLength =
      object.focalLength !== undefined && object.focalLength !== null
        ? Vec2.fromPartial(object.focalLength)
        : undefined;
    message.principalPoint =
      object.principalPoint !== undefined && object.principalPoint !== null
        ? Vec2.fromPartial(object.principalPoint)
        : undefined;
    message.skew =
      object.skew !== undefined && object.skew !== null
        ? Vec2.fromPartial(object.skew)
        : undefined;
    return message;
  },
};

function createBaseListImageSourcesRequest(): ListImageSourcesRequest {
  return { header: undefined };
}

export const ListImageSourcesRequest = {
  encode(
    message: ListImageSourcesRequest,
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
  ): ListImageSourcesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListImageSourcesRequest();
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

  fromJSON(object: any): ListImageSourcesRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: ListImageSourcesRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListImageSourcesRequest>, I>>(
    object: I
  ): ListImageSourcesRequest {
    const message = createBaseListImageSourcesRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseListImageSourcesResponse(): ListImageSourcesResponse {
  return { header: undefined, imageSources: [] };
}

export const ListImageSourcesResponse = {
  encode(
    message: ListImageSourcesResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.imageSources) {
      ImageSource.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListImageSourcesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListImageSourcesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.imageSources.push(
            ImageSource.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListImageSourcesResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      imageSources: Array.isArray(object?.imageSources)
        ? object.imageSources.map((e: any) => ImageSource.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListImageSourcesResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.imageSources) {
      obj.imageSources = message.imageSources.map((e) =>
        e ? ImageSource.toJSON(e) : undefined
      );
    } else {
      obj.imageSources = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListImageSourcesResponse>, I>>(
    object: I
  ): ListImageSourcesResponse {
    const message = createBaseListImageSourcesResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.imageSources =
      object.imageSources?.map((e) => ImageSource.fromPartial(e)) || [];
    return message;
  },
};

function createBaseImageRequest(): ImageRequest {
  return {
    imageSourceName: "",
    qualityPercent: 0,
    imageFormat: 0,
    resizeRatio: 0,
    pixelFormat: 0,
  };
}

export const ImageRequest = {
  encode(
    message: ImageRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.imageSourceName !== "") {
      writer.uint32(10).string(message.imageSourceName);
    }
    if (message.qualityPercent !== 0) {
      writer.uint32(17).double(message.qualityPercent);
    }
    if (message.imageFormat !== 0) {
      writer.uint32(24).int32(message.imageFormat);
    }
    if (message.resizeRatio !== 0) {
      writer.uint32(33).double(message.resizeRatio);
    }
    if (message.pixelFormat !== 0) {
      writer.uint32(40).int32(message.pixelFormat);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImageRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.imageSourceName = reader.string();
          break;
        case 2:
          message.qualityPercent = reader.double();
          break;
        case 3:
          message.imageFormat = reader.int32() as any;
          break;
        case 4:
          message.resizeRatio = reader.double();
          break;
        case 5:
          message.pixelFormat = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ImageRequest {
    return {
      imageSourceName: isSet(object.imageSourceName)
        ? String(object.imageSourceName)
        : "",
      qualityPercent: isSet(object.qualityPercent)
        ? Number(object.qualityPercent)
        : 0,
      imageFormat: isSet(object.imageFormat)
        ? image_FormatFromJSON(object.imageFormat)
        : 0,
      resizeRatio: isSet(object.resizeRatio) ? Number(object.resizeRatio) : 0,
      pixelFormat: isSet(object.pixelFormat)
        ? image_PixelFormatFromJSON(object.pixelFormat)
        : 0,
    };
  },

  toJSON(message: ImageRequest): unknown {
    const obj: any = {};
    message.imageSourceName !== undefined &&
      (obj.imageSourceName = message.imageSourceName);
    message.qualityPercent !== undefined &&
      (obj.qualityPercent = message.qualityPercent);
    message.imageFormat !== undefined &&
      (obj.imageFormat = image_FormatToJSON(message.imageFormat));
    message.resizeRatio !== undefined &&
      (obj.resizeRatio = message.resizeRatio);
    message.pixelFormat !== undefined &&
      (obj.pixelFormat = image_PixelFormatToJSON(message.pixelFormat));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ImageRequest>, I>>(
    object: I
  ): ImageRequest {
    const message = createBaseImageRequest();
    message.imageSourceName = object.imageSourceName ?? "";
    message.qualityPercent = object.qualityPercent ?? 0;
    message.imageFormat = object.imageFormat ?? 0;
    message.resizeRatio = object.resizeRatio ?? 0;
    message.pixelFormat = object.pixelFormat ?? 0;
    return message;
  },
};

function createBaseGetImageRequest(): GetImageRequest {
  return { header: undefined, imageRequests: [] };
}

export const GetImageRequest = {
  encode(
    message: GetImageRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.imageRequests) {
      ImageRequest.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetImageRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetImageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.imageRequests.push(
            ImageRequest.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetImageRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      imageRequests: Array.isArray(object?.imageRequests)
        ? object.imageRequests.map((e: any) => ImageRequest.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetImageRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    if (message.imageRequests) {
      obj.imageRequests = message.imageRequests.map((e) =>
        e ? ImageRequest.toJSON(e) : undefined
      );
    } else {
      obj.imageRequests = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetImageRequest>, I>>(
    object: I
  ): GetImageRequest {
    const message = createBaseGetImageRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.imageRequests =
      object.imageRequests?.map((e) => ImageRequest.fromPartial(e)) || [];
    return message;
  },
};

function createBaseImageResponse(): ImageResponse {
  return { shot: undefined, source: undefined, status: 0 };
}

export const ImageResponse = {
  encode(
    message: ImageResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.shot !== undefined) {
      ImageCapture.encode(message.shot, writer.uint32(10).fork()).ldelim();
    }
    if (message.source !== undefined) {
      ImageSource.encode(message.source, writer.uint32(18).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(32).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImageResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImageResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.shot = ImageCapture.decode(reader, reader.uint32());
          break;
        case 2:
          message.source = ImageSource.decode(reader, reader.uint32());
          break;
        case 4:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ImageResponse {
    return {
      shot: isSet(object.shot) ? ImageCapture.fromJSON(object.shot) : undefined,
      source: isSet(object.source)
        ? ImageSource.fromJSON(object.source)
        : undefined,
      status: isSet(object.status)
        ? imageResponse_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: ImageResponse): unknown {
    const obj: any = {};
    message.shot !== undefined &&
      (obj.shot = message.shot ? ImageCapture.toJSON(message.shot) : undefined);
    message.source !== undefined &&
      (obj.source = message.source
        ? ImageSource.toJSON(message.source)
        : undefined);
    message.status !== undefined &&
      (obj.status = imageResponse_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ImageResponse>, I>>(
    object: I
  ): ImageResponse {
    const message = createBaseImageResponse();
    message.shot =
      object.shot !== undefined && object.shot !== null
        ? ImageCapture.fromPartial(object.shot)
        : undefined;
    message.source =
      object.source !== undefined && object.source !== null
        ? ImageSource.fromPartial(object.source)
        : undefined;
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseGetImageResponse(): GetImageResponse {
  return { header: undefined, imageResponses: [] };
}

export const GetImageResponse = {
  encode(
    message: GetImageResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.imageResponses) {
      ImageResponse.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetImageResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetImageResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.imageResponses.push(
            ImageResponse.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetImageResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      imageResponses: Array.isArray(object?.imageResponses)
        ? object.imageResponses.map((e: any) => ImageResponse.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetImageResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.imageResponses) {
      obj.imageResponses = message.imageResponses.map((e) =>
        e ? ImageResponse.toJSON(e) : undefined
      );
    } else {
      obj.imageResponses = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetImageResponse>, I>>(
    object: I
  ): GetImageResponse {
    const message = createBaseGetImageResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.imageResponses =
      object.imageResponses?.map((e) => ImageResponse.fromPartial(e)) || [];
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

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

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
