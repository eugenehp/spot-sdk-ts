/* eslint-disable */
import { Result, UserData, resultFromJSON, resultToJSON } from "./util";
import { Timestamp } from "../../../google/protobuf/timestamp";
import Long from "long";
import { RequestHeader, ResponseHeader } from "../header";
import { Prompt_Option, Node } from "./nodes";
import { Lease, LeaseUseResult } from "../lease";
import { SE2VelocityLimit } from "../geometry";
import _m0 from "protobufjs/minimal";
import { Int64Value } from "../../../google/protobuf/wrappers";

export const protobufPackage = "bosdyn.api.mission";

/** Get the state of the mission. */
export interface GetStateRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Upper bound on the node state to retrieve, inclusive. Leave unset for the latest data. */
  historyUpperTickBound: number | undefined;
  /** Tick counter for the lower bound of per-node state to retrieve. */
  historyLowerTickBound: number | undefined;
  /** Number of ticks to look into the past from the upper bound. */
  historyPastTicks: number | undefined;
}

/** Response to a GetStateRequest. */
export interface GetStateResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** The requested mission state. */
  state: State | undefined;
}

/** State of the mission service. */
export interface State {
  /** What questions are outstanding? */
  questions: Question[];
  /**
   * History of questions that have been answered.
   * The server will set some limit on the available history.
   */
  answeredQuestions: State_AnsweredQuestion[];
  /**
   * Node states ordered from newest to oldest.
   * history[0] will always be the data from this tick.
   */
  history: State_NodeStatesAtTick[];
  /** Current status of the mission. */
  status: State_Status;
  /**
   * Describes the unexpected error encountered by the mission service.
   * Only filled out if STATUS_ERROR is set.
   */
  error: string;
  /**
   * The mission's tick counter when this state was generated.
   * -1 indicates no mission has been started.
   */
  tickCounter: number;
  /**
   * The mission's ID.
   * -1 indicates no mission has been loaded.
   */
  missionId: number;
}

/** Possible overall status states of the mission. */
export enum State_Status {
  /** STATUS_UNKNOWN - Invalid status, do not use. */
  STATUS_UNKNOWN = 0,
  /** STATUS_FAILURE - The mission has failed due to a node failure. */
  STATUS_FAILURE = 1,
  /** STATUS_RUNNING - The mission is still running. */
  STATUS_RUNNING = 2,
  /** STATUS_SUCCESS - The mission succeeded! */
  STATUS_SUCCESS = 3,
  /** STATUS_PAUSED - Execution has been paused. */
  STATUS_PAUSED = 4,
  /** STATUS_ERROR - The mission service itself encountered an unexpected error, outside of a node failing. */
  STATUS_ERROR = 5,
  /** STATUS_NONE - No mission has been loaded. */
  STATUS_NONE = 6,
  /** STATUS_STOPPED - The mission was stopped before completion. */
  STATUS_STOPPED = 7,
  UNRECOGNIZED = -1,
}

export function state_StatusFromJSON(object: any): State_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return State_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_FAILURE":
      return State_Status.STATUS_FAILURE;
    case 2:
    case "STATUS_RUNNING":
      return State_Status.STATUS_RUNNING;
    case 3:
    case "STATUS_SUCCESS":
      return State_Status.STATUS_SUCCESS;
    case 4:
    case "STATUS_PAUSED":
      return State_Status.STATUS_PAUSED;
    case 5:
    case "STATUS_ERROR":
      return State_Status.STATUS_ERROR;
    case 6:
    case "STATUS_NONE":
      return State_Status.STATUS_NONE;
    case 7:
    case "STATUS_STOPPED":
      return State_Status.STATUS_STOPPED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return State_Status.UNRECOGNIZED;
  }
}

export function state_StatusToJSON(object: State_Status): string {
  switch (object) {
    case State_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case State_Status.STATUS_FAILURE:
      return "STATUS_FAILURE";
    case State_Status.STATUS_RUNNING:
      return "STATUS_RUNNING";
    case State_Status.STATUS_SUCCESS:
      return "STATUS_SUCCESS";
    case State_Status.STATUS_PAUSED:
      return "STATUS_PAUSED";
    case State_Status.STATUS_ERROR:
      return "STATUS_ERROR";
    case State_Status.STATUS_NONE:
      return "STATUS_NONE";
    case State_Status.STATUS_STOPPED:
      return "STATUS_STOPPED";
    case State_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** A question that has been answered already. */
export interface State_AnsweredQuestion {
  /** The question that this state information is related to. */
  question: Question | undefined;
  /** The answer that was provided. */
  acceptedAnswerCode: number;
}

export interface State_NodeStatesAtTick {
  /** The tick counter when this state was produced. */
  tickCounter: number;
  /** Time at which this tick started, in host time basis. */
  tickStartTimestamp: Date | undefined;
  /** At this tick, the state of every node that was ticked, in the order they were ticked. */
  nodeStates: State_NodeStatesAtTick_NodeState[];
}

export interface State_NodeStatesAtTick_NodeState {
  /** The result of this node's tick. */
  result: Result;
  /**
   * May be set when the 'result' is RESULT_FAILURE or RESULT_ERROR, this describes why
   * the node failed. Not all nodes will have an error explaining why they failed.
   */
  error: string;
  /** ID from NodeInfo. */
  id: number;
}

/** A question posed by a Prompt node, or by the internal operation of another node. */
export interface Question {
  /** Identifier of this question, unique across all missions executing on a single host. */
  id: number;
  /** What's asking the question. Should be unique in the active mission. */
  source: string;
  /** The text of the question itself. */
  text: string;
  /**
   * Options to choose from.
   * Uses the submessage from the "prompt" node message.
   */
  options: Prompt_Option[];
  /**
   * Set to true if this question was meant to be answered by some automated system, not a
   * human. Clients should usually avoid generating a UI element to ask such a question.
   */
  forAutonomousProcessing: boolean;
}

/** Answer one of the outstanding questions. */
export interface AnswerQuestionRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Identifier of the question being answered. */
  questionId: number;
  /** The answer_code from the Question, corresponding to the user's choice. */
  code: number;
}

/** Response from the server after a client has answered one of its questions. */
export interface AnswerQuestionResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** The result of the AnswerQuestionRequest. */
  status: AnswerQuestionResponse_Status;
}

/** Possible results for answering a question. */
export enum AnswerQuestionResponse_Status {
  /** STATUS_UNKNOWN - Invalid; do not use. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Answer accepted. */
  STATUS_OK = 1,
  /** STATUS_INVALID_QUESTION_ID - Question ID is not valid / unknown by the mission service. */
  STATUS_INVALID_QUESTION_ID = 2,
  /** STATUS_INVALID_CODE - Answer code is not applicable for the question indicated. */
  STATUS_INVALID_CODE = 3,
  /** STATUS_ALREADY_ANSWERED - Question was already answered. */
  STATUS_ALREADY_ANSWERED = 4,
  UNRECOGNIZED = -1,
}

export function answerQuestionResponse_StatusFromJSON(
  object: any
): AnswerQuestionResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return AnswerQuestionResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return AnswerQuestionResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_INVALID_QUESTION_ID":
      return AnswerQuestionResponse_Status.STATUS_INVALID_QUESTION_ID;
    case 3:
    case "STATUS_INVALID_CODE":
      return AnswerQuestionResponse_Status.STATUS_INVALID_CODE;
    case 4:
    case "STATUS_ALREADY_ANSWERED":
      return AnswerQuestionResponse_Status.STATUS_ALREADY_ANSWERED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AnswerQuestionResponse_Status.UNRECOGNIZED;
  }
}

