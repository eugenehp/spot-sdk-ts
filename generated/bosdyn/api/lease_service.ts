/* eslint-disable */
import {
  AcquireLeaseResponse,
  TakeLeaseResponse,
  ReturnLeaseResponse,
  ListLeasesResponse,
  RetainLeaseResponse,
  AcquireLeaseRequest,
  TakeLeaseRequest,
  ReturnLeaseRequest,
  ListLeasesRequest,
  RetainLeaseRequest,
} from "./lease";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/**
 * LeaseService provides Leases of shared resources to clients.
 * An example of a shared resource is the set of leg motors on Spot, which
 * has the resource name of "body".
 * Clients can delegate out the Leases they receive from the LeaseService
 * to additional clients or services by generating sub-leases.
 * Leases obtained from the LeaseService may be revoked if the Lease holder
 * does not check in frequently to the LeaseService, or if another client
 * force-acquires a Lease.
 */
export interface LeaseService {
  /** Acquire a lease to a specific resource if the resource is available. */
  AcquireLease(request: AcquireLeaseRequest): Promise<AcquireLeaseResponse>;
  /** Take a lease for a specific resource even if another client has a lease. */
  TakeLease(request: TakeLeaseRequest): Promise<TakeLeaseResponse>;
  /** Return a lease to the LeaseService. */
  ReturnLease(request: ReturnLeaseRequest): Promise<ReturnLeaseResponse>;
  /** List state of all leases managed by the LeaseService. */
  ListLeases(request: ListLeasesRequest): Promise<ListLeasesResponse>;
  /** Retain possession of a lease. */
  RetainLease(request: RetainLeaseRequest): Promise<RetainLeaseResponse>;
}

export class LeaseServiceClientImpl implements LeaseService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.AcquireLease = this.AcquireLease.bind(this);
    this.TakeLease = this.TakeLease.bind(this);
    this.ReturnLease = this.ReturnLease.bind(this);
    this.ListLeases = this.ListLeases.bind(this);
    this.RetainLease = this.RetainLease.bind(this);
  }
  AcquireLease(request: AcquireLeaseRequest): Promise<AcquireLeaseResponse> {
    const data = AcquireLeaseRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.LeaseService",
      "AcquireLease",
      data
    );
    return promise.then((data) =>
      AcquireLeaseResponse.decode(new _m0.Reader(data))
    );
  }

  TakeLease(request: TakeLeaseRequest): Promise<TakeLeaseResponse> {
    const data = TakeLeaseRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.LeaseService",
      "TakeLease",
      data
    );
    return promise.then((data) =>
      TakeLeaseResponse.decode(new _m0.Reader(data))
    );
  }

  ReturnLease(request: ReturnLeaseRequest): Promise<ReturnLeaseResponse> {
    const data = ReturnLeaseRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.LeaseService",
      "ReturnLease",
      data
    );
    return promise.then((data) =>
      ReturnLeaseResponse.decode(new _m0.Reader(data))
    );
  }

  ListLeases(request: ListLeasesRequest): Promise<ListLeasesResponse> {
    const data = ListLeasesRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.LeaseService",
      "ListLeases",
      data
    );
    return promise.then((data) =>
      ListLeasesResponse.decode(new _m0.Reader(data))
    );
  }

  RetainLease(request: RetainLeaseRequest): Promise<RetainLeaseResponse> {
    const data = RetainLeaseRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.LeaseService",
      "RetainLease",
      data
    );
    return promise.then((data) =>
      RetainLeaseResponse.decode(new _m0.Reader(data))
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
