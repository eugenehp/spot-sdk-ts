/* eslint-disable */
import Long from "long";
import { Duration } from "../../google/protobuf/duration";
import { RequestHeader, ResponseHeader } from "./header";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/** The state of the E-Stop system. */
export enum EstopStopLevel {
  /** ESTOP_LEVEL_UNKNOWN - Invalid stop level. */
  ESTOP_LEVEL_UNKNOWN = 0,
  /** ESTOP_LEVEL_CUT - Immediately cut power to the actuators. */
  ESTOP_LEVEL_CUT = 1,
  /** ESTOP_LEVEL_SETTLE_THEN_CUT - Prepare for loss of actuator power, then cut power. */
  ESTOP_LEVEL_SETTLE_THEN_CUT = 2,
  /** ESTOP_LEVEL_NONE - No-stop level. The endpoint believes the robot is safe to operate. */
  ESTOP_LEVEL_NONE = 4,
  UNRECOGNIZED = -1,
}

export function estopStopLevelFromJSON(object: any): EstopStopLevel {
  switch (object) {
    case 0:
    case "ESTOP_LEVEL_UNKNOWN":
      return EstopStopLevel.ESTOP_LEVEL_UNKNOWN;
    case 1:
    case "ESTOP_LEVEL_CUT":
      return EstopStopLevel.ESTOP_LEVEL_CUT;
    case 2:
    case "ESTOP_LEVEL_SETTLE_THEN_CUT":
      return EstopStopLevel.ESTOP_LEVEL_SETTLE_THEN_CUT;
    case 4:
    case "ESTOP_LEVEL_NONE":
      return EstopStopLevel.ESTOP_LEVEL_NONE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return EstopStopLevel.UNRECOGNIZED;
  }
}

export function estopStopLevelToJSON(object: EstopStopLevel): string {
  switch (object) {
    case EstopStopLevel.ESTOP_LEVEL_UNKNOWN:
      return "ESTOP_LEVEL_UNKNOWN";
    case EstopStopLevel.ESTOP_LEVEL_CUT:
      return "ESTOP_LEVEL_CUT";
    case EstopStopLevel.ESTOP_LEVEL_SETTLE_THEN_CUT:
      return "ESTOP_LEVEL_SETTLE_THEN_CUT";
    case EstopStopLevel.ESTOP_LEVEL_NONE:
      return "ESTOP_LEVEL_NONE";
    case EstopStopLevel.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** An  to the robot software-E-Stop system. */
export interface EstopEndpoint {
  /** Role of this endpoint. Should be a user-friendly string, e.g. "OCU". */
  role: string;
  /** Name of this endpoint. Specifies a thing to fill the given role, e.g. "patrol-ocu01" */
  name: string;
  /** Unique ID assigned by the server. */
  uniqueId: string;
  /**
   * Maximum delay between challenge and response for this endpoint prior to soft power off
   * handling. After timeout seconds has passed, the robot will try to get to a safe state prior
   * to disabling motor power. The robot response is equivalent to an ESTOP_LEVEL_SETTLE_THEN_CUT
   * which may involve the robot sitting down in order to prepare for disabling motor power.
   */
  timeout: Duration | undefined;
  /**
   * Optional maximum delay between challenge and response for this endpoint prior to disabling
   * motor power. After cut_power_timeout seconds has passed, motor power will be disconnected
   * immediately regardless of current robot state. If this value is not set robot will default
   * to timeout plus a nominal expected duration to reach a safe state. In practice this
   * is typically 3-4 seconds. The response is equivalent to an ESTOP_LEVEL_CUT.
   */
  cutPowerTimeout: Duration | undefined;
}

/** Configuration of a root / server. */
export interface EstopConfig {
  /**
   * EstopEndpoints that are part of this configuration.
   * Unique IDs do not have to be filled out, but can be.
   */
  endpoints: EstopEndpoint[];
  /** Unique ID for this configuration. */
  uniqueId: string;
}

/** EstopEndpoint with some extra status data. */
export interface EstopEndpointWithStatus {
  /** The endpoint. */
  endpoint: EstopEndpoint | undefined;
  /** Stop level most recently requested by the endpoint. */
  stopLevel: EstopStopLevel;
  /** Time since a valid response was provided by the endpoint. */
  timeSinceValidResponse: Duration | undefined;
}

/** Status of Estop system. */
export interface EstopSystemStatus {
  /** Status for all available endpoints. */
  endpoints: EstopEndpointWithStatus[];
  /**
   * Current stop level for the system.
   * Will be the most-restrictive stop level specified by an endpoint, or a stop level
   * asserted by the system as a whole (e.g. if an endpoint timed out).
   */
  stopLevel: EstopStopLevel;
  /** Human-readable information on the stop level. */
  stopLevelDetails: string;
}

/**
 * Client request for setting/maintaining an E-Stop system level.
 * After the first CheckIn, must include response to previous challenge.
 */
export interface EstopCheckInRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** The endpoint making the request. */
  endpoint: EstopEndpoint | undefined;
  /**
   * Challenge being responded to.
   * Don't set if this is the first EstopCheckInRequest.
   */
  challenge: number;
  /**
   * Response to above challenge.
   * Don't set if this is the first EstopCheckInRequest.
   */
  response: number;
  /** Assert this stop level. */
  stopLevel: EstopStopLevel;
}

/** Server response to EstopCheckInRequest. */
export interface EstopCheckInResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Copy of initial request. */
  request: EstopCheckInRequest | undefined;
  /** Next challenge to answer. */
  challenge: number;
  /** Status code for the response. */
  status: EstopCheckInResponse_Status;
}

