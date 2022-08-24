/* eslint-disable */
import Long from "long";
import { Any } from "../../../google/protobuf/any";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api.mission";

/** Results from executing / ticking / running a single node. */
export enum Result {
  /** RESULT_UNKNOWN - Invalid, should not be used. */
  RESULT_UNKNOWN = 0,
  /** RESULT_FAILURE - The node completed running, but failed. */
  RESULT_FAILURE = 1,
  /** RESULT_RUNNING - The node is still in process and has not completed. */
  RESULT_RUNNING = 2,
  /** RESULT_SUCCESS - The node completed, and succeeded. */
  RESULT_SUCCESS = 3,
  /** RESULT_ERROR - The node encountered an operational error while trying to execute. */
  RESULT_ERROR = 4,
  UNRECOGNIZED = -1,
}

export function resultFromJSON(object: any): Result {
  switch (object) {
    case 0:
    case "RESULT_UNKNOWN":
      return Result.RESULT_UNKNOWN;
    case 1:
    case "RESULT_FAILURE":
      return Result.RESULT_FAILURE;
    case 2:
    case "RESULT_RUNNING":
      return Result.RESULT_RUNNING;
    case 3:
    case "RESULT_SUCCESS":
      return Result.RESULT_SUCCESS;
    case 4:
    case "RESULT_ERROR":
      return Result.RESULT_ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Result.UNRECOGNIZED;
  }
}

