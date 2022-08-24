/* eslint-disable */
import { Observable } from "rxjs";
import {
  ProcessTopologyResponse,
  ProcessAnchoringResponse,
  ProcessTopologyRequest,
  ProcessAnchoringRequest,
} from "./map_processing";
import { map } from "rxjs/operators";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api.graph_nav";

/** Defines services for processing an existing GraphNav map. */
export interface MapProcessingService {
  /**
   * Processes a GraphNav map by creating additional edges or waypoints. After processing,
   * a new subgraph is created containing additional waypoints or edges to add to the map.
   */
  ProcessTopology(
    request: ProcessTopologyRequest
  ): Observable<ProcessTopologyResponse>;
  /**
   * Processes a GraphNav map by modifying the anchoring of waypoints and world objects in the map
   * with respect to a seed frame. After processing, a new anchoring is streamed back.
   */
  ProcessAnchoring(
    request: ProcessAnchoringRequest
  ): Observable<ProcessAnchoringResponse>;
}

export class MapProcessingServiceClientImpl implements MapProcessingService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ProcessTopology = this.ProcessTopology.bind(this);
    this.ProcessAnchoring = this.ProcessAnchoring.bind(this);
  }
  ProcessTopology(
    request: ProcessTopologyRequest
  ): Observable<ProcessTopologyResponse> {
    const data = ProcessTopologyRequest.encode(request).finish();
    const result = this.rpc.serverStreamingRequest(
      "bosdyn.api.graph_nav.MapProcessingService",
      "ProcessTopology",
      data
    );
    return result.pipe(
      map((data) => ProcessTopologyResponse.decode(new _m0.Reader(data)))
    );
  }

  ProcessAnchoring(
    request: ProcessAnchoringRequest
  ): Observable<ProcessAnchoringResponse> {
    const data = ProcessAnchoringRequest.encode(request).finish();
    const result = this.rpc.serverStreamingRequest(
      "bosdyn.api.graph_nav.MapProcessingService",
      "ProcessAnchoring",
      data
    );
    return result.pipe(
      map((data) => ProcessAnchoringResponse.decode(new _m0.Reader(data)))
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
