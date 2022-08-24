/* eslint-disable */
import {
  PowerCommandRequest_Request,
  powerCommandRequest_RequestFromJSON,
  powerCommandRequest_RequestToJSON,
} from "../power";
import {
  Logpoint_RecordType,
  logpoint_RecordTypeFromJSON,
  logpoint_RecordTypeToJSON,
} from "../spot_cam/logging";
import {
  PrepPoseBehavior,
  prepPoseBehaviorFromJSON,
  prepPoseBehaviorToJSON,
} from "../docking/docking";
import {
  Result,
  UserData,
  KeyValue,
  VariableDeclaration,
  ConstantValue,
  resultFromJSON,
  resultToJSON,
} from "./util";
import Long from "long";
import { Any } from "../../../google/protobuf/any";
import { Duration } from "../../../google/protobuf/duration";
import { RobotCommand } from "../robot_command";
import {
  RouteGenParams,
  TravelParams,
  RouteFollowingParams,
  SetLocalizationRequest,
} from "../graph_nav/graph_nav";
import { Route } from "../graph_nav/nav";
import { Event } from "../data_buffer";
import { PtzPosition } from "../spot_cam/ptz";
import { SE3Pose } from "../geometry";
import { Camera } from "../spot_cam/camera";
import { AcquireDataRequest } from "../data_acquisition";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api.mission";

/**
 * Wrapper for a mission node. Contains the basics common to all mission nodes.
 * Specifics of what the node does are contained in the "impl" field.
 */
export interface Node {
  /** Human-readable name of this node, e.g. "Goto waypoint 1", or "Power On". */
  name: string;
  /** Collection of user data associated with this node. */
  userData: UserData | undefined;
  /**
   * Reference identifier of this node.
   * Set iff another node references this one.
   */
  referenceId: string;
  /** Implementation of this node. For example, this may be a Sequence. */
  impl: Any | undefined;
  /**
   * Unique identifier of another node. If this is filled out, rather than the "impl", then
   * the referenced node will be used in place of this one.
   */
  nodeReference: string | undefined;
  /**
   * Defines parameters, used by this node or its children.
   * The "key" in KeyValue is the name of the parameter being defined.
   * The value can be a constant or another parameter value.
   */
  parameterValues: KeyValue[];
  /**
   * Overwrites a protobuf field in this node's implementation.
   * The "key" in KeyValue is the name of the field to override.
   * The value to write can be sourced from a constant, or a parameter value.
   */
  overrides: KeyValue[];
  /**
   * Declares parameters needed at compile time by this node, or children of this node.
   * This is a way for a node to communicate what parameters its implementation and/or children
   * require, without unpacking the entire subtree.
   */
  parameters: VariableDeclaration[];
}

/** Run  all children in order until a child fails. */
export interface Sequence {
  /**
   * Forces the execution to always begin with the first child.  If false, and
   * the Sequence ran last tick, it will continue with the node it was ticking.
   */
  alwaysRestart: boolean;
  /** List of all children to iterate through. */
  children: Node[];
}

/** Run all children in order until a child succeeds. */
export interface Selector {
  /**
   * Forces the execution to always begin with the first child.  If false, and
   * the Selector ran last tick, it will continue with the node it was ticking.
   */
  alwaysRestart: boolean;
  /** List of all children to iterate through. */
  children: Node[];
}

/** Repeat a child node. */
export interface Repeat {
  /**
   * Start the child node exactly this many times.
   * Note that a value of 1 makes the Repeat node a no-op.
   */
  maxStarts: number;
  /** Child to repeat max_starts times. */
  child: Node | undefined;
  /** If set, the node will write the start index to the blackboard. */
  startCounterStateName: string;
}

/** Retry a child node until it succeeds, or exceeds a number of attempts. */
export interface Retry {
  /** Only allow this many attempts. Note that a value of 1 makes this Retry node a no-op. */
  maxAttempts: number;
  /** Child to retry up to max_attempts. */
  child: Node | undefined;
  /** If set, the node will write the attempt index to the blackboard. */
  attemptCounterStateName: string;
}

/**
 * Run this child for a maximum amount of mission execution time.
 * Will exit with child's status if the child finishes early,
 * FAILURE if the child remains in RUNNING state for too long
 * and no timeout_child is specified, or the status of the
 * timeout_child.
 */
export interface ForDuration {
  /** Maximum duration of mission execution time. */
  duration: Duration | undefined;
  /** Child to execute for the duration. */
  child: Node | undefined;
  /**
   * Optional blackboard variable name.  If specified, this node will define a blackboard
   * variable that its child has access to, and write the number of seconds remaining as
   * a double to the blackboard under this name.
   */
  timeRemainingName: string;
  /**
   * Optional node that will run if the child times out.  If not specified, this node
   * will return FAILURE when the child times out.  If specified, and the
   * child times out, this node will return the status of the timeout_child.
   * The timeout_child does not respect the original timeout.
   */
  timeoutChild: Node | undefined;
}

/** Run two child nodes together, returning the primary child's result when it completes. */
export interface SimpleParallel {
  /** Primary node, whose completion will end the execution of SimpleParallel. */
  primary: Node | undefined;
  /** Secondary node, which will be ticked as long as the primary is still running. */
  secondary: Node | undefined;
}

/** Checks a simple comparison statement. */
export interface Condition {
  /** Left-hand side of the comparison. */
  lhs: Condition_Operand | undefined;
  /** Right-hand side of the comparison. */
  rhs: Condition_Operand | undefined;
  /** Comparison operator to compare lhs and rhs. */
  operation: Condition_Compare;
  handleStaleness: Condition_HandleStaleness;
}

/** Comparison operator. */
export enum Condition_Compare {
  /** COMPARE_UNKNOWN - Invalid, do not use. */
  COMPARE_UNKNOWN = 0,
  /** COMPARE_EQ - Equal. */
  COMPARE_EQ = 1,
  /** COMPARE_NE - Not equal. */
  COMPARE_NE = 2,
  /** COMPARE_LT - Less than. */
  COMPARE_LT = 3,
  /** COMPARE_GT - Greater than. */
  COMPARE_GT = 4,
  /** COMPARE_LE - Less than or equal. */
  COMPARE_LE = 5,
  /** COMPARE_GE - Greater than or equal. */
  COMPARE_GE = 6,
  UNRECOGNIZED = -1,
}

export function condition_CompareFromJSON(object: any): Condition_Compare {
  switch (object) {
    case 0:
    case "COMPARE_UNKNOWN":
      return Condition_Compare.COMPARE_UNKNOWN;
    case 1:
    case "COMPARE_EQ":
      return Condition_Compare.COMPARE_EQ;
    case 2:
    case "COMPARE_NE":
      return Condition_Compare.COMPARE_NE;
    case 3:
    case "COMPARE_LT":
      return Condition_Compare.COMPARE_LT;
    case 4:
    case "COMPARE_GT":
      return Condition_Compare.COMPARE_GT;
    case 5:
    case "COMPARE_LE":
      return Condition_Compare.COMPARE_LE;
    case 6:
    case "COMPARE_GE":
      return Condition_Compare.COMPARE_GE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Condition_Compare.UNRECOGNIZED;
  }
}