export function resultToJSON(object: Result): string {
  switch (object) {
    case Result.RESULT_UNKNOWN:
      return "RESULT_UNKNOWN";
    case Result.RESULT_FAILURE:
      return "RESULT_FAILURE";
    case Result.RESULT_RUNNING:
      return "RESULT_RUNNING";
    case Result.RESULT_SUCCESS:
      return "RESULT_SUCCESS";
    case Result.RESULT_ERROR:
      return "RESULT_ERROR";
    case Result.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Key/Value pair, used in other messages. */
export interface KeyValue {
  key: string;
  value: Value | undefined;
}

/** A value of a run-time or compile-time variable. */
export interface Value {
  /** A constant value. */
  constant: ConstantValue | undefined;
  /** Look up a variable provided at run-time. */
  runtimeVar: VariableDeclaration | undefined;
  /** Look up a Node Parameter. */
  parameter: VariableDeclaration | undefined;
}

/** Declaration of a run-time or compile-time variable. */
export interface VariableDeclaration {
  /** Name of the variable, to be used as the key in KeyValue pairs. */
  name: string;
  /** Type that this variable is expected to have. Used to verify assignments and comparisons. */
  type: VariableDeclaration_Type;
}

/** Supported types for blackboard or parameter values. */
export enum VariableDeclaration_Type {
  TYPE_UNKNOWN = 0,
  TYPE_FLOAT = 1,
  TYPE_STRING = 2,
  TYPE_INT = 3,
  TYPE_BOOL = 4,
  TYPE_MESSAGE = 5,
  UNRECOGNIZED = -1,
}

export function variableDeclaration_TypeFromJSON(
  object: any
): VariableDeclaration_Type {
  switch (object) {
    case 0:
    case "TYPE_UNKNOWN":
      return VariableDeclaration_Type.TYPE_UNKNOWN;
    case 1:
    case "TYPE_FLOAT":
      return VariableDeclaration_Type.TYPE_FLOAT;
    case 2:
    case "TYPE_STRING":
      return VariableDeclaration_Type.TYPE_STRING;
    case 3:
    case "TYPE_INT":
      return VariableDeclaration_Type.TYPE_INT;
    case 4:
    case "TYPE_BOOL":
      return VariableDeclaration_Type.TYPE_BOOL;
    case 5:
    case "TYPE_MESSAGE":
      return VariableDeclaration_Type.TYPE_MESSAGE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return VariableDeclaration_Type.UNRECOGNIZED;
  }
}

export function variableDeclaration_TypeToJSON(
  object: VariableDeclaration_Type
): string {
  switch (object) {
    case VariableDeclaration_Type.TYPE_UNKNOWN:
      return "TYPE_UNKNOWN";
    case VariableDeclaration_Type.TYPE_FLOAT:
      return "TYPE_FLOAT";
    case VariableDeclaration_Type.TYPE_STRING:
      return "TYPE_STRING";
    case VariableDeclaration_Type.TYPE_INT:
      return "TYPE_INT";
    case VariableDeclaration_Type.TYPE_BOOL:
      return "TYPE_BOOL";
    case VariableDeclaration_Type.TYPE_MESSAGE:
      return "TYPE_MESSAGE";
    case VariableDeclaration_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** A constant value. Corresponds to the VariableDeclaration Type enum. */
export interface ConstantValue {
  floatValue: number | undefined;
  stringValue: string | undefined;
  intValue: number | undefined;
  boolValue: boolean | undefined;
  msgValue: Any | undefined;
}

/** Data a user can associate with a node. */
export interface UserData {
  /**
   * Identifier. Enables matching the Node uploaded to the MissionService with the NodeInfo
   * downloaded from the MissionService.
   */
  id: string;
  /** Arbitrary data. We recommend keeping it small, to avoid bloating the size of the mission. */
  bytestring: Uint8Array;
}

function createBaseKeyValue(): KeyValue {
  return { key: "", value: undefined };
}

export const KeyValue = {
  encode(
    message: KeyValue,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Value.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KeyValue {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeyValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = Value.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): KeyValue {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? Value.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: KeyValue): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value ? Value.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<KeyValue>, I>>(object: I): KeyValue {
    const message = createBaseKeyValue();
    message.key = object.key ?? "";
    message.value =
      object.value !== undefined && object.value !== null
        ? Value.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseValue(): Value {
  return { constant: undefined, runtimeVar: undefined, parameter: undefined };
}

export const Value = {
  encode(message: Value, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.constant !== undefined) {
      ConstantValue.encode(message.constant, writer.uint32(18).fork()).ldelim();
    }
    if (message.runtimeVar !== undefined) {
      VariableDeclaration.encode(
        message.runtimeVar,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.parameter !== undefined) {
      VariableDeclaration.encode(
        message.parameter,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Value {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.constant = ConstantValue.decode(reader, reader.uint32());
          break;
        case 3:
          message.runtimeVar = VariableDeclaration.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.parameter = VariableDeclaration.decode(
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

  fromJSON(object: any): Value {
    return {
      constant: isSet(object.constant)
        ? ConstantValue.fromJSON(object.constant)
        : undefined,
      runtimeVar: isSet(object.runtimeVar)
        ? VariableDeclaration.fromJSON(object.runtimeVar)
        : undefined,
      parameter: isSet(object.parameter)
        ? VariableDeclaration.fromJSON(object.parameter)
        : undefined,
    };
  },

  toJSON(message: Value): unknown {
    const obj: any = {};
    message.constant !== undefined &&
      (obj.constant = message.constant
        ? ConstantValue.toJSON(message.constant)
        : undefined);
    message.runtimeVar !== undefined &&
      (obj.runtimeVar = message.runtimeVar
        ? VariableDeclaration.toJSON(message.runtimeVar)
        : undefined);
    message.parameter !== undefined &&
      (obj.parameter = message.parameter
        ? VariableDeclaration.toJSON(message.parameter)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Value>, I>>(object: I): Value {
    const message = createBaseValue();
    message.constant =
      object.constant !== undefined && object.constant !== null
        ? ConstantValue.fromPartial(object.constant)
        : undefined;
    message.runtimeVar =
      object.runtimeVar !== undefined && object.runtimeVar !== null
        ? VariableDeclaration.fromPartial(object.runtimeVar)
        : undefined;
    message.parameter =
      object.parameter !== undefined && object.parameter !== null
        ? VariableDeclaration.fromPartial(object.parameter)
        : undefined;
    return message;
  },
};

function createBaseVariableDeclaration(): VariableDeclaration {
  return { name: "", type: 0 };
}

export const VariableDeclaration = {
  encode(
    message: VariableDeclaration,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VariableDeclaration {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVariableDeclaration();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.type = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VariableDeclaration {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      type: isSet(object.type)
        ? variableDeclaration_TypeFromJSON(object.type)
        : 0,
    };
  },

  toJSON(message: VariableDeclaration): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.type !== undefined &&
      (obj.type = variableDeclaration_TypeToJSON(message.type));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<VariableDeclaration>, I>>(
    object: I
  ): VariableDeclaration {
    const message = createBaseVariableDeclaration();
    message.name = object.name ?? "";
    message.type = object.type ?? 0;
    return message;
  },
};

function createBaseConstantValue(): ConstantValue {
  return {
    floatValue: undefined,
    stringValue: undefined,
    intValue: undefined,
    boolValue: undefined,
    msgValue: undefined,
  };
}

export const ConstantValue = {
  encode(
    message: ConstantValue,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.floatValue !== undefined) {
      writer.uint32(9).double(message.floatValue);
    }
    if (message.stringValue !== undefined) {
      writer.uint32(18).string(message.stringValue);
    }
    if (message.intValue !== undefined) {
      writer.uint32(24).int64(message.intValue);
    }
    if (message.boolValue !== undefined) {
      writer.uint32(32).bool(message.boolValue);
    }
    if (message.msgValue !== undefined) {
      Any.encode(message.msgValue, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConstantValue {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConstantValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.floatValue = reader.double();
          break;
        case 2:
          message.stringValue = reader.string();
          break;
        case 3:
          message.intValue = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.boolValue = reader.bool();
          break;
        case 5:
          message.msgValue = Any.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ConstantValue {
    return {
      floatValue: isSet(object.floatValue)
        ? Number(object.floatValue)
        : undefined,
      stringValue: isSet(object.stringValue)
        ? String(object.stringValue)
        : undefined,
      intValue: isSet(object.intValue) ? Number(object.intValue) : undefined,
      boolValue: isSet(object.boolValue)
        ? Boolean(object.boolValue)
        : undefined,
      msgValue: isSet(object.msgValue)
        ? Any.fromJSON(object.msgValue)
        : undefined,
    };
  },

  toJSON(message: ConstantValue): unknown {
    const obj: any = {};
    message.floatValue !== undefined && (obj.floatValue = message.floatValue);
    message.stringValue !== undefined &&
      (obj.stringValue = message.stringValue);
    message.intValue !== undefined &&
      (obj.intValue = Math.round(message.intValue));
    message.boolValue !== undefined && (obj.boolValue = message.boolValue);
    message.msgValue !== undefined &&
      (obj.msgValue = message.msgValue
        ? Any.toJSON(message.msgValue)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ConstantValue>, I>>(
    object: I
  ): ConstantValue {
    const message = createBaseConstantValue();
    message.floatValue = object.floatValue ?? undefined;
    message.stringValue = object.stringValue ?? undefined;
    message.intValue = object.intValue ?? undefined;
    message.boolValue = object.boolValue ?? undefined;
    message.msgValue =
      object.msgValue !== undefined && object.msgValue !== null
        ? Any.fromPartial(object.msgValue)
        : undefined;
    return message;
  },
};

function createBaseUserData(): UserData {
  return { id: "", bytestring: new Uint8Array() };
}

export const UserData = {
  encode(
    message: UserData,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.bytestring.length !== 0) {
      writer.uint32(26).bytes(message.bytestring);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 3:
          message.bytestring = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UserData {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      bytestring: isSet(object.bytestring)
        ? bytesFromBase64(object.bytestring)
        : new Uint8Array(),
    };
  },

  toJSON(message: UserData): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.bytestring !== undefined &&
      (obj.bytestring = base64FromBytes(
        message.bytestring !== undefined ? message.bytestring : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UserData>, I>>(object: I): UserData {
    const message = createBaseUserData();
    message.id = object.id ?? "";
    message.bytestring = object.bytestring ?? new Uint8Array();
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