export enum EstopCheckInResponse_Status {
  /** STATUS_UNKNOWN - Unknown error occurred. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Valid challenge has been returned. */
  STATUS_OK = 1,
  /** STATUS_ENDPOINT_UNKNOWN - The endpoint specified in the request is not registered. */
  STATUS_ENDPOINT_UNKNOWN = 2,
  /** STATUS_INCORRECT_CHALLENGE_RESPONSE - The challenge and/or response was incorrect. */
  STATUS_INCORRECT_CHALLENGE_RESPONSE = 5,
  UNRECOGNIZED = -1,
}

export function estopCheckInResponse_StatusFromJSON(
  object: any
): EstopCheckInResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return EstopCheckInResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return EstopCheckInResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_ENDPOINT_UNKNOWN":
      return EstopCheckInResponse_Status.STATUS_ENDPOINT_UNKNOWN;
    case 5:
    case "STATUS_INCORRECT_CHALLENGE_RESPONSE":
      return EstopCheckInResponse_Status.STATUS_INCORRECT_CHALLENGE_RESPONSE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return EstopCheckInResponse_Status.UNRECOGNIZED;
  }
}

export function estopCheckInResponse_StatusToJSON(
  object: EstopCheckInResponse_Status
): string {
  switch (object) {
    case EstopCheckInResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case EstopCheckInResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case EstopCheckInResponse_Status.STATUS_ENDPOINT_UNKNOWN:
      return "STATUS_ENDPOINT_UNKNOWN";
    case EstopCheckInResponse_Status.STATUS_INCORRECT_CHALLENGE_RESPONSE:
      return "STATUS_INCORRECT_CHALLENGE_RESPONSE";
    case EstopCheckInResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Register an endpoint.
 * EstopEndpoints must be registered before they can send commands or request challenges.
 */
export interface RegisterEstopEndpointRequest {
  /** Common request header */
  header: RequestHeader | undefined;
  /**
   * The endpoint to replace.
   * Set the endpoint's unique ID if replacing an active endpoint.
   */
  targetEndpoint: EstopEndpoint | undefined;
  /** ID of the configuration we are registering against. */
  targetConfigId: string;
  /**
   * The description of the new endpoint.
   * Do not set the unique ID. It will be ignored.
   */
  newEndpoint: EstopEndpoint | undefined;
}

/** Response to registration request. */
export interface RegisterEstopEndpointResponse {
  /** Common response header */
  header: ResponseHeader | undefined;
  /** Copy of the initial request. */
  request: RegisterEstopEndpointRequest | undefined;
  /** The resulting endpoint on success. */
  newEndpoint: EstopEndpoint | undefined;
  /** Status code for the response. */
  status: RegisterEstopEndpointResponse_Status;
}

export enum RegisterEstopEndpointResponse_Status {
  /** STATUS_UNKNOWN - An unknown / unexpected error occurred. */
  STATUS_UNKNOWN = 0,
  /** STATUS_SUCCESS - Request succeeded. */
  STATUS_SUCCESS = 1,
  /** STATUS_ENDPOINT_MISMATCH - Target endpoint did not match. */
  STATUS_ENDPOINT_MISMATCH = 2,
  /** STATUS_CONFIG_MISMATCH - Registered to wrong configuration. */
  STATUS_CONFIG_MISMATCH = 3,
  /** STATUS_INVALID_ENDPOINT - New endpoint was invalid. */
  STATUS_INVALID_ENDPOINT = 4,
  UNRECOGNIZED = -1,
}

export function registerEstopEndpointResponse_StatusFromJSON(
  object: any
): RegisterEstopEndpointResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return RegisterEstopEndpointResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_SUCCESS":
      return RegisterEstopEndpointResponse_Status.STATUS_SUCCESS;
    case 2:
    case "STATUS_ENDPOINT_MISMATCH":
      return RegisterEstopEndpointResponse_Status.STATUS_ENDPOINT_MISMATCH;
    case 3:
    case "STATUS_CONFIG_MISMATCH":
      return RegisterEstopEndpointResponse_Status.STATUS_CONFIG_MISMATCH;
    case 4:
    case "STATUS_INVALID_ENDPOINT":
      return RegisterEstopEndpointResponse_Status.STATUS_INVALID_ENDPOINT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RegisterEstopEndpointResponse_Status.UNRECOGNIZED;
  }
}

