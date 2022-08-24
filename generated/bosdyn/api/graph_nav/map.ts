/* eslint-disable */
import { Timestamp } from "../../../google/protobuf/timestamp";
import { SE3Pose, SE3Covariance, SE2VelocityLimit } from "../geometry";
import { ImageResponse } from "../image";
import { PointCloud } from "../point_cloud";
import { WorldObject } from "../world_object";
import { RobotState, FootState } from "../robot_state";
import { LocalGrid } from "../local_grid";
import { Payload } from "../payload";
import { MobilityParams } from "../spot/robot_command";
import { StraightStaircase } from "../stairs";
import _m0 from "protobufjs/minimal";
import { BoolValue, DoubleValue } from "../../../google/protobuf/wrappers";
import { FieldMask } from "../../../google/protobuf/field_mask";

export const protobufPackage = "bosdyn.api.graph_nav";

/** Indicator of whether or not the waypoint and edge annotations are complete and filled out. */
export enum AnnotationState {
  /** ANNOTATION_STATE_UNKNOWN - No assertions made about this annotation. */
  ANNOTATION_STATE_UNKNOWN = 0,
  /** ANNOTATION_STATE_SET - This annotation and all of its fields have been deliberately set. */
  ANNOTATION_STATE_SET = 1,
  /** ANNOTATION_STATE_NONE - This annotation has been deliberately set to "no annotation" -- any subfields are unset. */
  ANNOTATION_STATE_NONE = 2,
  UNRECOGNIZED = -1,
}

export function annotationStateFromJSON(object: any): AnnotationState {
  switch (object) {
    case 0:
    case "ANNOTATION_STATE_UNKNOWN":
      return AnnotationState.ANNOTATION_STATE_UNKNOWN;
    case 1:
    case "ANNOTATION_STATE_SET":
      return AnnotationState.ANNOTATION_STATE_SET;
    case 2:
    case "ANNOTATION_STATE_NONE":
      return AnnotationState.ANNOTATION_STATE_NONE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AnnotationState.UNRECOGNIZED;
  }
}

