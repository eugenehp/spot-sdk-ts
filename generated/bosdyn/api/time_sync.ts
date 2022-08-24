/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp";
import { Duration } from "../../google/protobuf/duration";
import { RequestHeader, ResponseHeader } from "./header";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/**
 * Timestamp information from a full GRPC call round-trip.
 * These are used to estimate the round-trip communication time and difference between
 * client and server clocks.
 */
export interface TimeSyncRoundTrip {
  /** Client system time when the message was sent, if not zero. */
  clientTx: Date | undefined;
  /** Server system time when the message was received, if not zero. */
  serverRx: Date | undefined;
  /** Server system time when the response was sent, if not zero. */
  serverTx: Date | undefined;
  /** Client time when the response was received, if not zero. */
  clientRx: Date | undefined;
}

/**
 * Estimate of network speed and clock skew.  Both for the last
 * complete sample and a recent average.  Populated by the server.
 */
export interface TimeSyncEstimate {
  /**
   * Observed network delay (excludes processing between server_rx and server_tx).
   * If zero, this estimate is unpopulated.
   */
  roundTripTime: Duration | undefined;
  /** Add the skew to the client system clock to get the server clock. */
  clockSkew: Duration | undefined;
}

/** Current best estimate status of time sync. */
export interface TimeSyncState {
  /** Best clock synchronization estimate currently available, if any. */
  bestEstimate: TimeSyncEstimate | undefined;
  /** STATUS_OK once time sync is established. */
  status: TimeSyncState_Status;
  /** Time of best estimate, in server time. */
  measurementTime: Date | undefined;
}

export enum TimeSyncState_Status {
  /** STATUS_UNKNOWN - Invalid, do not use. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Clock skew is available. */
  STATUS_OK = 1,
  /** STATUS_MORE_SAMPLES_NEEDED - More updates are required to establish a synchronization estimate. */
  STATUS_MORE_SAMPLES_NEEDED = 2,
  /** STATUS_SERVICE_NOT_READY - Server still establishing time sync internally. */
  STATUS_SERVICE_NOT_READY = 3,
  UNRECOGNIZED = -1,
}

export function timeSyncState_StatusFromJSON(
  object: any
): TimeSyncState_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return TimeSyncState_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return TimeSyncState_Status.STATUS_OK;
    case 2:
    case "STATUS_MORE_SAMPLES_NEEDED":
      return TimeSyncState_Status.STATUS_MORE_SAMPLES_NEEDED;
    case 3:
    case "STATUS_SERVICE_NOT_READY":
      return TimeSyncState_Status.STATUS_SERVICE_NOT_READY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TimeSyncState_Status.UNRECOGNIZED;
  }
}

export function timeSyncState_StatusToJSON(
  object: TimeSyncState_Status
): string {
  switch (object) {
    case TimeSyncState_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case TimeSyncState_Status.STATUS_OK:
      return "STATUS_OK";
    case TimeSyncState_Status.STATUS_MORE_SAMPLES_NEEDED:
      return "STATUS_MORE_SAMPLES_NEEDED";
    case TimeSyncState_Status.STATUS_SERVICE_NOT_READY:
      return "STATUS_SERVICE_NOT_READY";
    case TimeSyncState_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Request message for a time-sync Update RPC. */
export interface TimeSyncUpdateRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Round-trip timing information from the previous Update request. */
  previousRoundTrip: TimeSyncRoundTrip | undefined;
  /**
   * Identifier to verify time sync between robot and client. If unset, server will assign
   * one to client.
   */
  clockIdentifier: string;
}

/** Request message for a time-sync Update RPC. */
export interface TimeSyncUpdateResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Clock synchronization estimate from the previous RPC round-trip, if available. */
  previousEstimate: TimeSyncEstimate | undefined;
  /** Current best clock synchronization estimate according to server. */
  state: TimeSyncState | undefined;
  /**
   * Identifier to verify time sync between robot and client. Assigned upon first Request and
   * echoed with each subsequent request.
   */
  clockIdentifier: string;
}

function createBaseTimeSyncRoundTrip(): TimeSyncRoundTrip {
  return {
    clientTx: undefined,
    serverRx: undefined,
    serverTx: undefined,
    clientRx: undefined,
  };
}

