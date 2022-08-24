/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp";
import { Parameter } from "./parameter";
import { RequestHeader, ResponseHeader } from "./header";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/** Robot identity information, which should be static while robot is powered-on. */
export interface RobotId {
  /** A unique string identifier for the particular robot. */
  serialNumber: string;
  /** Type of robot.  E.g., 'spot'. */
  species: string;
  /** Robot version/platform. */
  version: string;
  /** Version information about software running on the robot. */
  softwareRelease: RobotSoftwareRelease | undefined;
  /** Optional, customer-supplied nickname. */
  nickname: string;
  /**
   * Computer Serial Number. Unlike serial_number, which identifies a complete robot,
   * the computer_serial_number identifies the computer hardware used in the robot.
   */
  computerSerialNumber: string;
}

/** The software versioning number for a release. */
export interface SoftwareVersion {
  /** Signficant changes to software. */
  majorVersion: number;
  /** Normal changes to software. */
  minorVersion: number;
  /** Fixes which should not change intended capabilities or affect compatibility. */
  patchLevel: number;
}

/** Description of the software release currently running on the robot. */
export interface RobotSoftwareRelease {
  /** The software version, e.g., 2.0.1 */
  version: SoftwareVersion | undefined;
  /** The name of the robot, e.g., '20190601' */
  name: string;
  /** Kind of software release. */
  type: string;
  /** Timestamp of the changeset. */
  changesetDate: Date | undefined;
  /** Changeset hash. */
  changeset: string;
  /** API version.  E.g., 2.14.5. */
  apiVersion: string;
  /** Extra information associated with the build. */
  buildInformation: string;
  /** Date/time when release was installed. */
  installDate: Date | undefined;
  /** Other information about the build. */
  parameters: Parameter[];
}

/** The RobotId request message sent to a robot to learn it's basic identification information. */
export interface RobotIdRequest {
  /** Common request/response header. */
  header: RequestHeader | undefined;
}

/** The RobotId response message, including the ID information for a robot. */
export interface RobotIdResponse {
  /** Common request/response header. */
  header: ResponseHeader | undefined;
  /** The requested RobotId information. */
  robotId: RobotId | undefined;
}

function createBaseRobotId(): RobotId {
  return {
    serialNumber: "",
    species: "",
    version: "",
    softwareRelease: undefined,
    nickname: "",
    computerSerialNumber: "",
  };
}

