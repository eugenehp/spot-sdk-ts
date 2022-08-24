/* eslint-disable */
import { Vec3Value, Vec2Value } from "../geometry";
import _m0 from "protobufjs/minimal";
import {
  DoubleValue,
  BoolValue,
  Int32Value,
} from "../../../google/protobuf/wrappers";

export const protobufPackage = "bosdyn.api.spot";

/** Enum for the pivot point for certain choreography sequence moves. */
export enum Pivot {
  PIVOT_UNKNOWN = 0,
  PIVOT_FRONT = 1,
  PIVOT_HIND = 2,
  PIVOT_CENTER = 3,
  UNRECOGNIZED = -1,
}

export function pivotFromJSON(object: any): Pivot {
  switch (object) {
    case 0:
    case "PIVOT_UNKNOWN":
      return Pivot.PIVOT_UNKNOWN;
    case 1:
    case "PIVOT_FRONT":
      return Pivot.PIVOT_FRONT;
    case 2:
    case "PIVOT_HIND":
      return Pivot.PIVOT_HIND;
    case 3:
    case "PIVOT_CENTER":
      return Pivot.PIVOT_CENTER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Pivot.UNRECOGNIZED;
  }
}

export function pivotToJSON(object: Pivot): string {
  switch (object) {
    case Pivot.PIVOT_UNKNOWN:
      return "PIVOT_UNKNOWN";
    case Pivot.PIVOT_FRONT:
      return "PIVOT_FRONT";
    case Pivot.PIVOT_HIND:
      return "PIVOT_HIND";
    case Pivot.PIVOT_CENTER:
      return "PIVOT_CENTER";
    case Pivot.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Enum to describe the type of easing to perform for the slices at either (or both) the
 * beginning and end of a move.
 */
export enum Easing {
  EASING_UNKNOWN = 0,
  EASING_LINEAR = 1,
  EASING_QUADRATIC_INPUT = 2,
  EASING_QUADRATIC_OUTPUT = 3,
  EASING_QUADRATIC_IN_OUT = 4,
  EASING_CUBIC_INPUT = 5,
  EASING_CUBIC_OUTPUT = 6,
  EASING_CUBIC_IN_OUT = 7,
  EASING_EXPONENTIAL_INPUT = 8,
  EASING_EXPONENTIAL_OUTPUT = 9,
  EASING_EXPONENTIAL_IN_OUT = 10,
  UNRECOGNIZED = -1,
}

export function easingFromJSON(object: any): Easing {
  switch (object) {
    case 0:
    case "EASING_UNKNOWN":
      return Easing.EASING_UNKNOWN;
    case 1:
    case "EASING_LINEAR":
      return Easing.EASING_LINEAR;
    case 2:
    case "EASING_QUADRATIC_INPUT":
      return Easing.EASING_QUADRATIC_INPUT;
    case 3:
    case "EASING_QUADRATIC_OUTPUT":
      return Easing.EASING_QUADRATIC_OUTPUT;
    case 4:
    case "EASING_QUADRATIC_IN_OUT":
      return Easing.EASING_QUADRATIC_IN_OUT;
    case 5:
    case "EASING_CUBIC_INPUT":
      return Easing.EASING_CUBIC_INPUT;
    case 6:
    case "EASING_CUBIC_OUTPUT":
      return Easing.EASING_CUBIC_OUTPUT;
    case 7:
    case "EASING_CUBIC_IN_OUT":
      return Easing.EASING_CUBIC_IN_OUT;
    case 8:
    case "EASING_EXPONENTIAL_INPUT":
      return Easing.EASING_EXPONENTIAL_INPUT;
    case 9:
    case "EASING_EXPONENTIAL_OUTPUT":
      return Easing.EASING_EXPONENTIAL_OUTPUT;
    case 10:
    case "EASING_EXPONENTIAL_IN_OUT":
      return Easing.EASING_EXPONENTIAL_IN_OUT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Easing.UNRECOGNIZED;
  }
}

export function easingToJSON(object: Easing): string {
  switch (object) {
    case Easing.EASING_UNKNOWN:
      return "EASING_UNKNOWN";
    case Easing.EASING_LINEAR:
      return "EASING_LINEAR";
    case Easing.EASING_QUADRATIC_INPUT:
      return "EASING_QUADRATIC_INPUT";
    case Easing.EASING_QUADRATIC_OUTPUT:
      return "EASING_QUADRATIC_OUTPUT";
    case Easing.EASING_QUADRATIC_IN_OUT:
      return "EASING_QUADRATIC_IN_OUT";
    case Easing.EASING_CUBIC_INPUT:
      return "EASING_CUBIC_INPUT";
    case Easing.EASING_CUBIC_OUTPUT:
      return "EASING_CUBIC_OUTPUT";
    case Easing.EASING_CUBIC_IN_OUT:
      return "EASING_CUBIC_IN_OUT";
    case Easing.EASING_EXPONENTIAL_INPUT:
      return "EASING_EXPONENTIAL_INPUT";
    case Easing.EASING_EXPONENTIAL_OUTPUT:
      return "EASING_EXPONENTIAL_OUTPUT";
    case Easing.EASING_EXPONENTIAL_IN_OUT:
      return "EASING_EXPONENTIAL_IN_OUT";
    case Easing.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum ArmMoveFrame {
  ARM_MOVE_FRAME_UNKNOWN = 0,
  ARM_MOVE_FRAME_CENTER_OF_FOOTPRINT = 1,
  ARM_MOVE_FRAME_HAND = 2,
  ARM_MOVE_FRAME_BODY = 3,
  ARM_MOVE_FRAME_SHOULDER = 4,
  ARM_MOVE_FRAME_SHADOW = 5,
  ARM_MOVE_FRAME_DANCE = 6,
  UNRECOGNIZED = -1,
}

export function armMoveFrameFromJSON(object: any): ArmMoveFrame {
  switch (object) {
    case 0:
    case "ARM_MOVE_FRAME_UNKNOWN":
      return ArmMoveFrame.ARM_MOVE_FRAME_UNKNOWN;
    case 1:
    case "ARM_MOVE_FRAME_CENTER_OF_FOOTPRINT":
      return ArmMoveFrame.ARM_MOVE_FRAME_CENTER_OF_FOOTPRINT;
    case 2:
    case "ARM_MOVE_FRAME_HAND":
      return ArmMoveFrame.ARM_MOVE_FRAME_HAND;
    case 3:
    case "ARM_MOVE_FRAME_BODY":
      return ArmMoveFrame.ARM_MOVE_FRAME_BODY;
    case 4:
    case "ARM_MOVE_FRAME_SHOULDER":
      return ArmMoveFrame.ARM_MOVE_FRAME_SHOULDER;
    case 5:
    case "ARM_MOVE_FRAME_SHADOW":
      return ArmMoveFrame.ARM_MOVE_FRAME_SHADOW;
    case 6:
    case "ARM_MOVE_FRAME_DANCE":
      return ArmMoveFrame.ARM_MOVE_FRAME_DANCE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ArmMoveFrame.UNRECOGNIZED;
  }
}

export function armMoveFrameToJSON(object: ArmMoveFrame): string {
  switch (object) {
    case ArmMoveFrame.ARM_MOVE_FRAME_UNKNOWN:
      return "ARM_MOVE_FRAME_UNKNOWN";
    case ArmMoveFrame.ARM_MOVE_FRAME_CENTER_OF_FOOTPRINT:
      return "ARM_MOVE_FRAME_CENTER_OF_FOOTPRINT";
    case ArmMoveFrame.ARM_MOVE_FRAME_HAND:
      return "ARM_MOVE_FRAME_HAND";
    case ArmMoveFrame.ARM_MOVE_FRAME_BODY:
      return "ARM_MOVE_FRAME_BODY";
    case ArmMoveFrame.ARM_MOVE_FRAME_SHOULDER:
      return "ARM_MOVE_FRAME_SHOULDER";
    case ArmMoveFrame.ARM_MOVE_FRAME_SHADOW:
      return "ARM_MOVE_FRAME_SHADOW";
    case ArmMoveFrame.ARM_MOVE_FRAME_DANCE:
      return "ARM_MOVE_FRAME_DANCE";
    case ArmMoveFrame.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Enum to describe which leg is being referenced in specific choreography sequence moves. */
export enum Leg {
  LEG_UNKNOWN = 0,
  LEG_FRONT_LEFT = 1,
  LEG_FRONT_RIGHT = 2,
  LEG_HIND_LEFT = 3,
  LEG_HIND_RIGHT = 4,
  LEG_NO_LEG = -1,
  UNRECOGNIZED = -1,
}

export function legFromJSON(object: any): Leg {
  switch (object) {
    case 0:
    case "LEG_UNKNOWN":
      return Leg.LEG_UNKNOWN;
    case 1:
    case "LEG_FRONT_LEFT":
      return Leg.LEG_FRONT_LEFT;
    case 2:
    case "LEG_FRONT_RIGHT":
      return Leg.LEG_FRONT_RIGHT;
    case 3:
    case "LEG_HIND_LEFT":
      return Leg.LEG_HIND_LEFT;
    case 4:
    case "LEG_HIND_RIGHT":
      return Leg.LEG_HIND_RIGHT;
    case -1:
    case "LEG_NO_LEG":
      return Leg.LEG_NO_LEG;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Leg.UNRECOGNIZED;
  }
}

export function legToJSON(object: Leg): string {
  switch (object) {
    case Leg.LEG_UNKNOWN:
      return "LEG_UNKNOWN";
    case Leg.LEG_FRONT_LEFT:
      return "LEG_FRONT_LEFT";
    case Leg.LEG_FRONT_RIGHT:
      return "LEG_FRONT_RIGHT";
    case Leg.LEG_HIND_LEFT:
      return "LEG_HIND_LEFT";
    case Leg.LEG_HIND_RIGHT:
      return "LEG_HIND_RIGHT";
    case Leg.LEG_NO_LEG:
      return "LEG_NO_LEG";
    case Leg.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum LedLight {
  LED_LIGHT_UNKNOWN = 0,
  LED_LIGHT_LEFT1 = 1,
  LED_LIGHT_LEFT2 = 2,
  LED_LIGHT_LEFT3 = 3,
  LED_LIGHT_LEFT4 = 4,
  LED_LIGHT_RIGHT1 = 5,
  LED_LIGHT_RIGHT2 = 6,
  LED_LIGHT_RIGHT3 = 7,
  LED_LIGHT_RIGHT4 = 8,
  UNRECOGNIZED = -1,
}

export function ledLightFromJSON(object: any): LedLight {
  switch (object) {
    case 0:
    case "LED_LIGHT_UNKNOWN":
      return LedLight.LED_LIGHT_UNKNOWN;
    case 1:
    case "LED_LIGHT_LEFT1":
      return LedLight.LED_LIGHT_LEFT1;
    case 2:
    case "LED_LIGHT_LEFT2":
      return LedLight.LED_LIGHT_LEFT2;
    case 3:
    case "LED_LIGHT_LEFT3":
      return LedLight.LED_LIGHT_LEFT3;
    case 4:
    case "LED_LIGHT_LEFT4":
      return LedLight.LED_LIGHT_LEFT4;
    case 5:
    case "LED_LIGHT_RIGHT1":
      return LedLight.LED_LIGHT_RIGHT1;
    case 6:
    case "LED_LIGHT_RIGHT2":
      return LedLight.LED_LIGHT_RIGHT2;
    case 7:
    case "LED_LIGHT_RIGHT3":
      return LedLight.LED_LIGHT_RIGHT3;
    case 8:
    case "LED_LIGHT_RIGHT4":
      return LedLight.LED_LIGHT_RIGHT4;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LedLight.UNRECOGNIZED;
  }
}

export function ledLightToJSON(object: LedLight): string {
  switch (object) {
    case LedLight.LED_LIGHT_UNKNOWN:
      return "LED_LIGHT_UNKNOWN";
    case LedLight.LED_LIGHT_LEFT1:
      return "LED_LIGHT_LEFT1";
    case LedLight.LED_LIGHT_LEFT2:
      return "LED_LIGHT_LEFT2";
    case LedLight.LED_LIGHT_LEFT3:
      return "LED_LIGHT_LEFT3";
    case LedLight.LED_LIGHT_LEFT4:
      return "LED_LIGHT_LEFT4";
    case LedLight.LED_LIGHT_RIGHT1:
      return "LED_LIGHT_RIGHT1";
    case LedLight.LED_LIGHT_RIGHT2:
      return "LED_LIGHT_RIGHT2";
    case LedLight.LED_LIGHT_RIGHT3:
      return "LED_LIGHT_RIGHT3";
    case LedLight.LED_LIGHT_RIGHT4:
      return "LED_LIGHT_RIGHT4";
    case LedLight.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Euler Angle (yaw->pitch->roll) vector that uses wrapped values so we can tell which elements are set. */
export interface EulerZYXValue {
  roll: number | undefined;
  pitch: number | undefined;
  yaw: number | undefined;
}

/** Euler Angle rates (yaw->pitch->roll) vector that uses wrapped values so we can tell which elements are set. */
export interface EulerRateZYXValue {
  roll: number | undefined;
  pitch: number | undefined;
  yaw: number | undefined;
}

/** Parameters specific to the BodyHold move. */
export interface BodyHoldParams {
  /** The robot will rotate its body to the specified orientation (roll/pitch/yaw) [rad]. */
  rotation: EulerZYXValue | undefined;
  /** The positional offset to the robot's current location [m]. */
  translation: Vec3Value | undefined;
  /** How many "slices" (beats or sub-beats) are allowed before reaching the desired pose. */
  entrySlices: number | undefined;
  /** How many "slices" (beats or sub-beats) are allowed for the robot to return to the original pose. */
  exitSlices: number | undefined;
}

/** Parameters specific to Sway move. */
export interface SwayParams {
  /** How far to move up/down [m]. */
  vertical: number | undefined;
  /** How far to move left/right [m]. */
  horizontal: number | undefined;
  /** How much to roll [rad]. */
  roll: number | undefined;
  /**
   * What point on the robot's body should the swaying be centered at. For example, should the head move
   * instead of the butt?
   */
  pivot: Pivot;
  /** What style motion should we use? */
  style: SwayParams_SwayStyle;
  /** How pronounced should the sway-style be? The value is on a scale from [0,1.0]. */
  pronounced: number | undefined;
  /**
   * Should the robot hold previous values for the vertical, horizontal, and roll axes if the value is
   * left unspecified (value of zero).
   */
  holdZeroAxes: boolean | undefined;
}

/** The type of motion used by the Sway sequence move. */
export enum SwayParams_SwayStyle {
  SWAY_STYLE_UNKNOWN = 0,
  SWAY_STYLE_STANDARD = 1,
  SWAY_STYLE_FAST_OUT = 2,
  SWAY_STYLE_FAST_RETURN = 3,
  SWAY_STYLE_SQUARE = 4,
  SWAY_STYLE_SPIKE = 5,
  SWAY_STYLE_PLATEAU = 6,
  UNRECOGNIZED = -1,
}

export function swayParams_SwayStyleFromJSON(
  object: any
): SwayParams_SwayStyle {
  switch (object) {
    case 0:
    case "SWAY_STYLE_UNKNOWN":
      return SwayParams_SwayStyle.SWAY_STYLE_UNKNOWN;
    case 1:
    case "SWAY_STYLE_STANDARD":
      return SwayParams_SwayStyle.SWAY_STYLE_STANDARD;
    case 2:
    case "SWAY_STYLE_FAST_OUT":
      return SwayParams_SwayStyle.SWAY_STYLE_FAST_OUT;
    case 3:
    case "SWAY_STYLE_FAST_RETURN":
      return SwayParams_SwayStyle.SWAY_STYLE_FAST_RETURN;
    case 4:
    case "SWAY_STYLE_SQUARE":
      return SwayParams_SwayStyle.SWAY_STYLE_SQUARE;
    case 5:
    case "SWAY_STYLE_SPIKE":
      return SwayParams_SwayStyle.SWAY_STYLE_SPIKE;
    case 6:
    case "SWAY_STYLE_PLATEAU":
      return SwayParams_SwayStyle.SWAY_STYLE_PLATEAU;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SwayParams_SwayStyle.UNRECOGNIZED;
  }
}

export function swayParams_SwayStyleToJSON(
  object: SwayParams_SwayStyle
): string {
  switch (object) {
    case SwayParams_SwayStyle.SWAY_STYLE_UNKNOWN:
      return "SWAY_STYLE_UNKNOWN";
    case SwayParams_SwayStyle.SWAY_STYLE_STANDARD:
      return "SWAY_STYLE_STANDARD";
    case SwayParams_SwayStyle.SWAY_STYLE_FAST_OUT:
      return "SWAY_STYLE_FAST_OUT";
    case SwayParams_SwayStyle.SWAY_STYLE_FAST_RETURN:
      return "SWAY_STYLE_FAST_RETURN";
    case SwayParams_SwayStyle.SWAY_STYLE_SQUARE:
      return "SWAY_STYLE_SQUARE";
    case SwayParams_SwayStyle.SWAY_STYLE_SPIKE:
      return "SWAY_STYLE_SPIKE";
    case SwayParams_SwayStyle.SWAY_STYLE_PLATEAU:
      return "SWAY_STYLE_PLATEAU";
    case SwayParams_SwayStyle.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Parameters specific to ArmMove move. */
export interface ArmMoveParams {
  /** Joint angles in radians for the arm joints. */
  shoulder0: number | undefined;
  shoulder1: number | undefined;
  elbow0: number | undefined;
  elbow1: number | undefined;
  wrist0: number | undefined;
  wrist1: number | undefined;
  /** How the motion should be paced. */
  easing: Easing;
  /** Movement for the gripper. */
  gripper: number | undefined;
}

export interface WorkspaceArmMoveParams {
  /** The robot will rotate its body to the specified orientation (roll/pitch/yaw) [rad]. */
  rotation: EulerZYXValue | undefined;
  /** The positional offset to the robot's current location [m]. */
  translation: Vec3Value | undefined;
  /** Go to an absolute position/orientation?  Otherwise, relative to starting pose. */
  absolute: boolean | undefined;
  /** What frame is the motion specified in. */
  frame: ArmMoveFrame;
  /** How the motion should be paced. */
  easing: Easing;
  /** If we're using the dance frame, which one? */
  danceFrameId: number | undefined;
}

export interface Figure8Params {
  height: number | undefined;
  width: number | undefined;
  beatsPerCycle: number | undefined;
}

/** Parameters for open/close of gripper. */
export interface GripperParams {
  /** Angle in radians at which the gripper is open. Note that a 0 radian angle correlates to completely closed. */
  angle: number | undefined;
  /** Speed in m/s at which the gripper should open/close to achieve the desired angle. */
  speed: number | undefined;
}

/** Parameters specific to KneelLegMove move. */
export interface KneelLegMoveParams {
  /**
   * Joint angles of the left front leg in radians.
   * If mirrored, the joints will be flipped for the other leg.
   */
  hipX: number | undefined;
  hipY: number | undefined;
  knee: number | undefined;
  /** If mirrored is true, the joints will be flipped for the leg on the other side (right vs left) of the body. */
  mirror: boolean | undefined;
  /** How the motion should be paced. */
  easing: Easing;
}

/** Parameters specific to KneelLegMove2 move. */
export interface KneelLegMove2Params {
  /** Joint angles of the front left leg in radians. */
  leftHipX: number | undefined;
  leftHipY: number | undefined;
  leftKnee: number | undefined;
  /** Joint angles of the front right leg in radians. */
  rightHipX: number | undefined;
  rightHipY: number | undefined;
  rightKnee: number | undefined;
  /** How the motion should be paced. */
  easing: Easing;
  /** Should we combine with the next move into a smooth trajectory. */
  linkToNext: boolean | undefined;
}

/** Parameters specific to RunningMan move. */
export interface RunningManParams {
  velocity: Vec2Value | undefined;
  /** How high to pick up the forward-moving feet [m]. */
  swingHeight: number | undefined;
  /** How far to spread the contralateral pair of feet [m]. */
  spread: number | undefined;
  /** Should we reverse the motion? */
  reverse: boolean | undefined;
  /** How many full running man cycles should the robot complete in place before starting to move with the desired velocity. */
  preMoveCycles: number | undefined;
  /** Do the move at some multiple of the dance cadence. */
  speedMultiplier: number | undefined;
  /** What fraction of the time to have feet on the ground. */
  dutyCycle: number | undefined;
  /** How high to hold the center of mass above the ground on average. */
  comHeight: number | undefined;
}

/** Parameters specific to Hop move. */
export interface HopParams {
  /** The velocity of the hop gait (X is forward; y is left)[m/s]. */
  velocity: Vec2Value | undefined;
  /** How fast the hop gait should turn [rad/s]. */
  yawRate: number | undefined;
  /** How long the robot should stand in between each hop. */
  standTime: number | undefined;
}

/** Parameters specific to the RandomRotate move. */
export interface RandomRotateParams {
  /** The amplitude [rad] of the rotation in each axis. */
  amplitude: EulerZYXValue | undefined;
  /** The speed [rad/s] of the motion in each axis. */
  speed: EulerRateZYXValue | undefined;
  /**
   * The amount of variation allowed in the speed of the random rotations [m/s]. Note,
   * this must be a positive value.
   */
  speedVariation: number | undefined;
  /**
   * The specified speed values will be split into this many number of tiers between
   * the bounds of [speed - speed_variation, speed + speed variation]. Then a tier (with
   * a specified speed) will be randomly choosen and performed for each axis.
   */
  numSpeedTiers: number | undefined;
  /** How much can the output speed vary from the choosen tiered speed. */
  tierVariation: number | undefined;
}

/** Parameters for the robot's crawling gait. */
export interface CrawlParams {
  /** The number of slices (beats/sub-beats) the duration of a leg swing in the crawl gait should be. */
  swingSlices: number | undefined;
  /** The speed at which we should crawl [m/s].  X is forward.  Y is left. */
  velocity: Vec2Value | undefined;
  /** The distance between the robot's left and right feet [m]. */
  stanceWidth: number | undefined;
  /** The distance between the robot's front and back feet [m]. */
  stanceLength: number | undefined;
}

export interface GotoParams {
  absolutePosition: Vec2Value | undefined;
  absoluteYaw: number | undefined;
  stepPositionStiffness: number | undefined;
  dutyCycle: number | undefined;
  /** Should we combine with the next move into a smooth trajectory. */
  linkToNext: boolean | undefined;
}

/** Parameters for the Bourree move. */
export interface BourreeParams {
  /** The speed at which we should bourree [m/s].  X is forward.  Y is left. */
  velocity: Vec2Value | undefined;
  /** How fast the bourree should turn [rad/s]. */
  yawRate: number | undefined;
  /** How far apart front and hind feet should be. [m] */
  stanceLength: number | undefined;
}

/** Parameters for moves that can go to either side. */
export interface SideParams {
  side: SideParams_Side;
}

export enum SideParams_Side {
  SIDE_UNKNOWN = 0,
  SIDE_LEFT = 1,
  SIDE_RIGHT = 2,
  UNRECOGNIZED = -1,
}

export function sideParams_SideFromJSON(object: any): SideParams_Side {
  switch (object) {
    case 0:
    case "SIDE_UNKNOWN":
      return SideParams_Side.SIDE_UNKNOWN;
    case 1:
    case "SIDE_LEFT":
      return SideParams_Side.SIDE_LEFT;
    case 2:
    case "SIDE_RIGHT":
      return SideParams_Side.SIDE_RIGHT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SideParams_Side.UNRECOGNIZED;
  }
}

export function sideParams_SideToJSON(object: SideParams_Side): string {
  switch (object) {
    case SideParams_Side.SIDE_UNKNOWN:
      return "SIDE_UNKNOWN";
    case SideParams_Side.SIDE_LEFT:
      return "SIDE_LEFT";
    case SideParams_Side.SIDE_RIGHT:
      return "SIDE_RIGHT";
    case SideParams_Side.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Parameters for the robot making a jump. */
export interface JumpParams {
  /** The amount in radians that the robot will turn while in the air. */
  yaw: number | undefined;
  /** The amount of time in slices (beats) that the robot will be in the air. */
  flightSlices: number | undefined;
  /** The distance between the robot's left and right feet [m]. */
  stanceWidth: number | undefined;
  /** The distance between the robot's front and back feet [m]. */
  stanceLength: number | undefined;
  /** How far the robot should jump [m]. */
  translation: Vec2Value | undefined;
  /** How much it should lo/td the first pair of lets ahead of the other pair.  In fraction of flight time. */
  splitFraction: number | undefined;
  leadLegPair: JumpParams_Lead;
  /** Should we turn to a yaw in choreography sequence frame? */
  yawIsAbsolute: boolean | undefined;
  /** Should we translate in choreography sequence frame? */
  translationIsAbsolute: boolean | undefined;
  /** The direction the robot should face upon landing relative to pose at the start of the dance. [rad] */
  absoluteYaw: number | undefined;
  /** Where the robot should land relative to the pose at the start of the dance. [m] */
  absoluteTranslation: Vec2Value | undefined;
  swingHeight: number | undefined;
  /**
   * ** Deprecation Warning ***
   * DEPRECATED as of 3.0.0: The absolute field has been deprecated and split into the yaw_is_absolute and translation_is_absolute fields.
   * The following field will be deprecated and moved to 'reserved' in a future release.
   *
   * @deprecated
   */
  absolute: boolean | undefined;
}

/** If split_fraction is non-zero, which legs to lift first. */
export enum JumpParams_Lead {
  LEAD_UNKNOWN = 0,
  LEAD_AUTO = 1,
  LEAD_FRONT = 2,
  LEAD_HIND = 3,
  LEAD_LEFT = 4,
  LEAD_RIGHT = 5,
  UNRECOGNIZED = -1,
}

export function jumpParams_LeadFromJSON(object: any): JumpParams_Lead {
  switch (object) {
    case 0:
    case "LEAD_UNKNOWN":
      return JumpParams_Lead.LEAD_UNKNOWN;
    case 1:
    case "LEAD_AUTO":
      return JumpParams_Lead.LEAD_AUTO;
    case 2:
    case "LEAD_FRONT":
      return JumpParams_Lead.LEAD_FRONT;
    case 3:
    case "LEAD_HIND":
      return JumpParams_Lead.LEAD_HIND;
    case 4:
    case "LEAD_LEFT":
      return JumpParams_Lead.LEAD_LEFT;
    case 5:
    case "LEAD_RIGHT":
      return JumpParams_Lead.LEAD_RIGHT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return JumpParams_Lead.UNRECOGNIZED;
  }
}

export function jumpParams_LeadToJSON(object: JumpParams_Lead): string {
  switch (object) {
    case JumpParams_Lead.LEAD_UNKNOWN:
      return "LEAD_UNKNOWN";
    case JumpParams_Lead.LEAD_AUTO:
      return "LEAD_AUTO";
    case JumpParams_Lead.LEAD_FRONT:
      return "LEAD_FRONT";
    case JumpParams_Lead.LEAD_HIND:
      return "LEAD_HIND";
    case JumpParams_Lead.LEAD_LEFT:
      return "LEAD_LEFT";
    case JumpParams_Lead.LEAD_RIGHT:
      return "LEAD_RIGHT";
    case JumpParams_Lead.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface StepParams {
  /** Which foot to use (FL = 1, FR = 2, HL = 3, HR = 4). */
  foot: Leg;
  /** Offset of the foot from it's nominal position, in meters. */
  offset: Vec2Value | undefined;
  /** Should we use a second foot?  (None = 0, FL = 1, FR = 2, HL = 3, HR = 4). */
  secondFoot: Leg;
  /**
   * Where should the swing foot go?  This vector should be described in a gravity-aligned body frame
   * relative to the centerpoint of the swing. If set to {0,0,0}, uses the default swing path.
   */
  swingWaypoint: Vec3Value | undefined;
  /**
   * Parameters for altering swing.
   * Note that these will have no effect if swing_waypoint is specified. As well, a zero (or nearly zero)
   * value will be considered as an unspecified parameter.
   */
  swingHeight: number | undefined;
  /** m/s */
  liftoffVelocity: number | undefined;
  /** m/s */
  touchdownVelocity: number | undefined;
  /**
   * Should we mirror the offset for the second foot?
   * Ignored if second_foot is set to None
   */
  mirrorX: boolean | undefined;
  mirrorY: boolean | undefined;
  /**
   * ** Deprecation Warning ***
   * DEPRECATED as of 2.3.0: The mirror field has been deprecated in favor for a more descriptive
   *  break down to mirror_x and mirror_y.
   * The following field will be deprecated and moved to 'reserved' in a future release.
   *
   * @deprecated
   */
  mirror: boolean | undefined;
  /** What fraction of the swing should be spent near the waypoint. */
  waypointDwell: number | undefined;
  /** Should we touch the ground and come back rather than stepping to a new place? */
  touch: boolean | undefined;
  touchOffset: Vec2Value | undefined;
}

/** Parameters for the robot rotating the body. */
export interface RotateBodyParams {
  /** The robot will rotate its body to the specified orientation (roll/pitch/yaw). */
  rotation: EulerZYXValue | undefined;
  /**
   * If true, the robot will transition back to the initial pose we started at before this choreography sequence move begin execution,
   * and otherwise it will remain in whatever pose it is in after completing the choreography sequence move.
   */
  returnToStartPose: boolean | undefined;
}

/** Parameters specific to the ButtCircle DanceMove. */
export interface ButtCircleParams {
  /** How big a circle the robutt will move in. Described in meters. */
  radius: number | undefined;
  /** The number of beats that elapse while performing the butt circle. */
  beatsPerCircle: number | undefined;
  /** The number of circles that will be performed.  If non-zero, takes precedence over beats_per_circle. */
  numberOfCircles: number | undefined;
  /** The pivot point the butt circles should be centered around. */
  pivot: Pivot;
  /** Which way to rotate. */
  clockwise: boolean | undefined;
  /** Where to start.  Zero is up. */
  startingAngle: number | undefined;
}

/** Parameters specific to twerking */
export interface TwerkParams {
  /** How far the robot should twerk in meters. */
  height: number | undefined;
}

/** Parameters specific to turning. */
export interface TurnParams {
  /** How far to turn, described in radians with a positive value representing a turn to the left. */
  yaw: number | undefined;
  /** Orientation to turn to, relative to the orientation at the start of the script. [rad] */
  absoluteYaw: number | undefined;
  /** Should we turn to a yaw in choreography sequence frame? */
  yawIsAbsolute: boolean | undefined;
  /**
   * Swing parameters to describe the footstep pattern during the turning [height in meters]. Note,
   * a zero (or nearly zero) value will be considered as an unspecified parameter.
   */
  swingHeight: number | undefined;
  /**
   * Swing parameter to describe the foot's swing velocity during the turning [m/s]. Note, a zero
   * (or nearly zero) value will be considered as an unspecified parameter.
   */
  swingVelocity: number | undefined;
  /** How far to move relative to starting position. [m] */
  motion: Vec2Value | undefined;
  /** Where to move relative to position at start of script. [m] */
  absoluteMotion: Vec2Value | undefined;
  /** Is motion specified relative to pose at start of dance? */
  motionIsAbsolute: boolean | undefined;
  /**
   * ** Deprecation Warning ***
   * DEPRECATED as of 3.0.0: The absolute field has been deprecated and split into the yaw_is_absolute and translation_is_absolute fields.
   * The following field will be deprecated and moved to 'reserved' in a future release.
   *
   * @deprecated
   */
  absolute: boolean | undefined;
}

/** Parameters specific to pace translation. */
export interface Pace2StepParams {
  /** How far to move relative to starting position. [m] */
  motion: Vec2Value | undefined;
  /** Where to move relative to position at start of script. [m] */
  absoluteMotion: Vec2Value | undefined;
  /** Is motion specified relative to pose at start of dance? */
  motionIsAbsolute: boolean | undefined;
  /**
   * Swing parameters to describe the footstep pattern during the pace translation gait. Note, a zero (or nearly zero)
   * value will be considered as an unspecified parameter.
   */
  swingHeight: number | undefined;
  swingVelocity: number | undefined;
  /** How far to turn, described in radians with a positive value representing a turn to the left. */
  yaw: number | undefined;
  /** Orientation to turn to, relative to the orientation at the start of the script. [rad] */
  absoluteYaw: number | undefined;
  /** Should we turn to a yaw in choreography sequence frame? */
  yawIsAbsolute: boolean | undefined;
  /**
   * ** Deprecation Warning ***
   * DEPRECATED as of 3.0.0: The absolute field has been deprecated and split into the yaw_is_absolute and translation_is_absolute fields.
   * The following field will be deprecated and moved to 'reserved' in a future release.
   */
  absolute: boolean | undefined;
}

/** Parameters specific to the chicken head move. */
export interface ChickenHeadParams {
  /** Bobs the head in this direction in the robot footprint frame. */
  bobMagnitude: Vec3Value | undefined;
  /** How fast to bob the head. */
  beatsPerCycle: number | undefined;
  /** Should we move the frame when the robot steps? */
  follow: boolean | undefined;
}

/** Parameters specific to clapping. */
export interface ClapParams {
  /** Direction in a gravity-aligned body frame of clapping motion. A typical value for the location is (0, 1, 0). */
  direction: Vec3Value | undefined;
  /** Location in body frame of the clap. A typical value for the location is (0.4, 0, -0.5). */
  location: Vec3Value | undefined;
  /** Speed of the clap [m/s]. */
  speed: number | undefined;
  /** How far apart the limbs are before clapping [m]. */
  clapDistance: number | undefined;
}

/** Parameters specific to the kneel_circles move. */
export interface KneelCircleParams {
  /** Location in body frame of the circle center. A typical value for the location is (0.4, 0, -0.5). */
  location: Vec3Value | undefined;
  /** How beats per circle.  One or two are reasonable values. */
  beatsPerCircle: number | undefined;
  /** How many circles to perform.  Mutually exclusive with beats_per_circle. */
  numberOfCircles: number | undefined;
  /** How far apart the feet are when circling [m]. */
  offset: number | undefined;
  /** Size of the circles [m]. */
  radius: number | undefined;
  /** Which way to circle. */
  reverse: boolean | undefined;
}

/** Parameters specific to FrontUp move. */
export interface FrontUpParams {
  /** Should we raise the hind feet instead. */
  mirror: boolean | undefined;
}

export interface FidgetStandParams {
  preset: FidgetStandParams_FidgetPreset;
  minGazePitch: number | undefined;
  maxGazePitch: number | undefined;
  gazeMeanPeriod: number | undefined;
  gazeCenterCfp: Vec3Value | undefined;
  shiftMeanPeriod: number | undefined;
  shiftMaxTransitionTime: number | undefined;
  breathMinZ: number | undefined;
  breathMaxZ: number | undefined;
  breathMaxPeriod: number | undefined;
  legGestureMeanPeriod: number | undefined;
  gazeSlewRate: number | undefined;
  gazePositionGenerationGain: Vec3Value | undefined;
  gazeRollGenerationGain: number | undefined;
}

export enum FidgetStandParams_FidgetPreset {
  PRESET_UNKNOWN = 0,
  PRESET_CUSTOM = 1,
  PRESET_INTEREST = 2,
  PRESET_PLAYFUL = 3,
  PRESET_FEAR = 4,
  PRESET_NERVOUS = 5,
  PRESET_EXHAUSTED = 6,
  UNRECOGNIZED = -1,
}

export function fidgetStandParams_FidgetPresetFromJSON(
  object: any
): FidgetStandParams_FidgetPreset {
  switch (object) {
    case 0:
    case "PRESET_UNKNOWN":
      return FidgetStandParams_FidgetPreset.PRESET_UNKNOWN;
    case 1:
    case "PRESET_CUSTOM":
      return FidgetStandParams_FidgetPreset.PRESET_CUSTOM;
    case 2:
    case "PRESET_INTEREST":
      return FidgetStandParams_FidgetPreset.PRESET_INTEREST;
    case 3:
    case "PRESET_PLAYFUL":
      return FidgetStandParams_FidgetPreset.PRESET_PLAYFUL;
    case 4:
    case "PRESET_FEAR":
      return FidgetStandParams_FidgetPreset.PRESET_FEAR;
    case 5:
    case "PRESET_NERVOUS":
      return FidgetStandParams_FidgetPreset.PRESET_NERVOUS;
    case 6:
    case "PRESET_EXHAUSTED":
      return FidgetStandParams_FidgetPreset.PRESET_EXHAUSTED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return FidgetStandParams_FidgetPreset.UNRECOGNIZED;
  }
}

export function fidgetStandParams_FidgetPresetToJSON(
  object: FidgetStandParams_FidgetPreset
): string {
  switch (object) {
    case FidgetStandParams_FidgetPreset.PRESET_UNKNOWN:
      return "PRESET_UNKNOWN";
    case FidgetStandParams_FidgetPreset.PRESET_CUSTOM:
      return "PRESET_CUSTOM";
    case FidgetStandParams_FidgetPreset.PRESET_INTEREST:
      return "PRESET_INTEREST";
    case FidgetStandParams_FidgetPreset.PRESET_PLAYFUL:
      return "PRESET_PLAYFUL";
    case FidgetStandParams_FidgetPreset.PRESET_FEAR:
      return "PRESET_FEAR";
    case FidgetStandParams_FidgetPreset.PRESET_NERVOUS:
      return "PRESET_NERVOUS";
    case FidgetStandParams_FidgetPreset.PRESET_EXHAUSTED:
      return "PRESET_EXHAUSTED";
    case FidgetStandParams_FidgetPreset.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface FrameSnapshotParams {
  frameId: number | undefined;
  fiducialNumber: number | undefined;
  includeFrontLeftLeg: FrameSnapshotParams_Inclusion;
  includeFrontRightLeg: FrameSnapshotParams_Inclusion;
  includeHindLeftLeg: FrameSnapshotParams_Inclusion;
  includeHindRightLeg: FrameSnapshotParams_Inclusion;
  compensated: boolean | undefined;
}

export enum FrameSnapshotParams_Inclusion {
  INCLUSION_UNKNOWN = 0,
  INCLUSION_IF_STANCE = 1,
  INCLUSION_INCLUDED = 2,
  INCLUSION_EXCLUDED = 3,
  UNRECOGNIZED = -1,
}

export function frameSnapshotParams_InclusionFromJSON(
  object: any
): FrameSnapshotParams_Inclusion {
  switch (object) {
    case 0:
    case "INCLUSION_UNKNOWN":
      return FrameSnapshotParams_Inclusion.INCLUSION_UNKNOWN;
    case 1:
    case "INCLUSION_IF_STANCE":
      return FrameSnapshotParams_Inclusion.INCLUSION_IF_STANCE;
    case 2:
    case "INCLUSION_INCLUDED":
      return FrameSnapshotParams_Inclusion.INCLUSION_INCLUDED;
    case 3:
    case "INCLUSION_EXCLUDED":
      return FrameSnapshotParams_Inclusion.INCLUSION_EXCLUDED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return FrameSnapshotParams_Inclusion.UNRECOGNIZED;
  }
}

export function frameSnapshotParams_InclusionToJSON(
  object: FrameSnapshotParams_Inclusion
): string {
  switch (object) {
    case FrameSnapshotParams_Inclusion.INCLUSION_UNKNOWN:
      return "INCLUSION_UNKNOWN";
    case FrameSnapshotParams_Inclusion.INCLUSION_IF_STANCE:
      return "INCLUSION_IF_STANCE";
    case FrameSnapshotParams_Inclusion.INCLUSION_INCLUDED:
      return "INCLUSION_INCLUDED";
    case FrameSnapshotParams_Inclusion.INCLUSION_EXCLUDED:
      return "INCLUSION_EXCLUDED";
    case FrameSnapshotParams_Inclusion.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface SetColorParams {
  leftColor: Color | undefined;
  rightSameAsLeft: boolean | undefined;
  rightColor: Color | undefined;
  fadeInSlices: number | undefined;
  fadeOutSlices: number | undefined;
}

export interface FadeColorParams {
  topColor: Color | undefined;
  bottomColor: Color | undefined;
  fadeInSlices: number | undefined;
  fadeOutSlices: number | undefined;
}

export interface IndependentColorParams {
  topLeft: Color | undefined;
  upperMidLeft: Color | undefined;
  lowerMidLeft: Color | undefined;
  bottomLeft: Color | undefined;
  topRight: Color | undefined;
  upperMidRight: Color | undefined;
  lowerMidRight: Color | undefined;
  bottomRight: Color | undefined;
  fadeInSlices: number | undefined;
  fadeOutSlices: number | undefined;
}

export interface Color {
  red: number | undefined;
  green: number | undefined;
  blue: number | undefined;
}

export interface RippleColorParams {
  main: Color | undefined;
  secondary: Color | undefined;
  pattern: RippleColorParams_Pattern;
  lightSide: RippleColorParams_LightSide;
  incrementSlices: number | undefined;
}

export enum RippleColorParams_Pattern {
  PATTERN_UNKNOWN = 0,
  PATTERN_FLASHING = 1,
  PATTERN_SNAKE = 2,
  PATTERN_ALTERNATE_COLORS = 3,
  PATTERN_FINE_GRAINED_ALTERNATE_COLORS = 4,
  UNRECOGNIZED = -1,
}

export function rippleColorParams_PatternFromJSON(
  object: any
): RippleColorParams_Pattern {
  switch (object) {
    case 0:
    case "PATTERN_UNKNOWN":
      return RippleColorParams_Pattern.PATTERN_UNKNOWN;
    case 1:
    case "PATTERN_FLASHING":
      return RippleColorParams_Pattern.PATTERN_FLASHING;
    case 2:
    case "PATTERN_SNAKE":
      return RippleColorParams_Pattern.PATTERN_SNAKE;
    case 3:
    case "PATTERN_ALTERNATE_COLORS":
      return RippleColorParams_Pattern.PATTERN_ALTERNATE_COLORS;
    case 4:
    case "PATTERN_FINE_GRAINED_ALTERNATE_COLORS":
      return RippleColorParams_Pattern.PATTERN_FINE_GRAINED_ALTERNATE_COLORS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RippleColorParams_Pattern.UNRECOGNIZED;
  }
}

export function rippleColorParams_PatternToJSON(
  object: RippleColorParams_Pattern
): string {
  switch (object) {
    case RippleColorParams_Pattern.PATTERN_UNKNOWN:
      return "PATTERN_UNKNOWN";
    case RippleColorParams_Pattern.PATTERN_FLASHING:
      return "PATTERN_FLASHING";
    case RippleColorParams_Pattern.PATTERN_SNAKE:
      return "PATTERN_SNAKE";
    case RippleColorParams_Pattern.PATTERN_ALTERNATE_COLORS:
      return "PATTERN_ALTERNATE_COLORS";
    case RippleColorParams_Pattern.PATTERN_FINE_GRAINED_ALTERNATE_COLORS:
      return "PATTERN_FINE_GRAINED_ALTERNATE_COLORS";
    case RippleColorParams_Pattern.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum RippleColorParams_LightSide {
  LIGHT_SIDE_UNKNOWN = 0,
  LIGHT_SIDE_LEFT = 1,
  LIGHT_SIDE_RIGHT = 2,
  LIGHT_SIDE_BOTH_IN_SEQUENCE = 3,
  LIGHT_SIDE_BOTH_MATCHING = 4,
  UNRECOGNIZED = -1,
}

export function rippleColorParams_LightSideFromJSON(
  object: any
): RippleColorParams_LightSide {
  switch (object) {
    case 0:
    case "LIGHT_SIDE_UNKNOWN":
      return RippleColorParams_LightSide.LIGHT_SIDE_UNKNOWN;
    case 1:
    case "LIGHT_SIDE_LEFT":
      return RippleColorParams_LightSide.LIGHT_SIDE_LEFT;
    case 2:
    case "LIGHT_SIDE_RIGHT":
      return RippleColorParams_LightSide.LIGHT_SIDE_RIGHT;
    case 3:
    case "LIGHT_SIDE_BOTH_IN_SEQUENCE":
      return RippleColorParams_LightSide.LIGHT_SIDE_BOTH_IN_SEQUENCE;
    case 4:
    case "LIGHT_SIDE_BOTH_MATCHING":
      return RippleColorParams_LightSide.LIGHT_SIDE_BOTH_MATCHING;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RippleColorParams_LightSide.UNRECOGNIZED;
  }
}

export function rippleColorParams_LightSideToJSON(
  object: RippleColorParams_LightSide
): string {
  switch (object) {
    case RippleColorParams_LightSide.LIGHT_SIDE_UNKNOWN:
      return "LIGHT_SIDE_UNKNOWN";
    case RippleColorParams_LightSide.LIGHT_SIDE_LEFT:
      return "LIGHT_SIDE_LEFT";
    case RippleColorParams_LightSide.LIGHT_SIDE_RIGHT:
      return "LIGHT_SIDE_RIGHT";
    case RippleColorParams_LightSide.LIGHT_SIDE_BOTH_IN_SEQUENCE:
      return "LIGHT_SIDE_BOTH_IN_SEQUENCE";
    case RippleColorParams_LightSide.LIGHT_SIDE_BOTH_MATCHING:
      return "LIGHT_SIDE_BOTH_MATCHING";
    case RippleColorParams_LightSide.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface AnimateParams {
  /** The name of the animated move. There are no default values/bounds associated with this field. */
  animationName: string;
  /** How many slices to smoothly transition from previous pose to animation. */
  bodyEntrySlices: number | undefined;
  /** How many slices to return from animation to nominal pose.  Zero indicates to keep final animated pose. */
  bodyExitSlices: number | undefined;
  /** Multiplier for animated translation by axis to exaggerate or suppress motion along specific axes. */
  translationMultiplier: Vec3Value | undefined;
  /** Multiplier for the animated orientation by axis to exaggerate or suppress motion along specific axes. */
  rotationMultiplier: EulerZYXValue | undefined;
  /** How many slices to smoothly transition from previous pose to animation. */
  armEntrySlices: number | undefined;
  /** Joint angle offsets in radians for the arm joints. */
  shoulder0Offset: number | undefined;
  shoulder1Offset: number | undefined;
  elbow0Offset: number | undefined;
  elbow1Offset: number | undefined;
  wrist0Offset: number | undefined;
  wrist1Offset: number | undefined;
  gripperOffset: number | undefined;
  /** How fast to playback.  1.0 is normal speed. larger is faster. */
  speed: number | undefined;
  /** How late into the nominal script to start. */
  offsetSlices: number | undefined;
  /** Multiply all gripper angles by this value. */
  gripperMultiplier: number | undefined;
  /** How hard the gripper can squeeze.  Fraction of full strength. */
  gripperStrengthFraction: number | undefined;
  /**
   * Which dance frame to use as a reference for workspace arm moves. Including this parameter
   * overrides the animation frame.
   */
  armDanceFrameId: number | undefined;
  /**
   * How hard to try to track the animated body motion.
   * Only applicable to animations that control both the body and the legs.
   * On a scale of 1 to 10 (11 for a bit extra).
   * Higher will result in more closely tracking the animated body motion, but possibly at the expense of balance for more difficult animations.
   */
  bodyTrackingStiffness: number | undefined;
}

function createBaseEulerZYXValue(): EulerZYXValue {
  return { roll: undefined, pitch: undefined, yaw: undefined };
}

export const EulerZYXValue = {
  encode(
    message: EulerZYXValue,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.roll !== undefined) {
      DoubleValue.encode(
        { value: message.roll! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.pitch !== undefined) {
      DoubleValue.encode(
        { value: message.pitch! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.yaw !== undefined) {
      DoubleValue.encode(
        { value: message.yaw! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EulerZYXValue {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEulerZYXValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.roll = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.pitch = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.yaw = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EulerZYXValue {
    return {
      roll: isSet(object.roll) ? Number(object.roll) : undefined,
      pitch: isSet(object.pitch) ? Number(object.pitch) : undefined,
      yaw: isSet(object.yaw) ? Number(object.yaw) : undefined,
    };
  },

  toJSON(message: EulerZYXValue): unknown {
    const obj: any = {};
    message.roll !== undefined && (obj.roll = message.roll);
    message.pitch !== undefined && (obj.pitch = message.pitch);
    message.yaw !== undefined && (obj.yaw = message.yaw);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EulerZYXValue>, I>>(
    object: I
  ): EulerZYXValue {
    const message = createBaseEulerZYXValue();
    message.roll = object.roll ?? undefined;
    message.pitch = object.pitch ?? undefined;
    message.yaw = object.yaw ?? undefined;
    return message;
  },
};

function createBaseEulerRateZYXValue(): EulerRateZYXValue {
  return { roll: undefined, pitch: undefined, yaw: undefined };
}

export const EulerRateZYXValue = {
  encode(
    message: EulerRateZYXValue,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.roll !== undefined) {
      DoubleValue.encode(
        { value: message.roll! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.pitch !== undefined) {
      DoubleValue.encode(
        { value: message.pitch! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.yaw !== undefined) {
      DoubleValue.encode(
        { value: message.yaw! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EulerRateZYXValue {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEulerRateZYXValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.roll = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.pitch = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.yaw = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EulerRateZYXValue {
    return {
      roll: isSet(object.roll) ? Number(object.roll) : undefined,
      pitch: isSet(object.pitch) ? Number(object.pitch) : undefined,
      yaw: isSet(object.yaw) ? Number(object.yaw) : undefined,
    };
  },

  toJSON(message: EulerRateZYXValue): unknown {
    const obj: any = {};
    message.roll !== undefined && (obj.roll = message.roll);
    message.pitch !== undefined && (obj.pitch = message.pitch);
    message.yaw !== undefined && (obj.yaw = message.yaw);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EulerRateZYXValue>, I>>(
    object: I
  ): EulerRateZYXValue {
    const message = createBaseEulerRateZYXValue();
    message.roll = object.roll ?? undefined;
    message.pitch = object.pitch ?? undefined;
    message.yaw = object.yaw ?? undefined;
    return message;
  },
};

function createBaseBodyHoldParams(): BodyHoldParams {
  return {
    rotation: undefined,
    translation: undefined,
    entrySlices: undefined,
    exitSlices: undefined,
  };
}

export const BodyHoldParams = {
  encode(
    message: BodyHoldParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.rotation !== undefined) {
      EulerZYXValue.encode(message.rotation, writer.uint32(10).fork()).ldelim();
    }
    if (message.translation !== undefined) {
      Vec3Value.encode(message.translation, writer.uint32(18).fork()).ldelim();
    }
    if (message.entrySlices !== undefined) {
      DoubleValue.encode(
        { value: message.entrySlices! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.exitSlices !== undefined) {
      DoubleValue.encode(
        { value: message.exitSlices! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BodyHoldParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBodyHoldParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rotation = EulerZYXValue.decode(reader, reader.uint32());
          break;
        case 2:
          message.translation = Vec3Value.decode(reader, reader.uint32());
          break;
        case 3:
          message.entrySlices = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 4:
          message.exitSlices = DoubleValue.decode(
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

  fromJSON(object: any): BodyHoldParams {
    return {
      rotation: isSet(object.rotation)
        ? EulerZYXValue.fromJSON(object.rotation)
        : undefined,
      translation: isSet(object.translation)
        ? Vec3Value.fromJSON(object.translation)
        : undefined,
      entrySlices: isSet(object.entrySlices)
        ? Number(object.entrySlices)
        : undefined,
      exitSlices: isSet(object.exitSlices)
        ? Number(object.exitSlices)
        : undefined,
    };
  },

  toJSON(message: BodyHoldParams): unknown {
    const obj: any = {};
    message.rotation !== undefined &&
      (obj.rotation = message.rotation
        ? EulerZYXValue.toJSON(message.rotation)
        : undefined);
    message.translation !== undefined &&
      (obj.translation = message.translation
        ? Vec3Value.toJSON(message.translation)
        : undefined);
    message.entrySlices !== undefined &&
      (obj.entrySlices = message.entrySlices);
    message.exitSlices !== undefined && (obj.exitSlices = message.exitSlices);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BodyHoldParams>, I>>(
    object: I
  ): BodyHoldParams {
    const message = createBaseBodyHoldParams();
    message.rotation =
      object.rotation !== undefined && object.rotation !== null
        ? EulerZYXValue.fromPartial(object.rotation)
        : undefined;
    message.translation =
      object.translation !== undefined && object.translation !== null
        ? Vec3Value.fromPartial(object.translation)
        : undefined;
    message.entrySlices = object.entrySlices ?? undefined;
    message.exitSlices = object.exitSlices ?? undefined;
    return message;
  },
};

function createBaseSwayParams(): SwayParams {
  return {
    vertical: undefined,
    horizontal: undefined,
    roll: undefined,
    pivot: 0,
    style: 0,
    pronounced: undefined,
    holdZeroAxes: undefined,
  };
}

export const SwayParams = {
  encode(
    message: SwayParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.vertical !== undefined) {
      DoubleValue.encode(
        { value: message.vertical! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.horizontal !== undefined) {
      DoubleValue.encode(
        { value: message.horizontal! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.roll !== undefined) {
      DoubleValue.encode(
        { value: message.roll! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.pivot !== 0) {
      writer.uint32(32).int32(message.pivot);
    }
    if (message.style !== 0) {
      writer.uint32(40).int32(message.style);
    }
    if (message.pronounced !== undefined) {
      DoubleValue.encode(
        { value: message.pronounced! },
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.holdZeroAxes !== undefined) {
      BoolValue.encode(
        { value: message.holdZeroAxes! },
        writer.uint32(58).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SwayParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSwayParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.vertical = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.horizontal = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 3:
          message.roll = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.pivot = reader.int32() as any;
          break;
        case 5:
          message.style = reader.int32() as any;
          break;
        case 6:
          message.pronounced = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 7:
          message.holdZeroAxes = BoolValue.decode(
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

  fromJSON(object: any): SwayParams {
    return {
      vertical: isSet(object.vertical) ? Number(object.vertical) : undefined,
      horizontal: isSet(object.horizontal)
        ? Number(object.horizontal)
        : undefined,
      roll: isSet(object.roll) ? Number(object.roll) : undefined,
      pivot: isSet(object.pivot) ? pivotFromJSON(object.pivot) : 0,
      style: isSet(object.style)
        ? swayParams_SwayStyleFromJSON(object.style)
        : 0,
      pronounced: isSet(object.pronounced)
        ? Number(object.pronounced)
        : undefined,
      holdZeroAxes: isSet(object.holdZeroAxes)
        ? Boolean(object.holdZeroAxes)
        : undefined,
    };
  },

  toJSON(message: SwayParams): unknown {
    const obj: any = {};
    message.vertical !== undefined && (obj.vertical = message.vertical);
    message.horizontal !== undefined && (obj.horizontal = message.horizontal);
    message.roll !== undefined && (obj.roll = message.roll);
    message.pivot !== undefined && (obj.pivot = pivotToJSON(message.pivot));
    message.style !== undefined &&
      (obj.style = swayParams_SwayStyleToJSON(message.style));
    message.pronounced !== undefined && (obj.pronounced = message.pronounced);
    message.holdZeroAxes !== undefined &&
      (obj.holdZeroAxes = message.holdZeroAxes);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SwayParams>, I>>(
    object: I
  ): SwayParams {
    const message = createBaseSwayParams();
    message.vertical = object.vertical ?? undefined;
    message.horizontal = object.horizontal ?? undefined;
    message.roll = object.roll ?? undefined;
    message.pivot = object.pivot ?? 0;
    message.style = object.style ?? 0;
    message.pronounced = object.pronounced ?? undefined;
    message.holdZeroAxes = object.holdZeroAxes ?? undefined;
    return message;
  },
};

function createBaseArmMoveParams(): ArmMoveParams {
  return {
    shoulder0: undefined,
    shoulder1: undefined,
    elbow0: undefined,
    elbow1: undefined,
    wrist0: undefined,
    wrist1: undefined,
    easing: 0,
    gripper: undefined,
  };
}

export const ArmMoveParams = {
  encode(
    message: ArmMoveParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.shoulder0 !== undefined) {
      DoubleValue.encode(
        { value: message.shoulder0! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.shoulder1 !== undefined) {
      DoubleValue.encode(
        { value: message.shoulder1! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.elbow0 !== undefined) {
      DoubleValue.encode(
        { value: message.elbow0! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.elbow1 !== undefined) {
      DoubleValue.encode(
        { value: message.elbow1! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.wrist0 !== undefined) {
      DoubleValue.encode(
        { value: message.wrist0! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.wrist1 !== undefined) {
      DoubleValue.encode(
        { value: message.wrist1! },
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.easing !== 0) {
      writer.uint32(56).int32(message.easing);
    }
    if (message.gripper !== undefined) {
      DoubleValue.encode(
        { value: message.gripper! },
        writer.uint32(66).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ArmMoveParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArmMoveParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.shoulder0 = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.shoulder1 = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.elbow0 = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.elbow1 = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 5:
          message.wrist0 = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 6:
          message.wrist1 = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 7:
          message.easing = reader.int32() as any;
          break;
        case 8:
          message.gripper = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ArmMoveParams {
    return {
      shoulder0: isSet(object.shoulder0) ? Number(object.shoulder0) : undefined,
      shoulder1: isSet(object.shoulder1) ? Number(object.shoulder1) : undefined,
      elbow0: isSet(object.elbow0) ? Number(object.elbow0) : undefined,
      elbow1: isSet(object.elbow1) ? Number(object.elbow1) : undefined,
      wrist0: isSet(object.wrist0) ? Number(object.wrist0) : undefined,
      wrist1: isSet(object.wrist1) ? Number(object.wrist1) : undefined,
      easing: isSet(object.easing) ? easingFromJSON(object.easing) : 0,
      gripper: isSet(object.gripper) ? Number(object.gripper) : undefined,
    };
  },

  toJSON(message: ArmMoveParams): unknown {
    const obj: any = {};
    message.shoulder0 !== undefined && (obj.shoulder0 = message.shoulder0);
    message.shoulder1 !== undefined && (obj.shoulder1 = message.shoulder1);
    message.elbow0 !== undefined && (obj.elbow0 = message.elbow0);
    message.elbow1 !== undefined && (obj.elbow1 = message.elbow1);
    message.wrist0 !== undefined && (obj.wrist0 = message.wrist0);
    message.wrist1 !== undefined && (obj.wrist1 = message.wrist1);
    message.easing !== undefined && (obj.easing = easingToJSON(message.easing));
    message.gripper !== undefined && (obj.gripper = message.gripper);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ArmMoveParams>, I>>(
    object: I
  ): ArmMoveParams {
    const message = createBaseArmMoveParams();
    message.shoulder0 = object.shoulder0 ?? undefined;
    message.shoulder1 = object.shoulder1 ?? undefined;
    message.elbow0 = object.elbow0 ?? undefined;
    message.elbow1 = object.elbow1 ?? undefined;
    message.wrist0 = object.wrist0 ?? undefined;
    message.wrist1 = object.wrist1 ?? undefined;
    message.easing = object.easing ?? 0;
    message.gripper = object.gripper ?? undefined;
    return message;
  },
};

function createBaseWorkspaceArmMoveParams(): WorkspaceArmMoveParams {
  return {
    rotation: undefined,
    translation: undefined,
    absolute: undefined,
    frame: 0,
    easing: 0,
    danceFrameId: undefined,
  };
}

export const WorkspaceArmMoveParams = {
  encode(
    message: WorkspaceArmMoveParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.rotation !== undefined) {
      EulerZYXValue.encode(message.rotation, writer.uint32(10).fork()).ldelim();
    }
    if (message.translation !== undefined) {
      Vec3Value.encode(message.translation, writer.uint32(18).fork()).ldelim();
    }
    if (message.absolute !== undefined) {
      BoolValue.encode(
        { value: message.absolute! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.frame !== 0) {
      writer.uint32(32).int32(message.frame);
    }
    if (message.easing !== 0) {
      writer.uint32(40).int32(message.easing);
    }
    if (message.danceFrameId !== undefined) {
      Int32Value.encode(
        { value: message.danceFrameId! },
        writer.uint32(50).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): WorkspaceArmMoveParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWorkspaceArmMoveParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rotation = EulerZYXValue.decode(reader, reader.uint32());
          break;
        case 2:
          message.translation = Vec3Value.decode(reader, reader.uint32());
          break;
        case 3:
          message.absolute = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.frame = reader.int32() as any;
          break;
        case 5:
          message.easing = reader.int32() as any;
          break;
        case 6:
          message.danceFrameId = Int32Value.decode(
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

  fromJSON(object: any): WorkspaceArmMoveParams {
    return {
      rotation: isSet(object.rotation)
        ? EulerZYXValue.fromJSON(object.rotation)
        : undefined,
      translation: isSet(object.translation)
        ? Vec3Value.fromJSON(object.translation)
        : undefined,
      absolute: isSet(object.absolute) ? Boolean(object.absolute) : undefined,
      frame: isSet(object.frame) ? armMoveFrameFromJSON(object.frame) : 0,
      easing: isSet(object.easing) ? easingFromJSON(object.easing) : 0,
      danceFrameId: isSet(object.danceFrameId)
        ? Number(object.danceFrameId)
        : undefined,
    };
  },

  toJSON(message: WorkspaceArmMoveParams): unknown {
    const obj: any = {};
    message.rotation !== undefined &&
      (obj.rotation = message.rotation
        ? EulerZYXValue.toJSON(message.rotation)
        : undefined);
    message.translation !== undefined &&
      (obj.translation = message.translation
        ? Vec3Value.toJSON(message.translation)
        : undefined);
    message.absolute !== undefined && (obj.absolute = message.absolute);
    message.frame !== undefined &&
      (obj.frame = armMoveFrameToJSON(message.frame));
    message.easing !== undefined && (obj.easing = easingToJSON(message.easing));
    message.danceFrameId !== undefined &&
      (obj.danceFrameId = message.danceFrameId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WorkspaceArmMoveParams>, I>>(
    object: I
  ): WorkspaceArmMoveParams {
    const message = createBaseWorkspaceArmMoveParams();
    message.rotation =
      object.rotation !== undefined && object.rotation !== null
        ? EulerZYXValue.fromPartial(object.rotation)
        : undefined;
    message.translation =
      object.translation !== undefined && object.translation !== null
        ? Vec3Value.fromPartial(object.translation)
        : undefined;
    message.absolute = object.absolute ?? undefined;
    message.frame = object.frame ?? 0;
    message.easing = object.easing ?? 0;
    message.danceFrameId = object.danceFrameId ?? undefined;
    return message;
  },
};

function createBaseFigure8Params(): Figure8Params {
  return { height: undefined, width: undefined, beatsPerCycle: undefined };
}

export const Figure8Params = {
  encode(
    message: Figure8Params,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.height !== undefined) {
      DoubleValue.encode(
        { value: message.height! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.width !== undefined) {
      DoubleValue.encode(
        { value: message.width! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.beatsPerCycle !== undefined) {
      DoubleValue.encode(
        { value: message.beatsPerCycle! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Figure8Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFigure8Params();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.width = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.beatsPerCycle = DoubleValue.decode(
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

  fromJSON(object: any): Figure8Params {
    return {
      height: isSet(object.height) ? Number(object.height) : undefined,
      width: isSet(object.width) ? Number(object.width) : undefined,
      beatsPerCycle: isSet(object.beatsPerCycle)
        ? Number(object.beatsPerCycle)
        : undefined,
    };
  },

  toJSON(message: Figure8Params): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = message.height);
    message.width !== undefined && (obj.width = message.width);
    message.beatsPerCycle !== undefined &&
      (obj.beatsPerCycle = message.beatsPerCycle);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Figure8Params>, I>>(
    object: I
  ): Figure8Params {
    const message = createBaseFigure8Params();
    message.height = object.height ?? undefined;
    message.width = object.width ?? undefined;
    message.beatsPerCycle = object.beatsPerCycle ?? undefined;
    return message;
  },
};

function createBaseGripperParams(): GripperParams {
  return { angle: undefined, speed: undefined };
}

export const GripperParams = {
  encode(
    message: GripperParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.angle !== undefined) {
      DoubleValue.encode(
        { value: message.angle! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.speed !== undefined) {
      DoubleValue.encode(
        { value: message.speed! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GripperParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGripperParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.angle = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.speed = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GripperParams {
    return {
      angle: isSet(object.angle) ? Number(object.angle) : undefined,
      speed: isSet(object.speed) ? Number(object.speed) : undefined,
    };
  },

  toJSON(message: GripperParams): unknown {
    const obj: any = {};
    message.angle !== undefined && (obj.angle = message.angle);
    message.speed !== undefined && (obj.speed = message.speed);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GripperParams>, I>>(
    object: I
  ): GripperParams {
    const message = createBaseGripperParams();
    message.angle = object.angle ?? undefined;
    message.speed = object.speed ?? undefined;
    return message;
  },
};

function createBaseKneelLegMoveParams(): KneelLegMoveParams {
  return {
    hipX: undefined,
    hipY: undefined,
    knee: undefined,
    mirror: undefined,
    easing: 0,
  };
}

export const KneelLegMoveParams = {
  encode(
    message: KneelLegMoveParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.hipX !== undefined) {
      DoubleValue.encode(
        { value: message.hipX! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.hipY !== undefined) {
      DoubleValue.encode(
        { value: message.hipY! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.knee !== undefined) {
      DoubleValue.encode(
        { value: message.knee! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.mirror !== undefined) {
      BoolValue.encode(
        { value: message.mirror! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.easing !== 0) {
      writer.uint32(40).int32(message.easing);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KneelLegMoveParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKneelLegMoveParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hipX = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.hipY = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.knee = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.mirror = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 5:
          message.easing = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): KneelLegMoveParams {
    return {
      hipX: isSet(object.hipX) ? Number(object.hipX) : undefined,
      hipY: isSet(object.hipY) ? Number(object.hipY) : undefined,
      knee: isSet(object.knee) ? Number(object.knee) : undefined,
      mirror: isSet(object.mirror) ? Boolean(object.mirror) : undefined,
      easing: isSet(object.easing) ? easingFromJSON(object.easing) : 0,
    };
  },

  toJSON(message: KneelLegMoveParams): unknown {
    const obj: any = {};
    message.hipX !== undefined && (obj.hipX = message.hipX);
    message.hipY !== undefined && (obj.hipY = message.hipY);
    message.knee !== undefined && (obj.knee = message.knee);
    message.mirror !== undefined && (obj.mirror = message.mirror);
    message.easing !== undefined && (obj.easing = easingToJSON(message.easing));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<KneelLegMoveParams>, I>>(
    object: I
  ): KneelLegMoveParams {
    const message = createBaseKneelLegMoveParams();
    message.hipX = object.hipX ?? undefined;
    message.hipY = object.hipY ?? undefined;
    message.knee = object.knee ?? undefined;
    message.mirror = object.mirror ?? undefined;
    message.easing = object.easing ?? 0;
    return message;
  },
};

function createBaseKneelLegMove2Params(): KneelLegMove2Params {
  return {
    leftHipX: undefined,
    leftHipY: undefined,
    leftKnee: undefined,
    rightHipX: undefined,
    rightHipY: undefined,
    rightKnee: undefined,
    easing: 0,
    linkToNext: undefined,
  };
}

export const KneelLegMove2Params = {
  encode(
    message: KneelLegMove2Params,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.leftHipX !== undefined) {
      DoubleValue.encode(
        { value: message.leftHipX! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.leftHipY !== undefined) {
      DoubleValue.encode(
        { value: message.leftHipY! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.leftKnee !== undefined) {
      DoubleValue.encode(
        { value: message.leftKnee! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.rightHipX !== undefined) {
      DoubleValue.encode(
        { value: message.rightHipX! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.rightHipY !== undefined) {
      DoubleValue.encode(
        { value: message.rightHipY! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.rightKnee !== undefined) {
      DoubleValue.encode(
        { value: message.rightKnee! },
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.easing !== 0) {
      writer.uint32(56).int32(message.easing);
    }
    if (message.linkToNext !== undefined) {
      BoolValue.encode(
        { value: message.linkToNext! },
        writer.uint32(66).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KneelLegMove2Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKneelLegMove2Params();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.leftHipX = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.leftHipY = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.leftKnee = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.rightHipX = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 5:
          message.rightHipY = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 6:
          message.rightKnee = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 7:
          message.easing = reader.int32() as any;
          break;
        case 8:
          message.linkToNext = BoolValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): KneelLegMove2Params {
    return {
      leftHipX: isSet(object.leftHipX) ? Number(object.leftHipX) : undefined,
      leftHipY: isSet(object.leftHipY) ? Number(object.leftHipY) : undefined,
      leftKnee: isSet(object.leftKnee) ? Number(object.leftKnee) : undefined,
      rightHipX: isSet(object.rightHipX) ? Number(object.rightHipX) : undefined,
      rightHipY: isSet(object.rightHipY) ? Number(object.rightHipY) : undefined,
      rightKnee: isSet(object.rightKnee) ? Number(object.rightKnee) : undefined,
      easing: isSet(object.easing) ? easingFromJSON(object.easing) : 0,
      linkToNext: isSet(object.linkToNext)
        ? Boolean(object.linkToNext)
        : undefined,
    };
  },

  toJSON(message: KneelLegMove2Params): unknown {
    const obj: any = {};
    message.leftHipX !== undefined && (obj.leftHipX = message.leftHipX);
    message.leftHipY !== undefined && (obj.leftHipY = message.leftHipY);
    message.leftKnee !== undefined && (obj.leftKnee = message.leftKnee);
    message.rightHipX !== undefined && (obj.rightHipX = message.rightHipX);
    message.rightHipY !== undefined && (obj.rightHipY = message.rightHipY);
    message.rightKnee !== undefined && (obj.rightKnee = message.rightKnee);
    message.easing !== undefined && (obj.easing = easingToJSON(message.easing));
    message.linkToNext !== undefined && (obj.linkToNext = message.linkToNext);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<KneelLegMove2Params>, I>>(
    object: I
  ): KneelLegMove2Params {
    const message = createBaseKneelLegMove2Params();
    message.leftHipX = object.leftHipX ?? undefined;
    message.leftHipY = object.leftHipY ?? undefined;
    message.leftKnee = object.leftKnee ?? undefined;
    message.rightHipX = object.rightHipX ?? undefined;
    message.rightHipY = object.rightHipY ?? undefined;
    message.rightKnee = object.rightKnee ?? undefined;
    message.easing = object.easing ?? 0;
    message.linkToNext = object.linkToNext ?? undefined;
    return message;
  },
};

function createBaseRunningManParams(): RunningManParams {
  return {
    velocity: undefined,
    swingHeight: undefined,
    spread: undefined,
    reverse: undefined,
    preMoveCycles: undefined,
    speedMultiplier: undefined,
    dutyCycle: undefined,
    comHeight: undefined,
  };
}

export const RunningManParams = {
  encode(
    message: RunningManParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.velocity !== undefined) {
      Vec2Value.encode(message.velocity, writer.uint32(10).fork()).ldelim();
    }
    if (message.swingHeight !== undefined) {
      DoubleValue.encode(
        { value: message.swingHeight! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.spread !== undefined) {
      DoubleValue.encode(
        { value: message.spread! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.reverse !== undefined) {
      BoolValue.encode(
        { value: message.reverse! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.preMoveCycles !== undefined) {
      Int32Value.encode(
        { value: message.preMoveCycles! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.speedMultiplier !== undefined) {
      DoubleValue.encode(
        { value: message.speedMultiplier! },
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.dutyCycle !== undefined) {
      DoubleValue.encode(
        { value: message.dutyCycle! },
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.comHeight !== undefined) {
      DoubleValue.encode(
        { value: message.comHeight! },
        writer.uint32(66).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RunningManParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRunningManParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.velocity = Vec2Value.decode(reader, reader.uint32());
          break;
        case 2:
          message.swingHeight = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 3:
          message.spread = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.reverse = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 5:
          message.preMoveCycles = Int32Value.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 6:
          message.speedMultiplier = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 7:
          message.dutyCycle = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 8:
          message.comHeight = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RunningManParams {
    return {
      velocity: isSet(object.velocity)
        ? Vec2Value.fromJSON(object.velocity)
        : undefined,
      swingHeight: isSet(object.swingHeight)
        ? Number(object.swingHeight)
        : undefined,
      spread: isSet(object.spread) ? Number(object.spread) : undefined,
      reverse: isSet(object.reverse) ? Boolean(object.reverse) : undefined,
      preMoveCycles: isSet(object.preMoveCycles)
        ? Number(object.preMoveCycles)
        : undefined,
      speedMultiplier: isSet(object.speedMultiplier)
        ? Number(object.speedMultiplier)
        : undefined,
      dutyCycle: isSet(object.dutyCycle) ? Number(object.dutyCycle) : undefined,
      comHeight: isSet(object.comHeight) ? Number(object.comHeight) : undefined,
    };
  },

  toJSON(message: RunningManParams): unknown {
    const obj: any = {};
    message.velocity !== undefined &&
      (obj.velocity = message.velocity
        ? Vec2Value.toJSON(message.velocity)
        : undefined);
    message.swingHeight !== undefined &&
      (obj.swingHeight = message.swingHeight);
    message.spread !== undefined && (obj.spread = message.spread);
    message.reverse !== undefined && (obj.reverse = message.reverse);
    message.preMoveCycles !== undefined &&
      (obj.preMoveCycles = message.preMoveCycles);
    message.speedMultiplier !== undefined &&
      (obj.speedMultiplier = message.speedMultiplier);
    message.dutyCycle !== undefined && (obj.dutyCycle = message.dutyCycle);
    message.comHeight !== undefined && (obj.comHeight = message.comHeight);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RunningManParams>, I>>(
    object: I
  ): RunningManParams {
    const message = createBaseRunningManParams();
    message.velocity =
      object.velocity !== undefined && object.velocity !== null
        ? Vec2Value.fromPartial(object.velocity)
        : undefined;
    message.swingHeight = object.swingHeight ?? undefined;
    message.spread = object.spread ?? undefined;
    message.reverse = object.reverse ?? undefined;
    message.preMoveCycles = object.preMoveCycles ?? undefined;
    message.speedMultiplier = object.speedMultiplier ?? undefined;
    message.dutyCycle = object.dutyCycle ?? undefined;
    message.comHeight = object.comHeight ?? undefined;
    return message;
  },
};

function createBaseHopParams(): HopParams {
  return { velocity: undefined, yawRate: undefined, standTime: undefined };
}

export const HopParams = {
  encode(
    message: HopParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.velocity !== undefined) {
      Vec2Value.encode(message.velocity, writer.uint32(10).fork()).ldelim();
    }
    if (message.yawRate !== undefined) {
      DoubleValue.encode(
        { value: message.yawRate! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.standTime !== undefined) {
      DoubleValue.encode(
        { value: message.standTime! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HopParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHopParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.velocity = Vec2Value.decode(reader, reader.uint32());
          break;
        case 2:
          message.yawRate = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.standTime = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): HopParams {
    return {
      velocity: isSet(object.velocity)
        ? Vec2Value.fromJSON(object.velocity)
        : undefined,
      yawRate: isSet(object.yawRate) ? Number(object.yawRate) : undefined,
      standTime: isSet(object.standTime) ? Number(object.standTime) : undefined,
    };
  },

  toJSON(message: HopParams): unknown {
    const obj: any = {};
    message.velocity !== undefined &&
      (obj.velocity = message.velocity
        ? Vec2Value.toJSON(message.velocity)
        : undefined);
    message.yawRate !== undefined && (obj.yawRate = message.yawRate);
    message.standTime !== undefined && (obj.standTime = message.standTime);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<HopParams>, I>>(
    object: I
  ): HopParams {
    const message = createBaseHopParams();
    message.velocity =
      object.velocity !== undefined && object.velocity !== null
        ? Vec2Value.fromPartial(object.velocity)
        : undefined;
    message.yawRate = object.yawRate ?? undefined;
    message.standTime = object.standTime ?? undefined;
    return message;
  },
};

function createBaseRandomRotateParams(): RandomRotateParams {
  return {
    amplitude: undefined,
    speed: undefined,
    speedVariation: undefined,
    numSpeedTiers: undefined,
    tierVariation: undefined,
  };
}

export const RandomRotateParams = {
  encode(
    message: RandomRotateParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.amplitude !== undefined) {
      EulerZYXValue.encode(
        message.amplitude,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.speed !== undefined) {
      EulerRateZYXValue.encode(
        message.speed,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.speedVariation !== undefined) {
      DoubleValue.encode(
        { value: message.speedVariation! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.numSpeedTiers !== undefined) {
      Int32Value.encode(
        { value: message.numSpeedTiers! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.tierVariation !== undefined) {
      DoubleValue.encode(
        { value: message.tierVariation! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RandomRotateParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRandomRotateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amplitude = EulerZYXValue.decode(reader, reader.uint32());
          break;
        case 2:
          message.speed = EulerRateZYXValue.decode(reader, reader.uint32());
          break;
        case 3:
          message.speedVariation = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 4:
          message.numSpeedTiers = Int32Value.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 5:
          message.tierVariation = DoubleValue.decode(
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

  fromJSON(object: any): RandomRotateParams {
    return {
      amplitude: isSet(object.amplitude)
        ? EulerZYXValue.fromJSON(object.amplitude)
        : undefined,
      speed: isSet(object.speed)
        ? EulerRateZYXValue.fromJSON(object.speed)
        : undefined,
      speedVariation: isSet(object.speedVariation)
        ? Number(object.speedVariation)
        : undefined,
      numSpeedTiers: isSet(object.numSpeedTiers)
        ? Number(object.numSpeedTiers)
        : undefined,
      tierVariation: isSet(object.tierVariation)
        ? Number(object.tierVariation)
        : undefined,
    };
  },

  toJSON(message: RandomRotateParams): unknown {
    const obj: any = {};
    message.amplitude !== undefined &&
      (obj.amplitude = message.amplitude
        ? EulerZYXValue.toJSON(message.amplitude)
        : undefined);
    message.speed !== undefined &&
      (obj.speed = message.speed
        ? EulerRateZYXValue.toJSON(message.speed)
        : undefined);
    message.speedVariation !== undefined &&
      (obj.speedVariation = message.speedVariation);
    message.numSpeedTiers !== undefined &&
      (obj.numSpeedTiers = message.numSpeedTiers);
    message.tierVariation !== undefined &&
      (obj.tierVariation = message.tierVariation);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RandomRotateParams>, I>>(
    object: I
  ): RandomRotateParams {
    const message = createBaseRandomRotateParams();
    message.amplitude =
      object.amplitude !== undefined && object.amplitude !== null
        ? EulerZYXValue.fromPartial(object.amplitude)
        : undefined;
    message.speed =
      object.speed !== undefined && object.speed !== null
        ? EulerRateZYXValue.fromPartial(object.speed)
        : undefined;
    message.speedVariation = object.speedVariation ?? undefined;
    message.numSpeedTiers = object.numSpeedTiers ?? undefined;
    message.tierVariation = object.tierVariation ?? undefined;
    return message;
  },
};

function createBaseCrawlParams(): CrawlParams {
  return {
    swingSlices: undefined,
    velocity: undefined,
    stanceWidth: undefined,
    stanceLength: undefined,
  };
}

export const CrawlParams = {
  encode(
    message: CrawlParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.swingSlices !== undefined) {
      DoubleValue.encode(
        { value: message.swingSlices! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.velocity !== undefined) {
      Vec2Value.encode(message.velocity, writer.uint32(18).fork()).ldelim();
    }
    if (message.stanceWidth !== undefined) {
      DoubleValue.encode(
        { value: message.stanceWidth! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.stanceLength !== undefined) {
      DoubleValue.encode(
        { value: message.stanceLength! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CrawlParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCrawlParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.swingSlices = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 2:
          message.velocity = Vec2Value.decode(reader, reader.uint32());
          break;
        case 3:
          message.stanceWidth = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 4:
          message.stanceLength = DoubleValue.decode(
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

  fromJSON(object: any): CrawlParams {
    return {
      swingSlices: isSet(object.swingSlices)
        ? Number(object.swingSlices)
        : undefined,
      velocity: isSet(object.velocity)
        ? Vec2Value.fromJSON(object.velocity)
        : undefined,
      stanceWidth: isSet(object.stanceWidth)
        ? Number(object.stanceWidth)
        : undefined,
      stanceLength: isSet(object.stanceLength)
        ? Number(object.stanceLength)
        : undefined,
    };
  },

  toJSON(message: CrawlParams): unknown {
    const obj: any = {};
    message.swingSlices !== undefined &&
      (obj.swingSlices = message.swingSlices);
    message.velocity !== undefined &&
      (obj.velocity = message.velocity
        ? Vec2Value.toJSON(message.velocity)
        : undefined);
    message.stanceWidth !== undefined &&
      (obj.stanceWidth = message.stanceWidth);
    message.stanceLength !== undefined &&
      (obj.stanceLength = message.stanceLength);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CrawlParams>, I>>(
    object: I
  ): CrawlParams {
    const message = createBaseCrawlParams();
    message.swingSlices = object.swingSlices ?? undefined;
    message.velocity =
      object.velocity !== undefined && object.velocity !== null
        ? Vec2Value.fromPartial(object.velocity)
        : undefined;
    message.stanceWidth = object.stanceWidth ?? undefined;
    message.stanceLength = object.stanceLength ?? undefined;
    return message;
  },
};

function createBaseGotoParams(): GotoParams {
  return {
    absolutePosition: undefined,
    absoluteYaw: undefined,
    stepPositionStiffness: undefined,
    dutyCycle: undefined,
    linkToNext: undefined,
  };
}

export const GotoParams = {
  encode(
    message: GotoParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.absolutePosition !== undefined) {
      Vec2Value.encode(
        message.absolutePosition,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.absoluteYaw !== undefined) {
      DoubleValue.encode(
        { value: message.absoluteYaw! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.stepPositionStiffness !== undefined) {
      DoubleValue.encode(
        { value: message.stepPositionStiffness! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.dutyCycle !== undefined) {
      DoubleValue.encode(
        { value: message.dutyCycle! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.linkToNext !== undefined) {
      BoolValue.encode(
        { value: message.linkToNext! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GotoParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGotoParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.absolutePosition = Vec2Value.decode(reader, reader.uint32());
          break;
        case 2:
          message.absoluteYaw = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 3:
          message.stepPositionStiffness = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 4:
          message.dutyCycle = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 5:
          message.linkToNext = BoolValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GotoParams {
    return {
      absolutePosition: isSet(object.absolutePosition)
        ? Vec2Value.fromJSON(object.absolutePosition)
        : undefined,
      absoluteYaw: isSet(object.absoluteYaw)
        ? Number(object.absoluteYaw)
        : undefined,
      stepPositionStiffness: isSet(object.stepPositionStiffness)
        ? Number(object.stepPositionStiffness)
        : undefined,
      dutyCycle: isSet(object.dutyCycle) ? Number(object.dutyCycle) : undefined,
      linkToNext: isSet(object.linkToNext)
        ? Boolean(object.linkToNext)
        : undefined,
    };
  },

  toJSON(message: GotoParams): unknown {
    const obj: any = {};
    message.absolutePosition !== undefined &&
      (obj.absolutePosition = message.absolutePosition
        ? Vec2Value.toJSON(message.absolutePosition)
        : undefined);
    message.absoluteYaw !== undefined &&
      (obj.absoluteYaw = message.absoluteYaw);
    message.stepPositionStiffness !== undefined &&
      (obj.stepPositionStiffness = message.stepPositionStiffness);
    message.dutyCycle !== undefined && (obj.dutyCycle = message.dutyCycle);
    message.linkToNext !== undefined && (obj.linkToNext = message.linkToNext);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GotoParams>, I>>(
    object: I
  ): GotoParams {
    const message = createBaseGotoParams();
    message.absolutePosition =
      object.absolutePosition !== undefined && object.absolutePosition !== null
        ? Vec2Value.fromPartial(object.absolutePosition)
        : undefined;
    message.absoluteYaw = object.absoluteYaw ?? undefined;
    message.stepPositionStiffness = object.stepPositionStiffness ?? undefined;
    message.dutyCycle = object.dutyCycle ?? undefined;
    message.linkToNext = object.linkToNext ?? undefined;
    return message;
  },
};

function createBaseBourreeParams(): BourreeParams {
  return { velocity: undefined, yawRate: undefined, stanceLength: undefined };
}

export const BourreeParams = {
  encode(
    message: BourreeParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.velocity !== undefined) {
      Vec2Value.encode(message.velocity, writer.uint32(10).fork()).ldelim();
    }
    if (message.yawRate !== undefined) {
      DoubleValue.encode(
        { value: message.yawRate! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.stanceLength !== undefined) {
      DoubleValue.encode(
        { value: message.stanceLength! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BourreeParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBourreeParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.velocity = Vec2Value.decode(reader, reader.uint32());
          break;
        case 2:
          message.yawRate = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.stanceLength = DoubleValue.decode(
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

  fromJSON(object: any): BourreeParams {
    return {
      velocity: isSet(object.velocity)
        ? Vec2Value.fromJSON(object.velocity)
        : undefined,
      yawRate: isSet(object.yawRate) ? Number(object.yawRate) : undefined,
      stanceLength: isSet(object.stanceLength)
        ? Number(object.stanceLength)
        : undefined,
    };
  },

  toJSON(message: BourreeParams): unknown {
    const obj: any = {};
    message.velocity !== undefined &&
      (obj.velocity = message.velocity
        ? Vec2Value.toJSON(message.velocity)
        : undefined);
    message.yawRate !== undefined && (obj.yawRate = message.yawRate);
    message.stanceLength !== undefined &&
      (obj.stanceLength = message.stanceLength);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BourreeParams>, I>>(
    object: I
  ): BourreeParams {
    const message = createBaseBourreeParams();
    message.velocity =
      object.velocity !== undefined && object.velocity !== null
        ? Vec2Value.fromPartial(object.velocity)
        : undefined;
    message.yawRate = object.yawRate ?? undefined;
    message.stanceLength = object.stanceLength ?? undefined;
    return message;
  },
};

function createBaseSideParams(): SideParams {
  return { side: 0 };
}

export const SideParams = {
  encode(
    message: SideParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.side !== 0) {
      writer.uint32(8).int32(message.side);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SideParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSideParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.side = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SideParams {
    return {
      side: isSet(object.side) ? sideParams_SideFromJSON(object.side) : 0,
    };
  },

  toJSON(message: SideParams): unknown {
    const obj: any = {};
    message.side !== undefined &&
      (obj.side = sideParams_SideToJSON(message.side));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SideParams>, I>>(
    object: I
  ): SideParams {
    const message = createBaseSideParams();
    message.side = object.side ?? 0;
    return message;
  },
};

function createBaseJumpParams(): JumpParams {
  return {
    yaw: undefined,
    flightSlices: undefined,
    stanceWidth: undefined,
    stanceLength: undefined,
    translation: undefined,
    splitFraction: undefined,
    leadLegPair: 0,
    yawIsAbsolute: undefined,
    translationIsAbsolute: undefined,
    absoluteYaw: undefined,
    absoluteTranslation: undefined,
    swingHeight: undefined,
    absolute: undefined,
  };
}

export const JumpParams = {
  encode(
    message: JumpParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.yaw !== undefined) {
      DoubleValue.encode(
        { value: message.yaw! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.flightSlices !== undefined) {
      DoubleValue.encode(
        { value: message.flightSlices! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.stanceWidth !== undefined) {
      DoubleValue.encode(
        { value: message.stanceWidth! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.stanceLength !== undefined) {
      DoubleValue.encode(
        { value: message.stanceLength! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.translation !== undefined) {
      Vec2Value.encode(message.translation, writer.uint32(50).fork()).ldelim();
    }
    if (message.splitFraction !== undefined) {
      DoubleValue.encode(
        { value: message.splitFraction! },
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.leadLegPair !== 0) {
      writer.uint32(64).int32(message.leadLegPair);
    }
    if (message.yawIsAbsolute !== undefined) {
      BoolValue.encode(
        { value: message.yawIsAbsolute! },
        writer.uint32(90).fork()
      ).ldelim();
    }
    if (message.translationIsAbsolute !== undefined) {
      BoolValue.encode(
        { value: message.translationIsAbsolute! },
        writer.uint32(98).fork()
      ).ldelim();
    }
    if (message.absoluteYaw !== undefined) {
      DoubleValue.encode(
        { value: message.absoluteYaw! },
        writer.uint32(74).fork()
      ).ldelim();
    }
    if (message.absoluteTranslation !== undefined) {
      Vec2Value.encode(
        message.absoluteTranslation,
        writer.uint32(82).fork()
      ).ldelim();
    }
    if (message.swingHeight !== undefined) {
      DoubleValue.encode(
        { value: message.swingHeight! },
        writer.uint32(106).fork()
      ).ldelim();
    }
    if (message.absolute !== undefined) {
      BoolValue.encode(
        { value: message.absolute! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JumpParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJumpParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.yaw = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.flightSlices = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 3:
          message.stanceWidth = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 4:
          message.stanceLength = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 6:
          message.translation = Vec2Value.decode(reader, reader.uint32());
          break;
        case 7:
          message.splitFraction = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 8:
          message.leadLegPair = reader.int32() as any;
          break;
        case 11:
          message.yawIsAbsolute = BoolValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 12:
          message.translationIsAbsolute = BoolValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 9:
          message.absoluteYaw = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 10:
          message.absoluteTranslation = Vec2Value.decode(
            reader,
            reader.uint32()
          );
          break;
        case 13:
          message.swingHeight = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 5:
          message.absolute = BoolValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): JumpParams {
    return {
      yaw: isSet(object.yaw) ? Number(object.yaw) : undefined,
      flightSlices: isSet(object.flightSlices)
        ? Number(object.flightSlices)
        : undefined,
      stanceWidth: isSet(object.stanceWidth)
        ? Number(object.stanceWidth)
        : undefined,
      stanceLength: isSet(object.stanceLength)
        ? Number(object.stanceLength)
        : undefined,
      translation: isSet(object.translation)
        ? Vec2Value.fromJSON(object.translation)
        : undefined,
      splitFraction: isSet(object.splitFraction)
        ? Number(object.splitFraction)
        : undefined,
      leadLegPair: isSet(object.leadLegPair)
        ? jumpParams_LeadFromJSON(object.leadLegPair)
        : 0,
      yawIsAbsolute: isSet(object.yawIsAbsolute)
        ? Boolean(object.yawIsAbsolute)
        : undefined,
      translationIsAbsolute: isSet(object.translationIsAbsolute)
        ? Boolean(object.translationIsAbsolute)
        : undefined,
      absoluteYaw: isSet(object.absoluteYaw)
        ? Number(object.absoluteYaw)
        : undefined,
      absoluteTranslation: isSet(object.absoluteTranslation)
        ? Vec2Value.fromJSON(object.absoluteTranslation)
        : undefined,
      swingHeight: isSet(object.swingHeight)
        ? Number(object.swingHeight)
        : undefined,
      absolute: isSet(object.absolute) ? Boolean(object.absolute) : undefined,
    };
  },

  toJSON(message: JumpParams): unknown {
    const obj: any = {};
    message.yaw !== undefined && (obj.yaw = message.yaw);
    message.flightSlices !== undefined &&
      (obj.flightSlices = message.flightSlices);
    message.stanceWidth !== undefined &&
      (obj.stanceWidth = message.stanceWidth);
    message.stanceLength !== undefined &&
      (obj.stanceLength = message.stanceLength);
    message.translation !== undefined &&
      (obj.translation = message.translation
        ? Vec2Value.toJSON(message.translation)
        : undefined);
    message.splitFraction !== undefined &&
      (obj.splitFraction = message.splitFraction);
    message.leadLegPair !== undefined &&
      (obj.leadLegPair = jumpParams_LeadToJSON(message.leadLegPair));
    message.yawIsAbsolute !== undefined &&
      (obj.yawIsAbsolute = message.yawIsAbsolute);
    message.translationIsAbsolute !== undefined &&
      (obj.translationIsAbsolute = message.translationIsAbsolute);
    message.absoluteYaw !== undefined &&
      (obj.absoluteYaw = message.absoluteYaw);
    message.absoluteTranslation !== undefined &&
      (obj.absoluteTranslation = message.absoluteTranslation
        ? Vec2Value.toJSON(message.absoluteTranslation)
        : undefined);
    message.swingHeight !== undefined &&
      (obj.swingHeight = message.swingHeight);
    message.absolute !== undefined && (obj.absolute = message.absolute);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<JumpParams>, I>>(
    object: I
  ): JumpParams {
    const message = createBaseJumpParams();
    message.yaw = object.yaw ?? undefined;
    message.flightSlices = object.flightSlices ?? undefined;
    message.stanceWidth = object.stanceWidth ?? undefined;
    message.stanceLength = object.stanceLength ?? undefined;
    message.translation =
      object.translation !== undefined && object.translation !== null
        ? Vec2Value.fromPartial(object.translation)
        : undefined;
    message.splitFraction = object.splitFraction ?? undefined;
    message.leadLegPair = object.leadLegPair ?? 0;
    message.yawIsAbsolute = object.yawIsAbsolute ?? undefined;
    message.translationIsAbsolute = object.translationIsAbsolute ?? undefined;
    message.absoluteYaw = object.absoluteYaw ?? undefined;
    message.absoluteTranslation =
      object.absoluteTranslation !== undefined &&
      object.absoluteTranslation !== null
        ? Vec2Value.fromPartial(object.absoluteTranslation)
        : undefined;
    message.swingHeight = object.swingHeight ?? undefined;
    message.absolute = object.absolute ?? undefined;
    return message;
  },
};

function createBaseStepParams(): StepParams {
  return {
    foot: 0,
    offset: undefined,
    secondFoot: 0,
    swingWaypoint: undefined,
    swingHeight: undefined,
    liftoffVelocity: undefined,
    touchdownVelocity: undefined,
    mirrorX: undefined,
    mirrorY: undefined,
    mirror: undefined,
    waypointDwell: undefined,
    touch: undefined,
    touchOffset: undefined,
  };
}

export const StepParams = {
  encode(
    message: StepParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.foot !== 0) {
      writer.uint32(8).int32(message.foot);
    }
    if (message.offset !== undefined) {
      Vec2Value.encode(message.offset, writer.uint32(18).fork()).ldelim();
    }
    if (message.secondFoot !== 0) {
      writer.uint32(24).int32(message.secondFoot);
    }
    if (message.swingWaypoint !== undefined) {
      Vec3Value.encode(
        message.swingWaypoint,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.swingHeight !== undefined) {
      DoubleValue.encode(
        { value: message.swingHeight! },
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.liftoffVelocity !== undefined) {
      DoubleValue.encode(
        { value: message.liftoffVelocity! },
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.touchdownVelocity !== undefined) {
      DoubleValue.encode(
        { value: message.touchdownVelocity! },
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.mirrorX !== undefined) {
      BoolValue.encode(
        { value: message.mirrorX! },
        writer.uint32(74).fork()
      ).ldelim();
    }
    if (message.mirrorY !== undefined) {
      BoolValue.encode(
        { value: message.mirrorY! },
        writer.uint32(82).fork()
      ).ldelim();
    }
    if (message.mirror !== undefined) {
      BoolValue.encode(
        { value: message.mirror! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.waypointDwell !== undefined) {
      DoubleValue.encode(
        { value: message.waypointDwell! },
        writer.uint32(90).fork()
      ).ldelim();
    }
    if (message.touch !== undefined) {
      BoolValue.encode(
        { value: message.touch! },
        writer.uint32(98).fork()
      ).ldelim();
    }
    if (message.touchOffset !== undefined) {
      Vec2Value.encode(message.touchOffset, writer.uint32(106).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StepParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStepParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.foot = reader.int32() as any;
          break;
        case 2:
          message.offset = Vec2Value.decode(reader, reader.uint32());
          break;
        case 3:
          message.secondFoot = reader.int32() as any;
          break;
        case 5:
          message.swingWaypoint = Vec3Value.decode(reader, reader.uint32());
          break;
        case 6:
          message.swingHeight = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 7:
          message.liftoffVelocity = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 8:
          message.touchdownVelocity = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 9:
          message.mirrorX = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 10:
          message.mirrorY = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.mirror = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 11:
          message.waypointDwell = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 12:
          message.touch = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 13:
          message.touchOffset = Vec2Value.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StepParams {
    return {
      foot: isSet(object.foot) ? legFromJSON(object.foot) : 0,
      offset: isSet(object.offset)
        ? Vec2Value.fromJSON(object.offset)
        : undefined,
      secondFoot: isSet(object.secondFoot) ? legFromJSON(object.secondFoot) : 0,
      swingWaypoint: isSet(object.swingWaypoint)
        ? Vec3Value.fromJSON(object.swingWaypoint)
        : undefined,
      swingHeight: isSet(object.swingHeight)
        ? Number(object.swingHeight)
        : undefined,
      liftoffVelocity: isSet(object.liftoffVelocity)
        ? Number(object.liftoffVelocity)
        : undefined,
      touchdownVelocity: isSet(object.touchdownVelocity)
        ? Number(object.touchdownVelocity)
        : undefined,
      mirrorX: isSet(object.mirrorX) ? Boolean(object.mirrorX) : undefined,
      mirrorY: isSet(object.mirrorY) ? Boolean(object.mirrorY) : undefined,
      mirror: isSet(object.mirror) ? Boolean(object.mirror) : undefined,
      waypointDwell: isSet(object.waypointDwell)
        ? Number(object.waypointDwell)
        : undefined,
      touch: isSet(object.touch) ? Boolean(object.touch) : undefined,
      touchOffset: isSet(object.touchOffset)
        ? Vec2Value.fromJSON(object.touchOffset)
        : undefined,
    };
  },

  toJSON(message: StepParams): unknown {
    const obj: any = {};
    message.foot !== undefined && (obj.foot = legToJSON(message.foot));
    message.offset !== undefined &&
      (obj.offset = message.offset
        ? Vec2Value.toJSON(message.offset)
        : undefined);
    message.secondFoot !== undefined &&
      (obj.secondFoot = legToJSON(message.secondFoot));
    message.swingWaypoint !== undefined &&
      (obj.swingWaypoint = message.swingWaypoint
        ? Vec3Value.toJSON(message.swingWaypoint)
        : undefined);
    message.swingHeight !== undefined &&
      (obj.swingHeight = message.swingHeight);
    message.liftoffVelocity !== undefined &&
      (obj.liftoffVelocity = message.liftoffVelocity);
    message.touchdownVelocity !== undefined &&
      (obj.touchdownVelocity = message.touchdownVelocity);
    message.mirrorX !== undefined && (obj.mirrorX = message.mirrorX);
    message.mirrorY !== undefined && (obj.mirrorY = message.mirrorY);
    message.mirror !== undefined && (obj.mirror = message.mirror);
    message.waypointDwell !== undefined &&
      (obj.waypointDwell = message.waypointDwell);
    message.touch !== undefined && (obj.touch = message.touch);
    message.touchOffset !== undefined &&
      (obj.touchOffset = message.touchOffset
        ? Vec2Value.toJSON(message.touchOffset)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StepParams>, I>>(
    object: I
  ): StepParams {
    const message = createBaseStepParams();
    message.foot = object.foot ?? 0;
    message.offset =
      object.offset !== undefined && object.offset !== null
        ? Vec2Value.fromPartial(object.offset)
        : undefined;
    message.secondFoot = object.secondFoot ?? 0;
    message.swingWaypoint =
      object.swingWaypoint !== undefined && object.swingWaypoint !== null
        ? Vec3Value.fromPartial(object.swingWaypoint)
        : undefined;
    message.swingHeight = object.swingHeight ?? undefined;
    message.liftoffVelocity = object.liftoffVelocity ?? undefined;
    message.touchdownVelocity = object.touchdownVelocity ?? undefined;
    message.mirrorX = object.mirrorX ?? undefined;
    message.mirrorY = object.mirrorY ?? undefined;
    message.mirror = object.mirror ?? undefined;
    message.waypointDwell = object.waypointDwell ?? undefined;
    message.touch = object.touch ?? undefined;
    message.touchOffset =
      object.touchOffset !== undefined && object.touchOffset !== null
        ? Vec2Value.fromPartial(object.touchOffset)
        : undefined;
    return message;
  },
};

function createBaseRotateBodyParams(): RotateBodyParams {
  return { rotation: undefined, returnToStartPose: undefined };
}

export const RotateBodyParams = {
  encode(
    message: RotateBodyParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.rotation !== undefined) {
      EulerZYXValue.encode(message.rotation, writer.uint32(10).fork()).ldelim();
    }
    if (message.returnToStartPose !== undefined) {
      BoolValue.encode(
        { value: message.returnToStartPose! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RotateBodyParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRotateBodyParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rotation = EulerZYXValue.decode(reader, reader.uint32());
          break;
        case 2:
          message.returnToStartPose = BoolValue.decode(
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

  fromJSON(object: any): RotateBodyParams {
    return {
      rotation: isSet(object.rotation)
        ? EulerZYXValue.fromJSON(object.rotation)
        : undefined,
      returnToStartPose: isSet(object.returnToStartPose)
        ? Boolean(object.returnToStartPose)
        : undefined,
    };
  },

  toJSON(message: RotateBodyParams): unknown {
    const obj: any = {};
    message.rotation !== undefined &&
      (obj.rotation = message.rotation
        ? EulerZYXValue.toJSON(message.rotation)
        : undefined);
    message.returnToStartPose !== undefined &&
      (obj.returnToStartPose = message.returnToStartPose);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RotateBodyParams>, I>>(
    object: I
  ): RotateBodyParams {
    const message = createBaseRotateBodyParams();
    message.rotation =
      object.rotation !== undefined && object.rotation !== null
        ? EulerZYXValue.fromPartial(object.rotation)
        : undefined;
    message.returnToStartPose = object.returnToStartPose ?? undefined;
    return message;
  },
};

function createBaseButtCircleParams(): ButtCircleParams {
  return {
    radius: undefined,
    beatsPerCircle: undefined,
    numberOfCircles: undefined,
    pivot: 0,
    clockwise: undefined,
    startingAngle: undefined,
  };
}

export const ButtCircleParams = {
  encode(
    message: ButtCircleParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.radius !== undefined) {
      DoubleValue.encode(
        { value: message.radius! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.beatsPerCircle !== undefined) {
      DoubleValue.encode(
        { value: message.beatsPerCircle! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.numberOfCircles !== undefined) {
      DoubleValue.encode(
        { value: message.numberOfCircles! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.pivot !== 0) {
      writer.uint32(32).int32(message.pivot);
    }
    if (message.clockwise !== undefined) {
      BoolValue.encode(
        { value: message.clockwise! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.startingAngle !== undefined) {
      DoubleValue.encode(
        { value: message.startingAngle! },
        writer.uint32(50).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ButtCircleParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseButtCircleParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.radius = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.beatsPerCircle = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 3:
          message.numberOfCircles = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 4:
          message.pivot = reader.int32() as any;
          break;
        case 5:
          message.clockwise = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 6:
          message.startingAngle = DoubleValue.decode(
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

  fromJSON(object: any): ButtCircleParams {
    return {
      radius: isSet(object.radius) ? Number(object.radius) : undefined,
      beatsPerCircle: isSet(object.beatsPerCircle)
        ? Number(object.beatsPerCircle)
        : undefined,
      numberOfCircles: isSet(object.numberOfCircles)
        ? Number(object.numberOfCircles)
        : undefined,
      pivot: isSet(object.pivot) ? pivotFromJSON(object.pivot) : 0,
      clockwise: isSet(object.clockwise)
        ? Boolean(object.clockwise)
        : undefined,
      startingAngle: isSet(object.startingAngle)
        ? Number(object.startingAngle)
        : undefined,
    };
  },

  toJSON(message: ButtCircleParams): unknown {
    const obj: any = {};
    message.radius !== undefined && (obj.radius = message.radius);
    message.beatsPerCircle !== undefined &&
      (obj.beatsPerCircle = message.beatsPerCircle);
    message.numberOfCircles !== undefined &&
      (obj.numberOfCircles = message.numberOfCircles);
    message.pivot !== undefined && (obj.pivot = pivotToJSON(message.pivot));
    message.clockwise !== undefined && (obj.clockwise = message.clockwise);
    message.startingAngle !== undefined &&
      (obj.startingAngle = message.startingAngle);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ButtCircleParams>, I>>(
    object: I
  ): ButtCircleParams {
    const message = createBaseButtCircleParams();
    message.radius = object.radius ?? undefined;
    message.beatsPerCircle = object.beatsPerCircle ?? undefined;
    message.numberOfCircles = object.numberOfCircles ?? undefined;
    message.pivot = object.pivot ?? 0;
    message.clockwise = object.clockwise ?? undefined;
    message.startingAngle = object.startingAngle ?? undefined;
    return message;
  },
};

function createBaseTwerkParams(): TwerkParams {
  return { height: undefined };
}

export const TwerkParams = {
  encode(
    message: TwerkParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.height !== undefined) {
      DoubleValue.encode(
        { value: message.height! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TwerkParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTwerkParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TwerkParams {
    return {
      height: isSet(object.height) ? Number(object.height) : undefined,
    };
  },

  toJSON(message: TwerkParams): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = message.height);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TwerkParams>, I>>(
    object: I
  ): TwerkParams {
    const message = createBaseTwerkParams();
    message.height = object.height ?? undefined;
    return message;
  },
};

function createBaseTurnParams(): TurnParams {
  return {
    yaw: undefined,
    absoluteYaw: undefined,
    yawIsAbsolute: undefined,
    swingHeight: undefined,
    swingVelocity: undefined,
    motion: undefined,
    absoluteMotion: undefined,
    motionIsAbsolute: undefined,
    absolute: undefined,
  };
}

export const TurnParams = {
  encode(
    message: TurnParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.yaw !== undefined) {
      DoubleValue.encode(
        { value: message.yaw! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.absoluteYaw !== undefined) {
      DoubleValue.encode(
        { value: message.absoluteYaw! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.yawIsAbsolute !== undefined) {
      BoolValue.encode(
        { value: message.yawIsAbsolute! },
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.swingHeight !== undefined) {
      DoubleValue.encode(
        { value: message.swingHeight! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.swingVelocity !== undefined) {
      DoubleValue.encode(
        { value: message.swingVelocity! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.motion !== undefined) {
      Vec2Value.encode(message.motion, writer.uint32(58).fork()).ldelim();
    }
    if (message.absoluteMotion !== undefined) {
      Vec2Value.encode(
        message.absoluteMotion,
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.motionIsAbsolute !== undefined) {
      BoolValue.encode(
        { value: message.motionIsAbsolute! },
        writer.uint32(74).fork()
      ).ldelim();
    }
    if (message.absolute !== undefined) {
      BoolValue.encode(
        { value: message.absolute! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TurnParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTurnParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.yaw = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 5:
          message.absoluteYaw = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 6:
          message.yawIsAbsolute = BoolValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 3:
          message.swingHeight = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 4:
          message.swingVelocity = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 7:
          message.motion = Vec2Value.decode(reader, reader.uint32());
          break;
        case 8:
          message.absoluteMotion = Vec2Value.decode(reader, reader.uint32());
          break;
        case 9:
          message.motionIsAbsolute = BoolValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 2:
          message.absolute = BoolValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TurnParams {
    return {
      yaw: isSet(object.yaw) ? Number(object.yaw) : undefined,
      absoluteYaw: isSet(object.absoluteYaw)
        ? Number(object.absoluteYaw)
        : undefined,
      yawIsAbsolute: isSet(object.yawIsAbsolute)
        ? Boolean(object.yawIsAbsolute)
        : undefined,
      swingHeight: isSet(object.swingHeight)
        ? Number(object.swingHeight)
        : undefined,
      swingVelocity: isSet(object.swingVelocity)
        ? Number(object.swingVelocity)
        : undefined,
      motion: isSet(object.motion)
        ? Vec2Value.fromJSON(object.motion)
        : undefined,
      absoluteMotion: isSet(object.absoluteMotion)
        ? Vec2Value.fromJSON(object.absoluteMotion)
        : undefined,
      motionIsAbsolute: isSet(object.motionIsAbsolute)
        ? Boolean(object.motionIsAbsolute)
        : undefined,
      absolute: isSet(object.absolute) ? Boolean(object.absolute) : undefined,
    };
  },

  toJSON(message: TurnParams): unknown {
    const obj: any = {};
    message.yaw !== undefined && (obj.yaw = message.yaw);
    message.absoluteYaw !== undefined &&
      (obj.absoluteYaw = message.absoluteYaw);
    message.yawIsAbsolute !== undefined &&
      (obj.yawIsAbsolute = message.yawIsAbsolute);
    message.swingHeight !== undefined &&
      (obj.swingHeight = message.swingHeight);
    message.swingVelocity !== undefined &&
      (obj.swingVelocity = message.swingVelocity);
    message.motion !== undefined &&
      (obj.motion = message.motion
        ? Vec2Value.toJSON(message.motion)
        : undefined);
    message.absoluteMotion !== undefined &&
      (obj.absoluteMotion = message.absoluteMotion
        ? Vec2Value.toJSON(message.absoluteMotion)
        : undefined);
    message.motionIsAbsolute !== undefined &&
      (obj.motionIsAbsolute = message.motionIsAbsolute);
    message.absolute !== undefined && (obj.absolute = message.absolute);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TurnParams>, I>>(
    object: I
  ): TurnParams {
    const message = createBaseTurnParams();
    message.yaw = object.yaw ?? undefined;
    message.absoluteYaw = object.absoluteYaw ?? undefined;
    message.yawIsAbsolute = object.yawIsAbsolute ?? undefined;
    message.swingHeight = object.swingHeight ?? undefined;
    message.swingVelocity = object.swingVelocity ?? undefined;
    message.motion =
      object.motion !== undefined && object.motion !== null
        ? Vec2Value.fromPartial(object.motion)
        : undefined;
    message.absoluteMotion =
      object.absoluteMotion !== undefined && object.absoluteMotion !== null
        ? Vec2Value.fromPartial(object.absoluteMotion)
        : undefined;
    message.motionIsAbsolute = object.motionIsAbsolute ?? undefined;
    message.absolute = object.absolute ?? undefined;
    return message;
  },
};

function createBasePace2StepParams(): Pace2StepParams {
  return {
    motion: undefined,
    absoluteMotion: undefined,
    motionIsAbsolute: undefined,
    swingHeight: undefined,
    swingVelocity: undefined,
    yaw: undefined,
    absoluteYaw: undefined,
    yawIsAbsolute: undefined,
    absolute: undefined,
  };
}

export const Pace2StepParams = {
  encode(
    message: Pace2StepParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.motion !== undefined) {
      Vec2Value.encode(message.motion, writer.uint32(10).fork()).ldelim();
    }
    if (message.absoluteMotion !== undefined) {
      Vec2Value.encode(
        message.absoluteMotion,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.motionIsAbsolute !== undefined) {
      BoolValue.encode(
        { value: message.motionIsAbsolute! },
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.swingHeight !== undefined) {
      DoubleValue.encode(
        { value: message.swingHeight! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.swingVelocity !== undefined) {
      DoubleValue.encode(
        { value: message.swingVelocity! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.yaw !== undefined) {
      DoubleValue.encode(
        { value: message.yaw! },
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.absoluteYaw !== undefined) {
      DoubleValue.encode(
        { value: message.absoluteYaw! },
        writer.uint32(74).fork()
      ).ldelim();
    }
    if (message.yawIsAbsolute !== undefined) {
      BoolValue.encode(
        { value: message.yawIsAbsolute! },
        writer.uint32(82).fork()
      ).ldelim();
    }
    if (message.absolute !== undefined) {
      BoolValue.encode(
        { value: message.absolute! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Pace2StepParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePace2StepParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.motion = Vec2Value.decode(reader, reader.uint32());
          break;
        case 6:
          message.absoluteMotion = Vec2Value.decode(reader, reader.uint32());
          break;
        case 7:
          message.motionIsAbsolute = BoolValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 3:
          message.swingHeight = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 4:
          message.swingVelocity = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 8:
          message.yaw = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 9:
          message.absoluteYaw = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 10:
          message.yawIsAbsolute = BoolValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 5:
          message.absolute = BoolValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Pace2StepParams {
    return {
      motion: isSet(object.motion)
        ? Vec2Value.fromJSON(object.motion)
        : undefined,
      absoluteMotion: isSet(object.absoluteMotion)
        ? Vec2Value.fromJSON(object.absoluteMotion)
        : undefined,
      motionIsAbsolute: isSet(object.motionIsAbsolute)
        ? Boolean(object.motionIsAbsolute)
        : undefined,
      swingHeight: isSet(object.swingHeight)
        ? Number(object.swingHeight)
        : undefined,
      swingVelocity: isSet(object.swingVelocity)
        ? Number(object.swingVelocity)
        : undefined,
      yaw: isSet(object.yaw) ? Number(object.yaw) : undefined,
      absoluteYaw: isSet(object.absoluteYaw)
        ? Number(object.absoluteYaw)
        : undefined,
      yawIsAbsolute: isSet(object.yawIsAbsolute)
        ? Boolean(object.yawIsAbsolute)
        : undefined,
      absolute: isSet(object.absolute) ? Boolean(object.absolute) : undefined,
    };
  },

  toJSON(message: Pace2StepParams): unknown {
    const obj: any = {};
    message.motion !== undefined &&
      (obj.motion = message.motion
        ? Vec2Value.toJSON(message.motion)
        : undefined);
    message.absoluteMotion !== undefined &&
      (obj.absoluteMotion = message.absoluteMotion
        ? Vec2Value.toJSON(message.absoluteMotion)
        : undefined);
    message.motionIsAbsolute !== undefined &&
      (obj.motionIsAbsolute = message.motionIsAbsolute);
    message.swingHeight !== undefined &&
      (obj.swingHeight = message.swingHeight);
    message.swingVelocity !== undefined &&
      (obj.swingVelocity = message.swingVelocity);
    message.yaw !== undefined && (obj.yaw = message.yaw);
    message.absoluteYaw !== undefined &&
      (obj.absoluteYaw = message.absoluteYaw);
    message.yawIsAbsolute !== undefined &&
      (obj.yawIsAbsolute = message.yawIsAbsolute);
    message.absolute !== undefined && (obj.absolute = message.absolute);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Pace2StepParams>, I>>(
    object: I
  ): Pace2StepParams {
    const message = createBasePace2StepParams();
    message.motion =
      object.motion !== undefined && object.motion !== null
        ? Vec2Value.fromPartial(object.motion)
        : undefined;
    message.absoluteMotion =
      object.absoluteMotion !== undefined && object.absoluteMotion !== null
        ? Vec2Value.fromPartial(object.absoluteMotion)
        : undefined;
    message.motionIsAbsolute = object.motionIsAbsolute ?? undefined;
    message.swingHeight = object.swingHeight ?? undefined;
    message.swingVelocity = object.swingVelocity ?? undefined;
    message.yaw = object.yaw ?? undefined;
    message.absoluteYaw = object.absoluteYaw ?? undefined;
    message.yawIsAbsolute = object.yawIsAbsolute ?? undefined;
    message.absolute = object.absolute ?? undefined;
    return message;
  },
};

function createBaseChickenHeadParams(): ChickenHeadParams {
  return {
    bobMagnitude: undefined,
    beatsPerCycle: undefined,
    follow: undefined,
  };
}

export const ChickenHeadParams = {
  encode(
    message: ChickenHeadParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.bobMagnitude !== undefined) {
      Vec3Value.encode(message.bobMagnitude, writer.uint32(10).fork()).ldelim();
    }
    if (message.beatsPerCycle !== undefined) {
      Int32Value.encode(
        { value: message.beatsPerCycle! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.follow !== undefined) {
      BoolValue.encode(
        { value: message.follow! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChickenHeadParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChickenHeadParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bobMagnitude = Vec3Value.decode(reader, reader.uint32());
          break;
        case 2:
          message.beatsPerCycle = Int32Value.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 3:
          message.follow = BoolValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChickenHeadParams {
    return {
      bobMagnitude: isSet(object.bobMagnitude)
        ? Vec3Value.fromJSON(object.bobMagnitude)
        : undefined,
      beatsPerCycle: isSet(object.beatsPerCycle)
        ? Number(object.beatsPerCycle)
        : undefined,
      follow: isSet(object.follow) ? Boolean(object.follow) : undefined,
    };
  },

  toJSON(message: ChickenHeadParams): unknown {
    const obj: any = {};
    message.bobMagnitude !== undefined &&
      (obj.bobMagnitude = message.bobMagnitude
        ? Vec3Value.toJSON(message.bobMagnitude)
        : undefined);
    message.beatsPerCycle !== undefined &&
      (obj.beatsPerCycle = message.beatsPerCycle);
    message.follow !== undefined && (obj.follow = message.follow);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ChickenHeadParams>, I>>(
    object: I
  ): ChickenHeadParams {
    const message = createBaseChickenHeadParams();
    message.bobMagnitude =
      object.bobMagnitude !== undefined && object.bobMagnitude !== null
        ? Vec3Value.fromPartial(object.bobMagnitude)
        : undefined;
    message.beatsPerCycle = object.beatsPerCycle ?? undefined;
    message.follow = object.follow ?? undefined;
    return message;
  },
};

function createBaseClapParams(): ClapParams {
  return {
    direction: undefined,
    location: undefined,
    speed: undefined,
    clapDistance: undefined,
  };
}

export const ClapParams = {
  encode(
    message: ClapParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.direction !== undefined) {
      Vec3Value.encode(message.direction, writer.uint32(10).fork()).ldelim();
    }
    if (message.location !== undefined) {
      Vec3Value.encode(message.location, writer.uint32(18).fork()).ldelim();
    }
    if (message.speed !== undefined) {
      DoubleValue.encode(
        { value: message.speed! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.clapDistance !== undefined) {
      DoubleValue.encode(
        { value: message.clapDistance! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClapParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClapParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.direction = Vec3Value.decode(reader, reader.uint32());
          break;
        case 2:
          message.location = Vec3Value.decode(reader, reader.uint32());
          break;
        case 3:
          message.speed = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.clapDistance = DoubleValue.decode(
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

  fromJSON(object: any): ClapParams {
    return {
      direction: isSet(object.direction)
        ? Vec3Value.fromJSON(object.direction)
        : undefined,
      location: isSet(object.location)
        ? Vec3Value.fromJSON(object.location)
        : undefined,
      speed: isSet(object.speed) ? Number(object.speed) : undefined,
      clapDistance: isSet(object.clapDistance)
        ? Number(object.clapDistance)
        : undefined,
    };
  },

  toJSON(message: ClapParams): unknown {
    const obj: any = {};
    message.direction !== undefined &&
      (obj.direction = message.direction
        ? Vec3Value.toJSON(message.direction)
        : undefined);
    message.location !== undefined &&
      (obj.location = message.location
        ? Vec3Value.toJSON(message.location)
        : undefined);
    message.speed !== undefined && (obj.speed = message.speed);
    message.clapDistance !== undefined &&
      (obj.clapDistance = message.clapDistance);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ClapParams>, I>>(
    object: I
  ): ClapParams {
    const message = createBaseClapParams();
    message.direction =
      object.direction !== undefined && object.direction !== null
        ? Vec3Value.fromPartial(object.direction)
        : undefined;
    message.location =
      object.location !== undefined && object.location !== null
        ? Vec3Value.fromPartial(object.location)
        : undefined;
    message.speed = object.speed ?? undefined;
    message.clapDistance = object.clapDistance ?? undefined;
    return message;
  },
};

function createBaseKneelCircleParams(): KneelCircleParams {
  return {
    location: undefined,
    beatsPerCircle: undefined,
    numberOfCircles: undefined,
    offset: undefined,
    radius: undefined,
    reverse: undefined,
  };
}

export const KneelCircleParams = {
  encode(
    message: KneelCircleParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.location !== undefined) {
      Vec3Value.encode(message.location, writer.uint32(10).fork()).ldelim();
    }
    if (message.beatsPerCircle !== undefined) {
      Int32Value.encode(
        { value: message.beatsPerCircle! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.numberOfCircles !== undefined) {
      DoubleValue.encode(
        { value: message.numberOfCircles! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.offset !== undefined) {
      DoubleValue.encode(
        { value: message.offset! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.radius !== undefined) {
      DoubleValue.encode(
        { value: message.radius! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.reverse !== undefined) {
      BoolValue.encode(
        { value: message.reverse! },
        writer.uint32(50).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KneelCircleParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKneelCircleParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.location = Vec3Value.decode(reader, reader.uint32());
          break;
        case 2:
          message.beatsPerCircle = Int32Value.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 3:
          message.numberOfCircles = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 4:
          message.offset = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 5:
          message.radius = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 6:
          message.reverse = BoolValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): KneelCircleParams {
    return {
      location: isSet(object.location)
        ? Vec3Value.fromJSON(object.location)
        : undefined,
      beatsPerCircle: isSet(object.beatsPerCircle)
        ? Number(object.beatsPerCircle)
        : undefined,
      numberOfCircles: isSet(object.numberOfCircles)
        ? Number(object.numberOfCircles)
        : undefined,
      offset: isSet(object.offset) ? Number(object.offset) : undefined,
      radius: isSet(object.radius) ? Number(object.radius) : undefined,
      reverse: isSet(object.reverse) ? Boolean(object.reverse) : undefined,
    };
  },

  toJSON(message: KneelCircleParams): unknown {
    const obj: any = {};
    message.location !== undefined &&
      (obj.location = message.location
        ? Vec3Value.toJSON(message.location)
        : undefined);
    message.beatsPerCircle !== undefined &&
      (obj.beatsPerCircle = message.beatsPerCircle);
    message.numberOfCircles !== undefined &&
      (obj.numberOfCircles = message.numberOfCircles);
    message.offset !== undefined && (obj.offset = message.offset);
    message.radius !== undefined && (obj.radius = message.radius);
    message.reverse !== undefined && (obj.reverse = message.reverse);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<KneelCircleParams>, I>>(
    object: I
  ): KneelCircleParams {
    const message = createBaseKneelCircleParams();
    message.location =
      object.location !== undefined && object.location !== null
        ? Vec3Value.fromPartial(object.location)
        : undefined;
    message.beatsPerCircle = object.beatsPerCircle ?? undefined;
    message.numberOfCircles = object.numberOfCircles ?? undefined;
    message.offset = object.offset ?? undefined;
    message.radius = object.radius ?? undefined;
    message.reverse = object.reverse ?? undefined;
    return message;
  },
};

function createBaseFrontUpParams(): FrontUpParams {
  return { mirror: undefined };
}

export const FrontUpParams = {
  encode(
    message: FrontUpParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.mirror !== undefined) {
      BoolValue.encode(
        { value: message.mirror! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FrontUpParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFrontUpParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.mirror = BoolValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FrontUpParams {
    return {
      mirror: isSet(object.mirror) ? Boolean(object.mirror) : undefined,
    };
  },

  toJSON(message: FrontUpParams): unknown {
    const obj: any = {};
    message.mirror !== undefined && (obj.mirror = message.mirror);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FrontUpParams>, I>>(
    object: I
  ): FrontUpParams {
    const message = createBaseFrontUpParams();
    message.mirror = object.mirror ?? undefined;
    return message;
  },
};

function createBaseFidgetStandParams(): FidgetStandParams {
  return {
    preset: 0,
    minGazePitch: undefined,
    maxGazePitch: undefined,
    gazeMeanPeriod: undefined,
    gazeCenterCfp: undefined,
    shiftMeanPeriod: undefined,
    shiftMaxTransitionTime: undefined,
    breathMinZ: undefined,
    breathMaxZ: undefined,
    breathMaxPeriod: undefined,
    legGestureMeanPeriod: undefined,
    gazeSlewRate: undefined,
    gazePositionGenerationGain: undefined,
    gazeRollGenerationGain: undefined,
  };
}

export const FidgetStandParams = {
  encode(
    message: FidgetStandParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.preset !== 0) {
      writer.uint32(8).int32(message.preset);
    }
    if (message.minGazePitch !== undefined) {
      DoubleValue.encode(
        { value: message.minGazePitch! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.maxGazePitch !== undefined) {
      DoubleValue.encode(
        { value: message.maxGazePitch! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.gazeMeanPeriod !== undefined) {
      DoubleValue.encode(
        { value: message.gazeMeanPeriod! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.gazeCenterCfp !== undefined) {
      Vec3Value.encode(
        message.gazeCenterCfp,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.shiftMeanPeriod !== undefined) {
      DoubleValue.encode(
        { value: message.shiftMeanPeriod! },
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.shiftMaxTransitionTime !== undefined) {
      DoubleValue.encode(
        { value: message.shiftMaxTransitionTime! },
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.breathMinZ !== undefined) {
      DoubleValue.encode(
        { value: message.breathMinZ! },
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.breathMaxZ !== undefined) {
      DoubleValue.encode(
        { value: message.breathMaxZ! },
        writer.uint32(74).fork()
      ).ldelim();
    }
    if (message.breathMaxPeriod !== undefined) {
      DoubleValue.encode(
        { value: message.breathMaxPeriod! },
        writer.uint32(82).fork()
      ).ldelim();
    }
    if (message.legGestureMeanPeriod !== undefined) {
      DoubleValue.encode(
        { value: message.legGestureMeanPeriod! },
        writer.uint32(90).fork()
      ).ldelim();
    }
    if (message.gazeSlewRate !== undefined) {
      DoubleValue.encode(
        { value: message.gazeSlewRate! },
        writer.uint32(98).fork()
      ).ldelim();
    }
    if (message.gazePositionGenerationGain !== undefined) {
      Vec3Value.encode(
        message.gazePositionGenerationGain,
        writer.uint32(106).fork()
      ).ldelim();
    }
    if (message.gazeRollGenerationGain !== undefined) {
      DoubleValue.encode(
        { value: message.gazeRollGenerationGain! },
        writer.uint32(114).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FidgetStandParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFidgetStandParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.preset = reader.int32() as any;
          break;
        case 2:
          message.minGazePitch = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 3:
          message.maxGazePitch = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 4:
          message.gazeMeanPeriod = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 5:
          message.gazeCenterCfp = Vec3Value.decode(reader, reader.uint32());
          break;
        case 6:
          message.shiftMeanPeriod = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 7:
          message.shiftMaxTransitionTime = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 8:
          message.breathMinZ = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 9:
          message.breathMaxZ = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 10:
          message.breathMaxPeriod = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 11:
          message.legGestureMeanPeriod = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 12:
          message.gazeSlewRate = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 13:
          message.gazePositionGenerationGain = Vec3Value.decode(
            reader,
            reader.uint32()
          );
          break;
        case 14:
          message.gazeRollGenerationGain = DoubleValue.decode(
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

  fromJSON(object: any): FidgetStandParams {
    return {
      preset: isSet(object.preset)
        ? fidgetStandParams_FidgetPresetFromJSON(object.preset)
        : 0,
      minGazePitch: isSet(object.minGazePitch)
        ? Number(object.minGazePitch)
        : undefined,
      maxGazePitch: isSet(object.maxGazePitch)
        ? Number(object.maxGazePitch)
        : undefined,
      gazeMeanPeriod: isSet(object.gazeMeanPeriod)
        ? Number(object.gazeMeanPeriod)
        : undefined,
      gazeCenterCfp: isSet(object.gazeCenterCfp)
        ? Vec3Value.fromJSON(object.gazeCenterCfp)
        : undefined,
      shiftMeanPeriod: isSet(object.shiftMeanPeriod)
        ? Number(object.shiftMeanPeriod)
        : undefined,
      shiftMaxTransitionTime: isSet(object.shiftMaxTransitionTime)
        ? Number(object.shiftMaxTransitionTime)
        : undefined,
      breathMinZ: isSet(object.breathMinZ)
        ? Number(object.breathMinZ)
        : undefined,
      breathMaxZ: isSet(object.breathMaxZ)
        ? Number(object.breathMaxZ)
        : undefined,
      breathMaxPeriod: isSet(object.breathMaxPeriod)
        ? Number(object.breathMaxPeriod)
        : undefined,
      legGestureMeanPeriod: isSet(object.legGestureMeanPeriod)
        ? Number(object.legGestureMeanPeriod)
        : undefined,
      gazeSlewRate: isSet(object.gazeSlewRate)
        ? Number(object.gazeSlewRate)
        : undefined,
      gazePositionGenerationGain: isSet(object.gazePositionGenerationGain)
        ? Vec3Value.fromJSON(object.gazePositionGenerationGain)
        : undefined,
      gazeRollGenerationGain: isSet(object.gazeRollGenerationGain)
        ? Number(object.gazeRollGenerationGain)
        : undefined,
    };
  },

  toJSON(message: FidgetStandParams): unknown {
    const obj: any = {};
    message.preset !== undefined &&
      (obj.preset = fidgetStandParams_FidgetPresetToJSON(message.preset));
    message.minGazePitch !== undefined &&
      (obj.minGazePitch = message.minGazePitch);
    message.maxGazePitch !== undefined &&
      (obj.maxGazePitch = message.maxGazePitch);
    message.gazeMeanPeriod !== undefined &&
      (obj.gazeMeanPeriod = message.gazeMeanPeriod);
    message.gazeCenterCfp !== undefined &&
      (obj.gazeCenterCfp = message.gazeCenterCfp
        ? Vec3Value.toJSON(message.gazeCenterCfp)
        : undefined);
    message.shiftMeanPeriod !== undefined &&
      (obj.shiftMeanPeriod = message.shiftMeanPeriod);
    message.shiftMaxTransitionTime !== undefined &&
      (obj.shiftMaxTransitionTime = message.shiftMaxTransitionTime);
    message.breathMinZ !== undefined && (obj.breathMinZ = message.breathMinZ);
    message.breathMaxZ !== undefined && (obj.breathMaxZ = message.breathMaxZ);
    message.breathMaxPeriod !== undefined &&
      (obj.breathMaxPeriod = message.breathMaxPeriod);
    message.legGestureMeanPeriod !== undefined &&
      (obj.legGestureMeanPeriod = message.legGestureMeanPeriod);
    message.gazeSlewRate !== undefined &&
      (obj.gazeSlewRate = message.gazeSlewRate);
    message.gazePositionGenerationGain !== undefined &&
      (obj.gazePositionGenerationGain = message.gazePositionGenerationGain
        ? Vec3Value.toJSON(message.gazePositionGenerationGain)
        : undefined);
    message.gazeRollGenerationGain !== undefined &&
      (obj.gazeRollGenerationGain = message.gazeRollGenerationGain);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FidgetStandParams>, I>>(
    object: I
  ): FidgetStandParams {
    const message = createBaseFidgetStandParams();
    message.preset = object.preset ?? 0;
    message.minGazePitch = object.minGazePitch ?? undefined;
    message.maxGazePitch = object.maxGazePitch ?? undefined;
    message.gazeMeanPeriod = object.gazeMeanPeriod ?? undefined;
    message.gazeCenterCfp =
      object.gazeCenterCfp !== undefined && object.gazeCenterCfp !== null
        ? Vec3Value.fromPartial(object.gazeCenterCfp)
        : undefined;
    message.shiftMeanPeriod = object.shiftMeanPeriod ?? undefined;
    message.shiftMaxTransitionTime = object.shiftMaxTransitionTime ?? undefined;
    message.breathMinZ = object.breathMinZ ?? undefined;
    message.breathMaxZ = object.breathMaxZ ?? undefined;
    message.breathMaxPeriod = object.breathMaxPeriod ?? undefined;
    message.legGestureMeanPeriod = object.legGestureMeanPeriod ?? undefined;
    message.gazeSlewRate = object.gazeSlewRate ?? undefined;
    message.gazePositionGenerationGain =
      object.gazePositionGenerationGain !== undefined &&
      object.gazePositionGenerationGain !== null
        ? Vec3Value.fromPartial(object.gazePositionGenerationGain)
        : undefined;
    message.gazeRollGenerationGain = object.gazeRollGenerationGain ?? undefined;
    return message;
  },
};

function createBaseFrameSnapshotParams(): FrameSnapshotParams {
  return {
    frameId: undefined,
    fiducialNumber: undefined,
    includeFrontLeftLeg: 0,
    includeFrontRightLeg: 0,
    includeHindLeftLeg: 0,
    includeHindRightLeg: 0,
    compensated: undefined,
  };
}

export const FrameSnapshotParams = {
  encode(
    message: FrameSnapshotParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.frameId !== undefined) {
      Int32Value.encode(
        { value: message.frameId! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.fiducialNumber !== undefined) {
      Int32Value.encode(
        { value: message.fiducialNumber! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.includeFrontLeftLeg !== 0) {
      writer.uint32(24).int32(message.includeFrontLeftLeg);
    }
    if (message.includeFrontRightLeg !== 0) {
      writer.uint32(32).int32(message.includeFrontRightLeg);
    }
    if (message.includeHindLeftLeg !== 0) {
      writer.uint32(40).int32(message.includeHindLeftLeg);
    }
    if (message.includeHindRightLeg !== 0) {
      writer.uint32(48).int32(message.includeHindRightLeg);
    }
    if (message.compensated !== undefined) {
      BoolValue.encode(
        { value: message.compensated! },
        writer.uint32(58).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FrameSnapshotParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFrameSnapshotParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.frameId = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.fiducialNumber = Int32Value.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 3:
          message.includeFrontLeftLeg = reader.int32() as any;
          break;
        case 4:
          message.includeFrontRightLeg = reader.int32() as any;
          break;
        case 5:
          message.includeHindLeftLeg = reader.int32() as any;
          break;
        case 6:
          message.includeHindRightLeg = reader.int32() as any;
          break;
        case 7:
          message.compensated = BoolValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FrameSnapshotParams {
    return {
      frameId: isSet(object.frameId) ? Number(object.frameId) : undefined,
      fiducialNumber: isSet(object.fiducialNumber)
        ? Number(object.fiducialNumber)
        : undefined,
      includeFrontLeftLeg: isSet(object.includeFrontLeftLeg)
        ? frameSnapshotParams_InclusionFromJSON(object.includeFrontLeftLeg)
        : 0,
      includeFrontRightLeg: isSet(object.includeFrontRightLeg)
        ? frameSnapshotParams_InclusionFromJSON(object.includeFrontRightLeg)
        : 0,
      includeHindLeftLeg: isSet(object.includeHindLeftLeg)
        ? frameSnapshotParams_InclusionFromJSON(object.includeHindLeftLeg)
        : 0,
      includeHindRightLeg: isSet(object.includeHindRightLeg)
        ? frameSnapshotParams_InclusionFromJSON(object.includeHindRightLeg)
        : 0,
      compensated: isSet(object.compensated)
        ? Boolean(object.compensated)
        : undefined,
    };
  },

  toJSON(message: FrameSnapshotParams): unknown {
    const obj: any = {};
    message.frameId !== undefined && (obj.frameId = message.frameId);
    message.fiducialNumber !== undefined &&
      (obj.fiducialNumber = message.fiducialNumber);
    message.includeFrontLeftLeg !== undefined &&
      (obj.includeFrontLeftLeg = frameSnapshotParams_InclusionToJSON(
        message.includeFrontLeftLeg
      ));
    message.includeFrontRightLeg !== undefined &&
      (obj.includeFrontRightLeg = frameSnapshotParams_InclusionToJSON(
        message.includeFrontRightLeg
      ));
    message.includeHindLeftLeg !== undefined &&
      (obj.includeHindLeftLeg = frameSnapshotParams_InclusionToJSON(
        message.includeHindLeftLeg
      ));
    message.includeHindRightLeg !== undefined &&
      (obj.includeHindRightLeg = frameSnapshotParams_InclusionToJSON(
        message.includeHindRightLeg
      ));
    message.compensated !== undefined &&
      (obj.compensated = message.compensated);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FrameSnapshotParams>, I>>(
    object: I
  ): FrameSnapshotParams {
    const message = createBaseFrameSnapshotParams();
    message.frameId = object.frameId ?? undefined;
    message.fiducialNumber = object.fiducialNumber ?? undefined;
    message.includeFrontLeftLeg = object.includeFrontLeftLeg ?? 0;
    message.includeFrontRightLeg = object.includeFrontRightLeg ?? 0;
    message.includeHindLeftLeg = object.includeHindLeftLeg ?? 0;
    message.includeHindRightLeg = object.includeHindRightLeg ?? 0;
    message.compensated = object.compensated ?? undefined;
    return message;
  },
};

function createBaseSetColorParams(): SetColorParams {
  return {
    leftColor: undefined,
    rightSameAsLeft: undefined,
    rightColor: undefined,
    fadeInSlices: undefined,
    fadeOutSlices: undefined,
  };
}

export const SetColorParams = {
  encode(
    message: SetColorParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.leftColor !== undefined) {
      Color.encode(message.leftColor, writer.uint32(10).fork()).ldelim();
    }
    if (message.rightSameAsLeft !== undefined) {
      BoolValue.encode(
        { value: message.rightSameAsLeft! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.rightColor !== undefined) {
      Color.encode(message.rightColor, writer.uint32(26).fork()).ldelim();
    }
    if (message.fadeInSlices !== undefined) {
      DoubleValue.encode(
        { value: message.fadeInSlices! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.fadeOutSlices !== undefined) {
      DoubleValue.encode(
        { value: message.fadeOutSlices! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetColorParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetColorParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.leftColor = Color.decode(reader, reader.uint32());
          break;
        case 2:
          message.rightSameAsLeft = BoolValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 3:
          message.rightColor = Color.decode(reader, reader.uint32());
          break;
        case 4:
          message.fadeInSlices = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 5:
          message.fadeOutSlices = DoubleValue.decode(
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

  fromJSON(object: any): SetColorParams {
    return {
      leftColor: isSet(object.leftColor)
        ? Color.fromJSON(object.leftColor)
        : undefined,
      rightSameAsLeft: isSet(object.rightSameAsLeft)
        ? Boolean(object.rightSameAsLeft)
        : undefined,
      rightColor: isSet(object.rightColor)
        ? Color.fromJSON(object.rightColor)
        : undefined,
      fadeInSlices: isSet(object.fadeInSlices)
        ? Number(object.fadeInSlices)
        : undefined,
      fadeOutSlices: isSet(object.fadeOutSlices)
        ? Number(object.fadeOutSlices)
        : undefined,
    };
  },

  toJSON(message: SetColorParams): unknown {
    const obj: any = {};
    message.leftColor !== undefined &&
      (obj.leftColor = message.leftColor
        ? Color.toJSON(message.leftColor)
        : undefined);
    message.rightSameAsLeft !== undefined &&
      (obj.rightSameAsLeft = message.rightSameAsLeft);
    message.rightColor !== undefined &&
      (obj.rightColor = message.rightColor
        ? Color.toJSON(message.rightColor)
        : undefined);
    message.fadeInSlices !== undefined &&
      (obj.fadeInSlices = message.fadeInSlices);
    message.fadeOutSlices !== undefined &&
      (obj.fadeOutSlices = message.fadeOutSlices);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetColorParams>, I>>(
    object: I
  ): SetColorParams {
    const message = createBaseSetColorParams();
    message.leftColor =
      object.leftColor !== undefined && object.leftColor !== null
        ? Color.fromPartial(object.leftColor)
        : undefined;
    message.rightSameAsLeft = object.rightSameAsLeft ?? undefined;
    message.rightColor =
      object.rightColor !== undefined && object.rightColor !== null
        ? Color.fromPartial(object.rightColor)
        : undefined;
    message.fadeInSlices = object.fadeInSlices ?? undefined;
    message.fadeOutSlices = object.fadeOutSlices ?? undefined;
    return message;
  },
};

function createBaseFadeColorParams(): FadeColorParams {
  return {
    topColor: undefined,
    bottomColor: undefined,
    fadeInSlices: undefined,
    fadeOutSlices: undefined,
  };
}

export const FadeColorParams = {
  encode(
    message: FadeColorParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.topColor !== undefined) {
      Color.encode(message.topColor, writer.uint32(10).fork()).ldelim();
    }
    if (message.bottomColor !== undefined) {
      Color.encode(message.bottomColor, writer.uint32(18).fork()).ldelim();
    }
    if (message.fadeInSlices !== undefined) {
      DoubleValue.encode(
        { value: message.fadeInSlices! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.fadeOutSlices !== undefined) {
      DoubleValue.encode(
        { value: message.fadeOutSlices! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FadeColorParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFadeColorParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.topColor = Color.decode(reader, reader.uint32());
          break;
        case 2:
          message.bottomColor = Color.decode(reader, reader.uint32());
          break;
        case 3:
          message.fadeInSlices = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 4:
          message.fadeOutSlices = DoubleValue.decode(
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

  fromJSON(object: any): FadeColorParams {
    return {
      topColor: isSet(object.topColor)
        ? Color.fromJSON(object.topColor)
        : undefined,
      bottomColor: isSet(object.bottomColor)
        ? Color.fromJSON(object.bottomColor)
        : undefined,
      fadeInSlices: isSet(object.fadeInSlices)
        ? Number(object.fadeInSlices)
        : undefined,
      fadeOutSlices: isSet(object.fadeOutSlices)
        ? Number(object.fadeOutSlices)
        : undefined,
    };
  },

  toJSON(message: FadeColorParams): unknown {
    const obj: any = {};
    message.topColor !== undefined &&
      (obj.topColor = message.topColor
        ? Color.toJSON(message.topColor)
        : undefined);
    message.bottomColor !== undefined &&
      (obj.bottomColor = message.bottomColor
        ? Color.toJSON(message.bottomColor)
        : undefined);
    message.fadeInSlices !== undefined &&
      (obj.fadeInSlices = message.fadeInSlices);
    message.fadeOutSlices !== undefined &&
      (obj.fadeOutSlices = message.fadeOutSlices);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FadeColorParams>, I>>(
    object: I
  ): FadeColorParams {
    const message = createBaseFadeColorParams();
    message.topColor =
      object.topColor !== undefined && object.topColor !== null
        ? Color.fromPartial(object.topColor)
        : undefined;
    message.bottomColor =
      object.bottomColor !== undefined && object.bottomColor !== null
        ? Color.fromPartial(object.bottomColor)
        : undefined;
    message.fadeInSlices = object.fadeInSlices ?? undefined;
    message.fadeOutSlices = object.fadeOutSlices ?? undefined;
    return message;
  },
};

function createBaseIndependentColorParams(): IndependentColorParams {
  return {
    topLeft: undefined,
    upperMidLeft: undefined,
    lowerMidLeft: undefined,
    bottomLeft: undefined,
    topRight: undefined,
    upperMidRight: undefined,
    lowerMidRight: undefined,
    bottomRight: undefined,
    fadeInSlices: undefined,
    fadeOutSlices: undefined,
  };
}

export const IndependentColorParams = {
  encode(
    message: IndependentColorParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.topLeft !== undefined) {
      Color.encode(message.topLeft, writer.uint32(10).fork()).ldelim();
    }
    if (message.upperMidLeft !== undefined) {
      Color.encode(message.upperMidLeft, writer.uint32(18).fork()).ldelim();
    }
    if (message.lowerMidLeft !== undefined) {
      Color.encode(message.lowerMidLeft, writer.uint32(26).fork()).ldelim();
    }
    if (message.bottomLeft !== undefined) {
      Color.encode(message.bottomLeft, writer.uint32(34).fork()).ldelim();
    }
    if (message.topRight !== undefined) {
      Color.encode(message.topRight, writer.uint32(42).fork()).ldelim();
    }
    if (message.upperMidRight !== undefined) {
      Color.encode(message.upperMidRight, writer.uint32(50).fork()).ldelim();
    }
    if (message.lowerMidRight !== undefined) {
      Color.encode(message.lowerMidRight, writer.uint32(58).fork()).ldelim();
    }
    if (message.bottomRight !== undefined) {
      Color.encode(message.bottomRight, writer.uint32(66).fork()).ldelim();
    }
    if (message.fadeInSlices !== undefined) {
      DoubleValue.encode(
        { value: message.fadeInSlices! },
        writer.uint32(74).fork()
      ).ldelim();
    }
    if (message.fadeOutSlices !== undefined) {
      DoubleValue.encode(
        { value: message.fadeOutSlices! },
        writer.uint32(82).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): IndependentColorParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIndependentColorParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.topLeft = Color.decode(reader, reader.uint32());
          break;
        case 2:
          message.upperMidLeft = Color.decode(reader, reader.uint32());
          break;
        case 3:
          message.lowerMidLeft = Color.decode(reader, reader.uint32());
          break;
        case 4:
          message.bottomLeft = Color.decode(reader, reader.uint32());
          break;
        case 5:
          message.topRight = Color.decode(reader, reader.uint32());
          break;
        case 6:
          message.upperMidRight = Color.decode(reader, reader.uint32());
          break;
        case 7:
          message.lowerMidRight = Color.decode(reader, reader.uint32());
          break;
        case 8:
          message.bottomRight = Color.decode(reader, reader.uint32());
          break;
        case 9:
          message.fadeInSlices = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 10:
          message.fadeOutSlices = DoubleValue.decode(
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

  fromJSON(object: any): IndependentColorParams {
    return {
      topLeft: isSet(object.topLeft)
        ? Color.fromJSON(object.topLeft)
        : undefined,
      upperMidLeft: isSet(object.upperMidLeft)
        ? Color.fromJSON(object.upperMidLeft)
        : undefined,
      lowerMidLeft: isSet(object.lowerMidLeft)
        ? Color.fromJSON(object.lowerMidLeft)
        : undefined,
      bottomLeft: isSet(object.bottomLeft)
        ? Color.fromJSON(object.bottomLeft)
        : undefined,
      topRight: isSet(object.topRight)
        ? Color.fromJSON(object.topRight)
        : undefined,
      upperMidRight: isSet(object.upperMidRight)
        ? Color.fromJSON(object.upperMidRight)
        : undefined,
      lowerMidRight: isSet(object.lowerMidRight)
        ? Color.fromJSON(object.lowerMidRight)
        : undefined,
      bottomRight: isSet(object.bottomRight)
        ? Color.fromJSON(object.bottomRight)
        : undefined,
      fadeInSlices: isSet(object.fadeInSlices)
        ? Number(object.fadeInSlices)
        : undefined,
      fadeOutSlices: isSet(object.fadeOutSlices)
        ? Number(object.fadeOutSlices)
        : undefined,
    };
  },

  toJSON(message: IndependentColorParams): unknown {
    const obj: any = {};
    message.topLeft !== undefined &&
      (obj.topLeft = message.topLeft
        ? Color.toJSON(message.topLeft)
        : undefined);
    message.upperMidLeft !== undefined &&
      (obj.upperMidLeft = message.upperMidLeft
        ? Color.toJSON(message.upperMidLeft)
        : undefined);
    message.lowerMidLeft !== undefined &&
      (obj.lowerMidLeft = message.lowerMidLeft
        ? Color.toJSON(message.lowerMidLeft)
        : undefined);
    message.bottomLeft !== undefined &&
      (obj.bottomLeft = message.bottomLeft
        ? Color.toJSON(message.bottomLeft)
        : undefined);
    message.topRight !== undefined &&
      (obj.topRight = message.topRight
        ? Color.toJSON(message.topRight)
        : undefined);
    message.upperMidRight !== undefined &&
      (obj.upperMidRight = message.upperMidRight
        ? Color.toJSON(message.upperMidRight)
        : undefined);
    message.lowerMidRight !== undefined &&
      (obj.lowerMidRight = message.lowerMidRight
        ? Color.toJSON(message.lowerMidRight)
        : undefined);
    message.bottomRight !== undefined &&
      (obj.bottomRight = message.bottomRight
        ? Color.toJSON(message.bottomRight)
        : undefined);
    message.fadeInSlices !== undefined &&
      (obj.fadeInSlices = message.fadeInSlices);
    message.fadeOutSlices !== undefined &&
      (obj.fadeOutSlices = message.fadeOutSlices);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<IndependentColorParams>, I>>(
    object: I
  ): IndependentColorParams {
    const message = createBaseIndependentColorParams();
    message.topLeft =
      object.topLeft !== undefined && object.topLeft !== null
        ? Color.fromPartial(object.topLeft)
        : undefined;
    message.upperMidLeft =
      object.upperMidLeft !== undefined && object.upperMidLeft !== null
        ? Color.fromPartial(object.upperMidLeft)
        : undefined;
    message.lowerMidLeft =
      object.lowerMidLeft !== undefined && object.lowerMidLeft !== null
        ? Color.fromPartial(object.lowerMidLeft)
        : undefined;
    message.bottomLeft =
      object.bottomLeft !== undefined && object.bottomLeft !== null
        ? Color.fromPartial(object.bottomLeft)
        : undefined;
    message.topRight =
      object.topRight !== undefined && object.topRight !== null
        ? Color.fromPartial(object.topRight)
        : undefined;
    message.upperMidRight =
      object.upperMidRight !== undefined && object.upperMidRight !== null
        ? Color.fromPartial(object.upperMidRight)
        : undefined;
    message.lowerMidRight =
      object.lowerMidRight !== undefined && object.lowerMidRight !== null
        ? Color.fromPartial(object.lowerMidRight)
        : undefined;
    message.bottomRight =
      object.bottomRight !== undefined && object.bottomRight !== null
        ? Color.fromPartial(object.bottomRight)
        : undefined;
    message.fadeInSlices = object.fadeInSlices ?? undefined;
    message.fadeOutSlices = object.fadeOutSlices ?? undefined;
    return message;
  },
};

function createBaseColor(): Color {
  return { red: undefined, green: undefined, blue: undefined };
}

export const Color = {
  encode(message: Color, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.red !== undefined) {
      DoubleValue.encode(
        { value: message.red! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.green !== undefined) {
      DoubleValue.encode(
        { value: message.green! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.blue !== undefined) {
      DoubleValue.encode(
        { value: message.blue! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Color {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseColor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.red = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.green = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.blue = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Color {
    return {
      red: isSet(object.red) ? Number(object.red) : undefined,
      green: isSet(object.green) ? Number(object.green) : undefined,
      blue: isSet(object.blue) ? Number(object.blue) : undefined,
    };
  },

  toJSON(message: Color): unknown {
    const obj: any = {};
    message.red !== undefined && (obj.red = message.red);
    message.green !== undefined && (obj.green = message.green);
    message.blue !== undefined && (obj.blue = message.blue);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Color>, I>>(object: I): Color {
    const message = createBaseColor();
    message.red = object.red ?? undefined;
    message.green = object.green ?? undefined;
    message.blue = object.blue ?? undefined;
    return message;
  },
};

function createBaseRippleColorParams(): RippleColorParams {
  return {
    main: undefined,
    secondary: undefined,
    pattern: 0,
    lightSide: 0,
    incrementSlices: undefined,
  };
}

export const RippleColorParams = {
  encode(
    message: RippleColorParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.main !== undefined) {
      Color.encode(message.main, writer.uint32(10).fork()).ldelim();
    }
    if (message.secondary !== undefined) {
      Color.encode(message.secondary, writer.uint32(18).fork()).ldelim();
    }
    if (message.pattern !== 0) {
      writer.uint32(24).int32(message.pattern);
    }
    if (message.lightSide !== 0) {
      writer.uint32(32).int32(message.lightSide);
    }
    if (message.incrementSlices !== undefined) {
      DoubleValue.encode(
        { value: message.incrementSlices! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RippleColorParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRippleColorParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.main = Color.decode(reader, reader.uint32());
          break;
        case 2:
          message.secondary = Color.decode(reader, reader.uint32());
          break;
        case 3:
          message.pattern = reader.int32() as any;
          break;
        case 4:
          message.lightSide = reader.int32() as any;
          break;
        case 5:
          message.incrementSlices = DoubleValue.decode(
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

  fromJSON(object: any): RippleColorParams {
    return {
      main: isSet(object.main) ? Color.fromJSON(object.main) : undefined,
      secondary: isSet(object.secondary)
        ? Color.fromJSON(object.secondary)
        : undefined,
      pattern: isSet(object.pattern)
        ? rippleColorParams_PatternFromJSON(object.pattern)
        : 0,
      lightSide: isSet(object.lightSide)
        ? rippleColorParams_LightSideFromJSON(object.lightSide)
        : 0,
      incrementSlices: isSet(object.incrementSlices)
        ? Number(object.incrementSlices)
        : undefined,
    };
  },

  toJSON(message: RippleColorParams): unknown {
    const obj: any = {};
    message.main !== undefined &&
      (obj.main = message.main ? Color.toJSON(message.main) : undefined);
    message.secondary !== undefined &&
      (obj.secondary = message.secondary
        ? Color.toJSON(message.secondary)
        : undefined);
    message.pattern !== undefined &&
      (obj.pattern = rippleColorParams_PatternToJSON(message.pattern));
    message.lightSide !== undefined &&
      (obj.lightSide = rippleColorParams_LightSideToJSON(message.lightSide));
    message.incrementSlices !== undefined &&
      (obj.incrementSlices = message.incrementSlices);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RippleColorParams>, I>>(
    object: I
  ): RippleColorParams {
    const message = createBaseRippleColorParams();
    message.main =
      object.main !== undefined && object.main !== null
        ? Color.fromPartial(object.main)
        : undefined;
    message.secondary =
      object.secondary !== undefined && object.secondary !== null
        ? Color.fromPartial(object.secondary)
        : undefined;
    message.pattern = object.pattern ?? 0;
    message.lightSide = object.lightSide ?? 0;
    message.incrementSlices = object.incrementSlices ?? undefined;
    return message;
  },
};

function createBaseAnimateParams(): AnimateParams {
  return {
    animationName: "",
    bodyEntrySlices: undefined,
    bodyExitSlices: undefined,
    translationMultiplier: undefined,
    rotationMultiplier: undefined,
    armEntrySlices: undefined,
    shoulder0Offset: undefined,
    shoulder1Offset: undefined,
    elbow0Offset: undefined,
    elbow1Offset: undefined,
    wrist0Offset: undefined,
    wrist1Offset: undefined,
    gripperOffset: undefined,
    speed: undefined,
    offsetSlices: undefined,
    gripperMultiplier: undefined,
    gripperStrengthFraction: undefined,
    armDanceFrameId: undefined,
    bodyTrackingStiffness: undefined,
  };
}

export const AnimateParams = {
  encode(
    message: AnimateParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.animationName !== "") {
      writer.uint32(10).string(message.animationName);
    }
    if (message.bodyEntrySlices !== undefined) {
      DoubleValue.encode(
        { value: message.bodyEntrySlices! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.bodyExitSlices !== undefined) {
      DoubleValue.encode(
        { value: message.bodyExitSlices! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.translationMultiplier !== undefined) {
      Vec3Value.encode(
        message.translationMultiplier,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.rotationMultiplier !== undefined) {
      EulerZYXValue.encode(
        message.rotationMultiplier,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.armEntrySlices !== undefined) {
      DoubleValue.encode(
        { value: message.armEntrySlices! },
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.shoulder0Offset !== undefined) {
      DoubleValue.encode(
        { value: message.shoulder0Offset! },
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.shoulder1Offset !== undefined) {
      DoubleValue.encode(
        { value: message.shoulder1Offset! },
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.elbow0Offset !== undefined) {
      DoubleValue.encode(
        { value: message.elbow0Offset! },
        writer.uint32(74).fork()
      ).ldelim();
    }
    if (message.elbow1Offset !== undefined) {
      DoubleValue.encode(
        { value: message.elbow1Offset! },
        writer.uint32(82).fork()
      ).ldelim();
    }
    if (message.wrist0Offset !== undefined) {
      DoubleValue.encode(
        { value: message.wrist0Offset! },
        writer.uint32(90).fork()
      ).ldelim();
    }
    if (message.wrist1Offset !== undefined) {
      DoubleValue.encode(
        { value: message.wrist1Offset! },
        writer.uint32(98).fork()
      ).ldelim();
    }
    if (message.gripperOffset !== undefined) {
      DoubleValue.encode(
        { value: message.gripperOffset! },
        writer.uint32(106).fork()
      ).ldelim();
    }
    if (message.speed !== undefined) {
      DoubleValue.encode(
        { value: message.speed! },
        writer.uint32(114).fork()
      ).ldelim();
    }
    if (message.offsetSlices !== undefined) {
      DoubleValue.encode(
        { value: message.offsetSlices! },
        writer.uint32(122).fork()
      ).ldelim();
    }
    if (message.gripperMultiplier !== undefined) {
      DoubleValue.encode(
        { value: message.gripperMultiplier! },
        writer.uint32(130).fork()
      ).ldelim();
    }
    if (message.gripperStrengthFraction !== undefined) {
      DoubleValue.encode(
        { value: message.gripperStrengthFraction! },
        writer.uint32(138).fork()
      ).ldelim();
    }
    if (message.armDanceFrameId !== undefined) {
      Int32Value.encode(
        { value: message.armDanceFrameId! },
        writer.uint32(146).fork()
      ).ldelim();
    }
    if (message.bodyTrackingStiffness !== undefined) {
      DoubleValue.encode(
        { value: message.bodyTrackingStiffness! },
        writer.uint32(154).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AnimateParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAnimateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.animationName = reader.string();
          break;
        case 2:
          message.bodyEntrySlices = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 3:
          message.bodyExitSlices = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 4:
          message.translationMultiplier = Vec3Value.decode(
            reader,
            reader.uint32()
          );
          break;
        case 5:
          message.rotationMultiplier = EulerZYXValue.decode(
            reader,
            reader.uint32()
          );
          break;
        case 6:
          message.armEntrySlices = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 7:
          message.shoulder0Offset = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 8:
          message.shoulder1Offset = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 9:
          message.elbow0Offset = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 10:
          message.elbow1Offset = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 11:
          message.wrist0Offset = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 12:
          message.wrist1Offset = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 13:
          message.gripperOffset = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 14:
          message.speed = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 15:
          message.offsetSlices = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 16:
          message.gripperMultiplier = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 17:
          message.gripperStrengthFraction = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 18:
          message.armDanceFrameId = Int32Value.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 19:
          message.bodyTrackingStiffness = DoubleValue.decode(
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

  fromJSON(object: any): AnimateParams {
    return {
      animationName: isSet(object.animationName)
        ? String(object.animationName)
        : "",
      bodyEntrySlices: isSet(object.bodyEntrySlices)
        ? Number(object.bodyEntrySlices)
        : undefined,
      bodyExitSlices: isSet(object.bodyExitSlices)
        ? Number(object.bodyExitSlices)
        : undefined,
      translationMultiplier: isSet(object.translationMultiplier)
        ? Vec3Value.fromJSON(object.translationMultiplier)
        : undefined,
      rotationMultiplier: isSet(object.rotationMultiplier)
        ? EulerZYXValue.fromJSON(object.rotationMultiplier)
        : undefined,
      armEntrySlices: isSet(object.armEntrySlices)
        ? Number(object.armEntrySlices)
        : undefined,
      shoulder0Offset: isSet(object.shoulder0Offset)
        ? Number(object.shoulder0Offset)
        : undefined,
      shoulder1Offset: isSet(object.shoulder1Offset)
        ? Number(object.shoulder1Offset)
        : undefined,
      elbow0Offset: isSet(object.elbow0Offset)
        ? Number(object.elbow0Offset)
        : undefined,
      elbow1Offset: isSet(object.elbow1Offset)
        ? Number(object.elbow1Offset)
        : undefined,
      wrist0Offset: isSet(object.wrist0Offset)
        ? Number(object.wrist0Offset)
        : undefined,
      wrist1Offset: isSet(object.wrist1Offset)
        ? Number(object.wrist1Offset)
        : undefined,
      gripperOffset: isSet(object.gripperOffset)
        ? Number(object.gripperOffset)
        : undefined,
      speed: isSet(object.speed) ? Number(object.speed) : undefined,
      offsetSlices: isSet(object.offsetSlices)
        ? Number(object.offsetSlices)
        : undefined,
      gripperMultiplier: isSet(object.gripperMultiplier)
        ? Number(object.gripperMultiplier)
        : undefined,
      gripperStrengthFraction: isSet(object.gripperStrengthFraction)
        ? Number(object.gripperStrengthFraction)
        : undefined,
      armDanceFrameId: isSet(object.armDanceFrameId)
        ? Number(object.armDanceFrameId)
        : undefined,
      bodyTrackingStiffness: isSet(object.bodyTrackingStiffness)
        ? Number(object.bodyTrackingStiffness)
        : undefined,
    };
  },

  toJSON(message: AnimateParams): unknown {
    const obj: any = {};
    message.animationName !== undefined &&
      (obj.animationName = message.animationName);
    message.bodyEntrySlices !== undefined &&
      (obj.bodyEntrySlices = message.bodyEntrySlices);
    message.bodyExitSlices !== undefined &&
      (obj.bodyExitSlices = message.bodyExitSlices);
    message.translationMultiplier !== undefined &&
      (obj.translationMultiplier = message.translationMultiplier
        ? Vec3Value.toJSON(message.translationMultiplier)
        : undefined);
    message.rotationMultiplier !== undefined &&
      (obj.rotationMultiplier = message.rotationMultiplier
        ? EulerZYXValue.toJSON(message.rotationMultiplier)
        : undefined);
    message.armEntrySlices !== undefined &&
      (obj.armEntrySlices = message.armEntrySlices);
    message.shoulder0Offset !== undefined &&
      (obj.shoulder0Offset = message.shoulder0Offset);
    message.shoulder1Offset !== undefined &&
      (obj.shoulder1Offset = message.shoulder1Offset);
    message.elbow0Offset !== undefined &&
      (obj.elbow0Offset = message.elbow0Offset);
    message.elbow1Offset !== undefined &&
      (obj.elbow1Offset = message.elbow1Offset);
    message.wrist0Offset !== undefined &&
      (obj.wrist0Offset = message.wrist0Offset);
    message.wrist1Offset !== undefined &&
      (obj.wrist1Offset = message.wrist1Offset);
    message.gripperOffset !== undefined &&
      (obj.gripperOffset = message.gripperOffset);
    message.speed !== undefined && (obj.speed = message.speed);
    message.offsetSlices !== undefined &&
      (obj.offsetSlices = message.offsetSlices);
    message.gripperMultiplier !== undefined &&
      (obj.gripperMultiplier = message.gripperMultiplier);
    message.gripperStrengthFraction !== undefined &&
      (obj.gripperStrengthFraction = message.gripperStrengthFraction);
    message.armDanceFrameId !== undefined &&
      (obj.armDanceFrameId = message.armDanceFrameId);
    message.bodyTrackingStiffness !== undefined &&
      (obj.bodyTrackingStiffness = message.bodyTrackingStiffness);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AnimateParams>, I>>(
    object: I
  ): AnimateParams {
    const message = createBaseAnimateParams();
    message.animationName = object.animationName ?? "";
    message.bodyEntrySlices = object.bodyEntrySlices ?? undefined;
    message.bodyExitSlices = object.bodyExitSlices ?? undefined;
    message.translationMultiplier =
      object.translationMultiplier !== undefined &&
      object.translationMultiplier !== null
        ? Vec3Value.fromPartial(object.translationMultiplier)
        : undefined;
    message.rotationMultiplier =
      object.rotationMultiplier !== undefined &&
      object.rotationMultiplier !== null
        ? EulerZYXValue.fromPartial(object.rotationMultiplier)
        : undefined;
    message.armEntrySlices = object.armEntrySlices ?? undefined;
    message.shoulder0Offset = object.shoulder0Offset ?? undefined;
    message.shoulder1Offset = object.shoulder1Offset ?? undefined;
    message.elbow0Offset = object.elbow0Offset ?? undefined;
    message.elbow1Offset = object.elbow1Offset ?? undefined;
    message.wrist0Offset = object.wrist0Offset ?? undefined;
    message.wrist1Offset = object.wrist1Offset ?? undefined;
    message.gripperOffset = object.gripperOffset ?? undefined;
    message.speed = object.speed ?? undefined;
    message.offsetSlices = object.offsetSlices ?? undefined;
    message.gripperMultiplier = object.gripperMultiplier ?? undefined;
    message.gripperStrengthFraction =
      object.gripperStrengthFraction ?? undefined;
    message.armDanceFrameId = object.armDanceFrameId ?? undefined;
    message.bodyTrackingStiffness = object.bodyTrackingStiffness ?? undefined;
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
