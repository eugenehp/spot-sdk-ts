/* eslint-disable */
import {
  LicenseInfo_Status,
  licenseInfo_StatusFromJSON,
  licenseInfo_StatusToJSON,
} from "./license";
import { RequestHeader, ResponseHeader } from "./header";
import { Lease, LeaseUseResult } from "./lease";
import { SystemFault } from "./robot_state";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/** Feedback on the current state of a power command on the robot. */
export enum PowerCommandStatus {
  /** STATUS_UNKNOWN - Status is not specified. */
  STATUS_UNKNOWN = 0,
  /** STATUS_IN_PROGRESS - Power command is executing. */
  STATUS_IN_PROGRESS = 1,
  /** STATUS_SUCCESS - Power command succeeded. */
  STATUS_SUCCESS = 2,
  /** STATUS_SHORE_POWER_CONNECTED - ERROR: Robot cannot be powered on while on wall power. */
  STATUS_SHORE_POWER_CONNECTED = 3,
  /** STATUS_BATTERY_MISSING - ERROR: Battery not inserted into robot. */
  STATUS_BATTERY_MISSING = 4,
  /** STATUS_COMMAND_IN_PROGRESS - ERROR: Power command cant be overwritten. */
  STATUS_COMMAND_IN_PROGRESS = 5,
  /**
   * STATUS_ESTOPPED - ERROR: Cannot power on while estopped. A robot may have multiple estops.
   * Inspect EStopState for additional info.
   */
  STATUS_ESTOPPED = 6,
  /** STATUS_FAULTED - ERROR: Cannot power due to a fault. Inspect FaultState for more info. */
  STATUS_FAULTED = 7,
  /** STATUS_INTERNAL_ERROR - ERROR: Internal error occurred, may be clear-able by issuing a power off command. */
  STATUS_INTERNAL_ERROR = 8,
  /** STATUS_LICENSE_ERROR - ERROR: License check failed. Check license_status field for details. */
  STATUS_LICENSE_ERROR = 9,
  /** INCOMPATIBLE_HARDWARE_ERROR - ERROR: The Spot hardware is not compatible with the request request. */
  INCOMPATIBLE_HARDWARE_ERROR = 10,
  /**
   * STATUS_OVERRIDDEN - ERROR: Robot has overridden the power command and disabled motor power. In the case
   * of a commanded power OFF, robot will report SUCCESS if power is disabled.
   */
  STATUS_OVERRIDDEN = 11,
  UNRECOGNIZED = -1,
}

export function powerCommandStatusFromJSON(object: any): PowerCommandStatus {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return PowerCommandStatus.STATUS_UNKNOWN;
    case 1:
    case "STATUS_IN_PROGRESS":
      return PowerCommandStatus.STATUS_IN_PROGRESS;
    case 2:
    case "STATUS_SUCCESS":
      return PowerCommandStatus.STATUS_SUCCESS;
    case 3:
    case "STATUS_SHORE_POWER_CONNECTED":
      return PowerCommandStatus.STATUS_SHORE_POWER_CONNECTED;
    case 4:
    case "STATUS_BATTERY_MISSING":
      return PowerCommandStatus.STATUS_BATTERY_MISSING;
    case 5:
    case "STATUS_COMMAND_IN_PROGRESS":
      return PowerCommandStatus.STATUS_COMMAND_IN_PROGRESS;
    case 6:
    case "STATUS_ESTOPPED":
      return PowerCommandStatus.STATUS_ESTOPPED;
    case 7:
    case "STATUS_FAULTED":
      return PowerCommandStatus.STATUS_FAULTED;
    case 8:
    case "STATUS_INTERNAL_ERROR":
      return PowerCommandStatus.STATUS_INTERNAL_ERROR;
    case 9:
    case "STATUS_LICENSE_ERROR":
      return PowerCommandStatus.STATUS_LICENSE_ERROR;
    case 10:
    case "INCOMPATIBLE_HARDWARE_ERROR":
      return PowerCommandStatus.INCOMPATIBLE_HARDWARE_ERROR;
    case 11:
    case "STATUS_OVERRIDDEN":
      return PowerCommandStatus.STATUS_OVERRIDDEN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PowerCommandStatus.UNRECOGNIZED;
  }
}

