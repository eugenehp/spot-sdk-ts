/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { DoubleValue } from "../../google/protobuf/wrappers";

export const protobufPackage = "bosdyn.api";

/** Two dimensional vector primitive. */
export interface Vec2 {
  x: number;
  y: number;
}

/** Three dimensional vector primitive. */
export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

/**
 * Cylindrical coordinates are a generalization of polar coordiates, adding a
 * height
 * axis. See (http://mathworld.wolfram.com/CylindricalCoordinates.html) for
 * more details.
 */
export interface CylindricalCoordinate {
  /** Radial coordinate */
  r: number;
  /** Azimuthal coordinate */
  theta: number;
  /** Vertical coordiante */
  z: number;
}

/** Quaternion primitive. A quaternion can be used to describe the rotation. */
export interface Quaternion {
  x: number;
  y: number;
  z: number;
  w: number;
}

/** Plane primitive, described with a point and normal. */
export interface Plane {
  /** A point on the plane. */
  point: Vec3 | undefined;
  /** The direction of the planes normal. */
  normal: Vec3 | undefined;
}

/** A square oriented in 3D space. */
export interface Quad {
  /**
   * The center of the quad and the orientation of the normal.
   * The normal axis is [0, 0, 1].
   */
  pose: SE3Pose | undefined;
  /** The side length of the quad. */
  size: number;
}

/** A ray in 3D space. */
export interface Ray {
  /** Base of ray. */
  origin: Vec3 | undefined;
  /** Unit vector defining the direction of the ray. */
  direction: Vec3 | undefined;
}

/** Geometric primitive to describe 2D position and rotation. */
export interface SE2Pose {
  /** (m) */
  position: Vec2 | undefined;
  /** (rad) */
  angle: number;
}

/** Geometric primitive that describes a 2D velocity through it's linear and angular components. */
export interface SE2Velocity {
  /** (m/s) */
  linear: Vec2 | undefined;
  /** (rad/s) */
  angular: number;
}

/** Geometric primitive to couple minimum and maximum SE2Velocities in a single message. */
export interface SE2VelocityLimit {
  /** If set, limits the maximum velocity. */
  maxVel: SE2Velocity | undefined;
  /** If set, limits the minimum velocity. */
  minVel: SE2Velocity | undefined;
}

/** Geometric primitive to describe 3D position and rotation. */
export interface SE3Pose {
  /** (m) */
  position: Vec3 | undefined;
  rotation: Quaternion | undefined;
}

/** Geometric primitive that describes a 3D velocity through it's linear and angular components. */
export interface SE3Velocity {
  /** (m/s) */
  linear: Vec3 | undefined;
  /** (rad/s) */
  angular: Vec3 | undefined;
}

/** Geometric primitive used to specify forces and torques. */
export interface Wrench {
  /** (N) */
  force: Vec3 | undefined;
  /** (Nm) */
  torque: Vec3 | undefined;
}

/**
 * A frame is a named location in space. \
 * For example, the following frames are defined by the API: \
 *  - "body":   A frame centered on the robot's body. \
 *  - "vision": A non-moving (inertial) frame that is the robot's best
 *              estimate of a fixed location in the world. It is based on
 *              both dead reckoning and visual analysis of the world. \
 *  - "odom":   A non-moving (inertial) frame that is based on the kinematic
 *              odometry of the robot only. \
 * Additional frames are available for robot joints, sensors, and items
 * detected in the world. \
 *
 * The FrameTreeSnapshot represents the relationships between the frames that the robot
 * knows about at a particular point in time. For example, with the FrameTreeSnapshot,
 * an API client can determine where the "body" is relative to the "vision". \
 *
 * To reduce data bandwidth, the FrameTreeSnapshot will typically contain
 * a small subset of all known frames. By default, all services MUST
 * include "vision", "body", and "odom" frames in the FrameTreeSnapshot, but
 * additional frames can also be included. For example, an Image service
 * would likely include the frame located at the base of the camera lens
 * where the picture was taken. \
 *
 * Frame relationships are expressed as edges between "parent" frames and
 * "child" frames, with an SE3Pose indicating the pose of the "child" frame
 * expressed in the "child" frame. These edges are included in the edge_map
 * field. For example, if frame "hand" is 1m in front of the frame "shoulder",
 * then the FrameTreeSnapshot might contain: \
 *  edge_map {                                    \
 *     key: "hand"                                \
 *     value: {                                   \
 *         parent_frame_name: "shoulder"          \
 *         parent_tform_child: {                  \
 *            position: {                         \
 *              x: 1.0                            \
 *              y: 0.0                            \
 *              z: 0.0                            \
 *            }                                   \
 *         }                                      \
 *      }                                         \
 *  }                                             \
 *
 * Frame relationships can be inverted. So, to find where the "shoulder"
 * is in relationship the "hand", the parent_tform_child pose in the edge
 * above can be inverted: \
 *      hand_tform_shoulder = shoulder_tform_hand.inverse() \
 * Frame relationships can also be concatenated. If there is an additional
 * edge specifying the pose of the "shoulder" relative to the "body", then
 * to find where the "hand" is relative to the "body" do: \
 *      body_tform_hand = body_tform_shoulder * shoulder_tform_hand \
 *
 * The two properties above reduce data size. Instead of having to send N^2
 * edge_map entries to represent all relationships between N frames,
 * only N edge_map entries need to be sent. Clients will need to determine
 * the chain of edges to follow to get from one frame to another frame,
 * and then do inversion and concatentation to generate the appropriate pose. \
 *
 * Note that all FrameTreeSnapshots are expected to be a single rooted tree.
 * The syntax for FrameTreeSnapshot could also support graphs with
 * cycles, or forests of trees - but clients should treat those as invalid
 * representations. \
 */
export interface FrameTreeSnapshot {
  /**
   * child_to_parent_edge_map maps the child frame name to the ParentEdge.
   * In aggregate, this forms the tree structure.
   */
  childToParentEdgeMap: { [key: string]: FrameTreeSnapshot_ParentEdge };
}

/** ParentEdge represents the relationship from a child frame to a parent frame. */
export interface FrameTreeSnapshot_ParentEdge {
  /**
   * The name of the parent frame. If a frame has no parent (parent_frame_name is empty),
   * it is the root of the tree.
   */
  parentFrameName: string;
  /** Transform representing the pose of the child frame in the parent's frame. */
  parentTformChild: SE3Pose | undefined;
}

export interface FrameTreeSnapshot_ChildToParentEdgeMapEntry {
  key: string;
  value: FrameTreeSnapshot_ParentEdge | undefined;
}

/** Geometric primitive describing a two-dimensional box. */
export interface Box2 {
  size: Vec2 | undefined;
}

/** Geometric primitive to describe a 2D box in a specific frame. */
export interface Box2WithFrame {
  /**
   * The box is specified with width (y) and length (x), and the full box is
   * fixed at an origin, where it's sides are along the coordinate frame's
   * axes.
   */
  box: Box2 | undefined;
  /** The pose of the axis-aligned box is in 'frame_name'. */
  frameName: string;
  /**
   * The transformation of the axis-aligned box into the desired frame
   * (specified above).
   */
  frameNameTformBox: SE3Pose | undefined;
}