export function answerQuestionResponse_StatusToJSON(
  object: AnswerQuestionResponse_Status
): string {
  switch (object) {
    case AnswerQuestionResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case AnswerQuestionResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case AnswerQuestionResponse_Status.STATUS_INVALID_QUESTION_ID:
      return "STATUS_INVALID_QUESTION_ID";
    case AnswerQuestionResponse_Status.STATUS_INVALID_CODE:
      return "STATUS_INVALID_CODE";
    case AnswerQuestionResponse_Status.STATUS_ALREADY_ANSWERED:
      return "STATUS_ALREADY_ANSWERED";
    case AnswerQuestionResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Static information about the mission. Used to interpret the mission state. */
export interface MissionInfo {
  /** Mission ID assigned by the server. */
  id: number;
  /** The root node of the mission. */
  root: NodeInfo | undefined;
}

/** Provides children and metadata of a single node within the mission. */
export interface NodeInfo {
  /**
   * Unique to each node within the LOADED mission.
   * Not guaranteed to be consistent between loads of the same mission.
   * Used to identify the nodes in the State message.
   */
  id: number;
  /** Human-readable name of this node, e.g. "Goto waypoint 1", or "Power On". */
  name: string;
  /** Any UserData that was associated with this node. */
  userData: UserData | undefined;
  /** Info on all children of this node, if any are present. */
  children: NodeInfo[];
}

/**
 * General message describing a node that has failed, for example as part of a PlayMission or
 * LoadMission RPC.
 */
export interface FailedNode {
  /** Human-readable name of this node, e.g. "Goto waypoint 1", or "Power On". */
  name: string;
  /** The reason why this node failed. May not be provided by all nodes. */
  error: string;
  /** The type of node, e.g. "bosdyn.api.mission.Sequence". May not be provided by all nodes. */
  implTypename: string;
}

/** A request to play the currently loaded mission for a fixed amount of time. */
export interface PlayMissionRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /**
   * Run the mission until this time.
   * Pause the mission at that time if we have not received a new PlayMissionRequest.
   * This ensures the mission stops relatively quickly if there is an unexpected client drop-out.
   * Clients should regularly send PlayMissionRequests with a pause_time that reflects how often
   * they expect to check in with the mission service.
   */
  pauseTime: Date | undefined;
  /** Leases that the mission will need, plus the lease on the mission service. */
  leases: Lease[];
  /** Settings active until the next PlayMission or RestartMission request. */
  settings: PlaySettings | undefined;
}

/**
 * "Global" settings to use while a mission is running.
 * Some of these settings are not globally applicable. For example, the velocity_limit
 * does not change the speed at which the robot poses the body.
 */
export interface PlaySettings {
  /** Velocity limits on the robot motion. Example use: limit velocity in "navigate to" nodes. */
  velocityLimit: SE2VelocityLimit | undefined;
  /** Disable directed exploration to bypass blocked path sections */
  disableDirectedExploration: boolean;
  /** Disable alternate-route-finding; overrides the per-edge setting in the map. */
  disableAlternateRouteFinding: boolean;
}

/** The PlayMission response message will return the status of the play mission request. */
export interface PlayMissionResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** The result of the play request. */
  status: PlayMissionResponse_Status;
  /** Results from any leases that may have been provided with the play request. */
  leaseUseResults: LeaseUseResult[];
}

/** Possible results for a play request. */
export enum PlayMissionResponse_Status {
  /** STATUS_UNKNOWN - Invalid status, do not use. */
  STATUS_UNKNOWN = 0,
  /**
   * STATUS_OK - Mission is playing, or the mission has already completed.
   * Use GetStateResponse to tell the difference.
   */
  STATUS_OK = 1,
  /** STATUS_NO_MISSION - Call LoadMission first. */
  STATUS_NO_MISSION = 2,
  UNRECOGNIZED = -1,
}

export function playMissionResponse_StatusFromJSON(
  object: any
): PlayMissionResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return PlayMissionResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return PlayMissionResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_NO_MISSION":
      return PlayMissionResponse_Status.STATUS_NO_MISSION;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PlayMissionResponse_Status.UNRECOGNIZED;
  }
}

export function playMissionResponse_StatusToJSON(
  object: PlayMissionResponse_Status
): string {
  switch (object) {
    case PlayMissionResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case PlayMissionResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case PlayMissionResponse_Status.STATUS_NO_MISSION:
      return "STATUS_NO_MISSION";
    case PlayMissionResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** A request to restart the currently loaded mission. */
export interface RestartMissionRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /**
   * Run the mission until this time.
   * Pause the mission at that time if we have not received a new PlayMissionRequest.
   * This ensures the mission stops relatively quickly if there is an unexpected client drop-out.
   * Clients should regularly send PlayMissionRequests with a pause_time that reflects how often
   * they expect to check in with the mission service.
   */
  pauseTime: Date | undefined;
  /** Leases that the mission will need, plus the lease on the mission service. */
  leases: Lease[];
  /** Settings active until the next PlayMission or RestartMission request. */
  settings: PlaySettings | undefined;
}

/** The RestartMission response includes the status and any failed nodes for the request. */
export interface RestartMissionResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** The result of the restart request. */
  status: RestartMissionResponse_Status;
  /**
   * Results from any leases that may have been used.
   * As part of mission validation, some of the non-mission leases may have been used.
   */
  leaseUseResults: LeaseUseResult[];
  /** If certain nodes failed validation, they will be reported back in this field. */
  failedNodes: FailedNode[];
}

/** Possible results of requesting a restart. */
export enum RestartMissionResponse_Status {
  /** STATUS_UNKNOWN - Invalid status, do not use. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Mission has restarted. */
  STATUS_OK = 1,
  /** STATUS_NO_MISSION - Call LoadMission first. */
  STATUS_NO_MISSION = 2,
  /** STATUS_VALIDATE_ERROR - Validation failed. */
  STATUS_VALIDATE_ERROR = 3,
  UNRECOGNIZED = -1,
}

export function restartMissionResponse_StatusFromJSON(
  object: any
): RestartMissionResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return RestartMissionResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return RestartMissionResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_NO_MISSION":
      return RestartMissionResponse_Status.STATUS_NO_MISSION;
    case 3:
    case "STATUS_VALIDATE_ERROR":
      return RestartMissionResponse_Status.STATUS_VALIDATE_ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RestartMissionResponse_Status.UNRECOGNIZED;
  }
}

export function restartMissionResponse_StatusToJSON(
  object: RestartMissionResponse_Status
): string {
  switch (object) {
    case RestartMissionResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case RestartMissionResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case RestartMissionResponse_Status.STATUS_NO_MISSION:
      return "STATUS_NO_MISSION";
    case RestartMissionResponse_Status.STATUS_VALIDATE_ERROR:
      return "STATUS_VALIDATE_ERROR";
    case RestartMissionResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** The LoadMission request specifies a root node for the mission that should be used. */
export interface LoadMissionRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Root node of the mission to load. */
  root: Node | undefined;
  /** Leases that will be needed to validate the mission. */
  leases: Lease[];
}

/**
 * The LoadMission response returns the mission info generated by the service if successfully loaded, and
 * a status and other inforamtion if the request fails.
 */
export interface LoadMissionResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Result of loading the mission. */
  status: LoadMissionResponse_Status;
  /**
   * Results from any leases that may have been used.
   * As part of mission validation, some of the non-mission leases may have been used.
   */
  leaseUseResults: LeaseUseResult[];
  /** Provides the structure of the mission. Set when loading succeeds. */
  missionInfo: MissionInfo | undefined;
  /** If certain nodes failed compilation or validation, they will be reported back in this field. */
  failedNodes: FailedNode[];
}

