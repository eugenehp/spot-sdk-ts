/* eslint-disable */
import {
  SE2TrajectoryCommand_Feedback_BodyMovementStatus,
  sE2TrajectoryCommand_Feedback_BodyMovementStatusFromJSON,
  sE2TrajectoryCommand_Feedback_BodyMovementStatusToJSON,
} from "../basic_command";
import {
  LicenseInfo_Status,
  licenseInfo_StatusFromJSON,
  licenseInfo_StatusToJSON,
} from "../license";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { RequestHeader, ResponseHeader } from "../header";
import { Localization, Route } from "./nav";
import { SE3Pose, SE2VelocityLimit, SE2Pose, Vec3 } from "../geometry";
import { LeaseUseResult, Lease } from "../lease";
import { RobotImpairedState, KinematicState } from "../robot_state";
import { Edge_Id, WaypointSnapshot, Graph } from "./map";
import { DataChunk } from "../data_chunk";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api.graph_nav";

/**
 * The SetLocalization request is used to initialize or reset the localization of GraphNav
 * to a map. A localization consists of a waypoint ID, and a pose of the robot relative to that waypoint.
 * GraphNav uses the localization to decide how to navigate through a map.
 * The SetLocalizationRequest contains parameters to help find a correct localization. For example,
 * AprilTags (fiducials) may be used to set the localization, or the caller can provide an explicit
 * guess of the localization.
 * Once the SetLocalizationRequest completes, the current localization to the map
 * will be modified, and can be retrieved using a GetLocalizationStateRequest.
 */
export interface SetLocalizationRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Operator-supplied guess at localization. */
  initialGuess: Localization | undefined;
  /**
   * Robot pose when the initial_guess was made.
   * This overcomes the race that occurs when the client is trying to initialize a moving robot.
   * GraphNav will use its local ko_tform_body and this ko_tform_body to update the initial
   * localization guess, if necessary.
   */
  koTformBody: SE3Pose | undefined;
  /**
   * The max distance [meters] is how far away the robot is allowed to localize from the position supplied
   * in the initial guess. If not specified, the offset is used directly. Otherwise it searches a neighborhood
   * of the given size.
   */
  maxDistance: number;
  /**
   * The max yaw [radians] is how different the localized yaw is allowed to be from the supplied yaw
   * in the initial guess. If not specified, the offset is used directly. Otherwise it searches a neighborhood
   * of the given size.
   */
  maxYaw: number;
  /** Tells the initializer whether to use fiducials, and how to use them. */
  fiducialInit: SetLocalizationRequest_FiducialInit;
  /**
   * If using FIDUCIAL_INIT_SPECIFIC, this is the specific fiducial ID to use for initialization.
   * If no detection of this fiducial exists, the service will return STATUS_NO_MATCHING_FIDUCIAL.
   * If detections exist, but are low quality, STATUS_FIDUCIAL_TOO_FAR_AWAY, FIDUCIAL_TOO_OLD, or FIDUCIAL_POSE_UNCERTAIN will be returned.
   */
  useFiducialId: number;
  /**
   * If true, and we are using fiducials during initialization, will run ICP after the fiducial
   * was used for an initial guess.
   */
  refineFiducialResultWithIcp: boolean;
  /** If true, consider how nearby localizations appear (like turned 180). */
  doAmbiguityCheck: boolean;
  /**
   * If using FIDUCIAL_INIT_SPECIFIC and this is true, the initializer will only consider
   * fiducial detections from the target waypoint (from initial_guess). Otherwise, if the
   * target waypoint does not contain a good measurement of the desired fiducial, nearby waypoints
   * may be used to infer the robot's location.
   */
  restrictFiducialDetectionsToTargetWaypoint: boolean;
}

export enum SetLocalizationRequest_FiducialInit {
  /** FIDUCIAL_INIT_UNKNOWN - It is a programming error to use this one. */
  FIDUCIAL_INIT_UNKNOWN = 0,
  /** FIDUCIAL_INIT_NO_FIDUCIAL - Ignore fiducials during initialization. */
  FIDUCIAL_INIT_NO_FIDUCIAL = 1,
  /** FIDUCIAL_INIT_NEAREST - Localize to the nearest fiducial in any waypoint. */
  FIDUCIAL_INIT_NEAREST = 2,
  /** FIDUCIAL_INIT_NEAREST_AT_TARGET - Localize to nearest fiducial at the target waypoint (from initial_guess). */
  FIDUCIAL_INIT_NEAREST_AT_TARGET = 3,
  /** FIDUCIAL_INIT_SPECIFIC - Localize to the given fiducial at the target waypoint (from initial_guess) if it exists, or any waypoint otherwise. */
  FIDUCIAL_INIT_SPECIFIC = 4,
  UNRECOGNIZED = -1,
}

export function setLocalizationRequest_FiducialInitFromJSON(
  object: any
): SetLocalizationRequest_FiducialInit {
  switch (object) {
    case 0:
    case "FIDUCIAL_INIT_UNKNOWN":
      return SetLocalizationRequest_FiducialInit.FIDUCIAL_INIT_UNKNOWN;
    case 1:
    case "FIDUCIAL_INIT_NO_FIDUCIAL":
      return SetLocalizationRequest_FiducialInit.FIDUCIAL_INIT_NO_FIDUCIAL;
    case 2:
    case "FIDUCIAL_INIT_NEAREST":
      return SetLocalizationRequest_FiducialInit.FIDUCIAL_INIT_NEAREST;
    case 3:
    case "FIDUCIAL_INIT_NEAREST_AT_TARGET":
      return SetLocalizationRequest_FiducialInit.FIDUCIAL_INIT_NEAREST_AT_TARGET;
    case 4:
    case "FIDUCIAL_INIT_SPECIFIC":
      return SetLocalizationRequest_FiducialInit.FIDUCIAL_INIT_SPECIFIC;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SetLocalizationRequest_FiducialInit.UNRECOGNIZED;
  }
}

export function setLocalizationRequest_FiducialInitToJSON(
  object: SetLocalizationRequest_FiducialInit
): string {
  switch (object) {
    case SetLocalizationRequest_FiducialInit.FIDUCIAL_INIT_UNKNOWN:
      return "FIDUCIAL_INIT_UNKNOWN";
    case SetLocalizationRequest_FiducialInit.FIDUCIAL_INIT_NO_FIDUCIAL:
      return "FIDUCIAL_INIT_NO_FIDUCIAL";
    case SetLocalizationRequest_FiducialInit.FIDUCIAL_INIT_NEAREST:
      return "FIDUCIAL_INIT_NEAREST";
    case SetLocalizationRequest_FiducialInit.FIDUCIAL_INIT_NEAREST_AT_TARGET:
      return "FIDUCIAL_INIT_NEAREST_AT_TARGET";
    case SetLocalizationRequest_FiducialInit.FIDUCIAL_INIT_SPECIFIC:
      return "FIDUCIAL_INIT_SPECIFIC";
    case SetLocalizationRequest_FiducialInit.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Info on whether the robot's current sensor setup is compatible with the recorded data
 * in the map.
 */
export interface SensorCompatibilityStatus {
  /** If true, the loaded map has LIDAR data in it. */
  mapHasLidarData: boolean;
  /** If true, the robot is currently configured to use LIDAR data. */
  robotConfiguredForLidar: boolean;
}

/** The SetLocalization response message contains the resulting localization to the map. */
export interface SetLocalizationResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Result of using the lease. */
  leaseUseResult: LeaseUseResult | undefined;
  /** Return status for the request. */
  status: SetLocalizationResponse_Status;
  /** If set, describes the reason the status is not OK. */
  errorReport: string;
  /** Result of localization. */
  localization: Localization | undefined;
  /** Alternative information if the localization is ambiguous. */
  suspectedAmbiguity: SetLocalizationResponse_SuspectedAmbiguity | undefined;
  /** If the status is ROBOT_IMPAIRED, this is why the robot is impaired. */
  impairedState: RobotImpairedState | undefined;
  /**
   * This status determines whether the robot has compatible sensors for the
   * map that was recorded. Note that if sensors aren't working, STATUS_IMPARIED
   * will be returned, rather than STATUS_INCOMPATIBLE_SENSORS.
   */
  sensorStatus: SensorCompatibilityStatus | undefined;
}

export enum SetLocalizationResponse_Status {
  /** STATUS_UNKNOWN - The status is unknown/unset. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Localization success. */
  STATUS_OK = 1,
  /** STATUS_ROBOT_IMPAIRED - Robot is experiencing a condition that prevents localization. */
  STATUS_ROBOT_IMPAIRED = 2,
  /**
   * STATUS_UNKNOWN_WAYPOINT - The given waypoint is unknown by the system.
   * This could be due to a client error, or because the graph was changed out from under the
   * client.
   */
  STATUS_UNKNOWN_WAYPOINT = 3,
  /** STATUS_ABORTED - Localization was aborted, likely because of a new request. */
  STATUS_ABORTED = 4,
  /**
   * STATUS_FAILED - Failed to localize for some other reason; see the error_report for details.
   * This is often because the initial guess was incorrect.
   */
  STATUS_FAILED = 5,
  /**
   * STATUS_FIDUCIAL_TOO_FAR_AWAY - Failed to localize because the fiducial requested by 'use_fiducial_id' was too far away from
   * the robot.
   */
  STATUS_FIDUCIAL_TOO_FAR_AWAY = 6,
  /**
   * STATUS_FIDUCIAL_TOO_OLD - Failed to localize because the fiducial requested by 'use_fiducial_id' had a detection time that was too
   * far in the past.
   */
  STATUS_FIDUCIAL_TOO_OLD = 7,
  /**
   * STATUS_NO_MATCHING_FIDUCIAL - Failed to localize because the fiducial requested by 'use_fiducial_id' did not exist in the map at
   * the required location.
   */
  STATUS_NO_MATCHING_FIDUCIAL = 8,
  /**
   * STATUS_FIDUCIAL_POSE_UNCERTAIN - Failed to localize because the fiducial requested by 'use_fiducial_id' had an unreliable
   * pose estimation, either in the current detection of that fiducial, or in detections that
   * were saved in the map. Note that when using FIDUCIAL_INIT_SPECIFIC, fiducial detections at
   * the target waypoint will be used so long as they are not uncertain -- otherwise, detections
   * at adjacent waypoints may be used. If there exists no uncertain detection of the fiducial
   * near the target waypoint in the map, the service returns this status.
   */
  STATUS_FIDUCIAL_POSE_UNCERTAIN = 9,
  /**
   * STATUS_INCOMPATIBLE_SENSORS - The localization could not be set, because the map was recorded using a different sensor
   * setup than the robot currently has onboard. See SensorStatus for more details.
   */
  STATUS_INCOMPATIBLE_SENSORS = 10,
  UNRECOGNIZED = -1,
}

export function setLocalizationResponse_StatusFromJSON(
  object: any
): SetLocalizationResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return SetLocalizationResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return SetLocalizationResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_ROBOT_IMPAIRED":
      return SetLocalizationResponse_Status.STATUS_ROBOT_IMPAIRED;
    case 3:
    case "STATUS_UNKNOWN_WAYPOINT":
      return SetLocalizationResponse_Status.STATUS_UNKNOWN_WAYPOINT;
    case 4:
    case "STATUS_ABORTED":
      return SetLocalizationResponse_Status.STATUS_ABORTED;
    case 5:
    case "STATUS_FAILED":
      return SetLocalizationResponse_Status.STATUS_FAILED;
    case 6:
    case "STATUS_FIDUCIAL_TOO_FAR_AWAY":
      return SetLocalizationResponse_Status.STATUS_FIDUCIAL_TOO_FAR_AWAY;
    case 7:
    case "STATUS_FIDUCIAL_TOO_OLD":
      return SetLocalizationResponse_Status.STATUS_FIDUCIAL_TOO_OLD;
    case 8:
    case "STATUS_NO_MATCHING_FIDUCIAL":
      return SetLocalizationResponse_Status.STATUS_NO_MATCHING_FIDUCIAL;
    case 9:
    case "STATUS_FIDUCIAL_POSE_UNCERTAIN":
      return SetLocalizationResponse_Status.STATUS_FIDUCIAL_POSE_UNCERTAIN;
    case 10:
    case "STATUS_INCOMPATIBLE_SENSORS":
      return SetLocalizationResponse_Status.STATUS_INCOMPATIBLE_SENSORS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SetLocalizationResponse_Status.UNRECOGNIZED;
  }
}

export function setLocalizationResponse_StatusToJSON(
  object: SetLocalizationResponse_Status
): string {
  switch (object) {
    case SetLocalizationResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case SetLocalizationResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case SetLocalizationResponse_Status.STATUS_ROBOT_IMPAIRED:
      return "STATUS_ROBOT_IMPAIRED";
    case SetLocalizationResponse_Status.STATUS_UNKNOWN_WAYPOINT:
      return "STATUS_UNKNOWN_WAYPOINT";
    case SetLocalizationResponse_Status.STATUS_ABORTED:
      return "STATUS_ABORTED";
    case SetLocalizationResponse_Status.STATUS_FAILED:
      return "STATUS_FAILED";
    case SetLocalizationResponse_Status.STATUS_FIDUCIAL_TOO_FAR_AWAY:
      return "STATUS_FIDUCIAL_TOO_FAR_AWAY";
    case SetLocalizationResponse_Status.STATUS_FIDUCIAL_TOO_OLD:
      return "STATUS_FIDUCIAL_TOO_OLD";
    case SetLocalizationResponse_Status.STATUS_NO_MATCHING_FIDUCIAL:
      return "STATUS_NO_MATCHING_FIDUCIAL";
    case SetLocalizationResponse_Status.STATUS_FIDUCIAL_POSE_UNCERTAIN:
      return "STATUS_FIDUCIAL_POSE_UNCERTAIN";
    case SetLocalizationResponse_Status.STATUS_INCOMPATIBLE_SENSORS:
      return "STATUS_INCOMPATIBLE_SENSORS";
    case SetLocalizationResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface SetLocalizationResponse_SuspectedAmbiguity {
  /**
   * Example of a potentially ambiguous localization near the
   * result of the initialization.
   */
  alternateRobotTformWaypoint: SE3Pose | undefined;
}

export interface RouteGenParams {}

/** Parameters describing how to travel along a route. */
export interface TravelParams {
  /**
   * Threshold for the maximum distance [meters] that defines when we have reached
   * the final waypoint.
   */
  maxDistance: number;
  /**
   * Threshold for the maximum yaw [radians] that defines when we have reached
   * the final waypoint (ignored if ignore_final_yaw is set to true).
   */
  maxYaw: number;
  /**
   * Speed the robot should use.
   * Omit to let the robot choose.
   */
  velocityLimit: SE2VelocityLimit | undefined;
  /**
   * If true, the robot will only try to achieve
   * the final translation of the route. Otherwise,
   * it will attempt to achieve the yaw as well.
   */
  ignoreFinalYaw: boolean;
  featureQualityTolerance: TravelParams_FeatureQualityTolerance;
  /** Disable directed exploration to skip blocked portions of route */
  disableDirectedExploration: boolean;
  /** Disable alternate-route-finding; overrides the per-edge setting in the map. */
  disableAlternateRouteFinding: boolean;
}

/** Indicates whether robot will navigate through areas with poor quality features */
export enum TravelParams_FeatureQualityTolerance {
  /** TOLERANCE_UNKNOWN - Unknown value */
  TOLERANCE_UNKNOWN = 0,
  /** TOLERANCE_DEFAULT - Navigate through default number of waypoints with poor quality features */
  TOLERANCE_DEFAULT = 1,
  /** TOLERANCE_IGNORE_POOR_FEATURE_QUALITY - Navigate through unlimited number of waypoints with poor quality features */
  TOLERANCE_IGNORE_POOR_FEATURE_QUALITY = 2,
  UNRECOGNIZED = -1,
}

export function travelParams_FeatureQualityToleranceFromJSON(
  object: any
): TravelParams_FeatureQualityTolerance {
  switch (object) {
    case 0:
    case "TOLERANCE_UNKNOWN":
      return TravelParams_FeatureQualityTolerance.TOLERANCE_UNKNOWN;
    case 1:
    case "TOLERANCE_DEFAULT":
      return TravelParams_FeatureQualityTolerance.TOLERANCE_DEFAULT;
    case 2:
    case "TOLERANCE_IGNORE_POOR_FEATURE_QUALITY":
      return TravelParams_FeatureQualityTolerance.TOLERANCE_IGNORE_POOR_FEATURE_QUALITY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TravelParams_FeatureQualityTolerance.UNRECOGNIZED;
  }
}

export function travelParams_FeatureQualityToleranceToJSON(
  object: TravelParams_FeatureQualityTolerance
): string {
  switch (object) {
    case TravelParams_FeatureQualityTolerance.TOLERANCE_UNKNOWN:
      return "TOLERANCE_UNKNOWN";
    case TravelParams_FeatureQualityTolerance.TOLERANCE_DEFAULT:
      return "TOLERANCE_DEFAULT";
    case TravelParams_FeatureQualityTolerance.TOLERANCE_IGNORE_POOR_FEATURE_QUALITY:
      return "TOLERANCE_IGNORE_POOR_FEATURE_QUALITY";
    case TravelParams_FeatureQualityTolerance.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * The NavigateToRequest can be used to command GraphNav to drive the robot to a specific waypoint.
 * GraphNav will plan a path through the map which most efficiently gets the robot to the specified goal waypoint.
 * Parameters are provided which influence how GraphNav will generate and follow the path.
 * This RPC returns immediately after the request is processed. It does not block until GraphNav completes the path
 * to the goal waypoint. The user is expected to periodically check the status of the NavigateTo command using
 * the NavigationFeedbackRequest RPC.
 */
export interface NavigateToRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** The Leases to show ownership of the robot and the graph. */
  leases: Lease[];
  /** ID of the waypoint to go to. */
  destinationWaypointId: string;
  /** Preferences on how to pick the route. */
  routeParams: RouteGenParams | undefined;
  /** Parameters that define how to traverse and end the route. */
  travelParams: TravelParams | undefined;
  /** The timestamp (in robot time) that the navigation command is valid until. */
  endTime: Date | undefined;
  /** Identifier provided by the time sync service to verify time sync between robot and client. */
  clockIdentifier: string;
  /**
   * If provided, graph_nav will move the robot to an SE2 pose relative to the waypoint.
   * Note that the robot will treat this as a simple goto request. It will first arrive at the
   * destination waypoint, and then travel in a straight line from the destination waypoint to the
   * offset goal, attempting to avoid obstacles along the way.
   */
  destinationWaypointTformBodyGoal: SE2Pose | undefined;
  /**
   * Unique identifier for the command. If 0, this is a new command, otherwise it is a continuation
   * of an existing command. If this is a continuation of an existing command, all parameters will be
   * ignored, and the old parameters will be preserved.
   */
  commandId: number;
}

/**
 * Response to a NavigateToRequest. This is returned immediately after the request is processed. A command_id
 * is provided to specify the ID that the user may use to poll the system for feedback on the NavigateTo command.
 */
export interface NavigateToResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Results of using the various leases. */
  leaseUseResults: LeaseUseResult[];
  /** Return status for the request. */
  status: NavigateToResponse_Status;
  /** If the status is ROBOT_IMPAIRED, this is why the robot is impaired. */
  impairedState: RobotImpairedState | undefined;
  /** Unique identifier for the command, If 0, command was not accepted. */
  commandId: number;
  /** On a relevant error status code, these fields contain the waypoint/edge IDs that caused the error. */
  errorWaypointIds: string[];
}

export enum NavigateToResponse_Status {
  /** STATUS_UNKNOWN - An unknown / unexpected error occurred. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Request was accepted. */
  STATUS_OK = 1,
  /** STATUS_NO_TIMESYNC - [Time error] Client has not done timesync with robot. */
  STATUS_NO_TIMESYNC = 2,
  /** STATUS_EXPIRED - [Time error] The command was received after its end time had already passed. */
  STATUS_EXPIRED = 3,
  /** STATUS_TOO_DISTANT - [Time error]The command end time was too far in the future. */
  STATUS_TOO_DISTANT = 4,
  /**
   * STATUS_ROBOT_IMPAIRED - [Robot State Error] Cannot navigate a route if the robot has a critical
   *  perception fault, or behavior fault, or LIDAR not working.
   */
  STATUS_ROBOT_IMPAIRED = 5,
  /** STATUS_RECORDING - [Robot State Error] Cannot navigate a route while recording a map. */
  STATUS_RECORDING = 6,
  /** STATUS_UNKNOWN_WAYPOINT - [Route Error] One or more of the waypoints specified weren't in the map. */
  STATUS_UNKNOWN_WAYPOINT = 7,
  /** STATUS_NO_PATH - [Route Error] There is no path to the specified waypoint. */
  STATUS_NO_PATH = 8,
  /** STATUS_FEATURE_DESERT - [Route Error] Route contained too many waypoints with low-quality features. */
  STATUS_FEATURE_DESERT = 10,
  /** STATUS_LOST - [Route Error] Happens when you try to issue a navigate to while the robot is lost. */
  STATUS_LOST = 11,
  /** STATUS_NOT_LOCALIZED_TO_MAP - [Route Error] Happens when the current localization doesn't refer to any waypoint in the map (possibly uninitialized localization). */
  STATUS_NOT_LOCALIZED_TO_MAP = 13,
  /** STATUS_COULD_NOT_UPDATE_ROUTE - [Wrestling error] Happens when graph nav refuses to follow the route you specified. */
  STATUS_COULD_NOT_UPDATE_ROUTE = 12,
  /**
   * STATUS_STUCK - [Route Error] Happens when you try to issue a navigate to while the robot is stuck. Navigate to a different
   * waypoint, or clear the route and try again.
   */
  STATUS_STUCK = 14,
  /** STATUS_UNRECOGNIZED_COMMAND - [Request Error] Happens when you try to continue a command that was either expired, or had an unrecognized id. */
  STATUS_UNRECOGNIZED_COMMAND = 15,
  UNRECOGNIZED = -1,
}

export function navigateToResponse_StatusFromJSON(
  object: any
): NavigateToResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return NavigateToResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return NavigateToResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_NO_TIMESYNC":
      return NavigateToResponse_Status.STATUS_NO_TIMESYNC;
    case 3:
    case "STATUS_EXPIRED":
      return NavigateToResponse_Status.STATUS_EXPIRED;
    case 4:
    case "STATUS_TOO_DISTANT":
      return NavigateToResponse_Status.STATUS_TOO_DISTANT;
    case 5:
    case "STATUS_ROBOT_IMPAIRED":
      return NavigateToResponse_Status.STATUS_ROBOT_IMPAIRED;
    case 6:
    case "STATUS_RECORDING":
      return NavigateToResponse_Status.STATUS_RECORDING;
    case 7:
    case "STATUS_UNKNOWN_WAYPOINT":
      return NavigateToResponse_Status.STATUS_UNKNOWN_WAYPOINT;
    case 8:
    case "STATUS_NO_PATH":
      return NavigateToResponse_Status.STATUS_NO_PATH;
    case 10:
    case "STATUS_FEATURE_DESERT":
      return NavigateToResponse_Status.STATUS_FEATURE_DESERT;
    case 11:
    case "STATUS_LOST":
      return NavigateToResponse_Status.STATUS_LOST;
    case 13:
    case "STATUS_NOT_LOCALIZED_TO_MAP":
      return NavigateToResponse_Status.STATUS_NOT_LOCALIZED_TO_MAP;
    case 12:
    case "STATUS_COULD_NOT_UPDATE_ROUTE":
      return NavigateToResponse_Status.STATUS_COULD_NOT_UPDATE_ROUTE;
    case 14:
    case "STATUS_STUCK":
      return NavigateToResponse_Status.STATUS_STUCK;
    case 15:
    case "STATUS_UNRECOGNIZED_COMMAND":
      return NavigateToResponse_Status.STATUS_UNRECOGNIZED_COMMAND;
    case -1:
    case "UNRECOGNIZED":
    default:
      return NavigateToResponse_Status.UNRECOGNIZED;
  }
}

