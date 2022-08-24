/* eslint-disable */
import { SE3Pose, Vec3 } from "./geometry";
import { SE3Trajectory } from "./trajectory";
import { ArmJointPosition } from "./arm_command";
import { ClawGripperCommand_Request } from "./gripper_command";
import _m0 from "protobufjs/minimal";
import { DoubleValue } from "../../google/protobuf/wrappers";

export const protobufPackage = "bosdyn.api";

/**
 * ArmSurfaceContact lets you accurately move the robot's arm in the world while having some ability
 * to perform force control.  This mode is useful for drawing, wiping, and other similar behaviors.
 *
 * The message is similar to the ArmCartesianCommand message, which you can look at for additional
 * details.
 */
export interface ArmSurfaceContact {}

export interface ArmSurfaceContact_Request {
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
   * a frame with it's origin slightly in front of the gripper's palm plate aligned with wrists orientation.
   */
  wristTformTool: SE3Pose | undefined;
  /**
   * The fields below are specified in this optional task frame.  If unset int defaults
   * to the identity transform and all quantities are therefore expressed in the root_frame_name.
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
   * before the arm will stop moving and cancel the rest of the trajectory. When this limit is exceeded, the
   * hand will stay at the pose it was at when it exceeded the tracking error, and any other part of the
   * trajectory specified in the rest of this message will be ignored.
   * max position tracking error in meters
   */
  maxPosTrackingError: number | undefined;
  /** max orientation tracking error in radians */
  maxRotTrackingError: number | undefined;
  forceRemainNearCurrentJointConfiguration: boolean | undefined;
  preferredJointConfiguration: ArmJointPosition | undefined;
  xAxis: ArmSurfaceContact_Request_AxisMode;
  yAxis: ArmSurfaceContact_Request_AxisMode;
  zAxis: ArmSurfaceContact_Request_AxisMode;
  /**
   * Amount of force to use on each axis, from 0 (no force) to 1.0 (maximum force), can also
   * be negative.  Full range: [-1.0, 1.0]
   */
  pressForcePercentage: Vec3 | undefined;
  /** Admittance settings for each axis in the admittance frame. */
  xyAdmittance: ArmSurfaceContact_Request_AdmittanceSetting;
  zAdmittance: ArmSurfaceContact_Request_AdmittanceSetting;
  /**
   * Cross term, making force in the XY axis cause movement in the z-axis.
   * By default is OFF
   * Setting this value will make the arm move in the negative Z-axis whenever it feels force in
   * the XY axis.
   */
  xyToZCrossTermAdmittance: ArmSurfaceContact_Request_AdmittanceSetting;
  /**
   * Specifies a force that the body should expect to feel.  This allows the robot to "lean into"
   * an external force.  Be careful using this field, because if you lie to the robot, it can
   * fall over.
   */
  biasForceEwrtBody: Vec3 | undefined;
  /** Gripper control */
  gripperCommand: ClawGripperCommand_Request | undefined;
  /** Set to true to have robot is walk around to follow the hand. */
  isRobotFollowingHand: boolean;
}

/**
 * If an axis is set to position mode (default), read desired from SE3Trajectory command.
 * If mode is set to force, use the "press_force_percentage" field to determine force.
 */
export enum ArmSurfaceContact_Request_AxisMode {
  AXIS_MODE_POSITION = 0,
  AXIS_MODE_FORCE = 1,
  UNRECOGNIZED = -1,
}

export function armSurfaceContact_Request_AxisModeFromJSON(
  object: any
): ArmSurfaceContact_Request_AxisMode {
  switch (object) {
    case 0:
    case "AXIS_MODE_POSITION":
      return ArmSurfaceContact_Request_AxisMode.AXIS_MODE_POSITION;
    case 1:
    case "AXIS_MODE_FORCE":
      return ArmSurfaceContact_Request_AxisMode.AXIS_MODE_FORCE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ArmSurfaceContact_Request_AxisMode.UNRECOGNIZED;
  }
}

