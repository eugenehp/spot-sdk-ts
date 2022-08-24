/* eslint-disable */
import {
  EstablishSessionResponse,
  TickResponse,
  StopResponse,
  TeardownSessionResponse,
  EstablishSessionRequest,
  TickRequest,
  StopRequest,
  TeardownSessionRequest,
} from "./remote";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api.mission";

/**
 * Interface for mission callbacks.  Mission RemoteGrpc nodes will act as clients
 * to this service type, calling out to this service when loaded, ticked, or unloaded.
 */
export interface RemoteMissionService {
  /** Call this once at mission load time, once for each node that references this remote service. */
  EstablishSession(
    request: EstablishSessionRequest
  ): Promise<EstablishSessionResponse>;
  /** Call this every time the RemoteGrpc node is ticked. */
  Tick(request: TickRequest): Promise<TickResponse>;
  /**
   * Call this every time the RemoteGrpc node WAS ticked in the previous cycle, but was NOT ticked
   * in this cycle. Signals that the next tick will be a restart, rather than a continuation.
   */
  Stop(request: StopRequest): Promise<StopResponse>;
  /**
   * Tells the service it can forget any data associated with the given session ID.
   * Should be called once for every EstablishSession call.
   */
  TeardownSession(
    request: TeardownSessionRequest
  ): Promise<TeardownSessionResponse>;
}

export class RemoteMissionServiceClientImpl implements RemoteMissionService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.EstablishSession = this.EstablishSession.bind(this);
    this.Tick = this.Tick.bind(this);
    this.Stop = this.Stop.bind(this);
    this.TeardownSession = this.TeardownSession.bind(this);
  }
  EstablishSession(
    request: EstablishSessionRequest
  ): Promise<EstablishSessionResponse> {
    const data = EstablishSessionRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.mission.RemoteMissionService",
      "EstablishSession",
      data
    );
    return promise.then((data) =>
      EstablishSessionResponse.decode(new _m0.Reader(data))
    );
  }

  Tick(request: TickRequest): Promise<TickResponse> {
    const data = TickRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.mission.RemoteMissionService",
      "Tick",
      data
    );
    return promise.then((data) => TickResponse.decode(new _m0.Reader(data)));
  }

  Stop(request: StopRequest): Promise<StopResponse> {
    const data = StopRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.mission.RemoteMissionService",
      "Stop",
      data
    );
    return promise.then((data) => StopResponse.decode(new _m0.Reader(data)));
  }

  TeardownSession(
    request: TeardownSessionRequest
  ): Promise<TeardownSessionResponse> {
    const data = TeardownSessionRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.mission.RemoteMissionService",
      "TeardownSession",
      data
    );
    return promise.then((data) =>
      TeardownSessionResponse.decode(new _m0.Reader(data))
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
