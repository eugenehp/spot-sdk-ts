/* eslint-disable */
import {
  LicenseInfo_Status,
  licenseInfo_StatusFromJSON,
  licenseInfo_StatusToJSON,
} from "../license";
import { Waypoint_Annotations, Edge_Annotations, Waypoint, Edge } from "./map";
import { RequestHeader, ResponseHeader } from "../header";
import { Lease, LeaseUseResult } from "../lease";
import { WorldObject } from "../world_object";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api.graph_nav";

/**
 * The RecordingEnvironment is a set of annotation information and a name for the
 * current environment that will persist for all edges and waypoints until it is
 * changed or updated
 */
export interface RecordingEnvironment {
  /** This will be prepended to the start of every waypoint name. */
  namePrefix: string;
  /**
   * Persistent waypoint annotation that will be merged in
   * to all waypoints in this recording.
   */
  waypointEnvironment: Waypoint_Annotations | undefined;
  /**
   * Persistent edge annotation that will be merged in to all
   * waypoints in this recording.
   */
  edgeEnvironment: Edge_Annotations | undefined;
}

/**
 * The SetRecordingEnvironment request message sets a persistent recording environment
 * until changed with another SetRecordingEnvironment rpc.
 */
export interface SetRecordingEnvironmentRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /**
   * Persistent environment to use while recording. This allows the
   * user to specify annotations and naming prefixes for new waypoints
   * and edges.
   */
  environment: RecordingEnvironment | undefined;
  /**
   * The recording service is protected by a lease. The client must have a
   * lease to the recording service to modify its internal state.
   */
  lease: Lease | undefined;
}

/** The SetRecordingEnvironment response message includes the result and status of the request. */
export interface SetRecordingEnvironmentResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** The results/status of the lease provided. */
  leaseUseResult: LeaseUseResult | undefined;
}

/**
 * The StartRecording request tells the recording service to begin creating waypoints with the
 * specified recording_environment.
 */
export interface StartRecordingRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /**
   * The recording service is protected by a lease. The client must have a
   * lease to the recording service to modify its internal state.
   */
  lease: Lease | undefined;
  /**
   * This will be merged into a copy of the existing persistent recording
   * environment and used as the environment for the created waypoint
   * and the edge from the previous waypoint to the new one.
   * It will not affect the persistent environment.
   */
  recordingEnvironment: RecordingEnvironment | undefined;
  /**
   * If filled out, asks that the record service verify that the given fiducial IDs
   * are presently visible before starting to record. This is useful for verifying
   * that the robot is where the user thinks it is in an area with known fiducials.
   */
  requireFiducials: number[];
}

/**
 * The StartRecording response messge returns the first created waypoint, which is made at the location
 * the robot was standing when the request was made, in addition to any status information.
 */
export interface StartRecordingResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** The waypoint that was just created. */
  createdWaypoint: Waypoint | undefined;
  /** The results/status of the lease provided. */
  leaseUseResult: LeaseUseResult | undefined;
  /** Return status for the request. */
  status: StartRecordingResponse_Status;
  /**
   * If the status is STATUS_MISSING_FIDUCIALS, these are the fiducials that are not currently
   * visible.
   */
  missingFiducials: number[];
  /**
   * If the status is STATUS_FIDUCIAL_POSE_NOT_OK, these are the fiducials that could not be
   * localized confidently.
   */
  badPoseFiducials: number[];
  /**
   * Large graphs can only be uploaded if the license permits them. Recording
   * will stop automatically when the graph gets too large. If StartRecording
   * is requested again after the graph gets too large, it will fail, and license
   * status will be filled out.
   */
  licenseStatus: LicenseInfo_Status;
}

export enum StartRecordingResponse_Status {
  /** STATUS_UNKNOWN - Status is unknown/unset. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Recording has been started. */
  STATUS_OK = 1,
  /**
   * STATUS_COULD_NOT_CREATE_WAYPOINT - In this case we tried to start recording, but GraphNav was internally still waiting for
   * some data from the robot.
   */
  STATUS_COULD_NOT_CREATE_WAYPOINT = 2,
  /** STATUS_FOLLOWING_ROUTE - Can't start recording because the robot is following a route. */
  STATUS_FOLLOWING_ROUTE = 3,
  /**
   * STATUS_NOT_LOCALIZED_TO_EXISTING_MAP - When recording branches, the robot is not localized to the existing map before starting
   * to record a new branch.
   */
  STATUS_NOT_LOCALIZED_TO_EXISTING_MAP = 4,
  /** STATUS_MISSING_FIDUCIALS - Can't start recording because the robot doesn't see the required fiducials. */
  STATUS_MISSING_FIDUCIALS = 5,
  /** STATUS_MAP_TOO_LARGE_LICENSE - Can't start recording because the map was too large for the license. */
  STATUS_MAP_TOO_LARGE_LICENSE = 6,
  /** STATUS_REMOTE_CLOUD_FAILURE_NOT_IN_DIRECTORY - A required remote cloud did not exist in the service directory. */
  STATUS_REMOTE_CLOUD_FAILURE_NOT_IN_DIRECTORY = 7,
  /** STATUS_REMOTE_CLOUD_FAILURE_NO_DATA - A required remote cloud did not have data. */
  STATUS_REMOTE_CLOUD_FAILURE_NO_DATA = 8,
  /** STATUS_FIDUCIAL_POSE_NOT_OK - All fiducials are visible but at least one pose could not be determined accurately. */
  STATUS_FIDUCIAL_POSE_NOT_OK = 9,
  /**
   * STATUS_TOO_FAR_FROM_EXISTING_MAP - When recording branches, the robot is too far from the existing map when starting
   * to record a new branch.
   */
  STATUS_TOO_FAR_FROM_EXISTING_MAP = 10,
  UNRECOGNIZED = -1,
}

