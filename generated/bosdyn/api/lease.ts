/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp";
import { RequestHeader, ResponseHeader } from "./header";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/**
 * Leases are used to verify that a client has exclusive access to a shared
 * resources. Examples of shared resources are the motors for a robot, or
 * indicator lights on a robot.
 * Leases are initially obtained by clients from the LeaseService. Clients
 * then attach Leases to Commands which require them. Clients may also
 * generate sub-Leases to delegate out control of the resource to other
 * services.
 */
export interface Lease {
  /** The resource that the Lease is for. */
  resource: string;
  /**
   * The epoch for the Lease. The sequences field are scoped to a particular epoch.
   * One example of where this can be used is to generate a random epoch
   * at LeaseService startup.
   */
  epoch: string;
  /** Logical vector clock indicating when the Lease was generated. */
  sequence: number[];
  /** The set of different clients which have sent/receieved the lease. */
  clientNames: string[];
}

/**
 * Lease resources can be divided into a hierarchy of sub-resources that can
 * be commanded together. This message describes the hierarchy of a resource.
 */
export interface ResourceTree {
  /** The name of this resource. */
  resource: string;
  /** Sub-resources that make up this resource. */
  subResources: ResourceTree[];
}

/** Details about who currently owns the Lease for a resource. */
export interface LeaseOwner {
  /** The name of the client application. */
  clientName: string;
  /** The name of the user. */
  userName: string;
}

/**
 * Result for when a Lease is used - for example, in a LeaseRetainer, or
 * associated with a command.
 */
export interface LeaseUseResult {
  status: LeaseUseResult_Status;
  /** The current lease owner. */
  owner: LeaseOwner | undefined;
  /** The lease which was attempted for use. */
  attemptedLease: Lease | undefined;
  /** The previous lease, if any, which was used. */
  previousLease: Lease | undefined;
  /** The "latest"/"most recent" lease known to the system. */
  latestKnownLease: Lease | undefined;
  /** Represents the latest "leaf" resources of the hierarchy. */
  latestResources: Lease[];
}

export enum LeaseUseResult_Status {
  /** STATUS_UNKNOWN - An internal issue occurred. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - The Lease was accepted. */
  STATUS_OK = 1,
  /** STATUS_INVALID_LEASE - The Lease is invalid. */
  STATUS_INVALID_LEASE = 2,
  /** STATUS_OLDER - The Lease is older than the current lease, and rejected. */
  STATUS_OLDER = 3,
  /** STATUS_REVOKED - The Lease holder did not check in regularly enough, and the Lease is stale. */
  STATUS_REVOKED = 4,
  /** STATUS_UNMANAGED - The Lease was for an unmanaged resource. */
  STATUS_UNMANAGED = 5,
  /** STATUS_WRONG_EPOCH - The Lease was for the wrong epoch. */
  STATUS_WRONG_EPOCH = 6,
  UNRECOGNIZED = -1,
}

export function leaseUseResult_StatusFromJSON(
  object: any
): LeaseUseResult_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return LeaseUseResult_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return LeaseUseResult_Status.STATUS_OK;
    case 2:
    case "STATUS_INVALID_LEASE":
      return LeaseUseResult_Status.STATUS_INVALID_LEASE;
    case 3:
    case "STATUS_OLDER":
      return LeaseUseResult_Status.STATUS_OLDER;
    case 4:
    case "STATUS_REVOKED":
      return LeaseUseResult_Status.STATUS_REVOKED;
    case 5:
    case "STATUS_UNMANAGED":
      return LeaseUseResult_Status.STATUS_UNMANAGED;
    case 6:
    case "STATUS_WRONG_EPOCH":
      return LeaseUseResult_Status.STATUS_WRONG_EPOCH;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LeaseUseResult_Status.UNRECOGNIZED;
  }
}

