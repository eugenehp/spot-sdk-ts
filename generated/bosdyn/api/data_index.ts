/* eslint-disable */
import {
  Event_LogPreserveHint,
  Event,
  OperatorComment,
  event_LogPreserveHintFromJSON,
  event_LogPreserveHintToJSON,
} from "./data_buffer";
import { Timestamp } from "../../google/protobuf/timestamp";
import Long from "long";
import { TimeRange } from "./time_range";
import { ResponseHeader, RequestHeader } from "./header";
import _m0 from "protobufjs/minimal";
import { Int32Value } from "../../google/protobuf/wrappers";

export const protobufPackage = "bosdyn.api";

/** Specification for selecting of GRPC logs. */
export interface GrpcSpec {
  serviceName: string;
}

/** Specification for selecting of blob messages. */
export interface BlobSpec {
  /** If set, require the message source to match this. */
  source: string;
  /** If set, require the message type to match this value. */
  messageType: string;
  /** If set, require the channel to match this value (or channel_glob, if set). */
  channel: string;
  /**
   * Optionally require the channel to match a glob (or channel, if set)..
   * For example, 'gps/*' will match all channels starting with 'gps/'.
   */
  channelGlob: string;
}

/** Specification for selecting Events. */
export interface EventSpec {
  source: string;
  type: string;
  level: number | undefined;
  logPreserveHint: Event_LogPreserveHint;
}

/**
 * A unit of data storage.
 * This may be a bddf data file.
 * Like a file, this data may be downloaded or deleted all together for example.
 */
export interface PageInfo {
  /** Identifier unique to robot. */
  id: string;
  /** Relative path to file, if file storage. */
  path: string;
  /** Name of service/client which provided the data. */
  source: string;
  /** Time range of the relevant data in the page. */
  timeRange: TimeRange | undefined;
  /** Number of time samples or blobs. */
  numTicks: number;
  /** Total size of data in the page. */
  totalBytes: number;
  format: PageInfo_PageFormat;
  compression: PageInfo_Compression;
  /** True if data is still being written into this page, false if page is complete. */
  isOpen: boolean;
  /** True if data is marked as having been downloaded. */
  isDownloaded: boolean;
  /** If this exists, the page was deleted from the robot at the specified time. */
  deletedTimestamp: Date | undefined;
  /** If this exists, download from this page was started at the specified time. */
  downloadStartedTimestamp: Date | undefined;
  /** True if data has been requested to be preserved. */
  requestPreserve: boolean;
}

export enum PageInfo_PageFormat {
  /** FORMAT_UNKNOWN - Unset -- do not use. */
  FORMAT_UNKNOWN = 0,
  /** FORMAT_BDDF_FILE - Data is stored in a .bddf file */
  FORMAT_BDDF_FILE = 1,
  UNRECOGNIZED = -1,
}

export function pageInfo_PageFormatFromJSON(object: any): PageInfo_PageFormat {
  switch (object) {
    case 0:
    case "FORMAT_UNKNOWN":
      return PageInfo_PageFormat.FORMAT_UNKNOWN;
    case 1:
    case "FORMAT_BDDF_FILE":
      return PageInfo_PageFormat.FORMAT_BDDF_FILE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PageInfo_PageFormat.UNRECOGNIZED;
  }
}

