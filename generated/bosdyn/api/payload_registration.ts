/* eslint-disable */
import { RequestHeader, ResponseHeader } from "./header";
import { Payload } from "./payload";
import { SoftwareVersion } from "./robot_id";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/**
 * The RegisterPayload request message contains the payload information and secret to be
 * able to register it to the directory.
 */
export interface RegisterPayloadRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /**
   * The payload to register, which must have, at minimum, GUID specified correctly.
   * The admin console can be used to verify that the payload definition is valid
   * after registration.
   */
  payload: Payload | undefined;
  /** A private string provided by the payload to verify identity for auth. */
  payloadSecret: string;
}

/**
 * The RegisterPayload response message contains the status of whether the payload was successfully
 * registered to the directory.
 */
export interface RegisterPayloadResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Return status for the request. */
  status: RegisterPayloadResponse_Status;
}

export enum RegisterPayloadResponse_Status {
  /** STATUS_UNKNOWN - UNKNOWN should never be used. An internal PayloadRegistrationService issue has happened if UNKNOWN is set. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Success.  The new service record is available. */
  STATUS_OK = 1,
  /** STATUS_ALREADY_EXISTS - RegisterPayload failed because a payload with this GUID already exists. */
  STATUS_ALREADY_EXISTS = 2,
  UNRECOGNIZED = -1,
}

export function registerPayloadResponse_StatusFromJSON(
  object: any
): RegisterPayloadResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return RegisterPayloadResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return RegisterPayloadResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_ALREADY_EXISTS":
      return RegisterPayloadResponse_Status.STATUS_ALREADY_EXISTS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RegisterPayloadResponse_Status.UNRECOGNIZED;
  }
}

export function registerPayloadResponse_StatusToJSON(
  object: RegisterPayloadResponse_Status
): string {
  switch (object) {
    case RegisterPayloadResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case RegisterPayloadResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case RegisterPayloadResponse_Status.STATUS_ALREADY_EXISTS:
      return "STATUS_ALREADY_EXISTS";
    case RegisterPayloadResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Update the payload definition of the payload with matching GUID. The existing payload must
 * have a secret set and the request must provide the secret for access.
 * GUID and is_authorized fields are immutable and cannot be updated.
 */
export interface UpdatePayloadVersionRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Payload credentials. */
  payloadCredentials: PayloadCredentials | undefined;
  /**
   * The GUID of the payload to be updated.
   *
   * @deprecated
   */
  payloadGuid: string;
  /**
   * The payload secret for the specified payload.
   *
   * @deprecated
   */
  payloadSecret: string;
  /** The new software version that the payload is being updated to. */
  updatedVersion: SoftwareVersion | undefined;
}

/** The UpdatePayloadVersion response message contains the status of whether the update was successful. */
export interface UpdatePayloadVersionResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Return status for the request. */
  status: UpdatePayloadVersionResponse_Status;
}

export enum UpdatePayloadVersionResponse_Status {
  /** STATUS_UNKNOWN - UNKNOWN should never be used. An internal PayloadRegistrationService issue has happened if UNKNOWN is set. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Success.  The payload version has been updated. */
  STATUS_OK = 1,
  /** STATUS_DOES_NOT_EXIST - UpdatePayload failed because a payload with this GUID does not yet exist. */
  STATUS_DOES_NOT_EXIST = 2,
  /** STATUS_INVALID_CREDENTIALS - UpdatePayload failed because the paylod guid & secret do not match any registered payloads. */
  STATUS_INVALID_CREDENTIALS = 3,
  UNRECOGNIZED = -1,
}

export function updatePayloadVersionResponse_StatusFromJSON(
  object: any
): UpdatePayloadVersionResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return UpdatePayloadVersionResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return UpdatePayloadVersionResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_DOES_NOT_EXIST":
      return UpdatePayloadVersionResponse_Status.STATUS_DOES_NOT_EXIST;
    case 3:
    case "STATUS_INVALID_CREDENTIALS":
      return UpdatePayloadVersionResponse_Status.STATUS_INVALID_CREDENTIALS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return UpdatePayloadVersionResponse_Status.UNRECOGNIZED;
  }
}