export function registerEstopEndpointResponse_StatusToJSON(
  object: RegisterEstopEndpointResponse_Status
): string {
  switch (object) {
    case RegisterEstopEndpointResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case RegisterEstopEndpointResponse_Status.STATUS_SUCCESS:
      return "STATUS_SUCCESS";
    case RegisterEstopEndpointResponse_Status.STATUS_ENDPOINT_MISMATCH:
      return "STATUS_ENDPOINT_MISMATCH";
    case RegisterEstopEndpointResponse_Status.STATUS_CONFIG_MISMATCH:
      return "STATUS_CONFIG_MISMATCH";
    case RegisterEstopEndpointResponse_Status.STATUS_INVALID_ENDPOINT:
      return "STATUS_INVALID_ENDPOINT";
    case RegisterEstopEndpointResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Deregister the specified E-Stop endpoint registration. */
export interface DeregisterEstopEndpointRequest {
  /** Common request header */
  header: RequestHeader | undefined;
  /** The endpoint to deregister. */
  targetEndpoint: EstopEndpoint | undefined;
  /** ID of the configuration we are registering against. */
  targetConfigId: string;
}

/** Response to E-Stop endpoint  deregistration request. */
export interface DeregisterEstopEndpointResponse {
  /** Common resonse header. */
  header: ResponseHeader | undefined;
  /** Copy of the initial request. */
  request: DeregisterEstopEndpointRequest | undefined;
  /** Status code for the response. */
  status: DeregisterEstopEndpointResponse_Status;
}

export enum DeregisterEstopEndpointResponse_Status {
  /** STATUS_UNKNOWN - An unknown / unexpected error occurred. */
  STATUS_UNKNOWN = 0,
  /** STATUS_SUCCESS - Request succeeded. */
  STATUS_SUCCESS = 1,
  /** STATUS_ENDPOINT_MISMATCH - Target endpoint did not match. */
  STATUS_ENDPOINT_MISMATCH = 2,
  /** STATUS_CONFIG_MISMATCH - Registered to wrong configuration. */
  STATUS_CONFIG_MISMATCH = 3,
  /** STATUS_MOTORS_ON - You cannot deregister an endpoint while the motors are on. */
  STATUS_MOTORS_ON = 4,
  UNRECOGNIZED = -1,
}

export function deregisterEstopEndpointResponse_StatusFromJSON(
  object: any
): DeregisterEstopEndpointResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return DeregisterEstopEndpointResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_SUCCESS":
      return DeregisterEstopEndpointResponse_Status.STATUS_SUCCESS;
    case 2:
    case "STATUS_ENDPOINT_MISMATCH":
      return DeregisterEstopEndpointResponse_Status.STATUS_ENDPOINT_MISMATCH;
    case 3:
    case "STATUS_CONFIG_MISMATCH":
      return DeregisterEstopEndpointResponse_Status.STATUS_CONFIG_MISMATCH;
    case 4:
    case "STATUS_MOTORS_ON":
      return DeregisterEstopEndpointResponse_Status.STATUS_MOTORS_ON;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DeregisterEstopEndpointResponse_Status.UNRECOGNIZED;
  }
}

export function deregisterEstopEndpointResponse_StatusToJSON(
  object: DeregisterEstopEndpointResponse_Status
): string {
  switch (object) {
    case DeregisterEstopEndpointResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case DeregisterEstopEndpointResponse_Status.STATUS_SUCCESS:
      return "STATUS_SUCCESS";
    case DeregisterEstopEndpointResponse_Status.STATUS_ENDPOINT_MISMATCH:
      return "STATUS_ENDPOINT_MISMATCH";
    case DeregisterEstopEndpointResponse_Status.STATUS_CONFIG_MISMATCH:
      return "STATUS_CONFIG_MISMATCH";
    case DeregisterEstopEndpointResponse_Status.STATUS_MOTORS_ON:
      return "STATUS_MOTORS_ON";
    case DeregisterEstopEndpointResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Get the active EstopConfig. */
export interface GetEstopConfigRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** The 'unique_id' of EstopConfig to get. */
  targetConfigId: string;
}

/** Response to EstopConfigRequest. */
export interface GetEstopConfigResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Copy of the request. */
  request: GetEstopConfigRequest | undefined;
  /** The currently active configuration. */
  activeConfig: EstopConfig | undefined;
}

/** Set a new active EstopConfig. */
export interface SetEstopConfigRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** New configuration to set. */
  config: EstopConfig | undefined;
  /** The 'unique_id' of EstopConfig to replace, if replacing one. */
  targetConfigId: string;
}

/** Response to EstopConfigRequest. */
export interface SetEstopConfigResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Copy of the request. */
  request: SetEstopConfigRequest | undefined;
  /** The currently active configuration. */
  activeConfig: EstopConfig | undefined;
  status: SetEstopConfigResponse_Status;
}

export enum SetEstopConfigResponse_Status {
  /** STATUS_UNKNOWN - An unknown / unexpected error occurred. */
  STATUS_UNKNOWN = 0,
  /** STATUS_SUCCESS - Request succeeded. */
  STATUS_SUCCESS = 1,
  /** STATUS_INVALID_ID - Tried to replace a EstopConfig, but provided bad ID. */
  STATUS_INVALID_ID = 2,
  /** STATUS_MOTORS_ON - You cannot set a configuration while the motors are on. */
  STATUS_MOTORS_ON = 4,
  UNRECOGNIZED = -1,
}

export function setEstopConfigResponse_StatusFromJSON(
  object: any
): SetEstopConfigResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return SetEstopConfigResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_SUCCESS":
      return SetEstopConfigResponse_Status.STATUS_SUCCESS;
    case 2:
    case "STATUS_INVALID_ID":
      return SetEstopConfigResponse_Status.STATUS_INVALID_ID;
    case 4:
    case "STATUS_MOTORS_ON":
      return SetEstopConfigResponse_Status.STATUS_MOTORS_ON;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SetEstopConfigResponse_Status.UNRECOGNIZED;
  }
}