/** Possible results of loading a mission. */
export enum LoadMissionResponse_Status {
  /** STATUS_UNKNOWN - Invalid status, do not use. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - The mission was loaded successfully. */
  STATUS_OK = 1,
  /** STATUS_COMPILE_ERROR - Load-time compilation failed. The mission was malformed. */
  STATUS_COMPILE_ERROR = 2,
  /** STATUS_VALIDATE_ERROR - Load-time validation failed. Some part of the mission was unable to initialize. */
  STATUS_VALIDATE_ERROR = 3,
  UNRECOGNIZED = -1,
}

export function loadMissionResponse_StatusFromJSON(
  object: any
): LoadMissionResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return LoadMissionResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return LoadMissionResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_COMPILE_ERROR":
      return LoadMissionResponse_Status.STATUS_COMPILE_ERROR;
    case 3:
    case "STATUS_VALIDATE_ERROR":
      return LoadMissionResponse_Status.STATUS_VALIDATE_ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LoadMissionResponse_Status.UNRECOGNIZED;
  }
}

export function loadMissionResponse_StatusToJSON(
  object: LoadMissionResponse_Status
): string {
  switch (object) {
    case LoadMissionResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case LoadMissionResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case LoadMissionResponse_Status.STATUS_COMPILE_ERROR:
      return "STATUS_COMPILE_ERROR";
    case LoadMissionResponse_Status.STATUS_VALIDATE_ERROR:
      return "STATUS_VALIDATE_ERROR";
    case LoadMissionResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Request mission information.
 * This covers information that stays static until a new mission is loaded.
 */
export interface GetInfoRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/** Provides the currently loaded mission's information. */
export interface GetInfoResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /**
   * Description of the loaded mission's structure.
   * Unset if no mission has been successfully loaded.
   */
  missionInfo: MissionInfo | undefined;
}

/** The PauseMission request message will pause the mission that is currently executing, if there is one. */
export interface PauseMissionRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Lease on the mission service. */
  lease: Lease | undefined;
}

/** The PauseMission response message will return the status of the request. */
export interface PauseMissionResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Result of the pause request. */
  status: PauseMissionResponse_Status;
  /** Result of the lease in the pause request. */
  leaseUseResult: LeaseUseResult | undefined;
}

/** Possible results of a pause request. */
export enum PauseMissionResponse_Status {
  /** STATUS_UNKNOWN - Invalid status, do not use. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Mission is paused or finished running. */
  STATUS_OK = 1,
  /**
   * STATUS_NO_MISSION_PLAYING - No mission has started playing.
   * NOT returned when two PauseMissionRequests are received back-to-back. In that case,
   * you will get STATUS_OK.
   */
  STATUS_NO_MISSION_PLAYING = 2,
  UNRECOGNIZED = -1,
}

export function pauseMissionResponse_StatusFromJSON(
  object: any
): PauseMissionResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return PauseMissionResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return PauseMissionResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_NO_MISSION_PLAYING":
      return PauseMissionResponse_Status.STATUS_NO_MISSION_PLAYING;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PauseMissionResponse_Status.UNRECOGNIZED;
  }
}

export function pauseMissionResponse_StatusToJSON(
  object: PauseMissionResponse_Status
): string {
  switch (object) {
    case PauseMissionResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case PauseMissionResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case PauseMissionResponse_Status.STATUS_NO_MISSION_PLAYING:
      return "STATUS_NO_MISSION_PLAYING";
    case PauseMissionResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** The StopMission request message will fully stop the mission. */
export interface StopMissionRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Lease on the mission service. */
  lease: Lease | undefined;
}

/** The StopMission response message will return the status of the request. */
export interface StopMissionResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Result of the stop request. */
  status: StopMissionResponse_Status;
  /** Result of the lease in the stop request. */
  leaseUseResult: LeaseUseResult | undefined;
}

/** Possible results of a stop request. */
export enum StopMissionResponse_Status {
  /** STATUS_UNKNOWN - Invalid status, do not use. */
  STATUS_UNKNOWN = 0,
  /**
   * STATUS_OK - Mission is stopped/complete.
   * The mission state may be in any of the "complete states", e.g. if the mission completed
   * successfully before this RPC took effect, the mission will report STATUS_SUCCESS and not
   * STATUS_STOPPED.
   */
  STATUS_OK = 1,
  /**
   * STATUS_NO_MISSION_PLAYING - No mission has started playing.
   * NOT returned if the mission is already stopped. In that case, you will get STATUS_OK.
   */
  STATUS_NO_MISSION_PLAYING = 2,
  UNRECOGNIZED = -1,
}

export function stopMissionResponse_StatusFromJSON(
  object: any
): StopMissionResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return StopMissionResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return StopMissionResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_NO_MISSION_PLAYING":
      return StopMissionResponse_Status.STATUS_NO_MISSION_PLAYING;
    case -1:
    case "UNRECOGNIZED":
    default:
      return StopMissionResponse_Status.UNRECOGNIZED;
  }
}

