/* eslint-disable */
import { Timestamp } from "../../../google/protobuf/timestamp";
import { RequestHeader, ResponseHeader } from "../header";
import { Lease, LeaseUseResult } from "../lease";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api.spot";

/** Request for the SpotCheckCommand service. */
export interface SpotCheckCommandRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** The Lease to show ownership of the robot. Lease required to issue any SpotCheck command. */
  lease: Lease | undefined;
  /** The describing what the spot check service should do. */
  command: SpotCheckCommandRequest_Command;
}

export enum SpotCheckCommandRequest_Command {
  /** COMMAND_UNKNOWN - Unused enum. */
  COMMAND_UNKNOWN = 0,
  /** COMMAND_START - Start spot check joint calibration and camera checks. */
  COMMAND_START = 1,
  /** COMMAND_ABORT - Abort spot check joint calibration and camera check. */
  COMMAND_ABORT = 2,
  /** COMMAND_REVERT_CAL - Revert joint calibration back to the previous values. */
  COMMAND_REVERT_CAL = 3,
  UNRECOGNIZED = -1,
}

export function spotCheckCommandRequest_CommandFromJSON(
  object: any
): SpotCheckCommandRequest_Command {
  switch (object) {
    case 0:
    case "COMMAND_UNKNOWN":
      return SpotCheckCommandRequest_Command.COMMAND_UNKNOWN;
    case 1:
    case "COMMAND_START":
      return SpotCheckCommandRequest_Command.COMMAND_START;
    case 2:
    case "COMMAND_ABORT":
      return SpotCheckCommandRequest_Command.COMMAND_ABORT;
    case 3:
    case "COMMAND_REVERT_CAL":
      return SpotCheckCommandRequest_Command.COMMAND_REVERT_CAL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SpotCheckCommandRequest_Command.UNRECOGNIZED;
  }
}

export function spotCheckCommandRequest_CommandToJSON(
  object: SpotCheckCommandRequest_Command
): string {
  switch (object) {
    case SpotCheckCommandRequest_Command.COMMAND_UNKNOWN:
      return "COMMAND_UNKNOWN";
    case SpotCheckCommandRequest_Command.COMMAND_START:
      return "COMMAND_START";
    case SpotCheckCommandRequest_Command.COMMAND_ABORT:
      return "COMMAND_ABORT";
    case SpotCheckCommandRequest_Command.COMMAND_REVERT_CAL:
      return "COMMAND_REVERT_CAL";
    case SpotCheckCommandRequest_Command.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Response for the SpotCheckCommand service. */
export interface SpotCheckCommandResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Details about how the lease was used. */
  leaseUseResult: LeaseUseResult | undefined;
  /** Command status */
  status: SpotCheckCommandResponse_Status;
  /** Human-readable description if an error occurred. */
  message: string;
}

export enum SpotCheckCommandResponse_Status {
  /** STATUS_UNKNOWN - Unknown */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Request was accepted. */
  STATUS_OK = 1,
  /** STATUS_ERROR - An error ocurred. */
  STATUS_ERROR = 2,
  UNRECOGNIZED = -1,
}

export function spotCheckCommandResponse_StatusFromJSON(
  object: any
): SpotCheckCommandResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return SpotCheckCommandResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return SpotCheckCommandResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_ERROR":
      return SpotCheckCommandResponse_Status.STATUS_ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SpotCheckCommandResponse_Status.UNRECOGNIZED;
  }
}

