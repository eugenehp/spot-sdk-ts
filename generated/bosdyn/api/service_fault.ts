/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp";
import { Duration } from "../../google/protobuf/duration";
import { RequestHeader, ResponseHeader } from "./header";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/**
 * Information necessary to uniquely specify a service fault.
 * A service fault typically is associated with a service running on the robot or a
 * payload. Occassionally, the fault may pertain to a payload but no specific service
 * on the payload. In that situation, no service_name should not be specified and instead
 * a payload_guid should be specified. Otherwise, in the standard case of a service
 * originating fault, only the service_name should be specified and the payload_guid
 * will be populated automatically by the fault service on robot.
 */
export interface ServiceFaultId {
  /** Name of the fault. */
  faultName: string;
  /**
   * Name of the registered service associated with the fault.
   * Optional. Service name does not need to be specified if this is a payload-level
   * fault with no associated service.
   */
  serviceName: string;
  /**
   * GUID of the payload associated with the faulted service.
   * Optional. If not set, it will be assigned to the payload associated with the
   * service_name.
   */
  payloadGuid: string;
}

/**
 * The current service faults for services registered with the robot.
 * A fault is an indicator of a problem with a service or payload registered
 * with the robot. An active fault may indicate a service may fail to comply
 * with a user request.
 * If the name, service_name, and payload_guid of a newly triggered ServiceFault matches an
 * already active ServiceFault the new fault will not be added to the active fault list.
 * The oldest matching fault will be maintained.
 */
export interface ServiceFault {
  /** Identifying information of the fault. */
  faultId: ServiceFaultId | undefined;
  /**
   * User visible description of the fault (and possibly remedies). Will be
   * displayed on tablet.
   */
  errorMessage: string;
  /**
   * Fault attributes
   * Each fault may be flagged with attribute metadata (strings in this case.)
   * These attributes are useful to communicate that a particular fault may
   * have significant effect on the operations of services. Some potential attributes
   * may be "autowalk", "Spot CORE", "vision", or "gauge detection". These
   * attributes enable the caller to flag a fault as indicating a problem with
   * particular robot abstractions. A fault may have, zero, one, or more
   * attributes attached to it.
   */
  attributes: string[];
  /**
   * The severity level will have some indication of the potential breakage
   * resulting from the fault. For example, a fault associated with payload
   * X and severity level SEVERITY_INFO may indicate the payload is in an
   * unexpected state but still operational. However, a fault with serverity
   * level SEVERITY_CRITICAL may indicate the payload is no
   * longer operational.
   */
  severity: ServiceFault_Severity;
  /** Time of robot local clock at fault onset. Set by robot-state service. */
  onsetTimestamp: Date | undefined;
  /** Time elapsed since onset of the fault. Set by robot-state service. */
  duration: Duration | undefined;
}

export enum ServiceFault_Severity {
  /** SEVERITY_UNKNOWN - Unknown severity */
  SEVERITY_UNKNOWN = 0,
  /** SEVERITY_INFO - Service still functional */
  SEVERITY_INFO = 1,
  /** SEVERITY_WARN - Service performance may be degraded */
  SEVERITY_WARN = 2,
  /** SEVERITY_CRITICAL - Critical service fault */
  SEVERITY_CRITICAL = 3,
  UNRECOGNIZED = -1,
}

export function serviceFault_SeverityFromJSON(
  object: any
): ServiceFault_Severity {
  switch (object) {
    case 0:
    case "SEVERITY_UNKNOWN":
      return ServiceFault_Severity.SEVERITY_UNKNOWN;
    case 1:
    case "SEVERITY_INFO":
      return ServiceFault_Severity.SEVERITY_INFO;
    case 2:
    case "SEVERITY_WARN":
      return ServiceFault_Severity.SEVERITY_WARN;
    case 3:
    case "SEVERITY_CRITICAL":
      return ServiceFault_Severity.SEVERITY_CRITICAL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ServiceFault_Severity.UNRECOGNIZED;
  }
}