export function navigateToResponse_StatusToJSON(
  object: NavigateToResponse_Status
): string {
  switch (object) {
    case NavigateToResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case NavigateToResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case NavigateToResponse_Status.STATUS_NO_TIMESYNC:
      return "STATUS_NO_TIMESYNC";
    case NavigateToResponse_Status.STATUS_EXPIRED:
      return "STATUS_EXPIRED";
    case NavigateToResponse_Status.STATUS_TOO_DISTANT:
      return "STATUS_TOO_DISTANT";
    case NavigateToResponse_Status.STATUS_ROBOT_IMPAIRED:
      return "STATUS_ROBOT_IMPAIRED";
    case NavigateToResponse_Status.STATUS_RECORDING:
      return "STATUS_RECORDING";
    case NavigateToResponse_Status.STATUS_UNKNOWN_WAYPOINT:
      return "STATUS_UNKNOWN_WAYPOINT";
    case NavigateToResponse_Status.STATUS_NO_PATH:
      return "STATUS_NO_PATH";
    case NavigateToResponse_Status.STATUS_FEATURE_DESERT:
      return "STATUS_FEATURE_DESERT";
    case NavigateToResponse_Status.STATUS_LOST:
      return "STATUS_LOST";
    case NavigateToResponse_Status.STATUS_NOT_LOCALIZED_TO_MAP:
      return "STATUS_NOT_LOCALIZED_TO_MAP";
    case NavigateToResponse_Status.STATUS_COULD_NOT_UPDATE_ROUTE:
      return "STATUS_COULD_NOT_UPDATE_ROUTE";
    case NavigateToResponse_Status.STATUS_STUCK:
      return "STATUS_STUCK";
    case NavigateToResponse_Status.STATUS_UNRECOGNIZED_COMMAND:
      return "STATUS_UNRECOGNIZED_COMMAND";
    case NavigateToResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** These parameters are specific to how the robot follows a specified route in NavigateRoute. */
export interface RouteFollowingParams {
  newCmdBehavior: RouteFollowingParams_StartRouteBehavior;
  existingCmdBehavior: RouteFollowingParams_ResumeBehavior;
  routeBlockedBehavior: RouteFollowingParams_RouteBlockedBehavior;
}

/**
 * This setting applies when a new NavigateRoute command is issued (different route or
 * final-waypoint-offset), and command_id indicates a new command.
 */
export enum RouteFollowingParams_StartRouteBehavior {
  /** START_UNKNOWN - The mode is unset. */
  START_UNKNOWN = 0,
  /**
   * START_GOTO_START - The robot will find the shortest path to the start of the route, possibly using
   * edges that are not in the route. After going to the start, the robot will follow the
   * route.
   */
  START_GOTO_START = 1,
  /**
   * START_GOTO_ROUTE - The robot will find the shortest path to any point on the route, and go to the point
   * that gives that shortest path. Then, the robot will follow the rest of the route from
   * that point.
   * If multiple points on the route are similarly close to the robot, the robot will
   * prefer the earliest on the route.
   * This is the default.
   */
  START_GOTO_ROUTE = 2,
  /** START_FAIL_WHEN_NOT_ON_ROUTE - The robot will fail the command with status STATUS_NOT_LOCALIZED_TO_ROUTE. */
  START_FAIL_WHEN_NOT_ON_ROUTE = 3,
  UNRECOGNIZED = -1,
}

export function routeFollowingParams_StartRouteBehaviorFromJSON(
  object: any
): RouteFollowingParams_StartRouteBehavior {
  switch (object) {
    case 0:
    case "START_UNKNOWN":
      return RouteFollowingParams_StartRouteBehavior.START_UNKNOWN;
    case 1:
    case "START_GOTO_START":
      return RouteFollowingParams_StartRouteBehavior.START_GOTO_START;
    case 2:
    case "START_GOTO_ROUTE":
      return RouteFollowingParams_StartRouteBehavior.START_GOTO_ROUTE;
    case 3:
    case "START_FAIL_WHEN_NOT_ON_ROUTE":
      return RouteFollowingParams_StartRouteBehavior.START_FAIL_WHEN_NOT_ON_ROUTE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RouteFollowingParams_StartRouteBehavior.UNRECOGNIZED;
  }
}

export function routeFollowingParams_StartRouteBehaviorToJSON(
  object: RouteFollowingParams_StartRouteBehavior
): string {
  switch (object) {
    case RouteFollowingParams_StartRouteBehavior.START_UNKNOWN:
      return "START_UNKNOWN";
    case RouteFollowingParams_StartRouteBehavior.START_GOTO_START:
      return "START_GOTO_START";
    case RouteFollowingParams_StartRouteBehavior.START_GOTO_ROUTE:
      return "START_GOTO_ROUTE";
    case RouteFollowingParams_StartRouteBehavior.START_FAIL_WHEN_NOT_ON_ROUTE:
      return "START_FAIL_WHEN_NOT_ON_ROUTE";
    case RouteFollowingParams_StartRouteBehavior.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * This setting applies when a NavigateRoute command is issued with the same route and
 * final-waypoint-offset. It is not necessary that command_id indicate the same command.
 * The expected waypoint is the last waypoint that GraphNav was autonomously navigating to.
 */
export enum RouteFollowingParams_ResumeBehavior {
  /** RESUME_UNKNOWN - The mode is unset. */
  RESUME_UNKNOWN = 0,
  /**
   * RESUME_RETURN_TO_UNFINISHED_ROUTE - The robot will find the shortest path to any point on the route after the
   * furthest-along traversed edge, and go to the point that gives that shortest path.
   * Then, the robot will follow the rest of the route from that point.
   * This is the default.
   */
  RESUME_RETURN_TO_UNFINISHED_ROUTE = 1,
  /** RESUME_FAIL_WHEN_NOT_ON_ROUTE - The robot will fail the command with status STATUS_NOT_LOCALIZED_TO_ROUTE. */
  RESUME_FAIL_WHEN_NOT_ON_ROUTE = 2,
  UNRECOGNIZED = -1,
}

export function routeFollowingParams_ResumeBehaviorFromJSON(
  object: any
): RouteFollowingParams_ResumeBehavior {
  switch (object) {
    case 0:
    case "RESUME_UNKNOWN":
      return RouteFollowingParams_ResumeBehavior.RESUME_UNKNOWN;
    case 1:
    case "RESUME_RETURN_TO_UNFINISHED_ROUTE":
      return RouteFollowingParams_ResumeBehavior.RESUME_RETURN_TO_UNFINISHED_ROUTE;
    case 2:
    case "RESUME_FAIL_WHEN_NOT_ON_ROUTE":
      return RouteFollowingParams_ResumeBehavior.RESUME_FAIL_WHEN_NOT_ON_ROUTE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RouteFollowingParams_ResumeBehavior.UNRECOGNIZED;
  }
}

export function routeFollowingParams_ResumeBehaviorToJSON(
  object: RouteFollowingParams_ResumeBehavior
): string {
  switch (object) {
    case RouteFollowingParams_ResumeBehavior.RESUME_UNKNOWN:
      return "RESUME_UNKNOWN";
    case RouteFollowingParams_ResumeBehavior.RESUME_RETURN_TO_UNFINISHED_ROUTE:
      return "RESUME_RETURN_TO_UNFINISHED_ROUTE";
    case RouteFollowingParams_ResumeBehavior.RESUME_FAIL_WHEN_NOT_ON_ROUTE:
      return "RESUME_FAIL_WHEN_NOT_ON_ROUTE";
    case RouteFollowingParams_ResumeBehavior.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** This setting applies when the robot discovers that the route is blocked. */
export enum RouteFollowingParams_RouteBlockedBehavior {
  /** ROUTE_BLOCKED_UNKNOWN - The mode is unset. */
  ROUTE_BLOCKED_UNKNOWN = 0,
  /**
   * ROUTE_BLOCKED_REROUTE - The robot will find the shortest path to any point after the furthest-along blockage,
   * and after the furthest-along traversed edge, and go to the point that gives that
   * shortest path. Then, the robot will follow the rest of the route from that point.
   * If multiple points on the route are similarly close to the robot, the robot will
   * prefer the earliest on the route.
   * This is the default.
   */
  ROUTE_BLOCKED_REROUTE = 1,
  /** ROUTE_BLOCKED_FAIL - The robot will fail the command with status STATUS_STUCK; */
  ROUTE_BLOCKED_FAIL = 2,
  UNRECOGNIZED = -1,
}

export function routeFollowingParams_RouteBlockedBehaviorFromJSON(
  object: any
): RouteFollowingParams_RouteBlockedBehavior {
  switch (object) {
    case 0:
    case "ROUTE_BLOCKED_UNKNOWN":
      return RouteFollowingParams_RouteBlockedBehavior.ROUTE_BLOCKED_UNKNOWN;
    case 1:
    case "ROUTE_BLOCKED_REROUTE":
      return RouteFollowingParams_RouteBlockedBehavior.ROUTE_BLOCKED_REROUTE;
    case 2:
    case "ROUTE_BLOCKED_FAIL":
      return RouteFollowingParams_RouteBlockedBehavior.ROUTE_BLOCKED_FAIL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RouteFollowingParams_RouteBlockedBehavior.UNRECOGNIZED;
  }
}

export function routeFollowingParams_RouteBlockedBehaviorToJSON(
  object: RouteFollowingParams_RouteBlockedBehavior
): string {
  switch (object) {
    case RouteFollowingParams_RouteBlockedBehavior.ROUTE_BLOCKED_UNKNOWN:
      return "ROUTE_BLOCKED_UNKNOWN";
    case RouteFollowingParams_RouteBlockedBehavior.ROUTE_BLOCKED_REROUTE:
      return "ROUTE_BLOCKED_REROUTE";
    case RouteFollowingParams_RouteBlockedBehavior.ROUTE_BLOCKED_FAIL:
      return "ROUTE_BLOCKED_FAIL";
    case RouteFollowingParams_RouteBlockedBehavior.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * A NavigateRoute request message specifies a route of waypoints/edges and parameters
 * about how to get there. Like NavigateTo, this command returns immediately upon
 * processing and provides a command_id that the user can use along with a NavigationFeedbackRequest RPC to
 * poll the system for feedback on this command. The RPC does not block until the route is completed.
 */
export interface NavigateRouteRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** The Lease to show ownership of the robot. */
  leases: Lease[];
  /** A route for the robot to follow. */
  route: Route | undefined;
  /**
   * What should the robot do if it is not at the expected point in the route, or the route is
   * blocked.
   */
  routeFollowParams: RouteFollowingParams | undefined;
  /** How to travel the route. */
  travelParams: TravelParams | undefined;
  /** The timestamp (in robot time) that the navigation command is valid until. */
  endTime: Date | undefined;
  /** Identifier provided by the time sync service to verify time sync between robot and client. */
  clockIdentifier: string;
  /**
   * If provided, graph_nav will move the robot to an SE2 pose relative to the final waypoint
   * in the route.
   * Note that the robot will treat this as a simple goto request. It will first arrive at the
   * destination waypoint, and then travel in a straight line from the destination waypoint to the
   * offset goal, attempting to avoid obstacles along the way.
   */
  destinationWaypointTformBodyGoal: SE2Pose | undefined;
  /**
   * Unique identifier for the command. If 0, this is a new command, otherwise it is a continuation
   * of an existing command.
   */
  commandId: number;
}

/**
 * Response to a NavigateRouteRequest. This is returned immediately after the request is processed. A command_id
 * is provided to specify the ID that the user may use to poll the system for feedback on the NavigateRoute command.
 */
export interface NavigateRouteResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Details about how the lease was used. */
  leaseUseResults: LeaseUseResult[];
  /** Return status for the request. */
  status: NavigateRouteResponse_Status;
  /** If the status is ROBOT_IMPAIRED, this is why the robot is impaired. */
  impairedState: RobotImpairedState | undefined;
  /** Unique identifier for the command, If 0, command was not accepted. */
  commandId: number;
  /** On a relevant error status code, these fields contain the waypoint/edge IDs that caused the error. */
  errorWaypointIds: string[];
  /** On a relevant error status code (STATUS_INVALID_EDGE), this is populated with the edge ID's that cased the error. */
  errorEdgeIds: Edge_Id[];
}

export enum NavigateRouteResponse_Status {
  /** STATUS_UNKNOWN - An unknown / unexpected error occurred. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Request was accepted. */
  STATUS_OK = 1,
  /** STATUS_NO_TIMESYNC - [Time Error] Client has not done timesync with robot. */
  STATUS_NO_TIMESYNC = 2,
  /** STATUS_EXPIRED - [Time Error] The command was received after its end time had already passed. */
  STATUS_EXPIRED = 3,
  /** STATUS_TOO_DISTANT - [Time Error] The command end time was too far in the future. */
  STATUS_TOO_DISTANT = 4,
  /**
   * STATUS_ROBOT_IMPAIRED - [Robot State Error] Cannot navigate a route if the robot has a crtical
   *  perception fault, or behavior fault, or LIDAR not working.
   */
  STATUS_ROBOT_IMPAIRED = 5,
  /** STATUS_RECORDING - [Robot State Error] Cannot navigate a route while recording a map. */
  STATUS_RECORDING = 6,
  /** STATUS_UNKNOWN_ROUTE_ELEMENTS - [Route Error] One or more waypoints/edges are not in the map. */
  STATUS_UNKNOWN_ROUTE_ELEMENTS = 8,
  /** STATUS_INVALID_EDGE - [Route Error] One or more edges do not connect to expected waypoints. */
  STATUS_INVALID_EDGE = 9,
  /** STATUS_NO_PATH - [Route Error] There is no path to the specified route. */
  STATUS_NO_PATH = 20,
  /** STATUS_CONSTRAINT_FAULT - [Route Error] Route contained a constraint fault. */
  STATUS_CONSTRAINT_FAULT = 11,
  /** STATUS_FEATURE_DESERT - [Route Error] Route contained too many waypoints with low-quality features. */
  STATUS_FEATURE_DESERT = 13,
  /** STATUS_LOST - [Route Error] Happens when you try to issue a navigate route while the robot is lost. */
  STATUS_LOST = 14,
  /**
   * STATUS_NOT_LOCALIZED_TO_ROUTE - [Route Error] Happens when the current localization doesn't refer to any waypoint
   * in the route (possibly uninitialized localization).
   */
  STATUS_NOT_LOCALIZED_TO_ROUTE = 16,
  /** STATUS_NOT_LOCALIZED_TO_MAP - [Route Error] Happens when the current localization doesn't refer to any waypoint in the map (possibly uninitialized localization). */
  STATUS_NOT_LOCALIZED_TO_MAP = 19,
  /** STATUS_COULD_NOT_UPDATE_ROUTE - [Wrestling Errors] Happens when graph nav refuses to follow the route you specified.  Try saying please? */
  STATUS_COULD_NOT_UPDATE_ROUTE = 15,
  /**
   * STATUS_STUCK - [Route Error] Happens when you try to issue a navigate to while the robot is stuck. Navigate a different
   * route, or clear the route and try again.
   */
  STATUS_STUCK = 17,
  /** STATUS_UNRECOGNIZED_COMMAND - [Request Error] Happens when you try to continue a command that was either expired, or had an unrecognized id. */
  STATUS_UNRECOGNIZED_COMMAND = 18,
  UNRECOGNIZED = -1,
}

export function navigateRouteResponse_StatusFromJSON(
  object: any
): NavigateRouteResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return NavigateRouteResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return NavigateRouteResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_NO_TIMESYNC":
      return NavigateRouteResponse_Status.STATUS_NO_TIMESYNC;
    case 3:
    case "STATUS_EXPIRED":
      return NavigateRouteResponse_Status.STATUS_EXPIRED;
    case 4:
    case "STATUS_TOO_DISTANT":
      return NavigateRouteResponse_Status.STATUS_TOO_DISTANT;
    case 5:
    case "STATUS_ROBOT_IMPAIRED":
      return NavigateRouteResponse_Status.STATUS_ROBOT_IMPAIRED;
    case 6:
    case "STATUS_RECORDING":
      return NavigateRouteResponse_Status.STATUS_RECORDING;
    case 8:
    case "STATUS_UNKNOWN_ROUTE_ELEMENTS":
      return NavigateRouteResponse_Status.STATUS_UNKNOWN_ROUTE_ELEMENTS;
    case 9:
    case "STATUS_INVALID_EDGE":
      return NavigateRouteResponse_Status.STATUS_INVALID_EDGE;
    case 20:
    case "STATUS_NO_PATH":
      return NavigateRouteResponse_Status.STATUS_NO_PATH;
    case 11:
    case "STATUS_CONSTRAINT_FAULT":
      return NavigateRouteResponse_Status.STATUS_CONSTRAINT_FAULT;
    case 13:
    case "STATUS_FEATURE_DESERT":
      return NavigateRouteResponse_Status.STATUS_FEATURE_DESERT;
    case 14:
    case "STATUS_LOST":
      return NavigateRouteResponse_Status.STATUS_LOST;
    case 16:
    case "STATUS_NOT_LOCALIZED_TO_ROUTE":
      return NavigateRouteResponse_Status.STATUS_NOT_LOCALIZED_TO_ROUTE;
    case 19:
    case "STATUS_NOT_LOCALIZED_TO_MAP":
      return NavigateRouteResponse_Status.STATUS_NOT_LOCALIZED_TO_MAP;
    case 15:
    case "STATUS_COULD_NOT_UPDATE_ROUTE":
      return NavigateRouteResponse_Status.STATUS_COULD_NOT_UPDATE_ROUTE;
    case 17:
    case "STATUS_STUCK":
      return NavigateRouteResponse_Status.STATUS_STUCK;
    case 18:
    case "STATUS_UNRECOGNIZED_COMMAND":
      return NavigateRouteResponse_Status.STATUS_UNRECOGNIZED_COMMAND;
    case -1:
    case "UNRECOGNIZED":
    default:
      return NavigateRouteResponse_Status.UNRECOGNIZED;
  }
}

export function navigateRouteResponse_StatusToJSON(
  object: NavigateRouteResponse_Status
): string {
  switch (object) {
    case NavigateRouteResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case NavigateRouteResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case NavigateRouteResponse_Status.STATUS_NO_TIMESYNC:
      return "STATUS_NO_TIMESYNC";
    case NavigateRouteResponse_Status.STATUS_EXPIRED:
      return "STATUS_EXPIRED";
    case NavigateRouteResponse_Status.STATUS_TOO_DISTANT:
      return "STATUS_TOO_DISTANT";
    case NavigateRouteResponse_Status.STATUS_ROBOT_IMPAIRED:
      return "STATUS_ROBOT_IMPAIRED";
    case NavigateRouteResponse_Status.STATUS_RECORDING:
      return "STATUS_RECORDING";
    case NavigateRouteResponse_Status.STATUS_UNKNOWN_ROUTE_ELEMENTS:
      return "STATUS_UNKNOWN_ROUTE_ELEMENTS";
    case NavigateRouteResponse_Status.STATUS_INVALID_EDGE:
      return "STATUS_INVALID_EDGE";
    case NavigateRouteResponse_Status.STATUS_NO_PATH:
      return "STATUS_NO_PATH";
    case NavigateRouteResponse_Status.STATUS_CONSTRAINT_FAULT:
      return "STATUS_CONSTRAINT_FAULT";
    case NavigateRouteResponse_Status.STATUS_FEATURE_DESERT:
      return "STATUS_FEATURE_DESERT";
    case NavigateRouteResponse_Status.STATUS_LOST:
      return "STATUS_LOST";
    case NavigateRouteResponse_Status.STATUS_NOT_LOCALIZED_TO_ROUTE:
      return "STATUS_NOT_LOCALIZED_TO_ROUTE";
    case NavigateRouteResponse_Status.STATUS_NOT_LOCALIZED_TO_MAP:
      return "STATUS_NOT_LOCALIZED_TO_MAP";
    case NavigateRouteResponse_Status.STATUS_COULD_NOT_UPDATE_ROUTE:
      return "STATUS_COULD_NOT_UPDATE_ROUTE";
    case NavigateRouteResponse_Status.STATUS_STUCK:
      return "STATUS_STUCK";
    case NavigateRouteResponse_Status.STATUS_UNRECOGNIZED_COMMAND:
      return "STATUS_UNRECOGNIZED_COMMAND";
    case NavigateRouteResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * The NavigateToAnchorRequest can be used to command GraphNav to drive the robot to a specific
 * place in an anchoring. GraphNav will find the waypoint that has the shortest path length from
 * robot's current position but is still close to the goal. GraphNav will plan a path through the
 * map which most efficiently gets the robot to the goal waypoint, and will then travel
 * in a straight line from the destination waypoint to the offset goal, attempting to avoid
 * obstacles along the way.
 * Parameters are provided which influence how GraphNav will generate and follow the path.
 * This RPC returns immediately after the request is processed. It does not block until GraphNav
 * completes the path to the goal waypoint. The user is expected to periodically check the status
 * of the NavigateToAnchor command using the NavigationFeedbackRequest RPC.
 */
export interface NavigateToAnchorRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** The Leases to show ownership of the robot and the graph. */
  leases: Lease[];
  /**
   * The goal, expressed with respect to the seed frame of the current anchoring.
   * The robot will use the z value to find the goal waypoint, but the final z height the robot
   * achieves will depend on the terrain height at the offset from the goal.
   */
  seedTformGoal: SE3Pose | undefined;
  /**
   * These parameters control selection of the goal waypoint. In seed frame, they are the x, y,
   * and z tolerances with respect to the goal pose within which waypoints will be considered.
   * If these values are negative, or too small, reasonable defaults will be used.
   */
  goalWaypointRtSeedEwrtSeedTolerance: Vec3 | undefined;
  /** Preferences on how to pick the route. */
  routeParams: RouteGenParams | undefined;
  /** Parameters that define how to traverse and end the route. */
  travelParams: TravelParams | undefined;
  /** The timestamp (in robot time) that the navigation command is valid until. */
  endTime: Date | undefined;
  /** Identifier provided by the time sync service to verify time sync between robot and client. */
  clockIdentifier: string;
  /**
   * Unique identifier for the command. If 0, this is a new command, otherwise it is a continuation
   * of an existing command. If this is a continuation of an existing command, all parameters will be
   * ignored, and the old parameters will be preserved.
   */
  commandId: number;
}

/**
 * Response to a NavigateToAnchorRequest. This is returned immediately after the request is
 * processed. A command_id is provided to specify the ID that the user may use to poll the system
 * for feedback on the NavigateTo command.
 */
export interface NavigateToAnchorResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Results of using the various leases. */
  leaseUseResults: LeaseUseResult[];
  /** Return status for the request. */
  status: NavigateToAnchorResponse_Status;
  /** If the status is ROBOT_IMPAIRED, this is why the robot is impaired. */
  impairedState: RobotImpairedState | undefined;
  /** Unique identifier for the command, If 0, command was not accepted. */
  commandId: number;
  /** On a relevant error status code, these fields contain the waypoint/edge IDs that caused the error. */
  errorWaypointIds: string[];
}

export enum NavigateToAnchorResponse_Status {
  /** STATUS_UNKNOWN - An unknown / unexpected error occurred. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Request was accepted. */
  STATUS_OK = 1,
  /** STATUS_NO_TIMESYNC - [Time error] Client has not done timesync with robot. */
  STATUS_NO_TIMESYNC = 2,
  /** STATUS_EXPIRED - [Time error] The command was received after its end time had already passed. */
  STATUS_EXPIRED = 3,
  /** STATUS_TOO_DISTANT - [Time error]The command end time was too far in the future. */
  STATUS_TOO_DISTANT = 4,
  /**
   * STATUS_ROBOT_IMPAIRED - [Robot State Error] Cannot navigate a route if the robot has a critical
   *  perception fault, or behavior fault, or LIDAR not working.
   */
  STATUS_ROBOT_IMPAIRED = 5,
  /** STATUS_RECORDING - [Robot State Error] Cannot navigate a route while recording a map. */
  STATUS_RECORDING = 6,
  /** STATUS_NO_ANCHORING - [Route Error] There is no anchoring. */
  STATUS_NO_ANCHORING = 7,
  /**
   * STATUS_NO_PATH - [Route Error] There is no path to a waypoint near the specified goal.
   *               If any waypoints were found (but no path), the error_waypoint_ids field
   *               will be filled.
   */
  STATUS_NO_PATH = 8,
  /** STATUS_FEATURE_DESERT - [Route Error] Route contained too many waypoints with low-quality features. */
  STATUS_FEATURE_DESERT = 10,
  /** STATUS_LOST - [Route Error] Happens when you try to issue a navigate to while the robot is lost. */
  STATUS_LOST = 11,
  /** STATUS_NOT_LOCALIZED_TO_MAP - [Route Error] Happens when the current localization doesn't refer to any waypoint in the map (possibly uninitialized localization). */
  STATUS_NOT_LOCALIZED_TO_MAP = 13,
  /** STATUS_COULD_NOT_UPDATE_ROUTE - [Wrestling error] Happens when graph nav refuses to follow the route you specified. */
  STATUS_COULD_NOT_UPDATE_ROUTE = 12,
  /**
   * STATUS_STUCK - [Route Error] Happens when you try to issue a navigate to while the robot is stuck. Navigate to a different
   * waypoint, or clear the route and try again.
   */
  STATUS_STUCK = 14,
  /** STATUS_UNRECOGNIZED_COMMAND - [Request Error] Happens when you try to continue a command that was either expired, or had an unrecognized id. */
  STATUS_UNRECOGNIZED_COMMAND = 15,
  /** STATUS_INVALID_POSE - [Route Error] The pose is invalid, or known to be unachievable (upside-down, etc). */
  STATUS_INVALID_POSE = 16,
  UNRECOGNIZED = -1,
}

export function navigateToAnchorResponse_StatusFromJSON(
  object: any
): NavigateToAnchorResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return NavigateToAnchorResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return NavigateToAnchorResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_NO_TIMESYNC":
      return NavigateToAnchorResponse_Status.STATUS_NO_TIMESYNC;
    case 3:
    case "STATUS_EXPIRED":
      return NavigateToAnchorResponse_Status.STATUS_EXPIRED;
    case 4:
    case "STATUS_TOO_DISTANT":
      return NavigateToAnchorResponse_Status.STATUS_TOO_DISTANT;
    case 5:
    case "STATUS_ROBOT_IMPAIRED":
      return NavigateToAnchorResponse_Status.STATUS_ROBOT_IMPAIRED;
    case 6:
    case "STATUS_RECORDING":
      return NavigateToAnchorResponse_Status.STATUS_RECORDING;
    case 7:
    case "STATUS_NO_ANCHORING":
      return NavigateToAnchorResponse_Status.STATUS_NO_ANCHORING;
    case 8:
    case "STATUS_NO_PATH":
      return NavigateToAnchorResponse_Status.STATUS_NO_PATH;
    case 10:
    case "STATUS_FEATURE_DESERT":
      return NavigateToAnchorResponse_Status.STATUS_FEATURE_DESERT;
    case 11:
    case "STATUS_LOST":
      return NavigateToAnchorResponse_Status.STATUS_LOST;
    case 13:
    case "STATUS_NOT_LOCALIZED_TO_MAP":
      return NavigateToAnchorResponse_Status.STATUS_NOT_LOCALIZED_TO_MAP;
    case 12:
    case "STATUS_COULD_NOT_UPDATE_ROUTE":
      return NavigateToAnchorResponse_Status.STATUS_COULD_NOT_UPDATE_ROUTE;
    case 14:
    case "STATUS_STUCK":
      return NavigateToAnchorResponse_Status.STATUS_STUCK;
    case 15:
    case "STATUS_UNRECOGNIZED_COMMAND":
      return NavigateToAnchorResponse_Status.STATUS_UNRECOGNIZED_COMMAND;
    case 16:
    case "STATUS_INVALID_POSE":
      return NavigateToAnchorResponse_Status.STATUS_INVALID_POSE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return NavigateToAnchorResponse_Status.UNRECOGNIZED;
  }
}

export function navigateToAnchorResponse_StatusToJSON(
  object: NavigateToAnchorResponse_Status
): string {
  switch (object) {
    case NavigateToAnchorResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case NavigateToAnchorResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case NavigateToAnchorResponse_Status.STATUS_NO_TIMESYNC:
      return "STATUS_NO_TIMESYNC";
    case NavigateToAnchorResponse_Status.STATUS_EXPIRED:
      return "STATUS_EXPIRED";
    case NavigateToAnchorResponse_Status.STATUS_TOO_DISTANT:
      return "STATUS_TOO_DISTANT";
    case NavigateToAnchorResponse_Status.STATUS_ROBOT_IMPAIRED:
      return "STATUS_ROBOT_IMPAIRED";
    case NavigateToAnchorResponse_Status.STATUS_RECORDING:
      return "STATUS_RECORDING";
    case NavigateToAnchorResponse_Status.STATUS_NO_ANCHORING:
      return "STATUS_NO_ANCHORING";
    case NavigateToAnchorResponse_Status.STATUS_NO_PATH:
      return "STATUS_NO_PATH";
    case NavigateToAnchorResponse_Status.STATUS_FEATURE_DESERT:
      return "STATUS_FEATURE_DESERT";
    case NavigateToAnchorResponse_Status.STATUS_LOST:
      return "STATUS_LOST";
    case NavigateToAnchorResponse_Status.STATUS_NOT_LOCALIZED_TO_MAP:
      return "STATUS_NOT_LOCALIZED_TO_MAP";
    case NavigateToAnchorResponse_Status.STATUS_COULD_NOT_UPDATE_ROUTE:
      return "STATUS_COULD_NOT_UPDATE_ROUTE";
    case NavigateToAnchorResponse_Status.STATUS_STUCK:
      return "STATUS_STUCK";
    case NavigateToAnchorResponse_Status.STATUS_UNRECOGNIZED_COMMAND:
      return "STATUS_UNRECOGNIZED_COMMAND";
    case NavigateToAnchorResponse_Status.STATUS_INVALID_POSE:
      return "STATUS_INVALID_POSE";
    case NavigateToAnchorResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * The NavigationFeedback request message uses the command_id of a navigation request to get
 * the robot's progress and current status for the command. Note that all commands return immediately
 * after they are processed, and the robot will continue to execute the command asynchronously until
 * it times out or completes. New commands override old ones.
 */
export interface NavigationFeedbackRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /**
   * Unique identifier for the command, provided by nav command response.
   * Omit to get feedback on currently executing command.
   */
  commandId: number;
}

/**
 * The NavigationFeedback response message returns the robot's
 * progress and current status for the command.
 */
export interface NavigationFeedbackResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Return status for the request. */
  status: NavigationFeedbackResponse_Status;
  /** If the status is ROBOT_IMPAIRED, this is why the robot is impaired. */
  impairedState: RobotImpairedState | undefined;
  /** Remaining part of current route. */
  remainingRoute: Route | undefined;
  /** ID of the command this feedback corresponds to. */
  commandId: number;
  /** The most recent transform describing the robot's pose relative to the navigation goal. */
  lastKoTformGoal: SE3Pose | undefined;
  /** Indicates whether the robot's body is currently in motion. */
  bodyMovementStatus: SE2TrajectoryCommand_Feedback_BodyMovementStatus;
}

export enum NavigationFeedbackResponse_Status {
  /** STATUS_UNKNOWN - An unknown / unexpected error occurred. */
  STATUS_UNKNOWN = 0,
  /** STATUS_FOLLOWING_ROUTE - The robot is currently, successfully following the route. */
  STATUS_FOLLOWING_ROUTE = 1,
  /** STATUS_REACHED_GOAL - The robot has reached the final goal of the navigation request. */
  STATUS_REACHED_GOAL = 2,
  /**
   * STATUS_NO_ROUTE - There's no route currently being navigated.
   * This can happen if no command has been issued, or if the graph has been changed during
   * navigation.
   */
  STATUS_NO_ROUTE = 3,
  /** STATUS_NO_LOCALIZATION - Robot is not localized to a route. */
  STATUS_NO_LOCALIZATION = 4,
  /** STATUS_LOST - Robot appears to be lost. */
  STATUS_LOST = 5,
  /** STATUS_STUCK - Robot appears stuck against an obstacle. */
  STATUS_STUCK = 6,
  /** STATUS_COMMAND_TIMED_OUT - The command expired. */
  STATUS_COMMAND_TIMED_OUT = 7,
  /**
   * STATUS_ROBOT_IMPAIRED - Cannot navigate a route if the robot has a crtical perception fault, or behavior fault,
   * or LIDAR not working. See impared_status for details.
   */
  STATUS_ROBOT_IMPAIRED = 8,
  /** STATUS_CONSTRAINT_FAULT - The route constraints were not feasible. */
  STATUS_CONSTRAINT_FAULT = 11,
  /** STATUS_COMMAND_OVERRIDDEN - The command was replaced by a new command */
  STATUS_COMMAND_OVERRIDDEN = 12,
  /** STATUS_NOT_LOCALIZED_TO_ROUTE - The localization or route changed mid-traverse. */
  STATUS_NOT_LOCALIZED_TO_ROUTE = 13,
  /** STATUS_LEASE_ERROR - The lease is no longer valid. */
  STATUS_LEASE_ERROR = 14,
  UNRECOGNIZED = -1,
}

export function navigationFeedbackResponse_StatusFromJSON(
  object: any
): NavigationFeedbackResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return NavigationFeedbackResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_FOLLOWING_ROUTE":
      return NavigationFeedbackResponse_Status.STATUS_FOLLOWING_ROUTE;
    case 2:
    case "STATUS_REACHED_GOAL":
      return NavigationFeedbackResponse_Status.STATUS_REACHED_GOAL;
    case 3:
    case "STATUS_NO_ROUTE":
      return NavigationFeedbackResponse_Status.STATUS_NO_ROUTE;
    case 4:
    case "STATUS_NO_LOCALIZATION":
      return NavigationFeedbackResponse_Status.STATUS_NO_LOCALIZATION;
    case 5:
    case "STATUS_LOST":
      return NavigationFeedbackResponse_Status.STATUS_LOST;
    case 6:
    case "STATUS_STUCK":
      return NavigationFeedbackResponse_Status.STATUS_STUCK;
    case 7:
    case "STATUS_COMMAND_TIMED_OUT":
      return NavigationFeedbackResponse_Status.STATUS_COMMAND_TIMED_OUT;
    case 8:
    case "STATUS_ROBOT_IMPAIRED":
      return NavigationFeedbackResponse_Status.STATUS_ROBOT_IMPAIRED;
    case 11:
    case "STATUS_CONSTRAINT_FAULT":
      return NavigationFeedbackResponse_Status.STATUS_CONSTRAINT_FAULT;
    case 12:
    case "STATUS_COMMAND_OVERRIDDEN":
      return NavigationFeedbackResponse_Status.STATUS_COMMAND_OVERRIDDEN;
    case 13:
    case "STATUS_NOT_LOCALIZED_TO_ROUTE":
      return NavigationFeedbackResponse_Status.STATUS_NOT_LOCALIZED_TO_ROUTE;
    case 14:
    case "STATUS_LEASE_ERROR":
      return NavigationFeedbackResponse_Status.STATUS_LEASE_ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return NavigationFeedbackResponse_Status.UNRECOGNIZED;
  }
}