export function spotCheckCommandResponse_StatusToJSON(
  object: SpotCheckCommandResponse_Status
): string {
  switch (object) {
    case SpotCheckCommandResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case SpotCheckCommandResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case SpotCheckCommandResponse_Status.STATUS_ERROR:
      return "STATUS_ERROR";
    case SpotCheckCommandResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Request for the SpotCheckFeedback service. */
export interface SpotCheckFeedbackRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/** Response for the SpotCheckFeedback service. */
export interface SpotCheckFeedbackResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** The state of the spot check routine. */
  state: SpotCheckFeedbackResponse_State;
  /**
   * The last command executed by Spotcheck. When SpotCheck is in state WAITING_FOR_COMMAND,
   * the last command has completed.
   */
  lastCommand: SpotCheckCommandRequest_Command;
  /** The specifics of the error for the SpotCheck service. */
  error: SpotCheckFeedbackResponse_Error;
  /**
   * Results from camera check.
   * The key string is the location of the camera (e.g. frontright, frontleft, left, ...)
   */
  cameraResults: { [key: string]: DepthPlaneSpotCheckResult };
  /**
   * Results from load cell calibration.
   * The key string is the location of the joint (e.g. fl.hxa, fl.hya, fl.kna, ...)
   */
  loadCellResults: { [key: string]: LoadCellSpotCheckResult };
  /**
   * Results from output position sensor calibration.
   * The key string is the location of the joint (e.g. fl.hx, fl.hy, fl.kn, ...)
   */
  kinematicCalResults: { [key: string]: JointKinematicCheckResult };
  /** Result from the payload check */
  payloadResult: PayloadCheckResult | undefined;
  /**
   * Deprecated. Results of foot height validation.
   * The key string is the name of the leg (e.g. fl, fr, hl, ...)
   *
   * @deprecated
   */
  footHeightResults: { [key: string]: FootHeightCheckResult };
  /**
   * Deprecated. Results of leg pair validation.
   * The key string is the name of the leg pair (e.g. fl-fr, fl-hl, ...)
   *
   * @deprecated
   */
  legPairResults: { [key: string]: LegPairCheckResult };
  /**
   * Results of the hip range of motion check
   * The key string is the name of the leg (e.g. fl, fr, hl, ...)
   */
  hipRangeOfMotionResults: { [key: string]: HipRangeOfMotionResult };
  /** The approximate progress of the spot check routine, range [0-1]. */
  progress: number;
  /** Timestamp for the most up-to-date calibration */
  lastCalTimestamp: Date | undefined;
}

export enum SpotCheckFeedbackResponse_State {
  /** STATE_UNKNOWN - Unused enum. */
  STATE_UNKNOWN = 0,
  /** STATE_USER_ABORTED - SpotCheck is aborted by the user. */
  STATE_USER_ABORTED = 1,
  /** STATE_STARTING - SpotCheck is initializing. */
  STATE_STARTING = 2,
  /** STATE_LOADCELL_CAL - Load cell calibration underway. */
  STATE_LOADCELL_CAL = 3,
  /** STATE_ENDSTOP_CAL - Endstop calibration underway. */
  STATE_ENDSTOP_CAL = 4,
  /** STATE_CAMERA_CHECK - Camera check underway. */
  STATE_CAMERA_CHECK = 5,
  /** STATE_BODY_POSING - Body pose routine underway. */
  STATE_BODY_POSING = 6,
  /** STATE_FINISHED - Spot check successfully finished. */
  STATE_FINISHED = 7,
  /** STATE_REVERTING_CAL - Reverting calibration to previous values. */
  STATE_REVERTING_CAL = 8,
  /** STATE_ERROR - Error occurred while running spotcheck. Inspect error for more info. */
  STATE_ERROR = 9,
  /** STATE_WAITING_FOR_COMMAND - Waiting for user command. */
  STATE_WAITING_FOR_COMMAND = 10,
  /** STATE_HIP_RANGE_OF_MOTION_CHECK - Hip range of motion check underway. */
  STATE_HIP_RANGE_OF_MOTION_CHECK = 11,
  /** STATE_GRIPPER_CAL - Gripper calibration underway. */
  STATE_GRIPPER_CAL = 12,
  /** STATE_SIT_DOWN_AFTER_RUN - Sitting down after run. */
  STATE_SIT_DOWN_AFTER_RUN = 13,
  UNRECOGNIZED = -1,
}

export function spotCheckFeedbackResponse_StateFromJSON(
  object: any
): SpotCheckFeedbackResponse_State {
  switch (object) {
    case 0:
    case "STATE_UNKNOWN":
      return SpotCheckFeedbackResponse_State.STATE_UNKNOWN;
    case 1:
    case "STATE_USER_ABORTED":
      return SpotCheckFeedbackResponse_State.STATE_USER_ABORTED;
    case 2:
    case "STATE_STARTING":
      return SpotCheckFeedbackResponse_State.STATE_STARTING;
    case 3:
    case "STATE_LOADCELL_CAL":
      return SpotCheckFeedbackResponse_State.STATE_LOADCELL_CAL;
    case 4:
    case "STATE_ENDSTOP_CAL":
      return SpotCheckFeedbackResponse_State.STATE_ENDSTOP_CAL;
    case 5:
    case "STATE_CAMERA_CHECK":
      return SpotCheckFeedbackResponse_State.STATE_CAMERA_CHECK;
    case 6:
    case "STATE_BODY_POSING":
      return SpotCheckFeedbackResponse_State.STATE_BODY_POSING;
    case 7:
    case "STATE_FINISHED":
      return SpotCheckFeedbackResponse_State.STATE_FINISHED;
    case 8:
    case "STATE_REVERTING_CAL":
      return SpotCheckFeedbackResponse_State.STATE_REVERTING_CAL;
    case 9:
    case "STATE_ERROR":
      return SpotCheckFeedbackResponse_State.STATE_ERROR;
    case 10:
    case "STATE_WAITING_FOR_COMMAND":
      return SpotCheckFeedbackResponse_State.STATE_WAITING_FOR_COMMAND;
    case 11:
    case "STATE_HIP_RANGE_OF_MOTION_CHECK":
      return SpotCheckFeedbackResponse_State.STATE_HIP_RANGE_OF_MOTION_CHECK;
    case 12:
    case "STATE_GRIPPER_CAL":
      return SpotCheckFeedbackResponse_State.STATE_GRIPPER_CAL;
    case 13:
    case "STATE_SIT_DOWN_AFTER_RUN":
      return SpotCheckFeedbackResponse_State.STATE_SIT_DOWN_AFTER_RUN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SpotCheckFeedbackResponse_State.UNRECOGNIZED;
  }
}

export function spotCheckFeedbackResponse_StateToJSON(
  object: SpotCheckFeedbackResponse_State
): string {
  switch (object) {
    case SpotCheckFeedbackResponse_State.STATE_UNKNOWN:
      return "STATE_UNKNOWN";
    case SpotCheckFeedbackResponse_State.STATE_USER_ABORTED:
      return "STATE_USER_ABORTED";
    case SpotCheckFeedbackResponse_State.STATE_STARTING:
      return "STATE_STARTING";
    case SpotCheckFeedbackResponse_State.STATE_LOADCELL_CAL:
      return "STATE_LOADCELL_CAL";
    case SpotCheckFeedbackResponse_State.STATE_ENDSTOP_CAL:
      return "STATE_ENDSTOP_CAL";
    case SpotCheckFeedbackResponse_State.STATE_CAMERA_CHECK:
      return "STATE_CAMERA_CHECK";
    case SpotCheckFeedbackResponse_State.STATE_BODY_POSING:
      return "STATE_BODY_POSING";
    case SpotCheckFeedbackResponse_State.STATE_FINISHED:
      return "STATE_FINISHED";
    case SpotCheckFeedbackResponse_State.STATE_REVERTING_CAL:
      return "STATE_REVERTING_CAL";
    case SpotCheckFeedbackResponse_State.STATE_ERROR:
      return "STATE_ERROR";
    case SpotCheckFeedbackResponse_State.STATE_WAITING_FOR_COMMAND:
      return "STATE_WAITING_FOR_COMMAND";
    case SpotCheckFeedbackResponse_State.STATE_HIP_RANGE_OF_MOTION_CHECK:
      return "STATE_HIP_RANGE_OF_MOTION_CHECK";
    case SpotCheckFeedbackResponse_State.STATE_GRIPPER_CAL:
      return "STATE_GRIPPER_CAL";
    case SpotCheckFeedbackResponse_State.STATE_SIT_DOWN_AFTER_RUN:
      return "STATE_SIT_DOWN_AFTER_RUN";
    case SpotCheckFeedbackResponse_State.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * If SpotCheck experienced an error, specific error details reported here.
 * This reflects an error in the routine.
 */
export enum SpotCheckFeedbackResponse_Error {
  /** ERROR_UNKNOWN - Unused enum. */
  ERROR_UNKNOWN = 0,
  /** ERROR_NONE - No error has occurred. */
  ERROR_NONE = 1,
  /** ERROR_UNEXPECTED_POWER_CHANGE - Unexpected motor power state transition. */
  ERROR_UNEXPECTED_POWER_CHANGE = 2,
  /** ERROR_INIT_IMU_CHECK - Robot body is not flat on the ground. */
  ERROR_INIT_IMU_CHECK = 3,
  /** ERROR_INIT_NOT_SITTING - Robot body is not close to a sitting pose */
  ERROR_INIT_NOT_SITTING = 4,
  /** ERROR_LOADCELL_TIMEOUT - Timeout during loadcell calibration. */
  ERROR_LOADCELL_TIMEOUT = 5,
  /** ERROR_POWER_ON_FAILURE - Error enabling motor power. */
  ERROR_POWER_ON_FAILURE = 6,
  /** ERROR_ENDSTOP_TIMEOUT - Timeout during endstop calibration. */
  ERROR_ENDSTOP_TIMEOUT = 7,
  /** ERROR_FAILED_STAND - Robot failed to stand. */
  ERROR_FAILED_STAND = 8,
  /** ERROR_CAMERA_TIMEOUT - Timeout during camera check. */
  ERROR_CAMERA_TIMEOUT = 9,
  /** ERROR_GROUND_CHECK - Flat ground check failed. */
  ERROR_GROUND_CHECK = 10,
  /** ERROR_POWER_OFF_FAILURE - Robot failed to power off. */
  ERROR_POWER_OFF_FAILURE = 11,
  /** ERROR_REVERT_FAILURE - Robot failed to revert calibration. */
  ERROR_REVERT_FAILURE = 12,
  /** ERROR_FGKC_FAILURE - Robot failed to do flat ground kinematic calibration. */
  ERROR_FGKC_FAILURE = 13,
  /** ERROR_GRIPPER_CAL_TIMEOUT - Timeout during gripper calibration. */
  ERROR_GRIPPER_CAL_TIMEOUT = 14,
  UNRECOGNIZED = -1,
}

export function spotCheckFeedbackResponse_ErrorFromJSON(
  object: any
): SpotCheckFeedbackResponse_Error {
  switch (object) {
    case 0:
    case "ERROR_UNKNOWN":
      return SpotCheckFeedbackResponse_Error.ERROR_UNKNOWN;
    case 1:
    case "ERROR_NONE":
      return SpotCheckFeedbackResponse_Error.ERROR_NONE;
    case 2:
    case "ERROR_UNEXPECTED_POWER_CHANGE":
      return SpotCheckFeedbackResponse_Error.ERROR_UNEXPECTED_POWER_CHANGE;
    case 3:
    case "ERROR_INIT_IMU_CHECK":
      return SpotCheckFeedbackResponse_Error.ERROR_INIT_IMU_CHECK;
    case 4:
    case "ERROR_INIT_NOT_SITTING":
      return SpotCheckFeedbackResponse_Error.ERROR_INIT_NOT_SITTING;
    case 5:
    case "ERROR_LOADCELL_TIMEOUT":
      return SpotCheckFeedbackResponse_Error.ERROR_LOADCELL_TIMEOUT;
    case 6:
    case "ERROR_POWER_ON_FAILURE":
      return SpotCheckFeedbackResponse_Error.ERROR_POWER_ON_FAILURE;
    case 7:
    case "ERROR_ENDSTOP_TIMEOUT":
      return SpotCheckFeedbackResponse_Error.ERROR_ENDSTOP_TIMEOUT;
    case 8:
    case "ERROR_FAILED_STAND":
      return SpotCheckFeedbackResponse_Error.ERROR_FAILED_STAND;
    case 9:
    case "ERROR_CAMERA_TIMEOUT":
      return SpotCheckFeedbackResponse_Error.ERROR_CAMERA_TIMEOUT;
    case 10:
    case "ERROR_GROUND_CHECK":
      return SpotCheckFeedbackResponse_Error.ERROR_GROUND_CHECK;
    case 11:
    case "ERROR_POWER_OFF_FAILURE":
      return SpotCheckFeedbackResponse_Error.ERROR_POWER_OFF_FAILURE;
    case 12:
    case "ERROR_REVERT_FAILURE":
      return SpotCheckFeedbackResponse_Error.ERROR_REVERT_FAILURE;
    case 13:
    case "ERROR_FGKC_FAILURE":
      return SpotCheckFeedbackResponse_Error.ERROR_FGKC_FAILURE;
    case 14:
    case "ERROR_GRIPPER_CAL_TIMEOUT":
      return SpotCheckFeedbackResponse_Error.ERROR_GRIPPER_CAL_TIMEOUT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SpotCheckFeedbackResponse_Error.UNRECOGNIZED;
  }
}

export function spotCheckFeedbackResponse_ErrorToJSON(
  object: SpotCheckFeedbackResponse_Error
): string {
  switch (object) {
    case SpotCheckFeedbackResponse_Error.ERROR_UNKNOWN:
      return "ERROR_UNKNOWN";
    case SpotCheckFeedbackResponse_Error.ERROR_NONE:
      return "ERROR_NONE";
    case SpotCheckFeedbackResponse_Error.ERROR_UNEXPECTED_POWER_CHANGE:
      return "ERROR_UNEXPECTED_POWER_CHANGE";
    case SpotCheckFeedbackResponse_Error.ERROR_INIT_IMU_CHECK:
      return "ERROR_INIT_IMU_CHECK";
    case SpotCheckFeedbackResponse_Error.ERROR_INIT_NOT_SITTING:
      return "ERROR_INIT_NOT_SITTING";
    case SpotCheckFeedbackResponse_Error.ERROR_LOADCELL_TIMEOUT:
      return "ERROR_LOADCELL_TIMEOUT";
    case SpotCheckFeedbackResponse_Error.ERROR_POWER_ON_FAILURE:
      return "ERROR_POWER_ON_FAILURE";
    case SpotCheckFeedbackResponse_Error.ERROR_ENDSTOP_TIMEOUT:
      return "ERROR_ENDSTOP_TIMEOUT";
    case SpotCheckFeedbackResponse_Error.ERROR_FAILED_STAND:
      return "ERROR_FAILED_STAND";
    case SpotCheckFeedbackResponse_Error.ERROR_CAMERA_TIMEOUT:
      return "ERROR_CAMERA_TIMEOUT";
    case SpotCheckFeedbackResponse_Error.ERROR_GROUND_CHECK:
      return "ERROR_GROUND_CHECK";
    case SpotCheckFeedbackResponse_Error.ERROR_POWER_OFF_FAILURE:
      return "ERROR_POWER_OFF_FAILURE";
    case SpotCheckFeedbackResponse_Error.ERROR_REVERT_FAILURE:
      return "ERROR_REVERT_FAILURE";
    case SpotCheckFeedbackResponse_Error.ERROR_FGKC_FAILURE:
      return "ERROR_FGKC_FAILURE";
    case SpotCheckFeedbackResponse_Error.ERROR_GRIPPER_CAL_TIMEOUT:
      return "ERROR_GRIPPER_CAL_TIMEOUT";
    case SpotCheckFeedbackResponse_Error.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface SpotCheckFeedbackResponse_CameraResultsEntry {
  key: string;
  value: DepthPlaneSpotCheckResult | undefined;
}

export interface SpotCheckFeedbackResponse_LoadCellResultsEntry {
  key: string;
  value: LoadCellSpotCheckResult | undefined;
}

export interface SpotCheckFeedbackResponse_KinematicCalResultsEntry {
  key: string;
  value: JointKinematicCheckResult | undefined;
}

export interface SpotCheckFeedbackResponse_FootHeightResultsEntry {
  key: string;
  value: FootHeightCheckResult | undefined;
}

export interface SpotCheckFeedbackResponse_LegPairResultsEntry {
  key: string;
  value: LegPairCheckResult | undefined;
}

export interface SpotCheckFeedbackResponse_HipRangeOfMotionResultsEntry {
  key: string;
  value: HipRangeOfMotionResult | undefined;
}

/** Results from camera check. */
export interface DepthPlaneSpotCheckResult {
  /** Return status for the request. */
  status: DepthPlaneSpotCheckResult_Status;
  /** Higher is worse. Above 100 means the camera is severely out of calibration. */
  severityScore: number;
}

/** Errors reflect an issue with camera hardware. */
export enum DepthPlaneSpotCheckResult_Status {
  /** STATUS_UNKNOWN - Unused enum. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - No detected calibration error. */
  STATUS_OK = 1,
  /** STATUS_WARNING - Possible calibration error detected. */
  STATUS_WARNING = 2,
  /** STATUS_ERROR - Error with robot calibration. */
  STATUS_ERROR = 3,
  UNRECOGNIZED = -1,
}

export function depthPlaneSpotCheckResult_StatusFromJSON(
  object: any
): DepthPlaneSpotCheckResult_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return DepthPlaneSpotCheckResult_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return DepthPlaneSpotCheckResult_Status.STATUS_OK;
    case 2:
    case "STATUS_WARNING":
      return DepthPlaneSpotCheckResult_Status.STATUS_WARNING;
    case 3:
    case "STATUS_ERROR":
      return DepthPlaneSpotCheckResult_Status.STATUS_ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DepthPlaneSpotCheckResult_Status.UNRECOGNIZED;
  }
}

export function depthPlaneSpotCheckResult_StatusToJSON(
  object: DepthPlaneSpotCheckResult_Status
): string {
  switch (object) {
    case DepthPlaneSpotCheckResult_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case DepthPlaneSpotCheckResult_Status.STATUS_OK:
      return "STATUS_OK";
    case DepthPlaneSpotCheckResult_Status.STATUS_WARNING:
      return "STATUS_WARNING";
    case DepthPlaneSpotCheckResult_Status.STATUS_ERROR:
      return "STATUS_ERROR";
    case DepthPlaneSpotCheckResult_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Results of payload check. */
export interface PayloadCheckResult {
  /** A flag to indicate if configuration has an error. */
  error: PayloadCheckResult_Error;
  /**
   * Indicates how much extra payload (in kg) we think the robot has
   * Positive indicates robot has more payload than it is configured.
   * Negative indicates robot has less payload than it is configured.
   */
  extraPayload: number;
}

/** Errors reflect an issue with payload configuration. */
export enum PayloadCheckResult_Error {
  /** ERROR_UNKNOWN - Unused enum. */
  ERROR_UNKNOWN = 0,
  /** ERROR_NONE - No error found in the payloads. */
  ERROR_NONE = 1,
  /** ERROR_MASS_DISCREPANCY - There is a mass discrepancy between the registered payload and what is estimated. */
  ERROR_MASS_DISCREPANCY = 2,
  UNRECOGNIZED = -1,
}

export function payloadCheckResult_ErrorFromJSON(
  object: any
): PayloadCheckResult_Error {
  switch (object) {
    case 0:
    case "ERROR_UNKNOWN":
      return PayloadCheckResult_Error.ERROR_UNKNOWN;
    case 1:
    case "ERROR_NONE":
      return PayloadCheckResult_Error.ERROR_NONE;
    case 2:
    case "ERROR_MASS_DISCREPANCY":
      return PayloadCheckResult_Error.ERROR_MASS_DISCREPANCY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PayloadCheckResult_Error.UNRECOGNIZED;
  }
}

export function payloadCheckResult_ErrorToJSON(
  object: PayloadCheckResult_Error
): string {
  switch (object) {
    case PayloadCheckResult_Error.ERROR_UNKNOWN:
      return "ERROR_UNKNOWN";
    case PayloadCheckResult_Error.ERROR_NONE:
      return "ERROR_NONE";
    case PayloadCheckResult_Error.ERROR_MASS_DISCREPANCY:
      return "ERROR_MASS_DISCREPANCY";
    case PayloadCheckResult_Error.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Results from load cell check. */
export interface LoadCellSpotCheckResult {
  /** A flag to indicate if results has an error. */
  error: LoadCellSpotCheckResult_Error;
  /** The current loadcell zero as fraction of full range [0-1] */
  zero: number;
  /** The previous loadcell zero as fraction of full range [0-1] */
  oldZero: number;
}

/** Errors reflect an issue with robot hardware. */
export enum LoadCellSpotCheckResult_Error {
  /** ERROR_UNKNOWN - Unused enum. */
  ERROR_UNKNOWN = 0,
  /** ERROR_NONE - No hardware error detected. */
  ERROR_NONE = 1,
  /** ERROR_ZERO_OUT_OF_RANGE - Load cell calibration failure. */
  ERROR_ZERO_OUT_OF_RANGE = 2,
  UNRECOGNIZED = -1,
}

export function loadCellSpotCheckResult_ErrorFromJSON(
  object: any
): LoadCellSpotCheckResult_Error {
  switch (object) {
    case 0:
    case "ERROR_UNKNOWN":
      return LoadCellSpotCheckResult_Error.ERROR_UNKNOWN;
    case 1:
    case "ERROR_NONE":
      return LoadCellSpotCheckResult_Error.ERROR_NONE;
    case 2:
    case "ERROR_ZERO_OUT_OF_RANGE":
      return LoadCellSpotCheckResult_Error.ERROR_ZERO_OUT_OF_RANGE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LoadCellSpotCheckResult_Error.UNRECOGNIZED;
  }
}

export function loadCellSpotCheckResult_ErrorToJSON(
  object: LoadCellSpotCheckResult_Error
): string {
  switch (object) {
    case LoadCellSpotCheckResult_Error.ERROR_UNKNOWN:
      return "ERROR_UNKNOWN";
    case LoadCellSpotCheckResult_Error.ERROR_NONE:
      return "ERROR_NONE";
    case LoadCellSpotCheckResult_Error.ERROR_ZERO_OUT_OF_RANGE:
      return "ERROR_ZERO_OUT_OF_RANGE";
    case LoadCellSpotCheckResult_Error.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Kinematic calibration results */
export interface JointKinematicCheckResult {
  /** A flag to indicate if results has an error. */
  error: JointKinematicCheckResult_Error;
  /** The current offset [rad] */
  offset: number;
  /** The previous offset [rad] */
  oldOffset: number;
  /**
   * Joint calibration health score. range [0-1]
   * 0 indicates an unhealthy kinematic joint calibration
   * 1 indicates a perfect kinematic joint calibration
   * Typically, values greater than 0.8 should be expected.
   */
  healthScore: number;
}

/** Errors reflect an issue with robot hardware. */
export enum JointKinematicCheckResult_Error {
  /** ERROR_UNKNOWN - Unused enum. */
  ERROR_UNKNOWN = 0,
  /** ERROR_NONE - No hardware error detected. */
  ERROR_NONE = 1,
  /** ERROR_CLUTCH_SLIP - Error detected in clutch performance. */
  ERROR_CLUTCH_SLIP = 2,
  /** ERROR_INVALID_RANGE_OF_MOTION - Error if a joint has an incorrect range of motion. */
  ERROR_INVALID_RANGE_OF_MOTION = 3,
  UNRECOGNIZED = -1,
}

export function jointKinematicCheckResult_ErrorFromJSON(
  object: any
): JointKinematicCheckResult_Error {
  switch (object) {
    case 0:
    case "ERROR_UNKNOWN":
      return JointKinematicCheckResult_Error.ERROR_UNKNOWN;
    case 1:
    case "ERROR_NONE":
      return JointKinematicCheckResult_Error.ERROR_NONE;
    case 2:
    case "ERROR_CLUTCH_SLIP":
      return JointKinematicCheckResult_Error.ERROR_CLUTCH_SLIP;
    case 3:
    case "ERROR_INVALID_RANGE_OF_MOTION":
      return JointKinematicCheckResult_Error.ERROR_INVALID_RANGE_OF_MOTION;
    case -1:
    case "UNRECOGNIZED":
    default:
      return JointKinematicCheckResult_Error.UNRECOGNIZED;
  }
}

export function jointKinematicCheckResult_ErrorToJSON(
  object: JointKinematicCheckResult_Error
): string {
  switch (object) {
    case JointKinematicCheckResult_Error.ERROR_UNKNOWN:
      return "ERROR_UNKNOWN";
    case JointKinematicCheckResult_Error.ERROR_NONE:
      return "ERROR_NONE";
    case JointKinematicCheckResult_Error.ERROR_CLUTCH_SLIP:
      return "ERROR_CLUTCH_SLIP";
    case JointKinematicCheckResult_Error.ERROR_INVALID_RANGE_OF_MOTION:
      return "ERROR_INVALID_RANGE_OF_MOTION";
    case JointKinematicCheckResult_Error.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Results from foot height checks. */
export interface FootHeightCheckResult {
  /** Return status for the request. */
  status: FootHeightCheckResult_Status;
  /** The difference between foot height and mean feet height (m). */
  footHeightErrorFromMean: number;
}

/** Errors reflect an issue with robot calibration. */
export enum FootHeightCheckResult_Status {
  /** STATUS_UNKNOWN - Unused enum. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - No detected calibration error. */
  STATUS_OK = 1,
  /** STATUS_WARNING - Possible calibration error detected. */
  STATUS_WARNING = 2,
  /** STATUS_ERROR - Error with robot calibration. */
  STATUS_ERROR = 3,
  UNRECOGNIZED = -1,
}

export function footHeightCheckResult_StatusFromJSON(
  object: any
): FootHeightCheckResult_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return FootHeightCheckResult_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return FootHeightCheckResult_Status.STATUS_OK;
    case 2:
    case "STATUS_WARNING":
      return FootHeightCheckResult_Status.STATUS_WARNING;
    case 3:
    case "STATUS_ERROR":
      return FootHeightCheckResult_Status.STATUS_ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return FootHeightCheckResult_Status.UNRECOGNIZED;
  }
}

export function footHeightCheckResult_StatusToJSON(
  object: FootHeightCheckResult_Status
): string {
  switch (object) {
    case FootHeightCheckResult_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case FootHeightCheckResult_Status.STATUS_OK:
      return "STATUS_OK";
    case FootHeightCheckResult_Status.STATUS_WARNING:
      return "STATUS_WARNING";
    case FootHeightCheckResult_Status.STATUS_ERROR:
      return "STATUS_ERROR";
    case FootHeightCheckResult_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Results from leg pair checks.. */
export interface LegPairCheckResult {
  /** Return status for the request. */
  status: LegPairCheckResult_Status;
  /** The change in estimated distance between two feet from tall to short stand (m) */
  legPairDistanceChange: number;
}

export enum LegPairCheckResult_Status {
  /** STATUS_UNKNOWN - Unused enum. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - No detected calibration error. */
  STATUS_OK = 1,
  /** STATUS_WARNING - Possible calibration error detected. */
  STATUS_WARNING = 2,
  /** STATUS_ERROR - Error with robot calibration. */
  STATUS_ERROR = 3,
  UNRECOGNIZED = -1,
}

export function legPairCheckResult_StatusFromJSON(
  object: any
): LegPairCheckResult_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return LegPairCheckResult_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return LegPairCheckResult_Status.STATUS_OK;
    case 2:
    case "STATUS_WARNING":
      return LegPairCheckResult_Status.STATUS_WARNING;
    case 3:
    case "STATUS_ERROR":
      return LegPairCheckResult_Status.STATUS_ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LegPairCheckResult_Status.UNRECOGNIZED;
  }
}

export function legPairCheckResult_StatusToJSON(
  object: LegPairCheckResult_Status
): string {
  switch (object) {
    case LegPairCheckResult_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case LegPairCheckResult_Status.STATUS_OK:
      return "STATUS_OK";
    case LegPairCheckResult_Status.STATUS_WARNING:
      return "STATUS_WARNING";
    case LegPairCheckResult_Status.STATUS_ERROR:
      return "STATUS_ERROR";
    case LegPairCheckResult_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface HipRangeOfMotionResult {
  error: HipRangeOfMotionResult_Error;
  /** The measured angles (radians) of the HX and HY joints where the obstruction was detected */
  hx: number[];
  hy: number[];
}

/** Errors reflect an issue with hip range of motion */
export enum HipRangeOfMotionResult_Error {
  ERROR_UNKNOWN = 0,
  ERROR_NONE = 1,
  ERROR_OBSTRUCTED = 2,
  UNRECOGNIZED = -1,
}

export function hipRangeOfMotionResult_ErrorFromJSON(
  object: any
): HipRangeOfMotionResult_Error {
  switch (object) {
    case 0:
    case "ERROR_UNKNOWN":
      return HipRangeOfMotionResult_Error.ERROR_UNKNOWN;
    case 1:
    case "ERROR_NONE":
      return HipRangeOfMotionResult_Error.ERROR_NONE;
    case 2:
    case "ERROR_OBSTRUCTED":
      return HipRangeOfMotionResult_Error.ERROR_OBSTRUCTED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return HipRangeOfMotionResult_Error.UNRECOGNIZED;
  }
}

export function hipRangeOfMotionResult_ErrorToJSON(
  object: HipRangeOfMotionResult_Error
): string {
  switch (object) {
    case HipRangeOfMotionResult_Error.ERROR_UNKNOWN:
      return "ERROR_UNKNOWN";
    case HipRangeOfMotionResult_Error.ERROR_NONE:
      return "ERROR_NONE";
    case HipRangeOfMotionResult_Error.ERROR_OBSTRUCTED:
      return "ERROR_OBSTRUCTED";
    case HipRangeOfMotionResult_Error.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Request for the CameraCalibrationCommand service. */
export interface CameraCalibrationCommandRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** The Lease to show ownership of the robot. Lease is required for all cal commands. */
  lease: Lease | undefined;
  /** Command to start/stop the calibration. */
  command: CameraCalibrationCommandRequest_Command;
}

export enum CameraCalibrationCommandRequest_Command {
  /** COMMAND_UNKNOWN - Unused enum. */
  COMMAND_UNKNOWN = 0,
  /** COMMAND_START - Start calibration routine. */
  COMMAND_START = 1,
  /** COMMAND_CANCEL - Cancel calibration routine. */
  COMMAND_CANCEL = 2,
  UNRECOGNIZED = -1,
}

export function cameraCalibrationCommandRequest_CommandFromJSON(
  object: any
): CameraCalibrationCommandRequest_Command {
  switch (object) {
    case 0:
    case "COMMAND_UNKNOWN":
      return CameraCalibrationCommandRequest_Command.COMMAND_UNKNOWN;
    case 1:
    case "COMMAND_START":
      return CameraCalibrationCommandRequest_Command.COMMAND_START;
    case 2:
    case "COMMAND_CANCEL":
      return CameraCalibrationCommandRequest_Command.COMMAND_CANCEL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CameraCalibrationCommandRequest_Command.UNRECOGNIZED;
  }
}

export function cameraCalibrationCommandRequest_CommandToJSON(
  object: CameraCalibrationCommandRequest_Command
): string {
  switch (object) {
    case CameraCalibrationCommandRequest_Command.COMMAND_UNKNOWN:
      return "COMMAND_UNKNOWN";
    case CameraCalibrationCommandRequest_Command.COMMAND_START:
      return "COMMAND_START";
    case CameraCalibrationCommandRequest_Command.COMMAND_CANCEL:
      return "COMMAND_CANCEL";
    case CameraCalibrationCommandRequest_Command.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Response for the CameraCalibrationCommand service. */
export interface CameraCalibrationCommandResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Details about how the lease was used. */
  leaseUseResult: LeaseUseResult | undefined;
}

/** Request for the CameraCalibrationFeedback service. */
export interface CameraCalibrationFeedbackRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/** Response for the CameraCalibrationFeedback service. */
export interface CameraCalibrationFeedbackResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Status of camera calibration procedure. */
  status: CameraCalibrationFeedbackResponse_Status;
  /**
   * The approximate progress of the calibration routine, range [0-1].
   * Status takes precedence over progress value.
   */
  progress: number;
}

export enum CameraCalibrationFeedbackResponse_Status {
  /** STATUS_UNKNOWN - Unused enum. */
  STATUS_UNKNOWN = 0,
  /** STATUS_PROCESSING - The robot is actively running calibration routine. */
  STATUS_PROCESSING = 1,
  /**
   * STATUS_SUCCESS - The robot successfully ran calibration routine and
   * is ready to use again.
   */
  STATUS_SUCCESS = 2,
  /** STATUS_USER_CANCELED - API client canceled calibration. */
  STATUS_USER_CANCELED = 3,
  /** STATUS_POWER_ERROR - The robot is not powered on. */
  STATUS_POWER_ERROR = 4,
  /** STATUS_LEASE_ERROR - Ownership error during calibration. */
  STATUS_LEASE_ERROR = 5,
  /**
   * STATUS_ROBOT_COMMAND_ERROR - Robot encountered an error while trying to move
   * around the calibration target. Robot possibly
   * encountered a fault. Check robot state for more
   * details
   */
  STATUS_ROBOT_COMMAND_ERROR = 7,
  /**
   * STATUS_CALIBRATION_ERROR - Calibration procedure produced an invalid result.
   * This may occur in poor lighting conditions or if
   * calibration target moved during calibration
   * procedure.
   */
  STATUS_CALIBRATION_ERROR = 8,
  /** STATUS_INTERNAL_ERROR - Something extraordinary happened. Try power cycling robot or contact BD. */
  STATUS_INTERNAL_ERROR = 9,
  /** STATUS_CAMERA_FOCUS_ERROR - Camera focus issue detected. This is a hardware issue. */
  STATUS_CAMERA_FOCUS_ERROR = 14,
  /** STATUS_TARGET_NOT_CENTERED - Target partially, but not fully, in view when starting calibration. */
  STATUS_TARGET_NOT_CENTERED = 6,
  /** STATUS_TARGET_NOT_IN_VIEW - Target not visible when starting calibration. */
  STATUS_TARGET_NOT_IN_VIEW = 11,
  /** STATUS_TARGET_NOT_GRAVITY_ALIGNED - Target not aligned with gravity when starting calibration. */
  STATUS_TARGET_NOT_GRAVITY_ALIGNED = 12,
  /** STATUS_TARGET_UPSIDE_DOWN - Target upside down when starting calibration. */
  STATUS_TARGET_UPSIDE_DOWN = 13,
  /** STATUS_NEVER_RUN - Calibration routine has never been run. No feedback to give. */
  STATUS_NEVER_RUN = 10,
  /** STATUS_CAMERA_NOT_DETECTED - One of the cameras is not detected on the USB bus. */
  STATUS_CAMERA_NOT_DETECTED = 15,
  /** STATUS_INTRINSIC_WRITE_FAILED - Failed to write intrinsic calibration. */
  STATUS_INTRINSIC_WRITE_FAILED = 16,
  /** STATUS_EXTRINSIC_WRITE_FAILED - Failed to write extrinsic calibration. */
  STATUS_EXTRINSIC_WRITE_FAILED = 17,
  UNRECOGNIZED = -1,
}

export function cameraCalibrationFeedbackResponse_StatusFromJSON(
  object: any
): CameraCalibrationFeedbackResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return CameraCalibrationFeedbackResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_PROCESSING":
      return CameraCalibrationFeedbackResponse_Status.STATUS_PROCESSING;
    case 2:
    case "STATUS_SUCCESS":
      return CameraCalibrationFeedbackResponse_Status.STATUS_SUCCESS;
    case 3:
    case "STATUS_USER_CANCELED":
      return CameraCalibrationFeedbackResponse_Status.STATUS_USER_CANCELED;
    case 4:
    case "STATUS_POWER_ERROR":
      return CameraCalibrationFeedbackResponse_Status.STATUS_POWER_ERROR;
    case 5:
    case "STATUS_LEASE_ERROR":
      return CameraCalibrationFeedbackResponse_Status.STATUS_LEASE_ERROR;
    case 7:
    case "STATUS_ROBOT_COMMAND_ERROR":
      return CameraCalibrationFeedbackResponse_Status.STATUS_ROBOT_COMMAND_ERROR;
    case 8:
    case "STATUS_CALIBRATION_ERROR":
      return CameraCalibrationFeedbackResponse_Status.STATUS_CALIBRATION_ERROR;
    case 9:
    case "STATUS_INTERNAL_ERROR":
      return CameraCalibrationFeedbackResponse_Status.STATUS_INTERNAL_ERROR;
    case 14:
    case "STATUS_CAMERA_FOCUS_ERROR":
      return CameraCalibrationFeedbackResponse_Status.STATUS_CAMERA_FOCUS_ERROR;
    case 6:
    case "STATUS_TARGET_NOT_CENTERED":
      return CameraCalibrationFeedbackResponse_Status.STATUS_TARGET_NOT_CENTERED;
    case 11:
    case "STATUS_TARGET_NOT_IN_VIEW":
      return CameraCalibrationFeedbackResponse_Status.STATUS_TARGET_NOT_IN_VIEW;
    case 12:
    case "STATUS_TARGET_NOT_GRAVITY_ALIGNED":
      return CameraCalibrationFeedbackResponse_Status.STATUS_TARGET_NOT_GRAVITY_ALIGNED;
    case 13:
    case "STATUS_TARGET_UPSIDE_DOWN":
      return CameraCalibrationFeedbackResponse_Status.STATUS_TARGET_UPSIDE_DOWN;
    case 10:
    case "STATUS_NEVER_RUN":
      return CameraCalibrationFeedbackResponse_Status.STATUS_NEVER_RUN;
    case 15:
    case "STATUS_CAMERA_NOT_DETECTED":
      return CameraCalibrationFeedbackResponse_Status.STATUS_CAMERA_NOT_DETECTED;
    case 16:
    case "STATUS_INTRINSIC_WRITE_FAILED":
      return CameraCalibrationFeedbackResponse_Status.STATUS_INTRINSIC_WRITE_FAILED;
    case 17:
    case "STATUS_EXTRINSIC_WRITE_FAILED":
      return CameraCalibrationFeedbackResponse_Status.STATUS_EXTRINSIC_WRITE_FAILED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CameraCalibrationFeedbackResponse_Status.UNRECOGNIZED;
  }
}

export function cameraCalibrationFeedbackResponse_StatusToJSON(
  object: CameraCalibrationFeedbackResponse_Status
): string {
  switch (object) {
    case CameraCalibrationFeedbackResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case CameraCalibrationFeedbackResponse_Status.STATUS_PROCESSING:
      return "STATUS_PROCESSING";
    case CameraCalibrationFeedbackResponse_Status.STATUS_SUCCESS:
      return "STATUS_SUCCESS";
    case CameraCalibrationFeedbackResponse_Status.STATUS_USER_CANCELED:
      return "STATUS_USER_CANCELED";
    case CameraCalibrationFeedbackResponse_Status.STATUS_POWER_ERROR:
      return "STATUS_POWER_ERROR";
    case CameraCalibrationFeedbackResponse_Status.STATUS_LEASE_ERROR:
      return "STATUS_LEASE_ERROR";
    case CameraCalibrationFeedbackResponse_Status.STATUS_ROBOT_COMMAND_ERROR:
      return "STATUS_ROBOT_COMMAND_ERROR";
    case CameraCalibrationFeedbackResponse_Status.STATUS_CALIBRATION_ERROR:
      return "STATUS_CALIBRATION_ERROR";
    case CameraCalibrationFeedbackResponse_Status.STATUS_INTERNAL_ERROR:
      return "STATUS_INTERNAL_ERROR";
    case CameraCalibrationFeedbackResponse_Status.STATUS_CAMERA_FOCUS_ERROR:
      return "STATUS_CAMERA_FOCUS_ERROR";
    case CameraCalibrationFeedbackResponse_Status.STATUS_TARGET_NOT_CENTERED:
      return "STATUS_TARGET_NOT_CENTERED";
    case CameraCalibrationFeedbackResponse_Status.STATUS_TARGET_NOT_IN_VIEW:
      return "STATUS_TARGET_NOT_IN_VIEW";
    case CameraCalibrationFeedbackResponse_Status.STATUS_TARGET_NOT_GRAVITY_ALIGNED:
      return "STATUS_TARGET_NOT_GRAVITY_ALIGNED";
    case CameraCalibrationFeedbackResponse_Status.STATUS_TARGET_UPSIDE_DOWN:
      return "STATUS_TARGET_UPSIDE_DOWN";
    case CameraCalibrationFeedbackResponse_Status.STATUS_NEVER_RUN:
      return "STATUS_NEVER_RUN";
    case CameraCalibrationFeedbackResponse_Status.STATUS_CAMERA_NOT_DETECTED:
      return "STATUS_CAMERA_NOT_DETECTED";
    case CameraCalibrationFeedbackResponse_Status.STATUS_INTRINSIC_WRITE_FAILED:
      return "STATUS_INTRINSIC_WRITE_FAILED";
    case CameraCalibrationFeedbackResponse_Status.STATUS_EXTRINSIC_WRITE_FAILED:
      return "STATUS_EXTRINSIC_WRITE_FAILED";
    case CameraCalibrationFeedbackResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseSpotCheckCommandRequest(): SpotCheckCommandRequest {
  return { header: undefined, lease: undefined, command: 0 };
}

export const SpotCheckCommandRequest = {
  encode(
    message: SpotCheckCommandRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.lease !== undefined) {
      Lease.encode(message.lease, writer.uint32(18).fork()).ldelim();
    }
    if (message.command !== 0) {
      writer.uint32(24).int32(message.command);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SpotCheckCommandRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpotCheckCommandRequest();
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
          message.command = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SpotCheckCommandRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      lease: isSet(object.lease) ? Lease.fromJSON(object.lease) : undefined,
      command: isSet(object.command)
        ? spotCheckCommandRequest_CommandFromJSON(object.command)
        : 0,
    };
  },

  toJSON(message: SpotCheckCommandRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.lease !== undefined &&
      (obj.lease = message.lease ? Lease.toJSON(message.lease) : undefined);
    message.command !== undefined &&
      (obj.command = spotCheckCommandRequest_CommandToJSON(message.command));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SpotCheckCommandRequest>, I>>(
    object: I
  ): SpotCheckCommandRequest {
    const message = createBaseSpotCheckCommandRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.lease =
      object.lease !== undefined && object.lease !== null
        ? Lease.fromPartial(object.lease)
        : undefined;
    message.command = object.command ?? 0;
    return message;
  },
};

function createBaseSpotCheckCommandResponse(): SpotCheckCommandResponse {
  return {
    header: undefined,
    leaseUseResult: undefined,
    status: 0,
    message: "",
  };
}

export const SpotCheckCommandResponse = {
  encode(
    message: SpotCheckCommandResponse,
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
    if (message.message !== "") {
      writer.uint32(34).string(message.message);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SpotCheckCommandResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpotCheckCommandResponse();
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
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SpotCheckCommandResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      leaseUseResult: isSet(object.leaseUseResult)
        ? LeaseUseResult.fromJSON(object.leaseUseResult)
        : undefined,
      status: isSet(object.status)
        ? spotCheckCommandResponse_StatusFromJSON(object.status)
        : 0,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: SpotCheckCommandResponse): unknown {
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
      (obj.status = spotCheckCommandResponse_StatusToJSON(message.status));
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SpotCheckCommandResponse>, I>>(
    object: I
  ): SpotCheckCommandResponse {
    const message = createBaseSpotCheckCommandResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.leaseUseResult =
      object.leaseUseResult !== undefined && object.leaseUseResult !== null
        ? LeaseUseResult.fromPartial(object.leaseUseResult)
        : undefined;
    message.status = object.status ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseSpotCheckFeedbackRequest(): SpotCheckFeedbackRequest {
  return { header: undefined };
}

export const SpotCheckFeedbackRequest = {
  encode(
    message: SpotCheckFeedbackRequest,
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
  ): SpotCheckFeedbackRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpotCheckFeedbackRequest();
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

  fromJSON(object: any): SpotCheckFeedbackRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: SpotCheckFeedbackRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SpotCheckFeedbackRequest>, I>>(
    object: I
  ): SpotCheckFeedbackRequest {
    const message = createBaseSpotCheckFeedbackRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseSpotCheckFeedbackResponse(): SpotCheckFeedbackResponse {
  return {
    header: undefined,
    state: 0,
    lastCommand: 0,
    error: 0,
    cameraResults: {},
    loadCellResults: {},
    kinematicCalResults: {},
    payloadResult: undefined,
    footHeightResults: {},
    legPairResults: {},
    hipRangeOfMotionResults: {},
    progress: 0,
    lastCalTimestamp: undefined,
  };
}

export const SpotCheckFeedbackResponse = {
  encode(
    message: SpotCheckFeedbackResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.state !== 0) {
      writer.uint32(16).int32(message.state);
    }
    if (message.lastCommand !== 0) {
      writer.uint32(96).int32(message.lastCommand);
    }
    if (message.error !== 0) {
      writer.uint32(48).int32(message.error);
    }
    Object.entries(message.cameraResults).forEach(([key, value]) => {
      SpotCheckFeedbackResponse_CameraResultsEntry.encode(
        { key: key as any, value },
        writer.uint32(26).fork()
      ).ldelim();
    });
    Object.entries(message.loadCellResults).forEach(([key, value]) => {
      SpotCheckFeedbackResponse_LoadCellResultsEntry.encode(
        { key: key as any, value },
        writer.uint32(34).fork()
      ).ldelim();
    });
    Object.entries(message.kinematicCalResults).forEach(([key, value]) => {
      SpotCheckFeedbackResponse_KinematicCalResultsEntry.encode(
        { key: key as any, value },
        writer.uint32(42).fork()
      ).ldelim();
    });
    if (message.payloadResult !== undefined) {
      PayloadCheckResult.encode(
        message.payloadResult,
        writer.uint32(66).fork()
      ).ldelim();
    }
    Object.entries(message.footHeightResults).forEach(([key, value]) => {
      SpotCheckFeedbackResponse_FootHeightResultsEntry.encode(
        { key: key as any, value },
        writer.uint32(82).fork()
      ).ldelim();
    });
    Object.entries(message.legPairResults).forEach(([key, value]) => {
      SpotCheckFeedbackResponse_LegPairResultsEntry.encode(
        { key: key as any, value },
        writer.uint32(90).fork()
      ).ldelim();
    });
    Object.entries(message.hipRangeOfMotionResults).forEach(([key, value]) => {
      SpotCheckFeedbackResponse_HipRangeOfMotionResultsEntry.encode(
        { key: key as any, value },
        writer.uint32(106).fork()
      ).ldelim();
    });
    if (message.progress !== 0) {
      writer.uint32(61).float(message.progress);
    }
    if (message.lastCalTimestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.lastCalTimestamp),
        writer.uint32(74).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SpotCheckFeedbackResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpotCheckFeedbackResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.state = reader.int32() as any;
          break;
        case 12:
          message.lastCommand = reader.int32() as any;
          break;
        case 6:
          message.error = reader.int32() as any;
          break;
        case 3:
          const entry3 = SpotCheckFeedbackResponse_CameraResultsEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry3.value !== undefined) {
            message.cameraResults[entry3.key] = entry3.value;
          }
          break;
        case 4:
          const entry4 = SpotCheckFeedbackResponse_LoadCellResultsEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry4.value !== undefined) {
            message.loadCellResults[entry4.key] = entry4.value;
          }
          break;
        case 5:
          const entry5 =
            SpotCheckFeedbackResponse_KinematicCalResultsEntry.decode(
              reader,
              reader.uint32()
            );
          if (entry5.value !== undefined) {
            message.kinematicCalResults[entry5.key] = entry5.value;
          }
          break;
        case 8:
          message.payloadResult = PayloadCheckResult.decode(
            reader,
            reader.uint32()
          );
          break;
        case 10:
          const entry10 =
            SpotCheckFeedbackResponse_FootHeightResultsEntry.decode(
              reader,
              reader.uint32()
            );
          if (entry10.value !== undefined) {
            message.footHeightResults[entry10.key] = entry10.value;
          }
          break;
        case 11:
          const entry11 = SpotCheckFeedbackResponse_LegPairResultsEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry11.value !== undefined) {
            message.legPairResults[entry11.key] = entry11.value;
          }
          break;
        case 13:
          const entry13 =
            SpotCheckFeedbackResponse_HipRangeOfMotionResultsEntry.decode(
              reader,
              reader.uint32()
            );
          if (entry13.value !== undefined) {
            message.hipRangeOfMotionResults[entry13.key] = entry13.value;
          }
          break;
        case 7:
          message.progress = reader.float();
          break;
        case 9:
          message.lastCalTimestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SpotCheckFeedbackResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      state: isSet(object.state)
        ? spotCheckFeedbackResponse_StateFromJSON(object.state)
        : 0,
      lastCommand: isSet(object.lastCommand)
        ? spotCheckCommandRequest_CommandFromJSON(object.lastCommand)
        : 0,
      error: isSet(object.error)
        ? spotCheckFeedbackResponse_ErrorFromJSON(object.error)
        : 0,
      cameraResults: isObject(object.cameraResults)
        ? Object.entries(object.cameraResults).reduce<{
            [key: string]: DepthPlaneSpotCheckResult;
          }>((acc, [key, value]) => {
            acc[key] = DepthPlaneSpotCheckResult.fromJSON(value);
            return acc;
          }, {})
        : {},
      loadCellResults: isObject(object.loadCellResults)
        ? Object.entries(object.loadCellResults).reduce<{
            [key: string]: LoadCellSpotCheckResult;
          }>((acc, [key, value]) => {
            acc[key] = LoadCellSpotCheckResult.fromJSON(value);
            return acc;
          }, {})
        : {},
      kinematicCalResults: isObject(object.kinematicCalResults)
        ? Object.entries(object.kinematicCalResults).reduce<{
            [key: string]: JointKinematicCheckResult;
          }>((acc, [key, value]) => {
            acc[key] = JointKinematicCheckResult.fromJSON(value);
            return acc;
          }, {})
        : {},
      payloadResult: isSet(object.payloadResult)
        ? PayloadCheckResult.fromJSON(object.payloadResult)
        : undefined,
      footHeightResults: isObject(object.footHeightResults)
        ? Object.entries(object.footHeightResults).reduce<{
            [key: string]: FootHeightCheckResult;
          }>((acc, [key, value]) => {
            acc[key] = FootHeightCheckResult.fromJSON(value);
            return acc;
          }, {})
        : {},
      legPairResults: isObject(object.legPairResults)
        ? Object.entries(object.legPairResults).reduce<{
            [key: string]: LegPairCheckResult;
          }>((acc, [key, value]) => {
            acc[key] = LegPairCheckResult.fromJSON(value);
            return acc;
          }, {})
        : {},
      hipRangeOfMotionResults: isObject(object.hipRangeOfMotionResults)
        ? Object.entries(object.hipRangeOfMotionResults).reduce<{
            [key: string]: HipRangeOfMotionResult;
          }>((acc, [key, value]) => {
            acc[key] = HipRangeOfMotionResult.fromJSON(value);
            return acc;
          }, {})
        : {},
      progress: isSet(object.progress) ? Number(object.progress) : 0,
      lastCalTimestamp: isSet(object.lastCalTimestamp)
        ? fromJsonTimestamp(object.lastCalTimestamp)
        : undefined,
    };
  },

  toJSON(message: SpotCheckFeedbackResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.state !== undefined &&
      (obj.state = spotCheckFeedbackResponse_StateToJSON(message.state));
    message.lastCommand !== undefined &&
      (obj.lastCommand = spotCheckCommandRequest_CommandToJSON(
        message.lastCommand
      ));
    message.error !== undefined &&
      (obj.error = spotCheckFeedbackResponse_ErrorToJSON(message.error));
    obj.cameraResults = {};
    if (message.cameraResults) {
      Object.entries(message.cameraResults).forEach(([k, v]) => {
        obj.cameraResults[k] = DepthPlaneSpotCheckResult.toJSON(v);
      });
    }
    obj.loadCellResults = {};
    if (message.loadCellResults) {
      Object.entries(message.loadCellResults).forEach(([k, v]) => {
        obj.loadCellResults[k] = LoadCellSpotCheckResult.toJSON(v);
      });
    }
    obj.kinematicCalResults = {};
    if (message.kinematicCalResults) {
      Object.entries(message.kinematicCalResults).forEach(([k, v]) => {
        obj.kinematicCalResults[k] = JointKinematicCheckResult.toJSON(v);
      });
    }
    message.payloadResult !== undefined &&
      (obj.payloadResult = message.payloadResult
        ? PayloadCheckResult.toJSON(message.payloadResult)
        : undefined);
    obj.footHeightResults = {};
    if (message.footHeightResults) {
      Object.entries(message.footHeightResults).forEach(([k, v]) => {
        obj.footHeightResults[k] = FootHeightCheckResult.toJSON(v);
      });
    }
    obj.legPairResults = {};
    if (message.legPairResults) {
      Object.entries(message.legPairResults).forEach(([k, v]) => {
        obj.legPairResults[k] = LegPairCheckResult.toJSON(v);
      });
    }
    obj.hipRangeOfMotionResults = {};
    if (message.hipRangeOfMotionResults) {
      Object.entries(message.hipRangeOfMotionResults).forEach(([k, v]) => {
        obj.hipRangeOfMotionResults[k] = HipRangeOfMotionResult.toJSON(v);
      });
    }
    message.progress !== undefined && (obj.progress = message.progress);
    message.lastCalTimestamp !== undefined &&
      (obj.lastCalTimestamp = message.lastCalTimestamp.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SpotCheckFeedbackResponse>, I>>(
    object: I
  ): SpotCheckFeedbackResponse {
    const message = createBaseSpotCheckFeedbackResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.state = object.state ?? 0;
    message.lastCommand = object.lastCommand ?? 0;
    message.error = object.error ?? 0;
    message.cameraResults = Object.entries(object.cameraResults ?? {}).reduce<{
      [key: string]: DepthPlaneSpotCheckResult;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = DepthPlaneSpotCheckResult.fromPartial(value);
      }
      return acc;
    }, {});
    message.loadCellResults = Object.entries(
      object.loadCellResults ?? {}
    ).reduce<{ [key: string]: LoadCellSpotCheckResult }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = LoadCellSpotCheckResult.fromPartial(value);
        }
        return acc;
      },
      {}
    );
    message.kinematicCalResults = Object.entries(
      object.kinematicCalResults ?? {}
    ).reduce<{ [key: string]: JointKinematicCheckResult }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = JointKinematicCheckResult.fromPartial(value);
        }
        return acc;
      },
      {}
    );
    message.payloadResult =
      object.payloadResult !== undefined && object.payloadResult !== null
        ? PayloadCheckResult.fromPartial(object.payloadResult)
        : undefined;
    message.footHeightResults = Object.entries(
      object.footHeightResults ?? {}
    ).reduce<{ [key: string]: FootHeightCheckResult }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = FootHeightCheckResult.fromPartial(value);
      }
      return acc;
    }, {});
    message.legPairResults = Object.entries(
      object.legPairResults ?? {}
    ).reduce<{ [key: string]: LegPairCheckResult }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = LegPairCheckResult.fromPartial(value);
      }
      return acc;
    }, {});
    message.hipRangeOfMotionResults = Object.entries(
      object.hipRangeOfMotionResults ?? {}
    ).reduce<{ [key: string]: HipRangeOfMotionResult }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = HipRangeOfMotionResult.fromPartial(value);
      }
      return acc;
    }, {});
    message.progress = object.progress ?? 0;
    message.lastCalTimestamp = object.lastCalTimestamp ?? undefined;
    return message;
  },
};

