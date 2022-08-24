/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp";
import { FrameTreeSnapshot } from "./geometry";
import { RequestHeader, ResponseHeader } from "./header";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/** Representation of an available type of local grid. */
export interface LocalGridType {
  name: string;
}

/** LocalGrids are requested by LocalGridType string name. */
export interface LocalGridRequest {
  localGridTypeName: string;
}

/**
 * Information about the dimensions of the local grid, including the number of grid cells and
 * the size of each cell.
 */
export interface LocalGridExtent {
  /**
   * Size of each side of the individual cells in the local grid (in meters).
   * The area of a grid cell will be (cell_size x cell_size).
   */
  cellSize: number;
  /**
   * Number of cells along x extent of local grid (number of columns in local grid/ the local
   * grid width). Note, that the (num_cells_x)x(num_cells_y) represents the total number of grid
   * cells in the local grid.
   */
  numCellsX: number;
  /**
   * Number of cells along y extent of local grid (number of rows in local grid).
   * Note, that the (num_cells_x)x(num_cells_y) represents the totla number of grid
   * cells in the local grid.
   */
  numCellsY: number;
}

/**
 * A grid-based local grid structure, which can represent different kinds of data, such as terrain
 * or obstacle data.
 */
export interface LocalGrid {
  /** The human readable string name that is used to identify the type of local grid data. */
  localGridTypeName: string;
  /** The time at which the local grid data was computed and last valid at. */
  acquisitionTime: Date | undefined;
  /**
   * A tree-based collection of transformations, which will include the transformations to each of
   * the returned local grids in addition to transformations to the common frames ("vision", "body", "odom").
   * All transforms within the snapshot are at the acquistion time of the local grid.
   */
  transformsSnapshot: FrameTreeSnapshot | undefined;
  /**
   * The frame name for the local grid data. This frame refers to the corner of cell (0, 0), such that
   * the map data is in the +x, +y quadrant.
   * The cell data is packed in x-y order, so the cell at:
   *   data[xi + extent.num_cells_x * yj]
   * has its center at position:
   *   {(xi + 0.5) * extent.cell_size, (yj + 0.5) * extent.cell_size}.
   */
  frameNameLocalGridData: string;
  /** Location, size and resolution of the local grid. */
  extent: LocalGridExtent | undefined;
  /** The data type of all individual cells in the local grid. */
  cellFormat: LocalGrid_CellFormat;
  /** The encoding for the 'data' field of the local grid message. */
  encoding: LocalGrid_Encoding;
  /**
   * The encoded local grid representation.
   * Cells are encoded according to the encoding enum, and are stored in in row-major order (x-major).
   * This means that the data field has data entered row by row. The grid cell located at (i, j) will be
   * at the (index = i * num_cells_x + j) within the data array.
   */
  data: Uint8Array;
  /**
   * RLE pixel repetition counts: use data[i] repeated rle_counts[i] times when decoding the
   * bytes data field.
   */
  rleCounts: number[];
  /** The scale for the cell value data; only valid if it is a non-zero number. */
  cellValueScale: number;
  /**
   * A fixed value offset that is applied to each value of the cell data.
   * Actual values in local grid are: (({value from data} * cell_value_scale) + cell_value_offset).
   */
  cellValueOffset: number;
}

/** Describes the data type of a cell. */
export enum LocalGrid_CellFormat {
  /** CELL_FORMAT_UNKNOWN - Not specified -- not a valid value. */
  CELL_FORMAT_UNKNOWN = 0,
  /** CELL_FORMAT_FLOAT32 - Each cell of the local grid is encoded as a little-endian 32-bit floating point number. */
  CELL_FORMAT_FLOAT32 = 1,
  /** CELL_FORMAT_FLOAT64 - Each cell of the local grid is encoded as a little-endian 64-bit floating point number. */
  CELL_FORMAT_FLOAT64 = 2,
  /** CELL_FORMAT_INT8 - Each cell of the local grid is encoded as a signed 8-bit integer. */
  CELL_FORMAT_INT8 = 3,
  /** CELL_FORMAT_UINT8 - Each cell of the local grid is encoded as an unsigned 8-bit integer. */
  CELL_FORMAT_UINT8 = 4,
  /** CELL_FORMAT_INT16 - Each cell of the local grid is encoded as a little-endian signed 16-bit integer. */
  CELL_FORMAT_INT16 = 5,
  /** CELL_FORMAT_UINT16 - Each cell of the local grid is encoded as a little-endian unsigned 16-bit integer. */
  CELL_FORMAT_UINT16 = 6,
  UNRECOGNIZED = -1,
}