export function powerCommandStatusToJSON(object: PowerCommandStatus): string {
  switch (object) {
    case PowerCommandStatus.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case PowerCommandStatus.STATUS_IN_PROGRESS:
      return "STATUS_IN_PROGRESS";
    case PowerCommandStatus.STATUS_SUCCESS:
      return "STATUS_SUCCESS";
    case PowerCommandStatus.STATUS_SHORE_POWER_CONNECTED:
      return "STATUS_SHORE_POWER_CONNECTED";
    case PowerCommandStatus.STATUS_BATTERY_MISSING:
      return "STATUS_BATTERY_MISSING";
    case PowerCommandStatus.STATUS_COMMAND_IN_PROGRESS:
      return "STATUS_COMMAND_IN_PROGRESS";
    case PowerCommandStatus.STATUS_ESTOPPED:
      return "STATUS_ESTOPPED";
    case PowerCommandStatus.STATUS_FAULTED:
      return "STATUS_FAULTED";
    case PowerCommandStatus.STATUS_INTERNAL_ERROR:
      return "STATUS_INTERNAL_ERROR";
    case PowerCommandStatus.STATUS_LICENSE_ERROR:
      return "STATUS_LICENSE_ERROR";
    case PowerCommandStatus.INCOMPATIBLE_HARDWARE_ERROR:
      return "INCOMPATIBLE_HARDWARE_ERROR";
    case PowerCommandStatus.STATUS_OVERRIDDEN:
      return "STATUS_OVERRIDDEN";
    case PowerCommandStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** The PowerCommand request which specifies a change in the robot's motor power. */
export interface PowerCommandRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** The Lease to show ownership of the robot. */
  lease: Lease | undefined;
  request: PowerCommandRequest_Request;
}

/**
 * Commands for the robot to execute.
 * Note that not all Spot robots are compatible with all these commands. Check your robot's
 * HardwareConfiguration in bosdyn.api.robot_state.
 */
export enum PowerCommandRequest_Request {
  /** REQUEST_UNKNOWN - Invalid request; do not use. */
  REQUEST_UNKNOWN = 0,
  /**
   * REQUEST_OFF - Cut power to motors immediately.
   *
   * @deprecated
   */
  REQUEST_OFF = 1,
  /**
   * REQUEST_ON - Turn on power to the robot motors.
   *
   * @deprecated
   */
  REQUEST_ON = 2,
  /** REQUEST_OFF_MOTORS - Cut power to motors immediately. */
  REQUEST_OFF_MOTORS = 1,
  /** REQUEST_ON_MOTORS - Turn on power to the robot motors. */
  REQUEST_ON_MOTORS = 2,
  /** REQUEST_OFF_ROBOT - Turn off the robot. Same as physical switch. */
  REQUEST_OFF_ROBOT = 3,
  /** REQUEST_CYCLE_ROBOT - Power cycle the robot. Same as physical switch. */
  REQUEST_CYCLE_ROBOT = 4,
  /** REQUEST_OFF_PAYLOAD_PORTS - Cut power to the payload ports. */
  REQUEST_OFF_PAYLOAD_PORTS = 5,
  /** REQUEST_ON_PAYLOAD_PORTS - Turn on power to the payload ports. */
  REQUEST_ON_PAYLOAD_PORTS = 6,
  /** REQUEST_OFF_WIFI_RADIO - Cut power to the hardware Wi-Fi radio. */
  REQUEST_OFF_WIFI_RADIO = 7,
  /** REQUEST_ON_WIFI_RADIO - Power on the hardware Wi-Fi radio. */
  REQUEST_ON_WIFI_RADIO = 8,
  UNRECOGNIZED = -1,
}

export function powerCommandRequest_RequestFromJSON(
  object: any
): PowerCommandRequest_Request {
  switch (object) {
    case 0:
    case "REQUEST_UNKNOWN":
      return PowerCommandRequest_Request.REQUEST_UNKNOWN;
    case 1:
    case "REQUEST_OFF":
      return PowerCommandRequest_Request.REQUEST_OFF;
    case 2:
    case "REQUEST_ON":
      return PowerCommandRequest_Request.REQUEST_ON;
    case 1:
    case "REQUEST_OFF_MOTORS":
      return PowerCommandRequest_Request.REQUEST_OFF_MOTORS;
    case 2:
    case "REQUEST_ON_MOTORS":
      return PowerCommandRequest_Request.REQUEST_ON_MOTORS;
    case 3:
    case "REQUEST_OFF_ROBOT":
      return PowerCommandRequest_Request.REQUEST_OFF_ROBOT;
    case 4:
    case "REQUEST_CYCLE_ROBOT":
      return PowerCommandRequest_Request.REQUEST_CYCLE_ROBOT;
    case 5:
    case "REQUEST_OFF_PAYLOAD_PORTS":
      return PowerCommandRequest_Request.REQUEST_OFF_PAYLOAD_PORTS;
    case 6:
    case "REQUEST_ON_PAYLOAD_PORTS":
      return PowerCommandRequest_Request.REQUEST_ON_PAYLOAD_PORTS;
    case 7:
    case "REQUEST_OFF_WIFI_RADIO":
      return PowerCommandRequest_Request.REQUEST_OFF_WIFI_RADIO;
    case 8:
    case "REQUEST_ON_WIFI_RADIO":
      return PowerCommandRequest_Request.REQUEST_ON_WIFI_RADIO;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PowerCommandRequest_Request.UNRECOGNIZED;
  }
}

export function powerCommandRequest_RequestToJSON(
  object: PowerCommandRequest_Request
): string {
  switch (object) {
    case PowerCommandRequest_Request.REQUEST_UNKNOWN:
      return "REQUEST_UNKNOWN";
    case PowerCommandRequest_Request.REQUEST_OFF:
      return "REQUEST_OFF";
    case PowerCommandRequest_Request.REQUEST_ON:
      return "REQUEST_ON";
    case PowerCommandRequest_Request.REQUEST_OFF_MOTORS:
      return "REQUEST_OFF_MOTORS";
    case PowerCommandRequest_Request.REQUEST_ON_MOTORS:
      return "REQUEST_ON_MOTORS";
    case PowerCommandRequest_Request.REQUEST_OFF_ROBOT:
      return "REQUEST_OFF_ROBOT";
    case PowerCommandRequest_Request.REQUEST_CYCLE_ROBOT:
      return "REQUEST_CYCLE_ROBOT";
    case PowerCommandRequest_Request.REQUEST_OFF_PAYLOAD_PORTS:
      return "REQUEST_OFF_PAYLOAD_PORTS";
    case PowerCommandRequest_Request.REQUEST_ON_PAYLOAD_PORTS:
      return "REQUEST_ON_PAYLOAD_PORTS";
    case PowerCommandRequest_Request.REQUEST_OFF_WIFI_RADIO:
      return "REQUEST_OFF_WIFI_RADIO";
    case PowerCommandRequest_Request.REQUEST_ON_WIFI_RADIO:
      return "REQUEST_ON_WIFI_RADIO";
    case PowerCommandRequest_Request.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * The PowerCommand response message which contains a unique identifier that can be used to
 * get feedback on the progress of a power command from the power service.
 */
export interface PowerCommandResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Details about how the lease was used. */
  leaseUseResult: LeaseUseResult | undefined;
  /** Current feedback of specified command. */
  status: PowerCommandStatus;
  /** Unique identifier for the command, If empty, was not accepted. */
  powerCommandId: number;
  /** License check status */
  licenseStatus: LicenseInfo_Status;
  /** Optional list of active faults blocking success of the PowerCommandRequest */
  blockingFaults: SystemFault[];
}

/**
 * The PowerCommandFeedback request message, which can get the feedback for a specific
 * power command id number.
 */
export interface PowerCommandFeedbackRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Unique identifier for the command of which feedback is desired. */
  powerCommandId: number;
}

/** The PowerCommandFeedback response message, which contains the progress of the power command. */
export interface PowerCommandFeedbackResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Current status of specified command. */
  status: PowerCommandStatus;
  /** Optional list of active faults blocking success of the PowerCommandRequest */
  blockingFaults: SystemFault[];
}

