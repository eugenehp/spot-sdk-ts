/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp";
import Long from "long";
import { RequestHeader, ResponseHeader } from "./header";
import { Parameter } from "./parameter";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

export interface RecordTextMessagesRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** The text messages to be logged. */
  textMessages: TextMessage[];
}

export interface RecordOperatorCommentsRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** The operator comments to be logged. */
  operatorComments: OperatorComment[];
}

export interface RecordDataBlobsRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** The data blobs to be logged. */
  blobData: DataBlob[];
  /**
   * When set, the data blob is committed to the log synchronously. The RPC does not return until
   * the data is written.
   */
  sync: boolean;
}

export interface RecordSignalTicksRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** The signals data to be logged. */
  tickData: SignalTick[];
}

export interface RecordEventsRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** The events to be logged. */
  events: Event[];
}

/**
 * A text message to add to the log.
 * These could be internal text-log messages from a client for use in debugging, for example.
 */
export interface TextMessage {
  /** String annotation message. */
  message: string;
  /**
   * The timestamp of the annotation.  This must be in robot time.
   * If this is not specified, this will default to the time the server received the message.
   */
  timestamp: Date | undefined;
  /**
   * The client name.
   * This may be used to segregate data for the same variables to different parts of the buffer.
   */
  source: string;
  /** The relative importance of the message. */
  level: TextMessage_Level;
  /** Optional tag to identify from what code/module this message originated from. */
  tag: string;
  /** Optional source file name originating the log message. */
  filename: string;
  /** Optional source file line number originating the log message. */
  lineNumber: number;
}

export enum TextMessage_Level {
  /** LEVEL_UNKNOWN - Invalid, do not use. */
  LEVEL_UNKNOWN = 0,
  /** LEVEL_DEBUG - Events likely of interest only in a debugging context. */
  LEVEL_DEBUG = 1,
  /** LEVEL_INFO - Informational message during normal operation. */
  LEVEL_INFO = 2,
  /** LEVEL_WARN - Information about an unexpected but recoverable condition. */
  LEVEL_WARN = 3,
  /** LEVEL_ERROR - Information about an operation which did not succeed. */
  LEVEL_ERROR = 4,
  UNRECOGNIZED = -1,
}

export function textMessage_LevelFromJSON(object: any): TextMessage_Level {
  switch (object) {
    case 0:
    case "LEVEL_UNKNOWN":
      return TextMessage_Level.LEVEL_UNKNOWN;
    case 1:
    case "LEVEL_DEBUG":
      return TextMessage_Level.LEVEL_DEBUG;
    case 2:
    case "LEVEL_INFO":
      return TextMessage_Level.LEVEL_INFO;
    case 3:
    case "LEVEL_WARN":
      return TextMessage_Level.LEVEL_WARN;
    case 4:
    case "LEVEL_ERROR":
      return TextMessage_Level.LEVEL_ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TextMessage_Level.UNRECOGNIZED;
  }
}