export function navigationFeedbackResponse_StatusToJSON(
  object: NavigationFeedbackResponse_Status
): string {
  switch (object) {
    case NavigationFeedbackResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case NavigationFeedbackResponse_Status.STATUS_FOLLOWING_ROUTE:
      return "STATUS_FOLLOWING_ROUTE";
    case NavigationFeedbackResponse_Status.STATUS_REACHED_GOAL:
      return "STATUS_REACHED_GOAL";
    case NavigationFeedbackResponse_Status.STATUS_NO_ROUTE:
      return "STATUS_NO_ROUTE";
    case NavigationFeedbackResponse_Status.STATUS_NO_LOCALIZATION:
      return "STATUS_NO_LOCALIZATION";
    case NavigationFeedbackResponse_Status.STATUS_LOST:
      return "STATUS_LOST";
    case NavigationFeedbackResponse_Status.STATUS_STUCK:
      return "STATUS_STUCK";
    case NavigationFeedbackResponse_Status.STATUS_COMMAND_TIMED_OUT:
      return "STATUS_COMMAND_TIMED_OUT";
    case NavigationFeedbackResponse_Status.STATUS_ROBOT_IMPAIRED:
      return "STATUS_ROBOT_IMPAIRED";
    case NavigationFeedbackResponse_Status.STATUS_CONSTRAINT_FAULT:
      return "STATUS_CONSTRAINT_FAULT";
    case NavigationFeedbackResponse_Status.STATUS_COMMAND_OVERRIDDEN:
      return "STATUS_COMMAND_OVERRIDDEN";
    case NavigationFeedbackResponse_Status.STATUS_NOT_LOCALIZED_TO_ROUTE:
      return "STATUS_NOT_LOCALIZED_TO_ROUTE";
    case NavigationFeedbackResponse_Status.STATUS_LEASE_ERROR:
      return "STATUS_LEASE_ERROR";
    case NavigationFeedbackResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * The GetLocalizationState request message requests the current localization state and any other
 * live data from the robot if desired. The localization consists of a waypoint ID and the relative
 * pose of the robot with respect to that waypoint.
 */
export interface GetLocalizationStateRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Return the localization relative to this waypoint, if specified. */
  waypointId: string;
  /**
   * If true, request the live edge-segmented point cloud that was used
   * to generate this localization.
   */
  requestLivePointCloud: boolean;
  /**
   * If true, request the live images from realsense cameras at the time of
   * localization.
   */
  requestLiveImages: boolean;
  /** If true, request the live terrain maps at the time of localization. */
  requestLiveTerrainMaps: boolean;
  /** If true, reqeuest the live world objects at the time of localization. */
  requestLiveWorldObjects: boolean;
  /** If true, requests the full live robot state at the time of localization. */
  requestLiveRobotState: boolean;
  /**
   * If true, the smallest available encoding will be used for the live point cloud
   * data. If false, three 32 bit floats will be used per point in the point cloud.
   */
  compressLivePointCloud: boolean;
}

/** Message describing the state of a remote point cloud service (such as a velodyne). */
export interface RemotePointCloudStatus {
  /** The name of the point cloud service. */
  serviceName: string;
  /**
   * Boolean indicating if the point cloud service was registered in the robot's directory with
   * the provided name.
   */
  existsInDirectory: boolean;
  /** Boolean indicating if the point cloud service is currently outputting data. */
  hasData: boolean;
}

/**
 * Message describing whether or not graph nav is lost, and if it is lost, how lost it is.
 * If robot is lost, this state can be reset by either:
 *    * Driving to an area where the robot's localization improves.
 *    * Calling SetLocalization RPC.
 */
export interface LostDetectorState {
  /**
   * Whether or not the robot is currently lost.  If this is true, graph nav will reject
   * NavigateTo or NavigateRoute RPC's.
   */
  isLost: boolean;
}

/**
 * The GetLocalizationState response message returns the current localization and robot state, as well
 * as any requested live data information.
 */
export interface GetLocalizationStateResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /**
   * Where the robot currently is. If a waypoint_id was specified in the request, this localization
   * will be relative to that waypoint.
   */
  localization: Localization | undefined;
  /** Robot kinematic state at time of localization. */
  robotKinematics: KinematicState | undefined;
  /** Status of one or more remote point cloud services (such as velodyne). */
  remoteCloudStatus: RemotePointCloudStatus[];
  /**
   * Contains live data at the time of localization, with elements only filled out
   * if requested.
   */
  liveData: WaypointSnapshot | undefined;
  /**
   * If the robot drives around without a good localization for a while, eventually
   * it becomes "lost."  I.E. it has a localization, but it no longer trusts
   * that the localization it has is accurate.  Lost detector state is
   * available through this message.
   */
  lostDetectorState: LostDetectorState | undefined;
}

