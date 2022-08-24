/* eslint-disable */
import { RequestHeader, ResponseHeader } from "../header";
import { Graph, Anchor, AnchoredWorldObject } from "./map";
import { SE3Covariance, Vec3 } from "../geometry";
import _m0 from "protobufjs/minimal";
import {
  Int32Value,
  DoubleValue,
  BoolValue,
} from "../../../google/protobuf/wrappers";

export const protobufPackage = "bosdyn.api.graph_nav";

/**
 * Processes a GraphNav map by creating additional edges. After processing,
 * a new subgraph is created containing additional edges to add to the map.
 * Edges are created between waypoints that are near each other. These waypoint pairs
 * are called "loop closures", and are found by different means.
 * In general, if parameters are not provided, reasonable defaults will be used.
 * Note that this can be used to merge disconnected subgraphs from multiple recording
 * sessions so long as they share fiducial observations.
 */
export interface ProcessTopologyRequest {
  /** Standard message header. */
  header: RequestHeader | undefined;
  /** Parameters. If not filled out, reasonable defaults will be used. */
  params: ProcessTopologyRequest_Params | undefined;
  /**
   * If true, any processing should directly modify the map on the server.
   * Otherwise, the client is expected to upload the processing results (newly created edges)
   * back to the server. The processing service shares memory with a map container service
   * (e.g the GraphNav service).
   */
  modifyMapOnServer: boolean;
}

/**
 * Parameters for how to refine loop closure edges using iterative
 * closest point matching.
 */
export interface ProcessTopologyRequest_ICPParams {
  /** The maximum number of iterations to run. Set to zero to skip ICP processing. */
  icpIters: number | undefined;
  /**
   * The maximum distance between points in the point cloud we are willing to
   * accept for matches.
   */
  maxPointMatchDistance: number | undefined;
}

/**
 * Parameters for how to close loops using odometry. This infers which waypoints
 * should be connected to one another based on the odometry measurements in the map.
 */
export interface ProcessTopologyRequest_OdometryLoopClosureParams {
  /**
   * The maximum distance between waypoints found by walking a path from one
   * waypoint to the other using only the existing edges in the map. Beyond
   * this distance, we are unwilling to trust odometry.
   */
  maxLoopClosurePathLength: number | undefined;
  /**
   * The minimum distance between waypoints found by walking a path from
   * one waypoint to the other using only the existing edges in the map.
   * Set this higher to avoid creating small shortcuts along the existing path.
   * Note that this is a 2d path length.
   */
  minLoopClosurePathLength: number | undefined;
  /**
   * The maximum apparent height change of the created edge that we are
   * willing to accept between waypoints. This avoids closing loops up ramps,
   * stairs, etc. or closing loops where there is significant odometry drift.
   */
  maxLoopClosureHeightChange: number | undefined;
  /**
   * Once a loop closure candidate is found, the system creates an edge between the
   * candidate waypoints. Only create the edge if it is shorter than this value.
   * Note that this is a 3d edge length.
   */
  maxLoopClosureEdgeLength: number | undefined;
  /**
   * Use prior loop closures to infer new odometry based loop closures. This is
   * useful when other sources of loop closures (like fiducials) are being used.
   * The existence of those loop closures allows the system to infer other nearby
   * loop closures using odometry. Alternatively, the user may call the ProcessTopology
   * RPC multiple times to achieve the same effect.
   */
  numExtraLoopClosureIterations: number | undefined;
}

/**
 * Parameters for how to close a loop using fiducials (AprilTags). This infers
 * which waypoints should be connected to one another based on shared observations
 * of AprilTags.
 * Note that multiple disconnected subgraphs (for example from multiple recording sessions)
 * can be merged this way.
 */
export interface ProcessTopologyRequest_FiducialLoopClosureParams {
  /**
   * The minimum distance between waypoints found by walking a path from
   * one waypoint to the other using only the existing edges in the map.
   * Set this higher to avoid creating small shortcuts along the existing path.
   * Note that this is a 2d path length.
   */
  minLoopClosurePathLength: number | undefined;
  /**
   * Once a loop closure candidate is found, the system creates an edge between the
   * candidate waypoints. Only create the edge if it is shorter than this value.
   * Note that this is a 3d edge length.
   */
  maxLoopClosureEdgeLength: number | undefined;
  /**
   * Maximum distance to accept between a waypoint and a fiducial detection to
   * use that fiducial detection for generating loop closure candidates.
   */
  maxFiducialDistance: number | undefined;
  /**
   * The maximum apparent height change of the created edge that we are
   * willing to accept between waypoints. This avoids closing loops up ramps,
   * stairs, etc. or closing loops where there is significant odometry drift.
   */
  maxLoopClosureHeightChange: number | undefined;
}

/**
 * Parameters for how to check for collisions when creating loop closures. The system
 * will avoid creating edges in the map that the robot cannot actually traverse due to
 * the presence of nearby obstacles.
 */
export interface ProcessTopologyRequest_CollisionCheckingParams {
  /** By default, this is true. */
  checkEdgesForCollision: boolean | undefined;
  /**
   * Assume that the robot is a sphere with this radius. Only accept a
   * loop closure if this spherical robot can travel in a straight line
   * from one waypoint to the other without hitting obstacles.
   */
  collisionCheckRobotRadius: number | undefined;
  /**
   * Consider significant height variations along the edge (like stairs or ramps)
   * to be obstacles. The edge will not be created if there is a height change along
   * it of more than this value according to the nearby sensor data.
   */
  collisionCheckHeightVariation: number | undefined;
}

/**
 * Parameters which control topology processing. In general, anything which isn't filled out
 * will be replaced by reasonable defaults.
 */
export interface ProcessTopologyRequest_Params {
  /** True by default -- generate loop closure candidates using odometry. */
  doOdometryLoopClosure: boolean | undefined;
  /** Parameters for generating loop closure candidates using odometry. */
  odometryLoopClosureParams:
    | ProcessTopologyRequest_OdometryLoopClosureParams
    | undefined;
  /**
   * Parameters for refining loop closure candidates using iterative closest point
   * cloud matching.
   */
  icpParams: ProcessTopologyRequest_ICPParams | undefined;
  /** True by default -- generate loop closure candidates using fiducials. */
  doFiducialLoopClosure: boolean | undefined;
  /** Parameters for generating loop closure candidates using fiducials. */
  fiducialLoopClosureParams:
    | ProcessTopologyRequest_FiducialLoopClosureParams
    | undefined;
  /**
   * Parameters which control rejecting loop closure candidates which
   * collide with obstacles.
   */
  collisionCheckParams:
    | ProcessTopologyRequest_CollisionCheckingParams
    | undefined;
  /**
   * Causes the processing to time out after this many seconds. If not set, a default of 45 seconds
   * will be used. If this timeout occurs before the overall RPC timeout, a partial result will be
   * returned with ProcessTopologyResponse.timed_out set to true. Processing can be continued by
   * calling ProcessTopology again.
   */
  timeoutSeconds: number;
}

/**
 * Result of the topology processing RPC. If successful, contains a subgraph of new
 * waypoints or edges created by this process.
 */
export interface ProcessTopologyResponse {
  /** Standard message header. */
  header: ResponseHeader | undefined;
  /** Result of the processing. */
  status: ProcessTopologyResponse_Status;
  /**
   * This graph contains the new edge(s) created by map processing. Note that these edges will be
   * annotated with their creation method. Note that several subgraphs may be returned via
   * streaming as the map is processed.
   */
  newSubgraph: Graph | undefined;
  /**
   * If modify_map_on_server was set to true in the request, then the map currently on the server
   * was modified using map processing. If this is set to false, then either an error occurred during
   * processing, or modify_map_on_server was set to false in the request.
   * When map_on_server_was_modified is set to false, the client is expected to upload the results
   * back to the server to commit the changes.
   */
  mapOnServerWasModified: boolean;
  /**
   * When there are missing waypoint snapshots, these are the IDs of the missing snapshots.
   * Upload them to continue.
   */
  missingSnapshotIds: string[];
  /**
   * When there are missing waypoints, these are the IDs of the missing waypoints. Upload them
   * to continue.
   */
  missingWaypointIds: string[];
  /**
   * If true, the processing timed out. Note that this is not considered an error. Run topology processing again
   * to continue adding edges.
   */
  timedOut: boolean;
}

export enum ProcessTopologyResponse_Status {
  /** STATUS_UNKNOWN - Programming error. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Success. */
  STATUS_OK = 1,
  /** STATUS_MISSING_WAYPOINT_SNAPSHOTS - Not all of the waypoint snapshots exist on the server. Upload them to continue. */
  STATUS_MISSING_WAYPOINT_SNAPSHOTS = 2,
  /** STATUS_INVALID_GRAPH - The graph is invalid topologically, for example containing missing waypoints referenced by edges. */
  STATUS_INVALID_GRAPH = 3,
  /** STATUS_MAP_MODIFIED_DURING_PROCESSING - Tried to write the anchoring after processing, but another client may have modified the map. Try again */
  STATUS_MAP_MODIFIED_DURING_PROCESSING = 4,
  UNRECOGNIZED = -1,
}

export function processTopologyResponse_StatusFromJSON(
  object: any
): ProcessTopologyResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return ProcessTopologyResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return ProcessTopologyResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_MISSING_WAYPOINT_SNAPSHOTS":
      return ProcessTopologyResponse_Status.STATUS_MISSING_WAYPOINT_SNAPSHOTS;
    case 3:
    case "STATUS_INVALID_GRAPH":
      return ProcessTopologyResponse_Status.STATUS_INVALID_GRAPH;
    case 4:
    case "STATUS_MAP_MODIFIED_DURING_PROCESSING":
      return ProcessTopologyResponse_Status.STATUS_MAP_MODIFIED_DURING_PROCESSING;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ProcessTopologyResponse_Status.UNRECOGNIZED;
  }
}