export function leaseUseResult_StatusToJSON(
  object: LeaseUseResult_Status
): string {
  switch (object) {
    case LeaseUseResult_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case LeaseUseResult_Status.STATUS_OK:
      return "STATUS_OK";
    case LeaseUseResult_Status.STATUS_INVALID_LEASE:
      return "STATUS_INVALID_LEASE";
    case LeaseUseResult_Status.STATUS_OLDER:
      return "STATUS_OLDER";
    case LeaseUseResult_Status.STATUS_REVOKED:
      return "STATUS_REVOKED";
    case LeaseUseResult_Status.STATUS_UNMANAGED:
      return "STATUS_UNMANAGED";
    case LeaseUseResult_Status.STATUS_WRONG_EPOCH:
      return "STATUS_WRONG_EPOCH";
    case LeaseUseResult_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** The AcquireLease request message which sends which resource the lease should be for. */
export interface AcquireLeaseRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** The resource to obtain a Lease for. */
  resource: string;
}

/**
 * The AcquireLease response returns the lease for the desired resource if it could be obtained.
 * If a client is returned a new lease, the client should initiate a
 * RetainLease bidirectional streaming request immediately after completion
 * of AcquireLease.
 */
export interface AcquireLeaseResponse {
  /** Common response Header. */
  header: ResponseHeader | undefined;
  /** Return status for the request. */
  status: AcquireLeaseResponse_Status;
  /** The lease for the resource. Only set if status field == STATUS_OK. */
  lease: Lease | undefined;
  /** The owner for the lease. Set if status field == OK or status field == RESOURCE_ALREADY_CLAIMED. */
  leaseOwner: LeaseOwner | undefined;
}

export enum AcquireLeaseResponse_Status {
  /**
   * STATUS_UNKNOWN - UNKNOWN should never be used. An internal LeaseService issue has happened
   * if UNKNOWN is set.
   */
  STATUS_UNKNOWN = 0,
  /**
   * STATUS_OK - AcquireLease was successful.The lease field will be populated with the new
   * lease for the resource. The client is expected to call the RetainLease method
   * immediately after.
   */
  STATUS_OK = 1,
  /**
   * STATUS_RESOURCE_ALREADY_CLAIMED - AcquireLease failed since the resource has already been claimed.
   * The TakeLease method may be used to forcefully grab the lease.
   */
  STATUS_RESOURCE_ALREADY_CLAIMED = 2,
  /**
   * STATUS_INVALID_RESOURCE - AcquireLease failed since the resource is not known to LeaseService.
   * The ListLeaseResources method may be used to list all known
   * resources.
   */
  STATUS_INVALID_RESOURCE = 3,
  /** STATUS_NOT_AUTHORITATIVE_SERVICE - The LeaseService is not authoritative - so Acquire should not work. */
  STATUS_NOT_AUTHORITATIVE_SERVICE = 4,
  UNRECOGNIZED = -1,
}

export function acquireLeaseResponse_StatusFromJSON(
  object: any
): AcquireLeaseResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return AcquireLeaseResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return AcquireLeaseResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_RESOURCE_ALREADY_CLAIMED":
      return AcquireLeaseResponse_Status.STATUS_RESOURCE_ALREADY_CLAIMED;
    case 3:
    case "STATUS_INVALID_RESOURCE":
      return AcquireLeaseResponse_Status.STATUS_INVALID_RESOURCE;
    case 4:
    case "STATUS_NOT_AUTHORITATIVE_SERVICE":
      return AcquireLeaseResponse_Status.STATUS_NOT_AUTHORITATIVE_SERVICE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AcquireLeaseResponse_Status.UNRECOGNIZED;
  }
}

export function acquireLeaseResponse_StatusToJSON(
  object: AcquireLeaseResponse_Status
): string {
  switch (object) {
    case AcquireLeaseResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case AcquireLeaseResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case AcquireLeaseResponse_Status.STATUS_RESOURCE_ALREADY_CLAIMED:
      return "STATUS_RESOURCE_ALREADY_CLAIMED";
    case AcquireLeaseResponse_Status.STATUS_INVALID_RESOURCE:
      return "STATUS_INVALID_RESOURCE";
    case AcquireLeaseResponse_Status.STATUS_NOT_AUTHORITATIVE_SERVICE:
      return "STATUS_NOT_AUTHORITATIVE_SERVICE";
    case AcquireLeaseResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** The TakeLease request message which sends which resource the lease should be for. */
export interface TakeLeaseRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** The resource to obtain a Lease for. */
  resource: string;
}

/**
 * The TakeLease response returns the lease for the desired resource if it could be obtained.
 * In most cases if the resource is managed by the LeaseService, TakeLease
 * will succeed. However, in the future policies may be introduced which will prevent
 * TakeLease from succeeding and clients should be prepared to handle that
 * case.
 * If a client obtains a new lease, the client should initiate a
 * RetainLease bidirectional streaming request immediately after completion
 * of TakeLease.
 */
export interface TakeLeaseResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Return status for the request. */
  status: TakeLeaseResponse_Status;
  /** The lease for the resource. Only set if status field == STATUS_OK. */
  lease: Lease | undefined;
  /** The owner for the lease. Set if status field == STATUS_OK. */
  leaseOwner: LeaseOwner | undefined;
}