export function startRecordingResponse_StatusFromJSON(
  object: any
): StartRecordingResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return StartRecordingResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return StartRecordingResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_COULD_NOT_CREATE_WAYPOINT":
      return StartRecordingResponse_Status.STATUS_COULD_NOT_CREATE_WAYPOINT;
    case 3:
    case "STATUS_FOLLOWING_ROUTE":
      return StartRecordingResponse_Status.STATUS_FOLLOWING_ROUTE;
    case 4:
    case "STATUS_NOT_LOCALIZED_TO_EXISTING_MAP":
      return StartRecordingResponse_Status.STATUS_NOT_LOCALIZED_TO_EXISTING_MAP;
    case 5:
    case "STATUS_MISSING_FIDUCIALS":
      return StartRecordingResponse_Status.STATUS_MISSING_FIDUCIALS;
    case 6:
    case "STATUS_MAP_TOO_LARGE_LICENSE":
      return StartRecordingResponse_Status.STATUS_MAP_TOO_LARGE_LICENSE;
    case 7:
    case "STATUS_REMOTE_CLOUD_FAILURE_NOT_IN_DIRECTORY":
      return StartRecordingResponse_Status.STATUS_REMOTE_CLOUD_FAILURE_NOT_IN_DIRECTORY;
    case 8:
    case "STATUS_REMOTE_CLOUD_FAILURE_NO_DATA":
      return StartRecordingResponse_Status.STATUS_REMOTE_CLOUD_FAILURE_NO_DATA;
    case 9:
    case "STATUS_FIDUCIAL_POSE_NOT_OK":
      return StartRecordingResponse_Status.STATUS_FIDUCIAL_POSE_NOT_OK;
    case 10:
    case "STATUS_TOO_FAR_FROM_EXISTING_MAP":
      return StartRecordingResponse_Status.STATUS_TOO_FAR_FROM_EXISTING_MAP;
    case -1:
    case "UNRECOGNIZED":
    default:
      return StartRecordingResponse_Status.UNRECOGNIZED;
  }
}

export function startRecordingResponse_StatusToJSON(
  object: StartRecordingResponse_Status
): string {
  switch (object) {
    case StartRecordingResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case StartRecordingResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case StartRecordingResponse_Status.STATUS_COULD_NOT_CREATE_WAYPOINT:
      return "STATUS_COULD_NOT_CREATE_WAYPOINT";
    case StartRecordingResponse_Status.STATUS_FOLLOWING_ROUTE:
      return "STATUS_FOLLOWING_ROUTE";
    case StartRecordingResponse_Status.STATUS_NOT_LOCALIZED_TO_EXISTING_MAP:
      return "STATUS_NOT_LOCALIZED_TO_EXISTING_MAP";
    case StartRecordingResponse_Status.STATUS_MISSING_FIDUCIALS:
      return "STATUS_MISSING_FIDUCIALS";
    case StartRecordingResponse_Status.STATUS_MAP_TOO_LARGE_LICENSE:
      return "STATUS_MAP_TOO_LARGE_LICENSE";
    case StartRecordingResponse_Status.STATUS_REMOTE_CLOUD_FAILURE_NOT_IN_DIRECTORY:
      return "STATUS_REMOTE_CLOUD_FAILURE_NOT_IN_DIRECTORY";
    case StartRecordingResponse_Status.STATUS_REMOTE_CLOUD_FAILURE_NO_DATA:
      return "STATUS_REMOTE_CLOUD_FAILURE_NO_DATA";
    case StartRecordingResponse_Status.STATUS_FIDUCIAL_POSE_NOT_OK:
      return "STATUS_FIDUCIAL_POSE_NOT_OK";
    case StartRecordingResponse_Status.STATUS_TOO_FAR_FROM_EXISTING_MAP:
      return "STATUS_TOO_FAR_FROM_EXISTING_MAP";
    case StartRecordingResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * The StopRecording request message tells the robot to no longer continue adding waypoints and
 * edges to the graph.
 */
export interface StopRecordingRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /**
   * The recording service is protected by a lease. The client must have a
   * lease to the recording service to modify its internal state.
   */
  lease: Lease | undefined;
}

/**
 * The StopRecording response message contains the status of this request and any useful error
 * information if the request fails.
 */
export interface StopRecordingResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** The return status for the request. */
  status: StopRecordingResponse_Status;
  /** If not localized to end, specifies which waypoint we are localized to. */
  errorWaypointLocalizedId: string;
  /** The results/status of the lease provided. */
  leaseUseResult: LeaseUseResult | undefined;
}

export enum StopRecordingResponse_Status {
  /** STATUS_UNKNOWN - Status is unknown/unset. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Recording is stopped. */
  STATUS_OK = 1,
  /**
   * STATUS_NOT_LOCALIZED_TO_END - In this case we tried to stop recording, but had an incorrect localization.
   * graph_nav is expected to be localized to the final waypoint in the chain before
   * we stop recording.
   */
  STATUS_NOT_LOCALIZED_TO_END = 2,
  /**
   * STATUS_NOT_READY_YET - The robot is still processing the map it created to where the robot is currently located.
   * You can't stop recording until that processing is finished.  You should not move
   * the robot, then try to stop recording again after 1-2 seconds.
   */
  STATUS_NOT_READY_YET = 3,
  UNRECOGNIZED = -1,
}

export function stopRecordingResponse_StatusFromJSON(
  object: any
): StopRecordingResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return StopRecordingResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return StopRecordingResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_NOT_LOCALIZED_TO_END":
      return StopRecordingResponse_Status.STATUS_NOT_LOCALIZED_TO_END;
    case 3:
    case "STATUS_NOT_READY_YET":
      return StopRecordingResponse_Status.STATUS_NOT_READY_YET;
    case -1:
    case "UNRECOGNIZED":
    default:
      return StopRecordingResponse_Status.UNRECOGNIZED;
  }
}

export function stopRecordingResponse_StatusToJSON(
  object: StopRecordingResponse_Status
): string {
  switch (object) {
    case StopRecordingResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case StopRecordingResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case StopRecordingResponse_Status.STATUS_NOT_LOCALIZED_TO_END:
      return "STATUS_NOT_LOCALIZED_TO_END";
    case StopRecordingResponse_Status.STATUS_NOT_READY_YET:
      return "STATUS_NOT_READY_YET";
    case StopRecordingResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * The CreateWaypoint request message specifies a name and environment the robot should
 * use to generate a waypoint in the graph at it's current location.
 */
export interface CreateWaypointRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** Name of the waypoint to create. Overrides any naming prefix. */
  waypointName: string;
  /**
   * This will be merged into a copy of the existing persistent recording
   * environment and used as the environment for the created waypoint
   * and the edge from the previous waypoint to the new one.
   * It will not affect the persistent environment.
   */
  recordingEnvironment: RecordingEnvironment | undefined;
  /**
   * The recording service is protected by a lease. The client must have a
   * lease to the recording service to modify its internal state.
   */
  lease: Lease | undefined;
  /**
   * If filled out, asks that the record service verify that the given fiducial IDs
   * are presently visible before creating a waypoint. This is useful for verifying
   * that the robot is where the user thinks it is in an area with known fiducials.
   */
  requireFiducials: number[];
  /** Additional world objects to insert into this waypoint. */
  worldObjects: WorldObject[];
}

/**
 * The CreateWaypoint response message contains the complete waypoint, and the associated
 * edge connecting this waypoint to the graph when the request succeeds.
 */
export interface CreateWaypointResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** The waypoint that was just created. */
  createdWaypoint: Waypoint | undefined;
  /** The edge connecting the waypoint just created with the last created waypoint in the map. */
  createdEdge: Edge | undefined;
  /** Return status for the request. */
  status: CreateWaypointResponse_Status;
  /** The results/status of the lease provided. */
  leaseUseResult: LeaseUseResult | undefined;
  /**
   * If the status is STATUS_MISSING_FIDUCIALS, the following fiducials
   * were not visible to the robot when trying to create the waypoint.
   */
  missingFiducials: number[];
  /**
   * If the status is STATUS_FIDUCIAL_POSE_NOT_OK, these are the fiducials that could not be
   * localized confidently.
   */
  badPoseFiducials: number[];
  /**
   * Large graphs can only be uploaded if the license permits them. Recording
   * will stop automatically when the graph gets too large. If CreateWaypointResponse
   * is requested after the graph gets too large, it will fail, and license
   * status will be filled out.
   */
  licenseStatus: LicenseInfo_Status;
}

