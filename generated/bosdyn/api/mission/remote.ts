/* eslint-disable */
import { RequestHeader, ResponseHeader } from "../header";
import { Lease, LeaseUseResult } from "../lease";
import { VariableDeclaration, KeyValue } from "./util";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api.mission";

/**
 * Information to initialize a session to the remote service
 * for a particular mission node.
 */
export interface EstablishSessionRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** All leases that the remote service may need. */
  leases: Lease[];
  /**
   * Use this to provide other data (e.g. from the blackboard).
   * The RemoteGrpc node will provide the name of the node automatically.
   */
  inputs: VariableDeclaration[];
}

/** Provide the id to use for the particular mission node to tick this remote service. */
export interface EstablishSessionResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Result of this establish session request. */
  status: EstablishSessionResponse_Status;
  /** On success, contains an ID for this session. */
  sessionId: string;
  /** Need to provide leases on these resources. */
  missingLeaseResources: string[];
  /**
   * Details about how any leases were used.
   * Allowed to be empty, if leases were not actually used.
   */
  leaseUseResults: LeaseUseResult[];
  /** The inputs required by the contacted node that were not mentioned in the request. */
  missingInputs: VariableDeclaration[];
}

/** Possible results of establishing a session. */
export enum EstablishSessionResponse_Status {
  /** STATUS_UNKNOWN - Status unknown/unset. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Provided inputs / outputs are compatible. */
  STATUS_OK = 1,
  /**
   * STATUS_MISSING_LEASES - Remote service needs leases on additional resources.
   * If set, the missing_lease_resources field should contain the resources needed but not
   * provided.
   */
  STATUS_MISSING_LEASES = 2,
  /** STATUS_MISSING_INPUTS - Remote service needs additional inputs. */
  STATUS_MISSING_INPUTS = 3,
  UNRECOGNIZED = -1,
}

export function establishSessionResponse_StatusFromJSON(
  object: any
): EstablishSessionResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return EstablishSessionResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return EstablishSessionResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_MISSING_LEASES":
      return EstablishSessionResponse_Status.STATUS_MISSING_LEASES;
    case 3:
    case "STATUS_MISSING_INPUTS":
      return EstablishSessionResponse_Status.STATUS_MISSING_INPUTS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return EstablishSessionResponse_Status.UNRECOGNIZED;
  }
}

export function establishSessionResponse_StatusToJSON(
  object: EstablishSessionResponse_Status
): string {
  switch (object) {
    case EstablishSessionResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case EstablishSessionResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case EstablishSessionResponse_Status.STATUS_MISSING_LEASES:
      return "STATUS_MISSING_LEASES";
    case EstablishSessionResponse_Status.STATUS_MISSING_INPUTS:
      return "STATUS_MISSING_INPUTS";
    case EstablishSessionResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Request that the remote tick itself for a particular node in the mission. */
export interface TickRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /**
   * Session ID as returned by the EstablishSessionResponse.
   * Used to guarantee coherence between a single client and a servicer.
   */
  sessionId: string;
  /** All leases that the remote service may need. */
  leases: Lease[];
  /** Inputs provided to the servicer. */
  inputs: KeyValue[];
}

/**
 * Response with the results of the tick.
 * Remote services should strive to return quickly, even if only returning RUNNING.
 */
export interface TickResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Result of the current tick. */
  status: TickResponse_Status;
  /** Need to provide leases on these resources. */
  missingLeaseResources: string[];
  /**
   * Details about how any leases were used.
   * Allowed to be empty, if leases were not actually used.
   */
  leaseUseResults: LeaseUseResult[];
  /**
   * Filled out when status is STATUS_MISSING_INPUTS, indicating what inputs were not in the
   * request.
   */
  missingInputs: VariableDeclaration[];
  /** If you need to report other error details, you can use this field. */
  errorMessage: string;
}

/**
 * Possible results from the node. The FAILURE, RUNNING, and SUCCESS statuses map to the
 * behavior tree terms, all others indicate an error in the TickRequest.
 */