export function updatePayloadVersionResponse_StatusToJSON(
  object: UpdatePayloadVersionResponse_Status
): string {
  switch (object) {
    case UpdatePayloadVersionResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case UpdatePayloadVersionResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case UpdatePayloadVersionResponse_Status.STATUS_DOES_NOT_EXIST:
      return "STATUS_DOES_NOT_EXIST";
    case UpdatePayloadVersionResponse_Status.STATUS_INVALID_CREDENTIALS:
      return "STATUS_INVALID_CREDENTIALS";
    case UpdatePayloadVersionResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Request a user token from the robot
 * A token will only be provided after the registered payload has been enabled by an admin.
 * The returned user token will have limited access to the services necessary for a simple payload.
 */
export interface GetPayloadAuthTokenRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Payload credentials. */
  payloadCredentials: PayloadCredentials | undefined;
  /**
   * The GUID to identify which payload to get the auth token for.
   *
   * @deprecated
   */
  payloadGuid: string;
  /**
   * The payload secret for the specified payload.
   *
   * @deprecated
   */
  payloadSecret: string;
}

/** The GetPayloadAuthToken response message that returns the token for the payload. */
export interface GetPayloadAuthTokenResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Return status for the request. */
  status: GetPayloadAuthTokenResponse_Status;
  /** A limited-access user token provided on successful payload registration */
  token: string;
}

export enum GetPayloadAuthTokenResponse_Status {
  /** STATUS_UNKNOWN - UNKNOWN should never be used. An internal PayloadRegistrationService issue has happened if UNKNOWN is set. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Success.  The token is available. */
  STATUS_OK = 1,
  /** STATUS_INVALID_CREDENTIALS - GetPayloadAuthToken failed because the paylod guid & secret do not match any registered payloads. */
  STATUS_INVALID_CREDENTIALS = 2,
  /** STATUS_PAYLOAD_NOT_AUTHORIZED - GetPayloadAuthToken failed because the paylod has not been authorized by an admin. */
  STATUS_PAYLOAD_NOT_AUTHORIZED = 3,
  UNRECOGNIZED = -1,
}

export function getPayloadAuthTokenResponse_StatusFromJSON(
  object: any
): GetPayloadAuthTokenResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return GetPayloadAuthTokenResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return GetPayloadAuthTokenResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_INVALID_CREDENTIALS":
      return GetPayloadAuthTokenResponse_Status.STATUS_INVALID_CREDENTIALS;
    case 3:
    case "STATUS_PAYLOAD_NOT_AUTHORIZED":
      return GetPayloadAuthTokenResponse_Status.STATUS_PAYLOAD_NOT_AUTHORIZED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GetPayloadAuthTokenResponse_Status.UNRECOGNIZED;
  }
}

