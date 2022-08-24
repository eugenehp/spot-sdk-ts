/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/** Representation of a time range from a start time through an end time. */
export interface TimeRange {
  start: Date | undefined;
  end: Date | undefined;
}

function createBaseTimeRange(): TimeRange {
  return { start: undefined, end: undefined };
}

export const TimeRange = {
  encode(
    message: TimeRange,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.start !== undefined) {
      Timestamp.encode(
        toTimestamp(message.start),
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.end !== undefined) {
      Timestamp.encode(
        toTimestamp(message.end),
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TimeRange {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTimeRange();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.start = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.end = fromTimestamp(
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

  fromJSON(object: any): TimeRange {
    return {
      start: isSet(object.start) ? fromJsonTimestamp(object.start) : undefined,
      end: isSet(object.end) ? fromJsonTimestamp(object.end) : undefined,
    };
  },

  toJSON(message: TimeRange): unknown {
    const obj: any = {};
    message.start !== undefined && (obj.start = message.start.toISOString());
    message.end !== undefined && (obj.end = message.end.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TimeRange>, I>>(
    object: I
  ): TimeRange {
    const message = createBaseTimeRange();
    message.start = object.start ?? undefined;
    message.end = object.end ?? undefined;
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