export function condition_CompareToJSON(object: Condition_Compare): string {
  switch (object) {
    case Condition_Compare.COMPARE_UNKNOWN:
      return "COMPARE_UNKNOWN";
    case Condition_Compare.COMPARE_EQ:
      return "COMPARE_EQ";
    case Condition_Compare.COMPARE_NE:
      return "COMPARE_NE";
    case Condition_Compare.COMPARE_LT:
      return "COMPARE_LT";
    case Condition_Compare.COMPARE_GT:
      return "COMPARE_GT";
    case Condition_Compare.COMPARE_LE:
      return "COMPARE_LE";
    case Condition_Compare.COMPARE_GE:
      return "COMPARE_GE";
    case Condition_Compare.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * When comparing runtime values in the blackboard, some values might be "stale" (i.e too old).
 * This defines how the comparator should behave when a read value is stale.
 */
export enum Condition_HandleStaleness {
  /** HANDLE_STALE_UNKNOWN - acts like READ_ANYWAY for backwards compatibility. */
  HANDLE_STALE_UNKNOWN = 0,
  /** HANDLE_STALE_READ_ANYWAY - ignore how stale this data is. */
  HANDLE_STALE_READ_ANYWAY = 1,
  /** HANDLE_STALE_RUN_UNTIL_FRESH - return the RUNNING status until the data being read is not stale. */
  HANDLE_STALE_RUN_UNTIL_FRESH = 2,
  /** HANDLE_STALE_FAIL - return FAILURE status if stale data is read. */
  HANDLE_STALE_FAIL = 3,
  UNRECOGNIZED = -1,
}

export function condition_HandleStalenessFromJSON(
  object: any
): Condition_HandleStaleness {
  switch (object) {
    case 0:
    case "HANDLE_STALE_UNKNOWN":
      return Condition_HandleStaleness.HANDLE_STALE_UNKNOWN;
    case 1:
    case "HANDLE_STALE_READ_ANYWAY":
      return Condition_HandleStaleness.HANDLE_STALE_READ_ANYWAY;
    case 2:
    case "HANDLE_STALE_RUN_UNTIL_FRESH":
      return Condition_HandleStaleness.HANDLE_STALE_RUN_UNTIL_FRESH;
    case 3:
    case "HANDLE_STALE_FAIL":
      return Condition_HandleStaleness.HANDLE_STALE_FAIL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Condition_HandleStaleness.UNRECOGNIZED;
  }
}

export function condition_HandleStalenessToJSON(
  object: Condition_HandleStaleness
): string {
  switch (object) {
    case Condition_HandleStaleness.HANDLE_STALE_UNKNOWN:
      return "HANDLE_STALE_UNKNOWN";
    case Condition_HandleStaleness.HANDLE_STALE_READ_ANYWAY:
      return "HANDLE_STALE_READ_ANYWAY";
    case Condition_HandleStaleness.HANDLE_STALE_RUN_UNTIL_FRESH:
      return "HANDLE_STALE_RUN_UNTIL_FRESH";
    case Condition_HandleStaleness.HANDLE_STALE_FAIL:
      return "HANDLE_STALE_FAIL";
    case Condition_HandleStaleness.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Options for where to retrieve values from. */
export interface Condition_Operand {
  /** Reference an existing variable. */
  var: VariableDeclaration | undefined;
  /** Use a constant value. */
  const: ConstantValue | undefined;
}

/** Get state from the robot. */
export interface BosdynRobotState {
  /** Name of the service to use. */
  serviceName: string;
  /** Host machine the service is running on. */
  host: string;
  /** Child node. Children will have access to the state gathered by this node. */
  child: Node | undefined;
  /**
   * Name of the bosdyn.api.RobotState object in the blackboard. For example, if this is set to
   * "robot", children can look up "robot.power_state.motor_power_state" in the blackboard.
   */
  stateName: string;
}

/** Get the state of the docking service from the robot. */
export interface BosdynDockState {
  /** Name of the service to use. */
  serviceName: string;
  /** Host machine the service is running on. */
  host: string;
  /** Child node. Children will have access to the state gathered by this node. */
  child: Node | undefined;
  /**
   * Name of the bosdyn.api.DockState object in the blackboard. For example, if this is set to
   * "power_status", children can look up "power_status" in the blackboard.
   */
  stateName: string;
}

/**
 * Execute a RobotCommand.
 * These nodes will "succeed" once a feedback response is received indicating success. Any commands
 * that require an "end time" will have that information set based on the end time of the mission.
 */
export interface BosdynRobotCommand {
  /** Name of the service to use. */
  serviceName: string;
  /** Host machine the directory is running on. */
  host: string;
  /** The command to execute. See the RobotCommand documentation for details. */
  command: RobotCommand | undefined;
}

/** Make a robot power request */
export interface BosdynPowerRequest {
  /** Name of the service to use. */
  serviceName: string;
  /** Host machine the service is running on. */
  host: string;
  /** The request to make. See the PowerCommandRequest documentation for details. */
  request: PowerCommandRequest_Request;
}

/** Tell the robot to navigate to a waypoint. */
export interface BosdynNavigateTo {
  /** Name of the service to use. */
  serviceName: string;
  /** Host machine the service is running on. */
  host: string;
  /** ID of the waypoint to go to. */
  destinationWaypointId: string;
  /** Preferences on how to pick the route. */
  routeGenParams: RouteGenParams | undefined;
  /** Parameters that define how to traverse and end the route. */
  travelParams: TravelParams | undefined;
  /**
   * If provided, this will write the last NavigationFeedbackResponse message
   * to a blackboard variable with this name.
   */
  navigationFeedbackResponseBlackboardKey: string;
  /**
   * If provided, this will write the last NavigateToResponse message to
   * a blackboard variable with this name.
   */
  navigateToResponseBlackboardKey: string;
}

/** Tell the robot to navigate a route. */
export interface BosdynNavigateRoute {
  /** Name of the service to use. */
  serviceName: string;
  /** Host machine the service is running on. */
  host: string;
  /** A route for the robot to follow. */
  route: Route | undefined;
  /**
   * What should the robot do if it is not at the expected point in the route, or the route is
   * blocked.
   */
  routeFollowParams: RouteFollowingParams | undefined;
  /** Parameters that define how to traverse and end the route. */
  travelParams: TravelParams | undefined;
  /**
   * If provided, this will write the last NavigationFeedbackResponse message
   * to a blackboard variable with this name.
   */
  navigationFeedbackResponseBlackboardKey: string;
  /**
   * If provided, this will write the last NavigateRouteResponse message to
   * a blackboard variable with this name.
   */
  navigateRouteResponseBlackboardKey: string;
}

/** Get GraphNav state from the robot and save it to the blackboard. */
export interface BosdynGraphNavState {
  /** Name of the service to use. */
  serviceName: string;
  /** Host machine the service is running on. */
  host: string;
  /** Child node. Children will have access to the state gathered by this node. */
  child: Node | undefined;
  /**
   * Name of the bosdyn.api.GetLocalizationStateResponse object in the blackboard. For example,
   * if this is set to "nav", children can look up "nav.localization.waypoint_id" in the
   * blackboard to get the waypoint the robot is localized to.
   */
  stateName: string;
  /**
   * Id of the waypoint that we want the localization to be relative to.
   * If this is empty, the localization will be relative to the waypoint that the
   * robot is currently localized to.
   */
  waypointId: string;
}

/**
 * Tell GraphNav to re-localize the robot using a SetLocalizationRequest. This overrides whatever
 * the current localization is. This can be useful to reinitialize the system at a known state.
 */
export interface BosdynGraphNavLocalize {
  /** Name of the service to use. */
  serviceName: string;
  /** Host machine the service is running on. */
  host: string;
  /**
   * If no localization_request is provided, the default options used
   * are FIDUCIAL_INIT_NEAREST (the system will initialize to the nearest fiducial).
   * Otherwise, the options inside the set_localization_request will be used.
   * Note that ko_tform_body in the request will be ignored (it will be recalculated at runtime).
   */
  localizationRequest: SetLocalizationRequest | undefined;
}

/** Record an APIEvent */
export interface BosdynRecordEvent {
  /** Name of the service to use. */
  serviceName: string;
  /** Host machine the service is running on. */
  host: string;
  /**
   * The event to be logged. Note that everything should be populated except the id, start_time
   * and end_time. The start and end time will be populated by the mission, using the node's start time.
   * The id field shouldn't be set when the start and end times are the same.
   */
  event: Event | undefined;
}

/** Call out to another system using the RemoteMission service. */
export interface RemoteGrpc {
  /** Host that is running the directory server. Usually, this is just the robot. */
  host: string;
  /** Name of the service in the directory. */
  serviceName: string;
  /**
   * Timeout of any single RPC. If the timeout is exceeded, the RPC will fail. The mission service
   * treats each failed RPC differently:
   * - EstablishSession: An error is returned in LoadMission.
   * - Tick: The RPC is retried.
   * - Stop: The error is ignored, and the RPC is not retried.
   * Omit for a default of 60 seconds.
   */
  timeout: number;
  /** Resources that we will need leases on. */
  leaseResources: string[];
  /**
   * The list of variables the remote host should receive.
   * Variables given can be available at either run-time or compile-time.
   * The "key" in KeyValue is the name of the variable as used by the remote system.
   */
  inputs: KeyValue[];
}

/**
 * When started, begins a sleep timer for X seconds. Returns "success" after the timer elapses,
 * "running" otherwise.
 */
export interface Sleep {
  /** Number of seconds to sleep for. */
  seconds: number;
  /** If this node is stopped, should it restart the timer? */
  restartAfterStop: boolean;
}

/**
 * Prompt the world at large to answer a question.
 * This node represents a request for information from ANY listeners that may be out there.
 */
export interface Prompt {
  /**
   * Should we always re-prompt when this node is started?
   * If false, this node will only ever prompt if it is started and its question is unanswered.
   * This may be used, for example, to ask the user to check the robot after any self-right.
   * If true, this node will prompt whenever it is started.
   * This may be used, for example, to tell the user to perform some one-time action, like open a
   * door for the robot.
   */
  alwaysReprompt: boolean;
  /**
   * The text of the question itself.  The question text may contain formatted blackboard
   * variables.  Please see the documentation in FormatBlackboard for more information
   * about supported string formats.
   */
  text: string;
  /**
   * Metadata describing the source of the question.
   * The answer will be written into the state blackboard with this as the variable name.
   */
  source: string;
  /** The set of options that can be chosen for this prompt. */
  options: Prompt_Option[];
  /**
   * Child node, run after the prompt has been responded to.
   * Children will have access to the answer code provided by the response.
   */
  child: Node | undefined;
  /**
   * Hint that Question posed by this Prompt is meant to be answered by some automated system.
   * See the Question message for details.
   */
  forAutonomousProcessing: boolean;
}

/** Data about the options to choose from. */
export interface Prompt_Option {
  /** Text associated with this option. Should be displayed to the user. */
  text: string;
  /** Numeric code corresponding to this option. Passed as part of the answer. */
  answerCode: number;
}

/** Point the PTZ to a specified orientation */
export interface SpotCamPtz {
  /** Name of the service to use. */
  serviceName: string;
  /** Host machine of the directory server that the Spot CAM registered with. */
  host: string;
  /**
   * The rest of the fields are from bosdyn.api.spot_cam.ptz.SetPtzPositionRequest, see that
   * message for details.
   */
  ptzPosition: PtzPosition | undefined;
  /**
   * Setting adjust_parameters will enable auto-adjusting the PTZ pan and tilt at playback time,
   * based on where the robot is, relative to the waypoint. Leave empty to disable auto-adjust
   * features.
   */
  adjustParameters: SpotCamPtz_AdjustParameters | undefined;
}

export interface SpotCamPtz_AdjustParameters {
  /** Variable name to retrieve the graph nav state from. */
  localizationVarname: string;
  /** Waypoint ID where this PTZ configuration was originally set up. */
  waypointId: string;
  /** Pose of body in waypoint frame at the time this PTZ configuration was originally set up. */
  waypointTformBody: SE3Pose | undefined;
}

/** Store media using the Spot CAM. */
export interface SpotCamStoreMedia {
  /** Name of the service to use. */
  serviceName: string;
  /** Host machine of the directory server that the Spot CAM registered with. */
  host: string;
  /**
   * The rest of the fields are from bosdyn.api.spot_cam.logging.StoreRequest, see that message for
   * details.
   */
  camera: Camera | undefined;
  /** What type of media should be stored from this action. */
  type: Logpoint_RecordType;
  /** Extra metadata to store alongside the captured media. */
  tag: string;
}

/** Set the LEDs to a specified brightness */
export interface SpotCamLed {
  /** Name of the service to use. */
  serviceName: string;
  /** Host machine of the directory server that the Spot CAM registered with. */
  host: string;
  /** Brightnesses of the LEDs, from SetLEDBrightnessRequest */
  brightnesses: { [key: number]: number };
}

export interface SpotCamLed_BrightnessesEntry {
  key: number;
  value: number;
}

/** Reset the autofocus on the Spot CAM PTZ */
export interface SpotCamResetAutofocus {
  /** Name of the service to use. */
  serviceName: string;
  /** Host machine of the directory server that the Spot CAM registered with. */
  host: string;
}

export interface Dock {
  /** Name of the service to use. */
  serviceName: string;
  /** Host machine of the directory server that the docking service is registered with. */
  host: string;
  /** ID of docking station to dock at. */
  dockingStationId: number;
  /**
   * Optional child node. Children will have access to the status variables gathered by this node.
   * If specified, child node will determine success/failure of this node.
   *
   * DEPRECATED!  Use docking_command_response_blackboard_key and
   * docking_command_feedback_response_blackboard_key instead.
   *
   * @deprecated
   */
  child: Node | undefined;
  /**
   * Name of the command status variable in the blackboard.  This is the status of the docking
   * command request made to the robot.  Please refer to
   * bosdyn.api.docking.DockingCommandResponse.Status for more details.  Children can use this
   * name to look up docking command status in the blackboard. If no name is provided, status will
   * not be available.
   *
   * DEPRECATED!  Use docking_command_response_blackboard_key and
   * docking_command_feedback_response_blackboard_key instead.
   *
   * @deprecated
   */
  commandStatusName: string;
  /**
   * Name of the feedback status variable in the blackboard.  This is the feedback provided while
   * docking is in progress.  Please refer to bosdyn.api.docking.DockingCommandFeedbackResponse.Status
   * for a list of possible status values.  Children can use this name to look up docking status
   * in the blackboard. If no name is provided, status will not be available.
   *
   * DEPRECATED!  Use docking_command_response_blackboard_key and
   * docking_command_feedback_response_blackboard_key instead.
   *
   * @deprecated
   */
  feedbackStatusName: string;
  /** Defines how we use the "pre-docking" behavior. */
  prepPoseBehavior: PrepPoseBehavior;
  /**
   * If provided, this will write the last DockingCommandFeedbackResponse message
   * to a blackboard variable with this name.
   */
  dockingCommandFeedbackResponseBlackboardKey: string;
  /**
   * If provided, this will write the last DockingCommandResponse message to
   * a blackboard variable with this name.
   */
  dockingCommandResponseBlackboardKey: string;
}

/** Triggers a StoreMetadataRequest to the data acquisition store. */
export interface StoreMetadata {
  /** Name of the service to use. */
  serviceName: string;
  /** Host machine of the directory server that the data acquisition service is registered with. */
  host: string;
  /**
   * The name of the blackboard variable that holds the associated AcquireDataRequest. The
   * reference ID that this metadata is associated with will be copied from the request.
   */
  acquireDataRequestName: string;
  /**
   * The name of the metadata object in the blackboard to be stored.
   * The metadata object can be any protobuf message.
   */
  metadataName: string;
  /** The data buffer channel on which to store the metadata. */
  metadataChannel: string;
}

/** Trigger the acquisition and storage of data. */
export interface DataAcquisition {
  /** Name of the service to use. */
  serviceName: string;
  /** Host machine of the directory server that the data acquisition service is registered with. */
  host: string;
  /** Specification of the data and metadata to store. */
  request: AcquireDataRequest | undefined;
  completionBehavior: DataAcquisition_CompletionBehavior;
  /**
   * Define a format string that will be used together with the blackboard to generate
   * a group name.  Values from the blackboard will replace the keys in braces {}.
   * Example: "telop-{date}", where "date" is a blackboard variable.
   * Example: "{date}_loop_{loop_counter}", where "loop_counter" is a blackboard variable from a Repeat.
   */
  groupNameFormat: string;
  /** If populated, name of the variable in the blackboard in which to store the AcquireDataRequest. */
  requestNameInBlackboard: string;
}

export enum DataAcquisition_CompletionBehavior {
  COMPLETE_UNKNOWN = 0,
  /** COMPLETE_AFTER_SAVED - Node is complete after all data has been saved. */
  COMPLETE_AFTER_SAVED = 1,
  /**
   * COMPLETE_AFTER_ACQUIRED - Node is complete after all data is acquired, but before processing and storage.
   * This allows the robot to continue on with the mission sooner, but
   * it will be unaware of failures in processing or storage.
   */
  COMPLETE_AFTER_ACQUIRED = 2,
  UNRECOGNIZED = -1,
}

export function dataAcquisition_CompletionBehaviorFromJSON(
  object: any
): DataAcquisition_CompletionBehavior {
  switch (object) {
    case 0:
    case "COMPLETE_UNKNOWN":
      return DataAcquisition_CompletionBehavior.COMPLETE_UNKNOWN;
    case 1:
    case "COMPLETE_AFTER_SAVED":
      return DataAcquisition_CompletionBehavior.COMPLETE_AFTER_SAVED;
    case 2:
    case "COMPLETE_AFTER_ACQUIRED":
      return DataAcquisition_CompletionBehavior.COMPLETE_AFTER_ACQUIRED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DataAcquisition_CompletionBehavior.UNRECOGNIZED;
  }
}

export function dataAcquisition_CompletionBehaviorToJSON(
  object: DataAcquisition_CompletionBehavior
): string {
  switch (object) {
    case DataAcquisition_CompletionBehavior.COMPLETE_UNKNOWN:
      return "COMPLETE_UNKNOWN";
    case DataAcquisition_CompletionBehavior.COMPLETE_AFTER_SAVED:
      return "COMPLETE_AFTER_SAVED";
    case DataAcquisition_CompletionBehavior.COMPLETE_AFTER_ACQUIRED:
      return "COMPLETE_AFTER_ACQUIRED";
    case DataAcquisition_CompletionBehavior.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Send RetainLease for every Lease the mission service is given via PlayMissionRequest.
 * Returns RUNNING while there are more leases to retain, SUCCESS once a lease for each resource has
 * been retained, and FAILURE if any one lease cannot be retained.
 */
export interface RetainLease {
  /** Name of the service to use. */
  serviceName: string;
  /** Host machine of the directory server that the lease service is registered with. */
  host: string;
}

/**
 * Defines new blackboard variables within the scope of the child. Shadows blackboard
 * variables in the parent scope.
 */
export interface DefineBlackboard {
  /**
   * The list of variables that should be defined for this subtree,
   * with initial values.
   */
  blackboardVariables: KeyValue[];
  /**
   * The blackboard variables will only persist in the subtree defined by this
   * child node. The child's tick() will be called on the child until it
   * returns either SUCCESS or FAILURE.
   */
  child: Node | undefined;
}

/** Sets existing blackboard variables within this scope to specific values, returning SUCCESS. */
export interface SetBlackboard {
  /**
   * The key of the KeyValue is the name of the blackboard variable.
   * The value will be dereferenced and converted into a value type at runtime
   * inside this node's tick function. For example, if the value is a runtime
   * variable, that variable will be evaluated at tick time, and then stored into
   * the blackboard. If the value is another blackboard variable, that blackboard
   * variable's value will be copied into the variable specified by the key.
   */
  blackboardVariables: KeyValue[];
}

/** Sets a blackboard variable to a formatted string, reading from other blackboard vars. */
export interface FormatBlackboard {
  /** The key of the variable that will be written. */
  key: string;
  /**
   * Define a format string that will be used together with the blackboard to generate
   * string value.  Values from the blackboard will replace the keys in braces {}, i.e.
   * {blackboard_variable_name}.  We also allow some string formatting options, namely:
   *
   * 1) Floating point decimal places: {float_variable:.2f}
   * 2) TBD
   *
   * Select examples:
   *
   * Format String: "telop-{date}"
   *    Blackboard: "date" is a blackboard variable with string value: "2021-05-13"
   *        Output: "teleop-2021-05-13"
   *
   * Format String: "{date}_loop_{loop_counter}"
   *    Blackboard: "date" is a blackboard variable with string value: "2021-05-13"
   *    Blackboard: "loop_counter" is a blackboard variable with integer value: "3"
   *        Output: "2021-05-13_loop_3"
   *
   * Format String: "battery charge is: {state.power_state.locomotion_charge_percentage.value}"
   *    Blackboard: "state" is a protobuf message in the blackboard from a BosdynRobotState, and
   *                the power_state submessage has a charge percentage of 30.2148320923085
   *        Output: "battery charge is: 30.2158320923085"
   *
   * Format String: "battery charge is: {state.power_state.locomotion_charge_percentage.value:.2f}"
   *    Blackboard: "state" is a protobuf message in the blackboard from a BosdynRobotState, and
   *                the power_state submessage has a charge percentage of 30.2148320923085
   *        Output: "battery charge is: 30.21"
   *
   * Format String: "the value is {x:.0f}"
   *    Blackboard: "x" is a blackboard variable with float value: "2.71828"
   *        Output: "the value is 3"
   */
  format: string;
}

/** Record a datetime string into the blackboard. Writes the date according to ISO8601 format. */
export interface DateToBlackboard {
  /** The key of the variable that will be written. */
  key: string;
}

/** Just returns a constant when calling tick(). */
export interface ConstantResult {
  /** This result is always returned when calling tick(). */
  result: Result;
}

/**
 * This node will run and return the status of the child node.
 * If the mission is paused while this node is executing, the child will be
 * restarted when the mission is resumed.
 */
export interface RestartWhenPaused {
  child: Node | undefined;
}

/**
 * This node will:
 *   1. Check if there are behavior faults.  If there are none, it will return success.
 *   2. Check if all behavior faults are clearable.  If not, it will return failure.
 *   3. Try to clear the clearable behavior faults.  If it cannot, it will return failure.
 */
export interface ClearBehaviorFaults {
  /** Name of the service to use. */
  serviceName: string;
  /** Host machine the service is running on. */
  host: string;
  /**
   * Name of a robot state message defined in the blackboard.
   * Usually provided by embedding this node in a [BosdynRobotState] node.
   */
  robotStateBlackboardName: string;
}

function createBaseNode(): Node {
  return {
    name: "",
    userData: undefined,
    referenceId: "",
    impl: undefined,
    nodeReference: undefined,
    parameterValues: [],
    overrides: [],
    parameters: [],
  };
}

export const Node = {
  encode(message: Node, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.userData !== undefined) {
      UserData.encode(message.userData, writer.uint32(18).fork()).ldelim();
    }
    if (message.referenceId !== "") {
      writer.uint32(26).string(message.referenceId);
    }
    if (message.impl !== undefined) {
      Any.encode(message.impl, writer.uint32(34).fork()).ldelim();
    }
    if (message.nodeReference !== undefined) {
      writer.uint32(42).string(message.nodeReference);
    }
    for (const v of message.parameterValues) {
      KeyValue.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.overrides) {
      KeyValue.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.parameters) {
      VariableDeclaration.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Node {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.userData = UserData.decode(reader, reader.uint32());
          break;
        case 3:
          message.referenceId = reader.string();
          break;
        case 4:
          message.impl = Any.decode(reader, reader.uint32());
          break;
        case 5:
          message.nodeReference = reader.string();
          break;
        case 6:
          message.parameterValues.push(
            KeyValue.decode(reader, reader.uint32())
          );
          break;
        case 7:
          message.overrides.push(KeyValue.decode(reader, reader.uint32()));
          break;
        case 8:
          message.parameters.push(
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

  fromJSON(object: any): Node {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      userData: isSet(object.userData)
        ? UserData.fromJSON(object.userData)
        : undefined,
      referenceId: isSet(object.referenceId) ? String(object.referenceId) : "",
      impl: isSet(object.impl) ? Any.fromJSON(object.impl) : undefined,
      nodeReference: isSet(object.nodeReference)
        ? String(object.nodeReference)
        : undefined,
      parameterValues: Array.isArray(object?.parameterValues)
        ? object.parameterValues.map((e: any) => KeyValue.fromJSON(e))
        : [],
      overrides: Array.isArray(object?.overrides)
        ? object.overrides.map((e: any) => KeyValue.fromJSON(e))
        : [],
      parameters: Array.isArray(object?.parameters)
        ? object.parameters.map((e: any) => VariableDeclaration.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Node): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.userData !== undefined &&
      (obj.userData = message.userData
        ? UserData.toJSON(message.userData)
        : undefined);
    message.referenceId !== undefined &&
      (obj.referenceId = message.referenceId);
    message.impl !== undefined &&
      (obj.impl = message.impl ? Any.toJSON(message.impl) : undefined);
    message.nodeReference !== undefined &&
      (obj.nodeReference = message.nodeReference);
    if (message.parameterValues) {
      obj.parameterValues = message.parameterValues.map((e) =>
        e ? KeyValue.toJSON(e) : undefined
      );
    } else {
      obj.parameterValues = [];
    }
    if (message.overrides) {
      obj.overrides = message.overrides.map((e) =>
        e ? KeyValue.toJSON(e) : undefined
      );
    } else {
      obj.overrides = [];
    }
    if (message.parameters) {
      obj.parameters = message.parameters.map((e) =>
        e ? VariableDeclaration.toJSON(e) : undefined
      );
    } else {
      obj.parameters = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Node>, I>>(object: I): Node {
    const message = createBaseNode();
    message.name = object.name ?? "";
    message.userData =
      object.userData !== undefined && object.userData !== null
        ? UserData.fromPartial(object.userData)
        : undefined;
    message.referenceId = object.referenceId ?? "";
    message.impl =
      object.impl !== undefined && object.impl !== null
        ? Any.fromPartial(object.impl)
        : undefined;
    message.nodeReference = object.nodeReference ?? undefined;
    message.parameterValues =
      object.parameterValues?.map((e) => KeyValue.fromPartial(e)) || [];
    message.overrides =
      object.overrides?.map((e) => KeyValue.fromPartial(e)) || [];
    message.parameters =
      object.parameters?.map((e) => VariableDeclaration.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSequence(): Sequence {
  return { alwaysRestart: false, children: [] };
}

export const Sequence = {
  encode(
    message: Sequence,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.alwaysRestart === true) {
      writer.uint32(8).bool(message.alwaysRestart);
    }
    for (const v of message.children) {
      Node.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Sequence {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSequence();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.alwaysRestart = reader.bool();
          break;
        case 2:
          message.children.push(Node.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Sequence {
    return {
      alwaysRestart: isSet(object.alwaysRestart)
        ? Boolean(object.alwaysRestart)
        : false,
      children: Array.isArray(object?.children)
        ? object.children.map((e: any) => Node.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Sequence): unknown {
    const obj: any = {};
    message.alwaysRestart !== undefined &&
      (obj.alwaysRestart = message.alwaysRestart);
    if (message.children) {
      obj.children = message.children.map((e) =>
        e ? Node.toJSON(e) : undefined
      );
    } else {
      obj.children = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Sequence>, I>>(object: I): Sequence {
    const message = createBaseSequence();
    message.alwaysRestart = object.alwaysRestart ?? false;
    message.children = object.children?.map((e) => Node.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSelector(): Selector {
  return { alwaysRestart: false, children: [] };
}

export const Selector = {
  encode(
    message: Selector,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.alwaysRestart === true) {
      writer.uint32(8).bool(message.alwaysRestart);
    }
    for (const v of message.children) {
      Node.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Selector {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSelector();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.alwaysRestart = reader.bool();
          break;
        case 2:
          message.children.push(Node.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Selector {
    return {
      alwaysRestart: isSet(object.alwaysRestart)
        ? Boolean(object.alwaysRestart)
        : false,
      children: Array.isArray(object?.children)
        ? object.children.map((e: any) => Node.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Selector): unknown {
    const obj: any = {};
    message.alwaysRestart !== undefined &&
      (obj.alwaysRestart = message.alwaysRestart);
    if (message.children) {
      obj.children = message.children.map((e) =>
        e ? Node.toJSON(e) : undefined
      );
    } else {
      obj.children = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Selector>, I>>(object: I): Selector {
    const message = createBaseSelector();
    message.alwaysRestart = object.alwaysRestart ?? false;
    message.children = object.children?.map((e) => Node.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRepeat(): Repeat {
  return { maxStarts: 0, child: undefined, startCounterStateName: "" };
}

export const Repeat = {
  encode(
    message: Repeat,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.maxStarts !== 0) {
      writer.uint32(8).int32(message.maxStarts);
    }
    if (message.child !== undefined) {
      Node.encode(message.child, writer.uint32(34).fork()).ldelim();
    }
    if (message.startCounterStateName !== "") {
      writer.uint32(42).string(message.startCounterStateName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Repeat {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRepeat();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.maxStarts = reader.int32();
          break;
        case 4:
          message.child = Node.decode(reader, reader.uint32());
          break;
        case 5:
          message.startCounterStateName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Repeat {
    return {
      maxStarts: isSet(object.maxStarts) ? Number(object.maxStarts) : 0,
      child: isSet(object.child) ? Node.fromJSON(object.child) : undefined,
      startCounterStateName: isSet(object.startCounterStateName)
        ? String(object.startCounterStateName)
        : "",
    };
  },

  toJSON(message: Repeat): unknown {
    const obj: any = {};
    message.maxStarts !== undefined &&
      (obj.maxStarts = Math.round(message.maxStarts));
    message.child !== undefined &&
      (obj.child = message.child ? Node.toJSON(message.child) : undefined);
    message.startCounterStateName !== undefined &&
      (obj.startCounterStateName = message.startCounterStateName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Repeat>, I>>(object: I): Repeat {
    const message = createBaseRepeat();
    message.maxStarts = object.maxStarts ?? 0;
    message.child =
      object.child !== undefined && object.child !== null
        ? Node.fromPartial(object.child)
        : undefined;
    message.startCounterStateName = object.startCounterStateName ?? "";
    return message;
  },
};

function createBaseRetry(): Retry {
  return { maxAttempts: 0, child: undefined, attemptCounterStateName: "" };
}

export const Retry = {
  encode(message: Retry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.maxAttempts !== 0) {
      writer.uint32(8).int32(message.maxAttempts);
    }
    if (message.child !== undefined) {
      Node.encode(message.child, writer.uint32(18).fork()).ldelim();
    }
    if (message.attemptCounterStateName !== "") {
      writer.uint32(42).string(message.attemptCounterStateName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Retry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRetry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.maxAttempts = reader.int32();
          break;
        case 2:
          message.child = Node.decode(reader, reader.uint32());
          break;
        case 5:
          message.attemptCounterStateName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Retry {
    return {
      maxAttempts: isSet(object.maxAttempts) ? Number(object.maxAttempts) : 0,
      child: isSet(object.child) ? Node.fromJSON(object.child) : undefined,
      attemptCounterStateName: isSet(object.attemptCounterStateName)
        ? String(object.attemptCounterStateName)
        : "",
    };
  },

  toJSON(message: Retry): unknown {
    const obj: any = {};
    message.maxAttempts !== undefined &&
      (obj.maxAttempts = Math.round(message.maxAttempts));
    message.child !== undefined &&
      (obj.child = message.child ? Node.toJSON(message.child) : undefined);
    message.attemptCounterStateName !== undefined &&
      (obj.attemptCounterStateName = message.attemptCounterStateName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Retry>, I>>(object: I): Retry {
    const message = createBaseRetry();
    message.maxAttempts = object.maxAttempts ?? 0;
    message.child =
      object.child !== undefined && object.child !== null
        ? Node.fromPartial(object.child)
        : undefined;
    message.attemptCounterStateName = object.attemptCounterStateName ?? "";
    return message;
  },
};

function createBaseForDuration(): ForDuration {
  return {
    duration: undefined,
    child: undefined,
    timeRemainingName: "",
    timeoutChild: undefined,
  };
}

export const ForDuration = {
  encode(
    message: ForDuration,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(10).fork()).ldelim();
    }
    if (message.child !== undefined) {
      Node.encode(message.child, writer.uint32(18).fork()).ldelim();
    }
    if (message.timeRemainingName !== "") {
      writer.uint32(26).string(message.timeRemainingName);
    }
    if (message.timeoutChild !== undefined) {
      Node.encode(message.timeoutChild, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ForDuration {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseForDuration();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.duration = Duration.decode(reader, reader.uint32());
          break;
        case 2:
          message.child = Node.decode(reader, reader.uint32());
          break;
        case 3:
          message.timeRemainingName = reader.string();
          break;
        case 4:
          message.timeoutChild = Node.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ForDuration {
    return {
      duration: isSet(object.duration)
        ? Duration.fromJSON(object.duration)
        : undefined,
      child: isSet(object.child) ? Node.fromJSON(object.child) : undefined,
      timeRemainingName: isSet(object.timeRemainingName)
        ? String(object.timeRemainingName)
        : "",
      timeoutChild: isSet(object.timeoutChild)
        ? Node.fromJSON(object.timeoutChild)
        : undefined,
    };
  },

  toJSON(message: ForDuration): unknown {
    const obj: any = {};
    message.duration !== undefined &&
      (obj.duration = message.duration
        ? Duration.toJSON(message.duration)
        : undefined);
    message.child !== undefined &&
      (obj.child = message.child ? Node.toJSON(message.child) : undefined);
    message.timeRemainingName !== undefined &&
      (obj.timeRemainingName = message.timeRemainingName);
    message.timeoutChild !== undefined &&
      (obj.timeoutChild = message.timeoutChild
        ? Node.toJSON(message.timeoutChild)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ForDuration>, I>>(
    object: I
  ): ForDuration {
    const message = createBaseForDuration();
    message.duration =
      object.duration !== undefined && object.duration !== null
        ? Duration.fromPartial(object.duration)
        : undefined;
    message.child =
      object.child !== undefined && object.child !== null
        ? Node.fromPartial(object.child)
        : undefined;
    message.timeRemainingName = object.timeRemainingName ?? "";
    message.timeoutChild =
      object.timeoutChild !== undefined && object.timeoutChild !== null
        ? Node.fromPartial(object.timeoutChild)
        : undefined;
    return message;
  },
};

function createBaseSimpleParallel(): SimpleParallel {
  return { primary: undefined, secondary: undefined };
}

export const SimpleParallel = {
  encode(
    message: SimpleParallel,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.primary !== undefined) {
      Node.encode(message.primary, writer.uint32(10).fork()).ldelim();
    }
    if (message.secondary !== undefined) {
      Node.encode(message.secondary, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleParallel {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimpleParallel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.primary = Node.decode(reader, reader.uint32());
          break;
        case 2:
          message.secondary = Node.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SimpleParallel {
    return {
      primary: isSet(object.primary)
        ? Node.fromJSON(object.primary)
        : undefined,
      secondary: isSet(object.secondary)
        ? Node.fromJSON(object.secondary)
        : undefined,
    };
  },

  toJSON(message: SimpleParallel): unknown {
    const obj: any = {};
    message.primary !== undefined &&
      (obj.primary = message.primary
        ? Node.toJSON(message.primary)
        : undefined);
    message.secondary !== undefined &&
      (obj.secondary = message.secondary
        ? Node.toJSON(message.secondary)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SimpleParallel>, I>>(
    object: I
  ): SimpleParallel {
    const message = createBaseSimpleParallel();
    message.primary =
      object.primary !== undefined && object.primary !== null
        ? Node.fromPartial(object.primary)
        : undefined;
    message.secondary =
      object.secondary !== undefined && object.secondary !== null
        ? Node.fromPartial(object.secondary)
        : undefined;
    return message;
  },
};

function createBaseCondition(): Condition {
  return { lhs: undefined, rhs: undefined, operation: 0, handleStaleness: 0 };
}

export const Condition = {
  encode(
    message: Condition,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.lhs !== undefined) {
      Condition_Operand.encode(message.lhs, writer.uint32(10).fork()).ldelim();
    }
    if (message.rhs !== undefined) {
      Condition_Operand.encode(message.rhs, writer.uint32(18).fork()).ldelim();
    }
    if (message.operation !== 0) {
      writer.uint32(40).int32(message.operation);
    }
    if (message.handleStaleness !== 0) {
      writer.uint32(48).int32(message.handleStaleness);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Condition {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCondition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lhs = Condition_Operand.decode(reader, reader.uint32());
          break;
        case 2:
          message.rhs = Condition_Operand.decode(reader, reader.uint32());
          break;
        case 5:
          message.operation = reader.int32() as any;
          break;
        case 6:
          message.handleStaleness = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Condition {
    return {
      lhs: isSet(object.lhs)
        ? Condition_Operand.fromJSON(object.lhs)
        : undefined,
      rhs: isSet(object.rhs)
        ? Condition_Operand.fromJSON(object.rhs)
        : undefined,
      operation: isSet(object.operation)
        ? condition_CompareFromJSON(object.operation)
        : 0,
      handleStaleness: isSet(object.handleStaleness)
        ? condition_HandleStalenessFromJSON(object.handleStaleness)
        : 0,
    };
  },

  toJSON(message: Condition): unknown {
    const obj: any = {};
    message.lhs !== undefined &&
      (obj.lhs = message.lhs
        ? Condition_Operand.toJSON(message.lhs)
        : undefined);
    message.rhs !== undefined &&
      (obj.rhs = message.rhs
        ? Condition_Operand.toJSON(message.rhs)
        : undefined);
    message.operation !== undefined &&
      (obj.operation = condition_CompareToJSON(message.operation));
    message.handleStaleness !== undefined &&
      (obj.handleStaleness = condition_HandleStalenessToJSON(
        message.handleStaleness
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Condition>, I>>(
    object: I
  ): Condition {
    const message = createBaseCondition();
    message.lhs =
      object.lhs !== undefined && object.lhs !== null
        ? Condition_Operand.fromPartial(object.lhs)
        : undefined;
    message.rhs =
      object.rhs !== undefined && object.rhs !== null
        ? Condition_Operand.fromPartial(object.rhs)
        : undefined;
    message.operation = object.operation ?? 0;
    message.handleStaleness = object.handleStaleness ?? 0;
    return message;
  },
};

function createBaseCondition_Operand(): Condition_Operand {
  return { var: undefined, const: undefined };
}

export const Condition_Operand = {
  encode(
    message: Condition_Operand,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.var !== undefined) {
      VariableDeclaration.encode(
        message.var,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.const !== undefined) {
      ConstantValue.encode(message.const, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Condition_Operand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCondition_Operand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.var = VariableDeclaration.decode(reader, reader.uint32());
          break;
        case 2:
          message.const = ConstantValue.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Condition_Operand {
    return {
      var: isSet(object.var)
        ? VariableDeclaration.fromJSON(object.var)
        : undefined,
      const: isSet(object.const)
        ? ConstantValue.fromJSON(object.const)
        : undefined,
    };
  },

  toJSON(message: Condition_Operand): unknown {
    const obj: any = {};
    message.var !== undefined &&
      (obj.var = message.var
        ? VariableDeclaration.toJSON(message.var)
        : undefined);
    message.const !== undefined &&
      (obj.const = message.const
        ? ConstantValue.toJSON(message.const)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Condition_Operand>, I>>(
    object: I
  ): Condition_Operand {
    const message = createBaseCondition_Operand();
    message.var =
      object.var !== undefined && object.var !== null
        ? VariableDeclaration.fromPartial(object.var)
        : undefined;
    message.const =
      object.const !== undefined && object.const !== null
        ? ConstantValue.fromPartial(object.const)
        : undefined;
    return message;
  },
};

function createBaseBosdynRobotState(): BosdynRobotState {
  return { serviceName: "", host: "", child: undefined, stateName: "" };
}

export const BosdynRobotState = {
  encode(
    message: BosdynRobotState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.serviceName !== "") {
      writer.uint32(10).string(message.serviceName);
    }
    if (message.host !== "") {
      writer.uint32(18).string(message.host);
    }
    if (message.child !== undefined) {
      Node.encode(message.child, writer.uint32(26).fork()).ldelim();
    }
    if (message.stateName !== "") {
      writer.uint32(34).string(message.stateName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BosdynRobotState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBosdynRobotState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serviceName = reader.string();
          break;
        case 2:
          message.host = reader.string();
          break;
        case 3:
          message.child = Node.decode(reader, reader.uint32());
          break;
        case 4:
          message.stateName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BosdynRobotState {
    return {
      serviceName: isSet(object.serviceName) ? String(object.serviceName) : "",
      host: isSet(object.host) ? String(object.host) : "",
      child: isSet(object.child) ? Node.fromJSON(object.child) : undefined,
      stateName: isSet(object.stateName) ? String(object.stateName) : "",
    };
  },

  toJSON(message: BosdynRobotState): unknown {
    const obj: any = {};
    message.serviceName !== undefined &&
      (obj.serviceName = message.serviceName);
    message.host !== undefined && (obj.host = message.host);
    message.child !== undefined &&
      (obj.child = message.child ? Node.toJSON(message.child) : undefined);
    message.stateName !== undefined && (obj.stateName = message.stateName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BosdynRobotState>, I>>(
    object: I
  ): BosdynRobotState {
    const message = createBaseBosdynRobotState();
    message.serviceName = object.serviceName ?? "";
    message.host = object.host ?? "";
    message.child =
      object.child !== undefined && object.child !== null
        ? Node.fromPartial(object.child)
        : undefined;
    message.stateName = object.stateName ?? "";
    return message;
  },
};

function createBaseBosdynDockState(): BosdynDockState {
  return { serviceName: "", host: "", child: undefined, stateName: "" };
}

export const BosdynDockState = {
  encode(
    message: BosdynDockState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.serviceName !== "") {
      writer.uint32(10).string(message.serviceName);
    }
    if (message.host !== "") {
      writer.uint32(18).string(message.host);
    }
    if (message.child !== undefined) {
      Node.encode(message.child, writer.uint32(26).fork()).ldelim();
    }
    if (message.stateName !== "") {
      writer.uint32(34).string(message.stateName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BosdynDockState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBosdynDockState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serviceName = reader.string();
          break;
        case 2:
          message.host = reader.string();
          break;
        case 3:
          message.child = Node.decode(reader, reader.uint32());
          break;
        case 4:
          message.stateName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BosdynDockState {
    return {
      serviceName: isSet(object.serviceName) ? String(object.serviceName) : "",
      host: isSet(object.host) ? String(object.host) : "",
      child: isSet(object.child) ? Node.fromJSON(object.child) : undefined,
      stateName: isSet(object.stateName) ? String(object.stateName) : "",
    };
  },

  toJSON(message: BosdynDockState): unknown {
    const obj: any = {};
    message.serviceName !== undefined &&
      (obj.serviceName = message.serviceName);
    message.host !== undefined && (obj.host = message.host);
    message.child !== undefined &&
      (obj.child = message.child ? Node.toJSON(message.child) : undefined);
    message.stateName !== undefined && (obj.stateName = message.stateName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BosdynDockState>, I>>(
    object: I
  ): BosdynDockState {
    const message = createBaseBosdynDockState();
    message.serviceName = object.serviceName ?? "";
    message.host = object.host ?? "";
    message.child =
      object.child !== undefined && object.child !== null
        ? Node.fromPartial(object.child)
        : undefined;
    message.stateName = object.stateName ?? "";
    return message;
  },
};

function createBaseBosdynRobotCommand(): BosdynRobotCommand {
  return { serviceName: "", host: "", command: undefined };
}

export const BosdynRobotCommand = {
  encode(
    message: BosdynRobotCommand,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.serviceName !== "") {
      writer.uint32(10).string(message.serviceName);
    }
    if (message.host !== "") {
      writer.uint32(18).string(message.host);
    }
    if (message.command !== undefined) {
      RobotCommand.encode(message.command, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BosdynRobotCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBosdynRobotCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serviceName = reader.string();
          break;
        case 2:
          message.host = reader.string();
          break;
        case 3:
          message.command = RobotCommand.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BosdynRobotCommand {
    return {
      serviceName: isSet(object.serviceName) ? String(object.serviceName) : "",
      host: isSet(object.host) ? String(object.host) : "",
      command: isSet(object.command)
        ? RobotCommand.fromJSON(object.command)
        : undefined,
    };
  },

  toJSON(message: BosdynRobotCommand): unknown {
    const obj: any = {};
    message.serviceName !== undefined &&
      (obj.serviceName = message.serviceName);
    message.host !== undefined && (obj.host = message.host);
    message.command !== undefined &&
      (obj.command = message.command
        ? RobotCommand.toJSON(message.command)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BosdynRobotCommand>, I>>(
    object: I
  ): BosdynRobotCommand {
    const message = createBaseBosdynRobotCommand();
    message.serviceName = object.serviceName ?? "";
    message.host = object.host ?? "";
    message.command =
      object.command !== undefined && object.command !== null
        ? RobotCommand.fromPartial(object.command)
        : undefined;
    return message;
  },
};

function createBaseBosdynPowerRequest(): BosdynPowerRequest {
  return { serviceName: "", host: "", request: 0 };
}

export const BosdynPowerRequest = {
  encode(
    message: BosdynPowerRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.serviceName !== "") {
      writer.uint32(10).string(message.serviceName);
    }
    if (message.host !== "") {
      writer.uint32(18).string(message.host);
    }
    if (message.request !== 0) {
      writer.uint32(32).int32(message.request);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BosdynPowerRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBosdynPowerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serviceName = reader.string();
          break;
        case 2:
          message.host = reader.string();
          break;
        case 4:
          message.request = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BosdynPowerRequest {
    return {
      serviceName: isSet(object.serviceName) ? String(object.serviceName) : "",
      host: isSet(object.host) ? String(object.host) : "",
      request: isSet(object.request)
        ? powerCommandRequest_RequestFromJSON(object.request)
        : 0,
    };
  },

  toJSON(message: BosdynPowerRequest): unknown {
    const obj: any = {};
    message.serviceName !== undefined &&
      (obj.serviceName = message.serviceName);
    message.host !== undefined && (obj.host = message.host);
    message.request !== undefined &&
      (obj.request = powerCommandRequest_RequestToJSON(message.request));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BosdynPowerRequest>, I>>(
    object: I
  ): BosdynPowerRequest {
    const message = createBaseBosdynPowerRequest();
    message.serviceName = object.serviceName ?? "";
    message.host = object.host ?? "";
    message.request = object.request ?? 0;
    return message;
  },
};

function createBaseBosdynNavigateTo(): BosdynNavigateTo {
  return {
    serviceName: "",
    host: "",
    destinationWaypointId: "",
    routeGenParams: undefined,
    travelParams: undefined,
    navigationFeedbackResponseBlackboardKey: "",
    navigateToResponseBlackboardKey: "",
  };
}

export const BosdynNavigateTo = {
  encode(
    message: BosdynNavigateTo,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.serviceName !== "") {
      writer.uint32(10).string(message.serviceName);
    }
    if (message.host !== "") {
      writer.uint32(18).string(message.host);
    }
    if (message.destinationWaypointId !== "") {
      writer.uint32(26).string(message.destinationWaypointId);
    }
    if (message.routeGenParams !== undefined) {
      RouteGenParams.encode(
        message.routeGenParams,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.travelParams !== undefined) {
      TravelParams.encode(
        message.travelParams,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.navigationFeedbackResponseBlackboardKey !== "") {
      writer.uint32(50).string(message.navigationFeedbackResponseBlackboardKey);
    }
    if (message.navigateToResponseBlackboardKey !== "") {
      writer.uint32(58).string(message.navigateToResponseBlackboardKey);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BosdynNavigateTo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBosdynNavigateTo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serviceName = reader.string();
          break;
        case 2:
          message.host = reader.string();
          break;
        case 3:
          message.destinationWaypointId = reader.string();
          break;
        case 4:
          message.routeGenParams = RouteGenParams.decode(
            reader,
            reader.uint32()
          );
          break;
        case 5:
          message.travelParams = TravelParams.decode(reader, reader.uint32());
          break;
        case 6:
          message.navigationFeedbackResponseBlackboardKey = reader.string();
          break;
        case 7:
          message.navigateToResponseBlackboardKey = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BosdynNavigateTo {
    return {
      serviceName: isSet(object.serviceName) ? String(object.serviceName) : "",
      host: isSet(object.host) ? String(object.host) : "",
      destinationWaypointId: isSet(object.destinationWaypointId)
        ? String(object.destinationWaypointId)
        : "",
      routeGenParams: isSet(object.routeGenParams)
        ? RouteGenParams.fromJSON(object.routeGenParams)
        : undefined,
      travelParams: isSet(object.travelParams)
        ? TravelParams.fromJSON(object.travelParams)
        : undefined,
      navigationFeedbackResponseBlackboardKey: isSet(
        object.navigationFeedbackResponseBlackboardKey
      )
        ? String(object.navigationFeedbackResponseBlackboardKey)
        : "",
      navigateToResponseBlackboardKey: isSet(
        object.navigateToResponseBlackboardKey
      )
        ? String(object.navigateToResponseBlackboardKey)
        : "",
    };
  },

  toJSON(message: BosdynNavigateTo): unknown {
    const obj: any = {};
    message.serviceName !== undefined &&
      (obj.serviceName = message.serviceName);
    message.host !== undefined && (obj.host = message.host);
    message.destinationWaypointId !== undefined &&
      (obj.destinationWaypointId = message.destinationWaypointId);
    message.routeGenParams !== undefined &&
      (obj.routeGenParams = message.routeGenParams
        ? RouteGenParams.toJSON(message.routeGenParams)
        : undefined);
    message.travelParams !== undefined &&
      (obj.travelParams = message.travelParams
        ? TravelParams.toJSON(message.travelParams)
        : undefined);
    message.navigationFeedbackResponseBlackboardKey !== undefined &&
      (obj.navigationFeedbackResponseBlackboardKey =
        message.navigationFeedbackResponseBlackboardKey);
    message.navigateToResponseBlackboardKey !== undefined &&
      (obj.navigateToResponseBlackboardKey =
        message.navigateToResponseBlackboardKey);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BosdynNavigateTo>, I>>(
    object: I
  ): BosdynNavigateTo {
    const message = createBaseBosdynNavigateTo();
    message.serviceName = object.serviceName ?? "";
    message.host = object.host ?? "";
    message.destinationWaypointId = object.destinationWaypointId ?? "";
    message.routeGenParams =
      object.routeGenParams !== undefined && object.routeGenParams !== null
        ? RouteGenParams.fromPartial(object.routeGenParams)
        : undefined;
    message.travelParams =
      object.travelParams !== undefined && object.travelParams !== null
        ? TravelParams.fromPartial(object.travelParams)
        : undefined;
    message.navigationFeedbackResponseBlackboardKey =
      object.navigationFeedbackResponseBlackboardKey ?? "";
    message.navigateToResponseBlackboardKey =
      object.navigateToResponseBlackboardKey ?? "";
    return message;
  },
};

function createBaseBosdynNavigateRoute(): BosdynNavigateRoute {
  return {
    serviceName: "",
    host: "",
    route: undefined,
    routeFollowParams: undefined,
    travelParams: undefined,
    navigationFeedbackResponseBlackboardKey: "",
    navigateRouteResponseBlackboardKey: "",
  };
}

export const BosdynNavigateRoute = {
  encode(
    message: BosdynNavigateRoute,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.serviceName !== "") {
      writer.uint32(10).string(message.serviceName);
    }
    if (message.host !== "") {
      writer.uint32(18).string(message.host);
    }
    if (message.route !== undefined) {
      Route.encode(message.route, writer.uint32(26).fork()).ldelim();
    }
    if (message.routeFollowParams !== undefined) {
      RouteFollowingParams.encode(
        message.routeFollowParams,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.travelParams !== undefined) {
      TravelParams.encode(
        message.travelParams,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.navigationFeedbackResponseBlackboardKey !== "") {
      writer.uint32(50).string(message.navigationFeedbackResponseBlackboardKey);
    }
    if (message.navigateRouteResponseBlackboardKey !== "") {
      writer.uint32(58).string(message.navigateRouteResponseBlackboardKey);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BosdynNavigateRoute {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBosdynNavigateRoute();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serviceName = reader.string();
          break;
        case 2:
          message.host = reader.string();
          break;
        case 3:
          message.route = Route.decode(reader, reader.uint32());
          break;
        case 4:
          message.routeFollowParams = RouteFollowingParams.decode(
            reader,
            reader.uint32()
          );
          break;
        case 5:
          message.travelParams = TravelParams.decode(reader, reader.uint32());
          break;
        case 6:
          message.navigationFeedbackResponseBlackboardKey = reader.string();
          break;
        case 7:
          message.navigateRouteResponseBlackboardKey = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BosdynNavigateRoute {
    return {
      serviceName: isSet(object.serviceName) ? String(object.serviceName) : "",
      host: isSet(object.host) ? String(object.host) : "",
      route: isSet(object.route) ? Route.fromJSON(object.route) : undefined,
      routeFollowParams: isSet(object.routeFollowParams)
        ? RouteFollowingParams.fromJSON(object.routeFollowParams)
        : undefined,
      travelParams: isSet(object.travelParams)
        ? TravelParams.fromJSON(object.travelParams)
        : undefined,
      navigationFeedbackResponseBlackboardKey: isSet(
        object.navigationFeedbackResponseBlackboardKey
      )
        ? String(object.navigationFeedbackResponseBlackboardKey)
        : "",
      navigateRouteResponseBlackboardKey: isSet(
        object.navigateRouteResponseBlackboardKey
      )
        ? String(object.navigateRouteResponseBlackboardKey)
        : "",
    };
  },

  toJSON(message: BosdynNavigateRoute): unknown {
    const obj: any = {};
    message.serviceName !== undefined &&
      (obj.serviceName = message.serviceName);
    message.host !== undefined && (obj.host = message.host);
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
    message.navigationFeedbackResponseBlackboardKey !== undefined &&
      (obj.navigationFeedbackResponseBlackboardKey =
        message.navigationFeedbackResponseBlackboardKey);
    message.navigateRouteResponseBlackboardKey !== undefined &&
      (obj.navigateRouteResponseBlackboardKey =
        message.navigateRouteResponseBlackboardKey);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BosdynNavigateRoute>, I>>(
    object: I
  ): BosdynNavigateRoute {
    const message = createBaseBosdynNavigateRoute();
    message.serviceName = object.serviceName ?? "";
    message.host = object.host ?? "";
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
    message.navigationFeedbackResponseBlackboardKey =
      object.navigationFeedbackResponseBlackboardKey ?? "";
    message.navigateRouteResponseBlackboardKey =
      object.navigateRouteResponseBlackboardKey ?? "";
    return message;
  },
};

function createBaseBosdynGraphNavState(): BosdynGraphNavState {
  return {
    serviceName: "",
    host: "",
    child: undefined,
    stateName: "",
    waypointId: "",
  };
}

export const BosdynGraphNavState = {
  encode(
    message: BosdynGraphNavState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.serviceName !== "") {
      writer.uint32(10).string(message.serviceName);
    }
    if (message.host !== "") {
      writer.uint32(18).string(message.host);
    }
    if (message.child !== undefined) {
      Node.encode(message.child, writer.uint32(26).fork()).ldelim();
    }
    if (message.stateName !== "") {
      writer.uint32(34).string(message.stateName);
    }
    if (message.waypointId !== "") {
      writer.uint32(42).string(message.waypointId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BosdynGraphNavState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBosdynGraphNavState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serviceName = reader.string();
          break;
        case 2:
          message.host = reader.string();
          break;
        case 3:
          message.child = Node.decode(reader, reader.uint32());
          break;
        case 4:
          message.stateName = reader.string();
          break;
        case 5:
          message.waypointId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BosdynGraphNavState {
    return {
      serviceName: isSet(object.serviceName) ? String(object.serviceName) : "",
      host: isSet(object.host) ? String(object.host) : "",
      child: isSet(object.child) ? Node.fromJSON(object.child) : undefined,
      stateName: isSet(object.stateName) ? String(object.stateName) : "",
      waypointId: isSet(object.waypointId) ? String(object.waypointId) : "",
    };
  },

  toJSON(message: BosdynGraphNavState): unknown {
    const obj: any = {};
    message.serviceName !== undefined &&
      (obj.serviceName = message.serviceName);
    message.host !== undefined && (obj.host = message.host);
    message.child !== undefined &&
      (obj.child = message.child ? Node.toJSON(message.child) : undefined);
    message.stateName !== undefined && (obj.stateName = message.stateName);
    message.waypointId !== undefined && (obj.waypointId = message.waypointId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BosdynGraphNavState>, I>>(
    object: I
  ): BosdynGraphNavState {
    const message = createBaseBosdynGraphNavState();
    message.serviceName = object.serviceName ?? "";
    message.host = object.host ?? "";
    message.child =
      object.child !== undefined && object.child !== null
        ? Node.fromPartial(object.child)
        : undefined;
    message.stateName = object.stateName ?? "";
    message.waypointId = object.waypointId ?? "";
    return message;
  },
};

function createBaseBosdynGraphNavLocalize(): BosdynGraphNavLocalize {
  return { serviceName: "", host: "", localizationRequest: undefined };
}

export const BosdynGraphNavLocalize = {
  encode(
    message: BosdynGraphNavLocalize,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.serviceName !== "") {
      writer.uint32(10).string(message.serviceName);
    }
    if (message.host !== "") {
      writer.uint32(18).string(message.host);
    }
    if (message.localizationRequest !== undefined) {
      SetLocalizationRequest.encode(
        message.localizationRequest,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): BosdynGraphNavLocalize {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBosdynGraphNavLocalize();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serviceName = reader.string();
          break;
        case 2:
          message.host = reader.string();
          break;
        case 3:
          message.localizationRequest = SetLocalizationRequest.decode(
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

  fromJSON(object: any): BosdynGraphNavLocalize {
    return {
      serviceName: isSet(object.serviceName) ? String(object.serviceName) : "",
      host: isSet(object.host) ? String(object.host) : "",
      localizationRequest: isSet(object.localizationRequest)
        ? SetLocalizationRequest.fromJSON(object.localizationRequest)
        : undefined,
    };
  },

  toJSON(message: BosdynGraphNavLocalize): unknown {
    const obj: any = {};
    message.serviceName !== undefined &&
      (obj.serviceName = message.serviceName);
    message.host !== undefined && (obj.host = message.host);
    message.localizationRequest !== undefined &&
      (obj.localizationRequest = message.localizationRequest
        ? SetLocalizationRequest.toJSON(message.localizationRequest)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BosdynGraphNavLocalize>, I>>(
    object: I
  ): BosdynGraphNavLocalize {
    const message = createBaseBosdynGraphNavLocalize();
    message.serviceName = object.serviceName ?? "";
    message.host = object.host ?? "";
    message.localizationRequest =
      object.localizationRequest !== undefined &&
      object.localizationRequest !== null
        ? SetLocalizationRequest.fromPartial(object.localizationRequest)
        : undefined;
    return message;
  },
};

function createBaseBosdynRecordEvent(): BosdynRecordEvent {
  return { serviceName: "", host: "", event: undefined };
}

export const BosdynRecordEvent = {
  encode(
    message: BosdynRecordEvent,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.serviceName !== "") {
      writer.uint32(10).string(message.serviceName);
    }
    if (message.host !== "") {
      writer.uint32(18).string(message.host);
    }
    if (message.event !== undefined) {
      Event.encode(message.event, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BosdynRecordEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBosdynRecordEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serviceName = reader.string();
          break;
        case 2:
          message.host = reader.string();
          break;
        case 3:
          message.event = Event.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BosdynRecordEvent {
    return {
      serviceName: isSet(object.serviceName) ? String(object.serviceName) : "",
      host: isSet(object.host) ? String(object.host) : "",
      event: isSet(object.event) ? Event.fromJSON(object.event) : undefined,
    };
  },

  toJSON(message: BosdynRecordEvent): unknown {
    const obj: any = {};
    message.serviceName !== undefined &&
      (obj.serviceName = message.serviceName);
    message.host !== undefined && (obj.host = message.host);
    message.event !== undefined &&
      (obj.event = message.event ? Event.toJSON(message.event) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BosdynRecordEvent>, I>>(
    object: I
  ): BosdynRecordEvent {
    const message = createBaseBosdynRecordEvent();
    message.serviceName = object.serviceName ?? "";
    message.host = object.host ?? "";
    message.event =
      object.event !== undefined && object.event !== null
        ? Event.fromPartial(object.event)
        : undefined;
    return message;
  },
};

function createBaseRemoteGrpc(): RemoteGrpc {
  return {
    host: "",
    serviceName: "",
    timeout: 0,
    leaseResources: [],
    inputs: [],
  };
}

export const RemoteGrpc = {
  encode(
    message: RemoteGrpc,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.host !== "") {
      writer.uint32(10).string(message.host);
    }
    if (message.serviceName !== "") {
      writer.uint32(26).string(message.serviceName);
    }
    if (message.timeout !== 0) {
      writer.uint32(37).float(message.timeout);
    }
    for (const v of message.leaseResources) {
      writer.uint32(42).string(v!);
    }
    for (const v of message.inputs) {
      KeyValue.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoteGrpc {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoteGrpc();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.host = reader.string();
          break;
        case 3:
          message.serviceName = reader.string();
          break;
        case 4:
          message.timeout = reader.float();
          break;
        case 5:
          message.leaseResources.push(reader.string());
          break;
        case 6:
          message.inputs.push(KeyValue.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RemoteGrpc {
    return {
      host: isSet(object.host) ? String(object.host) : "",
      serviceName: isSet(object.serviceName) ? String(object.serviceName) : "",
      timeout: isSet(object.timeout) ? Number(object.timeout) : 0,
      leaseResources: Array.isArray(object?.leaseResources)
        ? object.leaseResources.map((e: any) => String(e))
        : [],
      inputs: Array.isArray(object?.inputs)
        ? object.inputs.map((e: any) => KeyValue.fromJSON(e))
        : [],
    };
  },

  toJSON(message: RemoteGrpc): unknown {
    const obj: any = {};
    message.host !== undefined && (obj.host = message.host);
    message.serviceName !== undefined &&
      (obj.serviceName = message.serviceName);
    message.timeout !== undefined && (obj.timeout = message.timeout);
    if (message.leaseResources) {
      obj.leaseResources = message.leaseResources.map((e) => e);
    } else {
      obj.leaseResources = [];
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

  fromPartial<I extends Exact<DeepPartial<RemoteGrpc>, I>>(
    object: I
  ): RemoteGrpc {
    const message = createBaseRemoteGrpc();
    message.host = object.host ?? "";
    message.serviceName = object.serviceName ?? "";
    message.timeout = object.timeout ?? 0;
    message.leaseResources = object.leaseResources?.map((e) => e) || [];
    message.inputs = object.inputs?.map((e) => KeyValue.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSleep(): Sleep {
  return { seconds: 0, restartAfterStop: false };
}

export const Sleep = {
  encode(message: Sleep, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.seconds !== 0) {
      writer.uint32(13).float(message.seconds);
    }
    if (message.restartAfterStop === true) {
      writer.uint32(16).bool(message.restartAfterStop);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Sleep {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSleep();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.seconds = reader.float();
          break;
        case 2:
          message.restartAfterStop = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Sleep {
    return {
      seconds: isSet(object.seconds) ? Number(object.seconds) : 0,
      restartAfterStop: isSet(object.restartAfterStop)
        ? Boolean(object.restartAfterStop)
        : false,
    };
  },

  toJSON(message: Sleep): unknown {
    const obj: any = {};
    message.seconds !== undefined && (obj.seconds = message.seconds);
    message.restartAfterStop !== undefined &&
      (obj.restartAfterStop = message.restartAfterStop);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Sleep>, I>>(object: I): Sleep {
    const message = createBaseSleep();
    message.seconds = object.seconds ?? 0;
    message.restartAfterStop = object.restartAfterStop ?? false;
    return message;
  },
};

function createBasePrompt(): Prompt {
  return {
    alwaysReprompt: false,
    text: "",
    source: "",
    options: [],
    child: undefined,
    forAutonomousProcessing: false,
  };
}

export const Prompt = {
  encode(
    message: Prompt,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.alwaysReprompt === true) {
      writer.uint32(8).bool(message.alwaysReprompt);
    }
    if (message.text !== "") {
      writer.uint32(18).string(message.text);
    }
    if (message.source !== "") {
      writer.uint32(26).string(message.source);
    }
    for (const v of message.options) {
      Prompt_Option.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.child !== undefined) {
      Node.encode(message.child, writer.uint32(42).fork()).ldelim();
    }
    if (message.forAutonomousProcessing === true) {
      writer.uint32(48).bool(message.forAutonomousProcessing);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Prompt {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePrompt();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.alwaysReprompt = reader.bool();
          break;
        case 2:
          message.text = reader.string();
          break;
        case 3:
          message.source = reader.string();
          break;
        case 4:
          message.options.push(Prompt_Option.decode(reader, reader.uint32()));
          break;
        case 5:
          message.child = Node.decode(reader, reader.uint32());
          break;
        case 6:
          message.forAutonomousProcessing = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Prompt {
    return {
      alwaysReprompt: isSet(object.alwaysReprompt)
        ? Boolean(object.alwaysReprompt)
        : false,
      text: isSet(object.text) ? String(object.text) : "",
      source: isSet(object.source) ? String(object.source) : "",
      options: Array.isArray(object?.options)
        ? object.options.map((e: any) => Prompt_Option.fromJSON(e))
        : [],
      child: isSet(object.child) ? Node.fromJSON(object.child) : undefined,
      forAutonomousProcessing: isSet(object.forAutonomousProcessing)
        ? Boolean(object.forAutonomousProcessing)
        : false,
    };
  },

  toJSON(message: Prompt): unknown {
    const obj: any = {};
    message.alwaysReprompt !== undefined &&
      (obj.alwaysReprompt = message.alwaysReprompt);
    message.text !== undefined && (obj.text = message.text);
    message.source !== undefined && (obj.source = message.source);
    if (message.options) {
      obj.options = message.options.map((e) =>
        e ? Prompt_Option.toJSON(e) : undefined
      );
    } else {
      obj.options = [];
    }
    message.child !== undefined &&
      (obj.child = message.child ? Node.toJSON(message.child) : undefined);
    message.forAutonomousProcessing !== undefined &&
      (obj.forAutonomousProcessing = message.forAutonomousProcessing);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Prompt>, I>>(object: I): Prompt {
    const message = createBasePrompt();
    message.alwaysReprompt = object.alwaysReprompt ?? false;
    message.text = object.text ?? "";
    message.source = object.source ?? "";
    message.options =
      object.options?.map((e) => Prompt_Option.fromPartial(e)) || [];
    message.child =
      object.child !== undefined && object.child !== null
        ? Node.fromPartial(object.child)
        : undefined;
    message.forAutonomousProcessing = object.forAutonomousProcessing ?? false;
    return message;
  },
};

function createBasePrompt_Option(): Prompt_Option {
  return { text: "", answerCode: 0 };
}

export const Prompt_Option = {
  encode(
    message: Prompt_Option,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.text !== "") {
      writer.uint32(10).string(message.text);
    }
    if (message.answerCode !== 0) {
      writer.uint32(16).int64(message.answerCode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Prompt_Option {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePrompt_Option();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.text = reader.string();
          break;
        case 2:
          message.answerCode = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Prompt_Option {
    return {
      text: isSet(object.text) ? String(object.text) : "",
      answerCode: isSet(object.answerCode) ? Number(object.answerCode) : 0,
    };
  },

  toJSON(message: Prompt_Option): unknown {
    const obj: any = {};
    message.text !== undefined && (obj.text = message.text);
    message.answerCode !== undefined &&
      (obj.answerCode = Math.round(message.answerCode));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Prompt_Option>, I>>(
    object: I
  ): Prompt_Option {
    const message = createBasePrompt_Option();
    message.text = object.text ?? "";
    message.answerCode = object.answerCode ?? 0;
    return message;
  },
};

function createBaseSpotCamPtz(): SpotCamPtz {
  return {
    serviceName: "",
    host: "",
    ptzPosition: undefined,
    adjustParameters: undefined,
  };
}

export const SpotCamPtz = {
  encode(
    message: SpotCamPtz,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.serviceName !== "") {
      writer.uint32(10).string(message.serviceName);
    }
    if (message.host !== "") {
      writer.uint32(18).string(message.host);
    }
    if (message.ptzPosition !== undefined) {
      PtzPosition.encode(
        message.ptzPosition,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.adjustParameters !== undefined) {
      SpotCamPtz_AdjustParameters.encode(
        message.adjustParameters,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SpotCamPtz {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpotCamPtz();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serviceName = reader.string();
          break;
        case 2:
          message.host = reader.string();
          break;
        case 3:
          message.ptzPosition = PtzPosition.decode(reader, reader.uint32());
          break;
        case 4:
          message.adjustParameters = SpotCamPtz_AdjustParameters.decode(
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

  fromJSON(object: any): SpotCamPtz {
    return {
      serviceName: isSet(object.serviceName) ? String(object.serviceName) : "",
      host: isSet(object.host) ? String(object.host) : "",
      ptzPosition: isSet(object.ptzPosition)
        ? PtzPosition.fromJSON(object.ptzPosition)
        : undefined,
      adjustParameters: isSet(object.adjustParameters)
        ? SpotCamPtz_AdjustParameters.fromJSON(object.adjustParameters)
        : undefined,
    };
  },

  toJSON(message: SpotCamPtz): unknown {
    const obj: any = {};
    message.serviceName !== undefined &&
      (obj.serviceName = message.serviceName);
    message.host !== undefined && (obj.host = message.host);
    message.ptzPosition !== undefined &&
      (obj.ptzPosition = message.ptzPosition
        ? PtzPosition.toJSON(message.ptzPosition)
        : undefined);
    message.adjustParameters !== undefined &&
      (obj.adjustParameters = message.adjustParameters
        ? SpotCamPtz_AdjustParameters.toJSON(message.adjustParameters)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SpotCamPtz>, I>>(
    object: I
  ): SpotCamPtz {
    const message = createBaseSpotCamPtz();
    message.serviceName = object.serviceName ?? "";
    message.host = object.host ?? "";
    message.ptzPosition =
      object.ptzPosition !== undefined && object.ptzPosition !== null
        ? PtzPosition.fromPartial(object.ptzPosition)
        : undefined;
    message.adjustParameters =
      object.adjustParameters !== undefined && object.adjustParameters !== null
        ? SpotCamPtz_AdjustParameters.fromPartial(object.adjustParameters)
        : undefined;
    return message;
  },
};

function createBaseSpotCamPtz_AdjustParameters(): SpotCamPtz_AdjustParameters {
  return {
    localizationVarname: "",
    waypointId: "",
    waypointTformBody: undefined,
  };
}

export const SpotCamPtz_AdjustParameters = {
  encode(
    message: SpotCamPtz_AdjustParameters,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.localizationVarname !== "") {
      writer.uint32(34).string(message.localizationVarname);
    }
    if (message.waypointId !== "") {
      writer.uint32(42).string(message.waypointId);
    }
    if (message.waypointTformBody !== undefined) {
      SE3Pose.encode(
        message.waypointTformBody,
        writer.uint32(50).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SpotCamPtz_AdjustParameters {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpotCamPtz_AdjustParameters();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 4:
          message.localizationVarname = reader.string();
          break;
        case 5:
          message.waypointId = reader.string();
          break;
        case 6:
          message.waypointTformBody = SE3Pose.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SpotCamPtz_AdjustParameters {
    return {
      localizationVarname: isSet(object.localizationVarname)
        ? String(object.localizationVarname)
        : "",
      waypointId: isSet(object.waypointId) ? String(object.waypointId) : "",
      waypointTformBody: isSet(object.waypointTformBody)
        ? SE3Pose.fromJSON(object.waypointTformBody)
        : undefined,
    };
  },

  toJSON(message: SpotCamPtz_AdjustParameters): unknown {
    const obj: any = {};
    message.localizationVarname !== undefined &&
      (obj.localizationVarname = message.localizationVarname);
    message.waypointId !== undefined && (obj.waypointId = message.waypointId);
    message.waypointTformBody !== undefined &&
      (obj.waypointTformBody = message.waypointTformBody
        ? SE3Pose.toJSON(message.waypointTformBody)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SpotCamPtz_AdjustParameters>, I>>(
    object: I
  ): SpotCamPtz_AdjustParameters {
    const message = createBaseSpotCamPtz_AdjustParameters();
    message.localizationVarname = object.localizationVarname ?? "";
    message.waypointId = object.waypointId ?? "";
    message.waypointTformBody =
      object.waypointTformBody !== undefined &&
      object.waypointTformBody !== null
        ? SE3Pose.fromPartial(object.waypointTformBody)
        : undefined;
    return message;
  },
};

function createBaseSpotCamStoreMedia(): SpotCamStoreMedia {
  return { serviceName: "", host: "", camera: undefined, type: 0, tag: "" };
}

export const SpotCamStoreMedia = {
  encode(
    message: SpotCamStoreMedia,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.serviceName !== "") {
      writer.uint32(10).string(message.serviceName);
    }
    if (message.host !== "") {
      writer.uint32(18).string(message.host);
    }
    if (message.camera !== undefined) {
      Camera.encode(message.camera, writer.uint32(26).fork()).ldelim();
    }
    if (message.type !== 0) {
      writer.uint32(32).int32(message.type);
    }
    if (message.tag !== "") {
      writer.uint32(42).string(message.tag);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SpotCamStoreMedia {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpotCamStoreMedia();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serviceName = reader.string();
          break;
        case 2:
          message.host = reader.string();
          break;
        case 3:
          message.camera = Camera.decode(reader, reader.uint32());
          break;
        case 4:
          message.type = reader.int32() as any;
          break;
        case 5:
          message.tag = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SpotCamStoreMedia {
    return {
      serviceName: isSet(object.serviceName) ? String(object.serviceName) : "",
      host: isSet(object.host) ? String(object.host) : "",
      camera: isSet(object.camera) ? Camera.fromJSON(object.camera) : undefined,
      type: isSet(object.type) ? logpoint_RecordTypeFromJSON(object.type) : 0,
      tag: isSet(object.tag) ? String(object.tag) : "",
    };
  },

  toJSON(message: SpotCamStoreMedia): unknown {
    const obj: any = {};
    message.serviceName !== undefined &&
      (obj.serviceName = message.serviceName);
    message.host !== undefined && (obj.host = message.host);
    message.camera !== undefined &&
      (obj.camera = message.camera ? Camera.toJSON(message.camera) : undefined);
    message.type !== undefined &&
      (obj.type = logpoint_RecordTypeToJSON(message.type));
    message.tag !== undefined && (obj.tag = message.tag);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SpotCamStoreMedia>, I>>(
    object: I
  ): SpotCamStoreMedia {
    const message = createBaseSpotCamStoreMedia();
    message.serviceName = object.serviceName ?? "";
    message.host = object.host ?? "";
    message.camera =
      object.camera !== undefined && object.camera !== null
        ? Camera.fromPartial(object.camera)
        : undefined;
    message.type = object.type ?? 0;
    message.tag = object.tag ?? "";
    return message;
  },
};

function createBaseSpotCamLed(): SpotCamLed {
  return { serviceName: "", host: "", brightnesses: {} };
}

export const SpotCamLed = {
  encode(
    message: SpotCamLed,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.serviceName !== "") {
      writer.uint32(10).string(message.serviceName);
    }
    if (message.host !== "") {
      writer.uint32(18).string(message.host);
    }
    Object.entries(message.brightnesses).forEach(([key, value]) => {
      SpotCamLed_BrightnessesEntry.encode(
        { key: key as any, value },
        writer.uint32(26).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SpotCamLed {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpotCamLed();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serviceName = reader.string();
          break;
        case 2:
          message.host = reader.string();
          break;
        case 3:
          const entry3 = SpotCamLed_BrightnessesEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry3.value !== undefined) {
            message.brightnesses[entry3.key] = entry3.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SpotCamLed {
    return {
      serviceName: isSet(object.serviceName) ? String(object.serviceName) : "",
      host: isSet(object.host) ? String(object.host) : "",
      brightnesses: isObject(object.brightnesses)
        ? Object.entries(object.brightnesses).reduce<{ [key: number]: number }>(
            (acc, [key, value]) => {
              acc[Number(key)] = Number(value);
              return acc;
            },
            {}
          )
        : {},
    };
  },

  toJSON(message: SpotCamLed): unknown {
    const obj: any = {};
    message.serviceName !== undefined &&
      (obj.serviceName = message.serviceName);
    message.host !== undefined && (obj.host = message.host);
    obj.brightnesses = {};
    if (message.brightnesses) {
      Object.entries(message.brightnesses).forEach(([k, v]) => {
        obj.brightnesses[k] = v;
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SpotCamLed>, I>>(
    object: I
  ): SpotCamLed {
    const message = createBaseSpotCamLed();
    message.serviceName = object.serviceName ?? "";
    message.host = object.host ?? "";
    message.brightnesses = Object.entries(object.brightnesses ?? {}).reduce<{
      [key: number]: number;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[Number(key)] = Number(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseSpotCamLed_BrightnessesEntry(): SpotCamLed_BrightnessesEntry {
  return { key: 0, value: 0 };
}

export const SpotCamLed_BrightnessesEntry = {
  encode(
    message: SpotCamLed_BrightnessesEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== 0) {
      writer.uint32(8).int32(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(21).float(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SpotCamLed_BrightnessesEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpotCamLed_BrightnessesEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.int32();
          break;
        case 2:
          message.value = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SpotCamLed_BrightnessesEntry {
    return {
      key: isSet(object.key) ? Number(object.key) : 0,
      value: isSet(object.value) ? Number(object.value) : 0,
    };
  },

  toJSON(message: SpotCamLed_BrightnessesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = Math.round(message.key));
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SpotCamLed_BrightnessesEntry>, I>>(
    object: I
  ): SpotCamLed_BrightnessesEntry {
    const message = createBaseSpotCamLed_BrightnessesEntry();
    message.key = object.key ?? 0;
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseSpotCamResetAutofocus(): SpotCamResetAutofocus {
  return { serviceName: "", host: "" };
}

export const SpotCamResetAutofocus = {
  encode(
    message: SpotCamResetAutofocus,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.serviceName !== "") {
      writer.uint32(10).string(message.serviceName);
    }
    if (message.host !== "") {
      writer.uint32(18).string(message.host);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SpotCamResetAutofocus {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpotCamResetAutofocus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serviceName = reader.string();
          break;
        case 2:
          message.host = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SpotCamResetAutofocus {
    return {
      serviceName: isSet(object.serviceName) ? String(object.serviceName) : "",
      host: isSet(object.host) ? String(object.host) : "",
    };
  },

  toJSON(message: SpotCamResetAutofocus): unknown {
    const obj: any = {};
    message.serviceName !== undefined &&
      (obj.serviceName = message.serviceName);
    message.host !== undefined && (obj.host = message.host);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SpotCamResetAutofocus>, I>>(
    object: I
  ): SpotCamResetAutofocus {
    const message = createBaseSpotCamResetAutofocus();
    message.serviceName = object.serviceName ?? "";
    message.host = object.host ?? "";
    return message;
  },
};

function createBaseDock(): Dock {
  return {
    serviceName: "",
    host: "",
    dockingStationId: 0,
    child: undefined,
    commandStatusName: "",
    feedbackStatusName: "",
    prepPoseBehavior: 0,
    dockingCommandFeedbackResponseBlackboardKey: "",
    dockingCommandResponseBlackboardKey: "",
  };
}

export const Dock = {
  encode(message: Dock, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.serviceName !== "") {
      writer.uint32(10).string(message.serviceName);
    }
    if (message.host !== "") {
      writer.uint32(18).string(message.host);
    }
    if (message.dockingStationId !== 0) {
      writer.uint32(24).uint32(message.dockingStationId);
    }
    if (message.child !== undefined) {
      Node.encode(message.child, writer.uint32(34).fork()).ldelim();
    }
    if (message.commandStatusName !== "") {
      writer.uint32(42).string(message.commandStatusName);
    }
    if (message.feedbackStatusName !== "") {
      writer.uint32(50).string(message.feedbackStatusName);
    }
    if (message.prepPoseBehavior !== 0) {
      writer.uint32(56).int32(message.prepPoseBehavior);
    }
    if (message.dockingCommandFeedbackResponseBlackboardKey !== "") {
      writer
        .uint32(66)
        .string(message.dockingCommandFeedbackResponseBlackboardKey);
    }
    if (message.dockingCommandResponseBlackboardKey !== "") {
      writer.uint32(74).string(message.dockingCommandResponseBlackboardKey);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Dock {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serviceName = reader.string();
          break;
        case 2:
          message.host = reader.string();
          break;
        case 3:
          message.dockingStationId = reader.uint32();
          break;
        case 4:
          message.child = Node.decode(reader, reader.uint32());
          break;
        case 5:
          message.commandStatusName = reader.string();
          break;
        case 6:
          message.feedbackStatusName = reader.string();
          break;
        case 7:
          message.prepPoseBehavior = reader.int32() as any;
          break;
        case 8:
          message.dockingCommandFeedbackResponseBlackboardKey = reader.string();
          break;
        case 9:
          message.dockingCommandResponseBlackboardKey = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Dock {
    return {
      serviceName: isSet(object.serviceName) ? String(object.serviceName) : "",
      host: isSet(object.host) ? String(object.host) : "",
      dockingStationId: isSet(object.dockingStationId)
        ? Number(object.dockingStationId)
        : 0,
      child: isSet(object.child) ? Node.fromJSON(object.child) : undefined,
      commandStatusName: isSet(object.commandStatusName)
        ? String(object.commandStatusName)
        : "",
      feedbackStatusName: isSet(object.feedbackStatusName)
        ? String(object.feedbackStatusName)
        : "",
      prepPoseBehavior: isSet(object.prepPoseBehavior)
        ? prepPoseBehaviorFromJSON(object.prepPoseBehavior)
        : 0,
      dockingCommandFeedbackResponseBlackboardKey: isSet(
        object.dockingCommandFeedbackResponseBlackboardKey
      )
        ? String(object.dockingCommandFeedbackResponseBlackboardKey)
        : "",
      dockingCommandResponseBlackboardKey: isSet(
        object.dockingCommandResponseBlackboardKey
      )
        ? String(object.dockingCommandResponseBlackboardKey)
        : "",
    };
  },

  toJSON(message: Dock): unknown {
    const obj: any = {};
    message.serviceName !== undefined &&
      (obj.serviceName = message.serviceName);
    message.host !== undefined && (obj.host = message.host);
    message.dockingStationId !== undefined &&
      (obj.dockingStationId = Math.round(message.dockingStationId));
    message.child !== undefined &&
      (obj.child = message.child ? Node.toJSON(message.child) : undefined);
    message.commandStatusName !== undefined &&
      (obj.commandStatusName = message.commandStatusName);
    message.feedbackStatusName !== undefined &&
      (obj.feedbackStatusName = message.feedbackStatusName);
    message.prepPoseBehavior !== undefined &&
      (obj.prepPoseBehavior = prepPoseBehaviorToJSON(message.prepPoseBehavior));
    message.dockingCommandFeedbackResponseBlackboardKey !== undefined &&
      (obj.dockingCommandFeedbackResponseBlackboardKey =
        message.dockingCommandFeedbackResponseBlackboardKey);
    message.dockingCommandResponseBlackboardKey !== undefined &&
      (obj.dockingCommandResponseBlackboardKey =
        message.dockingCommandResponseBlackboardKey);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Dock>, I>>(object: I): Dock {
    const message = createBaseDock();
    message.serviceName = object.serviceName ?? "";
    message.host = object.host ?? "";
    message.dockingStationId = object.dockingStationId ?? 0;
    message.child =
      object.child !== undefined && object.child !== null
        ? Node.fromPartial(object.child)
        : undefined;
    message.commandStatusName = object.commandStatusName ?? "";
    message.feedbackStatusName = object.feedbackStatusName ?? "";
    message.prepPoseBehavior = object.prepPoseBehavior ?? 0;
    message.dockingCommandFeedbackResponseBlackboardKey =
      object.dockingCommandFeedbackResponseBlackboardKey ?? "";
    message.dockingCommandResponseBlackboardKey =
      object.dockingCommandResponseBlackboardKey ?? "";
    return message;
  },
};

function createBaseStoreMetadata(): StoreMetadata {
  return {
    serviceName: "",
    host: "",
    acquireDataRequestName: "",
    metadataName: "",
    metadataChannel: "",
  };
}

export const StoreMetadata = {
  encode(
    message: StoreMetadata,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.serviceName !== "") {
      writer.uint32(10).string(message.serviceName);
    }
    if (message.host !== "") {
      writer.uint32(18).string(message.host);
    }
    if (message.acquireDataRequestName !== "") {
      writer.uint32(26).string(message.acquireDataRequestName);
    }
    if (message.metadataName !== "") {
      writer.uint32(42).string(message.metadataName);
    }
    if (message.metadataChannel !== "") {
      writer.uint32(50).string(message.metadataChannel);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StoreMetadata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStoreMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serviceName = reader.string();
          break;
        case 2:
          message.host = reader.string();
          break;
        case 3:
          message.acquireDataRequestName = reader.string();
          break;
        case 5:
          message.metadataName = reader.string();
          break;
        case 6:
          message.metadataChannel = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StoreMetadata {
    return {
      serviceName: isSet(object.serviceName) ? String(object.serviceName) : "",
      host: isSet(object.host) ? String(object.host) : "",
      acquireDataRequestName: isSet(object.acquireDataRequestName)
        ? String(object.acquireDataRequestName)
        : "",
      metadataName: isSet(object.metadataName)
        ? String(object.metadataName)
        : "",
      metadataChannel: isSet(object.metadataChannel)
        ? String(object.metadataChannel)
        : "",
    };
  },

  toJSON(message: StoreMetadata): unknown {
    const obj: any = {};
    message.serviceName !== undefined &&
      (obj.serviceName = message.serviceName);
    message.host !== undefined && (obj.host = message.host);
    message.acquireDataRequestName !== undefined &&
      (obj.acquireDataRequestName = message.acquireDataRequestName);
    message.metadataName !== undefined &&
      (obj.metadataName = message.metadataName);
    message.metadataChannel !== undefined &&
      (obj.metadataChannel = message.metadataChannel);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StoreMetadata>, I>>(
    object: I
  ): StoreMetadata {
    const message = createBaseStoreMetadata();
    message.serviceName = object.serviceName ?? "";
    message.host = object.host ?? "";
    message.acquireDataRequestName = object.acquireDataRequestName ?? "";
    message.metadataName = object.metadataName ?? "";
    message.metadataChannel = object.metadataChannel ?? "";
    return message;
  },
};

function createBaseDataAcquisition(): DataAcquisition {
  return {
    serviceName: "",
    host: "",
    request: undefined,
    completionBehavior: 0,
    groupNameFormat: "",
    requestNameInBlackboard: "",
  };
}

export const DataAcquisition = {
  encode(
    message: DataAcquisition,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.serviceName !== "") {
      writer.uint32(10).string(message.serviceName);
    }
    if (message.host !== "") {
      writer.uint32(18).string(message.host);
    }
    if (message.request !== undefined) {
      AcquireDataRequest.encode(
        message.request,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.completionBehavior !== 0) {
      writer.uint32(32).int32(message.completionBehavior);
    }
    if (message.groupNameFormat !== "") {
      writer.uint32(42).string(message.groupNameFormat);
    }
    if (message.requestNameInBlackboard !== "") {
      writer.uint32(50).string(message.requestNameInBlackboard);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DataAcquisition {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDataAcquisition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serviceName = reader.string();
          break;
        case 2:
          message.host = reader.string();
          break;
        case 3:
          message.request = AcquireDataRequest.decode(reader, reader.uint32());
          break;
        case 4:
          message.completionBehavior = reader.int32() as any;
          break;
        case 5:
          message.groupNameFormat = reader.string();
          break;
        case 6:
          message.requestNameInBlackboard = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DataAcquisition {
    return {
      serviceName: isSet(object.serviceName) ? String(object.serviceName) : "",
      host: isSet(object.host) ? String(object.host) : "",
      request: isSet(object.request)
        ? AcquireDataRequest.fromJSON(object.request)
        : undefined,
      completionBehavior: isSet(object.completionBehavior)
        ? dataAcquisition_CompletionBehaviorFromJSON(object.completionBehavior)
        : 0,
      groupNameFormat: isSet(object.groupNameFormat)
        ? String(object.groupNameFormat)
        : "",
      requestNameInBlackboard: isSet(object.requestNameInBlackboard)
        ? String(object.requestNameInBlackboard)
        : "",
    };
  },

  toJSON(message: DataAcquisition): unknown {
    const obj: any = {};
    message.serviceName !== undefined &&
      (obj.serviceName = message.serviceName);
    message.host !== undefined && (obj.host = message.host);
    message.request !== undefined &&
      (obj.request = message.request
        ? AcquireDataRequest.toJSON(message.request)
        : undefined);
    message.completionBehavior !== undefined &&
      (obj.completionBehavior = dataAcquisition_CompletionBehaviorToJSON(
        message.completionBehavior
      ));
    message.groupNameFormat !== undefined &&
      (obj.groupNameFormat = message.groupNameFormat);
    message.requestNameInBlackboard !== undefined &&
      (obj.requestNameInBlackboard = message.requestNameInBlackboard);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DataAcquisition>, I>>(
    object: I
  ): DataAcquisition {
    const message = createBaseDataAcquisition();
    message.serviceName = object.serviceName ?? "";
    message.host = object.host ?? "";
    message.request =
      object.request !== undefined && object.request !== null
        ? AcquireDataRequest.fromPartial(object.request)
        : undefined;
    message.completionBehavior = object.completionBehavior ?? 0;
    message.groupNameFormat = object.groupNameFormat ?? "";
    message.requestNameInBlackboard = object.requestNameInBlackboard ?? "";
    return message;
  },
};

function createBaseRetainLease(): RetainLease {
  return { serviceName: "", host: "" };
}

export const RetainLease = {
  encode(
    message: RetainLease,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.serviceName !== "") {
      writer.uint32(10).string(message.serviceName);
    }
    if (message.host !== "") {
      writer.uint32(18).string(message.host);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RetainLease {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRetainLease();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serviceName = reader.string();
          break;
        case 2:
          message.host = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RetainLease {
    return {
      serviceName: isSet(object.serviceName) ? String(object.serviceName) : "",
      host: isSet(object.host) ? String(object.host) : "",
    };
  },

  toJSON(message: RetainLease): unknown {
    const obj: any = {};
    message.serviceName !== undefined &&
      (obj.serviceName = message.serviceName);
    message.host !== undefined && (obj.host = message.host);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RetainLease>, I>>(
    object: I
  ): RetainLease {
    const message = createBaseRetainLease();
    message.serviceName = object.serviceName ?? "";
    message.host = object.host ?? "";
    return message;
  },
};

function createBaseDefineBlackboard(): DefineBlackboard {
  return { blackboardVariables: [], child: undefined };
}

export const DefineBlackboard = {
  encode(
    message: DefineBlackboard,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.blackboardVariables) {
      KeyValue.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.child !== undefined) {
      Node.encode(message.child, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DefineBlackboard {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDefineBlackboard();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.blackboardVariables.push(
            KeyValue.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.child = Node.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DefineBlackboard {
    return {
      blackboardVariables: Array.isArray(object?.blackboardVariables)
        ? object.blackboardVariables.map((e: any) => KeyValue.fromJSON(e))
        : [],
      child: isSet(object.child) ? Node.fromJSON(object.child) : undefined,
    };
  },

  toJSON(message: DefineBlackboard): unknown {
    const obj: any = {};
    if (message.blackboardVariables) {
      obj.blackboardVariables = message.blackboardVariables.map((e) =>
        e ? KeyValue.toJSON(e) : undefined
      );
    } else {
      obj.blackboardVariables = [];
    }
    message.child !== undefined &&
      (obj.child = message.child ? Node.toJSON(message.child) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DefineBlackboard>, I>>(
    object: I
  ): DefineBlackboard {
    const message = createBaseDefineBlackboard();
    message.blackboardVariables =
      object.blackboardVariables?.map((e) => KeyValue.fromPartial(e)) || [];
    message.child =
      object.child !== undefined && object.child !== null
        ? Node.fromPartial(object.child)
        : undefined;
    return message;
  },
};

function createBaseSetBlackboard(): SetBlackboard {
  return { blackboardVariables: [] };
}

export const SetBlackboard = {
  encode(
    message: SetBlackboard,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.blackboardVariables) {
      KeyValue.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetBlackboard {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetBlackboard();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.blackboardVariables.push(
            KeyValue.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetBlackboard {
    return {
      blackboardVariables: Array.isArray(object?.blackboardVariables)
        ? object.blackboardVariables.map((e: any) => KeyValue.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SetBlackboard): unknown {
    const obj: any = {};
    if (message.blackboardVariables) {
      obj.blackboardVariables = message.blackboardVariables.map((e) =>
        e ? KeyValue.toJSON(e) : undefined
      );
    } else {
      obj.blackboardVariables = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetBlackboard>, I>>(
    object: I
  ): SetBlackboard {
    const message = createBaseSetBlackboard();
    message.blackboardVariables =
      object.blackboardVariables?.map((e) => KeyValue.fromPartial(e)) || [];
    return message;
  },
};

function createBaseFormatBlackboard(): FormatBlackboard {
  return { key: "", format: "" };
}

export const FormatBlackboard = {
  encode(
    message: FormatBlackboard,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.format !== "") {
      writer.uint32(18).string(message.format);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FormatBlackboard {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFormatBlackboard();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.format = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FormatBlackboard {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      format: isSet(object.format) ? String(object.format) : "",
    };
  },

  toJSON(message: FormatBlackboard): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.format !== undefined && (obj.format = message.format);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FormatBlackboard>, I>>(
    object: I
  ): FormatBlackboard {
    const message = createBaseFormatBlackboard();
    message.key = object.key ?? "";
    message.format = object.format ?? "";
    return message;
  },
};

function createBaseDateToBlackboard(): DateToBlackboard {
  return { key: "" };
}

export const DateToBlackboard = {
  encode(
    message: DateToBlackboard,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DateToBlackboard {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDateToBlackboard();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DateToBlackboard {
    return {
      key: isSet(object.key) ? String(object.key) : "",
    };
  },

  toJSON(message: DateToBlackboard): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DateToBlackboard>, I>>(
    object: I
  ): DateToBlackboard {
    const message = createBaseDateToBlackboard();
    message.key = object.key ?? "";
    return message;
  },
};

function createBaseConstantResult(): ConstantResult {
  return { result: 0 };
}

export const ConstantResult = {
  encode(
    message: ConstantResult,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConstantResult {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConstantResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ConstantResult {
    return {
      result: isSet(object.result) ? resultFromJSON(object.result) : 0,
    };
  },

  toJSON(message: ConstantResult): unknown {
    const obj: any = {};
    message.result !== undefined && (obj.result = resultToJSON(message.result));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ConstantResult>, I>>(
    object: I
  ): ConstantResult {
    const message = createBaseConstantResult();
    message.result = object.result ?? 0;
    return message;
  },
};

function createBaseRestartWhenPaused(): RestartWhenPaused {
  return { child: undefined };
}

export const RestartWhenPaused = {
  encode(
    message: RestartWhenPaused,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.child !== undefined) {
      Node.encode(message.child, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RestartWhenPaused {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRestartWhenPaused();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.child = Node.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RestartWhenPaused {
    return {
      child: isSet(object.child) ? Node.fromJSON(object.child) : undefined,
    };
  },

  toJSON(message: RestartWhenPaused): unknown {
    const obj: any = {};
    message.child !== undefined &&
      (obj.child = message.child ? Node.toJSON(message.child) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RestartWhenPaused>, I>>(
    object: I
  ): RestartWhenPaused {
    const message = createBaseRestartWhenPaused();
    message.child =
      object.child !== undefined && object.child !== null
        ? Node.fromPartial(object.child)
        : undefined;
    return message;
  },
};

function createBaseClearBehaviorFaults(): ClearBehaviorFaults {
  return { serviceName: "", host: "", robotStateBlackboardName: "" };
}

export const ClearBehaviorFaults = {
  encode(
    message: ClearBehaviorFaults,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.serviceName !== "") {
      writer.uint32(10).string(message.serviceName);
    }
    if (message.host !== "") {
      writer.uint32(18).string(message.host);
    }
    if (message.robotStateBlackboardName !== "") {
      writer.uint32(26).string(message.robotStateBlackboardName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClearBehaviorFaults {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClearBehaviorFaults();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serviceName = reader.string();
          break;
        case 2:
          message.host = reader.string();
          break;
        case 3:
          message.robotStateBlackboardName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClearBehaviorFaults {
    return {
      serviceName: isSet(object.serviceName) ? String(object.serviceName) : "",
      host: isSet(object.host) ? String(object.host) : "",
      robotStateBlackboardName: isSet(object.robotStateBlackboardName)
        ? String(object.robotStateBlackboardName)
        : "",
    };
  },

  toJSON(message: ClearBehaviorFaults): unknown {
    const obj: any = {};
    message.serviceName !== undefined &&
      (obj.serviceName = message.serviceName);
    message.host !== undefined && (obj.host = message.host);
    message.robotStateBlackboardName !== undefined &&
      (obj.robotStateBlackboardName = message.robotStateBlackboardName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ClearBehaviorFaults>, I>>(
    object: I
  ): ClearBehaviorFaults {
    const message = createBaseClearBehaviorFaults();
    message.serviceName = object.serviceName ?? "";
    message.host = object.host ?? "";
    message.robotStateBlackboardName = object.robotStateBlackboardName ?? "";
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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