/**
 * Clears the graph on the server. Also clears GraphNav's localization to the graph.
 * Note that waypoint and edge snapshots may still be cached on the server after this
 * operation. This RPC may not be used while recording a map.
 */
export interface ClearGraphRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** The Lease to show ownership of graph-nav service. */
  lease: Lease | undefined;
}

/** The results of the ClearGraphRequest. */
export interface ClearGraphResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Details about how the lease was used. */
  leaseUseResult: LeaseUseResult | undefined;
  /** Status of the ClearGraphResponse. */
  status: ClearGraphResponse_Status;
}

export enum ClearGraphResponse_Status {
  STATUS_UNKNOWN = 0,
  STATUS_OK = 1,
  /**
   * STATUS_RECORDING - Graph Nav is currently recording a map. You must call
   * StopRecording from the recording service to continue.
   */
  STATUS_RECORDING = 2,
  UNRECOGNIZED = -1,
}

export function clearGraphResponse_StatusFromJSON(
  object: any
): ClearGraphResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return ClearGraphResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return ClearGraphResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_RECORDING":
      return ClearGraphResponse_Status.STATUS_RECORDING;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ClearGraphResponse_Status.UNRECOGNIZED;
  }
}

export function clearGraphResponse_StatusToJSON(
  object: ClearGraphResponse_Status
): string {
  switch (object) {
    case ClearGraphResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case ClearGraphResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case ClearGraphResponse_Status.STATUS_RECORDING:
      return "STATUS_RECORDING";
    case ClearGraphResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Uploads a graph to the server. This graph will be appended to the graph that
 * currently exists on the server.
 */
export interface UploadGraphRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /**
   * Structure of the graph containing waypoints and edges without
   * underlying sensor data.
   */
  graph: Graph | undefined;
  /** The Lease to show ownership of graph-nav service. */
  lease: Lease | undefined;
  /** If this is true, generate an (overwrite the) anchoring on upload. */
  generateNewAnchoring: boolean;
}

/**
 * Response to the UploadGraphRequest. After uploading a graph, the user is expected
 * to upload large data at waypoints and edges (called snapshots). The response provides
 * a list of snapshot IDs which are not yet cached on the server. Snapshots with these IDs should
 * be uploaded by the client.
 */
export interface UploadGraphResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Status for an upload request. */
  status: UploadGraphResponse_Status;
  /** Details about how the lease was used. */
  leaseUseResult: LeaseUseResult | undefined;
  /** The waypoint snapshot ids for which there was cached data. */
  loadedWaypointSnapshotIds: string[];
  /** The waypoint snapshot ids for which there is no cached data. */
  unknownWaypointSnapshotIds: string[];
  /** The edge snapshot ids for which there was cached data. */
  loadedEdgeSnapshotIds: string[];
  /** The edge snapshot ids for which there was no cached data. */
  unknownEdgeSnapshotIds: string[];
  /** Large graphs can only be uploaded if the license permits them. */
  licenseStatus: LicenseInfo_Status;
  sensorStatus: SensorCompatibilityStatus | undefined;
}

export enum UploadGraphResponse_Status {
  STATUS_UNKNOWN = 0,
  STATUS_OK = 1,
  /** STATUS_MAP_TOO_LARGE_LICENSE - Can't upload the graph because it was too large for the license. */
  STATUS_MAP_TOO_LARGE_LICENSE = 3,
  /** STATUS_INVALID_GRAPH - The graph is invalid topologically, for example containing missing waypoints referenced by edges. */
  STATUS_INVALID_GRAPH = 4,
  STATUS_INCOMPATIBLE_SENSORS = 5,
  UNRECOGNIZED = -1,
}

export function uploadGraphResponse_StatusFromJSON(
  object: any
): UploadGraphResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return UploadGraphResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return UploadGraphResponse_Status.STATUS_OK;
    case 3:
    case "STATUS_MAP_TOO_LARGE_LICENSE":
      return UploadGraphResponse_Status.STATUS_MAP_TOO_LARGE_LICENSE;
    case 4:
    case "STATUS_INVALID_GRAPH":
      return UploadGraphResponse_Status.STATUS_INVALID_GRAPH;
    case 5:
    case "STATUS_INCOMPATIBLE_SENSORS":
      return UploadGraphResponse_Status.STATUS_INCOMPATIBLE_SENSORS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return UploadGraphResponse_Status.UNRECOGNIZED;
  }
}

export function uploadGraphResponse_StatusToJSON(
  object: UploadGraphResponse_Status
): string {
  switch (object) {
    case UploadGraphResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case UploadGraphResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case UploadGraphResponse_Status.STATUS_MAP_TOO_LARGE_LICENSE:
      return "STATUS_MAP_TOO_LARGE_LICENSE";
    case UploadGraphResponse_Status.STATUS_INVALID_GRAPH:
      return "STATUS_INVALID_GRAPH";
    case UploadGraphResponse_Status.STATUS_INCOMPATIBLE_SENSORS:
      return "STATUS_INCOMPATIBLE_SENSORS";
    case UploadGraphResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * The DownloadGraphRequest requests that the server send the graph (waypoints and edges)
 * to the client. Note that the returned Graph message contains only the topological
 * structure of the map, and not any large sensor data. Large sensor data should be downloaded
 * using DownloadWaypointSnapshotRequest and DownloadEdgeSnapshotRequest. Both snapshots and
 * the graph are required to exist on the server for GraphNav to localize and navigate.
 */
export interface DownloadGraphRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/** The DownloadGraph response message includes the current graph on the robot. */
export interface DownloadGraphResponse {
  /** Common request header. */
  header: ResponseHeader | undefined;
  /** The structure of the graph. */
  graph: Graph | undefined;
}

/**
 * Used to upload waypoint snapshot in chunks for a specific waypoint snapshot. Waypoint
 * snapshots consist of the large sensor data at each waypoint.
 * Chunks will be streamed one at a time to the server. Chunk streaming is required to prevent
 * overwhelming gRPC with large http requests.
 */
export interface UploadWaypointSnapshotRequest {
  /** Common response header. */
  header: RequestHeader | undefined;
  /**
   * Serialized bytes of a WaypointSnapshot message, restricted to a chunk no larger than 4MB in size.
   * To break the data into chunks, first serialize it to bytes. Then, send the bytes in order as DataChunk objects.
   * The chunks will be concatenated together on the server, and deserialized.
   */
  chunk: DataChunk | undefined;
  /** The Leases to show ownership of the graph-nav service. */
  lease: Lease | undefined;
}

/**
 * One response for the entire WaypointSnapshot after all chunks have
 * been concatenated and deserialized.
 */
export interface UploadWaypointSnapshotResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Details about how the lease was used. */
  leaseUseResult: LeaseUseResult | undefined;
  status: UploadWaypointSnapshotResponse_Status;
  sensorStatus: SensorCompatibilityStatus | undefined;
}

export enum UploadWaypointSnapshotResponse_Status {
  /** STATUS_UNKNOWN - Unset. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Success. */
  STATUS_OK = 1,
  /**
   * STATUS_INCOMPATIBLE_SENSORS - The data in this waypoint snapshot is not compatible with the
   * current configuration of the robot. Check sensor_status for
   * more details.
   */
  STATUS_INCOMPATIBLE_SENSORS = 2,
  UNRECOGNIZED = -1,
}

export function uploadWaypointSnapshotResponse_StatusFromJSON(
  object: any
): UploadWaypointSnapshotResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return UploadWaypointSnapshotResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return UploadWaypointSnapshotResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_INCOMPATIBLE_SENSORS":
      return UploadWaypointSnapshotResponse_Status.STATUS_INCOMPATIBLE_SENSORS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return UploadWaypointSnapshotResponse_Status.UNRECOGNIZED;
  }
}

export function uploadWaypointSnapshotResponse_StatusToJSON(
  object: UploadWaypointSnapshotResponse_Status
): string {
  switch (object) {
    case UploadWaypointSnapshotResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case UploadWaypointSnapshotResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case UploadWaypointSnapshotResponse_Status.STATUS_INCOMPATIBLE_SENSORS:
      return "STATUS_INCOMPATIBLE_SENSORS";
    case UploadWaypointSnapshotResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Used to upload edge data in chunks for a specific edge snapshot. Edge snapshots contain
 * large sensor data associated with each edge.
 * Chunks will be streamed one at a time to the server. Chunk streaming is required to prevent
 * overwhelming gRPC with large http requests.
 */
export interface UploadEdgeSnapshotRequest {
  /** Common response header. */
  header: RequestHeader | undefined;
  /**
   * Serialized bytes of a EdgeSnapshot message, restricted to a chunk no larger than 4MB in size.
   * To break the data into chunks, first serialize it to bytes. Then, send the bytes in order as DataChunk objects.
   * The chunks will be concatenated together on the server, and deserialized
   */
  chunk: DataChunk | undefined;
  /** The Leases to show ownership of the graph-nav service. */
  lease: Lease | undefined;
}

/**
 * One response for the entire EdgeSnapshot after all chunks have
 * been concatenated and deserialized.
 */
export interface UploadEdgeSnapshotResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Details about how the lease was used. */
  leaseUseResult: LeaseUseResult | undefined;
}

/**
 * The DownloadWaypointSnapshot request asks for a specific waypoint snapshot id to
 * be downloaded and has parameters to decrease the amount of data downloaded. After
 * recording a map, first call the DownloadGraph RPC. Then, for each waypoint snapshot id,
 * request the waypoint snapshot from the server using the DownloadWaypointSnapshot RPC.
 */
export interface DownloadWaypointSnapshotRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** ID of the snapshot associated with a waypoint. */
  waypointSnapshotId: string;
  /**
   * If true, download the full images and point clouds from
   * each camera.
   */
  downloadImages: boolean;
  /**
   * If true, the point cloud will be compressed using the smallest
   * available point cloud encoding. If false, three 32-bit floats will
   * be used per point.
   */
  compressPointCloud: boolean;
  /**
   * Skip downloading the point cloud, and only download other data such as images or world
   * objects.
   */
  doNotDownloadPointCloud: boolean;
}

/**
 * The DownloadWaypointSnapshot response streams the data of the waypoint snapshot id
 * currently being downloaded in data chunks no larger than 4MB in size. It is necessary
 * to stream these data to avoid overwhelming gRPC with large http requests.
 */
export interface DownloadWaypointSnapshotResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Return status for the request. */
  status: DownloadWaypointSnapshotResponse_Status;
  /** ID of the snapshot associated with a waypoint. */
  waypointSnapshotId: string;
  /**
   * Chunk of data to download. Responses are sent in sequence until the
   * data chunk is complete. After receiving all chunks, concatenate them
   * into a single byte string. Then, deserialize the byte string into a
   * WaypointSnapshot object.
   */
  chunk: DataChunk | undefined;
}

export enum DownloadWaypointSnapshotResponse_Status {
  STATUS_UNKNOWN = 0,
  STATUS_OK = 1,
  /** STATUS_SNAPSHOT_DOES_NOT_EXIST - Error where the given snapshot ID does not exist. */
  STATUS_SNAPSHOT_DOES_NOT_EXIST = 2,
  UNRECOGNIZED = -1,
}

export function downloadWaypointSnapshotResponse_StatusFromJSON(
  object: any
): DownloadWaypointSnapshotResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return DownloadWaypointSnapshotResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return DownloadWaypointSnapshotResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_SNAPSHOT_DOES_NOT_EXIST":
      return DownloadWaypointSnapshotResponse_Status.STATUS_SNAPSHOT_DOES_NOT_EXIST;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DownloadWaypointSnapshotResponse_Status.UNRECOGNIZED;
  }
}

export function downloadWaypointSnapshotResponse_StatusToJSON(
  object: DownloadWaypointSnapshotResponse_Status
): string {
  switch (object) {
    case DownloadWaypointSnapshotResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case DownloadWaypointSnapshotResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case DownloadWaypointSnapshotResponse_Status.STATUS_SNAPSHOT_DOES_NOT_EXIST:
      return "STATUS_SNAPSHOT_DOES_NOT_EXIST";
    case DownloadWaypointSnapshotResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * The DownloadEdgeSnapshot request asks for a specific edge snapshot id to
 * be downloaded. Edge snapshots contain the large sensor data stored in each edge.
 */
export interface DownloadEdgeSnapshotRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** ID of the data associated with an edge. */
  edgeSnapshotId: string;
}

/**
 * The DownloadEdgeSnapshot response streams the data of the edge snapshot id
 * currently being downloaded in data chunks no larger than 4MB in size. It is necessary
 * to stream these data to avoid overwhelming gRPC with large http requests.
 */
export interface DownloadEdgeSnapshotResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Return status for the request. */
  status: DownloadEdgeSnapshotResponse_Status;
  /** ID of the snapshot associated with an edge. */
  edgeSnapshotId: string;
  /**
   * Chunk of data to download. Responses are sent in sequence until the
   * data chunk is complete. After receiving all chunks, concatenate them
   * into a single byte string. Then, deserialize the byte string into an
   * EdgeSnapshot object.
   */
  chunk: DataChunk | undefined;
}

export enum DownloadEdgeSnapshotResponse_Status {
  STATUS_UNKNOWN = 0,
  STATUS_OK = 1,
  /** STATUS_SNAPSHOT_DOES_NOT_EXIST - Error where the given snapshot ID does not exist. */
  STATUS_SNAPSHOT_DOES_NOT_EXIST = 2,
  UNRECOGNIZED = -1,
}

export function downloadEdgeSnapshotResponse_StatusFromJSON(
  object: any
): DownloadEdgeSnapshotResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return DownloadEdgeSnapshotResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return DownloadEdgeSnapshotResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_SNAPSHOT_DOES_NOT_EXIST":
      return DownloadEdgeSnapshotResponse_Status.STATUS_SNAPSHOT_DOES_NOT_EXIST;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DownloadEdgeSnapshotResponse_Status.UNRECOGNIZED;
  }
}

