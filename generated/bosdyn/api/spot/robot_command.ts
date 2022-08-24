/* eslint-disable */
import { SE2VelocityLimit, Vec3 } from "../geometry";
import { SE3Trajectory } from "../trajectory";
import _m0 from "protobufjs/minimal";
import { DoubleValue } from "../../../google/protobuf/wrappers";

export const protobufPackage = "bosdyn.api.spot";

/** The locomotion hint specifying the gait of the robot. */
export enum LocomotionHint {
  /** HINT_UNKNOWN - Invalid; do not use. */
  HINT_UNKNOWN = 0,
  /** HINT_AUTO - No hint, robot chooses an appropriate gait (typically trot.) */
  HINT_AUTO = 1,
  /** HINT_TROT - Most robust gait which moves diagonal legs together. */
  HINT_TROT = 2,
  /** HINT_SPEED_SELECT_TROT - Trot which comes to a stand when not commanded to move. */
  HINT_SPEED_SELECT_TROT = 3,
  /** HINT_CRAWL - Slow and steady gait which moves only one foot at a time. */
  HINT_CRAWL = 4,
  /** HINT_SPEED_SELECT_CRAWL - Crawl which comes to a stand when not commanded to move. */
  HINT_SPEED_SELECT_CRAWL = 10,
  /** HINT_AMBLE - Four beat gait where one foot touches down at a time. */
  HINT_AMBLE = 5,
  /** HINT_SPEED_SELECT_AMBLE - Amble which comes to a stand when not commanded to move. */
  HINT_SPEED_SELECT_AMBLE = 6,
  /** HINT_JOG - Demo gait which moves diagonal leg pairs together with an aerial phase. */
  HINT_JOG = 7,
  /** HINT_HOP - Demo gait which hops while holding some feet in the air. */
  HINT_HOP = 8,
  /**
   * HINT_AUTO_TROT - HINT_AUTO_TROT is deprecated due to the name being too similar to the Spot Autowalk feature.
   * It has been replaced by HINT_SPEED_SELECT_TROT. Keeping this value in here for now for backwards
   * compatibility, but this may be removed in future releases.
   */
  HINT_AUTO_TROT = 3,
  /**
   * HINT_AUTO_AMBLE - HINT_AUTO_AMBLE is deprecated due to the name being too similar to the Spot Autowalk feature.
   * It has been replaced by HINT_SPEED_SELECT_AMBLE. Keeping this value in here for now for backwards
   * compatibility, but this may be removed in future releases.
   */
  HINT_AUTO_AMBLE = 6,
  UNRECOGNIZED = -1,
}

export function locomotionHintFromJSON(object: any): LocomotionHint {
  switch (object) {
    case 0:
    case "HINT_UNKNOWN":
      return LocomotionHint.HINT_UNKNOWN;
    case 1:
    case "HINT_AUTO":
      return LocomotionHint.HINT_AUTO;
    case 2:
    case "HINT_TROT":
      return LocomotionHint.HINT_TROT;
    case 3:
    case "HINT_SPEED_SELECT_TROT":
      return LocomotionHint.HINT_SPEED_SELECT_TROT;
    case 4:
    case "HINT_CRAWL":
      return LocomotionHint.HINT_CRAWL;
    case 10:
    case "HINT_SPEED_SELECT_CRAWL":
      return LocomotionHint.HINT_SPEED_SELECT_CRAWL;
    case 5:
    case "HINT_AMBLE":
      return LocomotionHint.HINT_AMBLE;
    case 6:
    case "HINT_SPEED_SELECT_AMBLE":
      return LocomotionHint.HINT_SPEED_SELECT_AMBLE;
    case 7:
    case "HINT_JOG":
      return LocomotionHint.HINT_JOG;
    case 8:
    case "HINT_HOP":
      return LocomotionHint.HINT_HOP;
    case 3:
    case "HINT_AUTO_TROT":
      return LocomotionHint.HINT_AUTO_TROT;
    case 6:
    case "HINT_AUTO_AMBLE":
      return LocomotionHint.HINT_AUTO_AMBLE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LocomotionHint.UNRECOGNIZED;
  }
}

