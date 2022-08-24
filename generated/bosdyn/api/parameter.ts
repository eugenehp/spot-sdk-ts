/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp";
import Long from "long";
import { Duration } from "../../google/protobuf/duration";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/**
 * A generic parameter message used by the robot state service to describe different,
 * parameterized aspects of the robot.
 */
export interface Parameter {
  /** Name of parameter. */
  label: string;
  /** Units of parameter value. */
  units: string;
  /** Value of a countable measure. */
  intValue: number | undefined;
  /** Value of a continuous measure. */
  floatValue: number | undefined;
  /** A point in time. */
  timestamp: Date | undefined;
  /** A time duration. */
  duration: Duration | undefined;
  /** Value as a string. */
  stringValue: string | undefined;
  /** Value as true/false. */
  boolValue: boolean | undefined;
  /** Unsigned integer */
  uintValue: number | undefined;
  /** Description of the parameter or its value. */
  notes: string;
}

function createBaseParameter(): Parameter {
  return {
    label: "",
    units: "",
    intValue: undefined,
    floatValue: undefined,
    timestamp: undefined,
    duration: undefined,
    stringValue: undefined,
    boolValue: undefined,
    uintValue: undefined,
    notes: "",
  };
}

export const Parameter = {
  encode(
    message: Parameter,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.label !== "") {
      writer.uint32(10).string(message.label);
    }
    if (message.units !== "") {
      writer.uint32(18).string(message.units);
    }
    if (message.intValue !== undefined) {
      writer.uint32(24).int64(message.intValue);
    }
    if (message.floatValue !== undefined) {
      writer.uint32(33).double(message.floatValue);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestamp),
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(50).fork()).ldelim();
    }
    if (message.stringValue !== undefined) {
      writer.uint32(58).string(message.stringValue);
    }
    if (message.boolValue !== undefined) {
      writer.uint32(64).bool(message.boolValue);
    }
    if (message.uintValue !== undefined) {
      writer.uint32(80).uint64(message.uintValue);
    }
    if (message.notes !== "") {
      writer.uint32(74).string(message.notes);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Parameter {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParameter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.label = reader.string();
          break;
        case 2:
          message.units = reader.string();
          break;
        case 3:
          message.intValue = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.floatValue = reader.double();
          break;
        case 5:
          message.timestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 6:
          message.duration = Duration.decode(reader, reader.uint32());
          break;
        case 7:
          message.stringValue = reader.string();
          break;
        case 8:
          message.boolValue = reader.bool();
          break;
        case 10:
          message.uintValue = longToNumber(reader.uint64() as Long);
          break;
        case 9:
          message.notes = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Parameter {
    return {
      label: isSet(object.label) ? String(object.label) : "",
      units: isSet(object.units) ? String(object.units) : "",
      intValue: isSet(object.intValue) ? Number(object.intValue) : undefined,
      floatValue: isSet(object.floatValue)
        ? Number(object.floatValue)
        : undefined,
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
      duration: isSet(object.duration)
        ? Duration.fromJSON(object.duration)
        : undefined,
      stringValue: isSet(object.stringValue)
        ? String(object.stringValue)
        : undefined,
      boolValue: isSet(object.boolValue)
        ? Boolean(object.boolValue)
        : undefined,
      uintValue: isSet(object.uintValue) ? Number(object.uintValue) : undefined,
      notes: isSet(object.notes) ? String(object.notes) : "",
    };
  },

  toJSON(message: Parameter): unknown {
    const obj: any = {};
    message.label !== undefined && (obj.label = message.label);
    message.units !== undefined && (obj.units = message.units);
    message.intValue !== undefined &&
      (obj.intValue = Math.round(message.intValue));
    message.floatValue !== undefined && (obj.floatValue = message.floatValue);
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp.toISOString());
    message.duration !== undefined &&
      (obj.duration = message.duration
        ? Duration.toJSON(message.duration)
        : undefined);
    message.stringValue !== undefined &&
      (obj.stringValue = message.stringValue);
    message.boolValue !== undefined && (obj.boolValue = message.boolValue);
    message.uintValue !== undefined &&
      (obj.uintValue = Math.round(message.uintValue));
    message.notes !== undefined && (obj.notes = message.notes);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Parameter>, I>>(
    object: I
  ): Parameter {
    const message = createBaseParameter();
    message.label = object.label ?? "";
    message.units = object.units ?? "";
    message.intValue = object.intValue ?? undefined;
    message.floatValue = object.floatValue ?? undefined;
    message.timestamp = object.timestamp ?? undefined;
    message.duration =
      object.duration !== undefined && object.duration !== null
        ? Duration.fromPartial(object.duration)
        : undefined;
    message.stringValue = object.stringValue ?? undefined;
    message.boolValue = object.boolValue ?? undefined;
    message.uintValue = object.uintValue ?? undefined;
    message.notes = object.notes ?? "";
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
