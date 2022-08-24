/* eslint-disable */
import { Timestamp } from "../../../google/protobuf/timestamp";
import { RequestHeader, ResponseHeader } from "../header";
import { Lease, LeaseUseResult } from "../lease";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api.docking";

/** Type of dock */
export enum DockType {
  /** DOCK_TYPE_UNKNOWN - Unknown type of dock */
  DOCK_TYPE_UNKNOWN = 0,
  /** DOCK_TYPE_CONTACT_PROTOTYPE - Prototype version SpotDock */
  DOCK_TYPE_CONTACT_PROTOTYPE = 2,
  /** DOCK_TYPE_SPOT_DOCK - Production version SpotDock */
  DOCK_TYPE_SPOT_DOCK = 3,
  UNRECOGNIZED = -1,
}

export function dockTypeFromJSON(object: any): DockType {
  switch (object) {
    case 0:
    case "DOCK_TYPE_UNKNOWN":
      return DockType.DOCK_TYPE_UNKNOWN;
    case 2:
    case "DOCK_TYPE_CONTACT_PROTOTYPE":
      return DockType.DOCK_TYPE_CONTACT_PROTOTYPE;
    case 3:
    case "DOCK_TYPE_SPOT_DOCK":
      return DockType.DOCK_TYPE_SPOT_DOCK;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DockType.UNRECOGNIZED;
  }
}

