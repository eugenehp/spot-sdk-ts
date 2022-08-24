/* eslint-disable */
import Long from "long";
import { Duration } from "../../google/protobuf/duration";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

export interface Association {
  /** MAC address of the associated station */
  macAddress: string;
  /** Time duration since the station last connected. */
  connectedTime: Duration | undefined;
  /** Signal strength of last received packet */
  rxSignalDbm: number;
  /** Signal strength average */
  rxSignalAvgDbm: number;
  /** Signal strength average for beacons only. */
  rxBeaconSignalAvgDbm: number;
  /** Expected throughput */
  expectedBitsPerSecond: number;
  /** Total received bytes */
  rxBytes: number;
  /** Total received packets from the associated station */
  rxPackets: number;
  /** Last unicast receive rate */
  rxBitsPerSecond: number;
  /** Total transmitted bytes */
  txBytes: number;
  /** Total transmitted packets to the associated station */
  txPackets: number;
  /** Current unicast transmit rate */
  txBitsPerSecond: number;
  /** Cumulative retry count to this station, within connected time */
  txRetries: number;
  /** Cumulative failed tx packet count to this station, within connected time */
  txFailed: number;
  /** Number of beacons received from this peer */
  beaconsReceived: number;
  /** Number of times beacon loss was detected */
  beaconLossCount: number;
}

export interface WifiDevice {
  type: WifiDevice_Type;
  name: string;
  macAddress: string;
  ssid: string;
  txPowerDbm: number;
  associations: Association[];
}

export enum WifiDevice_Type {
  UNKNOWN = 0,
  AP = 1,
  CLIENT = 2,
  UNRECOGNIZED = -1,
}

export function wifiDevice_TypeFromJSON(object: any): WifiDevice_Type {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return WifiDevice_Type.UNKNOWN;
    case 1:
    case "AP":
      return WifiDevice_Type.AP;
    case 2:
    case "CLIENT":
      return WifiDevice_Type.CLIENT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return WifiDevice_Type.UNRECOGNIZED;
  }
}