export enum TickResponse_Status {
  /** STATUS_UNKNOWN - Invalid; do not use. */
  STATUS_UNKNOWN = 0,
  /** STATUS_FAILURE - Node completed but failed. */
  STATUS_FAILURE = 1,
  /** STATUS_RUNNING - Node is processing and may finish in a future tick. */
  STATUS_RUNNING = 2,
  /** STATUS_SUCCESS - Node completed and succeeded. */
  STATUS_SUCCESS = 3,
  /** STATUS_INVALID_SESSION_ID - The request provided an invalid session ID. */
  STATUS_INVALID_SESSION_ID = 4,
  /** STATUS_MISSING_LEASES - The request was missing required leases. */
  STATUS_MISSING_LEASES = 5,
  /** STATUS_MISSING_INPUTS - The request was missing required inputs. */
  STATUS_MISSING_INPUTS = 6,
  UNRECOGNIZED = -1,
}

export function tickResponse_StatusFromJSON(object: any): TickResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return TickResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_FAILURE":
      return TickResponse_Status.STATUS_FAILURE;
    case 2:
    case "STATUS_RUNNING":
      return TickResponse_Status.STATUS_RUNNING;
    case 3:
    case "STATUS_SUCCESS":
      return TickResponse_Status.STATUS_SUCCESS;
    case 4:
    case "STATUS_INVALID_SESSION_ID":
      return TickResponse_Status.STATUS_INVALID_SESSION_ID;
    case 5:
    case "STATUS_MISSING_LEASES":
      return TickResponse_Status.STATUS_MISSING_LEASES;
    case 6:
    case "STATUS_MISSING_INPUTS":
      return TickResponse_Status.STATUS_MISSING_INPUTS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TickResponse_Status.UNRECOGNIZED;
  }
}

export function tickResponse_StatusToJSON(object: TickResponse_Status): string {
  switch (object) {
    case TickResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case TickResponse_Status.STATUS_FAILURE:
      return "STATUS_FAILURE";
    case TickResponse_Status.STATUS_RUNNING:
      return "STATUS_RUNNING";
    case TickResponse_Status.STATUS_SUCCESS:
      return "STATUS_SUCCESS";
    case TickResponse_Status.STATUS_INVALID_SESSION_ID:
      return "STATUS_INVALID_SESSION_ID";
    case TickResponse_Status.STATUS_MISSING_LEASES:
      return "STATUS_MISSING_LEASES";
    case TickResponse_Status.STATUS_MISSING_INPUTS:
      return "STATUS_MISSING_INPUTS";
    case TickResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Used to stop a node that was previously ticked, so that it knows that
 * the next Tick represents a restart rather than a continuation.
 */
export interface StopRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /**
   * Session ID as returned by the EstablishSessionResponse.
   * Used to guarantee coherence between a single client and a servicer.
   */
  sessionId: string;
}

/** Results of attempting to stop a remote node. */
export interface StopResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Result of the stop request. */
  status: StopResponse_Status;
}

/** Possible results for a StopRequest. */
export enum StopResponse_Status {
  /** STATUS_UNKNOWN - Status unknown/unset. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Service stopped. */
  STATUS_OK = 1,
  /** STATUS_INVALID_SESSION_ID - The request provided an invalid session ID. */
  STATUS_INVALID_SESSION_ID = 2,
  UNRECOGNIZED = -1,
}

export function stopResponse_StatusFromJSON(object: any): StopResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return StopResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return StopResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_INVALID_SESSION_ID":
      return StopResponse_Status.STATUS_INVALID_SESSION_ID;
    case -1:
    case "UNRECOGNIZED":
    default:
      return StopResponse_Status.UNRECOGNIZED;
  }
}

export function stopResponse_StatusToJSON(object: StopResponse_Status): string {
  switch (object) {
    case StopResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case StopResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case StopResponse_Status.STATUS_INVALID_SESSION_ID:
      return "STATUS_INVALID_SESSION_ID";
    case StopResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** End the session originally established by an EstablishSessionRequest. */
export interface TeardownSessionRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /**
   * Session ID as returned by the EstablishSessionResponse.
   * Used to guarantee coherence between a single client and a servicer.
   */
  sessionId: string;
}

/** Results of ending a session. */
export interface TeardownSessionResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** The result of a TeardownSessionRequest. */
  status: TeardownSessionResponse_Status;
}