export enum TakeLeaseResponse_Status {
  /** STATUS_UNKNOWN - UNKNOWN should never be used. An internal LeaseService issue has happened if UNKNOWN is set. */
  STATUS_UNKNOWN = 0,
  /**
   * STATUS_OK - TakeLease was successful. The lease field will be populated with the
   * new lease for the resource. The client is expected to call the RetainLease
   * method immediately after.
   */
  STATUS_OK = 1,
  /**
   * STATUS_INVALID_RESOURCE - TakeLease failed since the resource is not known to LeaseService.
   * The ListLeaseResources method may be used to list all known
   * resources.
   */
  STATUS_INVALID_RESOURCE = 2,
  /** STATUS_NOT_AUTHORITATIVE_SERVICE - The LeaseService is not authoritative - so Acquire should not work. */
  STATUS_NOT_AUTHORITATIVE_SERVICE = 3,
  UNRECOGNIZED = -1,
}

export function takeLeaseResponse_StatusFromJSON(
  object: any
): TakeLeaseResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return TakeLeaseResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return TakeLeaseResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_INVALID_RESOURCE":
      return TakeLeaseResponse_Status.STATUS_INVALID_RESOURCE;
    case 3:
    case "STATUS_NOT_AUTHORITATIVE_SERVICE":
      return TakeLeaseResponse_Status.STATUS_NOT_AUTHORITATIVE_SERVICE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TakeLeaseResponse_Status.UNRECOGNIZED;
  }
}

export function takeLeaseResponse_StatusToJSON(
  object: TakeLeaseResponse_Status
): string {
  switch (object) {
    case TakeLeaseResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case TakeLeaseResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case TakeLeaseResponse_Status.STATUS_INVALID_RESOURCE:
      return "STATUS_INVALID_RESOURCE";
    case TakeLeaseResponse_Status.STATUS_NOT_AUTHORITATIVE_SERVICE:
      return "STATUS_NOT_AUTHORITATIVE_SERVICE";
    case TakeLeaseResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * The ReturnLease request message will be sent to the LeaseService. If the lease
 * is currently active for the resource, the LeaseService will invalidate the lease.
 * Future calls to AcquireLease by any client will now succeed.
 */
export interface ReturnLeaseRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** The Lease to return back to the LeaseService. */
  lease: Lease | undefined;
}

/** The ReturnLease response message */
export interface ReturnLeaseResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Return status for the request. */
  status: ReturnLeaseResponse_Status;
}

export enum ReturnLeaseResponse_Status {
  /** STATUS_UNKNOWN - UNKNOWN should never be used. An internal LeaseService issue has happened if UNKNOWN is set. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - ReturnLease was successful. */
  STATUS_OK = 1,
  /**
   * STATUS_INVALID_RESOURCE - ReturnLease failed because the resource covered by the lease
   * is not being managed by the LeaseService.
   */
  STATUS_INVALID_RESOURCE = 2,
  /** STATUS_NOT_ACTIVE_LEASE - ReturnLease failed because the lease was not the active lease. */
  STATUS_NOT_ACTIVE_LEASE = 3,
  /** STATUS_NOT_AUTHORITATIVE_SERVICE - The LeaseService is not authoritative - so Acquire should not work. */
  STATUS_NOT_AUTHORITATIVE_SERVICE = 4,
  UNRECOGNIZED = -1,
}

export function returnLeaseResponse_StatusFromJSON(
  object: any
): ReturnLeaseResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return ReturnLeaseResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return ReturnLeaseResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_INVALID_RESOURCE":
      return ReturnLeaseResponse_Status.STATUS_INVALID_RESOURCE;
    case 3:
    case "STATUS_NOT_ACTIVE_LEASE":
      return ReturnLeaseResponse_Status.STATUS_NOT_ACTIVE_LEASE;
    case 4:
    case "STATUS_NOT_AUTHORITATIVE_SERVICE":
      return ReturnLeaseResponse_Status.STATUS_NOT_AUTHORITATIVE_SERVICE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ReturnLeaseResponse_Status.UNRECOGNIZED;
  }
}