export function serviceFault_SeverityToJSON(
  object: ServiceFault_Severity
): string {
  switch (object) {
    case ServiceFault_Severity.SEVERITY_UNKNOWN:
      return "SEVERITY_UNKNOWN";
    case ServiceFault_Severity.SEVERITY_INFO:
      return "SEVERITY_INFO";
    case ServiceFault_Severity.SEVERITY_WARN:
      return "SEVERITY_WARN";
    case ServiceFault_Severity.SEVERITY_CRITICAL:
      return "SEVERITY_CRITICAL";
    case ServiceFault_Severity.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Trigger a new service fault that will be reported in the robot ServiceFaultState.
 * These faults will be displayed in the tablet. Developers should be careful to
 * avoid overwhelming operators with dozens of minor messages.
 */
export interface TriggerServiceFaultRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** The fault to report in ServiceFaultState. */
  fault: ServiceFault | undefined;
}

/** The TriggerServiceFault response message contains a header indicating success. */
export interface TriggerServiceFaultResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Return status for the request. */
  status: TriggerServiceFaultResponse_Status;
}

export enum TriggerServiceFaultResponse_Status {
  /** STATUS_UNKNOWN - UNKNOWN should never be used. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Success. The fault has been triggerd. */
  STATUS_OK = 1,
  /** STATUS_FAULT_ALREADY_ACTIVE - ServiceFaultId already in active faults. */
  STATUS_FAULT_ALREADY_ACTIVE = 2,
  UNRECOGNIZED = -1,
}

export function triggerServiceFaultResponse_StatusFromJSON(
  object: any
): TriggerServiceFaultResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return TriggerServiceFaultResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return TriggerServiceFaultResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_FAULT_ALREADY_ACTIVE":
      return TriggerServiceFaultResponse_Status.STATUS_FAULT_ALREADY_ACTIVE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TriggerServiceFaultResponse_Status.UNRECOGNIZED;
  }
}

export function triggerServiceFaultResponse_StatusToJSON(
  object: TriggerServiceFaultResponse_Status
): string {
  switch (object) {
    case TriggerServiceFaultResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case TriggerServiceFaultResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case TriggerServiceFaultResponse_Status.STATUS_FAULT_ALREADY_ACTIVE:
      return "STATUS_FAULT_ALREADY_ACTIVE";
    case TriggerServiceFaultResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Clear a service fault from the robot's ServiceFaultState (in robot_state.proto).
 * The active ServiceFault to clear will be determined by matching fault_name and
 * service_name/payload_guid, specified in the ServiceFaultId message.
 */
export interface ClearServiceFaultRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Identifying information of the fault to clear. */
  faultId: ServiceFaultId | undefined;
  /** Clear all faults that are associated with the same service_name. Use carefully. */
  clearAllServiceFaults: boolean;
  /** Clear all faults that are associated with the same payload_guid. Use carefully. */
  clearAllPayloadFaults: boolean;
}

/** The ClearServiceFault response message contains a header indicating success. */
export interface ClearServiceFaultResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Return status for the request. */
  status: ClearServiceFaultResponse_Status;
}

export enum ClearServiceFaultResponse_Status {
  /** STATUS_UNKNOWN - UNKNOWN should never be used. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Success. The fault has been cleared. */
  STATUS_OK = 1,
  /** STATUS_FAULT_NOT_ACTIVE - ServiceFaultId not found in active faults. */
  STATUS_FAULT_NOT_ACTIVE = 2,
  UNRECOGNIZED = -1,
}

export function clearServiceFaultResponse_StatusFromJSON(
  object: any
): ClearServiceFaultResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return ClearServiceFaultResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return ClearServiceFaultResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_FAULT_NOT_ACTIVE":
      return ClearServiceFaultResponse_Status.STATUS_FAULT_NOT_ACTIVE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ClearServiceFaultResponse_Status.UNRECOGNIZED;
  }
}