export function dockTypeToJSON(object: DockType): string {
  switch (object) {
    case DockType.DOCK_TYPE_UNKNOWN:
      return "DOCK_TYPE_UNKNOWN";
    case DockType.DOCK_TYPE_CONTACT_PROTOTYPE:
      return "DOCK_TYPE_CONTACT_PROTOTYPE";
    case DockType.DOCK_TYPE_SPOT_DOCK:
      return "DOCK_TYPE_SPOT_DOCK";
    case DockType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Defines how and whether we use the "pre-docking" pose. */
export enum PrepPoseBehavior {
  /** PREP_POSE_UNKNOWN - Default behavior, equivalent to PREP_POSE_USE_POSE. */
  PREP_POSE_UNKNOWN = 0,
  /** PREP_POSE_USE_POSE - Goes to the pre-docking pose before docking. */
  PREP_POSE_USE_POSE = 1,
  /** PREP_POSE_SKIP_POSE - Docks before going to the pre-docking pose. */
  PREP_POSE_SKIP_POSE = 2,
  /** PREP_POSE_ONLY_POSE - Goes to the pre-docking pose, and then returns SUCCESS without docking. */
  PREP_POSE_ONLY_POSE = 3,
  /** PREP_POSE_UNDOCK - Use this enum to undock a currently docked robot. */
  PREP_POSE_UNDOCK = 4,
  UNRECOGNIZED = -1,
}

export function prepPoseBehaviorFromJSON(object: any): PrepPoseBehavior {
  switch (object) {
    case 0:
    case "PREP_POSE_UNKNOWN":
      return PrepPoseBehavior.PREP_POSE_UNKNOWN;
    case 1:
    case "PREP_POSE_USE_POSE":
      return PrepPoseBehavior.PREP_POSE_USE_POSE;
    case 2:
    case "PREP_POSE_SKIP_POSE":
      return PrepPoseBehavior.PREP_POSE_SKIP_POSE;
    case 3:
    case "PREP_POSE_ONLY_POSE":
      return PrepPoseBehavior.PREP_POSE_ONLY_POSE;
    case 4:
    case "PREP_POSE_UNDOCK":
      return PrepPoseBehavior.PREP_POSE_UNDOCK;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PrepPoseBehavior.UNRECOGNIZED;
  }
}

export function prepPoseBehaviorToJSON(object: PrepPoseBehavior): string {
  switch (object) {
    case PrepPoseBehavior.PREP_POSE_UNKNOWN:
      return "PREP_POSE_UNKNOWN";
    case PrepPoseBehavior.PREP_POSE_USE_POSE:
      return "PREP_POSE_USE_POSE";
    case PrepPoseBehavior.PREP_POSE_SKIP_POSE:
      return "PREP_POSE_SKIP_POSE";
    case PrepPoseBehavior.PREP_POSE_ONLY_POSE:
      return "PREP_POSE_ONLY_POSE";
    case PrepPoseBehavior.PREP_POSE_UNDOCK:
      return "PREP_POSE_UNDOCK";
    case PrepPoseBehavior.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Message to command the robot to dock. \
 * Note: If the robot is docked, you can undock the robot by issuing a command with
 * `prep_pose_behavior=PREP_POSE_UNDOCK`. If undocking, `docking_station_id` is not required.
 */
export interface DockingCommandRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** The Lease to show ownership of the robot. */
  lease: Lease | undefined;
  /**
   * ID of docking station to dock at.
   * This is ignored if undocking the robot, the current dock is used.
   */
  dockingStationId: number;
  /** Identifier provided by the time sync service to verify time sync between robot and client. */
  clockIdentifier: string;
  /**
   * The timestamp (in robot time) by which a command must finish executing.
   * This is a required field and used to prevent runaway commands.
   */
  endTime: Date | undefined;
  /** [Optional] Specify the prep pose behavior */
  prepPoseBehavior: PrepPoseBehavior;
}

/** Response to a DockingCommandRequest */
export interface DockingCommandResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Details about how the lease was used. */
  leaseUseResult: LeaseUseResult | undefined;
  /** Result of issued command. */
  status: DockingCommandResponse_Status;
  /** Unique identifier for the command (if accepted, `status=STATUS_OK`). */
  dockingCommandId: number;
}

export enum DockingCommandResponse_Status {
  /** STATUS_UNKNOWN - Status is not specified. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Docking command accepted */
  STATUS_OK = 1,
  /** STATUS_ERROR_LEASE - ERROR: Lease rejected */
  STATUS_ERROR_LEASE = 4,
  /** STATUS_ERROR_DOCK_NOT_FOUND - ERROR: Dock fiducial not found. */
  STATUS_ERROR_DOCK_NOT_FOUND = 5,
  /** STATUS_ERROR_NOT_DOCKED - ERROR: Trying to undock while not docked */
  STATUS_ERROR_NOT_DOCKED = 6,
  /** STATUS_ERROR_GRIPPER_HOLDING_ITEM - ERROR: Trying to dock when the arm is holding an object. */
  STATUS_ERROR_GRIPPER_HOLDING_ITEM = 8,
  /** STATUS_ERROR_NOT_AVAILABLE - ERROR: The dock is not available for docking. */
  STATUS_ERROR_NOT_AVAILABLE = 9,
  /**
   * STATUS_ERROR_SYSTEM - ERROR: Internal system error during execution
   * This error cannot be resolved by issuing a new DockingCommand
   * Check the returned message for details
   */
  STATUS_ERROR_SYSTEM = 7,
  UNRECOGNIZED = -1,
}

export function dockingCommandResponse_StatusFromJSON(
  object: any
): DockingCommandResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return DockingCommandResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return DockingCommandResponse_Status.STATUS_OK;
    case 4:
    case "STATUS_ERROR_LEASE":
      return DockingCommandResponse_Status.STATUS_ERROR_LEASE;
    case 5:
    case "STATUS_ERROR_DOCK_NOT_FOUND":
      return DockingCommandResponse_Status.STATUS_ERROR_DOCK_NOT_FOUND;
    case 6:
    case "STATUS_ERROR_NOT_DOCKED":
      return DockingCommandResponse_Status.STATUS_ERROR_NOT_DOCKED;
    case 8:
    case "STATUS_ERROR_GRIPPER_HOLDING_ITEM":
      return DockingCommandResponse_Status.STATUS_ERROR_GRIPPER_HOLDING_ITEM;
    case 9:
    case "STATUS_ERROR_NOT_AVAILABLE":
      return DockingCommandResponse_Status.STATUS_ERROR_NOT_AVAILABLE;
    case 7:
    case "STATUS_ERROR_SYSTEM":
      return DockingCommandResponse_Status.STATUS_ERROR_SYSTEM;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DockingCommandResponse_Status.UNRECOGNIZED;
  }
}