export function wifiDevice_TypeToJSON(object: WifiDevice_Type): string {
  switch (object) {
    case WifiDevice_Type.UNKNOWN:
      return "UNKNOWN";
    case WifiDevice_Type.AP:
      return "AP";
    case WifiDevice_Type.CLIENT:
      return "CLIENT";
    case WifiDevice_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface WifiStats {
  hostname: string;
  devices: WifiDevice[];
}

function createBaseAssociation(): Association {
  return {
    macAddress: "",
    connectedTime: undefined,
    rxSignalDbm: 0,
    rxSignalAvgDbm: 0,
    rxBeaconSignalAvgDbm: 0,
    expectedBitsPerSecond: 0,
    rxBytes: 0,
    rxPackets: 0,
    rxBitsPerSecond: 0,
    txBytes: 0,
    txPackets: 0,
    txBitsPerSecond: 0,
    txRetries: 0,
    txFailed: 0,
    beaconsReceived: 0,
    beaconLossCount: 0,
  };
}

export const Association = {
  encode(
    message: Association,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.macAddress !== "") {
      writer.uint32(10).string(message.macAddress);
    }
    if (message.connectedTime !== undefined) {
      Duration.encode(message.connectedTime, writer.uint32(18).fork()).ldelim();
    }
    if (message.rxSignalDbm !== 0) {
      writer.uint32(24).int32(message.rxSignalDbm);
    }
    if (message.rxSignalAvgDbm !== 0) {
      writer.uint32(32).int32(message.rxSignalAvgDbm);
    }
    if (message.rxBeaconSignalAvgDbm !== 0) {
      writer.uint32(40).int32(message.rxBeaconSignalAvgDbm);
    }
    if (message.expectedBitsPerSecond !== 0) {
      writer.uint32(48).int64(message.expectedBitsPerSecond);
    }
    if (message.rxBytes !== 0) {
      writer.uint32(56).int64(message.rxBytes);
    }
    if (message.rxPackets !== 0) {
      writer.uint32(64).int64(message.rxPackets);
    }
    if (message.rxBitsPerSecond !== 0) {
      writer.uint32(72).int64(message.rxBitsPerSecond);
    }
    if (message.txBytes !== 0) {
      writer.uint32(80).int64(message.txBytes);
    }
    if (message.txPackets !== 0) {
      writer.uint32(88).int64(message.txPackets);
    }
    if (message.txBitsPerSecond !== 0) {
      writer.uint32(96).int64(message.txBitsPerSecond);
    }
    if (message.txRetries !== 0) {
      writer.uint32(104).int64(message.txRetries);
    }
    if (message.txFailed !== 0) {
      writer.uint32(112).int64(message.txFailed);
    }
    if (message.beaconsReceived !== 0) {
      writer.uint32(120).int64(message.beaconsReceived);
    }
    if (message.beaconLossCount !== 0) {
      writer.uint32(128).int64(message.beaconLossCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Association {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAssociation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.macAddress = reader.string();
          break;
        case 2:
          message.connectedTime = Duration.decode(reader, reader.uint32());
          break;
        case 3:
          message.rxSignalDbm = reader.int32();
          break;
        case 4:
          message.rxSignalAvgDbm = reader.int32();
          break;
        case 5:
          message.rxBeaconSignalAvgDbm = reader.int32();
          break;
        case 6:
          message.expectedBitsPerSecond = longToNumber(reader.int64() as Long);
          break;
        case 7:
          message.rxBytes = longToNumber(reader.int64() as Long);
          break;
        case 8:
          message.rxPackets = longToNumber(reader.int64() as Long);
          break;
        case 9:
          message.rxBitsPerSecond = longToNumber(reader.int64() as Long);
          break;
        case 10:
          message.txBytes = longToNumber(reader.int64() as Long);
          break;
        case 11:
          message.txPackets = longToNumber(reader.int64() as Long);
          break;
        case 12:
          message.txBitsPerSecond = longToNumber(reader.int64() as Long);
          break;
        case 13:
          message.txRetries = longToNumber(reader.int64() as Long);
          break;
        case 14:
          message.txFailed = longToNumber(reader.int64() as Long);
          break;
        case 15:
          message.beaconsReceived = longToNumber(reader.int64() as Long);
          break;
        case 16:
          message.beaconLossCount = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Association {
    return {
      macAddress: isSet(object.macAddress) ? String(object.macAddress) : "",
      connectedTime: isSet(object.connectedTime)
        ? Duration.fromJSON(object.connectedTime)
        : undefined,
      rxSignalDbm: isSet(object.rxSignalDbm) ? Number(object.rxSignalDbm) : 0,
      rxSignalAvgDbm: isSet(object.rxSignalAvgDbm)
        ? Number(object.rxSignalAvgDbm)
        : 0,
      rxBeaconSignalAvgDbm: isSet(object.rxBeaconSignalAvgDbm)
        ? Number(object.rxBeaconSignalAvgDbm)
        : 0,
      expectedBitsPerSecond: isSet(object.expectedBitsPerSecond)
        ? Number(object.expectedBitsPerSecond)
        : 0,
      rxBytes: isSet(object.rxBytes) ? Number(object.rxBytes) : 0,
      rxPackets: isSet(object.rxPackets) ? Number(object.rxPackets) : 0,
      rxBitsPerSecond: isSet(object.rxBitsPerSecond)
        ? Number(object.rxBitsPerSecond)
        : 0,
      txBytes: isSet(object.txBytes) ? Number(object.txBytes) : 0,
      txPackets: isSet(object.txPackets) ? Number(object.txPackets) : 0,
      txBitsPerSecond: isSet(object.txBitsPerSecond)
        ? Number(object.txBitsPerSecond)
        : 0,
      txRetries: isSet(object.txRetries) ? Number(object.txRetries) : 0,
      txFailed: isSet(object.txFailed) ? Number(object.txFailed) : 0,
      beaconsReceived: isSet(object.beaconsReceived)
        ? Number(object.beaconsReceived)
        : 0,
      beaconLossCount: isSet(object.beaconLossCount)
        ? Number(object.beaconLossCount)
        : 0,
    };
  },

  toJSON(message: Association): unknown {
    const obj: any = {};
    message.macAddress !== undefined && (obj.macAddress = message.macAddress);
    message.connectedTime !== undefined &&
      (obj.connectedTime = message.connectedTime
        ? Duration.toJSON(message.connectedTime)
        : undefined);
    message.rxSignalDbm !== undefined &&
      (obj.rxSignalDbm = Math.round(message.rxSignalDbm));
    message.rxSignalAvgDbm !== undefined &&
      (obj.rxSignalAvgDbm = Math.round(message.rxSignalAvgDbm));
    message.rxBeaconSignalAvgDbm !== undefined &&
      (obj.rxBeaconSignalAvgDbm = Math.round(message.rxBeaconSignalAvgDbm));
    message.expectedBitsPerSecond !== undefined &&
      (obj.expectedBitsPerSecond = Math.round(message.expectedBitsPerSecond));
    message.rxBytes !== undefined &&
      (obj.rxBytes = Math.round(message.rxBytes));
    message.rxPackets !== undefined &&
      (obj.rxPackets = Math.round(message.rxPackets));
    message.rxBitsPerSecond !== undefined &&
      (obj.rxBitsPerSecond = Math.round(message.rxBitsPerSecond));
    message.txBytes !== undefined &&
      (obj.txBytes = Math.round(message.txBytes));
    message.txPackets !== undefined &&
      (obj.txPackets = Math.round(message.txPackets));
    message.txBitsPerSecond !== undefined &&
      (obj.txBitsPerSecond = Math.round(message.txBitsPerSecond));
    message.txRetries !== undefined &&
      (obj.txRetries = Math.round(message.txRetries));
    message.txFailed !== undefined &&
      (obj.txFailed = Math.round(message.txFailed));
    message.beaconsReceived !== undefined &&
      (obj.beaconsReceived = Math.round(message.beaconsReceived));
    message.beaconLossCount !== undefined &&
      (obj.beaconLossCount = Math.round(message.beaconLossCount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Association>, I>>(
    object: I
  ): Association {
    const message = createBaseAssociation();
    message.macAddress = object.macAddress ?? "";
    message.connectedTime =
      object.connectedTime !== undefined && object.connectedTime !== null
        ? Duration.fromPartial(object.connectedTime)
        : undefined;
    message.rxSignalDbm = object.rxSignalDbm ?? 0;
    message.rxSignalAvgDbm = object.rxSignalAvgDbm ?? 0;
    message.rxBeaconSignalAvgDbm = object.rxBeaconSignalAvgDbm ?? 0;
    message.expectedBitsPerSecond = object.expectedBitsPerSecond ?? 0;
    message.rxBytes = object.rxBytes ?? 0;
    message.rxPackets = object.rxPackets ?? 0;
    message.rxBitsPerSecond = object.rxBitsPerSecond ?? 0;
    message.txBytes = object.txBytes ?? 0;
    message.txPackets = object.txPackets ?? 0;
    message.txBitsPerSecond = object.txBitsPerSecond ?? 0;
    message.txRetries = object.txRetries ?? 0;
    message.txFailed = object.txFailed ?? 0;
    message.beaconsReceived = object.beaconsReceived ?? 0;
    message.beaconLossCount = object.beaconLossCount ?? 0;
    return message;
  },
};

function createBaseWifiDevice(): WifiDevice {
  return {
    type: 0,
    name: "",
    macAddress: "",
    ssid: "",
    txPowerDbm: 0,
    associations: [],
  };
}

export const WifiDevice = {
  encode(
    message: WifiDevice,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.macAddress !== "") {
      writer.uint32(26).string(message.macAddress);
    }
    if (message.ssid !== "") {
      writer.uint32(34).string(message.ssid);
    }
    if (message.txPowerDbm !== 0) {
      writer.uint32(40).int32(message.txPowerDbm);
    }
    for (const v of message.associations) {
      Association.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WifiDevice {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWifiDevice();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.macAddress = reader.string();
          break;
        case 4:
          message.ssid = reader.string();
          break;
        case 5:
          message.txPowerDbm = reader.int32();
          break;
        case 6:
          message.associations.push(
            Association.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WifiDevice {
    return {
      type: isSet(object.type) ? wifiDevice_TypeFromJSON(object.type) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      macAddress: isSet(object.macAddress) ? String(object.macAddress) : "",
      ssid: isSet(object.ssid) ? String(object.ssid) : "",
      txPowerDbm: isSet(object.txPowerDbm) ? Number(object.txPowerDbm) : 0,
      associations: Array.isArray(object?.associations)
        ? object.associations.map((e: any) => Association.fromJSON(e))
        : [],
    };
  },

  toJSON(message: WifiDevice): unknown {
    const obj: any = {};
    message.type !== undefined &&
      (obj.type = wifiDevice_TypeToJSON(message.type));
    message.name !== undefined && (obj.name = message.name);
    message.macAddress !== undefined && (obj.macAddress = message.macAddress);
    message.ssid !== undefined && (obj.ssid = message.ssid);
    message.txPowerDbm !== undefined &&
      (obj.txPowerDbm = Math.round(message.txPowerDbm));
    if (message.associations) {
      obj.associations = message.associations.map((e) =>
        e ? Association.toJSON(e) : undefined
      );
    } else {
      obj.associations = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WifiDevice>, I>>(
    object: I
  ): WifiDevice {
    const message = createBaseWifiDevice();
    message.type = object.type ?? 0;
    message.name = object.name ?? "";
    message.macAddress = object.macAddress ?? "";
    message.ssid = object.ssid ?? "";
    message.txPowerDbm = object.txPowerDbm ?? 0;
    message.associations =
      object.associations?.map((e) => Association.fromPartial(e)) || [];
    return message;
  },
};

function createBaseWifiStats(): WifiStats {
  return { hostname: "", devices: [] };
}

export const WifiStats = {
  encode(
    message: WifiStats,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.hostname !== "") {
      writer.uint32(10).string(message.hostname);
    }
    for (const v of message.devices) {
      WifiDevice.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WifiStats {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWifiStats();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostname = reader.string();
          break;
        case 2:
          message.devices.push(WifiDevice.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WifiStats {
    return {
      hostname: isSet(object.hostname) ? String(object.hostname) : "",
      devices: Array.isArray(object?.devices)
        ? object.devices.map((e: any) => WifiDevice.fromJSON(e))
        : [],
    };
  },

  toJSON(message: WifiStats): unknown {
    const obj: any = {};
    message.hostname !== undefined && (obj.hostname = message.hostname);
    if (message.devices) {
      obj.devices = message.devices.map((e) =>
        e ? WifiDevice.toJSON(e) : undefined
      );
    } else {
      obj.devices = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WifiStats>, I>>(
    object: I
  ): WifiStats {
    const message = createBaseWifiStats();
    message.hostname = object.hostname ?? "";
    message.devices =
      object.devices?.map((e) => WifiDevice.fromPartial(e)) || [];
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