export function pageInfo_PageFormatToJSON(object: PageInfo_PageFormat): string {
  switch (object) {
    case PageInfo_PageFormat.FORMAT_UNKNOWN:
      return "FORMAT_UNKNOWN";
    case PageInfo_PageFormat.FORMAT_BDDF_FILE:
      return "FORMAT_BDDF_FILE";
    case PageInfo_PageFormat.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum PageInfo_Compression {
  /** COMPRESSION_UNKNOWN - Not set -- do not use. */
  COMPRESSION_UNKNOWN = 0,
  /** COMPRESSION_NONE - Data is not compressed. */
  COMPRESSION_NONE = 1,
  /** COMPRESSION_GZIP - Data uses gzip compression. */
  COMPRESSION_GZIP = 2,
  /** COMPRESSION_ZSTD - Data uses zstd compression. */
  COMPRESSION_ZSTD = 3,
  UNRECOGNIZED = -1,
}

export function pageInfo_CompressionFromJSON(
  object: any
): PageInfo_Compression {
  switch (object) {
    case 0:
    case "COMPRESSION_UNKNOWN":
      return PageInfo_Compression.COMPRESSION_UNKNOWN;
    case 1:
    case "COMPRESSION_NONE":
      return PageInfo_Compression.COMPRESSION_NONE;
    case 2:
    case "COMPRESSION_GZIP":
      return PageInfo_Compression.COMPRESSION_GZIP;
    case 3:
    case "COMPRESSION_ZSTD":
      return PageInfo_Compression.COMPRESSION_ZSTD;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PageInfo_Compression.UNRECOGNIZED;
  }
}

export function pageInfo_CompressionToJSON(
  object: PageInfo_Compression
): string {
  switch (object) {
    case PageInfo_Compression.COMPRESSION_UNKNOWN:
      return "COMPRESSION_UNKNOWN";
    case PageInfo_Compression.COMPRESSION_NONE:
      return "COMPRESSION_NONE";
    case PageInfo_Compression.COMPRESSION_GZIP:
      return "COMPRESSION_GZIP";
    case PageInfo_Compression.COMPRESSION_ZSTD:
      return "COMPRESSION_ZSTD";
    case PageInfo_Compression.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** A set of pages of data which contain specied GRPC request and response messages. */
export interface GrpcPages {
  timeRange: TimeRange | undefined;
  spec: GrpcSpec | undefined;
  pages: PageInfo[];
}

/** A set of blob messages of a given channel/msgtype within a given data page. */
export interface BlobPage {
  spec: BlobSpec | undefined;
  page: PageInfo | undefined;
}

/** A set of pages of data which contain specified Blob messages from the data-buffer. */
export interface BlobPages {
  timeRange: TimeRange | undefined;
  pages: BlobPage[];
}

/** A set of pages and the associated time range they cover. */
export interface PagesAndTimestamp {
  timeRange: TimeRange | undefined;
  pages: PageInfo[];
}

/** A query for pages containing the desired data. */
export interface DataQuery {
  /** Timespan for data we want to query */
  timeRange: TimeRange | undefined;
  /** Request for pages containing different kinds of data. */
  blobs: BlobSpec[];
  /** return pages of text-messages during the specified timespan */
  textMessages: boolean;
  /** return pages of events */
  events: boolean;
  /** return pages of operator comments during the specified timespan */
  comments: boolean;
}

/** Description of data matching a given DataQuery. */
export interface DataIndex {
  timeRange: TimeRange | undefined;
  blobs: BlobPages[];
  textMessages: PagesAndTimestamp | undefined;
  events: PagesAndTimestamp | undefined;
  comments: PagesAndTimestamp | undefined;
}

/** A request for Events and/or OperatorComments over a given time range. */
export interface EventsCommentsSpec {
  /** Timespan for data we want to query */
  timeRange: TimeRange | undefined;
  /** Return events which match the request. */
  events: EventSpec[];
  /** Return operator comments which match the request. */
  comments: boolean;
  /** Maximum number of events to return (limited to 1024). */
  maxEvents: number;
  /** Maximum number of comments to return (limited to 1024). */
  maxComments: number;
}

/** Requested Events and/or OperatorComments. */
export interface EventsComments {
  /** Timespan for data */
  timeRange: TimeRange | undefined;
  events: Event[];
  operatorComments: OperatorComment[];
  /** True if the number of events returned was limited by query maximum. */
  eventsLimited: boolean;
  /** True if the number of comments returned was limited by query maximum. */
  operatorCommentsLimited: boolean;
}

export interface DataBufferStatus {
  numDataBufferPages: number;
  dataBufferTotalBytes: number;
  numComments: number;
  numEvents: number;
  blobSpecs: BlobSpec[];
}

/** GRPC request for data index information. */
export interface GetDataIndexResponse {
  header: ResponseHeader | undefined;
  dataIndex: DataIndex | undefined;
}

/** GRPC response with requested data index information. */
export interface GetDataIndexRequest {
  header: RequestHeader | undefined;
  dataQuery: DataQuery | undefined;
}

/** GRPC request for Events and OperatorComments. */
export interface GetEventsCommentsRequest {
  header: RequestHeader | undefined;
  eventCommentRequest: EventsCommentsSpec | undefined;
}

/** GRPC response with requested Events and OperatorComments. */
export interface GetEventsCommentsResponse {
  header: ResponseHeader | undefined;
  eventsComments: EventsComments | undefined;
}

export interface GetDataBufferStatusRequest {
  header: RequestHeader | undefined;
  getBlobSpecs: boolean;
}

export interface GetDataBufferStatusResponse {
  header: ResponseHeader | undefined;
  dataBufferStatus: DataBufferStatus | undefined;
}

export interface GetDataPagesRequest {
  header: RequestHeader | undefined;
  timeRange: TimeRange | undefined;
}

export interface GetDataPagesResponse {
  header: ResponseHeader | undefined;
  pages: PageInfo[];
}

/** GRPC request to delete pages. Both time_range and page_ids can be set. */
export interface DeleteDataPagesRequest {
  header: RequestHeader | undefined;
  /** Delete all pages in this time range */
  timeRange: TimeRange | undefined;
  /** Delete all pages with matching ids */
  pageIds: string[];
}

export interface DeletePageStatus {
  pageId: string;
  status: DeletePageStatus_Status;
}

export enum DeletePageStatus_Status {
  STATUS_UNKNOWN = 0,
  STATUS_DELETED = 1,
  STATUS_DELETION_FAILED = 2,
  STATUS_NOT_FOUND = 3,
  UNRECOGNIZED = -1,
}

export function deletePageStatus_StatusFromJSON(
  object: any
): DeletePageStatus_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return DeletePageStatus_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_DELETED":
      return DeletePageStatus_Status.STATUS_DELETED;
    case 2:
    case "STATUS_DELETION_FAILED":
      return DeletePageStatus_Status.STATUS_DELETION_FAILED;
    case 3:
    case "STATUS_NOT_FOUND":
      return DeletePageStatus_Status.STATUS_NOT_FOUND;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DeletePageStatus_Status.UNRECOGNIZED;
  }
}

export function deletePageStatus_StatusToJSON(
  object: DeletePageStatus_Status
): string {
  switch (object) {
    case DeletePageStatus_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case DeletePageStatus_Status.STATUS_DELETED:
      return "STATUS_DELETED";
    case DeletePageStatus_Status.STATUS_DELETION_FAILED:
      return "STATUS_DELETION_FAILED";
    case DeletePageStatus_Status.STATUS_NOT_FOUND:
      return "STATUS_NOT_FOUND";
    case DeletePageStatus_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface DeleteDataPagesResponse {
  header: ResponseHeader | undefined;
  bytesDeleted: number;
  status: DeletePageStatus[];
}

function createBaseGrpcSpec(): GrpcSpec {
  return { serviceName: "" };
}

export const GrpcSpec = {
  encode(
    message: GrpcSpec,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.serviceName !== "") {
      writer.uint32(10).string(message.serviceName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GrpcSpec {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGrpcSpec();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serviceName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GrpcSpec {
    return {
      serviceName: isSet(object.serviceName) ? String(object.serviceName) : "",
    };
  },

  toJSON(message: GrpcSpec): unknown {
    const obj: any = {};
    message.serviceName !== undefined &&
      (obj.serviceName = message.serviceName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GrpcSpec>, I>>(object: I): GrpcSpec {
    const message = createBaseGrpcSpec();
    message.serviceName = object.serviceName ?? "";
    return message;
  },
};

function createBaseBlobSpec(): BlobSpec {
  return { source: "", messageType: "", channel: "", channelGlob: "" };
}

export const BlobSpec = {
  encode(
    message: BlobSpec,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.source !== "") {
      writer.uint32(10).string(message.source);
    }
    if (message.messageType !== "") {
      writer.uint32(18).string(message.messageType);
    }
    if (message.channel !== "") {
      writer.uint32(26).string(message.channel);
    }
    if (message.channelGlob !== "") {
      writer.uint32(34).string(message.channelGlob);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlobSpec {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlobSpec();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.source = reader.string();
          break;
        case 2:
          message.messageType = reader.string();
          break;
        case 3:
          message.channel = reader.string();
          break;
        case 4:
          message.channelGlob = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BlobSpec {
    return {
      source: isSet(object.source) ? String(object.source) : "",
      messageType: isSet(object.messageType) ? String(object.messageType) : "",
      channel: isSet(object.channel) ? String(object.channel) : "",
      channelGlob: isSet(object.channelGlob) ? String(object.channelGlob) : "",
    };
  },

  toJSON(message: BlobSpec): unknown {
    const obj: any = {};
    message.source !== undefined && (obj.source = message.source);
    message.messageType !== undefined &&
      (obj.messageType = message.messageType);
    message.channel !== undefined && (obj.channel = message.channel);
    message.channelGlob !== undefined &&
      (obj.channelGlob = message.channelGlob);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BlobSpec>, I>>(object: I): BlobSpec {
    const message = createBaseBlobSpec();
    message.source = object.source ?? "";
    message.messageType = object.messageType ?? "";
    message.channel = object.channel ?? "";
    message.channelGlob = object.channelGlob ?? "";
    return message;
  },
};

function createBaseEventSpec(): EventSpec {
  return { source: "", type: "", level: undefined, logPreserveHint: 0 };
}

export const EventSpec = {
  encode(
    message: EventSpec,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.source !== "") {
      writer.uint32(10).string(message.source);
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    if (message.level !== undefined) {
      Int32Value.encode(
        { value: message.level! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.logPreserveHint !== 0) {
      writer.uint32(32).int32(message.logPreserveHint);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventSpec {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSpec();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.source = reader.string();
          break;
        case 2:
          message.type = reader.string();
          break;
        case 3:
          message.level = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.logPreserveHint = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventSpec {
    return {
      source: isSet(object.source) ? String(object.source) : "",
      type: isSet(object.type) ? String(object.type) : "",
      level: isSet(object.level) ? Number(object.level) : undefined,
      logPreserveHint: isSet(object.logPreserveHint)
        ? event_LogPreserveHintFromJSON(object.logPreserveHint)
        : 0,
    };
  },

  toJSON(message: EventSpec): unknown {
    const obj: any = {};
    message.source !== undefined && (obj.source = message.source);
    message.type !== undefined && (obj.type = message.type);
    message.level !== undefined && (obj.level = message.level);
    message.logPreserveHint !== undefined &&
      (obj.logPreserveHint = event_LogPreserveHintToJSON(
        message.logPreserveHint
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventSpec>, I>>(
    object: I
  ): EventSpec {
    const message = createBaseEventSpec();
    message.source = object.source ?? "";
    message.type = object.type ?? "";
    message.level = object.level ?? undefined;
    message.logPreserveHint = object.logPreserveHint ?? 0;
    return message;
  },
};

function createBasePageInfo(): PageInfo {
  return {
    id: "",
    path: "",
    source: "",
    timeRange: undefined,
    numTicks: 0,
    totalBytes: 0,
    format: 0,
    compression: 0,
    isOpen: false,
    isDownloaded: false,
    deletedTimestamp: undefined,
    downloadStartedTimestamp: undefined,
    requestPreserve: false,
  };
}

export const PageInfo = {
  encode(
    message: PageInfo,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.path !== "") {
      writer.uint32(18).string(message.path);
    }
    if (message.source !== "") {
      writer.uint32(26).string(message.source);
    }
    if (message.timeRange !== undefined) {
      TimeRange.encode(message.timeRange, writer.uint32(34).fork()).ldelim();
    }
    if (message.numTicks !== 0) {
      writer.uint32(40).int64(message.numTicks);
    }
    if (message.totalBytes !== 0) {
      writer.uint32(48).int64(message.totalBytes);
    }
    if (message.format !== 0) {
      writer.uint32(56).int32(message.format);
    }
    if (message.compression !== 0) {
      writer.uint32(64).int32(message.compression);
    }
    if (message.isOpen === true) {
      writer.uint32(72).bool(message.isOpen);
    }
    if (message.isDownloaded === true) {
      writer.uint32(80).bool(message.isDownloaded);
    }
    if (message.deletedTimestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.deletedTimestamp),
        writer.uint32(90).fork()
      ).ldelim();
    }
    if (message.downloadStartedTimestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.downloadStartedTimestamp),
        writer.uint32(98).fork()
      ).ldelim();
    }
    if (message.requestPreserve === true) {
      writer.uint32(104).bool(message.requestPreserve);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PageInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePageInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.path = reader.string();
          break;
        case 3:
          message.source = reader.string();
          break;
        case 4:
          message.timeRange = TimeRange.decode(reader, reader.uint32());
          break;
        case 5:
          message.numTicks = longToNumber(reader.int64() as Long);
          break;
        case 6:
          message.totalBytes = longToNumber(reader.int64() as Long);
          break;
        case 7:
          message.format = reader.int32() as any;
          break;
        case 8:
          message.compression = reader.int32() as any;
          break;
        case 9:
          message.isOpen = reader.bool();
          break;
        case 10:
          message.isDownloaded = reader.bool();
          break;
        case 11:
          message.deletedTimestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 12:
          message.downloadStartedTimestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 13:
          message.requestPreserve = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PageInfo {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      path: isSet(object.path) ? String(object.path) : "",
      source: isSet(object.source) ? String(object.source) : "",
      timeRange: isSet(object.timeRange)
        ? TimeRange.fromJSON(object.timeRange)
        : undefined,
      numTicks: isSet(object.numTicks) ? Number(object.numTicks) : 0,
      totalBytes: isSet(object.totalBytes) ? Number(object.totalBytes) : 0,
      format: isSet(object.format)
        ? pageInfo_PageFormatFromJSON(object.format)
        : 0,
      compression: isSet(object.compression)
        ? pageInfo_CompressionFromJSON(object.compression)
        : 0,
      isOpen: isSet(object.isOpen) ? Boolean(object.isOpen) : false,
      isDownloaded: isSet(object.isDownloaded)
        ? Boolean(object.isDownloaded)
        : false,
      deletedTimestamp: isSet(object.deletedTimestamp)
        ? fromJsonTimestamp(object.deletedTimestamp)
        : undefined,
      downloadStartedTimestamp: isSet(object.downloadStartedTimestamp)
        ? fromJsonTimestamp(object.downloadStartedTimestamp)
        : undefined,
      requestPreserve: isSet(object.requestPreserve)
        ? Boolean(object.requestPreserve)
        : false,
    };
  },

  toJSON(message: PageInfo): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.path !== undefined && (obj.path = message.path);
    message.source !== undefined && (obj.source = message.source);
    message.timeRange !== undefined &&
      (obj.timeRange = message.timeRange
        ? TimeRange.toJSON(message.timeRange)
        : undefined);
    message.numTicks !== undefined &&
      (obj.numTicks = Math.round(message.numTicks));
    message.totalBytes !== undefined &&
      (obj.totalBytes = Math.round(message.totalBytes));
    message.format !== undefined &&
      (obj.format = pageInfo_PageFormatToJSON(message.format));
    message.compression !== undefined &&
      (obj.compression = pageInfo_CompressionToJSON(message.compression));
    message.isOpen !== undefined && (obj.isOpen = message.isOpen);
    message.isDownloaded !== undefined &&
      (obj.isDownloaded = message.isDownloaded);
    message.deletedTimestamp !== undefined &&
      (obj.deletedTimestamp = message.deletedTimestamp.toISOString());
    message.downloadStartedTimestamp !== undefined &&
      (obj.downloadStartedTimestamp =
        message.downloadStartedTimestamp.toISOString());
    message.requestPreserve !== undefined &&
      (obj.requestPreserve = message.requestPreserve);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PageInfo>, I>>(object: I): PageInfo {
    const message = createBasePageInfo();
    message.id = object.id ?? "";
    message.path = object.path ?? "";
    message.source = object.source ?? "";
    message.timeRange =
      object.timeRange !== undefined && object.timeRange !== null
        ? TimeRange.fromPartial(object.timeRange)
        : undefined;
    message.numTicks = object.numTicks ?? 0;
    message.totalBytes = object.totalBytes ?? 0;
    message.format = object.format ?? 0;
    message.compression = object.compression ?? 0;
    message.isOpen = object.isOpen ?? false;
    message.isDownloaded = object.isDownloaded ?? false;
    message.deletedTimestamp = object.deletedTimestamp ?? undefined;
    message.downloadStartedTimestamp =
      object.downloadStartedTimestamp ?? undefined;
    message.requestPreserve = object.requestPreserve ?? false;
    return message;
  },
};

function createBaseGrpcPages(): GrpcPages {
  return { timeRange: undefined, spec: undefined, pages: [] };
}

export const GrpcPages = {
  encode(
    message: GrpcPages,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.timeRange !== undefined) {
      TimeRange.encode(message.timeRange, writer.uint32(10).fork()).ldelim();
    }
    if (message.spec !== undefined) {
      GrpcSpec.encode(message.spec, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.pages) {
      PageInfo.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GrpcPages {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGrpcPages();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timeRange = TimeRange.decode(reader, reader.uint32());
          break;
        case 2:
          message.spec = GrpcSpec.decode(reader, reader.uint32());
          break;
        case 3:
          message.pages.push(PageInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GrpcPages {
    return {
      timeRange: isSet(object.timeRange)
        ? TimeRange.fromJSON(object.timeRange)
        : undefined,
      spec: isSet(object.spec) ? GrpcSpec.fromJSON(object.spec) : undefined,
      pages: Array.isArray(object?.pages)
        ? object.pages.map((e: any) => PageInfo.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GrpcPages): unknown {
    const obj: any = {};
    message.timeRange !== undefined &&
      (obj.timeRange = message.timeRange
        ? TimeRange.toJSON(message.timeRange)
        : undefined);
    message.spec !== undefined &&
      (obj.spec = message.spec ? GrpcSpec.toJSON(message.spec) : undefined);
    if (message.pages) {
      obj.pages = message.pages.map((e) =>
        e ? PageInfo.toJSON(e) : undefined
      );
    } else {
      obj.pages = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GrpcPages>, I>>(
    object: I
  ): GrpcPages {
    const message = createBaseGrpcPages();
    message.timeRange =
      object.timeRange !== undefined && object.timeRange !== null
        ? TimeRange.fromPartial(object.timeRange)
        : undefined;
    message.spec =
      object.spec !== undefined && object.spec !== null
        ? GrpcSpec.fromPartial(object.spec)
        : undefined;
    message.pages = object.pages?.map((e) => PageInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBlobPage(): BlobPage {
  return { spec: undefined, page: undefined };
}

export const BlobPage = {
  encode(
    message: BlobPage,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.spec !== undefined) {
      BlobSpec.encode(message.spec, writer.uint32(10).fork()).ldelim();
    }
    if (message.page !== undefined) {
      PageInfo.encode(message.page, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlobPage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlobPage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.spec = BlobSpec.decode(reader, reader.uint32());
          break;
        case 2:
          message.page = PageInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BlobPage {
    return {
      spec: isSet(object.spec) ? BlobSpec.fromJSON(object.spec) : undefined,
      page: isSet(object.page) ? PageInfo.fromJSON(object.page) : undefined,
    };
  },

  toJSON(message: BlobPage): unknown {
    const obj: any = {};
    message.spec !== undefined &&
      (obj.spec = message.spec ? BlobSpec.toJSON(message.spec) : undefined);
    message.page !== undefined &&
      (obj.page = message.page ? PageInfo.toJSON(message.page) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BlobPage>, I>>(object: I): BlobPage {
    const message = createBaseBlobPage();
    message.spec =
      object.spec !== undefined && object.spec !== null
        ? BlobSpec.fromPartial(object.spec)
        : undefined;
    message.page =
      object.page !== undefined && object.page !== null
        ? PageInfo.fromPartial(object.page)
        : undefined;
    return message;
  },
};

function createBaseBlobPages(): BlobPages {
  return { timeRange: undefined, pages: [] };
}

export const BlobPages = {
  encode(
    message: BlobPages,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.timeRange !== undefined) {
      TimeRange.encode(message.timeRange, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.pages) {
      BlobPage.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlobPages {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlobPages();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timeRange = TimeRange.decode(reader, reader.uint32());
          break;
        case 3:
          message.pages.push(BlobPage.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BlobPages {
    return {
      timeRange: isSet(object.timeRange)
        ? TimeRange.fromJSON(object.timeRange)
        : undefined,
      pages: Array.isArray(object?.pages)
        ? object.pages.map((e: any) => BlobPage.fromJSON(e))
        : [],
    };
  },

  toJSON(message: BlobPages): unknown {
    const obj: any = {};
    message.timeRange !== undefined &&
      (obj.timeRange = message.timeRange
        ? TimeRange.toJSON(message.timeRange)
        : undefined);
    if (message.pages) {
      obj.pages = message.pages.map((e) =>
        e ? BlobPage.toJSON(e) : undefined
      );
    } else {
      obj.pages = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BlobPages>, I>>(
    object: I
  ): BlobPages {
    const message = createBaseBlobPages();
    message.timeRange =
      object.timeRange !== undefined && object.timeRange !== null
        ? TimeRange.fromPartial(object.timeRange)
        : undefined;
    message.pages = object.pages?.map((e) => BlobPage.fromPartial(e)) || [];
    return message;
  },
};

function createBasePagesAndTimestamp(): PagesAndTimestamp {
  return { timeRange: undefined, pages: [] };
}

export const PagesAndTimestamp = {
  encode(
    message: PagesAndTimestamp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.timeRange !== undefined) {
      TimeRange.encode(message.timeRange, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.pages) {
      PageInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PagesAndTimestamp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePagesAndTimestamp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timeRange = TimeRange.decode(reader, reader.uint32());
          break;
        case 2:
          message.pages.push(PageInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PagesAndTimestamp {
    return {
      timeRange: isSet(object.timeRange)
        ? TimeRange.fromJSON(object.timeRange)
        : undefined,
      pages: Array.isArray(object?.pages)
        ? object.pages.map((e: any) => PageInfo.fromJSON(e))
        : [],
    };
  },

  toJSON(message: PagesAndTimestamp): unknown {
    const obj: any = {};
    message.timeRange !== undefined &&
      (obj.timeRange = message.timeRange
        ? TimeRange.toJSON(message.timeRange)
        : undefined);
    if (message.pages) {
      obj.pages = message.pages.map((e) =>
        e ? PageInfo.toJSON(e) : undefined
      );
    } else {
      obj.pages = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PagesAndTimestamp>, I>>(
    object: I
  ): PagesAndTimestamp {
    const message = createBasePagesAndTimestamp();
    message.timeRange =
      object.timeRange !== undefined && object.timeRange !== null
        ? TimeRange.fromPartial(object.timeRange)
        : undefined;
    message.pages = object.pages?.map((e) => PageInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDataQuery(): DataQuery {
  return {
    timeRange: undefined,
    blobs: [],
    textMessages: false,
    events: false,
    comments: false,
  };
}

export const DataQuery = {
  encode(
    message: DataQuery,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.timeRange !== undefined) {
      TimeRange.encode(message.timeRange, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.blobs) {
      BlobSpec.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.textMessages === true) {
      writer.uint32(24).bool(message.textMessages);
    }
    if (message.events === true) {
      writer.uint32(32).bool(message.events);
    }
    if (message.comments === true) {
      writer.uint32(48).bool(message.comments);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DataQuery {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDataQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timeRange = TimeRange.decode(reader, reader.uint32());
          break;
        case 2:
          message.blobs.push(BlobSpec.decode(reader, reader.uint32()));
          break;
        case 3:
          message.textMessages = reader.bool();
          break;
        case 4:
          message.events = reader.bool();
          break;
        case 6:
          message.comments = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DataQuery {
    return {
      timeRange: isSet(object.timeRange)
        ? TimeRange.fromJSON(object.timeRange)
        : undefined,
      blobs: Array.isArray(object?.blobs)
        ? object.blobs.map((e: any) => BlobSpec.fromJSON(e))
        : [],
      textMessages: isSet(object.textMessages)
        ? Boolean(object.textMessages)
        : false,
      events: isSet(object.events) ? Boolean(object.events) : false,
      comments: isSet(object.comments) ? Boolean(object.comments) : false,
    };
  },

  toJSON(message: DataQuery): unknown {
    const obj: any = {};
    message.timeRange !== undefined &&
      (obj.timeRange = message.timeRange
        ? TimeRange.toJSON(message.timeRange)
        : undefined);
    if (message.blobs) {
      obj.blobs = message.blobs.map((e) =>
        e ? BlobSpec.toJSON(e) : undefined
      );
    } else {
      obj.blobs = [];
    }
    message.textMessages !== undefined &&
      (obj.textMessages = message.textMessages);
    message.events !== undefined && (obj.events = message.events);
    message.comments !== undefined && (obj.comments = message.comments);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DataQuery>, I>>(
    object: I
  ): DataQuery {
    const message = createBaseDataQuery();
    message.timeRange =
      object.timeRange !== undefined && object.timeRange !== null
        ? TimeRange.fromPartial(object.timeRange)
        : undefined;
    message.blobs = object.blobs?.map((e) => BlobSpec.fromPartial(e)) || [];
    message.textMessages = object.textMessages ?? false;
    message.events = object.events ?? false;
    message.comments = object.comments ?? false;
    return message;
  },
};

function createBaseDataIndex(): DataIndex {
  return {
    timeRange: undefined,
    blobs: [],
    textMessages: undefined,
    events: undefined,
    comments: undefined,
  };
}

export const DataIndex = {
  encode(
    message: DataIndex,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.timeRange !== undefined) {
      TimeRange.encode(message.timeRange, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.blobs) {
      BlobPages.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.textMessages !== undefined) {
      PagesAndTimestamp.encode(
        message.textMessages,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.events !== undefined) {
      PagesAndTimestamp.encode(
        message.events,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.comments !== undefined) {
      PagesAndTimestamp.encode(
        message.comments,
        writer.uint32(50).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DataIndex {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDataIndex();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timeRange = TimeRange.decode(reader, reader.uint32());
          break;
        case 2:
          message.blobs.push(BlobPages.decode(reader, reader.uint32()));
          break;
        case 3:
          message.textMessages = PagesAndTimestamp.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.events = PagesAndTimestamp.decode(reader, reader.uint32());
          break;
        case 6:
          message.comments = PagesAndTimestamp.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DataIndex {
    return {
      timeRange: isSet(object.timeRange)
        ? TimeRange.fromJSON(object.timeRange)
        : undefined,
      blobs: Array.isArray(object?.blobs)
        ? object.blobs.map((e: any) => BlobPages.fromJSON(e))
        : [],
      textMessages: isSet(object.textMessages)
        ? PagesAndTimestamp.fromJSON(object.textMessages)
        : undefined,
      events: isSet(object.events)
        ? PagesAndTimestamp.fromJSON(object.events)
        : undefined,
      comments: isSet(object.comments)
        ? PagesAndTimestamp.fromJSON(object.comments)
        : undefined,
    };
  },

  toJSON(message: DataIndex): unknown {
    const obj: any = {};
    message.timeRange !== undefined &&
      (obj.timeRange = message.timeRange
        ? TimeRange.toJSON(message.timeRange)
        : undefined);
    if (message.blobs) {
      obj.blobs = message.blobs.map((e) =>
        e ? BlobPages.toJSON(e) : undefined
      );
    } else {
      obj.blobs = [];
    }
    message.textMessages !== undefined &&
      (obj.textMessages = message.textMessages
        ? PagesAndTimestamp.toJSON(message.textMessages)
        : undefined);
    message.events !== undefined &&
      (obj.events = message.events
        ? PagesAndTimestamp.toJSON(message.events)
        : undefined);
    message.comments !== undefined &&
      (obj.comments = message.comments
        ? PagesAndTimestamp.toJSON(message.comments)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DataIndex>, I>>(
    object: I
  ): DataIndex {
    const message = createBaseDataIndex();
    message.timeRange =
      object.timeRange !== undefined && object.timeRange !== null
        ? TimeRange.fromPartial(object.timeRange)
        : undefined;
    message.blobs = object.blobs?.map((e) => BlobPages.fromPartial(e)) || [];
    message.textMessages =
      object.textMessages !== undefined && object.textMessages !== null
        ? PagesAndTimestamp.fromPartial(object.textMessages)
        : undefined;
    message.events =
      object.events !== undefined && object.events !== null
        ? PagesAndTimestamp.fromPartial(object.events)
        : undefined;
    message.comments =
      object.comments !== undefined && object.comments !== null
        ? PagesAndTimestamp.fromPartial(object.comments)
        : undefined;
    return message;
  },
};

function createBaseEventsCommentsSpec(): EventsCommentsSpec {
  return {
    timeRange: undefined,
    events: [],
    comments: false,
    maxEvents: 0,
    maxComments: 0,
  };
}

export const EventsCommentsSpec = {
  encode(
    message: EventsCommentsSpec,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.timeRange !== undefined) {
      TimeRange.encode(message.timeRange, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.events) {
      EventSpec.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.comments === true) {
      writer.uint32(24).bool(message.comments);
    }
    if (message.maxEvents !== 0) {
      writer.uint32(32).uint32(message.maxEvents);
    }
    if (message.maxComments !== 0) {
      writer.uint32(40).uint32(message.maxComments);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventsCommentsSpec {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventsCommentsSpec();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timeRange = TimeRange.decode(reader, reader.uint32());
          break;
        case 2:
          message.events.push(EventSpec.decode(reader, reader.uint32()));
          break;
        case 3:
          message.comments = reader.bool();
          break;
        case 4:
          message.maxEvents = reader.uint32();
          break;
        case 5:
          message.maxComments = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventsCommentsSpec {
    return {
      timeRange: isSet(object.timeRange)
        ? TimeRange.fromJSON(object.timeRange)
        : undefined,
      events: Array.isArray(object?.events)
        ? object.events.map((e: any) => EventSpec.fromJSON(e))
        : [],
      comments: isSet(object.comments) ? Boolean(object.comments) : false,
      maxEvents: isSet(object.maxEvents) ? Number(object.maxEvents) : 0,
      maxComments: isSet(object.maxComments) ? Number(object.maxComments) : 0,
    };
  },

  toJSON(message: EventsCommentsSpec): unknown {
    const obj: any = {};
    message.timeRange !== undefined &&
      (obj.timeRange = message.timeRange
        ? TimeRange.toJSON(message.timeRange)
        : undefined);
    if (message.events) {
      obj.events = message.events.map((e) =>
        e ? EventSpec.toJSON(e) : undefined
      );
    } else {
      obj.events = [];
    }
    message.comments !== undefined && (obj.comments = message.comments);
    message.maxEvents !== undefined &&
      (obj.maxEvents = Math.round(message.maxEvents));
    message.maxComments !== undefined &&
      (obj.maxComments = Math.round(message.maxComments));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventsCommentsSpec>, I>>(
    object: I
  ): EventsCommentsSpec {
    const message = createBaseEventsCommentsSpec();
    message.timeRange =
      object.timeRange !== undefined && object.timeRange !== null
        ? TimeRange.fromPartial(object.timeRange)
        : undefined;
    message.events = object.events?.map((e) => EventSpec.fromPartial(e)) || [];
    message.comments = object.comments ?? false;
    message.maxEvents = object.maxEvents ?? 0;
    message.maxComments = object.maxComments ?? 0;
    return message;
  },
};

function createBaseEventsComments(): EventsComments {
  return {
    timeRange: undefined,
    events: [],
    operatorComments: [],
    eventsLimited: false,
    operatorCommentsLimited: false,
  };
}

export const EventsComments = {
  encode(
    message: EventsComments,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.timeRange !== undefined) {
      TimeRange.encode(message.timeRange, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.events) {
      Event.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.operatorComments) {
      OperatorComment.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.eventsLimited === true) {
      writer.uint32(32).bool(message.eventsLimited);
    }
    if (message.operatorCommentsLimited === true) {
      writer.uint32(40).bool(message.operatorCommentsLimited);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventsComments {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventsComments();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timeRange = TimeRange.decode(reader, reader.uint32());
          break;
        case 2:
          message.events.push(Event.decode(reader, reader.uint32()));
          break;
        case 3:
          message.operatorComments.push(
            OperatorComment.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.eventsLimited = reader.bool();
          break;
        case 5:
          message.operatorCommentsLimited = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventsComments {
    return {
      timeRange: isSet(object.timeRange)
        ? TimeRange.fromJSON(object.timeRange)
        : undefined,
      events: Array.isArray(object?.events)
        ? object.events.map((e: any) => Event.fromJSON(e))
        : [],
      operatorComments: Array.isArray(object?.operatorComments)
        ? object.operatorComments.map((e: any) => OperatorComment.fromJSON(e))
        : [],
      eventsLimited: isSet(object.eventsLimited)
        ? Boolean(object.eventsLimited)
        : false,
      operatorCommentsLimited: isSet(object.operatorCommentsLimited)
        ? Boolean(object.operatorCommentsLimited)
        : false,
    };
  },

  toJSON(message: EventsComments): unknown {
    const obj: any = {};
    message.timeRange !== undefined &&
      (obj.timeRange = message.timeRange
        ? TimeRange.toJSON(message.timeRange)
        : undefined);
    if (message.events) {
      obj.events = message.events.map((e) => (e ? Event.toJSON(e) : undefined));
    } else {
      obj.events = [];
    }
    if (message.operatorComments) {
      obj.operatorComments = message.operatorComments.map((e) =>
        e ? OperatorComment.toJSON(e) : undefined
      );
    } else {
      obj.operatorComments = [];
    }
    message.eventsLimited !== undefined &&
      (obj.eventsLimited = message.eventsLimited);
    message.operatorCommentsLimited !== undefined &&
      (obj.operatorCommentsLimited = message.operatorCommentsLimited);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventsComments>, I>>(
    object: I
  ): EventsComments {
    const message = createBaseEventsComments();
    message.timeRange =
      object.timeRange !== undefined && object.timeRange !== null
        ? TimeRange.fromPartial(object.timeRange)
        : undefined;
    message.events = object.events?.map((e) => Event.fromPartial(e)) || [];
    message.operatorComments =
      object.operatorComments?.map((e) => OperatorComment.fromPartial(e)) || [];
    message.eventsLimited = object.eventsLimited ?? false;
    message.operatorCommentsLimited = object.operatorCommentsLimited ?? false;
    return message;
  },
};

function createBaseDataBufferStatus(): DataBufferStatus {
  return {
    numDataBufferPages: 0,
    dataBufferTotalBytes: 0,
    numComments: 0,
    numEvents: 0,
    blobSpecs: [],
  };
}

export const DataBufferStatus = {
  encode(
    message: DataBufferStatus,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.numDataBufferPages !== 0) {
      writer.uint32(8).int64(message.numDataBufferPages);
    }
    if (message.dataBufferTotalBytes !== 0) {
      writer.uint32(16).int64(message.dataBufferTotalBytes);
    }
    if (message.numComments !== 0) {
      writer.uint32(24).int64(message.numComments);
    }
    if (message.numEvents !== 0) {
      writer.uint32(32).int64(message.numEvents);
    }
    for (const v of message.blobSpecs) {
      BlobSpec.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DataBufferStatus {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDataBufferStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.numDataBufferPages = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.dataBufferTotalBytes = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.numComments = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.numEvents = longToNumber(reader.int64() as Long);
          break;
        case 5:
          message.blobSpecs.push(BlobSpec.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DataBufferStatus {
    return {
      numDataBufferPages: isSet(object.numDataBufferPages)
        ? Number(object.numDataBufferPages)
        : 0,
      dataBufferTotalBytes: isSet(object.dataBufferTotalBytes)
        ? Number(object.dataBufferTotalBytes)
        : 0,
      numComments: isSet(object.numComments) ? Number(object.numComments) : 0,
      numEvents: isSet(object.numEvents) ? Number(object.numEvents) : 0,
      blobSpecs: Array.isArray(object?.blobSpecs)
        ? object.blobSpecs.map((e: any) => BlobSpec.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DataBufferStatus): unknown {
    const obj: any = {};
    message.numDataBufferPages !== undefined &&
      (obj.numDataBufferPages = Math.round(message.numDataBufferPages));
    message.dataBufferTotalBytes !== undefined &&
      (obj.dataBufferTotalBytes = Math.round(message.dataBufferTotalBytes));
    message.numComments !== undefined &&
      (obj.numComments = Math.round(message.numComments));
    message.numEvents !== undefined &&
      (obj.numEvents = Math.round(message.numEvents));
    if (message.blobSpecs) {
      obj.blobSpecs = message.blobSpecs.map((e) =>
        e ? BlobSpec.toJSON(e) : undefined
      );
    } else {
      obj.blobSpecs = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DataBufferStatus>, I>>(
    object: I
  ): DataBufferStatus {
    const message = createBaseDataBufferStatus();
    message.numDataBufferPages = object.numDataBufferPages ?? 0;
    message.dataBufferTotalBytes = object.dataBufferTotalBytes ?? 0;
    message.numComments = object.numComments ?? 0;
    message.numEvents = object.numEvents ?? 0;
    message.blobSpecs =
      object.blobSpecs?.map((e) => BlobSpec.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetDataIndexResponse(): GetDataIndexResponse {
  return { header: undefined, dataIndex: undefined };
}

export const GetDataIndexResponse = {
  encode(
    message: GetDataIndexResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.dataIndex !== undefined) {
      DataIndex.encode(message.dataIndex, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetDataIndexResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetDataIndexResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.dataIndex = DataIndex.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetDataIndexResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      dataIndex: isSet(object.dataIndex)
        ? DataIndex.fromJSON(object.dataIndex)
        : undefined,
    };
  },

  toJSON(message: GetDataIndexResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.dataIndex !== undefined &&
      (obj.dataIndex = message.dataIndex
        ? DataIndex.toJSON(message.dataIndex)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetDataIndexResponse>, I>>(
    object: I
  ): GetDataIndexResponse {
    const message = createBaseGetDataIndexResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.dataIndex =
      object.dataIndex !== undefined && object.dataIndex !== null
        ? DataIndex.fromPartial(object.dataIndex)
        : undefined;
    return message;
  },
};

function createBaseGetDataIndexRequest(): GetDataIndexRequest {
  return { header: undefined, dataQuery: undefined };
}

export const GetDataIndexRequest = {
  encode(
    message: GetDataIndexRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.dataQuery !== undefined) {
      DataQuery.encode(message.dataQuery, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetDataIndexRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetDataIndexRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.dataQuery = DataQuery.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetDataIndexRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      dataQuery: isSet(object.dataQuery)
        ? DataQuery.fromJSON(object.dataQuery)
        : undefined,
    };
  },

  toJSON(message: GetDataIndexRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.dataQuery !== undefined &&
      (obj.dataQuery = message.dataQuery
        ? DataQuery.toJSON(message.dataQuery)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetDataIndexRequest>, I>>(
    object: I
  ): GetDataIndexRequest {
    const message = createBaseGetDataIndexRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.dataQuery =
      object.dataQuery !== undefined && object.dataQuery !== null
        ? DataQuery.fromPartial(object.dataQuery)
        : undefined;
    return message;
  },
};

function createBaseGetEventsCommentsRequest(): GetEventsCommentsRequest {
  return { header: undefined, eventCommentRequest: undefined };
}

export const GetEventsCommentsRequest = {
  encode(
    message: GetEventsCommentsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.eventCommentRequest !== undefined) {
      EventsCommentsSpec.encode(
        message.eventCommentRequest,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetEventsCommentsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetEventsCommentsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.eventCommentRequest = EventsCommentsSpec.decode(
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

  fromJSON(object: any): GetEventsCommentsRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      eventCommentRequest: isSet(object.eventCommentRequest)
        ? EventsCommentsSpec.fromJSON(object.eventCommentRequest)
        : undefined,
    };
  },

  toJSON(message: GetEventsCommentsRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.eventCommentRequest !== undefined &&
      (obj.eventCommentRequest = message.eventCommentRequest
        ? EventsCommentsSpec.toJSON(message.eventCommentRequest)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetEventsCommentsRequest>, I>>(
    object: I
  ): GetEventsCommentsRequest {
    const message = createBaseGetEventsCommentsRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.eventCommentRequest =
      object.eventCommentRequest !== undefined &&
      object.eventCommentRequest !== null
        ? EventsCommentsSpec.fromPartial(object.eventCommentRequest)
        : undefined;
    return message;
  },
};

function createBaseGetEventsCommentsResponse(): GetEventsCommentsResponse {
  return { header: undefined, eventsComments: undefined };
}

export const GetEventsCommentsResponse = {
  encode(
    message: GetEventsCommentsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.eventsComments !== undefined) {
      EventsComments.encode(
        message.eventsComments,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetEventsCommentsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetEventsCommentsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.eventsComments = EventsComments.decode(
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

  fromJSON(object: any): GetEventsCommentsResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      eventsComments: isSet(object.eventsComments)
        ? EventsComments.fromJSON(object.eventsComments)
        : undefined,
    };
  },

  toJSON(message: GetEventsCommentsResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.eventsComments !== undefined &&
      (obj.eventsComments = message.eventsComments
        ? EventsComments.toJSON(message.eventsComments)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetEventsCommentsResponse>, I>>(
    object: I
  ): GetEventsCommentsResponse {
    const message = createBaseGetEventsCommentsResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.eventsComments =
      object.eventsComments !== undefined && object.eventsComments !== null
        ? EventsComments.fromPartial(object.eventsComments)
        : undefined;
    return message;
  },
};

function createBaseGetDataBufferStatusRequest(): GetDataBufferStatusRequest {
  return { header: undefined, getBlobSpecs: false };
}

export const GetDataBufferStatusRequest = {
  encode(
    message: GetDataBufferStatusRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.getBlobSpecs === true) {
      writer.uint32(16).bool(message.getBlobSpecs);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetDataBufferStatusRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetDataBufferStatusRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.getBlobSpecs = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetDataBufferStatusRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      getBlobSpecs: isSet(object.getBlobSpecs)
        ? Boolean(object.getBlobSpecs)
        : false,
    };
  },

  toJSON(message: GetDataBufferStatusRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.getBlobSpecs !== undefined &&
      (obj.getBlobSpecs = message.getBlobSpecs);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetDataBufferStatusRequest>, I>>(
    object: I
  ): GetDataBufferStatusRequest {
    const message = createBaseGetDataBufferStatusRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.getBlobSpecs = object.getBlobSpecs ?? false;
    return message;
  },
};

function createBaseGetDataBufferStatusResponse(): GetDataBufferStatusResponse {
  return { header: undefined, dataBufferStatus: undefined };
}

export const GetDataBufferStatusResponse = {
  encode(
    message: GetDataBufferStatusResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.dataBufferStatus !== undefined) {
      DataBufferStatus.encode(
        message.dataBufferStatus,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetDataBufferStatusResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetDataBufferStatusResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.dataBufferStatus = DataBufferStatus.decode(
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

  fromJSON(object: any): GetDataBufferStatusResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      dataBufferStatus: isSet(object.dataBufferStatus)
        ? DataBufferStatus.fromJSON(object.dataBufferStatus)
        : undefined,
    };
  },

  toJSON(message: GetDataBufferStatusResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.dataBufferStatus !== undefined &&
      (obj.dataBufferStatus = message.dataBufferStatus
        ? DataBufferStatus.toJSON(message.dataBufferStatus)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetDataBufferStatusResponse>, I>>(
    object: I
  ): GetDataBufferStatusResponse {
    const message = createBaseGetDataBufferStatusResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.dataBufferStatus =
      object.dataBufferStatus !== undefined && object.dataBufferStatus !== null
        ? DataBufferStatus.fromPartial(object.dataBufferStatus)
        : undefined;
    return message;
  },
};

function createBaseGetDataPagesRequest(): GetDataPagesRequest {
  return { header: undefined, timeRange: undefined };
}

export const GetDataPagesRequest = {
  encode(
    message: GetDataPagesRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.timeRange !== undefined) {
      TimeRange.encode(message.timeRange, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetDataPagesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetDataPagesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.timeRange = TimeRange.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetDataPagesRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      timeRange: isSet(object.timeRange)
        ? TimeRange.fromJSON(object.timeRange)
        : undefined,
    };
  },

  toJSON(message: GetDataPagesRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.timeRange !== undefined &&
      (obj.timeRange = message.timeRange
        ? TimeRange.toJSON(message.timeRange)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetDataPagesRequest>, I>>(
    object: I
  ): GetDataPagesRequest {
    const message = createBaseGetDataPagesRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.timeRange =
      object.timeRange !== undefined && object.timeRange !== null
        ? TimeRange.fromPartial(object.timeRange)
        : undefined;
    return message;
  },
};

function createBaseGetDataPagesResponse(): GetDataPagesResponse {
  return { header: undefined, pages: [] };
}

export const GetDataPagesResponse = {
  encode(
    message: GetDataPagesResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.pages) {
      PageInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetDataPagesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetDataPagesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.pages.push(PageInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetDataPagesResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      pages: Array.isArray(object?.pages)
        ? object.pages.map((e: any) => PageInfo.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetDataPagesResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.pages) {
      obj.pages = message.pages.map((e) =>
        e ? PageInfo.toJSON(e) : undefined
      );
    } else {
      obj.pages = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetDataPagesResponse>, I>>(
    object: I
  ): GetDataPagesResponse {
    const message = createBaseGetDataPagesResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.pages = object.pages?.map((e) => PageInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDeleteDataPagesRequest(): DeleteDataPagesRequest {
  return { header: undefined, timeRange: undefined, pageIds: [] };
}

export const DeleteDataPagesRequest = {
  encode(
    message: DeleteDataPagesRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.timeRange !== undefined) {
      TimeRange.encode(message.timeRange, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.pageIds) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DeleteDataPagesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteDataPagesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.timeRange = TimeRange.decode(reader, reader.uint32());
          break;
        case 3:
          message.pageIds.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteDataPagesRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      timeRange: isSet(object.timeRange)
        ? TimeRange.fromJSON(object.timeRange)
        : undefined,
      pageIds: Array.isArray(object?.pageIds)
        ? object.pageIds.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: DeleteDataPagesRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.timeRange !== undefined &&
      (obj.timeRange = message.timeRange
        ? TimeRange.toJSON(message.timeRange)
        : undefined);
    if (message.pageIds) {
      obj.pageIds = message.pageIds.map((e) => e);
    } else {
      obj.pageIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeleteDataPagesRequest>, I>>(
    object: I
  ): DeleteDataPagesRequest {
    const message = createBaseDeleteDataPagesRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.timeRange =
      object.timeRange !== undefined && object.timeRange !== null
        ? TimeRange.fromPartial(object.timeRange)
        : undefined;
    message.pageIds = object.pageIds?.map((e) => e) || [];
    return message;
  },
};

function createBaseDeletePageStatus(): DeletePageStatus {
  return { pageId: "", status: 0 };
}

export const DeletePageStatus = {
  encode(
    message: DeletePageStatus,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pageId !== "") {
      writer.uint32(10).string(message.pageId);
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeletePageStatus {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeletePageStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pageId = reader.string();
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeletePageStatus {
    return {
      pageId: isSet(object.pageId) ? String(object.pageId) : "",
      status: isSet(object.status)
        ? deletePageStatus_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: DeletePageStatus): unknown {
    const obj: any = {};
    message.pageId !== undefined && (obj.pageId = message.pageId);
    message.status !== undefined &&
      (obj.status = deletePageStatus_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeletePageStatus>, I>>(
    object: I
  ): DeletePageStatus {
    const message = createBaseDeletePageStatus();
    message.pageId = object.pageId ?? "";
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseDeleteDataPagesResponse(): DeleteDataPagesResponse {
  return { header: undefined, bytesDeleted: 0, status: [] };
}

export const DeleteDataPagesResponse = {
  encode(
    message: DeleteDataPagesResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.bytesDeleted !== 0) {
      writer.uint32(16).int64(message.bytesDeleted);
    }
    for (const v of message.status) {
      DeletePageStatus.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DeleteDataPagesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteDataPagesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.bytesDeleted = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.status.push(DeletePageStatus.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteDataPagesResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      bytesDeleted: isSet(object.bytesDeleted)
        ? Number(object.bytesDeleted)
        : 0,
      status: Array.isArray(object?.status)
        ? object.status.map((e: any) => DeletePageStatus.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DeleteDataPagesResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.bytesDeleted !== undefined &&
      (obj.bytesDeleted = Math.round(message.bytesDeleted));
    if (message.status) {
      obj.status = message.status.map((e) =>
        e ? DeletePageStatus.toJSON(e) : undefined
      );
    } else {
      obj.status = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeleteDataPagesResponse>, I>>(
    object: I
  ): DeleteDataPagesResponse {
    const message = createBaseDeleteDataPagesResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.bytesDeleted = object.bytesDeleted ?? 0;
    message.status =
      object.status?.map((e) => DeletePageStatus.fromPartial(e)) || [];
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
