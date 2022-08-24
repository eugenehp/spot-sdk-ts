/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp";
import { SE2Trajectory } from "./trajectory";
import { SE2Velocity, Vec2, Vec3, Wrench } from "./geometry";
import _m0 from "protobufjs/minimal";
import { DoubleValue, BoolValue } from "../../google/protobuf/wrappers";

export const protobufPackage = "bosdyn.api";

export interface RobotCommandFeedbackStatus {}

export enum RobotCommandFeedbackStatus_Status {
  /** STATUS_UNKNOWN - / Behavior execution is in an unknown / unexpected state. */
  STATUS_UNKNOWN = 0,
  /** STATUS_PROCESSING - / The robot is actively working on the command */
  STATUS_PROCESSING = 1,
  /** STATUS_COMMAND_OVERRIDDEN - / The command was replaced by a new command */
  STATUS_COMMAND_OVERRIDDEN = 2,
  /** STATUS_COMMAND_TIMED_OUT - / The command expired */
  STATUS_COMMAND_TIMED_OUT = 3,
  /** STATUS_ROBOT_FROZEN - / The robot is in an unsafe state, and will only respond to known safe commands. */
  STATUS_ROBOT_FROZEN = 4,
  /**
   * STATUS_INCOMPATIBLE_HARDWARE - / The request cannot be executed because the required hardware is missing.
   * / For example, an armless robot receiving a synchronized command with an arm_command
   * / request will return this value in the arm_command_feedback status.
   */
  STATUS_INCOMPATIBLE_HARDWARE = 5,
  UNRECOGNIZED = -1,
}

export function robotCommandFeedbackStatus_StatusFromJSON(
  object: any
): RobotCommandFeedbackStatus_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return RobotCommandFeedbackStatus_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_PROCESSING":
      return RobotCommandFeedbackStatus_Status.STATUS_PROCESSING;
    case 2:
    case "STATUS_COMMAND_OVERRIDDEN":
      return RobotCommandFeedbackStatus_Status.STATUS_COMMAND_OVERRIDDEN;
    case 3:
    case "STATUS_COMMAND_TIMED_OUT":
      return RobotCommandFeedbackStatus_Status.STATUS_COMMAND_TIMED_OUT;
    case 4:
    case "STATUS_ROBOT_FROZEN":
      return RobotCommandFeedbackStatus_Status.STATUS_ROBOT_FROZEN;
    case 5:
    case "STATUS_INCOMPATIBLE_HARDWARE":
      return RobotCommandFeedbackStatus_Status.STATUS_INCOMPATIBLE_HARDWARE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RobotCommandFeedbackStatus_Status.UNRECOGNIZED;
  }
}