export function setEstopConfigResponse_StatusToJSON(
  object: SetEstopConfigResponse_Status
): string {
  switch (object) {
    case SetEstopConfigResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case SetEstopConfigResponse_Status.STATUS_SUCCESS:
      return "STATUS_SUCCESS";
    case SetEstopConfigResponse_Status.STATUS_INVALID_ID:
      return "STATUS_INVALID_ID";
    case SetEstopConfigResponse_Status.STATUS_MOTORS_ON:
      return "STATUS_MOTORS_ON";
    case SetEstopConfigResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Ask for the current status of the Estop system. */
export interface GetEstopSystemStatusRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/** Respond with the current Estop system status. */
export interface GetEstopSystemStatusResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Status of the Estop system. */
  status: EstopSystemStatus | undefined;
}

function createBaseEstopEndpoint(): EstopEndpoint {
  return {
    role: "",
    name: "",
    uniqueId: "",
    timeout: undefined,
    cutPowerTimeout: undefined,
  };
}

export const EstopEndpoint = {
  encode(
    message: EstopEndpoint,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.role !== "") {
      writer.uint32(10).string(message.role);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.uniqueId !== "") {
      writer.uint32(26).string(message.uniqueId);
    }
    if (message.timeout !== undefined) {
      Duration.encode(message.timeout, writer.uint32(34).fork()).ldelim();
    }
    if (message.cutPowerTimeout !== undefined) {
      Duration.encode(
        message.cutPowerTimeout,
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EstopEndpoint {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstopEndpoint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.role = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.uniqueId = reader.string();
          break;
        case 4:
          message.timeout = Duration.decode(reader, reader.uint32());
          break;
        case 5:
          message.cutPowerTimeout = Duration.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EstopEndpoint {
    return {
      role: isSet(object.role) ? String(object.role) : "",
      name: isSet(object.name) ? String(object.name) : "",
      uniqueId: isSet(object.uniqueId) ? String(object.uniqueId) : "",
      timeout: isSet(object.timeout)
        ? Duration.fromJSON(object.timeout)
        : undefined,
      cutPowerTimeout: isSet(object.cutPowerTimeout)
        ? Duration.fromJSON(object.cutPowerTimeout)
        : undefined,
    };
  },

  toJSON(message: EstopEndpoint): unknown {
    const obj: any = {};
    message.role !== undefined && (obj.role = message.role);
    message.name !== undefined && (obj.name = message.name);
    message.uniqueId !== undefined && (obj.uniqueId = message.uniqueId);
    message.timeout !== undefined &&
      (obj.timeout = message.timeout
        ? Duration.toJSON(message.timeout)
        : undefined);
    message.cutPowerTimeout !== undefined &&
      (obj.cutPowerTimeout = message.cutPowerTimeout
        ? Duration.toJSON(message.cutPowerTimeout)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EstopEndpoint>, I>>(
    object: I
  ): EstopEndpoint {
    const message = createBaseEstopEndpoint();
    message.role = object.role ?? "";
    message.name = object.name ?? "";
    message.uniqueId = object.uniqueId ?? "";
    message.timeout =
      object.timeout !== undefined && object.timeout !== null
        ? Duration.fromPartial(object.timeout)
        : undefined;
    message.cutPowerTimeout =
      object.cutPowerTimeout !== undefined && object.cutPowerTimeout !== null
        ? Duration.fromPartial(object.cutPowerTimeout)
        : undefined;
    return message;
  },
};

function createBaseEstopConfig(): EstopConfig {
  return { endpoints: [], uniqueId: "" };
}

export const EstopConfig = {
  encode(
    message: EstopConfig,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.endpoints) {
      EstopEndpoint.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.uniqueId !== "") {
      writer.uint32(18).string(message.uniqueId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EstopConfig {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstopConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.endpoints.push(EstopEndpoint.decode(reader, reader.uint32()));
          break;
        case 2:
          message.uniqueId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EstopConfig {
    return {
      endpoints: Array.isArray(object?.endpoints)
        ? object.endpoints.map((e: any) => EstopEndpoint.fromJSON(e))
        : [],
      uniqueId: isSet(object.uniqueId) ? String(object.uniqueId) : "",
    };
  },

  toJSON(message: EstopConfig): unknown {
    const obj: any = {};
    if (message.endpoints) {
      obj.endpoints = message.endpoints.map((e) =>
        e ? EstopEndpoint.toJSON(e) : undefined
      );
    } else {
      obj.endpoints = [];
    }
    message.uniqueId !== undefined && (obj.uniqueId = message.uniqueId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EstopConfig>, I>>(
    object: I
  ): EstopConfig {
    const message = createBaseEstopConfig();
    message.endpoints =
      object.endpoints?.map((e) => EstopEndpoint.fromPartial(e)) || [];
    message.uniqueId = object.uniqueId ?? "";
    return message;
  },
};

function createBaseEstopEndpointWithStatus(): EstopEndpointWithStatus {
  return {
    endpoint: undefined,
    stopLevel: 0,
    timeSinceValidResponse: undefined,
  };
}

export const EstopEndpointWithStatus = {
  encode(
    message: EstopEndpointWithStatus,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.endpoint !== undefined) {
      EstopEndpoint.encode(message.endpoint, writer.uint32(10).fork()).ldelim();
    }
    if (message.stopLevel !== 0) {
      writer.uint32(16).int32(message.stopLevel);
    }
    if (message.timeSinceValidResponse !== undefined) {
      Duration.encode(
        message.timeSinceValidResponse,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): EstopEndpointWithStatus {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstopEndpointWithStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.endpoint = EstopEndpoint.decode(reader, reader.uint32());
          break;
        case 2:
          message.stopLevel = reader.int32() as any;
          break;
        case 3:
          message.timeSinceValidResponse = Duration.decode(
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

  fromJSON(object: any): EstopEndpointWithStatus {
    return {
      endpoint: isSet(object.endpoint)
        ? EstopEndpoint.fromJSON(object.endpoint)
        : undefined,
      stopLevel: isSet(object.stopLevel)
        ? estopStopLevelFromJSON(object.stopLevel)
        : 0,
      timeSinceValidResponse: isSet(object.timeSinceValidResponse)
        ? Duration.fromJSON(object.timeSinceValidResponse)
        : undefined,
    };
  },

  toJSON(message: EstopEndpointWithStatus): unknown {
    const obj: any = {};
    message.endpoint !== undefined &&
      (obj.endpoint = message.endpoint
        ? EstopEndpoint.toJSON(message.endpoint)
        : undefined);
    message.stopLevel !== undefined &&
      (obj.stopLevel = estopStopLevelToJSON(message.stopLevel));
    message.timeSinceValidResponse !== undefined &&
      (obj.timeSinceValidResponse = message.timeSinceValidResponse
        ? Duration.toJSON(message.timeSinceValidResponse)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EstopEndpointWithStatus>, I>>(
    object: I
  ): EstopEndpointWithStatus {
    const message = createBaseEstopEndpointWithStatus();
    message.endpoint =
      object.endpoint !== undefined && object.endpoint !== null
        ? EstopEndpoint.fromPartial(object.endpoint)
        : undefined;
    message.stopLevel = object.stopLevel ?? 0;
    message.timeSinceValidResponse =
      object.timeSinceValidResponse !== undefined &&
      object.timeSinceValidResponse !== null
        ? Duration.fromPartial(object.timeSinceValidResponse)
        : undefined;
    return message;
  },
};

function createBaseEstopSystemStatus(): EstopSystemStatus {
  return { endpoints: [], stopLevel: 0, stopLevelDetails: "" };
}

export const EstopSystemStatus = {
  encode(
    message: EstopSystemStatus,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.endpoints) {
      EstopEndpointWithStatus.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.stopLevel !== 0) {
      writer.uint32(32).int32(message.stopLevel);
    }
    if (message.stopLevelDetails !== "") {
      writer.uint32(42).string(message.stopLevelDetails);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EstopSystemStatus {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstopSystemStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 3:
          message.endpoints.push(
            EstopEndpointWithStatus.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.stopLevel = reader.int32() as any;
          break;
        case 5:
          message.stopLevelDetails = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EstopSystemStatus {
    return {
      endpoints: Array.isArray(object?.endpoints)
        ? object.endpoints.map((e: any) => EstopEndpointWithStatus.fromJSON(e))
        : [],
      stopLevel: isSet(object.stopLevel)
        ? estopStopLevelFromJSON(object.stopLevel)
        : 0,
      stopLevelDetails: isSet(object.stopLevelDetails)
        ? String(object.stopLevelDetails)
        : "",
    };
  },

  toJSON(message: EstopSystemStatus): unknown {
    const obj: any = {};
    if (message.endpoints) {
      obj.endpoints = message.endpoints.map((e) =>
        e ? EstopEndpointWithStatus.toJSON(e) : undefined
      );
    } else {
      obj.endpoints = [];
    }
    message.stopLevel !== undefined &&
      (obj.stopLevel = estopStopLevelToJSON(message.stopLevel));
    message.stopLevelDetails !== undefined &&
      (obj.stopLevelDetails = message.stopLevelDetails);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EstopSystemStatus>, I>>(
    object: I
  ): EstopSystemStatus {
    const message = createBaseEstopSystemStatus();
    message.endpoints =
      object.endpoints?.map((e) => EstopEndpointWithStatus.fromPartial(e)) ||
      [];
    message.stopLevel = object.stopLevel ?? 0;
    message.stopLevelDetails = object.stopLevelDetails ?? "";
    return message;
  },
};

function createBaseEstopCheckInRequest(): EstopCheckInRequest {
  return {
    header: undefined,
    endpoint: undefined,
    challenge: 0,
    response: 0,
    stopLevel: 0,
  };
}

export const EstopCheckInRequest = {
  encode(
    message: EstopCheckInRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.endpoint !== undefined) {
      EstopEndpoint.encode(message.endpoint, writer.uint32(18).fork()).ldelim();
    }
    if (message.challenge !== 0) {
      writer.uint32(24).uint64(message.challenge);
    }
    if (message.response !== 0) {
      writer.uint32(32).uint64(message.response);
    }
    if (message.stopLevel !== 0) {
      writer.uint32(40).int32(message.stopLevel);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EstopCheckInRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstopCheckInRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.endpoint = EstopEndpoint.decode(reader, reader.uint32());
          break;
        case 3:
          message.challenge = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.response = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.stopLevel = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EstopCheckInRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      endpoint: isSet(object.endpoint)
        ? EstopEndpoint.fromJSON(object.endpoint)
        : undefined,
      challenge: isSet(object.challenge) ? Number(object.challenge) : 0,
      response: isSet(object.response) ? Number(object.response) : 0,
      stopLevel: isSet(object.stopLevel)
        ? estopStopLevelFromJSON(object.stopLevel)
        : 0,
    };
  },

  toJSON(message: EstopCheckInRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.endpoint !== undefined &&
      (obj.endpoint = message.endpoint
        ? EstopEndpoint.toJSON(message.endpoint)
        : undefined);
    message.challenge !== undefined &&
      (obj.challenge = Math.round(message.challenge));
    message.response !== undefined &&
      (obj.response = Math.round(message.response));
    message.stopLevel !== undefined &&
      (obj.stopLevel = estopStopLevelToJSON(message.stopLevel));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EstopCheckInRequest>, I>>(
    object: I
  ): EstopCheckInRequest {
    const message = createBaseEstopCheckInRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.endpoint =
      object.endpoint !== undefined && object.endpoint !== null
        ? EstopEndpoint.fromPartial(object.endpoint)
        : undefined;
    message.challenge = object.challenge ?? 0;
    message.response = object.response ?? 0;
    message.stopLevel = object.stopLevel ?? 0;
    return message;
  },
};

function createBaseEstopCheckInResponse(): EstopCheckInResponse {
  return { header: undefined, request: undefined, challenge: 0, status: 0 };
}

export const EstopCheckInResponse = {
  encode(
    message: EstopCheckInResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.request !== undefined) {
      EstopCheckInRequest.encode(
        message.request,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.challenge !== 0) {
      writer.uint32(24).uint64(message.challenge);
    }
    if (message.status !== 0) {
      writer.uint32(32).int32(message.status);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): EstopCheckInResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstopCheckInResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.request = EstopCheckInRequest.decode(reader, reader.uint32());
          break;
        case 3:
          message.challenge = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EstopCheckInResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      request: isSet(object.request)
        ? EstopCheckInRequest.fromJSON(object.request)
        : undefined,
      challenge: isSet(object.challenge) ? Number(object.challenge) : 0,
      status: isSet(object.status)
        ? estopCheckInResponse_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: EstopCheckInResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.request !== undefined &&
      (obj.request = message.request
        ? EstopCheckInRequest.toJSON(message.request)
        : undefined);
    message.challenge !== undefined &&
      (obj.challenge = Math.round(message.challenge));
    message.status !== undefined &&
      (obj.status = estopCheckInResponse_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EstopCheckInResponse>, I>>(
    object: I
  ): EstopCheckInResponse {
    const message = createBaseEstopCheckInResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.request =
      object.request !== undefined && object.request !== null
        ? EstopCheckInRequest.fromPartial(object.request)
        : undefined;
    message.challenge = object.challenge ?? 0;
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseRegisterEstopEndpointRequest(): RegisterEstopEndpointRequest {
  return {
    header: undefined,
    targetEndpoint: undefined,
    targetConfigId: "",
    newEndpoint: undefined,
  };
}

export const RegisterEstopEndpointRequest = {
  encode(
    message: RegisterEstopEndpointRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.targetEndpoint !== undefined) {
      EstopEndpoint.encode(
        message.targetEndpoint,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.targetConfigId !== "") {
      writer.uint32(26).string(message.targetConfigId);
    }
    if (message.newEndpoint !== undefined) {
      EstopEndpoint.encode(
        message.newEndpoint,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RegisterEstopEndpointRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterEstopEndpointRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.targetEndpoint = EstopEndpoint.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.targetConfigId = reader.string();
          break;
        case 4:
          message.newEndpoint = EstopEndpoint.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegisterEstopEndpointRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      targetEndpoint: isSet(object.targetEndpoint)
        ? EstopEndpoint.fromJSON(object.targetEndpoint)
        : undefined,
      targetConfigId: isSet(object.targetConfigId)
        ? String(object.targetConfigId)
        : "",
      newEndpoint: isSet(object.newEndpoint)
        ? EstopEndpoint.fromJSON(object.newEndpoint)
        : undefined,
    };
  },

  toJSON(message: RegisterEstopEndpointRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.targetEndpoint !== undefined &&
      (obj.targetEndpoint = message.targetEndpoint
        ? EstopEndpoint.toJSON(message.targetEndpoint)
        : undefined);
    message.targetConfigId !== undefined &&
      (obj.targetConfigId = message.targetConfigId);
    message.newEndpoint !== undefined &&
      (obj.newEndpoint = message.newEndpoint
        ? EstopEndpoint.toJSON(message.newEndpoint)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RegisterEstopEndpointRequest>, I>>(
    object: I
  ): RegisterEstopEndpointRequest {
    const message = createBaseRegisterEstopEndpointRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.targetEndpoint =
      object.targetEndpoint !== undefined && object.targetEndpoint !== null
        ? EstopEndpoint.fromPartial(object.targetEndpoint)
        : undefined;
    message.targetConfigId = object.targetConfigId ?? "";
    message.newEndpoint =
      object.newEndpoint !== undefined && object.newEndpoint !== null
        ? EstopEndpoint.fromPartial(object.newEndpoint)
        : undefined;
    return message;
  },
};

function createBaseRegisterEstopEndpointResponse(): RegisterEstopEndpointResponse {
  return {
    header: undefined,
    request: undefined,
    newEndpoint: undefined,
    status: 0,
  };
}

export const RegisterEstopEndpointResponse = {
  encode(
    message: RegisterEstopEndpointResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.request !== undefined) {
      RegisterEstopEndpointRequest.encode(
        message.request,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.newEndpoint !== undefined) {
      EstopEndpoint.encode(
        message.newEndpoint,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(32).int32(message.status);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RegisterEstopEndpointResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterEstopEndpointResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.request = RegisterEstopEndpointRequest.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.newEndpoint = EstopEndpoint.decode(reader, reader.uint32());
          break;
        case 4:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegisterEstopEndpointResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      request: isSet(object.request)
        ? RegisterEstopEndpointRequest.fromJSON(object.request)
        : undefined,
      newEndpoint: isSet(object.newEndpoint)
        ? EstopEndpoint.fromJSON(object.newEndpoint)
        : undefined,
      status: isSet(object.status)
        ? registerEstopEndpointResponse_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: RegisterEstopEndpointResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.request !== undefined &&
      (obj.request = message.request
        ? RegisterEstopEndpointRequest.toJSON(message.request)
        : undefined);
    message.newEndpoint !== undefined &&
      (obj.newEndpoint = message.newEndpoint
        ? EstopEndpoint.toJSON(message.newEndpoint)
        : undefined);
    message.status !== undefined &&
      (obj.status = registerEstopEndpointResponse_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RegisterEstopEndpointResponse>, I>>(
    object: I
  ): RegisterEstopEndpointResponse {
    const message = createBaseRegisterEstopEndpointResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.request =
      object.request !== undefined && object.request !== null
        ? RegisterEstopEndpointRequest.fromPartial(object.request)
        : undefined;
    message.newEndpoint =
      object.newEndpoint !== undefined && object.newEndpoint !== null
        ? EstopEndpoint.fromPartial(object.newEndpoint)
        : undefined;
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseDeregisterEstopEndpointRequest(): DeregisterEstopEndpointRequest {
  return { header: undefined, targetEndpoint: undefined, targetConfigId: "" };
}

export const DeregisterEstopEndpointRequest = {
  encode(
    message: DeregisterEstopEndpointRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.targetEndpoint !== undefined) {
      EstopEndpoint.encode(
        message.targetEndpoint,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.targetConfigId !== "") {
      writer.uint32(26).string(message.targetConfigId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DeregisterEstopEndpointRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeregisterEstopEndpointRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.targetEndpoint = EstopEndpoint.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.targetConfigId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeregisterEstopEndpointRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      targetEndpoint: isSet(object.targetEndpoint)
        ? EstopEndpoint.fromJSON(object.targetEndpoint)
        : undefined,
      targetConfigId: isSet(object.targetConfigId)
        ? String(object.targetConfigId)
        : "",
    };
  },

  toJSON(message: DeregisterEstopEndpointRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.targetEndpoint !== undefined &&
      (obj.targetEndpoint = message.targetEndpoint
        ? EstopEndpoint.toJSON(message.targetEndpoint)
        : undefined);
    message.targetConfigId !== undefined &&
      (obj.targetConfigId = message.targetConfigId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeregisterEstopEndpointRequest>, I>>(
    object: I
  ): DeregisterEstopEndpointRequest {
    const message = createBaseDeregisterEstopEndpointRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.targetEndpoint =
      object.targetEndpoint !== undefined && object.targetEndpoint !== null
        ? EstopEndpoint.fromPartial(object.targetEndpoint)
        : undefined;
    message.targetConfigId = object.targetConfigId ?? "";
    return message;
  },
};

function createBaseDeregisterEstopEndpointResponse(): DeregisterEstopEndpointResponse {
  return { header: undefined, request: undefined, status: 0 };
}

export const DeregisterEstopEndpointResponse = {
  encode(
    message: DeregisterEstopEndpointResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.request !== undefined) {
      DeregisterEstopEndpointRequest.encode(
        message.request,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(32).int32(message.status);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DeregisterEstopEndpointResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeregisterEstopEndpointResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.request = DeregisterEstopEndpointRequest.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeregisterEstopEndpointResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      request: isSet(object.request)
        ? DeregisterEstopEndpointRequest.fromJSON(object.request)
        : undefined,
      status: isSet(object.status)
        ? deregisterEstopEndpointResponse_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: DeregisterEstopEndpointResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.request !== undefined &&
      (obj.request = message.request
        ? DeregisterEstopEndpointRequest.toJSON(message.request)
        : undefined);
    message.status !== undefined &&
      (obj.status = deregisterEstopEndpointResponse_StatusToJSON(
        message.status
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeregisterEstopEndpointResponse>, I>>(
    object: I
  ): DeregisterEstopEndpointResponse {
    const message = createBaseDeregisterEstopEndpointResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.request =
      object.request !== undefined && object.request !== null
        ? DeregisterEstopEndpointRequest.fromPartial(object.request)
        : undefined;
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseGetEstopConfigRequest(): GetEstopConfigRequest {
  return { header: undefined, targetConfigId: "" };
}

export const GetEstopConfigRequest = {
  encode(
    message: GetEstopConfigRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.targetConfigId !== "") {
      writer.uint32(34).string(message.targetConfigId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetEstopConfigRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetEstopConfigRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 4:
          message.targetConfigId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetEstopConfigRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      targetConfigId: isSet(object.targetConfigId)
        ? String(object.targetConfigId)
        : "",
    };
  },

  toJSON(message: GetEstopConfigRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.targetConfigId !== undefined &&
      (obj.targetConfigId = message.targetConfigId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetEstopConfigRequest>, I>>(
    object: I
  ): GetEstopConfigRequest {
    const message = createBaseGetEstopConfigRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.targetConfigId = object.targetConfigId ?? "";
    return message;
  },
};

function createBaseGetEstopConfigResponse(): GetEstopConfigResponse {
  return { header: undefined, request: undefined, activeConfig: undefined };
}

export const GetEstopConfigResponse = {
  encode(
    message: GetEstopConfigResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.request !== undefined) {
      GetEstopConfigRequest.encode(
        message.request,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.activeConfig !== undefined) {
      EstopConfig.encode(
        message.activeConfig,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetEstopConfigResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetEstopConfigResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.request = GetEstopConfigRequest.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.activeConfig = EstopConfig.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetEstopConfigResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      request: isSet(object.request)
        ? GetEstopConfigRequest.fromJSON(object.request)
        : undefined,
      activeConfig: isSet(object.activeConfig)
        ? EstopConfig.fromJSON(object.activeConfig)
        : undefined,
    };
  },

  toJSON(message: GetEstopConfigResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.request !== undefined &&
      (obj.request = message.request
        ? GetEstopConfigRequest.toJSON(message.request)
        : undefined);
    message.activeConfig !== undefined &&
      (obj.activeConfig = message.activeConfig
        ? EstopConfig.toJSON(message.activeConfig)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetEstopConfigResponse>, I>>(
    object: I
  ): GetEstopConfigResponse {
    const message = createBaseGetEstopConfigResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.request =
      object.request !== undefined && object.request !== null
        ? GetEstopConfigRequest.fromPartial(object.request)
        : undefined;
    message.activeConfig =
      object.activeConfig !== undefined && object.activeConfig !== null
        ? EstopConfig.fromPartial(object.activeConfig)
        : undefined;
    return message;
  },
};

function createBaseSetEstopConfigRequest(): SetEstopConfigRequest {
  return { header: undefined, config: undefined, targetConfigId: "" };
}

export const SetEstopConfigRequest = {
  encode(
    message: SetEstopConfigRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.config !== undefined) {
      EstopConfig.encode(message.config, writer.uint32(26).fork()).ldelim();
    }
    if (message.targetConfigId !== "") {
      writer.uint32(34).string(message.targetConfigId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SetEstopConfigRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetEstopConfigRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 3:
          message.config = EstopConfig.decode(reader, reader.uint32());
          break;
        case 4:
          message.targetConfigId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetEstopConfigRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      config: isSet(object.config)
        ? EstopConfig.fromJSON(object.config)
        : undefined,
      targetConfigId: isSet(object.targetConfigId)
        ? String(object.targetConfigId)
        : "",
    };
  },

  toJSON(message: SetEstopConfigRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.config !== undefined &&
      (obj.config = message.config
        ? EstopConfig.toJSON(message.config)
        : undefined);
    message.targetConfigId !== undefined &&
      (obj.targetConfigId = message.targetConfigId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetEstopConfigRequest>, I>>(
    object: I
  ): SetEstopConfigRequest {
    const message = createBaseSetEstopConfigRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.config =
      object.config !== undefined && object.config !== null
        ? EstopConfig.fromPartial(object.config)
        : undefined;
    message.targetConfigId = object.targetConfigId ?? "";
    return message;
  },
};

function createBaseSetEstopConfigResponse(): SetEstopConfigResponse {
  return {
    header: undefined,
    request: undefined,
    activeConfig: undefined,
    status: 0,
  };
}

export const SetEstopConfigResponse = {
  encode(
    message: SetEstopConfigResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.request !== undefined) {
      SetEstopConfigRequest.encode(
        message.request,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.activeConfig !== undefined) {
      EstopConfig.encode(
        message.activeConfig,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(32).int32(message.status);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SetEstopConfigResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetEstopConfigResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.request = SetEstopConfigRequest.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.activeConfig = EstopConfig.decode(reader, reader.uint32());
          break;
        case 4:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetEstopConfigResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      request: isSet(object.request)
        ? SetEstopConfigRequest.fromJSON(object.request)
        : undefined,
      activeConfig: isSet(object.activeConfig)
        ? EstopConfig.fromJSON(object.activeConfig)
        : undefined,
      status: isSet(object.status)
        ? setEstopConfigResponse_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: SetEstopConfigResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.request !== undefined &&
      (obj.request = message.request
        ? SetEstopConfigRequest.toJSON(message.request)
        : undefined);
    message.activeConfig !== undefined &&
      (obj.activeConfig = message.activeConfig
        ? EstopConfig.toJSON(message.activeConfig)
        : undefined);
    message.status !== undefined &&
      (obj.status = setEstopConfigResponse_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetEstopConfigResponse>, I>>(
    object: I
  ): SetEstopConfigResponse {
    const message = createBaseSetEstopConfigResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.request =
      object.request !== undefined && object.request !== null
        ? SetEstopConfigRequest.fromPartial(object.request)
        : undefined;
    message.activeConfig =
      object.activeConfig !== undefined && object.activeConfig !== null
        ? EstopConfig.fromPartial(object.activeConfig)
        : undefined;
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseGetEstopSystemStatusRequest(): GetEstopSystemStatusRequest {
  return { header: undefined };
}

export const GetEstopSystemStatusRequest = {
  encode(
    message: GetEstopSystemStatusRequest,
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
  ): GetEstopSystemStatusRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetEstopSystemStatusRequest();
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

  fromJSON(object: any): GetEstopSystemStatusRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: GetEstopSystemStatusRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetEstopSystemStatusRequest>, I>>(
    object: I
  ): GetEstopSystemStatusRequest {
    const message = createBaseGetEstopSystemStatusRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseGetEstopSystemStatusResponse(): GetEstopSystemStatusResponse {
  return { header: undefined, status: undefined };
}

export const GetEstopSystemStatusResponse = {
  encode(
    message: GetEstopSystemStatusResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== undefined) {
      EstopSystemStatus.encode(
        message.status,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetEstopSystemStatusResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetEstopSystemStatusResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 3:
          message.status = EstopSystemStatus.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetEstopSystemStatusResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? EstopSystemStatus.fromJSON(object.status)
        : undefined,
    };
  },

  toJSON(message: GetEstopSystemStatusResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = message.status
        ? EstopSystemStatus.toJSON(message.status)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetEstopSystemStatusResponse>, I>>(
    object: I
  ): GetEstopSystemStatusResponse {
    const message = createBaseGetEstopSystemStatusResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status =
      object.status !== undefined && object.status !== null
        ? EstopSystemStatus.fromPartial(object.status)
        : undefined;
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