export function returnLeaseResponse_StatusToJSON(
  object: ReturnLeaseResponse_Status
): string {
  switch (object) {
    case ReturnLeaseResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case ReturnLeaseResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case ReturnLeaseResponse_Status.STATUS_INVALID_RESOURCE:
      return "STATUS_INVALID_RESOURCE";
    case ReturnLeaseResponse_Status.STATUS_NOT_ACTIVE_LEASE:
      return "STATUS_NOT_ACTIVE_LEASE";
    case ReturnLeaseResponse_Status.STATUS_NOT_AUTHORITATIVE_SERVICE:
      return "STATUS_NOT_AUTHORITATIVE_SERVICE";
    case ReturnLeaseResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** The ListLease request message asks for information about any known lease resources. */
export interface ListLeasesRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /**
   * Include the full data of leases in use, if available.
   * Defaults to false to receive basic information.
   */
  includeFullLeaseInfo: boolean;
}

/**
 * Describes all information about a sepcific lease: including the resource it covers, the
 * active lease, and which application is the owner of a lease.
 */
export interface LeaseResource {
  /** The resource name. */
  resource: string;
  /** The active lease, if any. */
  lease: Lease | undefined;
  /** The Lease Owner, if there is a Lease. */
  leaseOwner: LeaseOwner | undefined;
  /**
   * The robot time when this lease will become stale.  A stale lease can be
   * acquired with an AcquireLeaseRequest OR a TakeLeaseRequest, while a lease
   * that is not stale can only be acquired with a TakeLeaseRequest.
   *
   * Leases get marked stale when they haven't been used in a while.  If you want
   * to prevent your lease from being marked stale, you need to either:
   *     - Periodically send RetainLeaseRequests.
   *     - Periodically send valid commands to the robot using the lease.  Note
   *       that only some types of commands will actually cause explicit lease
   *       retention.
   *
   * Commands & RetainLeaseRequests issued with a stale lease will still be accepted.
   * Stale leases, when used, will cause the used lease to no longer be stale.
   */
  staleTime: Date | undefined;
}

/** The ListLease response message returns all known lease resources from the LeaseService. */
export interface ListLeasesResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** The resources managed by the LeaseService. */
  resources: LeaseResource[];
  /**
   * Provide the hierarchical lease structure.
   * A resource can encapsulate multiple sub-resources.
   * For example, the "body" lease may include control of the legs, arm, and gripper.
   */
  resourceTree: ResourceTree | undefined;
}

/**
 * The RetainLease request will inform the LeaseService that the application contains to hold
 * ownership of this lease. Lease holders are expected to be reachable and alive. If enough time
 * has passed since the last RetainLeaseRequest, the LeaseService will revoke the lease.
 */
export interface RetainLeaseRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /**
   * The Lease to retain ownership over. May also be a "super" lease of the lease to retain
   * ownership over.
   */
  lease: Lease | undefined;
}

/**
 * The RetainLease response message sends the result of the attempted RetainLease request, which
 * contains whether or not the lease is still owned by the application sending the request.
 */
export interface RetainLeaseResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Result of using the lease. */
  leaseUseResult: LeaseUseResult | undefined;
}

function createBaseLease(): Lease {
  return { resource: "", epoch: "", sequence: [], clientNames: [] };
}

