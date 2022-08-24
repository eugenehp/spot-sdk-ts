/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp";
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/** "Plain old data" types which may be stored within POD data blocks. */
export enum PodTypeEnum {
  TYPE_UNSPECIFIED = 0,
  TYPE_INT8 = 1,
  TYPE_INT16 = 2,
  TYPE_INT32 = 3,
  TYPE_INT64 = 4,
  TYPE_UINT8 = 5,
  TYPE_UINT16 = 6,
  TYPE_UINT32 = 7,
  TYPE_UINT64 = 8,
  TYPE_FLOAT32 = 9,
  TYPE_FLOAT64 = 10,
  UNRECOGNIZED = -1,
}

export function podTypeEnumFromJSON(object: any): PodTypeEnum {
  switch (object) {
    case 0:
    case "TYPE_UNSPECIFIED":
      return PodTypeEnum.TYPE_UNSPECIFIED;
    case 1:
    case "TYPE_INT8":
      return PodTypeEnum.TYPE_INT8;
    case 2:
    case "TYPE_INT16":
      return PodTypeEnum.TYPE_INT16;
    case 3:
    case "TYPE_INT32":
      return PodTypeEnum.TYPE_INT32;
    case 4:
    case "TYPE_INT64":
      return PodTypeEnum.TYPE_INT64;
    case 5:
    case "TYPE_UINT8":
      return PodTypeEnum.TYPE_UINT8;
    case 6:
    case "TYPE_UINT16":
      return PodTypeEnum.TYPE_UINT16;
    case 7:
    case "TYPE_UINT32":
      return PodTypeEnum.TYPE_UINT32;
    case 8:
    case "TYPE_UINT64":
      return PodTypeEnum.TYPE_UINT64;
    case 9:
    case "TYPE_FLOAT32":
      return PodTypeEnum.TYPE_FLOAT32;
    case 10:
    case "TYPE_FLOAT64":
      return PodTypeEnum.TYPE_FLOAT64;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PodTypeEnum.UNRECOGNIZED;
  }
}

