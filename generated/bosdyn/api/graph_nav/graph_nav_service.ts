/* eslint-disable */
import {
  SetLocalizationResponse,
  NavigateRouteResponse,
  NavigateToResponse,
  NavigateToAnchorResponse,
  NavigationFeedbackResponse,
  GetLocalizationStateResponse,
  ClearGraphResponse,
  DownloadGraphResponse,
  UploadGraphResponse,
  UploadWaypointSnapshotResponse,
  UploadEdgeSnapshotResponse,
  DownloadWaypointSnapshotResponse,
  DownloadEdgeSnapshotResponse,
  SetLocalizationRequest,
  NavigateRouteRequest,
  NavigateToRequest,
  NavigateToAnchorRequest,
  NavigationFeedbackRequest,
  GetLocalizationStateRequest,
  ClearGraphRequest,
  DownloadGraphRequest,
  UploadGraphRequest,
  DownloadWaypointSnapshotRequest,
  DownloadEdgeSnapshotRequest,
  UploadWaypointSnapshotRequest,
  UploadEdgeSnapshotRequest,
} from "./graph_nav";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api.graph_nav";

/**
 * The GraphNav service service is a place-based localization and locomotion service. The service can
 * be used to get/set the localization, upload and download the current graph nav maps, and send navigation
 * requests to move around the map.
 */
export interface GraphNavService {
  /** Trigger a manual localization. Typically done to provide the initial localization. */
  SetLocalization(
    request: SetLocalizationRequest
  ): Promise<SetLocalizationResponse>;
  /** Tell GraphNav to navigate/traverse a given route. */
  NavigateRoute(request: NavigateRouteRequest): Promise<NavigateRouteResponse>;
  /** Tell GraphNav to navigate to a waypoint along a route it chooses. */
  NavigateTo(request: NavigateToRequest): Promise<NavigateToResponse>;
  /** Tell GraphNav to navigate to a goal with respect to the current anchoring. */
  NavigateToAnchor(
    request: NavigateToAnchorRequest
  ): Promise<NavigateToAnchorResponse>;
  /** Get feedback on active navigation command. */
  NavigationFeedback(
    request: NavigationFeedbackRequest
  ): Promise<NavigationFeedbackResponse>;
  /** Get the localization status and data. */
  GetLocalizationState(
    request: GetLocalizationStateRequest
  ): Promise<GetLocalizationStateResponse>;
  /** Clears the local graph structure. Also erases any snapshots currently in RAM. */
  ClearGraph(request: ClearGraphRequest): Promise<ClearGraphResponse>;
  /** Download the graph structure. */
  DownloadGraph(request: DownloadGraphRequest): Promise<DownloadGraphResponse>;
  /** Upload the full list of waypoint IDs, graph topology and other small info. */
  UploadGraph(request: UploadGraphRequest): Promise<UploadGraphResponse>;
  /** Uploads large waypoint snapshot as a stream for a particular waypoint. */
  UploadWaypointSnapshot(
    request: Observable<UploadWaypointSnapshotRequest>
  ): Promise<UploadWaypointSnapshotResponse>;
  /** Uploads large edge snapshot as a stream for a particular edge. */
  UploadEdgeSnapshot(
    request: Observable<UploadEdgeSnapshotRequest>
  ): Promise<UploadEdgeSnapshotResponse>;
  /** Download waypoint data from the server. If the snapshot exists in disk cache, it will be loaded. */
  DownloadWaypointSnapshot(
    request: DownloadWaypointSnapshotRequest
  ): Observable<DownloadWaypointSnapshotResponse>;
  /** Download edge data from the server. If the snapshot exists in disk cache, it will be loaded. */
  DownloadEdgeSnapshot(
    request: DownloadEdgeSnapshotRequest
  ): Observable<DownloadEdgeSnapshotResponse>;
}