export function localGrid_CellFormatFromJSON(
  object: any
): LocalGrid_CellFormat {
  switch (object) {
    case 0:
    case "CELL_FORMAT_UNKNOWN":
      return LocalGrid_CellFormat.CELL_FORMAT_UNKNOWN;
    case 1:
    case "CELL_FORMAT_FLOAT32":
      return LocalGrid_CellFormat.CELL_FORMAT_FLOAT32;
    case 2:
    case "CELL_FORMAT_FLOAT64":
      return LocalGrid_CellFormat.CELL_FORMAT_FLOAT64;
    case 3:
    case "CELL_FORMAT_INT8":
      return LocalGrid_CellFormat.CELL_FORMAT_INT8;
    case 4:
    case "CELL_FORMAT_UINT8":
      return LocalGrid_CellFormat.CELL_FORMAT_UINT8;
    case 5:
    case "CELL_FORMAT_INT16":
      return LocalGrid_CellFormat.CELL_FORMAT_INT16;
    case 6:
    case "CELL_FORMAT_UINT16":
      return LocalGrid_CellFormat.CELL_FORMAT_UINT16;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LocalGrid_CellFormat.UNRECOGNIZED;
  }
}

export function localGrid_CellFormatToJSON(
  object: LocalGrid_CellFormat
): string {
  switch (object) {
    case LocalGrid_CellFormat.CELL_FORMAT_UNKNOWN:
      return "CELL_FORMAT_UNKNOWN";
    case LocalGrid_CellFormat.CELL_FORMAT_FLOAT32:
      return "CELL_FORMAT_FLOAT32";
    case LocalGrid_CellFormat.CELL_FORMAT_FLOAT64:
      return "CELL_FORMAT_FLOAT64";
    case LocalGrid_CellFormat.CELL_FORMAT_INT8:
      return "CELL_FORMAT_INT8";
    case LocalGrid_CellFormat.CELL_FORMAT_UINT8:
      return "CELL_FORMAT_UINT8";
    case LocalGrid_CellFormat.CELL_FORMAT_INT16:
      return "CELL_FORMAT_INT16";
    case LocalGrid_CellFormat.CELL_FORMAT_UINT16:
      return "CELL_FORMAT_UINT16";
    case LocalGrid_CellFormat.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Encoding used for storing the local grid. */
export enum LocalGrid_Encoding {
  /** ENCODING_UNKNOWN - Not specified -- not a valid value. */
  ENCODING_UNKNOWN = 0,
  /** ENCODING_RAW - Cells are stored packed uncompressed. */
  ENCODING_RAW = 1,
  /** ENCODING_RLE - Run-length encoding: repeat counts stored in rle_counts. */
  ENCODING_RLE = 2,
  UNRECOGNIZED = -1,
}

export function localGrid_EncodingFromJSON(object: any): LocalGrid_Encoding {
  switch (object) {
    case 0:
    case "ENCODING_UNKNOWN":
      return LocalGrid_Encoding.ENCODING_UNKNOWN;
    case 1:
    case "ENCODING_RAW":
      return LocalGrid_Encoding.ENCODING_RAW;
    case 2:
    case "ENCODING_RLE":
      return LocalGrid_Encoding.ENCODING_RLE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LocalGrid_Encoding.UNRECOGNIZED;
  }
}

export function localGrid_EncodingToJSON(object: LocalGrid_Encoding): string {
  switch (object) {
    case LocalGrid_Encoding.ENCODING_UNKNOWN:
      return "ENCODING_UNKNOWN";
    case LocalGrid_Encoding.ENCODING_RAW:
      return "ENCODING_RAW";
    case LocalGrid_Encoding.ENCODING_RLE:
      return "ENCODING_RLE";
    case LocalGrid_Encoding.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** The local grid response message will contain either the local grid or an error status. */
export interface LocalGridResponse {
  /** The type name of the local grid included in this response. */
  localGridTypeName: string;
  /** Status of the request for the individual local grid. */
  status: LocalGridResponse_Status;
  /** The requested local grid data. */
  localGrid: LocalGrid | undefined;
}

export enum LocalGridResponse_Status {
  /** STATUS_UNKNOWN - Not specified -- not a valid value. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - LocalGrid was returned successfully. */
  STATUS_OK = 1,
  /** STATUS_NO_SUCH_GRID - The requested local grid-type is unknown. */
  STATUS_NO_SUCH_GRID = 2,
  /** STATUS_DATA_UNAVAILABLE - The request local grid data is not available at this time. */
  STATUS_DATA_UNAVAILABLE = 3,
  /** STATUS_DATA_INVALID - The local grid data was not valid for some reason. */
  STATUS_DATA_INVALID = 4,
  UNRECOGNIZED = -1,
}

export function localGridResponse_StatusFromJSON(
  object: any
): LocalGridResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return LocalGridResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return LocalGridResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_NO_SUCH_GRID":
      return LocalGridResponse_Status.STATUS_NO_SUCH_GRID;
    case 3:
    case "STATUS_DATA_UNAVAILABLE":
      return LocalGridResponse_Status.STATUS_DATA_UNAVAILABLE;
    case 4:
    case "STATUS_DATA_INVALID":
      return LocalGridResponse_Status.STATUS_DATA_INVALID;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LocalGridResponse_Status.UNRECOGNIZED;
  }
}

export function localGridResponse_StatusToJSON(
  object: LocalGridResponse_Status
): string {
  switch (object) {
    case LocalGridResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case LocalGridResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case LocalGridResponse_Status.STATUS_NO_SUCH_GRID:
      return "STATUS_NO_SUCH_GRID";
    case LocalGridResponse_Status.STATUS_DATA_UNAVAILABLE:
      return "STATUS_DATA_UNAVAILABLE";
    case LocalGridResponse_Status.STATUS_DATA_INVALID:
      return "STATUS_DATA_INVALID";
    case LocalGridResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** The GetLocalGridTypes request message asks to the local grid types. */
export interface GetLocalGridTypesRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/** The GetLocalGridTypes response message returns to get all known string names for local grid types. */
export interface GetLocalGridTypesResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** The list of available local grid types. */
  localGridType: LocalGridType[];
}

/** The GetLocalGrid request message can request for multiple different types of local grids at one time. */
export interface GetLocalGridsRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Specifications of the requested local grids. */
  localGridRequests: LocalGridRequest[];
}

/**
 * The GetLocalGrid response message replies with all of the local grid data for the requested types, and
 * a numerical count representing the amount of status errors that occurred when getting this data.
 */
export interface GetLocalGridsResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Response of local grid or error status for each requested local grid. */
  localGridResponses: LocalGridResponse[];
  /** The number of individual local grids requests which could not be satisfied. */
  numLocalGridErrors: number;
}

function createBaseLocalGridType(): LocalGridType {
  return { name: "" };
}

export const LocalGridType = {
  encode(
    message: LocalGridType,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LocalGridType {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLocalGridType();
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

  fromJSON(object: any): LocalGridType {
    return {
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: LocalGridType): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LocalGridType>, I>>(
    object: I
  ): LocalGridType {
    const message = createBaseLocalGridType();
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseLocalGridRequest(): LocalGridRequest {
  return { localGridTypeName: "" };
}

export const LocalGridRequest = {
  encode(
    message: LocalGridRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.localGridTypeName !== "") {
      writer.uint32(10).string(message.localGridTypeName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LocalGridRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLocalGridRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.localGridTypeName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LocalGridRequest {
    return {
      localGridTypeName: isSet(object.localGridTypeName)
        ? String(object.localGridTypeName)
        : "",
    };
  },

  toJSON(message: LocalGridRequest): unknown {
    const obj: any = {};
    message.localGridTypeName !== undefined &&
      (obj.localGridTypeName = message.localGridTypeName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LocalGridRequest>, I>>(
    object: I
  ): LocalGridRequest {
    const message = createBaseLocalGridRequest();
    message.localGridTypeName = object.localGridTypeName ?? "";
    return message;
  },
};

function createBaseLocalGridExtent(): LocalGridExtent {
  return { cellSize: 0, numCellsX: 0, numCellsY: 0 };
}

export const LocalGridExtent = {
  encode(
    message: LocalGridExtent,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.cellSize !== 0) {
      writer.uint32(17).double(message.cellSize);
    }
    if (message.numCellsX !== 0) {
      writer.uint32(24).int32(message.numCellsX);
    }
    if (message.numCellsY !== 0) {
      writer.uint32(32).int32(message.numCellsY);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LocalGridExtent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLocalGridExtent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.cellSize = reader.double();
          break;
        case 3:
          message.numCellsX = reader.int32();
          break;
        case 4:
          message.numCellsY = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LocalGridExtent {
    return {
      cellSize: isSet(object.cellSize) ? Number(object.cellSize) : 0,
      numCellsX: isSet(object.numCellsX) ? Number(object.numCellsX) : 0,
      numCellsY: isSet(object.numCellsY) ? Number(object.numCellsY) : 0,
    };
  },

  toJSON(message: LocalGridExtent): unknown {
    const obj: any = {};
    message.cellSize !== undefined && (obj.cellSize = message.cellSize);
    message.numCellsX !== undefined &&
      (obj.numCellsX = Math.round(message.numCellsX));
    message.numCellsY !== undefined &&
      (obj.numCellsY = Math.round(message.numCellsY));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LocalGridExtent>, I>>(
    object: I
  ): LocalGridExtent {
    const message = createBaseLocalGridExtent();
    message.cellSize = object.cellSize ?? 0;
    message.numCellsX = object.numCellsX ?? 0;
    message.numCellsY = object.numCellsY ?? 0;
    return message;
  },
};

function createBaseLocalGrid(): LocalGrid {
  return {
    localGridTypeName: "",
    acquisitionTime: undefined,
    transformsSnapshot: undefined,
    frameNameLocalGridData: "",
    extent: undefined,
    cellFormat: 0,
    encoding: 0,
    data: new Uint8Array(),
    rleCounts: [],
    cellValueScale: 0,
    cellValueOffset: 0,
  };
}

export const LocalGrid = {
  encode(
    message: LocalGrid,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.localGridTypeName !== "") {
      writer.uint32(10).string(message.localGridTypeName);
    }
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
    if (message.frameNameLocalGridData !== "") {
      writer.uint32(90).string(message.frameNameLocalGridData);
    }
    if (message.extent !== undefined) {
      LocalGridExtent.encode(message.extent, writer.uint32(26).fork()).ldelim();
    }
    if (message.cellFormat !== 0) {
      writer.uint32(32).int32(message.cellFormat);
    }
    if (message.encoding !== 0) {
      writer.uint32(40).int32(message.encoding);
    }
    if (message.data.length !== 0) {
      writer.uint32(50).bytes(message.data);
    }
    writer.uint32(58).fork();
    for (const v of message.rleCounts) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.cellValueScale !== 0) {
      writer.uint32(65).double(message.cellValueScale);
    }
    if (message.cellValueOffset !== 0) {
      writer.uint32(73).double(message.cellValueOffset);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LocalGrid {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLocalGrid();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.localGridTypeName = reader.string();
          break;
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
        case 11:
          message.frameNameLocalGridData = reader.string();
          break;
        case 3:
          message.extent = LocalGridExtent.decode(reader, reader.uint32());
          break;
        case 4:
          message.cellFormat = reader.int32() as any;
          break;
        case 5:
          message.encoding = reader.int32() as any;
          break;
        case 6:
          message.data = reader.bytes();
          break;
        case 7:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.rleCounts.push(reader.int32());
            }
          } else {
            message.rleCounts.push(reader.int32());
          }
          break;
        case 8:
          message.cellValueScale = reader.double();
          break;
        case 9:
          message.cellValueOffset = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LocalGrid {
    return {
      localGridTypeName: isSet(object.localGridTypeName)
        ? String(object.localGridTypeName)
        : "",
      acquisitionTime: isSet(object.acquisitionTime)
        ? fromJsonTimestamp(object.acquisitionTime)
        : undefined,
      transformsSnapshot: isSet(object.transformsSnapshot)
        ? FrameTreeSnapshot.fromJSON(object.transformsSnapshot)
        : undefined,
      frameNameLocalGridData: isSet(object.frameNameLocalGridData)
        ? String(object.frameNameLocalGridData)
        : "",
      extent: isSet(object.extent)
        ? LocalGridExtent.fromJSON(object.extent)
        : undefined,
      cellFormat: isSet(object.cellFormat)
        ? localGrid_CellFormatFromJSON(object.cellFormat)
        : 0,
      encoding: isSet(object.encoding)
        ? localGrid_EncodingFromJSON(object.encoding)
        : 0,
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
      rleCounts: Array.isArray(object?.rleCounts)
        ? object.rleCounts.map((e: any) => Number(e))
        : [],
      cellValueScale: isSet(object.cellValueScale)
        ? Number(object.cellValueScale)
        : 0,
      cellValueOffset: isSet(object.cellValueOffset)
        ? Number(object.cellValueOffset)
        : 0,
    };
  },

  toJSON(message: LocalGrid): unknown {
    const obj: any = {};
    message.localGridTypeName !== undefined &&
      (obj.localGridTypeName = message.localGridTypeName);
    message.acquisitionTime !== undefined &&
      (obj.acquisitionTime = message.acquisitionTime.toISOString());
    message.transformsSnapshot !== undefined &&
      (obj.transformsSnapshot = message.transformsSnapshot
        ? FrameTreeSnapshot.toJSON(message.transformsSnapshot)
        : undefined);
    message.frameNameLocalGridData !== undefined &&
      (obj.frameNameLocalGridData = message.frameNameLocalGridData);
    message.extent !== undefined &&
      (obj.extent = message.extent
        ? LocalGridExtent.toJSON(message.extent)
        : undefined);
    message.cellFormat !== undefined &&
      (obj.cellFormat = localGrid_CellFormatToJSON(message.cellFormat));
    message.encoding !== undefined &&
      (obj.encoding = localGrid_EncodingToJSON(message.encoding));
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array()
      ));
    if (message.rleCounts) {
      obj.rleCounts = message.rleCounts.map((e) => Math.round(e));
    } else {
      obj.rleCounts = [];
    }
    message.cellValueScale !== undefined &&
      (obj.cellValueScale = message.cellValueScale);
    message.cellValueOffset !== undefined &&
      (obj.cellValueOffset = message.cellValueOffset);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LocalGrid>, I>>(
    object: I
  ): LocalGrid {
    const message = createBaseLocalGrid();
    message.localGridTypeName = object.localGridTypeName ?? "";
    message.acquisitionTime = object.acquisitionTime ?? undefined;
    message.transformsSnapshot =
      object.transformsSnapshot !== undefined &&
      object.transformsSnapshot !== null
        ? FrameTreeSnapshot.fromPartial(object.transformsSnapshot)
        : undefined;
    message.frameNameLocalGridData = object.frameNameLocalGridData ?? "";
    message.extent =
      object.extent !== undefined && object.extent !== null
        ? LocalGridExtent.fromPartial(object.extent)
        : undefined;
    message.cellFormat = object.cellFormat ?? 0;
    message.encoding = object.encoding ?? 0;
    message.data = object.data ?? new Uint8Array();
    message.rleCounts = object.rleCounts?.map((e) => e) || [];
    message.cellValueScale = object.cellValueScale ?? 0;
    message.cellValueOffset = object.cellValueOffset ?? 0;
    return message;
  },
};

function createBaseLocalGridResponse(): LocalGridResponse {
  return { localGridTypeName: "", status: 0, localGrid: undefined };
}

export const LocalGridResponse = {
  encode(
    message: LocalGridResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.localGridTypeName !== "") {
      writer.uint32(10).string(message.localGridTypeName);
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.localGrid !== undefined) {
      LocalGrid.encode(message.localGrid, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LocalGridResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLocalGridResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.localGridTypeName = reader.string();
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        case 3:
          message.localGrid = LocalGrid.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LocalGridResponse {
    return {
      localGridTypeName: isSet(object.localGridTypeName)
        ? String(object.localGridTypeName)
        : "",
      status: isSet(object.status)
        ? localGridResponse_StatusFromJSON(object.status)
        : 0,
      localGrid: isSet(object.localGrid)
        ? LocalGrid.fromJSON(object.localGrid)
        : undefined,
    };
  },

  toJSON(message: LocalGridResponse): unknown {
    const obj: any = {};
    message.localGridTypeName !== undefined &&
      (obj.localGridTypeName = message.localGridTypeName);
    message.status !== undefined &&
      (obj.status = localGridResponse_StatusToJSON(message.status));
    message.localGrid !== undefined &&
      (obj.localGrid = message.localGrid
        ? LocalGrid.toJSON(message.localGrid)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LocalGridResponse>, I>>(
    object: I
  ): LocalGridResponse {
    const message = createBaseLocalGridResponse();
    message.localGridTypeName = object.localGridTypeName ?? "";
    message.status = object.status ?? 0;
    message.localGrid =
      object.localGrid !== undefined && object.localGrid !== null
        ? LocalGrid.fromPartial(object.localGrid)
        : undefined;
    return message;
  },
};

function createBaseGetLocalGridTypesRequest(): GetLocalGridTypesRequest {
  return { header: undefined };
}

export const GetLocalGridTypesRequest = {
  encode(
    message: GetLocalGridTypesRequest,
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
  ): GetLocalGridTypesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLocalGridTypesRequest();
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

  fromJSON(object: any): GetLocalGridTypesRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: GetLocalGridTypesRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetLocalGridTypesRequest>, I>>(
    object: I
  ): GetLocalGridTypesRequest {
    const message = createBaseGetLocalGridTypesRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseGetLocalGridTypesResponse(): GetLocalGridTypesResponse {
  return { header: undefined, localGridType: [] };
}

export const GetLocalGridTypesResponse = {
  encode(
    message: GetLocalGridTypesResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.localGridType) {
      LocalGridType.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetLocalGridTypesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLocalGridTypesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.localGridType.push(
            LocalGridType.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetLocalGridTypesResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      localGridType: Array.isArray(object?.localGridType)
        ? object.localGridType.map((e: any) => LocalGridType.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetLocalGridTypesResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.localGridType) {
      obj.localGridType = message.localGridType.map((e) =>
        e ? LocalGridType.toJSON(e) : undefined
      );
    } else {
      obj.localGridType = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetLocalGridTypesResponse>, I>>(
    object: I
  ): GetLocalGridTypesResponse {
    const message = createBaseGetLocalGridTypesResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.localGridType =
      object.localGridType?.map((e) => LocalGridType.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetLocalGridsRequest(): GetLocalGridsRequest {
  return { header: undefined, localGridRequests: [] };
}

export const GetLocalGridsRequest = {
  encode(
    message: GetLocalGridsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.localGridRequests) {
      LocalGridRequest.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetLocalGridsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLocalGridsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.localGridRequests.push(
            LocalGridRequest.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetLocalGridsRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      localGridRequests: Array.isArray(object?.localGridRequests)
        ? object.localGridRequests.map((e: any) => LocalGridRequest.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetLocalGridsRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    if (message.localGridRequests) {
      obj.localGridRequests = message.localGridRequests.map((e) =>
        e ? LocalGridRequest.toJSON(e) : undefined
      );
    } else {
      obj.localGridRequests = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetLocalGridsRequest>, I>>(
    object: I
  ): GetLocalGridsRequest {
    const message = createBaseGetLocalGridsRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.localGridRequests =
      object.localGridRequests?.map((e) => LocalGridRequest.fromPartial(e)) ||
      [];
    return message;
  },
};

function createBaseGetLocalGridsResponse(): GetLocalGridsResponse {
  return { header: undefined, localGridResponses: [], numLocalGridErrors: 0 };
}

export const GetLocalGridsResponse = {
  encode(
    message: GetLocalGridsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.localGridResponses) {
      LocalGridResponse.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.numLocalGridErrors !== 0) {
      writer.uint32(24).int32(message.numLocalGridErrors);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetLocalGridsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLocalGridsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.localGridResponses.push(
            LocalGridResponse.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.numLocalGridErrors = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetLocalGridsResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      localGridResponses: Array.isArray(object?.localGridResponses)
        ? object.localGridResponses.map((e: any) =>
            LocalGridResponse.fromJSON(e)
          )
        : [],
      numLocalGridErrors: isSet(object.numLocalGridErrors)
        ? Number(object.numLocalGridErrors)
        : 0,
    };
  },

  toJSON(message: GetLocalGridsResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.localGridResponses) {
      obj.localGridResponses = message.localGridResponses.map((e) =>
        e ? LocalGridResponse.toJSON(e) : undefined
      );
    } else {
      obj.localGridResponses = [];
    }
    message.numLocalGridErrors !== undefined &&
      (obj.numLocalGridErrors = Math.round(message.numLocalGridErrors));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetLocalGridsResponse>, I>>(
    object: I
  ): GetLocalGridsResponse {
    const message = createBaseGetLocalGridsResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.localGridResponses =
      object.localGridResponses?.map((e) => LocalGridResponse.fromPartial(e)) ||
      [];
    message.numLocalGridErrors = object.numLocalGridErrors ?? 0;
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