/** Geometric primitive describing a three-dimensional box. */
export interface Box3 {
  size: Vec3 | undefined;
}

/** Geometric primitive to describe a 3D box in a specific frame. */
export interface Box3WithFrame {
  /**
   * The box width (y), length (x), and height (z) are interpreted in, and the
   * full box is fixed at an origin, where it's sides are along the coordinate
   * frame's axes.
   */
  box: Box3 | undefined;
  /** The pose of the axis-aligned box is in 'frame_name'. */
  frameName: string;
  /**
   * The transformation of the axis-aligned box into the desired frame
   * (specified above).
   */
  frameNameTformBox: SE3Pose | undefined;
}

/** Represents a row-major order matrix of doubles. */
export interface Matrix {
  rows: number;
  cols: number;
  values: number[];
}

/**
 * Represents the translation/rotation covariance of an SE3 Pose.
 * The 6x6 matrix can be viewed as the covariance among 6 variables: \
 *      rx     ry  rz    x    y    z                                 \
 * rx rxrx  rxry rxrz  rxx  rxy  rxz                                 \
 * ry ryrx  ryry ryrz  ryx  ryy  ryz                                 \
 * rz rzrx  rzry rzrz  rzx  rzy  rzz                                 \
 * x   xrx   xry  xrz   xx   xy   xz                                 \
 * y   yrx   yry  yrz   yx   yy   yz                                 \
 * z   zrx   zry  zrz   zx   zy   zz                                 \
 * where x, y, z are translations in meters, and rx, ry, rz are rotations around
 * the x, y and z axes in radians.                                   \
 * The matrix is symmetric, so, for example, xy = yx.                \
 */
export interface SE3Covariance {
  /** Row-major order representation of the covariance matrix. */
  matrix: Matrix | undefined;
  /**
   * Variance of the yaw component of the SE3 Pose.
   * Warning: deprecated in 2.1. This should equal cov_rzrz, inside `matrix`.
   *
   * @deprecated
   */
  yawVariance: number;
  /**
   * Warning: deprecated in 2.1. Use 'matrix.'
   *
   * @deprecated
   */
  covXx: number;
  /**
   * Warning: deprecated in 2.1. Use 'matrix.'
   *
   * @deprecated
   */
  covXy: number;
  /**
   * Warning: deprecated in 2.1. Use 'matrix.'
   *
   * @deprecated
   */
  covXz: number;
  /**
   * Warning: deprecated in 2.1. Use 'matrix.'
   *
   * @deprecated
   */
  covYx: number;
  /**
   * Warning: deprecated in 2.1. Use 'matrix.'
   *
   * @deprecated
   */
  covYy: number;
  /**
   * Warning: deprecated in 2.1. Use 'matrix.'
   *
   * @deprecated
   */
  covYz: number;
  /**
   * Warning: deprecated in 2.1. Use 'matrix.'
   *
   * @deprecated
   */
  covZx: number;
  /**
   * Warning: deprecated in 2.1. Use 'matrix.'
   *
   * @deprecated
   */
  covZy: number;
  /**
   * Warning: deprecated in 2.1. Use 'matrix.'
   *
   * @deprecated
   */
  covZz: number;
}

/** Multi-part, 1D line segments defined by a series of points. */
export interface PolyLine {
  points: Vec2[];
}

/**
 * Polygon in the XY plane.
 * May be concave, but should not self-intersect. Vertices can be specified in either
 * clockwise or counterclockwise orders.
 */
export interface Polygon {
  vertexes: Vec2[];
}

/**
 * Represents a region in the XY plane that consists of a single polygon
 * from which polygons representing exclusion areas may be subtracted.
 *
 * A point is considered to be inside the region if it is inside the inclusion
 * polygon and not inside any of the exclusion polygons.
 *
 * Note that while this can be used to represent a polygon with holes, that
 * exclusions are not necessarily holes:  An exclusion polygon may not be
 * completely inside the inclusion polygon.
 */
export interface PolygonWithExclusions {
  inclusion: Polygon | undefined;
  exclusions: Polygon[];
}

/** Represents a circular 2D area. */
export interface Circle {
  centerPt: Vec2 | undefined;
  /** Dimensions in m from center_pt. */
  radius: number;
}

/** Represents an area in the XY plane. */
export interface Area {
  polygon: Polygon | undefined;
  circle: Circle | undefined;
}

/** Represents a volume of space in an unspecified frame. */
export interface Volume {
  /** Dimensions in m, centered on frame origin. */
  box: Vec3 | undefined;
}

/**
 * Represents bounds on a value, such that lower < value < upper.
 * If you do not want to specify one side of the bound, set it to
 * an appropriately large (or small) number.
 */
export interface Bounds {
  lower: number;
  upper: number;
}

/** A 2D vector of doubles that uses wrapped values so we can tell which elements are set. */
export interface Vec2Value {
  x: number | undefined;
  y: number | undefined;
}

/** A 3D vector of doubles that uses wrapped values so we can tell which elements are set. */
export interface Vec3Value {
  x: number | undefined;
  y: number | undefined;
  z: number | undefined;
}

function createBaseVec2(): Vec2 {
  return { x: 0, y: 0 };
}