function createBasePowerCommandRequest(): PowerCommandRequest {
  return { header: undefined, lease: undefined, request: 0 };
}

export const PowerCommandRequest = {
  encode(
    message: PowerCommandRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.lease !== undefined) {
      Lease.encode(message.lease, writer.uint32(18).fork()).ldelim();
    }
    if (message.request !== 0) {
      writer.uint32(24).int32(message.request);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PowerCommandRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePowerCommandRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.lease = Lease.decode(reader, reader.uint32());
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

  fromJSON(object: any): PowerCommandRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      lease: isSet(object.lease) ? Lease.fromJSON(object.lease) : undefined,
      request: isSet(object.request)
        ? powerCommandRequest_RequestFromJSON(object.request)
        : 0,
    };
  },

  toJSON(message: PowerCommandRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.lease !== undefined &&
      (obj.lease = message.lease ? Lease.toJSON(message.lease) : undefined);
    message.request !== undefined &&
      (obj.request = powerCommandRequest_RequestToJSON(message.request));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PowerCommandRequest>, I>>(
    object: I
  ): PowerCommandRequest {
    const message = createBasePowerCommandRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.lease =
      object.lease !== undefined && object.lease !== null
        ? Lease.fromPartial(object.lease)
        : undefined;
    message.request = object.request ?? 0;
    return message;
  },
};