export function dockingCommandResponse_StatusToJSON(
  object: DockingCommandResponse_Status
): string {
  switch (object) {
    case DockingCommandResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case DockingCommandResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case DockingCommandResponse_Status.STATUS_ERROR_LEASE:
      return "STATUS_ERROR_LEASE";
    case DockingCommandResponse_Status.STATUS_ERROR_DOCK_NOT_FOUND:
      return "STATUS_ERROR_DOCK_NOT_FOUND";
    case DockingCommandResponse_Status.STATUS_ERROR_NOT_DOCKED:
      return "STATUS_ERROR_NOT_DOCKED";
    case DockingCommandResponse_Status.STATUS_ERROR_GRIPPER_HOLDING_ITEM:
      return "STATUS_ERROR_GRIPPER_HOLDING_ITEM";
    case DockingCommandResponse_Status.STATUS_ERROR_NOT_AVAILABLE:
      return "STATUS_ERROR_NOT_AVAILABLE";
    case DockingCommandResponse_Status.STATUS_ERROR_SYSTEM:
      return "STATUS_ERROR_SYSTEM";
    case DockingCommandResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Message to get the status of a previously issued DockingCommand */
export interface DockingCommandFeedbackRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Unique identifier of the command to get feedback for. */
  dockingCommandId: number;
}

/** Response to a DockingCommandFeedbackRequest for a particualar docking command ID */
export interface DockingCommandFeedbackResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Details about how the lease was used (unset if unknown). */
  leaseUseResult: LeaseUseResult | undefined;
  /** Current feedback of specified command ID. */
  status: DockingCommandFeedbackResponse_Status;
}

export enum DockingCommandFeedbackResponse_Status {
  /** STATUS_UNKNOWN - Status is not specified. */
  STATUS_UNKNOWN = 0,
  /** STATUS_IN_PROGRESS - Docking command is executing. */
  STATUS_IN_PROGRESS = 1,
  /** STATUS_DOCKED - Docking command succeeded, the robot is docked. */
  STATUS_DOCKED = 2,
  /** STATUS_AT_PREP_POSE - Final success state for `PREP_POSE_ONLY_POSE` or `PREP_POSE_UNDOCK`. */
  STATUS_AT_PREP_POSE = 11,
  /**
   * STATUS_MISALIGNED - Misaligned was detected between the robot and the dock.
   * The docking command was aborted to save an ending up in an unrecoverable state, please try again.
   */
  STATUS_MISALIGNED = 10,
  /** STATUS_OLD_DOCKING_COMMAND - This DockingCommand overridden by new docking command. */
  STATUS_OLD_DOCKING_COMMAND = 3,
  /** STATUS_ERROR_DOCK_LOST - ERROR: The sensed dock has been lost and is no longer found. */
  STATUS_ERROR_DOCK_LOST = 4,
  /** STATUS_ERROR_LEASE - ERROR: Lease rejected. */
  STATUS_ERROR_LEASE = 5,
  /** STATUS_ERROR_COMMAND_TIMED_OUT - ERROR: End time has been reached. */
  STATUS_ERROR_COMMAND_TIMED_OUT = 6,
  /** STATUS_ERROR_NO_TIMESYNC - ERROR: No Timesync with system. */
  STATUS_ERROR_NO_TIMESYNC = 7,
  /** STATUS_ERROR_TOO_DISTANT - ERROR: Provided end time too far in the future. */
  STATUS_ERROR_TOO_DISTANT = 8,
  /** STATUS_ERROR_NOT_AVAILABLE - ERROR: The dock is not available for docking. */
  STATUS_ERROR_NOT_AVAILABLE = 12,
  /** STATUS_ERROR_UNREFINED_PRIOR - ERROR: The prior could not be confirmed as a real dock */
  STATUS_ERROR_UNREFINED_PRIOR = 13,
  /**
   * STATUS_ERROR_SYSTEM - ERROR: Internal system error during execution
   * This error cannot be resolved by issuing a new DockingCommand
   * Check the returned message for details
   */
  STATUS_ERROR_SYSTEM = 9,
  UNRECOGNIZED = -1,
}