export function processTopologyResponse_StatusToJSON(
  object: ProcessTopologyResponse_Status
): string {
  switch (object) {
    case ProcessTopologyResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case ProcessTopologyResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case ProcessTopologyResponse_Status.STATUS_MISSING_WAYPOINT_SNAPSHOTS:
      return "STATUS_MISSING_WAYPOINT_SNAPSHOTS";
    case ProcessTopologyResponse_Status.STATUS_INVALID_GRAPH:
      return "STATUS_INVALID_GRAPH";
    case ProcessTopologyResponse_Status.STATUS_MAP_MODIFIED_DURING_PROCESSING:
      return "STATUS_MAP_MODIFIED_DURING_PROCESSING";
    case ProcessTopologyResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Represents an interval in x, y, z and yaw around some center. Some value x
 * will be within the bounds if  center - x_bounds <= x >= center + x_bounds.
 * If the values are left at zero, the bounds are considered to be unconstrained.
 * The center of the bounds is left implicit, and should be whatever this message
 * is packaged with.
 */
export interface PoseBounds {
  /** Bounds on the x position in meters. */
  xBounds: number;
  /** Bounds on the y position in meters. */
  yBounds: number;
  /** Bounds on the z position in meters. */
  zBounds: number;
  /** Bounds on the yaw (rotation around z axis) in radians. */
  yawBounds: number;
}

/** Controls how certain the user is of an anchor's pose. If left empty, a reasonable default will be chosen. */
export interface AnchorHintUncertainty {
  /** A full 6x6 Gaussian covariance matrix representing uncertainty of an anchoring. */
  se3Covariance: SE3Covariance | undefined;
  /**
   * Represents the 95 percent confidence interval on individual axes. This
   * will be converted to a SE3Covariance internally by creating a diagonal
   * matrix whose elements are informed by the confidence bounds.
   */
  confidenceBounds: PoseBounds | undefined;
}

/**
 * Waypoints may be anchored to a particular seed frame. The user may request that a waypoint
 * be anchored in a particular place with some Gaussian uncertainty.
 */
export interface WaypointAnchorHint {
  /**
   * This is to be interpreted as the mean of a Gaussian distribution, representing
   * the pose of the waypoint in the seed frame.
   */
  waypointAnchor: Anchor | undefined;
  /**
   * This is the uncertainty of the anchor's pose in the seed frame.
   * If left empty, a reasonable default uncertainty will be generated.
   */
  seedTformWaypointUncertainty: AnchorHintUncertainty | undefined;
  /**
   * Normally, the optimizer will move the anchorings of waypoints based on context, to minimize the
   * overall cost of the optimization problem. By providing a constraint on pose, the user can ensure
   * that the anchors stay within a certain region in the seed frame.
   * Leaving this empty will allow the optimizer to move the anchoring from the hint as far as it likes.
   */
  seedTformWaypointConstraint: PoseBounds | undefined;
}

/**
 * World objects (such as fiducials) may be anchored to a particular seed frame. The user may request that an object
 * be anchored in a particular place with some Gaussian uncertainty.
 */
export interface WorldObjectAnchorHint {
  /**
   * This is to be interpreted as the mean of a Gaussian distribution, representing
   * the pose of the object in the seed frame.
   */
  objectAnchor: AnchoredWorldObject | undefined;
  /**
   * This is the uncertainty of the anchor's pose in the seed frame.
   * If left empty, a reasonable default uncertainty will be generated.
   */
  seedTformObjectUncertainty: AnchorHintUncertainty | undefined;
  /**
   * Normally, the optimizer will move the anchorings of object based on context, to minimize the
   * overall cost of the optimization problem. By providing a constraint on pose, the user can ensure
   * that the anchors stay within a certain region in the seed frame.
   * Leaving this empty will allow the optimizer to move the anchoring from the hint as far as it likes.
   */
  seedTformObjectConstraint: PoseBounds | undefined;
}

/**
 * The user may assign a number of world objects and waypoints a guess at where they are in the seed frame.
 * These hints will be respected by the ProcessAnchoringRequest.
 */
export interface AnchoringHint {
  /** List of waypoints and hints as to where they are in the seed frame. */
  waypointAnchors: WaypointAnchorHint[];
  /** List of world objects and hints as to where they are in the seed frame. */
  worldObjects: WorldObjectAnchorHint[];
}

/**
 * Causes the server to optimize an existing anchoring, or generate a new anchoring for the map using the given parameters.
 * In general, if parameters are not provided, reasonable defaults will be used.
 * The new anchoring will be streamed back to the client, or modified on the server if desired.
 */
export interface ProcessAnchoringRequest {
  /** Standard request header. */
  header: RequestHeader | undefined;
  params: ProcessAnchoringRequest_Params | undefined;
  /** Initial guess at some number of waypoints and world objects and their anchorings. */
  initialHint: AnchoringHint | undefined;
  /**
   * If true, the map currently uploaded to the server will have its anchoring modified.
   * Otherwise, the user is expected to re-upload the anchoring.
   */
  modifyAnchoringOnServer: boolean;
  /**
   * If true, the anchoring will be streamed back to the user after every iteration.
   * This is useful for debug visualization.
   */
  streamIntermediateResults: boolean;
}

/** Parameters for procesing an anchoring. */
export interface ProcessAnchoringRequest_Params {
  optimizerParams: ProcessAnchoringRequest_Params_OptimizerParams | undefined;
  measurementParams:
    | ProcessAnchoringRequest_Params_MeasurementParams
    | undefined;
  weights: ProcessAnchoringRequest_Params_Weights | undefined;
  /**
   * If true, the anchoring which already exists on the server will be used as the initial
   * guess for the optimizer. Otherwise, a new anchoring will be generated for every waypoint
   * which doesn't have a value passed in through initial_hint. If no hint is provided,
   * and this value is false, every waypoint will be given a starting anchoring based on
   * the oldest waypoint in the map.
   */
  optimizeExistingAnchoring: boolean | undefined;
  /**
   * The optimizer will try to keep the orientation of waypoints consistent with gravity.
   * If provided, this is the gravity direction expressed with respect to the seed. This
   * will be interpreted as a unit vector. If not filled out, a default of (0, 0, -1) will be
   * used.
   */
  gravityEwrtSeed: Vec3 | undefined;
}

/** Parameters affecting the underlying optimizer. */
export interface ProcessAnchoringRequest_Params_OptimizerParams {
  /** Maximum iterations of the optimizer to run. */
  maxIters: number | undefined;
  /** Maximum time the optimizer is allowed to run before giving up. */
  maxTimeSeconds: number | undefined;
}

/** Parameters which affect the measurements the optimzier uses to process the anchoring. */
export interface ProcessAnchoringRequest_Params_MeasurementParams {
  /**
   * If true, waypoints which share the same kinematic odometry
   * frame will be constrained to one another using it.
   */
  useKinematicOdometry: boolean | undefined;
  /**
   * If true, waypoints which share the same visual odometry frame
   * will be constrained to one another using it.
   */
  useVisualOdometry: boolean | undefined;
  /**
   * If true, waypoints will be constrained so that the apparent pose of the
   * robot w.r.t the waypoint at the time of recording is consistent with gravity.
   */
  useGyroscopeMeasurements: boolean | undefined;
  /**
   * If true, edges which were created by topology processing via loop closures will
   * be used as constraints.
   */
  useLoopClosures: boolean | undefined;
  /**
   * If true, world object measurements will be used to constrain waypoints to one another
   * when those waypoints co-observe the same world object.
   */
  useWorldObjects: boolean | undefined;
}

/**
 * Relative weights to use for each of the optimizer's terms. These can be any positive value.
 * If set to zero, a reasonable default will be used. In general, the higher the weight, the more
 * the optimizer will care about that particular measurement.
 */
export interface ProcessAnchoringRequest_Params_Weights {
  kinematicOdometryWeight: number;
  visualOdometryWeight: number;
  worldObjectWeight: number;
  hintWeight: number;
  gyroscopeWeight: number;
  loopClosureWeight: number;
}

/**
 * Streamed response from the ProcessAnchoringRequest. These will be streamed until optimization is complete.
 * New anchorings will be streamed as they become available.
 */
export interface ProcessAnchoringResponse {
  header: ResponseHeader | undefined;
  status: ProcessAnchoringResponse_Status;
  /**
   * Contains new anchorings for waypoint(s) processed by the server.
   * These will be streamed back to the user as they become available.
   */
  waypointResults: Anchor[];
  /**
   * Contains new anchorings for object(s) (e.g april tags) processed by the server.
   * These will be streamed back to the user as they become available
   */
  worldObjectResults: AnchoredWorldObject[];
  /**
   * If modify_anchoring_on_server was set to true in the request, then the anchoring currently on the server
   * was modified using map processing. If this is set to false, then either an error occurred during
   * processing, or modify_anchoring_on_server was set to false in the request.
   * When anchoring_on_server_was_modified is set to false, the client is expected to upload the results
   * back to the server to commit the changes.
   */
  anchoringOnServerWasModified: boolean;
  /** The current optimizer iteration that produced these data. */
  iteration: number;
  /** The current nonlinear optimization cost. */
  cost: number;
  /**
   * If true, this is the result of the final iteration of optimization.
   * This will always be true when stream_intermediate_results in the request is false.
   */
  finalIteration: boolean;
  /**
   * On failure due to constraint violation, these hints were violated by the optimization.
   * Try increasing the pose bounds on the constraints of these hints.
   */
  violatedWaypointConstraints: WaypointAnchorHint[];
  /**
   * On failure due to constraint violation, these hints were violated by the optimization.
   * Try increasing the pose bounds on the constraints of these hints.
   */
  violatedObjectConstraints: WorldObjectAnchorHint[];
  /**
   * When there are missing waypoint snapshots, these are the IDs of the missing snapshots.
   * Upload them to continue.
   */
  missingSnapshotIds: string[];
  /**
   * When there are missing waypoints, these are the IDs of the missing waypoints. Upload them
   * to continue.
   */
  missingWaypointIds: string[];
  /** Unorganized list of waypoints and object IDs which were invalid (missing from the map). */
  invalidHints: string[];
}

export enum ProcessAnchoringResponse_Status {
  /** STATUS_UNKNOWN - Programming error. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Success. */
  STATUS_OK = 1,
  /** STATUS_MISSING_WAYPOINT_SNAPSHOTS - Not all of the waypoint snapshots exist on the server. Upload them to continue. */
  STATUS_MISSING_WAYPOINT_SNAPSHOTS = 2,
  /** STATUS_INVALID_GRAPH - The graph is invalid topologically, for example containing missing waypoints referenced by edges. */
  STATUS_INVALID_GRAPH = 3,
  /** STATUS_OPTIMIZATION_FAILURE - The optimization failed due to local minima or an ill-conditioned problem definition. */
  STATUS_OPTIMIZATION_FAILURE = 4,
  /** STATUS_INVALID_PARAMS - The parameters passed to the optimizer do not make sense (e.g negative weights). */
  STATUS_INVALID_PARAMS = 5,
  /** STATUS_CONSTRAINT_VIOLATION - One or more anchors were moved outside of the desired constraints. */
  STATUS_CONSTRAINT_VIOLATION = 6,
  /** STATUS_MAX_ITERATIONS - The optimizer reached the maximum number of iterations before converging. */
  STATUS_MAX_ITERATIONS = 7,
  /** STATUS_MAX_TIME - The optimizer timed out before converging. */
  STATUS_MAX_TIME = 8,
  /** STATUS_INVALID_HINTS - One or more of the hints passed in to the optimizer are invalid (do not correspond to real waypoints or objects). */
  STATUS_INVALID_HINTS = 9,
  /** STATUS_MAP_MODIFIED_DURING_PROCESSING - Tried to write the anchoring after processing, but another client may have modified the map. Try again. */
  STATUS_MAP_MODIFIED_DURING_PROCESSING = 10,
  UNRECOGNIZED = -1,
}

export function processAnchoringResponse_StatusFromJSON(
  object: any
): ProcessAnchoringResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return ProcessAnchoringResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return ProcessAnchoringResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_MISSING_WAYPOINT_SNAPSHOTS":
      return ProcessAnchoringResponse_Status.STATUS_MISSING_WAYPOINT_SNAPSHOTS;
    case 3:
    case "STATUS_INVALID_GRAPH":
      return ProcessAnchoringResponse_Status.STATUS_INVALID_GRAPH;
    case 4:
    case "STATUS_OPTIMIZATION_FAILURE":
      return ProcessAnchoringResponse_Status.STATUS_OPTIMIZATION_FAILURE;
    case 5:
    case "STATUS_INVALID_PARAMS":
      return ProcessAnchoringResponse_Status.STATUS_INVALID_PARAMS;
    case 6:
    case "STATUS_CONSTRAINT_VIOLATION":
      return ProcessAnchoringResponse_Status.STATUS_CONSTRAINT_VIOLATION;
    case 7:
    case "STATUS_MAX_ITERATIONS":
      return ProcessAnchoringResponse_Status.STATUS_MAX_ITERATIONS;
    case 8:
    case "STATUS_MAX_TIME":
      return ProcessAnchoringResponse_Status.STATUS_MAX_TIME;
    case 9:
    case "STATUS_INVALID_HINTS":
      return ProcessAnchoringResponse_Status.STATUS_INVALID_HINTS;
    case 10:
    case "STATUS_MAP_MODIFIED_DURING_PROCESSING":
      return ProcessAnchoringResponse_Status.STATUS_MAP_MODIFIED_DURING_PROCESSING;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ProcessAnchoringResponse_Status.UNRECOGNIZED;
  }
}