export function locomotionHintToJSON(object: LocomotionHint): string {
  switch (object) {
    case LocomotionHint.HINT_UNKNOWN:
      return "HINT_UNKNOWN";
    case LocomotionHint.HINT_AUTO:
      return "HINT_AUTO";
    case LocomotionHint.HINT_TROT:
      return "HINT_TROT";
    case LocomotionHint.HINT_SPEED_SELECT_TROT:
      return "HINT_SPEED_SELECT_TROT";
    case LocomotionHint.HINT_CRAWL:
      return "HINT_CRAWL";
    case LocomotionHint.HINT_SPEED_SELECT_CRAWL:
      return "HINT_SPEED_SELECT_CRAWL";
    case LocomotionHint.HINT_AMBLE:
      return "HINT_AMBLE";
    case LocomotionHint.HINT_SPEED_SELECT_AMBLE:
      return "HINT_SPEED_SELECT_AMBLE";
    case LocomotionHint.HINT_JOG:
      return "HINT_JOG";
    case LocomotionHint.HINT_HOP:
      return "HINT_HOP";
    case LocomotionHint.HINT_AUTO_TROT:
      return "HINT_AUTO_TROT";
    case LocomotionHint.HINT_AUTO_AMBLE:
      return "HINT_AUTO_AMBLE";
    case LocomotionHint.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** The type of swing height for a step. */
export enum SwingHeight {
  /** SWING_HEIGHT_UNKNOWN - Invalid; do not use. */
  SWING_HEIGHT_UNKNOWN = 0,
  /** SWING_HEIGHT_LOW - Low-stepping. Robot will try to only swing legs a few cm away from ground. */
  SWING_HEIGHT_LOW = 1,
  /** SWING_HEIGHT_MEDIUM - Default for most cases, use other values with caution. */
  SWING_HEIGHT_MEDIUM = 2,
  /** SWING_HEIGHT_HIGH - High-stepping. Possibly useful with degraded vision operation. */
  SWING_HEIGHT_HIGH = 3,
  UNRECOGNIZED = -1,
}

export function swingHeightFromJSON(object: any): SwingHeight {
  switch (object) {
    case 0:
    case "SWING_HEIGHT_UNKNOWN":
      return SwingHeight.SWING_HEIGHT_UNKNOWN;
    case 1:
    case "SWING_HEIGHT_LOW":
      return SwingHeight.SWING_HEIGHT_LOW;
    case 2:
    case "SWING_HEIGHT_MEDIUM":
      return SwingHeight.SWING_HEIGHT_MEDIUM;
    case 3:
    case "SWING_HEIGHT_HIGH":
      return SwingHeight.SWING_HEIGHT_HIGH;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SwingHeight.UNRECOGNIZED;
  }
}

export function swingHeightToJSON(object: SwingHeight): string {
  switch (object) {
    case SwingHeight.SWING_HEIGHT_UNKNOWN:
      return "SWING_HEIGHT_UNKNOWN";
    case SwingHeight.SWING_HEIGHT_LOW:
      return "SWING_HEIGHT_LOW";
    case SwingHeight.SWING_HEIGHT_MEDIUM:
      return "SWING_HEIGHT_MEDIUM";
    case SwingHeight.SWING_HEIGHT_HIGH:
      return "SWING_HEIGHT_HIGH";
    case SwingHeight.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Params common across spot movement and mobility. */
export interface MobilityParams {
  /** Max allowable velocity at any point in trajectory. */
  velLimit: SE2VelocityLimit | undefined;
  /** Parameters for controlling Spot's body during motion. */
  bodyControl: BodyControlParams | undefined;
  /** Desired gait during locomotion */
  locomotionHint: LocomotionHint;
  /**
   * Stairs are only supported in trot gaits. Using this hint will override some user defaults in
   * order to optimize stair behavior.
   */
  stairHint: boolean;
  /** Allow the robot to move with degraded perception when there are perception faults. */
  allowDegradedPerception: boolean;
  /** Control of obstacle avoidance. */
  obstacleParams: ObstacleParams | undefined;
  /** Swing height setting */
  swingHeight: SwingHeight;
  /** Ground terrain parameters. */
  terrainParams: TerrainParams | undefined;
  /** Prevent the robot from using StairTracker even if in stairs mode. */
  disallowStairTracker: boolean;
  /**
   * Prevent the robot from automatically walking off a staircase in the case of an error
   * (ex: e-stop settle_then_cut, critical battery level)
   */
  disableStairErrorAutoDescent: boolean;
  /** Robot Body External Force parameters */
  externalForceParams: BodyExternalForceParams | undefined;
  /** Prevent the robot from pitching to get a better look at rearward terrain except in stairs mode. */
  disallowNonStairsPitchLimiting: boolean;
  /** Disable the secondary nearmap-based cliff avoidance that runs while on stairs. */
  disableNearmapCliffAvoidance: boolean;
}

/** Parameters for offsetting the body from the normal default. */
export interface BodyControlParams {
  /**
   * Desired base offset relative to the footprint pseudo-frame.
   * The footprint pseudo-frame is a gravity aligned frame with its origin located at the
   * geometric center of the feet in the X-Y axis, and at the nominal height of the hips in the Z axis.
   * The yaw of the frame (wrt the world) is calcuated by the average foot locations, and is aligned with the feet.
   */
  baseOffsetRtFootprint: SE3Trajectory | undefined;
  /**
   * The base will adjust to assist with manipulation, adjusting its height, pitch, and yaw as a function of
   * the hand's location.  Note, manipulation assisted body control is only available for ArmCommand requests
   * that control the end-effector, and are expressed in an inertial frame.  For example, sending a
   * ArmCartesianCommand request with root_frame_name set to "odom" will allow the robot to compute a body
   * adjustment.  However, sending a ArmCartesianCommand request with root_frame_name set to "body" or
   * sending an ArmJointMoveCommand request is incompatible, and the body will reset to default height
   * and orientation.
   */
  bodyAssistForManipulation:
    | BodyControlParams_BodyAssistForManipulation
    | undefined;
  /** The rotation setting for the robot body.  Ignored if body_assist_for_manipulation is requested. */
  rotationSetting: BodyControlParams_RotationSetting;
}

/**
 * Setting for how the robot interprets base offset pitch & roll components.
 * In the default case (ROTATION_SETTING_OFFSET) the robot will naturally align the body to the pitch of the current terrain.
 * In some circumstances, the user may wish to override this value and try to maintain alignment
 * with respect to gravity. Be careful with this setting as it may likely degrade robot performance in
 * complex terrain, e.g. stairs, platforms, or slopes of sufficiently high grade.
 */
export enum BodyControlParams_RotationSetting {
  /** ROTATION_SETTING_UNKNOWN - Invalid; do not use. */
  ROTATION_SETTING_UNKNOWN = 0,
  /** ROTATION_SETTING_OFFSET - Pitch & Roll are offset with respect to orientation of the footprint. */
  ROTATION_SETTING_OFFSET = 1,
  /** ROTATION_SETTING_ABSOLUTE - Pitch & Roll are offset with respect to gravity. */
  ROTATION_SETTING_ABSOLUTE = 2,
  UNRECOGNIZED = -1,
}

export function bodyControlParams_RotationSettingFromJSON(
  object: any
): BodyControlParams_RotationSetting {
  switch (object) {
    case 0:
    case "ROTATION_SETTING_UNKNOWN":
      return BodyControlParams_RotationSetting.ROTATION_SETTING_UNKNOWN;
    case 1:
    case "ROTATION_SETTING_OFFSET":
      return BodyControlParams_RotationSetting.ROTATION_SETTING_OFFSET;
    case 2:
    case "ROTATION_SETTING_ABSOLUTE":
      return BodyControlParams_RotationSetting.ROTATION_SETTING_ABSOLUTE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return BodyControlParams_RotationSetting.UNRECOGNIZED;
  }
}

export function bodyControlParams_RotationSettingToJSON(
  object: BodyControlParams_RotationSetting
): string {
  switch (object) {
    case BodyControlParams_RotationSetting.ROTATION_SETTING_UNKNOWN:
      return "ROTATION_SETTING_UNKNOWN";
    case BodyControlParams_RotationSetting.ROTATION_SETTING_OFFSET:
      return "ROTATION_SETTING_OFFSET";
    case BodyControlParams_RotationSetting.ROTATION_SETTING_ABSOLUTE:
      return "ROTATION_SETTING_ABSOLUTE";
    case BodyControlParams_RotationSetting.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Instead of directly specify the base offset trajectory, these options allow the robot to calcuate offsets
 * based on the hand's location.  If the robot does not have a SpotArm attached, sending this request will
 * hvae no effect.
 */
export interface BodyControlParams_BodyAssistForManipulation {
  /** Enable the use of body yaw to assist with manipulation. */
  enableBodyYawAssist: boolean;
  /** Enable use of hip height (e.g. body height/pitch) to assist with manipulation. */
  enableHipHeightAssist: boolean;
}

/** Parameters for obstacle avoidance types. */
export interface ObstacleParams {
  /** Use vision to make the feet avoid obstacles by swinging higher? */
  disableVisionFootObstacleAvoidance: boolean;
  /** Use vision to make the feet avoid constraints like edges of stairs? */
  disableVisionFootConstraintAvoidance: boolean;
  /** Use vision to make the body avoid obstacles? */
  disableVisionBodyObstacleAvoidance: boolean;
  /**
   * Desired padding around the body to use when attempting to avoid obstacles.
   * Described in meters. Must be >= 0.
   */
  obstacleAvoidancePadding: number;
  /**
   * Prevent the robot body from raising above nominal height to avoid lower-leg collisions with
   * the terrain.
   */
  disableVisionFootObstacleBodyAssist: boolean;
  /** Use vision to make the robot avoid stepping into negative obstacles? */
  disableVisionNegativeObstacles: boolean;
}

/** Ground contact parameters that describe the terrain. */
export interface TerrainParams {
  /**
   * Terrain coefficient of friction user hint. This value must be postive and will clamped if
   * necessary on the robot side. Best suggested values lie in the range between 0.4 and 0.8
   * (which is the robot's default.)
   */
  groundMuHint: number | undefined;
  /**
   * ** Deprecation Warning ***
   * DEPRECATED as of 3.0.0: The boolean field has been replaced by the field grated_surfaces_mode
   * The following field will be deprecated and moved to 'reserved' in a future release.
   *
   * @deprecated
   */
  enableGratedFloor: boolean;
  /** The selected option for grated surfaces mode */
  gratedSurfacesMode: TerrainParams_GratedSurfacesMode;
}

/**
 * Options for Grated Surfaces Mode. When Grated Surfaces Mode is on, the robot assumes the
 * ground below it is made of grated metal or other repeated pattern. When on, the robot will
 * make assumptions about the environment structure and more aggressively filter noise in
 * perception data.
 */
export enum TerrainParams_GratedSurfacesMode {
  /** GRATED_SURFACES_MODE_UNKNOWN - Invalid; do not use. */
  GRATED_SURFACES_MODE_UNKNOWN = 0,
  GRATED_SURFACES_MODE_OFF = 1,
  GRATED_SURFACES_MODE_ON = 2,
  /** GRATED_SURFACES_MODE_AUTO - Robot will automatically turn mode on or off */
  GRATED_SURFACES_MODE_AUTO = 3,
  UNRECOGNIZED = -1,
}

export function terrainParams_GratedSurfacesModeFromJSON(
  object: any
): TerrainParams_GratedSurfacesMode {
  switch (object) {
    case 0:
    case "GRATED_SURFACES_MODE_UNKNOWN":
      return TerrainParams_GratedSurfacesMode.GRATED_SURFACES_MODE_UNKNOWN;
    case 1:
    case "GRATED_SURFACES_MODE_OFF":
      return TerrainParams_GratedSurfacesMode.GRATED_SURFACES_MODE_OFF;
    case 2:
    case "GRATED_SURFACES_MODE_ON":
      return TerrainParams_GratedSurfacesMode.GRATED_SURFACES_MODE_ON;
    case 3:
    case "GRATED_SURFACES_MODE_AUTO":
      return TerrainParams_GratedSurfacesMode.GRATED_SURFACES_MODE_AUTO;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TerrainParams_GratedSurfacesMode.UNRECOGNIZED;
  }
}

export function terrainParams_GratedSurfacesModeToJSON(
  object: TerrainParams_GratedSurfacesMode
): string {
  switch (object) {
    case TerrainParams_GratedSurfacesMode.GRATED_SURFACES_MODE_UNKNOWN:
      return "GRATED_SURFACES_MODE_UNKNOWN";
    case TerrainParams_GratedSurfacesMode.GRATED_SURFACES_MODE_OFF:
      return "GRATED_SURFACES_MODE_OFF";
    case TerrainParams_GratedSurfacesMode.GRATED_SURFACES_MODE_ON:
      return "GRATED_SURFACES_MODE_ON";
    case TerrainParams_GratedSurfacesMode.GRATED_SURFACES_MODE_AUTO:
      return "GRATED_SURFACES_MODE_AUTO";
    case TerrainParams_GratedSurfacesMode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * External Force on robot body parameters. This is a beta feature and still can have some odd behaviors.
 * By default, the external force estimator is disabled on the robot.
 */
export interface BodyExternalForceParams {
  /** The type of external force described by the parameters. */
  externalForceIndicator: BodyExternalForceParams_ExternalForceIndicator;
  /** The frame name for which the external_force_override is defined in. The frame must be known to the robot. */
  frameName: string;
  /**
   * Specifies a force that the body should expect to feel. This allows the robot to "lean into"
   * an external force. Be careful using this override, since incorrect information can cause
   * the robot to fall over.
   * For example, if the robot is leaning against a wall in front of it, the force override would be in the
   * negative x dimension. If the robot was pulling something directly behind it, the force override would
   * be in the negative x dimension as well.
   */
  externalForceOverride: Vec3 | undefined;
}

/**
 * Indicates what external force estimate/override the robot should use.
 * By default, the external force estimator is disabled on the robot.
 */
export enum BodyExternalForceParams_ExternalForceIndicator {
  /** EXTERNAL_FORCE_NONE - No external forces considered. */
  EXTERNAL_FORCE_NONE = 0,
  /** EXTERNAL_FORCE_USE_ESTIMATE - Use external forces estimated by the robot */
  EXTERNAL_FORCE_USE_ESTIMATE = 1,
  /** EXTERNAL_FORCE_USE_OVERRIDE - Use external forces specified in an override vector. */
  EXTERNAL_FORCE_USE_OVERRIDE = 2,
  UNRECOGNIZED = -1,
}

export function bodyExternalForceParams_ExternalForceIndicatorFromJSON(
  object: any
): BodyExternalForceParams_ExternalForceIndicator {
  switch (object) {
    case 0:
    case "EXTERNAL_FORCE_NONE":
      return BodyExternalForceParams_ExternalForceIndicator.EXTERNAL_FORCE_NONE;
    case 1:
    case "EXTERNAL_FORCE_USE_ESTIMATE":
      return BodyExternalForceParams_ExternalForceIndicator.EXTERNAL_FORCE_USE_ESTIMATE;
    case 2:
    case "EXTERNAL_FORCE_USE_OVERRIDE":
      return BodyExternalForceParams_ExternalForceIndicator.EXTERNAL_FORCE_USE_OVERRIDE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return BodyExternalForceParams_ExternalForceIndicator.UNRECOGNIZED;
  }
}

export function bodyExternalForceParams_ExternalForceIndicatorToJSON(
  object: BodyExternalForceParams_ExternalForceIndicator
): string {
  switch (object) {
    case BodyExternalForceParams_ExternalForceIndicator.EXTERNAL_FORCE_NONE:
      return "EXTERNAL_FORCE_NONE";
    case BodyExternalForceParams_ExternalForceIndicator.EXTERNAL_FORCE_USE_ESTIMATE:
      return "EXTERNAL_FORCE_USE_ESTIMATE";
    case BodyExternalForceParams_ExternalForceIndicator.EXTERNAL_FORCE_USE_OVERRIDE:
      return "EXTERNAL_FORCE_USE_OVERRIDE";
    case BodyExternalForceParams_ExternalForceIndicator.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseMobilityParams(): MobilityParams {
  return {
    velLimit: undefined,
    bodyControl: undefined,
    locomotionHint: 0,
    stairHint: false,
    allowDegradedPerception: false,
    obstacleParams: undefined,
    swingHeight: 0,
    terrainParams: undefined,
    disallowStairTracker: false,
    disableStairErrorAutoDescent: false,
    externalForceParams: undefined,
    disallowNonStairsPitchLimiting: false,
    disableNearmapCliffAvoidance: false,
  };
}

export const MobilityParams = {
  encode(
    message: MobilityParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.velLimit !== undefined) {
      SE2VelocityLimit.encode(
        message.velLimit,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.bodyControl !== undefined) {
      BodyControlParams.encode(
        message.bodyControl,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.locomotionHint !== 0) {
      writer.uint32(24).int32(message.locomotionHint);
    }
    if (message.stairHint === true) {
      writer.uint32(32).bool(message.stairHint);
    }
    if (message.allowDegradedPerception === true) {
      writer.uint32(40).bool(message.allowDegradedPerception);
    }
    if (message.obstacleParams !== undefined) {
      ObstacleParams.encode(
        message.obstacleParams,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.swingHeight !== 0) {
      writer.uint32(56).int32(message.swingHeight);
    }
    if (message.terrainParams !== undefined) {
      TerrainParams.encode(
        message.terrainParams,
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.disallowStairTracker === true) {
      writer.uint32(72).bool(message.disallowStairTracker);
    }
    if (message.disableStairErrorAutoDescent === true) {
      writer.uint32(128).bool(message.disableStairErrorAutoDescent);
    }
    if (message.externalForceParams !== undefined) {
      BodyExternalForceParams.encode(
        message.externalForceParams,
        writer.uint32(82).fork()
      ).ldelim();
    }
    if (message.disallowNonStairsPitchLimiting === true) {
      writer.uint32(88).bool(message.disallowNonStairsPitchLimiting);
    }
    if (message.disableNearmapCliffAvoidance === true) {
      writer.uint32(96).bool(message.disableNearmapCliffAvoidance);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MobilityParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMobilityParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.velLimit = SE2VelocityLimit.decode(reader, reader.uint32());
          break;
        case 2:
          message.bodyControl = BodyControlParams.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.locomotionHint = reader.int32() as any;
          break;
        case 4:
          message.stairHint = reader.bool();
          break;
        case 5:
          message.allowDegradedPerception = reader.bool();
          break;
        case 6:
          message.obstacleParams = ObstacleParams.decode(
            reader,
            reader.uint32()
          );
          break;
        case 7:
          message.swingHeight = reader.int32() as any;
          break;
        case 8:
          message.terrainParams = TerrainParams.decode(reader, reader.uint32());
          break;
        case 9:
          message.disallowStairTracker = reader.bool();
          break;
        case 16:
          message.disableStairErrorAutoDescent = reader.bool();
          break;
        case 10:
          message.externalForceParams = BodyExternalForceParams.decode(
            reader,
            reader.uint32()
          );
          break;
        case 11:
          message.disallowNonStairsPitchLimiting = reader.bool();
          break;
        case 12:
          message.disableNearmapCliffAvoidance = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MobilityParams {
    return {
      velLimit: isSet(object.velLimit)
        ? SE2VelocityLimit.fromJSON(object.velLimit)
        : undefined,
      bodyControl: isSet(object.bodyControl)
        ? BodyControlParams.fromJSON(object.bodyControl)
        : undefined,
      locomotionHint: isSet(object.locomotionHint)
        ? locomotionHintFromJSON(object.locomotionHint)
        : 0,
      stairHint: isSet(object.stairHint) ? Boolean(object.stairHint) : false,
      allowDegradedPerception: isSet(object.allowDegradedPerception)
        ? Boolean(object.allowDegradedPerception)
        : false,
      obstacleParams: isSet(object.obstacleParams)
        ? ObstacleParams.fromJSON(object.obstacleParams)
        : undefined,
      swingHeight: isSet(object.swingHeight)
        ? swingHeightFromJSON(object.swingHeight)
        : 0,
      terrainParams: isSet(object.terrainParams)
        ? TerrainParams.fromJSON(object.terrainParams)
        : undefined,
      disallowStairTracker: isSet(object.disallowStairTracker)
        ? Boolean(object.disallowStairTracker)
        : false,
      disableStairErrorAutoDescent: isSet(object.disableStairErrorAutoDescent)
        ? Boolean(object.disableStairErrorAutoDescent)
        : false,
      externalForceParams: isSet(object.externalForceParams)
        ? BodyExternalForceParams.fromJSON(object.externalForceParams)
        : undefined,
      disallowNonStairsPitchLimiting: isSet(
        object.disallowNonStairsPitchLimiting
      )
        ? Boolean(object.disallowNonStairsPitchLimiting)
        : false,
      disableNearmapCliffAvoidance: isSet(object.disableNearmapCliffAvoidance)
        ? Boolean(object.disableNearmapCliffAvoidance)
        : false,
    };
  },

  toJSON(message: MobilityParams): unknown {
    const obj: any = {};
    message.velLimit !== undefined &&
      (obj.velLimit = message.velLimit
        ? SE2VelocityLimit.toJSON(message.velLimit)
        : undefined);
    message.bodyControl !== undefined &&
      (obj.bodyControl = message.bodyControl
        ? BodyControlParams.toJSON(message.bodyControl)
        : undefined);
    message.locomotionHint !== undefined &&
      (obj.locomotionHint = locomotionHintToJSON(message.locomotionHint));
    message.stairHint !== undefined && (obj.stairHint = message.stairHint);
    message.allowDegradedPerception !== undefined &&
      (obj.allowDegradedPerception = message.allowDegradedPerception);
    message.obstacleParams !== undefined &&
      (obj.obstacleParams = message.obstacleParams
        ? ObstacleParams.toJSON(message.obstacleParams)
        : undefined);
    message.swingHeight !== undefined &&
      (obj.swingHeight = swingHeightToJSON(message.swingHeight));
    message.terrainParams !== undefined &&
      (obj.terrainParams = message.terrainParams
        ? TerrainParams.toJSON(message.terrainParams)
        : undefined);
    message.disallowStairTracker !== undefined &&
      (obj.disallowStairTracker = message.disallowStairTracker);
    message.disableStairErrorAutoDescent !== undefined &&
      (obj.disableStairErrorAutoDescent = message.disableStairErrorAutoDescent);
    message.externalForceParams !== undefined &&
      (obj.externalForceParams = message.externalForceParams
        ? BodyExternalForceParams.toJSON(message.externalForceParams)
        : undefined);
    message.disallowNonStairsPitchLimiting !== undefined &&
      (obj.disallowNonStairsPitchLimiting =
        message.disallowNonStairsPitchLimiting);
    message.disableNearmapCliffAvoidance !== undefined &&
      (obj.disableNearmapCliffAvoidance = message.disableNearmapCliffAvoidance);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MobilityParams>, I>>(
    object: I
  ): MobilityParams {
    const message = createBaseMobilityParams();
    message.velLimit =
      object.velLimit !== undefined && object.velLimit !== null
        ? SE2VelocityLimit.fromPartial(object.velLimit)
        : undefined;
    message.bodyControl =
      object.bodyControl !== undefined && object.bodyControl !== null
        ? BodyControlParams.fromPartial(object.bodyControl)
        : undefined;
    message.locomotionHint = object.locomotionHint ?? 0;
    message.stairHint = object.stairHint ?? false;
    message.allowDegradedPerception = object.allowDegradedPerception ?? false;
    message.obstacleParams =
      object.obstacleParams !== undefined && object.obstacleParams !== null
        ? ObstacleParams.fromPartial(object.obstacleParams)
        : undefined;
    message.swingHeight = object.swingHeight ?? 0;
    message.terrainParams =
      object.terrainParams !== undefined && object.terrainParams !== null
        ? TerrainParams.fromPartial(object.terrainParams)
        : undefined;
    message.disallowStairTracker = object.disallowStairTracker ?? false;
    message.disableStairErrorAutoDescent =
      object.disableStairErrorAutoDescent ?? false;
    message.externalForceParams =
      object.externalForceParams !== undefined &&
      object.externalForceParams !== null
        ? BodyExternalForceParams.fromPartial(object.externalForceParams)
        : undefined;
    message.disallowNonStairsPitchLimiting =
      object.disallowNonStairsPitchLimiting ?? false;
    message.disableNearmapCliffAvoidance =
      object.disableNearmapCliffAvoidance ?? false;
    return message;
  },
};

function createBaseBodyControlParams(): BodyControlParams {
  return {
    baseOffsetRtFootprint: undefined,
    bodyAssistForManipulation: undefined,
    rotationSetting: 0,
  };
}

export const BodyControlParams = {
  encode(
    message: BodyControlParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.baseOffsetRtFootprint !== undefined) {
      SE3Trajectory.encode(
        message.baseOffsetRtFootprint,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.bodyAssistForManipulation !== undefined) {
      BodyControlParams_BodyAssistForManipulation.encode(
        message.bodyAssistForManipulation,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.rotationSetting !== 0) {
      writer.uint32(16).int32(message.rotationSetting);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BodyControlParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBodyControlParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseOffsetRtFootprint = SE3Trajectory.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.bodyAssistForManipulation =
            BodyControlParams_BodyAssistForManipulation.decode(
              reader,
              reader.uint32()
            );
          break;
        case 2:
          message.rotationSetting = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BodyControlParams {
    return {
      baseOffsetRtFootprint: isSet(object.baseOffsetRtFootprint)
        ? SE3Trajectory.fromJSON(object.baseOffsetRtFootprint)
        : undefined,
      bodyAssistForManipulation: isSet(object.bodyAssistForManipulation)
        ? BodyControlParams_BodyAssistForManipulation.fromJSON(
            object.bodyAssistForManipulation
          )
        : undefined,
      rotationSetting: isSet(object.rotationSetting)
        ? bodyControlParams_RotationSettingFromJSON(object.rotationSetting)
        : 0,
    };
  },

  toJSON(message: BodyControlParams): unknown {
    const obj: any = {};
    message.baseOffsetRtFootprint !== undefined &&
      (obj.baseOffsetRtFootprint = message.baseOffsetRtFootprint
        ? SE3Trajectory.toJSON(message.baseOffsetRtFootprint)
        : undefined);
    message.bodyAssistForManipulation !== undefined &&
      (obj.bodyAssistForManipulation = message.bodyAssistForManipulation
        ? BodyControlParams_BodyAssistForManipulation.toJSON(
            message.bodyAssistForManipulation
          )
        : undefined);
    message.rotationSetting !== undefined &&
      (obj.rotationSetting = bodyControlParams_RotationSettingToJSON(
        message.rotationSetting
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BodyControlParams>, I>>(
    object: I
  ): BodyControlParams {
    const message = createBaseBodyControlParams();
    message.baseOffsetRtFootprint =
      object.baseOffsetRtFootprint !== undefined &&
      object.baseOffsetRtFootprint !== null
        ? SE3Trajectory.fromPartial(object.baseOffsetRtFootprint)
        : undefined;
    message.bodyAssistForManipulation =
      object.bodyAssistForManipulation !== undefined &&
      object.bodyAssistForManipulation !== null
        ? BodyControlParams_BodyAssistForManipulation.fromPartial(
            object.bodyAssistForManipulation
          )
        : undefined;
    message.rotationSetting = object.rotationSetting ?? 0;
    return message;
  },
};

function createBaseBodyControlParams_BodyAssistForManipulation(): BodyControlParams_BodyAssistForManipulation {
  return { enableBodyYawAssist: false, enableHipHeightAssist: false };
}

export const BodyControlParams_BodyAssistForManipulation = {
  encode(
    message: BodyControlParams_BodyAssistForManipulation,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.enableBodyYawAssist === true) {
      writer.uint32(8).bool(message.enableBodyYawAssist);
    }
    if (message.enableHipHeightAssist === true) {
      writer.uint32(16).bool(message.enableHipHeightAssist);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): BodyControlParams_BodyAssistForManipulation {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBodyControlParams_BodyAssistForManipulation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.enableBodyYawAssist = reader.bool();
          break;
        case 2:
          message.enableHipHeightAssist = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BodyControlParams_BodyAssistForManipulation {
    return {
      enableBodyYawAssist: isSet(object.enableBodyYawAssist)
        ? Boolean(object.enableBodyYawAssist)
        : false,
      enableHipHeightAssist: isSet(object.enableHipHeightAssist)
        ? Boolean(object.enableHipHeightAssist)
        : false,
    };
  },

  toJSON(message: BodyControlParams_BodyAssistForManipulation): unknown {
    const obj: any = {};
    message.enableBodyYawAssist !== undefined &&
      (obj.enableBodyYawAssist = message.enableBodyYawAssist);
    message.enableHipHeightAssist !== undefined &&
      (obj.enableHipHeightAssist = message.enableHipHeightAssist);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<BodyControlParams_BodyAssistForManipulation>, I>
  >(object: I): BodyControlParams_BodyAssistForManipulation {
    const message = createBaseBodyControlParams_BodyAssistForManipulation();
    message.enableBodyYawAssist = object.enableBodyYawAssist ?? false;
    message.enableHipHeightAssist = object.enableHipHeightAssist ?? false;
    return message;
  },
};

function createBaseObstacleParams(): ObstacleParams {
  return {
    disableVisionFootObstacleAvoidance: false,
    disableVisionFootConstraintAvoidance: false,
    disableVisionBodyObstacleAvoidance: false,
    obstacleAvoidancePadding: 0,
    disableVisionFootObstacleBodyAssist: false,
    disableVisionNegativeObstacles: false,
  };
}

export const ObstacleParams = {
  encode(
    message: ObstacleParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.disableVisionFootObstacleAvoidance === true) {
      writer.uint32(8).bool(message.disableVisionFootObstacleAvoidance);
    }
    if (message.disableVisionFootConstraintAvoidance === true) {
      writer.uint32(16).bool(message.disableVisionFootConstraintAvoidance);
    }
    if (message.disableVisionBodyObstacleAvoidance === true) {
      writer.uint32(24).bool(message.disableVisionBodyObstacleAvoidance);
    }
    if (message.obstacleAvoidancePadding !== 0) {
      writer.uint32(33).double(message.obstacleAvoidancePadding);
    }
    if (message.disableVisionFootObstacleBodyAssist === true) {
      writer.uint32(40).bool(message.disableVisionFootObstacleBodyAssist);
    }
    if (message.disableVisionNegativeObstacles === true) {
      writer.uint32(48).bool(message.disableVisionNegativeObstacles);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ObstacleParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseObstacleParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.disableVisionFootObstacleAvoidance = reader.bool();
          break;
        case 2:
          message.disableVisionFootConstraintAvoidance = reader.bool();
          break;
        case 3:
          message.disableVisionBodyObstacleAvoidance = reader.bool();
          break;
        case 4:
          message.obstacleAvoidancePadding = reader.double();
          break;
        case 5:
          message.disableVisionFootObstacleBodyAssist = reader.bool();
          break;
        case 6:
          message.disableVisionNegativeObstacles = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ObstacleParams {
    return {
      disableVisionFootObstacleAvoidance: isSet(
        object.disableVisionFootObstacleAvoidance
      )
        ? Boolean(object.disableVisionFootObstacleAvoidance)
        : false,
      disableVisionFootConstraintAvoidance: isSet(
        object.disableVisionFootConstraintAvoidance
      )
        ? Boolean(object.disableVisionFootConstraintAvoidance)
        : false,
      disableVisionBodyObstacleAvoidance: isSet(
        object.disableVisionBodyObstacleAvoidance
      )
        ? Boolean(object.disableVisionBodyObstacleAvoidance)
        : false,
      obstacleAvoidancePadding: isSet(object.obstacleAvoidancePadding)
        ? Number(object.obstacleAvoidancePadding)
        : 0,
      disableVisionFootObstacleBodyAssist: isSet(
        object.disableVisionFootObstacleBodyAssist
      )
        ? Boolean(object.disableVisionFootObstacleBodyAssist)
        : false,
      disableVisionNegativeObstacles: isSet(
        object.disableVisionNegativeObstacles
      )
        ? Boolean(object.disableVisionNegativeObstacles)
        : false,
    };
  },

  toJSON(message: ObstacleParams): unknown {
    const obj: any = {};
    message.disableVisionFootObstacleAvoidance !== undefined &&
      (obj.disableVisionFootObstacleAvoidance =
        message.disableVisionFootObstacleAvoidance);
    message.disableVisionFootConstraintAvoidance !== undefined &&
      (obj.disableVisionFootConstraintAvoidance =
        message.disableVisionFootConstraintAvoidance);
    message.disableVisionBodyObstacleAvoidance !== undefined &&
      (obj.disableVisionBodyObstacleAvoidance =
        message.disableVisionBodyObstacleAvoidance);
    message.obstacleAvoidancePadding !== undefined &&
      (obj.obstacleAvoidancePadding = message.obstacleAvoidancePadding);
    message.disableVisionFootObstacleBodyAssist !== undefined &&
      (obj.disableVisionFootObstacleBodyAssist =
        message.disableVisionFootObstacleBodyAssist);
    message.disableVisionNegativeObstacles !== undefined &&
      (obj.disableVisionNegativeObstacles =
        message.disableVisionNegativeObstacles);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ObstacleParams>, I>>(
    object: I
  ): ObstacleParams {
    const message = createBaseObstacleParams();
    message.disableVisionFootObstacleAvoidance =
      object.disableVisionFootObstacleAvoidance ?? false;
    message.disableVisionFootConstraintAvoidance =
      object.disableVisionFootConstraintAvoidance ?? false;
    message.disableVisionBodyObstacleAvoidance =
      object.disableVisionBodyObstacleAvoidance ?? false;
    message.obstacleAvoidancePadding = object.obstacleAvoidancePadding ?? 0;
    message.disableVisionFootObstacleBodyAssist =
      object.disableVisionFootObstacleBodyAssist ?? false;
    message.disableVisionNegativeObstacles =
      object.disableVisionNegativeObstacles ?? false;
    return message;
  },
};

function createBaseTerrainParams(): TerrainParams {
  return {
    groundMuHint: undefined,
    enableGratedFloor: false,
    gratedSurfacesMode: 0,
  };
}

export const TerrainParams = {
  encode(
    message: TerrainParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.groundMuHint !== undefined) {
      DoubleValue.encode(
        { value: message.groundMuHint! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.enableGratedFloor === true) {
      writer.uint32(24).bool(message.enableGratedFloor);
    }
    if (message.gratedSurfacesMode !== 0) {
      writer.uint32(32).int32(message.gratedSurfacesMode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TerrainParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTerrainParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.groundMuHint = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 3:
          message.enableGratedFloor = reader.bool();
          break;
        case 4:
          message.gratedSurfacesMode = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TerrainParams {
    return {
      groundMuHint: isSet(object.groundMuHint)
        ? Number(object.groundMuHint)
        : undefined,
      enableGratedFloor: isSet(object.enableGratedFloor)
        ? Boolean(object.enableGratedFloor)
        : false,
      gratedSurfacesMode: isSet(object.gratedSurfacesMode)
        ? terrainParams_GratedSurfacesModeFromJSON(object.gratedSurfacesMode)
        : 0,
    };
  },

  toJSON(message: TerrainParams): unknown {
    const obj: any = {};
    message.groundMuHint !== undefined &&
      (obj.groundMuHint = message.groundMuHint);
    message.enableGratedFloor !== undefined &&
      (obj.enableGratedFloor = message.enableGratedFloor);
    message.gratedSurfacesMode !== undefined &&
      (obj.gratedSurfacesMode = terrainParams_GratedSurfacesModeToJSON(
        message.gratedSurfacesMode
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TerrainParams>, I>>(
    object: I
  ): TerrainParams {
    const message = createBaseTerrainParams();
    message.groundMuHint = object.groundMuHint ?? undefined;
    message.enableGratedFloor = object.enableGratedFloor ?? false;
    message.gratedSurfacesMode = object.gratedSurfacesMode ?? 0;
    return message;
  },
};

function createBaseBodyExternalForceParams(): BodyExternalForceParams {
  return {
    externalForceIndicator: 0,
    frameName: "",
    externalForceOverride: undefined,
  };
}

export const BodyExternalForceParams = {
  encode(
    message: BodyExternalForceParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.externalForceIndicator !== 0) {
      writer.uint32(8).int32(message.externalForceIndicator);
    }
    if (message.frameName !== "") {
      writer.uint32(34).string(message.frameName);
    }
    if (message.externalForceOverride !== undefined) {
      Vec3.encode(
        message.externalForceOverride,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): BodyExternalForceParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBodyExternalForceParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.externalForceIndicator = reader.int32() as any;
          break;
        case 4:
          message.frameName = reader.string();
          break;
        case 3:
          message.externalForceOverride = Vec3.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BodyExternalForceParams {
    return {
      externalForceIndicator: isSet(object.externalForceIndicator)
        ? bodyExternalForceParams_ExternalForceIndicatorFromJSON(
            object.externalForceIndicator
          )
        : 0,
      frameName: isSet(object.frameName) ? String(object.frameName) : "",
      externalForceOverride: isSet(object.externalForceOverride)
        ? Vec3.fromJSON(object.externalForceOverride)
        : undefined,
    };
  },

  toJSON(message: BodyExternalForceParams): unknown {
    const obj: any = {};
    message.externalForceIndicator !== undefined &&
      (obj.externalForceIndicator =
        bodyExternalForceParams_ExternalForceIndicatorToJSON(
          message.externalForceIndicator
        ));
    message.frameName !== undefined && (obj.frameName = message.frameName);
    message.externalForceOverride !== undefined &&
      (obj.externalForceOverride = message.externalForceOverride
        ? Vec3.toJSON(message.externalForceOverride)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BodyExternalForceParams>, I>>(
    object: I
  ): BodyExternalForceParams {
    const message = createBaseBodyExternalForceParams();
    message.externalForceIndicator = object.externalForceIndicator ?? 0;
    message.frameName = object.frameName ?? "";
    message.externalForceOverride =
      object.externalForceOverride !== undefined &&
      object.externalForceOverride !== null
        ? Vec3.fromPartial(object.externalForceOverride)
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
