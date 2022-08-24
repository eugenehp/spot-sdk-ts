/* eslint-disable */
import {
  LoadMissionResponse,
  PlayMissionResponse,
  PauseMissionResponse,
  StopMissionResponse,
  RestartMissionResponse,
  GetStateResponse,
  GetInfoResponse,
  GetMissionResponse,
  AnswerQuestionResponse,
  LoadMissionRequest,
  PlayMissionRequest,
  PauseMissionRequest,
  StopMissionRequest,
  RestartMissionRequest,
  GetStateRequest,
  GetInfoRequest,
  GetMissionRequest,
  AnswerQuestionRequest,
} from "./mission";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { DataChunk } from "../data_chunk";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api.mission";

/** The MissionService can be used to specify high level autonomous behaviors for Spot using behavior trees. */
export interface MissionService {
  /** Load a mission to run later. */
  LoadMission(request: LoadMissionRequest): Promise<LoadMissionResponse>;
  /**
   * Alternative loading method for large missions, that allows you to break the
   * mission up into multiple streamed requests.  The data chunks should deserialize
   * into a LoadMissionRequest
   */
  LoadMissionAsChunks(
    request: Observable<DataChunk>
  ): Promise<LoadMissionResponse>;
  /**
   * Start executing a loaded mission.
   * Will not restart a mission that has run to completion. Use RestartMission to do that.
   */
  PlayMission(request: PlayMissionRequest): Promise<PlayMissionResponse>;
  /** Pause mission execution. */
  PauseMission(request: PauseMissionRequest): Promise<PauseMissionResponse>;
  /**
   * Stop a running mission.
   * Must use RestartMission, not PlayMission, to begin from the beginning.
   */
  StopMission(request: StopMissionRequest): Promise<StopMissionResponse>;
  /**
   * Start executing a loaded mission from the beginning.
   * Does not need to be called after LoadMission.
   */
  RestartMission(
    request: RestartMissionRequest
  ): Promise<RestartMissionResponse>;
  /** Get the state of the mission. */
  GetState(request: GetStateRequest): Promise<GetStateResponse>;
  /** Get static information regarding the mission. Used to interpret mission state. */
  GetInfo(request: GetInfoRequest): Promise<GetInfoResponse>;
  /** Download the mission as it was uploaded to the service. */
  GetMission(request: GetMissionRequest): Promise<GetMissionResponse>;
  /** Specify an answer to the question asked by the mission. */
  AnswerQuestion(
    request: AnswerQuestionRequest
  ): Promise<AnswerQuestionResponse>;
}

export class MissionServiceClientImpl implements MissionService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.LoadMission = this.LoadMission.bind(this);
    this.LoadMissionAsChunks = this.LoadMissionAsChunks.bind(this);
    this.PlayMission = this.PlayMission.bind(this);
    this.PauseMission = this.PauseMission.bind(this);
    this.StopMission = this.StopMission.bind(this);
    this.RestartMission = this.RestartMission.bind(this);
    this.GetState = this.GetState.bind(this);
    this.GetInfo = this.GetInfo.bind(this);
    this.GetMission = this.GetMission.bind(this);
    this.AnswerQuestion = this.AnswerQuestion.bind(this);
  }
  LoadMission(request: LoadMissionRequest): Promise<LoadMissionResponse> {
    const data = LoadMissionRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.mission.MissionService",
      "LoadMission",
      data
    );
    return promise.then((data) =>
      LoadMissionResponse.decode(new _m0.Reader(data))
    );
  }

  LoadMissionAsChunks(
    request: Observable<DataChunk>
  ): Promise<LoadMissionResponse> {
    const data = request.pipe(
      map((request) => DataChunk.encode(request).finish())
    );
    const promise = this.rpc.clientStreamingRequest(
      "bosdyn.api.mission.MissionService",
      "LoadMissionAsChunks",
      data
    );
    return promise.then((data) =>
      LoadMissionResponse.decode(new _m0.Reader(data))
    );
  }

  PlayMission(request: PlayMissionRequest): Promise<PlayMissionResponse> {
    const data = PlayMissionRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.mission.MissionService",
      "PlayMission",
      data
    );
    return promise.then((data) =>
      PlayMissionResponse.decode(new _m0.Reader(data))
    );
  }

  PauseMission(request: PauseMissionRequest): Promise<PauseMissionResponse> {
    const data = PauseMissionRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.mission.MissionService",
      "PauseMission",
      data
    );
    return promise.then((data) =>
      PauseMissionResponse.decode(new _m0.Reader(data))
    );
  }

  StopMission(request: StopMissionRequest): Promise<StopMissionResponse> {
    const data = StopMissionRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.mission.MissionService",
      "StopMission",
      data
    );
    return promise.then((data) =>
      StopMissionResponse.decode(new _m0.Reader(data))
    );
  }

  RestartMission(
    request: RestartMissionRequest
  ): Promise<RestartMissionResponse> {
    const data = RestartMissionRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.mission.MissionService",
      "RestartMission",
      data
    );
    return promise.then((data) =>
      RestartMissionResponse.decode(new _m0.Reader(data))
    );
  }

  GetState(request: GetStateRequest): Promise<GetStateResponse> {
    const data = GetStateRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.mission.MissionService",
      "GetState",
      data
    );
    return promise.then((data) =>
      GetStateResponse.decode(new _m0.Reader(data))
    );
  }

  GetInfo(request: GetInfoRequest): Promise<GetInfoResponse> {
    const data = GetInfoRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.mission.MissionService",
      "GetInfo",
      data
    );
    return promise.then((data) => GetInfoResponse.decode(new _m0.Reader(data)));
  }

  GetMission(request: GetMissionRequest): Promise<GetMissionResponse> {
    const data = GetMissionRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.mission.MissionService",
      "GetMission",
      data
    );
    return promise.then((data) =>
      GetMissionResponse.decode(new _m0.Reader(data))
    );
  }

  AnswerQuestion(
    request: AnswerQuestionRequest
  ): Promise<AnswerQuestionResponse> {
    const data = AnswerQuestionRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.mission.MissionService",
      "AnswerQuestion",
      data
    );
    return promise.then((data) =>
      AnswerQuestionResponse.decode(new _m0.Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
  clientStreamingRequest(
    service: string,
    method: string,
    data: Observable<Uint8Array>
  ): Promise<Uint8Array>;
  serverStreamingRequest(
    service: string,
    method: string,
    data: Uint8Array
  ): Observable<Uint8Array>;
  bidirectionalStreamingRequest(
    service: string,
    method: string,
    data: Observable<Uint8Array>
  ): Observable<Uint8Array>;
}