export function downloadEdgeSnapshotResponse_StatusToJSON(
  object: DownloadEdgeSnapshotResponse_Status
): string {
  switch (object) {
    case DownloadEdgeSnapshotResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case DownloadEdgeSnapshotResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case DownloadEdgeSnapshotResponse_Status.STATUS_SNAPSHOT_DOES_NOT_EXIST:
      return "STATUS_SNAPSHOT_DOES_NOT_EXIST";
    case DownloadEdgeSnapshotResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseSetLocalizationRequest(): SetLocalizationRequest {
  return {
    header: undefined,
    initialGuess: undefined,
    koTformBody: undefined,
    maxDistance: 0,
    maxYaw: 0,
    fiducialInit: 0,
    useFiducialId: 0,
    refineFiducialResultWithIcp: false,
    doAmbiguityCheck: false,
    restrictFiducialDetectionsToTargetWaypoint: false,
  };
}

export const SetLocalizationRequest = {
  encode(
    message: SetLocalizationRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.initialGuess !== undefined) {
      Localization.encode(
        message.initialGuess,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.koTformBody !== undefined) {
      SE3Pose.encode(message.koTformBody, writer.uint32(34).fork()).ldelim();
    }
    if (message.maxDistance !== 0) {
      writer.uint32(41).double(message.maxDistance);
    }
    if (message.maxYaw !== 0) {
      writer.uint32(49).double(message.maxYaw);
    }
    if (message.fiducialInit !== 0) {
      writer.uint32(56).int32(message.fiducialInit);
    }
    if (message.useFiducialId !== 0) {
      writer.uint32(64).int32(message.useFiducialId);
    }
    if (message.refineFiducialResultWithIcp === true) {
      writer.uint32(72).bool(message.refineFiducialResultWithIcp);
    }
    if (message.doAmbiguityCheck === true) {
      writer.uint32(80).bool(message.doAmbiguityCheck);
    }
    if (message.restrictFiducialDetectionsToTargetWaypoint === true) {
      writer
        .uint32(88)
        .bool(message.restrictFiducialDetectionsToTargetWaypoint);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SetLocalizationRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetLocalizationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 3:
          message.initialGuess = Localization.decode(reader, reader.uint32());
          break;
        case 4:
          message.koTformBody = SE3Pose.decode(reader, reader.uint32());
          break;
        case 5:
          message.maxDistance = reader.double();
          break;
        case 6:
          message.maxYaw = reader.double();
          break;
        case 7:
          message.fiducialInit = reader.int32() as any;
          break;
        case 8:
          message.useFiducialId = reader.int32();
          break;
        case 9:
          message.refineFiducialResultWithIcp = reader.bool();
          break;
        case 10:
          message.doAmbiguityCheck = reader.bool();
          break;
        case 11:
          message.restrictFiducialDetectionsToTargetWaypoint = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetLocalizationRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      initialGuess: isSet(object.initialGuess)
        ? Localization.fromJSON(object.initialGuess)
        : undefined,
      koTformBody: isSet(object.koTformBody)
        ? SE3Pose.fromJSON(object.koTformBody)
        : undefined,
      maxDistance: isSet(object.maxDistance) ? Number(object.maxDistance) : 0,
      maxYaw: isSet(object.maxYaw) ? Number(object.maxYaw) : 0,
      fiducialInit: isSet(object.fiducialInit)
        ? setLocalizationRequest_FiducialInitFromJSON(object.fiducialInit)
        : 0,
      useFiducialId: isSet(object.useFiducialId)
        ? Number(object.useFiducialId)
        : 0,
      refineFiducialResultWithIcp: isSet(object.refineFiducialResultWithIcp)
        ? Boolean(object.refineFiducialResultWithIcp)
        : false,
      doAmbiguityCheck: isSet(object.doAmbiguityCheck)
        ? Boolean(object.doAmbiguityCheck)
        : false,
      restrictFiducialDetectionsToTargetWaypoint: isSet(
        object.restrictFiducialDetectionsToTargetWaypoint
      )
        ? Boolean(object.restrictFiducialDetectionsToTargetWaypoint)
        : false,
    };
  },

  toJSON(message: SetLocalizationRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.initialGuess !== undefined &&
      (obj.initialGuess = message.initialGuess
        ? Localization.toJSON(message.initialGuess)
        : undefined);
    message.koTformBody !== undefined &&
      (obj.koTformBody = message.koTformBody
        ? SE3Pose.toJSON(message.koTformBody)
        : undefined);
    message.maxDistance !== undefined &&
      (obj.maxDistance = message.maxDistance);
    message.maxYaw !== undefined && (obj.maxYaw = message.maxYaw);
    message.fiducialInit !== undefined &&
      (obj.fiducialInit = setLocalizationRequest_FiducialInitToJSON(
        message.fiducialInit
      ));
    message.useFiducialId !== undefined &&
      (obj.useFiducialId = Math.round(message.useFiducialId));
    message.refineFiducialResultWithIcp !== undefined &&
      (obj.refineFiducialResultWithIcp = message.refineFiducialResultWithIcp);
    message.doAmbiguityCheck !== undefined &&
      (obj.doAmbiguityCheck = message.doAmbiguityCheck);
    message.restrictFiducialDetectionsToTargetWaypoint !== undefined &&
      (obj.restrictFiducialDetectionsToTargetWaypoint =
        message.restrictFiducialDetectionsToTargetWaypoint);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetLocalizationRequest>, I>>(
    object: I
  ): SetLocalizationRequest {
    const message = createBaseSetLocalizationRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.initialGuess =
      object.initialGuess !== undefined && object.initialGuess !== null
        ? Localization.fromPartial(object.initialGuess)
        : undefined;
    message.koTformBody =
      object.koTformBody !== undefined && object.koTformBody !== null
        ? SE3Pose.fromPartial(object.koTformBody)
        : undefined;
    message.maxDistance = object.maxDistance ?? 0;
    message.maxYaw = object.maxYaw ?? 0;
    message.fiducialInit = object.fiducialInit ?? 0;
    message.useFiducialId = object.useFiducialId ?? 0;
    message.refineFiducialResultWithIcp =
      object.refineFiducialResultWithIcp ?? false;
    message.doAmbiguityCheck = object.doAmbiguityCheck ?? false;
    message.restrictFiducialDetectionsToTargetWaypoint =
      object.restrictFiducialDetectionsToTargetWaypoint ?? false;
    return message;
  },
};

function createBaseSensorCompatibilityStatus(): SensorCompatibilityStatus {
  return { mapHasLidarData: false, robotConfiguredForLidar: false };
}

export const SensorCompatibilityStatus = {
  encode(
    message: SensorCompatibilityStatus,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.mapHasLidarData === true) {
      writer.uint32(8).bool(message.mapHasLidarData);
    }
    if (message.robotConfiguredForLidar === true) {
      writer.uint32(16).bool(message.robotConfiguredForLidar);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SensorCompatibilityStatus {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSensorCompatibilityStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.mapHasLidarData = reader.bool();
          break;
        case 2:
          message.robotConfiguredForLidar = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SensorCompatibilityStatus {
    return {
      mapHasLidarData: isSet(object.mapHasLidarData)
        ? Boolean(object.mapHasLidarData)
        : false,
      robotConfiguredForLidar: isSet(object.robotConfiguredForLidar)
        ? Boolean(object.robotConfiguredForLidar)
        : false,
    };
  },

  toJSON(message: SensorCompatibilityStatus): unknown {
    const obj: any = {};
    message.mapHasLidarData !== undefined &&
      (obj.mapHasLidarData = message.mapHasLidarData);
    message.robotConfiguredForLidar !== undefined &&
      (obj.robotConfiguredForLidar = message.robotConfiguredForLidar);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SensorCompatibilityStatus>, I>>(
    object: I
  ): SensorCompatibilityStatus {
    const message = createBaseSensorCompatibilityStatus();
    message.mapHasLidarData = object.mapHasLidarData ?? false;
    message.robotConfiguredForLidar = object.robotConfiguredForLidar ?? false;
    return message;
  },
};

function createBaseSetLocalizationResponse(): SetLocalizationResponse {
  return {
    header: undefined,
    leaseUseResult: undefined,
    status: 0,
    errorReport: "",
    localization: undefined,
    suspectedAmbiguity: undefined,
    impairedState: undefined,
    sensorStatus: undefined,
  };
}

export const SetLocalizationResponse = {
  encode(
    message: SetLocalizationResponse,
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
    if (message.errorReport !== "") {
      writer.uint32(34).string(message.errorReport);
    }
    if (message.localization !== undefined) {
      Localization.encode(
        message.localization,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.suspectedAmbiguity !== undefined) {
      SetLocalizationResponse_SuspectedAmbiguity.encode(
        message.suspectedAmbiguity,
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.impairedState !== undefined) {
      RobotImpairedState.encode(
        message.impairedState,
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.sensorStatus !== undefined) {
      SensorCompatibilityStatus.encode(
        message.sensorStatus,
        writer.uint32(74).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SetLocalizationResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetLocalizationResponse();
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
          message.errorReport = reader.string();
          break;
        case 5:
          message.localization = Localization.decode(reader, reader.uint32());
          break;
        case 7:
          message.suspectedAmbiguity =
            SetLocalizationResponse_SuspectedAmbiguity.decode(
              reader,
              reader.uint32()
            );
          break;
        case 8:
          message.impairedState = RobotImpairedState.decode(
            reader,
            reader.uint32()
          );
          break;
        case 9:
          message.sensorStatus = SensorCompatibilityStatus.decode(
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

  fromJSON(object: any): SetLocalizationResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      leaseUseResult: isSet(object.leaseUseResult)
        ? LeaseUseResult.fromJSON(object.leaseUseResult)
        : undefined,
      status: isSet(object.status)
        ? setLocalizationResponse_StatusFromJSON(object.status)
        : 0,
      errorReport: isSet(object.errorReport) ? String(object.errorReport) : "",
      localization: isSet(object.localization)
        ? Localization.fromJSON(object.localization)
        : undefined,
      suspectedAmbiguity: isSet(object.suspectedAmbiguity)
        ? SetLocalizationResponse_SuspectedAmbiguity.fromJSON(
            object.suspectedAmbiguity
          )
        : undefined,
      impairedState: isSet(object.impairedState)
        ? RobotImpairedState.fromJSON(object.impairedState)
        : undefined,
      sensorStatus: isSet(object.sensorStatus)
        ? SensorCompatibilityStatus.fromJSON(object.sensorStatus)
        : undefined,
    };
  },

  toJSON(message: SetLocalizationResponse): unknown {
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
      (obj.status = setLocalizationResponse_StatusToJSON(message.status));
    message.errorReport !== undefined &&
      (obj.errorReport = message.errorReport);
    message.localization !== undefined &&
      (obj.localization = message.localization
        ? Localization.toJSON(message.localization)
        : undefined);
    message.suspectedAmbiguity !== undefined &&
      (obj.suspectedAmbiguity = message.suspectedAmbiguity
        ? SetLocalizationResponse_SuspectedAmbiguity.toJSON(
            message.suspectedAmbiguity
          )
        : undefined);
    message.impairedState !== undefined &&
      (obj.impairedState = message.impairedState
        ? RobotImpairedState.toJSON(message.impairedState)
        : undefined);
    message.sensorStatus !== undefined &&
      (obj.sensorStatus = message.sensorStatus
        ? SensorCompatibilityStatus.toJSON(message.sensorStatus)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetLocalizationResponse>, I>>(
    object: I
  ): SetLocalizationResponse {
    const message = createBaseSetLocalizationResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.leaseUseResult =
      object.leaseUseResult !== undefined && object.leaseUseResult !== null
        ? LeaseUseResult.fromPartial(object.leaseUseResult)
        : undefined;
    message.status = object.status ?? 0;
    message.errorReport = object.errorReport ?? "";
    message.localization =
      object.localization !== undefined && object.localization !== null
        ? Localization.fromPartial(object.localization)
        : undefined;
    message.suspectedAmbiguity =
      object.suspectedAmbiguity !== undefined &&
      object.suspectedAmbiguity !== null
        ? SetLocalizationResponse_SuspectedAmbiguity.fromPartial(
            object.suspectedAmbiguity
          )
        : undefined;
    message.impairedState =
      object.impairedState !== undefined && object.impairedState !== null
        ? RobotImpairedState.fromPartial(object.impairedState)
        : undefined;
    message.sensorStatus =
      object.sensorStatus !== undefined && object.sensorStatus !== null
        ? SensorCompatibilityStatus.fromPartial(object.sensorStatus)
        : undefined;
    return message;
  },
};

function createBaseSetLocalizationResponse_SuspectedAmbiguity(): SetLocalizationResponse_SuspectedAmbiguity {
  return { alternateRobotTformWaypoint: undefined };
}

export const SetLocalizationResponse_SuspectedAmbiguity = {
  encode(
    message: SetLocalizationResponse_SuspectedAmbiguity,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.alternateRobotTformWaypoint !== undefined) {
      SE3Pose.encode(
        message.alternateRobotTformWaypoint,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SetLocalizationResponse_SuspectedAmbiguity {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetLocalizationResponse_SuspectedAmbiguity();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.alternateRobotTformWaypoint = SE3Pose.decode(
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

  fromJSON(object: any): SetLocalizationResponse_SuspectedAmbiguity {
    return {
      alternateRobotTformWaypoint: isSet(object.alternateRobotTformWaypoint)
        ? SE3Pose.fromJSON(object.alternateRobotTformWaypoint)
        : undefined,
    };
  },

  toJSON(message: SetLocalizationResponse_SuspectedAmbiguity): unknown {
    const obj: any = {};
    message.alternateRobotTformWaypoint !== undefined &&
      (obj.alternateRobotTformWaypoint = message.alternateRobotTformWaypoint
        ? SE3Pose.toJSON(message.alternateRobotTformWaypoint)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<SetLocalizationResponse_SuspectedAmbiguity>, I>
  >(object: I): SetLocalizationResponse_SuspectedAmbiguity {
    const message = createBaseSetLocalizationResponse_SuspectedAmbiguity();
    message.alternateRobotTformWaypoint =
      object.alternateRobotTformWaypoint !== undefined &&
      object.alternateRobotTformWaypoint !== null
        ? SE3Pose.fromPartial(object.alternateRobotTformWaypoint)
        : undefined;
    return message;
  },
};

function createBaseRouteGenParams(): RouteGenParams {
  return {};
}

export const RouteGenParams = {
  encode(
    _: RouteGenParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RouteGenParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRouteGenParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): RouteGenParams {
    return {};
  },

  toJSON(_: RouteGenParams): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RouteGenParams>, I>>(
    _: I
  ): RouteGenParams {
    const message = createBaseRouteGenParams();
    return message;
  },
};

function createBaseTravelParams(): TravelParams {
  return {
    maxDistance: 0,
    maxYaw: 0,
    velocityLimit: undefined,
    ignoreFinalYaw: false,
    featureQualityTolerance: 0,
    disableDirectedExploration: false,
    disableAlternateRouteFinding: false,
  };
}

export const TravelParams = {
  encode(
    message: TravelParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.maxDistance !== 0) {
      writer.uint32(9).double(message.maxDistance);
    }
    if (message.maxYaw !== 0) {
      writer.uint32(17).double(message.maxYaw);
    }
    if (message.velocityLimit !== undefined) {
      SE2VelocityLimit.encode(
        message.velocityLimit,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.ignoreFinalYaw === true) {
      writer.uint32(32).bool(message.ignoreFinalYaw);
    }
    if (message.featureQualityTolerance !== 0) {
      writer.uint32(40).int32(message.featureQualityTolerance);
    }
    if (message.disableDirectedExploration === true) {
      writer.uint32(48).bool(message.disableDirectedExploration);
    }
    if (message.disableAlternateRouteFinding === true) {
      writer.uint32(64).bool(message.disableAlternateRouteFinding);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TravelParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTravelParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.maxDistance = reader.double();
          break;
        case 2:
          message.maxYaw = reader.double();
          break;
        case 3:
          message.velocityLimit = SE2VelocityLimit.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.ignoreFinalYaw = reader.bool();
          break;
        case 5:
          message.featureQualityTolerance = reader.int32() as any;
          break;
        case 6:
          message.disableDirectedExploration = reader.bool();
          break;
        case 8:
          message.disableAlternateRouteFinding = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TravelParams {
    return {
      maxDistance: isSet(object.maxDistance) ? Number(object.maxDistance) : 0,
      maxYaw: isSet(object.maxYaw) ? Number(object.maxYaw) : 0,
      velocityLimit: isSet(object.velocityLimit)
        ? SE2VelocityLimit.fromJSON(object.velocityLimit)
        : undefined,
      ignoreFinalYaw: isSet(object.ignoreFinalYaw)
        ? Boolean(object.ignoreFinalYaw)
        : false,
      featureQualityTolerance: isSet(object.featureQualityTolerance)
        ? travelParams_FeatureQualityToleranceFromJSON(
            object.featureQualityTolerance
          )
        : 0,
      disableDirectedExploration: isSet(object.disableDirectedExploration)
        ? Boolean(object.disableDirectedExploration)
        : false,
      disableAlternateRouteFinding: isSet(object.disableAlternateRouteFinding)
        ? Boolean(object.disableAlternateRouteFinding)
        : false,
    };
  },

  toJSON(message: TravelParams): unknown {
    const obj: any = {};
    message.maxDistance !== undefined &&
      (obj.maxDistance = message.maxDistance);
    message.maxYaw !== undefined && (obj.maxYaw = message.maxYaw);
    message.velocityLimit !== undefined &&
      (obj.velocityLimit = message.velocityLimit
        ? SE2VelocityLimit.toJSON(message.velocityLimit)
        : undefined);
    message.ignoreFinalYaw !== undefined &&
      (obj.ignoreFinalYaw = message.ignoreFinalYaw);
    message.featureQualityTolerance !== undefined &&
      (obj.featureQualityTolerance = travelParams_FeatureQualityToleranceToJSON(
        message.featureQualityTolerance
      ));
    message.disableDirectedExploration !== undefined &&
      (obj.disableDirectedExploration = message.disableDirectedExploration);
    message.disableAlternateRouteFinding !== undefined &&
      (obj.disableAlternateRouteFinding = message.disableAlternateRouteFinding);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TravelParams>, I>>(
    object: I
  ): TravelParams {
    const message = createBaseTravelParams();
    message.maxDistance = object.maxDistance ?? 0;
    message.maxYaw = object.maxYaw ?? 0;
    message.velocityLimit =
      object.velocityLimit !== undefined && object.velocityLimit !== null
        ? SE2VelocityLimit.fromPartial(object.velocityLimit)
        : undefined;
    message.ignoreFinalYaw = object.ignoreFinalYaw ?? false;
    message.featureQualityTolerance = object.featureQualityTolerance ?? 0;
    message.disableDirectedExploration =
      object.disableDirectedExploration ?? false;
    message.disableAlternateRouteFinding =
      object.disableAlternateRouteFinding ?? false;
    return message;
  },
};

function createBaseNavigateToRequest(): NavigateToRequest {
  return {
    header: undefined,
    leases: [],
    destinationWaypointId: "",
    routeParams: undefined,
    travelParams: undefined,
    endTime: undefined,
    clockIdentifier: "",
    destinationWaypointTformBodyGoal: undefined,
    commandId: 0,
  };
}

export const NavigateToRequest = {
  encode(
    message: NavigateToRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.leases) {
      Lease.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.destinationWaypointId !== "") {
      writer.uint32(26).string(message.destinationWaypointId);
    }
    if (message.routeParams !== undefined) {
      RouteGenParams.encode(
        message.routeParams,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.travelParams !== undefined) {
      TravelParams.encode(
        message.travelParams,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.endTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.endTime),
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.clockIdentifier !== "") {
      writer.uint32(58).string(message.clockIdentifier);
    }
    if (message.destinationWaypointTformBodyGoal !== undefined) {
      SE2Pose.encode(
        message.destinationWaypointTformBodyGoal,
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.commandId !== 0) {
      writer.uint32(72).uint32(message.commandId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NavigateToRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNavigateToRequest();
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
          message.destinationWaypointId = reader.string();
          break;
        case 4:
          message.routeParams = RouteGenParams.decode(reader, reader.uint32());
          break;
        case 5:
          message.travelParams = TravelParams.decode(reader, reader.uint32());
          break;
        case 6:
          message.endTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 7:
          message.clockIdentifier = reader.string();
          break;
        case 8:
          message.destinationWaypointTformBodyGoal = SE2Pose.decode(
            reader,
            reader.uint32()
          );
          break;
        case 9:
          message.commandId = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NavigateToRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      leases: Array.isArray(object?.leases)
        ? object.leases.map((e: any) => Lease.fromJSON(e))
        : [],
      destinationWaypointId: isSet(object.destinationWaypointId)
        ? String(object.destinationWaypointId)
        : "",
      routeParams: isSet(object.routeParams)
        ? RouteGenParams.fromJSON(object.routeParams)
        : undefined,
      travelParams: isSet(object.travelParams)
        ? TravelParams.fromJSON(object.travelParams)
        : undefined,
      endTime: isSet(object.endTime)
        ? fromJsonTimestamp(object.endTime)
        : undefined,
      clockIdentifier: isSet(object.clockIdentifier)
        ? String(object.clockIdentifier)
        : "",
      destinationWaypointTformBodyGoal: isSet(
        object.destinationWaypointTformBodyGoal
      )
        ? SE2Pose.fromJSON(object.destinationWaypointTformBodyGoal)
        : undefined,
      commandId: isSet(object.commandId) ? Number(object.commandId) : 0,
    };
  },

  toJSON(message: NavigateToRequest): unknown {
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
    message.destinationWaypointId !== undefined &&
      (obj.destinationWaypointId = message.destinationWaypointId);
    message.routeParams !== undefined &&
      (obj.routeParams = message.routeParams
        ? RouteGenParams.toJSON(message.routeParams)
        : undefined);
    message.travelParams !== undefined &&
      (obj.travelParams = message.travelParams
        ? TravelParams.toJSON(message.travelParams)
        : undefined);
    message.endTime !== undefined &&
      (obj.endTime = message.endTime.toISOString());
    message.clockIdentifier !== undefined &&
      (obj.clockIdentifier = message.clockIdentifier);
    message.destinationWaypointTformBodyGoal !== undefined &&
      (obj.destinationWaypointTformBodyGoal =
        message.destinationWaypointTformBodyGoal
          ? SE2Pose.toJSON(message.destinationWaypointTformBodyGoal)
          : undefined);
    message.commandId !== undefined &&
      (obj.commandId = Math.round(message.commandId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NavigateToRequest>, I>>(
    object: I
  ): NavigateToRequest {
    const message = createBaseNavigateToRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.leases = object.leases?.map((e) => Lease.fromPartial(e)) || [];
    message.destinationWaypointId = object.destinationWaypointId ?? "";
    message.routeParams =
      object.routeParams !== undefined && object.routeParams !== null
        ? RouteGenParams.fromPartial(object.routeParams)
        : undefined;
    message.travelParams =
      object.travelParams !== undefined && object.travelParams !== null
        ? TravelParams.fromPartial(object.travelParams)
        : undefined;
    message.endTime = object.endTime ?? undefined;
    message.clockIdentifier = object.clockIdentifier ?? "";
    message.destinationWaypointTformBodyGoal =
      object.destinationWaypointTformBodyGoal !== undefined &&
      object.destinationWaypointTformBodyGoal !== null
        ? SE2Pose.fromPartial(object.destinationWaypointTformBodyGoal)
        : undefined;
    message.commandId = object.commandId ?? 0;
    return message;
  },
};

function createBaseNavigateToResponse(): NavigateToResponse {
  return {
    header: undefined,
    leaseUseResults: [],
    status: 0,
    impairedState: undefined,
    commandId: 0,
    errorWaypointIds: [],
  };
}

export const NavigateToResponse = {
  encode(
    message: NavigateToResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.leaseUseResults) {
      LeaseUseResult.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(24).int32(message.status);
    }
    if (message.impairedState !== undefined) {
      RobotImpairedState.encode(
        message.impairedState,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.commandId !== 0) {
      writer.uint32(32).uint32(message.commandId);
    }
    for (const v of message.errorWaypointIds) {
      writer.uint32(42).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NavigateToResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNavigateToResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.leaseUseResults.push(
            LeaseUseResult.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.status = reader.int32() as any;
          break;
        case 6:
          message.impairedState = RobotImpairedState.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.commandId = reader.uint32();
          break;
        case 5:
          message.errorWaypointIds.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NavigateToResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      leaseUseResults: Array.isArray(object?.leaseUseResults)
        ? object.leaseUseResults.map((e: any) => LeaseUseResult.fromJSON(e))
        : [],
      status: isSet(object.status)
        ? navigateToResponse_StatusFromJSON(object.status)
        : 0,
      impairedState: isSet(object.impairedState)
        ? RobotImpairedState.fromJSON(object.impairedState)
        : undefined,
      commandId: isSet(object.commandId) ? Number(object.commandId) : 0,
      errorWaypointIds: Array.isArray(object?.errorWaypointIds)
        ? object.errorWaypointIds.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: NavigateToResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.leaseUseResults) {
      obj.leaseUseResults = message.leaseUseResults.map((e) =>
        e ? LeaseUseResult.toJSON(e) : undefined
      );
    } else {
      obj.leaseUseResults = [];
    }
    message.status !== undefined &&
      (obj.status = navigateToResponse_StatusToJSON(message.status));
    message.impairedState !== undefined &&
      (obj.impairedState = message.impairedState
        ? RobotImpairedState.toJSON(message.impairedState)
        : undefined);
    message.commandId !== undefined &&
      (obj.commandId = Math.round(message.commandId));
    if (message.errorWaypointIds) {
      obj.errorWaypointIds = message.errorWaypointIds.map((e) => e);
    } else {
      obj.errorWaypointIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NavigateToResponse>, I>>(
    object: I
  ): NavigateToResponse {
    const message = createBaseNavigateToResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.leaseUseResults =
      object.leaseUseResults?.map((e) => LeaseUseResult.fromPartial(e)) || [];
    message.status = object.status ?? 0;
    message.impairedState =
      object.impairedState !== undefined && object.impairedState !== null
        ? RobotImpairedState.fromPartial(object.impairedState)
        : undefined;
    message.commandId = object.commandId ?? 0;
    message.errorWaypointIds = object.errorWaypointIds?.map((e) => e) || [];
    return message;
  },
};

function createBaseRouteFollowingParams(): RouteFollowingParams {
  return { newCmdBehavior: 0, existingCmdBehavior: 0, routeBlockedBehavior: 0 };
}

export const RouteFollowingParams = {
  encode(
    message: RouteFollowingParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.newCmdBehavior !== 0) {
      writer.uint32(8).int32(message.newCmdBehavior);
    }
    if (message.existingCmdBehavior !== 0) {
      writer.uint32(16).int32(message.existingCmdBehavior);
    }
    if (message.routeBlockedBehavior !== 0) {
      writer.uint32(24).int32(message.routeBlockedBehavior);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RouteFollowingParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRouteFollowingParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.newCmdBehavior = reader.int32() as any;
          break;
        case 2:
          message.existingCmdBehavior = reader.int32() as any;
          break;
        case 3:
          message.routeBlockedBehavior = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RouteFollowingParams {
    return {
      newCmdBehavior: isSet(object.newCmdBehavior)
        ? routeFollowingParams_StartRouteBehaviorFromJSON(object.newCmdBehavior)
        : 0,
      existingCmdBehavior: isSet(object.existingCmdBehavior)
        ? routeFollowingParams_ResumeBehaviorFromJSON(
            object.existingCmdBehavior
          )
        : 0,
      routeBlockedBehavior: isSet(object.routeBlockedBehavior)
        ? routeFollowingParams_RouteBlockedBehaviorFromJSON(
            object.routeBlockedBehavior
          )
        : 0,
    };
  },

  toJSON(message: RouteFollowingParams): unknown {
    const obj: any = {};
    message.newCmdBehavior !== undefined &&
      (obj.newCmdBehavior = routeFollowingParams_StartRouteBehaviorToJSON(
        message.newCmdBehavior
      ));
    message.existingCmdBehavior !== undefined &&
      (obj.existingCmdBehavior = routeFollowingParams_ResumeBehaviorToJSON(
        message.existingCmdBehavior
      ));
    message.routeBlockedBehavior !== undefined &&
      (obj.routeBlockedBehavior =
        routeFollowingParams_RouteBlockedBehaviorToJSON(
          message.routeBlockedBehavior
        ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RouteFollowingParams>, I>>(
    object: I
  ): RouteFollowingParams {
    const message = createBaseRouteFollowingParams();
    message.newCmdBehavior = object.newCmdBehavior ?? 0;
    message.existingCmdBehavior = object.existingCmdBehavior ?? 0;
    message.routeBlockedBehavior = object.routeBlockedBehavior ?? 0;
    return message;
  },
};

function createBaseNavigateRouteRequest(): NavigateRouteRequest {
  return {
    header: undefined,
    leases: [],
    route: undefined,
    routeFollowParams: undefined,
    travelParams: undefined,
    endTime: undefined,
    clockIdentifier: "",
    destinationWaypointTformBodyGoal: undefined,
    commandId: 0,
  };
}

export const NavigateRouteRequest = {
  encode(
    message: NavigateRouteRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.leases) {
      Lease.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.route !== undefined) {
      Route.encode(message.route, writer.uint32(26).fork()).ldelim();
    }
    if (message.routeFollowParams !== undefined) {
      RouteFollowingParams.encode(
        message.routeFollowParams,
        writer.uint32(74).fork()
      ).ldelim();
    }
    if (message.travelParams !== undefined) {
      TravelParams.encode(
        message.travelParams,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.endTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.endTime),
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.clockIdentifier !== "") {
      writer.uint32(50).string(message.clockIdentifier);
    }
    if (message.destinationWaypointTformBodyGoal !== undefined) {
      SE2Pose.encode(
        message.destinationWaypointTformBodyGoal,
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.commandId !== 0) {
      writer.uint32(64).uint32(message.commandId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): NavigateRouteRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNavigateRouteRequest();
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
          message.route = Route.decode(reader, reader.uint32());
          break;
        case 9:
          message.routeFollowParams = RouteFollowingParams.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.travelParams = TravelParams.decode(reader, reader.uint32());
          break;
        case 5:
          message.endTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 6:
          message.clockIdentifier = reader.string();
          break;
        case 7:
          message.destinationWaypointTformBodyGoal = SE2Pose.decode(
            reader,
            reader.uint32()
          );
          break;
        case 8:
          message.commandId = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NavigateRouteRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      leases: Array.isArray(object?.leases)
        ? object.leases.map((e: any) => Lease.fromJSON(e))
        : [],
      route: isSet(object.route) ? Route.fromJSON(object.route) : undefined,
      routeFollowParams: isSet(object.routeFollowParams)
        ? RouteFollowingParams.fromJSON(object.routeFollowParams)
        : undefined,
      travelParams: isSet(object.travelParams)
        ? TravelParams.fromJSON(object.travelParams)
        : undefined,
      endTime: isSet(object.endTime)
        ? fromJsonTimestamp(object.endTime)
        : undefined,
      clockIdentifier: isSet(object.clockIdentifier)
        ? String(object.clockIdentifier)
        : "",
      destinationWaypointTformBodyGoal: isSet(
        object.destinationWaypointTformBodyGoal
      )
        ? SE2Pose.fromJSON(object.destinationWaypointTformBodyGoal)
        : undefined,
      commandId: isSet(object.commandId) ? Number(object.commandId) : 0,
    };
  },

  toJSON(message: NavigateRouteRequest): unknown {
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
    message.route !== undefined &&
      (obj.route = message.route ? Route.toJSON(message.route) : undefined);
    message.routeFollowParams !== undefined &&
      (obj.routeFollowParams = message.routeFollowParams
        ? RouteFollowingParams.toJSON(message.routeFollowParams)
        : undefined);
    message.travelParams !== undefined &&
      (obj.travelParams = message.travelParams
        ? TravelParams.toJSON(message.travelParams)
        : undefined);
    message.endTime !== undefined &&
      (obj.endTime = message.endTime.toISOString());
    message.clockIdentifier !== undefined &&
      (obj.clockIdentifier = message.clockIdentifier);
    message.destinationWaypointTformBodyGoal !== undefined &&
      (obj.destinationWaypointTformBodyGoal =
        message.destinationWaypointTformBodyGoal
          ? SE2Pose.toJSON(message.destinationWaypointTformBodyGoal)
          : undefined);
    message.commandId !== undefined &&
      (obj.commandId = Math.round(message.commandId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NavigateRouteRequest>, I>>(
    object: I
  ): NavigateRouteRequest {
    const message = createBaseNavigateRouteRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.leases = object.leases?.map((e) => Lease.fromPartial(e)) || [];
    message.route =
      object.route !== undefined && object.route !== null
        ? Route.fromPartial(object.route)
        : undefined;
    message.routeFollowParams =
      object.routeFollowParams !== undefined &&
      object.routeFollowParams !== null
        ? RouteFollowingParams.fromPartial(object.routeFollowParams)
        : undefined;
    message.travelParams =
      object.travelParams !== undefined && object.travelParams !== null
        ? TravelParams.fromPartial(object.travelParams)
        : undefined;
    message.endTime = object.endTime ?? undefined;
    message.clockIdentifier = object.clockIdentifier ?? "";
    message.destinationWaypointTformBodyGoal =
      object.destinationWaypointTformBodyGoal !== undefined &&
      object.destinationWaypointTformBodyGoal !== null
        ? SE2Pose.fromPartial(object.destinationWaypointTformBodyGoal)
        : undefined;
    message.commandId = object.commandId ?? 0;
    return message;
  },
};

function createBaseNavigateRouteResponse(): NavigateRouteResponse {
  return {
    header: undefined,
    leaseUseResults: [],
    status: 0,
    impairedState: undefined,
    commandId: 0,
    errorWaypointIds: [],
    errorEdgeIds: [],
  };
}

export const NavigateRouteResponse = {
  encode(
    message: NavigateRouteResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.leaseUseResults) {
      LeaseUseResult.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(24).int32(message.status);
    }
    if (message.impairedState !== undefined) {
      RobotImpairedState.encode(
        message.impairedState,
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.commandId !== 0) {
      writer.uint32(32).uint32(message.commandId);
    }
    for (const v of message.errorWaypointIds) {
      writer.uint32(42).string(v!);
    }
    for (const v of message.errorEdgeIds) {
      Edge_Id.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): NavigateRouteResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNavigateRouteResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.leaseUseResults.push(
            LeaseUseResult.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.status = reader.int32() as any;
          break;
        case 7:
          message.impairedState = RobotImpairedState.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.commandId = reader.uint32();
          break;
        case 5:
          message.errorWaypointIds.push(reader.string());
          break;
        case 6:
          message.errorEdgeIds.push(Edge_Id.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NavigateRouteResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      leaseUseResults: Array.isArray(object?.leaseUseResults)
        ? object.leaseUseResults.map((e: any) => LeaseUseResult.fromJSON(e))
        : [],
      status: isSet(object.status)
        ? navigateRouteResponse_StatusFromJSON(object.status)
        : 0,
      impairedState: isSet(object.impairedState)
        ? RobotImpairedState.fromJSON(object.impairedState)
        : undefined,
      commandId: isSet(object.commandId) ? Number(object.commandId) : 0,
      errorWaypointIds: Array.isArray(object?.errorWaypointIds)
        ? object.errorWaypointIds.map((e: any) => String(e))
        : [],
      errorEdgeIds: Array.isArray(object?.errorEdgeIds)
        ? object.errorEdgeIds.map((e: any) => Edge_Id.fromJSON(e))
        : [],
    };
  },

  toJSON(message: NavigateRouteResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.leaseUseResults) {
      obj.leaseUseResults = message.leaseUseResults.map((e) =>
        e ? LeaseUseResult.toJSON(e) : undefined
      );
    } else {
      obj.leaseUseResults = [];
    }
    message.status !== undefined &&
      (obj.status = navigateRouteResponse_StatusToJSON(message.status));
    message.impairedState !== undefined &&
      (obj.impairedState = message.impairedState
        ? RobotImpairedState.toJSON(message.impairedState)
        : undefined);
    message.commandId !== undefined &&
      (obj.commandId = Math.round(message.commandId));
    if (message.errorWaypointIds) {
      obj.errorWaypointIds = message.errorWaypointIds.map((e) => e);
    } else {
      obj.errorWaypointIds = [];
    }
    if (message.errorEdgeIds) {
      obj.errorEdgeIds = message.errorEdgeIds.map((e) =>
        e ? Edge_Id.toJSON(e) : undefined
      );
    } else {
      obj.errorEdgeIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NavigateRouteResponse>, I>>(
    object: I
  ): NavigateRouteResponse {
    const message = createBaseNavigateRouteResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.leaseUseResults =
      object.leaseUseResults?.map((e) => LeaseUseResult.fromPartial(e)) || [];
    message.status = object.status ?? 0;
    message.impairedState =
      object.impairedState !== undefined && object.impairedState !== null
        ? RobotImpairedState.fromPartial(object.impairedState)
        : undefined;
    message.commandId = object.commandId ?? 0;
    message.errorWaypointIds = object.errorWaypointIds?.map((e) => e) || [];
    message.errorEdgeIds =
      object.errorEdgeIds?.map((e) => Edge_Id.fromPartial(e)) || [];
    return message;
  },
};

function createBaseNavigateToAnchorRequest(): NavigateToAnchorRequest {
  return {
    header: undefined,
    leases: [],
    seedTformGoal: undefined,
    goalWaypointRtSeedEwrtSeedTolerance: undefined,
    routeParams: undefined,
    travelParams: undefined,
    endTime: undefined,
    clockIdentifier: "",
    commandId: 0,
  };
}

export const NavigateToAnchorRequest = {
  encode(
    message: NavigateToAnchorRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.leases) {
      Lease.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.seedTformGoal !== undefined) {
      SE3Pose.encode(message.seedTformGoal, writer.uint32(26).fork()).ldelim();
    }
    if (message.goalWaypointRtSeedEwrtSeedTolerance !== undefined) {
      Vec3.encode(
        message.goalWaypointRtSeedEwrtSeedTolerance,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.routeParams !== undefined) {
      RouteGenParams.encode(
        message.routeParams,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.travelParams !== undefined) {
      TravelParams.encode(
        message.travelParams,
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.endTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.endTime),
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.clockIdentifier !== "") {
      writer.uint32(74).string(message.clockIdentifier);
    }
    if (message.commandId !== 0) {
      writer.uint32(80).uint32(message.commandId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): NavigateToAnchorRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNavigateToAnchorRequest();
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
          message.seedTformGoal = SE3Pose.decode(reader, reader.uint32());
          break;
        case 4:
          message.goalWaypointRtSeedEwrtSeedTolerance = Vec3.decode(
            reader,
            reader.uint32()
          );
          break;
        case 6:
          message.routeParams = RouteGenParams.decode(reader, reader.uint32());
          break;
        case 7:
          message.travelParams = TravelParams.decode(reader, reader.uint32());
          break;
        case 8:
          message.endTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 9:
          message.clockIdentifier = reader.string();
          break;
        case 10:
          message.commandId = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NavigateToAnchorRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      leases: Array.isArray(object?.leases)
        ? object.leases.map((e: any) => Lease.fromJSON(e))
        : [],
      seedTformGoal: isSet(object.seedTformGoal)
        ? SE3Pose.fromJSON(object.seedTformGoal)
        : undefined,
      goalWaypointRtSeedEwrtSeedTolerance: isSet(
        object.goalWaypointRtSeedEwrtSeedTolerance
      )
        ? Vec3.fromJSON(object.goalWaypointRtSeedEwrtSeedTolerance)
        : undefined,
      routeParams: isSet(object.routeParams)
        ? RouteGenParams.fromJSON(object.routeParams)
        : undefined,
      travelParams: isSet(object.travelParams)
        ? TravelParams.fromJSON(object.travelParams)
        : undefined,
      endTime: isSet(object.endTime)
        ? fromJsonTimestamp(object.endTime)
        : undefined,
      clockIdentifier: isSet(object.clockIdentifier)
        ? String(object.clockIdentifier)
        : "",
      commandId: isSet(object.commandId) ? Number(object.commandId) : 0,
    };
  },

  toJSON(message: NavigateToAnchorRequest): unknown {
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
    message.seedTformGoal !== undefined &&
      (obj.seedTformGoal = message.seedTformGoal
        ? SE3Pose.toJSON(message.seedTformGoal)
        : undefined);
    message.goalWaypointRtSeedEwrtSeedTolerance !== undefined &&
      (obj.goalWaypointRtSeedEwrtSeedTolerance =
        message.goalWaypointRtSeedEwrtSeedTolerance
          ? Vec3.toJSON(message.goalWaypointRtSeedEwrtSeedTolerance)
          : undefined);
    message.routeParams !== undefined &&
      (obj.routeParams = message.routeParams
        ? RouteGenParams.toJSON(message.routeParams)
        : undefined);
    message.travelParams !== undefined &&
      (obj.travelParams = message.travelParams
        ? TravelParams.toJSON(message.travelParams)
        : undefined);
    message.endTime !== undefined &&
      (obj.endTime = message.endTime.toISOString());
    message.clockIdentifier !== undefined &&
      (obj.clockIdentifier = message.clockIdentifier);
    message.commandId !== undefined &&
      (obj.commandId = Math.round(message.commandId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NavigateToAnchorRequest>, I>>(
    object: I
  ): NavigateToAnchorRequest {
    const message = createBaseNavigateToAnchorRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.leases = object.leases?.map((e) => Lease.fromPartial(e)) || [];
    message.seedTformGoal =
      object.seedTformGoal !== undefined && object.seedTformGoal !== null
        ? SE3Pose.fromPartial(object.seedTformGoal)
        : undefined;
    message.goalWaypointRtSeedEwrtSeedTolerance =
      object.goalWaypointRtSeedEwrtSeedTolerance !== undefined &&
      object.goalWaypointRtSeedEwrtSeedTolerance !== null
        ? Vec3.fromPartial(object.goalWaypointRtSeedEwrtSeedTolerance)
        : undefined;
    message.routeParams =
      object.routeParams !== undefined && object.routeParams !== null
        ? RouteGenParams.fromPartial(object.routeParams)
        : undefined;
    message.travelParams =
      object.travelParams !== undefined && object.travelParams !== null
        ? TravelParams.fromPartial(object.travelParams)
        : undefined;
    message.endTime = object.endTime ?? undefined;
    message.clockIdentifier = object.clockIdentifier ?? "";
    message.commandId = object.commandId ?? 0;
    return message;
  },
};

function createBaseNavigateToAnchorResponse(): NavigateToAnchorResponse {
  return {
    header: undefined,
    leaseUseResults: [],
    status: 0,
    impairedState: undefined,
    commandId: 0,
    errorWaypointIds: [],
  };
}

export const NavigateToAnchorResponse = {
  encode(
    message: NavigateToAnchorResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.leaseUseResults) {
      LeaseUseResult.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(24).int32(message.status);
    }
    if (message.impairedState !== undefined) {
      RobotImpairedState.encode(
        message.impairedState,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.commandId !== 0) {
      writer.uint32(32).uint32(message.commandId);
    }
    for (const v of message.errorWaypointIds) {
      writer.uint32(42).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): NavigateToAnchorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNavigateToAnchorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.leaseUseResults.push(
            LeaseUseResult.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.status = reader.int32() as any;
          break;
        case 6:
          message.impairedState = RobotImpairedState.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.commandId = reader.uint32();
          break;
        case 5:
          message.errorWaypointIds.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NavigateToAnchorResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      leaseUseResults: Array.isArray(object?.leaseUseResults)
        ? object.leaseUseResults.map((e: any) => LeaseUseResult.fromJSON(e))
        : [],
      status: isSet(object.status)
        ? navigateToAnchorResponse_StatusFromJSON(object.status)
        : 0,
      impairedState: isSet(object.impairedState)
        ? RobotImpairedState.fromJSON(object.impairedState)
        : undefined,
      commandId: isSet(object.commandId) ? Number(object.commandId) : 0,
      errorWaypointIds: Array.isArray(object?.errorWaypointIds)
        ? object.errorWaypointIds.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: NavigateToAnchorResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.leaseUseResults) {
      obj.leaseUseResults = message.leaseUseResults.map((e) =>
        e ? LeaseUseResult.toJSON(e) : undefined
      );
    } else {
      obj.leaseUseResults = [];
    }
    message.status !== undefined &&
      (obj.status = navigateToAnchorResponse_StatusToJSON(message.status));
    message.impairedState !== undefined &&
      (obj.impairedState = message.impairedState
        ? RobotImpairedState.toJSON(message.impairedState)
        : undefined);
    message.commandId !== undefined &&
      (obj.commandId = Math.round(message.commandId));
    if (message.errorWaypointIds) {
      obj.errorWaypointIds = message.errorWaypointIds.map((e) => e);
    } else {
      obj.errorWaypointIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NavigateToAnchorResponse>, I>>(
    object: I
  ): NavigateToAnchorResponse {
    const message = createBaseNavigateToAnchorResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.leaseUseResults =
      object.leaseUseResults?.map((e) => LeaseUseResult.fromPartial(e)) || [];
    message.status = object.status ?? 0;
    message.impairedState =
      object.impairedState !== undefined && object.impairedState !== null
        ? RobotImpairedState.fromPartial(object.impairedState)
        : undefined;
    message.commandId = object.commandId ?? 0;
    message.errorWaypointIds = object.errorWaypointIds?.map((e) => e) || [];
    return message;
  },
};

function createBaseNavigationFeedbackRequest(): NavigationFeedbackRequest {
  return { header: undefined, commandId: 0 };
}

export const NavigationFeedbackRequest = {
  encode(
    message: NavigationFeedbackRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.commandId !== 0) {
      writer.uint32(16).uint32(message.commandId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): NavigationFeedbackRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNavigationFeedbackRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.commandId = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NavigationFeedbackRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      commandId: isSet(object.commandId) ? Number(object.commandId) : 0,
    };
  },

  toJSON(message: NavigationFeedbackRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.commandId !== undefined &&
      (obj.commandId = Math.round(message.commandId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NavigationFeedbackRequest>, I>>(
    object: I
  ): NavigationFeedbackRequest {
    const message = createBaseNavigationFeedbackRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.commandId = object.commandId ?? 0;
    return message;
  },
};

function createBaseNavigationFeedbackResponse(): NavigationFeedbackResponse {
  return {
    header: undefined,
    status: 0,
    impairedState: undefined,
    remainingRoute: undefined,
    commandId: 0,
    lastKoTformGoal: undefined,
    bodyMovementStatus: 0,
  };
}

export const NavigationFeedbackResponse = {
  encode(
    message: NavigationFeedbackResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.impairedState !== undefined) {
      RobotImpairedState.encode(
        message.impairedState,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.remainingRoute !== undefined) {
      Route.encode(message.remainingRoute, writer.uint32(26).fork()).ldelim();
    }
    if (message.commandId !== 0) {
      writer.uint32(32).uint32(message.commandId);
    }
    if (message.lastKoTformGoal !== undefined) {
      SE3Pose.encode(
        message.lastKoTformGoal,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.bodyMovementStatus !== 0) {
      writer.uint32(56).int32(message.bodyMovementStatus);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): NavigationFeedbackResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNavigationFeedbackResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        case 6:
          message.impairedState = RobotImpairedState.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.remainingRoute = Route.decode(reader, reader.uint32());
          break;
        case 4:
          message.commandId = reader.uint32();
          break;
        case 5:
          message.lastKoTformGoal = SE3Pose.decode(reader, reader.uint32());
          break;
        case 7:
          message.bodyMovementStatus = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NavigationFeedbackResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? navigationFeedbackResponse_StatusFromJSON(object.status)
        : 0,
      impairedState: isSet(object.impairedState)
        ? RobotImpairedState.fromJSON(object.impairedState)
        : undefined,
      remainingRoute: isSet(object.remainingRoute)
        ? Route.fromJSON(object.remainingRoute)
        : undefined,
      commandId: isSet(object.commandId) ? Number(object.commandId) : 0,
      lastKoTformGoal: isSet(object.lastKoTformGoal)
        ? SE3Pose.fromJSON(object.lastKoTformGoal)
        : undefined,
      bodyMovementStatus: isSet(object.bodyMovementStatus)
        ? sE2TrajectoryCommand_Feedback_BodyMovementStatusFromJSON(
            object.bodyMovementStatus
          )
        : 0,
    };
  },

  toJSON(message: NavigationFeedbackResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = navigationFeedbackResponse_StatusToJSON(message.status));
    message.impairedState !== undefined &&
      (obj.impairedState = message.impairedState
        ? RobotImpairedState.toJSON(message.impairedState)
        : undefined);
    message.remainingRoute !== undefined &&
      (obj.remainingRoute = message.remainingRoute
        ? Route.toJSON(message.remainingRoute)
        : undefined);
    message.commandId !== undefined &&
      (obj.commandId = Math.round(message.commandId));
    message.lastKoTformGoal !== undefined &&
      (obj.lastKoTformGoal = message.lastKoTformGoal
        ? SE3Pose.toJSON(message.lastKoTformGoal)
        : undefined);
    message.bodyMovementStatus !== undefined &&
      (obj.bodyMovementStatus =
        sE2TrajectoryCommand_Feedback_BodyMovementStatusToJSON(
          message.bodyMovementStatus
        ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NavigationFeedbackResponse>, I>>(
    object: I
  ): NavigationFeedbackResponse {
    const message = createBaseNavigationFeedbackResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    message.impairedState =
      object.impairedState !== undefined && object.impairedState !== null
        ? RobotImpairedState.fromPartial(object.impairedState)
        : undefined;
    message.remainingRoute =
      object.remainingRoute !== undefined && object.remainingRoute !== null
        ? Route.fromPartial(object.remainingRoute)
        : undefined;
    message.commandId = object.commandId ?? 0;
    message.lastKoTformGoal =
      object.lastKoTformGoal !== undefined && object.lastKoTformGoal !== null
        ? SE3Pose.fromPartial(object.lastKoTformGoal)
        : undefined;
    message.bodyMovementStatus = object.bodyMovementStatus ?? 0;
    return message;
  },
};

function createBaseGetLocalizationStateRequest(): GetLocalizationStateRequest {
  return {
    header: undefined,
    waypointId: "",
    requestLivePointCloud: false,
    requestLiveImages: false,
    requestLiveTerrainMaps: false,
    requestLiveWorldObjects: false,
    requestLiveRobotState: false,
    compressLivePointCloud: false,
  };
}

export const GetLocalizationStateRequest = {
  encode(
    message: GetLocalizationStateRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.waypointId !== "") {
      writer.uint32(66).string(message.waypointId);
    }
    if (message.requestLivePointCloud === true) {
      writer.uint32(16).bool(message.requestLivePointCloud);
    }
    if (message.requestLiveImages === true) {
      writer.uint32(24).bool(message.requestLiveImages);
    }
    if (message.requestLiveTerrainMaps === true) {
      writer.uint32(32).bool(message.requestLiveTerrainMaps);
    }
    if (message.requestLiveWorldObjects === true) {
      writer.uint32(40).bool(message.requestLiveWorldObjects);
    }
    if (message.requestLiveRobotState === true) {
      writer.uint32(48).bool(message.requestLiveRobotState);
    }
    if (message.compressLivePointCloud === true) {
      writer.uint32(56).bool(message.compressLivePointCloud);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetLocalizationStateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLocalizationStateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 8:
          message.waypointId = reader.string();
          break;
        case 2:
          message.requestLivePointCloud = reader.bool();
          break;
        case 3:
          message.requestLiveImages = reader.bool();
          break;
        case 4:
          message.requestLiveTerrainMaps = reader.bool();
          break;
        case 5:
          message.requestLiveWorldObjects = reader.bool();
          break;
        case 6:
          message.requestLiveRobotState = reader.bool();
          break;
        case 7:
          message.compressLivePointCloud = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetLocalizationStateRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      waypointId: isSet(object.waypointId) ? String(object.waypointId) : "",
      requestLivePointCloud: isSet(object.requestLivePointCloud)
        ? Boolean(object.requestLivePointCloud)
        : false,
      requestLiveImages: isSet(object.requestLiveImages)
        ? Boolean(object.requestLiveImages)
        : false,
      requestLiveTerrainMaps: isSet(object.requestLiveTerrainMaps)
        ? Boolean(object.requestLiveTerrainMaps)
        : false,
      requestLiveWorldObjects: isSet(object.requestLiveWorldObjects)
        ? Boolean(object.requestLiveWorldObjects)
        : false,
      requestLiveRobotState: isSet(object.requestLiveRobotState)
        ? Boolean(object.requestLiveRobotState)
        : false,
      compressLivePointCloud: isSet(object.compressLivePointCloud)
        ? Boolean(object.compressLivePointCloud)
        : false,
    };
  },

  toJSON(message: GetLocalizationStateRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.waypointId !== undefined && (obj.waypointId = message.waypointId);
    message.requestLivePointCloud !== undefined &&
      (obj.requestLivePointCloud = message.requestLivePointCloud);
    message.requestLiveImages !== undefined &&
      (obj.requestLiveImages = message.requestLiveImages);
    message.requestLiveTerrainMaps !== undefined &&
      (obj.requestLiveTerrainMaps = message.requestLiveTerrainMaps);
    message.requestLiveWorldObjects !== undefined &&
      (obj.requestLiveWorldObjects = message.requestLiveWorldObjects);
    message.requestLiveRobotState !== undefined &&
      (obj.requestLiveRobotState = message.requestLiveRobotState);
    message.compressLivePointCloud !== undefined &&
      (obj.compressLivePointCloud = message.compressLivePointCloud);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetLocalizationStateRequest>, I>>(
    object: I
  ): GetLocalizationStateRequest {
    const message = createBaseGetLocalizationStateRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.waypointId = object.waypointId ?? "";
    message.requestLivePointCloud = object.requestLivePointCloud ?? false;
    message.requestLiveImages = object.requestLiveImages ?? false;
    message.requestLiveTerrainMaps = object.requestLiveTerrainMaps ?? false;
    message.requestLiveWorldObjects = object.requestLiveWorldObjects ?? false;
    message.requestLiveRobotState = object.requestLiveRobotState ?? false;
    message.compressLivePointCloud = object.compressLivePointCloud ?? false;
    return message;
  },
};

function createBaseRemotePointCloudStatus(): RemotePointCloudStatus {
  return { serviceName: "", existsInDirectory: false, hasData: false };
}

export const RemotePointCloudStatus = {
  encode(
    message: RemotePointCloudStatus,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.serviceName !== "") {
      writer.uint32(10).string(message.serviceName);
    }
    if (message.existsInDirectory === true) {
      writer.uint32(16).bool(message.existsInDirectory);
    }
    if (message.hasData === true) {
      writer.uint32(24).bool(message.hasData);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RemotePointCloudStatus {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemotePointCloudStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serviceName = reader.string();
          break;
        case 2:
          message.existsInDirectory = reader.bool();
          break;
        case 3:
          message.hasData = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RemotePointCloudStatus {
    return {
      serviceName: isSet(object.serviceName) ? String(object.serviceName) : "",
      existsInDirectory: isSet(object.existsInDirectory)
        ? Boolean(object.existsInDirectory)
        : false,
      hasData: isSet(object.hasData) ? Boolean(object.hasData) : false,
    };
  },

  toJSON(message: RemotePointCloudStatus): unknown {
    const obj: any = {};
    message.serviceName !== undefined &&
      (obj.serviceName = message.serviceName);
    message.existsInDirectory !== undefined &&
      (obj.existsInDirectory = message.existsInDirectory);
    message.hasData !== undefined && (obj.hasData = message.hasData);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RemotePointCloudStatus>, I>>(
    object: I
  ): RemotePointCloudStatus {
    const message = createBaseRemotePointCloudStatus();
    message.serviceName = object.serviceName ?? "";
    message.existsInDirectory = object.existsInDirectory ?? false;
    message.hasData = object.hasData ?? false;
    return message;
  },
};

function createBaseLostDetectorState(): LostDetectorState {
  return { isLost: false };
}

export const LostDetectorState = {
  encode(
    message: LostDetectorState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.isLost === true) {
      writer.uint32(8).bool(message.isLost);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LostDetectorState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLostDetectorState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.isLost = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LostDetectorState {
    return {
      isLost: isSet(object.isLost) ? Boolean(object.isLost) : false,
    };
  },

  toJSON(message: LostDetectorState): unknown {
    const obj: any = {};
    message.isLost !== undefined && (obj.isLost = message.isLost);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LostDetectorState>, I>>(
    object: I
  ): LostDetectorState {
    const message = createBaseLostDetectorState();
    message.isLost = object.isLost ?? false;
    return message;
  },
};

function createBaseGetLocalizationStateResponse(): GetLocalizationStateResponse {
  return {
    header: undefined,
    localization: undefined,
    robotKinematics: undefined,
    remoteCloudStatus: [],
    liveData: undefined,
    lostDetectorState: undefined,
  };
}

export const GetLocalizationStateResponse = {
  encode(
    message: GetLocalizationStateResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.localization !== undefined) {
      Localization.encode(
        message.localization,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.robotKinematics !== undefined) {
      KinematicState.encode(
        message.robotKinematics,
        writer.uint32(34).fork()
      ).ldelim();
    }
    for (const v of message.remoteCloudStatus) {
      RemotePointCloudStatus.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.liveData !== undefined) {
      WaypointSnapshot.encode(
        message.liveData,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.lostDetectorState !== undefined) {
      LostDetectorState.encode(
        message.lostDetectorState,
        writer.uint32(58).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetLocalizationStateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLocalizationStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.localization = Localization.decode(reader, reader.uint32());
          break;
        case 4:
          message.robotKinematics = KinematicState.decode(
            reader,
            reader.uint32()
          );
          break;
        case 5:
          message.remoteCloudStatus.push(
            RemotePointCloudStatus.decode(reader, reader.uint32())
          );
          break;
        case 6:
          message.liveData = WaypointSnapshot.decode(reader, reader.uint32());
          break;
        case 7:
          message.lostDetectorState = LostDetectorState.decode(
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

  fromJSON(object: any): GetLocalizationStateResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      localization: isSet(object.localization)
        ? Localization.fromJSON(object.localization)
        : undefined,
      robotKinematics: isSet(object.robotKinematics)
        ? KinematicState.fromJSON(object.robotKinematics)
        : undefined,
      remoteCloudStatus: Array.isArray(object?.remoteCloudStatus)
        ? object.remoteCloudStatus.map((e: any) =>
            RemotePointCloudStatus.fromJSON(e)
          )
        : [],
      liveData: isSet(object.liveData)
        ? WaypointSnapshot.fromJSON(object.liveData)
        : undefined,
      lostDetectorState: isSet(object.lostDetectorState)
        ? LostDetectorState.fromJSON(object.lostDetectorState)
        : undefined,
    };
  },

  toJSON(message: GetLocalizationStateResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.localization !== undefined &&
      (obj.localization = message.localization
        ? Localization.toJSON(message.localization)
        : undefined);
    message.robotKinematics !== undefined &&
      (obj.robotKinematics = message.robotKinematics
        ? KinematicState.toJSON(message.robotKinematics)
        : undefined);
    if (message.remoteCloudStatus) {
      obj.remoteCloudStatus = message.remoteCloudStatus.map((e) =>
        e ? RemotePointCloudStatus.toJSON(e) : undefined
      );
    } else {
      obj.remoteCloudStatus = [];
    }
    message.liveData !== undefined &&
      (obj.liveData = message.liveData
        ? WaypointSnapshot.toJSON(message.liveData)
        : undefined);
    message.lostDetectorState !== undefined &&
      (obj.lostDetectorState = message.lostDetectorState
        ? LostDetectorState.toJSON(message.lostDetectorState)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetLocalizationStateResponse>, I>>(
    object: I
  ): GetLocalizationStateResponse {
    const message = createBaseGetLocalizationStateResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.localization =
      object.localization !== undefined && object.localization !== null
        ? Localization.fromPartial(object.localization)
        : undefined;
    message.robotKinematics =
      object.robotKinematics !== undefined && object.robotKinematics !== null
        ? KinematicState.fromPartial(object.robotKinematics)
        : undefined;
    message.remoteCloudStatus =
      object.remoteCloudStatus?.map((e) =>
        RemotePointCloudStatus.fromPartial(e)
      ) || [];
    message.liveData =
      object.liveData !== undefined && object.liveData !== null
        ? WaypointSnapshot.fromPartial(object.liveData)
        : undefined;
    message.lostDetectorState =
      object.lostDetectorState !== undefined &&
      object.lostDetectorState !== null
        ? LostDetectorState.fromPartial(object.lostDetectorState)
        : undefined;
    return message;
  },
};

function createBaseClearGraphRequest(): ClearGraphRequest {
  return { header: undefined, lease: undefined };
}

export const ClearGraphRequest = {
  encode(
    message: ClearGraphRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.lease !== undefined) {
      Lease.encode(message.lease, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClearGraphRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClearGraphRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.lease = Lease.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClearGraphRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      lease: isSet(object.lease) ? Lease.fromJSON(object.lease) : undefined,
    };
  },

  toJSON(message: ClearGraphRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.lease !== undefined &&
      (obj.lease = message.lease ? Lease.toJSON(message.lease) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ClearGraphRequest>, I>>(
    object: I
  ): ClearGraphRequest {
    const message = createBaseClearGraphRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.lease =
      object.lease !== undefined && object.lease !== null
        ? Lease.fromPartial(object.lease)
        : undefined;
    return message;
  },
};

function createBaseClearGraphResponse(): ClearGraphResponse {
  return { header: undefined, leaseUseResult: undefined, status: 0 };
}

export const ClearGraphResponse = {
  encode(
    message: ClearGraphResponse,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ClearGraphResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClearGraphResponse();
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

  fromJSON(object: any): ClearGraphResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      leaseUseResult: isSet(object.leaseUseResult)
        ? LeaseUseResult.fromJSON(object.leaseUseResult)
        : undefined,
      status: isSet(object.status)
        ? clearGraphResponse_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: ClearGraphResponse): unknown {
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
      (obj.status = clearGraphResponse_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ClearGraphResponse>, I>>(
    object: I
  ): ClearGraphResponse {
    const message = createBaseClearGraphResponse();
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

function createBaseUploadGraphRequest(): UploadGraphRequest {
  return {
    header: undefined,
    graph: undefined,
    lease: undefined,
    generateNewAnchoring: false,
  };
}

export const UploadGraphRequest = {
  encode(
    message: UploadGraphRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.graph !== undefined) {
      Graph.encode(message.graph, writer.uint32(18).fork()).ldelim();
    }
    if (message.lease !== undefined) {
      Lease.encode(message.lease, writer.uint32(26).fork()).ldelim();
    }
    if (message.generateNewAnchoring === true) {
      writer.uint32(32).bool(message.generateNewAnchoring);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UploadGraphRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUploadGraphRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.graph = Graph.decode(reader, reader.uint32());
          break;
        case 3:
          message.lease = Lease.decode(reader, reader.uint32());
          break;
        case 4:
          message.generateNewAnchoring = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UploadGraphRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      graph: isSet(object.graph) ? Graph.fromJSON(object.graph) : undefined,
      lease: isSet(object.lease) ? Lease.fromJSON(object.lease) : undefined,
      generateNewAnchoring: isSet(object.generateNewAnchoring)
        ? Boolean(object.generateNewAnchoring)
        : false,
    };
  },

  toJSON(message: UploadGraphRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.graph !== undefined &&
      (obj.graph = message.graph ? Graph.toJSON(message.graph) : undefined);
    message.lease !== undefined &&
      (obj.lease = message.lease ? Lease.toJSON(message.lease) : undefined);
    message.generateNewAnchoring !== undefined &&
      (obj.generateNewAnchoring = message.generateNewAnchoring);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UploadGraphRequest>, I>>(
    object: I
  ): UploadGraphRequest {
    const message = createBaseUploadGraphRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.graph =
      object.graph !== undefined && object.graph !== null
        ? Graph.fromPartial(object.graph)
        : undefined;
    message.lease =
      object.lease !== undefined && object.lease !== null
        ? Lease.fromPartial(object.lease)
        : undefined;
    message.generateNewAnchoring = object.generateNewAnchoring ?? false;
    return message;
  },
};

function createBaseUploadGraphResponse(): UploadGraphResponse {
  return {
    header: undefined,
    status: 0,
    leaseUseResult: undefined,
    loadedWaypointSnapshotIds: [],
    unknownWaypointSnapshotIds: [],
    loadedEdgeSnapshotIds: [],
    unknownEdgeSnapshotIds: [],
    licenseStatus: 0,
    sensorStatus: undefined,
  };
}

export const UploadGraphResponse = {
  encode(
    message: UploadGraphResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(64).int32(message.status);
    }
    if (message.leaseUseResult !== undefined) {
      LeaseUseResult.encode(
        message.leaseUseResult,
        writer.uint32(18).fork()
      ).ldelim();
    }
    for (const v of message.loadedWaypointSnapshotIds) {
      writer.uint32(26).string(v!);
    }
    for (const v of message.unknownWaypointSnapshotIds) {
      writer.uint32(34).string(v!);
    }
    for (const v of message.loadedEdgeSnapshotIds) {
      writer.uint32(42).string(v!);
    }
    for (const v of message.unknownEdgeSnapshotIds) {
      writer.uint32(50).string(v!);
    }
    if (message.licenseStatus !== 0) {
      writer.uint32(56).int32(message.licenseStatus);
    }
    if (message.sensorStatus !== undefined) {
      SensorCompatibilityStatus.encode(
        message.sensorStatus,
        writer.uint32(74).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UploadGraphResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUploadGraphResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 8:
          message.status = reader.int32() as any;
          break;
        case 2:
          message.leaseUseResult = LeaseUseResult.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.loadedWaypointSnapshotIds.push(reader.string());
          break;
        case 4:
          message.unknownWaypointSnapshotIds.push(reader.string());
          break;
        case 5:
          message.loadedEdgeSnapshotIds.push(reader.string());
          break;
        case 6:
          message.unknownEdgeSnapshotIds.push(reader.string());
          break;
        case 7:
          message.licenseStatus = reader.int32() as any;
          break;
        case 9:
          message.sensorStatus = SensorCompatibilityStatus.decode(
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

  fromJSON(object: any): UploadGraphResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? uploadGraphResponse_StatusFromJSON(object.status)
        : 0,
      leaseUseResult: isSet(object.leaseUseResult)
        ? LeaseUseResult.fromJSON(object.leaseUseResult)
        : undefined,
      loadedWaypointSnapshotIds: Array.isArray(
        object?.loadedWaypointSnapshotIds
      )
        ? object.loadedWaypointSnapshotIds.map((e: any) => String(e))
        : [],
      unknownWaypointSnapshotIds: Array.isArray(
        object?.unknownWaypointSnapshotIds
      )
        ? object.unknownWaypointSnapshotIds.map((e: any) => String(e))
        : [],
      loadedEdgeSnapshotIds: Array.isArray(object?.loadedEdgeSnapshotIds)
        ? object.loadedEdgeSnapshotIds.map((e: any) => String(e))
        : [],
      unknownEdgeSnapshotIds: Array.isArray(object?.unknownEdgeSnapshotIds)
        ? object.unknownEdgeSnapshotIds.map((e: any) => String(e))
        : [],
      licenseStatus: isSet(object.licenseStatus)
        ? licenseInfo_StatusFromJSON(object.licenseStatus)
        : 0,
      sensorStatus: isSet(object.sensorStatus)
        ? SensorCompatibilityStatus.fromJSON(object.sensorStatus)
        : undefined,
    };
  },

  toJSON(message: UploadGraphResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = uploadGraphResponse_StatusToJSON(message.status));
    message.leaseUseResult !== undefined &&
      (obj.leaseUseResult = message.leaseUseResult
        ? LeaseUseResult.toJSON(message.leaseUseResult)
        : undefined);
    if (message.loadedWaypointSnapshotIds) {
      obj.loadedWaypointSnapshotIds = message.loadedWaypointSnapshotIds.map(
        (e) => e
      );
    } else {
      obj.loadedWaypointSnapshotIds = [];
    }
    if (message.unknownWaypointSnapshotIds) {
      obj.unknownWaypointSnapshotIds = message.unknownWaypointSnapshotIds.map(
        (e) => e
      );
    } else {
      obj.unknownWaypointSnapshotIds = [];
    }
    if (message.loadedEdgeSnapshotIds) {
      obj.loadedEdgeSnapshotIds = message.loadedEdgeSnapshotIds.map((e) => e);
    } else {
      obj.loadedEdgeSnapshotIds = [];
    }
    if (message.unknownEdgeSnapshotIds) {
      obj.unknownEdgeSnapshotIds = message.unknownEdgeSnapshotIds.map((e) => e);
    } else {
      obj.unknownEdgeSnapshotIds = [];
    }
    message.licenseStatus !== undefined &&
      (obj.licenseStatus = licenseInfo_StatusToJSON(message.licenseStatus));
    message.sensorStatus !== undefined &&
      (obj.sensorStatus = message.sensorStatus
        ? SensorCompatibilityStatus.toJSON(message.sensorStatus)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UploadGraphResponse>, I>>(
    object: I
  ): UploadGraphResponse {
    const message = createBaseUploadGraphResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    message.leaseUseResult =
      object.leaseUseResult !== undefined && object.leaseUseResult !== null
        ? LeaseUseResult.fromPartial(object.leaseUseResult)
        : undefined;
    message.loadedWaypointSnapshotIds =
      object.loadedWaypointSnapshotIds?.map((e) => e) || [];
    message.unknownWaypointSnapshotIds =
      object.unknownWaypointSnapshotIds?.map((e) => e) || [];
    message.loadedEdgeSnapshotIds =
      object.loadedEdgeSnapshotIds?.map((e) => e) || [];
    message.unknownEdgeSnapshotIds =
      object.unknownEdgeSnapshotIds?.map((e) => e) || [];
    message.licenseStatus = object.licenseStatus ?? 0;
    message.sensorStatus =
      object.sensorStatus !== undefined && object.sensorStatus !== null
        ? SensorCompatibilityStatus.fromPartial(object.sensorStatus)
        : undefined;
    return message;
  },
};

function createBaseDownloadGraphRequest(): DownloadGraphRequest {
  return { header: undefined };
}

export const DownloadGraphRequest = {
  encode(
    message: DownloadGraphRequest,
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
  ): DownloadGraphRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDownloadGraphRequest();
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

  fromJSON(object: any): DownloadGraphRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: DownloadGraphRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DownloadGraphRequest>, I>>(
    object: I
  ): DownloadGraphRequest {
    const message = createBaseDownloadGraphRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseDownloadGraphResponse(): DownloadGraphResponse {
  return { header: undefined, graph: undefined };
}

export const DownloadGraphResponse = {
  encode(
    message: DownloadGraphResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.graph !== undefined) {
      Graph.encode(message.graph, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DownloadGraphResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDownloadGraphResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.graph = Graph.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DownloadGraphResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      graph: isSet(object.graph) ? Graph.fromJSON(object.graph) : undefined,
    };
  },

  toJSON(message: DownloadGraphResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.graph !== undefined &&
      (obj.graph = message.graph ? Graph.toJSON(message.graph) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DownloadGraphResponse>, I>>(
    object: I
  ): DownloadGraphResponse {
    const message = createBaseDownloadGraphResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.graph =
      object.graph !== undefined && object.graph !== null
        ? Graph.fromPartial(object.graph)
        : undefined;
    return message;
  },
};

function createBaseUploadWaypointSnapshotRequest(): UploadWaypointSnapshotRequest {
  return { header: undefined, chunk: undefined, lease: undefined };
}

export const UploadWaypointSnapshotRequest = {
  encode(
    message: UploadWaypointSnapshotRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.chunk !== undefined) {
      DataChunk.encode(message.chunk, writer.uint32(26).fork()).ldelim();
    }
    if (message.lease !== undefined) {
      Lease.encode(message.lease, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UploadWaypointSnapshotRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUploadWaypointSnapshotRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 3:
          message.chunk = DataChunk.decode(reader, reader.uint32());
          break;
        case 4:
          message.lease = Lease.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UploadWaypointSnapshotRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      chunk: isSet(object.chunk) ? DataChunk.fromJSON(object.chunk) : undefined,
      lease: isSet(object.lease) ? Lease.fromJSON(object.lease) : undefined,
    };
  },

  toJSON(message: UploadWaypointSnapshotRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.chunk !== undefined &&
      (obj.chunk = message.chunk ? DataChunk.toJSON(message.chunk) : undefined);
    message.lease !== undefined &&
      (obj.lease = message.lease ? Lease.toJSON(message.lease) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UploadWaypointSnapshotRequest>, I>>(
    object: I
  ): UploadWaypointSnapshotRequest {
    const message = createBaseUploadWaypointSnapshotRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.chunk =
      object.chunk !== undefined && object.chunk !== null
        ? DataChunk.fromPartial(object.chunk)
        : undefined;
    message.lease =
      object.lease !== undefined && object.lease !== null
        ? Lease.fromPartial(object.lease)
        : undefined;
    return message;
  },
};

function createBaseUploadWaypointSnapshotResponse(): UploadWaypointSnapshotResponse {
  return {
    header: undefined,
    leaseUseResult: undefined,
    status: 0,
    sensorStatus: undefined,
  };
}

export const UploadWaypointSnapshotResponse = {
  encode(
    message: UploadWaypointSnapshotResponse,
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
    if (message.sensorStatus !== undefined) {
      SensorCompatibilityStatus.encode(
        message.sensorStatus,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UploadWaypointSnapshotResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUploadWaypointSnapshotResponse();
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
          message.sensorStatus = SensorCompatibilityStatus.decode(
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

  fromJSON(object: any): UploadWaypointSnapshotResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      leaseUseResult: isSet(object.leaseUseResult)
        ? LeaseUseResult.fromJSON(object.leaseUseResult)
        : undefined,
      status: isSet(object.status)
        ? uploadWaypointSnapshotResponse_StatusFromJSON(object.status)
        : 0,
      sensorStatus: isSet(object.sensorStatus)
        ? SensorCompatibilityStatus.fromJSON(object.sensorStatus)
        : undefined,
    };
  },

  toJSON(message: UploadWaypointSnapshotResponse): unknown {
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
      (obj.status = uploadWaypointSnapshotResponse_StatusToJSON(
        message.status
      ));
    message.sensorStatus !== undefined &&
      (obj.sensorStatus = message.sensorStatus
        ? SensorCompatibilityStatus.toJSON(message.sensorStatus)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UploadWaypointSnapshotResponse>, I>>(
    object: I
  ): UploadWaypointSnapshotResponse {
    const message = createBaseUploadWaypointSnapshotResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.leaseUseResult =
      object.leaseUseResult !== undefined && object.leaseUseResult !== null
        ? LeaseUseResult.fromPartial(object.leaseUseResult)
        : undefined;
    message.status = object.status ?? 0;
    message.sensorStatus =
      object.sensorStatus !== undefined && object.sensorStatus !== null
        ? SensorCompatibilityStatus.fromPartial(object.sensorStatus)
        : undefined;
    return message;
  },
};

function createBaseUploadEdgeSnapshotRequest(): UploadEdgeSnapshotRequest {
  return { header: undefined, chunk: undefined, lease: undefined };
}

export const UploadEdgeSnapshotRequest = {
  encode(
    message: UploadEdgeSnapshotRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.chunk !== undefined) {
      DataChunk.encode(message.chunk, writer.uint32(34).fork()).ldelim();
    }
    if (message.lease !== undefined) {
      Lease.encode(message.lease, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UploadEdgeSnapshotRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUploadEdgeSnapshotRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 4:
          message.chunk = DataChunk.decode(reader, reader.uint32());
          break;
        case 5:
          message.lease = Lease.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UploadEdgeSnapshotRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      chunk: isSet(object.chunk) ? DataChunk.fromJSON(object.chunk) : undefined,
      lease: isSet(object.lease) ? Lease.fromJSON(object.lease) : undefined,
    };
  },

  toJSON(message: UploadEdgeSnapshotRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.chunk !== undefined &&
      (obj.chunk = message.chunk ? DataChunk.toJSON(message.chunk) : undefined);
    message.lease !== undefined &&
      (obj.lease = message.lease ? Lease.toJSON(message.lease) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UploadEdgeSnapshotRequest>, I>>(
    object: I
  ): UploadEdgeSnapshotRequest {
    const message = createBaseUploadEdgeSnapshotRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.chunk =
      object.chunk !== undefined && object.chunk !== null
        ? DataChunk.fromPartial(object.chunk)
        : undefined;
    message.lease =
      object.lease !== undefined && object.lease !== null
        ? Lease.fromPartial(object.lease)
        : undefined;
    return message;
  },
};

function createBaseUploadEdgeSnapshotResponse(): UploadEdgeSnapshotResponse {
  return { header: undefined, leaseUseResult: undefined };
}

export const UploadEdgeSnapshotResponse = {
  encode(
    message: UploadEdgeSnapshotResponse,
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
  ): UploadEdgeSnapshotResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUploadEdgeSnapshotResponse();
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

  fromJSON(object: any): UploadEdgeSnapshotResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      leaseUseResult: isSet(object.leaseUseResult)
        ? LeaseUseResult.fromJSON(object.leaseUseResult)
        : undefined,
    };
  },

  toJSON(message: UploadEdgeSnapshotResponse): unknown {
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

  fromPartial<I extends Exact<DeepPartial<UploadEdgeSnapshotResponse>, I>>(
    object: I
  ): UploadEdgeSnapshotResponse {
    const message = createBaseUploadEdgeSnapshotResponse();
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

function createBaseDownloadWaypointSnapshotRequest(): DownloadWaypointSnapshotRequest {
  return {
    header: undefined,
    waypointSnapshotId: "",
    downloadImages: false,
    compressPointCloud: false,
    doNotDownloadPointCloud: false,
  };
}

export const DownloadWaypointSnapshotRequest = {
  encode(
    message: DownloadWaypointSnapshotRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.waypointSnapshotId !== "") {
      writer.uint32(18).string(message.waypointSnapshotId);
    }
    if (message.downloadImages === true) {
      writer.uint32(24).bool(message.downloadImages);
    }
    if (message.compressPointCloud === true) {
      writer.uint32(32).bool(message.compressPointCloud);
    }
    if (message.doNotDownloadPointCloud === true) {
      writer.uint32(40).bool(message.doNotDownloadPointCloud);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DownloadWaypointSnapshotRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDownloadWaypointSnapshotRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.waypointSnapshotId = reader.string();
          break;
        case 3:
          message.downloadImages = reader.bool();
          break;
        case 4:
          message.compressPointCloud = reader.bool();
          break;
        case 5:
          message.doNotDownloadPointCloud = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DownloadWaypointSnapshotRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      waypointSnapshotId: isSet(object.waypointSnapshotId)
        ? String(object.waypointSnapshotId)
        : "",
      downloadImages: isSet(object.downloadImages)
        ? Boolean(object.downloadImages)
        : false,
      compressPointCloud: isSet(object.compressPointCloud)
        ? Boolean(object.compressPointCloud)
        : false,
      doNotDownloadPointCloud: isSet(object.doNotDownloadPointCloud)
        ? Boolean(object.doNotDownloadPointCloud)
        : false,
    };
  },

  toJSON(message: DownloadWaypointSnapshotRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.waypointSnapshotId !== undefined &&
      (obj.waypointSnapshotId = message.waypointSnapshotId);
    message.downloadImages !== undefined &&
      (obj.downloadImages = message.downloadImages);
    message.compressPointCloud !== undefined &&
      (obj.compressPointCloud = message.compressPointCloud);
    message.doNotDownloadPointCloud !== undefined &&
      (obj.doNotDownloadPointCloud = message.doNotDownloadPointCloud);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DownloadWaypointSnapshotRequest>, I>>(
    object: I
  ): DownloadWaypointSnapshotRequest {
    const message = createBaseDownloadWaypointSnapshotRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.waypointSnapshotId = object.waypointSnapshotId ?? "";
    message.downloadImages = object.downloadImages ?? false;
    message.compressPointCloud = object.compressPointCloud ?? false;
    message.doNotDownloadPointCloud = object.doNotDownloadPointCloud ?? false;
    return message;
  },
};

function createBaseDownloadWaypointSnapshotResponse(): DownloadWaypointSnapshotResponse {
  return {
    header: undefined,
    status: 0,
    waypointSnapshotId: "",
    chunk: undefined,
  };
}

export const DownloadWaypointSnapshotResponse = {
  encode(
    message: DownloadWaypointSnapshotResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.waypointSnapshotId !== "") {
      writer.uint32(34).string(message.waypointSnapshotId);
    }
    if (message.chunk !== undefined) {
      DataChunk.encode(message.chunk, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DownloadWaypointSnapshotResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDownloadWaypointSnapshotResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        case 4:
          message.waypointSnapshotId = reader.string();
          break;
        case 5:
          message.chunk = DataChunk.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DownloadWaypointSnapshotResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? downloadWaypointSnapshotResponse_StatusFromJSON(object.status)
        : 0,
      waypointSnapshotId: isSet(object.waypointSnapshotId)
        ? String(object.waypointSnapshotId)
        : "",
      chunk: isSet(object.chunk) ? DataChunk.fromJSON(object.chunk) : undefined,
    };
  },

  toJSON(message: DownloadWaypointSnapshotResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = downloadWaypointSnapshotResponse_StatusToJSON(
        message.status
      ));
    message.waypointSnapshotId !== undefined &&
      (obj.waypointSnapshotId = message.waypointSnapshotId);
    message.chunk !== undefined &&
      (obj.chunk = message.chunk ? DataChunk.toJSON(message.chunk) : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<DownloadWaypointSnapshotResponse>, I>
  >(object: I): DownloadWaypointSnapshotResponse {
    const message = createBaseDownloadWaypointSnapshotResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    message.waypointSnapshotId = object.waypointSnapshotId ?? "";
    message.chunk =
      object.chunk !== undefined && object.chunk !== null
        ? DataChunk.fromPartial(object.chunk)
        : undefined;
    return message;
  },
};

function createBaseDownloadEdgeSnapshotRequest(): DownloadEdgeSnapshotRequest {
  return { header: undefined, edgeSnapshotId: "" };
}

export const DownloadEdgeSnapshotRequest = {
  encode(
    message: DownloadEdgeSnapshotRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.edgeSnapshotId !== "") {
      writer.uint32(18).string(message.edgeSnapshotId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DownloadEdgeSnapshotRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDownloadEdgeSnapshotRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.edgeSnapshotId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DownloadEdgeSnapshotRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      edgeSnapshotId: isSet(object.edgeSnapshotId)
        ? String(object.edgeSnapshotId)
        : "",
    };
  },

  toJSON(message: DownloadEdgeSnapshotRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.edgeSnapshotId !== undefined &&
      (obj.edgeSnapshotId = message.edgeSnapshotId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DownloadEdgeSnapshotRequest>, I>>(
    object: I
  ): DownloadEdgeSnapshotRequest {
    const message = createBaseDownloadEdgeSnapshotRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.edgeSnapshotId = object.edgeSnapshotId ?? "";
    return message;
  },
};

function createBaseDownloadEdgeSnapshotResponse(): DownloadEdgeSnapshotResponse {
  return { header: undefined, status: 0, edgeSnapshotId: "", chunk: undefined };
}

export const DownloadEdgeSnapshotResponse = {
  encode(
    message: DownloadEdgeSnapshotResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.edgeSnapshotId !== "") {
      writer.uint32(34).string(message.edgeSnapshotId);
    }
    if (message.chunk !== undefined) {
      DataChunk.encode(message.chunk, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DownloadEdgeSnapshotResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDownloadEdgeSnapshotResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        case 4:
          message.edgeSnapshotId = reader.string();
          break;
        case 5:
          message.chunk = DataChunk.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DownloadEdgeSnapshotResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? downloadEdgeSnapshotResponse_StatusFromJSON(object.status)
        : 0,
      edgeSnapshotId: isSet(object.edgeSnapshotId)
        ? String(object.edgeSnapshotId)
        : "",
      chunk: isSet(object.chunk) ? DataChunk.fromJSON(object.chunk) : undefined,
    };
  },

  toJSON(message: DownloadEdgeSnapshotResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = downloadEdgeSnapshotResponse_StatusToJSON(message.status));
    message.edgeSnapshotId !== undefined &&
      (obj.edgeSnapshotId = message.edgeSnapshotId);
    message.chunk !== undefined &&
      (obj.chunk = message.chunk ? DataChunk.toJSON(message.chunk) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DownloadEdgeSnapshotResponse>, I>>(
    object: I
  ): DownloadEdgeSnapshotResponse {
    const message = createBaseDownloadEdgeSnapshotResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    message.edgeSnapshotId = object.edgeSnapshotId ?? "";
    message.chunk =
      object.chunk !== undefined && object.chunk !== null
        ? DataChunk.fromPartial(object.chunk)
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
