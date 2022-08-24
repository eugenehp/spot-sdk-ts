/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp";
import {
  CaptureActionId,
  DataIdentifier,
  AssociatedMetadata,
  AssociatedAlertData,
} from "./data_acquisition";
import { RequestHeader, ResponseHeader } from "./header";
import { ImageCapture } from "./image";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/**
 * A query parameter which filters the possible set of data identifiters to those
 * which contain the same action/group names matching any of the names in the
 * set of CaptureActionIds.
 */
export interface ActionIdQuery {
  /** The action ids to filter with. */
  actionIds: CaptureActionId[];
}

/**
 * A query parameter which filters the possible set of data identifiers to
 * those with timestamps within the specified range.
 */
export interface TimeRangeQuery {
  /** Start of the time range to query. */
  fromTimestamp: Date | undefined;
  /** End of the time range to query. */
  toTimestamp: Date | undefined;
}

/**
 * The message containing the different query parameters which can be applied to
 * the ListData requests.
 */
export interface DataQueryParams {
  /** Time range to query. */
  timeRange: TimeRangeQuery | undefined;
  /** List of action ids to query. */
  actionIds: ActionIdQuery | undefined;
}

export interface StoreImageRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Image to store. */
  image: ImageCapture | undefined;
  /** Data identifier of the image. */
  dataId: DataIdentifier | undefined;
}

export interface StoreImageResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
}

export interface StoreMetadataRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Metadata to store. */
  metadata: AssociatedMetadata | undefined;
  /** Data identifier of the metadata. */
  dataId: DataIdentifier | undefined;
}

export interface StoreMetadataResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
}

export interface StoreAlertDataRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** AlertData to store. */
  alertData: AssociatedAlertData | undefined;
  /** Data identifier of the alert. */
  dataId: DataIdentifier | undefined;
}

export interface StoreAlertDataResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
}

export interface StoreDataRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Data to store. */
  data: Uint8Array;
  /** Data identifier of the data. */
  dataId: DataIdentifier | undefined;
  /** File extension to use when writing the data to file. */
  fileExtension: string;
}

export interface StoreDataResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
}

export interface ListCaptureActionsRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Query parameters for finding action ids. */
  query: DataQueryParams | undefined;
}

export interface ListCaptureActionsResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** List of action ids that satisfied the query parameters. */
  actionIds: CaptureActionId[];
}

export interface ListStoredImagesRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Query parameters for finding images. */
  query: DataQueryParams | undefined;
}

export interface ListStoredImagesResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** List of image data identifiers that satisfied the query parameters. */
  dataIds: DataIdentifier[];
}

export interface ListStoredMetadataRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Query parameters for finding metadata. */
  query: DataQueryParams | undefined;
}

export interface ListStoredMetadataResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** List of metadata data identifiers that satisfied the query parameters. */
  dataIds: DataIdentifier[];
}

export interface ListStoredAlertDataRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Query parameters for finding AlertData. */
  query: DataQueryParams | undefined;
}

export interface ListStoredAlertDataResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** List of AlertData data identifiers that satisfied the query parameters. */
  dataIds: DataIdentifier[];
}

export interface ListStoredDataRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Query parameters for finding data. */
  query: DataQueryParams | undefined;
}

export interface ListStoredDataResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** List of data identifiers that satisfied the query parameters. */
  dataIds: DataIdentifier[];
}

function createBaseActionIdQuery(): ActionIdQuery {
  return { actionIds: [] };
}