export function annotationStateToJSON(object: AnnotationState): string {
  switch (object) {
    case AnnotationState.ANNOTATION_STATE_UNKNOWN:
      return "ANNOTATION_STATE_UNKNOWN";
    case AnnotationState.ANNOTATION_STATE_SET:
      return "ANNOTATION_STATE_SET";
    case AnnotationState.ANNOTATION_STATE_NONE:
      return "ANNOTATION_STATE_NONE";
    case AnnotationState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * A base element of the graph nav map. A waypoint consists of a reference frame, a name,
 * a unique ID, annotations, and sensor data.
 */
export interface Waypoint {
  /**
   * Identifier of the waypoint. Unique across all maps.
   * This identifier does not have to be updated when its fields change.
   */
  id: string;
  /** Identifier of this waypoint's Snapshot data. */
  snapshotId: string;
  /** Transform from the KO frame (at time of recording) to the waypoint. */
  waypointTformKo: SE3Pose | undefined;
  /** Annotations specific to the current waypoint. */
  annotations: Waypoint_Annotations | undefined;
}

export enum Waypoint_WaypointSource {
  WAYPOINT_SOURCE_UNKNOWN = 0,
  /** WAYPOINT_SOURCE_ROBOT_PATH - Waypoints from the robot's location during recording. */
  WAYPOINT_SOURCE_ROBOT_PATH = 1,
  /** WAYPOINT_SOURCE_USER_REQUEST - Waypoints with user-requested placement. */
  WAYPOINT_SOURCE_USER_REQUEST = 2,
  /** WAYPOINT_SOURCE_ALTERNATE_ROUTE_FINDING - Waypoints that may help find alternate routes. */
  WAYPOINT_SOURCE_ALTERNATE_ROUTE_FINDING = 3,
  UNRECOGNIZED = -1,
}

export function waypoint_WaypointSourceFromJSON(
  object: any
): Waypoint_WaypointSource {
  switch (object) {
    case 0:
    case "WAYPOINT_SOURCE_UNKNOWN":
      return Waypoint_WaypointSource.WAYPOINT_SOURCE_UNKNOWN;
    case 1:
    case "WAYPOINT_SOURCE_ROBOT_PATH":
      return Waypoint_WaypointSource.WAYPOINT_SOURCE_ROBOT_PATH;
    case 2:
    case "WAYPOINT_SOURCE_USER_REQUEST":
      return Waypoint_WaypointSource.WAYPOINT_SOURCE_USER_REQUEST;
    case 3:
    case "WAYPOINT_SOURCE_ALTERNATE_ROUTE_FINDING":
      return Waypoint_WaypointSource.WAYPOINT_SOURCE_ALTERNATE_ROUTE_FINDING;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Waypoint_WaypointSource.UNRECOGNIZED;
  }
}

export function waypoint_WaypointSourceToJSON(
  object: Waypoint_WaypointSource
): string {
  switch (object) {
    case Waypoint_WaypointSource.WAYPOINT_SOURCE_UNKNOWN:
      return "WAYPOINT_SOURCE_UNKNOWN";
    case Waypoint_WaypointSource.WAYPOINT_SOURCE_ROBOT_PATH:
      return "WAYPOINT_SOURCE_ROBOT_PATH";
    case Waypoint_WaypointSource.WAYPOINT_SOURCE_USER_REQUEST:
      return "WAYPOINT_SOURCE_USER_REQUEST";
    case Waypoint_WaypointSource.WAYPOINT_SOURCE_ALTERNATE_ROUTE_FINDING:
      return "WAYPOINT_SOURCE_ALTERNATE_ROUTE_FINDING";
    case Waypoint_WaypointSource.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Annotations understood by BostonDynamics systems. */
export interface Waypoint_Annotations {
  /** Human-friendly name of the waypoint. For example, "Kitchen Fridge" */
  name: string;
  /** The time that the waypoint was created while recording a map. */
  creationTime: Date | undefined;
  /** Estimate of the variance of ICP when performed at this waypoint, collected at record time. */
  icpVariance: SE3Covariance | undefined;
  /** Options for how to localize to a waypoint (if at all). */
  scanMatchRegion: Waypoint_Annotations_LocalizeRegion | undefined;
  /** How this waypoint was made. */
  waypointSource: Waypoint_WaypointSource;
}

export interface Waypoint_Annotations_LocalizeRegion {
  /** Check this before reading other fields. */
  state: AnnotationState;
  /** Oneof field that describes the waypoint's location as a default region (no special features/traits). */
  defaultRegion: Waypoint_Annotations_LocalizeRegion_Default | undefined;
  /** Oneof field that describes the waypoint's location as a empty/featureless region. */
  empty: Waypoint_Annotations_LocalizeRegion_Empty | undefined;
  /** Oneof field that describes the waypoint's location as a circular region. */
  circle: Waypoint_Annotations_LocalizeRegion_Circle2D | undefined;
}

/** Use the default region to localize in. */
export interface Waypoint_Annotations_LocalizeRegion_Default {}

/** Do not localize to this waypoint. */
export interface Waypoint_Annotations_LocalizeRegion_Empty {}

/**
 * Indicates the number of meters away we can be from this waypoint we can be before scan
 * matching.
 * - If zero, the default value is used.
 * - If less than zero, no scan matching will be performed at this waypoint.
 * - If greater than zero, scan matching will only be performed if the robot is at most this
 *   far away from the waypoint.
 * Distance calculation is done in the 2d plane with respect to the waypoint.
 */
export interface Waypoint_Annotations_LocalizeRegion_Circle2D {
  /** meters. */
  dist2d: number;
}

/**
 * Relevant data collected at the waypoint.
 * May be used for localization or automatically generating annotations, for example.
 * Should be indexed by a waypoint's "snapshot_id" field.
 */
export interface WaypointSnapshot {
  /**
   * Identifier of this snapshot.
   * Snapshots are immutable -- if any of the other fields change, this ID must also change.
   */
  id: string;
  /** Any images captured at the waypoint. */
  images: ImageResponse[];
  /** Aggregated point cloud data. */
  pointCloud: PointCloud | undefined;
  /** Perception objects seen at snapshot time. */
  objects: WorldObject[];
  /** Full robot state during snapshot. */
  robotState: RobotState | undefined;
  /** Robot grid data. */
  robotLocalGrids: LocalGrid[];
  /** If true, the point cloud of this snapshot has been processed. */
  isPointCloudProcessed: boolean;
  /**
   * If this snapshot is a modified version of the raw snapshot with the given ID (for example, it has been processed),
   * a new unique ID will we assigned to this field. If the field is empty, this is the raw version of the snapshot.
   */
  versionId: string;
  /**
   * If true, the point cloud contains data from a remote point cloud service,
   * such as LIDAR.
   */
  hasRemotePointCloudSensor: boolean;
  /**
   * Transform from the robot body to the remote point cloud sensor's
   * reference frame.
   */
  bodyTformRemotePointCloudSensor: SE3Pose | undefined;
  /** Defines the payloads attached to the robot at this waypoint. */
  payloads: Payload[];
}

/**
 * A base element of the graph nav map. Edges consist of a directed edge from one
 * waypoint to another and a transform that estimates the relationship in 3D space
 * between the two waypoints.
 */
export interface Edge {
  /**
   * Identifier of this Edge.
   * Edges are mutable -- the identifier does not have to be updated when other fields change.
   */
  id: Edge_Id | undefined;
  /** Identifier of this edge's Snapshot data. */
  snapshotId: string;
  /** Describes the transform between the "from" waypoint and the "to" waypoint. */
  fromTformTo: SE3Pose | undefined;
  /** Annotations specific to the current edge. */
  annotations: Edge_Annotations | undefined;
}

export enum Edge_EdgeSource {
  EDGE_SOURCE_UNKNOWN = 0,
  /** EDGE_SOURCE_ODOMETRY - Edges with transforms from odometry. */
  EDGE_SOURCE_ODOMETRY = 1,
  /** EDGE_SOURCE_SMALL_LOOP_CLOSURE - Edges with transforms from a short chain of other edges. */
  EDGE_SOURCE_SMALL_LOOP_CLOSURE = 2,
  /** EDGE_SOURCE_FIDUCIAL_LOOP_CLOSURE - Edges with transforms from multiple fiducial observations. */
  EDGE_SOURCE_FIDUCIAL_LOOP_CLOSURE = 3,
  /** EDGE_SOURCE_ALTERNATE_ROUTE_FINDING - Edges that may help find alternate routes. */
  EDGE_SOURCE_ALTERNATE_ROUTE_FINDING = 4,
  /** EDGE_SOURCE_USER_REQUEST - Created via a CreateEdge RPC. */
  EDGE_SOURCE_USER_REQUEST = 5,
  UNRECOGNIZED = -1,
}

export function edge_EdgeSourceFromJSON(object: any): Edge_EdgeSource {
  switch (object) {
    case 0:
    case "EDGE_SOURCE_UNKNOWN":
      return Edge_EdgeSource.EDGE_SOURCE_UNKNOWN;
    case 1:
    case "EDGE_SOURCE_ODOMETRY":
      return Edge_EdgeSource.EDGE_SOURCE_ODOMETRY;
    case 2:
    case "EDGE_SOURCE_SMALL_LOOP_CLOSURE":
      return Edge_EdgeSource.EDGE_SOURCE_SMALL_LOOP_CLOSURE;
    case 3:
    case "EDGE_SOURCE_FIDUCIAL_LOOP_CLOSURE":
      return Edge_EdgeSource.EDGE_SOURCE_FIDUCIAL_LOOP_CLOSURE;
    case 4:
    case "EDGE_SOURCE_ALTERNATE_ROUTE_FINDING":
      return Edge_EdgeSource.EDGE_SOURCE_ALTERNATE_ROUTE_FINDING;
    case 5:
    case "EDGE_SOURCE_USER_REQUEST":
      return Edge_EdgeSource.EDGE_SOURCE_USER_REQUEST;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Edge_EdgeSource.UNRECOGNIZED;
  }
}

export function edge_EdgeSourceToJSON(object: Edge_EdgeSource): string {
  switch (object) {
    case Edge_EdgeSource.EDGE_SOURCE_UNKNOWN:
      return "EDGE_SOURCE_UNKNOWN";
    case Edge_EdgeSource.EDGE_SOURCE_ODOMETRY:
      return "EDGE_SOURCE_ODOMETRY";
    case Edge_EdgeSource.EDGE_SOURCE_SMALL_LOOP_CLOSURE:
      return "EDGE_SOURCE_SMALL_LOOP_CLOSURE";
    case Edge_EdgeSource.EDGE_SOURCE_FIDUCIAL_LOOP_CLOSURE:
      return "EDGE_SOURCE_FIDUCIAL_LOOP_CLOSURE";
    case Edge_EdgeSource.EDGE_SOURCE_ALTERNATE_ROUTE_FINDING:
      return "EDGE_SOURCE_ALTERNATE_ROUTE_FINDING";
    case Edge_EdgeSource.EDGE_SOURCE_USER_REQUEST:
      return "EDGE_SOURCE_USER_REQUEST";
    case Edge_EdgeSource.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * An edge is uniquely identified by the waypoints it connects.
 * Two waypoints will only ever be connected by a single edge.
 * That edge is traversable in either direction.
 */
export interface Edge_Id {
  /** Identifier of the "from" waypoint. */
  fromWaypoint: string;
  /** Identifier of the "to" waypoint. */
  toWaypoint: string;
}

/** Annotations understood by BostonDynamics systems. */
export interface Edge_Annotations {
  /**
   * Velocity limits to use while traversing the edge.
   * These are maxima and minima, NOT target speeds.
   * NOTE: as of 2.4 this is deprecated. Please use mobility_params.vel_limit.
   *
   * @deprecated
   */
  velLimit: SE2VelocityLimit | undefined;
  /** Stairs information/parameters specific to the edge. */
  stairs: Edge_Annotations_StairData | undefined;
  /**
   * Direction constraints for how the robot must move and the directions it can face
   * when traversing the edge.
   */
  directionConstraint: Edge_Annotations_DirectionConstraint;
  /** If true, the robot must be aligned with the edge in yaw before traversing it. */
  requireAlignment: boolean | undefined;
  /** If true, the edge crosses flat ground and the robot shouldn't try to climb over obstacles. */
  flatGround: boolean | undefined;
  /**
   * Terrain coefficient of friction user hint. This value must be postive and will clamped if
   * necessary on the robot side. Best suggested values lie in the range between 0.4 and 0.8
   * (which is the robot's default.)
   * WARNING: deprecated as of 2.1. Use mobility_params instead, which includes ground_mu_hint
   * as part of the terrain_params.
   *
   * @deprecated
   */
  groundMuHint: number | undefined;
  /**
   * If true, the edge crosses over grated metal. This changes some parameters of the robot's
   * perception system to allow it to see grated floors bettter.
   * WARNING: deprecated as of 2.1. Use mobility_params instead, which includes grated_floor
   * as part of the terrain_params.
   *
   * @deprecated
   */
  gratedFloor: boolean | undefined;
  /**
   * Overrides the following fields of the mobility parameters to whatever is
   * stored in the map. For example, if this FieldMask contains "stair_hint" and
   * "terrain_params.enable_grated_floor", then the map will be
   * annotated with "stair_hint" and "enable_grated_floor" settings. An empty FieldMask means all fields are active
   * annotations. Note that the more conservative of the velocity limit stored in the mobility parameters and the
   * TravelParams of the entire route will be used for this edge (regardless of what override_mobility_params says).
   */
  overrideMobilityParams: string[] | undefined;
  /**
   * Contains terrain parameters, swing height, obstacle avoidance parameters, etc.
   * When the robot crosses this edge, it will use the mobility parameters here.
   */
  mobilityParams: MobilityParams | undefined;
  /** Assign edges a cost; used when finding the "shortest" (lowest cost) path. */
  cost: number | undefined;
  /** How this edge was made. */
  edgeSource: Edge_EdgeSource;
  /** If true, disables alternate-route-finding for this edge. */
  disableAlternateRouteFinding: boolean;
}

export enum Edge_Annotations_DirectionConstraint {
  /** DIRECTION_CONSTRAINT_UNKNOWN - We don't know if there are direction constraints. */
  DIRECTION_CONSTRAINT_UNKNOWN = 0,
  /** DIRECTION_CONSTRAINT_NO_TURN - The robot must not turn while walking the edge, but can face either waypoint. */
  DIRECTION_CONSTRAINT_NO_TURN = 1,
  /** DIRECTION_CONSTRAINT_FORWARD - Robot should walk the edge face-first. */
  DIRECTION_CONSTRAINT_FORWARD = 2,
  /** DIRECTION_CONSTRAINT_REVERSE - Robot should walk the edge rear-first. */
  DIRECTION_CONSTRAINT_REVERSE = 3,
  /** DIRECTION_CONSTRAINT_NONE - No constraints on which way the robot faces. */
  DIRECTION_CONSTRAINT_NONE = 4,
  UNRECOGNIZED = -1,
}

export function edge_Annotations_DirectionConstraintFromJSON(
  object: any
): Edge_Annotations_DirectionConstraint {
  switch (object) {
    case 0:
    case "DIRECTION_CONSTRAINT_UNKNOWN":
      return Edge_Annotations_DirectionConstraint.DIRECTION_CONSTRAINT_UNKNOWN;
    case 1:
    case "DIRECTION_CONSTRAINT_NO_TURN":
      return Edge_Annotations_DirectionConstraint.DIRECTION_CONSTRAINT_NO_TURN;
    case 2:
    case "DIRECTION_CONSTRAINT_FORWARD":
      return Edge_Annotations_DirectionConstraint.DIRECTION_CONSTRAINT_FORWARD;
    case 3:
    case "DIRECTION_CONSTRAINT_REVERSE":
      return Edge_Annotations_DirectionConstraint.DIRECTION_CONSTRAINT_REVERSE;
    case 4:
    case "DIRECTION_CONSTRAINT_NONE":
      return Edge_Annotations_DirectionConstraint.DIRECTION_CONSTRAINT_NONE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Edge_Annotations_DirectionConstraint.UNRECOGNIZED;
  }
}

export function edge_Annotations_DirectionConstraintToJSON(
  object: Edge_Annotations_DirectionConstraint
): string {
  switch (object) {
    case Edge_Annotations_DirectionConstraint.DIRECTION_CONSTRAINT_UNKNOWN:
      return "DIRECTION_CONSTRAINT_UNKNOWN";
    case Edge_Annotations_DirectionConstraint.DIRECTION_CONSTRAINT_NO_TURN:
      return "DIRECTION_CONSTRAINT_NO_TURN";
    case Edge_Annotations_DirectionConstraint.DIRECTION_CONSTRAINT_FORWARD:
      return "DIRECTION_CONSTRAINT_FORWARD";
    case Edge_Annotations_DirectionConstraint.DIRECTION_CONSTRAINT_REVERSE:
      return "DIRECTION_CONSTRAINT_REVERSE";
    case Edge_Annotations_DirectionConstraint.DIRECTION_CONSTRAINT_NONE:
      return "DIRECTION_CONSTRAINT_NONE";
    case Edge_Annotations_DirectionConstraint.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Defines any parameters of the stairs */
export interface Edge_Annotations_StairData {
  /** Check this before reading other fields. */
  state: AnnotationState;
  /** Parameters describing a straight staircase. */
  straightStaircase: StraightStaircase | undefined;
}

/**
 * Relevant data collected along the edge.
 * May be used for automatically generating annotations, for example.
 */
export interface EdgeSnapshot {
  /**
   * Identifier of this snapshot.
   * Snapshots are immutable -- if any of the other fields change, this ID must also change.
   */
  id: string;
  /** Sampling of stances as robot traversed this edge. */
  stances: EdgeSnapshot_Stance[];
}

export interface EdgeSnapshot_Stance {
  /** Timestamp of the stance. */
  timestamp: Date | undefined;
  /** List of all the foot positions for a single stance. */
  footStates: FootState[];
  /** KO Body position corresponding to this stance. */
  koTformBody: SE3Pose | undefined;
  /** Vision Body position corresponding to this stance. */
  visionTformBody: SE3Pose | undefined;
  /** Does this stance correspond to a planar ground region. */
  planarGround: boolean | undefined;
}

/** This associates a waypoint with a common reference frame, which is not necessarily metric. */
export interface Anchor {
  /** Identifier of the waypoint. */
  id: string;
  /** Pose of the waypoint in the seed frame. */
  seedTformWaypoint: SE3Pose | undefined;
}

/** This associates a world object with a common reference frame, which is not necessarily metric. */
export interface AnchoredWorldObject {
  /** Identifier of the world object. */
  id: string;
  /** Pose of the object in the seed frame. */
  seedTformObject: SE3Pose | undefined;
}

export interface Anchoring {
  /**
   * The waypoint ids for the graph, expressed in a common reference frame, which is not
   * necessarily metric. If there is no anchoring, this is empty.
   */
  anchors: Anchor[];
  /** World objects, located in the common reference frame. */
  objects: AnchoredWorldObject[];
}

/**
 * This is an arbitrary collection of waypoints and edges. The edges and waypoints are not required
 * to be connected. A waypoint may belong to multiple graphs. This message is used to pass around
 * information about a graph's topology, and is used to serialize map topology to and from files.
 * Note that the graph does not contain any of the waypoint/edge data (which is found in snapshots).
 * Snapshots are stored separately.
 */
export interface Graph {
  /** The waypoints for the graph (containing frames, annotations, and sensor data). */
  waypoints: Waypoint[];
  /** The edges connecting the graph's waypoints. */
  edges: Edge[];
  /** The anchoring (mapping from waypoints to their pose in a shared reference frame). */
  anchoring: Anchoring | undefined;
}

function createBaseWaypoint(): Waypoint {
  return {
    id: "",
    snapshotId: "",
    waypointTformKo: undefined,
    annotations: undefined,
  };
}

export const Waypoint = {
  encode(
    message: Waypoint,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.snapshotId !== "") {
      writer.uint32(18).string(message.snapshotId);
    }
    if (message.waypointTformKo !== undefined) {
      SE3Pose.encode(
        message.waypointTformKo,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.annotations !== undefined) {
      Waypoint_Annotations.encode(
        message.annotations,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Waypoint {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWaypoint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.snapshotId = reader.string();
          break;
        case 3:
          message.waypointTformKo = SE3Pose.decode(reader, reader.uint32());
          break;
        case 4:
          message.annotations = Waypoint_Annotations.decode(
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

  fromJSON(object: any): Waypoint {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      snapshotId: isSet(object.snapshotId) ? String(object.snapshotId) : "",
      waypointTformKo: isSet(object.waypointTformKo)
        ? SE3Pose.fromJSON(object.waypointTformKo)
        : undefined,
      annotations: isSet(object.annotations)
        ? Waypoint_Annotations.fromJSON(object.annotations)
        : undefined,
    };
  },

  toJSON(message: Waypoint): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.snapshotId !== undefined && (obj.snapshotId = message.snapshotId);
    message.waypointTformKo !== undefined &&
      (obj.waypointTformKo = message.waypointTformKo
        ? SE3Pose.toJSON(message.waypointTformKo)
        : undefined);
    message.annotations !== undefined &&
      (obj.annotations = message.annotations
        ? Waypoint_Annotations.toJSON(message.annotations)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Waypoint>, I>>(object: I): Waypoint {
    const message = createBaseWaypoint();
    message.id = object.id ?? "";
    message.snapshotId = object.snapshotId ?? "";
    message.waypointTformKo =
      object.waypointTformKo !== undefined && object.waypointTformKo !== null
        ? SE3Pose.fromPartial(object.waypointTformKo)
        : undefined;
    message.annotations =
      object.annotations !== undefined && object.annotations !== null
        ? Waypoint_Annotations.fromPartial(object.annotations)
        : undefined;
    return message;
  },
};

function createBaseWaypoint_Annotations(): Waypoint_Annotations {
  return {
    name: "",
    creationTime: undefined,
    icpVariance: undefined,
    scanMatchRegion: undefined,
    waypointSource: 0,
  };
}

export const Waypoint_Annotations = {
  encode(
    message: Waypoint_Annotations,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.creationTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.creationTime),
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.icpVariance !== undefined) {
      SE3Covariance.encode(
        message.icpVariance,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.scanMatchRegion !== undefined) {
      Waypoint_Annotations_LocalizeRegion.encode(
        message.scanMatchRegion,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.waypointSource !== 0) {
      writer.uint32(40).int32(message.waypointSource);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): Waypoint_Annotations {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWaypoint_Annotations();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 4:
          message.creationTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.icpVariance = SE3Covariance.decode(reader, reader.uint32());
          break;
        case 3:
          message.scanMatchRegion = Waypoint_Annotations_LocalizeRegion.decode(
            reader,
            reader.uint32()
          );
          break;
        case 5:
          message.waypointSource = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Waypoint_Annotations {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      creationTime: isSet(object.creationTime)
        ? fromJsonTimestamp(object.creationTime)
        : undefined,
      icpVariance: isSet(object.icpVariance)
        ? SE3Covariance.fromJSON(object.icpVariance)
        : undefined,
      scanMatchRegion: isSet(object.scanMatchRegion)
        ? Waypoint_Annotations_LocalizeRegion.fromJSON(object.scanMatchRegion)
        : undefined,
      waypointSource: isSet(object.waypointSource)
        ? waypoint_WaypointSourceFromJSON(object.waypointSource)
        : 0,
    };
  },

  toJSON(message: Waypoint_Annotations): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.creationTime !== undefined &&
      (obj.creationTime = message.creationTime.toISOString());
    message.icpVariance !== undefined &&
      (obj.icpVariance = message.icpVariance
        ? SE3Covariance.toJSON(message.icpVariance)
        : undefined);
    message.scanMatchRegion !== undefined &&
      (obj.scanMatchRegion = message.scanMatchRegion
        ? Waypoint_Annotations_LocalizeRegion.toJSON(message.scanMatchRegion)
        : undefined);
    message.waypointSource !== undefined &&
      (obj.waypointSource = waypoint_WaypointSourceToJSON(
        message.waypointSource
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Waypoint_Annotations>, I>>(
    object: I
  ): Waypoint_Annotations {
    const message = createBaseWaypoint_Annotations();
    message.name = object.name ?? "";
    message.creationTime = object.creationTime ?? undefined;
    message.icpVariance =
      object.icpVariance !== undefined && object.icpVariance !== null
        ? SE3Covariance.fromPartial(object.icpVariance)
        : undefined;
    message.scanMatchRegion =
      object.scanMatchRegion !== undefined && object.scanMatchRegion !== null
        ? Waypoint_Annotations_LocalizeRegion.fromPartial(
            object.scanMatchRegion
          )
        : undefined;
    message.waypointSource = object.waypointSource ?? 0;
    return message;
  },
};

function createBaseWaypoint_Annotations_LocalizeRegion(): Waypoint_Annotations_LocalizeRegion {
  return {
    state: 0,
    defaultRegion: undefined,
    empty: undefined,
    circle: undefined,
  };
}

export const Waypoint_Annotations_LocalizeRegion = {
  encode(
    message: Waypoint_Annotations_LocalizeRegion,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.state !== 0) {
      writer.uint32(8).int32(message.state);
    }
    if (message.defaultRegion !== undefined) {
      Waypoint_Annotations_LocalizeRegion_Default.encode(
        message.defaultRegion,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.empty !== undefined) {
      Waypoint_Annotations_LocalizeRegion_Empty.encode(
        message.empty,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.circle !== undefined) {
      Waypoint_Annotations_LocalizeRegion_Circle2D.encode(
        message.circle,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): Waypoint_Annotations_LocalizeRegion {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWaypoint_Annotations_LocalizeRegion();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.state = reader.int32() as any;
          break;
        case 2:
          message.defaultRegion =
            Waypoint_Annotations_LocalizeRegion_Default.decode(
              reader,
              reader.uint32()
            );
          break;
        case 3:
          message.empty = Waypoint_Annotations_LocalizeRegion_Empty.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.circle = Waypoint_Annotations_LocalizeRegion_Circle2D.decode(
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

  fromJSON(object: any): Waypoint_Annotations_LocalizeRegion {
    return {
      state: isSet(object.state) ? annotationStateFromJSON(object.state) : 0,
      defaultRegion: isSet(object.defaultRegion)
        ? Waypoint_Annotations_LocalizeRegion_Default.fromJSON(
            object.defaultRegion
          )
        : undefined,
      empty: isSet(object.empty)
        ? Waypoint_Annotations_LocalizeRegion_Empty.fromJSON(object.empty)
        : undefined,
      circle: isSet(object.circle)
        ? Waypoint_Annotations_LocalizeRegion_Circle2D.fromJSON(object.circle)
        : undefined,
    };
  },

  toJSON(message: Waypoint_Annotations_LocalizeRegion): unknown {
    const obj: any = {};
    message.state !== undefined &&
      (obj.state = annotationStateToJSON(message.state));
    message.defaultRegion !== undefined &&
      (obj.defaultRegion = message.defaultRegion
        ? Waypoint_Annotations_LocalizeRegion_Default.toJSON(
            message.defaultRegion
          )
        : undefined);
    message.empty !== undefined &&
      (obj.empty = message.empty
        ? Waypoint_Annotations_LocalizeRegion_Empty.toJSON(message.empty)
        : undefined);
    message.circle !== undefined &&
      (obj.circle = message.circle
        ? Waypoint_Annotations_LocalizeRegion_Circle2D.toJSON(message.circle)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<Waypoint_Annotations_LocalizeRegion>, I>
  >(object: I): Waypoint_Annotations_LocalizeRegion {
    const message = createBaseWaypoint_Annotations_LocalizeRegion();
    message.state = object.state ?? 0;
    message.defaultRegion =
      object.defaultRegion !== undefined && object.defaultRegion !== null
        ? Waypoint_Annotations_LocalizeRegion_Default.fromPartial(
            object.defaultRegion
          )
        : undefined;
    message.empty =
      object.empty !== undefined && object.empty !== null
        ? Waypoint_Annotations_LocalizeRegion_Empty.fromPartial(object.empty)
        : undefined;
    message.circle =
      object.circle !== undefined && object.circle !== null
        ? Waypoint_Annotations_LocalizeRegion_Circle2D.fromPartial(
            object.circle
          )
        : undefined;
    return message;
  },
};

function createBaseWaypoint_Annotations_LocalizeRegion_Default(): Waypoint_Annotations_LocalizeRegion_Default {
  return {};
}

export const Waypoint_Annotations_LocalizeRegion_Default = {
  encode(
    _: Waypoint_Annotations_LocalizeRegion_Default,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): Waypoint_Annotations_LocalizeRegion_Default {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWaypoint_Annotations_LocalizeRegion_Default();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): Waypoint_Annotations_LocalizeRegion_Default {
    return {};
  },

  toJSON(_: Waypoint_Annotations_LocalizeRegion_Default): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<Waypoint_Annotations_LocalizeRegion_Default>, I>
  >(_: I): Waypoint_Annotations_LocalizeRegion_Default {
    const message = createBaseWaypoint_Annotations_LocalizeRegion_Default();
    return message;
  },
};

function createBaseWaypoint_Annotations_LocalizeRegion_Empty(): Waypoint_Annotations_LocalizeRegion_Empty {
  return {};
}

export const Waypoint_Annotations_LocalizeRegion_Empty = {
  encode(
    _: Waypoint_Annotations_LocalizeRegion_Empty,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): Waypoint_Annotations_LocalizeRegion_Empty {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWaypoint_Annotations_LocalizeRegion_Empty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): Waypoint_Annotations_LocalizeRegion_Empty {
    return {};
  },

  toJSON(_: Waypoint_Annotations_LocalizeRegion_Empty): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<Waypoint_Annotations_LocalizeRegion_Empty>, I>
  >(_: I): Waypoint_Annotations_LocalizeRegion_Empty {
    const message = createBaseWaypoint_Annotations_LocalizeRegion_Empty();
    return message;
  },
};

function createBaseWaypoint_Annotations_LocalizeRegion_Circle2D(): Waypoint_Annotations_LocalizeRegion_Circle2D {
  return { dist2d: 0 };
}

export const Waypoint_Annotations_LocalizeRegion_Circle2D = {
  encode(
    message: Waypoint_Annotations_LocalizeRegion_Circle2D,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.dist2d !== 0) {
      writer.uint32(9).double(message.dist2d);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): Waypoint_Annotations_LocalizeRegion_Circle2D {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWaypoint_Annotations_LocalizeRegion_Circle2D();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dist2d = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Waypoint_Annotations_LocalizeRegion_Circle2D {
    return {
      dist2d: isSet(object.dist2d) ? Number(object.dist2d) : 0,
    };
  },

  toJSON(message: Waypoint_Annotations_LocalizeRegion_Circle2D): unknown {
    const obj: any = {};
    message.dist2d !== undefined && (obj.dist2d = message.dist2d);
    return obj;
  },

  fromPartial<
    I extends Exact<
      DeepPartial<Waypoint_Annotations_LocalizeRegion_Circle2D>,
      I
    >
  >(object: I): Waypoint_Annotations_LocalizeRegion_Circle2D {
    const message = createBaseWaypoint_Annotations_LocalizeRegion_Circle2D();
    message.dist2d = object.dist2d ?? 0;
    return message;
  },
};

function createBaseWaypointSnapshot(): WaypointSnapshot {
  return {
    id: "",
    images: [],
    pointCloud: undefined,
    objects: [],
    robotState: undefined,
    robotLocalGrids: [],
    isPointCloudProcessed: false,
    versionId: "",
    hasRemotePointCloudSensor: false,
    bodyTformRemotePointCloudSensor: undefined,
    payloads: [],
  };
}

export const WaypointSnapshot = {
  encode(
    message: WaypointSnapshot,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    for (const v of message.images) {
      ImageResponse.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.pointCloud !== undefined) {
      PointCloud.encode(message.pointCloud, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.objects) {
      WorldObject.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.robotState !== undefined) {
      RobotState.encode(message.robotState, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.robotLocalGrids) {
      LocalGrid.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.isPointCloudProcessed === true) {
      writer.uint32(64).bool(message.isPointCloudProcessed);
    }
    if (message.versionId !== "") {
      writer.uint32(74).string(message.versionId);
    }
    if (message.hasRemotePointCloudSensor === true) {
      writer.uint32(80).bool(message.hasRemotePointCloudSensor);
    }
    if (message.bodyTformRemotePointCloudSensor !== undefined) {
      SE3Pose.encode(
        message.bodyTformRemotePointCloudSensor,
        writer.uint32(90).fork()
      ).ldelim();
    }
    for (const v of message.payloads) {
      Payload.encode(v!, writer.uint32(98).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WaypointSnapshot {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWaypointSnapshot();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.images.push(ImageResponse.decode(reader, reader.uint32()));
          break;
        case 3:
          message.pointCloud = PointCloud.decode(reader, reader.uint32());
          break;
        case 4:
          message.objects.push(WorldObject.decode(reader, reader.uint32()));
          break;
        case 5:
          message.robotState = RobotState.decode(reader, reader.uint32());
          break;
        case 6:
          message.robotLocalGrids.push(
            LocalGrid.decode(reader, reader.uint32())
          );
          break;
        case 8:
          message.isPointCloudProcessed = reader.bool();
          break;
        case 9:
          message.versionId = reader.string();
          break;
        case 10:
          message.hasRemotePointCloudSensor = reader.bool();
          break;
        case 11:
          message.bodyTformRemotePointCloudSensor = SE3Pose.decode(
            reader,
            reader.uint32()
          );
          break;
        case 12:
          message.payloads.push(Payload.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WaypointSnapshot {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      images: Array.isArray(object?.images)
        ? object.images.map((e: any) => ImageResponse.fromJSON(e))
        : [],
      pointCloud: isSet(object.pointCloud)
        ? PointCloud.fromJSON(object.pointCloud)
        : undefined,
      objects: Array.isArray(object?.objects)
        ? object.objects.map((e: any) => WorldObject.fromJSON(e))
        : [],
      robotState: isSet(object.robotState)
        ? RobotState.fromJSON(object.robotState)
        : undefined,
      robotLocalGrids: Array.isArray(object?.robotLocalGrids)
        ? object.robotLocalGrids.map((e: any) => LocalGrid.fromJSON(e))
        : [],
      isPointCloudProcessed: isSet(object.isPointCloudProcessed)
        ? Boolean(object.isPointCloudProcessed)
        : false,
      versionId: isSet(object.versionId) ? String(object.versionId) : "",
      hasRemotePointCloudSensor: isSet(object.hasRemotePointCloudSensor)
        ? Boolean(object.hasRemotePointCloudSensor)
        : false,
      bodyTformRemotePointCloudSensor: isSet(
        object.bodyTformRemotePointCloudSensor
      )
        ? SE3Pose.fromJSON(object.bodyTformRemotePointCloudSensor)
        : undefined,
      payloads: Array.isArray(object?.payloads)
        ? object.payloads.map((e: any) => Payload.fromJSON(e))
        : [],
    };
  },

  toJSON(message: WaypointSnapshot): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    if (message.images) {
      obj.images = message.images.map((e) =>
        e ? ImageResponse.toJSON(e) : undefined
      );
    } else {
      obj.images = [];
    }
    message.pointCloud !== undefined &&
      (obj.pointCloud = message.pointCloud
        ? PointCloud.toJSON(message.pointCloud)
        : undefined);
    if (message.objects) {
      obj.objects = message.objects.map((e) =>
        e ? WorldObject.toJSON(e) : undefined
      );
    } else {
      obj.objects = [];
    }
    message.robotState !== undefined &&
      (obj.robotState = message.robotState
        ? RobotState.toJSON(message.robotState)
        : undefined);
    if (message.robotLocalGrids) {
      obj.robotLocalGrids = message.robotLocalGrids.map((e) =>
        e ? LocalGrid.toJSON(e) : undefined
      );
    } else {
      obj.robotLocalGrids = [];
    }
    message.isPointCloudProcessed !== undefined &&
      (obj.isPointCloudProcessed = message.isPointCloudProcessed);
    message.versionId !== undefined && (obj.versionId = message.versionId);
    message.hasRemotePointCloudSensor !== undefined &&
      (obj.hasRemotePointCloudSensor = message.hasRemotePointCloudSensor);
    message.bodyTformRemotePointCloudSensor !== undefined &&
      (obj.bodyTformRemotePointCloudSensor =
        message.bodyTformRemotePointCloudSensor
          ? SE3Pose.toJSON(message.bodyTformRemotePointCloudSensor)
          : undefined);
    if (message.payloads) {
      obj.payloads = message.payloads.map((e) =>
        e ? Payload.toJSON(e) : undefined
      );
    } else {
      obj.payloads = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WaypointSnapshot>, I>>(
    object: I
  ): WaypointSnapshot {
    const message = createBaseWaypointSnapshot();
    message.id = object.id ?? "";
    message.images =
      object.images?.map((e) => ImageResponse.fromPartial(e)) || [];
    message.pointCloud =
      object.pointCloud !== undefined && object.pointCloud !== null
        ? PointCloud.fromPartial(object.pointCloud)
        : undefined;
    message.objects =
      object.objects?.map((e) => WorldObject.fromPartial(e)) || [];
    message.robotState =
      object.robotState !== undefined && object.robotState !== null
        ? RobotState.fromPartial(object.robotState)
        : undefined;
    message.robotLocalGrids =
      object.robotLocalGrids?.map((e) => LocalGrid.fromPartial(e)) || [];
    message.isPointCloudProcessed = object.isPointCloudProcessed ?? false;
    message.versionId = object.versionId ?? "";
    message.hasRemotePointCloudSensor =
      object.hasRemotePointCloudSensor ?? false;
    message.bodyTformRemotePointCloudSensor =
      object.bodyTformRemotePointCloudSensor !== undefined &&
      object.bodyTformRemotePointCloudSensor !== null
        ? SE3Pose.fromPartial(object.bodyTformRemotePointCloudSensor)
        : undefined;
    message.payloads =
      object.payloads?.map((e) => Payload.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEdge(): Edge {
  return {
    id: undefined,
    snapshotId: "",
    fromTformTo: undefined,
    annotations: undefined,
  };
}

export const Edge = {
  encode(message: Edge, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      Edge_Id.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    if (message.snapshotId !== "") {
      writer.uint32(18).string(message.snapshotId);
    }
    if (message.fromTformTo !== undefined) {
      SE3Pose.encode(message.fromTformTo, writer.uint32(26).fork()).ldelim();
    }
    if (message.annotations !== undefined) {
      Edge_Annotations.encode(
        message.annotations,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Edge {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEdge();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = Edge_Id.decode(reader, reader.uint32());
          break;
        case 2:
          message.snapshotId = reader.string();
          break;
        case 3:
          message.fromTformTo = SE3Pose.decode(reader, reader.uint32());
          break;
        case 4:
          message.annotations = Edge_Annotations.decode(
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

  fromJSON(object: any): Edge {
    return {
      id: isSet(object.id) ? Edge_Id.fromJSON(object.id) : undefined,
      snapshotId: isSet(object.snapshotId) ? String(object.snapshotId) : "",
      fromTformTo: isSet(object.fromTformTo)
        ? SE3Pose.fromJSON(object.fromTformTo)
        : undefined,
      annotations: isSet(object.annotations)
        ? Edge_Annotations.fromJSON(object.annotations)
        : undefined,
    };
  },

  toJSON(message: Edge): unknown {
    const obj: any = {};
    message.id !== undefined &&
      (obj.id = message.id ? Edge_Id.toJSON(message.id) : undefined);
    message.snapshotId !== undefined && (obj.snapshotId = message.snapshotId);
    message.fromTformTo !== undefined &&
      (obj.fromTformTo = message.fromTformTo
        ? SE3Pose.toJSON(message.fromTformTo)
        : undefined);
    message.annotations !== undefined &&
      (obj.annotations = message.annotations
        ? Edge_Annotations.toJSON(message.annotations)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Edge>, I>>(object: I): Edge {
    const message = createBaseEdge();
    message.id =
      object.id !== undefined && object.id !== null
        ? Edge_Id.fromPartial(object.id)
        : undefined;
    message.snapshotId = object.snapshotId ?? "";
    message.fromTformTo =
      object.fromTformTo !== undefined && object.fromTformTo !== null
        ? SE3Pose.fromPartial(object.fromTformTo)
        : undefined;
    message.annotations =
      object.annotations !== undefined && object.annotations !== null
        ? Edge_Annotations.fromPartial(object.annotations)
        : undefined;
    return message;
  },
};

function createBaseEdge_Id(): Edge_Id {
  return { fromWaypoint: "", toWaypoint: "" };
}

export const Edge_Id = {
  encode(
    message: Edge_Id,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.fromWaypoint !== "") {
      writer.uint32(10).string(message.fromWaypoint);
    }
    if (message.toWaypoint !== "") {
      writer.uint32(18).string(message.toWaypoint);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Edge_Id {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEdge_Id();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fromWaypoint = reader.string();
          break;
        case 2:
          message.toWaypoint = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Edge_Id {
    return {
      fromWaypoint: isSet(object.fromWaypoint)
        ? String(object.fromWaypoint)
        : "",
      toWaypoint: isSet(object.toWaypoint) ? String(object.toWaypoint) : "",
    };
  },

  toJSON(message: Edge_Id): unknown {
    const obj: any = {};
    message.fromWaypoint !== undefined &&
      (obj.fromWaypoint = message.fromWaypoint);
    message.toWaypoint !== undefined && (obj.toWaypoint = message.toWaypoint);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Edge_Id>, I>>(object: I): Edge_Id {
    const message = createBaseEdge_Id();
    message.fromWaypoint = object.fromWaypoint ?? "";
    message.toWaypoint = object.toWaypoint ?? "";
    return message;
  },
};

function createBaseEdge_Annotations(): Edge_Annotations {
  return {
    velLimit: undefined,
    stairs: undefined,
    directionConstraint: 0,
    requireAlignment: undefined,
    flatGround: undefined,
    groundMuHint: undefined,
    gratedFloor: undefined,
    overrideMobilityParams: undefined,
    mobilityParams: undefined,
    cost: undefined,
    edgeSource: 0,
    disableAlternateRouteFinding: false,
  };
}

export const Edge_Annotations = {
  encode(
    message: Edge_Annotations,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.velLimit !== undefined) {
      SE2VelocityLimit.encode(
        message.velLimit,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.stairs !== undefined) {
      Edge_Annotations_StairData.encode(
        message.stairs,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.directionConstraint !== 0) {
      writer.uint32(32).int32(message.directionConstraint);
    }
    if (message.requireAlignment !== undefined) {
      BoolValue.encode(
        { value: message.requireAlignment! },
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.flatGround !== undefined) {
      BoolValue.encode(
        { value: message.flatGround! },
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.groundMuHint !== undefined) {
      DoubleValue.encode(
        { value: message.groundMuHint! },
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.gratedFloor !== undefined) {
      BoolValue.encode(
        { value: message.gratedFloor! },
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.overrideMobilityParams !== undefined) {
      FieldMask.encode(
        FieldMask.wrap(message.overrideMobilityParams),
        writer.uint32(74).fork()
      ).ldelim();
    }
    if (message.mobilityParams !== undefined) {
      MobilityParams.encode(
        message.mobilityParams,
        writer.uint32(82).fork()
      ).ldelim();
    }
    if (message.cost !== undefined) {
      DoubleValue.encode(
        { value: message.cost! },
        writer.uint32(90).fork()
      ).ldelim();
    }
    if (message.edgeSource !== 0) {
      writer.uint32(96).int32(message.edgeSource);
    }
    if (message.disableAlternateRouteFinding === true) {
      writer.uint32(104).bool(message.disableAlternateRouteFinding);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Edge_Annotations {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEdge_Annotations();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.velLimit = SE2VelocityLimit.decode(reader, reader.uint32());
          break;
        case 2:
          message.stairs = Edge_Annotations_StairData.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.directionConstraint = reader.int32() as any;
          break;
        case 5:
          message.requireAlignment = BoolValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 6:
          message.flatGround = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 7:
          message.groundMuHint = DoubleValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 8:
          message.gratedFloor = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 9:
          message.overrideMobilityParams = FieldMask.unwrap(
            FieldMask.decode(reader, reader.uint32())
          );
          break;
        case 10:
          message.mobilityParams = MobilityParams.decode(
            reader,
            reader.uint32()
          );
          break;
        case 11:
          message.cost = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 12:
          message.edgeSource = reader.int32() as any;
          break;
        case 13:
          message.disableAlternateRouteFinding = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Edge_Annotations {
    return {
      velLimit: isSet(object.velLimit)
        ? SE2VelocityLimit.fromJSON(object.velLimit)
        : undefined,
      stairs: isSet(object.stairs)
        ? Edge_Annotations_StairData.fromJSON(object.stairs)
        : undefined,
      directionConstraint: isSet(object.directionConstraint)
        ? edge_Annotations_DirectionConstraintFromJSON(
            object.directionConstraint
          )
        : 0,
      requireAlignment: isSet(object.requireAlignment)
        ? Boolean(object.requireAlignment)
        : undefined,
      flatGround: isSet(object.flatGround)
        ? Boolean(object.flatGround)
        : undefined,
      groundMuHint: isSet(object.groundMuHint)
        ? Number(object.groundMuHint)
        : undefined,
      gratedFloor: isSet(object.gratedFloor)
        ? Boolean(object.gratedFloor)
        : undefined,
      overrideMobilityParams: isSet(object.overrideMobilityParams)
        ? FieldMask.unwrap(FieldMask.fromJSON(object.overrideMobilityParams))
        : undefined,
      mobilityParams: isSet(object.mobilityParams)
        ? MobilityParams.fromJSON(object.mobilityParams)
        : undefined,
      cost: isSet(object.cost) ? Number(object.cost) : undefined,
      edgeSource: isSet(object.edgeSource)
        ? edge_EdgeSourceFromJSON(object.edgeSource)
        : 0,
      disableAlternateRouteFinding: isSet(object.disableAlternateRouteFinding)
        ? Boolean(object.disableAlternateRouteFinding)
        : false,
    };
  },

  toJSON(message: Edge_Annotations): unknown {
    const obj: any = {};
    message.velLimit !== undefined &&
      (obj.velLimit = message.velLimit
        ? SE2VelocityLimit.toJSON(message.velLimit)
        : undefined);
    message.stairs !== undefined &&
      (obj.stairs = message.stairs
        ? Edge_Annotations_StairData.toJSON(message.stairs)
        : undefined);
    message.directionConstraint !== undefined &&
      (obj.directionConstraint = edge_Annotations_DirectionConstraintToJSON(
        message.directionConstraint
      ));
    message.requireAlignment !== undefined &&
      (obj.requireAlignment = message.requireAlignment);
    message.flatGround !== undefined && (obj.flatGround = message.flatGround);
    message.groundMuHint !== undefined &&
      (obj.groundMuHint = message.groundMuHint);
    message.gratedFloor !== undefined &&
      (obj.gratedFloor = message.gratedFloor);
    message.overrideMobilityParams !== undefined &&
      (obj.overrideMobilityParams = FieldMask.toJSON(
        FieldMask.wrap(message.overrideMobilityParams)
      ));
    message.mobilityParams !== undefined &&
      (obj.mobilityParams = message.mobilityParams
        ? MobilityParams.toJSON(message.mobilityParams)
        : undefined);
    message.cost !== undefined && (obj.cost = message.cost);
    message.edgeSource !== undefined &&
      (obj.edgeSource = edge_EdgeSourceToJSON(message.edgeSource));
    message.disableAlternateRouteFinding !== undefined &&
      (obj.disableAlternateRouteFinding = message.disableAlternateRouteFinding);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Edge_Annotations>, I>>(
    object: I
  ): Edge_Annotations {
    const message = createBaseEdge_Annotations();
    message.velLimit =
      object.velLimit !== undefined && object.velLimit !== null
        ? SE2VelocityLimit.fromPartial(object.velLimit)
        : undefined;
    message.stairs =
      object.stairs !== undefined && object.stairs !== null
        ? Edge_Annotations_StairData.fromPartial(object.stairs)
        : undefined;
    message.directionConstraint = object.directionConstraint ?? 0;
    message.requireAlignment = object.requireAlignment ?? undefined;
    message.flatGround = object.flatGround ?? undefined;
    message.groundMuHint = object.groundMuHint ?? undefined;
    message.gratedFloor = object.gratedFloor ?? undefined;
    message.overrideMobilityParams = object.overrideMobilityParams ?? undefined;
    message.mobilityParams =
      object.mobilityParams !== undefined && object.mobilityParams !== null
        ? MobilityParams.fromPartial(object.mobilityParams)
        : undefined;
    message.cost = object.cost ?? undefined;
    message.edgeSource = object.edgeSource ?? 0;
    message.disableAlternateRouteFinding =
      object.disableAlternateRouteFinding ?? false;
    return message;
  },
};

function createBaseEdge_Annotations_StairData(): Edge_Annotations_StairData {
  return { state: 0, straightStaircase: undefined };
}

export const Edge_Annotations_StairData = {
  encode(
    message: Edge_Annotations_StairData,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.state !== 0) {
      writer.uint32(8).int32(message.state);
    }
    if (message.straightStaircase !== undefined) {
      StraightStaircase.encode(
        message.straightStaircase,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): Edge_Annotations_StairData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEdge_Annotations_StairData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.state = reader.int32() as any;
          break;
        case 2:
          message.straightStaircase = StraightStaircase.decode(
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

  fromJSON(object: any): Edge_Annotations_StairData {
    return {
      state: isSet(object.state) ? annotationStateFromJSON(object.state) : 0,
      straightStaircase: isSet(object.straightStaircase)
        ? StraightStaircase.fromJSON(object.straightStaircase)
        : undefined,
    };
  },

  toJSON(message: Edge_Annotations_StairData): unknown {
    const obj: any = {};
    message.state !== undefined &&
      (obj.state = annotationStateToJSON(message.state));
    message.straightStaircase !== undefined &&
      (obj.straightStaircase = message.straightStaircase
        ? StraightStaircase.toJSON(message.straightStaircase)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Edge_Annotations_StairData>, I>>(
    object: I
  ): Edge_Annotations_StairData {
    const message = createBaseEdge_Annotations_StairData();
    message.state = object.state ?? 0;
    message.straightStaircase =
      object.straightStaircase !== undefined &&
      object.straightStaircase !== null
        ? StraightStaircase.fromPartial(object.straightStaircase)
        : undefined;
    return message;
  },
};

function createBaseEdgeSnapshot(): EdgeSnapshot {
  return { id: "", stances: [] };
}

export const EdgeSnapshot = {
  encode(
    message: EdgeSnapshot,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    for (const v of message.stances) {
      EdgeSnapshot_Stance.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EdgeSnapshot {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEdgeSnapshot();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.stances.push(
            EdgeSnapshot_Stance.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EdgeSnapshot {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      stances: Array.isArray(object?.stances)
        ? object.stances.map((e: any) => EdgeSnapshot_Stance.fromJSON(e))
        : [],
    };
  },

  toJSON(message: EdgeSnapshot): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    if (message.stances) {
      obj.stances = message.stances.map((e) =>
        e ? EdgeSnapshot_Stance.toJSON(e) : undefined
      );
    } else {
      obj.stances = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EdgeSnapshot>, I>>(
    object: I
  ): EdgeSnapshot {
    const message = createBaseEdgeSnapshot();
    message.id = object.id ?? "";
    message.stances =
      object.stances?.map((e) => EdgeSnapshot_Stance.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEdgeSnapshot_Stance(): EdgeSnapshot_Stance {
  return {
    timestamp: undefined,
    footStates: [],
    koTformBody: undefined,
    visionTformBody: undefined,
    planarGround: undefined,
  };
}

export const EdgeSnapshot_Stance = {
  encode(
    message: EdgeSnapshot_Stance,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.timestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestamp),
        writer.uint32(10).fork()
      ).ldelim();
    }
    for (const v of message.footStates) {
      FootState.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.koTformBody !== undefined) {
      SE3Pose.encode(message.koTformBody, writer.uint32(26).fork()).ldelim();
    }
    if (message.visionTformBody !== undefined) {
      SE3Pose.encode(
        message.visionTformBody,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.planarGround !== undefined) {
      BoolValue.encode(
        { value: message.planarGround! },
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EdgeSnapshot_Stance {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEdgeSnapshot_Stance();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.footStates.push(FootState.decode(reader, reader.uint32()));
          break;
        case 3:
          message.koTformBody = SE3Pose.decode(reader, reader.uint32());
          break;
        case 5:
          message.visionTformBody = SE3Pose.decode(reader, reader.uint32());
          break;
        case 4:
          message.planarGround = BoolValue.decode(
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

  fromJSON(object: any): EdgeSnapshot_Stance {
    return {
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
      footStates: Array.isArray(object?.footStates)
        ? object.footStates.map((e: any) => FootState.fromJSON(e))
        : [],
      koTformBody: isSet(object.koTformBody)
        ? SE3Pose.fromJSON(object.koTformBody)
        : undefined,
      visionTformBody: isSet(object.visionTformBody)
        ? SE3Pose.fromJSON(object.visionTformBody)
        : undefined,
      planarGround: isSet(object.planarGround)
        ? Boolean(object.planarGround)
        : undefined,
    };
  },

  toJSON(message: EdgeSnapshot_Stance): unknown {
    const obj: any = {};
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp.toISOString());
    if (message.footStates) {
      obj.footStates = message.footStates.map((e) =>
        e ? FootState.toJSON(e) : undefined
      );
    } else {
      obj.footStates = [];
    }
    message.koTformBody !== undefined &&
      (obj.koTformBody = message.koTformBody
        ? SE3Pose.toJSON(message.koTformBody)
        : undefined);
    message.visionTformBody !== undefined &&
      (obj.visionTformBody = message.visionTformBody
        ? SE3Pose.toJSON(message.visionTformBody)
        : undefined);
    message.planarGround !== undefined &&
      (obj.planarGround = message.planarGround);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EdgeSnapshot_Stance>, I>>(
    object: I
  ): EdgeSnapshot_Stance {
    const message = createBaseEdgeSnapshot_Stance();
    message.timestamp = object.timestamp ?? undefined;
    message.footStates =
      object.footStates?.map((e) => FootState.fromPartial(e)) || [];
    message.koTformBody =
      object.koTformBody !== undefined && object.koTformBody !== null
        ? SE3Pose.fromPartial(object.koTformBody)
        : undefined;
    message.visionTformBody =
      object.visionTformBody !== undefined && object.visionTformBody !== null
        ? SE3Pose.fromPartial(object.visionTformBody)
        : undefined;
    message.planarGround = object.planarGround ?? undefined;
    return message;
  },
};

function createBaseAnchor(): Anchor {
  return { id: "", seedTformWaypoint: undefined };
}

export const Anchor = {
  encode(
    message: Anchor,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.seedTformWaypoint !== undefined) {
      SE3Pose.encode(
        message.seedTformWaypoint,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Anchor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAnchor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.seedTformWaypoint = SE3Pose.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Anchor {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      seedTformWaypoint: isSet(object.seedTformWaypoint)
        ? SE3Pose.fromJSON(object.seedTformWaypoint)
        : undefined,
    };
  },

  toJSON(message: Anchor): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.seedTformWaypoint !== undefined &&
      (obj.seedTformWaypoint = message.seedTformWaypoint
        ? SE3Pose.toJSON(message.seedTformWaypoint)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Anchor>, I>>(object: I): Anchor {
    const message = createBaseAnchor();
    message.id = object.id ?? "";
    message.seedTformWaypoint =
      object.seedTformWaypoint !== undefined &&
      object.seedTformWaypoint !== null
        ? SE3Pose.fromPartial(object.seedTformWaypoint)
        : undefined;
    return message;
  },
};

function createBaseAnchoredWorldObject(): AnchoredWorldObject {
  return { id: "", seedTformObject: undefined };
}

export const AnchoredWorldObject = {
  encode(
    message: AnchoredWorldObject,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.seedTformObject !== undefined) {
      SE3Pose.encode(
        message.seedTformObject,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AnchoredWorldObject {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAnchoredWorldObject();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.seedTformObject = SE3Pose.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AnchoredWorldObject {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      seedTformObject: isSet(object.seedTformObject)
        ? SE3Pose.fromJSON(object.seedTformObject)
        : undefined,
    };
  },

  toJSON(message: AnchoredWorldObject): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.seedTformObject !== undefined &&
      (obj.seedTformObject = message.seedTformObject
        ? SE3Pose.toJSON(message.seedTformObject)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AnchoredWorldObject>, I>>(
    object: I
  ): AnchoredWorldObject {
    const message = createBaseAnchoredWorldObject();
    message.id = object.id ?? "";
    message.seedTformObject =
      object.seedTformObject !== undefined && object.seedTformObject !== null
        ? SE3Pose.fromPartial(object.seedTformObject)
        : undefined;
    return message;
  },
};

function createBaseAnchoring(): Anchoring {
  return { anchors: [], objects: [] };
}

export const Anchoring = {
  encode(
    message: Anchoring,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.anchors) {
      Anchor.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.objects) {
      AnchoredWorldObject.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Anchoring {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAnchoring();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.anchors.push(Anchor.decode(reader, reader.uint32()));
          break;
        case 2:
          message.objects.push(
            AnchoredWorldObject.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Anchoring {
    return {
      anchors: Array.isArray(object?.anchors)
        ? object.anchors.map((e: any) => Anchor.fromJSON(e))
        : [],
      objects: Array.isArray(object?.objects)
        ? object.objects.map((e: any) => AnchoredWorldObject.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Anchoring): unknown {
    const obj: any = {};
    if (message.anchors) {
      obj.anchors = message.anchors.map((e) =>
        e ? Anchor.toJSON(e) : undefined
      );
    } else {
      obj.anchors = [];
    }
    if (message.objects) {
      obj.objects = message.objects.map((e) =>
        e ? AnchoredWorldObject.toJSON(e) : undefined
      );
    } else {
      obj.objects = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Anchoring>, I>>(
    object: I
  ): Anchoring {
    const message = createBaseAnchoring();
    message.anchors = object.anchors?.map((e) => Anchor.fromPartial(e)) || [];
    message.objects =
      object.objects?.map((e) => AnchoredWorldObject.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGraph(): Graph {
  return { waypoints: [], edges: [], anchoring: undefined };
}

export const Graph = {
  encode(message: Graph, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.waypoints) {
      Waypoint.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.edges) {
      Edge.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.anchoring !== undefined) {
      Anchoring.encode(message.anchoring, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Graph {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGraph();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.waypoints.push(Waypoint.decode(reader, reader.uint32()));
          break;
        case 2:
          message.edges.push(Edge.decode(reader, reader.uint32()));
          break;
        case 3:
          message.anchoring = Anchoring.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Graph {
    return {
      waypoints: Array.isArray(object?.waypoints)
        ? object.waypoints.map((e: any) => Waypoint.fromJSON(e))
        : [],
      edges: Array.isArray(object?.edges)
        ? object.edges.map((e: any) => Edge.fromJSON(e))
        : [],
      anchoring: isSet(object.anchoring)
        ? Anchoring.fromJSON(object.anchoring)
        : undefined,
    };
  },

  toJSON(message: Graph): unknown {
    const obj: any = {};
    if (message.waypoints) {
      obj.waypoints = message.waypoints.map((e) =>
        e ? Waypoint.toJSON(e) : undefined
      );
    } else {
      obj.waypoints = [];
    }
    if (message.edges) {
      obj.edges = message.edges.map((e) => (e ? Edge.toJSON(e) : undefined));
    } else {
      obj.edges = [];
    }
    message.anchoring !== undefined &&
      (obj.anchoring = message.anchoring
        ? Anchoring.toJSON(message.anchoring)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Graph>, I>>(object: I): Graph {
    const message = createBaseGraph();
    message.waypoints =
      object.waypoints?.map((e) => Waypoint.fromPartial(e)) || [];
    message.edges = object.edges?.map((e) => Edge.fromPartial(e)) || [];
    message.anchoring =
      object.anchoring !== undefined && object.anchoring !== null
        ? Anchoring.fromPartial(object.anchoring)
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