export const RobotId = {
  encode(
    message: RobotId,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.serialNumber !== "") {
      writer.uint32(10).string(message.serialNumber);
    }
    if (message.species !== "") {
      writer.uint32(18).string(message.species);
    }
    if (message.version !== "") {
      writer.uint32(26).string(message.version);
    }
    if (message.softwareRelease !== undefined) {
      RobotSoftwareRelease.encode(
        message.softwareRelease,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.nickname !== "") {
      writer.uint32(42).string(message.nickname);
    }
    if (message.computerSerialNumber !== "") {
      writer.uint32(50).string(message.computerSerialNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RobotId {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRobotId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serialNumber = reader.string();
          break;
        case 2:
          message.species = reader.string();
          break;
        case 3:
          message.version = reader.string();
          break;
        case 4:
          message.softwareRelease = RobotSoftwareRelease.decode(
            reader,
            reader.uint32()
          );
          break;
        case 5:
          message.nickname = reader.string();
          break;
        case 6:
          message.computerSerialNumber = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RobotId {
    return {
      serialNumber: isSet(object.serialNumber)
        ? String(object.serialNumber)
        : "",
      species: isSet(object.species) ? String(object.species) : "",
      version: isSet(object.version) ? String(object.version) : "",
      softwareRelease: isSet(object.softwareRelease)
        ? RobotSoftwareRelease.fromJSON(object.softwareRelease)
        : undefined,
      nickname: isSet(object.nickname) ? String(object.nickname) : "",
      computerSerialNumber: isSet(object.computerSerialNumber)
        ? String(object.computerSerialNumber)
        : "",
    };
  },

  toJSON(message: RobotId): unknown {
    const obj: any = {};
    message.serialNumber !== undefined &&
      (obj.serialNumber = message.serialNumber);
    message.species !== undefined && (obj.species = message.species);
    message.version !== undefined && (obj.version = message.version);
    message.softwareRelease !== undefined &&
      (obj.softwareRelease = message.softwareRelease
        ? RobotSoftwareRelease.toJSON(message.softwareRelease)
        : undefined);
    message.nickname !== undefined && (obj.nickname = message.nickname);
    message.computerSerialNumber !== undefined &&
      (obj.computerSerialNumber = message.computerSerialNumber);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RobotId>, I>>(object: I): RobotId {
    const message = createBaseRobotId();
    message.serialNumber = object.serialNumber ?? "";
    message.species = object.species ?? "";
    message.version = object.version ?? "";
    message.softwareRelease =
      object.softwareRelease !== undefined && object.softwareRelease !== null
        ? RobotSoftwareRelease.fromPartial(object.softwareRelease)
        : undefined;
    message.nickname = object.nickname ?? "";
    message.computerSerialNumber = object.computerSerialNumber ?? "";
    return message;
  },
};

function createBaseSoftwareVersion(): SoftwareVersion {
  return { majorVersion: 0, minorVersion: 0, patchLevel: 0 };
}

export const SoftwareVersion = {
  encode(
    message: SoftwareVersion,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.majorVersion !== 0) {
      writer.uint32(8).int32(message.majorVersion);
    }
    if (message.minorVersion !== 0) {
      writer.uint32(16).int32(message.minorVersion);
    }
    if (message.patchLevel !== 0) {
      writer.uint32(24).int32(message.patchLevel);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SoftwareVersion {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSoftwareVersion();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.majorVersion = reader.int32();
          break;
        case 2:
          message.minorVersion = reader.int32();
          break;
        case 3:
          message.patchLevel = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SoftwareVersion {
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

  toJSON(message: SoftwareVersion): unknown {
    const obj: any = {};
    message.majorVersion !== undefined &&
      (obj.majorVersion = Math.round(message.majorVersion));
    message.minorVersion !== undefined &&
      (obj.minorVersion = Math.round(message.minorVersion));
    message.patchLevel !== undefined &&
      (obj.patchLevel = Math.round(message.patchLevel));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SoftwareVersion>, I>>(
    object: I
  ): SoftwareVersion {
    const message = createBaseSoftwareVersion();
    message.majorVersion = object.majorVersion ?? 0;
    message.minorVersion = object.minorVersion ?? 0;
    message.patchLevel = object.patchLevel ?? 0;
    return message;
  },
};

function createBaseRobotSoftwareRelease(): RobotSoftwareRelease {
  return {
    version: undefined,
    name: "",
    type: "",
    changesetDate: undefined,
    changeset: "",
    apiVersion: "",
    buildInformation: "",
    installDate: undefined,
    parameters: [],
  };
}

export const RobotSoftwareRelease = {
  encode(
    message: RobotSoftwareRelease,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.version !== undefined) {
      SoftwareVersion.encode(
        message.version,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.type !== "") {
      writer.uint32(26).string(message.type);
    }
    if (message.changesetDate !== undefined) {
      Timestamp.encode(
        toTimestamp(message.changesetDate),
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.changeset !== "") {
      writer.uint32(42).string(message.changeset);
    }
    if (message.apiVersion !== "") {
      writer.uint32(50).string(message.apiVersion);
    }
    if (message.buildInformation !== "") {
      writer.uint32(58).string(message.buildInformation);
    }
    if (message.installDate !== undefined) {
      Timestamp.encode(
        toTimestamp(message.installDate),
        writer.uint32(66).fork()
      ).ldelim();
    }
    for (const v of message.parameters) {
      Parameter.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RobotSoftwareRelease {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRobotSoftwareRelease();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.version = SoftwareVersion.decode(reader, reader.uint32());
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.type = reader.string();
          break;
        case 4:
          message.changesetDate = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 5:
          message.changeset = reader.string();
          break;
        case 6:
          message.apiVersion = reader.string();
          break;
        case 7:
          message.buildInformation = reader.string();
          break;
        case 8:
          message.installDate = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 9:
          message.parameters.push(Parameter.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RobotSoftwareRelease {
    return {
      version: isSet(object.version)
        ? SoftwareVersion.fromJSON(object.version)
        : undefined,
      name: isSet(object.name) ? String(object.name) : "",
      type: isSet(object.type) ? String(object.type) : "",
      changesetDate: isSet(object.changesetDate)
        ? fromJsonTimestamp(object.changesetDate)
        : undefined,
      changeset: isSet(object.changeset) ? String(object.changeset) : "",
      apiVersion: isSet(object.apiVersion) ? String(object.apiVersion) : "",
      buildInformation: isSet(object.buildInformation)
        ? String(object.buildInformation)
        : "",
      installDate: isSet(object.installDate)
        ? fromJsonTimestamp(object.installDate)
        : undefined,
      parameters: Array.isArray(object?.parameters)
        ? object.parameters.map((e: any) => Parameter.fromJSON(e))
        : [],
    };
  },

  toJSON(message: RobotSoftwareRelease): unknown {
    const obj: any = {};
    message.version !== undefined &&
      (obj.version = message.version
        ? SoftwareVersion.toJSON(message.version)
        : undefined);
    message.name !== undefined && (obj.name = message.name);
    message.type !== undefined && (obj.type = message.type);
    message.changesetDate !== undefined &&
      (obj.changesetDate = message.changesetDate.toISOString());
    message.changeset !== undefined && (obj.changeset = message.changeset);
    message.apiVersion !== undefined && (obj.apiVersion = message.apiVersion);
    message.buildInformation !== undefined &&
      (obj.buildInformation = message.buildInformation);
    message.installDate !== undefined &&
      (obj.installDate = message.installDate.toISOString());
    if (message.parameters) {
      obj.parameters = message.parameters.map((e) =>
        e ? Parameter.toJSON(e) : undefined
      );
    } else {
      obj.parameters = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RobotSoftwareRelease>, I>>(
    object: I
  ): RobotSoftwareRelease {
    const message = createBaseRobotSoftwareRelease();
    message.version =
      object.version !== undefined && object.version !== null
        ? SoftwareVersion.fromPartial(object.version)
        : undefined;
    message.name = object.name ?? "";
    message.type = object.type ?? "";
    message.changesetDate = object.changesetDate ?? undefined;
    message.changeset = object.changeset ?? "";
    message.apiVersion = object.apiVersion ?? "";
    message.buildInformation = object.buildInformation ?? "";
    message.installDate = object.installDate ?? undefined;
    message.parameters =
      object.parameters?.map((e) => Parameter.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRobotIdRequest(): RobotIdRequest {
  return { header: undefined };
}

export const RobotIdRequest = {
  encode(
    message: RobotIdRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RobotIdRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRobotIdRequest();
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

  fromJSON(object: any): RobotIdRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: RobotIdRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RobotIdRequest>, I>>(
    object: I
  ): RobotIdRequest {
    const message = createBaseRobotIdRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseRobotIdResponse(): RobotIdResponse {
  return { header: undefined, robotId: undefined };
}

export const RobotIdResponse = {
  encode(
    message: RobotIdResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.robotId !== undefined) {
      RobotId.encode(message.robotId, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RobotIdResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRobotIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.robotId = RobotId.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RobotIdResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      robotId: isSet(object.robotId)
        ? RobotId.fromJSON(object.robotId)
        : undefined,
    };
  },

  toJSON(message: RobotIdResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.robotId !== undefined &&
      (obj.robotId = message.robotId
        ? RobotId.toJSON(message.robotId)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RobotIdResponse>, I>>(
    object: I
  ): RobotIdResponse {
    const message = createBaseRobotIdResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.robotId =
      object.robotId !== undefined && object.robotId !== null
        ? RobotId.fromPartial(object.robotId)
        : undefined;
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