export function getPayloadAuthTokenResponse_StatusToJSON(
  object: GetPayloadAuthTokenResponse_Status
): string {
  switch (object) {
    case GetPayloadAuthTokenResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case GetPayloadAuthTokenResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case GetPayloadAuthTokenResponse_Status.STATUS_INVALID_CREDENTIALS:
      return "STATUS_INVALID_CREDENTIALS";
    case GetPayloadAuthTokenResponse_Status.STATUS_PAYLOAD_NOT_AUTHORIZED:
      return "STATUS_PAYLOAD_NOT_AUTHORIZED";
    case GetPayloadAuthTokenResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Attach/detach the payload with the matching GUID. The existing payload must
 * have a secret set and the request must provide the secret for access.
 * GUID is immutable and cannot be updated.
 */
export interface UpdatePayloadAttachedRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Payload credentials, used to identify the payload and authorize the changes. */
  payloadCredentials: PayloadCredentials | undefined;
  /** Attach or detach the payload. */
  request: UpdatePayloadAttachedRequest_Request;
}

export enum UpdatePayloadAttachedRequest_Request {
  REQUEST_UNKNOWN = 0,
  REQUEST_ATTACH = 1,
  REQUEST_DETACH = 2,
  UNRECOGNIZED = -1,
}

export function updatePayloadAttachedRequest_RequestFromJSON(
  object: any
): UpdatePayloadAttachedRequest_Request {
  switch (object) {
    case 0:
    case "REQUEST_UNKNOWN":
      return UpdatePayloadAttachedRequest_Request.REQUEST_UNKNOWN;
    case 1:
    case "REQUEST_ATTACH":
      return UpdatePayloadAttachedRequest_Request.REQUEST_ATTACH;
    case 2:
    case "REQUEST_DETACH":
      return UpdatePayloadAttachedRequest_Request.REQUEST_DETACH;
    case -1:
    case "UNRECOGNIZED":
    default:
      return UpdatePayloadAttachedRequest_Request.UNRECOGNIZED;
  }
}

export function updatePayloadAttachedRequest_RequestToJSON(
  object: UpdatePayloadAttachedRequest_Request
): string {
  switch (object) {
    case UpdatePayloadAttachedRequest_Request.REQUEST_UNKNOWN:
      return "REQUEST_UNKNOWN";
    case UpdatePayloadAttachedRequest_Request.REQUEST_ATTACH:
      return "REQUEST_ATTACH";
    case UpdatePayloadAttachedRequest_Request.REQUEST_DETACH:
      return "REQUEST_DETACH";
    case UpdatePayloadAttachedRequest_Request.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** The UpdatePayloadAttached response message contains the status of whether the update was successful. */
export interface UpdatePayloadAttachedResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Return status for the request. */
  status: UpdatePayloadAttachedResponse_Status;
}

export enum UpdatePayloadAttachedResponse_Status {
  /** STATUS_UNKNOWN - UNKNOWN should never be used. An internal PayloadRegistrationService issue has happened if UNKNOWN is set. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Success.  The payload version has been updated. */
  STATUS_OK = 1,
  /** STATUS_DOES_NOT_EXIST - UpdatePayloadAttached failed because a payload with this GUID does not yet exist. */
  STATUS_DOES_NOT_EXIST = 2,
  /** STATUS_INVALID_CREDENTIALS - UpdatePayloadAttached failed because the paylod guid & secret do not match any registered payloads. */
  STATUS_INVALID_CREDENTIALS = 3,
  /**
   * STATUS_PAYLOAD_NOT_AUTHORIZED - UpdatePayloadAttached failed because the requested payload has not yet been authorized.
   * Authorize the payload in the webserver first, then try again.
   */
  STATUS_PAYLOAD_NOT_AUTHORIZED = 4,
  UNRECOGNIZED = -1,
}

export function updatePayloadAttachedResponse_StatusFromJSON(
  object: any
): UpdatePayloadAttachedResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return UpdatePayloadAttachedResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return UpdatePayloadAttachedResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_DOES_NOT_EXIST":
      return UpdatePayloadAttachedResponse_Status.STATUS_DOES_NOT_EXIST;
    case 3:
    case "STATUS_INVALID_CREDENTIALS":
      return UpdatePayloadAttachedResponse_Status.STATUS_INVALID_CREDENTIALS;
    case 4:
    case "STATUS_PAYLOAD_NOT_AUTHORIZED":
      return UpdatePayloadAttachedResponse_Status.STATUS_PAYLOAD_NOT_AUTHORIZED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return UpdatePayloadAttachedResponse_Status.UNRECOGNIZED;
  }
}