export function textMessage_LevelToJSON(object: TextMessage_Level): string {
  switch (object) {
    case TextMessage_Level.LEVEL_UNKNOWN:
      return "LEVEL_UNKNOWN";
    case TextMessage_Level.LEVEL_DEBUG:
      return "LEVEL_DEBUG";
    case TextMessage_Level.LEVEL_INFO:
      return "LEVEL_INFO";
    case TextMessage_Level.LEVEL_WARN:
      return "LEVEL_WARN";
    case TextMessage_Level.LEVEL_ERROR:
      return "LEVEL_ERROR";
    case TextMessage_Level.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * An operator comment to be added to the log.
 * These are notes especially intended to mark when logs should be preserved and reviewed
 *  to ensure that robot hardware and/or software is working as intended.
 */
export interface OperatorComment {
  /** String annotation message to add to the log. */
  message: string;
  /**
   * The timestamp of the annotation.  This must be in robot time.
   * If this is not specified, this will default to the time the server received the message.
   */
  timestamp: Date | undefined;
}

/** Message-style data to add to the log. */
export interface DataBlob {
  /** Timestamp of data in robot clock time.  This is required. */
  timestamp: Date | undefined;
  /**
   * A general label for this blob.
   * This is distinct from type_id, which identifies how the blob is to be parsed.
   * In practice, this is often the same as the type_id.
   */
  channel: string;
  /**
   * A description of the data's content and its encoding.  This is required.
   * This should be sufficient for deciding how to deserialize the data.
   * For example, this could be the full name of a protobuf message type.
   */
  typeId: string;
  /**
   * Raw data.
   * For example, jpeg data or a serialized protobuf.
   */
  data: Uint8Array;
}

/** A description of a set of signals-style variables to log together as timestamped samples. */
export interface SignalSchema {
  /** A SignalTick using this schema contains the values of this ordered list of variables. */
  vars: SignalSchema_Variable[];
  /** The name of the schema. */
  schemaName: string;
}

/** A variable of signals-style data, which will be sampled in time. */
export interface SignalSchema_Variable {
  /** The name of the variable. */
  name: string;
  /** The type of the data. */
  type: SignalSchema_Variable_Type;
  /**
   * Zero or one variable in 'vars' may be specified as a time variable.
   * A time variable must have type TYPE_FLOAT64.
   */
  isTime: boolean;
}

export enum SignalSchema_Variable_Type {
  TYPE_UNKNOWN = 0,
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

export function signalSchema_Variable_TypeFromJSON(
  object: any
): SignalSchema_Variable_Type {
  switch (object) {
    case 0:
    case "TYPE_UNKNOWN":
      return SignalSchema_Variable_Type.TYPE_UNKNOWN;
    case 1:
    case "TYPE_INT8":
      return SignalSchema_Variable_Type.TYPE_INT8;
    case 2:
    case "TYPE_INT16":
      return SignalSchema_Variable_Type.TYPE_INT16;
    case 3:
    case "TYPE_INT32":
      return SignalSchema_Variable_Type.TYPE_INT32;
    case 4:
    case "TYPE_INT64":
      return SignalSchema_Variable_Type.TYPE_INT64;
    case 5:
    case "TYPE_UINT8":
      return SignalSchema_Variable_Type.TYPE_UINT8;
    case 6:
    case "TYPE_UINT16":
      return SignalSchema_Variable_Type.TYPE_UINT16;
    case 7:
    case "TYPE_UINT32":
      return SignalSchema_Variable_Type.TYPE_UINT32;
    case 8:
    case "TYPE_UINT64":
      return SignalSchema_Variable_Type.TYPE_UINT64;
    case 9:
    case "TYPE_FLOAT32":
      return SignalSchema_Variable_Type.TYPE_FLOAT32;
    case 10:
    case "TYPE_FLOAT64":
      return SignalSchema_Variable_Type.TYPE_FLOAT64;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SignalSchema_Variable_Type.UNRECOGNIZED;
  }
}

export function signalSchema_Variable_TypeToJSON(
  object: SignalSchema_Variable_Type
): string {
  switch (object) {
    case SignalSchema_Variable_Type.TYPE_UNKNOWN:
      return "TYPE_UNKNOWN";
    case SignalSchema_Variable_Type.TYPE_INT8:
      return "TYPE_INT8";
    case SignalSchema_Variable_Type.TYPE_INT16:
      return "TYPE_INT16";
    case SignalSchema_Variable_Type.TYPE_INT32:
      return "TYPE_INT32";
    case SignalSchema_Variable_Type.TYPE_INT64:
      return "TYPE_INT64";
    case SignalSchema_Variable_Type.TYPE_UINT8:
      return "TYPE_UINT8";
    case SignalSchema_Variable_Type.TYPE_UINT16:
      return "TYPE_UINT16";
    case SignalSchema_Variable_Type.TYPE_UINT32:
      return "TYPE_UINT32";
    case SignalSchema_Variable_Type.TYPE_UINT64:
      return "TYPE_UINT64";
    case SignalSchema_Variable_Type.TYPE_FLOAT32:
      return "TYPE_FLOAT32";
    case SignalSchema_Variable_Type.TYPE_FLOAT64:
      return "TYPE_FLOAT64";
    case SignalSchema_Variable_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface SignalSchemaId {
  /** {schema, id} pair */
  schemaId: number;
  schema: SignalSchema | undefined;
}

/** A timestamped set of signals variable values. */
export interface SignalTick {
  /**
   * Successive ticks should have successive sequence_id's.
   * The robot uses this to determine if a tick was somehow lost.
   */
  sequenceId: number;
  /** Timestamp at which the variable values were sampled. */
  timestamp: Date | undefined;
  /**
   * The client name.
   * This may be used to segregate data for the same variables to different parts of the buffer.
   */
  source: string;
  /**
   * This specifies the SignalSchema to be used in interpreting the |data| field.
   * This value was returned by the server when the schema was registered.
   */
  schemaId: number;
  /** Format describing how the data bytes array is encoded. */
  encoding: SignalTick_Encoding;
  /** The encoded data representing a tick of multiple values of signal-styles data. */
  data: Uint8Array;
}

export enum SignalTick_Encoding {
  ENCODING_UNKNOWN = 0,
  /**
   * ENCODING_RAW - Bytes array is a concatination of little-endian machine representations of
   *  the variables from the SignalSchema, in order listed in that schema.
   */
  ENCODING_RAW = 1,
  UNRECOGNIZED = -1,
}

export function signalTick_EncodingFromJSON(object: any): SignalTick_Encoding {
  switch (object) {
    case 0:
    case "ENCODING_UNKNOWN":
      return SignalTick_Encoding.ENCODING_UNKNOWN;
    case 1:
    case "ENCODING_RAW":
      return SignalTick_Encoding.ENCODING_RAW;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SignalTick_Encoding.UNRECOGNIZED;
  }
}

export function signalTick_EncodingToJSON(object: SignalTick_Encoding): string {
  switch (object) {
    case SignalTick_Encoding.ENCODING_UNKNOWN:
      return "ENCODING_UNKNOWN";
    case SignalTick_Encoding.ENCODING_RAW:
      return "ENCODING_RAW";
    case SignalTick_Encoding.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** This message contains event data for logging to the public timeline. */
export interface Event {
  /** Type of event, typically prefixed with a project or organization, e.g. "bosdyn:startup" */
  type: string;
  /**
   * Event description.
   * This is optional.
   */
  description: string;
  /**
   * A description of the source of this event. May be the client name.
   * - Not required to be unique.
   * - Disambiguates the source of similar event types.
   */
  source: string;
  /**
   * Unique identifier to link start and end messages for events with a duration.
   * - Long running events may have separate messages at the start and end, in case the message
   *    for the end of the event is lost.
   * - For events without a separate start and end message (in which case both start_time and
   *    end time should be specified), the 'id' field should not be set.
   * - This id is not tracked internally by the service. It is only used to consume the event
   *    timeline.
   * - To be effective, the id value should be generated randomly by the client.
   */
  id: string;
  /**
   * Start and end times for the event:
   * - Some events are instantaneous. For these, set start_timestamp and end_timestamp to the
   *    same value and send a single message (without an id).
   * - Some events take time. At the onset, send a message with a unique id, the start time, and
   *    type. The end message should include all data from the start message, any
   *    additional data, and an end time.  If you have the end message, you should not need
   *    the start message since it is a strict subset.
   */
  startTime: Date | undefined;
  endTime: Date | undefined;
  /** The relative importance of the event. */
  level: Event_Level;
  /** Optional set of event parameters. */
  parameters: Parameter[];
  /** Optionally request that the robot try to preserve data near this time for a service log. */
  logPreserveHint: Event_LogPreserveHint;
}

/**
 * Level, or similarly "visibility," "importance," or "weight" of event.
 *  - Higher level events will increase the visibility on the event timeline, relative to other
 *    events.
 *  - In general, higher level events should be more consequential with respect to the robot
 *    operation on a per-occurence basis.
 *  - Lower level events should be less consequential on a per occurence basis.
 *  - Non-critical events may be one of LOW, MEDIUM, or HIGH.  UNSET is logically equivalent to
 *    LOW level.
 *  - Critical events may be either mission or system critical.
 *  - System-critical is quasi-reserved for internal robot use, and is used to identify events
 *    that directly affect robot status or capability, such as the onset of a critical fault or
 *    start of an enabling capability.
 *  - Mission-critical is quasi-reserved client use, and is intended for events that directly
 *    affect the ability of the robot to "do what the user wants," such as the onset of a
 *    service fault or start of an enabling capability.
 */
export enum Event_Level {
  LEVEL_UNSET = 0,
  /** LEVEL_LOW - Non-critical events */
  LEVEL_LOW = 1,
  LEVEL_MEDIUM = 2,
  LEVEL_HIGH = 3,
  /** LEVEL_MISSION_CRITICAL - Critical events */
  LEVEL_MISSION_CRITICAL = 4,
  LEVEL_SYSTEM_CRITICAL = 5,
  UNRECOGNIZED = -1,
}

export function event_LevelFromJSON(object: any): Event_Level {
  switch (object) {
    case 0:
    case "LEVEL_UNSET":
      return Event_Level.LEVEL_UNSET;
    case 1:
    case "LEVEL_LOW":
      return Event_Level.LEVEL_LOW;
    case 2:
    case "LEVEL_MEDIUM":
      return Event_Level.LEVEL_MEDIUM;
    case 3:
    case "LEVEL_HIGH":
      return Event_Level.LEVEL_HIGH;
    case 4:
    case "LEVEL_MISSION_CRITICAL":
      return Event_Level.LEVEL_MISSION_CRITICAL;
    case 5:
    case "LEVEL_SYSTEM_CRITICAL":
      return Event_Level.LEVEL_SYSTEM_CRITICAL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Event_Level.UNRECOGNIZED;
  }
}

export function event_LevelToJSON(object: Event_Level): string {
  switch (object) {
    case Event_Level.LEVEL_UNSET:
      return "LEVEL_UNSET";
    case Event_Level.LEVEL_LOW:
      return "LEVEL_LOW";
    case Event_Level.LEVEL_MEDIUM:
      return "LEVEL_MEDIUM";
    case Event_Level.LEVEL_HIGH:
      return "LEVEL_HIGH";
    case Event_Level.LEVEL_MISSION_CRITICAL:
      return "LEVEL_MISSION_CRITICAL";
    case Event_Level.LEVEL_SYSTEM_CRITICAL:
      return "LEVEL_SYSTEM_CRITICAL";
    case Event_Level.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * LogPreserveHint may encode a hint to the robot's logging system for whether to preserve
 * internal log data near the time of this event.  This could be useful in saving data
 * to be used in a service log to send to Boston Dynamics.
 */
export enum Event_LogPreserveHint {
  /** LOG_PRESERVE_HINT_UNSET - If this this is unset, it is equivalent to LOG_PRESERVE_HINT_NORMAL. */
  LOG_PRESERVE_HINT_UNSET = 0,
  /**
   * LOG_PRESERVE_HINT_NORMAL - Do not change the robot's default log data preservation behavior in response to this
   * event.
   */
  LOG_PRESERVE_HINT_NORMAL = 1,
  /**
   * LOG_PRESERVE_HINT_PRESERVE - Request that the robot try to preserve data near the time of this event.
   * Log space on the robot is limited, so this does not guarentee that the data will be
   * preserved.
   */
  LOG_PRESERVE_HINT_PRESERVE = 2,
  UNRECOGNIZED = -1,
}

export function event_LogPreserveHintFromJSON(
  object: any
): Event_LogPreserveHint {
  switch (object) {
    case 0:
    case "LOG_PRESERVE_HINT_UNSET":
      return Event_LogPreserveHint.LOG_PRESERVE_HINT_UNSET;
    case 1:
    case "LOG_PRESERVE_HINT_NORMAL":
      return Event_LogPreserveHint.LOG_PRESERVE_HINT_NORMAL;
    case 2:
    case "LOG_PRESERVE_HINT_PRESERVE":
      return Event_LogPreserveHint.LOG_PRESERVE_HINT_PRESERVE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Event_LogPreserveHint.UNRECOGNIZED;
  }
}

export function event_LogPreserveHintToJSON(
  object: Event_LogPreserveHint
): string {
  switch (object) {
    case Event_LogPreserveHint.LOG_PRESERVE_HINT_UNSET:
      return "LOG_PRESERVE_HINT_UNSET";
    case Event_LogPreserveHint.LOG_PRESERVE_HINT_NORMAL:
      return "LOG_PRESERVE_HINT_NORMAL";
    case Event_LogPreserveHint.LOG_PRESERVE_HINT_PRESERVE:
      return "LOG_PRESERVE_HINT_PRESERVE";
    case Event_LogPreserveHint.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface RecordTextMessagesResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Errors which occurred when logging text message data. */
  errors: RecordTextMessagesResponse_Error[];
}

/** Text message recording error. */
export interface RecordTextMessagesResponse_Error {
  /** The type of error: if it was caused by the client or the service. */
  type: RecordTextMessagesResponse_Error_Type;
  /** An error message. */
  message: string;
  /** The index to identify the data being stored. */
  index: number;
}

export enum RecordTextMessagesResponse_Error_Type {
  NONE = 0,
  CLIENT_ERROR = 1,
  SERVER_ERROR = 2,
  UNRECOGNIZED = -1,
}

export function recordTextMessagesResponse_Error_TypeFromJSON(
  object: any
): RecordTextMessagesResponse_Error_Type {
  switch (object) {
    case 0:
    case "NONE":
      return RecordTextMessagesResponse_Error_Type.NONE;
    case 1:
    case "CLIENT_ERROR":
      return RecordTextMessagesResponse_Error_Type.CLIENT_ERROR;
    case 2:
    case "SERVER_ERROR":
      return RecordTextMessagesResponse_Error_Type.SERVER_ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RecordTextMessagesResponse_Error_Type.UNRECOGNIZED;
  }
}

export function recordTextMessagesResponse_Error_TypeToJSON(
  object: RecordTextMessagesResponse_Error_Type
): string {
  switch (object) {
    case RecordTextMessagesResponse_Error_Type.NONE:
      return "NONE";
    case RecordTextMessagesResponse_Error_Type.CLIENT_ERROR:
      return "CLIENT_ERROR";
    case RecordTextMessagesResponse_Error_Type.SERVER_ERROR:
      return "SERVER_ERROR";
    case RecordTextMessagesResponse_Error_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface RecordOperatorCommentsResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Errors which occurred when logging operator comments. */
  errors: RecordOperatorCommentsResponse_Error[];
}

/** Operator comment recording error. */
export interface RecordOperatorCommentsResponse_Error {
  /** The type of error: if it was caused by the client or the service. */
  type: RecordOperatorCommentsResponse_Error_Type;
  /** An error message. */
  message: string;
  /** The index to identify the data being stored. */
  index: number;
}

export enum RecordOperatorCommentsResponse_Error_Type {
  NONE = 0,
  CLIENT_ERROR = 1,
  SERVER_ERROR = 2,
  UNRECOGNIZED = -1,
}

export function recordOperatorCommentsResponse_Error_TypeFromJSON(
  object: any
): RecordOperatorCommentsResponse_Error_Type {
  switch (object) {
    case 0:
    case "NONE":
      return RecordOperatorCommentsResponse_Error_Type.NONE;
    case 1:
    case "CLIENT_ERROR":
      return RecordOperatorCommentsResponse_Error_Type.CLIENT_ERROR;
    case 2:
    case "SERVER_ERROR":
      return RecordOperatorCommentsResponse_Error_Type.SERVER_ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RecordOperatorCommentsResponse_Error_Type.UNRECOGNIZED;
  }
}

export function recordOperatorCommentsResponse_Error_TypeToJSON(
  object: RecordOperatorCommentsResponse_Error_Type
): string {
  switch (object) {
    case RecordOperatorCommentsResponse_Error_Type.NONE:
      return "NONE";
    case RecordOperatorCommentsResponse_Error_Type.CLIENT_ERROR:
      return "CLIENT_ERROR";
    case RecordOperatorCommentsResponse_Error_Type.SERVER_ERROR:
      return "SERVER_ERROR";
    case RecordOperatorCommentsResponse_Error_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface RecordDataBlobsResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Errors which occurred when logging data blobs. */
  errors: RecordDataBlobsResponse_Error[];
}

/** DataBlob recording error. */
export interface RecordDataBlobsResponse_Error {
  /** The type of error: if it was caused by the client or the service. */
  type: RecordDataBlobsResponse_Error_Type;
  /** An error message. */
  message: string;
  /** The index to identify the data being stored. */
  index: number;
}

export enum RecordDataBlobsResponse_Error_Type {
  NONE = 0,
  CLIENT_ERROR = 1,
  SERVER_ERROR = 2,
  UNRECOGNIZED = -1,
}

export function recordDataBlobsResponse_Error_TypeFromJSON(
  object: any
): RecordDataBlobsResponse_Error_Type {
  switch (object) {
    case 0:
    case "NONE":
      return RecordDataBlobsResponse_Error_Type.NONE;
    case 1:
    case "CLIENT_ERROR":
      return RecordDataBlobsResponse_Error_Type.CLIENT_ERROR;
    case 2:
    case "SERVER_ERROR":
      return RecordDataBlobsResponse_Error_Type.SERVER_ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RecordDataBlobsResponse_Error_Type.UNRECOGNIZED;
  }
}

export function recordDataBlobsResponse_Error_TypeToJSON(
  object: RecordDataBlobsResponse_Error_Type
): string {
  switch (object) {
    case RecordDataBlobsResponse_Error_Type.NONE:
      return "NONE";
    case RecordDataBlobsResponse_Error_Type.CLIENT_ERROR:
      return "CLIENT_ERROR";
    case RecordDataBlobsResponse_Error_Type.SERVER_ERROR:
      return "SERVER_ERROR";
    case RecordDataBlobsResponse_Error_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface RecordSignalTicksResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Errors which occurred when logging signal ticks. */
  errors: RecordSignalTicksResponse_Error[];
}

/** Signal tick recording error. */
export interface RecordSignalTicksResponse_Error {
  /** The type of error: if it was caused by the client, the service, or something else. */
  type: RecordSignalTicksResponse_Error_Type;
  /** An error message. */
  message: string;
  /** The index to identify the data being stored. */
  index: number;
}

export enum RecordSignalTicksResponse_Error_Type {
  NONE = 0,
  CLIENT_ERROR = 1,
  SERVER_ERROR = 2,
  INVALID_SCHEMA_ID = 3,
  UNRECOGNIZED = -1,
}

export function recordSignalTicksResponse_Error_TypeFromJSON(
  object: any
): RecordSignalTicksResponse_Error_Type {
  switch (object) {
    case 0:
    case "NONE":
      return RecordSignalTicksResponse_Error_Type.NONE;
    case 1:
    case "CLIENT_ERROR":
      return RecordSignalTicksResponse_Error_Type.CLIENT_ERROR;
    case 2:
    case "SERVER_ERROR":
      return RecordSignalTicksResponse_Error_Type.SERVER_ERROR;
    case 3:
    case "INVALID_SCHEMA_ID":
      return RecordSignalTicksResponse_Error_Type.INVALID_SCHEMA_ID;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RecordSignalTicksResponse_Error_Type.UNRECOGNIZED;
  }
}

export function recordSignalTicksResponse_Error_TypeToJSON(
  object: RecordSignalTicksResponse_Error_Type
): string {
  switch (object) {
    case RecordSignalTicksResponse_Error_Type.NONE:
      return "NONE";
    case RecordSignalTicksResponse_Error_Type.CLIENT_ERROR:
      return "CLIENT_ERROR";
    case RecordSignalTicksResponse_Error_Type.SERVER_ERROR:
      return "SERVER_ERROR";
    case RecordSignalTicksResponse_Error_Type.INVALID_SCHEMA_ID:
      return "INVALID_SCHEMA_ID";
    case RecordSignalTicksResponse_Error_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface RecordEventsResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Errors which occurred when logging events. */
  errors: RecordEventsResponse_Error[];
}

/** Event recording error. */
export interface RecordEventsResponse_Error {
  /** The type of error: if it was caused by the client, the service, or something else. */
  type: RecordEventsResponse_Error_Type;
  /** An error message. */
  message: string;
  /** The index to identify the data being stored. */
  index: number;
}

export enum RecordEventsResponse_Error_Type {
  NONE = 0,
  CLIENT_ERROR = 1,
  SERVER_ERROR = 2,
  UNRECOGNIZED = -1,
}

export function recordEventsResponse_Error_TypeFromJSON(
  object: any
): RecordEventsResponse_Error_Type {
  switch (object) {
    case 0:
    case "NONE":
      return RecordEventsResponse_Error_Type.NONE;
    case 1:
    case "CLIENT_ERROR":
      return RecordEventsResponse_Error_Type.CLIENT_ERROR;
    case 2:
    case "SERVER_ERROR":
      return RecordEventsResponse_Error_Type.SERVER_ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RecordEventsResponse_Error_Type.UNRECOGNIZED;
  }
}

export function recordEventsResponse_Error_TypeToJSON(
  object: RecordEventsResponse_Error_Type
): string {
  switch (object) {
    case RecordEventsResponse_Error_Type.NONE:
      return "NONE";
    case RecordEventsResponse_Error_Type.CLIENT_ERROR:
      return "CLIENT_ERROR";
    case RecordEventsResponse_Error_Type.SERVER_ERROR:
      return "SERVER_ERROR";
    case RecordEventsResponse_Error_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface RegisterSignalSchemaRequest {
  /** Common request/response header. */
  header: RequestHeader | undefined;
  /** Defines a schema for interpreting SignalTick data containing packed signals-type data. */
  schema: SignalSchema | undefined;
}

export interface RegisterSignalSchemaResponse {
  /** Common request/response header. */
  header: ResponseHeader | undefined;
  /**
   * Server returns a unique ID based on the client ID and schema definition.
   * Always greater than zero.
   */
  schemaId: number;
}

function createBaseRecordTextMessagesRequest(): RecordTextMessagesRequest {
  return { header: undefined, textMessages: [] };
}

export const RecordTextMessagesRequest = {
  encode(
    message: RecordTextMessagesRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.textMessages) {
      TextMessage.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RecordTextMessagesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordTextMessagesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.textMessages.push(
            TextMessage.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordTextMessagesRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      textMessages: Array.isArray(object?.textMessages)
        ? object.textMessages.map((e: any) => TextMessage.fromJSON(e))
        : [],
    };
  },

  toJSON(message: RecordTextMessagesRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    if (message.textMessages) {
      obj.textMessages = message.textMessages.map((e) =>
        e ? TextMessage.toJSON(e) : undefined
      );
    } else {
      obj.textMessages = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordTextMessagesRequest>, I>>(
    object: I
  ): RecordTextMessagesRequest {
    const message = createBaseRecordTextMessagesRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.textMessages =
      object.textMessages?.map((e) => TextMessage.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRecordOperatorCommentsRequest(): RecordOperatorCommentsRequest {
  return { header: undefined, operatorComments: [] };
}

export const RecordOperatorCommentsRequest = {
  encode(
    message: RecordOperatorCommentsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.operatorComments) {
      OperatorComment.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RecordOperatorCommentsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordOperatorCommentsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.operatorComments.push(
            OperatorComment.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordOperatorCommentsRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      operatorComments: Array.isArray(object?.operatorComments)
        ? object.operatorComments.map((e: any) => OperatorComment.fromJSON(e))
        : [],
    };
  },

  toJSON(message: RecordOperatorCommentsRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    if (message.operatorComments) {
      obj.operatorComments = message.operatorComments.map((e) =>
        e ? OperatorComment.toJSON(e) : undefined
      );
    } else {
      obj.operatorComments = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordOperatorCommentsRequest>, I>>(
    object: I
  ): RecordOperatorCommentsRequest {
    const message = createBaseRecordOperatorCommentsRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.operatorComments =
      object.operatorComments?.map((e) => OperatorComment.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRecordDataBlobsRequest(): RecordDataBlobsRequest {
  return { header: undefined, blobData: [], sync: false };
}

export const RecordDataBlobsRequest = {
  encode(
    message: RecordDataBlobsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.blobData) {
      DataBlob.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.sync === true) {
      writer.uint32(24).bool(message.sync);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RecordDataBlobsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordDataBlobsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.blobData.push(DataBlob.decode(reader, reader.uint32()));
          break;
        case 3:
          message.sync = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordDataBlobsRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      blobData: Array.isArray(object?.blobData)
        ? object.blobData.map((e: any) => DataBlob.fromJSON(e))
        : [],
      sync: isSet(object.sync) ? Boolean(object.sync) : false,
    };
  },

  toJSON(message: RecordDataBlobsRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    if (message.blobData) {
      obj.blobData = message.blobData.map((e) =>
        e ? DataBlob.toJSON(e) : undefined
      );
    } else {
      obj.blobData = [];
    }
    message.sync !== undefined && (obj.sync = message.sync);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordDataBlobsRequest>, I>>(
    object: I
  ): RecordDataBlobsRequest {
    const message = createBaseRecordDataBlobsRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.blobData =
      object.blobData?.map((e) => DataBlob.fromPartial(e)) || [];
    message.sync = object.sync ?? false;
    return message;
  },
};

function createBaseRecordSignalTicksRequest(): RecordSignalTicksRequest {
  return { header: undefined, tickData: [] };
}

export const RecordSignalTicksRequest = {
  encode(
    message: RecordSignalTicksRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.tickData) {
      SignalTick.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RecordSignalTicksRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordSignalTicksRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.tickData.push(SignalTick.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordSignalTicksRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      tickData: Array.isArray(object?.tickData)
        ? object.tickData.map((e: any) => SignalTick.fromJSON(e))
        : [],
    };
  },

  toJSON(message: RecordSignalTicksRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    if (message.tickData) {
      obj.tickData = message.tickData.map((e) =>
        e ? SignalTick.toJSON(e) : undefined
      );
    } else {
      obj.tickData = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordSignalTicksRequest>, I>>(
    object: I
  ): RecordSignalTicksRequest {
    const message = createBaseRecordSignalTicksRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.tickData =
      object.tickData?.map((e) => SignalTick.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRecordEventsRequest(): RecordEventsRequest {
  return { header: undefined, events: [] };
}

export const RecordEventsRequest = {
  encode(
    message: RecordEventsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.events) {
      Event.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordEventsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordEventsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.events.push(Event.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordEventsRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      events: Array.isArray(object?.events)
        ? object.events.map((e: any) => Event.fromJSON(e))
        : [],
    };
  },

  toJSON(message: RecordEventsRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    if (message.events) {
      obj.events = message.events.map((e) => (e ? Event.toJSON(e) : undefined));
    } else {
      obj.events = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordEventsRequest>, I>>(
    object: I
  ): RecordEventsRequest {
    const message = createBaseRecordEventsRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.events = object.events?.map((e) => Event.fromPartial(e)) || [];
    return message;
  },
};

function createBaseTextMessage(): TextMessage {
  return {
    message: "",
    timestamp: undefined,
    source: "",
    level: 0,
    tag: "",
    filename: "",
    lineNumber: 0,
  };
}

export const TextMessage = {
  encode(
    message: TextMessage,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestamp),
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.source !== "") {
      writer.uint32(26).string(message.source);
    }
    if (message.level !== 0) {
      writer.uint32(32).int32(message.level);
    }
    if (message.tag !== "") {
      writer.uint32(42).string(message.tag);
    }
    if (message.filename !== "") {
      writer.uint32(50).string(message.filename);
    }
    if (message.lineNumber !== 0) {
      writer.uint32(56).int32(message.lineNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TextMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTextMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.message = reader.string();
          break;
        case 2:
          message.timestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.source = reader.string();
          break;
        case 4:
          message.level = reader.int32() as any;
          break;
        case 5:
          message.tag = reader.string();
          break;
        case 6:
          message.filename = reader.string();
          break;
        case 7:
          message.lineNumber = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TextMessage {
    return {
      message: isSet(object.message) ? String(object.message) : "",
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
      source: isSet(object.source) ? String(object.source) : "",
      level: isSet(object.level) ? textMessage_LevelFromJSON(object.level) : 0,
      tag: isSet(object.tag) ? String(object.tag) : "",
      filename: isSet(object.filename) ? String(object.filename) : "",
      lineNumber: isSet(object.lineNumber) ? Number(object.lineNumber) : 0,
    };
  },

  toJSON(message: TextMessage): unknown {
    const obj: any = {};
    message.message !== undefined && (obj.message = message.message);
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp.toISOString());
    message.source !== undefined && (obj.source = message.source);
    message.level !== undefined &&
      (obj.level = textMessage_LevelToJSON(message.level));
    message.tag !== undefined && (obj.tag = message.tag);
    message.filename !== undefined && (obj.filename = message.filename);
    message.lineNumber !== undefined &&
      (obj.lineNumber = Math.round(message.lineNumber));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TextMessage>, I>>(
    object: I
  ): TextMessage {
    const message = createBaseTextMessage();
    message.message = object.message ?? "";
    message.timestamp = object.timestamp ?? undefined;
    message.source = object.source ?? "";
    message.level = object.level ?? 0;
    message.tag = object.tag ?? "";
    message.filename = object.filename ?? "";
    message.lineNumber = object.lineNumber ?? 0;
    return message;
  },
};

function createBaseOperatorComment(): OperatorComment {
  return { message: "", timestamp: undefined };
}

export const OperatorComment = {
  encode(
    message: OperatorComment,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestamp),
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OperatorComment {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOperatorComment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.message = reader.string();
          break;
        case 2:
          message.timestamp = fromTimestamp(
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

  fromJSON(object: any): OperatorComment {
    return {
      message: isSet(object.message) ? String(object.message) : "",
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
    };
  },

  toJSON(message: OperatorComment): unknown {
    const obj: any = {};
    message.message !== undefined && (obj.message = message.message);
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<OperatorComment>, I>>(
    object: I
  ): OperatorComment {
    const message = createBaseOperatorComment();
    message.message = object.message ?? "";
    message.timestamp = object.timestamp ?? undefined;
    return message;
  },
};

function createBaseDataBlob(): DataBlob {
  return {
    timestamp: undefined,
    channel: "",
    typeId: "",
    data: new Uint8Array(),
  };
}

export const DataBlob = {
  encode(
    message: DataBlob,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.timestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestamp),
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.channel !== "") {
      writer.uint32(18).string(message.channel);
    }
    if (message.typeId !== "") {
      writer.uint32(26).string(message.typeId);
    }
    if (message.data.length !== 0) {
      writer.uint32(34).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DataBlob {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDataBlob();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.channel = reader.string();
          break;
        case 3:
          message.typeId = reader.string();
          break;
        case 4:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DataBlob {
    return {
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
      channel: isSet(object.channel) ? String(object.channel) : "",
      typeId: isSet(object.typeId) ? String(object.typeId) : "",
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
    };
  },

  toJSON(message: DataBlob): unknown {
    const obj: any = {};
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp.toISOString());
    message.channel !== undefined && (obj.channel = message.channel);
    message.typeId !== undefined && (obj.typeId = message.typeId);
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DataBlob>, I>>(object: I): DataBlob {
    const message = createBaseDataBlob();
    message.timestamp = object.timestamp ?? undefined;
    message.channel = object.channel ?? "";
    message.typeId = object.typeId ?? "";
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};

function createBaseSignalSchema(): SignalSchema {
  return { vars: [], schemaName: "" };
}

export const SignalSchema = {
  encode(
    message: SignalSchema,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.vars) {
      SignalSchema_Variable.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.schemaName !== "") {
      writer.uint32(18).string(message.schemaName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignalSchema {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignalSchema();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.vars.push(
            SignalSchema_Variable.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.schemaName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SignalSchema {
    return {
      vars: Array.isArray(object?.vars)
        ? object.vars.map((e: any) => SignalSchema_Variable.fromJSON(e))
        : [],
      schemaName: isSet(object.schemaName) ? String(object.schemaName) : "",
    };
  },

  toJSON(message: SignalSchema): unknown {
    const obj: any = {};
    if (message.vars) {
      obj.vars = message.vars.map((e) =>
        e ? SignalSchema_Variable.toJSON(e) : undefined
      );
    } else {
      obj.vars = [];
    }
    message.schemaName !== undefined && (obj.schemaName = message.schemaName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SignalSchema>, I>>(
    object: I
  ): SignalSchema {
    const message = createBaseSignalSchema();
    message.vars =
      object.vars?.map((e) => SignalSchema_Variable.fromPartial(e)) || [];
    message.schemaName = object.schemaName ?? "";
    return message;
  },
};

function createBaseSignalSchema_Variable(): SignalSchema_Variable {
  return { name: "", type: 0, isTime: false };
}

export const SignalSchema_Variable = {
  encode(
    message: SignalSchema_Variable,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    if (message.isTime === true) {
      writer.uint32(24).bool(message.isTime);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SignalSchema_Variable {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignalSchema_Variable();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.type = reader.int32() as any;
          break;
        case 3:
          message.isTime = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SignalSchema_Variable {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      type: isSet(object.type)
        ? signalSchema_Variable_TypeFromJSON(object.type)
        : 0,
      isTime: isSet(object.isTime) ? Boolean(object.isTime) : false,
    };
  },

  toJSON(message: SignalSchema_Variable): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.type !== undefined &&
      (obj.type = signalSchema_Variable_TypeToJSON(message.type));
    message.isTime !== undefined && (obj.isTime = message.isTime);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SignalSchema_Variable>, I>>(
    object: I
  ): SignalSchema_Variable {
    const message = createBaseSignalSchema_Variable();
    message.name = object.name ?? "";
    message.type = object.type ?? 0;
    message.isTime = object.isTime ?? false;
    return message;
  },
};

function createBaseSignalSchemaId(): SignalSchemaId {
  return { schemaId: 0, schema: undefined };
}

export const SignalSchemaId = {
  encode(
    message: SignalSchemaId,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.schemaId !== 0) {
      writer.uint32(8).uint64(message.schemaId);
    }
    if (message.schema !== undefined) {
      SignalSchema.encode(message.schema, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignalSchemaId {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignalSchemaId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.schemaId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.schema = SignalSchema.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SignalSchemaId {
    return {
      schemaId: isSet(object.schemaId) ? Number(object.schemaId) : 0,
      schema: isSet(object.schema)
        ? SignalSchema.fromJSON(object.schema)
        : undefined,
    };
  },

  toJSON(message: SignalSchemaId): unknown {
    const obj: any = {};
    message.schemaId !== undefined &&
      (obj.schemaId = Math.round(message.schemaId));
    message.schema !== undefined &&
      (obj.schema = message.schema
        ? SignalSchema.toJSON(message.schema)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SignalSchemaId>, I>>(
    object: I
  ): SignalSchemaId {
    const message = createBaseSignalSchemaId();
    message.schemaId = object.schemaId ?? 0;
    message.schema =
      object.schema !== undefined && object.schema !== null
        ? SignalSchema.fromPartial(object.schema)
        : undefined;
    return message;
  },
};

function createBaseSignalTick(): SignalTick {
  return {
    sequenceId: 0,
    timestamp: undefined,
    source: "",
    schemaId: 0,
    encoding: 0,
    data: new Uint8Array(),
  };
}

export const SignalTick = {
  encode(
    message: SignalTick,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sequenceId !== 0) {
      writer.uint32(8).int64(message.sequenceId);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestamp),
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.source !== "") {
      writer.uint32(26).string(message.source);
    }
    if (message.schemaId !== 0) {
      writer.uint32(32).uint64(message.schemaId);
    }
    if (message.encoding !== 0) {
      writer.uint32(40).int32(message.encoding);
    }
    if (message.data.length !== 0) {
      writer.uint32(50).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignalTick {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignalTick();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sequenceId = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.timestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.source = reader.string();
          break;
        case 4:
          message.schemaId = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.encoding = reader.int32() as any;
          break;
        case 6:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SignalTick {
    return {
      sequenceId: isSet(object.sequenceId) ? Number(object.sequenceId) : 0,
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
      source: isSet(object.source) ? String(object.source) : "",
      schemaId: isSet(object.schemaId) ? Number(object.schemaId) : 0,
      encoding: isSet(object.encoding)
        ? signalTick_EncodingFromJSON(object.encoding)
        : 0,
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
    };
  },

  toJSON(message: SignalTick): unknown {
    const obj: any = {};
    message.sequenceId !== undefined &&
      (obj.sequenceId = Math.round(message.sequenceId));
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp.toISOString());
    message.source !== undefined && (obj.source = message.source);
    message.schemaId !== undefined &&
      (obj.schemaId = Math.round(message.schemaId));
    message.encoding !== undefined &&
      (obj.encoding = signalTick_EncodingToJSON(message.encoding));
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SignalTick>, I>>(
    object: I
  ): SignalTick {
    const message = createBaseSignalTick();
    message.sequenceId = object.sequenceId ?? 0;
    message.timestamp = object.timestamp ?? undefined;
    message.source = object.source ?? "";
    message.schemaId = object.schemaId ?? 0;
    message.encoding = object.encoding ?? 0;
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};

function createBaseEvent(): Event {
  return {
    type: "",
    description: "",
    source: "",
    id: "",
    startTime: undefined,
    endTime: undefined,
    level: 0,
    parameters: [],
    logPreserveHint: 0,
  };
}

export const Event = {
  encode(message: Event, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== "") {
      writer.uint32(10).string(message.type);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.source !== "") {
      writer.uint32(26).string(message.source);
    }
    if (message.id !== "") {
      writer.uint32(34).string(message.id);
    }
    if (message.startTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.startTime),
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.endTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.endTime),
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.level !== 0) {
      writer.uint32(56).int32(message.level);
    }
    for (const v of message.parameters) {
      Parameter.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    if (message.logPreserveHint !== 0) {
      writer.uint32(72).int32(message.logPreserveHint);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Event {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.source = reader.string();
          break;
        case 4:
          message.id = reader.string();
          break;
        case 5:
          message.startTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 6:
          message.endTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 7:
          message.level = reader.int32() as any;
          break;
        case 8:
          message.parameters.push(Parameter.decode(reader, reader.uint32()));
          break;
        case 9:
          message.logPreserveHint = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Event {
    return {
      type: isSet(object.type) ? String(object.type) : "",
      description: isSet(object.description) ? String(object.description) : "",
      source: isSet(object.source) ? String(object.source) : "",
      id: isSet(object.id) ? String(object.id) : "",
      startTime: isSet(object.startTime)
        ? fromJsonTimestamp(object.startTime)
        : undefined,
      endTime: isSet(object.endTime)
        ? fromJsonTimestamp(object.endTime)
        : undefined,
      level: isSet(object.level) ? event_LevelFromJSON(object.level) : 0,
      parameters: Array.isArray(object?.parameters)
        ? object.parameters.map((e: any) => Parameter.fromJSON(e))
        : [],
      logPreserveHint: isSet(object.logPreserveHint)
        ? event_LogPreserveHintFromJSON(object.logPreserveHint)
        : 0,
    };
  },

  toJSON(message: Event): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = message.type);
    message.description !== undefined &&
      (obj.description = message.description);
    message.source !== undefined && (obj.source = message.source);
    message.id !== undefined && (obj.id = message.id);
    message.startTime !== undefined &&
      (obj.startTime = message.startTime.toISOString());
    message.endTime !== undefined &&
      (obj.endTime = message.endTime.toISOString());
    message.level !== undefined &&
      (obj.level = event_LevelToJSON(message.level));
    if (message.parameters) {
      obj.parameters = message.parameters.map((e) =>
        e ? Parameter.toJSON(e) : undefined
      );
    } else {
      obj.parameters = [];
    }
    message.logPreserveHint !== undefined &&
      (obj.logPreserveHint = event_LogPreserveHintToJSON(
        message.logPreserveHint
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Event>, I>>(object: I): Event {
    const message = createBaseEvent();
    message.type = object.type ?? "";
    message.description = object.description ?? "";
    message.source = object.source ?? "";
    message.id = object.id ?? "";
    message.startTime = object.startTime ?? undefined;
    message.endTime = object.endTime ?? undefined;
    message.level = object.level ?? 0;
    message.parameters =
      object.parameters?.map((e) => Parameter.fromPartial(e)) || [];
    message.logPreserveHint = object.logPreserveHint ?? 0;
    return message;
  },
};

function createBaseRecordTextMessagesResponse(): RecordTextMessagesResponse {
  return { header: undefined, errors: [] };
}

export const RecordTextMessagesResponse = {
  encode(
    message: RecordTextMessagesResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.errors) {
      RecordTextMessagesResponse_Error.encode(
        v!,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RecordTextMessagesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordTextMessagesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.errors.push(
            RecordTextMessagesResponse_Error.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordTextMessagesResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      errors: Array.isArray(object?.errors)
        ? object.errors.map((e: any) =>
            RecordTextMessagesResponse_Error.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: RecordTextMessagesResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.errors) {
      obj.errors = message.errors.map((e) =>
        e ? RecordTextMessagesResponse_Error.toJSON(e) : undefined
      );
    } else {
      obj.errors = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordTextMessagesResponse>, I>>(
    object: I
  ): RecordTextMessagesResponse {
    const message = createBaseRecordTextMessagesResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.errors =
      object.errors?.map((e) =>
        RecordTextMessagesResponse_Error.fromPartial(e)
      ) || [];
    return message;
  },
};

function createBaseRecordTextMessagesResponse_Error(): RecordTextMessagesResponse_Error {
  return { type: 0, message: "", index: 0 };
}

export const RecordTextMessagesResponse_Error = {
  encode(
    message: RecordTextMessagesResponse_Error,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.index !== 0) {
      writer.uint32(24).uint32(message.index);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RecordTextMessagesResponse_Error {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordTextMessagesResponse_Error();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.message = reader.string();
          break;
        case 3:
          message.index = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordTextMessagesResponse_Error {
    return {
      type: isSet(object.type)
        ? recordTextMessagesResponse_Error_TypeFromJSON(object.type)
        : 0,
      message: isSet(object.message) ? String(object.message) : "",
      index: isSet(object.index) ? Number(object.index) : 0,
    };
  },

  toJSON(message: RecordTextMessagesResponse_Error): unknown {
    const obj: any = {};
    message.type !== undefined &&
      (obj.type = recordTextMessagesResponse_Error_TypeToJSON(message.type));
    message.message !== undefined && (obj.message = message.message);
    message.index !== undefined && (obj.index = Math.round(message.index));
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<RecordTextMessagesResponse_Error>, I>
  >(object: I): RecordTextMessagesResponse_Error {
    const message = createBaseRecordTextMessagesResponse_Error();
    message.type = object.type ?? 0;
    message.message = object.message ?? "";
    message.index = object.index ?? 0;
    return message;
  },
};

function createBaseRecordOperatorCommentsResponse(): RecordOperatorCommentsResponse {
  return { header: undefined, errors: [] };
}

export const RecordOperatorCommentsResponse = {
  encode(
    message: RecordOperatorCommentsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.errors) {
      RecordOperatorCommentsResponse_Error.encode(
        v!,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RecordOperatorCommentsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordOperatorCommentsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.errors.push(
            RecordOperatorCommentsResponse_Error.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordOperatorCommentsResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      errors: Array.isArray(object?.errors)
        ? object.errors.map((e: any) =>
            RecordOperatorCommentsResponse_Error.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: RecordOperatorCommentsResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.errors) {
      obj.errors = message.errors.map((e) =>
        e ? RecordOperatorCommentsResponse_Error.toJSON(e) : undefined
      );
    } else {
      obj.errors = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordOperatorCommentsResponse>, I>>(
    object: I
  ): RecordOperatorCommentsResponse {
    const message = createBaseRecordOperatorCommentsResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.errors =
      object.errors?.map((e) =>
        RecordOperatorCommentsResponse_Error.fromPartial(e)
      ) || [];
    return message;
  },
};

function createBaseRecordOperatorCommentsResponse_Error(): RecordOperatorCommentsResponse_Error {
  return { type: 0, message: "", index: 0 };
}

export const RecordOperatorCommentsResponse_Error = {
  encode(
    message: RecordOperatorCommentsResponse_Error,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.index !== 0) {
      writer.uint32(24).uint32(message.index);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RecordOperatorCommentsResponse_Error {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordOperatorCommentsResponse_Error();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.message = reader.string();
          break;
        case 3:
          message.index = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordOperatorCommentsResponse_Error {
    return {
      type: isSet(object.type)
        ? recordOperatorCommentsResponse_Error_TypeFromJSON(object.type)
        : 0,
      message: isSet(object.message) ? String(object.message) : "",
      index: isSet(object.index) ? Number(object.index) : 0,
    };
  },

  toJSON(message: RecordOperatorCommentsResponse_Error): unknown {
    const obj: any = {};
    message.type !== undefined &&
      (obj.type = recordOperatorCommentsResponse_Error_TypeToJSON(
        message.type
      ));
    message.message !== undefined && (obj.message = message.message);
    message.index !== undefined && (obj.index = Math.round(message.index));
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<RecordOperatorCommentsResponse_Error>, I>
  >(object: I): RecordOperatorCommentsResponse_Error {
    const message = createBaseRecordOperatorCommentsResponse_Error();
    message.type = object.type ?? 0;
    message.message = object.message ?? "";
    message.index = object.index ?? 0;
    return message;
  },
};

function createBaseRecordDataBlobsResponse(): RecordDataBlobsResponse {
  return { header: undefined, errors: [] };
}

export const RecordDataBlobsResponse = {
  encode(
    message: RecordDataBlobsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.errors) {
      RecordDataBlobsResponse_Error.encode(
        v!,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RecordDataBlobsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordDataBlobsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.errors.push(
            RecordDataBlobsResponse_Error.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordDataBlobsResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      errors: Array.isArray(object?.errors)
        ? object.errors.map((e: any) =>
            RecordDataBlobsResponse_Error.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: RecordDataBlobsResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.errors) {
      obj.errors = message.errors.map((e) =>
        e ? RecordDataBlobsResponse_Error.toJSON(e) : undefined
      );
    } else {
      obj.errors = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordDataBlobsResponse>, I>>(
    object: I
  ): RecordDataBlobsResponse {
    const message = createBaseRecordDataBlobsResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.errors =
      object.errors?.map((e) => RecordDataBlobsResponse_Error.fromPartial(e)) ||
      [];
    return message;
  },
};

function createBaseRecordDataBlobsResponse_Error(): RecordDataBlobsResponse_Error {
  return { type: 0, message: "", index: 0 };
}

export const RecordDataBlobsResponse_Error = {
  encode(
    message: RecordDataBlobsResponse_Error,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.index !== 0) {
      writer.uint32(24).uint32(message.index);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RecordDataBlobsResponse_Error {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordDataBlobsResponse_Error();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.message = reader.string();
          break;
        case 3:
          message.index = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordDataBlobsResponse_Error {
    return {
      type: isSet(object.type)
        ? recordDataBlobsResponse_Error_TypeFromJSON(object.type)
        : 0,
      message: isSet(object.message) ? String(object.message) : "",
      index: isSet(object.index) ? Number(object.index) : 0,
    };
  },

  toJSON(message: RecordDataBlobsResponse_Error): unknown {
    const obj: any = {};
    message.type !== undefined &&
      (obj.type = recordDataBlobsResponse_Error_TypeToJSON(message.type));
    message.message !== undefined && (obj.message = message.message);
    message.index !== undefined && (obj.index = Math.round(message.index));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordDataBlobsResponse_Error>, I>>(
    object: I
  ): RecordDataBlobsResponse_Error {
    const message = createBaseRecordDataBlobsResponse_Error();
    message.type = object.type ?? 0;
    message.message = object.message ?? "";
    message.index = object.index ?? 0;
    return message;
  },
};

function createBaseRecordSignalTicksResponse(): RecordSignalTicksResponse {
  return { header: undefined, errors: [] };
}

export const RecordSignalTicksResponse = {
  encode(
    message: RecordSignalTicksResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.errors) {
      RecordSignalTicksResponse_Error.encode(
        v!,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RecordSignalTicksResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordSignalTicksResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.errors.push(
            RecordSignalTicksResponse_Error.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordSignalTicksResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      errors: Array.isArray(object?.errors)
        ? object.errors.map((e: any) =>
            RecordSignalTicksResponse_Error.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: RecordSignalTicksResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.errors) {
      obj.errors = message.errors.map((e) =>
        e ? RecordSignalTicksResponse_Error.toJSON(e) : undefined
      );
    } else {
      obj.errors = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordSignalTicksResponse>, I>>(
    object: I
  ): RecordSignalTicksResponse {
    const message = createBaseRecordSignalTicksResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.errors =
      object.errors?.map((e) =>
        RecordSignalTicksResponse_Error.fromPartial(e)
      ) || [];
    return message;
  },
};

function createBaseRecordSignalTicksResponse_Error(): RecordSignalTicksResponse_Error {
  return { type: 0, message: "", index: 0 };
}

export const RecordSignalTicksResponse_Error = {
  encode(
    message: RecordSignalTicksResponse_Error,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.index !== 0) {
      writer.uint32(24).uint32(message.index);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RecordSignalTicksResponse_Error {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordSignalTicksResponse_Error();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.message = reader.string();
          break;
        case 3:
          message.index = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordSignalTicksResponse_Error {
    return {
      type: isSet(object.type)
        ? recordSignalTicksResponse_Error_TypeFromJSON(object.type)
        : 0,
      message: isSet(object.message) ? String(object.message) : "",
      index: isSet(object.index) ? Number(object.index) : 0,
    };
  },

  toJSON(message: RecordSignalTicksResponse_Error): unknown {
    const obj: any = {};
    message.type !== undefined &&
      (obj.type = recordSignalTicksResponse_Error_TypeToJSON(message.type));
    message.message !== undefined && (obj.message = message.message);
    message.index !== undefined && (obj.index = Math.round(message.index));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordSignalTicksResponse_Error>, I>>(
    object: I
  ): RecordSignalTicksResponse_Error {
    const message = createBaseRecordSignalTicksResponse_Error();
    message.type = object.type ?? 0;
    message.message = object.message ?? "";
    message.index = object.index ?? 0;
    return message;
  },
};

function createBaseRecordEventsResponse(): RecordEventsResponse {
  return { header: undefined, errors: [] };
}

export const RecordEventsResponse = {
  encode(
    message: RecordEventsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.errors) {
      RecordEventsResponse_Error.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RecordEventsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordEventsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.errors.push(
            RecordEventsResponse_Error.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordEventsResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      errors: Array.isArray(object?.errors)
        ? object.errors.map((e: any) => RecordEventsResponse_Error.fromJSON(e))
        : [],
    };
  },

  toJSON(message: RecordEventsResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.errors) {
      obj.errors = message.errors.map((e) =>
        e ? RecordEventsResponse_Error.toJSON(e) : undefined
      );
    } else {
      obj.errors = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordEventsResponse>, I>>(
    object: I
  ): RecordEventsResponse {
    const message = createBaseRecordEventsResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.errors =
      object.errors?.map((e) => RecordEventsResponse_Error.fromPartial(e)) ||
      [];
    return message;
  },
};

function createBaseRecordEventsResponse_Error(): RecordEventsResponse_Error {
  return { type: 0, message: "", index: 0 };
}

export const RecordEventsResponse_Error = {
  encode(
    message: RecordEventsResponse_Error,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.index !== 0) {
      writer.uint32(24).uint32(message.index);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RecordEventsResponse_Error {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordEventsResponse_Error();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.message = reader.string();
          break;
        case 3:
          message.index = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordEventsResponse_Error {
    return {
      type: isSet(object.type)
        ? recordEventsResponse_Error_TypeFromJSON(object.type)
        : 0,
      message: isSet(object.message) ? String(object.message) : "",
      index: isSet(object.index) ? Number(object.index) : 0,
    };
  },

  toJSON(message: RecordEventsResponse_Error): unknown {
    const obj: any = {};
    message.type !== undefined &&
      (obj.type = recordEventsResponse_Error_TypeToJSON(message.type));
    message.message !== undefined && (obj.message = message.message);
    message.index !== undefined && (obj.index = Math.round(message.index));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordEventsResponse_Error>, I>>(
    object: I
  ): RecordEventsResponse_Error {
    const message = createBaseRecordEventsResponse_Error();
    message.type = object.type ?? 0;
    message.message = object.message ?? "";
    message.index = object.index ?? 0;
    return message;
  },
};

function createBaseRegisterSignalSchemaRequest(): RegisterSignalSchemaRequest {
  return { header: undefined, schema: undefined };
}

export const RegisterSignalSchemaRequest = {
  encode(
    message: RegisterSignalSchemaRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.schema !== undefined) {
      SignalSchema.encode(message.schema, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RegisterSignalSchemaRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterSignalSchemaRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.schema = SignalSchema.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegisterSignalSchemaRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      schema: isSet(object.schema)
        ? SignalSchema.fromJSON(object.schema)
        : undefined,
    };
  },

  toJSON(message: RegisterSignalSchemaRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.schema !== undefined &&
      (obj.schema = message.schema
        ? SignalSchema.toJSON(message.schema)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RegisterSignalSchemaRequest>, I>>(
    object: I
  ): RegisterSignalSchemaRequest {
    const message = createBaseRegisterSignalSchemaRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.schema =
      object.schema !== undefined && object.schema !== null
        ? SignalSchema.fromPartial(object.schema)
        : undefined;
    return message;
  },
};

function createBaseRegisterSignalSchemaResponse(): RegisterSignalSchemaResponse {
  return { header: undefined, schemaId: 0 };
}

export const RegisterSignalSchemaResponse = {
  encode(
    message: RegisterSignalSchemaResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.schemaId !== 0) {
      writer.uint32(16).uint64(message.schemaId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RegisterSignalSchemaResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterSignalSchemaResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.schemaId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegisterSignalSchemaResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      schemaId: isSet(object.schemaId) ? Number(object.schemaId) : 0,
    };
  },

  toJSON(message: RegisterSignalSchemaResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.schemaId !== undefined &&
      (obj.schemaId = Math.round(message.schemaId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RegisterSignalSchemaResponse>, I>>(
    object: I
  ): RegisterSignalSchemaResponse {
    const message = createBaseRegisterSignalSchemaResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.schemaId = object.schemaId ?? 0;
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
