/* eslint-disable */
import {
  ManipulatorState_CarryState,
  manipulatorState_CarryStateFromJSON,
  manipulatorState_CarryStateToJSON,
} from "./robot_state";
import { Vec3, Vec2, FrameTreeSnapshot, Quaternion } from "./geometry";
import { ImageSource_PinholeModel } from "./image";
import { RequestHeader, ResponseHeader } from "./header";
import { LeaseUseResult, Lease } from "./lease";
import _m0 from "protobufjs/minimal";
import { FloatValue } from "../../google/protobuf/wrappers";

export const protobufPackage = "bosdyn.api";

export enum GraspPositionConstraint {
  GRASP_POSITION_CONSTRAINT_UNKNOWN = 0,
  GRASP_POSITION_CONSTRAINT_NORMAL = 1,
  GRASP_POSITION_CONSTRAINT_FIXED_AT_USER_POSITION = 2,
  UNRECOGNIZED = -1,
}

export function graspPositionConstraintFromJSON(
  object: any
): GraspPositionConstraint {
  switch (object) {
    case 0:
    case "GRASP_POSITION_CONSTRAINT_UNKNOWN":
      return GraspPositionConstraint.GRASP_POSITION_CONSTRAINT_UNKNOWN;
    case 1:
    case "GRASP_POSITION_CONSTRAINT_NORMAL":
      return GraspPositionConstraint.GRASP_POSITION_CONSTRAINT_NORMAL;
    case 2:
    case "GRASP_POSITION_CONSTRAINT_FIXED_AT_USER_POSITION":
      return GraspPositionConstraint.GRASP_POSITION_CONSTRAINT_FIXED_AT_USER_POSITION;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GraspPositionConstraint.UNRECOGNIZED;
  }
}