export function clearServiceFaultResponse_StatusToJSON(
  object: ClearServiceFaultResponse_Status
): string {
  switch (object) {
    case ClearServiceFaultResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case ClearServiceFaultResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case ClearServiceFaultResponse_Status.STATUS_FAULT_NOT_ACTIVE:
      return "STATUS_FAULT_NOT_ACTIVE";
    case ClearServiceFaultResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseServiceFaultId(): ServiceFaultId {
  return { faultName: "", serviceName: "", payloadGuid: "" };
}

export const ServiceFaultId = {
  encode(
    message: ServiceFaultId,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.faultName !== "") {
      writer.uint32(10).string(message.faultName);
    }
    if (message.serviceName !== "") {
      writer.uint32(18).string(message.serviceName);
    }
    if (message.payloadGuid !== "") {
      writer.uint32(26).string(message.payloadGuid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ServiceFaultId {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseServiceFaultId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.faultName = reader.string();
          break;
        case 2:
          message.serviceName = reader.string();
          break;
        case 3:
          message.payloadGuid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ServiceFaultId {
    return {
      faultName: isSet(object.faultName) ? String(object.faultName) : "",
      serviceName: isSet(object.serviceName) ? String(object.serviceName) : "",
      payloadGuid: isSet(object.payloadGuid) ? String(object.payloadGuid) : "",
    };
  },

  toJSON(message: ServiceFaultId): unknown {
    const obj: any = {};
    message.faultName !== undefined && (obj.faultName = message.faultName);
    message.serviceName !== undefined &&
      (obj.serviceName = message.serviceName);
    message.payloadGuid !== undefined &&
      (obj.payloadGuid = message.payloadGuid);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ServiceFaultId>, I>>(
    object: I
  ): ServiceFaultId {
    const message = createBaseServiceFaultId();
    message.faultName = object.faultName ?? "";
    message.serviceName = object.serviceName ?? "";
    message.payloadGuid = object.payloadGuid ?? "";
    return message;
  },
};

function createBaseServiceFault(): ServiceFault {
  return {
    faultId: undefined,
    errorMessage: "",
    attributes: [],
    severity: 0,
    onsetTimestamp: undefined,
    duration: undefined,
  };
}

export const ServiceFault = {
  encode(
    message: ServiceFault,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.faultId !== undefined) {
      ServiceFaultId.encode(message.faultId, writer.uint32(10).fork()).ldelim();
    }
    if (message.errorMessage !== "") {
      writer.uint32(18).string(message.errorMessage);
    }
    for (const v of message.attributes) {
      writer.uint32(26).string(v!);
    }
    if (message.severity !== 0) {
      writer.uint32(32).int32(message.severity);
    }
    if (message.onsetTimestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.onsetTimestamp),
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ServiceFault {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseServiceFault();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.faultId = ServiceFaultId.decode(reader, reader.uint32());
          break;
        case 2:
          message.errorMessage = reader.string();
          break;
        case 3:
          message.attributes.push(reader.string());
          break;
        case 4:
          message.severity = reader.int32() as any;
          break;
        case 5:
          message.onsetTimestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 6:
          message.duration = Duration.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ServiceFault {
    return {
      faultId: isSet(object.faultId)
        ? ServiceFaultId.fromJSON(object.faultId)
        : undefined,
      errorMessage: isSet(object.errorMessage)
        ? String(object.errorMessage)
        : "",
      attributes: Array.isArray(object?.attributes)
        ? object.attributes.map((e: any) => String(e))
        : [],
      severity: isSet(object.severity)
        ? serviceFault_SeverityFromJSON(object.severity)
        : 0,
      onsetTimestamp: isSet(object.onsetTimestamp)
        ? fromJsonTimestamp(object.onsetTimestamp)
        : undefined,
      duration: isSet(object.duration)
        ? Duration.fromJSON(object.duration)
        : undefined,
    };
  },

  toJSON(message: ServiceFault): unknown {
    const obj: any = {};
    message.faultId !== undefined &&
      (obj.faultId = message.faultId
        ? ServiceFaultId.toJSON(message.faultId)
        : undefined);
    message.errorMessage !== undefined &&
      (obj.errorMessage = message.errorMessage);
    if (message.attributes) {
      obj.attributes = message.attributes.map((e) => e);
    } else {
      obj.attributes = [];
    }
    message.severity !== undefined &&
      (obj.severity = serviceFault_SeverityToJSON(message.severity));
    message.onsetTimestamp !== undefined &&
      (obj.onsetTimestamp = message.onsetTimestamp.toISOString());
    message.duration !== undefined &&
      (obj.duration = message.duration
        ? Duration.toJSON(message.duration)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ServiceFault>, I>>(
    object: I
  ): ServiceFault {
    const message = createBaseServiceFault();
    message.faultId =
      object.faultId !== undefined && object.faultId !== null
        ? ServiceFaultId.fromPartial(object.faultId)
        : undefined;
    message.errorMessage = object.errorMessage ?? "";
    message.attributes = object.attributes?.map((e) => e) || [];
    message.severity = object.severity ?? 0;
    message.onsetTimestamp = object.onsetTimestamp ?? undefined;
    message.duration =
      object.duration !== undefined && object.duration !== null
        ? Duration.fromPartial(object.duration)
        : undefined;
    return message;
  },
};

function createBaseTriggerServiceFaultRequest(): TriggerServiceFaultRequest {
  return { header: undefined, fault: undefined };
}

export const TriggerServiceFaultRequest = {
  encode(
    message: TriggerServiceFaultRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.fault !== undefined) {
      ServiceFault.encode(message.fault, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): TriggerServiceFaultRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTriggerServiceFaultRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.fault = ServiceFault.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TriggerServiceFaultRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      fault: isSet(object.fault)
        ? ServiceFault.fromJSON(object.fault)
        : undefined,
    };
  },

  toJSON(message: TriggerServiceFaultRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.fault !== undefined &&
      (obj.fault = message.fault
        ? ServiceFault.toJSON(message.fault)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TriggerServiceFaultRequest>, I>>(
    object: I
  ): TriggerServiceFaultRequest {
    const message = createBaseTriggerServiceFaultRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.fault =
      object.fault !== undefined && object.fault !== null
        ? ServiceFault.fromPartial(object.fault)
        : undefined;
    return message;
  },
};

function createBaseTriggerServiceFaultResponse(): TriggerServiceFaultResponse {
  return { header: undefined, status: 0 };
}

export const TriggerServiceFaultResponse = {
  encode(
    message: TriggerServiceFaultResponse,
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
  ): TriggerServiceFaultResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTriggerServiceFaultResponse();
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

  fromJSON(object: any): TriggerServiceFaultResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? triggerServiceFaultResponse_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: TriggerServiceFaultResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = triggerServiceFaultResponse_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TriggerServiceFaultResponse>, I>>(
    object: I
  ): TriggerServiceFaultResponse {
    const message = createBaseTriggerServiceFaultResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseClearServiceFaultRequest(): ClearServiceFaultRequest {
  return {
    header: undefined,
    faultId: undefined,
    clearAllServiceFaults: false,
    clearAllPayloadFaults: false,
  };
}

export const ClearServiceFaultRequest = {
  encode(
    message: ClearServiceFaultRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.faultId !== undefined) {
      ServiceFaultId.encode(message.faultId, writer.uint32(18).fork()).ldelim();
    }
    if (message.clearAllServiceFaults === true) {
      writer.uint32(24).bool(message.clearAllServiceFaults);
    }
    if (message.clearAllPayloadFaults === true) {
      writer.uint32(32).bool(message.clearAllPayloadFaults);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ClearServiceFaultRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClearServiceFaultRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.faultId = ServiceFaultId.decode(reader, reader.uint32());
          break;
        case 3:
          message.clearAllServiceFaults = reader.bool();
          break;
        case 4:
          message.clearAllPayloadFaults = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClearServiceFaultRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      faultId: isSet(object.faultId)
        ? ServiceFaultId.fromJSON(object.faultId)
        : undefined,
      clearAllServiceFaults: isSet(object.clearAllServiceFaults)
        ? Boolean(object.clearAllServiceFaults)
        : false,
      clearAllPayloadFaults: isSet(object.clearAllPayloadFaults)
        ? Boolean(object.clearAllPayloadFaults)
        : false,
    };
  },

  toJSON(message: ClearServiceFaultRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.faultId !== undefined &&
      (obj.faultId = message.faultId
        ? ServiceFaultId.toJSON(message.faultId)
        : undefined);
    message.clearAllServiceFaults !== undefined &&
      (obj.clearAllServiceFaults = message.clearAllServiceFaults);
    message.clearAllPayloadFaults !== undefined &&
      (obj.clearAllPayloadFaults = message.clearAllPayloadFaults);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ClearServiceFaultRequest>, I>>(
    object: I
  ): ClearServiceFaultRequest {
    const message = createBaseClearServiceFaultRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.faultId =
      object.faultId !== undefined && object.faultId !== null
        ? ServiceFaultId.fromPartial(object.faultId)
        : undefined;
    message.clearAllServiceFaults = object.clearAllServiceFaults ?? false;
    message.clearAllPayloadFaults = object.clearAllPayloadFaults ?? false;
    return message;
  },
};

function createBaseClearServiceFaultResponse(): ClearServiceFaultResponse {
  return { header: undefined, status: 0 };
}

export const ClearServiceFaultResponse = {
  encode(
    message: ClearServiceFaultResponse,
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
  ): ClearServiceFaultResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClearServiceFaultResponse();
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

  fromJSON(object: any): ClearServiceFaultResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? clearServiceFaultResponse_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: ClearServiceFaultResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = clearServiceFaultResponse_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ClearServiceFaultResponse>, I>>(
    object: I
  ): ClearServiceFaultResponse {
    const message = createBaseClearServiceFaultResponse();
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