export function updatePayloadAttachedResponse_StatusToJSON(
  object: UpdatePayloadAttachedResponse_Status
): string {
  switch (object) {
    case UpdatePayloadAttachedResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case UpdatePayloadAttachedResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case UpdatePayloadAttachedResponse_Status.STATUS_DOES_NOT_EXIST:
      return "STATUS_DOES_NOT_EXIST";
    case UpdatePayloadAttachedResponse_Status.STATUS_INVALID_CREDENTIALS:
      return "STATUS_INVALID_CREDENTIALS";
    case UpdatePayloadAttachedResponse_Status.STATUS_PAYLOAD_NOT_AUTHORIZED:
      return "STATUS_PAYLOAD_NOT_AUTHORIZED";
    case UpdatePayloadAttachedResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** PayloadCredentials are used to authorize a payload. */
export interface PayloadCredentials {
  /** The GUID of the payload. */
  guid: string;
  /** The secret of the payload. */
  secret: string;
}

function createBaseRegisterPayloadRequest(): RegisterPayloadRequest {
  return { header: undefined, payload: undefined, payloadSecret: "" };
}

export const RegisterPayloadRequest = {
  encode(
    message: RegisterPayloadRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.payload !== undefined) {
      Payload.encode(message.payload, writer.uint32(18).fork()).ldelim();
    }
    if (message.payloadSecret !== "") {
      writer.uint32(26).string(message.payloadSecret);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RegisterPayloadRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterPayloadRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.payload = Payload.decode(reader, reader.uint32());
          break;
        case 3:
          message.payloadSecret = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegisterPayloadRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      payload: isSet(object.payload)
        ? Payload.fromJSON(object.payload)
        : undefined,
      payloadSecret: isSet(object.payloadSecret)
        ? String(object.payloadSecret)
        : "",
    };
  },

  toJSON(message: RegisterPayloadRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.payload !== undefined &&
      (obj.payload = message.payload
        ? Payload.toJSON(message.payload)
        : undefined);
    message.payloadSecret !== undefined &&
      (obj.payloadSecret = message.payloadSecret);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RegisterPayloadRequest>, I>>(
    object: I
  ): RegisterPayloadRequest {
    const message = createBaseRegisterPayloadRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.payload =
      object.payload !== undefined && object.payload !== null
        ? Payload.fromPartial(object.payload)
        : undefined;
    message.payloadSecret = object.payloadSecret ?? "";
    return message;
  },
};

function createBaseRegisterPayloadResponse(): RegisterPayloadResponse {
  return { header: undefined, status: 0 };
}

export const RegisterPayloadResponse = {
  encode(
    message: RegisterPayloadResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RegisterPayloadResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterPayloadResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegisterPayloadResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? registerPayloadResponse_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: RegisterPayloadResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = registerPayloadResponse_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RegisterPayloadResponse>, I>>(
    object: I
  ): RegisterPayloadResponse {
    const message = createBaseRegisterPayloadResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseUpdatePayloadVersionRequest(): UpdatePayloadVersionRequest {
  return {
    header: undefined,
    payloadCredentials: undefined,
    payloadGuid: "",
    payloadSecret: "",
    updatedVersion: undefined,
  };
}

export const UpdatePayloadVersionRequest = {
  encode(
    message: UpdatePayloadVersionRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.payloadCredentials !== undefined) {
      PayloadCredentials.encode(
        message.payloadCredentials,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.payloadGuid !== "") {
      writer.uint32(18).string(message.payloadGuid);
    }
    if (message.payloadSecret !== "") {
      writer.uint32(26).string(message.payloadSecret);
    }
    if (message.updatedVersion !== undefined) {
      SoftwareVersion.encode(
        message.updatedVersion,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UpdatePayloadVersionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdatePayloadVersionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 5:
          message.payloadCredentials = PayloadCredentials.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.payloadGuid = reader.string();
          break;
        case 3:
          message.payloadSecret = reader.string();
          break;
        case 4:
          message.updatedVersion = SoftwareVersion.decode(
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

  fromJSON(object: any): UpdatePayloadVersionRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      payloadCredentials: isSet(object.payloadCredentials)
        ? PayloadCredentials.fromJSON(object.payloadCredentials)
        : undefined,
      payloadGuid: isSet(object.payloadGuid) ? String(object.payloadGuid) : "",
      payloadSecret: isSet(object.payloadSecret)
        ? String(object.payloadSecret)
        : "",
      updatedVersion: isSet(object.updatedVersion)
        ? SoftwareVersion.fromJSON(object.updatedVersion)
        : undefined,
    };
  },

  toJSON(message: UpdatePayloadVersionRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.payloadCredentials !== undefined &&
      (obj.payloadCredentials = message.payloadCredentials
        ? PayloadCredentials.toJSON(message.payloadCredentials)
        : undefined);
    message.payloadGuid !== undefined &&
      (obj.payloadGuid = message.payloadGuid);
    message.payloadSecret !== undefined &&
      (obj.payloadSecret = message.payloadSecret);
    message.updatedVersion !== undefined &&
      (obj.updatedVersion = message.updatedVersion
        ? SoftwareVersion.toJSON(message.updatedVersion)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdatePayloadVersionRequest>, I>>(
    object: I
  ): UpdatePayloadVersionRequest {
    const message = createBaseUpdatePayloadVersionRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.payloadCredentials =
      object.payloadCredentials !== undefined &&
      object.payloadCredentials !== null
        ? PayloadCredentials.fromPartial(object.payloadCredentials)
        : undefined;
    message.payloadGuid = object.payloadGuid ?? "";
    message.payloadSecret = object.payloadSecret ?? "";
    message.updatedVersion =
      object.updatedVersion !== undefined && object.updatedVersion !== null
        ? SoftwareVersion.fromPartial(object.updatedVersion)
        : undefined;
    return message;
  },
};

function createBaseUpdatePayloadVersionResponse(): UpdatePayloadVersionResponse {
  return { header: undefined, status: 0 };
}

export const UpdatePayloadVersionResponse = {
  encode(
    message: UpdatePayloadVersionResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UpdatePayloadVersionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdatePayloadVersionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdatePayloadVersionResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? updatePayloadVersionResponse_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: UpdatePayloadVersionResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = updatePayloadVersionResponse_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdatePayloadVersionResponse>, I>>(
    object: I
  ): UpdatePayloadVersionResponse {
    const message = createBaseUpdatePayloadVersionResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseGetPayloadAuthTokenRequest(): GetPayloadAuthTokenRequest {
  return {
    header: undefined,
    payloadCredentials: undefined,
    payloadGuid: "",
    payloadSecret: "",
  };
}

export const GetPayloadAuthTokenRequest = {
  encode(
    message: GetPayloadAuthTokenRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.payloadCredentials !== undefined) {
      PayloadCredentials.encode(
        message.payloadCredentials,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.payloadGuid !== "") {
      writer.uint32(18).string(message.payloadGuid);
    }
    if (message.payloadSecret !== "") {
      writer.uint32(26).string(message.payloadSecret);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetPayloadAuthTokenRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPayloadAuthTokenRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 4:
          message.payloadCredentials = PayloadCredentials.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.payloadGuid = reader.string();
          break;
        case 3:
          message.payloadSecret = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetPayloadAuthTokenRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      payloadCredentials: isSet(object.payloadCredentials)
        ? PayloadCredentials.fromJSON(object.payloadCredentials)
        : undefined,
      payloadGuid: isSet(object.payloadGuid) ? String(object.payloadGuid) : "",
      payloadSecret: isSet(object.payloadSecret)
        ? String(object.payloadSecret)
        : "",
    };
  },

  toJSON(message: GetPayloadAuthTokenRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.payloadCredentials !== undefined &&
      (obj.payloadCredentials = message.payloadCredentials
        ? PayloadCredentials.toJSON(message.payloadCredentials)
        : undefined);
    message.payloadGuid !== undefined &&
      (obj.payloadGuid = message.payloadGuid);
    message.payloadSecret !== undefined &&
      (obj.payloadSecret = message.payloadSecret);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetPayloadAuthTokenRequest>, I>>(
    object: I
  ): GetPayloadAuthTokenRequest {
    const message = createBaseGetPayloadAuthTokenRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.payloadCredentials =
      object.payloadCredentials !== undefined &&
      object.payloadCredentials !== null
        ? PayloadCredentials.fromPartial(object.payloadCredentials)
        : undefined;
    message.payloadGuid = object.payloadGuid ?? "";
    message.payloadSecret = object.payloadSecret ?? "";
    return message;
  },
};

function createBaseGetPayloadAuthTokenResponse(): GetPayloadAuthTokenResponse {
  return { header: undefined, status: 0, token: "" };
}

export const GetPayloadAuthTokenResponse = {
  encode(
    message: GetPayloadAuthTokenResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.token !== "") {
      writer.uint32(26).string(message.token);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetPayloadAuthTokenResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPayloadAuthTokenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        case 3:
          message.token = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetPayloadAuthTokenResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? getPayloadAuthTokenResponse_StatusFromJSON(object.status)
        : 0,
      token: isSet(object.token) ? String(object.token) : "",
    };
  },

  toJSON(message: GetPayloadAuthTokenResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = getPayloadAuthTokenResponse_StatusToJSON(message.status));
    message.token !== undefined && (obj.token = message.token);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetPayloadAuthTokenResponse>, I>>(
    object: I
  ): GetPayloadAuthTokenResponse {
    const message = createBaseGetPayloadAuthTokenResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    message.token = object.token ?? "";
    return message;
  },
};

function createBaseUpdatePayloadAttachedRequest(): UpdatePayloadAttachedRequest {
  return { header: undefined, payloadCredentials: undefined, request: 0 };
}

export const UpdatePayloadAttachedRequest = {
  encode(
    message: UpdatePayloadAttachedRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.payloadCredentials !== undefined) {
      PayloadCredentials.encode(
        message.payloadCredentials,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.request !== 0) {
      writer.uint32(24).int32(message.request);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UpdatePayloadAttachedRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdatePayloadAttachedRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.payloadCredentials = PayloadCredentials.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.request = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdatePayloadAttachedRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      payloadCredentials: isSet(object.payloadCredentials)
        ? PayloadCredentials.fromJSON(object.payloadCredentials)
        : undefined,
      request: isSet(object.request)
        ? updatePayloadAttachedRequest_RequestFromJSON(object.request)
        : 0,
    };
  },

  toJSON(message: UpdatePayloadAttachedRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.payloadCredentials !== undefined &&
      (obj.payloadCredentials = message.payloadCredentials
        ? PayloadCredentials.toJSON(message.payloadCredentials)
        : undefined);
    message.request !== undefined &&
      (obj.request = updatePayloadAttachedRequest_RequestToJSON(
        message.request
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdatePayloadAttachedRequest>, I>>(
    object: I
  ): UpdatePayloadAttachedRequest {
    const message = createBaseUpdatePayloadAttachedRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.payloadCredentials =
      object.payloadCredentials !== undefined &&
      object.payloadCredentials !== null
        ? PayloadCredentials.fromPartial(object.payloadCredentials)
        : undefined;
    message.request = object.request ?? 0;
    return message;
  },
};

function createBaseUpdatePayloadAttachedResponse(): UpdatePayloadAttachedResponse {
  return { header: undefined, status: 0 };
}

export const UpdatePayloadAttachedResponse = {
  encode(
    message: UpdatePayloadAttachedResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UpdatePayloadAttachedResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdatePayloadAttachedResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdatePayloadAttachedResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? updatePayloadAttachedResponse_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: UpdatePayloadAttachedResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = updatePayloadAttachedResponse_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdatePayloadAttachedResponse>, I>>(
    object: I
  ): UpdatePayloadAttachedResponse {
    const message = createBaseUpdatePayloadAttachedResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    return message;
  },
};

function createBasePayloadCredentials(): PayloadCredentials {
  return { guid: "", secret: "" };
}

export const PayloadCredentials = {
  encode(
    message: PayloadCredentials,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guid !== "") {
      writer.uint32(10).string(message.guid);
    }
    if (message.secret !== "") {
      writer.uint32(18).string(message.secret);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PayloadCredentials {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePayloadCredentials();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guid = reader.string();
          break;
        case 2:
          message.secret = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PayloadCredentials {
    return {
      guid: isSet(object.guid) ? String(object.guid) : "",
      secret: isSet(object.secret) ? String(object.secret) : "",
    };
  },

  toJSON(message: PayloadCredentials): unknown {
    const obj: any = {};
    message.guid !== undefined && (obj.guid = message.guid);
    message.secret !== undefined && (obj.secret = message.secret);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PayloadCredentials>, I>>(
    object: I
  ): PayloadCredentials {
    const message = createBasePayloadCredentials();
    message.guid = object.guid ?? "";
    message.secret = object.secret ?? "";
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