export enum CreateWaypointResponse_Status {
  /** STATUS_UNKNOWN - Status is unknown/unset. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - The waypoint was successfully created. */
  STATUS_OK = 1,
  /** STATUS_NOT_RECORDING - Clients can only create waypoints when recording. */
  STATUS_NOT_RECORDING = 2,
  /** STATUS_COULD_NOT_CREATE_WAYPOINT - An internal server error prevented the creation of the waypoint. */
  STATUS_COULD_NOT_CREATE_WAYPOINT = 3,
  /** STATUS_MISSING_FIDUCIALS - Could not see the required fiducials. */
  STATUS_MISSING_FIDUCIALS = 4,
  /** STATUS_MAP_TOO_LARGE_LICENSE - The map was too big to create a waypoint based on the license. */
  STATUS_MAP_TOO_LARGE_LICENSE = 5,
  /** STATUS_REMOTE_CLOUD_FAILURE_NOT_IN_DIRECTORY - A required remote cloud did not exist in the service directory. */
  STATUS_REMOTE_CLOUD_FAILURE_NOT_IN_DIRECTORY = 6,
  /** STATUS_REMOTE_CLOUD_FAILURE_NO_DATA - A required remote cloud did not have data. */
  STATUS_REMOTE_CLOUD_FAILURE_NO_DATA = 7,
  /** STATUS_FIDUCIAL_POSE_NOT_OK - All fiducials are visible but their pose could not be determined accurately. */
  STATUS_FIDUCIAL_POSE_NOT_OK = 8,
  UNRECOGNIZED = -1,
}

export function createWaypointResponse_StatusFromJSON(
  object: any
): CreateWaypointResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return CreateWaypointResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return CreateWaypointResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_NOT_RECORDING":
      return CreateWaypointResponse_Status.STATUS_NOT_RECORDING;
    case 3:
    case "STATUS_COULD_NOT_CREATE_WAYPOINT":
      return CreateWaypointResponse_Status.STATUS_COULD_NOT_CREATE_WAYPOINT;
    case 4:
    case "STATUS_MISSING_FIDUCIALS":
      return CreateWaypointResponse_Status.STATUS_MISSING_FIDUCIALS;
    case 5:
    case "STATUS_MAP_TOO_LARGE_LICENSE":
      return CreateWaypointResponse_Status.STATUS_MAP_TOO_LARGE_LICENSE;
    case 6:
    case "STATUS_REMOTE_CLOUD_FAILURE_NOT_IN_DIRECTORY":
      return CreateWaypointResponse_Status.STATUS_REMOTE_CLOUD_FAILURE_NOT_IN_DIRECTORY;
    case 7:
    case "STATUS_REMOTE_CLOUD_FAILURE_NO_DATA":
      return CreateWaypointResponse_Status.STATUS_REMOTE_CLOUD_FAILURE_NO_DATA;
    case 8:
    case "STATUS_FIDUCIAL_POSE_NOT_OK":
      return CreateWaypointResponse_Status.STATUS_FIDUCIAL_POSE_NOT_OK;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CreateWaypointResponse_Status.UNRECOGNIZED;
  }
}

export function createWaypointResponse_StatusToJSON(
  object: CreateWaypointResponse_Status
): string {
  switch (object) {
    case CreateWaypointResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case CreateWaypointResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case CreateWaypointResponse_Status.STATUS_NOT_RECORDING:
      return "STATUS_NOT_RECORDING";
    case CreateWaypointResponse_Status.STATUS_COULD_NOT_CREATE_WAYPOINT:
      return "STATUS_COULD_NOT_CREATE_WAYPOINT";
    case CreateWaypointResponse_Status.STATUS_MISSING_FIDUCIALS:
      return "STATUS_MISSING_FIDUCIALS";
    case CreateWaypointResponse_Status.STATUS_MAP_TOO_LARGE_LICENSE:
      return "STATUS_MAP_TOO_LARGE_LICENSE";
    case CreateWaypointResponse_Status.STATUS_REMOTE_CLOUD_FAILURE_NOT_IN_DIRECTORY:
      return "STATUS_REMOTE_CLOUD_FAILURE_NOT_IN_DIRECTORY";
    case CreateWaypointResponse_Status.STATUS_REMOTE_CLOUD_FAILURE_NO_DATA:
      return "STATUS_REMOTE_CLOUD_FAILURE_NO_DATA";
    case CreateWaypointResponse_Status.STATUS_FIDUCIAL_POSE_NOT_OK:
      return "STATUS_FIDUCIAL_POSE_NOT_OK";
    case CreateWaypointResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * The CreateEdge request message specifies an edge to create between two existing waypoints.
 * The edge must not already exist in the map. This can be used to close a loop or to add any
 * additional edges.
 */
export interface CreateEdgeRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /**
   * Create an edge between two existing waypoints in the map with
   * the given parameters.
   */
  edge: Edge | undefined;
  /**
   * The recording service is protected by a lease. The client must have a
   * lease to the recording service to modify its internal state.
   */
  lease: Lease | undefined;
}

/**
 * The CreateEdge response message contains the status of this request and any useful error
 * information if the request fails.
 */
export interface CreateEdgeResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** Return status for the request. */
  status: CreateEdgeResponse_Status;
  /** If set, the existing edge that caused the STATUS_EXISTS error. */
  errorExistingEdge: Edge | undefined;
  /** The results/status of the lease provided. */
  leaseUseResult: LeaseUseResult | undefined;
}

