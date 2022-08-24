/* eslint-disable */
import {
  StartRecordingResponse,
  StopRecordingResponse,
  CreateWaypointResponse,
  SetRecordingEnvironmentResponse,
  CreateEdgeResponse,
  GetRecordStatusResponse,
  StartRecordingRequest,
  StopRecordingRequest,
  CreateWaypointRequest,
  SetRecordingEnvironmentRequest,
  CreateEdgeRequest,
  GetRecordStatusRequest,
} from "./recording";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api.graph_nav";

/**
 * The recording service can be used to record a Graph Nav map (containing waypoints and edges).
 * The recorded map can consist of the following:
 * * Chain: a topological arrangement of waypoints/edges where every waypoint has at least 1
 * but at most 2 edges attached to it.
 * * Branch: separate Chains can be joined together into a Branch at exactly one waypoint.
 * When recording a map using the recording service, a common pattern is:
 * * Call StartRecording to begin recording a chain of waypoints.
 * * Call SetRecordingEnvironment to define persistent annotations for the edges and waypoints.
 * * While recording, call GetRecordStatus to get feedback on the state of the recording service.
 * * While recording, call GetMapStatus to determine what waypoints have been created.
 * * Optionally call CreateWaypoint to create waypoints in specific locations.
 * * Call StopRecording to pause the recording service and create branches.
 * * While recording (or after completing recording), call DownloadWaypoint/Edge Snapshot rpc's
 * from the GraphNavService to download the large sensor data with the map.
 */
export interface GraphNavRecordingService {
  /**
   * Start recording the map from the current localization.
   * Creates a waypoint if you are starting to record. Otherwise, waits until you are
   * sufficiently far away from the previous waypoint.
   */
  StartRecording(
    request: StartRecordingRequest
  ): Promise<StartRecordingResponse>;
  /** Stop recording the map from the current localization. */
  StopRecording(request: StopRecordingRequest): Promise<StopRecordingResponse>;
  /** Create a new waypoint at the current localization. */
  CreateWaypoint(
    request: CreateWaypointRequest
  ): Promise<CreateWaypointResponse>;
  /** Set the environmnent and name prefix to use for the recording. */
  SetRecordingEnvironment(
    request: SetRecordingEnvironmentRequest
  ): Promise<SetRecordingEnvironmentResponse>;
  /** Create an arbitrary edge between two waypoints. */
  CreateEdge(request: CreateEdgeRequest): Promise<CreateEdgeResponse>;
  /**
   * Tells the client the internal state of the record service, and the structure of the map that has been recorded
   * so far.
   */
  GetRecordStatus(
    request: GetRecordStatusRequest
  ): Promise<GetRecordStatusResponse>;
}

export class GraphNavRecordingServiceClientImpl
  implements GraphNavRecordingService
{
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.StartRecording = this.StartRecording.bind(this);
    this.StopRecording = this.StopRecording.bind(this);
    this.CreateWaypoint = this.CreateWaypoint.bind(this);
    this.SetRecordingEnvironment = this.SetRecordingEnvironment.bind(this);
    this.CreateEdge = this.CreateEdge.bind(this);
    this.GetRecordStatus = this.GetRecordStatus.bind(this);
  }
  StartRecording(
    request: StartRecordingRequest
  ): Promise<StartRecordingResponse> {
    const data = StartRecordingRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.graph_nav.GraphNavRecordingService",
      "StartRecording",
      data
    );
    return promise.then((data) =>
      StartRecordingResponse.decode(new _m0.Reader(data))
    );
  }

  StopRecording(request: StopRecordingRequest): Promise<StopRecordingResponse> {
    const data = StopRecordingRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.graph_nav.GraphNavRecordingService",
      "StopRecording",
      data
    );
    return promise.then((data) =>
      StopRecordingResponse.decode(new _m0.Reader(data))
    );
  }

  CreateWaypoint(
    request: CreateWaypointRequest
  ): Promise<CreateWaypointResponse> {
    const data = CreateWaypointRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.graph_nav.GraphNavRecordingService",
      "CreateWaypoint",
      data
    );
    return promise.then((data) =>
      CreateWaypointResponse.decode(new _m0.Reader(data))
    );
  }

  SetRecordingEnvironment(
    request: SetRecordingEnvironmentRequest
  ): Promise<SetRecordingEnvironmentResponse> {
    const data = SetRecordingEnvironmentRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.graph_nav.GraphNavRecordingService",
      "SetRecordingEnvironment",
      data
    );
    return promise.then((data) =>
      SetRecordingEnvironmentResponse.decode(new _m0.Reader(data))
    );
  }

  CreateEdge(request: CreateEdgeRequest): Promise<CreateEdgeResponse> {
    const data = CreateEdgeRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.graph_nav.GraphNavRecordingService",
      "CreateEdge",
      data
    );
    return promise.then((data) =>
      CreateEdgeResponse.decode(new _m0.Reader(data))
    );
  }

  GetRecordStatus(
    request: GetRecordStatusRequest
  ): Promise<GetRecordStatusResponse> {
    const data = GetRecordStatusRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.graph_nav.GraphNavRecordingService",
      "GetRecordStatus",
      data
    );
    return promise.then((data) =>
      GetRecordStatusResponse.decode(new _m0.Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}
