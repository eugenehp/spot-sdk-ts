/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp";
import { RequestHeader, ResponseHeader } from "./header";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

export interface LicenseInfo {
  /** The status of the uploaded license for this robot. */
  status: LicenseInfo_Status;
  /** Unique license number. */
  id: string;
  /** Serial number of the robot this license covers. */
  robotSerial: string;
  /** The license is not valid for use for any dates before this timestamp. */
  notValidBefore: Date | undefined;
  /** The license is not valid for use for any dates after this timestamp. */
  notValidAfter: Date | undefined;
  /** / Human readable list of licensed features included for this license. */
  licensedFeatures: string[];
}

export enum LicenseInfo_Status {
  STATUS_UNKNOWN = 0,
  STATUS_VALID = 1,
  STATUS_EXPIRED = 2,
  STATUS_NOT_YET_VALID = 3,
  STATUS_MALFORMED = 4,
  STATUS_SERIAL_MISMATCH = 5,
  STATUS_NO_LICENSE = 6,
  UNRECOGNIZED = -1,
}

export function licenseInfo_StatusFromJSON(object: any): LicenseInfo_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return LicenseInfo_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_VALID":
      return LicenseInfo_Status.STATUS_VALID;
    case 2:
    case "STATUS_EXPIRED":
      return LicenseInfo_Status.STATUS_EXPIRED;
    case 3:
    case "STATUS_NOT_YET_VALID":
      return LicenseInfo_Status.STATUS_NOT_YET_VALID;
    case 4:
    case "STATUS_MALFORMED":
      return LicenseInfo_Status.STATUS_MALFORMED;
    case 5:
    case "STATUS_SERIAL_MISMATCH":
      return LicenseInfo_Status.STATUS_SERIAL_MISMATCH;
    case 6:
    case "STATUS_NO_LICENSE":
      return LicenseInfo_Status.STATUS_NO_LICENSE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LicenseInfo_Status.UNRECOGNIZED;
  }
}

export function licenseInfo_StatusToJSON(object: LicenseInfo_Status): string {
  switch (object) {
    case LicenseInfo_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case LicenseInfo_Status.STATUS_VALID:
      return "STATUS_VALID";
    case LicenseInfo_Status.STATUS_EXPIRED:
      return "STATUS_EXPIRED";
    case LicenseInfo_Status.STATUS_NOT_YET_VALID:
      return "STATUS_NOT_YET_VALID";
    case LicenseInfo_Status.STATUS_MALFORMED:
      return "STATUS_MALFORMED";
    case LicenseInfo_Status.STATUS_SERIAL_MISMATCH:
      return "STATUS_SERIAL_MISMATCH";
    case LicenseInfo_Status.STATUS_NO_LICENSE:
      return "STATUS_NO_LICENSE";
    case LicenseInfo_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**  */
export interface GetLicenseInfoRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

export interface GetLicenseInfoResponse {
  /** Common response header */
  header: ResponseHeader | undefined;
  /** The details about the current license that is uploaded to the robot. */
  license: LicenseInfo | undefined;
}

export interface GetFeatureEnabledRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /**
   * Check if specific named features are enabled on the robot under the currently
   * loaded license.
   */
  featureCodes: string[];
}

export interface GetFeatureEnabledResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /**
   * The resulting map showing the feature name (as the map key) and a boolean indicating
   * if the feature is enabled with this license (as the map value).
   */
  featureEnabled: { [key: string]: boolean };
}

export interface GetFeatureEnabledResponse_FeatureEnabledEntry {
  key: string;
  value: boolean;
}

function createBaseLicenseInfo(): LicenseInfo {
  return {
    status: 0,
    id: "",
    robotSerial: "",
    notValidBefore: undefined,
    notValidAfter: undefined,
    licensedFeatures: [],
  };
}