export const Vec2 = {
  encode(message: Vec2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.x !== 0) {
      writer.uint32(9).double(message.x);
    }
    if (message.y !== 0) {
      writer.uint32(17).double(message.y);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Vec2 {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVec2();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.x = reader.double();
          break;
        case 2:
          message.y = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Vec2 {
    return {
      x: isSet(object.x) ? Number(object.x) : 0,
      y: isSet(object.y) ? Number(object.y) : 0,
    };
  },

  toJSON(message: Vec2): unknown {
    const obj: any = {};
    message.x !== undefined && (obj.x = message.x);
    message.y !== undefined && (obj.y = message.y);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Vec2>, I>>(object: I): Vec2 {
    const message = createBaseVec2();
    message.x = object.x ?? 0;
    message.y = object.y ?? 0;
    return message;
  },
};

function createBaseVec3(): Vec3 {
  return { x: 0, y: 0, z: 0 };
}

export const Vec3 = {
  encode(message: Vec3, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.x !== 0) {
      writer.uint32(9).double(message.x);
    }
    if (message.y !== 0) {
      writer.uint32(17).double(message.y);
    }
    if (message.z !== 0) {
      writer.uint32(25).double(message.z);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Vec3 {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVec3();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.x = reader.double();
          break;
        case 2:
          message.y = reader.double();
          break;
        case 3:
          message.z = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Vec3 {
    return {
      x: isSet(object.x) ? Number(object.x) : 0,
      y: isSet(object.y) ? Number(object.y) : 0,
      z: isSet(object.z) ? Number(object.z) : 0,
    };
  },

  toJSON(message: Vec3): unknown {
    const obj: any = {};
    message.x !== undefined && (obj.x = message.x);
    message.y !== undefined && (obj.y = message.y);
    message.z !== undefined && (obj.z = message.z);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Vec3>, I>>(object: I): Vec3 {
    const message = createBaseVec3();
    message.x = object.x ?? 0;
    message.y = object.y ?? 0;
    message.z = object.z ?? 0;
    return message;
  },
};

function createBaseCylindricalCoordinate(): CylindricalCoordinate {
  return { r: 0, theta: 0, z: 0 };
}

export const CylindricalCoordinate = {
  encode(
    message: CylindricalCoordinate,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.r !== 0) {
      writer.uint32(9).double(message.r);
    }
    if (message.theta !== 0) {
      writer.uint32(17).double(message.theta);
    }
    if (message.z !== 0) {
      writer.uint32(25).double(message.z);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CylindricalCoordinate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCylindricalCoordinate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.r = reader.double();
          break;
        case 2:
          message.theta = reader.double();
          break;
        case 3:
          message.z = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CylindricalCoordinate {
    return {
      r: isSet(object.r) ? Number(object.r) : 0,
      theta: isSet(object.theta) ? Number(object.theta) : 0,
      z: isSet(object.z) ? Number(object.z) : 0,
    };
  },

  toJSON(message: CylindricalCoordinate): unknown {
    const obj: any = {};
    message.r !== undefined && (obj.r = message.r);
    message.theta !== undefined && (obj.theta = message.theta);
    message.z !== undefined && (obj.z = message.z);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CylindricalCoordinate>, I>>(
    object: I
  ): CylindricalCoordinate {
    const message = createBaseCylindricalCoordinate();
    message.r = object.r ?? 0;
    message.theta = object.theta ?? 0;
    message.z = object.z ?? 0;
    return message;
  },
};

function createBaseQuaternion(): Quaternion {
  return { x: 0, y: 0, z: 0, w: 0 };
}

export const Quaternion = {
  encode(
    message: Quaternion,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.x !== 0) {
      writer.uint32(9).double(message.x);
    }
    if (message.y !== 0) {
      writer.uint32(17).double(message.y);
    }
    if (message.z !== 0) {
      writer.uint32(25).double(message.z);
    }
    if (message.w !== 0) {
      writer.uint32(33).double(message.w);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Quaternion {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuaternion();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.x = reader.double();
          break;
        case 2:
          message.y = reader.double();
          break;
        case 3:
          message.z = reader.double();
          break;
        case 4:
          message.w = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Quaternion {
    return {
      x: isSet(object.x) ? Number(object.x) : 0,
      y: isSet(object.y) ? Number(object.y) : 0,
      z: isSet(object.z) ? Number(object.z) : 0,
      w: isSet(object.w) ? Number(object.w) : 0,
    };
  },

  toJSON(message: Quaternion): unknown {
    const obj: any = {};
    message.x !== undefined && (obj.x = message.x);
    message.y !== undefined && (obj.y = message.y);
    message.z !== undefined && (obj.z = message.z);
    message.w !== undefined && (obj.w = message.w);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Quaternion>, I>>(
    object: I
  ): Quaternion {
    const message = createBaseQuaternion();
    message.x = object.x ?? 0;
    message.y = object.y ?? 0;
    message.z = object.z ?? 0;
    message.w = object.w ?? 0;
    return message;
  },
};

function createBasePlane(): Plane {
  return { point: undefined, normal: undefined };
}

export const Plane = {
  encode(message: Plane, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.point !== undefined) {
      Vec3.encode(message.point, writer.uint32(10).fork()).ldelim();
    }
    if (message.normal !== undefined) {
      Vec3.encode(message.normal, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Plane {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlane();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.point = Vec3.decode(reader, reader.uint32());
          break;
        case 2:
          message.normal = Vec3.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Plane {
    return {
      point: isSet(object.point) ? Vec3.fromJSON(object.point) : undefined,
      normal: isSet(object.normal) ? Vec3.fromJSON(object.normal) : undefined,
    };
  },

  toJSON(message: Plane): unknown {
    const obj: any = {};
    message.point !== undefined &&
      (obj.point = message.point ? Vec3.toJSON(message.point) : undefined);
    message.normal !== undefined &&
      (obj.normal = message.normal ? Vec3.toJSON(message.normal) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Plane>, I>>(object: I): Plane {
    const message = createBasePlane();
    message.point =
      object.point !== undefined && object.point !== null
        ? Vec3.fromPartial(object.point)
        : undefined;
    message.normal =
      object.normal !== undefined && object.normal !== null
        ? Vec3.fromPartial(object.normal)
        : undefined;
    return message;
  },
};

function createBaseQuad(): Quad {
  return { pose: undefined, size: 0 };
}

export const Quad = {
  encode(message: Quad, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pose !== undefined) {
      SE3Pose.encode(message.pose, writer.uint32(10).fork()).ldelim();
    }
    if (message.size !== 0) {
      writer.uint32(17).double(message.size);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Quad {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuad();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pose = SE3Pose.decode(reader, reader.uint32());
          break;
        case 2:
          message.size = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Quad {
    return {
      pose: isSet(object.pose) ? SE3Pose.fromJSON(object.pose) : undefined,
      size: isSet(object.size) ? Number(object.size) : 0,
    };
  },

  toJSON(message: Quad): unknown {
    const obj: any = {};
    message.pose !== undefined &&
      (obj.pose = message.pose ? SE3Pose.toJSON(message.pose) : undefined);
    message.size !== undefined && (obj.size = message.size);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Quad>, I>>(object: I): Quad {
    const message = createBaseQuad();
    message.pose =
      object.pose !== undefined && object.pose !== null
        ? SE3Pose.fromPartial(object.pose)
        : undefined;
    message.size = object.size ?? 0;
    return message;
  },
};

function createBaseRay(): Ray {
  return { origin: undefined, direction: undefined };
}

export const Ray = {
  encode(message: Ray, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.origin !== undefined) {
      Vec3.encode(message.origin, writer.uint32(10).fork()).ldelim();
    }
    if (message.direction !== undefined) {
      Vec3.encode(message.direction, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Ray {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRay();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.origin = Vec3.decode(reader, reader.uint32());
          break;
        case 2:
          message.direction = Vec3.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Ray {
    return {
      origin: isSet(object.origin) ? Vec3.fromJSON(object.origin) : undefined,
      direction: isSet(object.direction)
        ? Vec3.fromJSON(object.direction)
        : undefined,
    };
  },

  toJSON(message: Ray): unknown {
    const obj: any = {};
    message.origin !== undefined &&
      (obj.origin = message.origin ? Vec3.toJSON(message.origin) : undefined);
    message.direction !== undefined &&
      (obj.direction = message.direction
        ? Vec3.toJSON(message.direction)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Ray>, I>>(object: I): Ray {
    const message = createBaseRay();
    message.origin =
      object.origin !== undefined && object.origin !== null
        ? Vec3.fromPartial(object.origin)
        : undefined;
    message.direction =
      object.direction !== undefined && object.direction !== null
        ? Vec3.fromPartial(object.direction)
        : undefined;
    return message;
  },
};

function createBaseSE2Pose(): SE2Pose {
  return { position: undefined, angle: 0 };
}

export const SE2Pose = {
  encode(
    message: SE2Pose,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.position !== undefined) {
      Vec2.encode(message.position, writer.uint32(10).fork()).ldelim();
    }
    if (message.angle !== 0) {
      writer.uint32(17).double(message.angle);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SE2Pose {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSE2Pose();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.position = Vec2.decode(reader, reader.uint32());
          break;
        case 2:
          message.angle = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SE2Pose {
    return {
      position: isSet(object.position)
        ? Vec2.fromJSON(object.position)
        : undefined,
      angle: isSet(object.angle) ? Number(object.angle) : 0,
    };
  },

  toJSON(message: SE2Pose): unknown {
    const obj: any = {};
    message.position !== undefined &&
      (obj.position = message.position
        ? Vec2.toJSON(message.position)
        : undefined);
    message.angle !== undefined && (obj.angle = message.angle);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SE2Pose>, I>>(object: I): SE2Pose {
    const message = createBaseSE2Pose();
    message.position =
      object.position !== undefined && object.position !== null
        ? Vec2.fromPartial(object.position)
        : undefined;
    message.angle = object.angle ?? 0;
    return message;
  },
};

function createBaseSE2Velocity(): SE2Velocity {
  return { linear: undefined, angular: 0 };
}

export const SE2Velocity = {
  encode(
    message: SE2Velocity,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.linear !== undefined) {
      Vec2.encode(message.linear, writer.uint32(10).fork()).ldelim();
    }
    if (message.angular !== 0) {
      writer.uint32(17).double(message.angular);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SE2Velocity {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSE2Velocity();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.linear = Vec2.decode(reader, reader.uint32());
          break;
        case 2:
          message.angular = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SE2Velocity {
    return {
      linear: isSet(object.linear) ? Vec2.fromJSON(object.linear) : undefined,
      angular: isSet(object.angular) ? Number(object.angular) : 0,
    };
  },

  toJSON(message: SE2Velocity): unknown {
    const obj: any = {};
    message.linear !== undefined &&
      (obj.linear = message.linear ? Vec2.toJSON(message.linear) : undefined);
    message.angular !== undefined && (obj.angular = message.angular);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SE2Velocity>, I>>(
    object: I
  ): SE2Velocity {
    const message = createBaseSE2Velocity();
    message.linear =
      object.linear !== undefined && object.linear !== null
        ? Vec2.fromPartial(object.linear)
        : undefined;
    message.angular = object.angular ?? 0;
    return message;
  },
};

function createBaseSE2VelocityLimit(): SE2VelocityLimit {
  return { maxVel: undefined, minVel: undefined };
}

export const SE2VelocityLimit = {
  encode(
    message: SE2VelocityLimit,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.maxVel !== undefined) {
      SE2Velocity.encode(message.maxVel, writer.uint32(10).fork()).ldelim();
    }
    if (message.minVel !== undefined) {
      SE2Velocity.encode(message.minVel, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SE2VelocityLimit {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSE2VelocityLimit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.maxVel = SE2Velocity.decode(reader, reader.uint32());
          break;
        case 2:
          message.minVel = SE2Velocity.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SE2VelocityLimit {
    return {
      maxVel: isSet(object.maxVel)
        ? SE2Velocity.fromJSON(object.maxVel)
        : undefined,
      minVel: isSet(object.minVel)
        ? SE2Velocity.fromJSON(object.minVel)
        : undefined,
    };
  },

  toJSON(message: SE2VelocityLimit): unknown {
    const obj: any = {};
    message.maxVel !== undefined &&
      (obj.maxVel = message.maxVel
        ? SE2Velocity.toJSON(message.maxVel)
        : undefined);
    message.minVel !== undefined &&
      (obj.minVel = message.minVel
        ? SE2Velocity.toJSON(message.minVel)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SE2VelocityLimit>, I>>(
    object: I
  ): SE2VelocityLimit {
    const message = createBaseSE2VelocityLimit();
    message.maxVel =
      object.maxVel !== undefined && object.maxVel !== null
        ? SE2Velocity.fromPartial(object.maxVel)
        : undefined;
    message.minVel =
      object.minVel !== undefined && object.minVel !== null
        ? SE2Velocity.fromPartial(object.minVel)
        : undefined;
    return message;
  },
};

function createBaseSE3Pose(): SE3Pose {
  return { position: undefined, rotation: undefined };
}

export const SE3Pose = {
  encode(
    message: SE3Pose,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.position !== undefined) {
      Vec3.encode(message.position, writer.uint32(10).fork()).ldelim();
    }
    if (message.rotation !== undefined) {
      Quaternion.encode(message.rotation, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SE3Pose {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSE3Pose();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.position = Vec3.decode(reader, reader.uint32());
          break;
        case 2:
          message.rotation = Quaternion.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SE3Pose {
    return {
      position: isSet(object.position)
        ? Vec3.fromJSON(object.position)
        : undefined,
      rotation: isSet(object.rotation)
        ? Quaternion.fromJSON(object.rotation)
        : undefined,
    };
  },

  toJSON(message: SE3Pose): unknown {
    const obj: any = {};
    message.position !== undefined &&
      (obj.position = message.position
        ? Vec3.toJSON(message.position)
        : undefined);
    message.rotation !== undefined &&
      (obj.rotation = message.rotation
        ? Quaternion.toJSON(message.rotation)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SE3Pose>, I>>(object: I): SE3Pose {
    const message = createBaseSE3Pose();
    message.position =
      object.position !== undefined && object.position !== null
        ? Vec3.fromPartial(object.position)
        : undefined;
    message.rotation =
      object.rotation !== undefined && object.rotation !== null
        ? Quaternion.fromPartial(object.rotation)
        : undefined;
    return message;
  },
};

function createBaseSE3Velocity(): SE3Velocity {
  return { linear: undefined, angular: undefined };
}

export const SE3Velocity = {
  encode(
    message: SE3Velocity,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.linear !== undefined) {
      Vec3.encode(message.linear, writer.uint32(10).fork()).ldelim();
    }
    if (message.angular !== undefined) {
      Vec3.encode(message.angular, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SE3Velocity {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSE3Velocity();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.linear = Vec3.decode(reader, reader.uint32());
          break;
        case 2:
          message.angular = Vec3.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SE3Velocity {
    return {
      linear: isSet(object.linear) ? Vec3.fromJSON(object.linear) : undefined,
      angular: isSet(object.angular)
        ? Vec3.fromJSON(object.angular)
        : undefined,
    };
  },

  toJSON(message: SE3Velocity): unknown {
    const obj: any = {};
    message.linear !== undefined &&
      (obj.linear = message.linear ? Vec3.toJSON(message.linear) : undefined);
    message.angular !== undefined &&
      (obj.angular = message.angular
        ? Vec3.toJSON(message.angular)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SE3Velocity>, I>>(
    object: I
  ): SE3Velocity {
    const message = createBaseSE3Velocity();
    message.linear =
      object.linear !== undefined && object.linear !== null
        ? Vec3.fromPartial(object.linear)
        : undefined;
    message.angular =
      object.angular !== undefined && object.angular !== null
        ? Vec3.fromPartial(object.angular)
        : undefined;
    return message;
  },
};

function createBaseWrench(): Wrench {
  return { force: undefined, torque: undefined };
}

export const Wrench = {
  encode(
    message: Wrench,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.force !== undefined) {
      Vec3.encode(message.force, writer.uint32(10).fork()).ldelim();
    }
    if (message.torque !== undefined) {
      Vec3.encode(message.torque, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Wrench {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWrench();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.force = Vec3.decode(reader, reader.uint32());
          break;
        case 2:
          message.torque = Vec3.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Wrench {
    return {
      force: isSet(object.force) ? Vec3.fromJSON(object.force) : undefined,
      torque: isSet(object.torque) ? Vec3.fromJSON(object.torque) : undefined,
    };
  },

  toJSON(message: Wrench): unknown {
    const obj: any = {};
    message.force !== undefined &&
      (obj.force = message.force ? Vec3.toJSON(message.force) : undefined);
    message.torque !== undefined &&
      (obj.torque = message.torque ? Vec3.toJSON(message.torque) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Wrench>, I>>(object: I): Wrench {
    const message = createBaseWrench();
    message.force =
      object.force !== undefined && object.force !== null
        ? Vec3.fromPartial(object.force)
        : undefined;
    message.torque =
      object.torque !== undefined && object.torque !== null
        ? Vec3.fromPartial(object.torque)
        : undefined;
    return message;
  },
};

function createBaseFrameTreeSnapshot(): FrameTreeSnapshot {
  return { childToParentEdgeMap: {} };
}

export const FrameTreeSnapshot = {
  encode(
    message: FrameTreeSnapshot,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    Object.entries(message.childToParentEdgeMap).forEach(([key, value]) => {
      FrameTreeSnapshot_ChildToParentEdgeMapEntry.encode(
        { key: key as any, value },
        writer.uint32(10).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FrameTreeSnapshot {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFrameTreeSnapshot();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = FrameTreeSnapshot_ChildToParentEdgeMapEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry1.value !== undefined) {
            message.childToParentEdgeMap[entry1.key] = entry1.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FrameTreeSnapshot {
    return {
      childToParentEdgeMap: isObject(object.childToParentEdgeMap)
        ? Object.entries(object.childToParentEdgeMap).reduce<{
            [key: string]: FrameTreeSnapshot_ParentEdge;
          }>((acc, [key, value]) => {
            acc[key] = FrameTreeSnapshot_ParentEdge.fromJSON(value);
            return acc;
          }, {})
        : {},
    };
  },

  toJSON(message: FrameTreeSnapshot): unknown {
    const obj: any = {};
    obj.childToParentEdgeMap = {};
    if (message.childToParentEdgeMap) {
      Object.entries(message.childToParentEdgeMap).forEach(([k, v]) => {
        obj.childToParentEdgeMap[k] = FrameTreeSnapshot_ParentEdge.toJSON(v);
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FrameTreeSnapshot>, I>>(
    object: I
  ): FrameTreeSnapshot {
    const message = createBaseFrameTreeSnapshot();
    message.childToParentEdgeMap = Object.entries(
      object.childToParentEdgeMap ?? {}
    ).reduce<{ [key: string]: FrameTreeSnapshot_ParentEdge }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = FrameTreeSnapshot_ParentEdge.fromPartial(value);
        }
        return acc;
      },
      {}
    );
    return message;
  },
};

function createBaseFrameTreeSnapshot_ParentEdge(): FrameTreeSnapshot_ParentEdge {
  return { parentFrameName: "", parentTformChild: undefined };
}

export const FrameTreeSnapshot_ParentEdge = {
  encode(
    message: FrameTreeSnapshot_ParentEdge,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.parentFrameName !== "") {
      writer.uint32(10).string(message.parentFrameName);
    }
    if (message.parentTformChild !== undefined) {
      SE3Pose.encode(
        message.parentTformChild,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): FrameTreeSnapshot_ParentEdge {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFrameTreeSnapshot_ParentEdge();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.parentFrameName = reader.string();
          break;
        case 2:
          message.parentTformChild = SE3Pose.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FrameTreeSnapshot_ParentEdge {
    return {
      parentFrameName: isSet(object.parentFrameName)
        ? String(object.parentFrameName)
        : "",
      parentTformChild: isSet(object.parentTformChild)
        ? SE3Pose.fromJSON(object.parentTformChild)
        : undefined,
    };
  },

  toJSON(message: FrameTreeSnapshot_ParentEdge): unknown {
    const obj: any = {};
    message.parentFrameName !== undefined &&
      (obj.parentFrameName = message.parentFrameName);
    message.parentTformChild !== undefined &&
      (obj.parentTformChild = message.parentTformChild
        ? SE3Pose.toJSON(message.parentTformChild)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FrameTreeSnapshot_ParentEdge>, I>>(
    object: I
  ): FrameTreeSnapshot_ParentEdge {
    const message = createBaseFrameTreeSnapshot_ParentEdge();
    message.parentFrameName = object.parentFrameName ?? "";
    message.parentTformChild =
      object.parentTformChild !== undefined && object.parentTformChild !== null
        ? SE3Pose.fromPartial(object.parentTformChild)
        : undefined;
    return message;
  },
};

function createBaseFrameTreeSnapshot_ChildToParentEdgeMapEntry(): FrameTreeSnapshot_ChildToParentEdgeMapEntry {
  return { key: "", value: undefined };
}

export const FrameTreeSnapshot_ChildToParentEdgeMapEntry = {
  encode(
    message: FrameTreeSnapshot_ChildToParentEdgeMapEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      FrameTreeSnapshot_ParentEdge.encode(
        message.value,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): FrameTreeSnapshot_ChildToParentEdgeMapEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFrameTreeSnapshot_ChildToParentEdgeMapEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = FrameTreeSnapshot_ParentEdge.decode(
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

  fromJSON(object: any): FrameTreeSnapshot_ChildToParentEdgeMapEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value)
        ? FrameTreeSnapshot_ParentEdge.fromJSON(object.value)
        : undefined,
    };
  },

  toJSON(message: FrameTreeSnapshot_ChildToParentEdgeMapEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value
        ? FrameTreeSnapshot_ParentEdge.toJSON(message.value)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<FrameTreeSnapshot_ChildToParentEdgeMapEntry>, I>
  >(object: I): FrameTreeSnapshot_ChildToParentEdgeMapEntry {
    const message = createBaseFrameTreeSnapshot_ChildToParentEdgeMapEntry();
    message.key = object.key ?? "";
    message.value =
      object.value !== undefined && object.value !== null
        ? FrameTreeSnapshot_ParentEdge.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseBox2(): Box2 {
  return { size: undefined };
}

export const Box2 = {
  encode(message: Box2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.size !== undefined) {
      Vec2.encode(message.size, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Box2 {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBox2();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.size = Vec2.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Box2 {
    return {
      size: isSet(object.size) ? Vec2.fromJSON(object.size) : undefined,
    };
  },

  toJSON(message: Box2): unknown {
    const obj: any = {};
    message.size !== undefined &&
      (obj.size = message.size ? Vec2.toJSON(message.size) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Box2>, I>>(object: I): Box2 {
    const message = createBaseBox2();
    message.size =
      object.size !== undefined && object.size !== null
        ? Vec2.fromPartial(object.size)
        : undefined;
    return message;
  },
};

function createBaseBox2WithFrame(): Box2WithFrame {
  return { box: undefined, frameName: "", frameNameTformBox: undefined };
}

export const Box2WithFrame = {
  encode(
    message: Box2WithFrame,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.box !== undefined) {
      Box2.encode(message.box, writer.uint32(10).fork()).ldelim();
    }
    if (message.frameName !== "") {
      writer.uint32(18).string(message.frameName);
    }
    if (message.frameNameTformBox !== undefined) {
      SE3Pose.encode(
        message.frameNameTformBox,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Box2WithFrame {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBox2WithFrame();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.box = Box2.decode(reader, reader.uint32());
          break;
        case 2:
          message.frameName = reader.string();
          break;
        case 3:
          message.frameNameTformBox = SE3Pose.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Box2WithFrame {
    return {
      box: isSet(object.box) ? Box2.fromJSON(object.box) : undefined,
      frameName: isSet(object.frameName) ? String(object.frameName) : "",
      frameNameTformBox: isSet(object.frameNameTformBox)
        ? SE3Pose.fromJSON(object.frameNameTformBox)
        : undefined,
    };
  },

  toJSON(message: Box2WithFrame): unknown {
    const obj: any = {};
    message.box !== undefined &&
      (obj.box = message.box ? Box2.toJSON(message.box) : undefined);
    message.frameName !== undefined && (obj.frameName = message.frameName);
    message.frameNameTformBox !== undefined &&
      (obj.frameNameTformBox = message.frameNameTformBox
        ? SE3Pose.toJSON(message.frameNameTformBox)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Box2WithFrame>, I>>(
    object: I
  ): Box2WithFrame {
    const message = createBaseBox2WithFrame();
    message.box =
      object.box !== undefined && object.box !== null
        ? Box2.fromPartial(object.box)
        : undefined;
    message.frameName = object.frameName ?? "";
    message.frameNameTformBox =
      object.frameNameTformBox !== undefined &&
      object.frameNameTformBox !== null
        ? SE3Pose.fromPartial(object.frameNameTformBox)
        : undefined;
    return message;
  },
};

function createBaseBox3(): Box3 {
  return { size: undefined };
}

export const Box3 = {
  encode(message: Box3, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.size !== undefined) {
      Vec3.encode(message.size, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Box3 {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBox3();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.size = Vec3.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Box3 {
    return {
      size: isSet(object.size) ? Vec3.fromJSON(object.size) : undefined,
    };
  },

  toJSON(message: Box3): unknown {
    const obj: any = {};
    message.size !== undefined &&
      (obj.size = message.size ? Vec3.toJSON(message.size) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Box3>, I>>(object: I): Box3 {
    const message = createBaseBox3();
    message.size =
      object.size !== undefined && object.size !== null
        ? Vec3.fromPartial(object.size)
        : undefined;
    return message;
  },
};

function createBaseBox3WithFrame(): Box3WithFrame {
  return { box: undefined, frameName: "", frameNameTformBox: undefined };
}

export const Box3WithFrame = {
  encode(
    message: Box3WithFrame,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.box !== undefined) {
      Box3.encode(message.box, writer.uint32(10).fork()).ldelim();
    }
    if (message.frameName !== "") {
      writer.uint32(18).string(message.frameName);
    }
    if (message.frameNameTformBox !== undefined) {
      SE3Pose.encode(
        message.frameNameTformBox,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Box3WithFrame {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBox3WithFrame();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.box = Box3.decode(reader, reader.uint32());
          break;
        case 2:
          message.frameName = reader.string();
          break;
        case 3:
          message.frameNameTformBox = SE3Pose.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Box3WithFrame {
    return {
      box: isSet(object.box) ? Box3.fromJSON(object.box) : undefined,
      frameName: isSet(object.frameName) ? String(object.frameName) : "",
      frameNameTformBox: isSet(object.frameNameTformBox)
        ? SE3Pose.fromJSON(object.frameNameTformBox)
        : undefined,
    };
  },

  toJSON(message: Box3WithFrame): unknown {
    const obj: any = {};
    message.box !== undefined &&
      (obj.box = message.box ? Box3.toJSON(message.box) : undefined);
    message.frameName !== undefined && (obj.frameName = message.frameName);
    message.frameNameTformBox !== undefined &&
      (obj.frameNameTformBox = message.frameNameTformBox
        ? SE3Pose.toJSON(message.frameNameTformBox)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Box3WithFrame>, I>>(
    object: I
  ): Box3WithFrame {
    const message = createBaseBox3WithFrame();
    message.box =
      object.box !== undefined && object.box !== null
        ? Box3.fromPartial(object.box)
        : undefined;
    message.frameName = object.frameName ?? "";
    message.frameNameTformBox =
      object.frameNameTformBox !== undefined &&
      object.frameNameTformBox !== null
        ? SE3Pose.fromPartial(object.frameNameTformBox)
        : undefined;
    return message;
  },
};

function createBaseMatrix(): Matrix {
  return { rows: 0, cols: 0, values: [] };
}

export const Matrix = {
  encode(
    message: Matrix,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.rows !== 0) {
      writer.uint32(8).int32(message.rows);
    }
    if (message.cols !== 0) {
      writer.uint32(16).int32(message.cols);
    }
    writer.uint32(26).fork();
    for (const v of message.values) {
      writer.double(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Matrix {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMatrix();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rows = reader.int32();
          break;
        case 2:
          message.cols = reader.int32();
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.values.push(reader.double());
            }
          } else {
            message.values.push(reader.double());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Matrix {
    return {
      rows: isSet(object.rows) ? Number(object.rows) : 0,
      cols: isSet(object.cols) ? Number(object.cols) : 0,
      values: Array.isArray(object?.values)
        ? object.values.map((e: any) => Number(e))
        : [],
    };
  },

  toJSON(message: Matrix): unknown {
    const obj: any = {};
    message.rows !== undefined && (obj.rows = Math.round(message.rows));
    message.cols !== undefined && (obj.cols = Math.round(message.cols));
    if (message.values) {
      obj.values = message.values.map((e) => e);
    } else {
      obj.values = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Matrix>, I>>(object: I): Matrix {
    const message = createBaseMatrix();
    message.rows = object.rows ?? 0;
    message.cols = object.cols ?? 0;
    message.values = object.values?.map((e) => e) || [];
    return message;
  },
};

function createBaseSE3Covariance(): SE3Covariance {
  return {
    matrix: undefined,
    yawVariance: 0,
    covXx: 0,
    covXy: 0,
    covXz: 0,
    covYx: 0,
    covYy: 0,
    covYz: 0,
    covZx: 0,
    covZy: 0,
    covZz: 0,
  };
}

export const SE3Covariance = {
  encode(
    message: SE3Covariance,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.matrix !== undefined) {
      Matrix.encode(message.matrix, writer.uint32(10).fork()).ldelim();
    }
    if (message.yawVariance !== 0) {
      writer.uint32(17).double(message.yawVariance);
    }
    if (message.covXx !== 0) {
      writer.uint32(25).double(message.covXx);
    }
    if (message.covXy !== 0) {
      writer.uint32(33).double(message.covXy);
    }
    if (message.covXz !== 0) {
      writer.uint32(41).double(message.covXz);
    }
    if (message.covYx !== 0) {
      writer.uint32(49).double(message.covYx);
    }
    if (message.covYy !== 0) {
      writer.uint32(57).double(message.covYy);
    }
    if (message.covYz !== 0) {
      writer.uint32(65).double(message.covYz);
    }
    if (message.covZx !== 0) {
      writer.uint32(73).double(message.covZx);
    }
    if (message.covZy !== 0) {
      writer.uint32(81).double(message.covZy);
    }
    if (message.covZz !== 0) {
      writer.uint32(89).double(message.covZz);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SE3Covariance {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSE3Covariance();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.matrix = Matrix.decode(reader, reader.uint32());
          break;
        case 2:
          message.yawVariance = reader.double();
          break;
        case 3:
          message.covXx = reader.double();
          break;
        case 4:
          message.covXy = reader.double();
          break;
        case 5:
          message.covXz = reader.double();
          break;
        case 6:
          message.covYx = reader.double();
          break;
        case 7:
          message.covYy = reader.double();
          break;
        case 8:
          message.covYz = reader.double();
          break;
        case 9:
          message.covZx = reader.double();
          break;
        case 10:
          message.covZy = reader.double();
          break;
        case 11:
          message.covZz = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SE3Covariance {
    return {
      matrix: isSet(object.matrix) ? Matrix.fromJSON(object.matrix) : undefined,
      yawVariance: isSet(object.yawVariance) ? Number(object.yawVariance) : 0,
      covXx: isSet(object.covXx) ? Number(object.covXx) : 0,
      covXy: isSet(object.covXy) ? Number(object.covXy) : 0,
      covXz: isSet(object.covXz) ? Number(object.covXz) : 0,
      covYx: isSet(object.covYx) ? Number(object.covYx) : 0,
      covYy: isSet(object.covYy) ? Number(object.covYy) : 0,
      covYz: isSet(object.covYz) ? Number(object.covYz) : 0,
      covZx: isSet(object.covZx) ? Number(object.covZx) : 0,
      covZy: isSet(object.covZy) ? Number(object.covZy) : 0,
      covZz: isSet(object.covZz) ? Number(object.covZz) : 0,
    };
  },

  toJSON(message: SE3Covariance): unknown {
    const obj: any = {};
    message.matrix !== undefined &&
      (obj.matrix = message.matrix ? Matrix.toJSON(message.matrix) : undefined);
    message.yawVariance !== undefined &&
      (obj.yawVariance = message.yawVariance);
    message.covXx !== undefined && (obj.covXx = message.covXx);
    message.covXy !== undefined && (obj.covXy = message.covXy);
    message.covXz !== undefined && (obj.covXz = message.covXz);
    message.covYx !== undefined && (obj.covYx = message.covYx);
    message.covYy !== undefined && (obj.covYy = message.covYy);
    message.covYz !== undefined && (obj.covYz = message.covYz);
    message.covZx !== undefined && (obj.covZx = message.covZx);
    message.covZy !== undefined && (obj.covZy = message.covZy);
    message.covZz !== undefined && (obj.covZz = message.covZz);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SE3Covariance>, I>>(
    object: I
  ): SE3Covariance {
    const message = createBaseSE3Covariance();
    message.matrix =
      object.matrix !== undefined && object.matrix !== null
        ? Matrix.fromPartial(object.matrix)
        : undefined;
    message.yawVariance = object.yawVariance ?? 0;
    message.covXx = object.covXx ?? 0;
    message.covXy = object.covXy ?? 0;
    message.covXz = object.covXz ?? 0;
    message.covYx = object.covYx ?? 0;
    message.covYy = object.covYy ?? 0;
    message.covYz = object.covYz ?? 0;
    message.covZx = object.covZx ?? 0;
    message.covZy = object.covZy ?? 0;
    message.covZz = object.covZz ?? 0;
    return message;
  },
};

function createBasePolyLine(): PolyLine {
  return { points: [] };
}

export const PolyLine = {
  encode(
    message: PolyLine,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.points) {
      Vec2.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PolyLine {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePolyLine();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.points.push(Vec2.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PolyLine {
    return {
      points: Array.isArray(object?.points)
        ? object.points.map((e: any) => Vec2.fromJSON(e))
        : [],
    };
  },

  toJSON(message: PolyLine): unknown {
    const obj: any = {};
    if (message.points) {
      obj.points = message.points.map((e) => (e ? Vec2.toJSON(e) : undefined));
    } else {
      obj.points = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PolyLine>, I>>(object: I): PolyLine {
    const message = createBasePolyLine();
    message.points = object.points?.map((e) => Vec2.fromPartial(e)) || [];
    return message;
  },
};

function createBasePolygon(): Polygon {
  return { vertexes: [] };
}

export const Polygon = {
  encode(
    message: Polygon,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.vertexes) {
      Vec2.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Polygon {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePolygon();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.vertexes.push(Vec2.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Polygon {
    return {
      vertexes: Array.isArray(object?.vertexes)
        ? object.vertexes.map((e: any) => Vec2.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Polygon): unknown {
    const obj: any = {};
    if (message.vertexes) {
      obj.vertexes = message.vertexes.map((e) =>
        e ? Vec2.toJSON(e) : undefined
      );
    } else {
      obj.vertexes = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Polygon>, I>>(object: I): Polygon {
    const message = createBasePolygon();
    message.vertexes = object.vertexes?.map((e) => Vec2.fromPartial(e)) || [];
    return message;
  },
};

function createBasePolygonWithExclusions(): PolygonWithExclusions {
  return { inclusion: undefined, exclusions: [] };
}

export const PolygonWithExclusions = {
  encode(
    message: PolygonWithExclusions,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.inclusion !== undefined) {
      Polygon.encode(message.inclusion, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.exclusions) {
      Polygon.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): PolygonWithExclusions {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePolygonWithExclusions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 5:
          message.inclusion = Polygon.decode(reader, reader.uint32());
          break;
        case 6:
          message.exclusions.push(Polygon.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PolygonWithExclusions {
    return {
      inclusion: isSet(object.inclusion)
        ? Polygon.fromJSON(object.inclusion)
        : undefined,
      exclusions: Array.isArray(object?.exclusions)
        ? object.exclusions.map((e: any) => Polygon.fromJSON(e))
        : [],
    };
  },

  toJSON(message: PolygonWithExclusions): unknown {
    const obj: any = {};
    message.inclusion !== undefined &&
      (obj.inclusion = message.inclusion
        ? Polygon.toJSON(message.inclusion)
        : undefined);
    if (message.exclusions) {
      obj.exclusions = message.exclusions.map((e) =>
        e ? Polygon.toJSON(e) : undefined
      );
    } else {
      obj.exclusions = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PolygonWithExclusions>, I>>(
    object: I
  ): PolygonWithExclusions {
    const message = createBasePolygonWithExclusions();
    message.inclusion =
      object.inclusion !== undefined && object.inclusion !== null
        ? Polygon.fromPartial(object.inclusion)
        : undefined;
    message.exclusions =
      object.exclusions?.map((e) => Polygon.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCircle(): Circle {
  return { centerPt: undefined, radius: 0 };
}

export const Circle = {
  encode(
    message: Circle,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.centerPt !== undefined) {
      Vec2.encode(message.centerPt, writer.uint32(10).fork()).ldelim();
    }
    if (message.radius !== 0) {
      writer.uint32(17).double(message.radius);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Circle {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCircle();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.centerPt = Vec2.decode(reader, reader.uint32());
          break;
        case 2:
          message.radius = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Circle {
    return {
      centerPt: isSet(object.centerPt)
        ? Vec2.fromJSON(object.centerPt)
        : undefined,
      radius: isSet(object.radius) ? Number(object.radius) : 0,
    };
  },

  toJSON(message: Circle): unknown {
    const obj: any = {};
    message.centerPt !== undefined &&
      (obj.centerPt = message.centerPt
        ? Vec2.toJSON(message.centerPt)
        : undefined);
    message.radius !== undefined && (obj.radius = message.radius);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Circle>, I>>(object: I): Circle {
    const message = createBaseCircle();
    message.centerPt =
      object.centerPt !== undefined && object.centerPt !== null
        ? Vec2.fromPartial(object.centerPt)
        : undefined;
    message.radius = object.radius ?? 0;
    return message;
  },
};

function createBaseArea(): Area {
  return { polygon: undefined, circle: undefined };
}

export const Area = {
  encode(message: Area, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.polygon !== undefined) {
      Polygon.encode(message.polygon, writer.uint32(10).fork()).ldelim();
    }
    if (message.circle !== undefined) {
      Circle.encode(message.circle, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Area {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArea();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.polygon = Polygon.decode(reader, reader.uint32());
          break;
        case 2:
          message.circle = Circle.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Area {
    return {
      polygon: isSet(object.polygon)
        ? Polygon.fromJSON(object.polygon)
        : undefined,
      circle: isSet(object.circle) ? Circle.fromJSON(object.circle) : undefined,
    };
  },

  toJSON(message: Area): unknown {
    const obj: any = {};
    message.polygon !== undefined &&
      (obj.polygon = message.polygon
        ? Polygon.toJSON(message.polygon)
        : undefined);
    message.circle !== undefined &&
      (obj.circle = message.circle ? Circle.toJSON(message.circle) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Area>, I>>(object: I): Area {
    const message = createBaseArea();
    message.polygon =
      object.polygon !== undefined && object.polygon !== null
        ? Polygon.fromPartial(object.polygon)
        : undefined;
    message.circle =
      object.circle !== undefined && object.circle !== null
        ? Circle.fromPartial(object.circle)
        : undefined;
    return message;
  },
};

function createBaseVolume(): Volume {
  return { box: undefined };
}

export const Volume = {
  encode(
    message: Volume,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.box !== undefined) {
      Vec3.encode(message.box, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Volume {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVolume();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.box = Vec3.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Volume {
    return {
      box: isSet(object.box) ? Vec3.fromJSON(object.box) : undefined,
    };
  },

  toJSON(message: Volume): unknown {
    const obj: any = {};
    message.box !== undefined &&
      (obj.box = message.box ? Vec3.toJSON(message.box) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Volume>, I>>(object: I): Volume {
    const message = createBaseVolume();
    message.box =
      object.box !== undefined && object.box !== null
        ? Vec3.fromPartial(object.box)
        : undefined;
    return message;
  },
};

function createBaseBounds(): Bounds {
  return { lower: 0, upper: 0 };
}

export const Bounds = {
  encode(
    message: Bounds,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.lower !== 0) {
      writer.uint32(9).double(message.lower);
    }
    if (message.upper !== 0) {
      writer.uint32(17).double(message.upper);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Bounds {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBounds();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lower = reader.double();
          break;
        case 2:
          message.upper = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Bounds {
    return {
      lower: isSet(object.lower) ? Number(object.lower) : 0,
      upper: isSet(object.upper) ? Number(object.upper) : 0,
    };
  },

  toJSON(message: Bounds): unknown {
    const obj: any = {};
    message.lower !== undefined && (obj.lower = message.lower);
    message.upper !== undefined && (obj.upper = message.upper);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Bounds>, I>>(object: I): Bounds {
    const message = createBaseBounds();
    message.lower = object.lower ?? 0;
    message.upper = object.upper ?? 0;
    return message;
  },
};

function createBaseVec2Value(): Vec2Value {
  return { x: undefined, y: undefined };
}

export const Vec2Value = {
  encode(
    message: Vec2Value,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.x !== undefined) {
      DoubleValue.encode(
        { value: message.x! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.y !== undefined) {
      DoubleValue.encode(
        { value: message.y! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Vec2Value {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVec2Value();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.x = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.y = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Vec2Value {
    return {
      x: isSet(object.x) ? Number(object.x) : undefined,
      y: isSet(object.y) ? Number(object.y) : undefined,
    };
  },

  toJSON(message: Vec2Value): unknown {
    const obj: any = {};
    message.x !== undefined && (obj.x = message.x);
    message.y !== undefined && (obj.y = message.y);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Vec2Value>, I>>(
    object: I
  ): Vec2Value {
    const message = createBaseVec2Value();
    message.x = object.x ?? undefined;
    message.y = object.y ?? undefined;
    return message;
  },
};

function createBaseVec3Value(): Vec3Value {
  return { x: undefined, y: undefined, z: undefined };
}

export const Vec3Value = {
  encode(
    message: Vec3Value,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.x !== undefined) {
      DoubleValue.encode(
        { value: message.x! },
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.y !== undefined) {
      DoubleValue.encode(
        { value: message.y! },
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.z !== undefined) {
      DoubleValue.encode(
        { value: message.z! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Vec3Value {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVec3Value();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.x = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.y = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.z = DoubleValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Vec3Value {
    return {
      x: isSet(object.x) ? Number(object.x) : undefined,
      y: isSet(object.y) ? Number(object.y) : undefined,
      z: isSet(object.z) ? Number(object.z) : undefined,
    };
  },

  toJSON(message: Vec3Value): unknown {
    const obj: any = {};
    message.x !== undefined && (obj.x = message.x);
    message.y !== undefined && (obj.y = message.y);
    message.z !== undefined && (obj.z = message.z);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Vec3Value>, I>>(
    object: I
  ): Vec3Value {
    const message = createBaseVec3Value();
    message.x = object.x ?? undefined;
    message.y = object.y ?? undefined;
    message.z = object.z ?? undefined;
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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