export const ActionIdQuery = {
  encode(
    message: ActionIdQuery,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.actionIds) {
      CaptureActionId.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActionIdQuery {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActionIdQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.actionIds.push(
            CaptureActionId.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ActionIdQuery {
    return {
      actionIds: Array.isArray(object?.actionIds)
        ? object.actionIds.map((e: any) => CaptureActionId.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ActionIdQuery): unknown {
    const obj: any = {};
    if (message.actionIds) {
      obj.actionIds = message.actionIds.map((e) =>
        e ? CaptureActionId.toJSON(e) : undefined
      );
    } else {
      obj.actionIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ActionIdQuery>, I>>(
    object: I
  ): ActionIdQuery {
    const message = createBaseActionIdQuery();
    message.actionIds =
      object.actionIds?.map((e) => CaptureActionId.fromPartial(e)) || [];
    return message;
  },
};

function createBaseTimeRangeQuery(): TimeRangeQuery {
  return { fromTimestamp: undefined, toTimestamp: undefined };
}

export const TimeRangeQuery = {
  encode(
    message: TimeRangeQuery,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.fromTimestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.fromTimestamp),
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.toTimestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.toTimestamp),
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TimeRangeQuery {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTimeRangeQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fromTimestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.toTimestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TimeRangeQuery {
    return {
      fromTimestamp: isSet(object.fromTimestamp)
        ? fromJsonTimestamp(object.fromTimestamp)
        : undefined,
      toTimestamp: isSet(object.toTimestamp)
        ? fromJsonTimestamp(object.toTimestamp)
        : undefined,
    };
  },

  toJSON(message: TimeRangeQuery): unknown {
    const obj: any = {};
    message.fromTimestamp !== undefined &&
      (obj.fromTimestamp = message.fromTimestamp.toISOString());
    message.toTimestamp !== undefined &&
      (obj.toTimestamp = message.toTimestamp.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TimeRangeQuery>, I>>(
    object: I
  ): TimeRangeQuery {
    const message = createBaseTimeRangeQuery();
    message.fromTimestamp = object.fromTimestamp ?? undefined;
    message.toTimestamp = object.toTimestamp ?? undefined;
    return message;
  },
};

function createBaseDataQueryParams(): DataQueryParams {
  return { timeRange: undefined, actionIds: undefined };
}

export const DataQueryParams = {
  encode(
    message: DataQueryParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.timeRange !== undefined) {
      TimeRangeQuery.encode(
        message.timeRange,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.actionIds !== undefined) {
      ActionIdQuery.encode(
        message.actionIds,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DataQueryParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDataQueryParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timeRange = TimeRangeQuery.decode(reader, reader.uint32());
          break;
        case 2:
          message.actionIds = ActionIdQuery.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DataQueryParams {
    return {
      timeRange: isSet(object.timeRange)
        ? TimeRangeQuery.fromJSON(object.timeRange)
        : undefined,
      actionIds: isSet(object.actionIds)
        ? ActionIdQuery.fromJSON(object.actionIds)
        : undefined,
    };
  },

  toJSON(message: DataQueryParams): unknown {
    const obj: any = {};
    message.timeRange !== undefined &&
      (obj.timeRange = message.timeRange
        ? TimeRangeQuery.toJSON(message.timeRange)
        : undefined);
    message.actionIds !== undefined &&
      (obj.actionIds = message.actionIds
        ? ActionIdQuery.toJSON(message.actionIds)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DataQueryParams>, I>>(
    object: I
  ): DataQueryParams {
    const message = createBaseDataQueryParams();
    message.timeRange =
      object.timeRange !== undefined && object.timeRange !== null
        ? TimeRangeQuery.fromPartial(object.timeRange)
        : undefined;
    message.actionIds =
      object.actionIds !== undefined && object.actionIds !== null
        ? ActionIdQuery.fromPartial(object.actionIds)
        : undefined;
    return message;
  },
};

function createBaseStoreImageRequest(): StoreImageRequest {
  return { header: undefined, image: undefined, dataId: undefined };
}

export const StoreImageRequest = {
  encode(
    message: StoreImageRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.image !== undefined) {
      ImageCapture.encode(message.image, writer.uint32(18).fork()).ldelim();
    }
    if (message.dataId !== undefined) {
      DataIdentifier.encode(message.dataId, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StoreImageRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStoreImageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.image = ImageCapture.decode(reader, reader.uint32());
          break;
        case 3:
          message.dataId = DataIdentifier.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StoreImageRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      image: isSet(object.image)
        ? ImageCapture.fromJSON(object.image)
        : undefined,
      dataId: isSet(object.dataId)
        ? DataIdentifier.fromJSON(object.dataId)
        : undefined,
    };
  },

  toJSON(message: StoreImageRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.image !== undefined &&
      (obj.image = message.image
        ? ImageCapture.toJSON(message.image)
        : undefined);
    message.dataId !== undefined &&
      (obj.dataId = message.dataId
        ? DataIdentifier.toJSON(message.dataId)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StoreImageRequest>, I>>(
    object: I
  ): StoreImageRequest {
    const message = createBaseStoreImageRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.image =
      object.image !== undefined && object.image !== null
        ? ImageCapture.fromPartial(object.image)
        : undefined;
    message.dataId =
      object.dataId !== undefined && object.dataId !== null
        ? DataIdentifier.fromPartial(object.dataId)
        : undefined;
    return message;
  },
};

function createBaseStoreImageResponse(): StoreImageResponse {
  return { header: undefined };
}

export const StoreImageResponse = {
  encode(
    message: StoreImageResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StoreImageResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStoreImageResponse();
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

  fromJSON(object: any): StoreImageResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: StoreImageResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StoreImageResponse>, I>>(
    object: I
  ): StoreImageResponse {
    const message = createBaseStoreImageResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseStoreMetadataRequest(): StoreMetadataRequest {
  return { header: undefined, metadata: undefined, dataId: undefined };
}

export const StoreMetadataRequest = {
  encode(
    message: StoreMetadataRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.metadata !== undefined) {
      AssociatedMetadata.encode(
        message.metadata,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.dataId !== undefined) {
      DataIdentifier.encode(message.dataId, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StoreMetadataRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStoreMetadataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.metadata = AssociatedMetadata.decode(reader, reader.uint32());
          break;
        case 3:
          message.dataId = DataIdentifier.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StoreMetadataRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      metadata: isSet(object.metadata)
        ? AssociatedMetadata.fromJSON(object.metadata)
        : undefined,
      dataId: isSet(object.dataId)
        ? DataIdentifier.fromJSON(object.dataId)
        : undefined,
    };
  },

  toJSON(message: StoreMetadataRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? AssociatedMetadata.toJSON(message.metadata)
        : undefined);
    message.dataId !== undefined &&
      (obj.dataId = message.dataId
        ? DataIdentifier.toJSON(message.dataId)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StoreMetadataRequest>, I>>(
    object: I
  ): StoreMetadataRequest {
    const message = createBaseStoreMetadataRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? AssociatedMetadata.fromPartial(object.metadata)
        : undefined;
    message.dataId =
      object.dataId !== undefined && object.dataId !== null
        ? DataIdentifier.fromPartial(object.dataId)
        : undefined;
    return message;
  },
};

function createBaseStoreMetadataResponse(): StoreMetadataResponse {
  return { header: undefined };
}

export const StoreMetadataResponse = {
  encode(
    message: StoreMetadataResponse,
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
  ): StoreMetadataResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStoreMetadataResponse();
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

  fromJSON(object: any): StoreMetadataResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: StoreMetadataResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StoreMetadataResponse>, I>>(
    object: I
  ): StoreMetadataResponse {
    const message = createBaseStoreMetadataResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseStoreAlertDataRequest(): StoreAlertDataRequest {
  return { header: undefined, alertData: undefined, dataId: undefined };
}

export const StoreAlertDataRequest = {
  encode(
    message: StoreAlertDataRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.alertData !== undefined) {
      AssociatedAlertData.encode(
        message.alertData,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.dataId !== undefined) {
      DataIdentifier.encode(message.dataId, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StoreAlertDataRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStoreAlertDataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.alertData = AssociatedAlertData.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.dataId = DataIdentifier.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StoreAlertDataRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      alertData: isSet(object.alertData)
        ? AssociatedAlertData.fromJSON(object.alertData)
        : undefined,
      dataId: isSet(object.dataId)
        ? DataIdentifier.fromJSON(object.dataId)
        : undefined,
    };
  },

  toJSON(message: StoreAlertDataRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.alertData !== undefined &&
      (obj.alertData = message.alertData
        ? AssociatedAlertData.toJSON(message.alertData)
        : undefined);
    message.dataId !== undefined &&
      (obj.dataId = message.dataId
        ? DataIdentifier.toJSON(message.dataId)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StoreAlertDataRequest>, I>>(
    object: I
  ): StoreAlertDataRequest {
    const message = createBaseStoreAlertDataRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.alertData =
      object.alertData !== undefined && object.alertData !== null
        ? AssociatedAlertData.fromPartial(object.alertData)
        : undefined;
    message.dataId =
      object.dataId !== undefined && object.dataId !== null
        ? DataIdentifier.fromPartial(object.dataId)
        : undefined;
    return message;
  },
};

function createBaseStoreAlertDataResponse(): StoreAlertDataResponse {
  return { header: undefined };
}

export const StoreAlertDataResponse = {
  encode(
    message: StoreAlertDataResponse,
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
  ): StoreAlertDataResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStoreAlertDataResponse();
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

  fromJSON(object: any): StoreAlertDataResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: StoreAlertDataResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StoreAlertDataResponse>, I>>(
    object: I
  ): StoreAlertDataResponse {
    const message = createBaseStoreAlertDataResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseStoreDataRequest(): StoreDataRequest {
  return {
    header: undefined,
    data: new Uint8Array(),
    dataId: undefined,
    fileExtension: "",
  };
}

export const StoreDataRequest = {
  encode(
    message: StoreDataRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    if (message.dataId !== undefined) {
      DataIdentifier.encode(message.dataId, writer.uint32(26).fork()).ldelim();
    }
    if (message.fileExtension !== "") {
      writer.uint32(34).string(message.fileExtension);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StoreDataRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStoreDataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.data = reader.bytes();
          break;
        case 3:
          message.dataId = DataIdentifier.decode(reader, reader.uint32());
          break;
        case 4:
          message.fileExtension = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StoreDataRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
      dataId: isSet(object.dataId)
        ? DataIdentifier.fromJSON(object.dataId)
        : undefined,
      fileExtension: isSet(object.fileExtension)
        ? String(object.fileExtension)
        : "",
    };
  },

  toJSON(message: StoreDataRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array()
      ));
    message.dataId !== undefined &&
      (obj.dataId = message.dataId
        ? DataIdentifier.toJSON(message.dataId)
        : undefined);
    message.fileExtension !== undefined &&
      (obj.fileExtension = message.fileExtension);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StoreDataRequest>, I>>(
    object: I
  ): StoreDataRequest {
    const message = createBaseStoreDataRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.data = object.data ?? new Uint8Array();
    message.dataId =
      object.dataId !== undefined && object.dataId !== null
        ? DataIdentifier.fromPartial(object.dataId)
        : undefined;
    message.fileExtension = object.fileExtension ?? "";
    return message;
  },
};

function createBaseStoreDataResponse(): StoreDataResponse {
  return { header: undefined };
}

export const StoreDataResponse = {
  encode(
    message: StoreDataResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StoreDataResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStoreDataResponse();
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

  fromJSON(object: any): StoreDataResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: StoreDataResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StoreDataResponse>, I>>(
    object: I
  ): StoreDataResponse {
    const message = createBaseStoreDataResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseListCaptureActionsRequest(): ListCaptureActionsRequest {
  return { header: undefined, query: undefined };
}

export const ListCaptureActionsRequest = {
  encode(
    message: ListCaptureActionsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.query !== undefined) {
      DataQueryParams.encode(message.query, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListCaptureActionsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListCaptureActionsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.query = DataQueryParams.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListCaptureActionsRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      query: isSet(object.query)
        ? DataQueryParams.fromJSON(object.query)
        : undefined,
    };
  },

  toJSON(message: ListCaptureActionsRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.query !== undefined &&
      (obj.query = message.query
        ? DataQueryParams.toJSON(message.query)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListCaptureActionsRequest>, I>>(
    object: I
  ): ListCaptureActionsRequest {
    const message = createBaseListCaptureActionsRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.query =
      object.query !== undefined && object.query !== null
        ? DataQueryParams.fromPartial(object.query)
        : undefined;
    return message;
  },
};

function createBaseListCaptureActionsResponse(): ListCaptureActionsResponse {
  return { header: undefined, actionIds: [] };
}

export const ListCaptureActionsResponse = {
  encode(
    message: ListCaptureActionsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.actionIds) {
      CaptureActionId.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListCaptureActionsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListCaptureActionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.actionIds.push(
            CaptureActionId.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListCaptureActionsResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      actionIds: Array.isArray(object?.actionIds)
        ? object.actionIds.map((e: any) => CaptureActionId.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListCaptureActionsResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.actionIds) {
      obj.actionIds = message.actionIds.map((e) =>
        e ? CaptureActionId.toJSON(e) : undefined
      );
    } else {
      obj.actionIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListCaptureActionsResponse>, I>>(
    object: I
  ): ListCaptureActionsResponse {
    const message = createBaseListCaptureActionsResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.actionIds =
      object.actionIds?.map((e) => CaptureActionId.fromPartial(e)) || [];
    return message;
  },
};

function createBaseListStoredImagesRequest(): ListStoredImagesRequest {
  return { header: undefined, query: undefined };
}

export const ListStoredImagesRequest = {
  encode(
    message: ListStoredImagesRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.query !== undefined) {
      DataQueryParams.encode(message.query, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListStoredImagesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListStoredImagesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.query = DataQueryParams.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListStoredImagesRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      query: isSet(object.query)
        ? DataQueryParams.fromJSON(object.query)
        : undefined,
    };
  },

  toJSON(message: ListStoredImagesRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.query !== undefined &&
      (obj.query = message.query
        ? DataQueryParams.toJSON(message.query)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListStoredImagesRequest>, I>>(
    object: I
  ): ListStoredImagesRequest {
    const message = createBaseListStoredImagesRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.query =
      object.query !== undefined && object.query !== null
        ? DataQueryParams.fromPartial(object.query)
        : undefined;
    return message;
  },
};

function createBaseListStoredImagesResponse(): ListStoredImagesResponse {
  return { header: undefined, dataIds: [] };
}

export const ListStoredImagesResponse = {
  encode(
    message: ListStoredImagesResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.dataIds) {
      DataIdentifier.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListStoredImagesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListStoredImagesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.dataIds.push(DataIdentifier.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListStoredImagesResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      dataIds: Array.isArray(object?.dataIds)
        ? object.dataIds.map((e: any) => DataIdentifier.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListStoredImagesResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.dataIds) {
      obj.dataIds = message.dataIds.map((e) =>
        e ? DataIdentifier.toJSON(e) : undefined
      );
    } else {
      obj.dataIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListStoredImagesResponse>, I>>(
    object: I
  ): ListStoredImagesResponse {
    const message = createBaseListStoredImagesResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.dataIds =
      object.dataIds?.map((e) => DataIdentifier.fromPartial(e)) || [];
    return message;
  },
};

function createBaseListStoredMetadataRequest(): ListStoredMetadataRequest {
  return { header: undefined, query: undefined };
}

export const ListStoredMetadataRequest = {
  encode(
    message: ListStoredMetadataRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.query !== undefined) {
      DataQueryParams.encode(message.query, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListStoredMetadataRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListStoredMetadataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.query = DataQueryParams.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListStoredMetadataRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      query: isSet(object.query)
        ? DataQueryParams.fromJSON(object.query)
        : undefined,
    };
  },

  toJSON(message: ListStoredMetadataRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.query !== undefined &&
      (obj.query = message.query
        ? DataQueryParams.toJSON(message.query)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListStoredMetadataRequest>, I>>(
    object: I
  ): ListStoredMetadataRequest {
    const message = createBaseListStoredMetadataRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.query =
      object.query !== undefined && object.query !== null
        ? DataQueryParams.fromPartial(object.query)
        : undefined;
    return message;
  },
};

function createBaseListStoredMetadataResponse(): ListStoredMetadataResponse {
  return { header: undefined, dataIds: [] };
}

export const ListStoredMetadataResponse = {
  encode(
    message: ListStoredMetadataResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.dataIds) {
      DataIdentifier.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListStoredMetadataResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListStoredMetadataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.dataIds.push(DataIdentifier.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListStoredMetadataResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      dataIds: Array.isArray(object?.dataIds)
        ? object.dataIds.map((e: any) => DataIdentifier.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListStoredMetadataResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.dataIds) {
      obj.dataIds = message.dataIds.map((e) =>
        e ? DataIdentifier.toJSON(e) : undefined
      );
    } else {
      obj.dataIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListStoredMetadataResponse>, I>>(
    object: I
  ): ListStoredMetadataResponse {
    const message = createBaseListStoredMetadataResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.dataIds =
      object.dataIds?.map((e) => DataIdentifier.fromPartial(e)) || [];
    return message;
  },
};

function createBaseListStoredAlertDataRequest(): ListStoredAlertDataRequest {
  return { header: undefined, query: undefined };
}

export const ListStoredAlertDataRequest = {
  encode(
    message: ListStoredAlertDataRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.query !== undefined) {
      DataQueryParams.encode(message.query, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListStoredAlertDataRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListStoredAlertDataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.query = DataQueryParams.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListStoredAlertDataRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      query: isSet(object.query)
        ? DataQueryParams.fromJSON(object.query)
        : undefined,
    };
  },

  toJSON(message: ListStoredAlertDataRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.query !== undefined &&
      (obj.query = message.query
        ? DataQueryParams.toJSON(message.query)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListStoredAlertDataRequest>, I>>(
    object: I
  ): ListStoredAlertDataRequest {
    const message = createBaseListStoredAlertDataRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.query =
      object.query !== undefined && object.query !== null
        ? DataQueryParams.fromPartial(object.query)
        : undefined;
    return message;
  },
};

function createBaseListStoredAlertDataResponse(): ListStoredAlertDataResponse {
  return { header: undefined, dataIds: [] };
}

export const ListStoredAlertDataResponse = {
  encode(
    message: ListStoredAlertDataResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.dataIds) {
      DataIdentifier.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListStoredAlertDataResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListStoredAlertDataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.dataIds.push(DataIdentifier.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListStoredAlertDataResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      dataIds: Array.isArray(object?.dataIds)
        ? object.dataIds.map((e: any) => DataIdentifier.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListStoredAlertDataResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.dataIds) {
      obj.dataIds = message.dataIds.map((e) =>
        e ? DataIdentifier.toJSON(e) : undefined
      );
    } else {
      obj.dataIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListStoredAlertDataResponse>, I>>(
    object: I
  ): ListStoredAlertDataResponse {
    const message = createBaseListStoredAlertDataResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.dataIds =
      object.dataIds?.map((e) => DataIdentifier.fromPartial(e)) || [];
    return message;
  },
};

function createBaseListStoredDataRequest(): ListStoredDataRequest {
  return { header: undefined, query: undefined };
}

export const ListStoredDataRequest = {
  encode(
    message: ListStoredDataRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.query !== undefined) {
      DataQueryParams.encode(message.query, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListStoredDataRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListStoredDataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.query = DataQueryParams.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListStoredDataRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      query: isSet(object.query)
        ? DataQueryParams.fromJSON(object.query)
        : undefined,
    };
  },

  toJSON(message: ListStoredDataRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.query !== undefined &&
      (obj.query = message.query
        ? DataQueryParams.toJSON(message.query)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListStoredDataRequest>, I>>(
    object: I
  ): ListStoredDataRequest {
    const message = createBaseListStoredDataRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.query =
      object.query !== undefined && object.query !== null
        ? DataQueryParams.fromPartial(object.query)
        : undefined;
    return message;
  },
};

function createBaseListStoredDataResponse(): ListStoredDataResponse {
  return { header: undefined, dataIds: [] };
}

export const ListStoredDataResponse = {
  encode(
    message: ListStoredDataResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.dataIds) {
      DataIdentifier.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListStoredDataResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListStoredDataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.dataIds.push(DataIdentifier.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListStoredDataResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      dataIds: Array.isArray(object?.dataIds)
        ? object.dataIds.map((e: any) => DataIdentifier.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListStoredDataResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.dataIds) {
      obj.dataIds = message.dataIds.map((e) =>
        e ? DataIdentifier.toJSON(e) : undefined
      );
    } else {
      obj.dataIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListStoredDataResponse>, I>>(
    object: I
  ): ListStoredDataResponse {
    const message = createBaseListStoredDataResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.dataIds =
      object.dataIds?.map((e) => DataIdentifier.fromPartial(e)) || [];
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