export const LicenseInfo = {
  encode(
    message: LicenseInfo,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.robotSerial !== "") {
      writer.uint32(26).string(message.robotSerial);
    }
    if (message.notValidBefore !== undefined) {
      Timestamp.encode(
        toTimestamp(message.notValidBefore),
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.notValidAfter !== undefined) {
      Timestamp.encode(
        toTimestamp(message.notValidAfter),
        writer.uint32(42).fork()
      ).ldelim();
    }
    for (const v of message.licensedFeatures) {
      writer.uint32(50).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LicenseInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLicenseInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32() as any;
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.robotSerial = reader.string();
          break;
        case 4:
          message.notValidBefore = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 5:
          message.notValidAfter = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 6:
          message.licensedFeatures.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LicenseInfo {
    return {
      status: isSet(object.status)
        ? licenseInfo_StatusFromJSON(object.status)
        : 0,
      id: isSet(object.id) ? String(object.id) : "",
      robotSerial: isSet(object.robotSerial) ? String(object.robotSerial) : "",
      notValidBefore: isSet(object.notValidBefore)
        ? fromJsonTimestamp(object.notValidBefore)
        : undefined,
      notValidAfter: isSet(object.notValidAfter)
        ? fromJsonTimestamp(object.notValidAfter)
        : undefined,
      licensedFeatures: Array.isArray(object?.licensedFeatures)
        ? object.licensedFeatures.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: LicenseInfo): unknown {
    const obj: any = {};
    message.status !== undefined &&
      (obj.status = licenseInfo_StatusToJSON(message.status));
    message.id !== undefined && (obj.id = message.id);
    message.robotSerial !== undefined &&
      (obj.robotSerial = message.robotSerial);
    message.notValidBefore !== undefined &&
      (obj.notValidBefore = message.notValidBefore.toISOString());
    message.notValidAfter !== undefined &&
      (obj.notValidAfter = message.notValidAfter.toISOString());
    if (message.licensedFeatures) {
      obj.licensedFeatures = message.licensedFeatures.map((e) => e);
    } else {
      obj.licensedFeatures = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LicenseInfo>, I>>(
    object: I
  ): LicenseInfo {
    const message = createBaseLicenseInfo();
    message.status = object.status ?? 0;
    message.id = object.id ?? "";
    message.robotSerial = object.robotSerial ?? "";
    message.notValidBefore = object.notValidBefore ?? undefined;
    message.notValidAfter = object.notValidAfter ?? undefined;
    message.licensedFeatures = object.licensedFeatures?.map((e) => e) || [];
    return message;
  },
};

function createBaseGetLicenseInfoRequest(): GetLicenseInfoRequest {
  return { header: undefined };
}

export const GetLicenseInfoRequest = {
  encode(
    message: GetLicenseInfoRequest,
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
  ): GetLicenseInfoRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLicenseInfoRequest();
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

  fromJSON(object: any): GetLicenseInfoRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: GetLicenseInfoRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetLicenseInfoRequest>, I>>(
    object: I
  ): GetLicenseInfoRequest {
    const message = createBaseGetLicenseInfoRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseGetLicenseInfoResponse(): GetLicenseInfoResponse {
  return { header: undefined, license: undefined };
}

export const GetLicenseInfoResponse = {
  encode(
    message: GetLicenseInfoResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.license !== undefined) {
      LicenseInfo.encode(message.license, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetLicenseInfoResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLicenseInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.license = LicenseInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetLicenseInfoResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      license: isSet(object.license)
        ? LicenseInfo.fromJSON(object.license)
        : undefined,
    };
  },

  toJSON(message: GetLicenseInfoResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.license !== undefined &&
      (obj.license = message.license
        ? LicenseInfo.toJSON(message.license)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetLicenseInfoResponse>, I>>(
    object: I
  ): GetLicenseInfoResponse {
    const message = createBaseGetLicenseInfoResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.license =
      object.license !== undefined && object.license !== null
        ? LicenseInfo.fromPartial(object.license)
        : undefined;
    return message;
  },
};

function createBaseGetFeatureEnabledRequest(): GetFeatureEnabledRequest {
  return { header: undefined, featureCodes: [] };
}

export const GetFeatureEnabledRequest = {
  encode(
    message: GetFeatureEnabledRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.featureCodes) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetFeatureEnabledRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetFeatureEnabledRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.featureCodes.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetFeatureEnabledRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      featureCodes: Array.isArray(object?.featureCodes)
        ? object.featureCodes.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: GetFeatureEnabledRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    if (message.featureCodes) {
      obj.featureCodes = message.featureCodes.map((e) => e);
    } else {
      obj.featureCodes = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetFeatureEnabledRequest>, I>>(
    object: I
  ): GetFeatureEnabledRequest {
    const message = createBaseGetFeatureEnabledRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.featureCodes = object.featureCodes?.map((e) => e) || [];
    return message;
  },
};

function createBaseGetFeatureEnabledResponse(): GetFeatureEnabledResponse {
  return { header: undefined, featureEnabled: {} };
}

export const GetFeatureEnabledResponse = {
  encode(
    message: GetFeatureEnabledResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    Object.entries(message.featureEnabled).forEach(([key, value]) => {
      GetFeatureEnabledResponse_FeatureEnabledEntry.encode(
        { key: key as any, value },
        writer.uint32(18).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetFeatureEnabledResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetFeatureEnabledResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          const entry2 = GetFeatureEnabledResponse_FeatureEnabledEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry2.value !== undefined) {
            message.featureEnabled[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetFeatureEnabledResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      featureEnabled: isObject(object.featureEnabled)
        ? Object.entries(object.featureEnabled).reduce<{
            [key: string]: boolean;
          }>((acc, [key, value]) => {
            acc[key] = Boolean(value);
            return acc;
          }, {})
        : {},
    };
  },

  toJSON(message: GetFeatureEnabledResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    obj.featureEnabled = {};
    if (message.featureEnabled) {
      Object.entries(message.featureEnabled).forEach(([k, v]) => {
        obj.featureEnabled[k] = v;
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetFeatureEnabledResponse>, I>>(
    object: I
  ): GetFeatureEnabledResponse {
    const message = createBaseGetFeatureEnabledResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.featureEnabled = Object.entries(
      object.featureEnabled ?? {}
    ).reduce<{ [key: string]: boolean }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = Boolean(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseGetFeatureEnabledResponse_FeatureEnabledEntry(): GetFeatureEnabledResponse_FeatureEnabledEntry {
  return { key: "", value: false };
}

export const GetFeatureEnabledResponse_FeatureEnabledEntry = {
  encode(
    message: GetFeatureEnabledResponse_FeatureEnabledEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value === true) {
      writer.uint32(16).bool(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetFeatureEnabledResponse_FeatureEnabledEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetFeatureEnabledResponse_FeatureEnabledEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetFeatureEnabledResponse_FeatureEnabledEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? Boolean(object.value) : false,
    };
  },

  toJSON(message: GetFeatureEnabledResponse_FeatureEnabledEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<
    I extends Exact<
      DeepPartial<GetFeatureEnabledResponse_FeatureEnabledEntry>,
      I
    >
  >(object: I): GetFeatureEnabledResponse_FeatureEnabledEntry {
    const message = createBaseGetFeatureEnabledResponse_FeatureEnabledEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? false;
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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