function createBasePowerCommandResponse(): PowerCommandResponse {
  return {
    header: undefined,
    leaseUseResult: undefined,
    status: 0,
    powerCommandId: 0,
    licenseStatus: 0,
    blockingFaults: [],
  };
}

export const PowerCommandResponse = {
  encode(
    message: PowerCommandResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.leaseUseResult !== undefined) {
      LeaseUseResult.encode(
        message.leaseUseResult,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(24).int32(message.status);
    }
    if (message.powerCommandId !== 0) {
      writer.uint32(32).uint32(message.powerCommandId);
    }
    if (message.licenseStatus !== 0) {
      writer.uint32(40).int32(message.licenseStatus);
    }
    for (const v of message.blockingFaults) {
      SystemFault.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): PowerCommandResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePowerCommandResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.leaseUseResult = LeaseUseResult.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.status = reader.int32() as any;
          break;
        case 4:
          message.powerCommandId = reader.uint32();
          break;
        case 5:
          message.licenseStatus = reader.int32() as any;
          break;
        case 6:
          message.blockingFaults.push(
            SystemFault.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PowerCommandResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      leaseUseResult: isSet(object.leaseUseResult)
        ? LeaseUseResult.fromJSON(object.leaseUseResult)
        : undefined,
      status: isSet(object.status)
        ? powerCommandStatusFromJSON(object.status)
        : 0,
      powerCommandId: isSet(object.powerCommandId)
        ? Number(object.powerCommandId)
        : 0,
      licenseStatus: isSet(object.licenseStatus)
        ? licenseInfo_StatusFromJSON(object.licenseStatus)
        : 0,
      blockingFaults: Array.isArray(object?.blockingFaults)
        ? object.blockingFaults.map((e: any) => SystemFault.fromJSON(e))
        : [],
    };
  },

  toJSON(message: PowerCommandResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.leaseUseResult !== undefined &&
      (obj.leaseUseResult = message.leaseUseResult
        ? LeaseUseResult.toJSON(message.leaseUseResult)
        : undefined);
    message.status !== undefined &&
      (obj.status = powerCommandStatusToJSON(message.status));
    message.powerCommandId !== undefined &&
      (obj.powerCommandId = Math.round(message.powerCommandId));
    message.licenseStatus !== undefined &&
      (obj.licenseStatus = licenseInfo_StatusToJSON(message.licenseStatus));
    if (message.blockingFaults) {
      obj.blockingFaults = message.blockingFaults.map((e) =>
        e ? SystemFault.toJSON(e) : undefined
      );
    } else {
      obj.blockingFaults = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PowerCommandResponse>, I>>(
    object: I
  ): PowerCommandResponse {
    const message = createBasePowerCommandResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.leaseUseResult =
      object.leaseUseResult !== undefined && object.leaseUseResult !== null
        ? LeaseUseResult.fromPartial(object.leaseUseResult)
        : undefined;
    message.status = object.status ?? 0;
    message.powerCommandId = object.powerCommandId ?? 0;
    message.licenseStatus = object.licenseStatus ?? 0;
    message.blockingFaults =
      object.blockingFaults?.map((e) => SystemFault.fromPartial(e)) || [];
    return message;
  },
};

function createBasePowerCommandFeedbackRequest(): PowerCommandFeedbackRequest {
  return { header: undefined, powerCommandId: 0 };
}

export const PowerCommandFeedbackRequest = {
  encode(
    message: PowerCommandFeedbackRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.powerCommandId !== 0) {
      writer.uint32(16).uint32(message.powerCommandId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): PowerCommandFeedbackRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePowerCommandFeedbackRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.powerCommandId = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PowerCommandFeedbackRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      powerCommandId: isSet(object.powerCommandId)
        ? Number(object.powerCommandId)
        : 0,
    };
  },

  toJSON(message: PowerCommandFeedbackRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.powerCommandId !== undefined &&
      (obj.powerCommandId = Math.round(message.powerCommandId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PowerCommandFeedbackRequest>, I>>(
    object: I
  ): PowerCommandFeedbackRequest {
    const message = createBasePowerCommandFeedbackRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.powerCommandId = object.powerCommandId ?? 0;
    return message;
  },
};

function createBasePowerCommandFeedbackResponse(): PowerCommandFeedbackResponse {
  return { header: undefined, status: 0, blockingFaults: [] };
}

export const PowerCommandFeedbackResponse = {
  encode(
    message: PowerCommandFeedbackResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    for (const v of message.blockingFaults) {
      SystemFault.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): PowerCommandFeedbackResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePowerCommandFeedbackResponse();
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
          message.blockingFaults.push(
            SystemFault.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PowerCommandFeedbackResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? powerCommandStatusFromJSON(object.status)
        : 0,
      blockingFaults: Array.isArray(object?.blockingFaults)
        ? object.blockingFaults.map((e: any) => SystemFault.fromJSON(e))
        : [],
    };
  },

  toJSON(message: PowerCommandFeedbackResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = powerCommandStatusToJSON(message.status));
    if (message.blockingFaults) {
      obj.blockingFaults = message.blockingFaults.map((e) =>
        e ? SystemFault.toJSON(e) : undefined
      );
    } else {
      obj.blockingFaults = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PowerCommandFeedbackResponse>, I>>(
    object: I
  ): PowerCommandFeedbackResponse {
    const message = createBasePowerCommandFeedbackResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    message.blockingFaults =
      object.blockingFaults?.map((e) => SystemFault.fromPartial(e)) || [];
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