export function stopMissionResponse_StatusToJSON(
  object: StopMissionResponse_Status
): string {
  switch (object) {
    case StopMissionResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case StopMissionResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case StopMissionResponse_Status.STATUS_NO_MISSION_PLAYING:
      return "STATUS_NO_MISSION_PLAYING";
    case StopMissionResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** For requesting the mission as it was loaded in LoadMission. */
export interface GetMissionRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/** Responding with the mission as it was loaded in LoadMission. */
export interface GetMissionResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /**
   * Root node of the mission loaded.
   * Unset if no mission has been loaded.
   */
  root: Node | undefined;
  /** Mission ID as reported in MissionInfo. -1 if no mission has been loaded. */
  id: number;
}

function createBaseGetStateRequest(): GetStateRequest {
  return {
    header: undefined,
    historyUpperTickBound: undefined,
    historyLowerTickBound: undefined,
    historyPastTicks: undefined,
  };
}

export const GetStateRequest = {
  encode(
    message: GetStateRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.historyUpperTickBound !== undefined) {
      Int64Value.encode(
        { value: message.historyUpperTickBound! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.historyLowerTickBound !== undefined) {
      writer.uint32(24).int64(message.historyLowerTickBound);
    }
    if (message.historyPastTicks !== undefined) {
      writer.uint32(32).int64(message.historyPastTicks);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetStateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetStateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.historyUpperTickBound = Int64Value.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 3:
          message.historyLowerTickBound = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.historyPastTicks = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetStateRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      historyUpperTickBound: isSet(object.historyUpperTickBound)
        ? Number(object.historyUpperTickBound)
        : undefined,
      historyLowerTickBound: isSet(object.historyLowerTickBound)
        ? Number(object.historyLowerTickBound)
        : undefined,
      historyPastTicks: isSet(object.historyPastTicks)
        ? Number(object.historyPastTicks)
        : undefined,
    };
  },

  toJSON(message: GetStateRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.historyUpperTickBound !== undefined &&
      (obj.historyUpperTickBound = message.historyUpperTickBound);
    message.historyLowerTickBound !== undefined &&
      (obj.historyLowerTickBound = Math.round(message.historyLowerTickBound));
    message.historyPastTicks !== undefined &&
      (obj.historyPastTicks = Math.round(message.historyPastTicks));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetStateRequest>, I>>(
    object: I
  ): GetStateRequest {
    const message = createBaseGetStateRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.historyUpperTickBound = object.historyUpperTickBound ?? undefined;
    message.historyLowerTickBound = object.historyLowerTickBound ?? undefined;
    message.historyPastTicks = object.historyPastTicks ?? undefined;
    return message;
  },
};

function createBaseGetStateResponse(): GetStateResponse {
  return { header: undefined, state: undefined };
}

export const GetStateResponse = {
  encode(
    message: GetStateResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.state !== undefined) {
      State.encode(message.state, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetStateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.state = State.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetStateResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      state: isSet(object.state) ? State.fromJSON(object.state) : undefined,
    };
  },

  toJSON(message: GetStateResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.state !== undefined &&
      (obj.state = message.state ? State.toJSON(message.state) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetStateResponse>, I>>(
    object: I
  ): GetStateResponse {
    const message = createBaseGetStateResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.state =
      object.state !== undefined && object.state !== null
        ? State.fromPartial(object.state)
        : undefined;
    return message;
  },
};

function createBaseState(): State {
  return {
    questions: [],
    answeredQuestions: [],
    history: [],
    status: 0,
    error: "",
    tickCounter: 0,
    missionId: 0,
  };
}

export const State = {
  encode(message: State, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.questions) {
      Question.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.answeredQuestions) {
      State_AnsweredQuestion.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.history) {
      State_NodeStatesAtTick.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(32).int32(message.status);
    }
    if (message.error !== "") {
      writer.uint32(42).string(message.error);
    }
    if (message.tickCounter !== 0) {
      writer.uint32(48).int64(message.tickCounter);
    }
    if (message.missionId !== 0) {
      writer.uint32(56).int64(message.missionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): State {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.questions.push(Question.decode(reader, reader.uint32()));
          break;
        case 2:
          message.answeredQuestions.push(
            State_AnsweredQuestion.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.history.push(
            State_NodeStatesAtTick.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.status = reader.int32() as any;
          break;
        case 5:
          message.error = reader.string();
          break;
        case 6:
          message.tickCounter = longToNumber(reader.int64() as Long);
          break;
        case 7:
          message.missionId = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): State {
    return {
      questions: Array.isArray(object?.questions)
        ? object.questions.map((e: any) => Question.fromJSON(e))
        : [],
      answeredQuestions: Array.isArray(object?.answeredQuestions)
        ? object.answeredQuestions.map((e: any) =>
            State_AnsweredQuestion.fromJSON(e)
          )
        : [],
      history: Array.isArray(object?.history)
        ? object.history.map((e: any) => State_NodeStatesAtTick.fromJSON(e))
        : [],
      status: isSet(object.status) ? state_StatusFromJSON(object.status) : 0,
      error: isSet(object.error) ? String(object.error) : "",
      tickCounter: isSet(object.tickCounter) ? Number(object.tickCounter) : 0,
      missionId: isSet(object.missionId) ? Number(object.missionId) : 0,
    };
  },

  toJSON(message: State): unknown {
    const obj: any = {};
    if (message.questions) {
      obj.questions = message.questions.map((e) =>
        e ? Question.toJSON(e) : undefined
      );
    } else {
      obj.questions = [];
    }
    if (message.answeredQuestions) {
      obj.answeredQuestions = message.answeredQuestions.map((e) =>
        e ? State_AnsweredQuestion.toJSON(e) : undefined
      );
    } else {
      obj.answeredQuestions = [];
    }
    if (message.history) {
      obj.history = message.history.map((e) =>
        e ? State_NodeStatesAtTick.toJSON(e) : undefined
      );
    } else {
      obj.history = [];
    }
    message.status !== undefined &&
      (obj.status = state_StatusToJSON(message.status));
    message.error !== undefined && (obj.error = message.error);
    message.tickCounter !== undefined &&
      (obj.tickCounter = Math.round(message.tickCounter));
    message.missionId !== undefined &&
      (obj.missionId = Math.round(message.missionId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<State>, I>>(object: I): State {
    const message = createBaseState();
    message.questions =
      object.questions?.map((e) => Question.fromPartial(e)) || [];
    message.answeredQuestions =
      object.answeredQuestions?.map((e) =>
        State_AnsweredQuestion.fromPartial(e)
      ) || [];
    message.history =
      object.history?.map((e) => State_NodeStatesAtTick.fromPartial(e)) || [];
    message.status = object.status ?? 0;
    message.error = object.error ?? "";
    message.tickCounter = object.tickCounter ?? 0;
    message.missionId = object.missionId ?? 0;
    return message;
  },
};

function createBaseState_AnsweredQuestion(): State_AnsweredQuestion {
  return { question: undefined, acceptedAnswerCode: 0 };
}

export const State_AnsweredQuestion = {
  encode(
    message: State_AnsweredQuestion,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.question !== undefined) {
      Question.encode(message.question, writer.uint32(10).fork()).ldelim();
    }
    if (message.acceptedAnswerCode !== 0) {
      writer.uint32(16).int64(message.acceptedAnswerCode);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): State_AnsweredQuestion {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseState_AnsweredQuestion();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.question = Question.decode(reader, reader.uint32());
          break;
        case 2:
          message.acceptedAnswerCode = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): State_AnsweredQuestion {
    return {
      question: isSet(object.question)
        ? Question.fromJSON(object.question)
        : undefined,
      acceptedAnswerCode: isSet(object.acceptedAnswerCode)
        ? Number(object.acceptedAnswerCode)
        : 0,
    };
  },

  toJSON(message: State_AnsweredQuestion): unknown {
    const obj: any = {};
    message.question !== undefined &&
      (obj.question = message.question
        ? Question.toJSON(message.question)
        : undefined);
    message.acceptedAnswerCode !== undefined &&
      (obj.acceptedAnswerCode = Math.round(message.acceptedAnswerCode));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<State_AnsweredQuestion>, I>>(
    object: I
  ): State_AnsweredQuestion {
    const message = createBaseState_AnsweredQuestion();
    message.question =
      object.question !== undefined && object.question !== null
        ? Question.fromPartial(object.question)
        : undefined;
    message.acceptedAnswerCode = object.acceptedAnswerCode ?? 0;
    return message;
  },
};

function createBaseState_NodeStatesAtTick(): State_NodeStatesAtTick {
  return { tickCounter: 0, tickStartTimestamp: undefined, nodeStates: [] };
}

export const State_NodeStatesAtTick = {
  encode(
    message: State_NodeStatesAtTick,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.tickCounter !== 0) {
      writer.uint32(8).int64(message.tickCounter);
    }
    if (message.tickStartTimestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.tickStartTimestamp),
        writer.uint32(18).fork()
      ).ldelim();
    }
    for (const v of message.nodeStates) {
      State_NodeStatesAtTick_NodeState.encode(
        v!,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): State_NodeStatesAtTick {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseState_NodeStatesAtTick();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tickCounter = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.tickStartTimestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.nodeStates.push(
            State_NodeStatesAtTick_NodeState.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): State_NodeStatesAtTick {
    return {
      tickCounter: isSet(object.tickCounter) ? Number(object.tickCounter) : 0,
      tickStartTimestamp: isSet(object.tickStartTimestamp)
        ? fromJsonTimestamp(object.tickStartTimestamp)
        : undefined,
      nodeStates: Array.isArray(object?.nodeStates)
        ? object.nodeStates.map((e: any) =>
            State_NodeStatesAtTick_NodeState.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: State_NodeStatesAtTick): unknown {
    const obj: any = {};
    message.tickCounter !== undefined &&
      (obj.tickCounter = Math.round(message.tickCounter));
    message.tickStartTimestamp !== undefined &&
      (obj.tickStartTimestamp = message.tickStartTimestamp.toISOString());
    if (message.nodeStates) {
      obj.nodeStates = message.nodeStates.map((e) =>
        e ? State_NodeStatesAtTick_NodeState.toJSON(e) : undefined
      );
    } else {
      obj.nodeStates = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<State_NodeStatesAtTick>, I>>(
    object: I
  ): State_NodeStatesAtTick {
    const message = createBaseState_NodeStatesAtTick();
    message.tickCounter = object.tickCounter ?? 0;
    message.tickStartTimestamp = object.tickStartTimestamp ?? undefined;
    message.nodeStates =
      object.nodeStates?.map((e) =>
        State_NodeStatesAtTick_NodeState.fromPartial(e)
      ) || [];
    return message;
  },
};

function createBaseState_NodeStatesAtTick_NodeState(): State_NodeStatesAtTick_NodeState {
  return { result: 0, error: "", id: 0 };
}

export const State_NodeStatesAtTick_NodeState = {
  encode(
    message: State_NodeStatesAtTick_NodeState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    if (message.error !== "") {
      writer.uint32(18).string(message.error);
    }
    if (message.id !== 0) {
      writer.uint32(24).int64(message.id);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): State_NodeStatesAtTick_NodeState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseState_NodeStatesAtTick_NodeState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = reader.int32() as any;
          break;
        case 2:
          message.error = reader.string();
          break;
        case 3:
          message.id = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): State_NodeStatesAtTick_NodeState {
    return {
      result: isSet(object.result) ? resultFromJSON(object.result) : 0,
      error: isSet(object.error) ? String(object.error) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
    };
  },

  toJSON(message: State_NodeStatesAtTick_NodeState): unknown {
    const obj: any = {};
    message.result !== undefined && (obj.result = resultToJSON(message.result));
    message.error !== undefined && (obj.error = message.error);
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<State_NodeStatesAtTick_NodeState>, I>
  >(object: I): State_NodeStatesAtTick_NodeState {
    const message = createBaseState_NodeStatesAtTick_NodeState();
    message.result = object.result ?? 0;
    message.error = object.error ?? "";
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseQuestion(): Question {
  return {
    id: 0,
    source: "",
    text: "",
    options: [],
    forAutonomousProcessing: false,
  };
}

export const Question = {
  encode(
    message: Question,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int64(message.id);
    }
    if (message.source !== "") {
      writer.uint32(18).string(message.source);
    }
    if (message.text !== "") {
      writer.uint32(26).string(message.text);
    }
    for (const v of message.options) {
      Prompt_Option.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.forAutonomousProcessing === true) {
      writer.uint32(40).bool(message.forAutonomousProcessing);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Question {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuestion();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.source = reader.string();
          break;
        case 3:
          message.text = reader.string();
          break;
        case 4:
          message.options.push(Prompt_Option.decode(reader, reader.uint32()));
          break;
        case 5:
          message.forAutonomousProcessing = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Question {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      source: isSet(object.source) ? String(object.source) : "",
      text: isSet(object.text) ? String(object.text) : "",
      options: Array.isArray(object?.options)
        ? object.options.map((e: any) => Prompt_Option.fromJSON(e))
        : [],
      forAutonomousProcessing: isSet(object.forAutonomousProcessing)
        ? Boolean(object.forAutonomousProcessing)
        : false,
    };
  },

  toJSON(message: Question): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.source !== undefined && (obj.source = message.source);
    message.text !== undefined && (obj.text = message.text);
    if (message.options) {
      obj.options = message.options.map((e) =>
        e ? Prompt_Option.toJSON(e) : undefined
      );
    } else {
      obj.options = [];
    }
    message.forAutonomousProcessing !== undefined &&
      (obj.forAutonomousProcessing = message.forAutonomousProcessing);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Question>, I>>(object: I): Question {
    const message = createBaseQuestion();
    message.id = object.id ?? 0;
    message.source = object.source ?? "";
    message.text = object.text ?? "";
    message.options =
      object.options?.map((e) => Prompt_Option.fromPartial(e)) || [];
    message.forAutonomousProcessing = object.forAutonomousProcessing ?? false;
    return message;
  },
};

function createBaseAnswerQuestionRequest(): AnswerQuestionRequest {
  return { header: undefined, questionId: 0, code: 0 };
}

export const AnswerQuestionRequest = {
  encode(
    message: AnswerQuestionRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.questionId !== 0) {
      writer.uint32(16).int64(message.questionId);
    }
    if (message.code !== 0) {
      writer.uint32(24).int64(message.code);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AnswerQuestionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAnswerQuestionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.questionId = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.code = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AnswerQuestionRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      questionId: isSet(object.questionId) ? Number(object.questionId) : 0,
      code: isSet(object.code) ? Number(object.code) : 0,
    };
  },

  toJSON(message: AnswerQuestionRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.questionId !== undefined &&
      (obj.questionId = Math.round(message.questionId));
    message.code !== undefined && (obj.code = Math.round(message.code));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AnswerQuestionRequest>, I>>(
    object: I
  ): AnswerQuestionRequest {
    const message = createBaseAnswerQuestionRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.questionId = object.questionId ?? 0;
    message.code = object.code ?? 0;
    return message;
  },
};

function createBaseAnswerQuestionResponse(): AnswerQuestionResponse {
  return { header: undefined, status: 0 };
}

export const AnswerQuestionResponse = {
  encode(
    message: AnswerQuestionResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AnswerQuestionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAnswerQuestionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
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

  fromJSON(object: any): AnswerQuestionResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? answerQuestionResponse_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: AnswerQuestionResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = answerQuestionResponse_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AnswerQuestionResponse>, I>>(
    object: I
  ): AnswerQuestionResponse {
    const message = createBaseAnswerQuestionResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseMissionInfo(): MissionInfo {
  return { id: 0, root: undefined };
}

export const MissionInfo = {
  encode(
    message: MissionInfo,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int64(message.id);
    }
    if (message.root !== undefined) {
      NodeInfo.encode(message.root, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MissionInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMissionInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.root = NodeInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MissionInfo {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      root: isSet(object.root) ? NodeInfo.fromJSON(object.root) : undefined,
    };
  },

  toJSON(message: MissionInfo): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.root !== undefined &&
      (obj.root = message.root ? NodeInfo.toJSON(message.root) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MissionInfo>, I>>(
    object: I
  ): MissionInfo {
    const message = createBaseMissionInfo();
    message.id = object.id ?? 0;
    message.root =
      object.root !== undefined && object.root !== null
        ? NodeInfo.fromPartial(object.root)
        : undefined;
    return message;
  },
};

function createBaseNodeInfo(): NodeInfo {
  return { id: 0, name: "", userData: undefined, children: [] };
}

export const NodeInfo = {
  encode(
    message: NodeInfo,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int64(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.userData !== undefined) {
      UserData.encode(message.userData, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.children) {
      NodeInfo.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.userData = UserData.decode(reader, reader.uint32());
          break;
        case 4:
          message.children.push(NodeInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NodeInfo {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      userData: isSet(object.userData)
        ? UserData.fromJSON(object.userData)
        : undefined,
      children: Array.isArray(object?.children)
        ? object.children.map((e: any) => NodeInfo.fromJSON(e))
        : [],
    };
  },

  toJSON(message: NodeInfo): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.name !== undefined && (obj.name = message.name);
    message.userData !== undefined &&
      (obj.userData = message.userData
        ? UserData.toJSON(message.userData)
        : undefined);
    if (message.children) {
      obj.children = message.children.map((e) =>
        e ? NodeInfo.toJSON(e) : undefined
      );
    } else {
      obj.children = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NodeInfo>, I>>(object: I): NodeInfo {
    const message = createBaseNodeInfo();
    message.id = object.id ?? 0;
    message.name = object.name ?? "";
    message.userData =
      object.userData !== undefined && object.userData !== null
        ? UserData.fromPartial(object.userData)
        : undefined;
    message.children =
      object.children?.map((e) => NodeInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseFailedNode(): FailedNode {
  return { name: "", error: "", implTypename: "" };
}

export const FailedNode = {
  encode(
    message: FailedNode,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.error !== "") {
      writer.uint32(18).string(message.error);
    }
    if (message.implTypename !== "") {
      writer.uint32(26).string(message.implTypename);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FailedNode {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFailedNode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.error = reader.string();
          break;
        case 3:
          message.implTypename = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FailedNode {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      error: isSet(object.error) ? String(object.error) : "",
      implTypename: isSet(object.implTypename)
        ? String(object.implTypename)
        : "",
    };
  },

  toJSON(message: FailedNode): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.error !== undefined && (obj.error = message.error);
    message.implTypename !== undefined &&
      (obj.implTypename = message.implTypename);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FailedNode>, I>>(
    object: I
  ): FailedNode {
    const message = createBaseFailedNode();
    message.name = object.name ?? "";
    message.error = object.error ?? "";
    message.implTypename = object.implTypename ?? "";
    return message;
  },
};

function createBasePlayMissionRequest(): PlayMissionRequest {
  return {
    header: undefined,
    pauseTime: undefined,
    leases: [],
    settings: undefined,
  };
}

export const PlayMissionRequest = {
  encode(
    message: PlayMissionRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.pauseTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.pauseTime),
        writer.uint32(26).fork()
      ).ldelim();
    }
    for (const v of message.leases) {
      Lease.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.settings !== undefined) {
      PlaySettings.encode(message.settings, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PlayMissionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlayMissionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 3:
          message.pauseTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.leases.push(Lease.decode(reader, reader.uint32()));
          break;
        case 5:
          message.settings = PlaySettings.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PlayMissionRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      pauseTime: isSet(object.pauseTime)
        ? fromJsonTimestamp(object.pauseTime)
        : undefined,
      leases: Array.isArray(object?.leases)
        ? object.leases.map((e: any) => Lease.fromJSON(e))
        : [],
      settings: isSet(object.settings)
        ? PlaySettings.fromJSON(object.settings)
        : undefined,
    };
  },

  toJSON(message: PlayMissionRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.pauseTime !== undefined &&
      (obj.pauseTime = message.pauseTime.toISOString());
    if (message.leases) {
      obj.leases = message.leases.map((e) => (e ? Lease.toJSON(e) : undefined));
    } else {
      obj.leases = [];
    }
    message.settings !== undefined &&
      (obj.settings = message.settings
        ? PlaySettings.toJSON(message.settings)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PlayMissionRequest>, I>>(
    object: I
  ): PlayMissionRequest {
    const message = createBasePlayMissionRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.pauseTime = object.pauseTime ?? undefined;
    message.leases = object.leases?.map((e) => Lease.fromPartial(e)) || [];
    message.settings =
      object.settings !== undefined && object.settings !== null
        ? PlaySettings.fromPartial(object.settings)
        : undefined;
    return message;
  },
};

function createBasePlaySettings(): PlaySettings {
  return {
    velocityLimit: undefined,
    disableDirectedExploration: false,
    disableAlternateRouteFinding: false,
  };
}

export const PlaySettings = {
  encode(
    message: PlaySettings,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.velocityLimit !== undefined) {
      SE2VelocityLimit.encode(
        message.velocityLimit,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.disableDirectedExploration === true) {
      writer.uint32(16).bool(message.disableDirectedExploration);
    }
    if (message.disableAlternateRouteFinding === true) {
      writer.uint32(24).bool(message.disableAlternateRouteFinding);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PlaySettings {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlaySettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.velocityLimit = SE2VelocityLimit.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.disableDirectedExploration = reader.bool();
          break;
        case 3:
          message.disableAlternateRouteFinding = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PlaySettings {
    return {
      velocityLimit: isSet(object.velocityLimit)
        ? SE2VelocityLimit.fromJSON(object.velocityLimit)
        : undefined,
      disableDirectedExploration: isSet(object.disableDirectedExploration)
        ? Boolean(object.disableDirectedExploration)
        : false,
      disableAlternateRouteFinding: isSet(object.disableAlternateRouteFinding)
        ? Boolean(object.disableAlternateRouteFinding)
        : false,
    };
  },

  toJSON(message: PlaySettings): unknown {
    const obj: any = {};
    message.velocityLimit !== undefined &&
      (obj.velocityLimit = message.velocityLimit
        ? SE2VelocityLimit.toJSON(message.velocityLimit)
        : undefined);
    message.disableDirectedExploration !== undefined &&
      (obj.disableDirectedExploration = message.disableDirectedExploration);
    message.disableAlternateRouteFinding !== undefined &&
      (obj.disableAlternateRouteFinding = message.disableAlternateRouteFinding);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PlaySettings>, I>>(
    object: I
  ): PlaySettings {
    const message = createBasePlaySettings();
    message.velocityLimit =
      object.velocityLimit !== undefined && object.velocityLimit !== null
        ? SE2VelocityLimit.fromPartial(object.velocityLimit)
        : undefined;
    message.disableDirectedExploration =
      object.disableDirectedExploration ?? false;
    message.disableAlternateRouteFinding =
      object.disableAlternateRouteFinding ?? false;
    return message;
  },
};

function createBasePlayMissionResponse(): PlayMissionResponse {
  return { header: undefined, status: 0, leaseUseResults: [] };
}

export const PlayMissionResponse = {
  encode(
    message: PlayMissionResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    for (const v of message.leaseUseResults) {
      LeaseUseResult.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PlayMissionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlayMissionResponse();
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
          message.leaseUseResults.push(
            LeaseUseResult.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PlayMissionResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? playMissionResponse_StatusFromJSON(object.status)
        : 0,
      leaseUseResults: Array.isArray(object?.leaseUseResults)
        ? object.leaseUseResults.map((e: any) => LeaseUseResult.fromJSON(e))
        : [],
    };
  },

  toJSON(message: PlayMissionResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = playMissionResponse_StatusToJSON(message.status));
    if (message.leaseUseResults) {
      obj.leaseUseResults = message.leaseUseResults.map((e) =>
        e ? LeaseUseResult.toJSON(e) : undefined
      );
    } else {
      obj.leaseUseResults = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PlayMissionResponse>, I>>(
    object: I
  ): PlayMissionResponse {
    const message = createBasePlayMissionResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    message.leaseUseResults =
      object.leaseUseResults?.map((e) => LeaseUseResult.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRestartMissionRequest(): RestartMissionRequest {
  return {
    header: undefined,
    pauseTime: undefined,
    leases: [],
    settings: undefined,
  };
}

export const RestartMissionRequest = {
  encode(
    message: RestartMissionRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.pauseTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.pauseTime),
        writer.uint32(18).fork()
      ).ldelim();
    }
    for (const v of message.leases) {
      Lease.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.settings !== undefined) {
      PlaySettings.encode(message.settings, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RestartMissionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRestartMissionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.pauseTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.leases.push(Lease.decode(reader, reader.uint32()));
          break;
        case 4:
          message.settings = PlaySettings.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RestartMissionRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      pauseTime: isSet(object.pauseTime)
        ? fromJsonTimestamp(object.pauseTime)
        : undefined,
      leases: Array.isArray(object?.leases)
        ? object.leases.map((e: any) => Lease.fromJSON(e))
        : [],
      settings: isSet(object.settings)
        ? PlaySettings.fromJSON(object.settings)
        : undefined,
    };
  },

  toJSON(message: RestartMissionRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.pauseTime !== undefined &&
      (obj.pauseTime = message.pauseTime.toISOString());
    if (message.leases) {
      obj.leases = message.leases.map((e) => (e ? Lease.toJSON(e) : undefined));
    } else {
      obj.leases = [];
    }
    message.settings !== undefined &&
      (obj.settings = message.settings
        ? PlaySettings.toJSON(message.settings)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RestartMissionRequest>, I>>(
    object: I
  ): RestartMissionRequest {
    const message = createBaseRestartMissionRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.pauseTime = object.pauseTime ?? undefined;
    message.leases = object.leases?.map((e) => Lease.fromPartial(e)) || [];
    message.settings =
      object.settings !== undefined && object.settings !== null
        ? PlaySettings.fromPartial(object.settings)
        : undefined;
    return message;
  },
};

function createBaseRestartMissionResponse(): RestartMissionResponse {
  return { header: undefined, status: 0, leaseUseResults: [], failedNodes: [] };
}

export const RestartMissionResponse = {
  encode(
    message: RestartMissionResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    for (const v of message.leaseUseResults) {
      LeaseUseResult.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.failedNodes) {
      FailedNode.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RestartMissionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRestartMissionResponse();
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
          message.leaseUseResults.push(
            LeaseUseResult.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.failedNodes.push(FailedNode.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RestartMissionResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? restartMissionResponse_StatusFromJSON(object.status)
        : 0,
      leaseUseResults: Array.isArray(object?.leaseUseResults)
        ? object.leaseUseResults.map((e: any) => LeaseUseResult.fromJSON(e))
        : [],
      failedNodes: Array.isArray(object?.failedNodes)
        ? object.failedNodes.map((e: any) => FailedNode.fromJSON(e))
        : [],
    };
  },

  toJSON(message: RestartMissionResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = restartMissionResponse_StatusToJSON(message.status));
    if (message.leaseUseResults) {
      obj.leaseUseResults = message.leaseUseResults.map((e) =>
        e ? LeaseUseResult.toJSON(e) : undefined
      );
    } else {
      obj.leaseUseResults = [];
    }
    if (message.failedNodes) {
      obj.failedNodes = message.failedNodes.map((e) =>
        e ? FailedNode.toJSON(e) : undefined
      );
    } else {
      obj.failedNodes = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RestartMissionResponse>, I>>(
    object: I
  ): RestartMissionResponse {
    const message = createBaseRestartMissionResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    message.leaseUseResults =
      object.leaseUseResults?.map((e) => LeaseUseResult.fromPartial(e)) || [];
    message.failedNodes =
      object.failedNodes?.map((e) => FailedNode.fromPartial(e)) || [];
    return message;
  },
};

function createBaseLoadMissionRequest(): LoadMissionRequest {
  return { header: undefined, root: undefined, leases: [] };
}

export const LoadMissionRequest = {
  encode(
    message: LoadMissionRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.root !== undefined) {
      Node.encode(message.root, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.leases) {
      Lease.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoadMissionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoadMissionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.root = Node.decode(reader, reader.uint32());
          break;
        case 3:
          message.leases.push(Lease.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LoadMissionRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      root: isSet(object.root) ? Node.fromJSON(object.root) : undefined,
      leases: Array.isArray(object?.leases)
        ? object.leases.map((e: any) => Lease.fromJSON(e))
        : [],
    };
  },

  toJSON(message: LoadMissionRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.root !== undefined &&
      (obj.root = message.root ? Node.toJSON(message.root) : undefined);
    if (message.leases) {
      obj.leases = message.leases.map((e) => (e ? Lease.toJSON(e) : undefined));
    } else {
      obj.leases = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LoadMissionRequest>, I>>(
    object: I
  ): LoadMissionRequest {
    const message = createBaseLoadMissionRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.root =
      object.root !== undefined && object.root !== null
        ? Node.fromPartial(object.root)
        : undefined;
    message.leases = object.leases?.map((e) => Lease.fromPartial(e)) || [];
    return message;
  },
};

function createBaseLoadMissionResponse(): LoadMissionResponse {
  return {
    header: undefined,
    status: 0,
    leaseUseResults: [],
    missionInfo: undefined,
    failedNodes: [],
  };
}

export const LoadMissionResponse = {
  encode(
    message: LoadMissionResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    for (const v of message.leaseUseResults) {
      LeaseUseResult.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.missionInfo !== undefined) {
      MissionInfo.encode(
        message.missionInfo,
        writer.uint32(34).fork()
      ).ldelim();
    }
    for (const v of message.failedNodes) {
      FailedNode.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoadMissionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoadMissionResponse();
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
          message.leaseUseResults.push(
            LeaseUseResult.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.missionInfo = MissionInfo.decode(reader, reader.uint32());
          break;
        case 5:
          message.failedNodes.push(FailedNode.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LoadMissionResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? loadMissionResponse_StatusFromJSON(object.status)
        : 0,
      leaseUseResults: Array.isArray(object?.leaseUseResults)
        ? object.leaseUseResults.map((e: any) => LeaseUseResult.fromJSON(e))
        : [],
      missionInfo: isSet(object.missionInfo)
        ? MissionInfo.fromJSON(object.missionInfo)
        : undefined,
      failedNodes: Array.isArray(object?.failedNodes)
        ? object.failedNodes.map((e: any) => FailedNode.fromJSON(e))
        : [],
    };
  },

  toJSON(message: LoadMissionResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = loadMissionResponse_StatusToJSON(message.status));
    if (message.leaseUseResults) {
      obj.leaseUseResults = message.leaseUseResults.map((e) =>
        e ? LeaseUseResult.toJSON(e) : undefined
      );
    } else {
      obj.leaseUseResults = [];
    }
    message.missionInfo !== undefined &&
      (obj.missionInfo = message.missionInfo
        ? MissionInfo.toJSON(message.missionInfo)
        : undefined);
    if (message.failedNodes) {
      obj.failedNodes = message.failedNodes.map((e) =>
        e ? FailedNode.toJSON(e) : undefined
      );
    } else {
      obj.failedNodes = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LoadMissionResponse>, I>>(
    object: I
  ): LoadMissionResponse {
    const message = createBaseLoadMissionResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    message.leaseUseResults =
      object.leaseUseResults?.map((e) => LeaseUseResult.fromPartial(e)) || [];
    message.missionInfo =
      object.missionInfo !== undefined && object.missionInfo !== null
        ? MissionInfo.fromPartial(object.missionInfo)
        : undefined;
    message.failedNodes =
      object.failedNodes?.map((e) => FailedNode.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetInfoRequest(): GetInfoRequest {
  return { header: undefined };
}

export const GetInfoRequest = {
  encode(
    message: GetInfoRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetInfoRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetInfoRequest();
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

  fromJSON(object: any): GetInfoRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: GetInfoRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetInfoRequest>, I>>(
    object: I
  ): GetInfoRequest {
    const message = createBaseGetInfoRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseGetInfoResponse(): GetInfoResponse {
  return { header: undefined, missionInfo: undefined };
}

export const GetInfoResponse = {
  encode(
    message: GetInfoResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.missionInfo !== undefined) {
      MissionInfo.encode(
        message.missionInfo,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetInfoResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.missionInfo = MissionInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetInfoResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      missionInfo: isSet(object.missionInfo)
        ? MissionInfo.fromJSON(object.missionInfo)
        : undefined,
    };
  },

  toJSON(message: GetInfoResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.missionInfo !== undefined &&
      (obj.missionInfo = message.missionInfo
        ? MissionInfo.toJSON(message.missionInfo)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetInfoResponse>, I>>(
    object: I
  ): GetInfoResponse {
    const message = createBaseGetInfoResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.missionInfo =
      object.missionInfo !== undefined && object.missionInfo !== null
        ? MissionInfo.fromPartial(object.missionInfo)
        : undefined;
    return message;
  },
};

function createBasePauseMissionRequest(): PauseMissionRequest {
  return { header: undefined, lease: undefined };
}

export const PauseMissionRequest = {
  encode(
    message: PauseMissionRequest,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): PauseMissionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePauseMissionRequest();
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

  fromJSON(object: any): PauseMissionRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      lease: isSet(object.lease) ? Lease.fromJSON(object.lease) : undefined,
    };
  },

  toJSON(message: PauseMissionRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.lease !== undefined &&
      (obj.lease = message.lease ? Lease.toJSON(message.lease) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PauseMissionRequest>, I>>(
    object: I
  ): PauseMissionRequest {
    const message = createBasePauseMissionRequest();
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

function createBasePauseMissionResponse(): PauseMissionResponse {
  return { header: undefined, status: 0, leaseUseResult: undefined };
}

export const PauseMissionResponse = {
  encode(
    message: PauseMissionResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.leaseUseResult !== undefined) {
      LeaseUseResult.encode(
        message.leaseUseResult,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): PauseMissionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePauseMissionResponse();
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

  fromJSON(object: any): PauseMissionResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? pauseMissionResponse_StatusFromJSON(object.status)
        : 0,
      leaseUseResult: isSet(object.leaseUseResult)
        ? LeaseUseResult.fromJSON(object.leaseUseResult)
        : undefined,
    };
  },

  toJSON(message: PauseMissionResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = pauseMissionResponse_StatusToJSON(message.status));
    message.leaseUseResult !== undefined &&
      (obj.leaseUseResult = message.leaseUseResult
        ? LeaseUseResult.toJSON(message.leaseUseResult)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PauseMissionResponse>, I>>(
    object: I
  ): PauseMissionResponse {
    const message = createBasePauseMissionResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    message.leaseUseResult =
      object.leaseUseResult !== undefined && object.leaseUseResult !== null
        ? LeaseUseResult.fromPartial(object.leaseUseResult)
        : undefined;
    return message;
  },
};

function createBaseStopMissionRequest(): StopMissionRequest {
  return { header: undefined, lease: undefined };
}

export const StopMissionRequest = {
  encode(
    message: StopMissionRequest,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): StopMissionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStopMissionRequest();
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

  fromJSON(object: any): StopMissionRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      lease: isSet(object.lease) ? Lease.fromJSON(object.lease) : undefined,
    };
  },

  toJSON(message: StopMissionRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.lease !== undefined &&
      (obj.lease = message.lease ? Lease.toJSON(message.lease) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StopMissionRequest>, I>>(
    object: I
  ): StopMissionRequest {
    const message = createBaseStopMissionRequest();
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

function createBaseStopMissionResponse(): StopMissionResponse {
  return { header: undefined, status: 0, leaseUseResult: undefined };
}

export const StopMissionResponse = {
  encode(
    message: StopMissionResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.leaseUseResult !== undefined) {
      LeaseUseResult.encode(
        message.leaseUseResult,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StopMissionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStopMissionResponse();
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

  fromJSON(object: any): StopMissionResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? stopMissionResponse_StatusFromJSON(object.status)
        : 0,
      leaseUseResult: isSet(object.leaseUseResult)
        ? LeaseUseResult.fromJSON(object.leaseUseResult)
        : undefined,
    };
  },

  toJSON(message: StopMissionResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = stopMissionResponse_StatusToJSON(message.status));
    message.leaseUseResult !== undefined &&
      (obj.leaseUseResult = message.leaseUseResult
        ? LeaseUseResult.toJSON(message.leaseUseResult)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StopMissionResponse>, I>>(
    object: I
  ): StopMissionResponse {
    const message = createBaseStopMissionResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    message.leaseUseResult =
      object.leaseUseResult !== undefined && object.leaseUseResult !== null
        ? LeaseUseResult.fromPartial(object.leaseUseResult)
        : undefined;
    return message;
  },
};

function createBaseGetMissionRequest(): GetMissionRequest {
  return { header: undefined };
}

export const GetMissionRequest = {
  encode(
    message: GetMissionRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetMissionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetMissionRequest();
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

  fromJSON(object: any): GetMissionRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: GetMissionRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetMissionRequest>, I>>(
    object: I
  ): GetMissionRequest {
    const message = createBaseGetMissionRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseGetMissionResponse(): GetMissionResponse {
  return { header: undefined, root: undefined, id: 0 };
}

export const GetMissionResponse = {
  encode(
    message: GetMissionResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.root !== undefined) {
      Node.encode(message.root, writer.uint32(18).fork()).ldelim();
    }
    if (message.id !== 0) {
      writer.uint32(24).int64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetMissionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetMissionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.root = Node.decode(reader, reader.uint32());
          break;
        case 3:
          message.id = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetMissionResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      root: isSet(object.root) ? Node.fromJSON(object.root) : undefined,
      id: isSet(object.id) ? Number(object.id) : 0,
    };
  },

  toJSON(message: GetMissionResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.root !== undefined &&
      (obj.root = message.root ? Node.toJSON(message.root) : undefined);
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetMissionResponse>, I>>(
    object: I
  ): GetMissionResponse {
    const message = createBaseGetMissionResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.root =
      object.root !== undefined && object.root !== null
        ? Node.fromPartial(object.root)
        : undefined;
    message.id = object.id ?? 0;
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
