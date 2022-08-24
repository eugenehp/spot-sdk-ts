/* eslint-disable */
import {
  ServiceFault_Severity,
  ServiceFault,
  serviceFault_SeverityFromJSON,
  serviceFault_SeverityToJSON,
} from "./service_fault";
import { Timestamp } from "../../google/protobuf/timestamp";
import Long from "long";
import { Duration } from "../../google/protobuf/duration";
import { FrameTreeSnapshot, SE3Velocity, Vec3 } from "./geometry";
import { Parameter } from "./parameter";
import { RequestHeader, ResponseHeader } from "./header";
import _m0 from "protobufjs/minimal";
import { DoubleValue } from "../../google/protobuf/wrappers";

export const protobufPackage = "bosdyn.api";

/** Kinematic model of the robot skeleton. */
export interface Skeleton {
  /** The list of links that make up the robot skeleton. */
  links: Skeleton_Link[];
  /** URDF description of the robot skeleton. */
  urdf: string;
}

/** Each link of the robot skeleton. */
export interface Skeleton_Link {
  /** The link name, which matches those used in the urdf. */
  name: string;
  /** The OBJ file representing the model of this link. */
  objModel: Skeleton_Link_ObjModel | undefined;
}

/**
 * Model to draw, expressed as an obj file.
 * Note: To limit the size of responses, obj_file_contents might be omitted.
 */
export interface Skeleton_Link_ObjModel {
  /** Name of the file. */
  fileName: string;
  /** The contents of the file. */
  fileContents: string;
}

/** Robot Hardware Configuration, described with the robot skeleton. */
export interface HardwareConfiguration {
  /** Robot link and joint description. */
  skeleton: Skeleton | undefined;
  /** Turn off the robot. Same as physical switch. */
  canPowerCommandRequestOffRobot: boolean;
  /** Power cycle the robot. Same as physical switch. */
  canPowerCommandRequestCycleRobot: boolean;
  /** Control power to the payload ports. */
  canPowerCommandRequestPayloadPorts: boolean;
  /** Control power to the hardware Wi-Fi radio. */
  canPowerCommandRequestWifiRadio: boolean;
}

/** The current state of the robot. */
export interface RobotState {
  /** Power state (e.g. motor power). */
  powerState: PowerState | undefined;
  /** Battery state (e.g. charge, temperature, current). */
  batteryStates: BatteryState[];
  /** Communication state (e.g. type of comms network). */
  commsStates: CommsState[];
  /** Different system faults for the robot. */
  systemFaultState: SystemFaultState | undefined;
  /**
   * Because there may be multiple E-Stops, and because E-Stops may be supplied with payloads,
   * this is a repeated field instead of a hardcoded list.
   */
  estopStates: EStopState[];
  /** Kinematic state of the robot (e.g. positions, velocities, other frame information). */
  kinematicState: KinematicState | undefined;
  /** Robot behavior fault state. */
  behaviorFaultState: BehaviorFaultState | undefined;
  /** The foot states (and contact information). */
  footState: FootState[];
  /** / State of the manipulator, only populated if an arm is attached to the robot. */
  manipulatorState: ManipulatorState | undefined;
  /** Service faults for services registered with the robot. */
  serviceFaultState: ServiceFaultState | undefined;
  /** Relevant terrain data beneath and around the robot */
  terrainState: TerrainState | undefined;
}

/**
 * The power state for the robot.
 * If a robot is not in the POWER OFF state, if is not safe to approach.
 * The robot must not be E-Stopped to enter the POWER_ON state.
 */
export interface PowerState {
  /** Robot clock timestamp corresponding to these readings. */
  timestamp: Date | undefined;
  /** The motor power state of the robot. */
  motorPowerState: PowerState_MotorPowerState;
  /** The shore power state of the robot. */
  shorePowerState: PowerState_ShorePowerState;
  /** The payload ports power state of the robot. */
  robotPowerState: PowerState_RobotPowerState;
  /** The payload ports power state of the robot. */
  payloadPortsPowerState: PowerState_PayloadPortsPowerState;
  /** The hardware radio power state of the robot. */
  wifiRadioPowerState: PowerState_WifiRadioPowerState;
  /**
   * Number from 0 (empty) to 100 (full) indicating the estimated state of charge.
   * This field provides a summary of the BatteryStates that provide power for motor and/or
   * base compute power, both of which are required for locomotion.
   */
  locomotionChargePercentage: number | undefined;
  /**
   * An estimate of remaining runtime. Note that this field might not be populated.
   * This field provides a summary of the BatteryStates that provide power for motor and/or
   * base compute power, both of which are required for locomotion.
   */
  locomotionEstimatedRuntime: Duration | undefined;
}

export enum PowerState_MotorPowerState {
  /**
   * STATE_UNKNOWN - Unknown motor power state. Do not use this field.
   *
   * @deprecated
   */
  STATE_UNKNOWN = 0,
  MOTOR_POWER_STATE_UNKNOWN = 0,
  /**
   * STATE_OFF - Motors are off, the robot is safe to approach.
   *
   * @deprecated
   */
  STATE_OFF = 1,
  MOTOR_POWER_STATE_OFF = 1,
  /**
   * STATE_ON - The motors are powered.
   *
   * @deprecated
   */
  STATE_ON = 2,
  MOTOR_POWER_STATE_ON = 2,
  /**
   * STATE_POWERING_ON - The robot has received an ON command, and is turning on.
   *
   * @deprecated
   */
  STATE_POWERING_ON = 3,
  MOTOR_POWER_STATE_POWERING_ON = 3,
  /**
   * STATE_POWERING_OFF - In the process of powering down, not yet safe to approach.
   *
   * @deprecated
   */
  STATE_POWERING_OFF = 4,
  MOTOR_POWER_STATE_POWERING_OFF = 4,
  /**
   * STATE_ERROR - The robot is in an error state and must be powered off before attempting to re-power.
   *
   * @deprecated
   */
  STATE_ERROR = 5,
  MOTOR_POWER_STATE_ERROR = 5,
  UNRECOGNIZED = -1,
}

export function powerState_MotorPowerStateFromJSON(
  object: any
): PowerState_MotorPowerState {
  switch (object) {
    case 0:
    case "STATE_UNKNOWN":
      return PowerState_MotorPowerState.STATE_UNKNOWN;
    case 0:
    case "MOTOR_POWER_STATE_UNKNOWN":
      return PowerState_MotorPowerState.MOTOR_POWER_STATE_UNKNOWN;
    case 1:
    case "STATE_OFF":
      return PowerState_MotorPowerState.STATE_OFF;
    case 1:
    case "MOTOR_POWER_STATE_OFF":
      return PowerState_MotorPowerState.MOTOR_POWER_STATE_OFF;
    case 2:
    case "STATE_ON":
      return PowerState_MotorPowerState.STATE_ON;
    case 2:
    case "MOTOR_POWER_STATE_ON":
      return PowerState_MotorPowerState.MOTOR_POWER_STATE_ON;
    case 3:
    case "STATE_POWERING_ON":
      return PowerState_MotorPowerState.STATE_POWERING_ON;
    case 3:
    case "MOTOR_POWER_STATE_POWERING_ON":
      return PowerState_MotorPowerState.MOTOR_POWER_STATE_POWERING_ON;
    case 4:
    case "STATE_POWERING_OFF":
      return PowerState_MotorPowerState.STATE_POWERING_OFF;
    case 4:
    case "MOTOR_POWER_STATE_POWERING_OFF":
      return PowerState_MotorPowerState.MOTOR_POWER_STATE_POWERING_OFF;
    case 5:
    case "STATE_ERROR":
      return PowerState_MotorPowerState.STATE_ERROR;
    case 5:
    case "MOTOR_POWER_STATE_ERROR":
      return PowerState_MotorPowerState.MOTOR_POWER_STATE_ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PowerState_MotorPowerState.UNRECOGNIZED;
  }
}