export const Lease = {
  encode(message: Lease, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.resource !== "") {
      writer.uint32(10).string(message.resource);
    }
    if (message.epoch !== "") {
      writer.uint32(18).string(message.epoch);
    }
    writer.uint32(26).fork();
    for (const v of message.sequence) {
      writer.uint32(v);
    }
    writer.ldelim();
    for (const v of message.clientNames) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Lease {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLease();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.resource = reader.string();
          break;
        case 2:
          message.epoch = reader.string();
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.sequence.push(reader.uint32());
            }
          } else {
            message.sequence.push(reader.uint32());
          }
          break;
        case 4:
          message.clientNames.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Lease {
    return {
      resource: isSet(object.resource) ? String(object.resource) : "",
      epoch: isSet(object.epoch) ? String(object.epoch) : "",
      sequence: Array.isArray(object?.sequence)
        ? object.sequence.map((e: any) => Number(e))
        : [],
      clientNames: Array.isArray(object?.clientNames)
        ? object.clientNames.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: Lease): unknown {
    const obj: any = {};
    message.resource !== undefined && (obj.resource = message.resource);
    message.epoch !== undefined && (obj.epoch = message.epoch);
    if (message.sequence) {
      obj.sequence = message.sequence.map((e) => Math.round(e));
    } else {
      obj.sequence = [];
    }
    if (message.clientNames) {
      obj.clientNames = message.clientNames.map((e) => e);
    } else {
      obj.clientNames = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Lease>, I>>(object: I): Lease {
    const message = createBaseLease();
    message.resource = object.resource ?? "";
    message.epoch = object.epoch ?? "";
    message.sequence = object.sequence?.map((e) => e) || [];
    message.clientNames = object.clientNames?.map((e) => e) || [];
    return message;
  },
};

function createBaseResourceTree(): ResourceTree {
  return { resource: "", subResources: [] };
}

export const ResourceTree = {
  encode(
    message: ResourceTree,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.resource !== "") {
      writer.uint32(10).string(message.resource);
    }
    for (const v of message.subResources) {
      ResourceTree.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResourceTree {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResourceTree();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.resource = reader.string();
          break;
        case 2:
          message.subResources.push(
            ResourceTree.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResourceTree {
    return {
      resource: isSet(object.resource) ? String(object.resource) : "",
      subResources: Array.isArray(object?.subResources)
        ? object.subResources.map((e: any) => ResourceTree.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ResourceTree): unknown {
    const obj: any = {};
    message.resource !== undefined && (obj.resource = message.resource);
    if (message.subResources) {
      obj.subResources = message.subResources.map((e) =>
        e ? ResourceTree.toJSON(e) : undefined
      );
    } else {
      obj.subResources = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ResourceTree>, I>>(
    object: I
  ): ResourceTree {
    const message = createBaseResourceTree();
    message.resource = object.resource ?? "";
    message.subResources =
      object.subResources?.map((e) => ResourceTree.fromPartial(e)) || [];
    return message;
  },
};

function createBaseLeaseOwner(): LeaseOwner {
  return { clientName: "", userName: "" };
}

export const LeaseOwner = {
  encode(
    message: LeaseOwner,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.clientName !== "") {
      writer.uint32(10).string(message.clientName);
    }
    if (message.userName !== "") {
      writer.uint32(18).string(message.userName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LeaseOwner {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLeaseOwner();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clientName = reader.string();
          break;
        case 2:
          message.userName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LeaseOwner {
    return {
      clientName: isSet(object.clientName) ? String(object.clientName) : "",
      userName: isSet(object.userName) ? String(object.userName) : "",
    };
  },

  toJSON(message: LeaseOwner): unknown {
    const obj: any = {};
    message.clientName !== undefined && (obj.clientName = message.clientName);
    message.userName !== undefined && (obj.userName = message.userName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LeaseOwner>, I>>(
    object: I
  ): LeaseOwner {
    const message = createBaseLeaseOwner();
    message.clientName = object.clientName ?? "";
    message.userName = object.userName ?? "";
    return message;
  },
};

function createBaseLeaseUseResult(): LeaseUseResult {
  return {
    status: 0,
    owner: undefined,
    attemptedLease: undefined,
    previousLease: undefined,
    latestKnownLease: undefined,
    latestResources: [],
  };
}

export const LeaseUseResult = {
  encode(
    message: LeaseUseResult,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    if (message.owner !== undefined) {
      LeaseOwner.encode(message.owner, writer.uint32(18).fork()).ldelim();
    }
    if (message.attemptedLease !== undefined) {
      Lease.encode(message.attemptedLease, writer.uint32(26).fork()).ldelim();
    }
    if (message.previousLease !== undefined) {
      Lease.encode(message.previousLease, writer.uint32(34).fork()).ldelim();
    }
    if (message.latestKnownLease !== undefined) {
      Lease.encode(message.latestKnownLease, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.latestResources) {
      Lease.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LeaseUseResult {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLeaseUseResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32() as any;
          break;
        case 2:
          message.owner = LeaseOwner.decode(reader, reader.uint32());
          break;
        case 3:
          message.attemptedLease = Lease.decode(reader, reader.uint32());
          break;
        case 4:
          message.previousLease = Lease.decode(reader, reader.uint32());
          break;
        case 5:
          message.latestKnownLease = Lease.decode(reader, reader.uint32());
          break;
        case 6:
          message.latestResources.push(Lease.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LeaseUseResult {
    return {
      status: isSet(object.status)
        ? leaseUseResult_StatusFromJSON(object.status)
        : 0,
      owner: isSet(object.owner)
        ? LeaseOwner.fromJSON(object.owner)
        : undefined,
      attemptedLease: isSet(object.attemptedLease)
        ? Lease.fromJSON(object.attemptedLease)
        : undefined,
      previousLease: isSet(object.previousLease)
        ? Lease.fromJSON(object.previousLease)
        : undefined,
      latestKnownLease: isSet(object.latestKnownLease)
        ? Lease.fromJSON(object.latestKnownLease)
        : undefined,
      latestResources: Array.isArray(object?.latestResources)
        ? object.latestResources.map((e: any) => Lease.fromJSON(e))
        : [],
    };
  },

  toJSON(message: LeaseUseResult): unknown {
    const obj: any = {};
    message.status !== undefined &&
      (obj.status = leaseUseResult_StatusToJSON(message.status));
    message.owner !== undefined &&
      (obj.owner = message.owner
        ? LeaseOwner.toJSON(message.owner)
        : undefined);
    message.attemptedLease !== undefined &&
      (obj.attemptedLease = message.attemptedLease
        ? Lease.toJSON(message.attemptedLease)
        : undefined);
    message.previousLease !== undefined &&
      (obj.previousLease = message.previousLease
        ? Lease.toJSON(message.previousLease)
        : undefined);
    message.latestKnownLease !== undefined &&
      (obj.latestKnownLease = message.latestKnownLease
        ? Lease.toJSON(message.latestKnownLease)
        : undefined);
    if (message.latestResources) {
      obj.latestResources = message.latestResources.map((e) =>
        e ? Lease.toJSON(e) : undefined
      );
    } else {
      obj.latestResources = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LeaseUseResult>, I>>(
    object: I
  ): LeaseUseResult {
    const message = createBaseLeaseUseResult();
    message.status = object.status ?? 0;
    message.owner =
      object.owner !== undefined && object.owner !== null
        ? LeaseOwner.fromPartial(object.owner)
        : undefined;
    message.attemptedLease =
      object.attemptedLease !== undefined && object.attemptedLease !== null
        ? Lease.fromPartial(object.attemptedLease)
        : undefined;
    message.previousLease =
      object.previousLease !== undefined && object.previousLease !== null
        ? Lease.fromPartial(object.previousLease)
        : undefined;
    message.latestKnownLease =
      object.latestKnownLease !== undefined && object.latestKnownLease !== null
        ? Lease.fromPartial(object.latestKnownLease)
        : undefined;
    message.latestResources =
      object.latestResources?.map((e) => Lease.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAcquireLeaseRequest(): AcquireLeaseRequest {
  return { header: undefined, resource: "" };
}

export const AcquireLeaseRequest = {
  encode(
    message: AcquireLeaseRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.resource !== "") {
      writer.uint32(18).string(message.resource);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AcquireLeaseRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAcquireLeaseRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.resource = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AcquireLeaseRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      resource: isSet(object.resource) ? String(object.resource) : "",
    };
  },

  toJSON(message: AcquireLeaseRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.resource !== undefined && (obj.resource = message.resource);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AcquireLeaseRequest>, I>>(
    object: I
  ): AcquireLeaseRequest {
    const message = createBaseAcquireLeaseRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.resource = object.resource ?? "";
    return message;
  },
};

function createBaseAcquireLeaseResponse(): AcquireLeaseResponse {
  return {
    header: undefined,
    status: 0,
    lease: undefined,
    leaseOwner: undefined,
  };
}

export const AcquireLeaseResponse = {
  encode(
    message: AcquireLeaseResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.lease !== undefined) {
      Lease.encode(message.lease, writer.uint32(26).fork()).ldelim();
    }
    if (message.leaseOwner !== undefined) {
      LeaseOwner.encode(message.leaseOwner, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AcquireLeaseResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAcquireLeaseResponse();
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
          message.lease = Lease.decode(reader, reader.uint32());
          break;
        case 4:
          message.leaseOwner = LeaseOwner.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AcquireLeaseResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? acquireLeaseResponse_StatusFromJSON(object.status)
        : 0,
      lease: isSet(object.lease) ? Lease.fromJSON(object.lease) : undefined,
      leaseOwner: isSet(object.leaseOwner)
        ? LeaseOwner.fromJSON(object.leaseOwner)
        : undefined,
    };
  },

  toJSON(message: AcquireLeaseResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = acquireLeaseResponse_StatusToJSON(message.status));
    message.lease !== undefined &&
      (obj.lease = message.lease ? Lease.toJSON(message.lease) : undefined);
    message.leaseOwner !== undefined &&
      (obj.leaseOwner = message.leaseOwner
        ? LeaseOwner.toJSON(message.leaseOwner)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AcquireLeaseResponse>, I>>(
    object: I
  ): AcquireLeaseResponse {
    const message = createBaseAcquireLeaseResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    message.lease =
      object.lease !== undefined && object.lease !== null
        ? Lease.fromPartial(object.lease)
        : undefined;
    message.leaseOwner =
      object.leaseOwner !== undefined && object.leaseOwner !== null
        ? LeaseOwner.fromPartial(object.leaseOwner)
        : undefined;
    return message;
  },
};

function createBaseTakeLeaseRequest(): TakeLeaseRequest {
  return { header: undefined, resource: "" };
}

export const TakeLeaseRequest = {
  encode(
    message: TakeLeaseRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.resource !== "") {
      writer.uint32(18).string(message.resource);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TakeLeaseRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTakeLeaseRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.resource = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TakeLeaseRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      resource: isSet(object.resource) ? String(object.resource) : "",
    };
  },

  toJSON(message: TakeLeaseRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.resource !== undefined && (obj.resource = message.resource);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TakeLeaseRequest>, I>>(
    object: I
  ): TakeLeaseRequest {
    const message = createBaseTakeLeaseRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.resource = object.resource ?? "";
    return message;
  },
};

function createBaseTakeLeaseResponse(): TakeLeaseResponse {
  return {
    header: undefined,
    status: 0,
    lease: undefined,
    leaseOwner: undefined,
  };
}

export const TakeLeaseResponse = {
  encode(
    message: TakeLeaseResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.lease !== undefined) {
      Lease.encode(message.lease, writer.uint32(26).fork()).ldelim();
    }
    if (message.leaseOwner !== undefined) {
      LeaseOwner.encode(message.leaseOwner, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TakeLeaseResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTakeLeaseResponse();
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
          message.lease = Lease.decode(reader, reader.uint32());
          break;
        case 4:
          message.leaseOwner = LeaseOwner.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TakeLeaseResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? takeLeaseResponse_StatusFromJSON(object.status)
        : 0,
      lease: isSet(object.lease) ? Lease.fromJSON(object.lease) : undefined,
      leaseOwner: isSet(object.leaseOwner)
        ? LeaseOwner.fromJSON(object.leaseOwner)
        : undefined,
    };
  },

  toJSON(message: TakeLeaseResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = takeLeaseResponse_StatusToJSON(message.status));
    message.lease !== undefined &&
      (obj.lease = message.lease ? Lease.toJSON(message.lease) : undefined);
    message.leaseOwner !== undefined &&
      (obj.leaseOwner = message.leaseOwner
        ? LeaseOwner.toJSON(message.leaseOwner)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TakeLeaseResponse>, I>>(
    object: I
  ): TakeLeaseResponse {
    const message = createBaseTakeLeaseResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    message.lease =
      object.lease !== undefined && object.lease !== null
        ? Lease.fromPartial(object.lease)
        : undefined;
    message.leaseOwner =
      object.leaseOwner !== undefined && object.leaseOwner !== null
        ? LeaseOwner.fromPartial(object.leaseOwner)
        : undefined;
    return message;
  },
};

function createBaseReturnLeaseRequest(): ReturnLeaseRequest {
  return { header: undefined, lease: undefined };
}

export const ReturnLeaseRequest = {
  encode(
    message: ReturnLeaseRequest,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ReturnLeaseRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReturnLeaseRequest();
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

  fromJSON(object: any): ReturnLeaseRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      lease: isSet(object.lease) ? Lease.fromJSON(object.lease) : undefined,
    };
  },

  toJSON(message: ReturnLeaseRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.lease !== undefined &&
      (obj.lease = message.lease ? Lease.toJSON(message.lease) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ReturnLeaseRequest>, I>>(
    object: I
  ): ReturnLeaseRequest {
    const message = createBaseReturnLeaseRequest();
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

function createBaseReturnLeaseResponse(): ReturnLeaseResponse {
  return { header: undefined, status: 0 };
}

export const ReturnLeaseResponse = {
  encode(
    message: ReturnLeaseResponse,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ReturnLeaseResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReturnLeaseResponse();
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

  fromJSON(object: any): ReturnLeaseResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? returnLeaseResponse_StatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: ReturnLeaseResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = returnLeaseResponse_StatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ReturnLeaseResponse>, I>>(
    object: I
  ): ReturnLeaseResponse {
    const message = createBaseReturnLeaseResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseListLeasesRequest(): ListLeasesRequest {
  return { header: undefined, includeFullLeaseInfo: false };
}

export const ListLeasesRequest = {
  encode(
    message: ListLeasesRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.includeFullLeaseInfo === true) {
      writer.uint32(16).bool(message.includeFullLeaseInfo);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListLeasesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListLeasesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.includeFullLeaseInfo = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListLeasesRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      includeFullLeaseInfo: isSet(object.includeFullLeaseInfo)
        ? Boolean(object.includeFullLeaseInfo)
        : false,
    };
  },

  toJSON(message: ListLeasesRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.includeFullLeaseInfo !== undefined &&
      (obj.includeFullLeaseInfo = message.includeFullLeaseInfo);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListLeasesRequest>, I>>(
    object: I
  ): ListLeasesRequest {
    const message = createBaseListLeasesRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.includeFullLeaseInfo = object.includeFullLeaseInfo ?? false;
    return message;
  },
};

function createBaseLeaseResource(): LeaseResource {
  return {
    resource: "",
    lease: undefined,
    leaseOwner: undefined,
    staleTime: undefined,
  };
}

export const LeaseResource = {
  encode(
    message: LeaseResource,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.resource !== "") {
      writer.uint32(10).string(message.resource);
    }
    if (message.lease !== undefined) {
      Lease.encode(message.lease, writer.uint32(18).fork()).ldelim();
    }
    if (message.leaseOwner !== undefined) {
      LeaseOwner.encode(message.leaseOwner, writer.uint32(26).fork()).ldelim();
    }
    if (message.staleTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.staleTime),
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LeaseResource {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLeaseResource();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.resource = reader.string();
          break;
        case 2:
          message.lease = Lease.decode(reader, reader.uint32());
          break;
        case 3:
          message.leaseOwner = LeaseOwner.decode(reader, reader.uint32());
          break;
        case 4:
          message.staleTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LeaseResource {
    return {
      resource: isSet(object.resource) ? String(object.resource) : "",
      lease: isSet(object.lease) ? Lease.fromJSON(object.lease) : undefined,
      leaseOwner: isSet(object.leaseOwner)
        ? LeaseOwner.fromJSON(object.leaseOwner)
        : undefined,
      staleTime: isSet(object.staleTime)
        ? fromJsonTimestamp(object.staleTime)
        : undefined,
    };
  },

  toJSON(message: LeaseResource): unknown {
    const obj: any = {};
    message.resource !== undefined && (obj.resource = message.resource);
    message.lease !== undefined &&
      (obj.lease = message.lease ? Lease.toJSON(message.lease) : undefined);
    message.leaseOwner !== undefined &&
      (obj.leaseOwner = message.leaseOwner
        ? LeaseOwner.toJSON(message.leaseOwner)
        : undefined);
    message.staleTime !== undefined &&
      (obj.staleTime = message.staleTime.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LeaseResource>, I>>(
    object: I
  ): LeaseResource {
    const message = createBaseLeaseResource();
    message.resource = object.resource ?? "";
    message.lease =
      object.lease !== undefined && object.lease !== null
        ? Lease.fromPartial(object.lease)
        : undefined;
    message.leaseOwner =
      object.leaseOwner !== undefined && object.leaseOwner !== null
        ? LeaseOwner.fromPartial(object.leaseOwner)
        : undefined;
    message.staleTime = object.staleTime ?? undefined;
    return message;
  },
};

function createBaseListLeasesResponse(): ListLeasesResponse {
  return { header: undefined, resources: [], resourceTree: undefined };
}

export const ListLeasesResponse = {
  encode(
    message: ListLeasesResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.resources) {
      LeaseResource.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.resourceTree !== undefined) {
      ResourceTree.encode(
        message.resourceTree,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListLeasesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListLeasesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.resources.push(LeaseResource.decode(reader, reader.uint32()));
          break;
        case 3:
          message.resourceTree = ResourceTree.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListLeasesResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      resources: Array.isArray(object?.resources)
        ? object.resources.map((e: any) => LeaseResource.fromJSON(e))
        : [],
      resourceTree: isSet(object.resourceTree)
        ? ResourceTree.fromJSON(object.resourceTree)
        : undefined,
    };
  },

  toJSON(message: ListLeasesResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.resources) {
      obj.resources = message.resources.map((e) =>
        e ? LeaseResource.toJSON(e) : undefined
      );
    } else {
      obj.resources = [];
    }
    message.resourceTree !== undefined &&
      (obj.resourceTree = message.resourceTree
        ? ResourceTree.toJSON(message.resourceTree)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListLeasesResponse>, I>>(
    object: I
  ): ListLeasesResponse {
    const message = createBaseListLeasesResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.resources =
      object.resources?.map((e) => LeaseResource.fromPartial(e)) || [];
    message.resourceTree =
      object.resourceTree !== undefined && object.resourceTree !== null
        ? ResourceTree.fromPartial(object.resourceTree)
        : undefined;
    return message;
  },
};

function createBaseRetainLeaseRequest(): RetainLeaseRequest {
  return { header: undefined, lease: undefined };
}

export const RetainLeaseRequest = {
  encode(
    message: RetainLeaseRequest,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): RetainLeaseRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRetainLeaseRequest();
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

  fromJSON(object: any): RetainLeaseRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      lease: isSet(object.lease) ? Lease.fromJSON(object.lease) : undefined,
    };
  },

  toJSON(message: RetainLeaseRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.lease !== undefined &&
      (obj.lease = message.lease ? Lease.toJSON(message.lease) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RetainLeaseRequest>, I>>(
    object: I
  ): RetainLeaseRequest {
    const message = createBaseRetainLeaseRequest();
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

function createBaseRetainLeaseResponse(): RetainLeaseResponse {
  return { header: undefined, leaseUseResult: undefined };
}

export const RetainLeaseResponse = {
  encode(
    message: RetainLeaseResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.leaseUseResult !== undefined) {
      LeaseUseResult.encode(
        message.leaseUseResult,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RetainLeaseResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRetainLeaseResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
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

  fromJSON(object: any): RetainLeaseResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      leaseUseResult: isSet(object.leaseUseResult)
        ? LeaseUseResult.fromJSON(object.leaseUseResult)
        : undefined,
    };
  },

  toJSON(message: RetainLeaseResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.leaseUseResult !== undefined &&
      (obj.leaseUseResult = message.leaseUseResult
        ? LeaseUseResult.toJSON(message.leaseUseResult)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RetainLeaseResponse>, I>>(
    object: I
  ): RetainLeaseResponse {
    const message = createBaseRetainLeaseResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.leaseUseResult =
      object.leaseUseResult !== undefined && object.leaseUseResult !== null
        ? LeaseUseResult.fromPartial(object.leaseUseResult)
        : undefined;
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