export function processAnchoringResponse_StatusToJSON(
  object: ProcessAnchoringResponse_Status
): string {
  switch (object) {
    case ProcessAnchoringResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case ProcessAnchoringResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case ProcessAnchoringResponse_Status.STATUS_MISSING_WAYPOINT_SNAPSHOTS:
      return "STATUS_MISSING_WAYPOINT_SNAPSHOTS";
    case ProcessAnchoringResponse_Status.STATUS_INVALID_GRAPH:
      return "STATUS_INVALID_GRAPH";
    case ProcessAnchoringResponse_Status.STATUS_OPTIMIZATION_FAILURE:
      return "STATUS_OPTIMIZATION_FAILURE";
    case ProcessAnchoringResponse_Status.STATUS_INVALID_PARAMS:
      return "STATUS_INVALID_PARAMS";
    case ProcessAnchoringResponse_Status.STATUS_CONSTRAINT_VIOLATION:
      return "STATUS_CONSTRAINT_VIOLATION";
    case ProcessAnchoringResponse_Status.STATUS_MAX_ITERATIONS:
      return "STATUS_MAX_ITERATIONS";
    case ProcessAnchoringResponse_Status.STATUS_MAX_TIME:
      return "STATUS_MAX_TIME";
    case ProcessAnchoringResponse_Status.STATUS_INVALID_HINTS:
      return "STATUS_INVALID_HINTS";
    case ProcessAnchoringResponse_Status.STATUS_MAP_MODIFIED_DURING_PROCESSING:
      return "STATUS_MAP_MODIFIED_DURING_PROCESSING";
    case ProcessAnchoringResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseProcessTopologyRequest(): ProcessTopologyRequest {
  return { header: undefined, params: undefined, modifyMapOnServer: false };
}

export const ProcessTopologyRequest = {
  encode(
    message: ProcessTopologyRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.params !== undefined) {
      ProcessTopologyRequest_Params.encode(
        message.params,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.modifyMapOnServer === true) {
      writer.uint32(24).bool(message.modifyMapOnServer);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ProcessTopologyRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProcessTopologyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.params = ProcessTopologyRequest_Params.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.modifyMapOnServer = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProcessTopologyRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      params: isSet(object.params)
        ? ProcessTopologyRequest_Params.fromJSON(object.params)
        : undefined,
      modifyMapOnServer: isSet(object.modifyMapOnServer)
        ? Boolean(object.modifyMapOnServer)
        : false,
    };
  },

  toJSON(message: ProcessTopologyRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.params !== undefined &&
      (obj.params = message.params
        ? ProcessTopologyRequest_Params.toJSON(message.params)
        : undefined);
    message.modifyMapOnServer !== undefined &&
      (obj.modifyMapOnServer = message.modifyMapOnServer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ProcessTopologyRequest>, I>>(
    object: I
  ): ProcessTopologyRequest {
    const message = createBaseProcessTopologyRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.params =
      object.params !== undefined && object.params !== null
        ? ProcessTopologyRequest_Params.fromPartial(object.params)
        : undefined;
    message.modifyMapOnServer = object.modifyMapOnServer ?? false;
    return message;
  },
};

function createBaseProcessTopologyRequest_ICPParams(): ProcessTopologyRequest_ICPParams {
  return { icpIters: undefined, maxPointMatchDistance: undefined };
}

export const ProcessTopologyRequest_ICPParams = {
  encode(
    message: ProcessTopologyRequest_ICPParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.icpIters !== undefined) {
      Int32Value.encode(
        { value: message.icpIters! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.maxPointMatchDistance !== undefined) {
      DoubleValue.encode(
        { value: message.maxPointMatchDistance! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ProcessTopologyRequest_ICPParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProcessTopologyRequest_ICPParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.icpIters = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.maxPointMatchDistance = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProcessTopologyRequest_ICPParams {
    return {
      icpIters: isSet(object.icpIters) ? Number(object.icpIters) : undefined,
      maxPointMatchDistance: isSet(object.maxPointMatchDistance)
        ? Number(object.maxPointMatchDistance)
        : undefined,
    };
  },

  toJSON(message: ProcessTopologyRequest_ICPParams): unknown {
    const obj: any = {};
    message.icpIters !== undefined && (obj.icpIters = message.icpIters);
    message.maxPointMatchDistance !== undefined &&
      (obj.maxPointMatchDistance = message.maxPointMatchDistance);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<ProcessTopologyRequest_ICPParams>, I>
  >(object: I): ProcessTopologyRequest_ICPParams {
    const message = createBaseProcessTopologyRequest_ICPParams();
    message.icpIters = object.icpIters ?? undefined;
    message.maxPointMatchDistance = object.maxPointMatchDistance ?? undefined;
    return message;
  },
};

function createBaseProcessTopologyRequest_OdometryLoopClosureParams(): ProcessTopologyRequest_OdometryLoopClosureParams {
  return {
    maxLoopClosurePathLength: undefined,
    minLoopClosurePathLength: undefined,
    maxLoopClosureHeightChange: undefined,
    maxLoopClosureEdgeLength: undefined,
    numExtraLoopClosureIterations: undefined,
  };
}

export const ProcessTopologyRequest_OdometryLoopClosureParams = {
  encode(
    message: ProcessTopologyRequest_OdometryLoopClosureParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.maxLoopClosurePathLength !== undefined) {
      DoubleValue.encode(
        { value: message.maxLoopClosurePathLength! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.minLoopClosurePathLength !== undefined) {
      DoubleValue.encode(
        { value: message.minLoopClosurePathLength! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.maxLoopClosureHeightChange !== undefined) {
      DoubleValue.encode(
        { value: message.maxLoopClosureHeightChange! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.maxLoopClosureEdgeLength !== undefined) {
      DoubleValue.encode(
        { value: message.maxLoopClosureEdgeLength! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.numExtraLoopClosureIterations !== undefined) {
      Int32Value.encode(
        { value: message.numExtraLoopClosureIterations! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ProcessTopologyRequest_OdometryLoopClosureParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message =
      createBaseProcessTopologyRequest_OdometryLoopClosureParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.maxLoopClosurePathLength = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 2:
          message.minLoopClosurePathLength = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 3:
          message.maxLoopClosureHeightChange = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 4:
          message.maxLoopClosureEdgeLength = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 5:
          message.numExtraLoopClosureIterations = Int32Value.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProcessTopologyRequest_OdometryLoopClosureParams {
    return {
      maxLoopClosurePathLength: isSet(object.maxLoopClosurePathLength)
        ? Number(object.maxLoopClosurePathLength)
        : undefined,
      minLoopClosurePathLength: isSet(object.minLoopClosurePathLength)
        ? Number(object.minLoopClosurePathLength)
        : undefined,
      maxLoopClosureHeightChange: isSet(object.maxLoopClosureHeightChange)
        ? Number(object.maxLoopClosureHeightChange)
        : undefined,
      maxLoopClosureEdgeLength: isSet(object.maxLoopClosureEdgeLength)
        ? Number(object.maxLoopClosureEdgeLength)
        : undefined,
      numExtraLoopClosureIterations: isSet(object.numExtraLoopClosureIterations)
        ? Number(object.numExtraLoopClosureIterations)
        : undefined,
    };
  },

  toJSON(message: ProcessTopologyRequest_OdometryLoopClosureParams): unknown {
    const obj: any = {};
    message.maxLoopClosurePathLength !== undefined &&
      (obj.maxLoopClosurePathLength = message.maxLoopClosurePathLength);
    message.minLoopClosurePathLength !== undefined &&
      (obj.minLoopClosurePathLength = message.minLoopClosurePathLength);
    message.maxLoopClosureHeightChange !== undefined &&
      (obj.maxLoopClosureHeightChange = message.maxLoopClosureHeightChange);
    message.maxLoopClosureEdgeLength !== undefined &&
      (obj.maxLoopClosureEdgeLength = message.maxLoopClosureEdgeLength);
    message.numExtraLoopClosureIterations !== undefined &&
      (obj.numExtraLoopClosureIterations =
        message.numExtraLoopClosureIterations);
    return obj;
  },

  fromPartial<
    I extends Exact<
      DeepPartial<ProcessTopologyRequest_OdometryLoopClosureParams>,
      I
    >
  >(object: I): ProcessTopologyRequest_OdometryLoopClosureParams {
    const message =
      createBaseProcessTopologyRequest_OdometryLoopClosureParams();
    message.maxLoopClosurePathLength =
      object.maxLoopClosurePathLength ?? undefined;
    message.minLoopClosurePathLength =
      object.minLoopClosurePathLength ?? undefined;
    message.maxLoopClosureHeightChange =
      object.maxLoopClosureHeightChange ?? undefined;
    message.maxLoopClosureEdgeLength =
      object.maxLoopClosureEdgeLength ?? undefined;
    message.numExtraLoopClosureIterations =
      object.numExtraLoopClosureIterations ?? undefined;
    return message;
  },
};

function createBaseProcessTopologyRequest_FiducialLoopClosureParams(): ProcessTopologyRequest_FiducialLoopClosureParams {
  return {
    minLoopClosurePathLength: undefined,
    maxLoopClosureEdgeLength: undefined,
    maxFiducialDistance: undefined,
    maxLoopClosureHeightChange: undefined,
  };
}

export const ProcessTopologyRequest_FiducialLoopClosureParams = {
  encode(
    message: ProcessTopologyRequest_FiducialLoopClosureParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.minLoopClosurePathLength !== undefined) {
      DoubleValue.encode(
        { value: message.minLoopClosurePathLength! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.maxLoopClosureEdgeLength !== undefined) {
      DoubleValue.encode(
        { value: message.maxLoopClosureEdgeLength! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.maxFiducialDistance !== undefined) {
      DoubleValue.encode(
        { value: message.maxFiducialDistance! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.maxLoopClosureHeightChange !== undefined) {
      DoubleValue.encode(
        { value: message.maxLoopClosureHeightChange! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ProcessTopologyRequest_FiducialLoopClosureParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message =
      createBaseProcessTopologyRequest_FiducialLoopClosureParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.minLoopClosurePathLength = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 2:
          message.maxLoopClosureEdgeLength = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 3:
          message.maxFiducialDistance = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 4:
          message.maxLoopClosureHeightChange = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProcessTopologyRequest_FiducialLoopClosureParams {
    return {
      minLoopClosurePathLength: isSet(object.minLoopClosurePathLength)
        ? Number(object.minLoopClosurePathLength)
        : undefined,
      maxLoopClosureEdgeLength: isSet(object.maxLoopClosureEdgeLength)
        ? Number(object.maxLoopClosureEdgeLength)
        : undefined,
      maxFiducialDistance: isSet(object.maxFiducialDistance)
        ? Number(object.maxFiducialDistance)
        : undefined,
      maxLoopClosureHeightChange: isSet(object.maxLoopClosureHeightChange)
        ? Number(object.maxLoopClosureHeightChange)
        : undefined,
    };
  },

  toJSON(message: ProcessTopologyRequest_FiducialLoopClosureParams): unknown {
    const obj: any = {};
    message.minLoopClosurePathLength !== undefined &&
      (obj.minLoopClosurePathLength = message.minLoopClosurePathLength);
    message.maxLoopClosureEdgeLength !== undefined &&
      (obj.maxLoopClosureEdgeLength = message.maxLoopClosureEdgeLength);
    message.maxFiducialDistance !== undefined &&
      (obj.maxFiducialDistance = message.maxFiducialDistance);
    message.maxLoopClosureHeightChange !== undefined &&
      (obj.maxLoopClosureHeightChange = message.maxLoopClosureHeightChange);
    return obj;
  },

  fromPartial<
    I extends Exact<
      DeepPartial<ProcessTopologyRequest_FiducialLoopClosureParams>,
      I
    >
  >(object: I): ProcessTopologyRequest_FiducialLoopClosureParams {
    const message =
      createBaseProcessTopologyRequest_FiducialLoopClosureParams();
    message.minLoopClosurePathLength =
      object.minLoopClosurePathLength ?? undefined;
    message.maxLoopClosureEdgeLength =
      object.maxLoopClosureEdgeLength ?? undefined;
    message.maxFiducialDistance = object.maxFiducialDistance ?? undefined;
    message.maxLoopClosureHeightChange =
      object.maxLoopClosureHeightChange ?? undefined;
    return message;
  },
};

function createBaseProcessTopologyRequest_CollisionCheckingParams(): ProcessTopologyRequest_CollisionCheckingParams {
  return {
    checkEdgesForCollision: undefined,
    collisionCheckRobotRadius: undefined,
    collisionCheckHeightVariation: undefined,
  };
}

export const ProcessTopologyRequest_CollisionCheckingParams = {
  encode(
    message: ProcessTopologyRequest_CollisionCheckingParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.checkEdgesForCollision !== undefined) {
      BoolValue.encode(
        { value: message.checkEdgesForCollision! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.collisionCheckRobotRadius !== undefined) {
      DoubleValue.encode(
        { value: message.collisionCheckRobotRadius! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.collisionCheckHeightVariation !== undefined) {
      DoubleValue.encode(
        { value: message.collisionCheckHeightVariation! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ProcessTopologyRequest_CollisionCheckingParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProcessTopologyRequest_CollisionCheckingParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.checkEdgesForCollision = BoolValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 2:
          message.collisionCheckRobotRadius = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 3:
          message.collisionCheckHeightVariation = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProcessTopologyRequest_CollisionCheckingParams {
    return {
      checkEdgesForCollision: isSet(object.checkEdgesForCollision)
        ? Boolean(object.checkEdgesForCollision)
        : undefined,
      collisionCheckRobotRadius: isSet(object.collisionCheckRobotRadius)
        ? Number(object.collisionCheckRobotRadius)
        : undefined,
      collisionCheckHeightVariation: isSet(object.collisionCheckHeightVariation)
        ? Number(object.collisionCheckHeightVariation)
        : undefined,
    };
  },

  toJSON(message: ProcessTopologyRequest_CollisionCheckingParams): unknown {
    const obj: any = {};
    message.checkEdgesForCollision !== undefined &&
      (obj.checkEdgesForCollision = message.checkEdgesForCollision);
    message.collisionCheckRobotRadius !== undefined &&
      (obj.collisionCheckRobotRadius = message.collisionCheckRobotRadius);
    message.collisionCheckHeightVariation !== undefined &&
      (obj.collisionCheckHeightVariation =
        message.collisionCheckHeightVariation);
    return obj;
  },

  fromPartial<
    I extends Exact<
      DeepPartial<ProcessTopologyRequest_CollisionCheckingParams>,
      I
    >
  >(object: I): ProcessTopologyRequest_CollisionCheckingParams {
    const message = createBaseProcessTopologyRequest_CollisionCheckingParams();
    message.checkEdgesForCollision = object.checkEdgesForCollision ?? undefined;
    message.collisionCheckRobotRadius =
      object.collisionCheckRobotRadius ?? undefined;
    message.collisionCheckHeightVariation =
      object.collisionCheckHeightVariation ?? undefined;
    return message;
  },
};

function createBaseProcessTopologyRequest_Params(): ProcessTopologyRequest_Params {
  return {
    doOdometryLoopClosure: undefined,
    odometryLoopClosureParams: undefined,
    icpParams: undefined,
    doFiducialLoopClosure: undefined,
    fiducialLoopClosureParams: undefined,
    collisionCheckParams: undefined,
    timeoutSeconds: 0,
  };
}

export const ProcessTopologyRequest_Params = {
  encode(
    message: ProcessTopologyRequest_Params,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.doOdometryLoopClosure !== undefined) {
      BoolValue.encode(
        { value: message.doOdometryLoopClosure! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.odometryLoopClosureParams !== undefined) {
      ProcessTopologyRequest_OdometryLoopClosureParams.encode(
        message.odometryLoopClosureParams,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.icpParams !== undefined) {
      ProcessTopologyRequest_ICPParams.encode(
        message.icpParams,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.doFiducialLoopClosure !== undefined) {
      BoolValue.encode(
        { value: message.doFiducialLoopClosure! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.fiducialLoopClosureParams !== undefined) {
      ProcessTopologyRequest_FiducialLoopClosureParams.encode(
        message.fiducialLoopClosureParams,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.collisionCheckParams !== undefined) {
      ProcessTopologyRequest_CollisionCheckingParams.encode(
        message.collisionCheckParams,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.timeoutSeconds !== 0) {
      writer.uint32(57).double(message.timeoutSeconds);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ProcessTopologyRequest_Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProcessTopologyRequest_Params();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.doOdometryLoopClosure = BoolValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 2:
          message.odometryLoopClosureParams =
            ProcessTopologyRequest_OdometryLoopClosureParams.decode(
              reader,
              reader.uint32()
            );
          break;
        case 3:
          message.icpParams = ProcessTopologyRequest_ICPParams.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.doFiducialLoopClosure = BoolValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 5:
          message.fiducialLoopClosureParams =
            ProcessTopologyRequest_FiducialLoopClosureParams.decode(
              reader,
              reader.uint32()
            );
          break;
        case 6:
          message.collisionCheckParams =
            ProcessTopologyRequest_CollisionCheckingParams.decode(
              reader,
              reader.uint32()
            );
          break;
        case 7:
          message.timeoutSeconds = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProcessTopologyRequest_Params {
    return {
      doOdometryLoopClosure: isSet(object.doOdometryLoopClosure)
        ? Boolean(object.doOdometryLoopClosure)
        : undefined,
      odometryLoopClosureParams: isSet(object.odometryLoopClosureParams)
        ? ProcessTopologyRequest_OdometryLoopClosureParams.fromJSON(
            object.odometryLoopClosureParams
          )
        : undefined,
      icpParams: isSet(object.icpParams)
        ? ProcessTopologyRequest_ICPParams.fromJSON(object.icpParams)
        : undefined,
      doFiducialLoopClosure: isSet(object.doFiducialLoopClosure)
        ? Boolean(object.doFiducialLoopClosure)
        : undefined,
      fiducialLoopClosureParams: isSet(object.fiducialLoopClosureParams)
        ? ProcessTopologyRequest_FiducialLoopClosureParams.fromJSON(
            object.fiducialLoopClosureParams
          )
        : undefined,
      collisionCheckParams: isSet(object.collisionCheckParams)
        ? ProcessTopologyRequest_CollisionCheckingParams.fromJSON(
            object.collisionCheckParams
          )
        : undefined,
      timeoutSeconds: isSet(object.timeoutSeconds)
        ? Number(object.timeoutSeconds)
        : 0,
    };
  },

  toJSON(message: ProcessTopologyRequest_Params): unknown {
    const obj: any = {};
    message.doOdometryLoopClosure !== undefined &&
      (obj.doOdometryLoopClosure = message.doOdometryLoopClosure);
    message.odometryLoopClosureParams !== undefined &&
      (obj.odometryLoopClosureParams = message.odometryLoopClosureParams
        ? ProcessTopologyRequest_OdometryLoopClosureParams.toJSON(
            message.odometryLoopClosureParams
          )
        : undefined);
    message.icpParams !== undefined &&
      (obj.icpParams = message.icpParams
        ? ProcessTopologyRequest_ICPParams.toJSON(message.icpParams)
        : undefined);
    message.doFiducialLoopClosure !== undefined &&
      (obj.doFiducialLoopClosure = message.doFiducialLoopClosure);
    message.fiducialLoopClosureParams !== undefined &&
      (obj.fiducialLoopClosureParams = message.fiducialLoopClosureParams
        ? ProcessTopologyRequest_FiducialLoopClosureParams.toJSON(
            message.fiducialLoopClosureParams
          )
        : undefined);
    message.collisionCheckParams !== undefined &&
      (obj.collisionCheckParams = message.collisionCheckParams
        ? ProcessTopologyRequest_CollisionCheckingParams.toJSON(
            message.collisionCheckParams
          )
        : undefined);
    message.timeoutSeconds !== undefined &&
      (obj.timeoutSeconds = message.timeoutSeconds);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ProcessTopologyRequest_Params>, I>>(
    object: I
  ): ProcessTopologyRequest_Params {
    const message = createBaseProcessTopologyRequest_Params();
    message.doOdometryLoopClosure = object.doOdometryLoopClosure ?? undefined;
    message.odometryLoopClosureParams =
      object.odometryLoopClosureParams !== undefined &&
      object.odometryLoopClosureParams !== null
        ? ProcessTopologyRequest_OdometryLoopClosureParams.fromPartial(
            object.odometryLoopClosureParams
          )
        : undefined;
    message.icpParams =
      object.icpParams !== undefined && object.icpParams !== null
        ? ProcessTopologyRequest_ICPParams.fromPartial(object.icpParams)
        : undefined;
    message.doFiducialLoopClosure = object.doFiducialLoopClosure ?? undefined;
    message.fiducialLoopClosureParams =
      object.fiducialLoopClosureParams !== undefined &&
      object.fiducialLoopClosureParams !== null
        ? ProcessTopologyRequest_FiducialLoopClosureParams.fromPartial(
            object.fiducialLoopClosureParams
          )
        : undefined;
    message.collisionCheckParams =
      object.collisionCheckParams !== undefined &&
      object.collisionCheckParams !== null
        ? ProcessTopologyRequest_CollisionCheckingParams.fromPartial(
            object.collisionCheckParams
          )
        : undefined;
    message.timeoutSeconds = object.timeoutSeconds ?? 0;
    return message;
  },
};

function createBaseProcessTopologyResponse(): ProcessTopologyResponse {
  return {
    header: undefined,
    status: 0,
    newSubgraph: undefined,
    mapOnServerWasModified: false,
    missingSnapshotIds: [],
    missingWaypointIds: [],
    timedOut: false,
  };
}

export const ProcessTopologyResponse = {
  encode(
    message: ProcessTopologyResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.newSubgraph !== undefined) {
      Graph.encode(message.newSubgraph, writer.uint32(26).fork()).ldelim();
    }
    if (message.mapOnServerWasModified === true) {
      writer.uint32(32).bool(message.mapOnServerWasModified);
    }
    for (const v of message.missingSnapshotIds) {
      writer.uint32(82).string(v!);
    }
    for (const v of message.missingWaypointIds) {
      writer.uint32(90).string(v!);
    }
    if (message.timedOut === true) {
      writer.uint32(96).bool(message.timedOut);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ProcessTopologyResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProcessTopologyResponse();
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
          message.newSubgraph = Graph.decode(reader, reader.uint32());
          break;
        case 4:
          message.mapOnServerWasModified = reader.bool();
          break;
        case 10:
          message.missingSnapshotIds.push(reader.string());
          break;
        case 11:
          message.missingWaypointIds.push(reader.string());
          break;
        case 12:
          message.timedOut = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProcessTopologyResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? processTopologyResponse_StatusFromJSON(object.status)
        : 0,
      newSubgraph: isSet(object.newSubgraph)
        ? Graph.fromJSON(object.newSubgraph)
        : undefined,
      mapOnServerWasModified: isSet(object.mapOnServerWasModified)
        ? Boolean(object.mapOnServerWasModified)
        : false,
      missingSnapshotIds: Array.isArray(object?.missingSnapshotIds)
        ? object.missingSnapshotIds.map((e: any) => String(e))
        : [],
      missingWaypointIds: Array.isArray(object?.missingWaypointIds)
        ? object.missingWaypointIds.map((e: any) => String(e))
        : [],
      timedOut: isSet(object.timedOut) ? Boolean(object.timedOut) : false,
    };
  },

  toJSON(message: ProcessTopologyResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = processTopologyResponse_StatusToJSON(message.status));
    message.newSubgraph !== undefined &&
      (obj.newSubgraph = message.newSubgraph
        ? Graph.toJSON(message.newSubgraph)
        : undefined);
    message.mapOnServerWasModified !== undefined &&
      (obj.mapOnServerWasModified = message.mapOnServerWasModified);
    if (message.missingSnapshotIds) {
      obj.missingSnapshotIds = message.missingSnapshotIds.map((e) => e);
    } else {
      obj.missingSnapshotIds = [];
    }
    if (message.missingWaypointIds) {
      obj.missingWaypointIds = message.missingWaypointIds.map((e) => e);
    } else {
      obj.missingWaypointIds = [];
    }
    message.timedOut !== undefined && (obj.timedOut = message.timedOut);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ProcessTopologyResponse>, I>>(
    object: I
  ): ProcessTopologyResponse {
    const message = createBaseProcessTopologyResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    message.newSubgraph =
      object.newSubgraph !== undefined && object.newSubgraph !== null
        ? Graph.fromPartial(object.newSubgraph)
        : undefined;
    message.mapOnServerWasModified = object.mapOnServerWasModified ?? false;
    message.missingSnapshotIds = object.missingSnapshotIds?.map((e) => e) || [];
    message.missingWaypointIds = object.missingWaypointIds?.map((e) => e) || [];
    message.timedOut = object.timedOut ?? false;
    return message;
  },
};

function createBasePoseBounds(): PoseBounds {
  return { xBounds: 0, yBounds: 0, zBounds: 0, yawBounds: 0 };
}

export const PoseBounds = {
  encode(
    message: PoseBounds,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.xBounds !== 0) {
      writer.uint32(9).double(message.xBounds);
    }
    if (message.yBounds !== 0) {
      writer.uint32(17).double(message.yBounds);
    }
    if (message.zBounds !== 0) {
      writer.uint32(25).double(message.zBounds);
    }
    if (message.yawBounds !== 0) {
      writer.uint32(33).double(message.yawBounds);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PoseBounds {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoseBounds();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.xBounds = reader.double();
          break;
        case 2:
          message.yBounds = reader.double();
          break;
        case 3:
          message.zBounds = reader.double();
          break;
        case 4:
          message.yawBounds = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PoseBounds {
    return {
      xBounds: isSet(object.xBounds) ? Number(object.xBounds) : 0,
      yBounds: isSet(object.yBounds) ? Number(object.yBounds) : 0,
      zBounds: isSet(object.zBounds) ? Number(object.zBounds) : 0,
      yawBounds: isSet(object.yawBounds) ? Number(object.yawBounds) : 0,
    };
  },

  toJSON(message: PoseBounds): unknown {
    const obj: any = {};
    message.xBounds !== undefined && (obj.xBounds = message.xBounds);
    message.yBounds !== undefined && (obj.yBounds = message.yBounds);
    message.zBounds !== undefined && (obj.zBounds = message.zBounds);
    message.yawBounds !== undefined && (obj.yawBounds = message.yawBounds);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PoseBounds>, I>>(
    object: I
  ): PoseBounds {
    const message = createBasePoseBounds();
    message.xBounds = object.xBounds ?? 0;
    message.yBounds = object.yBounds ?? 0;
    message.zBounds = object.zBounds ?? 0;
    message.yawBounds = object.yawBounds ?? 0;
    return message;
  },
};

function createBaseAnchorHintUncertainty(): AnchorHintUncertainty {
  return { se3Covariance: undefined, confidenceBounds: undefined };
}

export const AnchorHintUncertainty = {
  encode(
    message: AnchorHintUncertainty,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.se3Covariance !== undefined) {
      SE3Covariance.encode(
        message.se3Covariance,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.confidenceBounds !== undefined) {
      PoseBounds.encode(
        message.confidenceBounds,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AnchorHintUncertainty {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAnchorHintUncertainty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.se3Covariance = SE3Covariance.decode(reader, reader.uint32());
          break;
        case 2:
          message.confidenceBounds = PoseBounds.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AnchorHintUncertainty {
    return {
      se3Covariance: isSet(object.se3Covariance)
        ? SE3Covariance.fromJSON(object.se3Covariance)
        : undefined,
      confidenceBounds: isSet(object.confidenceBounds)
        ? PoseBounds.fromJSON(object.confidenceBounds)
        : undefined,
    };
  },

  toJSON(message: AnchorHintUncertainty): unknown {
    const obj: any = {};
    message.se3Covariance !== undefined &&
      (obj.se3Covariance = message.se3Covariance
        ? SE3Covariance.toJSON(message.se3Covariance)
        : undefined);
    message.confidenceBounds !== undefined &&
      (obj.confidenceBounds = message.confidenceBounds
        ? PoseBounds.toJSON(message.confidenceBounds)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AnchorHintUncertainty>, I>>(
    object: I
  ): AnchorHintUncertainty {
    const message = createBaseAnchorHintUncertainty();
    message.se3Covariance =
      object.se3Covariance !== undefined && object.se3Covariance !== null
        ? SE3Covariance.fromPartial(object.se3Covariance)
        : undefined;
    message.confidenceBounds =
      object.confidenceBounds !== undefined && object.confidenceBounds !== null
        ? PoseBounds.fromPartial(object.confidenceBounds)
        : undefined;
    return message;
  },
};

function createBaseWaypointAnchorHint(): WaypointAnchorHint {
  return {
    waypointAnchor: undefined,
    seedTformWaypointUncertainty: undefined,
    seedTformWaypointConstraint: undefined,
  };
}

export const WaypointAnchorHint = {
  encode(
    message: WaypointAnchorHint,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.waypointAnchor !== undefined) {
      Anchor.encode(message.waypointAnchor, writer.uint32(10).fork()).ldelim();
    }
    if (message.seedTformWaypointUncertainty !== undefined) {
      AnchorHintUncertainty.encode(
        message.seedTformWaypointUncertainty,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.seedTformWaypointConstraint !== undefined) {
      PoseBounds.encode(
        message.seedTformWaypointConstraint,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WaypointAnchorHint {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWaypointAnchorHint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.waypointAnchor = Anchor.decode(reader, reader.uint32());
          break;
        case 2:
          message.seedTformWaypointUncertainty = AnchorHintUncertainty.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.seedTformWaypointConstraint = PoseBounds.decode(
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

  fromJSON(object: any): WaypointAnchorHint {
    return {
      waypointAnchor: isSet(object.waypointAnchor)
        ? Anchor.fromJSON(object.waypointAnchor)
        : undefined,
      seedTformWaypointUncertainty: isSet(object.seedTformWaypointUncertainty)
        ? AnchorHintUncertainty.fromJSON(object.seedTformWaypointUncertainty)
        : undefined,
      seedTformWaypointConstraint: isSet(object.seedTformWaypointConstraint)
        ? PoseBounds.fromJSON(object.seedTformWaypointConstraint)
        : undefined,
    };
  },

  toJSON(message: WaypointAnchorHint): unknown {
    const obj: any = {};
    message.waypointAnchor !== undefined &&
      (obj.waypointAnchor = message.waypointAnchor
        ? Anchor.toJSON(message.waypointAnchor)
        : undefined);
    message.seedTformWaypointUncertainty !== undefined &&
      (obj.seedTformWaypointUncertainty = message.seedTformWaypointUncertainty
        ? AnchorHintUncertainty.toJSON(message.seedTformWaypointUncertainty)
        : undefined);
    message.seedTformWaypointConstraint !== undefined &&
      (obj.seedTformWaypointConstraint = message.seedTformWaypointConstraint
        ? PoseBounds.toJSON(message.seedTformWaypointConstraint)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WaypointAnchorHint>, I>>(
    object: I
  ): WaypointAnchorHint {
    const message = createBaseWaypointAnchorHint();
    message.waypointAnchor =
      object.waypointAnchor !== undefined && object.waypointAnchor !== null
        ? Anchor.fromPartial(object.waypointAnchor)
        : undefined;
    message.seedTformWaypointUncertainty =
      object.seedTformWaypointUncertainty !== undefined &&
      object.seedTformWaypointUncertainty !== null
        ? AnchorHintUncertainty.fromPartial(object.seedTformWaypointUncertainty)
        : undefined;
    message.seedTformWaypointConstraint =
      object.seedTformWaypointConstraint !== undefined &&
      object.seedTformWaypointConstraint !== null
        ? PoseBounds.fromPartial(object.seedTformWaypointConstraint)
        : undefined;
    return message;
  },
};

function createBaseWorldObjectAnchorHint(): WorldObjectAnchorHint {
  return {
    objectAnchor: undefined,
    seedTformObjectUncertainty: undefined,
    seedTformObjectConstraint: undefined,
  };
}

export const WorldObjectAnchorHint = {
  encode(
    message: WorldObjectAnchorHint,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.objectAnchor !== undefined) {
      AnchoredWorldObject.encode(
        message.objectAnchor,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.seedTformObjectUncertainty !== undefined) {
      AnchorHintUncertainty.encode(
        message.seedTformObjectUncertainty,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.seedTformObjectConstraint !== undefined) {
      PoseBounds.encode(
        message.seedTformObjectConstraint,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): WorldObjectAnchorHint {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWorldObjectAnchorHint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.objectAnchor = AnchoredWorldObject.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.seedTformObjectUncertainty = AnchorHintUncertainty.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.seedTformObjectConstraint = PoseBounds.decode(
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

  fromJSON(object: any): WorldObjectAnchorHint {
    return {
      objectAnchor: isSet(object.objectAnchor)
        ? AnchoredWorldObject.fromJSON(object.objectAnchor)
        : undefined,
      seedTformObjectUncertainty: isSet(object.seedTformObjectUncertainty)
        ? AnchorHintUncertainty.fromJSON(object.seedTformObjectUncertainty)
        : undefined,
      seedTformObjectConstraint: isSet(object.seedTformObjectConstraint)
        ? PoseBounds.fromJSON(object.seedTformObjectConstraint)
        : undefined,
    };
  },

  toJSON(message: WorldObjectAnchorHint): unknown {
    const obj: any = {};
    message.objectAnchor !== undefined &&
      (obj.objectAnchor = message.objectAnchor
        ? AnchoredWorldObject.toJSON(message.objectAnchor)
        : undefined);
    message.seedTformObjectUncertainty !== undefined &&
      (obj.seedTformObjectUncertainty = message.seedTformObjectUncertainty
        ? AnchorHintUncertainty.toJSON(message.seedTformObjectUncertainty)
        : undefined);
    message.seedTformObjectConstraint !== undefined &&
      (obj.seedTformObjectConstraint = message.seedTformObjectConstraint
        ? PoseBounds.toJSON(message.seedTformObjectConstraint)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WorldObjectAnchorHint>, I>>(
    object: I
  ): WorldObjectAnchorHint {
    const message = createBaseWorldObjectAnchorHint();
    message.objectAnchor =
      object.objectAnchor !== undefined && object.objectAnchor !== null
        ? AnchoredWorldObject.fromPartial(object.objectAnchor)
        : undefined;
    message.seedTformObjectUncertainty =
      object.seedTformObjectUncertainty !== undefined &&
      object.seedTformObjectUncertainty !== null
        ? AnchorHintUncertainty.fromPartial(object.seedTformObjectUncertainty)
        : undefined;
    message.seedTformObjectConstraint =
      object.seedTformObjectConstraint !== undefined &&
      object.seedTformObjectConstraint !== null
        ? PoseBounds.fromPartial(object.seedTformObjectConstraint)
        : undefined;
    return message;
  },
};

function createBaseAnchoringHint(): AnchoringHint {
  return { waypointAnchors: [], worldObjects: [] };
}

export const AnchoringHint = {
  encode(
    message: AnchoringHint,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.waypointAnchors) {
      WaypointAnchorHint.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.worldObjects) {
      WorldObjectAnchorHint.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AnchoringHint {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAnchoringHint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.waypointAnchors.push(
            WaypointAnchorHint.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.worldObjects.push(
            WorldObjectAnchorHint.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AnchoringHint {
    return {
      waypointAnchors: Array.isArray(object?.waypointAnchors)
        ? object.waypointAnchors.map((e: any) => WaypointAnchorHint.fromJSON(e))
        : [],
      worldObjects: Array.isArray(object?.worldObjects)
        ? object.worldObjects.map((e: any) => WorldObjectAnchorHint.fromJSON(e))
        : [],
    };
  },

  toJSON(message: AnchoringHint): unknown {
    const obj: any = {};
    if (message.waypointAnchors) {
      obj.waypointAnchors = message.waypointAnchors.map((e) =>
        e ? WaypointAnchorHint.toJSON(e) : undefined
      );
    } else {
      obj.waypointAnchors = [];
    }
    if (message.worldObjects) {
      obj.worldObjects = message.worldObjects.map((e) =>
        e ? WorldObjectAnchorHint.toJSON(e) : undefined
      );
    } else {
      obj.worldObjects = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AnchoringHint>, I>>(
    object: I
  ): AnchoringHint {
    const message = createBaseAnchoringHint();
    message.waypointAnchors =
      object.waypointAnchors?.map((e) => WaypointAnchorHint.fromPartial(e)) ||
      [];
    message.worldObjects =
      object.worldObjects?.map((e) => WorldObjectAnchorHint.fromPartial(e)) ||
      [];
    return message;
  },
};

function createBaseProcessAnchoringRequest(): ProcessAnchoringRequest {
  return {
    header: undefined,
    params: undefined,
    initialHint: undefined,
    modifyAnchoringOnServer: false,
    streamIntermediateResults: false,
  };
}

export const ProcessAnchoringRequest = {
  encode(
    message: ProcessAnchoringRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.params !== undefined) {
      ProcessAnchoringRequest_Params.encode(
        message.params,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.initialHint !== undefined) {
      AnchoringHint.encode(
        message.initialHint,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.modifyAnchoringOnServer === true) {
      writer.uint32(32).bool(message.modifyAnchoringOnServer);
    }
    if (message.streamIntermediateResults === true) {
      writer.uint32(40).bool(message.streamIntermediateResults);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ProcessAnchoringRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProcessAnchoringRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.params = ProcessAnchoringRequest_Params.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.initialHint = AnchoringHint.decode(reader, reader.uint32());
          break;
        case 4:
          message.modifyAnchoringOnServer = reader.bool();
          break;
        case 5:
          message.streamIntermediateResults = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProcessAnchoringRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      params: isSet(object.params)
        ? ProcessAnchoringRequest_Params.fromJSON(object.params)
        : undefined,
      initialHint: isSet(object.initialHint)
        ? AnchoringHint.fromJSON(object.initialHint)
        : undefined,
      modifyAnchoringOnServer: isSet(object.modifyAnchoringOnServer)
        ? Boolean(object.modifyAnchoringOnServer)
        : false,
      streamIntermediateResults: isSet(object.streamIntermediateResults)
        ? Boolean(object.streamIntermediateResults)
        : false,
    };
  },

  toJSON(message: ProcessAnchoringRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.params !== undefined &&
      (obj.params = message.params
        ? ProcessAnchoringRequest_Params.toJSON(message.params)
        : undefined);
    message.initialHint !== undefined &&
      (obj.initialHint = message.initialHint
        ? AnchoringHint.toJSON(message.initialHint)
        : undefined);
    message.modifyAnchoringOnServer !== undefined &&
      (obj.modifyAnchoringOnServer = message.modifyAnchoringOnServer);
    message.streamIntermediateResults !== undefined &&
      (obj.streamIntermediateResults = message.streamIntermediateResults);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ProcessAnchoringRequest>, I>>(
    object: I
  ): ProcessAnchoringRequest {
    const message = createBaseProcessAnchoringRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.params =
      object.params !== undefined && object.params !== null
        ? ProcessAnchoringRequest_Params.fromPartial(object.params)
        : undefined;
    message.initialHint =
      object.initialHint !== undefined && object.initialHint !== null
        ? AnchoringHint.fromPartial(object.initialHint)
        : undefined;
    message.modifyAnchoringOnServer = object.modifyAnchoringOnServer ?? false;
    message.streamIntermediateResults =
      object.streamIntermediateResults ?? false;
    return message;
  },
};

function createBaseProcessAnchoringRequest_Params(): ProcessAnchoringRequest_Params {
  return {
    optimizerParams: undefined,
    measurementParams: undefined,
    weights: undefined,
    optimizeExistingAnchoring: undefined,
    gravityEwrtSeed: undefined,
  };
}

export const ProcessAnchoringRequest_Params = {
  encode(
    message: ProcessAnchoringRequest_Params,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.optimizerParams !== undefined) {
      ProcessAnchoringRequest_Params_OptimizerParams.encode(
        message.optimizerParams,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.measurementParams !== undefined) {
      ProcessAnchoringRequest_Params_MeasurementParams.encode(
        message.measurementParams,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.weights !== undefined) {
      ProcessAnchoringRequest_Params_Weights.encode(
        message.weights,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.optimizeExistingAnchoring !== undefined) {
      BoolValue.encode(
        { value: message.optimizeExistingAnchoring! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.gravityEwrtSeed !== undefined) {
      Vec3.encode(message.gravityEwrtSeed, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ProcessAnchoringRequest_Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProcessAnchoringRequest_Params();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.optimizerParams =
            ProcessAnchoringRequest_Params_OptimizerParams.decode(
              reader,
              reader.uint32()
            );
          break;
        case 2:
          message.measurementParams =
            ProcessAnchoringRequest_Params_MeasurementParams.decode(
              reader,
              reader.uint32()
            );
          break;
        case 3:
          message.weights = ProcessAnchoringRequest_Params_Weights.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.optimizeExistingAnchoring = BoolValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 5:
          message.gravityEwrtSeed = Vec3.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProcessAnchoringRequest_Params {
    return {
      optimizerParams: isSet(object.optimizerParams)
        ? ProcessAnchoringRequest_Params_OptimizerParams.fromJSON(
            object.optimizerParams
          )
        : undefined,
      measurementParams: isSet(object.measurementParams)
        ? ProcessAnchoringRequest_Params_MeasurementParams.fromJSON(
            object.measurementParams
          )
        : undefined,
      weights: isSet(object.weights)
        ? ProcessAnchoringRequest_Params_Weights.fromJSON(object.weights)
        : undefined,
      optimizeExistingAnchoring: isSet(object.optimizeExistingAnchoring)
        ? Boolean(object.optimizeExistingAnchoring)
        : undefined,
      gravityEwrtSeed: isSet(object.gravityEwrtSeed)
        ? Vec3.fromJSON(object.gravityEwrtSeed)
        : undefined,
    };
  },

  toJSON(message: ProcessAnchoringRequest_Params): unknown {
    const obj: any = {};
    message.optimizerParams !== undefined &&
      (obj.optimizerParams = message.optimizerParams
        ? ProcessAnchoringRequest_Params_OptimizerParams.toJSON(
            message.optimizerParams
          )
        : undefined);
    message.measurementParams !== undefined &&
      (obj.measurementParams = message.measurementParams
        ? ProcessAnchoringRequest_Params_MeasurementParams.toJSON(
            message.measurementParams
          )
        : undefined);
    message.weights !== undefined &&
      (obj.weights = message.weights
        ? ProcessAnchoringRequest_Params_Weights.toJSON(message.weights)
        : undefined);
    message.optimizeExistingAnchoring !== undefined &&
      (obj.optimizeExistingAnchoring = message.optimizeExistingAnchoring);
    message.gravityEwrtSeed !== undefined &&
      (obj.gravityEwrtSeed = message.gravityEwrtSeed
        ? Vec3.toJSON(message.gravityEwrtSeed)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ProcessAnchoringRequest_Params>, I>>(
    object: I
  ): ProcessAnchoringRequest_Params {
    const message = createBaseProcessAnchoringRequest_Params();
    message.optimizerParams =
      object.optimizerParams !== undefined && object.optimizerParams !== null
        ? ProcessAnchoringRequest_Params_OptimizerParams.fromPartial(
            object.optimizerParams
          )
        : undefined;
    message.measurementParams =
      object.measurementParams !== undefined &&
      object.measurementParams !== null
        ? ProcessAnchoringRequest_Params_MeasurementParams.fromPartial(
            object.measurementParams
          )
        : undefined;
    message.weights =
      object.weights !== undefined && object.weights !== null
        ? ProcessAnchoringRequest_Params_Weights.fromPartial(object.weights)
        : undefined;
    message.optimizeExistingAnchoring =
      object.optimizeExistingAnchoring ?? undefined;
    message.gravityEwrtSeed =
      object.gravityEwrtSeed !== undefined && object.gravityEwrtSeed !== null
        ? Vec3.fromPartial(object.gravityEwrtSeed)
        : undefined;
    return message;
  },
};

function createBaseProcessAnchoringRequest_Params_OptimizerParams(): ProcessAnchoringRequest_Params_OptimizerParams {
  return { maxIters: undefined, maxTimeSeconds: undefined };
}

export const ProcessAnchoringRequest_Params_OptimizerParams = {
  encode(
    message: ProcessAnchoringRequest_Params_OptimizerParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.maxIters !== undefined) {
      Int32Value.encode(
        { value: message.maxIters! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.maxTimeSeconds !== undefined) {
      DoubleValue.encode(
        { value: message.maxTimeSeconds! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ProcessAnchoringRequest_Params_OptimizerParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProcessAnchoringRequest_Params_OptimizerParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.maxIters = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.maxTimeSeconds = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProcessAnchoringRequest_Params_OptimizerParams {
    return {
      maxIters: isSet(object.maxIters) ? Number(object.maxIters) : undefined,
      maxTimeSeconds: isSet(object.maxTimeSeconds)
        ? Number(object.maxTimeSeconds)
        : undefined,
    };
  },

  toJSON(message: ProcessAnchoringRequest_Params_OptimizerParams): unknown {
    const obj: any = {};
    message.maxIters !== undefined && (obj.maxIters = message.maxIters);
    message.maxTimeSeconds !== undefined &&
      (obj.maxTimeSeconds = message.maxTimeSeconds);
    return obj;
  },

  fromPartial<
    I extends Exact<
      DeepPartial<ProcessAnchoringRequest_Params_OptimizerParams>,
      I
    >
  >(object: I): ProcessAnchoringRequest_Params_OptimizerParams {
    const message = createBaseProcessAnchoringRequest_Params_OptimizerParams();
    message.maxIters = object.maxIters ?? undefined;
    message.maxTimeSeconds = object.maxTimeSeconds ?? undefined;
    return message;
  },
};

function createBaseProcessAnchoringRequest_Params_MeasurementParams(): ProcessAnchoringRequest_Params_MeasurementParams {
  return {
    useKinematicOdometry: undefined,
    useVisualOdometry: undefined,
    useGyroscopeMeasurements: undefined,
    useLoopClosures: undefined,
    useWorldObjects: undefined,
  };
}

export const ProcessAnchoringRequest_Params_MeasurementParams = {
  encode(
    message: ProcessAnchoringRequest_Params_MeasurementParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.useKinematicOdometry !== undefined) {
      BoolValue.encode(
        { value: message.useKinematicOdometry! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.useVisualOdometry !== undefined) {
      BoolValue.encode(
        { value: message.useVisualOdometry! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.useGyroscopeMeasurements !== undefined) {
      BoolValue.encode(
        { value: message.useGyroscopeMeasurements! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.useLoopClosures !== undefined) {
      BoolValue.encode(
        { value: message.useLoopClosures! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.useWorldObjects !== undefined) {
      BoolValue.encode(
        { value: message.useWorldObjects! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ProcessAnchoringRequest_Params_MeasurementParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message =
      createBaseProcessAnchoringRequest_Params_MeasurementParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.useKinematicOdometry = BoolValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 2:
          message.useVisualOdometry = BoolValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 3:
          message.useGyroscopeMeasurements = BoolValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 4:
          message.useLoopClosures = BoolValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 5:
          message.useWorldObjects = BoolValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProcessAnchoringRequest_Params_MeasurementParams {
    return {
      useKinematicOdometry: isSet(object.useKinematicOdometry)
        ? Boolean(object.useKinematicOdometry)
        : undefined,
      useVisualOdometry: isSet(object.useVisualOdometry)
        ? Boolean(object.useVisualOdometry)
        : undefined,
      useGyroscopeMeasurements: isSet(object.useGyroscopeMeasurements)
        ? Boolean(object.useGyroscopeMeasurements)
        : undefined,
      useLoopClosures: isSet(object.useLoopClosures)
        ? Boolean(object.useLoopClosures)
        : undefined,
      useWorldObjects: isSet(object.useWorldObjects)
        ? Boolean(object.useWorldObjects)
        : undefined,
    };
  },

  toJSON(message: ProcessAnchoringRequest_Params_MeasurementParams): unknown {
    const obj: any = {};
    message.useKinematicOdometry !== undefined &&
      (obj.useKinematicOdometry = message.useKinematicOdometry);
    message.useVisualOdometry !== undefined &&
      (obj.useVisualOdometry = message.useVisualOdometry);
    message.useGyroscopeMeasurements !== undefined &&
      (obj.useGyroscopeMeasurements = message.useGyroscopeMeasurements);
    message.useLoopClosures !== undefined &&
      (obj.useLoopClosures = message.useLoopClosures);
    message.useWorldObjects !== undefined &&
      (obj.useWorldObjects = message.useWorldObjects);
    return obj;
  },

  fromPartial<
    I extends Exact<
      DeepPartial<ProcessAnchoringRequest_Params_MeasurementParams>,
      I
    >
  >(object: I): ProcessAnchoringRequest_Params_MeasurementParams {
    const message =
      createBaseProcessAnchoringRequest_Params_MeasurementParams();
    message.useKinematicOdometry = object.useKinematicOdometry ?? undefined;
    message.useVisualOdometry = object.useVisualOdometry ?? undefined;
    message.useGyroscopeMeasurements =
      object.useGyroscopeMeasurements ?? undefined;
    message.useLoopClosures = object.useLoopClosures ?? undefined;
    message.useWorldObjects = object.useWorldObjects ?? undefined;
    return message;
  },
};

function createBaseProcessAnchoringRequest_Params_Weights(): ProcessAnchoringRequest_Params_Weights {
  return {
    kinematicOdometryWeight: 0,
    visualOdometryWeight: 0,
    worldObjectWeight: 0,
    hintWeight: 0,
    gyroscopeWeight: 0,
    loopClosureWeight: 0,
  };
}

export const ProcessAnchoringRequest_Params_Weights = {
  encode(
    message: ProcessAnchoringRequest_Params_Weights,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.kinematicOdometryWeight !== 0) {
      writer.uint32(9).double(message.kinematicOdometryWeight);
    }
    if (message.visualOdometryWeight !== 0) {
      writer.uint32(17).double(message.visualOdometryWeight);
    }
    if (message.worldObjectWeight !== 0) {
      writer.uint32(25).double(message.worldObjectWeight);
    }
    if (message.hintWeight !== 0) {
      writer.uint32(33).double(message.hintWeight);
    }
    if (message.gyroscopeWeight !== 0) {
      writer.uint32(41).double(message.gyroscopeWeight);
    }
    if (message.loopClosureWeight !== 0) {
      writer.uint32(49).double(message.loopClosureWeight);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ProcessAnchoringRequest_Params_Weights {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProcessAnchoringRequest_Params_Weights();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.kinematicOdometryWeight = reader.double();
          break;
        case 2:
          message.visualOdometryWeight = reader.double();
          break;
        case 3:
          message.worldObjectWeight = reader.double();
          break;
        case 4:
          message.hintWeight = reader.double();
          break;
        case 5:
          message.gyroscopeWeight = reader.double();
          break;
        case 6:
          message.loopClosureWeight = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProcessAnchoringRequest_Params_Weights {
    return {
      kinematicOdometryWeight: isSet(object.kinematicOdometryWeight)
        ? Number(object.kinematicOdometryWeight)
        : 0,
      visualOdometryWeight: isSet(object.visualOdometryWeight)
        ? Number(object.visualOdometryWeight)
        : 0,
      worldObjectWeight: isSet(object.worldObjectWeight)
        ? Number(object.worldObjectWeight)
        : 0,
      hintWeight: isSet(object.hintWeight) ? Number(object.hintWeight) : 0,
      gyroscopeWeight: isSet(object.gyroscopeWeight)
        ? Number(object.gyroscopeWeight)
        : 0,
      loopClosureWeight: isSet(object.loopClosureWeight)
        ? Number(object.loopClosureWeight)
        : 0,
    };
  },

  toJSON(message: ProcessAnchoringRequest_Params_Weights): unknown {
    const obj: any = {};
    message.kinematicOdometryWeight !== undefined &&
      (obj.kinematicOdometryWeight = message.kinematicOdometryWeight);
    message.visualOdometryWeight !== undefined &&
      (obj.visualOdometryWeight = message.visualOdometryWeight);
    message.worldObjectWeight !== undefined &&
      (obj.worldObjectWeight = message.worldObjectWeight);
    message.hintWeight !== undefined && (obj.hintWeight = message.hintWeight);
    message.gyroscopeWeight !== undefined &&
      (obj.gyroscopeWeight = message.gyroscopeWeight);
    message.loopClosureWeight !== undefined &&
      (obj.loopClosureWeight = message.loopClosureWeight);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<ProcessAnchoringRequest_Params_Weights>, I>
  >(object: I): ProcessAnchoringRequest_Params_Weights {
    const message = createBaseProcessAnchoringRequest_Params_Weights();
    message.kinematicOdometryWeight = object.kinematicOdometryWeight ?? 0;
    message.visualOdometryWeight = object.visualOdometryWeight ?? 0;
    message.worldObjectWeight = object.worldObjectWeight ?? 0;
    message.hintWeight = object.hintWeight ?? 0;
    message.gyroscopeWeight = object.gyroscopeWeight ?? 0;
    message.loopClosureWeight = object.loopClosureWeight ?? 0;
    return message;
  },
};

function createBaseProcessAnchoringResponse(): ProcessAnchoringResponse {
  return {
    header: undefined,
    status: 0,
    waypointResults: [],
    worldObjectResults: [],
    anchoringOnServerWasModified: false,
    iteration: 0,
    cost: 0,
    finalIteration: false,
    violatedWaypointConstraints: [],
    violatedObjectConstraints: [],
    missingSnapshotIds: [],
    missingWaypointIds: [],
    invalidHints: [],
  };
}

export const ProcessAnchoringResponse = {
  encode(
    message: ProcessAnchoringResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    for (const v of message.waypointResults) {
      Anchor.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.worldObjectResults) {
      AnchoredWorldObject.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.anchoringOnServerWasModified === true) {
      writer.uint32(40).bool(message.anchoringOnServerWasModified);
    }
    if (message.iteration !== 0) {
      writer.uint32(48).int32(message.iteration);
    }
    if (message.cost !== 0) {
      writer.uint32(57).double(message.cost);
    }
    if (message.finalIteration === true) {
      writer.uint32(64).bool(message.finalIteration);
    }
    for (const v of message.violatedWaypointConstraints) {
      WaypointAnchorHint.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    for (const v of message.violatedObjectConstraints) {
      WorldObjectAnchorHint.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    for (const v of message.missingSnapshotIds) {
      writer.uint32(90).string(v!);
    }
    for (const v of message.missingWaypointIds) {
      writer.uint32(98).string(v!);
    }
    for (const v of message.invalidHints) {
      writer.uint32(106).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ProcessAnchoringResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProcessAnchoringResponse();
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
          message.waypointResults.push(Anchor.decode(reader, reader.uint32()));
          break;
        case 4:
          message.worldObjectResults.push(
            AnchoredWorldObject.decode(reader, reader.uint32())
          );
          break;
        case 5:
          message.anchoringOnServerWasModified = reader.bool();
          break;
        case 6:
          message.iteration = reader.int32();
          break;
        case 7:
          message.cost = reader.double();
          break;
        case 8:
          message.finalIteration = reader.bool();
          break;
        case 9:
          message.violatedWaypointConstraints.push(
            WaypointAnchorHint.decode(reader, reader.uint32())
          );
          break;
        case 10:
          message.violatedObjectConstraints.push(
            WorldObjectAnchorHint.decode(reader, reader.uint32())
          );
          break;
        case 11:
          message.missingSnapshotIds.push(reader.string());
          break;
        case 12:
          message.missingWaypointIds.push(reader.string());
          break;
        case 13:
          message.invalidHints.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProcessAnchoringResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? processAnchoringResponse_StatusFromJSON(object.status)
        : 0,
      waypointResults: Array.isArray(object?.waypointResults)
        ? object.waypointResults.map((e: any) => Anchor.fromJSON(e))
        : [],
      worldObjectResults: Array.isArray(object?.worldObjectResults)
        ? object.worldObjectResults.map((e: any) =>
            AnchoredWorldObject.fromJSON(e)
          )
        : [],
      anchoringOnServerWasModified: isSet(object.anchoringOnServerWasModified)
        ? Boolean(object.anchoringOnServerWasModified)
        : false,
      iteration: isSet(object.iteration) ? Number(object.iteration) : 0,
      cost: isSet(object.cost) ? Number(object.cost) : 0,
      finalIteration: isSet(object.finalIteration)
        ? Boolean(object.finalIteration)
        : false,
      violatedWaypointConstraints: Array.isArray(
        object?.violatedWaypointConstraints
      )
        ? object.violatedWaypointConstraints.map((e: any) =>
            WaypointAnchorHint.fromJSON(e)
          )
        : [],
      violatedObjectConstraints: Array.isArray(
        object?.violatedObjectConstraints
      )
        ? object.violatedObjectConstraints.map((e: any) =>
            WorldObjectAnchorHint.fromJSON(e)
          )
        : [],
      missingSnapshotIds: Array.isArray(object?.missingSnapshotIds)
        ? object.missingSnapshotIds.map((e: any) => String(e))
        : [],
      missingWaypointIds: Array.isArray(object?.missingWaypointIds)
        ? object.missingWaypointIds.map((e: any) => String(e))
        : [],
      invalidHints: Array.isArray(object?.invalidHints)
        ? object.invalidHints.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: ProcessAnchoringResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = processAnchoringResponse_StatusToJSON(message.status));
    if (message.waypointResults) {
      obj.waypointResults = message.waypointResults.map((e) =>
        e ? Anchor.toJSON(e) : undefined
      );
    } else {
      obj.waypointResults = [];
    }
    if (message.worldObjectResults) {
      obj.worldObjectResults = message.worldObjectResults.map((e) =>
        e ? AnchoredWorldObject.toJSON(e) : undefined
      );
    } else {
      obj.worldObjectResults = [];
    }
    message.anchoringOnServerWasModified !== undefined &&
      (obj.anchoringOnServerWasModified = message.anchoringOnServerWasModified);
    message.iteration !== undefined &&
      (obj.iteration = Math.round(message.iteration));
    message.cost !== undefined && (obj.cost = message.cost);
    message.finalIteration !== undefined &&
      (obj.finalIteration = message.finalIteration);
    if (message.violatedWaypointConstraints) {
      obj.violatedWaypointConstraints = message.violatedWaypointConstraints.map(
        (e) => (e ? WaypointAnchorHint.toJSON(e) : undefined)
      );
    } else {
      obj.violatedWaypointConstraints = [];
    }
    if (message.violatedObjectConstraints) {
      obj.violatedObjectConstraints = message.violatedObjectConstraints.map(
        (e) => (e ? WorldObjectAnchorHint.toJSON(e) : undefined)
      );
    } else {
      obj.violatedObjectConstraints = [];
    }
    if (message.missingSnapshotIds) {
      obj.missingSnapshotIds = message.missingSnapshotIds.map((e) => e);
    } else {
      obj.missingSnapshotIds = [];
    }
    if (message.missingWaypointIds) {
      obj.missingWaypointIds = message.missingWaypointIds.map((e) => e);
    } else {
      obj.missingWaypointIds = [];
    }
    if (message.invalidHints) {
      obj.invalidHints = message.invalidHints.map((e) => e);
    } else {
      obj.invalidHints = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ProcessAnchoringResponse>, I>>(
    object: I
  ): ProcessAnchoringResponse {
    const message = createBaseProcessAnchoringResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    message.waypointResults =
      object.waypointResults?.map((e) => Anchor.fromPartial(e)) || [];
    message.worldObjectResults =
      object.worldObjectResults?.map((e) =>
        AnchoredWorldObject.fromPartial(e)
      ) || [];
    message.anchoringOnServerWasModified =
      object.anchoringOnServerWasModified ?? false;
    message.iteration = object.iteration ?? 0;
    message.cost = object.cost ?? 0;
    message.finalIteration = object.finalIteration ?? false;
    message.violatedWaypointConstraints =
      object.violatedWaypointConstraints?.map((e) =>
        WaypointAnchorHint.fromPartial(e)
      ) || [];
    message.violatedObjectConstraints =
      object.violatedObjectConstraints?.map((e) =>
        WorldObjectAnchorHint.fromPartial(e)
      ) || [];
    message.missingSnapshotIds = object.missingSnapshotIds?.map((e) => e) || [];
    message.missingWaypointIds = object.missingWaypointIds?.map((e) => e) || [];
    message.invalidHints = object.invalidHints?.map((e) => e) || [];
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