export function powerState_MotorPowerStateToJSON(
  object: PowerState_MotorPowerState
): string {
  switch (object) {
    case PowerState_MotorPowerState.STATE_UNKNOWN:
      return "STATE_UNKNOWN";
    case PowerState_MotorPowerState.MOTOR_POWER_STATE_UNKNOWN:
      return "MOTOR_POWER_STATE_UNKNOWN";
    case PowerState_MotorPowerState.STATE_OFF:
      return "STATE_OFF";
    case PowerState_MotorPowerState.MOTOR_POWER_STATE_OFF:
      return "MOTOR_POWER_STATE_OFF";
    case PowerState_MotorPowerState.STATE_ON:
      return "STATE_ON";
    case PowerState_MotorPowerState.MOTOR_POWER_STATE_ON:
      return "MOTOR_POWER_STATE_ON";
    case PowerState_MotorPowerState.STATE_POWERING_ON:
      return "STATE_POWERING_ON";
    case PowerState_MotorPowerState.MOTOR_POWER_STATE_POWERING_ON:
      return "MOTOR_POWER_STATE_POWERING_ON";
    case PowerState_MotorPowerState.STATE_POWERING_OFF:
      return "STATE_POWERING_OFF";
    case PowerState_MotorPowerState.MOTOR_POWER_STATE_POWERING_OFF:
      return "MOTOR_POWER_STATE_POWERING_OFF";
    case PowerState_MotorPowerState.STATE_ERROR:
      return "STATE_ERROR";
    case PowerState_MotorPowerState.MOTOR_POWER_STATE_ERROR:
      return "MOTOR_POWER_STATE_ERROR";
    case PowerState_MotorPowerState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * State describing if robot is connected to shore (wall) power. Robot can't be powered on
 * while on shore power
 */
export enum PowerState_ShorePowerState {
  /**
   * STATE_UNKNOWN_SHORE_POWER - Unknown shore power state. Do not use.
   *
   * @deprecated
   */
  STATE_UNKNOWN_SHORE_POWER = 0,
  SHORE_POWER_STATE_UNKNOWN = 0,
  /**
   * STATE_ON_SHORE_POWER - The robot is connected to shore power. The robot will not power on while connected to
   * shore power.
   *
   * @deprecated
   */
  STATE_ON_SHORE_POWER = 1,
  SHORE_POWER_STATE_ON = 1,
  /**
   * STATE_OFF_SHORE_POWER - The robot is disconnected from shore power and motors can be powered up.
   *
   * @deprecated
   */
  STATE_OFF_SHORE_POWER = 2,
  SHORE_POWER_STATE_OFF = 2,
  UNRECOGNIZED = -1,
}

export function powerState_ShorePowerStateFromJSON(
  object: any
): PowerState_ShorePowerState {
  switch (object) {
    case 0:
    case "STATE_UNKNOWN_SHORE_POWER":
      return PowerState_ShorePowerState.STATE_UNKNOWN_SHORE_POWER;
    case 0:
    case "SHORE_POWER_STATE_UNKNOWN":
      return PowerState_ShorePowerState.SHORE_POWER_STATE_UNKNOWN;
    case 1:
    case "STATE_ON_SHORE_POWER":
      return PowerState_ShorePowerState.STATE_ON_SHORE_POWER;
    case 1:
    case "SHORE_POWER_STATE_ON":
      return PowerState_ShorePowerState.SHORE_POWER_STATE_ON;
    case 2:
    case "STATE_OFF_SHORE_POWER":
      return PowerState_ShorePowerState.STATE_OFF_SHORE_POWER;
    case 2:
    case "SHORE_POWER_STATE_OFF":
      return PowerState_ShorePowerState.SHORE_POWER_STATE_OFF;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PowerState_ShorePowerState.UNRECOGNIZED;
  }
}

export function powerState_ShorePowerStateToJSON(
  object: PowerState_ShorePowerState
): string {
  switch (object) {
    case PowerState_ShorePowerState.STATE_UNKNOWN_SHORE_POWER:
      return "STATE_UNKNOWN_SHORE_POWER";
    case PowerState_ShorePowerState.SHORE_POWER_STATE_UNKNOWN:
      return "SHORE_POWER_STATE_UNKNOWN";
    case PowerState_ShorePowerState.STATE_ON_SHORE_POWER:
      return "STATE_ON_SHORE_POWER";
    case PowerState_ShorePowerState.SHORE_POWER_STATE_ON:
      return "SHORE_POWER_STATE_ON";
    case PowerState_ShorePowerState.STATE_OFF_SHORE_POWER:
      return "STATE_OFF_SHORE_POWER";
    case PowerState_ShorePowerState.SHORE_POWER_STATE_OFF:
      return "SHORE_POWER_STATE_OFF";
    case PowerState_ShorePowerState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** State describing if the robot has power. */
export enum PowerState_RobotPowerState {
  /** ROBOT_POWER_STATE_UNKNOWN - Unknown robot power state. Do not use this field. */
  ROBOT_POWER_STATE_UNKNOWN = 0,
  /** ROBOT_POWER_STATE_ON - The robot is powered on. */
  ROBOT_POWER_STATE_ON = 1,
  /**
   * ROBOT_POWER_STATE_OFF - The robot does not have power.
   * Impossible to get this response, as the robot cannot respond if it is powered off.
   */
  ROBOT_POWER_STATE_OFF = 2,
  UNRECOGNIZED = -1,
}

export function powerState_RobotPowerStateFromJSON(
  object: any
): PowerState_RobotPowerState {
  switch (object) {
    case 0:
    case "ROBOT_POWER_STATE_UNKNOWN":
      return PowerState_RobotPowerState.ROBOT_POWER_STATE_UNKNOWN;
    case 1:
    case "ROBOT_POWER_STATE_ON":
      return PowerState_RobotPowerState.ROBOT_POWER_STATE_ON;
    case 2:
    case "ROBOT_POWER_STATE_OFF":
      return PowerState_RobotPowerState.ROBOT_POWER_STATE_OFF;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PowerState_RobotPowerState.UNRECOGNIZED;
  }
}

export function powerState_RobotPowerStateToJSON(
  object: PowerState_RobotPowerState
): string {
  switch (object) {
    case PowerState_RobotPowerState.ROBOT_POWER_STATE_UNKNOWN:
      return "ROBOT_POWER_STATE_UNKNOWN";
    case PowerState_RobotPowerState.ROBOT_POWER_STATE_ON:
      return "ROBOT_POWER_STATE_ON";
    case PowerState_RobotPowerState.ROBOT_POWER_STATE_OFF:
      return "ROBOT_POWER_STATE_OFF";
    case PowerState_RobotPowerState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** State describing if the payload port has power. */
export enum PowerState_PayloadPortsPowerState {
  /** PAYLOAD_PORTS_POWER_STATE_UNKNOWN - Unknown payload port power state. Do not use this field. */
  PAYLOAD_PORTS_POWER_STATE_UNKNOWN = 0,
  /** PAYLOAD_PORTS_POWER_STATE_ON - The payload port is powered on. */
  PAYLOAD_PORTS_POWER_STATE_ON = 1,
  /** PAYLOAD_PORTS_POWER_STATE_OFF - The payload port does not have power. */
  PAYLOAD_PORTS_POWER_STATE_OFF = 2,
  UNRECOGNIZED = -1,
}

export function powerState_PayloadPortsPowerStateFromJSON(
  object: any
): PowerState_PayloadPortsPowerState {
  switch (object) {
    case 0:
    case "PAYLOAD_PORTS_POWER_STATE_UNKNOWN":
      return PowerState_PayloadPortsPowerState.PAYLOAD_PORTS_POWER_STATE_UNKNOWN;
    case 1:
    case "PAYLOAD_PORTS_POWER_STATE_ON":
      return PowerState_PayloadPortsPowerState.PAYLOAD_PORTS_POWER_STATE_ON;
    case 2:
    case "PAYLOAD_PORTS_POWER_STATE_OFF":
      return PowerState_PayloadPortsPowerState.PAYLOAD_PORTS_POWER_STATE_OFF;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PowerState_PayloadPortsPowerState.UNRECOGNIZED;
  }
}

export function powerState_PayloadPortsPowerStateToJSON(
  object: PowerState_PayloadPortsPowerState
): string {
  switch (object) {
    case PowerState_PayloadPortsPowerState.PAYLOAD_PORTS_POWER_STATE_UNKNOWN:
      return "PAYLOAD_PORTS_POWER_STATE_UNKNOWN";
    case PowerState_PayloadPortsPowerState.PAYLOAD_PORTS_POWER_STATE_ON:
      return "PAYLOAD_PORTS_POWER_STATE_ON";
    case PowerState_PayloadPortsPowerState.PAYLOAD_PORTS_POWER_STATE_OFF:
      return "PAYLOAD_PORTS_POWER_STATE_OFF";
    case PowerState_PayloadPortsPowerState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** State describing if the robot Wi-Fi router has power. */
export enum PowerState_WifiRadioPowerState {
  /** WIFI_RADIO_POWER_STATE_UNKNOWN - Unknown radio power state. Do not use this field. */
  WIFI_RADIO_POWER_STATE_UNKNOWN = 0,
  /** WIFI_RADIO_POWER_STATE_ON - The radio is powered on. */
  WIFI_RADIO_POWER_STATE_ON = 1,
  /** WIFI_RADIO_POWER_STATE_OFF - The radio does not have power. */
  WIFI_RADIO_POWER_STATE_OFF = 2,
  UNRECOGNIZED = -1,
}

export function powerState_WifiRadioPowerStateFromJSON(
  object: any
): PowerState_WifiRadioPowerState {
  switch (object) {
    case 0:
    case "WIFI_RADIO_POWER_STATE_UNKNOWN":
      return PowerState_WifiRadioPowerState.WIFI_RADIO_POWER_STATE_UNKNOWN;
    case 1:
    case "WIFI_RADIO_POWER_STATE_ON":
      return PowerState_WifiRadioPowerState.WIFI_RADIO_POWER_STATE_ON;
    case 2:
    case "WIFI_RADIO_POWER_STATE_OFF":
      return PowerState_WifiRadioPowerState.WIFI_RADIO_POWER_STATE_OFF;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PowerState_WifiRadioPowerState.UNRECOGNIZED;
  }
}

export function powerState_WifiRadioPowerStateToJSON(
  object: PowerState_WifiRadioPowerState
): string {
  switch (object) {
    case PowerState_WifiRadioPowerState.WIFI_RADIO_POWER_STATE_UNKNOWN:
      return "WIFI_RADIO_POWER_STATE_UNKNOWN";
    case PowerState_WifiRadioPowerState.WIFI_RADIO_POWER_STATE_ON:
      return "WIFI_RADIO_POWER_STATE_ON";
    case PowerState_WifiRadioPowerState.WIFI_RADIO_POWER_STATE_OFF:
      return "WIFI_RADIO_POWER_STATE_OFF";
    case PowerState_WifiRadioPowerState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * The current state of each system fault the robot is experiencing.
 * An "active" fault indicates a hardware/software currently on the robot.
 * A "historical" fault indicates a, now cleared, hardware/software problem.
 * Historical faults are useful to diagnose robot behavior subject to intermittent failed states.
 */
export interface SystemFaultState {
  /** Currently active faults */
  faults: SystemFault[];
  /** Inactive faults that cleared within the last 10 minutes */
  historicalFaults: SystemFault[];
  /**
   * Aggregated fault data.
   * This provides a very quick way of determining if there any
   * "battery" or "vision" faults above a certain severity level.
   */
  aggregated: { [key: string]: SystemFault_Severity };
}

export interface SystemFaultState_AggregatedEntry {
  key: string;
  value: SystemFault_Severity;
}

/**
 * The current system faults for a robot.
 * A fault is an indicator of a hardware or software problem on the robot. An
 * active fault may indicate the robot may fail to comply with a user request.
 * The exact response a fault may vary, but possible responses include: failure
 * to enable motor power, loss of perception enabled behavior, or triggering a
 * fault recovery behavior on robot.
 */
export interface SystemFault {
  /** Name of the fault. */
  name: string;
  /** Time of robot local clock at fault onset. */
  onsetTimestamp: Date | undefined;
  /** Time elapsed since onset of the fault. */
  duration: Duration | undefined;
  /**
   * Error code returned by a fault. The exact interpretation of the fault code
   * is unique to each variety of fault on the robot. The code is useful for
   * Boston Dynamics support staff to diagnose hardware/software issues on
   * robot.
   */
  code: number;
  /** Fault UID */
  uid: number;
  /** User visible description of the fault (and possibly remedies.) */
  errorMessage: string;
  /**
   * Fault attributes
   * Each fault may be flagged with attribute metadata (strings in this case.)
   * These attributes are useful to communicate that a particular fault may
   * have significant effect on robot operations. Some potential attributes
   * may be "robot", "imu", "vision", or "battery". These attributes would let
   * us flag a fault as indicating a problem with the base robot hardware,
   * gyro, perception system, or battery respectively. A fault may have, zero,
   * one, or more attributes attached to it, i.e. a "battery" fault may also
   * be considered a "robot" fault.
   */
  attributes: string[];
  /**
   * Fault severity, how bad is the fault?
   * The severity level will have some indication of the potential robot
   * response to the fault. For example, a fault marked with "battery"
   * attribute and severity level SEVERITY_WARN may indicate a low battery
   * state of charge. However a "battery" fault with severity level
   * SEVERITY_CRITICAL likely means the robot is going to shutdown
   * immediately.
   */
  severity: SystemFault_Severity;
}

export enum SystemFault_Severity {
  /** SEVERITY_UNKNOWN - Unknown severity */
  SEVERITY_UNKNOWN = 0,
  /** SEVERITY_INFO - No hardware problem */
  SEVERITY_INFO = 1,
  /** SEVERITY_WARN - Robot performance may be degraded */
  SEVERITY_WARN = 2,
  /** SEVERITY_CRITICAL - Critical fault */
  SEVERITY_CRITICAL = 3,
  UNRECOGNIZED = -1,
}

export function systemFault_SeverityFromJSON(
  object: any
): SystemFault_Severity {
  switch (object) {
    case 0:
    case "SEVERITY_UNKNOWN":
      return SystemFault_Severity.SEVERITY_UNKNOWN;
    case 1:
    case "SEVERITY_INFO":
      return SystemFault_Severity.SEVERITY_INFO;
    case 2:
    case "SEVERITY_WARN":
      return SystemFault_Severity.SEVERITY_WARN;
    case 3:
    case "SEVERITY_CRITICAL":
      return SystemFault_Severity.SEVERITY_CRITICAL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SystemFault_Severity.UNRECOGNIZED;
  }
}

export function systemFault_SeverityToJSON(
  object: SystemFault_Severity
): string {
  switch (object) {
    case SystemFault_Severity.SEVERITY_UNKNOWN:
      return "SEVERITY_UNKNOWN";
    case SystemFault_Severity.SEVERITY_INFO:
      return "SEVERITY_INFO";
    case SystemFault_Severity.SEVERITY_WARN:
      return "SEVERITY_WARN";
    case SystemFault_Severity.SEVERITY_CRITICAL:
      return "SEVERITY_CRITICAL";
    case SystemFault_Severity.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * The robot's current E-Stop states and endpoints.
 * A typical robot has several different E-Stops, all which must be "NOT_ESTOPPED"
 * in order to run the robot.
 */
export interface EStopState {
  /** Robot clock timestamp corresponding to these readings. */
  timestamp: Date | undefined;
  /** Name of the E-Stop */
  name: string;
  /** What kind of E-Stop this message describes. */
  type: EStopState_Type;
  /** The state of the E-Stop (is it E-Stopped or not?) */
  state: EStopState_State;
  /** Optional description of E-Stop status. */
  stateDescription: string;
}

export enum EStopState_Type {
  /** TYPE_UNKNOWN - Unknown type of E-Stop. Do not use this field. */
  TYPE_UNKNOWN = 0,
  /** TYPE_HARDWARE - E-Stop is a physical button */
  TYPE_HARDWARE = 1,
  /** TYPE_SOFTWARE - E-Stop is a software process */
  TYPE_SOFTWARE = 2,
  UNRECOGNIZED = -1,
}

export function eStopState_TypeFromJSON(object: any): EStopState_Type {
  switch (object) {
    case 0:
    case "TYPE_UNKNOWN":
      return EStopState_Type.TYPE_UNKNOWN;
    case 1:
    case "TYPE_HARDWARE":
      return EStopState_Type.TYPE_HARDWARE;
    case 2:
    case "TYPE_SOFTWARE":
      return EStopState_Type.TYPE_SOFTWARE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return EStopState_Type.UNRECOGNIZED;
  }
}

export function eStopState_TypeToJSON(object: EStopState_Type): string {
  switch (object) {
    case EStopState_Type.TYPE_UNKNOWN:
      return "TYPE_UNKNOWN";
    case EStopState_Type.TYPE_HARDWARE:
      return "TYPE_HARDWARE";
    case EStopState_Type.TYPE_SOFTWARE:
      return "TYPE_SOFTWARE";
    case EStopState_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum EStopState_State {
  /** STATE_UNKNOWN - No E-Stop information is present. Only happens in an error case. */
  STATE_UNKNOWN = 0,
  /** STATE_ESTOPPED - E-Stop is active -- robot cannot power its actuators. */
  STATE_ESTOPPED = 1,
  /** STATE_NOT_ESTOPPED - E-Stop is released -- robot may be able to power its actuators. */
  STATE_NOT_ESTOPPED = 2,
  UNRECOGNIZED = -1,
}

export function eStopState_StateFromJSON(object: any): EStopState_State {
  switch (object) {
    case 0:
    case "STATE_UNKNOWN":
      return EStopState_State.STATE_UNKNOWN;
    case 1:
    case "STATE_ESTOPPED":
      return EStopState_State.STATE_ESTOPPED;
    case 2:
    case "STATE_NOT_ESTOPPED":
      return EStopState_State.STATE_NOT_ESTOPPED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return EStopState_State.UNRECOGNIZED;
  }
}

export function eStopState_StateToJSON(object: EStopState_State): string {
  switch (object) {
    case EStopState_State.STATE_UNKNOWN:
      return "STATE_UNKNOWN";
    case EStopState_State.STATE_ESTOPPED:
      return "STATE_ESTOPPED";
    case EStopState_State.STATE_NOT_ESTOPPED:
      return "STATE_NOT_ESTOPPED";
    case EStopState_State.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * The battery state for the robot. This includes information about the charge or the
 * battery temperature.
 */
export interface BatteryState {
  /** Robot clock timestamp corresponding to these readings. */
  timestamp: Date | undefined;
  /** An identifier for this battery (could be a serial number or a name. subject to change). */
  identifier: string;
  /** Number from 0 (empty) to 100 (full) indicating the estimated state of charge of the battery. */
  chargePercentage: number | undefined;
  /** An estimate of remaining runtime. Note that this field might not be populated. */
  estimatedRuntime: Duration | undefined;
  /**
   * Measured current into (charging, positive) or out of (discharging, negative) the battery in
   * Amps.
   */
  current: number | undefined;
  /** Measured voltage of the entire battery in Volts. */
  voltage: number | undefined;
  /**
   * Measured temperature measurements of battery, in Celsius.
   * Temperatures may be measured in many locations across the battery.
   */
  temperatures: number[];
  /** Current state of the battery. */
  status: BatteryState_Status;
}

export enum BatteryState_Status {
  /** STATUS_UNKNOWN - The battery is in an unknown / unexpected state. */
  STATUS_UNKNOWN = 0,
  /** STATUS_MISSING - The battery is not plugged in or otherwise not talking. */
  STATUS_MISSING = 1,
  /** STATUS_CHARGING - The battery is plugged in to shore power and charging. */
  STATUS_CHARGING = 2,
  /** STATUS_DISCHARGING - The battery is not plugged into shore power and discharging. */
  STATUS_DISCHARGING = 3,
  /** STATUS_BOOTING - The battery was just plugged in and is booting up= 3; */
  STATUS_BOOTING = 4,
  UNRECOGNIZED = -1,
}

export function batteryState_StatusFromJSON(object: any): BatteryState_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return BatteryState_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_MISSING":
      return BatteryState_Status.STATUS_MISSING;
    case 2:
    case "STATUS_CHARGING":
      return BatteryState_Status.STATUS_CHARGING;
    case 3:
    case "STATUS_DISCHARGING":
      return BatteryState_Status.STATUS_DISCHARGING;
    case 4:
    case "STATUS_BOOTING":
      return BatteryState_Status.STATUS_BOOTING;
    case -1:
    case "UNRECOGNIZED":
    default:
      return BatteryState_Status.UNRECOGNIZED;
  }
}

export function batteryState_StatusToJSON(object: BatteryState_Status): string {
  switch (object) {
    case BatteryState_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case BatteryState_Status.STATUS_MISSING:
      return "STATUS_MISSING";
    case BatteryState_Status.STATUS_CHARGING:
      return "STATUS_CHARGING";
    case BatteryState_Status.STATUS_DISCHARGING:
      return "STATUS_DISCHARGING";
    case BatteryState_Status.STATUS_BOOTING:
      return "STATUS_BOOTING";
    case BatteryState_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * The kinematic state of the robot describes the current estimated positions of the robot body and joints throughout the world.
 * It includes a transform snapshot of the robot’s current known frames as well as joint states and the velocity of the body.
 */
export interface KinematicState {
  /** Joint state of all robot joints. */
  jointStates: JointState[];
  /** Robot clock timestamp corresponding to these readings. */
  acquisitionTimestamp: Date | undefined;
  /**
   * A tree-based collection of transformations, which will include the transformations to the
   * robot body ("body") in addition to transformations to the common frames ("world", "dr") and
   * ground plane estimate "gpe".
   * All transforms within the snapshot are at the acquisition time of kinematic state.
   */
  transformsSnapshot: FrameTreeSnapshot | undefined;
  /**
   * Velocity of the body frame with respect to vision frame and expressed in vision frame.
   * The linear velocity is applied at the origin of the body frame.
   */
  velocityOfBodyInVision: SE3Velocity | undefined;
  /**
   * Velocity of the body frame with respect to odom frame and expressed in odom frame.
   * Again, the linear velocity is applied at the origin of the body frame.
   */
  velocityOfBodyInOdom: SE3Velocity | undefined;
}

/**
 * Proto containing the state of a joint on the robot. This can be used with the robot skeleton to
 * update the current view of the robot.
 */
export interface JointState {
  /** This name maps directly to the joints in the URDF. */
  name: string;
  /**
   * This is typically an angle in radians as joints are typically revolute. However, for
   * translational joints this could be a distance in meters.
   */
  position: number | undefined;
  /** The joint velocity in [m/s]. */
  velocity: number | undefined;
  /** The joint acceleration in [m/s^2]. */
  acceleration: number | undefined;
  /**
   * This is typically a torque in Newton meters as joints are typically revolute. However, for
   * translational joints this could be a force in Newtons.
   */
  load: number | undefined;
}

/**
 * This describes any current behaviror faults on the robot, which would block any robot commands
 * from going through. These can be cleared using the ClearBehaviorFault rpc in the robot command
 * service.
 */
export interface BehaviorFaultState {
  /** Current errors potentially blocking commands on robot */
  faults: BehaviorFault[];
}

/**
 * The details of what the behavior fault consistents of, and the id for the fault. The unique
 * behavior_fault_id can be used to clear the fault in robot command service ClearBehaviorFault rpc.
 */
export interface BehaviorFault {
  /** Behavior fault unique id */
  behaviorFaultId: number;
  /** Time of robot local clock at time of the error */
  onsetTimestamp: Date | undefined;
  /** The potential cause of the fault. */
  cause: BehaviorFault_Cause;
  /** Information about the status/what can be done with the fault. */
  status: BehaviorFault_Status;
}

export enum BehaviorFault_Cause {
  /** CAUSE_UNKNOWN - Unknown cause of error */
  CAUSE_UNKNOWN = 0,
  /** CAUSE_FALL - Error caused by mobility failure or fall */
  CAUSE_FALL = 1,
  /** CAUSE_HARDWARE - Error caused by robot hardware malfunction */
  CAUSE_HARDWARE = 2,
  /** CAUSE_LEASE_TIMEOUT - / A lease has timed out */
  CAUSE_LEASE_TIMEOUT = 3,
  UNRECOGNIZED = -1,
}

export function behaviorFault_CauseFromJSON(object: any): BehaviorFault_Cause {
  switch (object) {
    case 0:
    case "CAUSE_UNKNOWN":
      return BehaviorFault_Cause.CAUSE_UNKNOWN;
    case 1:
    case "CAUSE_FALL":
      return BehaviorFault_Cause.CAUSE_FALL;
    case 2:
    case "CAUSE_HARDWARE":
      return BehaviorFault_Cause.CAUSE_HARDWARE;
    case 3:
    case "CAUSE_LEASE_TIMEOUT":
      return BehaviorFault_Cause.CAUSE_LEASE_TIMEOUT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return BehaviorFault_Cause.UNRECOGNIZED;
  }
}

export function behaviorFault_CauseToJSON(object: BehaviorFault_Cause): string {
  switch (object) {
    case BehaviorFault_Cause.CAUSE_UNKNOWN:
      return "CAUSE_UNKNOWN";
    case BehaviorFault_Cause.CAUSE_FALL:
      return "CAUSE_FALL";
    case BehaviorFault_Cause.CAUSE_HARDWARE:
      return "CAUSE_HARDWARE";
    case BehaviorFault_Cause.CAUSE_LEASE_TIMEOUT:
      return "CAUSE_LEASE_TIMEOUT";
    case BehaviorFault_Cause.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum BehaviorFault_Status {
  /** STATUS_UNKNOWN - Unknown clearable status */
  STATUS_UNKNOWN = 0,
  /** STATUS_CLEARABLE - Fault is clearable */
  STATUS_CLEARABLE = 1,
  /** STATUS_UNCLEARABLE - Fault is currently not clearable */
  STATUS_UNCLEARABLE = 2,
  UNRECOGNIZED = -1,
}

export function behaviorFault_StatusFromJSON(
  object: any
): BehaviorFault_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return BehaviorFault_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_CLEARABLE":
      return BehaviorFault_Status.STATUS_CLEARABLE;
    case 2:
    case "STATUS_UNCLEARABLE":
      return BehaviorFault_Status.STATUS_UNCLEARABLE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return BehaviorFault_Status.UNRECOGNIZED;
  }
}

export function behaviorFault_StatusToJSON(
  object: BehaviorFault_Status
): string {
  switch (object) {
    case BehaviorFault_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case BehaviorFault_Status.STATUS_CLEARABLE:
      return "STATUS_CLEARABLE";
    case BehaviorFault_Status.STATUS_UNCLEARABLE:
      return "STATUS_UNCLEARABLE";
    case BehaviorFault_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Key robot metrics (e.g., Gait cycles (count), distance walked, time moving, etc...). */
export interface RobotMetrics {
  /** Robot timestamp corresponding to these metrics. */
  timestamp: Date | undefined;
  /** Key tracked robot metrics, such as distance walked, runtime, etc. */
  metrics: Parameter[];
}

/**
 * The current comms information, including what comms the robot is using and the current status
 * of the comms network.
 */
export interface CommsState {
  /** Robot timestamp corresponding to these readings. */
  timestamp: Date | undefined;
  /** The communication state is WiFi. */
  wifiState: WiFiState | undefined;
}

export interface WiFiState {
  /** Current WiFi mode. */
  currentMode: WiFiState_Mode;
  /** Essid of robot (master mode) or connected network. */
  essid: string;
}

export enum WiFiState_Mode {
  /** MODE_UNKNOWN - The robot's comms state is unknown, or no user requested mode. */
  MODE_UNKNOWN = 0,
  /** MODE_ACCESS_POINT - The robot is acting as an access point. */
  MODE_ACCESS_POINT = 1,
  /** MODE_CLIENT - The robot is connected to a network. */
  MODE_CLIENT = 2,
  UNRECOGNIZED = -1,
}

export function wiFiState_ModeFromJSON(object: any): WiFiState_Mode {
  switch (object) {
    case 0:
    case "MODE_UNKNOWN":
      return WiFiState_Mode.MODE_UNKNOWN;
    case 1:
    case "MODE_ACCESS_POINT":
      return WiFiState_Mode.MODE_ACCESS_POINT;
    case 2:
    case "MODE_CLIENT":
      return WiFiState_Mode.MODE_CLIENT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return WiFiState_Mode.UNRECOGNIZED;
  }
}

export function wiFiState_ModeToJSON(object: WiFiState_Mode): string {
  switch (object) {
    case WiFiState_Mode.MODE_UNKNOWN:
      return "MODE_UNKNOWN";
    case WiFiState_Mode.MODE_ACCESS_POINT:
      return "MODE_ACCESS_POINT";
    case WiFiState_Mode.MODE_CLIENT:
      return "MODE_CLIENT";
    case WiFiState_Mode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Information about the foot positions and contact state, on a per-foot basis. */
export interface FootState {
  /** The foot position described relative to the body. */
  footPositionRtBody: Vec3 | undefined;
  /** Is the foot in contact with the ground? */
  contact: FootState_Contact;
  terrain: FootState_TerrainState | undefined;
}

export enum FootState_Contact {
  /** CONTACT_UNKNOWN - Unknown contact. Do not use. */
  CONTACT_UNKNOWN = 0,
  /** CONTACT_MADE - The foot is currently in contact with the ground. */
  CONTACT_MADE = 1,
  /** CONTACT_LOST - The foot is not in contact with the ground. */
  CONTACT_LOST = 2,
  UNRECOGNIZED = -1,
}

export function footState_ContactFromJSON(object: any): FootState_Contact {
  switch (object) {
    case 0:
    case "CONTACT_UNKNOWN":
      return FootState_Contact.CONTACT_UNKNOWN;
    case 1:
    case "CONTACT_MADE":
      return FootState_Contact.CONTACT_MADE;
    case 2:
    case "CONTACT_LOST":
      return FootState_Contact.CONTACT_LOST;
    case -1:
    case "UNRECOGNIZED":
    default:
      return FootState_Contact.UNRECOGNIZED;
  }
}

export function footState_ContactToJSON(object: FootState_Contact): string {
  switch (object) {
    case FootState_Contact.CONTACT_UNKNOWN:
      return "CONTACT_UNKNOWN";
    case FootState_Contact.CONTACT_MADE:
      return "CONTACT_MADE";
    case FootState_Contact.CONTACT_LOST:
      return "CONTACT_LOST";
    case FootState_Contact.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Foot specific terrain data. Data may not be valid if the contact state is
 * not CONTACT_MADE.
 */
export interface FootState_TerrainState {
  /** Estimated ground coefficient of friction for this foot. */
  groundMuEst: number;
  /** Reference frame name for vector data. */
  frameName: string;
  /** Foot slip distance rt named frame */
  footSlipDistanceRtFrame: Vec3 | undefined;
  /** Foot slip velocity rt named frame */
  footSlipVelocityRtFrame: Vec3 | undefined;
  /** Ground contact normal rt named frame */
  groundContactNormalRtFrame: Vec3 | undefined;
  /**
   * Mean penetration (meters) of the foot below the ground visual
   * surface. For penetrable terrains (gravel/sand/grass etc.) these values are
   * positive. Negative values would indicate potential odometry issues.
   */
  visualSurfaceGroundPenetrationMean: number;
  /** Standard deviation of the visual surface ground penetration. */
  visualSurfaceGroundPenetrationStd: number;
}

/** / Additional state published if an arm is attached to the robot. */
export interface ManipulatorState {
  /**
   * How open the gripper is, measured in percent.
   * 0 = fully closed, 100 = fully open.
   */
  gripperOpenPercentage: number;
  /** / Will be true if the gripper is holding an item, false otherwise. */
  isGripperHoldingItem: boolean;
  /** The estimated force on the end-effector expressed in the hand frame. */
  estimatedEndEffectorForceInHand: Vec3 | undefined;
  /** / Information on if the arm is stowed, or deployed. */
  stowState: ManipulatorState_StowState;
  /**
   * Velocity of the hand frame with respect to vision frame and expressed in vision frame.
   * The linear velocity is applied at the origin of the hand frame.
   */
  velocityOfHandInVision: SE3Velocity | undefined;
  /**
   * Velocity of the hand frame with respect to odom frame and expressed in odom frame.
   * Again, the linear velocity is applied at the origin of the hand frame.
   */
  velocityOfHandInOdom: SE3Velocity | undefined;
  carryState: ManipulatorState_CarryState;
}

export enum ManipulatorState_StowState {
  STOWSTATE_UNKNOWN = 0,
  STOWSTATE_STOWED = 1,
  STOWSTATE_DEPLOYED = 2,
  UNRECOGNIZED = -1,
}

export function manipulatorState_StowStateFromJSON(
  object: any
): ManipulatorState_StowState {
  switch (object) {
    case 0:
    case "STOWSTATE_UNKNOWN":
      return ManipulatorState_StowState.STOWSTATE_UNKNOWN;
    case 1:
    case "STOWSTATE_STOWED":
      return ManipulatorState_StowState.STOWSTATE_STOWED;
    case 2:
    case "STOWSTATE_DEPLOYED":
      return ManipulatorState_StowState.STOWSTATE_DEPLOYED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ManipulatorState_StowState.UNRECOGNIZED;
  }
}

export function manipulatorState_StowStateToJSON(
  object: ManipulatorState_StowState
): string {
  switch (object) {
    case ManipulatorState_StowState.STOWSTATE_UNKNOWN:
      return "STOWSTATE_UNKNOWN";
    case ManipulatorState_StowState.STOWSTATE_STOWED:
      return "STOWSTATE_STOWED";
    case ManipulatorState_StowState.STOWSTATE_DEPLOYED:
      return "STOWSTATE_DEPLOYED";
    case ManipulatorState_StowState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * The stowing behavior is modified as a function of the Carry State.  If holding an item, the
 * stowing behavior will be modified as follows:
 *  NOT_CARRIABLE - The arm will not stow, instead entering stop
 *  CARRIABLE - The arm will not stow, instead entering stop
 *  CARRIABLE_AND_STOWABLE - The arm will stow while continuing to grasp the item
 * The comms loss behavior of the arm is also modified as follows:
 *  NOT_CARRIABLE - The arm will release the item and stow
 *  CARRIABLE - The arm will not stow, instead entering stop
 *  CARRIABLE_AND_STOWABLE - The arm will stow while continuing to grasp the item
 */
export enum ManipulatorState_CarryState {
  CARRY_STATE_UNKNOWN = 0,
  CARRY_STATE_NOT_CARRIABLE = 1,
  CARRY_STATE_CARRIABLE = 2,
  CARRY_STATE_CARRIABLE_AND_STOWABLE = 3,
  UNRECOGNIZED = -1,
}

export function manipulatorState_CarryStateFromJSON(
  object: any
): ManipulatorState_CarryState {
  switch (object) {
    case 0:
    case "CARRY_STATE_UNKNOWN":
      return ManipulatorState_CarryState.CARRY_STATE_UNKNOWN;
    case 1:
    case "CARRY_STATE_NOT_CARRIABLE":
      return ManipulatorState_CarryState.CARRY_STATE_NOT_CARRIABLE;
    case 2:
    case "CARRY_STATE_CARRIABLE":
      return ManipulatorState_CarryState.CARRY_STATE_CARRIABLE;
    case 3:
    case "CARRY_STATE_CARRIABLE_AND_STOWABLE":
      return ManipulatorState_CarryState.CARRY_STATE_CARRIABLE_AND_STOWABLE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ManipulatorState_CarryState.UNRECOGNIZED;
  }
}

export function manipulatorState_CarryStateToJSON(
  object: ManipulatorState_CarryState
): string {
  switch (object) {
    case ManipulatorState_CarryState.CARRY_STATE_UNKNOWN:
      return "CARRY_STATE_UNKNOWN";
    case ManipulatorState_CarryState.CARRY_STATE_NOT_CARRIABLE:
      return "CARRY_STATE_NOT_CARRIABLE";
    case ManipulatorState_CarryState.CARRY_STATE_CARRIABLE:
      return "CARRY_STATE_CARRIABLE";
    case ManipulatorState_CarryState.CARRY_STATE_CARRIABLE_AND_STOWABLE:
      return "CARRY_STATE_CARRIABLE_AND_STOWABLE";
    case ManipulatorState_CarryState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * The current state of each service fault the robot is experiencing.
 * An "active" fault indicates a fault currently in a service.
 * A "historical" fault indicates a, now cleared, service problem.
 */
export interface ServiceFaultState {
  /** Currently active faults */
  faults: ServiceFault[];
  /** Service faults that have been cleared. Acts as a ring buffer with size of 50. */
  historicalFaults: ServiceFault[];
  /**
   * Aggregated service fault data. Maps attribute string to highest severity level
   * of any active fault containing that attribute string.
   * This provides a very quick way of determining if there any "locomotion" or
   * "vision" faults above a certain severity level.
   */
  aggregated: { [key: string]: ServiceFault_Severity };
}

export interface ServiceFaultState_AggregatedEntry {
  key: string;
  value: ServiceFault_Severity;
}

/** Relevant terrain data beneath and around the robot */
export interface TerrainState {
  /**
   * Is the terrain immediately under the robot such that sitting or powering off
   * the robot may cause the robot to be in an unstable position?
   */
  isUnsafeToSit: boolean;
}

/** The RobotState request message to get the current state of the robot. */
export interface RobotStateRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/**
 * The RobotState response message, which returns the robot state information from the time
 * the request was received.
 */
export interface RobotStateResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** The requested RobotState. */
  robotState: RobotState | undefined;
}

/** The RobotMetrics request message to get metrics and parameters from the robot. */
export interface RobotMetricsRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/**
 * The RobotMetrics response message, which returns the metrics information from the time
 * the request was received.
 */
export interface RobotMetricsResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** The requested robot metrics. */
  robotMetrics: RobotMetrics | undefined;
}

/**
 * The RobotHardwareConfiguration request message to get hardware configuration, described
 * by the robot skeleton and urdf.
 */
export interface RobotHardwareConfigurationRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/**
 * The RobotHardwareConfiguration response message, which returns the hardware config from the time
 * the request was received.
 */
export interface RobotHardwareConfigurationResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** The requested RobotState. */
  hardwareConfiguration: HardwareConfiguration | undefined;
}

/**
 * The RobotLinkModel request message uses a link name returned by the RobotHardwareConfiguration response to
 * get the associated OBJ file.
 */
export interface RobotLinkModelRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** The link name of which the OBJ file shoould represent. */
  linkName: string;
}

/** The RobotLinkModel response message returns the OBJ file for a specifc robot link. */
export interface RobotLinkModelResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** The requested RobotState skeleton obj model. */
  linkModel: Skeleton_Link_ObjModel | undefined;
}

/** Keeps track of why the robot is not able to drive autonomously. */
export interface RobotImpairedState {
  /** If the status is ROBOT_IMPAIRED, this is specifically why the robot is impaired. */
  impairedStatus: RobotImpairedState_ImpairedStatus;
  /** If impaired_status is STATUS_SYSTEM_FAULT, these are the faults which caused the robot to stop. */
  systemFaults: SystemFault[];
  /**
   * If impaired_status is STATUS_SERVICE_FAULT, these are the service faults which caused
   * the robot to stop.
   */
  serviceFaults: ServiceFault[];
  /**
   * If impaired_status is STATUS_BEHAVIOR_FAULT, these are the behavior faults which caused
   * the robot to stop.
   */
  behaviorFaults: BehaviorFault[];
}

/** If the robot is stopped due to being impaired, this is the reason why. */
export enum RobotImpairedState_ImpairedStatus {
  /** IMPAIRED_STATUS_UNKNOWN - Unknown/unexpected error. */
  IMPAIRED_STATUS_UNKNOWN = 0,
  /** IMPAIRED_STATUS_OK - The robot is able to drive. */
  IMPAIRED_STATUS_OK = 1,
  /** IMPAIRED_STATUS_NO_ROBOT_DATA - The autonomous system does not have any data from the robot state service. */
  IMPAIRED_STATUS_NO_ROBOT_DATA = 2,
  /** IMPAIRED_STATUS_SYSTEM_FAULT - There is a system fault which caused the robot to stop. See system_fault for details. */
  IMPAIRED_STATUS_SYSTEM_FAULT = 3,
  /** IMPAIRED_STATUS_NO_MOTOR_POWER - The robot's motors are not powered on. */
  IMPAIRED_STATUS_NO_MOTOR_POWER = 4,
  /** IMPAIRED_STATUS_REMOTE_CLOUDS_NOT_WORKING - The autonomous system is expected to have a remote point cloud (e.g. a LIDAR), but this is not working. */
  IMPAIRED_STATUS_REMOTE_CLOUDS_NOT_WORKING = 5,
  /** IMPAIRED_STATUS_SERVICE_FAULT - A remote service the autonomous system depends on is not working. */
  IMPAIRED_STATUS_SERVICE_FAULT = 6,
  /** IMPAIRED_STATUS_BEHAVIOR_FAULT - A behavior fault caused the robot to stop. See behavior_faults for details. */
  IMPAIRED_STATUS_BEHAVIOR_FAULT = 7,
  UNRECOGNIZED = -1,
}

export function robotImpairedState_ImpairedStatusFromJSON(
  object: any
): RobotImpairedState_ImpairedStatus {
  switch (object) {
    case 0:
    case "IMPAIRED_STATUS_UNKNOWN":
      return RobotImpairedState_ImpairedStatus.IMPAIRED_STATUS_UNKNOWN;
    case 1:
    case "IMPAIRED_STATUS_OK":
      return RobotImpairedState_ImpairedStatus.IMPAIRED_STATUS_OK;
    case 2:
    case "IMPAIRED_STATUS_NO_ROBOT_DATA":
      return RobotImpairedState_ImpairedStatus.IMPAIRED_STATUS_NO_ROBOT_DATA;
    case 3:
    case "IMPAIRED_STATUS_SYSTEM_FAULT":
      return RobotImpairedState_ImpairedStatus.IMPAIRED_STATUS_SYSTEM_FAULT;
    case 4:
    case "IMPAIRED_STATUS_NO_MOTOR_POWER":
      return RobotImpairedState_ImpairedStatus.IMPAIRED_STATUS_NO_MOTOR_POWER;
    case 5:
    case "IMPAIRED_STATUS_REMOTE_CLOUDS_NOT_WORKING":
      return RobotImpairedState_ImpairedStatus.IMPAIRED_STATUS_REMOTE_CLOUDS_NOT_WORKING;
    case 6:
    case "IMPAIRED_STATUS_SERVICE_FAULT":
      return RobotImpairedState_ImpairedStatus.IMPAIRED_STATUS_SERVICE_FAULT;
    case 7:
    case "IMPAIRED_STATUS_BEHAVIOR_FAULT":
      return RobotImpairedState_ImpairedStatus.IMPAIRED_STATUS_BEHAVIOR_FAULT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RobotImpairedState_ImpairedStatus.UNRECOGNIZED;
  }
}

export function robotImpairedState_ImpairedStatusToJSON(
  object: RobotImpairedState_ImpairedStatus
): string {
  switch (object) {
    case RobotImpairedState_ImpairedStatus.IMPAIRED_STATUS_UNKNOWN:
      return "IMPAIRED_STATUS_UNKNOWN";
    case RobotImpairedState_ImpairedStatus.IMPAIRED_STATUS_OK:
      return "IMPAIRED_STATUS_OK";
    case RobotImpairedState_ImpairedStatus.IMPAIRED_STATUS_NO_ROBOT_DATA:
      return "IMPAIRED_STATUS_NO_ROBOT_DATA";
    case RobotImpairedState_ImpairedStatus.IMPAIRED_STATUS_SYSTEM_FAULT:
      return "IMPAIRED_STATUS_SYSTEM_FAULT";
    case RobotImpairedState_ImpairedStatus.IMPAIRED_STATUS_NO_MOTOR_POWER:
      return "IMPAIRED_STATUS_NO_MOTOR_POWER";
    case RobotImpairedState_ImpairedStatus.IMPAIRED_STATUS_REMOTE_CLOUDS_NOT_WORKING:
      return "IMPAIRED_STATUS_REMOTE_CLOUDS_NOT_WORKING";
    case RobotImpairedState_ImpairedStatus.IMPAIRED_STATUS_SERVICE_FAULT:
      return "IMPAIRED_STATUS_SERVICE_FAULT";
    case RobotImpairedState_ImpairedStatus.IMPAIRED_STATUS_BEHAVIOR_FAULT:
      return "IMPAIRED_STATUS_BEHAVIOR_FAULT";
    case RobotImpairedState_ImpairedStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseSkeleton(): Skeleton {
  return { links: [], urdf: "" };
}

export const Skeleton = {
  encode(
    message: Skeleton,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.links) {
      Skeleton_Link.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.urdf !== "") {
      writer.uint32(26).string(message.urdf);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Skeleton {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSkeleton();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.links.push(Skeleton_Link.decode(reader, reader.uint32()));
          break;
        case 3:
          message.urdf = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Skeleton {
    return {
      links: Array.isArray(object?.links)
        ? object.links.map((e: any) => Skeleton_Link.fromJSON(e))
        : [],
      urdf: isSet(object.urdf) ? String(object.urdf) : "",
    };
  },

  toJSON(message: Skeleton): unknown {
    const obj: any = {};
    if (message.links) {
      obj.links = message.links.map((e) =>
        e ? Skeleton_Link.toJSON(e) : undefined
      );
    } else {
      obj.links = [];
    }
    message.urdf !== undefined && (obj.urdf = message.urdf);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Skeleton>, I>>(object: I): Skeleton {
    const message = createBaseSkeleton();
    message.links =
      object.links?.map((e) => Skeleton_Link.fromPartial(e)) || [];
    message.urdf = object.urdf ?? "";
    return message;
  },
};

function createBaseSkeleton_Link(): Skeleton_Link {
  return { name: "", objModel: undefined };
}

export const Skeleton_Link = {
  encode(
    message: Skeleton_Link,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.objModel !== undefined) {
      Skeleton_Link_ObjModel.encode(
        message.objModel,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Skeleton_Link {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSkeleton_Link();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.objModel = Skeleton_Link_ObjModel.decode(
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

  fromJSON(object: any): Skeleton_Link {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      objModel: isSet(object.objModel)
        ? Skeleton_Link_ObjModel.fromJSON(object.objModel)
        : undefined,
    };
  },

  toJSON(message: Skeleton_Link): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.objModel !== undefined &&
      (obj.objModel = message.objModel
        ? Skeleton_Link_ObjModel.toJSON(message.objModel)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Skeleton_Link>, I>>(
    object: I
  ): Skeleton_Link {
    const message = createBaseSkeleton_Link();
    message.name = object.name ?? "";
    message.objModel =
      object.objModel !== undefined && object.objModel !== null
        ? Skeleton_Link_ObjModel.fromPartial(object.objModel)
        : undefined;
    return message;
  },
};

function createBaseSkeleton_Link_ObjModel(): Skeleton_Link_ObjModel {
  return { fileName: "", fileContents: "" };
}

export const Skeleton_Link_ObjModel = {
  encode(
    message: Skeleton_Link_ObjModel,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.fileName !== "") {
      writer.uint32(10).string(message.fileName);
    }
    if (message.fileContents !== "") {
      writer.uint32(18).string(message.fileContents);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): Skeleton_Link_ObjModel {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSkeleton_Link_ObjModel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fileName = reader.string();
          break;
        case 2:
          message.fileContents = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Skeleton_Link_ObjModel {
    return {
      fileName: isSet(object.fileName) ? String(object.fileName) : "",
      fileContents: isSet(object.fileContents)
        ? String(object.fileContents)
        : "",
    };
  },

  toJSON(message: Skeleton_Link_ObjModel): unknown {
    const obj: any = {};
    message.fileName !== undefined && (obj.fileName = message.fileName);
    message.fileContents !== undefined &&
      (obj.fileContents = message.fileContents);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Skeleton_Link_ObjModel>, I>>(
    object: I
  ): Skeleton_Link_ObjModel {
    const message = createBaseSkeleton_Link_ObjModel();
    message.fileName = object.fileName ?? "";
    message.fileContents = object.fileContents ?? "";
    return message;
  },
};

function createBaseHardwareConfiguration(): HardwareConfiguration {
  return {
    skeleton: undefined,
    canPowerCommandRequestOffRobot: false,
    canPowerCommandRequestCycleRobot: false,
    canPowerCommandRequestPayloadPorts: false,
    canPowerCommandRequestWifiRadio: false,
  };
}

export const HardwareConfiguration = {
  encode(
    message: HardwareConfiguration,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.skeleton !== undefined) {
      Skeleton.encode(message.skeleton, writer.uint32(10).fork()).ldelim();
    }
    if (message.canPowerCommandRequestOffRobot === true) {
      writer.uint32(16).bool(message.canPowerCommandRequestOffRobot);
    }
    if (message.canPowerCommandRequestCycleRobot === true) {
      writer.uint32(24).bool(message.canPowerCommandRequestCycleRobot);
    }
    if (message.canPowerCommandRequestPayloadPorts === true) {
      writer.uint32(32).bool(message.canPowerCommandRequestPayloadPorts);
    }
    if (message.canPowerCommandRequestWifiRadio === true) {
      writer.uint32(40).bool(message.canPowerCommandRequestWifiRadio);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): HardwareConfiguration {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHardwareConfiguration();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.skeleton = Skeleton.decode(reader, reader.uint32());
          break;
        case 2:
          message.canPowerCommandRequestOffRobot = reader.bool();
          break;
        case 3:
          message.canPowerCommandRequestCycleRobot = reader.bool();
          break;
        case 4:
          message.canPowerCommandRequestPayloadPorts = reader.bool();
          break;
        case 5:
          message.canPowerCommandRequestWifiRadio = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): HardwareConfiguration {
    return {
      skeleton: isSet(object.skeleton)
        ? Skeleton.fromJSON(object.skeleton)
        : undefined,
      canPowerCommandRequestOffRobot: isSet(
        object.canPowerCommandRequestOffRobot
      )
        ? Boolean(object.canPowerCommandRequestOffRobot)
        : false,
      canPowerCommandRequestCycleRobot: isSet(
        object.canPowerCommandRequestCycleRobot
      )
        ? Boolean(object.canPowerCommandRequestCycleRobot)
        : false,
      canPowerCommandRequestPayloadPorts: isSet(
        object.canPowerCommandRequestPayloadPorts
      )
        ? Boolean(object.canPowerCommandRequestPayloadPorts)
        : false,
      canPowerCommandRequestWifiRadio: isSet(
        object.canPowerCommandRequestWifiRadio
      )
        ? Boolean(object.canPowerCommandRequestWifiRadio)
        : false,
    };
  },

  toJSON(message: HardwareConfiguration): unknown {
    const obj: any = {};
    message.skeleton !== undefined &&
      (obj.skeleton = message.skeleton
        ? Skeleton.toJSON(message.skeleton)
        : undefined);
    message.canPowerCommandRequestOffRobot !== undefined &&
      (obj.canPowerCommandRequestOffRobot =
        message.canPowerCommandRequestOffRobot);
    message.canPowerCommandRequestCycleRobot !== undefined &&
      (obj.canPowerCommandRequestCycleRobot =
        message.canPowerCommandRequestCycleRobot);
    message.canPowerCommandRequestPayloadPorts !== undefined &&
      (obj.canPowerCommandRequestPayloadPorts =
        message.canPowerCommandRequestPayloadPorts);
    message.canPowerCommandRequestWifiRadio !== undefined &&
      (obj.canPowerCommandRequestWifiRadio =
        message.canPowerCommandRequestWifiRadio);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<HardwareConfiguration>, I>>(
    object: I
  ): HardwareConfiguration {
    const message = createBaseHardwareConfiguration();
    message.skeleton =
      object.skeleton !== undefined && object.skeleton !== null
        ? Skeleton.fromPartial(object.skeleton)
        : undefined;
    message.canPowerCommandRequestOffRobot =
      object.canPowerCommandRequestOffRobot ?? false;
    message.canPowerCommandRequestCycleRobot =
      object.canPowerCommandRequestCycleRobot ?? false;
    message.canPowerCommandRequestPayloadPorts =
      object.canPowerCommandRequestPayloadPorts ?? false;
    message.canPowerCommandRequestWifiRadio =
      object.canPowerCommandRequestWifiRadio ?? false;
    return message;
  },
};

function createBaseRobotState(): RobotState {
  return {
    powerState: undefined,
    batteryStates: [],
    commsStates: [],
    systemFaultState: undefined,
    estopStates: [],
    kinematicState: undefined,
    behaviorFaultState: undefined,
    footState: [],
    manipulatorState: undefined,
    serviceFaultState: undefined,
    terrainState: undefined,
  };
}

export const RobotState = {
  encode(
    message: RobotState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.powerState !== undefined) {
      PowerState.encode(message.powerState, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.batteryStates) {
      BatteryState.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.commsStates) {
      CommsState.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.systemFaultState !== undefined) {
      SystemFaultState.encode(
        message.systemFaultState,
        writer.uint32(34).fork()
      ).ldelim();
    }
    for (const v of message.estopStates) {
      EStopState.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.kinematicState !== undefined) {
      KinematicState.encode(
        message.kinematicState,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.behaviorFaultState !== undefined) {
      BehaviorFaultState.encode(
        message.behaviorFaultState,
        writer.uint32(58).fork()
      ).ldelim();
    }
    for (const v of message.footState) {
      FootState.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    if (message.manipulatorState !== undefined) {
      ManipulatorState.encode(
        message.manipulatorState,
        writer.uint32(90).fork()
      ).ldelim();
    }
    if (message.serviceFaultState !== undefined) {
      ServiceFaultState.encode(
        message.serviceFaultState,
        writer.uint32(82).fork()
      ).ldelim();
    }
    if (message.terrainState !== undefined) {
      TerrainState.encode(
        message.terrainState,
        writer.uint32(98).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RobotState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRobotState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.powerState = PowerState.decode(reader, reader.uint32());
          break;
        case 2:
          message.batteryStates.push(
            BatteryState.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.commsStates.push(CommsState.decode(reader, reader.uint32()));
          break;
        case 4:
          message.systemFaultState = SystemFaultState.decode(
            reader,
            reader.uint32()
          );
          break;
        case 5:
          message.estopStates.push(EStopState.decode(reader, reader.uint32()));
          break;
        case 6:
          message.kinematicState = KinematicState.decode(
            reader,
            reader.uint32()
          );
          break;
        case 7:
          message.behaviorFaultState = BehaviorFaultState.decode(
            reader,
            reader.uint32()
          );
          break;
        case 8:
          message.footState.push(FootState.decode(reader, reader.uint32()));
          break;
        case 11:
          message.manipulatorState = ManipulatorState.decode(
            reader,
            reader.uint32()
          );
          break;
        case 10:
          message.serviceFaultState = ServiceFaultState.decode(
            reader,
            reader.uint32()
          );
          break;
        case 12:
          message.terrainState = TerrainState.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RobotState {
    return {
      powerState: isSet(object.powerState)
        ? PowerState.fromJSON(object.powerState)
        : undefined,
      batteryStates: Array.isArray(object?.batteryStates)
        ? object.batteryStates.map((e: any) => BatteryState.fromJSON(e))
        : [],
      commsStates: Array.isArray(object?.commsStates)
        ? object.commsStates.map((e: any) => CommsState.fromJSON(e))
        : [],
      systemFaultState: isSet(object.systemFaultState)
        ? SystemFaultState.fromJSON(object.systemFaultState)
        : undefined,
      estopStates: Array.isArray(object?.estopStates)
        ? object.estopStates.map((e: any) => EStopState.fromJSON(e))
        : [],
      kinematicState: isSet(object.kinematicState)
        ? KinematicState.fromJSON(object.kinematicState)
        : undefined,
      behaviorFaultState: isSet(object.behaviorFaultState)
        ? BehaviorFaultState.fromJSON(object.behaviorFaultState)
        : undefined,
      footState: Array.isArray(object?.footState)
        ? object.footState.map((e: any) => FootState.fromJSON(e))
        : [],
      manipulatorState: isSet(object.manipulatorState)
        ? ManipulatorState.fromJSON(object.manipulatorState)
        : undefined,
      serviceFaultState: isSet(object.serviceFaultState)
        ? ServiceFaultState.fromJSON(object.serviceFaultState)
        : undefined,
      terrainState: isSet(object.terrainState)
        ? TerrainState.fromJSON(object.terrainState)
        : undefined,
    };
  },

  toJSON(message: RobotState): unknown {
    const obj: any = {};
    message.powerState !== undefined &&
      (obj.powerState = message.powerState
        ? PowerState.toJSON(message.powerState)
        : undefined);
    if (message.batteryStates) {
      obj.batteryStates = message.batteryStates.map((e) =>
        e ? BatteryState.toJSON(e) : undefined
      );
    } else {
      obj.batteryStates = [];
    }
    if (message.commsStates) {
      obj.commsStates = message.commsStates.map((e) =>
        e ? CommsState.toJSON(e) : undefined
      );
    } else {
      obj.commsStates = [];
    }
    message.systemFaultState !== undefined &&
      (obj.systemFaultState = message.systemFaultState
        ? SystemFaultState.toJSON(message.systemFaultState)
        : undefined);
    if (message.estopStates) {
      obj.estopStates = message.estopStates.map((e) =>
        e ? EStopState.toJSON(e) : undefined
      );
    } else {
      obj.estopStates = [];
    }
    message.kinematicState !== undefined &&
      (obj.kinematicState = message.kinematicState
        ? KinematicState.toJSON(message.kinematicState)
        : undefined);
    message.behaviorFaultState !== undefined &&
      (obj.behaviorFaultState = message.behaviorFaultState
        ? BehaviorFaultState.toJSON(message.behaviorFaultState)
        : undefined);
    if (message.footState) {
      obj.footState = message.footState.map((e) =>
        e ? FootState.toJSON(e) : undefined
      );
    } else {
      obj.footState = [];
    }
    message.manipulatorState !== undefined &&
      (obj.manipulatorState = message.manipulatorState
        ? ManipulatorState.toJSON(message.manipulatorState)
        : undefined);
    message.serviceFaultState !== undefined &&
      (obj.serviceFaultState = message.serviceFaultState
        ? ServiceFaultState.toJSON(message.serviceFaultState)
        : undefined);
    message.terrainState !== undefined &&
      (obj.terrainState = message.terrainState
        ? TerrainState.toJSON(message.terrainState)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RobotState>, I>>(
    object: I
  ): RobotState {
    const message = createBaseRobotState();
    message.powerState =
      object.powerState !== undefined && object.powerState !== null
        ? PowerState.fromPartial(object.powerState)
        : undefined;
    message.batteryStates =
      object.batteryStates?.map((e) => BatteryState.fromPartial(e)) || [];
    message.commsStates =
      object.commsStates?.map((e) => CommsState.fromPartial(e)) || [];
    message.systemFaultState =
      object.systemFaultState !== undefined && object.systemFaultState !== null
        ? SystemFaultState.fromPartial(object.systemFaultState)
        : undefined;
    message.estopStates =
      object.estopStates?.map((e) => EStopState.fromPartial(e)) || [];
    message.kinematicState =
      object.kinematicState !== undefined && object.kinematicState !== null
        ? KinematicState.fromPartial(object.kinematicState)
        : undefined;
    message.behaviorFaultState =
      object.behaviorFaultState !== undefined &&
      object.behaviorFaultState !== null
        ? BehaviorFaultState.fromPartial(object.behaviorFaultState)
        : undefined;
    message.footState =
      object.footState?.map((e) => FootState.fromPartial(e)) || [];
    message.manipulatorState =
      object.manipulatorState !== undefined && object.manipulatorState !== null
        ? ManipulatorState.fromPartial(object.manipulatorState)
        : undefined;
    message.serviceFaultState =
      object.serviceFaultState !== undefined &&
      object.serviceFaultState !== null
        ? ServiceFaultState.fromPartial(object.serviceFaultState)
        : undefined;
    message.terrainState =
      object.terrainState !== undefined && object.terrainState !== null
        ? TerrainState.fromPartial(object.terrainState)
        : undefined;
    return message;
  },
};

function createBasePowerState(): PowerState {
  return {
    timestamp: undefined,
    motorPowerState: 0,
    shorePowerState: 0,
    robotPowerState: 0,
    payloadPortsPowerState: 0,
    wifiRadioPowerState: 0,
    locomotionChargePercentage: undefined,
    locomotionEstimatedRuntime: undefined,
  };
}

export const PowerState = {
  encode(
    message: PowerState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.timestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestamp),
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.motorPowerState !== 0) {
      writer.uint32(16).int32(message.motorPowerState);
    }
    if (message.shorePowerState !== 0) {
      writer.uint32(24).int32(message.shorePowerState);
    }
    if (message.robotPowerState !== 0) {
      writer.uint32(48).int32(message.robotPowerState);
    }
    if (message.payloadPortsPowerState !== 0) {
      writer.uint32(56).int32(message.payloadPortsPowerState);
    }
    if (message.wifiRadioPowerState !== 0) {
      writer.uint32(72).int32(message.wifiRadioPowerState);
    }
    if (message.locomotionChargePercentage !== undefined) {
      DoubleValue.encode(
        { value: message.locomotionChargePercentage! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.locomotionEstimatedRuntime !== undefined) {
      Duration.encode(
        message.locomotionEstimatedRuntime,
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PowerState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePowerState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.motorPowerState = reader.int32() as any;
          break;
        case 3:
          message.shorePowerState = reader.int32() as any;
          break;
        case 6:
          message.robotPowerState = reader.int32() as any;
          break;
        case 7:
          message.payloadPortsPowerState = reader.int32() as any;
          break;
        case 9:
          message.wifiRadioPowerState = reader.int32() as any;
          break;
        case 4:
          message.locomotionChargePercentage = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 5:
          message.locomotionEstimatedRuntime = Duration.decode(
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

  fromJSON(object: any): PowerState {
    return {
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
      motorPowerState: isSet(object.motorPowerState)
        ? powerState_MotorPowerStateFromJSON(object.motorPowerState)
        : 0,
      shorePowerState: isSet(object.shorePowerState)
        ? powerState_ShorePowerStateFromJSON(object.shorePowerState)
        : 0,
      robotPowerState: isSet(object.robotPowerState)
        ? powerState_RobotPowerStateFromJSON(object.robotPowerState)
        : 0,
      payloadPortsPowerState: isSet(object.payloadPortsPowerState)
        ? powerState_PayloadPortsPowerStateFromJSON(
            object.payloadPortsPowerState
          )
        : 0,
      wifiRadioPowerState: isSet(object.wifiRadioPowerState)
        ? powerState_WifiRadioPowerStateFromJSON(object.wifiRadioPowerState)
        : 0,
      locomotionChargePercentage: isSet(object.locomotionChargePercentage)
        ? Number(object.locomotionChargePercentage)
        : undefined,
      locomotionEstimatedRuntime: isSet(object.locomotionEstimatedRuntime)
        ? Duration.fromJSON(object.locomotionEstimatedRuntime)
        : undefined,
    };
  },

  toJSON(message: PowerState): unknown {
    const obj: any = {};
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp.toISOString());
    message.motorPowerState !== undefined &&
      (obj.motorPowerState = powerState_MotorPowerStateToJSON(
        message.motorPowerState
      ));
    message.shorePowerState !== undefined &&
      (obj.shorePowerState = powerState_ShorePowerStateToJSON(
        message.shorePowerState
      ));
    message.robotPowerState !== undefined &&
      (obj.robotPowerState = powerState_RobotPowerStateToJSON(
        message.robotPowerState
      ));
    message.payloadPortsPowerState !== undefined &&
      (obj.payloadPortsPowerState = powerState_PayloadPortsPowerStateToJSON(
        message.payloadPortsPowerState
      ));
    message.wifiRadioPowerState !== undefined &&
      (obj.wifiRadioPowerState = powerState_WifiRadioPowerStateToJSON(
        message.wifiRadioPowerState
      ));
    message.locomotionChargePercentage !== undefined &&
      (obj.locomotionChargePercentage = message.locomotionChargePercentage);
    message.locomotionEstimatedRuntime !== undefined &&
      (obj.locomotionEstimatedRuntime = message.locomotionEstimatedRuntime
        ? Duration.toJSON(message.locomotionEstimatedRuntime)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PowerState>, I>>(
    object: I
  ): PowerState {
    const message = createBasePowerState();
    message.timestamp = object.timestamp ?? undefined;
    message.motorPowerState = object.motorPowerState ?? 0;
    message.shorePowerState = object.shorePowerState ?? 0;
    message.robotPowerState = object.robotPowerState ?? 0;
    message.payloadPortsPowerState = object.payloadPortsPowerState ?? 0;
    message.wifiRadioPowerState = object.wifiRadioPowerState ?? 0;
    message.locomotionChargePercentage =
      object.locomotionChargePercentage ?? undefined;
    message.locomotionEstimatedRuntime =
      object.locomotionEstimatedRuntime !== undefined &&
      object.locomotionEstimatedRuntime !== null
        ? Duration.fromPartial(object.locomotionEstimatedRuntime)
        : undefined;
    return message;
  },
};

function createBaseSystemFaultState(): SystemFaultState {
  return { faults: [], historicalFaults: [], aggregated: {} };
}

export const SystemFaultState = {
  encode(
    message: SystemFaultState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.faults) {
      SystemFault.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.historicalFaults) {
      SystemFault.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    Object.entries(message.aggregated).forEach(([key, value]) => {
      SystemFaultState_AggregatedEntry.encode(
        { key: key as any, value },
        writer.uint32(26).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SystemFaultState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSystemFaultState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.faults.push(SystemFault.decode(reader, reader.uint32()));
          break;
        case 2:
          message.historicalFaults.push(
            SystemFault.decode(reader, reader.uint32())
          );
          break;
        case 3:
          const entry3 = SystemFaultState_AggregatedEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry3.value !== undefined) {
            message.aggregated[entry3.key] = entry3.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SystemFaultState {
    return {
      faults: Array.isArray(object?.faults)
        ? object.faults.map((e: any) => SystemFault.fromJSON(e))
        : [],
      historicalFaults: Array.isArray(object?.historicalFaults)
        ? object.historicalFaults.map((e: any) => SystemFault.fromJSON(e))
        : [],
      aggregated: isObject(object.aggregated)
        ? Object.entries(object.aggregated).reduce<{
            [key: string]: SystemFault_Severity;
          }>((acc, [key, value]) => {
            acc[key] = systemFault_SeverityFromJSON(value);
            return acc;
          }, {})
        : {},
    };
  },

  toJSON(message: SystemFaultState): unknown {
    const obj: any = {};
    if (message.faults) {
      obj.faults = message.faults.map((e) =>
        e ? SystemFault.toJSON(e) : undefined
      );
    } else {
      obj.faults = [];
    }
    if (message.historicalFaults) {
      obj.historicalFaults = message.historicalFaults.map((e) =>
        e ? SystemFault.toJSON(e) : undefined
      );
    } else {
      obj.historicalFaults = [];
    }
    obj.aggregated = {};
    if (message.aggregated) {
      Object.entries(message.aggregated).forEach(([k, v]) => {
        obj.aggregated[k] = systemFault_SeverityToJSON(v);
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SystemFaultState>, I>>(
    object: I
  ): SystemFaultState {
    const message = createBaseSystemFaultState();
    message.faults =
      object.faults?.map((e) => SystemFault.fromPartial(e)) || [];
    message.historicalFaults =
      object.historicalFaults?.map((e) => SystemFault.fromPartial(e)) || [];
    message.aggregated = Object.entries(object.aggregated ?? {}).reduce<{
      [key: string]: SystemFault_Severity;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value as SystemFault_Severity;
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseSystemFaultState_AggregatedEntry(): SystemFaultState_AggregatedEntry {
  return { key: "", value: 0 };
}

export const SystemFaultState_AggregatedEntry = {
  encode(
    message: SystemFaultState_AggregatedEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(16).int32(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SystemFaultState_AggregatedEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSystemFaultState_AggregatedEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SystemFaultState_AggregatedEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value)
        ? systemFault_SeverityFromJSON(object.value)
        : 0,
    };
  },

  toJSON(message: SystemFaultState_AggregatedEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = systemFault_SeverityToJSON(message.value));
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<SystemFaultState_AggregatedEntry>, I>
  >(object: I): SystemFaultState_AggregatedEntry {
    const message = createBaseSystemFaultState_AggregatedEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseSystemFault(): SystemFault {
  return {
    name: "",
    onsetTimestamp: undefined,
    duration: undefined,
    code: 0,
    uid: 0,
    errorMessage: "",
    attributes: [],
    severity: 0,
  };
}

export const SystemFault = {
  encode(
    message: SystemFault,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.onsetTimestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.onsetTimestamp),
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(26).fork()).ldelim();
    }
    if (message.code !== 0) {
      writer.uint32(32).int32(message.code);
    }
    if (message.uid !== 0) {
      writer.uint32(64).uint64(message.uid);
    }
    if (message.errorMessage !== "") {
      writer.uint32(42).string(message.errorMessage);
    }
    for (const v of message.attributes) {
      writer.uint32(50).string(v!);
    }
    if (message.severity !== 0) {
      writer.uint32(56).int32(message.severity);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SystemFault {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSystemFault();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.onsetTimestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.duration = Duration.decode(reader, reader.uint32());
          break;
        case 4:
          message.code = reader.int32();
          break;
        case 8:
          message.uid = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.errorMessage = reader.string();
          break;
        case 6:
          message.attributes.push(reader.string());
          break;
        case 7:
          message.severity = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SystemFault {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      onsetTimestamp: isSet(object.onsetTimestamp)
        ? fromJsonTimestamp(object.onsetTimestamp)
        : undefined,
      duration: isSet(object.duration)
        ? Duration.fromJSON(object.duration)
        : undefined,
      code: isSet(object.code) ? Number(object.code) : 0,
      uid: isSet(object.uid) ? Number(object.uid) : 0,
      errorMessage: isSet(object.errorMessage)
        ? String(object.errorMessage)
        : "",
      attributes: Array.isArray(object?.attributes)
        ? object.attributes.map((e: any) => String(e))
        : [],
      severity: isSet(object.severity)
        ? systemFault_SeverityFromJSON(object.severity)
        : 0,
    };
  },

  toJSON(message: SystemFault): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.onsetTimestamp !== undefined &&
      (obj.onsetTimestamp = message.onsetTimestamp.toISOString());
    message.duration !== undefined &&
      (obj.duration = message.duration
        ? Duration.toJSON(message.duration)
        : undefined);
    message.code !== undefined && (obj.code = Math.round(message.code));
    message.uid !== undefined && (obj.uid = Math.round(message.uid));
    message.errorMessage !== undefined &&
      (obj.errorMessage = message.errorMessage);
    if (message.attributes) {
      obj.attributes = message.attributes.map((e) => e);
    } else {
      obj.attributes = [];
    }
    message.severity !== undefined &&
      (obj.severity = systemFault_SeverityToJSON(message.severity));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SystemFault>, I>>(
    object: I
  ): SystemFault {
    const message = createBaseSystemFault();
    message.name = object.name ?? "";
    message.onsetTimestamp = object.onsetTimestamp ?? undefined;
    message.duration =
      object.duration !== undefined && object.duration !== null
        ? Duration.fromPartial(object.duration)
        : undefined;
    message.code = object.code ?? 0;
    message.uid = object.uid ?? 0;
    message.errorMessage = object.errorMessage ?? "";
    message.attributes = object.attributes?.map((e) => e) || [];
    message.severity = object.severity ?? 0;
    return message;
  },
};

function createBaseEStopState(): EStopState {
  return {
    timestamp: undefined,
    name: "",
    type: 0,
    state: 0,
    stateDescription: "",
  };
}

export const EStopState = {
  encode(
    message: EStopState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.timestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestamp),
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.type !== 0) {
      writer.uint32(24).int32(message.type);
    }
    if (message.state !== 0) {
      writer.uint32(32).int32(message.state);
    }
    if (message.stateDescription !== "") {
      writer.uint32(42).string(message.stateDescription);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EStopState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEStopState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.type = reader.int32() as any;
          break;
        case 4:
          message.state = reader.int32() as any;
          break;
        case 5:
          message.stateDescription = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EStopState {
    return {
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
      name: isSet(object.name) ? String(object.name) : "",
      type: isSet(object.type) ? eStopState_TypeFromJSON(object.type) : 0,
      state: isSet(object.state) ? eStopState_StateFromJSON(object.state) : 0,
      stateDescription: isSet(object.stateDescription)
        ? String(object.stateDescription)
        : "",
    };
  },

  toJSON(message: EStopState): unknown {
    const obj: any = {};
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp.toISOString());
    message.name !== undefined && (obj.name = message.name);
    message.type !== undefined &&
      (obj.type = eStopState_TypeToJSON(message.type));
    message.state !== undefined &&
      (obj.state = eStopState_StateToJSON(message.state));
    message.stateDescription !== undefined &&
      (obj.stateDescription = message.stateDescription);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EStopState>, I>>(
    object: I
  ): EStopState {
    const message = createBaseEStopState();
    message.timestamp = object.timestamp ?? undefined;
    message.name = object.name ?? "";
    message.type = object.type ?? 0;
    message.state = object.state ?? 0;
    message.stateDescription = object.stateDescription ?? "";
    return message;
  },
};

function createBaseBatteryState(): BatteryState {
  return {
    timestamp: undefined,
    identifier: "",
    chargePercentage: undefined,
    estimatedRuntime: undefined,
    current: undefined,
    voltage: undefined,
    temperatures: [],
    status: 0,
  };
}

export const BatteryState = {
  encode(
    message: BatteryState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.timestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestamp),
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.identifier !== "") {
      writer.uint32(18).string(message.identifier);
    }
    if (message.chargePercentage !== undefined) {
      DoubleValue.encode(
        { value: message.chargePercentage! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.estimatedRuntime !== undefined) {
      Duration.encode(
        message.estimatedRuntime,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.current !== undefined) {
      DoubleValue.encode(
        { value: message.current! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.voltage !== undefined) {
      DoubleValue.encode(
        { value: message.voltage! },
        writer.uint32(50).fork()
      ).ldelim();
    }
    writer.uint32(58).fork();
    for (const v of message.temperatures) {
      writer.double(v);
    }
    writer.ldelim();
    if (message.status !== 0) {
      writer.uint32(64).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BatteryState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatteryState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.identifier = reader.string();
          break;
        case 3:
          message.chargePercentage = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 4:
          message.estimatedRuntime = Duration.decode(reader, reader.uint32());
          break;
        case 5:
          message.current = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 6:
          message.voltage = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 7:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.temperatures.push(reader.double());
            }
          } else {
            message.temperatures.push(reader.double());
          }
          break;
        case 8:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BatteryState {
    return {
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
      identifier: isSet(object.identifier) ? String(object.identifier) : "",
      chargePercentage: isSet(object.chargePercentage)
        ? Number(object.chargePercentage)
        : undefined,
      estimatedRuntime: isSet(object.estimatedRuntime)
        ? Duration.fromJSON(object.estimatedRuntime)
        : undefined,
      current: isSet(object.current) ? Number(object.current) : undefined,
      voltage: isSet(object.voltage) ? Number(object.voltage) : undefined,
      temperatures: Array.isArray(object?.temperatures)
        ? object.temperatures.map((e: any) => Number(e))
        : [],
      status: isSet(object.status)
        ? batteryState_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: BatteryState): unknown {
    const obj: any = {};
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp.toISOString());
    message.identifier !== undefined && (obj.identifier = message.identifier);
    message.chargePercentage !== undefined &&
      (obj.chargePercentage = message.chargePercentage);
    message.estimatedRuntime !== undefined &&
      (obj.estimatedRuntime = message.estimatedRuntime
        ? Duration.toJSON(message.estimatedRuntime)
        : undefined);
    message.current !== undefined && (obj.current = message.current);
    message.voltage !== undefined && (obj.voltage = message.voltage);
    if (message.temperatures) {
      obj.temperatures = message.temperatures.map((e) => e);
    } else {
      obj.temperatures = [];
    }
    message.status !== undefined &&
      (obj.status = batteryState_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BatteryState>, I>>(
    object: I
  ): BatteryState {
    const message = createBaseBatteryState();
    message.timestamp = object.timestamp ?? undefined;
    message.identifier = object.identifier ?? "";
    message.chargePercentage = object.chargePercentage ?? undefined;
    message.estimatedRuntime =
      object.estimatedRuntime !== undefined && object.estimatedRuntime !== null
        ? Duration.fromPartial(object.estimatedRuntime)
        : undefined;
    message.current = object.current ?? undefined;
    message.voltage = object.voltage ?? undefined;
    message.temperatures = object.temperatures?.map((e) => e) || [];
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseKinematicState(): KinematicState {
  return {
    jointStates: [],
    acquisitionTimestamp: undefined,
    transformsSnapshot: undefined,
    velocityOfBodyInVision: undefined,
    velocityOfBodyInOdom: undefined,
  };
}

export const KinematicState = {
  encode(
    message: KinematicState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.jointStates) {
      JointState.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.acquisitionTimestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.acquisitionTimestamp),
        writer.uint32(242).fork()
      ).ldelim();
    }
    if (message.transformsSnapshot !== undefined) {
      FrameTreeSnapshot.encode(
        message.transformsSnapshot,
        writer.uint32(250).fork()
      ).ldelim();
    }
    if (message.velocityOfBodyInVision !== undefined) {
      SE3Velocity.encode(
        message.velocityOfBodyInVision,
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.velocityOfBodyInOdom !== undefined) {
      SE3Velocity.encode(
        message.velocityOfBodyInOdom,
        writer.uint32(98).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KinematicState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKinematicState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.jointStates.push(JointState.decode(reader, reader.uint32()));
          break;
        case 30:
          message.acquisitionTimestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 31:
          message.transformsSnapshot = FrameTreeSnapshot.decode(
            reader,
            reader.uint32()
          );
          break;
        case 8:
          message.velocityOfBodyInVision = SE3Velocity.decode(
            reader,
            reader.uint32()
          );
          break;
        case 12:
          message.velocityOfBodyInOdom = SE3Velocity.decode(
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

  fromJSON(object: any): KinematicState {
    return {
      jointStates: Array.isArray(object?.jointStates)
        ? object.jointStates.map((e: any) => JointState.fromJSON(e))
        : [],
      acquisitionTimestamp: isSet(object.acquisitionTimestamp)
        ? fromJsonTimestamp(object.acquisitionTimestamp)
        : undefined,
      transformsSnapshot: isSet(object.transformsSnapshot)
        ? FrameTreeSnapshot.fromJSON(object.transformsSnapshot)
        : undefined,
      velocityOfBodyInVision: isSet(object.velocityOfBodyInVision)
        ? SE3Velocity.fromJSON(object.velocityOfBodyInVision)
        : undefined,
      velocityOfBodyInOdom: isSet(object.velocityOfBodyInOdom)
        ? SE3Velocity.fromJSON(object.velocityOfBodyInOdom)
        : undefined,
    };
  },

  toJSON(message: KinematicState): unknown {
    const obj: any = {};
    if (message.jointStates) {
      obj.jointStates = message.jointStates.map((e) =>
        e ? JointState.toJSON(e) : undefined
      );
    } else {
      obj.jointStates = [];
    }
    message.acquisitionTimestamp !== undefined &&
      (obj.acquisitionTimestamp = message.acquisitionTimestamp.toISOString());
    message.transformsSnapshot !== undefined &&
      (obj.transformsSnapshot = message.transformsSnapshot
        ? FrameTreeSnapshot.toJSON(message.transformsSnapshot)
        : undefined);
    message.velocityOfBodyInVision !== undefined &&
      (obj.velocityOfBodyInVision = message.velocityOfBodyInVision
        ? SE3Velocity.toJSON(message.velocityOfBodyInVision)
        : undefined);
    message.velocityOfBodyInOdom !== undefined &&
      (obj.velocityOfBodyInOdom = message.velocityOfBodyInOdom
        ? SE3Velocity.toJSON(message.velocityOfBodyInOdom)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<KinematicState>, I>>(
    object: I
  ): KinematicState {
    const message = createBaseKinematicState();
    message.jointStates =
      object.jointStates?.map((e) => JointState.fromPartial(e)) || [];
    message.acquisitionTimestamp = object.acquisitionTimestamp ?? undefined;
    message.transformsSnapshot =
      object.transformsSnapshot !== undefined &&
      object.transformsSnapshot !== null
        ? FrameTreeSnapshot.fromPartial(object.transformsSnapshot)
        : undefined;
    message.velocityOfBodyInVision =
      object.velocityOfBodyInVision !== undefined &&
      object.velocityOfBodyInVision !== null
        ? SE3Velocity.fromPartial(object.velocityOfBodyInVision)
        : undefined;
    message.velocityOfBodyInOdom =
      object.velocityOfBodyInOdom !== undefined &&
      object.velocityOfBodyInOdom !== null
        ? SE3Velocity.fromPartial(object.velocityOfBodyInOdom)
        : undefined;
    return message;
  },
};

function createBaseJointState(): JointState {
  return {
    name: "",
    position: undefined,
    velocity: undefined,
    acceleration: undefined,
    load: undefined,
  };
}

export const JointState = {
  encode(
    message: JointState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.position !== undefined) {
      DoubleValue.encode(
        { value: message.position! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.velocity !== undefined) {
      DoubleValue.encode(
        { value: message.velocity! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.acceleration !== undefined) {
      DoubleValue.encode(
        { value: message.acceleration! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.load !== undefined) {
      DoubleValue.encode(
        { value: message.load! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JointState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJointState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.position = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.velocity = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 4:
          message.acceleration = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 5:
          message.load = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): JointState {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      position: isSet(object.position) ? Number(object.position) : undefined,
      velocity: isSet(object.velocity) ? Number(object.velocity) : undefined,
      acceleration: isSet(object.acceleration)
        ? Number(object.acceleration)
        : undefined,
      load: isSet(object.load) ? Number(object.load) : undefined,
    };
  },

  toJSON(message: JointState): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.position !== undefined && (obj.position = message.position);
    message.velocity !== undefined && (obj.velocity = message.velocity);
    message.acceleration !== undefined &&
      (obj.acceleration = message.acceleration);
    message.load !== undefined && (obj.load = message.load);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<JointState>, I>>(
    object: I
  ): JointState {
    const message = createBaseJointState();
    message.name = object.name ?? "";
    message.position = object.position ?? undefined;
    message.velocity = object.velocity ?? undefined;
    message.acceleration = object.acceleration ?? undefined;
    message.load = object.load ?? undefined;
    return message;
  },
};

function createBaseBehaviorFaultState(): BehaviorFaultState {
  return { faults: [] };
}

export const BehaviorFaultState = {
  encode(
    message: BehaviorFaultState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.faults) {
      BehaviorFault.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BehaviorFaultState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBehaviorFaultState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.faults.push(BehaviorFault.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BehaviorFaultState {
    return {
      faults: Array.isArray(object?.faults)
        ? object.faults.map((e: any) => BehaviorFault.fromJSON(e))
        : [],
    };
  },

  toJSON(message: BehaviorFaultState): unknown {
    const obj: any = {};
    if (message.faults) {
      obj.faults = message.faults.map((e) =>
        e ? BehaviorFault.toJSON(e) : undefined
      );
    } else {
      obj.faults = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BehaviorFaultState>, I>>(
    object: I
  ): BehaviorFaultState {
    const message = createBaseBehaviorFaultState();
    message.faults =
      object.faults?.map((e) => BehaviorFault.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBehaviorFault(): BehaviorFault {
  return { behaviorFaultId: 0, onsetTimestamp: undefined, cause: 0, status: 0 };
}

export const BehaviorFault = {
  encode(
    message: BehaviorFault,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.behaviorFaultId !== 0) {
      writer.uint32(8).uint32(message.behaviorFaultId);
    }
    if (message.onsetTimestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.onsetTimestamp),
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.cause !== 0) {
      writer.uint32(24).int32(message.cause);
    }
    if (message.status !== 0) {
      writer.uint32(32).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BehaviorFault {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBehaviorFault();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.behaviorFaultId = reader.uint32();
          break;
        case 2:
          message.onsetTimestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.cause = reader.int32() as any;
          break;
        case 4:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BehaviorFault {
    return {
      behaviorFaultId: isSet(object.behaviorFaultId)
        ? Number(object.behaviorFaultId)
        : 0,
      onsetTimestamp: isSet(object.onsetTimestamp)
        ? fromJsonTimestamp(object.onsetTimestamp)
        : undefined,
      cause: isSet(object.cause)
        ? behaviorFault_CauseFromJSON(object.cause)
        : 0,
      status: isSet(object.status)
        ? behaviorFault_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: BehaviorFault): unknown {
    const obj: any = {};
    message.behaviorFaultId !== undefined &&
      (obj.behaviorFaultId = Math.round(message.behaviorFaultId));
    message.onsetTimestamp !== undefined &&
      (obj.onsetTimestamp = message.onsetTimestamp.toISOString());
    message.cause !== undefined &&
      (obj.cause = behaviorFault_CauseToJSON(message.cause));
    message.status !== undefined &&
      (obj.status = behaviorFault_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BehaviorFault>, I>>(
    object: I
  ): BehaviorFault {
    const message = createBaseBehaviorFault();
    message.behaviorFaultId = object.behaviorFaultId ?? 0;
    message.onsetTimestamp = object.onsetTimestamp ?? undefined;
    message.cause = object.cause ?? 0;
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseRobotMetrics(): RobotMetrics {
  return { timestamp: undefined, metrics: [] };
}

export const RobotMetrics = {
  encode(
    message: RobotMetrics,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.timestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestamp),
        writer.uint32(10).fork()
      ).ldelim();
    }
    for (const v of message.metrics) {
      Parameter.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RobotMetrics {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRobotMetrics();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.metrics.push(Parameter.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RobotMetrics {
    return {
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
      metrics: Array.isArray(object?.metrics)
        ? object.metrics.map((e: any) => Parameter.fromJSON(e))
        : [],
    };
  },

  toJSON(message: RobotMetrics): unknown {
    const obj: any = {};
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp.toISOString());
    if (message.metrics) {
      obj.metrics = message.metrics.map((e) =>
        e ? Parameter.toJSON(e) : undefined
      );
    } else {
      obj.metrics = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RobotMetrics>, I>>(
    object: I
  ): RobotMetrics {
    const message = createBaseRobotMetrics();
    message.timestamp = object.timestamp ?? undefined;
    message.metrics =
      object.metrics?.map((e) => Parameter.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCommsState(): CommsState {
  return { timestamp: undefined, wifiState: undefined };
}

export const CommsState = {
  encode(
    message: CommsState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.timestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestamp),
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.wifiState !== undefined) {
      WiFiState.encode(message.wifiState, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommsState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommsState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.wifiState = WiFiState.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommsState {
    return {
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
      wifiState: isSet(object.wifiState)
        ? WiFiState.fromJSON(object.wifiState)
        : undefined,
    };
  },

  toJSON(message: CommsState): unknown {
    const obj: any = {};
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp.toISOString());
    message.wifiState !== undefined &&
      (obj.wifiState = message.wifiState
        ? WiFiState.toJSON(message.wifiState)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommsState>, I>>(
    object: I
  ): CommsState {
    const message = createBaseCommsState();
    message.timestamp = object.timestamp ?? undefined;
    message.wifiState =
      object.wifiState !== undefined && object.wifiState !== null
        ? WiFiState.fromPartial(object.wifiState)
        : undefined;
    return message;
  },
};

function createBaseWiFiState(): WiFiState {
  return { currentMode: 0, essid: "" };
}

export const WiFiState = {
  encode(
    message: WiFiState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.currentMode !== 0) {
      writer.uint32(8).int32(message.currentMode);
    }
    if (message.essid !== "") {
      writer.uint32(18).string(message.essid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WiFiState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWiFiState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.currentMode = reader.int32() as any;
          break;
        case 2:
          message.essid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WiFiState {
    return {
      currentMode: isSet(object.currentMode)
        ? wiFiState_ModeFromJSON(object.currentMode)
        : 0,
      essid: isSet(object.essid) ? String(object.essid) : "",
    };
  },

  toJSON(message: WiFiState): unknown {
    const obj: any = {};
    message.currentMode !== undefined &&
      (obj.currentMode = wiFiState_ModeToJSON(message.currentMode));
    message.essid !== undefined && (obj.essid = message.essid);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WiFiState>, I>>(
    object: I
  ): WiFiState {
    const message = createBaseWiFiState();
    message.currentMode = object.currentMode ?? 0;
    message.essid = object.essid ?? "";
    return message;
  },
};

function createBaseFootState(): FootState {
  return { footPositionRtBody: undefined, contact: 0, terrain: undefined };
}

export const FootState = {
  encode(
    message: FootState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.footPositionRtBody !== undefined) {
      Vec3.encode(
        message.footPositionRtBody,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.contact !== 0) {
      writer.uint32(16).int32(message.contact);
    }
    if (message.terrain !== undefined) {
      FootState_TerrainState.encode(
        message.terrain,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FootState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFootState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.footPositionRtBody = Vec3.decode(reader, reader.uint32());
          break;
        case 2:
          message.contact = reader.int32() as any;
          break;
        case 3:
          message.terrain = FootState_TerrainState.decode(
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

  fromJSON(object: any): FootState {
    return {
      footPositionRtBody: isSet(object.footPositionRtBody)
        ? Vec3.fromJSON(object.footPositionRtBody)
        : undefined,
      contact: isSet(object.contact)
        ? footState_ContactFromJSON(object.contact)
        : 0,
      terrain: isSet(object.terrain)
        ? FootState_TerrainState.fromJSON(object.terrain)
        : undefined,
    };
  },

  toJSON(message: FootState): unknown {
    const obj: any = {};
    message.footPositionRtBody !== undefined &&
      (obj.footPositionRtBody = message.footPositionRtBody
        ? Vec3.toJSON(message.footPositionRtBody)
        : undefined);
    message.contact !== undefined &&
      (obj.contact = footState_ContactToJSON(message.contact));
    message.terrain !== undefined &&
      (obj.terrain = message.terrain
        ? FootState_TerrainState.toJSON(message.terrain)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FootState>, I>>(
    object: I
  ): FootState {
    const message = createBaseFootState();
    message.footPositionRtBody =
      object.footPositionRtBody !== undefined &&
      object.footPositionRtBody !== null
        ? Vec3.fromPartial(object.footPositionRtBody)
        : undefined;
    message.contact = object.contact ?? 0;
    message.terrain =
      object.terrain !== undefined && object.terrain !== null
        ? FootState_TerrainState.fromPartial(object.terrain)
        : undefined;
    return message;
  },
};

function createBaseFootState_TerrainState(): FootState_TerrainState {
  return {
    groundMuEst: 0,
    frameName: "",
    footSlipDistanceRtFrame: undefined,
    footSlipVelocityRtFrame: undefined,
    groundContactNormalRtFrame: undefined,
    visualSurfaceGroundPenetrationMean: 0,
    visualSurfaceGroundPenetrationStd: 0,
  };
}

export const FootState_TerrainState = {
  encode(
    message: FootState_TerrainState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.groundMuEst !== 0) {
      writer.uint32(9).double(message.groundMuEst);
    }
    if (message.frameName !== "") {
      writer.uint32(18).string(message.frameName);
    }
    if (message.footSlipDistanceRtFrame !== undefined) {
      Vec3.encode(
        message.footSlipDistanceRtFrame,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.footSlipVelocityRtFrame !== undefined) {
      Vec3.encode(
        message.footSlipVelocityRtFrame,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.groundContactNormalRtFrame !== undefined) {
      Vec3.encode(
        message.groundContactNormalRtFrame,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.visualSurfaceGroundPenetrationMean !== 0) {
      writer.uint32(49).double(message.visualSurfaceGroundPenetrationMean);
    }
    if (message.visualSurfaceGroundPenetrationStd !== 0) {
      writer.uint32(57).double(message.visualSurfaceGroundPenetrationStd);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): FootState_TerrainState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFootState_TerrainState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.groundMuEst = reader.double();
          break;
        case 2:
          message.frameName = reader.string();
          break;
        case 3:
          message.footSlipDistanceRtFrame = Vec3.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.footSlipVelocityRtFrame = Vec3.decode(
            reader,
            reader.uint32()
          );
          break;
        case 5:
          message.groundContactNormalRtFrame = Vec3.decode(
            reader,
            reader.uint32()
          );
          break;
        case 6:
          message.visualSurfaceGroundPenetrationMean = reader.double();
          break;
        case 7:
          message.visualSurfaceGroundPenetrationStd = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FootState_TerrainState {
    return {
      groundMuEst: isSet(object.groundMuEst) ? Number(object.groundMuEst) : 0,
      frameName: isSet(object.frameName) ? String(object.frameName) : "",
      footSlipDistanceRtFrame: isSet(object.footSlipDistanceRtFrame)
        ? Vec3.fromJSON(object.footSlipDistanceRtFrame)
        : undefined,
      footSlipVelocityRtFrame: isSet(object.footSlipVelocityRtFrame)
        ? Vec3.fromJSON(object.footSlipVelocityRtFrame)
        : undefined,
      groundContactNormalRtFrame: isSet(object.groundContactNormalRtFrame)
        ? Vec3.fromJSON(object.groundContactNormalRtFrame)
        : undefined,
      visualSurfaceGroundPenetrationMean: isSet(
        object.visualSurfaceGroundPenetrationMean
      )
        ? Number(object.visualSurfaceGroundPenetrationMean)
        : 0,
      visualSurfaceGroundPenetrationStd: isSet(
        object.visualSurfaceGroundPenetrationStd
      )
        ? Number(object.visualSurfaceGroundPenetrationStd)
        : 0,
    };
  },

  toJSON(message: FootState_TerrainState): unknown {
    const obj: any = {};
    message.groundMuEst !== undefined &&
      (obj.groundMuEst = message.groundMuEst);
    message.frameName !== undefined && (obj.frameName = message.frameName);
    message.footSlipDistanceRtFrame !== undefined &&
      (obj.footSlipDistanceRtFrame = message.footSlipDistanceRtFrame
        ? Vec3.toJSON(message.footSlipDistanceRtFrame)
        : undefined);
    message.footSlipVelocityRtFrame !== undefined &&
      (obj.footSlipVelocityRtFrame = message.footSlipVelocityRtFrame
        ? Vec3.toJSON(message.footSlipVelocityRtFrame)
        : undefined);
    message.groundContactNormalRtFrame !== undefined &&
      (obj.groundContactNormalRtFrame = message.groundContactNormalRtFrame
        ? Vec3.toJSON(message.groundContactNormalRtFrame)
        : undefined);
    message.visualSurfaceGroundPenetrationMean !== undefined &&
      (obj.visualSurfaceGroundPenetrationMean =
        message.visualSurfaceGroundPenetrationMean);
    message.visualSurfaceGroundPenetrationStd !== undefined &&
      (obj.visualSurfaceGroundPenetrationStd =
        message.visualSurfaceGroundPenetrationStd);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FootState_TerrainState>, I>>(
    object: I
  ): FootState_TerrainState {
    const message = createBaseFootState_TerrainState();
    message.groundMuEst = object.groundMuEst ?? 0;
    message.frameName = object.frameName ?? "";
    message.footSlipDistanceRtFrame =
      object.footSlipDistanceRtFrame !== undefined &&
      object.footSlipDistanceRtFrame !== null
        ? Vec3.fromPartial(object.footSlipDistanceRtFrame)
        : undefined;
    message.footSlipVelocityRtFrame =
      object.footSlipVelocityRtFrame !== undefined &&
      object.footSlipVelocityRtFrame !== null
        ? Vec3.fromPartial(object.footSlipVelocityRtFrame)
        : undefined;
    message.groundContactNormalRtFrame =
      object.groundContactNormalRtFrame !== undefined &&
      object.groundContactNormalRtFrame !== null
        ? Vec3.fromPartial(object.groundContactNormalRtFrame)
        : undefined;
    message.visualSurfaceGroundPenetrationMean =
      object.visualSurfaceGroundPenetrationMean ?? 0;
    message.visualSurfaceGroundPenetrationStd =
      object.visualSurfaceGroundPenetrationStd ?? 0;
    return message;
  },
};

function createBaseManipulatorState(): ManipulatorState {
  return {
    gripperOpenPercentage: 0,
    isGripperHoldingItem: false,
    estimatedEndEffectorForceInHand: undefined,
    stowState: 0,
    velocityOfHandInVision: undefined,
    velocityOfHandInOdom: undefined,
    carryState: 0,
  };
}

export const ManipulatorState = {
  encode(
    message: ManipulatorState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.gripperOpenPercentage !== 0) {
      writer.uint32(97).double(message.gripperOpenPercentage);
    }
    if (message.isGripperHoldingItem === true) {
      writer.uint32(48).bool(message.isGripperHoldingItem);
    }
    if (message.estimatedEndEffectorForceInHand !== undefined) {
      Vec3.encode(
        message.estimatedEndEffectorForceInHand,
        writer.uint32(106).fork()
      ).ldelim();
    }
    if (message.stowState !== 0) {
      writer.uint32(72).int32(message.stowState);
    }
    if (message.velocityOfHandInVision !== undefined) {
      SE3Velocity.encode(
        message.velocityOfHandInVision,
        writer.uint32(114).fork()
      ).ldelim();
    }
    if (message.velocityOfHandInOdom !== undefined) {
      SE3Velocity.encode(
        message.velocityOfHandInOdom,
        writer.uint32(122).fork()
      ).ldelim();
    }
    if (message.carryState !== 0) {
      writer.uint32(128).int32(message.carryState);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ManipulatorState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseManipulatorState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 12:
          message.gripperOpenPercentage = reader.double();
          break;
        case 6:
          message.isGripperHoldingItem = reader.bool();
          break;
        case 13:
          message.estimatedEndEffectorForceInHand = Vec3.decode(
            reader,
            reader.uint32()
          );
          break;
        case 9:
          message.stowState = reader.int32() as any;
          break;
        case 14:
          message.velocityOfHandInVision = SE3Velocity.decode(
            reader,
            reader.uint32()
          );
          break;
        case 15:
          message.velocityOfHandInOdom = SE3Velocity.decode(
            reader,
            reader.uint32()
          );
          break;
        case 16:
          message.carryState = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ManipulatorState {
    return {
      gripperOpenPercentage: isSet(object.gripperOpenPercentage)
        ? Number(object.gripperOpenPercentage)
        : 0,
      isGripperHoldingItem: isSet(object.isGripperHoldingItem)
        ? Boolean(object.isGripperHoldingItem)
        : false,
      estimatedEndEffectorForceInHand: isSet(
        object.estimatedEndEffectorForceInHand
      )
        ? Vec3.fromJSON(object.estimatedEndEffectorForceInHand)
        : undefined,
      stowState: isSet(object.stowState)
        ? manipulatorState_StowStateFromJSON(object.stowState)
        : 0,
      velocityOfHandInVision: isSet(object.velocityOfHandInVision)
        ? SE3Velocity.fromJSON(object.velocityOfHandInVision)
        : undefined,
      velocityOfHandInOdom: isSet(object.velocityOfHandInOdom)
        ? SE3Velocity.fromJSON(object.velocityOfHandInOdom)
        : undefined,
      carryState: isSet(object.carryState)
        ? manipulatorState_CarryStateFromJSON(object.carryState)
        : 0,
    };
  },

  toJSON(message: ManipulatorState): unknown {
    const obj: any = {};
    message.gripperOpenPercentage !== undefined &&
      (obj.gripperOpenPercentage = message.gripperOpenPercentage);
    message.isGripperHoldingItem !== undefined &&
      (obj.isGripperHoldingItem = message.isGripperHoldingItem);
    message.estimatedEndEffectorForceInHand !== undefined &&
      (obj.estimatedEndEffectorForceInHand =
        message.estimatedEndEffectorForceInHand
          ? Vec3.toJSON(message.estimatedEndEffectorForceInHand)
          : undefined);
    message.stowState !== undefined &&
      (obj.stowState = manipulatorState_StowStateToJSON(message.stowState));
    message.velocityOfHandInVision !== undefined &&
      (obj.velocityOfHandInVision = message.velocityOfHandInVision
        ? SE3Velocity.toJSON(message.velocityOfHandInVision)
        : undefined);
    message.velocityOfHandInOdom !== undefined &&
      (obj.velocityOfHandInOdom = message.velocityOfHandInOdom
        ? SE3Velocity.toJSON(message.velocityOfHandInOdom)
        : undefined);
    message.carryState !== undefined &&
      (obj.carryState = manipulatorState_CarryStateToJSON(message.carryState));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ManipulatorState>, I>>(
    object: I
  ): ManipulatorState {
    const message = createBaseManipulatorState();
    message.gripperOpenPercentage = object.gripperOpenPercentage ?? 0;
    message.isGripperHoldingItem = object.isGripperHoldingItem ?? false;
    message.estimatedEndEffectorForceInHand =
      object.estimatedEndEffectorForceInHand !== undefined &&
      object.estimatedEndEffectorForceInHand !== null
        ? Vec3.fromPartial(object.estimatedEndEffectorForceInHand)
        : undefined;
    message.stowState = object.stowState ?? 0;
    message.velocityOfHandInVision =
      object.velocityOfHandInVision !== undefined &&
      object.velocityOfHandInVision !== null
        ? SE3Velocity.fromPartial(object.velocityOfHandInVision)
        : undefined;
    message.velocityOfHandInOdom =
      object.velocityOfHandInOdom !== undefined &&
      object.velocityOfHandInOdom !== null
        ? SE3Velocity.fromPartial(object.velocityOfHandInOdom)
        : undefined;
    message.carryState = object.carryState ?? 0;
    return message;
  },
};

function createBaseServiceFaultState(): ServiceFaultState {
  return { faults: [], historicalFaults: [], aggregated: {} };
}

export const ServiceFaultState = {
  encode(
    message: ServiceFaultState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.faults) {
      ServiceFault.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.historicalFaults) {
      ServiceFault.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    Object.entries(message.aggregated).forEach(([key, value]) => {
      ServiceFaultState_AggregatedEntry.encode(
        { key: key as any, value },
        writer.uint32(26).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ServiceFaultState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseServiceFaultState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.faults.push(ServiceFault.decode(reader, reader.uint32()));
          break;
        case 2:
          message.historicalFaults.push(
            ServiceFault.decode(reader, reader.uint32())
          );
          break;
        case 3:
          const entry3 = ServiceFaultState_AggregatedEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry3.value !== undefined) {
            message.aggregated[entry3.key] = entry3.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ServiceFaultState {
    return {
      faults: Array.isArray(object?.faults)
        ? object.faults.map((e: any) => ServiceFault.fromJSON(e))
        : [],
      historicalFaults: Array.isArray(object?.historicalFaults)
        ? object.historicalFaults.map((e: any) => ServiceFault.fromJSON(e))
        : [],
      aggregated: isObject(object.aggregated)
        ? Object.entries(object.aggregated).reduce<{
            [key: string]: ServiceFault_Severity;
          }>((acc, [key, value]) => {
            acc[key] = serviceFault_SeverityFromJSON(value);
            return acc;
          }, {})
        : {},
    };
  },

  toJSON(message: ServiceFaultState): unknown {
    const obj: any = {};
    if (message.faults) {
      obj.faults = message.faults.map((e) =>
        e ? ServiceFault.toJSON(e) : undefined
      );
    } else {
      obj.faults = [];
    }
    if (message.historicalFaults) {
      obj.historicalFaults = message.historicalFaults.map((e) =>
        e ? ServiceFault.toJSON(e) : undefined
      );
    } else {
      obj.historicalFaults = [];
    }
    obj.aggregated = {};
    if (message.aggregated) {
      Object.entries(message.aggregated).forEach(([k, v]) => {
        obj.aggregated[k] = serviceFault_SeverityToJSON(v);
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ServiceFaultState>, I>>(
    object: I
  ): ServiceFaultState {
    const message = createBaseServiceFaultState();
    message.faults =
      object.faults?.map((e) => ServiceFault.fromPartial(e)) || [];
    message.historicalFaults =
      object.historicalFaults?.map((e) => ServiceFault.fromPartial(e)) || [];
    message.aggregated = Object.entries(object.aggregated ?? {}).reduce<{
      [key: string]: ServiceFault_Severity;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value as ServiceFault_Severity;
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseServiceFaultState_AggregatedEntry(): ServiceFaultState_AggregatedEntry {
  return { key: "", value: 0 };
}

export const ServiceFaultState_AggregatedEntry = {
  encode(
    message: ServiceFaultState_AggregatedEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(16).int32(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ServiceFaultState_AggregatedEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseServiceFaultState_AggregatedEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ServiceFaultState_AggregatedEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value)
        ? serviceFault_SeverityFromJSON(object.value)
        : 0,
    };
  },

  toJSON(message: ServiceFaultState_AggregatedEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = serviceFault_SeverityToJSON(message.value));
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<ServiceFaultState_AggregatedEntry>, I>
  >(object: I): ServiceFaultState_AggregatedEntry {
    const message = createBaseServiceFaultState_AggregatedEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseTerrainState(): TerrainState {
  return { isUnsafeToSit: false };
}

export const TerrainState = {
  encode(
    message: TerrainState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.isUnsafeToSit === true) {
      writer.uint32(8).bool(message.isUnsafeToSit);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TerrainState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTerrainState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.isUnsafeToSit = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TerrainState {
    return {
      isUnsafeToSit: isSet(object.isUnsafeToSit)
        ? Boolean(object.isUnsafeToSit)
        : false,
    };
  },

  toJSON(message: TerrainState): unknown {
    const obj: any = {};
    message.isUnsafeToSit !== undefined &&
      (obj.isUnsafeToSit = message.isUnsafeToSit);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TerrainState>, I>>(
    object: I
  ): TerrainState {
    const message = createBaseTerrainState();
    message.isUnsafeToSit = object.isUnsafeToSit ?? false;
    return message;
  },
};

function createBaseRobotStateRequest(): RobotStateRequest {
  return { header: undefined };
}

export const RobotStateRequest = {
  encode(
    message: RobotStateRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RobotStateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRobotStateRequest();
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

  fromJSON(object: any): RobotStateRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: RobotStateRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RobotStateRequest>, I>>(
    object: I
  ): RobotStateRequest {
    const message = createBaseRobotStateRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseRobotStateResponse(): RobotStateResponse {
  return { header: undefined, robotState: undefined };
}

export const RobotStateResponse = {
  encode(
    message: RobotStateResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.robotState !== undefined) {
      RobotState.encode(message.robotState, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RobotStateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRobotStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.robotState = RobotState.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RobotStateResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      robotState: isSet(object.robotState)
        ? RobotState.fromJSON(object.robotState)
        : undefined,
    };
  },

  toJSON(message: RobotStateResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.robotState !== undefined &&
      (obj.robotState = message.robotState
        ? RobotState.toJSON(message.robotState)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RobotStateResponse>, I>>(
    object: I
  ): RobotStateResponse {
    const message = createBaseRobotStateResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.robotState =
      object.robotState !== undefined && object.robotState !== null
        ? RobotState.fromPartial(object.robotState)
        : undefined;
    return message;
  },
};

function createBaseRobotMetricsRequest(): RobotMetricsRequest {
  return { header: undefined };
}

export const RobotMetricsRequest = {
  encode(
    message: RobotMetricsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RobotMetricsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRobotMetricsRequest();
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

  fromJSON(object: any): RobotMetricsRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: RobotMetricsRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RobotMetricsRequest>, I>>(
    object: I
  ): RobotMetricsRequest {
    const message = createBaseRobotMetricsRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseRobotMetricsResponse(): RobotMetricsResponse {
  return { header: undefined, robotMetrics: undefined };
}

export const RobotMetricsResponse = {
  encode(
    message: RobotMetricsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.robotMetrics !== undefined) {
      RobotMetrics.encode(
        message.robotMetrics,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RobotMetricsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRobotMetricsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.robotMetrics = RobotMetrics.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RobotMetricsResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      robotMetrics: isSet(object.robotMetrics)
        ? RobotMetrics.fromJSON(object.robotMetrics)
        : undefined,
    };
  },

  toJSON(message: RobotMetricsResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.robotMetrics !== undefined &&
      (obj.robotMetrics = message.robotMetrics
        ? RobotMetrics.toJSON(message.robotMetrics)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RobotMetricsResponse>, I>>(
    object: I
  ): RobotMetricsResponse {
    const message = createBaseRobotMetricsResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.robotMetrics =
      object.robotMetrics !== undefined && object.robotMetrics !== null
        ? RobotMetrics.fromPartial(object.robotMetrics)
        : undefined;
    return message;
  },
};

function createBaseRobotHardwareConfigurationRequest(): RobotHardwareConfigurationRequest {
  return { header: undefined };
}

export const RobotHardwareConfigurationRequest = {
  encode(
    message: RobotHardwareConfigurationRequest,
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
  ): RobotHardwareConfigurationRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRobotHardwareConfigurationRequest();
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

  fromJSON(object: any): RobotHardwareConfigurationRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: RobotHardwareConfigurationRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<RobotHardwareConfigurationRequest>, I>
  >(object: I): RobotHardwareConfigurationRequest {
    const message = createBaseRobotHardwareConfigurationRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseRobotHardwareConfigurationResponse(): RobotHardwareConfigurationResponse {
  return { header: undefined, hardwareConfiguration: undefined };
}

export const RobotHardwareConfigurationResponse = {
  encode(
    message: RobotHardwareConfigurationResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.hardwareConfiguration !== undefined) {
      HardwareConfiguration.encode(
        message.hardwareConfiguration,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RobotHardwareConfigurationResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRobotHardwareConfigurationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.hardwareConfiguration = HardwareConfiguration.decode(
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

  fromJSON(object: any): RobotHardwareConfigurationResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      hardwareConfiguration: isSet(object.hardwareConfiguration)
        ? HardwareConfiguration.fromJSON(object.hardwareConfiguration)
        : undefined,
    };
  },

  toJSON(message: RobotHardwareConfigurationResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.hardwareConfiguration !== undefined &&
      (obj.hardwareConfiguration = message.hardwareConfiguration
        ? HardwareConfiguration.toJSON(message.hardwareConfiguration)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<RobotHardwareConfigurationResponse>, I>
  >(object: I): RobotHardwareConfigurationResponse {
    const message = createBaseRobotHardwareConfigurationResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.hardwareConfiguration =
      object.hardwareConfiguration !== undefined &&
      object.hardwareConfiguration !== null
        ? HardwareConfiguration.fromPartial(object.hardwareConfiguration)
        : undefined;
    return message;
  },
};

function createBaseRobotLinkModelRequest(): RobotLinkModelRequest {
  return { header: undefined, linkName: "" };
}

export const RobotLinkModelRequest = {
  encode(
    message: RobotLinkModelRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.linkName !== "") {
      writer.uint32(18).string(message.linkName);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RobotLinkModelRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRobotLinkModelRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.linkName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RobotLinkModelRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      linkName: isSet(object.linkName) ? String(object.linkName) : "",
    };
  },

  toJSON(message: RobotLinkModelRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.linkName !== undefined && (obj.linkName = message.linkName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RobotLinkModelRequest>, I>>(
    object: I
  ): RobotLinkModelRequest {
    const message = createBaseRobotLinkModelRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.linkName = object.linkName ?? "";
    return message;
  },
};

function createBaseRobotLinkModelResponse(): RobotLinkModelResponse {
  return { header: undefined, linkModel: undefined };
}

export const RobotLinkModelResponse = {
  encode(
    message: RobotLinkModelResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.linkModel !== undefined) {
      Skeleton_Link_ObjModel.encode(
        message.linkModel,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RobotLinkModelResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRobotLinkModelResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.linkModel = Skeleton_Link_ObjModel.decode(
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

  fromJSON(object: any): RobotLinkModelResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      linkModel: isSet(object.linkModel)
        ? Skeleton_Link_ObjModel.fromJSON(object.linkModel)
        : undefined,
    };
  },

  toJSON(message: RobotLinkModelResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.linkModel !== undefined &&
      (obj.linkModel = message.linkModel
        ? Skeleton_Link_ObjModel.toJSON(message.linkModel)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RobotLinkModelResponse>, I>>(
    object: I
  ): RobotLinkModelResponse {
    const message = createBaseRobotLinkModelResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.linkModel =
      object.linkModel !== undefined && object.linkModel !== null
        ? Skeleton_Link_ObjModel.fromPartial(object.linkModel)
        : undefined;
    return message;
  },
};

function createBaseRobotImpairedState(): RobotImpairedState {
  return {
    impairedStatus: 0,
    systemFaults: [],
    serviceFaults: [],
    behaviorFaults: [],
  };
}

export const RobotImpairedState = {
  encode(
    message: RobotImpairedState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.impairedStatus !== 0) {
      writer.uint32(8).int32(message.impairedStatus);
    }
    for (const v of message.systemFaults) {
      SystemFault.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.serviceFaults) {
      ServiceFault.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.behaviorFaults) {
      BehaviorFault.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RobotImpairedState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRobotImpairedState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.impairedStatus = reader.int32() as any;
          break;
        case 2:
          message.systemFaults.push(
            SystemFault.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.serviceFaults.push(
            ServiceFault.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.behaviorFaults.push(
            BehaviorFault.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RobotImpairedState {
    return {
      impairedStatus: isSet(object.impairedStatus)
        ? robotImpairedState_ImpairedStatusFromJSON(object.impairedStatus)
        : 0,
      systemFaults: Array.isArray(object?.systemFaults)
        ? object.systemFaults.map((e: any) => SystemFault.fromJSON(e))
        : [],
      serviceFaults: Array.isArray(object?.serviceFaults)
        ? object.serviceFaults.map((e: any) => ServiceFault.fromJSON(e))
        : [],
      behaviorFaults: Array.isArray(object?.behaviorFaults)
        ? object.behaviorFaults.map((e: any) => BehaviorFault.fromJSON(e))
        : [],
    };
  },

  toJSON(message: RobotImpairedState): unknown {
    const obj: any = {};
    message.impairedStatus !== undefined &&
      (obj.impairedStatus = robotImpairedState_ImpairedStatusToJSON(
        message.impairedStatus
      ));
    if (message.systemFaults) {
      obj.systemFaults = message.systemFaults.map((e) =>
        e ? SystemFault.toJSON(e) : undefined
      );
    } else {
      obj.systemFaults = [];
    }
    if (message.serviceFaults) {
      obj.serviceFaults = message.serviceFaults.map((e) =>
        e ? ServiceFault.toJSON(e) : undefined
      );
    } else {
      obj.serviceFaults = [];
    }
    if (message.behaviorFaults) {
      obj.behaviorFaults = message.behaviorFaults.map((e) =>
        e ? BehaviorFault.toJSON(e) : undefined
      );
    } else {
      obj.behaviorFaults = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RobotImpairedState>, I>>(
    object: I
  ): RobotImpairedState {
    const message = createBaseRobotImpairedState();
    message.impairedStatus = object.impairedStatus ?? 0;
    message.systemFaults =
      object.systemFaults?.map((e) => SystemFault.fromPartial(e)) || [];
    message.serviceFaults =
      object.serviceFaults?.map((e) => ServiceFault.fromPartial(e)) || [];
    message.behaviorFaults =
      object.behaviorFaults?.map((e) => BehaviorFault.fromPartial(e)) || [];
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