export function dockingCommandFeedbackResponse_StatusFromJSON(
  object: any
): DockingCommandFeedbackResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return DockingCommandFeedbackResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_IN_PROGRESS":
      return DockingCommandFeedbackResponse_Status.STATUS_IN_PROGRESS;
    case 2:
    case "STATUS_DOCKED":
      return DockingCommandFeedbackResponse_Status.STATUS_DOCKED;
    case 11:
    case "STATUS_AT_PREP_POSE":
      return DockingCommandFeedbackResponse_Status.STATUS_AT_PREP_POSE;
    case 10:
    case "STATUS_MISALIGNED":
      return DockingCommandFeedbackResponse_Status.STATUS_MISALIGNED;
    case 3:
    case "STATUS_OLD_DOCKING_COMMAND":
      return DockingCommandFeedbackResponse_Status.STATUS_OLD_DOCKING_COMMAND;
    case 4:
    case "STATUS_ERROR_DOCK_LOST":
      return DockingCommandFeedbackResponse_Status.STATUS_ERROR_DOCK_LOST;
    case 5:
    case "STATUS_ERROR_LEASE":
      return DockingCommandFeedbackResponse_Status.STATUS_ERROR_LEASE;
    case 6:
    case "STATUS_ERROR_COMMAND_TIMED_OUT":
      return DockingCommandFeedbackResponse_Status.STATUS_ERROR_COMMAND_TIMED_OUT;
    case 7:
    case "STATUS_ERROR_NO_TIMESYNC":
      return DockingCommandFeedbackResponse_Status.STATUS_ERROR_NO_TIMESYNC;
    case 8:
    case "STATUS_ERROR_TOO_DISTANT":
      return DockingCommandFeedbackResponse_Status.STATUS_ERROR_TOO_DISTANT;
    case 12:
    case "STATUS_ERROR_NOT_AVAILABLE":
      return DockingCommandFeedbackResponse_Status.STATUS_ERROR_NOT_AVAILABLE;
    case 13:
    case "STATUS_ERROR_UNREFINED_PRIOR":
      return DockingCommandFeedbackResponse_Status.STATUS_ERROR_UNREFINED_PRIOR;
    case 9:
    case "STATUS_ERROR_SYSTEM":
      return DockingCommandFeedbackResponse_Status.STATUS_ERROR_SYSTEM;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DockingCommandFeedbackResponse_Status.UNRECOGNIZED;
  }
}