export enum CreateEdgeResponse_Status {
  /** STATUS_UNKNOWN - Status is unknown/unset. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - The edge was successfully created. */
  STATUS_OK = 1,
  /** STATUS_EXISTS - Edge already exists with the given ID. */
  STATUS_EXISTS = 2,
  /** STATUS_NOT_RECORDING - Clients can only create edges when recording. */
  STATUS_NOT_RECORDING = 3,
  /** STATUS_UNKNOWN_WAYPOINT - One or more of the specified waypoints aren't in the map. */
  STATUS_UNKNOWN_WAYPOINT = 4,
  /** STATUS_MISSING_TRANSFORM - Specified edge did not include a transform. */
  STATUS_MISSING_TRANSFORM = 5,
  UNRECOGNIZED = -1,
}

export function createEdgeResponse_StatusFromJSON(
  object: any
): CreateEdgeResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return CreateEdgeResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return CreateEdgeResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_EXISTS":
      return CreateEdgeResponse_Status.STATUS_EXISTS;
    case 3:
    case "STATUS_NOT_RECORDING":
      return CreateEdgeResponse_Status.STATUS_NOT_RECORDING;
    case 4:
    case "STATUS_UNKNOWN_WAYPOINT":
      return CreateEdgeResponse_Status.STATUS_UNKNOWN_WAYPOINT;
    case 5:
    case "STATUS_MISSING_TRANSFORM":
      return CreateEdgeResponse_Status.STATUS_MISSING_TRANSFORM;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CreateEdgeResponse_Status.UNRECOGNIZED;
  }
}

