/* eslint-disable */
import {
  ListAllMovesResponse,
  ListAllSequencesResponse,
  UploadChoreographyResponse,
  UploadAnimatedMoveResponse,
  ExecuteChoreographyResponse,
  StartRecordingStateResponse,
  StopRecordingStateResponse,
  DownloadRobotStateLogResponse,
  ListAllMovesRequest,
  ListAllSequencesRequest,
  UploadChoreographyRequest,
  UploadAnimatedMoveRequest,
  ExecuteChoreographyRequest,
  StartRecordingStateRequest,
  StopRecordingStateRequest,
  DownloadRobotStateLogRequest,
} from "./choreography_sequence";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api.spot";

export interface ChoreographyService {
  /** List the available dance moves and their parameter information. */
  ListAllMoves(request: ListAllMovesRequest): Promise<ListAllMovesResponse>;
  /** List the available choreography sequences currently on the robot. */
  ListAllSequences(
    request: ListAllSequencesRequest
  ): Promise<ListAllSequencesResponse>;
  /** Upload a dance to the robot. */
  UploadChoreography(
    request: UploadChoreographyRequest
  ): Promise<UploadChoreographyResponse>;
  /** Upload an animation to the robot. */
  UploadAnimatedMove(
    request: UploadAnimatedMoveRequest
  ): Promise<UploadAnimatedMoveResponse>;
  /** Execute the uploaded dance. */
  ExecuteChoreography(
    request: ExecuteChoreographyRequest
  ): Promise<ExecuteChoreographyResponse>;
  /** Manually start (or continue) recording the robot state. */
  StartRecordingState(
    request: StartRecordingStateRequest
  ): Promise<StartRecordingStateResponse>;
  /** Manually stop recording the robot state. */
  StopRecordingState(
    request: StopRecordingStateRequest
  ): Promise<StopRecordingStateResponse>;
  /** Download log of the latest recorded robot state information. */
  DownloadRobotStateLog(
    request: DownloadRobotStateLogRequest
  ): Observable<DownloadRobotStateLogResponse>;
}

export class ChoreographyServiceClientImpl implements ChoreographyService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ListAllMoves = this.ListAllMoves.bind(this);
    this.ListAllSequences = this.ListAllSequences.bind(this);
    this.UploadChoreography = this.UploadChoreography.bind(this);
    this.UploadAnimatedMove = this.UploadAnimatedMove.bind(this);
    this.ExecuteChoreography = this.ExecuteChoreography.bind(this);
    this.StartRecordingState = this.StartRecordingState.bind(this);
    this.StopRecordingState = this.StopRecordingState.bind(this);
    this.DownloadRobotStateLog = this.DownloadRobotStateLog.bind(this);
  }
  ListAllMoves(request: ListAllMovesRequest): Promise<ListAllMovesResponse> {
    const data = ListAllMovesRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot.ChoreographyService",
      "ListAllMoves",
      data
    );
    return promise.then((data) =>
      ListAllMovesResponse.decode(new _m0.Reader(data))
    );
  }

  ListAllSequences(
    request: ListAllSequencesRequest
  ): Promise<ListAllSequencesResponse> {
    const data = ListAllSequencesRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot.ChoreographyService",
      "ListAllSequences",
      data
    );
    return promise.then((data) =>
      ListAllSequencesResponse.decode(new _m0.Reader(data))
    );
  }

  UploadChoreography(
    request: UploadChoreographyRequest
  ): Promise<UploadChoreographyResponse> {
    const data = UploadChoreographyRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot.ChoreographyService",
      "UploadChoreography",
      data
    );
    return promise.then((data) =>
      UploadChoreographyResponse.decode(new _m0.Reader(data))
    );
  }

  UploadAnimatedMove(
    request: UploadAnimatedMoveRequest
  ): Promise<UploadAnimatedMoveResponse> {
    const data = UploadAnimatedMoveRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot.ChoreographyService",
      "UploadAnimatedMove",
      data
    );
    return promise.then((data) =>
      UploadAnimatedMoveResponse.decode(new _m0.Reader(data))
    );
  }

  ExecuteChoreography(
    request: ExecuteChoreographyRequest
  ): Promise<ExecuteChoreographyResponse> {
    const data = ExecuteChoreographyRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot.ChoreographyService",
      "ExecuteChoreography",
      data
    );
    return promise.then((data) =>
      ExecuteChoreographyResponse.decode(new _m0.Reader(data))
    );
  }

  StartRecordingState(
    request: StartRecordingStateRequest
  ): Promise<StartRecordingStateResponse> {
    const data = StartRecordingStateRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot.ChoreographyService",
      "StartRecordingState",
      data
    );
    return promise.then((data) =>
      StartRecordingStateResponse.decode(new _m0.Reader(data))
    );
  }

  StopRecordingState(
    request: StopRecordingStateRequest
  ): Promise<StopRecordingStateResponse> {
    const data = StopRecordingStateRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot.ChoreographyService",
      "StopRecordingState",
      data
    );
    return promise.then((data) =>
      StopRecordingStateResponse.decode(new _m0.Reader(data))
    );
  }

  DownloadRobotStateLog(
    request: DownloadRobotStateLogRequest
  ): Observable<DownloadRobotStateLogResponse> {
    const data = DownloadRobotStateLogRequest.encode(request).finish();
    const result = this.rpc.serverStreamingRequest(
      "bosdyn.api.spot.ChoreographyService",
      "DownloadRobotStateLog",
      data
    );
    return result.pipe(
      map((data) => DownloadRobotStateLogResponse.decode(new _m0.Reader(data)))
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