/** Possible results of ending a session. */
export enum TeardownSessionResponse_Status {
  /** STATUS_UNKNOWN - Status unknown/unset. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Session was torn down -- servicer has probably wiped all associated data / state. */
  STATUS_OK = 1,
  /**
   * STATUS_INVALID_SESSION_ID - The request provided an invalid session ID.
   * This may mean the session was already torn down.
   */
  STATUS_INVALID_SESSION_ID = 2,
  UNRECOGNIZED = -1,
}

export function teardownSessionResponse_StatusFromJSON(
  object: any
): TeardownSessionResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return TeardownSessionResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return TeardownSessionResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_INVALID_SESSION_ID":
      return TeardownSessionResponse_Status.STATUS_INVALID_SESSION_ID;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TeardownSessionResponse_Status.UNRECOGNIZED;
  }
}

export function teardownSessionResponse_StatusToJSON(
  object: TeardownSessionResponse_Status
): string {
  switch (object) {
    case TeardownSessionResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case TeardownSessionResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case TeardownSessionResponse_Status.STATUS_INVALID_SESSION_ID:
      return "STATUS_INVALID_SESSION_ID";
    case TeardownSessionResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseEstablishSessionRequest(): EstablishSessionRequest {
  return { header: undefined, leases: [], inputs: [] };
}

export const EstablishSessionRequest = {
  encode(
    message: EstablishSessionRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.leases) {
      Lease.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.inputs) {
      VariableDeclaration.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): EstablishSessionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstablishSessionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.leases.push(Lease.decode(reader, reader.uint32()));
          break;
        case 3:
          message.inputs.push(
            VariableDeclaration.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EstablishSessionRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      leases: Array.isArray(object?.leases)
        ? object.leases.map((e: any) => Lease.fromJSON(e))
        : [],
      inputs: Array.isArray(object?.inputs)
        ? object.inputs.map((e: any) => VariableDeclaration.fromJSON(e))
        : [],
    };
  },

  toJSON(message: EstablishSessionRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    if (message.leases) {
      obj.leases = message.leases.map((e) => (e ? Lease.toJSON(e) : undefined));
    } else {
      obj.leases = [];
    }
    if (message.inputs) {
      obj.inputs = message.inputs.map((e) =>
        e ? VariableDeclaration.toJSON(e) : undefined
      );
    } else {
      obj.inputs = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EstablishSessionRequest>, I>>(
    object: I
  ): EstablishSessionRequest {
    const message = createBaseEstablishSessionRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.leases = object.leases?.map((e) => Lease.fromPartial(e)) || [];
    message.inputs =
      object.inputs?.map((e) => VariableDeclaration.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEstablishSessionResponse(): EstablishSessionResponse {
  return {
    header: undefined,
    status: 0,
    sessionId: "",
    missingLeaseResources: [],
    leaseUseResults: [],
    missingInputs: [],
  };
}

export const EstablishSessionResponse = {
  encode(
    message: EstablishSessionResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.sessionId !== "") {
      writer.uint32(26).string(message.sessionId);
    }
    for (const v of message.missingLeaseResources) {
      writer.uint32(34).string(v!);
    }
    for (const v of message.leaseUseResults) {
      LeaseUseResult.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.missingInputs) {
      VariableDeclaration.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): EstablishSessionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstablishSessionResponse();
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
          message.sessionId = reader.string();
          break;
        case 4:
          message.missingLeaseResources.push(reader.string());
          break;
        case 5:
          message.leaseUseResults.push(
            LeaseUseResult.decode(reader, reader.uint32())
          );
          break;
        case 6:
          message.missingInputs.push(
            VariableDeclaration.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EstablishSessionResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? establishSessionResponse_StatusFromJSON(object.status)
        : 0,
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
      missingLeaseResources: Array.isArray(object?.missingLeaseResources)
        ? object.missingLeaseResources.map((e: any) => String(e))
        : [],
      leaseUseResults: Array.isArray(object?.leaseUseResults)
        ? object.leaseUseResults.map((e: any) => LeaseUseResult.fromJSON(e))
        : [],
      missingInputs: Array.isArray(object?.missingInputs)
        ? object.missingInputs.map((e: any) => VariableDeclaration.fromJSON(e))
        : [],
    };
  },

  toJSON(message: EstablishSessionResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = establishSessionResponse_StatusToJSON(message.status));
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    if (message.missingLeaseResources) {
      obj.missingLeaseResources = message.missingLeaseResources.map((e) => e);
    } else {
      obj.missingLeaseResources = [];
    }
    if (message.leaseUseResults) {
      obj.leaseUseResults = message.leaseUseResults.map((e) =>
        e ? LeaseUseResult.toJSON(e) : undefined
      );
    } else {
      obj.leaseUseResults = [];
    }
    if (message.missingInputs) {
      obj.missingInputs = message.missingInputs.map((e) =>
        e ? VariableDeclaration.toJSON(e) : undefined
      );
    } else {
      obj.missingInputs = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EstablishSessionResponse>, I>>(
    object: I
  ): EstablishSessionResponse {
    const message = createBaseEstablishSessionResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    message.sessionId = object.sessionId ?? "";
    message.missingLeaseResources =
      object.missingLeaseResources?.map((e) => e) || [];
    message.leaseUseResults =
      object.leaseUseResults?.map((e) => LeaseUseResult.fromPartial(e)) || [];
    message.missingInputs =
      object.missingInputs?.map((e) => VariableDeclaration.fromPartial(e)) ||
      [];
    return message;
  },
};

function createBaseTickRequest(): TickRequest {
  return { header: undefined, sessionId: "", leases: [], inputs: [] };
}

export const TickRequest = {
  encode(
    message: TickRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.sessionId !== "") {
      writer.uint32(18).string(message.sessionId);
    }
    for (const v of message.leases) {
      Lease.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.inputs) {
      KeyValue.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TickRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTickRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.sessionId = reader.string();
          break;
        case 3:
          message.leases.push(Lease.decode(reader, reader.uint32()));
          break;
        case 4:
          message.inputs.push(KeyValue.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TickRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
      leases: Array.isArray(object?.leases)
        ? object.leases.map((e: any) => Lease.fromJSON(e))
        : [],
      inputs: Array.isArray(object?.inputs)
        ? object.inputs.map((e: any) => KeyValue.fromJSON(e))
        : [],
    };
  },

  toJSON(message: TickRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    if (message.leases) {
      obj.leases = message.leases.map((e) => (e ? Lease.toJSON(e) : undefined));
    } else {
      obj.leases = [];
    }
    if (message.inputs) {
      obj.inputs = message.inputs.map((e) =>
        e ? KeyValue.toJSON(e) : undefined
      );
    } else {
      obj.inputs = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TickRequest>, I>>(
    object: I
  ): TickRequest {
    const message = createBaseTickRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.sessionId = object.sessionId ?? "";
    message.leases = object.leases?.map((e) => Lease.fromPartial(e)) || [];
    message.inputs = object.inputs?.map((e) => KeyValue.fromPartial(e)) || [];
    return message;
  },
};

function createBaseTickResponse(): TickResponse {
  return {
    header: undefined,
    status: 0,
    missingLeaseResources: [],
    leaseUseResults: [],
    missingInputs: [],
    errorMessage: "",
  };
}

export const TickResponse = {
  encode(
    message: TickResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(24).int32(message.status);
    }
    for (const v of message.missingLeaseResources) {
      writer.uint32(34).string(v!);
    }
    for (const v of message.leaseUseResults) {
      LeaseUseResult.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.missingInputs) {
      VariableDeclaration.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.errorMessage !== "") {
      writer.uint32(66).string(message.errorMessage);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TickResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTickResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 3:
          message.status = reader.int32() as any;
          break;
        case 4:
          message.missingLeaseResources.push(reader.string());
          break;
        case 5:
          message.leaseUseResults.push(
            LeaseUseResult.decode(reader, reader.uint32())
          );
          break;
        case 7:
          message.missingInputs.push(
            VariableDeclaration.decode(reader, reader.uint32())
          );
          break;
        case 8:
          message.errorMessage = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TickResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? tickResponse_StatusFromJSON(object.status)
        : 0,
      missingLeaseResources: Array.isArray(object?.missingLeaseResources)
        ? object.missingLeaseResources.map((e: any) => String(e))
        : [],
      leaseUseResults: Array.isArray(object?.leaseUseResults)
        ? object.leaseUseResults.map((e: any) => LeaseUseResult.fromJSON(e))
        : [],
      missingInputs: Array.isArray(object?.missingInputs)
        ? object.missingInputs.map((e: any) => VariableDeclaration.fromJSON(e))
        : [],
      errorMessage: isSet(object.errorMessage)
        ? String(object.errorMessage)
        : "",
    };
  },

  toJSON(message: TickResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = tickResponse_StatusToJSON(message.status));
    if (message.missingLeaseResources) {
      obj.missingLeaseResources = message.missingLeaseResources.map((e) => e);
    } else {
      obj.missingLeaseResources = [];
    }
    if (message.leaseUseResults) {
      obj.leaseUseResults = message.leaseUseResults.map((e) =>
        e ? LeaseUseResult.toJSON(e) : undefined
      );
    } else {
      obj.leaseUseResults = [];
    }
    if (message.missingInputs) {
      obj.missingInputs = message.missingInputs.map((e) =>
        e ? VariableDeclaration.toJSON(e) : undefined
      );
    } else {
      obj.missingInputs = [];
    }
    message.errorMessage !== undefined &&
      (obj.errorMessage = message.errorMessage);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TickResponse>, I>>(
    object: I
  ): TickResponse {
    const message = createBaseTickResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    message.missingLeaseResources =
      object.missingLeaseResources?.map((e) => e) || [];
    message.leaseUseResults =
      object.leaseUseResults?.map((e) => LeaseUseResult.fromPartial(e)) || [];
    message.missingInputs =
      object.missingInputs?.map((e) => VariableDeclaration.fromPartial(e)) ||
      [];
    message.errorMessage = object.errorMessage ?? "";
    return message;
  },
};

function createBaseStopRequest(): StopRequest {
  return { header: undefined, sessionId: "" };
}

export const StopRequest = {
  encode(
    message: StopRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.sessionId !== "") {
      writer.uint32(18).string(message.sessionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StopRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStopRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.sessionId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StopRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
    };
  },

  toJSON(message: StopRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StopRequest>, I>>(
    object: I
  ): StopRequest {
    const message = createBaseStopRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.sessionId = object.sessionId ?? "";
    return message;
  },
};

function createBaseStopResponse(): StopResponse {
  return { header: undefined, status: 0 };
}

export const StopResponse = {
  encode(
    message: StopResponse,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): StopResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStopResponse();
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

  fromJSON(object: any): StopResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? stopResponse_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: StopResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = stopResponse_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StopResponse>, I>>(
    object: I
  ): StopResponse {
    const message = createBaseStopResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseTeardownSessionRequest(): TeardownSessionRequest {
  return { header: undefined, sessionId: "" };
}

export const TeardownSessionRequest = {
  encode(
    message: TeardownSessionRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.sessionId !== "") {
      writer.uint32(18).string(message.sessionId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): TeardownSessionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTeardownSessionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.sessionId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TeardownSessionRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      sessionId: isSet(object.sessionId) ? String(object.sessionId) : "",
    };
  },

  toJSON(message: TeardownSessionRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.sessionId !== undefined && (obj.sessionId = message.sessionId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TeardownSessionRequest>, I>>(
    object: I
  ): TeardownSessionRequest {
    const message = createBaseTeardownSessionRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.sessionId = object.sessionId ?? "";
    return message;
  },
};

function createBaseTeardownSessionResponse(): TeardownSessionResponse {
  return { header: undefined, status: 0 };
}

export const TeardownSessionResponse = {
  encode(
    message: TeardownSessionResponse,
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
  ): TeardownSessionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTeardownSessionResponse();
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

  fromJSON(object: any): TeardownSessionResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? teardownSessionResponse_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: TeardownSessionResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = teardownSessionResponse_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TeardownSessionResponse>, I>>(
    object: I
  ): TeardownSessionResponse {
    const message = createBaseTeardownSessionResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
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