export function createEdgeResponse_StatusToJSON(
  object: CreateEdgeResponse_Status
): string {
  switch (object) {
    case CreateEdgeResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case CreateEdgeResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case CreateEdgeResponse_Status.STATUS_EXISTS:
      return "STATUS_EXISTS";
    case CreateEdgeResponse_Status.STATUS_NOT_RECORDING:
      return "STATUS_NOT_RECORDING";
    case CreateEdgeResponse_Status.STATUS_UNKNOWN_WAYPOINT:
      return "STATUS_UNKNOWN_WAYPOINT";
    case CreateEdgeResponse_Status.STATUS_MISSING_TRANSFORM:
      return "STATUS_MISSING_TRANSFORM";
    case CreateEdgeResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** The GetRecordStatus request message asks for the current state of the recording service. */
export interface GetRecordStatusRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/**
 * The GetRecordStatus response message returns whether the service is currently recording and what the
 * persistent recording environment is at the time the request was recieved.
 */
export interface GetRecordStatusResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /**
   * If true, the record service is actively recording
   * a chain.
   */
  isRecording: boolean;
  /** The current persistent recording environment. */
  recordingEnvironment: RecordingEnvironment | undefined;
  mapState: GetRecordStatusResponse_MapState;
}

export enum GetRecordStatusResponse_MapState {
  MAP_STATE_UNKNOWN = 0,
  /** MAP_STATE_OK - Successfully started recording. */
  MAP_STATE_OK = 1,
  /** MAP_STATE_TOO_LARGE_FOR_LICENSE - Unable to continue recording because a larger map requires an upgraded license. */
  MAP_STATE_TOO_LARGE_FOR_LICENSE = 2,
  UNRECOGNIZED = -1,
}

export function getRecordStatusResponse_MapStateFromJSON(
  object: any
): GetRecordStatusResponse_MapState {
  switch (object) {
    case 0:
    case "MAP_STATE_UNKNOWN":
      return GetRecordStatusResponse_MapState.MAP_STATE_UNKNOWN;
    case 1:
    case "MAP_STATE_OK":
      return GetRecordStatusResponse_MapState.MAP_STATE_OK;
    case 2:
    case "MAP_STATE_TOO_LARGE_FOR_LICENSE":
      return GetRecordStatusResponse_MapState.MAP_STATE_TOO_LARGE_FOR_LICENSE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GetRecordStatusResponse_MapState.UNRECOGNIZED;
  }
}

export function getRecordStatusResponse_MapStateToJSON(
  object: GetRecordStatusResponse_MapState
): string {
  switch (object) {
    case GetRecordStatusResponse_MapState.MAP_STATE_UNKNOWN:
      return "MAP_STATE_UNKNOWN";
    case GetRecordStatusResponse_MapState.MAP_STATE_OK:
      return "MAP_STATE_OK";
    case GetRecordStatusResponse_MapState.MAP_STATE_TOO_LARGE_FOR_LICENSE:
      return "MAP_STATE_TOO_LARGE_FOR_LICENSE";
    case GetRecordStatusResponse_MapState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseRecordingEnvironment(): RecordingEnvironment {
  return {
    namePrefix: "",
    waypointEnvironment: undefined,
    edgeEnvironment: undefined,
  };
}

export const RecordingEnvironment = {
  encode(
    message: RecordingEnvironment,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.namePrefix !== "") {
      writer.uint32(10).string(message.namePrefix);
    }
    if (message.waypointEnvironment !== undefined) {
      Waypoint_Annotations.encode(
        message.waypointEnvironment,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.edgeEnvironment !== undefined) {
      Edge_Annotations.encode(
        message.edgeEnvironment,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RecordingEnvironment {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordingEnvironment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.namePrefix = reader.string();
          break;
        case 2:
          message.waypointEnvironment = Waypoint_Annotations.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.edgeEnvironment = Edge_Annotations.decode(
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

  fromJSON(object: any): RecordingEnvironment {
    return {
      namePrefix: isSet(object.namePrefix) ? String(object.namePrefix) : "",
      waypointEnvironment: isSet(object.waypointEnvironment)
        ? Waypoint_Annotations.fromJSON(object.waypointEnvironment)
        : undefined,
      edgeEnvironment: isSet(object.edgeEnvironment)
        ? Edge_Annotations.fromJSON(object.edgeEnvironment)
        : undefined,
    };
  },

  toJSON(message: RecordingEnvironment): unknown {
    const obj: any = {};
    message.namePrefix !== undefined && (obj.namePrefix = message.namePrefix);
    message.waypointEnvironment !== undefined &&
      (obj.waypointEnvironment = message.waypointEnvironment
        ? Waypoint_Annotations.toJSON(message.waypointEnvironment)
        : undefined);
    message.edgeEnvironment !== undefined &&
      (obj.edgeEnvironment = message.edgeEnvironment
        ? Edge_Annotations.toJSON(message.edgeEnvironment)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordingEnvironment>, I>>(
    object: I
  ): RecordingEnvironment {
    const message = createBaseRecordingEnvironment();
    message.namePrefix = object.namePrefix ?? "";
    message.waypointEnvironment =
      object.waypointEnvironment !== undefined &&
      object.waypointEnvironment !== null
        ? Waypoint_Annotations.fromPartial(object.waypointEnvironment)
        : undefined;
    message.edgeEnvironment =
      object.edgeEnvironment !== undefined && object.edgeEnvironment !== null
        ? Edge_Annotations.fromPartial(object.edgeEnvironment)
        : undefined;
    return message;
  },
};

function createBaseSetRecordingEnvironmentRequest(): SetRecordingEnvironmentRequest {
  return { header: undefined, environment: undefined, lease: undefined };
}

export const SetRecordingEnvironmentRequest = {
  encode(
    message: SetRecordingEnvironmentRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.environment !== undefined) {
      RecordingEnvironment.encode(
        message.environment,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.lease !== undefined) {
      Lease.encode(message.lease, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SetRecordingEnvironmentRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetRecordingEnvironmentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.environment = RecordingEnvironment.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.lease = Lease.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetRecordingEnvironmentRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      environment: isSet(object.environment)
        ? RecordingEnvironment.fromJSON(object.environment)
        : undefined,
      lease: isSet(object.lease) ? Lease.fromJSON(object.lease) : undefined,
    };
  },

  toJSON(message: SetRecordingEnvironmentRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.environment !== undefined &&
      (obj.environment = message.environment
        ? RecordingEnvironment.toJSON(message.environment)
        : undefined);
    message.lease !== undefined &&
      (obj.lease = message.lease ? Lease.toJSON(message.lease) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetRecordingEnvironmentRequest>, I>>(
    object: I
  ): SetRecordingEnvironmentRequest {
    const message = createBaseSetRecordingEnvironmentRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.environment =
      object.environment !== undefined && object.environment !== null
        ? RecordingEnvironment.fromPartial(object.environment)
        : undefined;
    message.lease =
      object.lease !== undefined && object.lease !== null
        ? Lease.fromPartial(object.lease)
        : undefined;
    return message;
  },
};

function createBaseSetRecordingEnvironmentResponse(): SetRecordingEnvironmentResponse {
  return { header: undefined, leaseUseResult: undefined };
}

export const SetRecordingEnvironmentResponse = {
  encode(
    message: SetRecordingEnvironmentResponse,
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SetRecordingEnvironmentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetRecordingEnvironmentResponse();
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

  fromJSON(object: any): SetRecordingEnvironmentResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      leaseUseResult: isSet(object.leaseUseResult)
        ? LeaseUseResult.fromJSON(object.leaseUseResult)
        : undefined,
    };
  },

  toJSON(message: SetRecordingEnvironmentResponse): unknown {
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

  fromPartial<I extends Exact<DeepPartial<SetRecordingEnvironmentResponse>, I>>(
    object: I
  ): SetRecordingEnvironmentResponse {
    const message = createBaseSetRecordingEnvironmentResponse();
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

function createBaseStartRecordingRequest(): StartRecordingRequest {
  return {
    header: undefined,
    lease: undefined,
    recordingEnvironment: undefined,
    requireFiducials: [],
  };
}

export const StartRecordingRequest = {
  encode(
    message: StartRecordingRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.lease !== undefined) {
      Lease.encode(message.lease, writer.uint32(18).fork()).ldelim();
    }
    if (message.recordingEnvironment !== undefined) {
      RecordingEnvironment.encode(
        message.recordingEnvironment,
        writer.uint32(26).fork()
      ).ldelim();
    }
    writer.uint32(34).fork();
    for (const v of message.requireFiducials) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StartRecordingRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStartRecordingRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.lease = Lease.decode(reader, reader.uint32());
          break;
        case 3:
          message.recordingEnvironment = RecordingEnvironment.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.requireFiducials.push(reader.int32());
            }
          } else {
            message.requireFiducials.push(reader.int32());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StartRecordingRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      lease: isSet(object.lease) ? Lease.fromJSON(object.lease) : undefined,
      recordingEnvironment: isSet(object.recordingEnvironment)
        ? RecordingEnvironment.fromJSON(object.recordingEnvironment)
        : undefined,
      requireFiducials: Array.isArray(object?.requireFiducials)
        ? object.requireFiducials.map((e: any) => Number(e))
        : [],
    };
  },

  toJSON(message: StartRecordingRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.lease !== undefined &&
      (obj.lease = message.lease ? Lease.toJSON(message.lease) : undefined);
    message.recordingEnvironment !== undefined &&
      (obj.recordingEnvironment = message.recordingEnvironment
        ? RecordingEnvironment.toJSON(message.recordingEnvironment)
        : undefined);
    if (message.requireFiducials) {
      obj.requireFiducials = message.requireFiducials.map((e) => Math.round(e));
    } else {
      obj.requireFiducials = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StartRecordingRequest>, I>>(
    object: I
  ): StartRecordingRequest {
    const message = createBaseStartRecordingRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.lease =
      object.lease !== undefined && object.lease !== null
        ? Lease.fromPartial(object.lease)
        : undefined;
    message.recordingEnvironment =
      object.recordingEnvironment !== undefined &&
      object.recordingEnvironment !== null
        ? RecordingEnvironment.fromPartial(object.recordingEnvironment)
        : undefined;
    message.requireFiducials = object.requireFiducials?.map((e) => e) || [];
    return message;
  },
};

function createBaseStartRecordingResponse(): StartRecordingResponse {
  return {
    header: undefined,
    createdWaypoint: undefined,
    leaseUseResult: undefined,
    status: 0,
    missingFiducials: [],
    badPoseFiducials: [],
    licenseStatus: 0,
  };
}

export const StartRecordingResponse = {
  encode(
    message: StartRecordingResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.createdWaypoint !== undefined) {
      Waypoint.encode(
        message.createdWaypoint,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.leaseUseResult !== undefined) {
      LeaseUseResult.encode(
        message.leaseUseResult,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(32).int32(message.status);
    }
    writer.uint32(42).fork();
    for (const v of message.missingFiducials) {
      writer.int32(v);
    }
    writer.ldelim();
    writer.uint32(58).fork();
    for (const v of message.badPoseFiducials) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.licenseStatus !== 0) {
      writer.uint32(48).int32(message.licenseStatus);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StartRecordingResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStartRecordingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.createdWaypoint = Waypoint.decode(reader, reader.uint32());
          break;
        case 3:
          message.leaseUseResult = LeaseUseResult.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.status = reader.int32() as any;
          break;
        case 5:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.missingFiducials.push(reader.int32());
            }
          } else {
            message.missingFiducials.push(reader.int32());
          }
          break;
        case 7:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.badPoseFiducials.push(reader.int32());
            }
          } else {
            message.badPoseFiducials.push(reader.int32());
          }
          break;
        case 6:
          message.licenseStatus = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StartRecordingResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      createdWaypoint: isSet(object.createdWaypoint)
        ? Waypoint.fromJSON(object.createdWaypoint)
        : undefined,
      leaseUseResult: isSet(object.leaseUseResult)
        ? LeaseUseResult.fromJSON(object.leaseUseResult)
        : undefined,
      status: isSet(object.status)
        ? startRecordingResponse_StatusFromJSON(object.status)
        : 0,
      missingFiducials: Array.isArray(object?.missingFiducials)
        ? object.missingFiducials.map((e: any) => Number(e))
        : [],
      badPoseFiducials: Array.isArray(object?.badPoseFiducials)
        ? object.badPoseFiducials.map((e: any) => Number(e))
        : [],
      licenseStatus: isSet(object.licenseStatus)
        ? licenseInfo_StatusFromJSON(object.licenseStatus)
        : 0,
    };
  },

  toJSON(message: StartRecordingResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.createdWaypoint !== undefined &&
      (obj.createdWaypoint = message.createdWaypoint
        ? Waypoint.toJSON(message.createdWaypoint)
        : undefined);
    message.leaseUseResult !== undefined &&
      (obj.leaseUseResult = message.leaseUseResult
        ? LeaseUseResult.toJSON(message.leaseUseResult)
        : undefined);
    message.status !== undefined &&
      (obj.status = startRecordingResponse_StatusToJSON(message.status));
    if (message.missingFiducials) {
      obj.missingFiducials = message.missingFiducials.map((e) => Math.round(e));
    } else {
      obj.missingFiducials = [];
    }
    if (message.badPoseFiducials) {
      obj.badPoseFiducials = message.badPoseFiducials.map((e) => Math.round(e));
    } else {
      obj.badPoseFiducials = [];
    }
    message.licenseStatus !== undefined &&
      (obj.licenseStatus = licenseInfo_StatusToJSON(message.licenseStatus));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StartRecordingResponse>, I>>(
    object: I
  ): StartRecordingResponse {
    const message = createBaseStartRecordingResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.createdWaypoint =
      object.createdWaypoint !== undefined && object.createdWaypoint !== null
        ? Waypoint.fromPartial(object.createdWaypoint)
        : undefined;
    message.leaseUseResult =
      object.leaseUseResult !== undefined && object.leaseUseResult !== null
        ? LeaseUseResult.fromPartial(object.leaseUseResult)
        : undefined;
    message.status = object.status ?? 0;
    message.missingFiducials = object.missingFiducials?.map((e) => e) || [];
    message.badPoseFiducials = object.badPoseFiducials?.map((e) => e) || [];
    message.licenseStatus = object.licenseStatus ?? 0;
    return message;
  },
};

function createBaseStopRecordingRequest(): StopRecordingRequest {
  return { header: undefined, lease: undefined };
}

export const StopRecordingRequest = {
  encode(
    message: StopRecordingRequest,
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StopRecordingRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStopRecordingRequest();
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

  fromJSON(object: any): StopRecordingRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      lease: isSet(object.lease) ? Lease.fromJSON(object.lease) : undefined,
    };
  },

  toJSON(message: StopRecordingRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.lease !== undefined &&
      (obj.lease = message.lease ? Lease.toJSON(message.lease) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StopRecordingRequest>, I>>(
    object: I
  ): StopRecordingRequest {
    const message = createBaseStopRecordingRequest();
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

function createBaseStopRecordingResponse(): StopRecordingResponse {
  return {
    header: undefined,
    status: 0,
    errorWaypointLocalizedId: "",
    leaseUseResult: undefined,
  };
}

export const StopRecordingResponse = {
  encode(
    message: StopRecordingResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.errorWaypointLocalizedId !== "") {
      writer.uint32(26).string(message.errorWaypointLocalizedId);
    }
    if (message.leaseUseResult !== undefined) {
      LeaseUseResult.encode(
        message.leaseUseResult,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StopRecordingResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStopRecordingResponse();
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
          message.errorWaypointLocalizedId = reader.string();
          break;
        case 4:
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

  fromJSON(object: any): StopRecordingResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? stopRecordingResponse_StatusFromJSON(object.status)
        : 0,
      errorWaypointLocalizedId: isSet(object.errorWaypointLocalizedId)
        ? String(object.errorWaypointLocalizedId)
        : "",
      leaseUseResult: isSet(object.leaseUseResult)
        ? LeaseUseResult.fromJSON(object.leaseUseResult)
        : undefined,
    };
  },

  toJSON(message: StopRecordingResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = stopRecordingResponse_StatusToJSON(message.status));
    message.errorWaypointLocalizedId !== undefined &&
      (obj.errorWaypointLocalizedId = message.errorWaypointLocalizedId);
    message.leaseUseResult !== undefined &&
      (obj.leaseUseResult = message.leaseUseResult
        ? LeaseUseResult.toJSON(message.leaseUseResult)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StopRecordingResponse>, I>>(
    object: I
  ): StopRecordingResponse {
    const message = createBaseStopRecordingResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    message.errorWaypointLocalizedId = object.errorWaypointLocalizedId ?? "";
    message.leaseUseResult =
      object.leaseUseResult !== undefined && object.leaseUseResult !== null
        ? LeaseUseResult.fromPartial(object.leaseUseResult)
        : undefined;
    return message;
  },
};

function createBaseCreateWaypointRequest(): CreateWaypointRequest {
  return {
    header: undefined,
    waypointName: "",
    recordingEnvironment: undefined,
    lease: undefined,
    requireFiducials: [],
    worldObjects: [],
  };
}

export const CreateWaypointRequest = {
  encode(
    message: CreateWaypointRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.waypointName !== "") {
      writer.uint32(18).string(message.waypointName);
    }
    if (message.recordingEnvironment !== undefined) {
      RecordingEnvironment.encode(
        message.recordingEnvironment,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.lease !== undefined) {
      Lease.encode(message.lease, writer.uint32(34).fork()).ldelim();
    }
    writer.uint32(42).fork();
    for (const v of message.requireFiducials) {
      writer.int32(v);
    }
    writer.ldelim();
    for (const v of message.worldObjects) {
      WorldObject.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CreateWaypointRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateWaypointRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.waypointName = reader.string();
          break;
        case 3:
          message.recordingEnvironment = RecordingEnvironment.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.lease = Lease.decode(reader, reader.uint32());
          break;
        case 5:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.requireFiducials.push(reader.int32());
            }
          } else {
            message.requireFiducials.push(reader.int32());
          }
          break;
        case 6:
          message.worldObjects.push(
            WorldObject.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateWaypointRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      waypointName: isSet(object.waypointName)
        ? String(object.waypointName)
        : "",
      recordingEnvironment: isSet(object.recordingEnvironment)
        ? RecordingEnvironment.fromJSON(object.recordingEnvironment)
        : undefined,
      lease: isSet(object.lease) ? Lease.fromJSON(object.lease) : undefined,
      requireFiducials: Array.isArray(object?.requireFiducials)
        ? object.requireFiducials.map((e: any) => Number(e))
        : [],
      worldObjects: Array.isArray(object?.worldObjects)
        ? object.worldObjects.map((e: any) => WorldObject.fromJSON(e))
        : [],
    };
  },

  toJSON(message: CreateWaypointRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.waypointName !== undefined &&
      (obj.waypointName = message.waypointName);
    message.recordingEnvironment !== undefined &&
      (obj.recordingEnvironment = message.recordingEnvironment
        ? RecordingEnvironment.toJSON(message.recordingEnvironment)
        : undefined);
    message.lease !== undefined &&
      (obj.lease = message.lease ? Lease.toJSON(message.lease) : undefined);
    if (message.requireFiducials) {
      obj.requireFiducials = message.requireFiducials.map((e) => Math.round(e));
    } else {
      obj.requireFiducials = [];
    }
    if (message.worldObjects) {
      obj.worldObjects = message.worldObjects.map((e) =>
        e ? WorldObject.toJSON(e) : undefined
      );
    } else {
      obj.worldObjects = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateWaypointRequest>, I>>(
    object: I
  ): CreateWaypointRequest {
    const message = createBaseCreateWaypointRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.waypointName = object.waypointName ?? "";
    message.recordingEnvironment =
      object.recordingEnvironment !== undefined &&
      object.recordingEnvironment !== null
        ? RecordingEnvironment.fromPartial(object.recordingEnvironment)
        : undefined;
    message.lease =
      object.lease !== undefined && object.lease !== null
        ? Lease.fromPartial(object.lease)
        : undefined;
    message.requireFiducials = object.requireFiducials?.map((e) => e) || [];
    message.worldObjects =
      object.worldObjects?.map((e) => WorldObject.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCreateWaypointResponse(): CreateWaypointResponse {
  return {
    header: undefined,
    createdWaypoint: undefined,
    createdEdge: undefined,
    status: 0,
    leaseUseResult: undefined,
    missingFiducials: [],
    badPoseFiducials: [],
    licenseStatus: 0,
  };
}

export const CreateWaypointResponse = {
  encode(
    message: CreateWaypointResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.createdWaypoint !== undefined) {
      Waypoint.encode(
        message.createdWaypoint,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.createdEdge !== undefined) {
      Edge.encode(message.createdEdge, writer.uint32(26).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(40).int32(message.status);
    }
    if (message.leaseUseResult !== undefined) {
      LeaseUseResult.encode(
        message.leaseUseResult,
        writer.uint32(34).fork()
      ).ldelim();
    }
    writer.uint32(50).fork();
    for (const v of message.missingFiducials) {
      writer.int32(v);
    }
    writer.ldelim();
    writer.uint32(66).fork();
    for (const v of message.badPoseFiducials) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.licenseStatus !== 0) {
      writer.uint32(56).int32(message.licenseStatus);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CreateWaypointResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateWaypointResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.createdWaypoint = Waypoint.decode(reader, reader.uint32());
          break;
        case 3:
          message.createdEdge = Edge.decode(reader, reader.uint32());
          break;
        case 5:
          message.status = reader.int32() as any;
          break;
        case 4:
          message.leaseUseResult = LeaseUseResult.decode(
            reader,
            reader.uint32()
          );
          break;
        case 6:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.missingFiducials.push(reader.int32());
            }
          } else {
            message.missingFiducials.push(reader.int32());
          }
          break;
        case 8:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.badPoseFiducials.push(reader.int32());
            }
          } else {
            message.badPoseFiducials.push(reader.int32());
          }
          break;
        case 7:
          message.licenseStatus = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateWaypointResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      createdWaypoint: isSet(object.createdWaypoint)
        ? Waypoint.fromJSON(object.createdWaypoint)
        : undefined,
      createdEdge: isSet(object.createdEdge)
        ? Edge.fromJSON(object.createdEdge)
        : undefined,
      status: isSet(object.status)
        ? createWaypointResponse_StatusFromJSON(object.status)
        : 0,
      leaseUseResult: isSet(object.leaseUseResult)
        ? LeaseUseResult.fromJSON(object.leaseUseResult)
        : undefined,
      missingFiducials: Array.isArray(object?.missingFiducials)
        ? object.missingFiducials.map((e: any) => Number(e))
        : [],
      badPoseFiducials: Array.isArray(object?.badPoseFiducials)
        ? object.badPoseFiducials.map((e: any) => Number(e))
        : [],
      licenseStatus: isSet(object.licenseStatus)
        ? licenseInfo_StatusFromJSON(object.licenseStatus)
        : 0,
    };
  },

  toJSON(message: CreateWaypointResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.createdWaypoint !== undefined &&
      (obj.createdWaypoint = message.createdWaypoint
        ? Waypoint.toJSON(message.createdWaypoint)
        : undefined);
    message.createdEdge !== undefined &&
      (obj.createdEdge = message.createdEdge
        ? Edge.toJSON(message.createdEdge)
        : undefined);
    message.status !== undefined &&
      (obj.status = createWaypointResponse_StatusToJSON(message.status));
    message.leaseUseResult !== undefined &&
      (obj.leaseUseResult = message.leaseUseResult
        ? LeaseUseResult.toJSON(message.leaseUseResult)
        : undefined);
    if (message.missingFiducials) {
      obj.missingFiducials = message.missingFiducials.map((e) => Math.round(e));
    } else {
      obj.missingFiducials = [];
    }
    if (message.badPoseFiducials) {
      obj.badPoseFiducials = message.badPoseFiducials.map((e) => Math.round(e));
    } else {
      obj.badPoseFiducials = [];
    }
    message.licenseStatus !== undefined &&
      (obj.licenseStatus = licenseInfo_StatusToJSON(message.licenseStatus));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateWaypointResponse>, I>>(
    object: I
  ): CreateWaypointResponse {
    const message = createBaseCreateWaypointResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.createdWaypoint =
      object.createdWaypoint !== undefined && object.createdWaypoint !== null
        ? Waypoint.fromPartial(object.createdWaypoint)
        : undefined;
    message.createdEdge =
      object.createdEdge !== undefined && object.createdEdge !== null
        ? Edge.fromPartial(object.createdEdge)
        : undefined;
    message.status = object.status ?? 0;
    message.leaseUseResult =
      object.leaseUseResult !== undefined && object.leaseUseResult !== null
        ? LeaseUseResult.fromPartial(object.leaseUseResult)
        : undefined;
    message.missingFiducials = object.missingFiducials?.map((e) => e) || [];
    message.badPoseFiducials = object.badPoseFiducials?.map((e) => e) || [];
    message.licenseStatus = object.licenseStatus ?? 0;
    return message;
  },
};

function createBaseCreateEdgeRequest(): CreateEdgeRequest {
  return { header: undefined, edge: undefined, lease: undefined };
}

export const CreateEdgeRequest = {
  encode(
    message: CreateEdgeRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.edge !== undefined) {
      Edge.encode(message.edge, writer.uint32(18).fork()).ldelim();
    }
    if (message.lease !== undefined) {
      Lease.encode(message.lease, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateEdgeRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateEdgeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.edge = Edge.decode(reader, reader.uint32());
          break;
        case 3:
          message.lease = Lease.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateEdgeRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      edge: isSet(object.edge) ? Edge.fromJSON(object.edge) : undefined,
      lease: isSet(object.lease) ? Lease.fromJSON(object.lease) : undefined,
    };
  },

  toJSON(message: CreateEdgeRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.edge !== undefined &&
      (obj.edge = message.edge ? Edge.toJSON(message.edge) : undefined);
    message.lease !== undefined &&
      (obj.lease = message.lease ? Lease.toJSON(message.lease) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateEdgeRequest>, I>>(
    object: I
  ): CreateEdgeRequest {
    const message = createBaseCreateEdgeRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.edge =
      object.edge !== undefined && object.edge !== null
        ? Edge.fromPartial(object.edge)
        : undefined;
    message.lease =
      object.lease !== undefined && object.lease !== null
        ? Lease.fromPartial(object.lease)
        : undefined;
    return message;
  },
};

function createBaseCreateEdgeResponse(): CreateEdgeResponse {
  return {
    header: undefined,
    status: 0,
    errorExistingEdge: undefined,
    leaseUseResult: undefined,
  };
}

export const CreateEdgeResponse = {
  encode(
    message: CreateEdgeResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.errorExistingEdge !== undefined) {
      Edge.encode(message.errorExistingEdge, writer.uint32(26).fork()).ldelim();
    }
    if (message.leaseUseResult !== undefined) {
      LeaseUseResult.encode(
        message.leaseUseResult,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateEdgeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateEdgeResponse();
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
          message.errorExistingEdge = Edge.decode(reader, reader.uint32());
          break;
        case 4:
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

  fromJSON(object: any): CreateEdgeResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? createEdgeResponse_StatusFromJSON(object.status)
        : 0,
      errorExistingEdge: isSet(object.errorExistingEdge)
        ? Edge.fromJSON(object.errorExistingEdge)
        : undefined,
      leaseUseResult: isSet(object.leaseUseResult)
        ? LeaseUseResult.fromJSON(object.leaseUseResult)
        : undefined,
    };
  },

  toJSON(message: CreateEdgeResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = createEdgeResponse_StatusToJSON(message.status));
    message.errorExistingEdge !== undefined &&
      (obj.errorExistingEdge = message.errorExistingEdge
        ? Edge.toJSON(message.errorExistingEdge)
        : undefined);
    message.leaseUseResult !== undefined &&
      (obj.leaseUseResult = message.leaseUseResult
        ? LeaseUseResult.toJSON(message.leaseUseResult)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateEdgeResponse>, I>>(
    object: I
  ): CreateEdgeResponse {
    const message = createBaseCreateEdgeResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    message.errorExistingEdge =
      object.errorExistingEdge !== undefined &&
      object.errorExistingEdge !== null
        ? Edge.fromPartial(object.errorExistingEdge)
        : undefined;
    message.leaseUseResult =
      object.leaseUseResult !== undefined && object.leaseUseResult !== null
        ? LeaseUseResult.fromPartial(object.leaseUseResult)
        : undefined;
    return message;
  },
};

function createBaseGetRecordStatusRequest(): GetRecordStatusRequest {
  return { header: undefined };
}

export const GetRecordStatusRequest = {
  encode(
    message: GetRecordStatusRequest,
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
  ): GetRecordStatusRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetRecordStatusRequest();
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

  fromJSON(object: any): GetRecordStatusRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: GetRecordStatusRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetRecordStatusRequest>, I>>(
    object: I
  ): GetRecordStatusRequest {
    const message = createBaseGetRecordStatusRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseGetRecordStatusResponse(): GetRecordStatusResponse {
  return {
    header: undefined,
    isRecording: false,
    recordingEnvironment: undefined,
    mapState: 0,
  };
}

export const GetRecordStatusResponse = {
  encode(
    message: GetRecordStatusResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.isRecording === true) {
      writer.uint32(16).bool(message.isRecording);
    }
    if (message.recordingEnvironment !== undefined) {
      RecordingEnvironment.encode(
        message.recordingEnvironment,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.mapState !== 0) {
      writer.uint32(32).int32(message.mapState);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetRecordStatusResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetRecordStatusResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.isRecording = reader.bool();
          break;
        case 3:
          message.recordingEnvironment = RecordingEnvironment.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.mapState = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetRecordStatusResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      isRecording: isSet(object.isRecording)
        ? Boolean(object.isRecording)
        : false,
      recordingEnvironment: isSet(object.recordingEnvironment)
        ? RecordingEnvironment.fromJSON(object.recordingEnvironment)
        : undefined,
      mapState: isSet(object.mapState)
        ? getRecordStatusResponse_MapStateFromJSON(object.mapState)
        : 0,
    };
  },

  toJSON(message: GetRecordStatusResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.isRecording !== undefined &&
      (obj.isRecording = message.isRecording);
    message.recordingEnvironment !== undefined &&
      (obj.recordingEnvironment = message.recordingEnvironment
        ? RecordingEnvironment.toJSON(message.recordingEnvironment)
        : undefined);
    message.mapState !== undefined &&
      (obj.mapState = getRecordStatusResponse_MapStateToJSON(message.mapState));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetRecordStatusResponse>, I>>(
    object: I
  ): GetRecordStatusResponse {
    const message = createBaseGetRecordStatusResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.isRecording = object.isRecording ?? false;
    message.recordingEnvironment =
      object.recordingEnvironment !== undefined &&
      object.recordingEnvironment !== null
        ? RecordingEnvironment.fromPartial(object.recordingEnvironment)
        : undefined;
    message.mapState = object.mapState ?? 0;
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
