/* eslint-disable */
import { RequestHeader, ResponseHeader } from "../header";
import { SoftwareVersion } from "../robot_id";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api.spot_cam";

/** Request the software version running on the SpotCam. */
export interface GetSoftwareVersionRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/** Provide the SpotCam's software release version. */
export interface GetSoftwareVersionResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Version of the software currently running on the SpotCam. */
  version: SoftwareVersion | undefined;
  /**
   * Extra detail about the version of software running on spotcam.
   * May contain metadata about build dates and configuration.
   */
  detail: string;
}

function createBaseGetSoftwareVersionRequest(): GetSoftwareVersionRequest {
  return { header: undefined };
}

export const GetSoftwareVersionRequest = {
  encode(
    message: GetSoftwareVersionRequest,
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
  ): GetSoftwareVersionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSoftwareVersionRequest();
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

  fromJSON(object: any): GetSoftwareVersionRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: GetSoftwareVersionRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetSoftwareVersionRequest>, I>>(
    object: I
  ): GetSoftwareVersionRequest {
    const message = createBaseGetSoftwareVersionRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseGetSoftwareVersionResponse(): GetSoftwareVersionResponse {
  return { header: undefined, version: undefined, detail: "" };
}

export const GetSoftwareVersionResponse = {
  encode(
    message: GetSoftwareVersionResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.version !== undefined) {
      SoftwareVersion.encode(
        message.version,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.detail !== "") {
      writer.uint32(26).string(message.detail);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetSoftwareVersionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSoftwareVersionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.version = SoftwareVersion.decode(reader, reader.uint32());
          break;
        case 3:
          message.detail = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetSoftwareVersionResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      version: isSet(object.version)
        ? SoftwareVersion.fromJSON(object.version)
        : undefined,
      detail: isSet(object.detail) ? String(object.detail) : "",
    };
  },

  toJSON(message: GetSoftwareVersionResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.version !== undefined &&
      (obj.version = message.version
        ? SoftwareVersion.toJSON(message.version)
        : undefined);
    message.detail !== undefined && (obj.detail = message.detail);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetSoftwareVersionResponse>, I>>(
    object: I
  ): GetSoftwareVersionResponse {
    const message = createBaseGetSoftwareVersionResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.version =
      object.version !== undefined && object.version !== null
        ? SoftwareVersion.fromPartial(object.version)
        : undefined;
    message.detail = object.detail ?? "";
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