export function podTypeEnumToJSON(object: PodTypeEnum): string {
  switch (object) {
    case PodTypeEnum.TYPE_UNSPECIFIED:
      return "TYPE_UNSPECIFIED";
    case PodTypeEnum.TYPE_INT8:
      return "TYPE_INT8";
    case PodTypeEnum.TYPE_INT16:
      return "TYPE_INT16";
    case PodTypeEnum.TYPE_INT32:
      return "TYPE_INT32";
    case PodTypeEnum.TYPE_INT64:
      return "TYPE_INT64";
    case PodTypeEnum.TYPE_UINT8:
      return "TYPE_UINT8";
    case PodTypeEnum.TYPE_UINT16:
      return "TYPE_UINT16";
    case PodTypeEnum.TYPE_UINT32:
      return "TYPE_UINT32";
    case PodTypeEnum.TYPE_UINT64:
      return "TYPE_UINT64";
    case PodTypeEnum.TYPE_FLOAT32:
      return "TYPE_FLOAT32";
    case PodTypeEnum.TYPE_FLOAT64:
      return "TYPE_FLOAT64";
    case PodTypeEnum.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * A Descriptor block typically describes a series of messages, but the descriptor at the
 *  start of the file describes the contents of the file as a whole, and the descriptor
 *  at the end of the file is an index structure to allow efficient access to the contents
 *  of the file.
 */
export interface DescriptorBlock {
  fileDescriptor: FileFormatDescriptor | undefined;
  seriesDescriptor: SeriesDescriptor | undefined;
  seriesBlockIndex: SeriesBlockIndex | undefined;
  fileIndex: FileIndex | undefined;
}

/**
 * A DataDescriptor describes a data block which immediately follows it in the file.
 * A corresponding SeriesDescriptor with a matching series_index must precede this in the file.
 */
export interface DataDescriptor {
  /** The series_index references the SeriesDescriptor to which the data following is associated. */
  seriesIndex: number;
  /**
   * The time at which the data is considered to be captured/sampled.
   * E.g., the shutter-close time of a captured image.
   */
  timestamp: Date | undefined;
  /**
   * Sometimes a visualizer will want to organize message by data timestamp, sometimes by
   *  the time messages were published or logged.
   * The additional_indexes field allows extra indexes or timestamps to be associated with
   *  each data block for this purpose.
   * Other identifying information may also be used here, such as the PID of the process which
   *  originated the data (e.g., for detecting if and when that process restarted).
   * The values in this field should correspond to the labels defined in "additional_index_names"
   *  in the corresponding SeriesDescriptor.
   */
  additionalIndexes: number[];
}

/**
 * The first block in the file should be a DescriptorBlock containing a FileFormatDescriptor.
 * FileFormatDescriptor indicates the file format version and annotations.
 * Annotations describe things like the robot from which the log was taken and the release id.
 * The format of annotation keys should be
 *   {project-or-organization}/{annotation-name}
 * For example, 'bosdyn/robot-serial-number'.
 */
export interface FileFormatDescriptor {
  /** The version number of the BDDF file. */
  version: FileFormatVersion | undefined;
  /** File/stream-wide annotations to describe the content of the file. */
  annotations: { [key: string]: string };
  /**
   * The type of checksum supported by this stream.
   * For BDDF version 1.0.0 this should be SHA1.
   */
  checksumType: FileFormatDescriptor_CheckSumType;
  /**
   * The number of bytes used for the BDDF checksum.
   * For BDDF version 1.0.0 this should always be 20, even if CHECKSUM_NONE is used.
   */
  checksumNumBytes: number;
}

export enum FileFormatDescriptor_CheckSumType {
  /** CHECKSUM_TYPE_UNKNOWN - Checksum type is unspecified.  Should not be used. */
  CHECKSUM_TYPE_UNKNOWN = 0,
  /**
   * CHECKSUM_TYPE_NONE - The writer of this stream is not computing a checksum.
   * The stream checksum at the end of the file will be 160 bits all set to 0.
   */
  CHECKSUM_TYPE_NONE = 1,
  /**
   * CHECKSUM_TYPE_SHA1 - A 160 bit SHA1 checksum will be included at the end of the stream.
   * This checksum will be computed over all data before digest itself at the
   *  end of the stream, and can be used to verify the stream was received uncorrupted.
   */
  CHECKSUM_TYPE_SHA1 = 2,
  UNRECOGNIZED = -1,
}

export function fileFormatDescriptor_CheckSumTypeFromJSON(
  object: any
): FileFormatDescriptor_CheckSumType {
  switch (object) {
    case 0:
    case "CHECKSUM_TYPE_UNKNOWN":
      return FileFormatDescriptor_CheckSumType.CHECKSUM_TYPE_UNKNOWN;
    case 1:
    case "CHECKSUM_TYPE_NONE":
      return FileFormatDescriptor_CheckSumType.CHECKSUM_TYPE_NONE;
    case 2:
    case "CHECKSUM_TYPE_SHA1":
      return FileFormatDescriptor_CheckSumType.CHECKSUM_TYPE_SHA1;
    case -1:
    case "UNRECOGNIZED":
    default:
      return FileFormatDescriptor_CheckSumType.UNRECOGNIZED;
  }
}

export function fileFormatDescriptor_CheckSumTypeToJSON(
  object: FileFormatDescriptor_CheckSumType
): string {
  switch (object) {
    case FileFormatDescriptor_CheckSumType.CHECKSUM_TYPE_UNKNOWN:
      return "CHECKSUM_TYPE_UNKNOWN";
    case FileFormatDescriptor_CheckSumType.CHECKSUM_TYPE_NONE:
      return "CHECKSUM_TYPE_NONE";
    case FileFormatDescriptor_CheckSumType.CHECKSUM_TYPE_SHA1:
      return "CHECKSUM_TYPE_SHA1";
    case FileFormatDescriptor_CheckSumType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface FileFormatDescriptor_AnnotationsEntry {
  key: string;
  value: string;
}

/** The current data file format is 1.0.0. */
export interface FileFormatVersion {
  majorVersion: number;
  minorVersion: number;
  patchLevel: number;
}

/**
 * A description of a series of data blocks.
 * These data blocks may either represent binary messages of a variable size, or they may
 *  represent a sequence of samples of POD data samples: single/vector/matrix/... of integer
 *  or floating-point values.
 */
export interface SeriesDescriptor {
  /** This index for the series is unique within the data file. */
  seriesIndex: number;
  /** This is the globally unique {key -> value} mapping to identify the series. */
  seriesIdentifier: SeriesIdentifier | undefined;
  /**
   * This is a hash of the series_identifier.
   * The hash is the first 64 bits (read as a big-endian encoded uint64_t) of
   *  SHA1(S K1 V1 K2 V2 ...) where,
   *   - S is series identifier text,
   *   - K1 and V1 are the key and value of the first key and value of the `spec`,
   *   - K2 and V2 are the second key and value of the spec, etc...
   * Here, all strings are encoded as utf-8, and keys are sorted lexicographically using this
   *  encoding (K1 < K2 < ...).
   */
  identifierHash: number;
  messageType: MessageTypeDescriptor | undefined;
  podType: PodTypeDescriptor | undefined;
  structType: StructTypeDescriptor | undefined;
  /**
   * Annotations are a {key -> value} mapping for associating additional information with
   *  the series.
   * The format of annotation keys should be
   *   {project-or-organization}/{annotation-name}
   * For example, 'bosdyn/channel-name', 'bosdyn/protobuf-type'.
   * Annotation keys without a '/' are reserved.
   * The only current key in the reserved namespace is 'units': e.g., {'units': 'm/s2'}.
   */
  annotations: { [key: string]: string };
  /**
   * Labels for additional index values which should be attached to each DataDescriptor
   *  in the series.
   * See the description of "additional_indexes" in DataDescriptor.
   */
  additionalIndexNames: string[];
  description: string;
}

export interface SeriesDescriptor_AnnotationsEntry {
  key: string;
  value: string;
}

/**
 * If a data series contains a sequence of binary messages, the encoding and format of these
 *  messages is described by a MesssageTypeDescriptor.
 */
export interface MessageTypeDescriptor {
  /**
   * Description of the content type.
   * E.g., "application/protobuf", "image/jpeg", "text/csv", ...
   */
  contentType: string;
  /** If content_type is "application/protobuf", this is the full-name of the protobuf type. */
  typeName: string;
  /**
   * If true, message contents are necessary for interpreting other messages.
   * If the content of this file is split into multiple output files, these messages should be
   *  copied into each.
   */
  isMetadata: boolean;
}

/**
 * If a data series contains signals-style data of time-sampled "plain old datatypes", this
 *  describes the content of the series.
 * All POD data stored in data blocks is stored in little-endian byte order.
 * Any number of samples may be stored within a given data block.
 */
export interface PodTypeDescriptor {
  /** The type of machine-readable values stored. */
  podType: PodTypeEnum;
  /**
   * If empty, indicates a single POD per sample.
   * If one-element, indicates a vector of the given size per sample.
   * If two-elements, indicates a matrix of the given size, and so on.
   * An M x N x .. x P array of data is traversed from innermost (P) to outermost (M) dimension.
   */
  dimension: number[];
}

/**
 * A struct series is a composite formed by a set of other series whose messages or signals-ticks
 *  are sampled at the same time.
 * For example, all there may be a struct series for a set of signals variables, all from a
 *  process with an 'update()' function within which all all variables are sampled with the
 *  same timestamp.
 * DataBlocks will not directly reference this series, but only child series of this series.
 * Struct series may reference other struct series, but the series structure must be a directed
 *  acyclic graph (DAG): no circular reference structures.
 */
export interface StructTypeDescriptor {
  /** A map of a name-reference to a series, identified by its series_identifer_hash. */
  keyToSeriesIdentifierHash: { [key: string]: number };
}

export interface StructTypeDescriptor_KeyToSeriesIdentifierHashEntry {
  key: string;
  value: number;
}

/**
 * As a file is closed, a DescriptorBlock containing a FileIndex should be written.
 * The FileIndex summarizes the data series stored in the file and the location of the
 *  block-indexes for each type in the file.
 * Each series is assigned a "series_index" within the file, and this index may be used to
 *  index into the repeated fields in this message.
 * E.g., for the series with series_index N, you can access its SeriesIdentifier by accessing
 *  element N the of the series_identifiers repeated field.
 */
export interface FileIndex {
  /** SeriesIdentifer for each series in this file. */
  seriesIdentifiers: SeriesIdentifier[];
  /** The offset from the start of the file of the SeriesBlockIndex block for each series. */
  seriesBlockIndexOffsets: number[];
  /** The hash of the series_identifier for each series. */
  seriesIdentifierHashes: number[];
}

/**
 * This describes the location of the SeriesDescriptor DescriptorBlock for the series, and
 *  the timestamp and location in the file of every data block in the series.
 */
export interface SeriesBlockIndex {
  /** The series_index for the series described by this index block. */
  seriesIndex: number;
  /** Offset of type descriptor block from start of file. */
  descriptorFileOffset: number;
  /** The timestamp and location of each data block for this series. */
  blockEntries: SeriesBlockIndex_BlockEntry[];
  /** The total size of the data stored in the data blocks of this series. */
  totalBytes: number;
}

export interface SeriesBlockIndex_BlockEntry {
  /** The timestamp of data in this block. */
  timestamp: Date | undefined;
  /** The offset of the data block from the start of the file. */
  fileOffset: number;
  /** Values of the additional indexes for describing this block. */
  additionalIndexes: number[];
}

/**
 * A key or description for selecting a message series.
 * Because there may be multiple ways of describing a message series, we identify
 *  them by a unique mapping of {key -> value}.
 * A series_type corresponds to a set of keys which are expected in the mapping.
 * A 'bosdyn:grpc:requests' series_type, containing GRPC robot-id request messages, might
 *  thus be specified as:
 *   {'service': 'robot_id', 'message': 'bosdyn.api.RobotIdRequest'}
 * A 'bosdyn:logtick' series_type, containing a signals data variable from LogTick
 *   annotations might be specified as:
 *   {'varname': 'tablet.wifi.rssi', 'schema': 'tablet-comms', 'client': 'bd-tablet'}
 */
export interface SeriesIdentifier {
  /**
   * This is the kind of spec, which should correspond to a set of keys which are expected
   *  in the spec.
   */
  seriesType: string;
  /**
   * This is the "key" for naming the series within the file.
   * A key->value description which should be unique for this series within the file
   *  with this series_type.
   */
  spec: { [key: string]: string };
}

export interface SeriesIdentifier_SpecEntry {
  key: string;
  value: string;
}

function createBaseDescriptorBlock(): DescriptorBlock {
  return {
    fileDescriptor: undefined,
    seriesDescriptor: undefined,
    seriesBlockIndex: undefined,
    fileIndex: undefined,
  };
}

export const DescriptorBlock = {
  encode(
    message: DescriptorBlock,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.fileDescriptor !== undefined) {
      FileFormatDescriptor.encode(
        message.fileDescriptor,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.seriesDescriptor !== undefined) {
      SeriesDescriptor.encode(
        message.seriesDescriptor,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.seriesBlockIndex !== undefined) {
      SeriesBlockIndex.encode(
        message.seriesBlockIndex,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.fileIndex !== undefined) {
      FileIndex.encode(message.fileIndex, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DescriptorBlock {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescriptorBlock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fileDescriptor = FileFormatDescriptor.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.seriesDescriptor = SeriesDescriptor.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.seriesBlockIndex = SeriesBlockIndex.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.fileIndex = FileIndex.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DescriptorBlock {
    return {
      fileDescriptor: isSet(object.fileDescriptor)
        ? FileFormatDescriptor.fromJSON(object.fileDescriptor)
        : undefined,
      seriesDescriptor: isSet(object.seriesDescriptor)
        ? SeriesDescriptor.fromJSON(object.seriesDescriptor)
        : undefined,
      seriesBlockIndex: isSet(object.seriesBlockIndex)
        ? SeriesBlockIndex.fromJSON(object.seriesBlockIndex)
        : undefined,
      fileIndex: isSet(object.fileIndex)
        ? FileIndex.fromJSON(object.fileIndex)
        : undefined,
    };
  },

  toJSON(message: DescriptorBlock): unknown {
    const obj: any = {};
    message.fileDescriptor !== undefined &&
      (obj.fileDescriptor = message.fileDescriptor
        ? FileFormatDescriptor.toJSON(message.fileDescriptor)
        : undefined);
    message.seriesDescriptor !== undefined &&
      (obj.seriesDescriptor = message.seriesDescriptor
        ? SeriesDescriptor.toJSON(message.seriesDescriptor)
        : undefined);
    message.seriesBlockIndex !== undefined &&
      (obj.seriesBlockIndex = message.seriesBlockIndex
        ? SeriesBlockIndex.toJSON(message.seriesBlockIndex)
        : undefined);
    message.fileIndex !== undefined &&
      (obj.fileIndex = message.fileIndex
        ? FileIndex.toJSON(message.fileIndex)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DescriptorBlock>, I>>(
    object: I
  ): DescriptorBlock {
    const message = createBaseDescriptorBlock();
    message.fileDescriptor =
      object.fileDescriptor !== undefined && object.fileDescriptor !== null
        ? FileFormatDescriptor.fromPartial(object.fileDescriptor)
        : undefined;
    message.seriesDescriptor =
      object.seriesDescriptor !== undefined && object.seriesDescriptor !== null
        ? SeriesDescriptor.fromPartial(object.seriesDescriptor)
        : undefined;
    message.seriesBlockIndex =
      object.seriesBlockIndex !== undefined && object.seriesBlockIndex !== null
        ? SeriesBlockIndex.fromPartial(object.seriesBlockIndex)
        : undefined;
    message.fileIndex =
      object.fileIndex !== undefined && object.fileIndex !== null
        ? FileIndex.fromPartial(object.fileIndex)
        : undefined;
    return message;
  },
};

function createBaseDataDescriptor(): DataDescriptor {
  return { seriesIndex: 0, timestamp: undefined, additionalIndexes: [] };
}

export const DataDescriptor = {
  encode(
    message: DataDescriptor,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.seriesIndex !== 0) {
      writer.uint32(8).uint32(message.seriesIndex);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestamp),
        writer.uint32(18).fork()
      ).ldelim();
    }
    writer.uint32(26).fork();
    for (const v of message.additionalIndexes) {
      writer.int64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DataDescriptor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDataDescriptor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.seriesIndex = reader.uint32();
          break;
        case 2:
          message.timestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.additionalIndexes.push(
                longToNumber(reader.int64() as Long)
              );
            }
          } else {
            message.additionalIndexes.push(
              longToNumber(reader.int64() as Long)
            );
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DataDescriptor {
    return {
      seriesIndex: isSet(object.seriesIndex) ? Number(object.seriesIndex) : 0,
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
      additionalIndexes: Array.isArray(object?.additionalIndexes)
        ? object.additionalIndexes.map((e: any) => Number(e))
        : [],
    };
  },

  toJSON(message: DataDescriptor): unknown {
    const obj: any = {};
    message.seriesIndex !== undefined &&
      (obj.seriesIndex = Math.round(message.seriesIndex));
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp.toISOString());
    if (message.additionalIndexes) {
      obj.additionalIndexes = message.additionalIndexes.map((e) =>
        Math.round(e)
      );
    } else {
      obj.additionalIndexes = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DataDescriptor>, I>>(
    object: I
  ): DataDescriptor {
    const message = createBaseDataDescriptor();
    message.seriesIndex = object.seriesIndex ?? 0;
    message.timestamp = object.timestamp ?? undefined;
    message.additionalIndexes = object.additionalIndexes?.map((e) => e) || [];
    return message;
  },
};

function createBaseFileFormatDescriptor(): FileFormatDescriptor {
  return {
    version: undefined,
    annotations: {},
    checksumType: 0,
    checksumNumBytes: 0,
  };
}

export const FileFormatDescriptor = {
  encode(
    message: FileFormatDescriptor,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.version !== undefined) {
      FileFormatVersion.encode(
        message.version,
        writer.uint32(10).fork()
      ).ldelim();
    }
    Object.entries(message.annotations).forEach(([key, value]) => {
      FileFormatDescriptor_AnnotationsEntry.encode(
        { key: key as any, value },
        writer.uint32(18).fork()
      ).ldelim();
    });
    if (message.checksumType !== 0) {
      writer.uint32(24).int32(message.checksumType);
    }
    if (message.checksumNumBytes !== 0) {
      writer.uint32(32).uint32(message.checksumNumBytes);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): FileFormatDescriptor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFileFormatDescriptor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.version = FileFormatVersion.decode(reader, reader.uint32());
          break;
        case 2:
          const entry2 = FileFormatDescriptor_AnnotationsEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry2.value !== undefined) {
            message.annotations[entry2.key] = entry2.value;
          }
          break;
        case 3:
          message.checksumType = reader.int32() as any;
          break;
        case 4:
          message.checksumNumBytes = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FileFormatDescriptor {
    return {
      version: isSet(object.version)
        ? FileFormatVersion.fromJSON(object.version)
        : undefined,
      annotations: isObject(object.annotations)
        ? Object.entries(object.annotations).reduce<{ [key: string]: string }>(
            (acc, [key, value]) => {
              acc[key] = String(value);
              return acc;
            },
            {}
          )
        : {},
      checksumType: isSet(object.checksumType)
        ? fileFormatDescriptor_CheckSumTypeFromJSON(object.checksumType)
        : 0,
      checksumNumBytes: isSet(object.checksumNumBytes)
        ? Number(object.checksumNumBytes)
        : 0,
    };
  },

  toJSON(message: FileFormatDescriptor): unknown {
    const obj: any = {};
    message.version !== undefined &&
      (obj.version = message.version
        ? FileFormatVersion.toJSON(message.version)
        : undefined);
    obj.annotations = {};
    if (message.annotations) {
      Object.entries(message.annotations).forEach(([k, v]) => {
        obj.annotations[k] = v;
      });
    }
    message.checksumType !== undefined &&
      (obj.checksumType = fileFormatDescriptor_CheckSumTypeToJSON(
        message.checksumType
      ));
    message.checksumNumBytes !== undefined &&
      (obj.checksumNumBytes = Math.round(message.checksumNumBytes));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FileFormatDescriptor>, I>>(
    object: I
  ): FileFormatDescriptor {
    const message = createBaseFileFormatDescriptor();
    message.version =
      object.version !== undefined && object.version !== null
        ? FileFormatVersion.fromPartial(object.version)
        : undefined;
    message.annotations = Object.entries(object.annotations ?? {}).reduce<{
      [key: string]: string;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    message.checksumType = object.checksumType ?? 0;
    message.checksumNumBytes = object.checksumNumBytes ?? 0;
    return message;
  },
};

function createBaseFileFormatDescriptor_AnnotationsEntry(): FileFormatDescriptor_AnnotationsEntry {
  return { key: "", value: "" };
}

export const FileFormatDescriptor_AnnotationsEntry = {
  encode(
    message: FileFormatDescriptor_AnnotationsEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): FileFormatDescriptor_AnnotationsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFileFormatDescriptor_AnnotationsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FileFormatDescriptor_AnnotationsEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? String(object.value) : "",
    };
  },

  toJSON(message: FileFormatDescriptor_AnnotationsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<FileFormatDescriptor_AnnotationsEntry>, I>
  >(object: I): FileFormatDescriptor_AnnotationsEntry {
    const message = createBaseFileFormatDescriptor_AnnotationsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseFileFormatVersion(): FileFormatVersion {
  return { majorVersion: 0, minorVersion: 0, patchLevel: 0 };
}

export const FileFormatVersion = {
  encode(
    message: FileFormatVersion,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.majorVersion !== 0) {
      writer.uint32(8).uint32(message.majorVersion);
    }
    if (message.minorVersion !== 0) {
      writer.uint32(16).uint32(message.minorVersion);
    }
    if (message.patchLevel !== 0) {
      writer.uint32(24).uint32(message.patchLevel);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FileFormatVersion {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFileFormatVersion();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.majorVersion = reader.uint32();
          break;
        case 2:
          message.minorVersion = reader.uint32();
          break;
        case 3:
          message.patchLevel = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FileFormatVersion {
    return {
      majorVersion: isSet(object.majorVersion)
        ? Number(object.majorVersion)
        : 0,
      minorVersion: isSet(object.minorVersion)
        ? Number(object.minorVersion)
        : 0,
      patchLevel: isSet(object.patchLevel) ? Number(object.patchLevel) : 0,
    };
  },

  toJSON(message: FileFormatVersion): unknown {
    const obj: any = {};
    message.majorVersion !== undefined &&
      (obj.majorVersion = Math.round(message.majorVersion));
    message.minorVersion !== undefined &&
      (obj.minorVersion = Math.round(message.minorVersion));
    message.patchLevel !== undefined &&
      (obj.patchLevel = Math.round(message.patchLevel));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FileFormatVersion>, I>>(
    object: I
  ): FileFormatVersion {
    const message = createBaseFileFormatVersion();
    message.majorVersion = object.majorVersion ?? 0;
    message.minorVersion = object.minorVersion ?? 0;
    message.patchLevel = object.patchLevel ?? 0;
    return message;
  },
};

function createBaseSeriesDescriptor(): SeriesDescriptor {
  return {
    seriesIndex: 0,
    seriesIdentifier: undefined,
    identifierHash: 0,
    messageType: undefined,
    podType: undefined,
    structType: undefined,
    annotations: {},
    additionalIndexNames: [],
    description: "",
  };
}

export const SeriesDescriptor = {
  encode(
    message: SeriesDescriptor,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.seriesIndex !== 0) {
      writer.uint32(8).uint32(message.seriesIndex);
    }
    if (message.seriesIdentifier !== undefined) {
      SeriesIdentifier.encode(
        message.seriesIdentifier,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.identifierHash !== 0) {
      writer.uint32(24).uint64(message.identifierHash);
    }
    if (message.messageType !== undefined) {
      MessageTypeDescriptor.encode(
        message.messageType,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.podType !== undefined) {
      PodTypeDescriptor.encode(
        message.podType,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.structType !== undefined) {
      StructTypeDescriptor.encode(
        message.structType,
        writer.uint32(50).fork()
      ).ldelim();
    }
    Object.entries(message.annotations).forEach(([key, value]) => {
      SeriesDescriptor_AnnotationsEntry.encode(
        { key: key as any, value },
        writer.uint32(58).fork()
      ).ldelim();
    });
    for (const v of message.additionalIndexNames) {
      writer.uint32(66).string(v!);
    }
    if (message.description !== "") {
      writer.uint32(74).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SeriesDescriptor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSeriesDescriptor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.seriesIndex = reader.uint32();
          break;
        case 2:
          message.seriesIdentifier = SeriesIdentifier.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.identifierHash = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.messageType = MessageTypeDescriptor.decode(
            reader,
            reader.uint32()
          );
          break;
        case 5:
          message.podType = PodTypeDescriptor.decode(reader, reader.uint32());
          break;
        case 6:
          message.structType = StructTypeDescriptor.decode(
            reader,
            reader.uint32()
          );
          break;
        case 7:
          const entry7 = SeriesDescriptor_AnnotationsEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry7.value !== undefined) {
            message.annotations[entry7.key] = entry7.value;
          }
          break;
        case 8:
          message.additionalIndexNames.push(reader.string());
          break;
        case 9:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SeriesDescriptor {
    return {
      seriesIndex: isSet(object.seriesIndex) ? Number(object.seriesIndex) : 0,
      seriesIdentifier: isSet(object.seriesIdentifier)
        ? SeriesIdentifier.fromJSON(object.seriesIdentifier)
        : undefined,
      identifierHash: isSet(object.identifierHash)
        ? Number(object.identifierHash)
        : 0,
      messageType: isSet(object.messageType)
        ? MessageTypeDescriptor.fromJSON(object.messageType)
        : undefined,
      podType: isSet(object.podType)
        ? PodTypeDescriptor.fromJSON(object.podType)
        : undefined,
      structType: isSet(object.structType)
        ? StructTypeDescriptor.fromJSON(object.structType)
        : undefined,
      annotations: isObject(object.annotations)
        ? Object.entries(object.annotations).reduce<{ [key: string]: string }>(
            (acc, [key, value]) => {
              acc[key] = String(value);
              return acc;
            },
            {}
          )
        : {},
      additionalIndexNames: Array.isArray(object?.additionalIndexNames)
        ? object.additionalIndexNames.map((e: any) => String(e))
        : [],
      description: isSet(object.description) ? String(object.description) : "",
    };
  },

  toJSON(message: SeriesDescriptor): unknown {
    const obj: any = {};
    message.seriesIndex !== undefined &&
      (obj.seriesIndex = Math.round(message.seriesIndex));
    message.seriesIdentifier !== undefined &&
      (obj.seriesIdentifier = message.seriesIdentifier
        ? SeriesIdentifier.toJSON(message.seriesIdentifier)
        : undefined);
    message.identifierHash !== undefined &&
      (obj.identifierHash = Math.round(message.identifierHash));
    message.messageType !== undefined &&
      (obj.messageType = message.messageType
        ? MessageTypeDescriptor.toJSON(message.messageType)
        : undefined);
    message.podType !== undefined &&
      (obj.podType = message.podType
        ? PodTypeDescriptor.toJSON(message.podType)
        : undefined);
    message.structType !== undefined &&
      (obj.structType = message.structType
        ? StructTypeDescriptor.toJSON(message.structType)
        : undefined);
    obj.annotations = {};
    if (message.annotations) {
      Object.entries(message.annotations).forEach(([k, v]) => {
        obj.annotations[k] = v;
      });
    }
    if (message.additionalIndexNames) {
      obj.additionalIndexNames = message.additionalIndexNames.map((e) => e);
    } else {
      obj.additionalIndexNames = [];
    }
    message.description !== undefined &&
      (obj.description = message.description);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SeriesDescriptor>, I>>(
    object: I
  ): SeriesDescriptor {
    const message = createBaseSeriesDescriptor();
    message.seriesIndex = object.seriesIndex ?? 0;
    message.seriesIdentifier =
      object.seriesIdentifier !== undefined && object.seriesIdentifier !== null
        ? SeriesIdentifier.fromPartial(object.seriesIdentifier)
        : undefined;
    message.identifierHash = object.identifierHash ?? 0;
    message.messageType =
      object.messageType !== undefined && object.messageType !== null
        ? MessageTypeDescriptor.fromPartial(object.messageType)
        : undefined;
    message.podType =
      object.podType !== undefined && object.podType !== null
        ? PodTypeDescriptor.fromPartial(object.podType)
        : undefined;
    message.structType =
      object.structType !== undefined && object.structType !== null
        ? StructTypeDescriptor.fromPartial(object.structType)
        : undefined;
    message.annotations = Object.entries(object.annotations ?? {}).reduce<{
      [key: string]: string;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    message.additionalIndexNames =
      object.additionalIndexNames?.map((e) => e) || [];
    message.description = object.description ?? "";
    return message;
  },
};

function createBaseSeriesDescriptor_AnnotationsEntry(): SeriesDescriptor_AnnotationsEntry {
  return { key: "", value: "" };
}

export const SeriesDescriptor_AnnotationsEntry = {
  encode(
    message: SeriesDescriptor_AnnotationsEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SeriesDescriptor_AnnotationsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSeriesDescriptor_AnnotationsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SeriesDescriptor_AnnotationsEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? String(object.value) : "",
    };
  },

  toJSON(message: SeriesDescriptor_AnnotationsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<SeriesDescriptor_AnnotationsEntry>, I>
  >(object: I): SeriesDescriptor_AnnotationsEntry {
    const message = createBaseSeriesDescriptor_AnnotationsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseMessageTypeDescriptor(): MessageTypeDescriptor {
  return { contentType: "", typeName: "", isMetadata: false };
}

export const MessageTypeDescriptor = {
  encode(
    message: MessageTypeDescriptor,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.contentType !== "") {
      writer.uint32(10).string(message.contentType);
    }
    if (message.typeName !== "") {
      writer.uint32(18).string(message.typeName);
    }
    if (message.isMetadata === true) {
      writer.uint32(24).bool(message.isMetadata);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MessageTypeDescriptor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageTypeDescriptor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contentType = reader.string();
          break;
        case 2:
          message.typeName = reader.string();
          break;
        case 3:
          message.isMetadata = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MessageTypeDescriptor {
    return {
      contentType: isSet(object.contentType) ? String(object.contentType) : "",
      typeName: isSet(object.typeName) ? String(object.typeName) : "",
      isMetadata: isSet(object.isMetadata) ? Boolean(object.isMetadata) : false,
    };
  },

  toJSON(message: MessageTypeDescriptor): unknown {
    const obj: any = {};
    message.contentType !== undefined &&
      (obj.contentType = message.contentType);
    message.typeName !== undefined && (obj.typeName = message.typeName);
    message.isMetadata !== undefined && (obj.isMetadata = message.isMetadata);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MessageTypeDescriptor>, I>>(
    object: I
  ): MessageTypeDescriptor {
    const message = createBaseMessageTypeDescriptor();
    message.contentType = object.contentType ?? "";
    message.typeName = object.typeName ?? "";
    message.isMetadata = object.isMetadata ?? false;
    return message;
  },
};

function createBasePodTypeDescriptor(): PodTypeDescriptor {
  return { podType: 0, dimension: [] };
}

export const PodTypeDescriptor = {
  encode(
    message: PodTypeDescriptor,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.podType !== 0) {
      writer.uint32(8).int32(message.podType);
    }
    writer.uint32(18).fork();
    for (const v of message.dimension) {
      writer.uint32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PodTypeDescriptor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePodTypeDescriptor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.podType = reader.int32() as any;
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.dimension.push(reader.uint32());
            }
          } else {
            message.dimension.push(reader.uint32());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PodTypeDescriptor {
    return {
      podType: isSet(object.podType) ? podTypeEnumFromJSON(object.podType) : 0,
      dimension: Array.isArray(object?.dimension)
        ? object.dimension.map((e: any) => Number(e))
        : [],
    };
  },

  toJSON(message: PodTypeDescriptor): unknown {
    const obj: any = {};
    message.podType !== undefined &&
      (obj.podType = podTypeEnumToJSON(message.podType));
    if (message.dimension) {
      obj.dimension = message.dimension.map((e) => Math.round(e));
    } else {
      obj.dimension = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PodTypeDescriptor>, I>>(
    object: I
  ): PodTypeDescriptor {
    const message = createBasePodTypeDescriptor();
    message.podType = object.podType ?? 0;
    message.dimension = object.dimension?.map((e) => e) || [];
    return message;
  },
};

function createBaseStructTypeDescriptor(): StructTypeDescriptor {
  return { keyToSeriesIdentifierHash: {} };
}

export const StructTypeDescriptor = {
  encode(
    message: StructTypeDescriptor,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    Object.entries(message.keyToSeriesIdentifierHash).forEach(
      ([key, value]) => {
        StructTypeDescriptor_KeyToSeriesIdentifierHashEntry.encode(
          { key: key as any, value },
          writer.uint32(10).fork()
        ).ldelim();
      }
    );
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StructTypeDescriptor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStructTypeDescriptor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 =
            StructTypeDescriptor_KeyToSeriesIdentifierHashEntry.decode(
              reader,
              reader.uint32()
            );
          if (entry1.value !== undefined) {
            message.keyToSeriesIdentifierHash[entry1.key] = entry1.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StructTypeDescriptor {
    return {
      keyToSeriesIdentifierHash: isObject(object.keyToSeriesIdentifierHash)
        ? Object.entries(object.keyToSeriesIdentifierHash).reduce<{
            [key: string]: number;
          }>((acc, [key, value]) => {
            acc[key] = Number(value);
            return acc;
          }, {})
        : {},
    };
  },

  toJSON(message: StructTypeDescriptor): unknown {
    const obj: any = {};
    obj.keyToSeriesIdentifierHash = {};
    if (message.keyToSeriesIdentifierHash) {
      Object.entries(message.keyToSeriesIdentifierHash).forEach(([k, v]) => {
        obj.keyToSeriesIdentifierHash[k] = Math.round(v);
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StructTypeDescriptor>, I>>(
    object: I
  ): StructTypeDescriptor {
    const message = createBaseStructTypeDescriptor();
    message.keyToSeriesIdentifierHash = Object.entries(
      object.keyToSeriesIdentifierHash ?? {}
    ).reduce<{ [key: string]: number }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = Number(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseStructTypeDescriptor_KeyToSeriesIdentifierHashEntry(): StructTypeDescriptor_KeyToSeriesIdentifierHashEntry {
  return { key: "", value: 0 };
}

export const StructTypeDescriptor_KeyToSeriesIdentifierHashEntry = {
  encode(
    message: StructTypeDescriptor_KeyToSeriesIdentifierHashEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(16).uint64(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StructTypeDescriptor_KeyToSeriesIdentifierHashEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message =
      createBaseStructTypeDescriptor_KeyToSeriesIdentifierHashEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StructTypeDescriptor_KeyToSeriesIdentifierHashEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? Number(object.value) : 0,
    };
  },

  toJSON(
    message: StructTypeDescriptor_KeyToSeriesIdentifierHashEntry
  ): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = Math.round(message.value));
    return obj;
  },

  fromPartial<
    I extends Exact<
      DeepPartial<StructTypeDescriptor_KeyToSeriesIdentifierHashEntry>,
      I
    >
  >(object: I): StructTypeDescriptor_KeyToSeriesIdentifierHashEntry {
    const message =
      createBaseStructTypeDescriptor_KeyToSeriesIdentifierHashEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseFileIndex(): FileIndex {
  return {
    seriesIdentifiers: [],
    seriesBlockIndexOffsets: [],
    seriesIdentifierHashes: [],
  };
}

export const FileIndex = {
  encode(
    message: FileIndex,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.seriesIdentifiers) {
      SeriesIdentifier.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(18).fork();
    for (const v of message.seriesBlockIndexOffsets) {
      writer.uint64(v);
    }
    writer.ldelim();
    writer.uint32(26).fork();
    for (const v of message.seriesIdentifierHashes) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FileIndex {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFileIndex();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.seriesIdentifiers.push(
            SeriesIdentifier.decode(reader, reader.uint32())
          );
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.seriesBlockIndexOffsets.push(
                longToNumber(reader.uint64() as Long)
              );
            }
          } else {
            message.seriesBlockIndexOffsets.push(
              longToNumber(reader.uint64() as Long)
            );
          }
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.seriesIdentifierHashes.push(
                longToNumber(reader.uint64() as Long)
              );
            }
          } else {
            message.seriesIdentifierHashes.push(
              longToNumber(reader.uint64() as Long)
            );
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FileIndex {
    return {
      seriesIdentifiers: Array.isArray(object?.seriesIdentifiers)
        ? object.seriesIdentifiers.map((e: any) => SeriesIdentifier.fromJSON(e))
        : [],
      seriesBlockIndexOffsets: Array.isArray(object?.seriesBlockIndexOffsets)
        ? object.seriesBlockIndexOffsets.map((e: any) => Number(e))
        : [],
      seriesIdentifierHashes: Array.isArray(object?.seriesIdentifierHashes)
        ? object.seriesIdentifierHashes.map((e: any) => Number(e))
        : [],
    };
  },

  toJSON(message: FileIndex): unknown {
    const obj: any = {};
    if (message.seriesIdentifiers) {
      obj.seriesIdentifiers = message.seriesIdentifiers.map((e) =>
        e ? SeriesIdentifier.toJSON(e) : undefined
      );
    } else {
      obj.seriesIdentifiers = [];
    }
    if (message.seriesBlockIndexOffsets) {
      obj.seriesBlockIndexOffsets = message.seriesBlockIndexOffsets.map((e) =>
        Math.round(e)
      );
    } else {
      obj.seriesBlockIndexOffsets = [];
    }
    if (message.seriesIdentifierHashes) {
      obj.seriesIdentifierHashes = message.seriesIdentifierHashes.map((e) =>
        Math.round(e)
      );
    } else {
      obj.seriesIdentifierHashes = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FileIndex>, I>>(
    object: I
  ): FileIndex {
    const message = createBaseFileIndex();
    message.seriesIdentifiers =
      object.seriesIdentifiers?.map((e) => SeriesIdentifier.fromPartial(e)) ||
      [];
    message.seriesBlockIndexOffsets =
      object.seriesBlockIndexOffsets?.map((e) => e) || [];
    message.seriesIdentifierHashes =
      object.seriesIdentifierHashes?.map((e) => e) || [];
    return message;
  },
};

function createBaseSeriesBlockIndex(): SeriesBlockIndex {
  return {
    seriesIndex: 0,
    descriptorFileOffset: 0,
    blockEntries: [],
    totalBytes: 0,
  };
}

export const SeriesBlockIndex = {
  encode(
    message: SeriesBlockIndex,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.seriesIndex !== 0) {
      writer.uint32(8).uint32(message.seriesIndex);
    }
    if (message.descriptorFileOffset !== 0) {
      writer.uint32(16).uint64(message.descriptorFileOffset);
    }
    for (const v of message.blockEntries) {
      SeriesBlockIndex_BlockEntry.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.totalBytes !== 0) {
      writer.uint32(32).uint64(message.totalBytes);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SeriesBlockIndex {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSeriesBlockIndex();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.seriesIndex = reader.uint32();
          break;
        case 2:
          message.descriptorFileOffset = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.blockEntries.push(
            SeriesBlockIndex_BlockEntry.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.totalBytes = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SeriesBlockIndex {
    return {
      seriesIndex: isSet(object.seriesIndex) ? Number(object.seriesIndex) : 0,
      descriptorFileOffset: isSet(object.descriptorFileOffset)
        ? Number(object.descriptorFileOffset)
        : 0,
      blockEntries: Array.isArray(object?.blockEntries)
        ? object.blockEntries.map((e: any) =>
            SeriesBlockIndex_BlockEntry.fromJSON(e)
          )
        : [],
      totalBytes: isSet(object.totalBytes) ? Number(object.totalBytes) : 0,
    };
  },

  toJSON(message: SeriesBlockIndex): unknown {
    const obj: any = {};
    message.seriesIndex !== undefined &&
      (obj.seriesIndex = Math.round(message.seriesIndex));
    message.descriptorFileOffset !== undefined &&
      (obj.descriptorFileOffset = Math.round(message.descriptorFileOffset));
    if (message.blockEntries) {
      obj.blockEntries = message.blockEntries.map((e) =>
        e ? SeriesBlockIndex_BlockEntry.toJSON(e) : undefined
      );
    } else {
      obj.blockEntries = [];
    }
    message.totalBytes !== undefined &&
      (obj.totalBytes = Math.round(message.totalBytes));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SeriesBlockIndex>, I>>(
    object: I
  ): SeriesBlockIndex {
    const message = createBaseSeriesBlockIndex();
    message.seriesIndex = object.seriesIndex ?? 0;
    message.descriptorFileOffset = object.descriptorFileOffset ?? 0;
    message.blockEntries =
      object.blockEntries?.map((e) =>
        SeriesBlockIndex_BlockEntry.fromPartial(e)
      ) || [];
    message.totalBytes = object.totalBytes ?? 0;
    return message;
  },
};

function createBaseSeriesBlockIndex_BlockEntry(): SeriesBlockIndex_BlockEntry {
  return { timestamp: undefined, fileOffset: 0, additionalIndexes: [] };
}

export const SeriesBlockIndex_BlockEntry = {
  encode(
    message: SeriesBlockIndex_BlockEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.timestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestamp),
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.fileOffset !== 0) {
      writer.uint32(16).uint64(message.fileOffset);
    }
    writer.uint32(26).fork();
    for (const v of message.additionalIndexes) {
      writer.int64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SeriesBlockIndex_BlockEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSeriesBlockIndex_BlockEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.fileOffset = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.additionalIndexes.push(
                longToNumber(reader.int64() as Long)
              );
            }
          } else {
            message.additionalIndexes.push(
              longToNumber(reader.int64() as Long)
            );
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SeriesBlockIndex_BlockEntry {
    return {
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
      fileOffset: isSet(object.fileOffset) ? Number(object.fileOffset) : 0,
      additionalIndexes: Array.isArray(object?.additionalIndexes)
        ? object.additionalIndexes.map((e: any) => Number(e))
        : [],
    };
  },

  toJSON(message: SeriesBlockIndex_BlockEntry): unknown {
    const obj: any = {};
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp.toISOString());
    message.fileOffset !== undefined &&
      (obj.fileOffset = Math.round(message.fileOffset));
    if (message.additionalIndexes) {
      obj.additionalIndexes = message.additionalIndexes.map((e) =>
        Math.round(e)
      );
    } else {
      obj.additionalIndexes = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SeriesBlockIndex_BlockEntry>, I>>(
    object: I
  ): SeriesBlockIndex_BlockEntry {
    const message = createBaseSeriesBlockIndex_BlockEntry();
    message.timestamp = object.timestamp ?? undefined;
    message.fileOffset = object.fileOffset ?? 0;
    message.additionalIndexes = object.additionalIndexes?.map((e) => e) || [];
    return message;
  },
};

function createBaseSeriesIdentifier(): SeriesIdentifier {
  return { seriesType: "", spec: {} };
}

export const SeriesIdentifier = {
  encode(
    message: SeriesIdentifier,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.seriesType !== "") {
      writer.uint32(10).string(message.seriesType);
    }
    Object.entries(message.spec).forEach(([key, value]) => {
      SeriesIdentifier_SpecEntry.encode(
        { key: key as any, value },
        writer.uint32(18).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SeriesIdentifier {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSeriesIdentifier();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.seriesType = reader.string();
          break;
        case 2:
          const entry2 = SeriesIdentifier_SpecEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry2.value !== undefined) {
            message.spec[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SeriesIdentifier {
    return {
      seriesType: isSet(object.seriesType) ? String(object.seriesType) : "",
      spec: isObject(object.spec)
        ? Object.entries(object.spec).reduce<{ [key: string]: string }>(
            (acc, [key, value]) => {
              acc[key] = String(value);
              return acc;
            },
            {}
          )
        : {},
    };
  },

  toJSON(message: SeriesIdentifier): unknown {
    const obj: any = {};
    message.seriesType !== undefined && (obj.seriesType = message.seriesType);
    obj.spec = {};
    if (message.spec) {
      Object.entries(message.spec).forEach(([k, v]) => {
        obj.spec[k] = v;
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SeriesIdentifier>, I>>(
    object: I
  ): SeriesIdentifier {
    const message = createBaseSeriesIdentifier();
    message.seriesType = object.seriesType ?? "";
    message.spec = Object.entries(object.spec ?? {}).reduce<{
      [key: string]: string;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseSeriesIdentifier_SpecEntry(): SeriesIdentifier_SpecEntry {
  return { key: "", value: "" };
}

export const SeriesIdentifier_SpecEntry = {
  encode(
    message: SeriesIdentifier_SpecEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SeriesIdentifier_SpecEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSeriesIdentifier_SpecEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SeriesIdentifier_SpecEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? String(object.value) : "",
    };
  },

  toJSON(message: SeriesIdentifier_SpecEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SeriesIdentifier_SpecEntry>, I>>(
    object: I
  ): SeriesIdentifier_SpecEntry {
    const message = createBaseSeriesIdentifier_SpecEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