export const TimeSyncRoundTrip = {
  encode(
    message: TimeSyncRoundTrip,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.clientTx !== undefined) {
      Timestamp.encode(
        toTimestamp(message.clientTx),
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.serverRx !== undefined) {
      Timestamp.encode(
        toTimestamp(message.serverRx),
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.serverTx !== undefined) {
      Timestamp.encode(
        toTimestamp(message.serverTx),
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.clientRx !== undefined) {
      Timestamp.encode(
        toTimestamp(message.clientRx),
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TimeSyncRoundTrip {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTimeSyncRoundTrip();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clientTx = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.serverRx = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.serverTx = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.clientRx = fromTimestamp(
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

  fromJSON(object: any): TimeSyncRoundTrip {
    return {
      clientTx: isSet(object.clientTx)
        ? fromJsonTimestamp(object.clientTx)
        : undefined,
      serverRx: isSet(object.serverRx)
        ? fromJsonTimestamp(object.serverRx)
        : undefined,
      serverTx: isSet(object.serverTx)
        ? fromJsonTimestamp(object.serverTx)
        : undefined,
      clientRx: isSet(object.clientRx)
        ? fromJsonTimestamp(object.clientRx)
        : undefined,
    };
  },

  toJSON(message: TimeSyncRoundTrip): unknown {
    const obj: any = {};
    message.clientTx !== undefined &&
      (obj.clientTx = message.clientTx.toISOString());
    message.serverRx !== undefined &&
      (obj.serverRx = message.serverRx.toISOString());
    message.serverTx !== undefined &&
      (obj.serverTx = message.serverTx.toISOString());
    message.clientRx !== undefined &&
      (obj.clientRx = message.clientRx.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TimeSyncRoundTrip>, I>>(
    object: I
  ): TimeSyncRoundTrip {
    const message = createBaseTimeSyncRoundTrip();
    message.clientTx = object.clientTx ?? undefined;
    message.serverRx = object.serverRx ?? undefined;
    message.serverTx = object.serverTx ?? undefined;
    message.clientRx = object.clientRx ?? undefined;
    return message;
  },
};

function createBaseTimeSyncEstimate(): TimeSyncEstimate {
  return { roundTripTime: undefined, clockSkew: undefined };
}

export const TimeSyncEstimate = {
  encode(
    message: TimeSyncEstimate,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.roundTripTime !== undefined) {
      Duration.encode(message.roundTripTime, writer.uint32(10).fork()).ldelim();
    }
    if (message.clockSkew !== undefined) {
      Duration.encode(message.clockSkew, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TimeSyncEstimate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTimeSyncEstimate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.roundTripTime = Duration.decode(reader, reader.uint32());
          break;
        case 2:
          message.clockSkew = Duration.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TimeSyncEstimate {
    return {
      roundTripTime: isSet(object.roundTripTime)
        ? Duration.fromJSON(object.roundTripTime)
        : undefined,
      clockSkew: isSet(object.clockSkew)
        ? Duration.fromJSON(object.clockSkew)
        : undefined,
    };
  },

  toJSON(message: TimeSyncEstimate): unknown {
    const obj: any = {};
    message.roundTripTime !== undefined &&
      (obj.roundTripTime = message.roundTripTime
        ? Duration.toJSON(message.roundTripTime)
        : undefined);
    message.clockSkew !== undefined &&
      (obj.clockSkew = message.clockSkew
        ? Duration.toJSON(message.clockSkew)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TimeSyncEstimate>, I>>(
    object: I
  ): TimeSyncEstimate {
    const message = createBaseTimeSyncEstimate();
    message.roundTripTime =
      object.roundTripTime !== undefined && object.roundTripTime !== null
        ? Duration.fromPartial(object.roundTripTime)
        : undefined;
    message.clockSkew =
      object.clockSkew !== undefined && object.clockSkew !== null
        ? Duration.fromPartial(object.clockSkew)
        : undefined;
    return message;
  },
};

function createBaseTimeSyncState(): TimeSyncState {
  return { bestEstimate: undefined, status: 0, measurementTime: undefined };
}

export const TimeSyncState = {
  encode(
    message: TimeSyncState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.bestEstimate !== undefined) {
      TimeSyncEstimate.encode(
        message.bestEstimate,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.measurementTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.measurementTime),
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TimeSyncState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTimeSyncState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bestEstimate = TimeSyncEstimate.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        case 3:
          message.measurementTime = fromTimestamp(
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

  fromJSON(object: any): TimeSyncState {
    return {
      bestEstimate: isSet(object.bestEstimate)
        ? TimeSyncEstimate.fromJSON(object.bestEstimate)
        : undefined,
      status: isSet(object.status)
        ? timeSyncState_StatusFromJSON(object.status)
        : 0,
      measurementTime: isSet(object.measurementTime)
        ? fromJsonTimestamp(object.measurementTime)
        : undefined,
    };
  },

  toJSON(message: TimeSyncState): unknown {
    const obj: any = {};
    message.bestEstimate !== undefined &&
      (obj.bestEstimate = message.bestEstimate
        ? TimeSyncEstimate.toJSON(message.bestEstimate)
        : undefined);
    message.status !== undefined &&
      (obj.status = timeSyncState_StatusToJSON(message.status));
    message.measurementTime !== undefined &&
      (obj.measurementTime = message.measurementTime.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TimeSyncState>, I>>(
    object: I
  ): TimeSyncState {
    const message = createBaseTimeSyncState();
    message.bestEstimate =
      object.bestEstimate !== undefined && object.bestEstimate !== null
        ? TimeSyncEstimate.fromPartial(object.bestEstimate)
        : undefined;
    message.status = object.status ?? 0;
    message.measurementTime = object.measurementTime ?? undefined;
    return message;
  },
};

function createBaseTimeSyncUpdateRequest(): TimeSyncUpdateRequest {
  return {
    header: undefined,
    previousRoundTrip: undefined,
    clockIdentifier: "",
  };
}

export const TimeSyncUpdateRequest = {
  encode(
    message: TimeSyncUpdateRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.previousRoundTrip !== undefined) {
      TimeSyncRoundTrip.encode(
        message.previousRoundTrip,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.clockIdentifier !== "") {
      writer.uint32(26).string(message.clockIdentifier);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): TimeSyncUpdateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTimeSyncUpdateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.previousRoundTrip = TimeSyncRoundTrip.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.clockIdentifier = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TimeSyncUpdateRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      previousRoundTrip: isSet(object.previousRoundTrip)
        ? TimeSyncRoundTrip.fromJSON(object.previousRoundTrip)
        : undefined,
      clockIdentifier: isSet(object.clockIdentifier)
        ? String(object.clockIdentifier)
        : "",
    };
  },

  toJSON(message: TimeSyncUpdateRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.previousRoundTrip !== undefined &&
      (obj.previousRoundTrip = message.previousRoundTrip
        ? TimeSyncRoundTrip.toJSON(message.previousRoundTrip)
        : undefined);
    message.clockIdentifier !== undefined &&
      (obj.clockIdentifier = message.clockIdentifier);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TimeSyncUpdateRequest>, I>>(
    object: I
  ): TimeSyncUpdateRequest {
    const message = createBaseTimeSyncUpdateRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.previousRoundTrip =
      object.previousRoundTrip !== undefined &&
      object.previousRoundTrip !== null
        ? TimeSyncRoundTrip.fromPartial(object.previousRoundTrip)
        : undefined;
    message.clockIdentifier = object.clockIdentifier ?? "";
    return message;
  },
};

function createBaseTimeSyncUpdateResponse(): TimeSyncUpdateResponse {
  return {
    header: undefined,
    previousEstimate: undefined,
    state: undefined,
    clockIdentifier: "",
  };
}

export const TimeSyncUpdateResponse = {
  encode(
    message: TimeSyncUpdateResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.previousEstimate !== undefined) {
      TimeSyncEstimate.encode(
        message.previousEstimate,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.state !== undefined) {
      TimeSyncState.encode(message.state, writer.uint32(26).fork()).ldelim();
    }
    if (message.clockIdentifier !== "") {
      writer.uint32(34).string(message.clockIdentifier);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): TimeSyncUpdateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTimeSyncUpdateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.previousEstimate = TimeSyncEstimate.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.state = TimeSyncState.decode(reader, reader.uint32());
          break;
        case 4:
          message.clockIdentifier = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TimeSyncUpdateResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      previousEstimate: isSet(object.previousEstimate)
        ? TimeSyncEstimate.fromJSON(object.previousEstimate)
        : undefined,
      state: isSet(object.state)
        ? TimeSyncState.fromJSON(object.state)
        : undefined,
      clockIdentifier: isSet(object.clockIdentifier)
        ? String(object.clockIdentifier)
        : "",
    };
  },

  toJSON(message: TimeSyncUpdateResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.previousEstimate !== undefined &&
      (obj.previousEstimate = message.previousEstimate
        ? TimeSyncEstimate.toJSON(message.previousEstimate)
        : undefined);
    message.state !== undefined &&
      (obj.state = message.state
        ? TimeSyncState.toJSON(message.state)
        : undefined);
    message.clockIdentifier !== undefined &&
      (obj.clockIdentifier = message.clockIdentifier);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TimeSyncUpdateResponse>, I>>(
    object: I
  ): TimeSyncUpdateResponse {
    const message = createBaseTimeSyncUpdateResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.previousEstimate =
      object.previousEstimate !== undefined && object.previousEstimate !== null
        ? TimeSyncEstimate.fromPartial(object.previousEstimate)
        : undefined;
    message.state =
      object.state !== undefined && object.state !== null
        ? TimeSyncState.fromPartial(object.state)
        : undefined;
    message.clockIdentifier = object.clockIdentifier ?? "";
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