function createBaseSpotCheckFeedbackResponse_CameraResultsEntry(): SpotCheckFeedbackResponse_CameraResultsEntry {
  return { key: "", value: undefined };
}

export const SpotCheckFeedbackResponse_CameraResultsEntry = {
  encode(
    message: SpotCheckFeedbackResponse_CameraResultsEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      DepthPlaneSpotCheckResult.encode(
        message.value,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SpotCheckFeedbackResponse_CameraResultsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpotCheckFeedbackResponse_CameraResultsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = DepthPlaneSpotCheckResult.decode(
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

  fromJSON(object: any): SpotCheckFeedbackResponse_CameraResultsEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value)
        ? DepthPlaneSpotCheckResult.fromJSON(object.value)
        : undefined,
    };
  },

  toJSON(message: SpotCheckFeedbackResponse_CameraResultsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value
        ? DepthPlaneSpotCheckResult.toJSON(message.value)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<
      DeepPartial<SpotCheckFeedbackResponse_CameraResultsEntry>,
      I
    >
  >(object: I): SpotCheckFeedbackResponse_CameraResultsEntry {
    const message = createBaseSpotCheckFeedbackResponse_CameraResultsEntry();
    message.key = object.key ?? "";
    message.value =
      object.value !== undefined && object.value !== null
        ? DepthPlaneSpotCheckResult.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseSpotCheckFeedbackResponse_LoadCellResultsEntry(): SpotCheckFeedbackResponse_LoadCellResultsEntry {
  return { key: "", value: undefined };
}

export const SpotCheckFeedbackResponse_LoadCellResultsEntry = {
  encode(
    message: SpotCheckFeedbackResponse_LoadCellResultsEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      LoadCellSpotCheckResult.encode(
        message.value,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SpotCheckFeedbackResponse_LoadCellResultsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpotCheckFeedbackResponse_LoadCellResultsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = LoadCellSpotCheckResult.decode(
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

  fromJSON(object: any): SpotCheckFeedbackResponse_LoadCellResultsEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value)
        ? LoadCellSpotCheckResult.fromJSON(object.value)
        : undefined,
    };
  },

  toJSON(message: SpotCheckFeedbackResponse_LoadCellResultsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value
        ? LoadCellSpotCheckResult.toJSON(message.value)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<
      DeepPartial<SpotCheckFeedbackResponse_LoadCellResultsEntry>,
      I
    >
  >(object: I): SpotCheckFeedbackResponse_LoadCellResultsEntry {
    const message = createBaseSpotCheckFeedbackResponse_LoadCellResultsEntry();
    message.key = object.key ?? "";
    message.value =
      object.value !== undefined && object.value !== null
        ? LoadCellSpotCheckResult.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseSpotCheckFeedbackResponse_KinematicCalResultsEntry(): SpotCheckFeedbackResponse_KinematicCalResultsEntry {
  return { key: "", value: undefined };
}

export const SpotCheckFeedbackResponse_KinematicCalResultsEntry = {
  encode(
    message: SpotCheckFeedbackResponse_KinematicCalResultsEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      JointKinematicCheckResult.encode(
        message.value,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SpotCheckFeedbackResponse_KinematicCalResultsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message =
      createBaseSpotCheckFeedbackResponse_KinematicCalResultsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = JointKinematicCheckResult.decode(
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

  fromJSON(object: any): SpotCheckFeedbackResponse_KinematicCalResultsEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value)
        ? JointKinematicCheckResult.fromJSON(object.value)
        : undefined,
    };
  },

  toJSON(message: SpotCheckFeedbackResponse_KinematicCalResultsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value
        ? JointKinematicCheckResult.toJSON(message.value)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<
      DeepPartial<SpotCheckFeedbackResponse_KinematicCalResultsEntry>,
      I
    >
  >(object: I): SpotCheckFeedbackResponse_KinematicCalResultsEntry {
    const message =
      createBaseSpotCheckFeedbackResponse_KinematicCalResultsEntry();
    message.key = object.key ?? "";
    message.value =
      object.value !== undefined && object.value !== null
        ? JointKinematicCheckResult.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseSpotCheckFeedbackResponse_FootHeightResultsEntry(): SpotCheckFeedbackResponse_FootHeightResultsEntry {
  return { key: "", value: undefined };
}

export const SpotCheckFeedbackResponse_FootHeightResultsEntry = {
  encode(
    message: SpotCheckFeedbackResponse_FootHeightResultsEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      FootHeightCheckResult.encode(
        message.value,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SpotCheckFeedbackResponse_FootHeightResultsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message =
      createBaseSpotCheckFeedbackResponse_FootHeightResultsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = FootHeightCheckResult.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SpotCheckFeedbackResponse_FootHeightResultsEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value)
        ? FootHeightCheckResult.fromJSON(object.value)
        : undefined,
    };
  },

  toJSON(message: SpotCheckFeedbackResponse_FootHeightResultsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value
        ? FootHeightCheckResult.toJSON(message.value)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<
      DeepPartial<SpotCheckFeedbackResponse_FootHeightResultsEntry>,
      I
    >
  >(object: I): SpotCheckFeedbackResponse_FootHeightResultsEntry {
    const message =
      createBaseSpotCheckFeedbackResponse_FootHeightResultsEntry();
    message.key = object.key ?? "";
    message.value =
      object.value !== undefined && object.value !== null
        ? FootHeightCheckResult.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseSpotCheckFeedbackResponse_LegPairResultsEntry(): SpotCheckFeedbackResponse_LegPairResultsEntry {
  return { key: "", value: undefined };
}

export const SpotCheckFeedbackResponse_LegPairResultsEntry = {
  encode(
    message: SpotCheckFeedbackResponse_LegPairResultsEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      LegPairCheckResult.encode(
        message.value,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SpotCheckFeedbackResponse_LegPairResultsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpotCheckFeedbackResponse_LegPairResultsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = LegPairCheckResult.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SpotCheckFeedbackResponse_LegPairResultsEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value)
        ? LegPairCheckResult.fromJSON(object.value)
        : undefined,
    };
  },

  toJSON(message: SpotCheckFeedbackResponse_LegPairResultsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value
        ? LegPairCheckResult.toJSON(message.value)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<
      DeepPartial<SpotCheckFeedbackResponse_LegPairResultsEntry>,
      I
    >
  >(object: I): SpotCheckFeedbackResponse_LegPairResultsEntry {
    const message = createBaseSpotCheckFeedbackResponse_LegPairResultsEntry();
    message.key = object.key ?? "";
    message.value =
      object.value !== undefined && object.value !== null
        ? LegPairCheckResult.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseSpotCheckFeedbackResponse_HipRangeOfMotionResultsEntry(): SpotCheckFeedbackResponse_HipRangeOfMotionResultsEntry {
  return { key: "", value: undefined };
}

export const SpotCheckFeedbackResponse_HipRangeOfMotionResultsEntry = {
  encode(
    message: SpotCheckFeedbackResponse_HipRangeOfMotionResultsEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      HipRangeOfMotionResult.encode(
        message.value,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SpotCheckFeedbackResponse_HipRangeOfMotionResultsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message =
      createBaseSpotCheckFeedbackResponse_HipRangeOfMotionResultsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = HipRangeOfMotionResult.decode(
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

  fromJSON(
    object: any
  ): SpotCheckFeedbackResponse_HipRangeOfMotionResultsEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value)
        ? HipRangeOfMotionResult.fromJSON(object.value)
        : undefined,
    };
  },

  toJSON(
    message: SpotCheckFeedbackResponse_HipRangeOfMotionResultsEntry
  ): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value
        ? HipRangeOfMotionResult.toJSON(message.value)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<
      DeepPartial<SpotCheckFeedbackResponse_HipRangeOfMotionResultsEntry>,
      I
    >
  >(object: I): SpotCheckFeedbackResponse_HipRangeOfMotionResultsEntry {
    const message =
      createBaseSpotCheckFeedbackResponse_HipRangeOfMotionResultsEntry();
    message.key = object.key ?? "";
    message.value =
      object.value !== undefined && object.value !== null
        ? HipRangeOfMotionResult.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseDepthPlaneSpotCheckResult(): DepthPlaneSpotCheckResult {
  return { status: 0, severityScore: 0 };
}

export const DepthPlaneSpotCheckResult = {
  encode(
    message: DepthPlaneSpotCheckResult,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    if (message.severityScore !== 0) {
      writer.uint32(21).float(message.severityScore);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DepthPlaneSpotCheckResult {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDepthPlaneSpotCheckResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32() as any;
          break;
        case 2:
          message.severityScore = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DepthPlaneSpotCheckResult {
    return {
      status: isSet(object.status)
        ? depthPlaneSpotCheckResult_StatusFromJSON(object.status)
        : 0,
      severityScore: isSet(object.severityScore)
        ? Number(object.severityScore)
        : 0,
    };
  },

  toJSON(message: DepthPlaneSpotCheckResult): unknown {
    const obj: any = {};
    message.status !== undefined &&
      (obj.status = depthPlaneSpotCheckResult_StatusToJSON(message.status));
    message.severityScore !== undefined &&
      (obj.severityScore = message.severityScore);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DepthPlaneSpotCheckResult>, I>>(
    object: I
  ): DepthPlaneSpotCheckResult {
    const message = createBaseDepthPlaneSpotCheckResult();
    message.status = object.status ?? 0;
    message.severityScore = object.severityScore ?? 0;
    return message;
  },
};

function createBasePayloadCheckResult(): PayloadCheckResult {
  return { error: 0, extraPayload: 0 };
}

export const PayloadCheckResult = {
  encode(
    message: PayloadCheckResult,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.error !== 0) {
      writer.uint32(8).int32(message.error);
    }
    if (message.extraPayload !== 0) {
      writer.uint32(21).float(message.extraPayload);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PayloadCheckResult {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePayloadCheckResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.error = reader.int32() as any;
          break;
        case 2:
          message.extraPayload = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PayloadCheckResult {
    return {
      error: isSet(object.error)
        ? payloadCheckResult_ErrorFromJSON(object.error)
        : 0,
      extraPayload: isSet(object.extraPayload)
        ? Number(object.extraPayload)
        : 0,
    };
  },

  toJSON(message: PayloadCheckResult): unknown {
    const obj: any = {};
    message.error !== undefined &&
      (obj.error = payloadCheckResult_ErrorToJSON(message.error));
    message.extraPayload !== undefined &&
      (obj.extraPayload = message.extraPayload);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PayloadCheckResult>, I>>(
    object: I
  ): PayloadCheckResult {
    const message = createBasePayloadCheckResult();
    message.error = object.error ?? 0;
    message.extraPayload = object.extraPayload ?? 0;
    return message;
  },
};

function createBaseLoadCellSpotCheckResult(): LoadCellSpotCheckResult {
  return { error: 0, zero: 0, oldZero: 0 };
}

export const LoadCellSpotCheckResult = {
  encode(
    message: LoadCellSpotCheckResult,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.error !== 0) {
      writer.uint32(16).int32(message.error);
    }
    if (message.zero !== 0) {
      writer.uint32(29).float(message.zero);
    }
    if (message.oldZero !== 0) {
      writer.uint32(37).float(message.oldZero);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): LoadCellSpotCheckResult {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoadCellSpotCheckResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.error = reader.int32() as any;
          break;
        case 3:
          message.zero = reader.float();
          break;
        case 4:
          message.oldZero = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LoadCellSpotCheckResult {
    return {
      error: isSet(object.error)
        ? loadCellSpotCheckResult_ErrorFromJSON(object.error)
        : 0,
      zero: isSet(object.zero) ? Number(object.zero) : 0,
      oldZero: isSet(object.oldZero) ? Number(object.oldZero) : 0,
    };
  },

  toJSON(message: LoadCellSpotCheckResult): unknown {
    const obj: any = {};
    message.error !== undefined &&
      (obj.error = loadCellSpotCheckResult_ErrorToJSON(message.error));
    message.zero !== undefined && (obj.zero = message.zero);
    message.oldZero !== undefined && (obj.oldZero = message.oldZero);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LoadCellSpotCheckResult>, I>>(
    object: I
  ): LoadCellSpotCheckResult {
    const message = createBaseLoadCellSpotCheckResult();
    message.error = object.error ?? 0;
    message.zero = object.zero ?? 0;
    message.oldZero = object.oldZero ?? 0;
    return message;
  },
};

function createBaseJointKinematicCheckResult(): JointKinematicCheckResult {
  return { error: 0, offset: 0, oldOffset: 0, healthScore: 0 };
}

export const JointKinematicCheckResult = {
  encode(
    message: JointKinematicCheckResult,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.error !== 0) {
      writer.uint32(16).int32(message.error);
    }
    if (message.offset !== 0) {
      writer.uint32(29).float(message.offset);
    }
    if (message.oldOffset !== 0) {
      writer.uint32(37).float(message.oldOffset);
    }
    if (message.healthScore !== 0) {
      writer.uint32(45).float(message.healthScore);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): JointKinematicCheckResult {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJointKinematicCheckResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.error = reader.int32() as any;
          break;
        case 3:
          message.offset = reader.float();
          break;
        case 4:
          message.oldOffset = reader.float();
          break;
        case 5:
          message.healthScore = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): JointKinematicCheckResult {
    return {
      error: isSet(object.error)
        ? jointKinematicCheckResult_ErrorFromJSON(object.error)
        : 0,
      offset: isSet(object.offset) ? Number(object.offset) : 0,
      oldOffset: isSet(object.oldOffset) ? Number(object.oldOffset) : 0,
      healthScore: isSet(object.healthScore) ? Number(object.healthScore) : 0,
    };
  },

  toJSON(message: JointKinematicCheckResult): unknown {
    const obj: any = {};
    message.error !== undefined &&
      (obj.error = jointKinematicCheckResult_ErrorToJSON(message.error));
    message.offset !== undefined && (obj.offset = message.offset);
    message.oldOffset !== undefined && (obj.oldOffset = message.oldOffset);
    message.healthScore !== undefined &&
      (obj.healthScore = message.healthScore);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<JointKinematicCheckResult>, I>>(
    object: I
  ): JointKinematicCheckResult {
    const message = createBaseJointKinematicCheckResult();
    message.error = object.error ?? 0;
    message.offset = object.offset ?? 0;
    message.oldOffset = object.oldOffset ?? 0;
    message.healthScore = object.healthScore ?? 0;
    return message;
  },
};

function createBaseFootHeightCheckResult(): FootHeightCheckResult {
  return { status: 0, footHeightErrorFromMean: 0 };
}

export const FootHeightCheckResult = {
  encode(
    message: FootHeightCheckResult,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.footHeightErrorFromMean !== 0) {
      writer.uint32(29).float(message.footHeightErrorFromMean);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): FootHeightCheckResult {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFootHeightCheckResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.status = reader.int32() as any;
          break;
        case 3:
          message.footHeightErrorFromMean = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FootHeightCheckResult {
    return {
      status: isSet(object.status)
        ? footHeightCheckResult_StatusFromJSON(object.status)
        : 0,
      footHeightErrorFromMean: isSet(object.footHeightErrorFromMean)
        ? Number(object.footHeightErrorFromMean)
        : 0,
    };
  },

  toJSON(message: FootHeightCheckResult): unknown {
    const obj: any = {};
    message.status !== undefined &&
      (obj.status = footHeightCheckResult_StatusToJSON(message.status));
    message.footHeightErrorFromMean !== undefined &&
      (obj.footHeightErrorFromMean = message.footHeightErrorFromMean);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FootHeightCheckResult>, I>>(
    object: I
  ): FootHeightCheckResult {
    const message = createBaseFootHeightCheckResult();
    message.status = object.status ?? 0;
    message.footHeightErrorFromMean = object.footHeightErrorFromMean ?? 0;
    return message;
  },
};

function createBaseLegPairCheckResult(): LegPairCheckResult {
  return { status: 0, legPairDistanceChange: 0 };
}

export const LegPairCheckResult = {
  encode(
    message: LegPairCheckResult,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.legPairDistanceChange !== 0) {
      writer.uint32(29).float(message.legPairDistanceChange);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LegPairCheckResult {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLegPairCheckResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.status = reader.int32() as any;
          break;
        case 3:
          message.legPairDistanceChange = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LegPairCheckResult {
    return {
      status: isSet(object.status)
        ? legPairCheckResult_StatusFromJSON(object.status)
        : 0,
      legPairDistanceChange: isSet(object.legPairDistanceChange)
        ? Number(object.legPairDistanceChange)
        : 0,
    };
  },

  toJSON(message: LegPairCheckResult): unknown {
    const obj: any = {};
    message.status !== undefined &&
      (obj.status = legPairCheckResult_StatusToJSON(message.status));
    message.legPairDistanceChange !== undefined &&
      (obj.legPairDistanceChange = message.legPairDistanceChange);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LegPairCheckResult>, I>>(
    object: I
  ): LegPairCheckResult {
    const message = createBaseLegPairCheckResult();
    message.status = object.status ?? 0;
    message.legPairDistanceChange = object.legPairDistanceChange ?? 0;
    return message;
  },
};

function createBaseHipRangeOfMotionResult(): HipRangeOfMotionResult {
  return { error: 0, hx: [], hy: [] };
}

export const HipRangeOfMotionResult = {
  encode(
    message: HipRangeOfMotionResult,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.error !== 0) {
      writer.uint32(8).int32(message.error);
    }
    writer.uint32(18).fork();
    for (const v of message.hx) {
      writer.float(v);
    }
    writer.ldelim();
    writer.uint32(26).fork();
    for (const v of message.hy) {
      writer.float(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): HipRangeOfMotionResult {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHipRangeOfMotionResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.error = reader.int32() as any;
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.hx.push(reader.float());
            }
          } else {
            message.hx.push(reader.float());
          }
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.hy.push(reader.float());
            }
          } else {
            message.hy.push(reader.float());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): HipRangeOfMotionResult {
    return {
      error: isSet(object.error)
        ? hipRangeOfMotionResult_ErrorFromJSON(object.error)
        : 0,
      hx: Array.isArray(object?.hx) ? object.hx.map((e: any) => Number(e)) : [],
      hy: Array.isArray(object?.hy) ? object.hy.map((e: any) => Number(e)) : [],
    };
  },

  toJSON(message: HipRangeOfMotionResult): unknown {
    const obj: any = {};
    message.error !== undefined &&
      (obj.error = hipRangeOfMotionResult_ErrorToJSON(message.error));
    if (message.hx) {
      obj.hx = message.hx.map((e) => e);
    } else {
      obj.hx = [];
    }
    if (message.hy) {
      obj.hy = message.hy.map((e) => e);
    } else {
      obj.hy = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<HipRangeOfMotionResult>, I>>(
    object: I
  ): HipRangeOfMotionResult {
    const message = createBaseHipRangeOfMotionResult();
    message.error = object.error ?? 0;
    message.hx = object.hx?.map((e) => e) || [];
    message.hy = object.hy?.map((e) => e) || [];
    return message;
  },
};

function createBaseCameraCalibrationCommandRequest(): CameraCalibrationCommandRequest {
  return { header: undefined, lease: undefined, command: 0 };
}

export const CameraCalibrationCommandRequest = {
  encode(
    message: CameraCalibrationCommandRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.lease !== undefined) {
      Lease.encode(message.lease, writer.uint32(18).fork()).ldelim();
    }
    if (message.command !== 0) {
      writer.uint32(24).int32(message.command);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CameraCalibrationCommandRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCameraCalibrationCommandRequest();
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
          message.command = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CameraCalibrationCommandRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      lease: isSet(object.lease) ? Lease.fromJSON(object.lease) : undefined,
      command: isSet(object.command)
        ? cameraCalibrationCommandRequest_CommandFromJSON(object.command)
        : 0,
    };
  },

  toJSON(message: CameraCalibrationCommandRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.lease !== undefined &&
      (obj.lease = message.lease ? Lease.toJSON(message.lease) : undefined);
    message.command !== undefined &&
      (obj.command = cameraCalibrationCommandRequest_CommandToJSON(
        message.command
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CameraCalibrationCommandRequest>, I>>(
    object: I
  ): CameraCalibrationCommandRequest {
    const message = createBaseCameraCalibrationCommandRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.lease =
      object.lease !== undefined && object.lease !== null
        ? Lease.fromPartial(object.lease)
        : undefined;
    message.command = object.command ?? 0;
    return message;
  },
};

function createBaseCameraCalibrationCommandResponse(): CameraCalibrationCommandResponse {
  return { header: undefined, leaseUseResult: undefined };
}

export const CameraCalibrationCommandResponse = {
  encode(
    message: CameraCalibrationCommandResponse,
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
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CameraCalibrationCommandResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCameraCalibrationCommandResponse();
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
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CameraCalibrationCommandResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      leaseUseResult: isSet(object.leaseUseResult)
        ? LeaseUseResult.fromJSON(object.leaseUseResult)
        : undefined,
    };
  },

  toJSON(message: CameraCalibrationCommandResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.leaseUseResult !== undefined &&
      (obj.leaseUseResult = message.leaseUseResult
        ? LeaseUseResult.toJSON(message.leaseUseResult)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<CameraCalibrationCommandResponse>, I>
  >(object: I): CameraCalibrationCommandResponse {
    const message = createBaseCameraCalibrationCommandResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.leaseUseResult =
      object.leaseUseResult !== undefined && object.leaseUseResult !== null
        ? LeaseUseResult.fromPartial(object.leaseUseResult)
        : undefined;
    return message;
  },
};

function createBaseCameraCalibrationFeedbackRequest(): CameraCalibrationFeedbackRequest {
  return { header: undefined };
}

export const CameraCalibrationFeedbackRequest = {
  encode(
    message: CameraCalibrationFeedbackRequest,
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
  ): CameraCalibrationFeedbackRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCameraCalibrationFeedbackRequest();
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

  fromJSON(object: any): CameraCalibrationFeedbackRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: CameraCalibrationFeedbackRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<CameraCalibrationFeedbackRequest>, I>
  >(object: I): CameraCalibrationFeedbackRequest {
    const message = createBaseCameraCalibrationFeedbackRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseCameraCalibrationFeedbackResponse(): CameraCalibrationFeedbackResponse {
  return { header: undefined, status: 0, progress: 0 };
}

export const CameraCalibrationFeedbackResponse = {
  encode(
    message: CameraCalibrationFeedbackResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.progress !== 0) {
      writer.uint32(29).float(message.progress);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CameraCalibrationFeedbackResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCameraCalibrationFeedbackResponse();
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
          message.progress = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CameraCalibrationFeedbackResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? cameraCalibrationFeedbackResponse_StatusFromJSON(object.status)
        : 0,
      progress: isSet(object.progress) ? Number(object.progress) : 0,
    };
  },

  toJSON(message: CameraCalibrationFeedbackResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = cameraCalibrationFeedbackResponse_StatusToJSON(
        message.status
      ));
    message.progress !== undefined && (obj.progress = message.progress);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<CameraCalibrationFeedbackResponse>, I>
  >(object: I): CameraCalibrationFeedbackResponse {
    const message = createBaseCameraCalibrationFeedbackResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    message.progress = object.progress ?? 0;
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
