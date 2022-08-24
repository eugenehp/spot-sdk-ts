/* eslint-disable */
import {
  RobotCommandFeedbackStatus_Status,
  ArmDragCommand_Request,
  ArmDragCommand_Feedback,
  robotCommandFeedbackStatus_StatusFromJSON,
  robotCommandFeedbackStatus_StatusToJSON,
} from "./basic_command";
import { Timestamp } from "../../google/protobuf/timestamp";
import { CylindricalCoordinate, Vec3, SE3Pose } from "./geometry";
import { SE3Trajectory, WrenchTrajectory, Vec3Trajectory } from "./trajectory";
import { Duration } from "../../google/protobuf/duration";
import _m0 from "protobufjs/minimal";
import { BoolValue, DoubleValue } from "../../google/protobuf/wrappers";

export const protobufPackage = "bosdyn.api";

/**
 * The synchronized command message for commanding the arm to move.
 * A synchronized commands is one of the possible robot command messages for controlling the robot.
 */
export interface ArmCommand {}

/** The arm request must be one of the basic command primitives. */
export interface ArmCommand_Request {
  /** Control the end-effector in Cartesian space. */
  armCartesianCommand: ArmCartesianCommand_Request | undefined;
  /** Control joint angles of the arm. */
  armJointMoveCommand: ArmJointMoveCommand_Request | undefined;
  /** Move the arm to some predefined configurations. */
  namedArmPositionCommand: NamedArmPositionsCommand_Request | undefined;
  /** Velocity control of the end-effector. */
  armVelocityCommand: ArmVelocityCommand_Request | undefined;
  /** Point the gripper at a point in the world. */
  armGazeCommand: GazeCommand_Request | undefined;
  /** Stop the arm in place with minimal motion. */
  armStopCommand: ArmStopCommand_Request | undefined;
  /** Use the arm to drag something held in the gripper. */
  armDragCommand: ArmDragCommand_Request | undefined;
  /** Any arm parameters to send, common across all arm commands */
  params: ArmParams | undefined;
}

/**
 * The feedback for the arm command that will provide information on the progress
 * of the command.
 */
export interface ArmCommand_Feedback {
  /** Feedback for the end-effector Cartesian command. */
  armCartesianFeedback: ArmCartesianCommand_Feedback | undefined;
  /** Feedback for the joint move command. */
  armJointMoveFeedback: ArmJointMoveCommand_Feedback | undefined;
  /** Feedback for the named position move command. */
  namedArmPositionFeedback: NamedArmPositionsCommand_Feedback | undefined;
  armVelocityFeedback: ArmVelocityCommand_Feedback | undefined;
  /** Feedback for the gaze command. */
  armGazeFeedback: GazeCommand_Feedback | undefined;
  armStopFeedback: ArmStopCommand_Feedback | undefined;
  /** Feedback for the drag command. */
  armDragFeedback: ArmDragCommand_Feedback | undefined;
  status: RobotCommandFeedbackStatus_Status;
}

/** Parameters common across arm commands. */
export interface ArmParams {
  /**
   * / Whether or not to disable the body force limiter running on the robot. By default, this is
   * / on, and the chance that the body falls over because the arm makes contact in the world is
   * / low. If this is purposely disabled (by setting disable_body_force_limiter to True), the arm
   * / may be able to accelerate faster, and apply more force to the world and to objects than usual,
   * / but there is also added risk of the robot falling over.
   */
  disableBodyForceLimiter: boolean | undefined;
}

/**
 * When controlling the arm with a joystick, because of latency it can often be better to send
 * velocity commands rather than position commands.  Both linear and angular velocity can be
 * specified.  The linear velocity can be specified in a cylindrical frame around the shoulder or
 * with a specified frame.
 */
export interface ArmVelocityCommand {}

export interface ArmVelocityCommand_CylindricalVelocity {
  /**
   * / The linear velocities for the end-effector are specified in unitless cylindrical
   * / coordinates. The origin of the cylindrical coordinate system is the base of the arm
   * / (shoulder).  The Z-axis is aligned with gravity, and the X-axis is the unit vector from
   * / the shoulder to the hand-point. This construction allows for 'Z'-axis velocities to
   * / raise/lower the hand, 'R'-axis velocities will cause the hand to move towards/away from
   * / the shoulder, and 'theta'-axis velocities will cause the hand to travel
   * / clockwise/counter-clockwise around the shoulder. Lastly, the command is unitless, with
   * / values for each axis specified in the range [-1, 1].  A value of 0 denotes no velocity
   * / and values of +/- 1 denote maximum velocity (see max_linear_velocity).
   */
  linearVelocity: CylindricalCoordinate | undefined;
  /**
   * / The maximum velocity in meters / second for the hand.
   * / If unset and default value of 0 received, will set max_linear_velocity to 0.5 m/s.
   */
  maxLinearVelocity: number | undefined;
}

export interface ArmVelocityCommand_CartesianVelocity {
  /** The frame to express our velocities in */
  frameName: string;
  /** The x-y-z velocity of the hand (m/s) with respect to the frame */
  velocityInFrameName: Vec3 | undefined;
}

export interface ArmVelocityCommand_Request {
  cylindricalVelocity: ArmVelocityCommand_CylindricalVelocity | undefined;
  cartesianVelocity: ArmVelocityCommand_CartesianVelocity | undefined;
  /**
   * The angular velocity of the hand frame measured with respect to the odom frame, expressed
   * in the hand frame. A 'X' rate will cause the hand to rotate about its x-axis, e.g. the
   * final wrist twist joint will rotate. And similarly, 'Y' and 'Z' rates will cause the hand
   * to rotate about its y and z axis respectively. \
   * The units should be rad/sec.
   */
  angularVelocityOfHandRtOdomInHand: Vec3 | undefined;
  /** Optional maximum acceleration magnitude of the end-effector. (m/s^2) */
  maximumAcceleration: number | undefined;
  /**
   * The timestamp (in robot time) by which a command must finish executing.
   * This is a required field and used to prevent runaway commands.
   */
  endTime: Date | undefined;
}

/** ArmVelocityCommand provides no feedback */
export interface ArmVelocityCommand_Feedback {}

/** Command the arm move to a predefined configuration. */
export interface NamedArmPositionsCommand {}

export enum NamedArmPositionsCommand_Positions {
  /** POSITIONS_UNKNOWN - Invalid request; do not use. */
  POSITIONS_UNKNOWN = 0,
  /**
   * POSITIONS_CARRY - The carry position is a damped, force limited position close to stow, with the hand
   * slightly in front of the robot.
   */
  POSITIONS_CARRY = 1,
  /**
   * POSITIONS_READY - Move arm to ready position. The ready position is defined with the hand directly in
   * front of and slightly above the body, with the hand facing forward in the robot body +X
   * direction.
   */
  POSITIONS_READY = 2,
  /**
   * POSITIONS_STOW - Stow the arm, safely. If the robot is holding something, it will freeze the arm instead
   * of stowing.  Overriding the carry_state to CARRY_STATE_CARRIABLE_AND_STOWABLE, will allow
   * the robot to stow the arm while grasping an item.
   */
  POSITIONS_STOW = 3,
  UNRECOGNIZED = -1,
}

export function namedArmPositionsCommand_PositionsFromJSON(
  object: any
): NamedArmPositionsCommand_Positions {
  switch (object) {
    case 0:
    case "POSITIONS_UNKNOWN":
      return NamedArmPositionsCommand_Positions.POSITIONS_UNKNOWN;
    case 1:
    case "POSITIONS_CARRY":
      return NamedArmPositionsCommand_Positions.POSITIONS_CARRY;
    case 2:
    case "POSITIONS_READY":
      return NamedArmPositionsCommand_Positions.POSITIONS_READY;
    case 3:
    case "POSITIONS_STOW":
      return NamedArmPositionsCommand_Positions.POSITIONS_STOW;
    case -1:
    case "UNRECOGNIZED":
    default:
      return NamedArmPositionsCommand_Positions.UNRECOGNIZED;
  }
}

export function namedArmPositionsCommand_PositionsToJSON(
  object: NamedArmPositionsCommand_Positions
): string {
  switch (object) {
    case NamedArmPositionsCommand_Positions.POSITIONS_UNKNOWN:
      return "POSITIONS_UNKNOWN";
    case NamedArmPositionsCommand_Positions.POSITIONS_CARRY:
      return "POSITIONS_CARRY";
    case NamedArmPositionsCommand_Positions.POSITIONS_READY:
      return "POSITIONS_READY";
    case NamedArmPositionsCommand_Positions.POSITIONS_STOW:
      return "POSITIONS_STOW";
    case NamedArmPositionsCommand_Positions.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface NamedArmPositionsCommand_Request {
  position: NamedArmPositionsCommand_Positions;
}

export interface NamedArmPositionsCommand_Feedback {
  /** Current status of the request. */
  status: NamedArmPositionsCommand_Feedback_Status;
}

export enum NamedArmPositionsCommand_Feedback_Status {
  /** STATUS_UNKNOWN - STATUS_UNKNOWN should never be used. If used, an internal error has happened. */
  STATUS_UNKNOWN = 0,
  /** STATUS_COMPLETE - The arm is at the desired configuration. */
  STATUS_COMPLETE = 1,
  /** STATUS_IN_PROGRESS - Robot is re-configuring arm to get to desired configuration. */
  STATUS_IN_PROGRESS = 2,
  /**
   * STATUS_STALLED_HOLDING_ITEM - Some positions may refuse to execute if the gripper is holding an item, for example
   * stow.
   */
  STATUS_STALLED_HOLDING_ITEM = 3,
  UNRECOGNIZED = -1,
}

export function namedArmPositionsCommand_Feedback_StatusFromJSON(
  object: any
): NamedArmPositionsCommand_Feedback_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return NamedArmPositionsCommand_Feedback_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_COMPLETE":
      return NamedArmPositionsCommand_Feedback_Status.STATUS_COMPLETE;
    case 2:
    case "STATUS_IN_PROGRESS":
      return NamedArmPositionsCommand_Feedback_Status.STATUS_IN_PROGRESS;
    case 3:
    case "STATUS_STALLED_HOLDING_ITEM":
      return NamedArmPositionsCommand_Feedback_Status.STATUS_STALLED_HOLDING_ITEM;
    case -1:
    case "UNRECOGNIZED":
    default:
      return NamedArmPositionsCommand_Feedback_Status.UNRECOGNIZED;
  }
}