export function robotCommandFeedbackStatus_StatusToJSON(
  object: RobotCommandFeedbackStatus_Status
): string {
  switch (object) {
    case RobotCommandFeedbackStatus_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case RobotCommandFeedbackStatus_Status.STATUS_PROCESSING:
      return "STATUS_PROCESSING";
    case RobotCommandFeedbackStatus_Status.STATUS_COMMAND_OVERRIDDEN:
      return "STATUS_COMMAND_OVERRIDDEN";
    case RobotCommandFeedbackStatus_Status.STATUS_COMMAND_TIMED_OUT:
      return "STATUS_COMMAND_TIMED_OUT";
    case RobotCommandFeedbackStatus_Status.STATUS_ROBOT_FROZEN:
      return "STATUS_ROBOT_FROZEN";
    case RobotCommandFeedbackStatus_Status.STATUS_INCOMPATIBLE_HARDWARE:
      return "STATUS_INCOMPATIBLE_HARDWARE";
    case RobotCommandFeedbackStatus_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Get the robot into a convenient pose for changing the battery */
export interface BatteryChangePoseCommand {}

export interface BatteryChangePoseCommand_Request {
  directionHint: BatteryChangePoseCommand_Request_DirectionHint;
}

export enum BatteryChangePoseCommand_Request_DirectionHint {
  /** HINT_UNKNOWN - Unknown direction, just hold still */
  HINT_UNKNOWN = 0,
  /** HINT_RIGHT - Roll over right (right feet end up under the robot) */
  HINT_RIGHT = 1,
  /** HINT_LEFT - Roll over left (left feet end up under the robot) */
  HINT_LEFT = 2,
  UNRECOGNIZED = -1,
}

export function batteryChangePoseCommand_Request_DirectionHintFromJSON(
  object: any
): BatteryChangePoseCommand_Request_DirectionHint {
  switch (object) {
    case 0:
    case "HINT_UNKNOWN":
      return BatteryChangePoseCommand_Request_DirectionHint.HINT_UNKNOWN;
    case 1:
    case "HINT_RIGHT":
      return BatteryChangePoseCommand_Request_DirectionHint.HINT_RIGHT;
    case 2:
    case "HINT_LEFT":
      return BatteryChangePoseCommand_Request_DirectionHint.HINT_LEFT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return BatteryChangePoseCommand_Request_DirectionHint.UNRECOGNIZED;
  }
}

export function batteryChangePoseCommand_Request_DirectionHintToJSON(
  object: BatteryChangePoseCommand_Request_DirectionHint
): string {
  switch (object) {
    case BatteryChangePoseCommand_Request_DirectionHint.HINT_UNKNOWN:
      return "HINT_UNKNOWN";
    case BatteryChangePoseCommand_Request_DirectionHint.HINT_RIGHT:
      return "HINT_RIGHT";
    case BatteryChangePoseCommand_Request_DirectionHint.HINT_LEFT:
      return "HINT_LEFT";
    case BatteryChangePoseCommand_Request_DirectionHint.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface BatteryChangePoseCommand_Feedback {
  status: BatteryChangePoseCommand_Feedback_Status;
}

export enum BatteryChangePoseCommand_Feedback_Status {
  STATUS_UNKNOWN = 0,
  /** STATUS_COMPLETED - Robot is finished rolling */
  STATUS_COMPLETED = 1,
  /** STATUS_IN_PROGRESS - Robot still in process of rolling over */
  STATUS_IN_PROGRESS = 2,
  /** STATUS_FAILED - Robot has failed to roll onto its side */
  STATUS_FAILED = 3,
  UNRECOGNIZED = -1,
}

export function batteryChangePoseCommand_Feedback_StatusFromJSON(
  object: any
): BatteryChangePoseCommand_Feedback_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return BatteryChangePoseCommand_Feedback_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_COMPLETED":
      return BatteryChangePoseCommand_Feedback_Status.STATUS_COMPLETED;
    case 2:
    case "STATUS_IN_PROGRESS":
      return BatteryChangePoseCommand_Feedback_Status.STATUS_IN_PROGRESS;
    case 3:
    case "STATUS_FAILED":
      return BatteryChangePoseCommand_Feedback_Status.STATUS_FAILED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return BatteryChangePoseCommand_Feedback_Status.UNRECOGNIZED;
  }
}

export function batteryChangePoseCommand_Feedback_StatusToJSON(
  object: BatteryChangePoseCommand_Feedback_Status
): string {
  switch (object) {
    case BatteryChangePoseCommand_Feedback_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case BatteryChangePoseCommand_Feedback_Status.STATUS_COMPLETED:
      return "STATUS_COMPLETED";
    case BatteryChangePoseCommand_Feedback_Status.STATUS_IN_PROGRESS:
      return "STATUS_IN_PROGRESS";
    case BatteryChangePoseCommand_Feedback_Status.STATUS_FAILED:
      return "STATUS_FAILED";
    case BatteryChangePoseCommand_Feedback_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Move the robot into a "ready" position from which it can sit or stand up. */
export interface SelfRightCommand {}

/** SelfRight command request takes no additional arguments. */
export interface SelfRightCommand_Request {}

export interface SelfRightCommand_Feedback {
  status: SelfRightCommand_Feedback_Status;
}

export enum SelfRightCommand_Feedback_Status {
  STATUS_UNKNOWN = 0,
  /** STATUS_COMPLETED - Self-right has completed */
  STATUS_COMPLETED = 1,
  /** STATUS_IN_PROGRESS - Robot is in progress of attempting to self-right */
  STATUS_IN_PROGRESS = 2,
  UNRECOGNIZED = -1,
}

export function selfRightCommand_Feedback_StatusFromJSON(
  object: any
): SelfRightCommand_Feedback_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return SelfRightCommand_Feedback_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_COMPLETED":
      return SelfRightCommand_Feedback_Status.STATUS_COMPLETED;
    case 2:
    case "STATUS_IN_PROGRESS":
      return SelfRightCommand_Feedback_Status.STATUS_IN_PROGRESS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SelfRightCommand_Feedback_Status.UNRECOGNIZED;
  }
}

export function selfRightCommand_Feedback_StatusToJSON(
  object: SelfRightCommand_Feedback_Status
): string {
  switch (object) {
    case SelfRightCommand_Feedback_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case SelfRightCommand_Feedback_Status.STATUS_COMPLETED:
      return "STATUS_COMPLETED";
    case SelfRightCommand_Feedback_Status.STATUS_IN_PROGRESS:
      return "STATUS_IN_PROGRESS";
    case SelfRightCommand_Feedback_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Stop the robot in place with minimal motion. */
export interface StopCommand {}

/** Stop command request takes no additional arguments. */
export interface StopCommand_Request {}

/** Stop command provides no feedback. */
export interface StopCommand_Feedback {}

/** Freeze all joints at their current positions (no balancing control). */
export interface FreezeCommand {}

/** Freeze command request takes no additional arguments. */
export interface FreezeCommand_Request {}

/** Freeze command provides no feedback. */
export interface FreezeCommand_Feedback {}

/**
 * Get robot into a position where it is safe to power down, then power down. If the robot has
 * fallen, it will power down directly. If the robot is standing, it will first sit then power down.
 * With appropriate request parameters and under limited scenarios, the robot may take additional
 * steps to move to a safe position. The robot will not power down until it is in a sitting state.
 */
export interface SafePowerOffCommand {}

export interface SafePowerOffCommand_Request {
  unsafeAction: SafePowerOffCommand_Request_UnsafeAction;
}

/**
 * Robot action in response to a command received while in an unsafe position. If not
 * specified, UNSAFE_MOVE_TO_SAFE_POSITION will be used
 */
export enum SafePowerOffCommand_Request_UnsafeAction {
  UNSAFE_UNKNOWN = 0,
  /**
   * UNSAFE_MOVE_TO_SAFE_POSITION - Robot may attempt to move to a safe position (i.e. descends stairs) before sitting
   * and powering off.
   */
  UNSAFE_MOVE_TO_SAFE_POSITION = 1,
  /** UNSAFE_FORCE_COMMAND - Force sit and power off regardless of positioning. Robot will not take additional steps */
  UNSAFE_FORCE_COMMAND = 2,
  UNRECOGNIZED = -1,
}

export function safePowerOffCommand_Request_UnsafeActionFromJSON(
  object: any
): SafePowerOffCommand_Request_UnsafeAction {
  switch (object) {
    case 0:
    case "UNSAFE_UNKNOWN":
      return SafePowerOffCommand_Request_UnsafeAction.UNSAFE_UNKNOWN;
    case 1:
    case "UNSAFE_MOVE_TO_SAFE_POSITION":
      return SafePowerOffCommand_Request_UnsafeAction.UNSAFE_MOVE_TO_SAFE_POSITION;
    case 2:
    case "UNSAFE_FORCE_COMMAND":
      return SafePowerOffCommand_Request_UnsafeAction.UNSAFE_FORCE_COMMAND;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SafePowerOffCommand_Request_UnsafeAction.UNRECOGNIZED;
  }
}

export function safePowerOffCommand_Request_UnsafeActionToJSON(
  object: SafePowerOffCommand_Request_UnsafeAction
): string {
  switch (object) {
    case SafePowerOffCommand_Request_UnsafeAction.UNSAFE_UNKNOWN:
      return "UNSAFE_UNKNOWN";
    case SafePowerOffCommand_Request_UnsafeAction.UNSAFE_MOVE_TO_SAFE_POSITION:
      return "UNSAFE_MOVE_TO_SAFE_POSITION";
    case SafePowerOffCommand_Request_UnsafeAction.UNSAFE_FORCE_COMMAND:
      return "UNSAFE_FORCE_COMMAND";
    case SafePowerOffCommand_Request_UnsafeAction.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * The SafePowerOff will provide feedback on whether or not it has succeeded in powering off
 * the robot yet.
 */
export interface SafePowerOffCommand_Feedback {
  /** Current status of the command. */
  status: SafePowerOffCommand_Feedback_Status;
}

export enum SafePowerOffCommand_Feedback_Status {
  /** STATUS_UNKNOWN - STATUS_UNKNOWN should never be used. If used, an internal error has happened. */
  STATUS_UNKNOWN = 0,
  /** STATUS_POWERED_OFF - Robot has powered off. */
  STATUS_POWERED_OFF = 1,
  /** STATUS_IN_PROGRESS - Robot is trying to safely power off. */
  STATUS_IN_PROGRESS = 2,
  UNRECOGNIZED = -1,
}

export function safePowerOffCommand_Feedback_StatusFromJSON(
  object: any
): SafePowerOffCommand_Feedback_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return SafePowerOffCommand_Feedback_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_POWERED_OFF":
      return SafePowerOffCommand_Feedback_Status.STATUS_POWERED_OFF;
    case 2:
    case "STATUS_IN_PROGRESS":
      return SafePowerOffCommand_Feedback_Status.STATUS_IN_PROGRESS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SafePowerOffCommand_Feedback_Status.UNRECOGNIZED;
  }
}

export function safePowerOffCommand_Feedback_StatusToJSON(
  object: SafePowerOffCommand_Feedback_Status
): string {
  switch (object) {
    case SafePowerOffCommand_Feedback_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case SafePowerOffCommand_Feedback_Status.STATUS_POWERED_OFF:
      return "STATUS_POWERED_OFF";
    case SafePowerOffCommand_Feedback_Status.STATUS_IN_PROGRESS:
      return "STATUS_IN_PROGRESS";
    case SafePowerOffCommand_Feedback_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Move along a trajectory in 2D space. */
export interface SE2TrajectoryCommand {}

export interface SE2TrajectoryCommand_Request {
  /**
   * The timestamp (in robot time) by which a command must finish executing.
   * This is a required field and used to prevent runaway commands.
   */
  endTime: Date | undefined;
  /**
   * The name of the frame that trajectory is relative to. The trajectory
   * must be expressed in a gravity aligned frame, so either "vision",
   * "odom", or "body". Any other provided se2_frame_name will be rejected
   * and the trajectory command will not be exectuted.
   */
  se2FrameName: string;
  /**
   * The trajectory that the robot should follow, expressed in the frame
   * identified by se2_frame_name.
   */
  trajectory: SE2Trajectory | undefined;
}

/**
 * The SE2TrajectoryCommand will provide feedback on whether or not the robot has reached the
 * final point of the trajectory.
 */
export interface SE2TrajectoryCommand_Feedback {
  /** Current status of the command. */
  status: SE2TrajectoryCommand_Feedback_Status;
  /** Current status of how the body is moving */
  bodyMovementStatus: SE2TrajectoryCommand_Feedback_BodyMovementStatus;
}

export enum SE2TrajectoryCommand_Feedback_Status {
  /** STATUS_UNKNOWN - STATUS_UNKNOWN should never be used. If used, an internal error has happened. */
  STATUS_UNKNOWN = 0,
  /** STATUS_AT_GOAL - The robot has arrived and is standing at the goal. */
  STATUS_AT_GOAL = 1,
  /** STATUS_NEAR_GOAL - The robot has arrived at the goal and is doing final positioning. */
  STATUS_NEAR_GOAL = 3,
  /** STATUS_GOING_TO_GOAL - The robot is attempting to go to a goal. */
  STATUS_GOING_TO_GOAL = 2,
  UNRECOGNIZED = -1,
}

export function sE2TrajectoryCommand_Feedback_StatusFromJSON(
  object: any
): SE2TrajectoryCommand_Feedback_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return SE2TrajectoryCommand_Feedback_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_AT_GOAL":
      return SE2TrajectoryCommand_Feedback_Status.STATUS_AT_GOAL;
    case 3:
    case "STATUS_NEAR_GOAL":
      return SE2TrajectoryCommand_Feedback_Status.STATUS_NEAR_GOAL;
    case 2:
    case "STATUS_GOING_TO_GOAL":
      return SE2TrajectoryCommand_Feedback_Status.STATUS_GOING_TO_GOAL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SE2TrajectoryCommand_Feedback_Status.UNRECOGNIZED;
  }
}

export function sE2TrajectoryCommand_Feedback_StatusToJSON(
  object: SE2TrajectoryCommand_Feedback_Status
): string {
  switch (object) {
    case SE2TrajectoryCommand_Feedback_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case SE2TrajectoryCommand_Feedback_Status.STATUS_AT_GOAL:
      return "STATUS_AT_GOAL";
    case SE2TrajectoryCommand_Feedback_Status.STATUS_NEAR_GOAL:
      return "STATUS_NEAR_GOAL";
    case SE2TrajectoryCommand_Feedback_Status.STATUS_GOING_TO_GOAL:
      return "STATUS_GOING_TO_GOAL";
    case SE2TrajectoryCommand_Feedback_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum SE2TrajectoryCommand_Feedback_BodyMovementStatus {
  /** BODY_STATUS_UNKNOWN - STATUS_UNKNOWN should never be used. If used, an internal error has happened. */
  BODY_STATUS_UNKNOWN = 0,
  /** BODY_STATUS_MOVING - The robot body is not settled at the goal. */
  BODY_STATUS_MOVING = 1,
  /** BODY_STATUS_SETTLED - The robot is at the goal and the body has stopped moving. */
  BODY_STATUS_SETTLED = 2,
  UNRECOGNIZED = -1,
}

export function sE2TrajectoryCommand_Feedback_BodyMovementStatusFromJSON(
  object: any
): SE2TrajectoryCommand_Feedback_BodyMovementStatus {
  switch (object) {
    case 0:
    case "BODY_STATUS_UNKNOWN":
      return SE2TrajectoryCommand_Feedback_BodyMovementStatus.BODY_STATUS_UNKNOWN;
    case 1:
    case "BODY_STATUS_MOVING":
      return SE2TrajectoryCommand_Feedback_BodyMovementStatus.BODY_STATUS_MOVING;
    case 2:
    case "BODY_STATUS_SETTLED":
      return SE2TrajectoryCommand_Feedback_BodyMovementStatus.BODY_STATUS_SETTLED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SE2TrajectoryCommand_Feedback_BodyMovementStatus.UNRECOGNIZED;
  }
}

export function sE2TrajectoryCommand_Feedback_BodyMovementStatusToJSON(
  object: SE2TrajectoryCommand_Feedback_BodyMovementStatus
): string {
  switch (object) {
    case SE2TrajectoryCommand_Feedback_BodyMovementStatus.BODY_STATUS_UNKNOWN:
      return "BODY_STATUS_UNKNOWN";
    case SE2TrajectoryCommand_Feedback_BodyMovementStatus.BODY_STATUS_MOVING:
      return "BODY_STATUS_MOVING";
    case SE2TrajectoryCommand_Feedback_BodyMovementStatus.BODY_STATUS_SETTLED:
      return "BODY_STATUS_SETTLED";
    case SE2TrajectoryCommand_Feedback_BodyMovementStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Move the robot at a specific SE2 velocity for a fixed amount of time. */
export interface SE2VelocityCommand {}

export interface SE2VelocityCommand_Request {
  /**
   * The timestamp (in robot time) by which a command must finish executing. This is a
   * required field and used to prevent runaway commands.
   */
  endTime: Date | undefined;
  /**
   * The name of the frame that velocity and slew_rate_limit are relative to.
   * The trajectory must be expressed in a gravity aligned frame, so either
   * "vision", "odom", or "flat_body". Any other provided
   * se2_frame_name will be rejected and the velocity command will not be executed.
   */
  se2FrameName: string;
  /** Desired planar velocity of the robot body relative to se2_frame_name. */
  velocity: SE2Velocity | undefined;
  /**
   * If set, limits how quickly velocity can change relative to se2_frame_name.
   * Otherwise, robot may decide to limit velocities using default settings.
   * These values should be non-negative.
   */
  slewRateLimit: SE2Velocity | undefined;
}

/** Planar velocity commands provide no feedback. */
export interface SE2VelocityCommand_Feedback {}

/** Sit the robot down in its current position. */
export interface SitCommand {}

/** Sit command request takes no additional arguments. */
export interface SitCommand_Request {}

export interface SitCommand_Feedback {
  /** Current status of the command. */
  status: SitCommand_Feedback_Status;
}

export enum SitCommand_Feedback_Status {
  /** STATUS_UNKNOWN - STATUS_UNKNOWN should never be used. If used, an internal error has happened. */
  STATUS_UNKNOWN = 0,
  /** STATUS_IS_SITTING - Robot is currently sitting. */
  STATUS_IS_SITTING = 1,
  /** STATUS_IN_PROGRESS - Robot is trying to sit. */
  STATUS_IN_PROGRESS = 2,
  UNRECOGNIZED = -1,
}

export function sitCommand_Feedback_StatusFromJSON(
  object: any
): SitCommand_Feedback_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return SitCommand_Feedback_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_IS_SITTING":
      return SitCommand_Feedback_Status.STATUS_IS_SITTING;
    case 2:
    case "STATUS_IN_PROGRESS":
      return SitCommand_Feedback_Status.STATUS_IN_PROGRESS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SitCommand_Feedback_Status.UNRECOGNIZED;
  }
}

export function sitCommand_Feedback_StatusToJSON(
  object: SitCommand_Feedback_Status
): string {
  switch (object) {
    case SitCommand_Feedback_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case SitCommand_Feedback_Status.STATUS_IS_SITTING:
      return "STATUS_IS_SITTING";
    case SitCommand_Feedback_Status.STATUS_IN_PROGRESS:
      return "STATUS_IN_PROGRESS";
    case SitCommand_Feedback_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** The stand the robot up in its current position. */
export interface StandCommand {}

/** Stand command request takes no additional arguments. */
export interface StandCommand_Request {}

/**
 * The StandCommand will provide two feedback fields: status, and standing_state. Status
 * reflects if the robot has four legs on the ground and is near a final pose. StandingState
 * reflects if the robot has converged to a final pose and does not expect future movement.
 */
export interface StandCommand_Feedback {
  /** Current status of the command. */
  status: StandCommand_Feedback_Status;
  /** What type of standing the robot is doing currently. */
  standingState: StandCommand_Feedback_StandingState;
}

export enum StandCommand_Feedback_Status {
  /** STATUS_UNKNOWN - STATUS_UNKNOWN should never be used. If used, an internal error has happened. */
  STATUS_UNKNOWN = 0,
  /** STATUS_IS_STANDING - Robot has finished standing up and has completed desired body trajectory. */
  STATUS_IS_STANDING = 1,
  /** STATUS_IN_PROGRESS - Robot is trying to come to a steady stand. */
  STATUS_IN_PROGRESS = 2,
  UNRECOGNIZED = -1,
}

export function standCommand_Feedback_StatusFromJSON(
  object: any
): StandCommand_Feedback_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return StandCommand_Feedback_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_IS_STANDING":
      return StandCommand_Feedback_Status.STATUS_IS_STANDING;
    case 2:
    case "STATUS_IN_PROGRESS":
      return StandCommand_Feedback_Status.STATUS_IN_PROGRESS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return StandCommand_Feedback_Status.UNRECOGNIZED;
  }
}

export function standCommand_Feedback_StatusToJSON(
  object: StandCommand_Feedback_Status
): string {
  switch (object) {
    case StandCommand_Feedback_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case StandCommand_Feedback_Status.STATUS_IS_STANDING:
      return "STATUS_IS_STANDING";
    case StandCommand_Feedback_Status.STATUS_IN_PROGRESS:
      return "STATUS_IN_PROGRESS";
    case StandCommand_Feedback_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum StandCommand_Feedback_StandingState {
  /** STANDING_UNKNOWN - STANDING_UNKNOWN should never be used. If used, an internal error has happened. */
  STANDING_UNKNOWN = 0,
  /**
   * STANDING_CONTROLLED - Robot is standing up and actively controlling its body so it may occasionally make
   * small body adjustments.
   */
  STANDING_CONTROLLED = 1,
  /**
   * STANDING_FROZEN - Robot is standing still with its body frozen in place so it should not move unless
   * commanded to. Motion sensitive tasks like laser scanning should be performed in this
   * state.
   */
  STANDING_FROZEN = 2,
  UNRECOGNIZED = -1,
}

export function standCommand_Feedback_StandingStateFromJSON(
  object: any
): StandCommand_Feedback_StandingState {
  switch (object) {
    case 0:
    case "STANDING_UNKNOWN":
      return StandCommand_Feedback_StandingState.STANDING_UNKNOWN;
    case 1:
    case "STANDING_CONTROLLED":
      return StandCommand_Feedback_StandingState.STANDING_CONTROLLED;
    case 2:
    case "STANDING_FROZEN":
      return StandCommand_Feedback_StandingState.STANDING_FROZEN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return StandCommand_Feedback_StandingState.UNRECOGNIZED;
  }
}

export function standCommand_Feedback_StandingStateToJSON(
  object: StandCommand_Feedback_StandingState
): string {
  switch (object) {
    case StandCommand_Feedback_StandingState.STANDING_UNKNOWN:
      return "STANDING_UNKNOWN";
    case StandCommand_Feedback_StandingState.STANDING_CONTROLLED:
      return "STANDING_CONTROLLED";
    case StandCommand_Feedback_StandingState.STANDING_FROZEN:
      return "STANDING_FROZEN";
    case StandCommand_Feedback_StandingState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Precise foot placement
 * This can be used to reposition the robots feet in place.
 */
export interface StanceCommand {}

export interface StanceCommand_Request {
  /**
   * / The timestamp (in robot time) by which a command must finish executing.
   * / This is a required field and used to prevent runaway commands.
   */
  endTime: Date | undefined;
  stance: Stance | undefined;
}

export interface StanceCommand_Feedback {
  status: StanceCommand_Feedback_Status;
}

export enum StanceCommand_Feedback_Status {
  STATUS_UNKNOWN = 0,
  /** STATUS_STANCED - Robot has finished moving feet and they are at the specified position */
  STATUS_STANCED = 1,
  /** STATUS_GOING_TO_STANCE - Robot is in the process of moving feet to specified position */
  STATUS_GOING_TO_STANCE = 2,
  /**
   * STATUS_TOO_FAR_AWAY - Robot is not moving, the specified stance was too far away.
   * Hint: Try using SE2TrajectoryCommand to safely put the robot at the
   *       correct location first.
   */
  STATUS_TOO_FAR_AWAY = 3,
  UNRECOGNIZED = -1,
}

export function stanceCommand_Feedback_StatusFromJSON(
  object: any
): StanceCommand_Feedback_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return StanceCommand_Feedback_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_STANCED":
      return StanceCommand_Feedback_Status.STATUS_STANCED;
    case 2:
    case "STATUS_GOING_TO_STANCE":
      return StanceCommand_Feedback_Status.STATUS_GOING_TO_STANCE;
    case 3:
    case "STATUS_TOO_FAR_AWAY":
      return StanceCommand_Feedback_Status.STATUS_TOO_FAR_AWAY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return StanceCommand_Feedback_Status.UNRECOGNIZED;
  }
}

export function stanceCommand_Feedback_StatusToJSON(
  object: StanceCommand_Feedback_Status
): string {
  switch (object) {
    case StanceCommand_Feedback_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case StanceCommand_Feedback_Status.STATUS_STANCED:
      return "STATUS_STANCED";
    case StanceCommand_Feedback_Status.STATUS_GOING_TO_STANCE:
      return "STATUS_GOING_TO_STANCE";
    case StanceCommand_Feedback_Status.STATUS_TOO_FAR_AWAY:
      return "STATUS_TOO_FAR_AWAY";
    case StanceCommand_Feedback_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Stance {
  /** The frame name which the desired foot_positions are described in. */
  se2FrameName: string;
  /**
   * Map of foot name to its x,y location in specified frame.
   * Required positions for spot: "fl", "fr", "hl", "hr".
   */
  footPositions: { [key: string]: Vec2 };
  /**
   * Required foot positional accuracy in meters
   * Advised = 0.05 ( 5cm)
   * Minimum = 0.02 ( 2cm)
   * Maximum = 0.10 (10cm)
   */
  accuracy: number;
}

export interface Stance_FootPositionsEntry {
  key: string;
  value: Vec2 | undefined;
}

/**
 * The base will move in response to the hand's location, allow the arm to reach beyond
 * its current workspace.  If the hand is moved forward, the body will begin walking
 * forward to keep the base at the desired offset from the hand.
 */
export interface FollowArmCommand {}

export interface FollowArmCommand_Request {
  /**
   * Optional body offset from the hand.
   * For example, to have the body 0.75 meters behind the hand, use (0.75, 0, 0)
   */
  bodyOffsetFromHand: Vec3 | undefined;
  /**
   * DEPRECATED as of 3.1.
   * To reproduce the robot's behavior of disable_walking == true,
   * issue a StandCommand setting the enable_body_yaw_assist_for_manipulation and
   * enable_hip_height_assist_for_manipulation MobilityParams to true.  Any combination
   * of the enable_*_for_manipulation are accepted in stand giving finer control of
   * the robot's behavior.
   *
   * @deprecated
   */
  disableWalking: boolean;
}

/** FollowArmCommand commands provide no feedback. */
export interface FollowArmCommand_Feedback {}

export interface ArmDragCommand {}

export interface ArmDragCommand_Request {}

export interface ArmDragCommand_Feedback {
  status: ArmDragCommand_Feedback_Status;
}

export enum ArmDragCommand_Feedback_Status {
  /** STATUS_UNKNOWN - STATUS_UNKNOWN should never be used. If used, an internal error has happened. */
  STATUS_UNKNOWN = 0,
  /** STATUS_DRAGGING - Robot is dragging. */
  STATUS_DRAGGING = 1,
  /**
   * STATUS_GRASP_FAILED - Robot is not dragging because grasp failed.
   * This could be due to a lost grasp during a drag, or because the gripper isn't in a good
   * position at the time of request. You'll have to reposition or regrasp and then send a
   * new drag request to overcome this type of error.
   * Note: When requesting drag, make sure the gripper is positioned in front of the robot (not to the side of or
   * above the robot body).
   */
  STATUS_GRASP_FAILED = 2,
  /**
   * STATUS_OTHER_FAILURE - Robot is not dragging for another reason.
   * This might be because the gripper isn't holding an item.
   * You can continue dragging once you resolve this type of error (i.e. by sending an ApiGraspOverride request).
   * Note: When requesting drag, be sure to that the robot knows it's holding something (or use APIGraspOverride to
   * OVERRIDE_HOLDING).
   */
  STATUS_OTHER_FAILURE = 3,
  UNRECOGNIZED = -1,
}

export function armDragCommand_Feedback_StatusFromJSON(
  object: any
): ArmDragCommand_Feedback_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return ArmDragCommand_Feedback_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_DRAGGING":
      return ArmDragCommand_Feedback_Status.STATUS_DRAGGING;
    case 2:
    case "STATUS_GRASP_FAILED":
      return ArmDragCommand_Feedback_Status.STATUS_GRASP_FAILED;
    case 3:
    case "STATUS_OTHER_FAILURE":
      return ArmDragCommand_Feedback_Status.STATUS_OTHER_FAILURE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ArmDragCommand_Feedback_Status.UNRECOGNIZED;
  }
}

export function armDragCommand_Feedback_StatusToJSON(
  object: ArmDragCommand_Feedback_Status
): string {
  switch (object) {
    case ArmDragCommand_Feedback_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case ArmDragCommand_Feedback_Status.STATUS_DRAGGING:
      return "STATUS_DRAGGING";
    case ArmDragCommand_Feedback_Status.STATUS_GRASP_FAILED:
      return "STATUS_GRASP_FAILED";
    case ArmDragCommand_Feedback_Status.STATUS_OTHER_FAILURE:
      return "STATUS_OTHER_FAILURE";
    case ArmDragCommand_Feedback_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ConstrainedManipulationCommand {}

export interface ConstrainedManipulationCommand_Request {
  /** Frame that the initial wrench will be expressed in */
  frameName: string;
  /**
   * Direction of the initial wrench to be applied
   * Depending on the task, either the force vector or the
   * torque vector are required to be specified. The required
   * vector should not have a magnitude of zero and will be
   * normalized to 1. For tasks that require the force vector,
   * the torque vector can still be specified as a non-zero vector
   * if it is a good guess of the axis of rotation of the task.
   * (for e.g. TASK_TYPE_SE3_ROTATIONAL_TORQUE task types.)
   * Note that if both vectors are non-zero, they have to be perpendicular.
   * Once the constrained manipulation system estimates the
   * constraint, the init_wrench_direction and frame_name
   * will no longer be used.
   */
  initWrenchDirectionInFrameName: Wrench | undefined;
  /** Recommended values are in the range of [-4, 4] m/s */
  tangentialSpeed: number | undefined;
  /** Recommended values are in the range of [-4, 4] rad/s */
  rotationalSpeed: number | undefined;
  /**
   * The limit on the force that is applied on any translation direction
   * Value must be positive
   * If unspecified, a default value of 40 N will be used.
   */
  forceLimit: number | undefined;
  /**
   * The limit on the torque that is applied on any rotational direction
   * Value must be positive
   * If unspecified, a default value of 4 Nm will be used.
   */
  torqueLimit: number | undefined;
  taskType: ConstrainedManipulationCommand_Request_TaskType;
  /**
   * The timestamp (in robot time) by which a command must finish executing.
   * This is a required field and used to prevent runaway commands.
   */
  endTime: Date | undefined;
  /** Whether to enable the robot to take steps during constrained manip to keep the hand in the workspace. */
  enableRobotLocomotion: boolean | undefined;
}

/**
 * Geometrical category of a task. See the constrained_manipulation_helper function
 * for examples of each of these categories. For e.g. SE3_CIRCLE_FORCE_TORQUE corresponds
 * to lever type objects.
 */
export enum ConstrainedManipulationCommand_Request_TaskType {
  TASK_TYPE_UNKNOWN = 0,
  /**
   * TASK_TYPE_SE3_CIRCLE_FORCE_TORQUE - This task type corresponds to circular tasks where
   * both the end-effector position and orientation rotate about a circle to manipulate.
   * The constrained manipulation logic will generate forces and torques in this case.
   * Example tasks are: A lever or a ball valve with a solid grasp
   * This task type will require an initial force vector specified
   * in init_wrench_direction_in_frame_name. A torque vector can be specified
   * as well if a good initial guess of the axis of rotation of the task is available.
   */
  TASK_TYPE_SE3_CIRCLE_FORCE_TORQUE = 1,
  /**
   * TASK_TYPE_R3_CIRCLE_EXTRADOF_FORCE - This task type corresponds to circular tasks that have an extra degree of freedom.
   * In these tasks the end-effector position rotates about a circle
   * but the orientation does not need to follow a circle (can remain fixed).
   * The constrained manipulation logic will generate translational forces in this case.
   * Example tasks are: A crank that has a loose handle and moves in a circle
   * and the end-effector is free to rotate about the handle in one direction.
   * This task type will require an initial force vector specified
   * in init_wrench_direction_in_frame_name.
   */
  TASK_TYPE_R3_CIRCLE_EXTRADOF_FORCE = 2,
  /**
   * TASK_TYPE_SE3_ROTATIONAL_TORQUE - This task type corresponds to purely rotational tasks.
   * In these tasks the orientation of the end-effector follows a circle,
   * and the position remains fixed. The robot will apply a torque at the
   * end-effector in these tasks.
   * Example tasks are: rotating a knob or valve that does not have a lever arm.
   * This task type will require an initial torque vector specified
   * in init_wrench_direction_in_frame_name.
   */
  TASK_TYPE_SE3_ROTATIONAL_TORQUE = 3,
  /**
   * TASK_TYPE_R3_CIRCLE_FORCE - This task type corresponds to circular tasks where
   * the end-effector position and orientation rotate about a circle
   * but the orientation does always strictly follow the circle due to slips.
   * The constrained manipulation logic will generate translational forces in this case.
   * Example tasks are: manipulating a cabinet where the grasp on handle is not very rigid
   * or can often slip.
   * This task type will require an initial force vector specified
   * in init_wrench_direction_in_frame_name.
   */
  TASK_TYPE_R3_CIRCLE_FORCE = 4,
  /**
   * TASK_TYPE_R3_LINEAR_FORCE - This task type corresponds to linear tasks where
   * the end-effector position moves in a line
   * but the orientation does not need to change.
   * The constrained manipulation logic will generate a force in this case.
   * Example tasks are: A crank that has a loose handle, or manipulating
   * a cabinet where the grasp of the handle is loose and the end-effector is free
   * to rotate about the handle in one direction.
   * This task type will require an initial force vector specified
   * in init_wrench_direction_in_frame_name.
   */
  TASK_TYPE_R3_LINEAR_FORCE = 5,
  /**
   * TASK_TYPE_HOLD_POSE - This option simply holds the hand in place with stiff impedance control.
   * You can use this mode at the beginning of a constrained manipulation task or to
   * hold position while transitioning between two different constrained manipulation tasks.
   * The target pose to hold will be the measured hand pose upon transitioning to constrained
   * manipulation or upon switching to this task type.
   * This mode should only be used during constrained manipulation tasks,
   * since it uses impedance control to hold the hand in place.
   * This is not intended to stop the arm during position control moves.
   */
  TASK_TYPE_HOLD_POSE = 6,
  UNRECOGNIZED = -1,
}

export function constrainedManipulationCommand_Request_TaskTypeFromJSON(
  object: any
): ConstrainedManipulationCommand_Request_TaskType {
  switch (object) {
    case 0:
    case "TASK_TYPE_UNKNOWN":
      return ConstrainedManipulationCommand_Request_TaskType.TASK_TYPE_UNKNOWN;
    case 1:
    case "TASK_TYPE_SE3_CIRCLE_FORCE_TORQUE":
      return ConstrainedManipulationCommand_Request_TaskType.TASK_TYPE_SE3_CIRCLE_FORCE_TORQUE;
    case 2:
    case "TASK_TYPE_R3_CIRCLE_EXTRADOF_FORCE":
      return ConstrainedManipulationCommand_Request_TaskType.TASK_TYPE_R3_CIRCLE_EXTRADOF_FORCE;
    case 3:
    case "TASK_TYPE_SE3_ROTATIONAL_TORQUE":
      return ConstrainedManipulationCommand_Request_TaskType.TASK_TYPE_SE3_ROTATIONAL_TORQUE;
    case 4:
    case "TASK_TYPE_R3_CIRCLE_FORCE":
      return ConstrainedManipulationCommand_Request_TaskType.TASK_TYPE_R3_CIRCLE_FORCE;
    case 5:
    case "TASK_TYPE_R3_LINEAR_FORCE":
      return ConstrainedManipulationCommand_Request_TaskType.TASK_TYPE_R3_LINEAR_FORCE;
    case 6:
    case "TASK_TYPE_HOLD_POSE":
      return ConstrainedManipulationCommand_Request_TaskType.TASK_TYPE_HOLD_POSE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ConstrainedManipulationCommand_Request_TaskType.UNRECOGNIZED;
  }
}

export function constrainedManipulationCommand_Request_TaskTypeToJSON(
  object: ConstrainedManipulationCommand_Request_TaskType
): string {
  switch (object) {
    case ConstrainedManipulationCommand_Request_TaskType.TASK_TYPE_UNKNOWN:
      return "TASK_TYPE_UNKNOWN";
    case ConstrainedManipulationCommand_Request_TaskType.TASK_TYPE_SE3_CIRCLE_FORCE_TORQUE:
      return "TASK_TYPE_SE3_CIRCLE_FORCE_TORQUE";
    case ConstrainedManipulationCommand_Request_TaskType.TASK_TYPE_R3_CIRCLE_EXTRADOF_FORCE:
      return "TASK_TYPE_R3_CIRCLE_EXTRADOF_FORCE";
    case ConstrainedManipulationCommand_Request_TaskType.TASK_TYPE_SE3_ROTATIONAL_TORQUE:
      return "TASK_TYPE_SE3_ROTATIONAL_TORQUE";
    case ConstrainedManipulationCommand_Request_TaskType.TASK_TYPE_R3_CIRCLE_FORCE:
      return "TASK_TYPE_R3_CIRCLE_FORCE";
    case ConstrainedManipulationCommand_Request_TaskType.TASK_TYPE_R3_LINEAR_FORCE:
      return "TASK_TYPE_R3_LINEAR_FORCE";
    case ConstrainedManipulationCommand_Request_TaskType.TASK_TYPE_HOLD_POSE:
      return "TASK_TYPE_HOLD_POSE";
    case ConstrainedManipulationCommand_Request_TaskType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ConstrainedManipulationCommand_Feedback {
  status: ConstrainedManipulationCommand_Feedback_Status;
  /** Desired wrench in odom world frame, applied at hand frame origin */
  desiredWrenchOdomFrame: Wrench | undefined;
}

export enum ConstrainedManipulationCommand_Feedback_Status {
  /** STATUS_UNKNOWN - STATUS_UNKNOWN should never be used. If used, an internal error has happened. */
  STATUS_UNKNOWN = 0,
  /** STATUS_RUNNING - Constrained manipulation is working as expected */
  STATUS_RUNNING = 1,
  /**
   * STATUS_ARM_IS_STUCK - Arm is stuck, either force is being applied in a direction
   * where the affordance can't move or not enough force is applied
   */
  STATUS_ARM_IS_STUCK = 2,
  /**
   * STATUS_GRASP_IS_LOST - The grasp was lost. In this situation, constrained manipulation
   * will stop applying force, and will hold the last position.
   */
  STATUS_GRASP_IS_LOST = 3,
  UNRECOGNIZED = -1,
}

export function constrainedManipulationCommand_Feedback_StatusFromJSON(
  object: any
): ConstrainedManipulationCommand_Feedback_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return ConstrainedManipulationCommand_Feedback_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_RUNNING":
      return ConstrainedManipulationCommand_Feedback_Status.STATUS_RUNNING;
    case 2:
    case "STATUS_ARM_IS_STUCK":
      return ConstrainedManipulationCommand_Feedback_Status.STATUS_ARM_IS_STUCK;
    case 3:
    case "STATUS_GRASP_IS_LOST":
      return ConstrainedManipulationCommand_Feedback_Status.STATUS_GRASP_IS_LOST;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ConstrainedManipulationCommand_Feedback_Status.UNRECOGNIZED;
  }
}

export function constrainedManipulationCommand_Feedback_StatusToJSON(
  object: ConstrainedManipulationCommand_Feedback_Status
): string {
  switch (object) {
    case ConstrainedManipulationCommand_Feedback_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case ConstrainedManipulationCommand_Feedback_Status.STATUS_RUNNING:
      return "STATUS_RUNNING";
    case ConstrainedManipulationCommand_Feedback_Status.STATUS_ARM_IS_STUCK:
      return "STATUS_ARM_IS_STUCK";
    case ConstrainedManipulationCommand_Feedback_Status.STATUS_GRASP_IS_LOST:
      return "STATUS_GRASP_IS_LOST";
    case ConstrainedManipulationCommand_Feedback_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseRobotCommandFeedbackStatus(): RobotCommandFeedbackStatus {
  return {};
}

export const RobotCommandFeedbackStatus = {
  encode(
    _: RobotCommandFeedbackStatus,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RobotCommandFeedbackStatus {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRobotCommandFeedbackStatus();
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

  fromJSON(_: any): RobotCommandFeedbackStatus {
    return {};
  },

  toJSON(_: RobotCommandFeedbackStatus): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RobotCommandFeedbackStatus>, I>>(
    _: I
  ): RobotCommandFeedbackStatus {
    const message = createBaseRobotCommandFeedbackStatus();
    return message;
  },
};

function createBaseBatteryChangePoseCommand(): BatteryChangePoseCommand {
  return {};
}

export const BatteryChangePoseCommand = {
  encode(
    _: BatteryChangePoseCommand,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): BatteryChangePoseCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatteryChangePoseCommand();
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

  fromJSON(_: any): BatteryChangePoseCommand {
    return {};
  },

  toJSON(_: BatteryChangePoseCommand): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BatteryChangePoseCommand>, I>>(
    _: I
  ): BatteryChangePoseCommand {
    const message = createBaseBatteryChangePoseCommand();
    return message;
  },
};

function createBaseBatteryChangePoseCommand_Request(): BatteryChangePoseCommand_Request {
  return { directionHint: 0 };
}

export const BatteryChangePoseCommand_Request = {
  encode(
    message: BatteryChangePoseCommand_Request,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.directionHint !== 0) {
      writer.uint32(8).int32(message.directionHint);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): BatteryChangePoseCommand_Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatteryChangePoseCommand_Request();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.directionHint = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BatteryChangePoseCommand_Request {
    return {
      directionHint: isSet(object.directionHint)
        ? batteryChangePoseCommand_Request_DirectionHintFromJSON(
            object.directionHint
          )
        : 0,
    };
  },

  toJSON(message: BatteryChangePoseCommand_Request): unknown {
    const obj: any = {};
    message.directionHint !== undefined &&
      (obj.directionHint = batteryChangePoseCommand_Request_DirectionHintToJSON(
        message.directionHint
      ));
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<BatteryChangePoseCommand_Request>, I>
  >(object: I): BatteryChangePoseCommand_Request {
    const message = createBaseBatteryChangePoseCommand_Request();
    message.directionHint = object.directionHint ?? 0;
    return message;
  },
};

function createBaseBatteryChangePoseCommand_Feedback(): BatteryChangePoseCommand_Feedback {
  return { status: 0 };
}

export const BatteryChangePoseCommand_Feedback = {
  encode(
    message: BatteryChangePoseCommand_Feedback,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): BatteryChangePoseCommand_Feedback {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatteryChangePoseCommand_Feedback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BatteryChangePoseCommand_Feedback {
    return {
      status: isSet(object.status)
        ? batteryChangePoseCommand_Feedback_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: BatteryChangePoseCommand_Feedback): unknown {
    const obj: any = {};
    message.status !== undefined &&
      (obj.status = batteryChangePoseCommand_Feedback_StatusToJSON(
        message.status
      ));
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<BatteryChangePoseCommand_Feedback>, I>
  >(object: I): BatteryChangePoseCommand_Feedback {
    const message = createBaseBatteryChangePoseCommand_Feedback();
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseSelfRightCommand(): SelfRightCommand {
  return {};
}

export const SelfRightCommand = {
  encode(
    _: SelfRightCommand,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SelfRightCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSelfRightCommand();
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

  fromJSON(_: any): SelfRightCommand {
    return {};
  },

  toJSON(_: SelfRightCommand): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SelfRightCommand>, I>>(
    _: I
  ): SelfRightCommand {
    const message = createBaseSelfRightCommand();
    return message;
  },
};

function createBaseSelfRightCommand_Request(): SelfRightCommand_Request {
  return {};
}

export const SelfRightCommand_Request = {
  encode(
    _: SelfRightCommand_Request,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SelfRightCommand_Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSelfRightCommand_Request();
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

  fromJSON(_: any): SelfRightCommand_Request {
    return {};
  },

  toJSON(_: SelfRightCommand_Request): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SelfRightCommand_Request>, I>>(
    _: I
  ): SelfRightCommand_Request {
    const message = createBaseSelfRightCommand_Request();
    return message;
  },
};

function createBaseSelfRightCommand_Feedback(): SelfRightCommand_Feedback {
  return { status: 0 };
}

export const SelfRightCommand_Feedback = {
  encode(
    message: SelfRightCommand_Feedback,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SelfRightCommand_Feedback {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSelfRightCommand_Feedback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SelfRightCommand_Feedback {
    return {
      status: isSet(object.status)
        ? selfRightCommand_Feedback_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: SelfRightCommand_Feedback): unknown {
    const obj: any = {};
    message.status !== undefined &&
      (obj.status = selfRightCommand_Feedback_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SelfRightCommand_Feedback>, I>>(
    object: I
  ): SelfRightCommand_Feedback {
    const message = createBaseSelfRightCommand_Feedback();
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseStopCommand(): StopCommand {
  return {};
}

export const StopCommand = {
  encode(_: StopCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StopCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStopCommand();
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

  fromJSON(_: any): StopCommand {
    return {};
  },

  toJSON(_: StopCommand): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StopCommand>, I>>(_: I): StopCommand {
    const message = createBaseStopCommand();
    return message;
  },
};

function createBaseStopCommand_Request(): StopCommand_Request {
  return {};
}

export const StopCommand_Request = {
  encode(
    _: StopCommand_Request,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StopCommand_Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStopCommand_Request();
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

  fromJSON(_: any): StopCommand_Request {
    return {};
  },

  toJSON(_: StopCommand_Request): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StopCommand_Request>, I>>(
    _: I
  ): StopCommand_Request {
    const message = createBaseStopCommand_Request();
    return message;
  },
};

function createBaseStopCommand_Feedback(): StopCommand_Feedback {
  return {};
}

export const StopCommand_Feedback = {
  encode(
    _: StopCommand_Feedback,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StopCommand_Feedback {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStopCommand_Feedback();
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

  fromJSON(_: any): StopCommand_Feedback {
    return {};
  },

  toJSON(_: StopCommand_Feedback): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StopCommand_Feedback>, I>>(
    _: I
  ): StopCommand_Feedback {
    const message = createBaseStopCommand_Feedback();
    return message;
  },
};

function createBaseFreezeCommand(): FreezeCommand {
  return {};
}

export const FreezeCommand = {
  encode(
    _: FreezeCommand,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FreezeCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFreezeCommand();
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

  fromJSON(_: any): FreezeCommand {
    return {};
  },

  toJSON(_: FreezeCommand): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FreezeCommand>, I>>(
    _: I
  ): FreezeCommand {
    const message = createBaseFreezeCommand();
    return message;
  },
};

function createBaseFreezeCommand_Request(): FreezeCommand_Request {
  return {};
}

export const FreezeCommand_Request = {
  encode(
    _: FreezeCommand_Request,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): FreezeCommand_Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFreezeCommand_Request();
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

  fromJSON(_: any): FreezeCommand_Request {
    return {};
  },

  toJSON(_: FreezeCommand_Request): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FreezeCommand_Request>, I>>(
    _: I
  ): FreezeCommand_Request {
    const message = createBaseFreezeCommand_Request();
    return message;
  },
};

function createBaseFreezeCommand_Feedback(): FreezeCommand_Feedback {
  return {};
}

export const FreezeCommand_Feedback = {
  encode(
    _: FreezeCommand_Feedback,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): FreezeCommand_Feedback {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFreezeCommand_Feedback();
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

  fromJSON(_: any): FreezeCommand_Feedback {
    return {};
  },

  toJSON(_: FreezeCommand_Feedback): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FreezeCommand_Feedback>, I>>(
    _: I
  ): FreezeCommand_Feedback {
    const message = createBaseFreezeCommand_Feedback();
    return message;
  },
};

function createBaseSafePowerOffCommand(): SafePowerOffCommand {
  return {};
}

export const SafePowerOffCommand = {
  encode(
    _: SafePowerOffCommand,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SafePowerOffCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSafePowerOffCommand();
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

  fromJSON(_: any): SafePowerOffCommand {
    return {};
  },

  toJSON(_: SafePowerOffCommand): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SafePowerOffCommand>, I>>(
    _: I
  ): SafePowerOffCommand {
    const message = createBaseSafePowerOffCommand();
    return message;
  },
};

function createBaseSafePowerOffCommand_Request(): SafePowerOffCommand_Request {
  return { unsafeAction: 0 };
}

export const SafePowerOffCommand_Request = {
  encode(
    message: SafePowerOffCommand_Request,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.unsafeAction !== 0) {
      writer.uint32(8).int32(message.unsafeAction);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SafePowerOffCommand_Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSafePowerOffCommand_Request();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.unsafeAction = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SafePowerOffCommand_Request {
    return {
      unsafeAction: isSet(object.unsafeAction)
        ? safePowerOffCommand_Request_UnsafeActionFromJSON(object.unsafeAction)
        : 0,
    };
  },

  toJSON(message: SafePowerOffCommand_Request): unknown {
    const obj: any = {};
    message.unsafeAction !== undefined &&
      (obj.unsafeAction = safePowerOffCommand_Request_UnsafeActionToJSON(
        message.unsafeAction
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SafePowerOffCommand_Request>, I>>(
    object: I
  ): SafePowerOffCommand_Request {
    const message = createBaseSafePowerOffCommand_Request();
    message.unsafeAction = object.unsafeAction ?? 0;
    return message;
  },
};

function createBaseSafePowerOffCommand_Feedback(): SafePowerOffCommand_Feedback {
  return { status: 0 };
}

export const SafePowerOffCommand_Feedback = {
  encode(
    message: SafePowerOffCommand_Feedback,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SafePowerOffCommand_Feedback {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSafePowerOffCommand_Feedback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SafePowerOffCommand_Feedback {
    return {
      status: isSet(object.status)
        ? safePowerOffCommand_Feedback_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: SafePowerOffCommand_Feedback): unknown {
    const obj: any = {};
    message.status !== undefined &&
      (obj.status = safePowerOffCommand_Feedback_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SafePowerOffCommand_Feedback>, I>>(
    object: I
  ): SafePowerOffCommand_Feedback {
    const message = createBaseSafePowerOffCommand_Feedback();
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseSE2TrajectoryCommand(): SE2TrajectoryCommand {
  return {};
}

export const SE2TrajectoryCommand = {
  encode(
    _: SE2TrajectoryCommand,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SE2TrajectoryCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSE2TrajectoryCommand();
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

  fromJSON(_: any): SE2TrajectoryCommand {
    return {};
  },

  toJSON(_: SE2TrajectoryCommand): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SE2TrajectoryCommand>, I>>(
    _: I
  ): SE2TrajectoryCommand {
    const message = createBaseSE2TrajectoryCommand();
    return message;
  },
};

function createBaseSE2TrajectoryCommand_Request(): SE2TrajectoryCommand_Request {
  return { endTime: undefined, se2FrameName: "", trajectory: undefined };
}

export const SE2TrajectoryCommand_Request = {
  encode(
    message: SE2TrajectoryCommand_Request,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.endTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.endTime),
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.se2FrameName !== "") {
      writer.uint32(26).string(message.se2FrameName);
    }
    if (message.trajectory !== undefined) {
      SE2Trajectory.encode(
        message.trajectory,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SE2TrajectoryCommand_Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSE2TrajectoryCommand_Request();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.endTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.se2FrameName = reader.string();
          break;
        case 2:
          message.trajectory = SE2Trajectory.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SE2TrajectoryCommand_Request {
    return {
      endTime: isSet(object.endTime)
        ? fromJsonTimestamp(object.endTime)
        : undefined,
      se2FrameName: isSet(object.se2FrameName)
        ? String(object.se2FrameName)
        : "",
      trajectory: isSet(object.trajectory)
        ? SE2Trajectory.fromJSON(object.trajectory)
        : undefined,
    };
  },

  toJSON(message: SE2TrajectoryCommand_Request): unknown {
    const obj: any = {};
    message.endTime !== undefined &&
      (obj.endTime = message.endTime.toISOString());
    message.se2FrameName !== undefined &&
      (obj.se2FrameName = message.se2FrameName);
    message.trajectory !== undefined &&
      (obj.trajectory = message.trajectory
        ? SE2Trajectory.toJSON(message.trajectory)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SE2TrajectoryCommand_Request>, I>>(
    object: I
  ): SE2TrajectoryCommand_Request {
    const message = createBaseSE2TrajectoryCommand_Request();
    message.endTime = object.endTime ?? undefined;
    message.se2FrameName = object.se2FrameName ?? "";
    message.trajectory =
      object.trajectory !== undefined && object.trajectory !== null
        ? SE2Trajectory.fromPartial(object.trajectory)
        : undefined;
    return message;
  },
};

function createBaseSE2TrajectoryCommand_Feedback(): SE2TrajectoryCommand_Feedback {
  return { status: 0, bodyMovementStatus: 0 };
}

export const SE2TrajectoryCommand_Feedback = {
  encode(
    message: SE2TrajectoryCommand_Feedback,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    if (message.bodyMovementStatus !== 0) {
      writer.uint32(16).int32(message.bodyMovementStatus);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SE2TrajectoryCommand_Feedback {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSE2TrajectoryCommand_Feedback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32() as any;
          break;
        case 2:
          message.bodyMovementStatus = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SE2TrajectoryCommand_Feedback {
    return {
      status: isSet(object.status)
        ? sE2TrajectoryCommand_Feedback_StatusFromJSON(object.status)
        : 0,
      bodyMovementStatus: isSet(object.bodyMovementStatus)
        ? sE2TrajectoryCommand_Feedback_BodyMovementStatusFromJSON(
            object.bodyMovementStatus
          )
        : 0,
    };
  },

  toJSON(message: SE2TrajectoryCommand_Feedback): unknown {
    const obj: any = {};
    message.status !== undefined &&
      (obj.status = sE2TrajectoryCommand_Feedback_StatusToJSON(message.status));
    message.bodyMovementStatus !== undefined &&
      (obj.bodyMovementStatus =
        sE2TrajectoryCommand_Feedback_BodyMovementStatusToJSON(
          message.bodyMovementStatus
        ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SE2TrajectoryCommand_Feedback>, I>>(
    object: I
  ): SE2TrajectoryCommand_Feedback {
    const message = createBaseSE2TrajectoryCommand_Feedback();
    message.status = object.status ?? 0;
    message.bodyMovementStatus = object.bodyMovementStatus ?? 0;
    return message;
  },
};

function createBaseSE2VelocityCommand(): SE2VelocityCommand {
  return {};
}

export const SE2VelocityCommand = {
  encode(
    _: SE2VelocityCommand,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SE2VelocityCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSE2VelocityCommand();
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

  fromJSON(_: any): SE2VelocityCommand {
    return {};
  },

  toJSON(_: SE2VelocityCommand): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SE2VelocityCommand>, I>>(
    _: I
  ): SE2VelocityCommand {
    const message = createBaseSE2VelocityCommand();
    return message;
  },
};

function createBaseSE2VelocityCommand_Request(): SE2VelocityCommand_Request {
  return {
    endTime: undefined,
    se2FrameName: "",
    velocity: undefined,
    slewRateLimit: undefined,
  };
}

export const SE2VelocityCommand_Request = {
  encode(
    message: SE2VelocityCommand_Request,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.endTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.endTime),
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.se2FrameName !== "") {
      writer.uint32(42).string(message.se2FrameName);
    }
    if (message.velocity !== undefined) {
      SE2Velocity.encode(message.velocity, writer.uint32(18).fork()).ldelim();
    }
    if (message.slewRateLimit !== undefined) {
      SE2Velocity.encode(
        message.slewRateLimit,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SE2VelocityCommand_Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSE2VelocityCommand_Request();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.endTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 5:
          message.se2FrameName = reader.string();
          break;
        case 2:
          message.velocity = SE2Velocity.decode(reader, reader.uint32());
          break;
        case 4:
          message.slewRateLimit = SE2Velocity.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SE2VelocityCommand_Request {
    return {
      endTime: isSet(object.endTime)
        ? fromJsonTimestamp(object.endTime)
        : undefined,
      se2FrameName: isSet(object.se2FrameName)
        ? String(object.se2FrameName)
        : "",
      velocity: isSet(object.velocity)
        ? SE2Velocity.fromJSON(object.velocity)
        : undefined,
      slewRateLimit: isSet(object.slewRateLimit)
        ? SE2Velocity.fromJSON(object.slewRateLimit)
        : undefined,
    };
  },

  toJSON(message: SE2VelocityCommand_Request): unknown {
    const obj: any = {};
    message.endTime !== undefined &&
      (obj.endTime = message.endTime.toISOString());
    message.se2FrameName !== undefined &&
      (obj.se2FrameName = message.se2FrameName);
    message.velocity !== undefined &&
      (obj.velocity = message.velocity
        ? SE2Velocity.toJSON(message.velocity)
        : undefined);
    message.slewRateLimit !== undefined &&
      (obj.slewRateLimit = message.slewRateLimit
        ? SE2Velocity.toJSON(message.slewRateLimit)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SE2VelocityCommand_Request>, I>>(
    object: I
  ): SE2VelocityCommand_Request {
    const message = createBaseSE2VelocityCommand_Request();
    message.endTime = object.endTime ?? undefined;
    message.se2FrameName = object.se2FrameName ?? "";
    message.velocity =
      object.velocity !== undefined && object.velocity !== null
        ? SE2Velocity.fromPartial(object.velocity)
        : undefined;
    message.slewRateLimit =
      object.slewRateLimit !== undefined && object.slewRateLimit !== null
        ? SE2Velocity.fromPartial(object.slewRateLimit)
        : undefined;
    return message;
  },
};

function createBaseSE2VelocityCommand_Feedback(): SE2VelocityCommand_Feedback {
  return {};
}

export const SE2VelocityCommand_Feedback = {
  encode(
    _: SE2VelocityCommand_Feedback,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SE2VelocityCommand_Feedback {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSE2VelocityCommand_Feedback();
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

  fromJSON(_: any): SE2VelocityCommand_Feedback {
    return {};
  },

  toJSON(_: SE2VelocityCommand_Feedback): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SE2VelocityCommand_Feedback>, I>>(
    _: I
  ): SE2VelocityCommand_Feedback {
    const message = createBaseSE2VelocityCommand_Feedback();
    return message;
  },
};

function createBaseSitCommand(): SitCommand {
  return {};
}

export const SitCommand = {
  encode(_: SitCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SitCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSitCommand();
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

  fromJSON(_: any): SitCommand {
    return {};
  },

  toJSON(_: SitCommand): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SitCommand>, I>>(_: I): SitCommand {
    const message = createBaseSitCommand();
    return message;
  },
};

function createBaseSitCommand_Request(): SitCommand_Request {
  return {};
}

export const SitCommand_Request = {
  encode(
    _: SitCommand_Request,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SitCommand_Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSitCommand_Request();
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

  fromJSON(_: any): SitCommand_Request {
    return {};
  },

  toJSON(_: SitCommand_Request): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SitCommand_Request>, I>>(
    _: I
  ): SitCommand_Request {
    const message = createBaseSitCommand_Request();
    return message;
  },
};

function createBaseSitCommand_Feedback(): SitCommand_Feedback {
  return { status: 0 };
}

export const SitCommand_Feedback = {
  encode(
    message: SitCommand_Feedback,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SitCommand_Feedback {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSitCommand_Feedback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
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

  fromJSON(object: any): SitCommand_Feedback {
    return {
      status: isSet(object.status)
        ? sitCommand_Feedback_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: SitCommand_Feedback): unknown {
    const obj: any = {};
    message.status !== undefined &&
      (obj.status = sitCommand_Feedback_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SitCommand_Feedback>, I>>(
    object: I
  ): SitCommand_Feedback {
    const message = createBaseSitCommand_Feedback();
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseStandCommand(): StandCommand {
  return {};
}

export const StandCommand = {
  encode(
    _: StandCommand,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StandCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStandCommand();
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

  fromJSON(_: any): StandCommand {
    return {};
  },

  toJSON(_: StandCommand): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StandCommand>, I>>(
    _: I
  ): StandCommand {
    const message = createBaseStandCommand();
    return message;
  },
};

function createBaseStandCommand_Request(): StandCommand_Request {
  return {};
}

export const StandCommand_Request = {
  encode(
    _: StandCommand_Request,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StandCommand_Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStandCommand_Request();
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

  fromJSON(_: any): StandCommand_Request {
    return {};
  },

  toJSON(_: StandCommand_Request): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StandCommand_Request>, I>>(
    _: I
  ): StandCommand_Request {
    const message = createBaseStandCommand_Request();
    return message;
  },
};

function createBaseStandCommand_Feedback(): StandCommand_Feedback {
  return { status: 0, standingState: 0 };
}

export const StandCommand_Feedback = {
  encode(
    message: StandCommand_Feedback,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    if (message.standingState !== 0) {
      writer.uint32(16).int32(message.standingState);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StandCommand_Feedback {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStandCommand_Feedback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32() as any;
          break;
        case 2:
          message.standingState = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StandCommand_Feedback {
    return {
      status: isSet(object.status)
        ? standCommand_Feedback_StatusFromJSON(object.status)
        : 0,
      standingState: isSet(object.standingState)
        ? standCommand_Feedback_StandingStateFromJSON(object.standingState)
        : 0,
    };
  },

  toJSON(message: StandCommand_Feedback): unknown {
    const obj: any = {};
    message.status !== undefined &&
      (obj.status = standCommand_Feedback_StatusToJSON(message.status));
    message.standingState !== undefined &&
      (obj.standingState = standCommand_Feedback_StandingStateToJSON(
        message.standingState
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StandCommand_Feedback>, I>>(
    object: I
  ): StandCommand_Feedback {
    const message = createBaseStandCommand_Feedback();
    message.status = object.status ?? 0;
    message.standingState = object.standingState ?? 0;
    return message;
  },
};

function createBaseStanceCommand(): StanceCommand {
  return {};
}

export const StanceCommand = {
  encode(
    _: StanceCommand,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StanceCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStanceCommand();
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

  fromJSON(_: any): StanceCommand {
    return {};
  },

  toJSON(_: StanceCommand): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StanceCommand>, I>>(
    _: I
  ): StanceCommand {
    const message = createBaseStanceCommand();
    return message;
  },
};

function createBaseStanceCommand_Request(): StanceCommand_Request {
  return { endTime: undefined, stance: undefined };
}

export const StanceCommand_Request = {
  encode(
    message: StanceCommand_Request,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.endTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.endTime),
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.stance !== undefined) {
      Stance.encode(message.stance, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StanceCommand_Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStanceCommand_Request();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.endTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.stance = Stance.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StanceCommand_Request {
    return {
      endTime: isSet(object.endTime)
        ? fromJsonTimestamp(object.endTime)
        : undefined,
      stance: isSet(object.stance) ? Stance.fromJSON(object.stance) : undefined,
    };
  },

  toJSON(message: StanceCommand_Request): unknown {
    const obj: any = {};
    message.endTime !== undefined &&
      (obj.endTime = message.endTime.toISOString());
    message.stance !== undefined &&
      (obj.stance = message.stance ? Stance.toJSON(message.stance) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StanceCommand_Request>, I>>(
    object: I
  ): StanceCommand_Request {
    const message = createBaseStanceCommand_Request();
    message.endTime = object.endTime ?? undefined;
    message.stance =
      object.stance !== undefined && object.stance !== null
        ? Stance.fromPartial(object.stance)
        : undefined;
    return message;
  },
};

function createBaseStanceCommand_Feedback(): StanceCommand_Feedback {
  return { status: 0 };
}

export const StanceCommand_Feedback = {
  encode(
    message: StanceCommand_Feedback,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StanceCommand_Feedback {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStanceCommand_Feedback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StanceCommand_Feedback {
    return {
      status: isSet(object.status)
        ? stanceCommand_Feedback_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: StanceCommand_Feedback): unknown {
    const obj: any = {};
    message.status !== undefined &&
      (obj.status = stanceCommand_Feedback_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StanceCommand_Feedback>, I>>(
    object: I
  ): StanceCommand_Feedback {
    const message = createBaseStanceCommand_Feedback();
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseStance(): Stance {
  return { se2FrameName: "", footPositions: {}, accuracy: 0 };
}

export const Stance = {
  encode(
    message: Stance,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.se2FrameName !== "") {
      writer.uint32(26).string(message.se2FrameName);
    }
    Object.entries(message.footPositions).forEach(([key, value]) => {
      Stance_FootPositionsEntry.encode(
        { key: key as any, value },
        writer.uint32(18).fork()
      ).ldelim();
    });
    if (message.accuracy !== 0) {
      writer.uint32(37).float(message.accuracy);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Stance {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStance();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 3:
          message.se2FrameName = reader.string();
          break;
        case 2:
          const entry2 = Stance_FootPositionsEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry2.value !== undefined) {
            message.footPositions[entry2.key] = entry2.value;
          }
          break;
        case 4:
          message.accuracy = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Stance {
    return {
      se2FrameName: isSet(object.se2FrameName)
        ? String(object.se2FrameName)
        : "",
      footPositions: isObject(object.footPositions)
        ? Object.entries(object.footPositions).reduce<{ [key: string]: Vec2 }>(
            (acc, [key, value]) => {
              acc[key] = Vec2.fromJSON(value);
              return acc;
            },
            {}
          )
        : {},
      accuracy: isSet(object.accuracy) ? Number(object.accuracy) : 0,
    };
  },

  toJSON(message: Stance): unknown {
    const obj: any = {};
    message.se2FrameName !== undefined &&
      (obj.se2FrameName = message.se2FrameName);
    obj.footPositions = {};
    if (message.footPositions) {
      Object.entries(message.footPositions).forEach(([k, v]) => {
        obj.footPositions[k] = Vec2.toJSON(v);
      });
    }
    message.accuracy !== undefined && (obj.accuracy = message.accuracy);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Stance>, I>>(object: I): Stance {
    const message = createBaseStance();
    message.se2FrameName = object.se2FrameName ?? "";
    message.footPositions = Object.entries(object.footPositions ?? {}).reduce<{
      [key: string]: Vec2;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = Vec2.fromPartial(value);
      }
      return acc;
    }, {});
    message.accuracy = object.accuracy ?? 0;
    return message;
  },
};

function createBaseStance_FootPositionsEntry(): Stance_FootPositionsEntry {
  return { key: "", value: undefined };
}

export const Stance_FootPositionsEntry = {
  encode(
    message: Stance_FootPositionsEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Vec2.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): Stance_FootPositionsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStance_FootPositionsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = Vec2.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Stance_FootPositionsEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? Vec2.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: Stance_FootPositionsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value ? Vec2.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Stance_FootPositionsEntry>, I>>(
    object: I
  ): Stance_FootPositionsEntry {
    const message = createBaseStance_FootPositionsEntry();
    message.key = object.key ?? "";
    message.value =
      object.value !== undefined && object.value !== null
        ? Vec2.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseFollowArmCommand(): FollowArmCommand {
  return {};
}

export const FollowArmCommand = {
  encode(
    _: FollowArmCommand,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FollowArmCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFollowArmCommand();
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

  fromJSON(_: any): FollowArmCommand {
    return {};
  },

  toJSON(_: FollowArmCommand): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FollowArmCommand>, I>>(
    _: I
  ): FollowArmCommand {
    const message = createBaseFollowArmCommand();
    return message;
  },
};

function createBaseFollowArmCommand_Request(): FollowArmCommand_Request {
  return { bodyOffsetFromHand: undefined, disableWalking: false };
}

export const FollowArmCommand_Request = {
  encode(
    message: FollowArmCommand_Request,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.bodyOffsetFromHand !== undefined) {
      Vec3.encode(
        message.bodyOffsetFromHand,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.disableWalking === true) {
      writer.uint32(16).bool(message.disableWalking);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): FollowArmCommand_Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFollowArmCommand_Request();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bodyOffsetFromHand = Vec3.decode(reader, reader.uint32());
          break;
        case 2:
          message.disableWalking = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FollowArmCommand_Request {
    return {
      bodyOffsetFromHand: isSet(object.bodyOffsetFromHand)
        ? Vec3.fromJSON(object.bodyOffsetFromHand)
        : undefined,
      disableWalking: isSet(object.disableWalking)
        ? Boolean(object.disableWalking)
        : false,
    };
  },

  toJSON(message: FollowArmCommand_Request): unknown {
    const obj: any = {};
    message.bodyOffsetFromHand !== undefined &&
      (obj.bodyOffsetFromHand = message.bodyOffsetFromHand
        ? Vec3.toJSON(message.bodyOffsetFromHand)
        : undefined);
    message.disableWalking !== undefined &&
      (obj.disableWalking = message.disableWalking);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FollowArmCommand_Request>, I>>(
    object: I
  ): FollowArmCommand_Request {
    const message = createBaseFollowArmCommand_Request();
    message.bodyOffsetFromHand =
      object.bodyOffsetFromHand !== undefined &&
      object.bodyOffsetFromHand !== null
        ? Vec3.fromPartial(object.bodyOffsetFromHand)
        : undefined;
    message.disableWalking = object.disableWalking ?? false;
    return message;
  },
};

function createBaseFollowArmCommand_Feedback(): FollowArmCommand_Feedback {
  return {};
}

export const FollowArmCommand_Feedback = {
  encode(
    _: FollowArmCommand_Feedback,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): FollowArmCommand_Feedback {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFollowArmCommand_Feedback();
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

  fromJSON(_: any): FollowArmCommand_Feedback {
    return {};
  },

  toJSON(_: FollowArmCommand_Feedback): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FollowArmCommand_Feedback>, I>>(
    _: I
  ): FollowArmCommand_Feedback {
    const message = createBaseFollowArmCommand_Feedback();
    return message;
  },
};

function createBaseArmDragCommand(): ArmDragCommand {
  return {};
}

export const ArmDragCommand = {
  encode(
    _: ArmDragCommand,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ArmDragCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArmDragCommand();
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

  fromJSON(_: any): ArmDragCommand {
    return {};
  },

  toJSON(_: ArmDragCommand): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ArmDragCommand>, I>>(
    _: I
  ): ArmDragCommand {
    const message = createBaseArmDragCommand();
    return message;
  },
};

function createBaseArmDragCommand_Request(): ArmDragCommand_Request {
  return {};
}

export const ArmDragCommand_Request = {
  encode(
    _: ArmDragCommand_Request,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ArmDragCommand_Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArmDragCommand_Request();
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

  fromJSON(_: any): ArmDragCommand_Request {
    return {};
  },

  toJSON(_: ArmDragCommand_Request): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ArmDragCommand_Request>, I>>(
    _: I
  ): ArmDragCommand_Request {
    const message = createBaseArmDragCommand_Request();
    return message;
  },
};

function createBaseArmDragCommand_Feedback(): ArmDragCommand_Feedback {
  return { status: 0 };
}

export const ArmDragCommand_Feedback = {
  encode(
    message: ArmDragCommand_Feedback,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ArmDragCommand_Feedback {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArmDragCommand_Feedback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ArmDragCommand_Feedback {
    return {
      status: isSet(object.status)
        ? armDragCommand_Feedback_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: ArmDragCommand_Feedback): unknown {
    const obj: any = {};
    message.status !== undefined &&
      (obj.status = armDragCommand_Feedback_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ArmDragCommand_Feedback>, I>>(
    object: I
  ): ArmDragCommand_Feedback {
    const message = createBaseArmDragCommand_Feedback();
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseConstrainedManipulationCommand(): ConstrainedManipulationCommand {
  return {};
}

export const ConstrainedManipulationCommand = {
  encode(
    _: ConstrainedManipulationCommand,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ConstrainedManipulationCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConstrainedManipulationCommand();
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

  fromJSON(_: any): ConstrainedManipulationCommand {
    return {};
  },

  toJSON(_: ConstrainedManipulationCommand): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ConstrainedManipulationCommand>, I>>(
    _: I
  ): ConstrainedManipulationCommand {
    const message = createBaseConstrainedManipulationCommand();
    return message;
  },
};

function createBaseConstrainedManipulationCommand_Request(): ConstrainedManipulationCommand_Request {
  return {
    frameName: "",
    initWrenchDirectionInFrameName: undefined,
    tangentialSpeed: undefined,
    rotationalSpeed: undefined,
    forceLimit: undefined,
    torqueLimit: undefined,
    taskType: 0,
    endTime: undefined,
    enableRobotLocomotion: undefined,
  };
}

export const ConstrainedManipulationCommand_Request = {
  encode(
    message: ConstrainedManipulationCommand_Request,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.frameName !== "") {
      writer.uint32(10).string(message.frameName);
    }
    if (message.initWrenchDirectionInFrameName !== undefined) {
      Wrench.encode(
        message.initWrenchDirectionInFrameName,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.tangentialSpeed !== undefined) {
      writer.uint32(25).double(message.tangentialSpeed);
    }
    if (message.rotationalSpeed !== undefined) {
      writer.uint32(33).double(message.rotationalSpeed);
    }
    if (message.forceLimit !== undefined) {
      DoubleValue.encode(
        { value: message.forceLimit! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.torqueLimit !== undefined) {
      DoubleValue.encode(
        { value: message.torqueLimit! },
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.taskType !== 0) {
      writer.uint32(56).int32(message.taskType);
    }
    if (message.endTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.endTime),
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.enableRobotLocomotion !== undefined) {
      BoolValue.encode(
        { value: message.enableRobotLocomotion! },
        writer.uint32(74).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ConstrainedManipulationCommand_Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConstrainedManipulationCommand_Request();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.frameName = reader.string();
          break;
        case 2:
          message.initWrenchDirectionInFrameName = Wrench.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.tangentialSpeed = reader.double();
          break;
        case 4:
          message.rotationalSpeed = reader.double();
          break;
        case 5:
          message.forceLimit = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 6:
          message.torqueLimit = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 7:
          message.taskType = reader.int32() as any;
          break;
        case 8:
          message.endTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 9:
          message.enableRobotLocomotion = BoolValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ConstrainedManipulationCommand_Request {
    return {
      frameName: isSet(object.frameName) ? String(object.frameName) : "",
      initWrenchDirectionInFrameName: isSet(
        object.initWrenchDirectionInFrameName
      )
        ? Wrench.fromJSON(object.initWrenchDirectionInFrameName)
        : undefined,
      tangentialSpeed: isSet(object.tangentialSpeed)
        ? Number(object.tangentialSpeed)
        : undefined,
      rotationalSpeed: isSet(object.rotationalSpeed)
        ? Number(object.rotationalSpeed)
        : undefined,
      forceLimit: isSet(object.forceLimit)
        ? Number(object.forceLimit)
        : undefined,
      torqueLimit: isSet(object.torqueLimit)
        ? Number(object.torqueLimit)
        : undefined,
      taskType: isSet(object.taskType)
        ? constrainedManipulationCommand_Request_TaskTypeFromJSON(
            object.taskType
          )
        : 0,
      endTime: isSet(object.endTime)
        ? fromJsonTimestamp(object.endTime)
        : undefined,
      enableRobotLocomotion: isSet(object.enableRobotLocomotion)
        ? Boolean(object.enableRobotLocomotion)
        : undefined,
    };
  },

  toJSON(message: ConstrainedManipulationCommand_Request): unknown {
    const obj: any = {};
    message.frameName !== undefined && (obj.frameName = message.frameName);
    message.initWrenchDirectionInFrameName !== undefined &&
      (obj.initWrenchDirectionInFrameName =
        message.initWrenchDirectionInFrameName
          ? Wrench.toJSON(message.initWrenchDirectionInFrameName)
          : undefined);
    message.tangentialSpeed !== undefined &&
      (obj.tangentialSpeed = message.tangentialSpeed);
    message.rotationalSpeed !== undefined &&
      (obj.rotationalSpeed = message.rotationalSpeed);
    message.forceLimit !== undefined && (obj.forceLimit = message.forceLimit);
    message.torqueLimit !== undefined &&
      (obj.torqueLimit = message.torqueLimit);
    message.taskType !== undefined &&
      (obj.taskType = constrainedManipulationCommand_Request_TaskTypeToJSON(
        message.taskType
      ));
    message.endTime !== undefined &&
      (obj.endTime = message.endTime.toISOString());
    message.enableRobotLocomotion !== undefined &&
      (obj.enableRobotLocomotion = message.enableRobotLocomotion);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<ConstrainedManipulationCommand_Request>, I>
  >(object: I): ConstrainedManipulationCommand_Request {
    const message = createBaseConstrainedManipulationCommand_Request();
    message.frameName = object.frameName ?? "";
    message.initWrenchDirectionInFrameName =
      object.initWrenchDirectionInFrameName !== undefined &&
      object.initWrenchDirectionInFrameName !== null
        ? Wrench.fromPartial(object.initWrenchDirectionInFrameName)
        : undefined;
    message.tangentialSpeed = object.tangentialSpeed ?? undefined;
    message.rotationalSpeed = object.rotationalSpeed ?? undefined;
    message.forceLimit = object.forceLimit ?? undefined;
    message.torqueLimit = object.torqueLimit ?? undefined;
    message.taskType = object.taskType ?? 0;
    message.endTime = object.endTime ?? undefined;
    message.enableRobotLocomotion = object.enableRobotLocomotion ?? undefined;
    return message;
  },
};

function createBaseConstrainedManipulationCommand_Feedback(): ConstrainedManipulationCommand_Feedback {
  return { status: 0, desiredWrenchOdomFrame: undefined };
}

export const ConstrainedManipulationCommand_Feedback = {
  encode(
    message: ConstrainedManipulationCommand_Feedback,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    if (message.desiredWrenchOdomFrame !== undefined) {
      Wrench.encode(
        message.desiredWrenchOdomFrame,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ConstrainedManipulationCommand_Feedback {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConstrainedManipulationCommand_Feedback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32() as any;
          break;
        case 2:
          message.desiredWrenchOdomFrame = Wrench.decode(
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

  fromJSON(object: any): ConstrainedManipulationCommand_Feedback {
    return {
      status: isSet(object.status)
        ? constrainedManipulationCommand_Feedback_StatusFromJSON(object.status)
        : 0,
      desiredWrenchOdomFrame: isSet(object.desiredWrenchOdomFrame)
        ? Wrench.fromJSON(object.desiredWrenchOdomFrame)
        : undefined,
    };
  },

  toJSON(message: ConstrainedManipulationCommand_Feedback): unknown {
    const obj: any = {};
    message.status !== undefined &&
      (obj.status = constrainedManipulationCommand_Feedback_StatusToJSON(
        message.status
      ));
    message.desiredWrenchOdomFrame !== undefined &&
      (obj.desiredWrenchOdomFrame = message.desiredWrenchOdomFrame
        ? Wrench.toJSON(message.desiredWrenchOdomFrame)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<ConstrainedManipulationCommand_Feedback>, I>
  >(object: I): ConstrainedManipulationCommand_Feedback {
    const message = createBaseConstrainedManipulationCommand_Feedback();
    message.status = object.status ?? 0;
    message.desiredWrenchOdomFrame =
      object.desiredWrenchOdomFrame !== undefined &&
      object.desiredWrenchOdomFrame !== null
        ? Wrench.fromPartial(object.desiredWrenchOdomFrame)
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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