export function graspPositionConstraintToJSON(
  object: GraspPositionConstraint
): string {
  switch (object) {
    case GraspPositionConstraint.GRASP_POSITION_CONSTRAINT_UNKNOWN:
      return "GRASP_POSITION_CONSTRAINT_UNKNOWN";
    case GraspPositionConstraint.GRASP_POSITION_CONSTRAINT_NORMAL:
      return "GRASP_POSITION_CONSTRAINT_NORMAL";
    case GraspPositionConstraint.GRASP_POSITION_CONSTRAINT_FIXED_AT_USER_POSITION:
      return "GRASP_POSITION_CONSTRAINT_FIXED_AT_USER_POSITION";
    case GraspPositionConstraint.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum ManipulationFeedbackState {
  MANIP_STATE_UNKNOWN = 0,
  MANIP_STATE_DONE = 1,
  MANIP_STATE_SEARCHING_FOR_GRASP = 2,
  MANIP_STATE_MOVING_TO_GRASP = 3,
  MANIP_STATE_GRASPING_OBJECT = 4,
  MANIP_STATE_PLACING_OBJECT = 5,
  MANIP_STATE_GRASP_SUCCEEDED = 6,
  MANIP_STATE_GRASP_FAILED = 7,
  MANIP_STATE_GRASP_PLANNING_SUCCEEDED = 11,
  MANIP_STATE_GRASP_PLANNING_NO_SOLUTION = 8,
  /**
   * MANIP_STATE_GRASP_FAILED_TO_RAYCAST_INTO_MAP - Note: if you are experiencing raycast failures during grasping, consider using a different
   * grasping call that does not require the robot to automatically walk up to the grasp.
   */
  MANIP_STATE_GRASP_FAILED_TO_RAYCAST_INTO_MAP = 9,
  /**
   * MANIP_STATE_GRASP_PLANNING_WAITING_DATA_AT_EDGE - The grasp planner is waiting for the gaze to have the target object not on the edge of the
   * camera view.  If you are seeing this in an automatic mode, the robot will soon retarget the
   * grasp for you.  If you are seeing this in a non-auto mode, you'll need to change your gaze
   * to have the target object more in the center of the hand-camera's view.
   */
  MANIP_STATE_GRASP_PLANNING_WAITING_DATA_AT_EDGE = 13,
  MANIP_STATE_WALKING_TO_OBJECT = 10,
  MANIP_STATE_ATTEMPTING_RAYCASTING = 12,
  MANIP_STATE_MOVING_TO_PLACE = 14,
  MANIP_STATE_PLACE_FAILED_TO_RAYCAST_INTO_MAP = 15,
  MANIP_STATE_PLACE_SUCCEEDED = 16,
  MANIP_STATE_PLACE_FAILED = 17,
  UNRECOGNIZED = -1,
}

export function manipulationFeedbackStateFromJSON(
  object: any
): ManipulationFeedbackState {
  switch (object) {
    case 0:
    case "MANIP_STATE_UNKNOWN":
      return ManipulationFeedbackState.MANIP_STATE_UNKNOWN;
    case 1:
    case "MANIP_STATE_DONE":
      return ManipulationFeedbackState.MANIP_STATE_DONE;
    case 2:
    case "MANIP_STATE_SEARCHING_FOR_GRASP":
      return ManipulationFeedbackState.MANIP_STATE_SEARCHING_FOR_GRASP;
    case 3:
    case "MANIP_STATE_MOVING_TO_GRASP":
      return ManipulationFeedbackState.MANIP_STATE_MOVING_TO_GRASP;
    case 4:
    case "MANIP_STATE_GRASPING_OBJECT":
      return ManipulationFeedbackState.MANIP_STATE_GRASPING_OBJECT;
    case 5:
    case "MANIP_STATE_PLACING_OBJECT":
      return ManipulationFeedbackState.MANIP_STATE_PLACING_OBJECT;
    case 6:
    case "MANIP_STATE_GRASP_SUCCEEDED":
      return ManipulationFeedbackState.MANIP_STATE_GRASP_SUCCEEDED;
    case 7:
    case "MANIP_STATE_GRASP_FAILED":
      return ManipulationFeedbackState.MANIP_STATE_GRASP_FAILED;
    case 11:
    case "MANIP_STATE_GRASP_PLANNING_SUCCEEDED":
      return ManipulationFeedbackState.MANIP_STATE_GRASP_PLANNING_SUCCEEDED;
    case 8:
    case "MANIP_STATE_GRASP_PLANNING_NO_SOLUTION":
      return ManipulationFeedbackState.MANIP_STATE_GRASP_PLANNING_NO_SOLUTION;
    case 9:
    case "MANIP_STATE_GRASP_FAILED_TO_RAYCAST_INTO_MAP":
      return ManipulationFeedbackState.MANIP_STATE_GRASP_FAILED_TO_RAYCAST_INTO_MAP;
    case 13:
    case "MANIP_STATE_GRASP_PLANNING_WAITING_DATA_AT_EDGE":
      return ManipulationFeedbackState.MANIP_STATE_GRASP_PLANNING_WAITING_DATA_AT_EDGE;
    case 10:
    case "MANIP_STATE_WALKING_TO_OBJECT":
      return ManipulationFeedbackState.MANIP_STATE_WALKING_TO_OBJECT;
    case 12:
    case "MANIP_STATE_ATTEMPTING_RAYCASTING":
      return ManipulationFeedbackState.MANIP_STATE_ATTEMPTING_RAYCASTING;
    case 14:
    case "MANIP_STATE_MOVING_TO_PLACE":
      return ManipulationFeedbackState.MANIP_STATE_MOVING_TO_PLACE;
    case 15:
    case "MANIP_STATE_PLACE_FAILED_TO_RAYCAST_INTO_MAP":
      return ManipulationFeedbackState.MANIP_STATE_PLACE_FAILED_TO_RAYCAST_INTO_MAP;
    case 16:
    case "MANIP_STATE_PLACE_SUCCEEDED":
      return ManipulationFeedbackState.MANIP_STATE_PLACE_SUCCEEDED;
    case 17:
    case "MANIP_STATE_PLACE_FAILED":
      return ManipulationFeedbackState.MANIP_STATE_PLACE_FAILED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ManipulationFeedbackState.UNRECOGNIZED;
  }
}

export function manipulationFeedbackStateToJSON(
  object: ManipulationFeedbackState
): string {
  switch (object) {
    case ManipulationFeedbackState.MANIP_STATE_UNKNOWN:
      return "MANIP_STATE_UNKNOWN";
    case ManipulationFeedbackState.MANIP_STATE_DONE:
      return "MANIP_STATE_DONE";
    case ManipulationFeedbackState.MANIP_STATE_SEARCHING_FOR_GRASP:
      return "MANIP_STATE_SEARCHING_FOR_GRASP";
    case ManipulationFeedbackState.MANIP_STATE_MOVING_TO_GRASP:
      return "MANIP_STATE_MOVING_TO_GRASP";
    case ManipulationFeedbackState.MANIP_STATE_GRASPING_OBJECT:
      return "MANIP_STATE_GRASPING_OBJECT";
    case ManipulationFeedbackState.MANIP_STATE_PLACING_OBJECT:
      return "MANIP_STATE_PLACING_OBJECT";
    case ManipulationFeedbackState.MANIP_STATE_GRASP_SUCCEEDED:
      return "MANIP_STATE_GRASP_SUCCEEDED";
    case ManipulationFeedbackState.MANIP_STATE_GRASP_FAILED:
      return "MANIP_STATE_GRASP_FAILED";
    case ManipulationFeedbackState.MANIP_STATE_GRASP_PLANNING_SUCCEEDED:
      return "MANIP_STATE_GRASP_PLANNING_SUCCEEDED";
    case ManipulationFeedbackState.MANIP_STATE_GRASP_PLANNING_NO_SOLUTION:
      return "MANIP_STATE_GRASP_PLANNING_NO_SOLUTION";
    case ManipulationFeedbackState.MANIP_STATE_GRASP_FAILED_TO_RAYCAST_INTO_MAP:
      return "MANIP_STATE_GRASP_FAILED_TO_RAYCAST_INTO_MAP";
    case ManipulationFeedbackState.MANIP_STATE_GRASP_PLANNING_WAITING_DATA_AT_EDGE:
      return "MANIP_STATE_GRASP_PLANNING_WAITING_DATA_AT_EDGE";
    case ManipulationFeedbackState.MANIP_STATE_WALKING_TO_OBJECT:
      return "MANIP_STATE_WALKING_TO_OBJECT";
    case ManipulationFeedbackState.MANIP_STATE_ATTEMPTING_RAYCASTING:
      return "MANIP_STATE_ATTEMPTING_RAYCASTING";
    case ManipulationFeedbackState.MANIP_STATE_MOVING_TO_PLACE:
      return "MANIP_STATE_MOVING_TO_PLACE";
    case ManipulationFeedbackState.MANIP_STATE_PLACE_FAILED_TO_RAYCAST_INTO_MAP:
      return "MANIP_STATE_PLACE_FAILED_TO_RAYCAST_INTO_MAP";
    case ManipulationFeedbackState.MANIP_STATE_PLACE_SUCCEEDED:
      return "MANIP_STATE_PLACE_SUCCEEDED";
    case ManipulationFeedbackState.MANIP_STATE_PLACE_FAILED:
      return "MANIP_STATE_PLACE_FAILED";
    case ManipulationFeedbackState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum ManipulationCameraSource {
  MANIPULATION_CAMERA_SOURCE_UNKNOWN = 0,
  MANIPULATION_CAMERA_SOURCE_STEREO = 1,
  MANIPULATION_CAMERA_SOURCE_HAND = 2,
  UNRECOGNIZED = -1,
}

export function manipulationCameraSourceFromJSON(
  object: any
): ManipulationCameraSource {
  switch (object) {
    case 0:
    case "MANIPULATION_CAMERA_SOURCE_UNKNOWN":
      return ManipulationCameraSource.MANIPULATION_CAMERA_SOURCE_UNKNOWN;
    case 1:
    case "MANIPULATION_CAMERA_SOURCE_STEREO":
      return ManipulationCameraSource.MANIPULATION_CAMERA_SOURCE_STEREO;
    case 2:
    case "MANIPULATION_CAMERA_SOURCE_HAND":
      return ManipulationCameraSource.MANIPULATION_CAMERA_SOURCE_HAND;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ManipulationCameraSource.UNRECOGNIZED;
  }
}

export function manipulationCameraSourceToJSON(
  object: ManipulationCameraSource
): string {
  switch (object) {
    case ManipulationCameraSource.MANIPULATION_CAMERA_SOURCE_UNKNOWN:
      return "MANIPULATION_CAMERA_SOURCE_UNKNOWN";
    case ManipulationCameraSource.MANIPULATION_CAMERA_SOURCE_STEREO:
      return "MANIPULATION_CAMERA_SOURCE_STEREO";
    case ManipulationCameraSource.MANIPULATION_CAMERA_SOURCE_HAND:
      return "MANIPULATION_CAMERA_SOURCE_HAND";
    case ManipulationCameraSource.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Configure automatic walking and gazing at the target. */
export enum WalkGazeMode {
  PICK_WALK_GAZE_UNKNOWN = 0,
  /** PICK_AUTO_WALK_AND_GAZE - Default, walk to the target and gaze at it automatically */
  PICK_AUTO_WALK_AND_GAZE = 1,
  /** PICK_AUTO_GAZE - Don't move the robot base, but automatically look at the grasp target. */
  PICK_AUTO_GAZE = 2,
  /**
   * PICK_NO_AUTO_WALK_OR_GAZE - No automatic gazing or walking. Note: if you choose this option, the target location
   * must not be near the edges or off the screen on the hand camera's view.
   */
  PICK_NO_AUTO_WALK_OR_GAZE = 3,
  /**
   * PICK_PLAN_ONLY - Only plan for the grasp, don't move the robot.  Since we won't move
   * the robot, the target location must not be near the edges or out of
   * the hand camera's view.  The robot must be located near the object.
   * (Equivalent conditions as for success with PICK_NO_AUTO_WALK_OR_GAZE)
   */
  PICK_PLAN_ONLY = 4,
  UNRECOGNIZED = -1,
}

export function walkGazeModeFromJSON(object: any): WalkGazeMode {
  switch (object) {
    case 0:
    case "PICK_WALK_GAZE_UNKNOWN":
      return WalkGazeMode.PICK_WALK_GAZE_UNKNOWN;
    case 1:
    case "PICK_AUTO_WALK_AND_GAZE":
      return WalkGazeMode.PICK_AUTO_WALK_AND_GAZE;
    case 2:
    case "PICK_AUTO_GAZE":
      return WalkGazeMode.PICK_AUTO_GAZE;
    case 3:
    case "PICK_NO_AUTO_WALK_OR_GAZE":
      return WalkGazeMode.PICK_NO_AUTO_WALK_OR_GAZE;
    case 4:
    case "PICK_PLAN_ONLY":
      return WalkGazeMode.PICK_PLAN_ONLY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return WalkGazeMode.UNRECOGNIZED;
  }
}

export function walkGazeModeToJSON(object: WalkGazeMode): string {
  switch (object) {
    case WalkGazeMode.PICK_WALK_GAZE_UNKNOWN:
      return "PICK_WALK_GAZE_UNKNOWN";
    case WalkGazeMode.PICK_AUTO_WALK_AND_GAZE:
      return "PICK_AUTO_WALK_AND_GAZE";
    case WalkGazeMode.PICK_AUTO_GAZE:
      return "PICK_AUTO_GAZE";
    case WalkGazeMode.PICK_NO_AUTO_WALK_OR_GAZE:
      return "PICK_NO_AUTO_WALK_OR_GAZE";
    case WalkGazeMode.PICK_PLAN_ONLY:
      return "PICK_PLAN_ONLY";
    case WalkGazeMode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Walks the robot up to an object.  Useful to prepare to grasp or manipulate something. */
export interface WalkToObjectRayInWorld {
  /** Position of the start of the ray (see PickObjectRayInWorld for detailed comments.) */
  rayStartRtFrame: Vec3 | undefined;
  /** Position of the end of the ray. */
  rayEndRtFrame: Vec3 | undefined;
  /** Name of the frame that the above parameters are expressed in. */
  frameName: string;
  /**
   * Optional offset distance for the robot to stand from the object's location.  The robot will
   * walk forwards or backwards from where it is so that its center of mass is this distance from
   * the object. \
   * If unset, we use a reasonable default value.
   */
  offsetDistance: number | undefined;
}

export interface WalkToObjectInImage {
  /** Walk to an object that is at a pixel location in an image. */
  pixelXy: Vec2 | undefined;
  /**
   * A tree-based collection of transformations, which will include the transformations to each image's
   * sensor in addition to transformations to the common frames ("vision", "body", "odom").
   * All transforms within the snapshot are at the acquistion time of the image.
   */
  transformsSnapshotForCamera: FrameTreeSnapshot | undefined;
  /** The frame name for the image's sensor source. This will be included in the transform snapshot. */
  frameNameImageSensor: string;
  /** Camera model. */
  cameraModel: ImageSource_PinholeModel | undefined;
  /**
   * Optional offset distance for the robot to stand from the object's location.  The robot will
   * walk forwards or backwards from where it is so that its center of mass is this distance from
   * the object. \
   * If unset, we use a reasonable default value.
   */
  offsetDistance: number | undefined;
}

export interface PickObjectRayInWorld {
  /**
   * Cast a ray in the world and pick the first object found along the ray. \
   * This is the lowest-level grasping message; all other grasp options internally use this
   * message to trigger a grasp. \
   * Example:
   *  You see the object you are interested in with the gripper's camera.  To grasp it, you
   *  cast a ray from the camera out to 4 meters (well past the object). \
   *  To do this you'd set: \
   *      ray_start_rt_frame: camera's position \
   *      ray_end_rt_frame: camera's position + unit vector along ray of interest * 4 meters
   */
  rayStartRtFrame: Vec3 | undefined;
  rayEndRtFrame: Vec3 | undefined;
  /** Name of the frame the above parameters are represented in. */
  frameName: string;
  /** Optional parameters for the grasp. */
  graspParams: GraspParams | undefined;
  /**
   * Configure if the robot should automatically walk and/or gaze at the target object before
   * performing the grasp. \
   * 1. If you haven't moved the robot or deployed the arm, use PICK_AUTO_WALK_AND_GAZE \
   * 2. If you have moved to the location you want to pick from, but haven't yet deployed the arm,
   *    use PICK_AUTO_GAZE. \
   * 3. If you have already moved the robot and have the hand looking at your target object, use
   *    PICK_NO_AUTO_WALK_OR_GAZE. \
   * If you are seeing issues with "MANIP_STATE_GRASP_FAILED_TO_RAYCAST_INTO_MAP," that means that
   * the automatic system cannot find your object when trying to automatically walk to it, so
   * consider using PICK_AUTO_GAZE or PICK_NO_AUTO_WALK_OR_GAZE.
   */
  walkGazeMode: WalkGazeMode;
}

/** No data */
export interface PickObjectExecutePlan {}

export interface PickObject {
  /** Name of the frame you want to give your input in. */
  frameName: string;
  /** Pickup an object at the location, given in the frame named above. */
  objectRtFrame: Vec3 | undefined;
  /** Optional parameters for the grasp. */
  graspParams: GraspParams | undefined;
}

export interface PickObjectInImage {
  /** Pickup an object that is at a pixel location in an image. */
  pixelXy: Vec2 | undefined;
  /**
   * A tree-based collection of transformations, which will include the transformations to each image's
   * sensor in addition to transformations to the common frames ("vision", "body", "odom").
   * All transforms within the snapshot are at the acquistion time of the image.
   */
  transformsSnapshotForCamera: FrameTreeSnapshot | undefined;
  /** The frame name for the image's sensor source. This must be included in the transform snapshot. */
  frameNameImageSensor: string;
  /** Camera model. */
  cameraModel: ImageSource_PinholeModel | undefined;
  /** Optional parameters for the grasp. */
  graspParams: GraspParams | undefined;
  /**
   * Automatic walking / gazing configuration.
   * See detailed comment in the PickObjectRayInWorld message.
   */
  walkGazeMode: WalkGazeMode;
}

export interface GraspParams {
  /**
   * Where the grasp is on the hand.  Set to 0 to be a (default) palm grasp, where the object will
   * be pressed against the gripper's palm plate.  Set to 1.0 to be a fingertip grasp, where the
   * robot will try to pick up the target with just the tip of its fingers. \
   * Intermediate values move the grasp location between the two extremes.
   */
  graspPalmToFingertip: number;
  /** Frame name for the frame that the constraints in allowable_orientation are expressed in. */
  graspParamsFrameName: string;
  /**
   * Optional constraints about the orientation of the grasp.  This field lets you specify things
   * like "only do a top down grasp," "grasp only from this direction," or "grasp with the gripper
   * upside-down."  If you don't pass anything, the robot will automatically search for a good
   * grasp orientation.
   */
  allowableOrientation: AllowableOrientation[];
  /**
   * Optional parameter on how much the robot is allowed to move the grasp from where the user
   * requested.  Set this to be GRASP_POSITION_CONSTRAINT_FIXED_AT_USER_POSITION to get a grasp
   * that is at the exact position you requested, but has less or no automatic grasp selection
   * help in position.
   */
  positionConstraint: GraspPositionConstraint;
  /**
   * Optional hint about which camera was used to generate the target points.  The robot will
   * attempt to correct for calibration error between the arm and the body cameras.
   */
  manipulationCameraSource: ManipulationCameraSource;
}

/**
 * Allowable orientation allow you to specify vectors that the different axes of the robot's
 * gripper will be aligned with in the final grasp pose. \
 *
 * Frame: \
 *  In stow position, +X is to the front of the gripper, pointing forward. \
 *                    +Y is out of the side of the gripper going to the robot's left \
 *                    +Z is straight up towards the sky \
 *
 * Here, you can supply vectors that you want the gripper to be aligned with at the final grasp
 * position.  For example, if you wanted to grasp a cup, you'd wouldn't want a top-down grasp.
 * So you might specify: \
 *      frame_name = "vision" (so that Z is gravity aligned) \
 *       VectorAlignmentWithTolerance: \
 *          axis_to_on_gripper_ewrt_gripper = Vec3(0, 0, 1)  <--- we want to control the
 *                                                                gripper's z-axis. \
 *
 *          axis_to_align_with_ewrt_frame = Vec3(0, 0, 1)  <--- ...and we want that axis to be
 *                                                                 straight up \
 *          tolerance_z = 0.52  <--- 30 degrees \
 *    This will ensure that the z-axis of the gripper is pointed within 30 degrees of vertical
 *    so that your grasp won't be top-down (which would need the z-axis of the gripper to be
 *    pointed at the horizon). \
 *
 * You can also specify more than one AllowableOrientation to give the system multiple options.
 * For example, you could specify that you're OK with either a z-up or z-down version of the cup
 * grasp, allowing the gripper roll 180 from the stow position to grasp the cup.
 */
export interface AllowableOrientation {
  rotationWithTolerance: RotationWithTolerance | undefined;
  vectorAlignmentWithTolerance: VectorAlignmentWithTolerance | undefined;
  squeezeGrasp: SqueezeGrasp | undefined;
}

export interface RotationWithTolerance {
  rotationEwrtFrame: Quaternion | undefined;
  thresholdRadians: number;
}

export interface VectorAlignmentWithTolerance {
  /**
   * Axis on the gripper that you want to align.  For example, to align the front of the gripper
   * to be straight down, you'd use: \
   *      axis_on_gripper_ewrt_gripper = Vec3(1, 0, 0) \
   *      axis_to_align_with_ewrt_frame = Vec3(0, 0, -1)   (in the "vision" frame) \
   */
  axisOnGripperEwrtGripper: Vec3 | undefined;
  axisToAlignWithEwrtFrame: Vec3 | undefined;
  thresholdRadians: number;
}

/**
 * A "squeeze grasp" is a top-down grasp where we try to keep both jaws of the gripper in
 * contact with the ground and bring the jaws together.  This can allow the robot to pick up
 * small objects on the ground.
 *
 * If you specify a SqueezeGrasp as:
 *      allowed:
 *          - with no other allowable orientations:
 *              then the robot will perform a squeeze grasp.
 *          - with at least one other allowable orientation:
 *              the robot will attempt to find a normal grasp with that orientation and if it
 *              fails, will perform a squeeze grasp.
 *      disallowed:
 *          - with no other allowable orientations:
 *              the robot will perform an unconstrained grasp search and a grasp if a good grasp
 *              is found.  If no grasp is found, the robot will report
 *              MANIP_STATE_GRASP_PLANNING_NO_SOLUTION
 *          - with other allowable orientations:
 *              the robot will attempt to find a valid grasp.  If it cannot it will report
 *              MANIP_STATE_GRASP_PLANNING_NO_SOLUTION
 */
export interface SqueezeGrasp {
  squeezeGraspDisallowed: boolean;
}

export interface ManipulationApiFeedbackRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Unique identifier for the command, provided by ManipulationApiResponse. */
  manipulationCmdId: number;
}

export interface ManipulationApiFeedbackResponse {
  /** / Common response header. */
  header: ResponseHeader | undefined;
  /** The unique identifier for the ManipulationApiFeedbackRequest. */
  manipulationCmdId: number;
  currentState: ManipulationFeedbackState;
  /**
   * Data from the manipulation system: \
   * "walkto_raycast_intersection": \
   *      If you sent a WalkToObject request, we raycast in the world to intersect your pixel/ray
   *      with the world.  The point of intersection is included in this transform snapshot
   *      with the name "walkto_raycast_intersection". \
   * "grasp_planning_solution": \
   *      If you requested a grasp plan, this frame will contain the planning solution if
   *      available.  This will be the pose of the "hand" frame at the completion of the grasp. \
   * "gripper_nearest_object": \
   *      If the range camera in the hand senses an object, this frame will have the position of
   *      the nearest object.  This is useful for getting a ballpark range measurement.
   */
  transformsSnapshotManipulationData: FrameTreeSnapshot | undefined;
}

export interface ManipulationApiResponse {
  /** / Common response header. */
  header: ResponseHeader | undefined;
  /** ID of the manipulation command either just issued or that we are providing feedback for. */
  manipulationCmdId: number;
  /** Details about how the lease was used. */
  leaseUseResult: LeaseUseResult | undefined;
}

export interface ManipulationApiRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** The Lease to show ownership of the robot. */
  lease: Lease | undefined;
  /** Walk to an object with a raycast in to the world */
  walkToObjectRayInWorld: WalkToObjectRayInWorld | undefined;
  /** Walk to an object at a pixel location in an image. */
  walkToObjectInImage: WalkToObjectInImage | undefined;
  /** Pick up an object. */
  pickObject: PickObject | undefined;
  /** Pick up an object at a pixel location in an image. */
  pickObjectInImage: PickObjectInImage | undefined;
  /**
   * Pick up an object based on a ray in 3D space.  This is the lowest-level, most
   * configurable object picking command.
   */
  pickObjectRayInWorld: PickObjectRayInWorld | undefined;
  /** Execute a previously planned pick. */
  pickObjectExecutePlan: PickObjectExecutePlan | undefined;
}

/**
 * Use this message to assert the ground truth about grasping.
 * Grasping is usually detected automatically by the robot. If the client wishes to override the
 * robot's determination of grasp status, send an ApiGraspOverride message with either:
 * OVERRIDE_HOLDING, indicating the gripper is holding something, or
 * OVERRIDE_NOT_HOLDING, indicating the gripper is not holding
 * anything.
 */
export interface ApiGraspOverride {
  overrideRequest: ApiGraspOverride_Override;
}

export enum ApiGraspOverride_Override {
  OVERRIDE_UNKNOWN = 0,
  OVERRIDE_HOLDING = 1,
  OVERRIDE_NOT_HOLDING = 2,
  UNRECOGNIZED = -1,
}

export function apiGraspOverride_OverrideFromJSON(
  object: any
): ApiGraspOverride_Override {
  switch (object) {
    case 0:
    case "OVERRIDE_UNKNOWN":
      return ApiGraspOverride_Override.OVERRIDE_UNKNOWN;
    case 1:
    case "OVERRIDE_HOLDING":
      return ApiGraspOverride_Override.OVERRIDE_HOLDING;
    case 2:
    case "OVERRIDE_NOT_HOLDING":
      return ApiGraspOverride_Override.OVERRIDE_NOT_HOLDING;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ApiGraspOverride_Override.UNRECOGNIZED;
  }
}

export function apiGraspOverride_OverrideToJSON(
  object: ApiGraspOverride_Override
): string {
  switch (object) {
    case ApiGraspOverride_Override.OVERRIDE_UNKNOWN:
      return "OVERRIDE_UNKNOWN";
    case ApiGraspOverride_Override.OVERRIDE_HOLDING:
      return "OVERRIDE_HOLDING";
    case ApiGraspOverride_Override.OVERRIDE_NOT_HOLDING:
      return "OVERRIDE_NOT_HOLDING";
    case ApiGraspOverride_Override.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Use this message to assert properties about the grasped item.
 * By default, the robot will assume all grasped items are not carriable.
 */
export interface ApiGraspedCarryStateOverride {
  overrideRequest: ManipulatorState_CarryState;
}

export interface ApiGraspOverrideRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  apiGraspOverride: ApiGraspOverride | undefined;
  /**
   * If the grasp override is set to NOT_HOLDING, setting a carry_state_override
   * message will cause the request to be rejected as malformed.
   */
  carryStateOverride: ApiGraspedCarryStateOverride | undefined;
}

export interface ApiGraspOverrideResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
}

function createBaseWalkToObjectRayInWorld(): WalkToObjectRayInWorld {
  return {
    rayStartRtFrame: undefined,
    rayEndRtFrame: undefined,
    frameName: "",
    offsetDistance: undefined,
  };
}

export const WalkToObjectRayInWorld = {
  encode(
    message: WalkToObjectRayInWorld,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.rayStartRtFrame !== undefined) {
      Vec3.encode(message.rayStartRtFrame, writer.uint32(10).fork()).ldelim();
    }
    if (message.rayEndRtFrame !== undefined) {
      Vec3.encode(message.rayEndRtFrame, writer.uint32(18).fork()).ldelim();
    }
    if (message.frameName !== "") {
      writer.uint32(26).string(message.frameName);
    }
    if (message.offsetDistance !== undefined) {
      FloatValue.encode(
        { value: message.offsetDistance! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): WalkToObjectRayInWorld {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWalkToObjectRayInWorld();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rayStartRtFrame = Vec3.decode(reader, reader.uint32());
          break;
        case 2:
          message.rayEndRtFrame = Vec3.decode(reader, reader.uint32());
          break;
        case 3:
          message.frameName = reader.string();
          break;
        case 4:
          message.offsetDistance = FloatValue.decode(
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

  fromJSON(object: any): WalkToObjectRayInWorld {
    return {
      rayStartRtFrame: isSet(object.rayStartRtFrame)
        ? Vec3.fromJSON(object.rayStartRtFrame)
        : undefined,
      rayEndRtFrame: isSet(object.rayEndRtFrame)
        ? Vec3.fromJSON(object.rayEndRtFrame)
        : undefined,
      frameName: isSet(object.frameName) ? String(object.frameName) : "",
      offsetDistance: isSet(object.offsetDistance)
        ? Number(object.offsetDistance)
        : undefined,
    };
  },

  toJSON(message: WalkToObjectRayInWorld): unknown {
    const obj: any = {};
    message.rayStartRtFrame !== undefined &&
      (obj.rayStartRtFrame = message.rayStartRtFrame
        ? Vec3.toJSON(message.rayStartRtFrame)
        : undefined);
    message.rayEndRtFrame !== undefined &&
      (obj.rayEndRtFrame = message.rayEndRtFrame
        ? Vec3.toJSON(message.rayEndRtFrame)
        : undefined);
    message.frameName !== undefined && (obj.frameName = message.frameName);
    message.offsetDistance !== undefined &&
      (obj.offsetDistance = message.offsetDistance);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WalkToObjectRayInWorld>, I>>(
    object: I
  ): WalkToObjectRayInWorld {
    const message = createBaseWalkToObjectRayInWorld();
    message.rayStartRtFrame =
      object.rayStartRtFrame !== undefined && object.rayStartRtFrame !== null
        ? Vec3.fromPartial(object.rayStartRtFrame)
        : undefined;
    message.rayEndRtFrame =
      object.rayEndRtFrame !== undefined && object.rayEndRtFrame !== null
        ? Vec3.fromPartial(object.rayEndRtFrame)
        : undefined;
    message.frameName = object.frameName ?? "";
    message.offsetDistance = object.offsetDistance ?? undefined;
    return message;
  },
};

function createBaseWalkToObjectInImage(): WalkToObjectInImage {
  return {
    pixelXy: undefined,
    transformsSnapshotForCamera: undefined,
    frameNameImageSensor: "",
    cameraModel: undefined,
    offsetDistance: undefined,
  };
}

export const WalkToObjectInImage = {
  encode(
    message: WalkToObjectInImage,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pixelXy !== undefined) {
      Vec2.encode(message.pixelXy, writer.uint32(10).fork()).ldelim();
    }
    if (message.transformsSnapshotForCamera !== undefined) {
      FrameTreeSnapshot.encode(
        message.transformsSnapshotForCamera,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.frameNameImageSensor !== "") {
      writer.uint32(26).string(message.frameNameImageSensor);
    }
    if (message.cameraModel !== undefined) {
      ImageSource_PinholeModel.encode(
        message.cameraModel,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.offsetDistance !== undefined) {
      FloatValue.encode(
        { value: message.offsetDistance! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WalkToObjectInImage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWalkToObjectInImage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pixelXy = Vec2.decode(reader, reader.uint32());
          break;
        case 2:
          message.transformsSnapshotForCamera = FrameTreeSnapshot.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.frameNameImageSensor = reader.string();
          break;
        case 4:
          message.cameraModel = ImageSource_PinholeModel.decode(
            reader,
            reader.uint32()
          );
          break;
        case 5:
          message.offsetDistance = FloatValue.decode(
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

  fromJSON(object: any): WalkToObjectInImage {
    return {
      pixelXy: isSet(object.pixelXy)
        ? Vec2.fromJSON(object.pixelXy)
        : undefined,
      transformsSnapshotForCamera: isSet(object.transformsSnapshotForCamera)
        ? FrameTreeSnapshot.fromJSON(object.transformsSnapshotForCamera)
        : undefined,
      frameNameImageSensor: isSet(object.frameNameImageSensor)
        ? String(object.frameNameImageSensor)
        : "",
      cameraModel: isSet(object.cameraModel)
        ? ImageSource_PinholeModel.fromJSON(object.cameraModel)
        : undefined,
      offsetDistance: isSet(object.offsetDistance)
        ? Number(object.offsetDistance)
        : undefined,
    };
  },

  toJSON(message: WalkToObjectInImage): unknown {
    const obj: any = {};
    message.pixelXy !== undefined &&
      (obj.pixelXy = message.pixelXy
        ? Vec2.toJSON(message.pixelXy)
        : undefined);
    message.transformsSnapshotForCamera !== undefined &&
      (obj.transformsSnapshotForCamera = message.transformsSnapshotForCamera
        ? FrameTreeSnapshot.toJSON(message.transformsSnapshotForCamera)
        : undefined);
    message.frameNameImageSensor !== undefined &&
      (obj.frameNameImageSensor = message.frameNameImageSensor);
    message.cameraModel !== undefined &&
      (obj.cameraModel = message.cameraModel
        ? ImageSource_PinholeModel.toJSON(message.cameraModel)
        : undefined);
    message.offsetDistance !== undefined &&
      (obj.offsetDistance = message.offsetDistance);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WalkToObjectInImage>, I>>(
    object: I
  ): WalkToObjectInImage {
    const message = createBaseWalkToObjectInImage();
    message.pixelXy =
      object.pixelXy !== undefined && object.pixelXy !== null
        ? Vec2.fromPartial(object.pixelXy)
        : undefined;
    message.transformsSnapshotForCamera =
      object.transformsSnapshotForCamera !== undefined &&
      object.transformsSnapshotForCamera !== null
        ? FrameTreeSnapshot.fromPartial(object.transformsSnapshotForCamera)
        : undefined;
    message.frameNameImageSensor = object.frameNameImageSensor ?? "";
    message.cameraModel =
      object.cameraModel !== undefined && object.cameraModel !== null
        ? ImageSource_PinholeModel.fromPartial(object.cameraModel)
        : undefined;
    message.offsetDistance = object.offsetDistance ?? undefined;
    return message;
  },
};

function createBasePickObjectRayInWorld(): PickObjectRayInWorld {
  return {
    rayStartRtFrame: undefined,
    rayEndRtFrame: undefined,
    frameName: "",
    graspParams: undefined,
    walkGazeMode: 0,
  };
}

export const PickObjectRayInWorld = {
  encode(
    message: PickObjectRayInWorld,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.rayStartRtFrame !== undefined) {
      Vec3.encode(message.rayStartRtFrame, writer.uint32(10).fork()).ldelim();
    }
    if (message.rayEndRtFrame !== undefined) {
      Vec3.encode(message.rayEndRtFrame, writer.uint32(18).fork()).ldelim();
    }
    if (message.frameName !== "") {
      writer.uint32(50).string(message.frameName);
    }
    if (message.graspParams !== undefined) {
      GraspParams.encode(
        message.graspParams,
        writer.uint32(82).fork()
      ).ldelim();
    }
    if (message.walkGazeMode !== 0) {
      writer.uint32(32).int32(message.walkGazeMode);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): PickObjectRayInWorld {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePickObjectRayInWorld();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rayStartRtFrame = Vec3.decode(reader, reader.uint32());
          break;
        case 2:
          message.rayEndRtFrame = Vec3.decode(reader, reader.uint32());
          break;
        case 6:
          message.frameName = reader.string();
          break;
        case 10:
          message.graspParams = GraspParams.decode(reader, reader.uint32());
          break;
        case 4:
          message.walkGazeMode = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PickObjectRayInWorld {
    return {
      rayStartRtFrame: isSet(object.rayStartRtFrame)
        ? Vec3.fromJSON(object.rayStartRtFrame)
        : undefined,
      rayEndRtFrame: isSet(object.rayEndRtFrame)
        ? Vec3.fromJSON(object.rayEndRtFrame)
        : undefined,
      frameName: isSet(object.frameName) ? String(object.frameName) : "",
      graspParams: isSet(object.graspParams)
        ? GraspParams.fromJSON(object.graspParams)
        : undefined,
      walkGazeMode: isSet(object.walkGazeMode)
        ? walkGazeModeFromJSON(object.walkGazeMode)
        : 0,
    };
  },

  toJSON(message: PickObjectRayInWorld): unknown {
    const obj: any = {};
    message.rayStartRtFrame !== undefined &&
      (obj.rayStartRtFrame = message.rayStartRtFrame
        ? Vec3.toJSON(message.rayStartRtFrame)
        : undefined);
    message.rayEndRtFrame !== undefined &&
      (obj.rayEndRtFrame = message.rayEndRtFrame
        ? Vec3.toJSON(message.rayEndRtFrame)
        : undefined);
    message.frameName !== undefined && (obj.frameName = message.frameName);
    message.graspParams !== undefined &&
      (obj.graspParams = message.graspParams
        ? GraspParams.toJSON(message.graspParams)
        : undefined);
    message.walkGazeMode !== undefined &&
      (obj.walkGazeMode = walkGazeModeToJSON(message.walkGazeMode));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PickObjectRayInWorld>, I>>(
    object: I
  ): PickObjectRayInWorld {
    const message = createBasePickObjectRayInWorld();
    message.rayStartRtFrame =
      object.rayStartRtFrame !== undefined && object.rayStartRtFrame !== null
        ? Vec3.fromPartial(object.rayStartRtFrame)
        : undefined;
    message.rayEndRtFrame =
      object.rayEndRtFrame !== undefined && object.rayEndRtFrame !== null
        ? Vec3.fromPartial(object.rayEndRtFrame)
        : undefined;
    message.frameName = object.frameName ?? "";
    message.graspParams =
      object.graspParams !== undefined && object.graspParams !== null
        ? GraspParams.fromPartial(object.graspParams)
        : undefined;
    message.walkGazeMode = object.walkGazeMode ?? 0;
    return message;
  },
};

function createBasePickObjectExecutePlan(): PickObjectExecutePlan {
  return {};
}

export const PickObjectExecutePlan = {
  encode(
    _: PickObjectExecutePlan,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): PickObjectExecutePlan {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePickObjectExecutePlan();
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

  fromJSON(_: any): PickObjectExecutePlan {
    return {};
  },

  toJSON(_: PickObjectExecutePlan): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PickObjectExecutePlan>, I>>(
    _: I
  ): PickObjectExecutePlan {
    const message = createBasePickObjectExecutePlan();
    return message;
  },
};

function createBasePickObject(): PickObject {
  return { frameName: "", objectRtFrame: undefined, graspParams: undefined };
}

export const PickObject = {
  encode(
    message: PickObject,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.frameName !== "") {
      writer.uint32(10).string(message.frameName);
    }
    if (message.objectRtFrame !== undefined) {
      Vec3.encode(message.objectRtFrame, writer.uint32(18).fork()).ldelim();
    }
    if (message.graspParams !== undefined) {
      GraspParams.encode(
        message.graspParams,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PickObject {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePickObject();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.frameName = reader.string();
          break;
        case 2:
          message.objectRtFrame = Vec3.decode(reader, reader.uint32());
          break;
        case 3:
          message.graspParams = GraspParams.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PickObject {
    return {
      frameName: isSet(object.frameName) ? String(object.frameName) : "",
      objectRtFrame: isSet(object.objectRtFrame)
        ? Vec3.fromJSON(object.objectRtFrame)
        : undefined,
      graspParams: isSet(object.graspParams)
        ? GraspParams.fromJSON(object.graspParams)
        : undefined,
    };
  },

  toJSON(message: PickObject): unknown {
    const obj: any = {};
    message.frameName !== undefined && (obj.frameName = message.frameName);
    message.objectRtFrame !== undefined &&
      (obj.objectRtFrame = message.objectRtFrame
        ? Vec3.toJSON(message.objectRtFrame)
        : undefined);
    message.graspParams !== undefined &&
      (obj.graspParams = message.graspParams
        ? GraspParams.toJSON(message.graspParams)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PickObject>, I>>(
    object: I
  ): PickObject {
    const message = createBasePickObject();
    message.frameName = object.frameName ?? "";
    message.objectRtFrame =
      object.objectRtFrame !== undefined && object.objectRtFrame !== null
        ? Vec3.fromPartial(object.objectRtFrame)
        : undefined;
    message.graspParams =
      object.graspParams !== undefined && object.graspParams !== null
        ? GraspParams.fromPartial(object.graspParams)
        : undefined;
    return message;
  },
};

function createBasePickObjectInImage(): PickObjectInImage {
  return {
    pixelXy: undefined,
    transformsSnapshotForCamera: undefined,
    frameNameImageSensor: "",
    cameraModel: undefined,
    graspParams: undefined,
    walkGazeMode: 0,
  };
}

export const PickObjectInImage = {
  encode(
    message: PickObjectInImage,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pixelXy !== undefined) {
      Vec2.encode(message.pixelXy, writer.uint32(10).fork()).ldelim();
    }
    if (message.transformsSnapshotForCamera !== undefined) {
      FrameTreeSnapshot.encode(
        message.transformsSnapshotForCamera,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.frameNameImageSensor !== "") {
      writer.uint32(26).string(message.frameNameImageSensor);
    }
    if (message.cameraModel !== undefined) {
      ImageSource_PinholeModel.encode(
        message.cameraModel,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.graspParams !== undefined) {
      GraspParams.encode(
        message.graspParams,
        writer.uint32(82).fork()
      ).ldelim();
    }
    if (message.walkGazeMode !== 0) {
      writer.uint32(72).int32(message.walkGazeMode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PickObjectInImage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePickObjectInImage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pixelXy = Vec2.decode(reader, reader.uint32());
          break;
        case 2:
          message.transformsSnapshotForCamera = FrameTreeSnapshot.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.frameNameImageSensor = reader.string();
          break;
        case 4:
          message.cameraModel = ImageSource_PinholeModel.decode(
            reader,
            reader.uint32()
          );
          break;
        case 10:
          message.graspParams = GraspParams.decode(reader, reader.uint32());
          break;
        case 9:
          message.walkGazeMode = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PickObjectInImage {
    return {
      pixelXy: isSet(object.pixelXy)
        ? Vec2.fromJSON(object.pixelXy)
        : undefined,
      transformsSnapshotForCamera: isSet(object.transformsSnapshotForCamera)
        ? FrameTreeSnapshot.fromJSON(object.transformsSnapshotForCamera)
        : undefined,
      frameNameImageSensor: isSet(object.frameNameImageSensor)
        ? String(object.frameNameImageSensor)
        : "",
      cameraModel: isSet(object.cameraModel)
        ? ImageSource_PinholeModel.fromJSON(object.cameraModel)
        : undefined,
      graspParams: isSet(object.graspParams)
        ? GraspParams.fromJSON(object.graspParams)
        : undefined,
      walkGazeMode: isSet(object.walkGazeMode)
        ? walkGazeModeFromJSON(object.walkGazeMode)
        : 0,
    };
  },

  toJSON(message: PickObjectInImage): unknown {
    const obj: any = {};
    message.pixelXy !== undefined &&
      (obj.pixelXy = message.pixelXy
        ? Vec2.toJSON(message.pixelXy)
        : undefined);
    message.transformsSnapshotForCamera !== undefined &&
      (obj.transformsSnapshotForCamera = message.transformsSnapshotForCamera
        ? FrameTreeSnapshot.toJSON(message.transformsSnapshotForCamera)
        : undefined);
    message.frameNameImageSensor !== undefined &&
      (obj.frameNameImageSensor = message.frameNameImageSensor);
    message.cameraModel !== undefined &&
      (obj.cameraModel = message.cameraModel
        ? ImageSource_PinholeModel.toJSON(message.cameraModel)
        : undefined);
    message.graspParams !== undefined &&
      (obj.graspParams = message.graspParams
        ? GraspParams.toJSON(message.graspParams)
        : undefined);
    message.walkGazeMode !== undefined &&
      (obj.walkGazeMode = walkGazeModeToJSON(message.walkGazeMode));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PickObjectInImage>, I>>(
    object: I
  ): PickObjectInImage {
    const message = createBasePickObjectInImage();
    message.pixelXy =
      object.pixelXy !== undefined && object.pixelXy !== null
        ? Vec2.fromPartial(object.pixelXy)
        : undefined;
    message.transformsSnapshotForCamera =
      object.transformsSnapshotForCamera !== undefined &&
      object.transformsSnapshotForCamera !== null
        ? FrameTreeSnapshot.fromPartial(object.transformsSnapshotForCamera)
        : undefined;
    message.frameNameImageSensor = object.frameNameImageSensor ?? "";
    message.cameraModel =
      object.cameraModel !== undefined && object.cameraModel !== null
        ? ImageSource_PinholeModel.fromPartial(object.cameraModel)
        : undefined;
    message.graspParams =
      object.graspParams !== undefined && object.graspParams !== null
        ? GraspParams.fromPartial(object.graspParams)
        : undefined;
    message.walkGazeMode = object.walkGazeMode ?? 0;
    return message;
  },
};

function createBaseGraspParams(): GraspParams {
  return {
    graspPalmToFingertip: 0,
    graspParamsFrameName: "",
    allowableOrientation: [],
    positionConstraint: 0,
    manipulationCameraSource: 0,
  };
}

export const GraspParams = {
  encode(
    message: GraspParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.graspPalmToFingertip !== 0) {
      writer.uint32(13).float(message.graspPalmToFingertip);
    }
    if (message.graspParamsFrameName !== "") {
      writer.uint32(18).string(message.graspParamsFrameName);
    }
    for (const v of message.allowableOrientation) {
      AllowableOrientation.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.positionConstraint !== 0) {
      writer.uint32(32).int32(message.positionConstraint);
    }
    if (message.manipulationCameraSource !== 0) {
      writer.uint32(40).int32(message.manipulationCameraSource);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GraspParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGraspParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.graspPalmToFingertip = reader.float();
          break;
        case 2:
          message.graspParamsFrameName = reader.string();
          break;
        case 3:
          message.allowableOrientation.push(
            AllowableOrientation.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.positionConstraint = reader.int32() as any;
          break;
        case 5:
          message.manipulationCameraSource = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GraspParams {
    return {
      graspPalmToFingertip: isSet(object.graspPalmToFingertip)
        ? Number(object.graspPalmToFingertip)
        : 0,
      graspParamsFrameName: isSet(object.graspParamsFrameName)
        ? String(object.graspParamsFrameName)
        : "",
      allowableOrientation: Array.isArray(object?.allowableOrientation)
        ? object.allowableOrientation.map((e: any) =>
            AllowableOrientation.fromJSON(e)
          )
        : [],
      positionConstraint: isSet(object.positionConstraint)
        ? graspPositionConstraintFromJSON(object.positionConstraint)
        : 0,
      manipulationCameraSource: isSet(object.manipulationCameraSource)
        ? manipulationCameraSourceFromJSON(object.manipulationCameraSource)
        : 0,
    };
  },

  toJSON(message: GraspParams): unknown {
    const obj: any = {};
    message.graspPalmToFingertip !== undefined &&
      (obj.graspPalmToFingertip = message.graspPalmToFingertip);
    message.graspParamsFrameName !== undefined &&
      (obj.graspParamsFrameName = message.graspParamsFrameName);
    if (message.allowableOrientation) {
      obj.allowableOrientation = message.allowableOrientation.map((e) =>
        e ? AllowableOrientation.toJSON(e) : undefined
      );
    } else {
      obj.allowableOrientation = [];
    }
    message.positionConstraint !== undefined &&
      (obj.positionConstraint = graspPositionConstraintToJSON(
        message.positionConstraint
      ));
    message.manipulationCameraSource !== undefined &&
      (obj.manipulationCameraSource = manipulationCameraSourceToJSON(
        message.manipulationCameraSource
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GraspParams>, I>>(
    object: I
  ): GraspParams {
    const message = createBaseGraspParams();
    message.graspPalmToFingertip = object.graspPalmToFingertip ?? 0;
    message.graspParamsFrameName = object.graspParamsFrameName ?? "";
    message.allowableOrientation =
      object.allowableOrientation?.map((e) =>
        AllowableOrientation.fromPartial(e)
      ) || [];
    message.positionConstraint = object.positionConstraint ?? 0;
    message.manipulationCameraSource = object.manipulationCameraSource ?? 0;
    return message;
  },
};

function createBaseAllowableOrientation(): AllowableOrientation {
  return {
    rotationWithTolerance: undefined,
    vectorAlignmentWithTolerance: undefined,
    squeezeGrasp: undefined,
  };
}

export const AllowableOrientation = {
  encode(
    message: AllowableOrientation,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.rotationWithTolerance !== undefined) {
      RotationWithTolerance.encode(
        message.rotationWithTolerance,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.vectorAlignmentWithTolerance !== undefined) {
      VectorAlignmentWithTolerance.encode(
        message.vectorAlignmentWithTolerance,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.squeezeGrasp !== undefined) {
      SqueezeGrasp.encode(
        message.squeezeGrasp,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AllowableOrientation {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllowableOrientation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rotationWithTolerance = RotationWithTolerance.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.vectorAlignmentWithTolerance =
            VectorAlignmentWithTolerance.decode(reader, reader.uint32());
          break;
        case 3:
          message.squeezeGrasp = SqueezeGrasp.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AllowableOrientation {
    return {
      rotationWithTolerance: isSet(object.rotationWithTolerance)
        ? RotationWithTolerance.fromJSON(object.rotationWithTolerance)
        : undefined,
      vectorAlignmentWithTolerance: isSet(object.vectorAlignmentWithTolerance)
        ? VectorAlignmentWithTolerance.fromJSON(
            object.vectorAlignmentWithTolerance
          )
        : undefined,
      squeezeGrasp: isSet(object.squeezeGrasp)
        ? SqueezeGrasp.fromJSON(object.squeezeGrasp)
        : undefined,
    };
  },

  toJSON(message: AllowableOrientation): unknown {
    const obj: any = {};
    message.rotationWithTolerance !== undefined &&
      (obj.rotationWithTolerance = message.rotationWithTolerance
        ? RotationWithTolerance.toJSON(message.rotationWithTolerance)
        : undefined);
    message.vectorAlignmentWithTolerance !== undefined &&
      (obj.vectorAlignmentWithTolerance = message.vectorAlignmentWithTolerance
        ? VectorAlignmentWithTolerance.toJSON(
            message.vectorAlignmentWithTolerance
          )
        : undefined);
    message.squeezeGrasp !== undefined &&
      (obj.squeezeGrasp = message.squeezeGrasp
        ? SqueezeGrasp.toJSON(message.squeezeGrasp)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AllowableOrientation>, I>>(
    object: I
  ): AllowableOrientation {
    const message = createBaseAllowableOrientation();
    message.rotationWithTolerance =
      object.rotationWithTolerance !== undefined &&
      object.rotationWithTolerance !== null
        ? RotationWithTolerance.fromPartial(object.rotationWithTolerance)
        : undefined;
    message.vectorAlignmentWithTolerance =
      object.vectorAlignmentWithTolerance !== undefined &&
      object.vectorAlignmentWithTolerance !== null
        ? VectorAlignmentWithTolerance.fromPartial(
            object.vectorAlignmentWithTolerance
          )
        : undefined;
    message.squeezeGrasp =
      object.squeezeGrasp !== undefined && object.squeezeGrasp !== null
        ? SqueezeGrasp.fromPartial(object.squeezeGrasp)
        : undefined;
    return message;
  },
};

function createBaseRotationWithTolerance(): RotationWithTolerance {
  return { rotationEwrtFrame: undefined, thresholdRadians: 0 };
}

export const RotationWithTolerance = {
  encode(
    message: RotationWithTolerance,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.rotationEwrtFrame !== undefined) {
      Quaternion.encode(
        message.rotationEwrtFrame,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.thresholdRadians !== 0) {
      writer.uint32(21).float(message.thresholdRadians);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RotationWithTolerance {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRotationWithTolerance();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rotationEwrtFrame = Quaternion.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.thresholdRadians = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RotationWithTolerance {
    return {
      rotationEwrtFrame: isSet(object.rotationEwrtFrame)
        ? Quaternion.fromJSON(object.rotationEwrtFrame)
        : undefined,
      thresholdRadians: isSet(object.thresholdRadians)
        ? Number(object.thresholdRadians)
        : 0,
    };
  },

  toJSON(message: RotationWithTolerance): unknown {
    const obj: any = {};
    message.rotationEwrtFrame !== undefined &&
      (obj.rotationEwrtFrame = message.rotationEwrtFrame
        ? Quaternion.toJSON(message.rotationEwrtFrame)
        : undefined);
    message.thresholdRadians !== undefined &&
      (obj.thresholdRadians = message.thresholdRadians);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RotationWithTolerance>, I>>(
    object: I
  ): RotationWithTolerance {
    const message = createBaseRotationWithTolerance();
    message.rotationEwrtFrame =
      object.rotationEwrtFrame !== undefined &&
      object.rotationEwrtFrame !== null
        ? Quaternion.fromPartial(object.rotationEwrtFrame)
        : undefined;
    message.thresholdRadians = object.thresholdRadians ?? 0;
    return message;
  },
};

function createBaseVectorAlignmentWithTolerance(): VectorAlignmentWithTolerance {
  return {
    axisOnGripperEwrtGripper: undefined,
    axisToAlignWithEwrtFrame: undefined,
    thresholdRadians: 0,
  };
}

export const VectorAlignmentWithTolerance = {
  encode(
    message: VectorAlignmentWithTolerance,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.axisOnGripperEwrtGripper !== undefined) {
      Vec3.encode(
        message.axisOnGripperEwrtGripper,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.axisToAlignWithEwrtFrame !== undefined) {
      Vec3.encode(
        message.axisToAlignWithEwrtFrame,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.thresholdRadians !== 0) {
      writer.uint32(29).float(message.thresholdRadians);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): VectorAlignmentWithTolerance {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVectorAlignmentWithTolerance();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.axisOnGripperEwrtGripper = Vec3.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.axisToAlignWithEwrtFrame = Vec3.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.thresholdRadians = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VectorAlignmentWithTolerance {
    return {
      axisOnGripperEwrtGripper: isSet(object.axisOnGripperEwrtGripper)
        ? Vec3.fromJSON(object.axisOnGripperEwrtGripper)
        : undefined,
      axisToAlignWithEwrtFrame: isSet(object.axisToAlignWithEwrtFrame)
        ? Vec3.fromJSON(object.axisToAlignWithEwrtFrame)
        : undefined,
      thresholdRadians: isSet(object.thresholdRadians)
        ? Number(object.thresholdRadians)
        : 0,
    };
  },

  toJSON(message: VectorAlignmentWithTolerance): unknown {
    const obj: any = {};
    message.axisOnGripperEwrtGripper !== undefined &&
      (obj.axisOnGripperEwrtGripper = message.axisOnGripperEwrtGripper
        ? Vec3.toJSON(message.axisOnGripperEwrtGripper)
        : undefined);
    message.axisToAlignWithEwrtFrame !== undefined &&
      (obj.axisToAlignWithEwrtFrame = message.axisToAlignWithEwrtFrame
        ? Vec3.toJSON(message.axisToAlignWithEwrtFrame)
        : undefined);
    message.thresholdRadians !== undefined &&
      (obj.thresholdRadians = message.thresholdRadians);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<VectorAlignmentWithTolerance>, I>>(
    object: I
  ): VectorAlignmentWithTolerance {
    const message = createBaseVectorAlignmentWithTolerance();
    message.axisOnGripperEwrtGripper =
      object.axisOnGripperEwrtGripper !== undefined &&
      object.axisOnGripperEwrtGripper !== null
        ? Vec3.fromPartial(object.axisOnGripperEwrtGripper)
        : undefined;
    message.axisToAlignWithEwrtFrame =
      object.axisToAlignWithEwrtFrame !== undefined &&
      object.axisToAlignWithEwrtFrame !== null
        ? Vec3.fromPartial(object.axisToAlignWithEwrtFrame)
        : undefined;
    message.thresholdRadians = object.thresholdRadians ?? 0;
    return message;
  },
};

function createBaseSqueezeGrasp(): SqueezeGrasp {
  return { squeezeGraspDisallowed: false };
}

export const SqueezeGrasp = {
  encode(
    message: SqueezeGrasp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.squeezeGraspDisallowed === true) {
      writer.uint32(8).bool(message.squeezeGraspDisallowed);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SqueezeGrasp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSqueezeGrasp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.squeezeGraspDisallowed = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SqueezeGrasp {
    return {
      squeezeGraspDisallowed: isSet(object.squeezeGraspDisallowed)
        ? Boolean(object.squeezeGraspDisallowed)
        : false,
    };
  },

  toJSON(message: SqueezeGrasp): unknown {
    const obj: any = {};
    message.squeezeGraspDisallowed !== undefined &&
      (obj.squeezeGraspDisallowed = message.squeezeGraspDisallowed);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SqueezeGrasp>, I>>(
    object: I
  ): SqueezeGrasp {
    const message = createBaseSqueezeGrasp();
    message.squeezeGraspDisallowed = object.squeezeGraspDisallowed ?? false;
    return message;
  },
};

function createBaseManipulationApiFeedbackRequest(): ManipulationApiFeedbackRequest {
  return { header: undefined, manipulationCmdId: 0 };
}

export const ManipulationApiFeedbackRequest = {
  encode(
    message: ManipulationApiFeedbackRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.manipulationCmdId !== 0) {
      writer.uint32(16).int32(message.manipulationCmdId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ManipulationApiFeedbackRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseManipulationApiFeedbackRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.manipulationCmdId = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ManipulationApiFeedbackRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      manipulationCmdId: isSet(object.manipulationCmdId)
        ? Number(object.manipulationCmdId)
        : 0,
    };
  },

  toJSON(message: ManipulationApiFeedbackRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.manipulationCmdId !== undefined &&
      (obj.manipulationCmdId = Math.round(message.manipulationCmdId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ManipulationApiFeedbackRequest>, I>>(
    object: I
  ): ManipulationApiFeedbackRequest {
    const message = createBaseManipulationApiFeedbackRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.manipulationCmdId = object.manipulationCmdId ?? 0;
    return message;
  },
};

function createBaseManipulationApiFeedbackResponse(): ManipulationApiFeedbackResponse {
  return {
    header: undefined,
    manipulationCmdId: 0,
    currentState: 0,
    transformsSnapshotManipulationData: undefined,
  };
}

export const ManipulationApiFeedbackResponse = {
  encode(
    message: ManipulationApiFeedbackResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.manipulationCmdId !== 0) {
      writer.uint32(32).int32(message.manipulationCmdId);
    }
    if (message.currentState !== 0) {
      writer.uint32(16).int32(message.currentState);
    }
    if (message.transformsSnapshotManipulationData !== undefined) {
      FrameTreeSnapshot.encode(
        message.transformsSnapshotManipulationData,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ManipulationApiFeedbackResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseManipulationApiFeedbackResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 4:
          message.manipulationCmdId = reader.int32();
          break;
        case 2:
          message.currentState = reader.int32() as any;
          break;
        case 3:
          message.transformsSnapshotManipulationData = FrameTreeSnapshot.decode(
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

  fromJSON(object: any): ManipulationApiFeedbackResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      manipulationCmdId: isSet(object.manipulationCmdId)
        ? Number(object.manipulationCmdId)
        : 0,
      currentState: isSet(object.currentState)
        ? manipulationFeedbackStateFromJSON(object.currentState)
        : 0,
      transformsSnapshotManipulationData: isSet(
        object.transformsSnapshotManipulationData
      )
        ? FrameTreeSnapshot.fromJSON(object.transformsSnapshotManipulationData)
        : undefined,
    };
  },

  toJSON(message: ManipulationApiFeedbackResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.manipulationCmdId !== undefined &&
      (obj.manipulationCmdId = Math.round(message.manipulationCmdId));
    message.currentState !== undefined &&
      (obj.currentState = manipulationFeedbackStateToJSON(
        message.currentState
      ));
    message.transformsSnapshotManipulationData !== undefined &&
      (obj.transformsSnapshotManipulationData =
        message.transformsSnapshotManipulationData
          ? FrameTreeSnapshot.toJSON(message.transformsSnapshotManipulationData)
          : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ManipulationApiFeedbackResponse>, I>>(
    object: I
  ): ManipulationApiFeedbackResponse {
    const message = createBaseManipulationApiFeedbackResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.manipulationCmdId = object.manipulationCmdId ?? 0;
    message.currentState = object.currentState ?? 0;
    message.transformsSnapshotManipulationData =
      object.transformsSnapshotManipulationData !== undefined &&
      object.transformsSnapshotManipulationData !== null
        ? FrameTreeSnapshot.fromPartial(
            object.transformsSnapshotManipulationData
          )
        : undefined;
    return message;
  },
};

function createBaseManipulationApiResponse(): ManipulationApiResponse {
  return { header: undefined, manipulationCmdId: 0, leaseUseResult: undefined };
}

export const ManipulationApiResponse = {
  encode(
    message: ManipulationApiResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.manipulationCmdId !== 0) {
      writer.uint32(40).int32(message.manipulationCmdId);
    }
    if (message.leaseUseResult !== undefined) {
      LeaseUseResult.encode(
        message.leaseUseResult,
        writer.uint32(50).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ManipulationApiResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseManipulationApiResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 5:
          message.manipulationCmdId = reader.int32();
          break;
        case 6:
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

  fromJSON(object: any): ManipulationApiResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      manipulationCmdId: isSet(object.manipulationCmdId)
        ? Number(object.manipulationCmdId)
        : 0,
      leaseUseResult: isSet(object.leaseUseResult)
        ? LeaseUseResult.fromJSON(object.leaseUseResult)
        : undefined,
    };
  },

  toJSON(message: ManipulationApiResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.manipulationCmdId !== undefined &&
      (obj.manipulationCmdId = Math.round(message.manipulationCmdId));
    message.leaseUseResult !== undefined &&
      (obj.leaseUseResult = message.leaseUseResult
        ? LeaseUseResult.toJSON(message.leaseUseResult)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ManipulationApiResponse>, I>>(
    object: I
  ): ManipulationApiResponse {
    const message = createBaseManipulationApiResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.manipulationCmdId = object.manipulationCmdId ?? 0;
    message.leaseUseResult =
      object.leaseUseResult !== undefined && object.leaseUseResult !== null
        ? LeaseUseResult.fromPartial(object.leaseUseResult)
        : undefined;
    return message;
  },
};

function createBaseManipulationApiRequest(): ManipulationApiRequest {
  return {
    header: undefined,
    lease: undefined,
    walkToObjectRayInWorld: undefined,
    walkToObjectInImage: undefined,
    pickObject: undefined,
    pickObjectInImage: undefined,
    pickObjectRayInWorld: undefined,
    pickObjectExecutePlan: undefined,
  };
}

export const ManipulationApiRequest = {
  encode(
    message: ManipulationApiRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.lease !== undefined) {
      Lease.encode(message.lease, writer.uint32(18).fork()).ldelim();
    }
    if (message.walkToObjectRayInWorld !== undefined) {
      WalkToObjectRayInWorld.encode(
        message.walkToObjectRayInWorld,
        writer.uint32(98).fork()
      ).ldelim();
    }
    if (message.walkToObjectInImage !== undefined) {
      WalkToObjectInImage.encode(
        message.walkToObjectInImage,
        writer.uint32(106).fork()
      ).ldelim();
    }
    if (message.pickObject !== undefined) {
      PickObject.encode(message.pickObject, writer.uint32(82).fork()).ldelim();
    }
    if (message.pickObjectInImage !== undefined) {
      PickObjectInImage.encode(
        message.pickObjectInImage,
        writer.uint32(90).fork()
      ).ldelim();
    }
    if (message.pickObjectRayInWorld !== undefined) {
      PickObjectRayInWorld.encode(
        message.pickObjectRayInWorld,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.pickObjectExecutePlan !== undefined) {
      PickObjectExecutePlan.encode(
        message.pickObjectExecutePlan,
        writer.uint32(114).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ManipulationApiRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseManipulationApiRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.lease = Lease.decode(reader, reader.uint32());
          break;
        case 12:
          message.walkToObjectRayInWorld = WalkToObjectRayInWorld.decode(
            reader,
            reader.uint32()
          );
          break;
        case 13:
          message.walkToObjectInImage = WalkToObjectInImage.decode(
            reader,
            reader.uint32()
          );
          break;
        case 10:
          message.pickObject = PickObject.decode(reader, reader.uint32());
          break;
        case 11:
          message.pickObjectInImage = PickObjectInImage.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.pickObjectRayInWorld = PickObjectRayInWorld.decode(
            reader,
            reader.uint32()
          );
          break;
        case 14:
          message.pickObjectExecutePlan = PickObjectExecutePlan.decode(
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

  fromJSON(object: any): ManipulationApiRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      lease: isSet(object.lease) ? Lease.fromJSON(object.lease) : undefined,
      walkToObjectRayInWorld: isSet(object.walkToObjectRayInWorld)
        ? WalkToObjectRayInWorld.fromJSON(object.walkToObjectRayInWorld)
        : undefined,
      walkToObjectInImage: isSet(object.walkToObjectInImage)
        ? WalkToObjectInImage.fromJSON(object.walkToObjectInImage)
        : undefined,
      pickObject: isSet(object.pickObject)
        ? PickObject.fromJSON(object.pickObject)
        : undefined,
      pickObjectInImage: isSet(object.pickObjectInImage)
        ? PickObjectInImage.fromJSON(object.pickObjectInImage)
        : undefined,
      pickObjectRayInWorld: isSet(object.pickObjectRayInWorld)
        ? PickObjectRayInWorld.fromJSON(object.pickObjectRayInWorld)
        : undefined,
      pickObjectExecutePlan: isSet(object.pickObjectExecutePlan)
        ? PickObjectExecutePlan.fromJSON(object.pickObjectExecutePlan)
        : undefined,
    };
  },

  toJSON(message: ManipulationApiRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.lease !== undefined &&
      (obj.lease = message.lease ? Lease.toJSON(message.lease) : undefined);
    message.walkToObjectRayInWorld !== undefined &&
      (obj.walkToObjectRayInWorld = message.walkToObjectRayInWorld
        ? WalkToObjectRayInWorld.toJSON(message.walkToObjectRayInWorld)
        : undefined);
    message.walkToObjectInImage !== undefined &&
      (obj.walkToObjectInImage = message.walkToObjectInImage
        ? WalkToObjectInImage.toJSON(message.walkToObjectInImage)
        : undefined);
    message.pickObject !== undefined &&
      (obj.pickObject = message.pickObject
        ? PickObject.toJSON(message.pickObject)
        : undefined);
    message.pickObjectInImage !== undefined &&
      (obj.pickObjectInImage = message.pickObjectInImage
        ? PickObjectInImage.toJSON(message.pickObjectInImage)
        : undefined);
    message.pickObjectRayInWorld !== undefined &&
      (obj.pickObjectRayInWorld = message.pickObjectRayInWorld
        ? PickObjectRayInWorld.toJSON(message.pickObjectRayInWorld)
        : undefined);
    message.pickObjectExecutePlan !== undefined &&
      (obj.pickObjectExecutePlan = message.pickObjectExecutePlan
        ? PickObjectExecutePlan.toJSON(message.pickObjectExecutePlan)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ManipulationApiRequest>, I>>(
    object: I
  ): ManipulationApiRequest {
    const message = createBaseManipulationApiRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.lease =
      object.lease !== undefined && object.lease !== null
        ? Lease.fromPartial(object.lease)
        : undefined;
    message.walkToObjectRayInWorld =
      object.walkToObjectRayInWorld !== undefined &&
      object.walkToObjectRayInWorld !== null
        ? WalkToObjectRayInWorld.fromPartial(object.walkToObjectRayInWorld)
        : undefined;
    message.walkToObjectInImage =
      object.walkToObjectInImage !== undefined &&
      object.walkToObjectInImage !== null
        ? WalkToObjectInImage.fromPartial(object.walkToObjectInImage)
        : undefined;
    message.pickObject =
      object.pickObject !== undefined && object.pickObject !== null
        ? PickObject.fromPartial(object.pickObject)
        : undefined;
    message.pickObjectInImage =
      object.pickObjectInImage !== undefined &&
      object.pickObjectInImage !== null
        ? PickObjectInImage.fromPartial(object.pickObjectInImage)
        : undefined;
    message.pickObjectRayInWorld =
      object.pickObjectRayInWorld !== undefined &&
      object.pickObjectRayInWorld !== null
        ? PickObjectRayInWorld.fromPartial(object.pickObjectRayInWorld)
        : undefined;
    message.pickObjectExecutePlan =
      object.pickObjectExecutePlan !== undefined &&
      object.pickObjectExecutePlan !== null
        ? PickObjectExecutePlan.fromPartial(object.pickObjectExecutePlan)
        : undefined;
    return message;
  },
};

function createBaseApiGraspOverride(): ApiGraspOverride {
  return { overrideRequest: 0 };
}

export const ApiGraspOverride = {
  encode(
    message: ApiGraspOverride,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.overrideRequest !== 0) {
      writer.uint32(8).int32(message.overrideRequest);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApiGraspOverride {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApiGraspOverride();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.overrideRequest = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ApiGraspOverride {
    return {
      overrideRequest: isSet(object.overrideRequest)
        ? apiGraspOverride_OverrideFromJSON(object.overrideRequest)
        : 0,
    };
  },

  toJSON(message: ApiGraspOverride): unknown {
    const obj: any = {};
    message.overrideRequest !== undefined &&
      (obj.overrideRequest = apiGraspOverride_OverrideToJSON(
        message.overrideRequest
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ApiGraspOverride>, I>>(
    object: I
  ): ApiGraspOverride {
    const message = createBaseApiGraspOverride();
    message.overrideRequest = object.overrideRequest ?? 0;
    return message;
  },
};

function createBaseApiGraspedCarryStateOverride(): ApiGraspedCarryStateOverride {
  return { overrideRequest: 0 };
}

export const ApiGraspedCarryStateOverride = {
  encode(
    message: ApiGraspedCarryStateOverride,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.overrideRequest !== 0) {
      writer.uint32(8).int32(message.overrideRequest);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ApiGraspedCarryStateOverride {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApiGraspedCarryStateOverride();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.overrideRequest = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ApiGraspedCarryStateOverride {
    return {
      overrideRequest: isSet(object.overrideRequest)
        ? manipulatorState_CarryStateFromJSON(object.overrideRequest)
        : 0,
    };
  },

  toJSON(message: ApiGraspedCarryStateOverride): unknown {
    const obj: any = {};
    message.overrideRequest !== undefined &&
      (obj.overrideRequest = manipulatorState_CarryStateToJSON(
        message.overrideRequest
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ApiGraspedCarryStateOverride>, I>>(
    object: I
  ): ApiGraspedCarryStateOverride {
    const message = createBaseApiGraspedCarryStateOverride();
    message.overrideRequest = object.overrideRequest ?? 0;
    return message;
  },
};

function createBaseApiGraspOverrideRequest(): ApiGraspOverrideRequest {
  return {
    header: undefined,
    apiGraspOverride: undefined,
    carryStateOverride: undefined,
  };
}

export const ApiGraspOverrideRequest = {
  encode(
    message: ApiGraspOverrideRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.apiGraspOverride !== undefined) {
      ApiGraspOverride.encode(
        message.apiGraspOverride,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.carryStateOverride !== undefined) {
      ApiGraspedCarryStateOverride.encode(
        message.carryStateOverride,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ApiGraspOverrideRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApiGraspOverrideRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 4:
          message.apiGraspOverride = ApiGraspOverride.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.carryStateOverride = ApiGraspedCarryStateOverride.decode(
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

  fromJSON(object: any): ApiGraspOverrideRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      apiGraspOverride: isSet(object.apiGraspOverride)
        ? ApiGraspOverride.fromJSON(object.apiGraspOverride)
        : undefined,
      carryStateOverride: isSet(object.carryStateOverride)
        ? ApiGraspedCarryStateOverride.fromJSON(object.carryStateOverride)
        : undefined,
    };
  },

  toJSON(message: ApiGraspOverrideRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.apiGraspOverride !== undefined &&
      (obj.apiGraspOverride = message.apiGraspOverride
        ? ApiGraspOverride.toJSON(message.apiGraspOverride)
        : undefined);
    message.carryStateOverride !== undefined &&
      (obj.carryStateOverride = message.carryStateOverride
        ? ApiGraspedCarryStateOverride.toJSON(message.carryStateOverride)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ApiGraspOverrideRequest>, I>>(
    object: I
  ): ApiGraspOverrideRequest {
    const message = createBaseApiGraspOverrideRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.apiGraspOverride =
      object.apiGraspOverride !== undefined && object.apiGraspOverride !== null
        ? ApiGraspOverride.fromPartial(object.apiGraspOverride)
        : undefined;
    message.carryStateOverride =
      object.carryStateOverride !== undefined &&
      object.carryStateOverride !== null
        ? ApiGraspedCarryStateOverride.fromPartial(object.carryStateOverride)
        : undefined;
    return message;
  },
};

function createBaseApiGraspOverrideResponse(): ApiGraspOverrideResponse {
  return { header: undefined };
}

export const ApiGraspOverrideResponse = {
  encode(
    message: ApiGraspOverrideResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ApiGraspOverrideResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApiGraspOverrideResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ApiGraspOverrideResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: ApiGraspOverrideResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ApiGraspOverrideResponse>, I>>(
    object: I
  ): ApiGraspOverrideResponse {
    const message = createBaseApiGraspOverrideResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
