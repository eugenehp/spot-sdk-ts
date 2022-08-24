/* eslint-disable */
import { RequestHeader, ResponseHeader } from "./header";
import { Lease } from "./lease";
import { ArmSurfaceContact_Request } from "./arm_surface_contact";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

export interface ArmSurfaceContactCommand {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** The Lease to show ownership of the robot. */
  lease: Lease | undefined;
  request: ArmSurfaceContact_Request | undefined;
}

export interface ArmSurfaceContactResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
}

function createBaseArmSurfaceContactCommand(): ArmSurfaceContactCommand {
  return { header: undefined, lease: undefined, request: undefined };
}

export const ArmSurfaceContactCommand = {
  encode(
    message: ArmSurfaceContactCommand,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.lease !== undefined) {
      Lease.encode(message.lease, writer.uint32(18).fork()).ldelim();
    }
    if (message.request !== undefined) {
      ArmSurfaceContact_Request.encode(
        message.request,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ArmSurfaceContactCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArmSurfaceContactCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.lease = Lease.decode(reader, reader.uint32());
          break;
        case 4:
          message.request = ArmSurfaceContact_Request.decode(
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

  fromJSON(object: any): ArmSurfaceContactCommand {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      lease: isSet(object.lease) ? Lease.fromJSON(object.lease) : undefined,
      request: isSet(object.request)
        ? ArmSurfaceContact_Request.fromJSON(object.request)
        : undefined,
    };
  },

  toJSON(message: ArmSurfaceContactCommand): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.lease !== undefined &&
      (obj.lease = message.lease ? Lease.toJSON(message.lease) : undefined);
    message.request !== undefined &&
      (obj.request = message.request
        ? ArmSurfaceContact_Request.toJSON(message.request)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ArmSurfaceContactCommand>, I>>(
    object: I
  ): ArmSurfaceContactCommand {
    const message = createBaseArmSurfaceContactCommand();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.lease =
      object.lease !== undefined && object.lease !== null
        ? Lease.fromPartial(object.lease)
        : undefined;
    message.request =
      object.request !== undefined && object.request !== null
        ? ArmSurfaceContact_Request.fromPartial(object.request)
        : undefined;
    return message;
  },
};

function createBaseArmSurfaceContactResponse(): ArmSurfaceContactResponse {
  return { header: undefined };
}

export const ArmSurfaceContactResponse = {
  encode(
    message: ArmSurfaceContactResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ArmSurfaceContactResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArmSurfaceContactResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ArmSurfaceContactResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: ArmSurfaceContactResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ArmSurfaceContactResponse>, I>>(
    object: I
  ): ArmSurfaceContactResponse {
    const message = createBaseArmSurfaceContactResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

export interface ArmSurfaceContactService {
  ArmSurfaceContact(
    request: ArmSurfaceContactCommand
  ): Promise<ArmSurfaceContactResponse>;
}

export class ArmSurfaceContactServiceClientImpl
  implements ArmSurfaceContactService
{
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ArmSurfaceContact = this.ArmSurfaceContact.bind(this);
  }
  ArmSurfaceContact(
    request: ArmSurfaceContactCommand
  ): Promise<ArmSurfaceContactResponse> {
    const data = ArmSurfaceContactCommand.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.ArmSurfaceContactService",
      "ArmSurfaceContact",
      data
    );
    return promise.then((data) =>
      ArmSurfaceContactResponse.decode(new _m0.Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