export function dockingCommandFeedbackResponse_StatusToJSON(
  object: DockingCommandFeedbackResponse_Status
): string {
  switch (object) {
    case DockingCommandFeedbackResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case DockingCommandFeedbackResponse_Status.STATUS_IN_PROGRESS:
      return "STATUS_IN_PROGRESS";
    case DockingCommandFeedbackResponse_Status.STATUS_DOCKED:
      return "STATUS_DOCKED";
    case DockingCommandFeedbackResponse_Status.STATUS_AT_PREP_POSE:
      return "STATUS_AT_PREP_POSE";
    case DockingCommandFeedbackResponse_Status.STATUS_MISALIGNED:
      return "STATUS_MISALIGNED";
    case DockingCommandFeedbackResponse_Status.STATUS_OLD_DOCKING_COMMAND:
      return "STATUS_OLD_DOCKING_COMMAND";
    case DockingCommandFeedbackResponse_Status.STATUS_ERROR_DOCK_LOST:
      return "STATUS_ERROR_DOCK_LOST";
    case DockingCommandFeedbackResponse_Status.STATUS_ERROR_LEASE:
      return "STATUS_ERROR_LEASE";
    case DockingCommandFeedbackResponse_Status.STATUS_ERROR_COMMAND_TIMED_OUT:
      return "STATUS_ERROR_COMMAND_TIMED_OUT";
    case DockingCommandFeedbackResponse_Status.STATUS_ERROR_NO_TIMESYNC:
      return "STATUS_ERROR_NO_TIMESYNC";
    case DockingCommandFeedbackResponse_Status.STATUS_ERROR_TOO_DISTANT:
      return "STATUS_ERROR_TOO_DISTANT";
    case DockingCommandFeedbackResponse_Status.STATUS_ERROR_NOT_AVAILABLE:
      return "STATUS_ERROR_NOT_AVAILABLE";
    case DockingCommandFeedbackResponse_Status.STATUS_ERROR_UNREFINED_PRIOR:
      return "STATUS_ERROR_UNREFINED_PRIOR";
    case DockingCommandFeedbackResponse_Status.STATUS_ERROR_SYSTEM:
      return "STATUS_ERROR_SYSTEM";
    case DockingCommandFeedbackResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** The configuration of a range of dock ID's */
export interface ConfigRange {
  /** Starting ID */
  idStart: number;
  /** Ending ID */
  idEnd: number;
  /** Type of dock for this range */
  type: DockType;
}

export interface GetDockingConfigRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

export interface GetDockingConfigResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** A series of `ConfigRange` specifying details for dock ID numbers. */
  dockConfigs: ConfigRange[];
}

/**
 * Message describing the overall dock state of the robot, including power & comms connections.  \
 * Not tied to any particular DockingCommand ID.  \
 * Note: [*] indicates fields which are only valid if the status is DOCK_STATUS_DOCKED or DOCK_STATUS_DOCKING  \
 * or DOCK_STATUS_UNDOCKING. \
 * Note: [^] indicates fields which are only valid if the status is DOCK_STATUS_DOCKED.  \
 */
export interface DockState {
  /** Status of if the robot is on dock */
  status: DockState_DockedStatus;
  /** [*] Type of the dock */
  dockType: DockType;
  /** [*] ID of the dock */
  dockId: number;
  /** [^] Status of power detection from the dock */
  powerStatus: DockState_LinkStatus;
}

export enum DockState_DockedStatus {
  /** DOCK_STATUS_UNKNOWN - Unknown */
  DOCK_STATUS_UNKNOWN = 0,
  /** DOCK_STATUS_DOCKED - Robot is detected as on a dock */
  DOCK_STATUS_DOCKED = 1,
  /** DOCK_STATUS_DOCKING - Robot is currently running a docking command */
  DOCK_STATUS_DOCKING = 2,
  /** DOCK_STATUS_UNDOCKED - Robot is not detected as on dock */
  DOCK_STATUS_UNDOCKED = 3,
  /** DOCK_STATUS_UNDOCKING - Robot is currently running an undocking command */
  DOCK_STATUS_UNDOCKING = 4,
  UNRECOGNIZED = -1,
}

export function dockState_DockedStatusFromJSON(
  object: any
): DockState_DockedStatus {
  switch (object) {
    case 0:
    case "DOCK_STATUS_UNKNOWN":
      return DockState_DockedStatus.DOCK_STATUS_UNKNOWN;
    case 1:
    case "DOCK_STATUS_DOCKED":
      return DockState_DockedStatus.DOCK_STATUS_DOCKED;
    case 2:
    case "DOCK_STATUS_DOCKING":
      return DockState_DockedStatus.DOCK_STATUS_DOCKING;
    case 3:
    case "DOCK_STATUS_UNDOCKED":
      return DockState_DockedStatus.DOCK_STATUS_UNDOCKED;
    case 4:
    case "DOCK_STATUS_UNDOCKING":
      return DockState_DockedStatus.DOCK_STATUS_UNDOCKING;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DockState_DockedStatus.UNRECOGNIZED;
  }
}

export function dockState_DockedStatusToJSON(
  object: DockState_DockedStatus
): string {
  switch (object) {
    case DockState_DockedStatus.DOCK_STATUS_UNKNOWN:
      return "DOCK_STATUS_UNKNOWN";
    case DockState_DockedStatus.DOCK_STATUS_DOCKED:
      return "DOCK_STATUS_DOCKED";
    case DockState_DockedStatus.DOCK_STATUS_DOCKING:
      return "DOCK_STATUS_DOCKING";
    case DockState_DockedStatus.DOCK_STATUS_UNDOCKED:
      return "DOCK_STATUS_UNDOCKED";
    case DockState_DockedStatus.DOCK_STATUS_UNDOCKING:
      return "DOCK_STATUS_UNDOCKING";
    case DockState_DockedStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum DockState_LinkStatus {
  /** LINK_STATUS_UNKNOWN - Unknown or Not applicable */
  LINK_STATUS_UNKNOWN = 0,
  /** LINK_STATUS_DETECTING - The link status is being detected */
  LINK_STATUS_DETECTING = 3,
  /** LINK_STATUS_CONNECTED - The link is detected as connected */
  LINK_STATUS_CONNECTED = 1,
  /** LINK_STATUS_ERROR - The link could not be detected */
  LINK_STATUS_ERROR = 2,
  UNRECOGNIZED = -1,
}

export function dockState_LinkStatusFromJSON(
  object: any
): DockState_LinkStatus {
  switch (object) {
    case 0:
    case "LINK_STATUS_UNKNOWN":
      return DockState_LinkStatus.LINK_STATUS_UNKNOWN;
    case 3:
    case "LINK_STATUS_DETECTING":
      return DockState_LinkStatus.LINK_STATUS_DETECTING;
    case 1:
    case "LINK_STATUS_CONNECTED":
      return DockState_LinkStatus.LINK_STATUS_CONNECTED;
    case 2:
    case "LINK_STATUS_ERROR":
      return DockState_LinkStatus.LINK_STATUS_ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DockState_LinkStatus.UNRECOGNIZED;
  }
}

export function dockState_LinkStatusToJSON(
  object: DockState_LinkStatus
): string {
  switch (object) {
    case DockState_LinkStatus.LINK_STATUS_UNKNOWN:
      return "LINK_STATUS_UNKNOWN";
    case DockState_LinkStatus.LINK_STATUS_DETECTING:
      return "LINK_STATUS_DETECTING";
    case DockState_LinkStatus.LINK_STATUS_CONNECTED:
      return "LINK_STATUS_CONNECTED";
    case DockState_LinkStatus.LINK_STATUS_ERROR:
      return "LINK_STATUS_ERROR";
    case DockState_LinkStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Message to get the overall docking state */
export interface GetDockingStateRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/** Response of a GetDockingStateRequest */
export interface GetDockingStateResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  dockState: DockState | undefined;
}

function createBaseDockingCommandRequest(): DockingCommandRequest {
  return {
    header: undefined,
    lease: undefined,
    dockingStationId: 0,
    clockIdentifier: "",
    endTime: undefined,
    prepPoseBehavior: 0,
  };
}

export const DockingCommandRequest = {
  encode(
    message: DockingCommandRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.lease !== undefined) {
      Lease.encode(message.lease, writer.uint32(18).fork()).ldelim();
    }
    if (message.dockingStationId !== 0) {
      writer.uint32(24).uint32(message.dockingStationId);
    }
    if (message.clockIdentifier !== "") {
      writer.uint32(34).string(message.clockIdentifier);
    }
    if (message.endTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.endTime),
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.prepPoseBehavior !== 0) {
      writer.uint32(72).int32(message.prepPoseBehavior);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DockingCommandRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDockingCommandRequest();
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
          message.dockingStationId = reader.uint32();
          break;
        case 4:
          message.clockIdentifier = reader.string();
          break;
        case 5:
          message.endTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 9:
          message.prepPoseBehavior = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DockingCommandRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      lease: isSet(object.lease) ? Lease.fromJSON(object.lease) : undefined,
      dockingStationId: isSet(object.dockingStationId)
        ? Number(object.dockingStationId)
        : 0,
      clockIdentifier: isSet(object.clockIdentifier)
        ? String(object.clockIdentifier)
        : "",
      endTime: isSet(object.endTime)
        ? fromJsonTimestamp(object.endTime)
        : undefined,
      prepPoseBehavior: isSet(object.prepPoseBehavior)
        ? prepPoseBehaviorFromJSON(object.prepPoseBehavior)
        : 0,
    };
  },

  toJSON(message: DockingCommandRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.lease !== undefined &&
      (obj.lease = message.lease ? Lease.toJSON(message.lease) : undefined);
    message.dockingStationId !== undefined &&
      (obj.dockingStationId = Math.round(message.dockingStationId));
    message.clockIdentifier !== undefined &&
      (obj.clockIdentifier = message.clockIdentifier);
    message.endTime !== undefined &&
      (obj.endTime = message.endTime.toISOString());
    message.prepPoseBehavior !== undefined &&
      (obj.prepPoseBehavior = prepPoseBehaviorToJSON(message.prepPoseBehavior));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DockingCommandRequest>, I>>(
    object: I
  ): DockingCommandRequest {
    const message = createBaseDockingCommandRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.lease =
      object.lease !== undefined && object.lease !== null
        ? Lease.fromPartial(object.lease)
        : undefined;
    message.dockingStationId = object.dockingStationId ?? 0;
    message.clockIdentifier = object.clockIdentifier ?? "";
    message.endTime = object.endTime ?? undefined;
    message.prepPoseBehavior = object.prepPoseBehavior ?? 0;
    return message;
  },
};

function createBaseDockingCommandResponse(): DockingCommandResponse {
  return {
    header: undefined,
    leaseUseResult: undefined,
    status: 0,
    dockingCommandId: 0,
  };
}

export const DockingCommandResponse = {
  encode(
    message: DockingCommandResponse,
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
    if (message.dockingCommandId !== 0) {
      writer.uint32(40).uint32(message.dockingCommandId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DockingCommandResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDockingCommandResponse();
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
        case 5:
          message.dockingCommandId = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DockingCommandResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      leaseUseResult: isSet(object.leaseUseResult)
        ? LeaseUseResult.fromJSON(object.leaseUseResult)
        : undefined,
      status: isSet(object.status)
        ? dockingCommandResponse_StatusFromJSON(object.status)
        : 0,
      dockingCommandId: isSet(object.dockingCommandId)
        ? Number(object.dockingCommandId)
        : 0,
    };
  },

  toJSON(message: DockingCommandResponse): unknown {
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
      (obj.status = dockingCommandResponse_StatusToJSON(message.status));
    message.dockingCommandId !== undefined &&
      (obj.dockingCommandId = Math.round(message.dockingCommandId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DockingCommandResponse>, I>>(
    object: I
  ): DockingCommandResponse {
    const message = createBaseDockingCommandResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.leaseUseResult =
      object.leaseUseResult !== undefined && object.leaseUseResult !== null
        ? LeaseUseResult.fromPartial(object.leaseUseResult)
        : undefined;
    message.status = object.status ?? 0;
    message.dockingCommandId = object.dockingCommandId ?? 0;
    return message;
  },
};

function createBaseDockingCommandFeedbackRequest(): DockingCommandFeedbackRequest {
  return { header: undefined, dockingCommandId: 0 };
}

export const DockingCommandFeedbackRequest = {
  encode(
    message: DockingCommandFeedbackRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.dockingCommandId !== 0) {
      writer.uint32(16).uint32(message.dockingCommandId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DockingCommandFeedbackRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDockingCommandFeedbackRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.dockingCommandId = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DockingCommandFeedbackRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      dockingCommandId: isSet(object.dockingCommandId)
        ? Number(object.dockingCommandId)
        : 0,
    };
  },

  toJSON(message: DockingCommandFeedbackRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.dockingCommandId !== undefined &&
      (obj.dockingCommandId = Math.round(message.dockingCommandId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DockingCommandFeedbackRequest>, I>>(
    object: I
  ): DockingCommandFeedbackRequest {
    const message = createBaseDockingCommandFeedbackRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.dockingCommandId = object.dockingCommandId ?? 0;
    return message;
  },
};

function createBaseDockingCommandFeedbackResponse(): DockingCommandFeedbackResponse {
  return { header: undefined, leaseUseResult: undefined, status: 0 };
}

export const DockingCommandFeedbackResponse = {
  encode(
    message: DockingCommandFeedbackResponse,
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
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DockingCommandFeedbackResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDockingCommandFeedbackResponse();
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
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DockingCommandFeedbackResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      leaseUseResult: isSet(object.leaseUseResult)
        ? LeaseUseResult.fromJSON(object.leaseUseResult)
        : undefined,
      status: isSet(object.status)
        ? dockingCommandFeedbackResponse_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: DockingCommandFeedbackResponse): unknown {
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
      (obj.status = dockingCommandFeedbackResponse_StatusToJSON(
        message.status
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DockingCommandFeedbackResponse>, I>>(
    object: I
  ): DockingCommandFeedbackResponse {
    const message = createBaseDockingCommandFeedbackResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.leaseUseResult =
      object.leaseUseResult !== undefined && object.leaseUseResult !== null
        ? LeaseUseResult.fromPartial(object.leaseUseResult)
        : undefined;
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseConfigRange(): ConfigRange {
  return { idStart: 0, idEnd: 0, type: 0 };
}

export const ConfigRange = {
  encode(
    message: ConfigRange,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.idStart !== 0) {
      writer.uint32(8).uint32(message.idStart);
    }
    if (message.idEnd !== 0) {
      writer.uint32(16).uint32(message.idEnd);
    }
    if (message.type !== 0) {
      writer.uint32(24).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConfigRange {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConfigRange();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.idStart = reader.uint32();
          break;
        case 2:
          message.idEnd = reader.uint32();
          break;
        case 3:
          message.type = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ConfigRange {
    return {
      idStart: isSet(object.idStart) ? Number(object.idStart) : 0,
      idEnd: isSet(object.idEnd) ? Number(object.idEnd) : 0,
      type: isSet(object.type) ? dockTypeFromJSON(object.type) : 0,
    };
  },

  toJSON(message: ConfigRange): unknown {
    const obj: any = {};
    message.idStart !== undefined &&
      (obj.idStart = Math.round(message.idStart));
    message.idEnd !== undefined && (obj.idEnd = Math.round(message.idEnd));
    message.type !== undefined && (obj.type = dockTypeToJSON(message.type));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ConfigRange>, I>>(
    object: I
  ): ConfigRange {
    const message = createBaseConfigRange();
    message.idStart = object.idStart ?? 0;
    message.idEnd = object.idEnd ?? 0;
    message.type = object.type ?? 0;
    return message;
  },
};

function createBaseGetDockingConfigRequest(): GetDockingConfigRequest {
  return { header: undefined };
}

export const GetDockingConfigRequest = {
  encode(
    message: GetDockingConfigRequest,
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
  ): GetDockingConfigRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetDockingConfigRequest();
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

  fromJSON(object: any): GetDockingConfigRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: GetDockingConfigRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetDockingConfigRequest>, I>>(
    object: I
  ): GetDockingConfigRequest {
    const message = createBaseGetDockingConfigRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseGetDockingConfigResponse(): GetDockingConfigResponse {
  return { header: undefined, dockConfigs: [] };
}

export const GetDockingConfigResponse = {
  encode(
    message: GetDockingConfigResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.dockConfigs) {
      ConfigRange.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetDockingConfigResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetDockingConfigResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.dockConfigs.push(ConfigRange.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetDockingConfigResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      dockConfigs: Array.isArray(object?.dockConfigs)
        ? object.dockConfigs.map((e: any) => ConfigRange.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetDockingConfigResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.dockConfigs) {
      obj.dockConfigs = message.dockConfigs.map((e) =>
        e ? ConfigRange.toJSON(e) : undefined
      );
    } else {
      obj.dockConfigs = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetDockingConfigResponse>, I>>(
    object: I
  ): GetDockingConfigResponse {
    const message = createBaseGetDockingConfigResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.dockConfigs =
      object.dockConfigs?.map((e) => ConfigRange.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDockState(): DockState {
  return { status: 0, dockType: 0, dockId: 0, powerStatus: 0 };
}

export const DockState = {
  encode(
    message: DockState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    if (message.dockType !== 0) {
      writer.uint32(16).int32(message.dockType);
    }
    if (message.dockId !== 0) {
      writer.uint32(24).uint32(message.dockId);
    }
    if (message.powerStatus !== 0) {
      writer.uint32(32).int32(message.powerStatus);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DockState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDockState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32() as any;
          break;
        case 2:
          message.dockType = reader.int32() as any;
          break;
        case 3:
          message.dockId = reader.uint32();
          break;
        case 4:
          message.powerStatus = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DockState {
    return {
      status: isSet(object.status)
        ? dockState_DockedStatusFromJSON(object.status)
        : 0,
      dockType: isSet(object.dockType) ? dockTypeFromJSON(object.dockType) : 0,
      dockId: isSet(object.dockId) ? Number(object.dockId) : 0,
      powerStatus: isSet(object.powerStatus)
        ? dockState_LinkStatusFromJSON(object.powerStatus)
        : 0,
    };
  },

  toJSON(message: DockState): unknown {
    const obj: any = {};
    message.status !== undefined &&
      (obj.status = dockState_DockedStatusToJSON(message.status));
    message.dockType !== undefined &&
      (obj.dockType = dockTypeToJSON(message.dockType));
    message.dockId !== undefined && (obj.dockId = Math.round(message.dockId));
    message.powerStatus !== undefined &&
      (obj.powerStatus = dockState_LinkStatusToJSON(message.powerStatus));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DockState>, I>>(
    object: I
  ): DockState {
    const message = createBaseDockState();
    message.status = object.status ?? 0;
    message.dockType = object.dockType ?? 0;
    message.dockId = object.dockId ?? 0;
    message.powerStatus = object.powerStatus ?? 0;
    return message;
  },
};

function createBaseGetDockingStateRequest(): GetDockingStateRequest {
  return { header: undefined };
}

export const GetDockingStateRequest = {
  encode(
    message: GetDockingStateRequest,
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
  ): GetDockingStateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetDockingStateRequest();
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

  fromJSON(object: any): GetDockingStateRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: GetDockingStateRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetDockingStateRequest>, I>>(
    object: I
  ): GetDockingStateRequest {
    const message = createBaseGetDockingStateRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseGetDockingStateResponse(): GetDockingStateResponse {
  return { header: undefined, dockState: undefined };
}

export const GetDockingStateResponse = {
  encode(
    message: GetDockingStateResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.dockState !== undefined) {
      DockState.encode(message.dockState, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetDockingStateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetDockingStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.dockState = DockState.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetDockingStateResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      dockState: isSet(object.dockState)
        ? DockState.fromJSON(object.dockState)
        : undefined,
    };
  },

  toJSON(message: GetDockingStateResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.dockState !== undefined &&
      (obj.dockState = message.dockState
        ? DockState.toJSON(message.dockState)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetDockingStateResponse>, I>>(
    object: I
  ): GetDockingStateResponse {
    const message = createBaseGetDockingStateResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.dockState =
      object.dockState !== undefined && object.dockState !== null
        ? DockState.fromPartial(object.dockState)
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