export class GraphNavServiceClientImpl implements GraphNavService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.SetLocalization = this.SetLocalization.bind(this);
    this.NavigateRoute = this.NavigateRoute.bind(this);
    this.NavigateTo = this.NavigateTo.bind(this);
    this.NavigateToAnchor = this.NavigateToAnchor.bind(this);
    this.NavigationFeedback = this.NavigationFeedback.bind(this);
    this.GetLocalizationState = this.GetLocalizationState.bind(this);
    this.ClearGraph = this.ClearGraph.bind(this);
    this.DownloadGraph = this.DownloadGraph.bind(this);
    this.UploadGraph = this.UploadGraph.bind(this);
    this.UploadWaypointSnapshot = this.UploadWaypointSnapshot.bind(this);
    this.UploadEdgeSnapshot = this.UploadEdgeSnapshot.bind(this);
    this.DownloadWaypointSnapshot = this.DownloadWaypointSnapshot.bind(this);
    this.DownloadEdgeSnapshot = this.DownloadEdgeSnapshot.bind(this);
  }
  SetLocalization(
    request: SetLocalizationRequest
  ): Promise<SetLocalizationResponse> {
    const data = SetLocalizationRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.graph_nav.GraphNavService",
      "SetLocalization",
      data
    );
    return promise.then((data) =>
      SetLocalizationResponse.decode(new _m0.Reader(data))
    );
  }

  NavigateRoute(request: NavigateRouteRequest): Promise<NavigateRouteResponse> {
    const data = NavigateRouteRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.graph_nav.GraphNavService",
      "NavigateRoute",
      data
    );
    return promise.then((data) =>
      NavigateRouteResponse.decode(new _m0.Reader(data))
    );
  }

  NavigateTo(request: NavigateToRequest): Promise<NavigateToResponse> {
    const data = NavigateToRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.graph_nav.GraphNavService",
      "NavigateTo",
      data
    );
    return promise.then((data) =>
      NavigateToResponse.decode(new _m0.Reader(data))
    );
  }

  NavigateToAnchor(
    request: NavigateToAnchorRequest
  ): Promise<NavigateToAnchorResponse> {
    const data = NavigateToAnchorRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.graph_nav.GraphNavService",
      "NavigateToAnchor",
      data
    );
    return promise.then((data) =>
      NavigateToAnchorResponse.decode(new _m0.Reader(data))
    );
  }

  NavigationFeedback(
    request: NavigationFeedbackRequest
  ): Promise<NavigationFeedbackResponse> {
    const data = NavigationFeedbackRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.graph_nav.GraphNavService",
      "NavigationFeedback",
      data
    );
    return promise.then((data) =>
      NavigationFeedbackResponse.decode(new _m0.Reader(data))
    );
  }

  GetLocalizationState(
    request: GetLocalizationStateRequest
  ): Promise<GetLocalizationStateResponse> {
    const data = GetLocalizationStateRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.graph_nav.GraphNavService",
      "GetLocalizationState",
      data
    );
    return promise.then((data) =>
      GetLocalizationStateResponse.decode(new _m0.Reader(data))
    );
  }

  ClearGraph(request: ClearGraphRequest): Promise<ClearGraphResponse> {
    const data = ClearGraphRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.graph_nav.GraphNavService",
      "ClearGraph",
      data
    );
    return promise.then((data) =>
      ClearGraphResponse.decode(new _m0.Reader(data))
    );
  }

  DownloadGraph(request: DownloadGraphRequest): Promise<DownloadGraphResponse> {
    const data = DownloadGraphRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.graph_nav.GraphNavService",
      "DownloadGraph",
      data
    );
    return promise.then((data) =>
      DownloadGraphResponse.decode(new _m0.Reader(data))
    );
  }

  UploadGraph(request: UploadGraphRequest): Promise<UploadGraphResponse> {
    const data = UploadGraphRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.graph_nav.GraphNavService",
      "UploadGraph",
      data
    );
    return promise.then((data) =>
      UploadGraphResponse.decode(new _m0.Reader(data))
    );
  }

  UploadWaypointSnapshot(
    request: Observable<UploadWaypointSnapshotRequest>
  ): Promise<UploadWaypointSnapshotResponse> {
    const data = request.pipe(
      map((request) => UploadWaypointSnapshotRequest.encode(request).finish())
    );
    const promise = this.rpc.clientStreamingRequest(
      "bosdyn.api.graph_nav.GraphNavService",
      "UploadWaypointSnapshot",
      data
    );
    return promise.then((data) =>
      UploadWaypointSnapshotResponse.decode(new _m0.Reader(data))
    );
  }

  UploadEdgeSnapshot(
    request: Observable<UploadEdgeSnapshotRequest>
  ): Promise<UploadEdgeSnapshotResponse> {
    const data = request.pipe(
      map((request) => UploadEdgeSnapshotRequest.encode(request).finish())
    );
    const promise = this.rpc.clientStreamingRequest(
      "bosdyn.api.graph_nav.GraphNavService",
      "UploadEdgeSnapshot",
      data
    );
    return promise.then((data) =>
      UploadEdgeSnapshotResponse.decode(new _m0.Reader(data))
    );
  }

  DownloadWaypointSnapshot(
    request: DownloadWaypointSnapshotRequest
  ): Observable<DownloadWaypointSnapshotResponse> {
    const data = DownloadWaypointSnapshotRequest.encode(request).finish();
    const result = this.rpc.serverStreamingRequest(
      "bosdyn.api.graph_nav.GraphNavService",
      "DownloadWaypointSnapshot",
      data
    );
    return result.pipe(
      map((data) =>
        DownloadWaypointSnapshotResponse.decode(new _m0.Reader(data))
      )
    );
  }

  DownloadEdgeSnapshot(
    request: DownloadEdgeSnapshotRequest
  ): Observable<DownloadEdgeSnapshotResponse> {
    const data = DownloadEdgeSnapshotRequest.encode(request).finish();
    const result = this.rpc.serverStreamingRequest(
      "bosdyn.api.graph_nav.GraphNavService",
      "DownloadEdgeSnapshot",
      data
    );
    return result.pipe(
      map((data) => DownloadEdgeSnapshotResponse.decode(new _m0.Reader(data)))
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