export function armSurfaceContact_Request_AxisModeToJSON(
  object: ArmSurfaceContact_Request_AxisMode
): string {
  switch (object) {
    case ArmSurfaceContact_Request_AxisMode.AXIS_MODE_POSITION:
      return "AXIS_MODE_POSITION";
    case ArmSurfaceContact_Request_AxisMode.AXIS_MODE_FORCE:
      return "AXIS_MODE_FORCE";
    case ArmSurfaceContact_Request_AxisMode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Parameters for controlling admittance.  By default, the robot will
 * stop moving the arm when it encounters resistance.  You can control that reaction to
 * make the robot stiffer or less stiff by changing the parameters.
 */
export enum ArmSurfaceContact_Request_AdmittanceSetting {
  ADMITTANCE_SETTING_UNKNOWN = 0,
  /** ADMITTANCE_SETTING_OFF - No admittance. */
  ADMITTANCE_SETTING_OFF = 1,
  /** ADMITTANCE_SETTING_NORMAL - Normal reaction to touching things in the world */
  ADMITTANCE_SETTING_NORMAL = 2,
  /** ADMITTANCE_SETTING_LOOSE - Robot will not push very hard against objects */
  ADMITTANCE_SETTING_LOOSE = 3,
  /** ADMITTANCE_SETTING_STIFF - Robot will push hard against the world */
  ADMITTANCE_SETTING_STIFF = 4,
  /** ADMITTANCE_SETTING_VERY_STIFF - Robot will push very hard against the world */
  ADMITTANCE_SETTING_VERY_STIFF = 5,
  UNRECOGNIZED = -1,
}

export function armSurfaceContact_Request_AdmittanceSettingFromJSON(
  object: any
): ArmSurfaceContact_Request_AdmittanceSetting {
  switch (object) {
    case 0:
    case "ADMITTANCE_SETTING_UNKNOWN":
      return ArmSurfaceContact_Request_AdmittanceSetting.ADMITTANCE_SETTING_UNKNOWN;
    case 1:
    case "ADMITTANCE_SETTING_OFF":
      return ArmSurfaceContact_Request_AdmittanceSetting.ADMITTANCE_SETTING_OFF;
    case 2:
    case "ADMITTANCE_SETTING_NORMAL":
      return ArmSurfaceContact_Request_AdmittanceSetting.ADMITTANCE_SETTING_NORMAL;
    case 3:
    case "ADMITTANCE_SETTING_LOOSE":
      return ArmSurfaceContact_Request_AdmittanceSetting.ADMITTANCE_SETTING_LOOSE;
    case 4:
    case "ADMITTANCE_SETTING_STIFF":
      return ArmSurfaceContact_Request_AdmittanceSetting.ADMITTANCE_SETTING_STIFF;
    case 5:
    case "ADMITTANCE_SETTING_VERY_STIFF":
      return ArmSurfaceContact_Request_AdmittanceSetting.ADMITTANCE_SETTING_VERY_STIFF;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ArmSurfaceContact_Request_AdmittanceSetting.UNRECOGNIZED;
  }
}

export function armSurfaceContact_Request_AdmittanceSettingToJSON(
  object: ArmSurfaceContact_Request_AdmittanceSetting
): string {
  switch (object) {
    case ArmSurfaceContact_Request_AdmittanceSetting.ADMITTANCE_SETTING_UNKNOWN:
      return "ADMITTANCE_SETTING_UNKNOWN";
    case ArmSurfaceContact_Request_AdmittanceSetting.ADMITTANCE_SETTING_OFF:
      return "ADMITTANCE_SETTING_OFF";
    case ArmSurfaceContact_Request_AdmittanceSetting.ADMITTANCE_SETTING_NORMAL:
      return "ADMITTANCE_SETTING_NORMAL";
    case ArmSurfaceContact_Request_AdmittanceSetting.ADMITTANCE_SETTING_LOOSE:
      return "ADMITTANCE_SETTING_LOOSE";
    case ArmSurfaceContact_Request_AdmittanceSetting.ADMITTANCE_SETTING_STIFF:
      return "ADMITTANCE_SETTING_STIFF";
    case ArmSurfaceContact_Request_AdmittanceSetting.ADMITTANCE_SETTING_VERY_STIFF:
      return "ADMITTANCE_SETTING_VERY_STIFF";
    case ArmSurfaceContact_Request_AdmittanceSetting.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ArmSurfaceContact_Feedback {}

function createBaseArmSurfaceContact(): ArmSurfaceContact {
  return {};
}

export const ArmSurfaceContact = {
  encode(
    _: ArmSurfaceContact,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ArmSurfaceContact {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArmSurfaceContact();
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

  fromJSON(_: any): ArmSurfaceContact {
    return {};
  },

  toJSON(_: ArmSurfaceContact): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ArmSurfaceContact>, I>>(
    _: I
  ): ArmSurfaceContact {
    const message = createBaseArmSurfaceContact();
    return message;
  },
};

function createBaseArmSurfaceContact_Request(): ArmSurfaceContact_Request {
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
    pressForcePercentage: undefined,
    xyAdmittance: 0,
    zAdmittance: 0,
    xyToZCrossTermAdmittance: 0,
    biasForceEwrtBody: undefined,
    gripperCommand: undefined,
    isRobotFollowingHand: false,
  };
}

export const ArmSurfaceContact_Request = {
  encode(
    message: ArmSurfaceContact_Request,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.rootFrameName !== "") {
      writer.uint32(202).string(message.rootFrameName);
    }
    if (message.wristTformTool !== undefined) {
      SE3Pose.encode(message.wristTformTool, writer.uint32(50).fork()).ldelim();
    }
    if (message.rootTformTask !== undefined) {
      SE3Pose.encode(message.rootTformTask, writer.uint32(210).fork()).ldelim();
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
        writer.uint32(146).fork()
      ).ldelim();
    }
    if (message.maxRotTrackingError !== undefined) {
      DoubleValue.encode(
        { value: message.maxRotTrackingError! },
        writer.uint32(154).fork()
      ).ldelim();
    }
    if (message.forceRemainNearCurrentJointConfiguration !== undefined) {
      writer.uint32(120).bool(message.forceRemainNearCurrentJointConfiguration);
    }
    if (message.preferredJointConfiguration !== undefined) {
      ArmJointPosition.encode(
        message.preferredJointConfiguration,
        writer.uint32(130).fork()
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
    if (message.pressForcePercentage !== undefined) {
      Vec3.encode(
        message.pressForcePercentage,
        writer.uint32(98).fork()
      ).ldelim();
    }
    if (message.xyAdmittance !== 0) {
      writer.uint32(168).int32(message.xyAdmittance);
    }
    if (message.zAdmittance !== 0) {
      writer.uint32(176).int32(message.zAdmittance);
    }
    if (message.xyToZCrossTermAdmittance !== 0) {
      writer.uint32(136).int32(message.xyToZCrossTermAdmittance);
    }
    if (message.biasForceEwrtBody !== undefined) {
      Vec3.encode(
        message.biasForceEwrtBody,
        writer.uint32(162).fork()
      ).ldelim();
    }
    if (message.gripperCommand !== undefined) {
      ClawGripperCommand_Request.encode(
        message.gripperCommand,
        writer.uint32(186).fork()
      ).ldelim();
    }
    if (message.isRobotFollowingHand === true) {
      writer.uint32(192).bool(message.isRobotFollowingHand);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ArmSurfaceContact_Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArmSurfaceContact_Request();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 25:
          message.rootFrameName = reader.string();
          break;
        case 6:
          message.wristTformTool = SE3Pose.decode(reader, reader.uint32());
          break;
        case 26:
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
        case 18:
          message.maxPosTrackingError = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 19:
          message.maxRotTrackingError = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 15:
          message.forceRemainNearCurrentJointConfiguration = reader.bool();
          break;
        case 16:
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
        case 12:
          message.pressForcePercentage = Vec3.decode(reader, reader.uint32());
          break;
        case 21:
          message.xyAdmittance = reader.int32() as any;
          break;
        case 22:
          message.zAdmittance = reader.int32() as any;
          break;
        case 17:
          message.xyToZCrossTermAdmittance = reader.int32() as any;
          break;
        case 20:
          message.biasForceEwrtBody = Vec3.decode(reader, reader.uint32());
          break;
        case 23:
          message.gripperCommand = ClawGripperCommand_Request.decode(
            reader,
            reader.uint32()
          );
          break;
        case 24:
          message.isRobotFollowingHand = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ArmSurfaceContact_Request {
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
        ? armSurfaceContact_Request_AxisModeFromJSON(object.xAxis)
        : 0,
      yAxis: isSet(object.yAxis)
        ? armSurfaceContact_Request_AxisModeFromJSON(object.yAxis)
        : 0,
      zAxis: isSet(object.zAxis)
        ? armSurfaceContact_Request_AxisModeFromJSON(object.zAxis)
        : 0,
      pressForcePercentage: isSet(object.pressForcePercentage)
        ? Vec3.fromJSON(object.pressForcePercentage)
        : undefined,
      xyAdmittance: isSet(object.xyAdmittance)
        ? armSurfaceContact_Request_AdmittanceSettingFromJSON(
            object.xyAdmittance
          )
        : 0,
      zAdmittance: isSet(object.zAdmittance)
        ? armSurfaceContact_Request_AdmittanceSettingFromJSON(
            object.zAdmittance
          )
        : 0,
      xyToZCrossTermAdmittance: isSet(object.xyToZCrossTermAdmittance)
        ? armSurfaceContact_Request_AdmittanceSettingFromJSON(
            object.xyToZCrossTermAdmittance
          )
        : 0,
      biasForceEwrtBody: isSet(object.biasForceEwrtBody)
        ? Vec3.fromJSON(object.biasForceEwrtBody)
        : undefined,
      gripperCommand: isSet(object.gripperCommand)
        ? ClawGripperCommand_Request.fromJSON(object.gripperCommand)
        : undefined,
      isRobotFollowingHand: isSet(object.isRobotFollowingHand)
        ? Boolean(object.isRobotFollowingHand)
        : false,
    };
  },

  toJSON(message: ArmSurfaceContact_Request): unknown {
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
      (obj.xAxis = armSurfaceContact_Request_AxisModeToJSON(message.xAxis));
    message.yAxis !== undefined &&
      (obj.yAxis = armSurfaceContact_Request_AxisModeToJSON(message.yAxis));
    message.zAxis !== undefined &&
      (obj.zAxis = armSurfaceContact_Request_AxisModeToJSON(message.zAxis));
    message.pressForcePercentage !== undefined &&
      (obj.pressForcePercentage = message.pressForcePercentage
        ? Vec3.toJSON(message.pressForcePercentage)
        : undefined);
    message.xyAdmittance !== undefined &&
      (obj.xyAdmittance = armSurfaceContact_Request_AdmittanceSettingToJSON(
        message.xyAdmittance
      ));
    message.zAdmittance !== undefined &&
      (obj.zAdmittance = armSurfaceContact_Request_AdmittanceSettingToJSON(
        message.zAdmittance
      ));
    message.xyToZCrossTermAdmittance !== undefined &&
      (obj.xyToZCrossTermAdmittance =
        armSurfaceContact_Request_AdmittanceSettingToJSON(
          message.xyToZCrossTermAdmittance
        ));
    message.biasForceEwrtBody !== undefined &&
      (obj.biasForceEwrtBody = message.biasForceEwrtBody
        ? Vec3.toJSON(message.biasForceEwrtBody)
        : undefined);
    message.gripperCommand !== undefined &&
      (obj.gripperCommand = message.gripperCommand
        ? ClawGripperCommand_Request.toJSON(message.gripperCommand)
        : undefined);
    message.isRobotFollowingHand !== undefined &&
      (obj.isRobotFollowingHand = message.isRobotFollowingHand);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ArmSurfaceContact_Request>, I>>(
    object: I
  ): ArmSurfaceContact_Request {
    const message = createBaseArmSurfaceContact_Request();
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
    message.pressForcePercentage =
      object.pressForcePercentage !== undefined &&
      object.pressForcePercentage !== null
        ? Vec3.fromPartial(object.pressForcePercentage)
        : undefined;
    message.xyAdmittance = object.xyAdmittance ?? 0;
    message.zAdmittance = object.zAdmittance ?? 0;
    message.xyToZCrossTermAdmittance = object.xyToZCrossTermAdmittance ?? 0;
    message.biasForceEwrtBody =
      object.biasForceEwrtBody !== undefined &&
      object.biasForceEwrtBody !== null
        ? Vec3.fromPartial(object.biasForceEwrtBody)
        : undefined;
    message.gripperCommand =
      object.gripperCommand !== undefined && object.gripperCommand !== null
        ? ClawGripperCommand_Request.fromPartial(object.gripperCommand)
        : undefined;
    message.isRobotFollowingHand = object.isRobotFollowingHand ?? false;
    return message;
  },
};

function createBaseArmSurfaceContact_Feedback(): ArmSurfaceContact_Feedback {
  return {};
}

export const ArmSurfaceContact_Feedback = {
  encode(
    _: ArmSurfaceContact_Feedback,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ArmSurfaceContact_Feedback {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArmSurfaceContact_Feedback();
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

  fromJSON(_: any): ArmSurfaceContact_Feedback {
    return {};
  },

  toJSON(_: ArmSurfaceContact_Feedback): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ArmSurfaceContact_Feedback>, I>>(
    _: I
  ): ArmSurfaceContact_Feedback {
    const message = createBaseArmSurfaceContact_Feedback();
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