export function namedArmPositionsCommand_Feedback_StatusToJSON(
  object: NamedArmPositionsCommand_Feedback_Status
): string {
  switch (object) {
    case NamedArmPositionsCommand_Feedback_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case NamedArmPositionsCommand_Feedback_Status.STATUS_COMPLETE:
      return "STATUS_COMPLETE";
    case NamedArmPositionsCommand_Feedback_Status.STATUS_IN_PROGRESS:
      return "STATUS_IN_PROGRESS";
    case NamedArmPositionsCommand_Feedback_Status.STATUS_STALLED_HOLDING_ITEM:
      return "STATUS_STALLED_HOLDING_ITEM";
    case NamedArmPositionsCommand_Feedback_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Command the end effector of the arm.  Each axis in the task frame is allowed to be set to
 * position mode (default) or Force mode.  If the axis is set to position, the desired value is read
 * from the pose_trajectory_in_task. If the axis is set to force, the desired value is read from
 * the wrench_trajectory. This supports hybrid control of the arm where users can specify, for
 * example, Z to be in force control with X and Y in position control.
 */
export interface ArmCartesianCommand {}

export interface ArmCartesianCommand_Request {
  /**
   * The root frame is used to set the optional task frame that all trajectories are
   * specified with respect to.  If the optional task frame is left un-specified it defaults
   * to the identity transform and the root frame becomes the task frame.
   */
  rootFrameName: string;
  /**
   * The tool pose relative to the parent link (wrist).
   * Defaults to
   *    [0.19557 0 0]
   *    [1 0 0 0]
   * a frame with it's origin slightly in front of the gripper's palm plate aligned with
   * wrist's orientation.
   */
  wristTformTool: SE3Pose | undefined;
  /**
   * The fields below are specified in this optional task frame.  If unset it defaults
   * to the identity transform and all quantities are therefore expressed in the
   * root_frame_name.
   */
  rootTformTask: SE3Pose | undefined;
  /**
   * A 3D pose trajectory for the tool expressed in the task frame, e.g. task_T_tool.
   * This pose trajectory is optional if requesting a pure wrench at the end-effector,
   * otherwise required for position or mixed force/position end-effector requests.
   */
  poseTrajectoryInTask: SE3Trajectory | undefined;
  /**
   * Optional Maximum acceleration magnitude of the end-effector.
   * Valid ranges (0, 20]
   */
  maximumAcceleration: number | undefined;
  /** Optional Maximum linear velocity magnitude of the end-effector. (m/s) */
  maxLinearVelocity: number | undefined;
  /** Optional Maximum angular velocity magnitude of the end-effector. (rad/s) */
  maxAngularVelocity: number | undefined;
  /**
   * Maximum allowable tracking error of the tool frame from the desired trajectory
   * before the arm will stop moving and cancel the rest of the trajectory. When this limit is
   * exceeded, the hand will stay at the pose it was at when it exceeded the tracking error,
   * and any other part of the trajectory specified in the rest of this message will be
   * ignored. max position tracking error in meters
   */
  maxPosTrackingError: number | undefined;
  /** max orientation tracking error in radians */
  maxRotTrackingError: number | undefined;
  forceRemainNearCurrentJointConfiguration: boolean | undefined;
  preferredJointConfiguration: ArmJointPosition | undefined;
  xAxis: ArmCartesianCommand_Request_AxisMode;
  yAxis: ArmCartesianCommand_Request_AxisMode;
  zAxis: ArmCartesianCommand_Request_AxisMode;
  rxAxis: ArmCartesianCommand_Request_AxisMode;
  ryAxis: ArmCartesianCommand_Request_AxisMode;
  rzAxis: ArmCartesianCommand_Request_AxisMode;
  /**
   * A force/torque trajectory for the tool expressed in the task frame.
   * This trajectory is optional if requesting a pure pose at the end-effector,
   * otherwise required for force or mixed force/position end-effector requests.
   */
  wrenchTrajectoryInTask: WrenchTrajectory | undefined;
}

/**
 * If an axis is set to position mode (default), read desired from SE3Trajectory trajectory
 * command.  If mode is set to Force, read desired from WrenchTrajectory wrench_trajectory
 * command.  This supports hybrid control of the arm where users can specify, for example, Z
 * to be in force control with X and Y in position control.  The elements are expressed in
 * the same task_frame as the trajectories.
 */
export enum ArmCartesianCommand_Request_AxisMode {
  AXIS_MODE_POSITION = 0,
  AXIS_MODE_FORCE = 1,
  UNRECOGNIZED = -1,
}

export function armCartesianCommand_Request_AxisModeFromJSON(
  object: any
): ArmCartesianCommand_Request_AxisMode {
  switch (object) {
    case 0:
    case "AXIS_MODE_POSITION":
      return ArmCartesianCommand_Request_AxisMode.AXIS_MODE_POSITION;
    case 1:
    case "AXIS_MODE_FORCE":
      return ArmCartesianCommand_Request_AxisMode.AXIS_MODE_FORCE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ArmCartesianCommand_Request_AxisMode.UNRECOGNIZED;
  }
}

export function armCartesianCommand_Request_AxisModeToJSON(
  object: ArmCartesianCommand_Request_AxisMode
): string {
  switch (object) {
    case ArmCartesianCommand_Request_AxisMode.AXIS_MODE_POSITION:
      return "AXIS_MODE_POSITION";
    case ArmCartesianCommand_Request_AxisMode.AXIS_MODE_FORCE:
      return "AXIS_MODE_FORCE";
    case ArmCartesianCommand_Request_AxisMode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ArmCartesianCommand_Feedback {
  /** Current status of the pose trajectory. */
  status: ArmCartesianCommand_Feedback_Status;
  /** Current linear tracking error of the tool frame [meters]. */
  measuredPosTrackingError: number;
  /** Current rotational tracking error of the tool frame [radians]. */
  measuredRotTrackingError: number;
  /** Linear distance from the tool to the tool trajectory's end point [meters]. */
  measuredPosDistanceToGoal: number;
  /** Rotational distance from the tool to the trajectory's end point [radians]. */
  measuredRotDistanceToGoal: number;
}

export enum ArmCartesianCommand_Feedback_Status {
  /** STATUS_UNKNOWN - STATUS_UNKNOWN should never be used. If used, an internal error has happened. */
  STATUS_UNKNOWN = 0,
  /** STATUS_TRAJECTORY_COMPLETE - Tool frame has reached the end of the trajectory within tracking error bounds. */
  STATUS_TRAJECTORY_COMPLETE = 1,
  /** STATUS_IN_PROGRESS - Robot is attempting to reach the target. */
  STATUS_IN_PROGRESS = 2,
  /** STATUS_TRAJECTORY_CANCELLED - Tool frame exceeded maximum allowable tracking error from the desired trajectory. */
  STATUS_TRAJECTORY_CANCELLED = 3,
  /**
   * STATUS_TRAJECTORY_STALLED - The arm has stopped making progress to the goal.  Note, this does not cancel the
   * trajectory. For example, if the requested goal is too far away, walking the base
   * robot closer to the goal will cause the arm to continue along the trajectory once the
   * goal point is inside the workspace.
   */
  STATUS_TRAJECTORY_STALLED = 4,
  UNRECOGNIZED = -1,
}

export function armCartesianCommand_Feedback_StatusFromJSON(
  object: any
): ArmCartesianCommand_Feedback_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return ArmCartesianCommand_Feedback_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_TRAJECTORY_COMPLETE":
      return ArmCartesianCommand_Feedback_Status.STATUS_TRAJECTORY_COMPLETE;
    case 2:
    case "STATUS_IN_PROGRESS":
      return ArmCartesianCommand_Feedback_Status.STATUS_IN_PROGRESS;
    case 3:
    case "STATUS_TRAJECTORY_CANCELLED":
      return ArmCartesianCommand_Feedback_Status.STATUS_TRAJECTORY_CANCELLED;
    case 4:
    case "STATUS_TRAJECTORY_STALLED":
      return ArmCartesianCommand_Feedback_Status.STATUS_TRAJECTORY_STALLED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ArmCartesianCommand_Feedback_Status.UNRECOGNIZED;
  }
}

export function armCartesianCommand_Feedback_StatusToJSON(
  object: ArmCartesianCommand_Feedback_Status
): string {
  switch (object) {
    case ArmCartesianCommand_Feedback_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case ArmCartesianCommand_Feedback_Status.STATUS_TRAJECTORY_COMPLETE:
      return "STATUS_TRAJECTORY_COMPLETE";
    case ArmCartesianCommand_Feedback_Status.STATUS_IN_PROGRESS:
      return "STATUS_IN_PROGRESS";
    case ArmCartesianCommand_Feedback_Status.STATUS_TRAJECTORY_CANCELLED:
      return "STATUS_TRAJECTORY_CANCELLED";
    case ArmCartesianCommand_Feedback_Status.STATUS_TRAJECTORY_STALLED:
      return "STATUS_TRAJECTORY_STALLED";
    case ArmCartesianCommand_Feedback_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Specify a set of joint angles to move the arm. */
export interface ArmJointMoveCommand {}

export interface ArmJointMoveCommand_Request {
  /**
   * Note: Sending a single point empty trajectory will cause the arm to freeze in place. This
   * is an easy way to lock the arm in its current configuration.
   */
  trajectory: ArmJointTrajectory | undefined;
}

export interface ArmJointMoveCommand_Feedback {
  /** Current status of the request. */
  status: ArmJointMoveCommand_Feedback_Status;
  /** Current status of the trajectory planner. */
  plannerStatus: ArmJointMoveCommand_Feedback_PlannerStatus;
  /**
   * Based on the user trajectory, the planned knot points that obey acceleration and
   * velocity constraints. If these knot points don't match the requested knot points,
   * consider increasing velocity/acceleration limits, and/or staying further away from
   * joint position limits. In situations where we've modified you last point, we append
   * a minimum time trajectory (that obeys the velocity and acceleration limits) from the
   * planner's final point to the requested final point. This means that the length of
   * planned_points may be one point larger than the requested.
   */
  plannedPoints: ArmJointTrajectoryPoint[];
  /**
   * Returns amount of time remaining until the joints are at the goal position.  For
   * multiple point trajectories, this is the time remaining to the final point.
   */
  timeToGoal: Duration | undefined;
}

export enum ArmJointMoveCommand_Feedback_Status {
  /** STATUS_UNKNOWN - STATUS_UNKNOWN should never be used. If used, an internal error has happened */
  STATUS_UNKNOWN = 0,
  /** STATUS_COMPLETE - The arm is at the desired configuration. */
  STATUS_COMPLETE = 1,
  /** STATUS_IN_PROGRESS - Robot is re-configuring arm to get to desired configuration. */
  STATUS_IN_PROGRESS = 2,
  UNRECOGNIZED = -1,
}

export function armJointMoveCommand_Feedback_StatusFromJSON(
  object: any
): ArmJointMoveCommand_Feedback_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return ArmJointMoveCommand_Feedback_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_COMPLETE":
      return ArmJointMoveCommand_Feedback_Status.STATUS_COMPLETE;
    case 2:
    case "STATUS_IN_PROGRESS":
      return ArmJointMoveCommand_Feedback_Status.STATUS_IN_PROGRESS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ArmJointMoveCommand_Feedback_Status.UNRECOGNIZED;
  }
}

export function armJointMoveCommand_Feedback_StatusToJSON(
  object: ArmJointMoveCommand_Feedback_Status
): string {
  switch (object) {
    case ArmJointMoveCommand_Feedback_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case ArmJointMoveCommand_Feedback_Status.STATUS_COMPLETE:
      return "STATUS_COMPLETE";
    case ArmJointMoveCommand_Feedback_Status.STATUS_IN_PROGRESS:
      return "STATUS_IN_PROGRESS";
    case ArmJointMoveCommand_Feedback_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum ArmJointMoveCommand_Feedback_PlannerStatus {
  /** PLANNER_STATUS_UNKNOWN - PLANNER_STATUS_UNKNOWN should never be used. If used, an internal error has happened. */
  PLANNER_STATUS_UNKNOWN = 0,
  /** PLANNER_STATUS_SUCCESS - A solution passing through the desired points and obeying the constraints was found. */
  PLANNER_STATUS_SUCCESS = 1,
  /**
   * PLANNER_STATUS_MODIFIED - The planner had to modify the desired points in order to obey the constraints.  For
   * example, if you specify a 1 point trajectory, and tell it to get there in a really short
   * amount of time, but haven't set a high allowable max velocity / acceleration, the planner
   * will do its best to get as close as possible to the final point, but won't reach it. In
   * situations where we've modified you last point, we append a minimum time trajectory (that
   * obeys the velocity and acceleration limits) from the planner's final point to the requested
   * final point.
   */
  PLANNER_STATUS_MODIFIED = 2,
  /**
   * PLANNER_STATUS_FAILED - Failed to compute a valid trajectory, will go to first point instead. It is possible
   * that our optimizer till fail to solve the problem instead of returning a sub-optimal
   * solution.  This is un-likely to occur.
   */
  PLANNER_STATUS_FAILED = 3,
  UNRECOGNIZED = -1,
}

export function armJointMoveCommand_Feedback_PlannerStatusFromJSON(
  object: any
): ArmJointMoveCommand_Feedback_PlannerStatus {
  switch (object) {
    case 0:
    case "PLANNER_STATUS_UNKNOWN":
      return ArmJointMoveCommand_Feedback_PlannerStatus.PLANNER_STATUS_UNKNOWN;
    case 1:
    case "PLANNER_STATUS_SUCCESS":
      return ArmJointMoveCommand_Feedback_PlannerStatus.PLANNER_STATUS_SUCCESS;
    case 2:
    case "PLANNER_STATUS_MODIFIED":
      return ArmJointMoveCommand_Feedback_PlannerStatus.PLANNER_STATUS_MODIFIED;
    case 3:
    case "PLANNER_STATUS_FAILED":
      return ArmJointMoveCommand_Feedback_PlannerStatus.PLANNER_STATUS_FAILED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ArmJointMoveCommand_Feedback_PlannerStatus.UNRECOGNIZED;
  }
}

export function armJointMoveCommand_Feedback_PlannerStatusToJSON(
  object: ArmJointMoveCommand_Feedback_PlannerStatus
): string {
  switch (object) {
    case ArmJointMoveCommand_Feedback_PlannerStatus.PLANNER_STATUS_UNKNOWN:
      return "PLANNER_STATUS_UNKNOWN";
    case ArmJointMoveCommand_Feedback_PlannerStatus.PLANNER_STATUS_SUCCESS:
      return "PLANNER_STATUS_SUCCESS";
    case ArmJointMoveCommand_Feedback_PlannerStatus.PLANNER_STATUS_MODIFIED:
      return "PLANNER_STATUS_MODIFIED";
    case ArmJointMoveCommand_Feedback_PlannerStatus.PLANNER_STATUS_FAILED:
      return "PLANNER_STATUS_FAILED";
    case ArmJointMoveCommand_Feedback_PlannerStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Position of our 6 arm joints in radians. If a joint angle is not specified,
 * we will use the joint position at time the message is received on robot.
 */
export interface ArmJointPosition {
  sh0: number | undefined;
  sh1: number | undefined;
  el0: number | undefined;
  el1: number | undefined;
  wr0: number | undefined;
  wr1: number | undefined;
}

/**
 * Velocity of our 6 arm joints in radians / second. If a velocity
 * for a joint is specified, velocities for all joints we are
 * trying to move must be specified.
 */
export interface ArmJointVelocity {
  sh0: number | undefined;
  sh1: number | undefined;
  el0: number | undefined;
  el1: number | undefined;
  wr0: number | undefined;
  wr1: number | undefined;
}

/** A set of joint angles and velocities that can be used as a point within a joint trajectory. */
export interface ArmJointTrajectoryPoint {
  /** Desired joint angles in radians */
  position: ArmJointPosition | undefined;
  /** Optional desired joint velocities in radians / sec */
  velocity: ArmJointVelocity | undefined;
  /** The time since reference at which we wish to achieve this position / velocity */
  timeSinceReference: Duration | undefined;
}

/**
 * This allows a user to move the arm's joints directly. Each of the arm's joints will never move
 * faster than maximum_velocity and never accelerate faster than maximum_acceleration. The user can
 * specify a trajectory of joint positions and optional velocities for the arm to follow. The
 * trajectory will be acted upon as follows. If a single trajectory point with no time is provided,
 * the arm will take the joint currently furthest away from the goal pose and plan a minimum time
 * trajectory such that the joint accelerates at maximum_acceleration, coasts at maximum_velocity,
 * and decelerates at maximum_acceleration. The other joints will accelerate at
 * maximum_acceleration, but then coast at a slower speed such that all joints arrive at the goal
 * pose simultaneously with zero velocity. If the user provides trajectory times, the robot will fit
 * a piece-wise cubic trajectory (continuous position and velocity) to the user's requested
 * positions and (optional) velocities. If the requested trajectory is not achievable because it
 * will violate position limits or the maximum_velocity or maximum_acceleration, the robot will pick
 * a trajectory that is as close as possible to the user requested without violating velocity or
 * acceleration limits.
 *
 * If the robot is not hitting the desired trajectory, try increasing the time between knot points,
 * increasing the max velocity and acceleration, or only specifying joint position goals without a
 * velocity
 */
export interface ArmJointTrajectory {
  /** The points in our trajectory. (positions, (optional) velocity, (optional) time) */
  points: ArmJointTrajectoryPoint[];
  /**
   * All trajectory points specify times relative to this reference time. The reference
   * time should be in robot clock. If this field is not included, this time will be
   * the receive time of the command.
   */
  referenceTime: Date | undefined;
  /**
   * The maximum velocity in rad/s that any joint is allowed to achieve.
   * If this field is not set, a default value will be used.
   */
  maximumVelocity: number | undefined;
  /**
   * The maximum acceleration in rad/s^2 that any joint is allowed to
   * achieve. If this field is not set, a default value will be used.
   */
  maximumAcceleration: number | undefined;
}

/** / Move the hand in such a way to point it at a position in the world. */
export interface GazeCommand {}

export interface GazeCommand_Request {
  /** Point(s) to look at expressed in frame1. */
  targetTrajectoryInFrame1: Vec3Trajectory | undefined;
  frame1Name: string;
  /**
   * Optional, desired pose of the tool expressed in frame2.  Will be constrained to 'look at'
   * the target regardless of the requested orientation.
   */
  toolTrajectoryInFrame2: SE3Trajectory | undefined;
  frame2Name: string;
  /**
   * The transformation of the tool pose relative to the parent link (wrist).
   * If the field is left unset, the transform will default to:
   *      The position is wrist_tform_hand.position() [20 cm translation in wrist x].
   *      The rotation is wrist_tform_hand_camera.rotation() [-9 degree pitch about wrist y].
   */
  wristTformTool: SE3Pose | undefined;
  /**
   * Optional velocity to move the target along the shortest path from the gaze's starting
   * position to the first point in the target trajectory.
   */
  targetTrajectoryInitialVelocity: number | undefined;
  /**
   * Optional Maximum acceleration magnitude of the end-effector.
   * Valid ranges (0, 20]
   */
  maximumAcceleration: number | undefined;
  /** Optional Maximum linear velocity magnitude of the end-effector. (m/s) */
  maxLinearVelocity: number | undefined;
  /** Optional Maximum angular velocity magnitude of the end-effector. (rad/s) */
  maxAngularVelocity: number | undefined;
}

export interface GazeCommand_Feedback {
  /** Current status of the command. */
  status: GazeCommand_Feedback_Status;
  /**
   * If we are gazing at the target
   * Rotation from the current gaze point to the trajectory's end [radians]
   */
  gazingAtTarget: boolean;
  gazeToTargetRotationMeasured: number;
  /**
   * If the hand's position is at the goal.
   * Distance from the hand's current position to the trajectory's end [meters]
   */
  handPositionAtGoal: boolean;
  handDistanceToGoalMeasured: number;
  /**
   * If the hand's roll is at the goal.
   * Rotation from the current hand position to the desired roll at the trajectory's end
   * [radians]
   */
  handRollAtGoal: boolean;
  handRollToTargetRollMeasured: number;
}

export enum GazeCommand_Feedback_Status {
  /** STATUS_UNKNOWN - STATUS_UNKNOWN should never be used. If used, an internal error has happened. */
  STATUS_UNKNOWN = 0,
  /** STATUS_TRAJECTORY_COMPLETE - Robot is gazing at the target at the end of the trajectory. */
  STATUS_TRAJECTORY_COMPLETE = 1,
  /** STATUS_IN_PROGRESS - Robot is re-configuring arm to gaze at the target. */
  STATUS_IN_PROGRESS = 2,
  /**
   * STATUS_TOOL_TRAJECTORY_STALLED - The arm has stopped making progress to the goal pose for the tool.
   * Note, this does not cancel the trajectory. For example, if the requested goal is too
   * far away, walking the base robot closer to the goal will cause the arm to continue
   * along the trajectory once it can continue.
   */
  STATUS_TOOL_TRAJECTORY_STALLED = 3,
  UNRECOGNIZED = -1,
}

export function gazeCommand_Feedback_StatusFromJSON(
  object: any
): GazeCommand_Feedback_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return GazeCommand_Feedback_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_TRAJECTORY_COMPLETE":
      return GazeCommand_Feedback_Status.STATUS_TRAJECTORY_COMPLETE;
    case 2:
    case "STATUS_IN_PROGRESS":
      return GazeCommand_Feedback_Status.STATUS_IN_PROGRESS;
    case 3:
    case "STATUS_TOOL_TRAJECTORY_STALLED":
      return GazeCommand_Feedback_Status.STATUS_TOOL_TRAJECTORY_STALLED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GazeCommand_Feedback_Status.UNRECOGNIZED;
  }
}

export function gazeCommand_Feedback_StatusToJSON(
  object: GazeCommand_Feedback_Status
): string {
  switch (object) {
    case GazeCommand_Feedback_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case GazeCommand_Feedback_Status.STATUS_TRAJECTORY_COMPLETE:
      return "STATUS_TRAJECTORY_COMPLETE";
    case GazeCommand_Feedback_Status.STATUS_IN_PROGRESS:
      return "STATUS_IN_PROGRESS";
    case GazeCommand_Feedback_Status.STATUS_TOOL_TRAJECTORY_STALLED:
      return "STATUS_TOOL_TRAJECTORY_STALLED";
    case GazeCommand_Feedback_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Stop the arm applying minimal forces to the world. For example, if the arm is in the  middle of
 * opening a heavy door and a stop command is sent, the arm will comply and let the door close.
 */
export interface ArmStopCommand {}

/** Stop command takes no arguments. */
export interface ArmStopCommand_Request {}

/** Stop command provides no feedback */
export interface ArmStopCommand_Feedback {}

function createBaseArmCommand(): ArmCommand {
  return {};
}

export const ArmCommand = {
  encode(_: ArmCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ArmCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArmCommand();
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

  fromJSON(_: any): ArmCommand {
    return {};
  },

  toJSON(_: ArmCommand): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ArmCommand>, I>>(_: I): ArmCommand {
    const message = createBaseArmCommand();
    return message;
  },
};

function createBaseArmCommand_Request(): ArmCommand_Request {
  return {
    armCartesianCommand: undefined,
    armJointMoveCommand: undefined,
    namedArmPositionCommand: undefined,
    armVelocityCommand: undefined,
    armGazeCommand: undefined,
    armStopCommand: undefined,
    armDragCommand: undefined,
    params: undefined,
  };
}

export const ArmCommand_Request = {
  encode(
    message: ArmCommand_Request,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.armCartesianCommand !== undefined) {
      ArmCartesianCommand_Request.encode(
        message.armCartesianCommand,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.armJointMoveCommand !== undefined) {
      ArmJointMoveCommand_Request.encode(
        message.armJointMoveCommand,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.namedArmPositionCommand !== undefined) {
      NamedArmPositionsCommand_Request.encode(
        message.namedArmPositionCommand,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.armVelocityCommand !== undefined) {
      ArmVelocityCommand_Request.encode(
        message.armVelocityCommand,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.armGazeCommand !== undefined) {
      GazeCommand_Request.encode(
        message.armGazeCommand,
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.armStopCommand !== undefined) {
      ArmStopCommand_Request.encode(
        message.armStopCommand,
        writer.uint32(74).fork()
      ).ldelim();
    }
    if (message.armDragCommand !== undefined) {
      ArmDragCommand_Request.encode(
        message.armDragCommand,
        writer.uint32(82).fork()
      ).ldelim();
    }
    if (message.params !== undefined) {
      ArmParams.encode(message.params, writer.uint32(90).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ArmCommand_Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArmCommand_Request();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 3:
          message.armCartesianCommand = ArmCartesianCommand_Request.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.armJointMoveCommand = ArmJointMoveCommand_Request.decode(
            reader,
            reader.uint32()
          );
          break;
        case 5:
          message.namedArmPositionCommand =
            NamedArmPositionsCommand_Request.decode(reader, reader.uint32());
          break;
        case 6:
          message.armVelocityCommand = ArmVelocityCommand_Request.decode(
            reader,
            reader.uint32()
          );
          break;
        case 8:
          message.armGazeCommand = GazeCommand_Request.decode(
            reader,
            reader.uint32()
          );
          break;
        case 9:
          message.armStopCommand = ArmStopCommand_Request.decode(
            reader,
            reader.uint32()
          );
          break;
        case 10:
          message.armDragCommand = ArmDragCommand_Request.decode(
            reader,
            reader.uint32()
          );
          break;
        case 11:
          message.params = ArmParams.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ArmCommand_Request {
    return {
      armCartesianCommand: isSet(object.armCartesianCommand)
        ? ArmCartesianCommand_Request.fromJSON(object.armCartesianCommand)
        : undefined,
      armJointMoveCommand: isSet(object.armJointMoveCommand)
        ? ArmJointMoveCommand_Request.fromJSON(object.armJointMoveCommand)
        : undefined,
      namedArmPositionCommand: isSet(object.namedArmPositionCommand)
        ? NamedArmPositionsCommand_Request.fromJSON(
            object.namedArmPositionCommand
          )
        : undefined,
      armVelocityCommand: isSet(object.armVelocityCommand)
        ? ArmVelocityCommand_Request.fromJSON(object.armVelocityCommand)
        : undefined,
      armGazeCommand: isSet(object.armGazeCommand)
        ? GazeCommand_Request.fromJSON(object.armGazeCommand)
        : undefined,
      armStopCommand: isSet(object.armStopCommand)
        ? ArmStopCommand_Request.fromJSON(object.armStopCommand)
        : undefined,
      armDragCommand: isSet(object.armDragCommand)
        ? ArmDragCommand_Request.fromJSON(object.armDragCommand)
        : undefined,
      params: isSet(object.params)
        ? ArmParams.fromJSON(object.params)
        : undefined,
    };
  },

  toJSON(message: ArmCommand_Request): unknown {
    const obj: any = {};
    message.armCartesianCommand !== undefined &&
      (obj.armCartesianCommand = message.armCartesianCommand
        ? ArmCartesianCommand_Request.toJSON(message.armCartesianCommand)
        : undefined);
    message.armJointMoveCommand !== undefined &&
      (obj.armJointMoveCommand = message.armJointMoveCommand
        ? ArmJointMoveCommand_Request.toJSON(message.armJointMoveCommand)
        : undefined);
    message.namedArmPositionCommand !== undefined &&
      (obj.namedArmPositionCommand = message.namedArmPositionCommand
        ? NamedArmPositionsCommand_Request.toJSON(
            message.namedArmPositionCommand
          )
        : undefined);
    message.armVelocityCommand !== undefined &&
      (obj.armVelocityCommand = message.armVelocityCommand
        ? ArmVelocityCommand_Request.toJSON(message.armVelocityCommand)
        : undefined);
    message.armGazeCommand !== undefined &&
      (obj.armGazeCommand = message.armGazeCommand
        ? GazeCommand_Request.toJSON(message.armGazeCommand)
        : undefined);
    message.armStopCommand !== undefined &&
      (obj.armStopCommand = message.armStopCommand
        ? ArmStopCommand_Request.toJSON(message.armStopCommand)
        : undefined);
    message.armDragCommand !== undefined &&
      (obj.armDragCommand = message.armDragCommand
        ? ArmDragCommand_Request.toJSON(message.armDragCommand)
        : undefined);
    message.params !== undefined &&
      (obj.params = message.params
        ? ArmParams.toJSON(message.params)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ArmCommand_Request>, I>>(
    object: I
  ): ArmCommand_Request {
    const message = createBaseArmCommand_Request();
    message.armCartesianCommand =
      object.armCartesianCommand !== undefined &&
      object.armCartesianCommand !== null
        ? ArmCartesianCommand_Request.fromPartial(object.armCartesianCommand)
        : undefined;
    message.armJointMoveCommand =
      object.armJointMoveCommand !== undefined &&
      object.armJointMoveCommand !== null
        ? ArmJointMoveCommand_Request.fromPartial(object.armJointMoveCommand)
        : undefined;
    message.namedArmPositionCommand =
      object.namedArmPositionCommand !== undefined &&
      object.namedArmPositionCommand !== null
        ? NamedArmPositionsCommand_Request.fromPartial(
            object.namedArmPositionCommand
          )
        : undefined;
    message.armVelocityCommand =
      object.armVelocityCommand !== undefined &&
      object.armVelocityCommand !== null
        ? ArmVelocityCommand_Request.fromPartial(object.armVelocityCommand)
        : undefined;
    message.armGazeCommand =
      object.armGazeCommand !== undefined && object.armGazeCommand !== null
        ? GazeCommand_Request.fromPartial(object.armGazeCommand)
        : undefined;
    message.armStopCommand =
      object.armStopCommand !== undefined && object.armStopCommand !== null
        ? ArmStopCommand_Request.fromPartial(object.armStopCommand)
        : undefined;
    message.armDragCommand =
      object.armDragCommand !== undefined && object.armDragCommand !== null
        ? ArmDragCommand_Request.fromPartial(object.armDragCommand)
        : undefined;
    message.params =
      object.params !== undefined && object.params !== null
        ? ArmParams.fromPartial(object.params)
        : undefined;
    return message;
  },
};

function createBaseArmCommand_Feedback(): ArmCommand_Feedback {
  return {
    armCartesianFeedback: undefined,
    armJointMoveFeedback: undefined,
    namedArmPositionFeedback: undefined,
    armVelocityFeedback: undefined,
    armGazeFeedback: undefined,
    armStopFeedback: undefined,
    armDragFeedback: undefined,
    status: 0,
  };
}

export const ArmCommand_Feedback = {
  encode(
    message: ArmCommand_Feedback,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.armCartesianFeedback !== undefined) {
      ArmCartesianCommand_Feedback.encode(
        message.armCartesianFeedback,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.armJointMoveFeedback !== undefined) {
      ArmJointMoveCommand_Feedback.encode(
        message.armJointMoveFeedback,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.namedArmPositionFeedback !== undefined) {
      NamedArmPositionsCommand_Feedback.encode(
        message.namedArmPositionFeedback,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.armVelocityFeedback !== undefined) {
      ArmVelocityCommand_Feedback.encode(
        message.armVelocityFeedback,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.armGazeFeedback !== undefined) {
      GazeCommand_Feedback.encode(
        message.armGazeFeedback,
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.armStopFeedback !== undefined) {
      ArmStopCommand_Feedback.encode(
        message.armStopFeedback,
        writer.uint32(74).fork()
      ).ldelim();
    }
    if (message.armDragFeedback !== undefined) {
      ArmDragCommand_Feedback.encode(
        message.armDragFeedback,
        writer.uint32(82).fork()
      ).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(800).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ArmCommand_Feedback {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArmCommand_Feedback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 3:
          message.armCartesianFeedback = ArmCartesianCommand_Feedback.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.armJointMoveFeedback = ArmJointMoveCommand_Feedback.decode(
            reader,
            reader.uint32()
          );
          break;
        case 5:
          message.namedArmPositionFeedback =
            NamedArmPositionsCommand_Feedback.decode(reader, reader.uint32());
          break;
        case 6:
          message.armVelocityFeedback = ArmVelocityCommand_Feedback.decode(
            reader,
            reader.uint32()
          );
          break;
        case 8:
          message.armGazeFeedback = GazeCommand_Feedback.decode(
            reader,
            reader.uint32()
          );
          break;
        case 9:
          message.armStopFeedback = ArmStopCommand_Feedback.decode(
            reader,
            reader.uint32()
          );
          break;
        case 10:
          message.armDragFeedback = ArmDragCommand_Feedback.decode(
            reader,
            reader.uint32()
          );
          break;
        case 100:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ArmCommand_Feedback {
    return {
      armCartesianFeedback: isSet(object.armCartesianFeedback)
        ? ArmCartesianCommand_Feedback.fromJSON(object.armCartesianFeedback)
        : undefined,
      armJointMoveFeedback: isSet(object.armJointMoveFeedback)
        ? ArmJointMoveCommand_Feedback.fromJSON(object.armJointMoveFeedback)
        : undefined,
      namedArmPositionFeedback: isSet(object.namedArmPositionFeedback)
        ? NamedArmPositionsCommand_Feedback.fromJSON(
            object.namedArmPositionFeedback
          )
        : undefined,
      armVelocityFeedback: isSet(object.armVelocityFeedback)
        ? ArmVelocityCommand_Feedback.fromJSON(object.armVelocityFeedback)
        : undefined,
      armGazeFeedback: isSet(object.armGazeFeedback)
        ? GazeCommand_Feedback.fromJSON(object.armGazeFeedback)
        : undefined,
      armStopFeedback: isSet(object.armStopFeedback)
        ? ArmStopCommand_Feedback.fromJSON(object.armStopFeedback)
        : undefined,
      armDragFeedback: isSet(object.armDragFeedback)
        ? ArmDragCommand_Feedback.fromJSON(object.armDragFeedback)
        : undefined,
      status: isSet(object.status)
        ? robotCommandFeedbackStatus_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: ArmCommand_Feedback): unknown {
    const obj: any = {};
    message.armCartesianFeedback !== undefined &&
      (obj.armCartesianFeedback = message.armCartesianFeedback
        ? ArmCartesianCommand_Feedback.toJSON(message.armCartesianFeedback)
        : undefined);
    message.armJointMoveFeedback !== undefined &&
      (obj.armJointMoveFeedback = message.armJointMoveFeedback
        ? ArmJointMoveCommand_Feedback.toJSON(message.armJointMoveFeedback)
        : undefined);
    message.namedArmPositionFeedback !== undefined &&
      (obj.namedArmPositionFeedback = message.namedArmPositionFeedback
        ? NamedArmPositionsCommand_Feedback.toJSON(
            message.namedArmPositionFeedback
          )
        : undefined);
    message.armVelocityFeedback !== undefined &&
      (obj.armVelocityFeedback = message.armVelocityFeedback
        ? ArmVelocityCommand_Feedback.toJSON(message.armVelocityFeedback)
        : undefined);
    message.armGazeFeedback !== undefined &&
      (obj.armGazeFeedback = message.armGazeFeedback
        ? GazeCommand_Feedback.toJSON(message.armGazeFeedback)
        : undefined);
    message.armStopFeedback !== undefined &&
      (obj.armStopFeedback = message.armStopFeedback
        ? ArmStopCommand_Feedback.toJSON(message.armStopFeedback)
        : undefined);
    message.armDragFeedback !== undefined &&
      (obj.armDragFeedback = message.armDragFeedback
        ? ArmDragCommand_Feedback.toJSON(message.armDragFeedback)
        : undefined);
    message.status !== undefined &&
      (obj.status = robotCommandFeedbackStatus_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ArmCommand_Feedback>, I>>(
    object: I
  ): ArmCommand_Feedback {
    const message = createBaseArmCommand_Feedback();
    message.armCartesianFeedback =
      object.armCartesianFeedback !== undefined &&
      object.armCartesianFeedback !== null
        ? ArmCartesianCommand_Feedback.fromPartial(object.armCartesianFeedback)
        : undefined;
    message.armJointMoveFeedback =
      object.armJointMoveFeedback !== undefined &&
      object.armJointMoveFeedback !== null
        ? ArmJointMoveCommand_Feedback.fromPartial(object.armJointMoveFeedback)
        : undefined;
    message.namedArmPositionFeedback =
      object.namedArmPositionFeedback !== undefined &&
      object.namedArmPositionFeedback !== null
        ? NamedArmPositionsCommand_Feedback.fromPartial(
            object.namedArmPositionFeedback
          )
        : undefined;
    message.armVelocityFeedback =
      object.armVelocityFeedback !== undefined &&
      object.armVelocityFeedback !== null
        ? ArmVelocityCommand_Feedback.fromPartial(object.armVelocityFeedback)
        : undefined;
    message.armGazeFeedback =
      object.armGazeFeedback !== undefined && object.armGazeFeedback !== null
        ? GazeCommand_Feedback.fromPartial(object.armGazeFeedback)
        : undefined;
    message.armStopFeedback =
      object.armStopFeedback !== undefined && object.armStopFeedback !== null
        ? ArmStopCommand_Feedback.fromPartial(object.armStopFeedback)
        : undefined;
    message.armDragFeedback =
      object.armDragFeedback !== undefined && object.armDragFeedback !== null
        ? ArmDragCommand_Feedback.fromPartial(object.armDragFeedback)
        : undefined;
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseArmParams(): ArmParams {
  return { disableBodyForceLimiter: undefined };
}

export const ArmParams = {
  encode(
    message: ArmParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.disableBodyForceLimiter !== undefined) {
      BoolValue.encode(
        { value: message.disableBodyForceLimiter! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ArmParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArmParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.disableBodyForceLimiter = BoolValue.decode(
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

  fromJSON(object: any): ArmParams {
    return {
      disableBodyForceLimiter: isSet(object.disableBodyForceLimiter)
        ? Boolean(object.disableBodyForceLimiter)
        : undefined,
    };
  },

  toJSON(message: ArmParams): unknown {
    const obj: any = {};
    message.disableBodyForceLimiter !== undefined &&
      (obj.disableBodyForceLimiter = message.disableBodyForceLimiter);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ArmParams>, I>>(
    object: I
  ): ArmParams {
    const message = createBaseArmParams();
    message.disableBodyForceLimiter =
      object.disableBodyForceLimiter ?? undefined;
    return message;
  },
};

function createBaseArmVelocityCommand(): ArmVelocityCommand {
  return {};
}

export const ArmVelocityCommand = {
  encode(
    _: ArmVelocityCommand,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ArmVelocityCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArmVelocityCommand();
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

  fromJSON(_: any): ArmVelocityCommand {
    return {};
  },

  toJSON(_: ArmVelocityCommand): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ArmVelocityCommand>, I>>(
    _: I
  ): ArmVelocityCommand {
    const message = createBaseArmVelocityCommand();
    return message;
  },
};

function createBaseArmVelocityCommand_CylindricalVelocity(): ArmVelocityCommand_CylindricalVelocity {
  return { linearVelocity: undefined, maxLinearVelocity: undefined };
}

export const ArmVelocityCommand_CylindricalVelocity = {
  encode(
    message: ArmVelocityCommand_CylindricalVelocity,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.linearVelocity !== undefined) {
      CylindricalCoordinate.encode(
        message.linearVelocity,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.maxLinearVelocity !== undefined) {
      DoubleValue.encode(
        { value: message.maxLinearVelocity! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ArmVelocityCommand_CylindricalVelocity {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArmVelocityCommand_CylindricalVelocity();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.linearVelocity = CylindricalCoordinate.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.maxLinearVelocity = DoubleValue.decode(
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

  fromJSON(object: any): ArmVelocityCommand_CylindricalVelocity {
    return {
      linearVelocity: isSet(object.linearVelocity)
        ? CylindricalCoordinate.fromJSON(object.linearVelocity)
        : undefined,
      maxLinearVelocity: isSet(object.maxLinearVelocity)
        ? Number(object.maxLinearVelocity)
        : undefined,
    };
  },

  toJSON(message: ArmVelocityCommand_CylindricalVelocity): unknown {
    const obj: any = {};
    message.linearVelocity !== undefined &&
      (obj.linearVelocity = message.linearVelocity
        ? CylindricalCoordinate.toJSON(message.linearVelocity)
        : undefined);
    message.maxLinearVelocity !== undefined &&
      (obj.maxLinearVelocity = message.maxLinearVelocity);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<ArmVelocityCommand_CylindricalVelocity>, I>
  >(object: I): ArmVelocityCommand_CylindricalVelocity {
    const message = createBaseArmVelocityCommand_CylindricalVelocity();
    message.linearVelocity =
      object.linearVelocity !== undefined && object.linearVelocity !== null
        ? CylindricalCoordinate.fromPartial(object.linearVelocity)
        : undefined;
    message.maxLinearVelocity = object.maxLinearVelocity ?? undefined;
    return message;
  },
};

function createBaseArmVelocityCommand_CartesianVelocity(): ArmVelocityCommand_CartesianVelocity {
  return { frameName: "", velocityInFrameName: undefined };
}

export const ArmVelocityCommand_CartesianVelocity = {
  encode(
    message: ArmVelocityCommand_CartesianVelocity,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.frameName !== "") {
      writer.uint32(10).string(message.frameName);
    }
    if (message.velocityInFrameName !== undefined) {
      Vec3.encode(
        message.velocityInFrameName,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ArmVelocityCommand_CartesianVelocity {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArmVelocityCommand_CartesianVelocity();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.frameName = reader.string();
          break;
        case 2:
          message.velocityInFrameName = Vec3.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ArmVelocityCommand_CartesianVelocity {
    return {
      frameName: isSet(object.frameName) ? String(object.frameName) : "",
      velocityInFrameName: isSet(object.velocityInFrameName)
        ? Vec3.fromJSON(object.velocityInFrameName)
        : undefined,
    };
  },

  toJSON(message: ArmVelocityCommand_CartesianVelocity): unknown {
    const obj: any = {};
    message.frameName !== undefined && (obj.frameName = message.frameName);
    message.velocityInFrameName !== undefined &&
      (obj.velocityInFrameName = message.velocityInFrameName
        ? Vec3.toJSON(message.velocityInFrameName)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<ArmVelocityCommand_CartesianVelocity>, I>
  >(object: I): ArmVelocityCommand_CartesianVelocity {
    const message = createBaseArmVelocityCommand_CartesianVelocity();
    message.frameName = object.frameName ?? "";
    message.velocityInFrameName =
      object.velocityInFrameName !== undefined &&
      object.velocityInFrameName !== null
        ? Vec3.fromPartial(object.velocityInFrameName)
        : undefined;
    return message;
  },
};

function createBaseArmVelocityCommand_Request(): ArmVelocityCommand_Request {
  return {
    cylindricalVelocity: undefined,
    cartesianVelocity: undefined,
    angularVelocityOfHandRtOdomInHand: undefined,
    maximumAcceleration: undefined,
    endTime: undefined,
  };
}

export const ArmVelocityCommand_Request = {
  encode(
    message: ArmVelocityCommand_Request,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.cylindricalVelocity !== undefined) {
      ArmVelocityCommand_CylindricalVelocity.encode(
        message.cylindricalVelocity,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.cartesianVelocity !== undefined) {
      ArmVelocityCommand_CartesianVelocity.encode(
        message.cartesianVelocity,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.angularVelocityOfHandRtOdomInHand !== undefined) {
      Vec3.encode(
        message.angularVelocityOfHandRtOdomInHand,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.maximumAcceleration !== undefined) {
      DoubleValue.encode(
        { value: message.maximumAcceleration! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.endTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.endTime),
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ArmVelocityCommand_Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArmVelocityCommand_Request();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cylindricalVelocity =
            ArmVelocityCommand_CylindricalVelocity.decode(
              reader,
              reader.uint32()
            );
          break;
        case 2:
          message.cartesianVelocity =
            ArmVelocityCommand_CartesianVelocity.decode(
              reader,
              reader.uint32()
            );
          break;
        case 6:
          message.angularVelocityOfHandRtOdomInHand = Vec3.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.maximumAcceleration = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 5:
          message.endTime = fromTimestamp(
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

  fromJSON(object: any): ArmVelocityCommand_Request {
    return {
      cylindricalVelocity: isSet(object.cylindricalVelocity)
        ? ArmVelocityCommand_CylindricalVelocity.fromJSON(
            object.cylindricalVelocity
          )
        : undefined,
      cartesianVelocity: isSet(object.cartesianVelocity)
        ? ArmVelocityCommand_CartesianVelocity.fromJSON(
            object.cartesianVelocity
          )
        : undefined,
      angularVelocityOfHandRtOdomInHand: isSet(
        object.angularVelocityOfHandRtOdomInHand
      )
        ? Vec3.fromJSON(object.angularVelocityOfHandRtOdomInHand)
        : undefined,
      maximumAcceleration: isSet(object.maximumAcceleration)
        ? Number(object.maximumAcceleration)
        : undefined,
      endTime: isSet(object.endTime)
        ? fromJsonTimestamp(object.endTime)
        : undefined,
    };
  },

  toJSON(message: ArmVelocityCommand_Request): unknown {
    const obj: any = {};
    message.cylindricalVelocity !== undefined &&
      (obj.cylindricalVelocity = message.cylindricalVelocity
        ? ArmVelocityCommand_CylindricalVelocity.toJSON(
            message.cylindricalVelocity
          )
        : undefined);
    message.cartesianVelocity !== undefined &&
      (obj.cartesianVelocity = message.cartesianVelocity
        ? ArmVelocityCommand_CartesianVelocity.toJSON(message.cartesianVelocity)
        : undefined);
    message.angularVelocityOfHandRtOdomInHand !== undefined &&
      (obj.angularVelocityOfHandRtOdomInHand =
        message.angularVelocityOfHandRtOdomInHand
          ? Vec3.toJSON(message.angularVelocityOfHandRtOdomInHand)
          : undefined);
    message.maximumAcceleration !== undefined &&
      (obj.maximumAcceleration = message.maximumAcceleration);
    message.endTime !== undefined &&
      (obj.endTime = message.endTime.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ArmVelocityCommand_Request>, I>>(
    object: I
  ): ArmVelocityCommand_Request {
    const message = createBaseArmVelocityCommand_Request();
    message.cylindricalVelocity =
      object.cylindricalVelocity !== undefined &&
      object.cylindricalVelocity !== null
        ? ArmVelocityCommand_CylindricalVelocity.fromPartial(
            object.cylindricalVelocity
          )
        : undefined;
    message.cartesianVelocity =
      object.cartesianVelocity !== undefined &&
      object.cartesianVelocity !== null
        ? ArmVelocityCommand_CartesianVelocity.fromPartial(
            object.cartesianVelocity
          )
        : undefined;
    message.angularVelocityOfHandRtOdomInHand =
      object.angularVelocityOfHandRtOdomInHand !== undefined &&
      object.angularVelocityOfHandRtOdomInHand !== null
        ? Vec3.fromPartial(object.angularVelocityOfHandRtOdomInHand)
        : undefined;
    message.maximumAcceleration = object.maximumAcceleration ?? undefined;
    message.endTime = object.endTime ?? undefined;
    return message;
  },
};

function createBaseArmVelocityCommand_Feedback(): ArmVelocityCommand_Feedback {
  return {};
}

export const ArmVelocityCommand_Feedback = {
  encode(
    _: ArmVelocityCommand_Feedback,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ArmVelocityCommand_Feedback {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArmVelocityCommand_Feedback();
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

  fromJSON(_: any): ArmVelocityCommand_Feedback {
    return {};
  },

  toJSON(_: ArmVelocityCommand_Feedback): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ArmVelocityCommand_Feedback>, I>>(
    _: I
  ): ArmVelocityCommand_Feedback {
    const message = createBaseArmVelocityCommand_Feedback();
    return message;
  },
};

function createBaseNamedArmPositionsCommand(): NamedArmPositionsCommand {
  return {};
}

export const NamedArmPositionsCommand = {
  encode(
    _: NamedArmPositionsCommand,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): NamedArmPositionsCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNamedArmPositionsCommand();
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

  fromJSON(_: any): NamedArmPositionsCommand {
    return {};
  },

  toJSON(_: NamedArmPositionsCommand): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NamedArmPositionsCommand>, I>>(
    _: I
  ): NamedArmPositionsCommand {
    const message = createBaseNamedArmPositionsCommand();
    return message;
  },
};

function createBaseNamedArmPositionsCommand_Request(): NamedArmPositionsCommand_Request {
  return { position: 0 };
}

export const NamedArmPositionsCommand_Request = {
  encode(
    message: NamedArmPositionsCommand_Request,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.position !== 0) {
      writer.uint32(8).int32(message.position);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): NamedArmPositionsCommand_Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNamedArmPositionsCommand_Request();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.position = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NamedArmPositionsCommand_Request {
    return {
      position: isSet(object.position)
        ? namedArmPositionsCommand_PositionsFromJSON(object.position)
        : 0,
    };
  },

  toJSON(message: NamedArmPositionsCommand_Request): unknown {
    const obj: any = {};
    message.position !== undefined &&
      (obj.position = namedArmPositionsCommand_PositionsToJSON(
        message.position
      ));
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<NamedArmPositionsCommand_Request>, I>
  >(object: I): NamedArmPositionsCommand_Request {
    const message = createBaseNamedArmPositionsCommand_Request();
    message.position = object.position ?? 0;
    return message;
  },
};

function createBaseNamedArmPositionsCommand_Feedback(): NamedArmPositionsCommand_Feedback {
  return { status: 0 };
}

export const NamedArmPositionsCommand_Feedback = {
  encode(
    message: NamedArmPositionsCommand_Feedback,
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
  ): NamedArmPositionsCommand_Feedback {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNamedArmPositionsCommand_Feedback();
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

  fromJSON(object: any): NamedArmPositionsCommand_Feedback {
    return {
      status: isSet(object.status)
        ? namedArmPositionsCommand_Feedback_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: NamedArmPositionsCommand_Feedback): unknown {
    const obj: any = {};
    message.status !== undefined &&
      (obj.status = namedArmPositionsCommand_Feedback_StatusToJSON(
        message.status
      ));
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<NamedArmPositionsCommand_Feedback>, I>
  >(object: I): NamedArmPositionsCommand_Feedback {
    const message = createBaseNamedArmPositionsCommand_Feedback();
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseArmCartesianCommand(): ArmCartesianCommand {
  return {};
}

export const ArmCartesianCommand = {
  encode(
    _: ArmCartesianCommand,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ArmCartesianCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArmCartesianCommand();
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

  fromJSON(_: any): ArmCartesianCommand {
    return {};
  },

  toJSON(_: ArmCartesianCommand): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ArmCartesianCommand>, I>>(
    _: I
  ): ArmCartesianCommand {
    const message = createBaseArmCartesianCommand();
    return message;
  },
};

function createBaseArmCartesianCommand_Request(): ArmCartesianCommand_Request {
  return {
    rootFrameName: "",
    wristTformTool: undefined,
    rootTformTask: undefined,
    poseTrajectoryInTask: undefined,
    maximumAcceleration: undefined,
    maxLinearVelocity: undefined,
    maxAngularVelocity: undefined,
    maxPosTrackingError: undefined,
    maxRotTrackingError: undefined,
    forceRemainNearCurrentJointConfiguration: undefined,
    preferredJointConfiguration: undefined,
    xAxis: 0,
    yAxis: 0,
    zAxis: 0,
    rxAxis: 0,
    ryAxis: 0,
    rzAxis: 0,
    wrenchTrajectoryInTask: undefined,
  };
}

export const ArmCartesianCommand_Request = {
  encode(
    message: ArmCartesianCommand_Request,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.rootFrameName !== "") {
      writer.uint32(154).string(message.rootFrameName);
    }
    if (message.wristTformTool !== undefined) {
      SE3Pose.encode(message.wristTformTool, writer.uint32(50).fork()).ldelim();
    }
    if (message.rootTformTask !== undefined) {
      SE3Pose.encode(message.rootTformTask, writer.uint32(162).fork()).ldelim();
    }
    if (message.poseTrajectoryInTask !== undefined) {
      SE3Trajectory.encode(
        message.poseTrajectoryInTask,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.maximumAcceleration !== undefined) {
      DoubleValue.encode(
        { value: message.maximumAcceleration! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.maxLinearVelocity !== undefined) {
      DoubleValue.encode(
        { value: message.maxLinearVelocity! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.maxAngularVelocity !== undefined) {
      DoubleValue.encode(
        { value: message.maxAngularVelocity! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.maxPosTrackingError !== undefined) {
      DoubleValue.encode(
        { value: message.maxPosTrackingError! },
        writer.uint32(122).fork()
      ).ldelim();
    }
    if (message.maxRotTrackingError !== undefined) {
      DoubleValue.encode(
        { value: message.maxRotTrackingError! },
        writer.uint32(130).fork()
      ).ldelim();
    }
    if (message.forceRemainNearCurrentJointConfiguration !== undefined) {
      writer.uint32(136).bool(message.forceRemainNearCurrentJointConfiguration);
    }
    if (message.preferredJointConfiguration !== undefined) {
      ArmJointPosition.encode(
        message.preferredJointConfiguration,
        writer.uint32(146).fork()
      ).ldelim();
    }
    if (message.xAxis !== 0) {
      writer.uint32(64).int32(message.xAxis);
    }
    if (message.yAxis !== 0) {
      writer.uint32(72).int32(message.yAxis);
    }
    if (message.zAxis !== 0) {
      writer.uint32(80).int32(message.zAxis);
    }
    if (message.rxAxis !== 0) {
      writer.uint32(88).int32(message.rxAxis);
    }
    if (message.ryAxis !== 0) {
      writer.uint32(96).int32(message.ryAxis);
    }
    if (message.rzAxis !== 0) {
      writer.uint32(104).int32(message.rzAxis);
    }
    if (message.wrenchTrajectoryInTask !== undefined) {
      WrenchTrajectory.encode(
        message.wrenchTrajectoryInTask,
        writer.uint32(114).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ArmCartesianCommand_Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArmCartesianCommand_Request();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 19:
          message.rootFrameName = reader.string();
          break;
        case 6:
          message.wristTformTool = SE3Pose.decode(reader, reader.uint32());
          break;
        case 20:
          message.rootTformTask = SE3Pose.decode(reader, reader.uint32());
          break;
        case 2:
          message.poseTrajectoryInTask = SE3Trajectory.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.maximumAcceleration = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 4:
          message.maxLinearVelocity = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 5:
          message.maxAngularVelocity = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 15:
          message.maxPosTrackingError = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 16:
          message.maxRotTrackingError = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 17:
          message.forceRemainNearCurrentJointConfiguration = reader.bool();
          break;
        case 18:
          message.preferredJointConfiguration = ArmJointPosition.decode(
            reader,
            reader.uint32()
          );
          break;
        case 8:
          message.xAxis = reader.int32() as any;
          break;
        case 9:
          message.yAxis = reader.int32() as any;
          break;
        case 10:
          message.zAxis = reader.int32() as any;
          break;
        case 11:
          message.rxAxis = reader.int32() as any;
          break;
        case 12:
          message.ryAxis = reader.int32() as any;
          break;
        case 13:
          message.rzAxis = reader.int32() as any;
          break;
        case 14:
          message.wrenchTrajectoryInTask = WrenchTrajectory.decode(
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

  fromJSON(object: any): ArmCartesianCommand_Request {
    return {
      rootFrameName: isSet(object.rootFrameName)
        ? String(object.rootFrameName)
        : "",
      wristTformTool: isSet(object.wristTformTool)
        ? SE3Pose.fromJSON(object.wristTformTool)
        : undefined,
      rootTformTask: isSet(object.rootTformTask)
        ? SE3Pose.fromJSON(object.rootTformTask)
        : undefined,
      poseTrajectoryInTask: isSet(object.poseTrajectoryInTask)
        ? SE3Trajectory.fromJSON(object.poseTrajectoryInTask)
        : undefined,
      maximumAcceleration: isSet(object.maximumAcceleration)
        ? Number(object.maximumAcceleration)
        : undefined,
      maxLinearVelocity: isSet(object.maxLinearVelocity)
        ? Number(object.maxLinearVelocity)
        : undefined,
      maxAngularVelocity: isSet(object.maxAngularVelocity)
        ? Number(object.maxAngularVelocity)
        : undefined,
      maxPosTrackingError: isSet(object.maxPosTrackingError)
        ? Number(object.maxPosTrackingError)
        : undefined,
      maxRotTrackingError: isSet(object.maxRotTrackingError)
        ? Number(object.maxRotTrackingError)
        : undefined,
      forceRemainNearCurrentJointConfiguration: isSet(
        object.forceRemainNearCurrentJointConfiguration
      )
        ? Boolean(object.forceRemainNearCurrentJointConfiguration)
        : undefined,
      preferredJointConfiguration: isSet(object.preferredJointConfiguration)
        ? ArmJointPosition.fromJSON(object.preferredJointConfiguration)
        : undefined,
      xAxis: isSet(object.xAxis)
        ? armCartesianCommand_Request_AxisModeFromJSON(object.xAxis)
        : 0,
      yAxis: isSet(object.yAxis)
        ? armCartesianCommand_Request_AxisModeFromJSON(object.yAxis)
        : 0,
      zAxis: isSet(object.zAxis)
        ? armCartesianCommand_Request_AxisModeFromJSON(object.zAxis)
        : 0,
      rxAxis: isSet(object.rxAxis)
        ? armCartesianCommand_Request_AxisModeFromJSON(object.rxAxis)
        : 0,
      ryAxis: isSet(object.ryAxis)
        ? armCartesianCommand_Request_AxisModeFromJSON(object.ryAxis)
        : 0,
      rzAxis: isSet(object.rzAxis)
        ? armCartesianCommand_Request_AxisModeFromJSON(object.rzAxis)
        : 0,
      wrenchTrajectoryInTask: isSet(object.wrenchTrajectoryInTask)
        ? WrenchTrajectory.fromJSON(object.wrenchTrajectoryInTask)
        : undefined,
    };
  },

  toJSON(message: ArmCartesianCommand_Request): unknown {
    const obj: any = {};
    message.rootFrameName !== undefined &&
      (obj.rootFrameName = message.rootFrameName);
    message.wristTformTool !== undefined &&
      (obj.wristTformTool = message.wristTformTool
        ? SE3Pose.toJSON(message.wristTformTool)
        : undefined);
    message.rootTformTask !== undefined &&
      (obj.rootTformTask = message.rootTformTask
        ? SE3Pose.toJSON(message.rootTformTask)
        : undefined);
    message.poseTrajectoryInTask !== undefined &&
      (obj.poseTrajectoryInTask = message.poseTrajectoryInTask
        ? SE3Trajectory.toJSON(message.poseTrajectoryInTask)
        : undefined);
    message.maximumAcceleration !== undefined &&
      (obj.maximumAcceleration = message.maximumAcceleration);
    message.maxLinearVelocity !== undefined &&
      (obj.maxLinearVelocity = message.maxLinearVelocity);
    message.maxAngularVelocity !== undefined &&
      (obj.maxAngularVelocity = message.maxAngularVelocity);
    message.maxPosTrackingError !== undefined &&
      (obj.maxPosTrackingError = message.maxPosTrackingError);
    message.maxRotTrackingError !== undefined &&
      (obj.maxRotTrackingError = message.maxRotTrackingError);
    message.forceRemainNearCurrentJointConfiguration !== undefined &&
      (obj.forceRemainNearCurrentJointConfiguration =
        message.forceRemainNearCurrentJointConfiguration);
    message.preferredJointConfiguration !== undefined &&
      (obj.preferredJointConfiguration = message.preferredJointConfiguration
        ? ArmJointPosition.toJSON(message.preferredJointConfiguration)
        : undefined);
    message.xAxis !== undefined &&
      (obj.xAxis = armCartesianCommand_Request_AxisModeToJSON(message.xAxis));
    message.yAxis !== undefined &&
      (obj.yAxis = armCartesianCommand_Request_AxisModeToJSON(message.yAxis));
    message.zAxis !== undefined &&
      (obj.zAxis = armCartesianCommand_Request_AxisModeToJSON(message.zAxis));
    message.rxAxis !== undefined &&
      (obj.rxAxis = armCartesianCommand_Request_AxisModeToJSON(message.rxAxis));
    message.ryAxis !== undefined &&
      (obj.ryAxis = armCartesianCommand_Request_AxisModeToJSON(message.ryAxis));
    message.rzAxis !== undefined &&
      (obj.rzAxis = armCartesianCommand_Request_AxisModeToJSON(message.rzAxis));
    message.wrenchTrajectoryInTask !== undefined &&
      (obj.wrenchTrajectoryInTask = message.wrenchTrajectoryInTask
        ? WrenchTrajectory.toJSON(message.wrenchTrajectoryInTask)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ArmCartesianCommand_Request>, I>>(
    object: I
  ): ArmCartesianCommand_Request {
    const message = createBaseArmCartesianCommand_Request();
    message.rootFrameName = object.rootFrameName ?? "";
    message.wristTformTool =
      object.wristTformTool !== undefined && object.wristTformTool !== null
        ? SE3Pose.fromPartial(object.wristTformTool)
        : undefined;
    message.rootTformTask =
      object.rootTformTask !== undefined && object.rootTformTask !== null
        ? SE3Pose.fromPartial(object.rootTformTask)
        : undefined;
    message.poseTrajectoryInTask =
      object.poseTrajectoryInTask !== undefined &&
      object.poseTrajectoryInTask !== null
        ? SE3Trajectory.fromPartial(object.poseTrajectoryInTask)
        : undefined;
    message.maximumAcceleration = object.maximumAcceleration ?? undefined;
    message.maxLinearVelocity = object.maxLinearVelocity ?? undefined;
    message.maxAngularVelocity = object.maxAngularVelocity ?? undefined;
    message.maxPosTrackingError = object.maxPosTrackingError ?? undefined;
    message.maxRotTrackingError = object.maxRotTrackingError ?? undefined;
    message.forceRemainNearCurrentJointConfiguration =
      object.forceRemainNearCurrentJointConfiguration ?? undefined;
    message.preferredJointConfiguration =
      object.preferredJointConfiguration !== undefined &&
      object.preferredJointConfiguration !== null
        ? ArmJointPosition.fromPartial(object.preferredJointConfiguration)
        : undefined;
    message.xAxis = object.xAxis ?? 0;
    message.yAxis = object.yAxis ?? 0;
    message.zAxis = object.zAxis ?? 0;
    message.rxAxis = object.rxAxis ?? 0;
    message.ryAxis = object.ryAxis ?? 0;
    message.rzAxis = object.rzAxis ?? 0;
    message.wrenchTrajectoryInTask =
      object.wrenchTrajectoryInTask !== undefined &&
      object.wrenchTrajectoryInTask !== null
        ? WrenchTrajectory.fromPartial(object.wrenchTrajectoryInTask)
        : undefined;
    return message;
  },
};

function createBaseArmCartesianCommand_Feedback(): ArmCartesianCommand_Feedback {
  return {
    status: 0,
    measuredPosTrackingError: 0,
    measuredRotTrackingError: 0,
    measuredPosDistanceToGoal: 0,
    measuredRotDistanceToGoal: 0,
  };
}

export const ArmCartesianCommand_Feedback = {
  encode(
    message: ArmCartesianCommand_Feedback,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    if (message.measuredPosTrackingError !== 0) {
      writer.uint32(17).double(message.measuredPosTrackingError);
    }
    if (message.measuredRotTrackingError !== 0) {
      writer.uint32(25).double(message.measuredRotTrackingError);
    }
    if (message.measuredPosDistanceToGoal !== 0) {
      writer.uint32(33).double(message.measuredPosDistanceToGoal);
    }
    if (message.measuredRotDistanceToGoal !== 0) {
      writer.uint32(41).double(message.measuredRotDistanceToGoal);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ArmCartesianCommand_Feedback {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArmCartesianCommand_Feedback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32() as any;
          break;
        case 2:
          message.measuredPosTrackingError = reader.double();
          break;
        case 3:
          message.measuredRotTrackingError = reader.double();
          break;
        case 4:
          message.measuredPosDistanceToGoal = reader.double();
          break;
        case 5:
          message.measuredRotDistanceToGoal = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ArmCartesianCommand_Feedback {
    return {
      status: isSet(object.status)
        ? armCartesianCommand_Feedback_StatusFromJSON(object.status)
        : 0,
      measuredPosTrackingError: isSet(object.measuredPosTrackingError)
        ? Number(object.measuredPosTrackingError)
        : 0,
      measuredRotTrackingError: isSet(object.measuredRotTrackingError)
        ? Number(object.measuredRotTrackingError)
        : 0,
      measuredPosDistanceToGoal: isSet(object.measuredPosDistanceToGoal)
        ? Number(object.measuredPosDistanceToGoal)
        : 0,
      measuredRotDistanceToGoal: isSet(object.measuredRotDistanceToGoal)
        ? Number(object.measuredRotDistanceToGoal)
        : 0,
    };
  },

  toJSON(message: ArmCartesianCommand_Feedback): unknown {
    const obj: any = {};
    message.status !== undefined &&
      (obj.status = armCartesianCommand_Feedback_StatusToJSON(message.status));
    message.measuredPosTrackingError !== undefined &&
      (obj.measuredPosTrackingError = message.measuredPosTrackingError);
    message.measuredRotTrackingError !== undefined &&
      (obj.measuredRotTrackingError = message.measuredRotTrackingError);
    message.measuredPosDistanceToGoal !== undefined &&
      (obj.measuredPosDistanceToGoal = message.measuredPosDistanceToGoal);
    message.measuredRotDistanceToGoal !== undefined &&
      (obj.measuredRotDistanceToGoal = message.measuredRotDistanceToGoal);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ArmCartesianCommand_Feedback>, I>>(
    object: I
  ): ArmCartesianCommand_Feedback {
    const message = createBaseArmCartesianCommand_Feedback();
    message.status = object.status ?? 0;
    message.measuredPosTrackingError = object.measuredPosTrackingError ?? 0;
    message.measuredRotTrackingError = object.measuredRotTrackingError ?? 0;
    message.measuredPosDistanceToGoal = object.measuredPosDistanceToGoal ?? 0;
    message.measuredRotDistanceToGoal = object.measuredRotDistanceToGoal ?? 0;
    return message;
  },
};

function createBaseArmJointMoveCommand(): ArmJointMoveCommand {
  return {};
}

export const ArmJointMoveCommand = {
  encode(
    _: ArmJointMoveCommand,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ArmJointMoveCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArmJointMoveCommand();
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

  fromJSON(_: any): ArmJointMoveCommand {
    return {};
  },

  toJSON(_: ArmJointMoveCommand): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ArmJointMoveCommand>, I>>(
    _: I
  ): ArmJointMoveCommand {
    const message = createBaseArmJointMoveCommand();
    return message;
  },
};

function createBaseArmJointMoveCommand_Request(): ArmJointMoveCommand_Request {
  return { trajectory: undefined };
}

export const ArmJointMoveCommand_Request = {
  encode(
    message: ArmJointMoveCommand_Request,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.trajectory !== undefined) {
      ArmJointTrajectory.encode(
        message.trajectory,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ArmJointMoveCommand_Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArmJointMoveCommand_Request();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.trajectory = ArmJointTrajectory.decode(
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

  fromJSON(object: any): ArmJointMoveCommand_Request {
    return {
      trajectory: isSet(object.trajectory)
        ? ArmJointTrajectory.fromJSON(object.trajectory)
        : undefined,
    };
  },

  toJSON(message: ArmJointMoveCommand_Request): unknown {
    const obj: any = {};
    message.trajectory !== undefined &&
      (obj.trajectory = message.trajectory
        ? ArmJointTrajectory.toJSON(message.trajectory)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ArmJointMoveCommand_Request>, I>>(
    object: I
  ): ArmJointMoveCommand_Request {
    const message = createBaseArmJointMoveCommand_Request();
    message.trajectory =
      object.trajectory !== undefined && object.trajectory !== null
        ? ArmJointTrajectory.fromPartial(object.trajectory)
        : undefined;
    return message;
  },
};

function createBaseArmJointMoveCommand_Feedback(): ArmJointMoveCommand_Feedback {
  return {
    status: 0,
    plannerStatus: 0,
    plannedPoints: [],
    timeToGoal: undefined,
  };
}

export const ArmJointMoveCommand_Feedback = {
  encode(
    message: ArmJointMoveCommand_Feedback,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    if (message.plannerStatus !== 0) {
      writer.uint32(16).int32(message.plannerStatus);
    }
    for (const v of message.plannedPoints) {
      ArmJointTrajectoryPoint.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.timeToGoal !== undefined) {
      Duration.encode(message.timeToGoal, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ArmJointMoveCommand_Feedback {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArmJointMoveCommand_Feedback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32() as any;
          break;
        case 2:
          message.plannerStatus = reader.int32() as any;
          break;
        case 3:
          message.plannedPoints.push(
            ArmJointTrajectoryPoint.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.timeToGoal = Duration.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ArmJointMoveCommand_Feedback {
    return {
      status: isSet(object.status)
        ? armJointMoveCommand_Feedback_StatusFromJSON(object.status)
        : 0,
      plannerStatus: isSet(object.plannerStatus)
        ? armJointMoveCommand_Feedback_PlannerStatusFromJSON(
            object.plannerStatus
          )
        : 0,
      plannedPoints: Array.isArray(object?.plannedPoints)
        ? object.plannedPoints.map((e: any) =>
            ArmJointTrajectoryPoint.fromJSON(e)
          )
        : [],
      timeToGoal: isSet(object.timeToGoal)
        ? Duration.fromJSON(object.timeToGoal)
        : undefined,
    };
  },

  toJSON(message: ArmJointMoveCommand_Feedback): unknown {
    const obj: any = {};
    message.status !== undefined &&
      (obj.status = armJointMoveCommand_Feedback_StatusToJSON(message.status));
    message.plannerStatus !== undefined &&
      (obj.plannerStatus = armJointMoveCommand_Feedback_PlannerStatusToJSON(
        message.plannerStatus
      ));
    if (message.plannedPoints) {
      obj.plannedPoints = message.plannedPoints.map((e) =>
        e ? ArmJointTrajectoryPoint.toJSON(e) : undefined
      );
    } else {
      obj.plannedPoints = [];
    }
    message.timeToGoal !== undefined &&
      (obj.timeToGoal = message.timeToGoal
        ? Duration.toJSON(message.timeToGoal)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ArmJointMoveCommand_Feedback>, I>>(
    object: I
  ): ArmJointMoveCommand_Feedback {
    const message = createBaseArmJointMoveCommand_Feedback();
    message.status = object.status ?? 0;
    message.plannerStatus = object.plannerStatus ?? 0;
    message.plannedPoints =
      object.plannedPoints?.map((e) =>
        ArmJointTrajectoryPoint.fromPartial(e)
      ) || [];
    message.timeToGoal =
      object.timeToGoal !== undefined && object.timeToGoal !== null
        ? Duration.fromPartial(object.timeToGoal)
        : undefined;
    return message;
  },
};

function createBaseArmJointPosition(): ArmJointPosition {
  return {
    sh0: undefined,
    sh1: undefined,
    el0: undefined,
    el1: undefined,
    wr0: undefined,
    wr1: undefined,
  };
}

export const ArmJointPosition = {
  encode(
    message: ArmJointPosition,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sh0 !== undefined) {
      DoubleValue.encode(
        { value: message.sh0! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.sh1 !== undefined) {
      DoubleValue.encode(
        { value: message.sh1! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.el0 !== undefined) {
      DoubleValue.encode(
        { value: message.el0! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.el1 !== undefined) {
      DoubleValue.encode(
        { value: message.el1! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.wr0 !== undefined) {
      DoubleValue.encode(
        { value: message.wr0! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.wr1 !== undefined) {
      DoubleValue.encode(
        { value: message.wr1! },
        writer.uint32(50).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ArmJointPosition {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArmJointPosition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sh0 = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.sh1 = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.el0 = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.el1 = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 5:
          message.wr0 = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 6:
          message.wr1 = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ArmJointPosition {
    return {
      sh0: isSet(object.sh0) ? Number(object.sh0) : undefined,
      sh1: isSet(object.sh1) ? Number(object.sh1) : undefined,
      el0: isSet(object.el0) ? Number(object.el0) : undefined,
      el1: isSet(object.el1) ? Number(object.el1) : undefined,
      wr0: isSet(object.wr0) ? Number(object.wr0) : undefined,
      wr1: isSet(object.wr1) ? Number(object.wr1) : undefined,
    };
  },

  toJSON(message: ArmJointPosition): unknown {
    const obj: any = {};
    message.sh0 !== undefined && (obj.sh0 = message.sh0);
    message.sh1 !== undefined && (obj.sh1 = message.sh1);
    message.el0 !== undefined && (obj.el0 = message.el0);
    message.el1 !== undefined && (obj.el1 = message.el1);
    message.wr0 !== undefined && (obj.wr0 = message.wr0);
    message.wr1 !== undefined && (obj.wr1 = message.wr1);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ArmJointPosition>, I>>(
    object: I
  ): ArmJointPosition {
    const message = createBaseArmJointPosition();
    message.sh0 = object.sh0 ?? undefined;
    message.sh1 = object.sh1 ?? undefined;
    message.el0 = object.el0 ?? undefined;
    message.el1 = object.el1 ?? undefined;
    message.wr0 = object.wr0 ?? undefined;
    message.wr1 = object.wr1 ?? undefined;
    return message;
  },
};

function createBaseArmJointVelocity(): ArmJointVelocity {
  return {
    sh0: undefined,
    sh1: undefined,
    el0: undefined,
    el1: undefined,
    wr0: undefined,
    wr1: undefined,
  };
}

export const ArmJointVelocity = {
  encode(
    message: ArmJointVelocity,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sh0 !== undefined) {
      DoubleValue.encode(
        { value: message.sh0! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.sh1 !== undefined) {
      DoubleValue.encode(
        { value: message.sh1! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.el0 !== undefined) {
      DoubleValue.encode(
        { value: message.el0! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.el1 !== undefined) {
      DoubleValue.encode(
        { value: message.el1! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.wr0 !== undefined) {
      DoubleValue.encode(
        { value: message.wr0! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.wr1 !== undefined) {
      DoubleValue.encode(
        { value: message.wr1! },
        writer.uint32(50).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ArmJointVelocity {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArmJointVelocity();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sh0 = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.sh1 = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.el0 = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.el1 = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 5:
          message.wr0 = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 6:
          message.wr1 = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ArmJointVelocity {
    return {
      sh0: isSet(object.sh0) ? Number(object.sh0) : undefined,
      sh1: isSet(object.sh1) ? Number(object.sh1) : undefined,
      el0: isSet(object.el0) ? Number(object.el0) : undefined,
      el1: isSet(object.el1) ? Number(object.el1) : undefined,
      wr0: isSet(object.wr0) ? Number(object.wr0) : undefined,
      wr1: isSet(object.wr1) ? Number(object.wr1) : undefined,
    };
  },

  toJSON(message: ArmJointVelocity): unknown {
    const obj: any = {};
    message.sh0 !== undefined && (obj.sh0 = message.sh0);
    message.sh1 !== undefined && (obj.sh1 = message.sh1);
    message.el0 !== undefined && (obj.el0 = message.el0);
    message.el1 !== undefined && (obj.el1 = message.el1);
    message.wr0 !== undefined && (obj.wr0 = message.wr0);
    message.wr1 !== undefined && (obj.wr1 = message.wr1);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ArmJointVelocity>, I>>(
    object: I
  ): ArmJointVelocity {
    const message = createBaseArmJointVelocity();
    message.sh0 = object.sh0 ?? undefined;
    message.sh1 = object.sh1 ?? undefined;
    message.el0 = object.el0 ?? undefined;
    message.el1 = object.el1 ?? undefined;
    message.wr0 = object.wr0 ?? undefined;
    message.wr1 = object.wr1 ?? undefined;
    return message;
  },
};

function createBaseArmJointTrajectoryPoint(): ArmJointTrajectoryPoint {
  return {
    position: undefined,
    velocity: undefined,
    timeSinceReference: undefined,
  };
}

export const ArmJointTrajectoryPoint = {
  encode(
    message: ArmJointTrajectoryPoint,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.position !== undefined) {
      ArmJointPosition.encode(
        message.position,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.velocity !== undefined) {
      ArmJointVelocity.encode(
        message.velocity,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.timeSinceReference !== undefined) {
      Duration.encode(
        message.timeSinceReference,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ArmJointTrajectoryPoint {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArmJointTrajectoryPoint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.position = ArmJointPosition.decode(reader, reader.uint32());
          break;
        case 2:
          message.velocity = ArmJointVelocity.decode(reader, reader.uint32());
          break;
        case 3:
          message.timeSinceReference = Duration.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ArmJointTrajectoryPoint {
    return {
      position: isSet(object.position)
        ? ArmJointPosition.fromJSON(object.position)
        : undefined,
      velocity: isSet(object.velocity)
        ? ArmJointVelocity.fromJSON(object.velocity)
        : undefined,
      timeSinceReference: isSet(object.timeSinceReference)
        ? Duration.fromJSON(object.timeSinceReference)
        : undefined,
    };
  },

  toJSON(message: ArmJointTrajectoryPoint): unknown {
    const obj: any = {};
    message.position !== undefined &&
      (obj.position = message.position
        ? ArmJointPosition.toJSON(message.position)
        : undefined);
    message.velocity !== undefined &&
      (obj.velocity = message.velocity
        ? ArmJointVelocity.toJSON(message.velocity)
        : undefined);
    message.timeSinceReference !== undefined &&
      (obj.timeSinceReference = message.timeSinceReference
        ? Duration.toJSON(message.timeSinceReference)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ArmJointTrajectoryPoint>, I>>(
    object: I
  ): ArmJointTrajectoryPoint {
    const message = createBaseArmJointTrajectoryPoint();
    message.position =
      object.position !== undefined && object.position !== null
        ? ArmJointPosition.fromPartial(object.position)
        : undefined;
    message.velocity =
      object.velocity !== undefined && object.velocity !== null
        ? ArmJointVelocity.fromPartial(object.velocity)
        : undefined;
    message.timeSinceReference =
      object.timeSinceReference !== undefined &&
      object.timeSinceReference !== null
        ? Duration.fromPartial(object.timeSinceReference)
        : undefined;
    return message;
  },
};

function createBaseArmJointTrajectory(): ArmJointTrajectory {
  return {
    points: [],
    referenceTime: undefined,
    maximumVelocity: undefined,
    maximumAcceleration: undefined,
  };
}

export const ArmJointTrajectory = {
  encode(
    message: ArmJointTrajectory,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.points) {
      ArmJointTrajectoryPoint.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.referenceTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.referenceTime),
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.maximumVelocity !== undefined) {
      DoubleValue.encode(
        { value: message.maximumVelocity! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.maximumAcceleration !== undefined) {
      DoubleValue.encode(
        { value: message.maximumAcceleration! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ArmJointTrajectory {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArmJointTrajectory();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.points.push(
            ArmJointTrajectoryPoint.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.referenceTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.maximumVelocity = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 4:
          message.maximumAcceleration = DoubleValue.decode(
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

  fromJSON(object: any): ArmJointTrajectory {
    return {
      points: Array.isArray(object?.points)
        ? object.points.map((e: any) => ArmJointTrajectoryPoint.fromJSON(e))
        : [],
      referenceTime: isSet(object.referenceTime)
        ? fromJsonTimestamp(object.referenceTime)
        : undefined,
      maximumVelocity: isSet(object.maximumVelocity)
        ? Number(object.maximumVelocity)
        : undefined,
      maximumAcceleration: isSet(object.maximumAcceleration)
        ? Number(object.maximumAcceleration)
        : undefined,
    };
  },

  toJSON(message: ArmJointTrajectory): unknown {
    const obj: any = {};
    if (message.points) {
      obj.points = message.points.map((e) =>
        e ? ArmJointTrajectoryPoint.toJSON(e) : undefined
      );
    } else {
      obj.points = [];
    }
    message.referenceTime !== undefined &&
      (obj.referenceTime = message.referenceTime.toISOString());
    message.maximumVelocity !== undefined &&
      (obj.maximumVelocity = message.maximumVelocity);
    message.maximumAcceleration !== undefined &&
      (obj.maximumAcceleration = message.maximumAcceleration);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ArmJointTrajectory>, I>>(
    object: I
  ): ArmJointTrajectory {
    const message = createBaseArmJointTrajectory();
    message.points =
      object.points?.map((e) => ArmJointTrajectoryPoint.fromPartial(e)) || [];
    message.referenceTime = object.referenceTime ?? undefined;
    message.maximumVelocity = object.maximumVelocity ?? undefined;
    message.maximumAcceleration = object.maximumAcceleration ?? undefined;
    return message;
  },
};

function createBaseGazeCommand(): GazeCommand {
  return {};
}

export const GazeCommand = {
  encode(_: GazeCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GazeCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGazeCommand();
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

  fromJSON(_: any): GazeCommand {
    return {};
  },

  toJSON(_: GazeCommand): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GazeCommand>, I>>(_: I): GazeCommand {
    const message = createBaseGazeCommand();
    return message;
  },
};

function createBaseGazeCommand_Request(): GazeCommand_Request {
  return {
    targetTrajectoryInFrame1: undefined,
    frame1Name: "",
    toolTrajectoryInFrame2: undefined,
    frame2Name: "",
    wristTformTool: undefined,
    targetTrajectoryInitialVelocity: undefined,
    maximumAcceleration: undefined,
    maxLinearVelocity: undefined,
    maxAngularVelocity: undefined,
  };
}

export const GazeCommand_Request = {
  encode(
    message: GazeCommand_Request,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.targetTrajectoryInFrame1 !== undefined) {
      Vec3Trajectory.encode(
        message.targetTrajectoryInFrame1,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.frame1Name !== "") {
      writer.uint32(18).string(message.frame1Name);
    }
    if (message.toolTrajectoryInFrame2 !== undefined) {
      SE3Trajectory.encode(
        message.toolTrajectoryInFrame2,
        writer.uint32(82).fork()
      ).ldelim();
    }
    if (message.frame2Name !== "") {
      writer.uint32(90).string(message.frame2Name);
    }
    if (message.wristTformTool !== undefined) {
      SE3Pose.encode(message.wristTformTool, writer.uint32(74).fork()).ldelim();
    }
    if (message.targetTrajectoryInitialVelocity !== undefined) {
      DoubleValue.encode(
        { value: message.targetTrajectoryInitialVelocity! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.maximumAcceleration !== undefined) {
      DoubleValue.encode(
        { value: message.maximumAcceleration! },
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.maxLinearVelocity !== undefined) {
      DoubleValue.encode(
        { value: message.maxLinearVelocity! },
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.maxAngularVelocity !== undefined) {
      DoubleValue.encode(
        { value: message.maxAngularVelocity! },
        writer.uint32(66).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GazeCommand_Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGazeCommand_Request();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.targetTrajectoryInFrame1 = Vec3Trajectory.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.frame1Name = reader.string();
          break;
        case 10:
          message.toolTrajectoryInFrame2 = SE3Trajectory.decode(
            reader,
            reader.uint32()
          );
          break;
        case 11:
          message.frame2Name = reader.string();
          break;
        case 9:
          message.wristTformTool = SE3Pose.decode(reader, reader.uint32());
          break;
        case 5:
          message.targetTrajectoryInitialVelocity = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 6:
          message.maximumAcceleration = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 7:
          message.maxLinearVelocity = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 8:
          message.maxAngularVelocity = DoubleValue.decode(
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

  fromJSON(object: any): GazeCommand_Request {
    return {
      targetTrajectoryInFrame1: isSet(object.targetTrajectoryInFrame1)
        ? Vec3Trajectory.fromJSON(object.targetTrajectoryInFrame1)
        : undefined,
      frame1Name: isSet(object.frame1Name) ? String(object.frame1Name) : "",
      toolTrajectoryInFrame2: isSet(object.toolTrajectoryInFrame2)
        ? SE3Trajectory.fromJSON(object.toolTrajectoryInFrame2)
        : undefined,
      frame2Name: isSet(object.frame2Name) ? String(object.frame2Name) : "",
      wristTformTool: isSet(object.wristTformTool)
        ? SE3Pose.fromJSON(object.wristTformTool)
        : undefined,
      targetTrajectoryInitialVelocity: isSet(
        object.targetTrajectoryInitialVelocity
      )
        ? Number(object.targetTrajectoryInitialVelocity)
        : undefined,
      maximumAcceleration: isSet(object.maximumAcceleration)
        ? Number(object.maximumAcceleration)
        : undefined,
      maxLinearVelocity: isSet(object.maxLinearVelocity)
        ? Number(object.maxLinearVelocity)
        : undefined,
      maxAngularVelocity: isSet(object.maxAngularVelocity)
        ? Number(object.maxAngularVelocity)
        : undefined,
    };
  },

  toJSON(message: GazeCommand_Request): unknown {
    const obj: any = {};
    message.targetTrajectoryInFrame1 !== undefined &&
      (obj.targetTrajectoryInFrame1 = message.targetTrajectoryInFrame1
        ? Vec3Trajectory.toJSON(message.targetTrajectoryInFrame1)
        : undefined);
    message.frame1Name !== undefined && (obj.frame1Name = message.frame1Name);
    message.toolTrajectoryInFrame2 !== undefined &&
      (obj.toolTrajectoryInFrame2 = message.toolTrajectoryInFrame2
        ? SE3Trajectory.toJSON(message.toolTrajectoryInFrame2)
        : undefined);
    message.frame2Name !== undefined && (obj.frame2Name = message.frame2Name);
    message.wristTformTool !== undefined &&
      (obj.wristTformTool = message.wristTformTool
        ? SE3Pose.toJSON(message.wristTformTool)
        : undefined);
    message.targetTrajectoryInitialVelocity !== undefined &&
      (obj.targetTrajectoryInitialVelocity =
        message.targetTrajectoryInitialVelocity);
    message.maximumAcceleration !== undefined &&
      (obj.maximumAcceleration = message.maximumAcceleration);
    message.maxLinearVelocity !== undefined &&
      (obj.maxLinearVelocity = message.maxLinearVelocity);
    message.maxAngularVelocity !== undefined &&
      (obj.maxAngularVelocity = message.maxAngularVelocity);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GazeCommand_Request>, I>>(
    object: I
  ): GazeCommand_Request {
    const message = createBaseGazeCommand_Request();
    message.targetTrajectoryInFrame1 =
      object.targetTrajectoryInFrame1 !== undefined &&
      object.targetTrajectoryInFrame1 !== null
        ? Vec3Trajectory.fromPartial(object.targetTrajectoryInFrame1)
        : undefined;
    message.frame1Name = object.frame1Name ?? "";
    message.toolTrajectoryInFrame2 =
      object.toolTrajectoryInFrame2 !== undefined &&
      object.toolTrajectoryInFrame2 !== null
        ? SE3Trajectory.fromPartial(object.toolTrajectoryInFrame2)
        : undefined;
    message.frame2Name = object.frame2Name ?? "";
    message.wristTformTool =
      object.wristTformTool !== undefined && object.wristTformTool !== null
        ? SE3Pose.fromPartial(object.wristTformTool)
        : undefined;
    message.targetTrajectoryInitialVelocity =
      object.targetTrajectoryInitialVelocity ?? undefined;
    message.maximumAcceleration = object.maximumAcceleration ?? undefined;
    message.maxLinearVelocity = object.maxLinearVelocity ?? undefined;
    message.maxAngularVelocity = object.maxAngularVelocity ?? undefined;
    return message;
  },
};

function createBaseGazeCommand_Feedback(): GazeCommand_Feedback {
  return {
    status: 0,
    gazingAtTarget: false,
    gazeToTargetRotationMeasured: 0,
    handPositionAtGoal: false,
    handDistanceToGoalMeasured: 0,
    handRollAtGoal: false,
    handRollToTargetRollMeasured: 0,
  };
}

export const GazeCommand_Feedback = {
  encode(
    message: GazeCommand_Feedback,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    if (message.gazingAtTarget === true) {
      writer.uint32(16).bool(message.gazingAtTarget);
    }
    if (message.gazeToTargetRotationMeasured !== 0) {
      writer.uint32(45).float(message.gazeToTargetRotationMeasured);
    }
    if (message.handPositionAtGoal === true) {
      writer.uint32(24).bool(message.handPositionAtGoal);
    }
    if (message.handDistanceToGoalMeasured !== 0) {
      writer.uint32(53).float(message.handDistanceToGoalMeasured);
    }
    if (message.handRollAtGoal === true) {
      writer.uint32(32).bool(message.handRollAtGoal);
    }
    if (message.handRollToTargetRollMeasured !== 0) {
      writer.uint32(61).float(message.handRollToTargetRollMeasured);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GazeCommand_Feedback {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGazeCommand_Feedback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32() as any;
          break;
        case 2:
          message.gazingAtTarget = reader.bool();
          break;
        case 5:
          message.gazeToTargetRotationMeasured = reader.float();
          break;
        case 3:
          message.handPositionAtGoal = reader.bool();
          break;
        case 6:
          message.handDistanceToGoalMeasured = reader.float();
          break;
        case 4:
          message.handRollAtGoal = reader.bool();
          break;
        case 7:
          message.handRollToTargetRollMeasured = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GazeCommand_Feedback {
    return {
      status: isSet(object.status)
        ? gazeCommand_Feedback_StatusFromJSON(object.status)
        : 0,
      gazingAtTarget: isSet(object.gazingAtTarget)
        ? Boolean(object.gazingAtTarget)
        : false,
      gazeToTargetRotationMeasured: isSet(object.gazeToTargetRotationMeasured)
        ? Number(object.gazeToTargetRotationMeasured)
        : 0,
      handPositionAtGoal: isSet(object.handPositionAtGoal)
        ? Boolean(object.handPositionAtGoal)
        : false,
      handDistanceToGoalMeasured: isSet(object.handDistanceToGoalMeasured)
        ? Number(object.handDistanceToGoalMeasured)
        : 0,
      handRollAtGoal: isSet(object.handRollAtGoal)
        ? Boolean(object.handRollAtGoal)
        : false,
      handRollToTargetRollMeasured: isSet(object.handRollToTargetRollMeasured)
        ? Number(object.handRollToTargetRollMeasured)
        : 0,
    };
  },

  toJSON(message: GazeCommand_Feedback): unknown {
    const obj: any = {};
    message.status !== undefined &&
      (obj.status = gazeCommand_Feedback_StatusToJSON(message.status));
    message.gazingAtTarget !== undefined &&
      (obj.gazingAtTarget = message.gazingAtTarget);
    message.gazeToTargetRotationMeasured !== undefined &&
      (obj.gazeToTargetRotationMeasured = message.gazeToTargetRotationMeasured);
    message.handPositionAtGoal !== undefined &&
      (obj.handPositionAtGoal = message.handPositionAtGoal);
    message.handDistanceToGoalMeasured !== undefined &&
      (obj.handDistanceToGoalMeasured = message.handDistanceToGoalMeasured);
    message.handRollAtGoal !== undefined &&
      (obj.handRollAtGoal = message.handRollAtGoal);
    message.handRollToTargetRollMeasured !== undefined &&
      (obj.handRollToTargetRollMeasured = message.handRollToTargetRollMeasured);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GazeCommand_Feedback>, I>>(
    object: I
  ): GazeCommand_Feedback {
    const message = createBaseGazeCommand_Feedback();
    message.status = object.status ?? 0;
    message.gazingAtTarget = object.gazingAtTarget ?? false;
    message.gazeToTargetRotationMeasured =
      object.gazeToTargetRotationMeasured ?? 0;
    message.handPositionAtGoal = object.handPositionAtGoal ?? false;
    message.handDistanceToGoalMeasured = object.handDistanceToGoalMeasured ?? 0;
    message.handRollAtGoal = object.handRollAtGoal ?? false;
    message.handRollToTargetRollMeasured =
      object.handRollToTargetRollMeasured ?? 0;
    return message;
  },
};

function createBaseArmStopCommand(): ArmStopCommand {
  return {};
}

export const ArmStopCommand = {
  encode(
    _: ArmStopCommand,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ArmStopCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArmStopCommand();
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

  fromJSON(_: any): ArmStopCommand {
    return {};
  },

  toJSON(_: ArmStopCommand): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ArmStopCommand>, I>>(
    _: I
  ): ArmStopCommand {
    const message = createBaseArmStopCommand();
    return message;
  },
};

function createBaseArmStopCommand_Request(): ArmStopCommand_Request {
  return {};
}

export const ArmStopCommand_Request = {
  encode(
    _: ArmStopCommand_Request,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ArmStopCommand_Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArmStopCommand_Request();
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

  fromJSON(_: any): ArmStopCommand_Request {
    return {};
  },

  toJSON(_: ArmStopCommand_Request): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ArmStopCommand_Request>, I>>(
    _: I
  ): ArmStopCommand_Request {
    const message = createBaseArmStopCommand_Request();
    return message;
  },
};

function createBaseArmStopCommand_Feedback(): ArmStopCommand_Feedback {
  return {};
}

export const ArmStopCommand_Feedback = {
  encode(
    _: ArmStopCommand_Feedback,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ArmStopCommand_Feedback {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArmStopCommand_Feedback();
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

  fromJSON(_: any): ArmStopCommand_Feedback {
    return {};
  },

  toJSON(_: ArmStopCommand_Feedback): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ArmStopCommand_Feedback>, I>>(
    _: I
  ): ArmStopCommand_Feedback {
    const message = createBaseArmStopCommand_Feedback();
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
