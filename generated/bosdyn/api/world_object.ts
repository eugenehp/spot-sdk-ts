/* eslint-disable */
import { DockType, dockTypeFromJSON, dockTypeToJSON } from "./docking/docking";
import { Timestamp } from "../../google/protobuf/timestamp";
import {
  FrameTreeSnapshot,
  Polygon,
  Vec2,
  SE3Covariance,
  Ray,
  Vec3,
} from "./geometry";
import { Any } from "../../google/protobuf/any";
import { RequestHeader, ResponseHeader } from "./header";
import { KeypointSet } from "./sparse_features";
import { ImageSource, ImageCapture } from "./image";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/**
 * A type for the world object, which is associated with whatever properties the world object includes. This can
 * be used to request specific kinds of objects; for example, a request for only fiducials.
 */
export enum WorldObjectType {
  WORLD_OBJECT_UNKNOWN = 0,
  WORLD_OBJECT_DRAWABLE = 1,
  WORLD_OBJECT_APRILTAG = 2,
  WORLD_OBJECT_IMAGE_COORDINATES = 5,
  WORLD_OBJECT_DOCK = 6,
  UNRECOGNIZED = -1,
}

export function worldObjectTypeFromJSON(object: any): WorldObjectType {
  switch (object) {
    case 0:
    case "WORLD_OBJECT_UNKNOWN":
      return WorldObjectType.WORLD_OBJECT_UNKNOWN;
    case 1:
    case "WORLD_OBJECT_DRAWABLE":
      return WorldObjectType.WORLD_OBJECT_DRAWABLE;
    case 2:
    case "WORLD_OBJECT_APRILTAG":
      return WorldObjectType.WORLD_OBJECT_APRILTAG;
    case 5:
    case "WORLD_OBJECT_IMAGE_COORDINATES":
      return WorldObjectType.WORLD_OBJECT_IMAGE_COORDINATES;
    case 6:
    case "WORLD_OBJECT_DOCK":
      return WorldObjectType.WORLD_OBJECT_DOCK;
    case -1:
    case "UNRECOGNIZED":
    default:
      return WorldObjectType.UNRECOGNIZED;
  }
}

export function worldObjectTypeToJSON(object: WorldObjectType): string {
  switch (object) {
    case WorldObjectType.WORLD_OBJECT_UNKNOWN:
      return "WORLD_OBJECT_UNKNOWN";
    case WorldObjectType.WORLD_OBJECT_DRAWABLE:
      return "WORLD_OBJECT_DRAWABLE";
    case WorldObjectType.WORLD_OBJECT_APRILTAG:
      return "WORLD_OBJECT_APRILTAG";
    case WorldObjectType.WORLD_OBJECT_IMAGE_COORDINATES:
      return "WORLD_OBJECT_IMAGE_COORDINATES";
    case WorldObjectType.WORLD_OBJECT_DOCK:
      return "WORLD_OBJECT_DOCK";
    case WorldObjectType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * The world object message is used to describe different objects seen by a robot. It contains information
 * about the properties of the object in addition to a unique id and the transform snapshot.
 * The world object uses "properties" to describe different traits about the object, such as image coordinates
 * associated with the camera the object was detected in. A world object can have multiple different properties
 * that are all associated with the single object.
 */
export interface WorldObject {
  /**
   * Unique integer identifier that will be consistent for the duration of a robot's battery life
   * The id is set internally by the world object service.
   */
  id: number;
  /**
   * A human readable name for the world object. Note that this differs from any frame_name's associated
   * with the object (since there can be multiple frames describing a single object).
   */
  name: string;
  /** Time in robot time clock at which this object was most recently detected and valid. */
  acquisitionTime: Date | undefined;
  /**
   * A tree-based collection of transformations, which will include the transformations to each
   * of the returned world objects in addition to transformations to the common frames ("vision",
   * "body", "odom"). All transforms within the snapshot are at the acquisition time of the world object.
   * Note that each object's frame names are defined within the properties submessage. For example,
   * the apriltag frame name is defined in the AprilTagProperties message as "frame_name_fiducial"
   */
  transformsSnapshot: FrameTreeSnapshot | undefined;
  /** The drawable properties describe geometric shapes associated with an object. */
  drawableProperties: DrawableProperties[];
  /** The apriltag properties describe any fiducial identifying an object. */
  apriltagProperties: AprilTagProperties | undefined;
  /** The image properties describe any camera and image coordinates associated with an object. */
  imageProperties: ImageProperties | undefined;
  /** Properties describing a dock */
  dockProperties: DockProperties | undefined;
  /**
   * A ray pointing at the object.  Useful in cases where position is unknown but direction is
   * known.
   */
  rayProperties: RayProperties | undefined;
  /** Bounding box in the world, oriented at the location provided in the transforms_snapshot. */
  boundingBoxProperties: BoundingBoxProperties | undefined;
  /** An extra field for application-specific object properties. */
  additionalProperties: Any | undefined;
}

/** The ListWorldObject request message, which can optionally include filters for the object type or timestamp. */
export interface ListWorldObjectRequest {
  /** Common request header */
  header: RequestHeader | undefined;
  /**
   * Optional filters to apply to the world object request
   * Specific type of object; can request multiple different properties
   */
  objectType: WorldObjectType[];
  /**
   * Timestamp to filter objects based on. The time should be in robot time
   * All objects with header timestamps after (>) timestamp_filter will be returned
   */
  timestampFilter: Date | undefined;
}

/**
 * The ListWorldObject response message, which contains all of the current world objects in the
 * robot's perception scene.
 */
export interface ListWorldObjectResponse {
  /** Common response header */
  header: ResponseHeader | undefined;
  /** The currently perceived world objects. */
  worldObjects: WorldObject[];
}

/**
 * The MutateWorldObject request message, which specifies the type of mutation and which object
 * the mutation should be applied to.
 */
export interface MutateWorldObjectRequest {
  /** Common request header */
  header: RequestHeader | undefined;
  /** The mutation for this request. */
  mutation: MutateWorldObjectRequest_Mutation | undefined;
}

export enum MutateWorldObjectRequest_Action {
  /** ACTION_UNKNOWN - Invalid action. */
  ACTION_UNKNOWN = 0,
  /** ACTION_ADD - Add a new object. */
  ACTION_ADD = 1,
  /**
   * ACTION_CHANGE - Change an existing objected (ID'd by integer ID number). This is
   * only allowed to change objects added by the API-user, and not
   * objects detected by Spot's perception system.
   */
  ACTION_CHANGE = 2,
  /**
   * ACTION_DELETE - Delete the object, ID'd by integer ID number. This is
   * only allowed to change objects added by the API-user, and not
   * objects detected by Spot's perception system.
   */
  ACTION_DELETE = 3,
  UNRECOGNIZED = -1,
}

export function mutateWorldObjectRequest_ActionFromJSON(
  object: any
): MutateWorldObjectRequest_Action {
  switch (object) {
    case 0:
    case "ACTION_UNKNOWN":
      return MutateWorldObjectRequest_Action.ACTION_UNKNOWN;
    case 1:
    case "ACTION_ADD":
      return MutateWorldObjectRequest_Action.ACTION_ADD;
    case 2:
    case "ACTION_CHANGE":
      return MutateWorldObjectRequest_Action.ACTION_CHANGE;
    case 3:
    case "ACTION_DELETE":
      return MutateWorldObjectRequest_Action.ACTION_DELETE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MutateWorldObjectRequest_Action.UNRECOGNIZED;
  }
}

export function mutateWorldObjectRequest_ActionToJSON(
  object: MutateWorldObjectRequest_Action
): string {
  switch (object) {
    case MutateWorldObjectRequest_Action.ACTION_UNKNOWN:
      return "ACTION_UNKNOWN";
    case MutateWorldObjectRequest_Action.ACTION_ADD:
      return "ACTION_ADD";
    case MutateWorldObjectRequest_Action.ACTION_CHANGE:
      return "ACTION_CHANGE";
    case MutateWorldObjectRequest_Action.ACTION_DELETE:
      return "ACTION_DELETE";
    case MutateWorldObjectRequest_Action.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface MutateWorldObjectRequest_Mutation {
  /** The action (add, change, or delete) to be applied to a world object. */
  action: MutateWorldObjectRequest_Action;
  /**
   * World object to be mutated.
   * If an object is being changed/deleted, then the world object id must match a world
   * object id known by the service.
   */
  object: WorldObject | undefined;
}

/**
 * The MutateWorldObject response message, which includes the world object id for the object that
 * the mutation was applied to if the request succeeds.
 */
export interface MutateWorldObjectResponse {
  /** Common response header */
  header: ResponseHeader | undefined;
  /** Return status for the request. */
  status: MutateWorldObjectResponse_Status;
  /** ID set by the world object service for the mutated object */
  mutatedObjectId: number;
}

export enum MutateWorldObjectResponse_Status {
  /** STATUS_UNKNOWN - Status of request is unknown. Check the status code of the response header. */
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - Request was accepted; GetObjectListResponse must still be checked to verify the changes. */
  STATUS_OK = 1,
  /**
   * STATUS_INVALID_MUTATION_ID - The mutation object's ID is unknown such that the service could not recognize this object.
   * This error applies to the CHANGE and DELETE actions, since it must identify the object by
   * it's id number given by the service.
   */
  STATUS_INVALID_MUTATION_ID = 2,
  /**
   * STATUS_NO_PERMISSION - The mutation request is not allowed because it is attempting to change or delete an object
   * detected by Spot's perception system.
   */
  STATUS_NO_PERMISSION = 3,
  UNRECOGNIZED = -1,
}

export function mutateWorldObjectResponse_StatusFromJSON(
  object: any
): MutateWorldObjectResponse_Status {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return MutateWorldObjectResponse_Status.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return MutateWorldObjectResponse_Status.STATUS_OK;
    case 2:
    case "STATUS_INVALID_MUTATION_ID":
      return MutateWorldObjectResponse_Status.STATUS_INVALID_MUTATION_ID;
    case 3:
    case "STATUS_NO_PERMISSION":
      return MutateWorldObjectResponse_Status.STATUS_NO_PERMISSION;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MutateWorldObjectResponse_Status.UNRECOGNIZED;
  }
}

export function mutateWorldObjectResponse_StatusToJSON(
  object: MutateWorldObjectResponse_Status
): string {
  switch (object) {
    case MutateWorldObjectResponse_Status.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case MutateWorldObjectResponse_Status.STATUS_OK:
      return "STATUS_OK";
    case MutateWorldObjectResponse_Status.STATUS_INVALID_MUTATION_ID:
      return "STATUS_INVALID_MUTATION_ID";
    case MutateWorldObjectResponse_Status.STATUS_NO_PERMISSION:
      return "STATUS_NO_PERMISSION";
    case MutateWorldObjectResponse_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** World object properties describing image coordinates associated with an object or scene. */
export interface ImageProperties {
  /** Camera Source of such as "back", "frontleft", etc. */
  cameraSource: string;
  /**
   * Image coordinates of the corners of a polygon (pixels of x[row], y[col]) in either
   * clockwise/counter clockwise order
   */
  coordinates: Polygon | undefined;
  /** A set of keypoints and their associated metadata. */
  keypoints: KeypointSet | undefined;
  /** Camera parameters. */
  imageSource: ImageSource | undefined;
  /** Image that produced the data. */
  imageCapture: ImageCapture | undefined;
  /** Frame name for the object described by image coordinates. */
  frameNameImageCoordinates: string;
}

/** World object properties describing a dock */
export interface DockProperties {
  /** Consistent id associated with a given dock. */
  dockId: number;
  /** Type of dock. */
  type: DockType;
  /** The frame name for the location of dock origin. This will be included in the transform snapshot. */
  frameNameDock: string;
  /** Availability if the dock can be used */
  unavailable: boolean;
  /** The dock is an unconfirmed prior detection */
  fromPrior: boolean;
}

/** World object properties describing a fiducial object. */
export interface AprilTagProperties {
  /**
   * Consistent integer id associated with a given apriltag. April Tag detections will be from the
   * tag family 36h11.
   */
  tagId: number;
  /**
   * Apriltag size in meters, where x is the row/width length and y is the
   * height/col length of the tag
   */
  dimensions: Vec2 | undefined;
  /** The frame name for the raw version of this fiducial. This will be included in the transform snapshot. */
  frameNameFiducial: string;
  /** Status of the pose estimation of the unfiltered fiducial frame. */
  fiducialPoseStatus: AprilTagProperties_AprilTagPoseStatus;
  /** The frame name for the filtered version of this fiducial. This will be included in the transform snapshot. */
  frameNameFiducialFiltered: string;
  /** Status of the pose estimation of the filtered fiducial frame. */
  fiducialFilteredPoseStatus: AprilTagProperties_AprilTagPoseStatus;
  /** The frame name for the camera that detected this fiducial. */
  frameNameCamera: string;
  /**
   * A 6 x 6 Covariance matrix representing the marginal uncertainty of the last detection.
   * The rows/columns are:
   * rx, ry, rz, tx, ty, tz
   * which represent incremental rotation and translation along the x, y, and z axes of the
   * given frame, respectively.
   * This is computed using the Jacobian of the pose estimation algorithm.
   */
  detectionCovariance: SE3Covariance | undefined;
  /** The frame that the detection covariance is expressed in. */
  detectionCovarianceReferenceFrame: string;
}

export enum AprilTagProperties_AprilTagPoseStatus {
  STATUS_UNKNOWN = 0,
  /** STATUS_OK - No known issues with the pose estimate. */
  STATUS_OK = 1,
  /** STATUS_AMBIGUOUS - The orientation of the tag is ambiguous. */
  STATUS_AMBIGUOUS = 2,
  /** STATUS_HIGH_ERROR - The pose may be unreliable due to high reprojection error. */
  STATUS_HIGH_ERROR = 3,
  UNRECOGNIZED = -1,
}

export function aprilTagProperties_AprilTagPoseStatusFromJSON(
  object: any
): AprilTagProperties_AprilTagPoseStatus {
  switch (object) {
    case 0:
    case "STATUS_UNKNOWN":
      return AprilTagProperties_AprilTagPoseStatus.STATUS_UNKNOWN;
    case 1:
    case "STATUS_OK":
      return AprilTagProperties_AprilTagPoseStatus.STATUS_OK;
    case 2:
    case "STATUS_AMBIGUOUS":
      return AprilTagProperties_AprilTagPoseStatus.STATUS_AMBIGUOUS;
    case 3:
    case "STATUS_HIGH_ERROR":
      return AprilTagProperties_AprilTagPoseStatus.STATUS_HIGH_ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AprilTagProperties_AprilTagPoseStatus.UNRECOGNIZED;
  }
}

export function aprilTagProperties_AprilTagPoseStatusToJSON(
  object: AprilTagProperties_AprilTagPoseStatus
): string {
  switch (object) {
    case AprilTagProperties_AprilTagPoseStatus.STATUS_UNKNOWN:
      return "STATUS_UNKNOWN";
    case AprilTagProperties_AprilTagPoseStatus.STATUS_OK:
      return "STATUS_OK";
    case AprilTagProperties_AprilTagPoseStatus.STATUS_AMBIGUOUS:
      return "STATUS_AMBIGUOUS";
    case AprilTagProperties_AprilTagPoseStatus.STATUS_HIGH_ERROR:
      return "STATUS_HIGH_ERROR";
    case AprilTagProperties_AprilTagPoseStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface RayProperties {
  /** Ray, usually pointing from the camera to the object. */
  ray: Ray | undefined;
  /** Frame the ray is expressed with respect to. */
  frame: string;
}

export interface BoundingBoxProperties {
  /**
   * An Oriented Bounding Box, with position and orientation at the frame provided in the
   * transforms snapshot.
   *
   * The size of the box is expressed with respect to the frame.
   */
  sizeEwrtFrame: Vec3 | undefined;
  /** Frame the size is expressed with respect to. */
  frame: string;
}

/** The drawing and visualization information for a world object. */
export interface DrawableProperties {
  /** Color of the object. */
  color: DrawableProperties_Color | undefined;
  /** Label to be drawn at the origin of the object. */
  label: string;
  /** Drawn objects in wireframe. */
  wireframe: boolean;
  /** A drawable frame (oneof drawable field). */
  frame: DrawableFrame | undefined;
  /** A drawable sphere (oneof drawable field). */
  sphere: DrawableSphere | undefined;
  /** A drawable box (oneof drawable field). */
  box: DrawableBox | undefined;
  /** A drawable arrow (oneof drawable field). */
  arrow: DrawableArrow | undefined;
  /** A drawable capsule (oneof drawable field). */
  capsule: DrawableCapsule | undefined;
  /** A drawable cylinder (oneof drawable field). */
  cylinder: DrawableCylinder | undefined;
  /** A drawable linestrip (oneof drawable field). */
  linestrip: DrawableLineStrip | undefined;
  /** A drawable set of points (oneof drawable field). */
  points: DrawablePoints | undefined;
  /**
   * The frame name for the drawable object. This will optionally be
   * included in the frame tree snapshot.
   */
  frameNameDrawable: string;
}

/** RGBA values for color ranging from [0,255] for R/G/B, and [0,1] for A. */
export interface DrawableProperties_Color {
  /** Red value ranging from [0,255]. */
  r: number;
  /** / Green value ranging from [0,255]. */
  g: number;
  /** Blue value ranging from [0,255]. */
  b: number;
  /** Alpha (transparency) value ranging from [0,1]. */
  a: number;
}

/** A coordinate frame drawing object, describing how large to render the arrows. */
export interface DrawableFrame {
  arrowLength: number;
  arrowRadius: number;
}

/** A sphere drawing object. */
export interface DrawableSphere {
  radius: number;
}

/** A three dimensional box drawing object. */
export interface DrawableBox {
  size: Vec3 | undefined;
}

/** A directed arrow drawing object. */
export interface DrawableArrow {
  direction: Vec3 | undefined;
  radius: number;
}

/** A oval-like capsule drawing object. */
export interface DrawableCapsule {
  direction: Vec3 | undefined;
  radius: number;
}

/** A cylinder drawing object. */
export interface DrawableCylinder {
  direction: Vec3 | undefined;
  radius: number;
}

/** A line strip drawing object. */
export interface DrawableLineStrip {
  points: Vec3 | undefined;
}

/** A set of points drawing object. */
export interface DrawablePoints {
  points: Vec3[];
}

function createBaseWorldObject(): WorldObject {
  return {
    id: 0,
    name: "",
    acquisitionTime: undefined,
    transformsSnapshot: undefined,
    drawableProperties: [],
    apriltagProperties: undefined,
    imageProperties: undefined,
    dockProperties: undefined,
    rayProperties: undefined,
    boundingBoxProperties: undefined,
    additionalProperties: undefined,
  };
}

export const WorldObject = {
  encode(
    message: WorldObject,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.acquisitionTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.acquisitionTime),
        writer.uint32(242).fork()
      ).ldelim();
    }
    if (message.transformsSnapshot !== undefined) {
      FrameTreeSnapshot.encode(
        message.transformsSnapshot,
        writer.uint32(250).fork()
      ).ldelim();
    }
    for (const v of message.drawableProperties) {
      DrawableProperties.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.apriltagProperties !== undefined) {
      AprilTagProperties.encode(
        message.apriltagProperties,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.imageProperties !== undefined) {
      ImageProperties.encode(
        message.imageProperties,
        writer.uint32(74).fork()
      ).ldelim();
    }
    if (message.dockProperties !== undefined) {
      DockProperties.encode(
        message.dockProperties,
        writer.uint32(82).fork()
      ).ldelim();
    }
    if (message.rayProperties !== undefined) {
      RayProperties.encode(
        message.rayProperties,
        writer.uint32(90).fork()
      ).ldelim();
    }
    if (message.boundingBoxProperties !== undefined) {
      BoundingBoxProperties.encode(
        message.boundingBoxProperties,
        writer.uint32(98).fork()
      ).ldelim();
    }
    if (message.additionalProperties !== undefined) {
      Any.encode(
        message.additionalProperties,
        writer.uint32(802).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WorldObject {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWorldObject();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 30:
          message.acquisitionTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 31:
          message.transformsSnapshot = FrameTreeSnapshot.decode(
            reader,
            reader.uint32()
          );
          break;
        case 5:
          message.drawableProperties.push(
            DrawableProperties.decode(reader, reader.uint32())
          );
          break;
        case 6:
          message.apriltagProperties = AprilTagProperties.decode(
            reader,
            reader.uint32()
          );
          break;
        case 9:
          message.imageProperties = ImageProperties.decode(
            reader,
            reader.uint32()
          );
          break;
        case 10:
          message.dockProperties = DockProperties.decode(
            reader,
            reader.uint32()
          );
          break;
        case 11:
          message.rayProperties = RayProperties.decode(reader, reader.uint32());
          break;
        case 12:
          message.boundingBoxProperties = BoundingBoxProperties.decode(
            reader,
            reader.uint32()
          );
          break;
        case 100:
          message.additionalProperties = Any.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WorldObject {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      acquisitionTime: isSet(object.acquisitionTime)
        ? fromJsonTimestamp(object.acquisitionTime)
        : undefined,
      transformsSnapshot: isSet(object.transformsSnapshot)
        ? FrameTreeSnapshot.fromJSON(object.transformsSnapshot)
        : undefined,
      drawableProperties: Array.isArray(object?.drawableProperties)
        ? object.drawableProperties.map((e: any) =>
            DrawableProperties.fromJSON(e)
          )
        : [],
      apriltagProperties: isSet(object.apriltagProperties)
        ? AprilTagProperties.fromJSON(object.apriltagProperties)
        : undefined,
      imageProperties: isSet(object.imageProperties)
        ? ImageProperties.fromJSON(object.imageProperties)
        : undefined,
      dockProperties: isSet(object.dockProperties)
        ? DockProperties.fromJSON(object.dockProperties)
        : undefined,
      rayProperties: isSet(object.rayProperties)
        ? RayProperties.fromJSON(object.rayProperties)
        : undefined,
      boundingBoxProperties: isSet(object.boundingBoxProperties)
        ? BoundingBoxProperties.fromJSON(object.boundingBoxProperties)
        : undefined,
      additionalProperties: isSet(object.additionalProperties)
        ? Any.fromJSON(object.additionalProperties)
        : undefined,
    };
  },

  toJSON(message: WorldObject): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.name !== undefined && (obj.name = message.name);
    message.acquisitionTime !== undefined &&
      (obj.acquisitionTime = message.acquisitionTime.toISOString());
    message.transformsSnapshot !== undefined &&
      (obj.transformsSnapshot = message.transformsSnapshot
        ? FrameTreeSnapshot.toJSON(message.transformsSnapshot)
        : undefined);
    if (message.drawableProperties) {
      obj.drawableProperties = message.drawableProperties.map((e) =>
        e ? DrawableProperties.toJSON(e) : undefined
      );
    } else {
      obj.drawableProperties = [];
    }
    message.apriltagProperties !== undefined &&
      (obj.apriltagProperties = message.apriltagProperties
        ? AprilTagProperties.toJSON(message.apriltagProperties)
        : undefined);
    message.imageProperties !== undefined &&
      (obj.imageProperties = message.imageProperties
        ? ImageProperties.toJSON(message.imageProperties)
        : undefined);
    message.dockProperties !== undefined &&
      (obj.dockProperties = message.dockProperties
        ? DockProperties.toJSON(message.dockProperties)
        : undefined);
    message.rayProperties !== undefined &&
      (obj.rayProperties = message.rayProperties
        ? RayProperties.toJSON(message.rayProperties)
        : undefined);
    message.boundingBoxProperties !== undefined &&
      (obj.boundingBoxProperties = message.boundingBoxProperties
        ? BoundingBoxProperties.toJSON(message.boundingBoxProperties)
        : undefined);
    message.additionalProperties !== undefined &&
      (obj.additionalProperties = message.additionalProperties
        ? Any.toJSON(message.additionalProperties)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WorldObject>, I>>(
    object: I
  ): WorldObject {
    const message = createBaseWorldObject();
    message.id = object.id ?? 0;
    message.name = object.name ?? "";
    message.acquisitionTime = object.acquisitionTime ?? undefined;
    message.transformsSnapshot =
      object.transformsSnapshot !== undefined &&
      object.transformsSnapshot !== null
        ? FrameTreeSnapshot.fromPartial(object.transformsSnapshot)
        : undefined;
    message.drawableProperties =
      object.drawableProperties?.map((e) =>
        DrawableProperties.fromPartial(e)
      ) || [];
    message.apriltagProperties =
      object.apriltagProperties !== undefined &&
      object.apriltagProperties !== null
        ? AprilTagProperties.fromPartial(object.apriltagProperties)
        : undefined;
    message.imageProperties =
      object.imageProperties !== undefined && object.imageProperties !== null
        ? ImageProperties.fromPartial(object.imageProperties)
        : undefined;
    message.dockProperties =
      object.dockProperties !== undefined && object.dockProperties !== null
        ? DockProperties.fromPartial(object.dockProperties)
        : undefined;
    message.rayProperties =
      object.rayProperties !== undefined && object.rayProperties !== null
        ? RayProperties.fromPartial(object.rayProperties)
        : undefined;
    message.boundingBoxProperties =
      object.boundingBoxProperties !== undefined &&
      object.boundingBoxProperties !== null
        ? BoundingBoxProperties.fromPartial(object.boundingBoxProperties)
        : undefined;
    message.additionalProperties =
      object.additionalProperties !== undefined &&
      object.additionalProperties !== null
        ? Any.fromPartial(object.additionalProperties)
        : undefined;
    return message;
  },
};

function createBaseListWorldObjectRequest(): ListWorldObjectRequest {
  return { header: undefined, objectType: [], timestampFilter: undefined };
}

export const ListWorldObjectRequest = {
  encode(
    message: ListWorldObjectRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(18).fork();
    for (const v of message.objectType) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.timestampFilter !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestampFilter),
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListWorldObjectRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListWorldObjectRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.objectType.push(reader.int32() as any);
            }
          } else {
            message.objectType.push(reader.int32() as any);
          }
          break;
        case 3:
          message.timestampFilter = fromTimestamp(
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

  fromJSON(object: any): ListWorldObjectRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      objectType: Array.isArray(object?.objectType)
        ? object.objectType.map((e: any) => worldObjectTypeFromJSON(e))
        : [],
      timestampFilter: isSet(object.timestampFilter)
        ? fromJsonTimestamp(object.timestampFilter)
        : undefined,
    };
  },

  toJSON(message: ListWorldObjectRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    if (message.objectType) {
      obj.objectType = message.objectType.map((e) => worldObjectTypeToJSON(e));
    } else {
      obj.objectType = [];
    }
    message.timestampFilter !== undefined &&
      (obj.timestampFilter = message.timestampFilter.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListWorldObjectRequest>, I>>(
    object: I
  ): ListWorldObjectRequest {
    const message = createBaseListWorldObjectRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.objectType = object.objectType?.map((e) => e) || [];
    message.timestampFilter = object.timestampFilter ?? undefined;
    return message;
  },
};

function createBaseListWorldObjectResponse(): ListWorldObjectResponse {
  return { header: undefined, worldObjects: [] };
}

export const ListWorldObjectResponse = {
  encode(
    message: ListWorldObjectResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.worldObjects) {
      WorldObject.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListWorldObjectResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListWorldObjectResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
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

  fromJSON(object: any): ListWorldObjectResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      worldObjects: Array.isArray(object?.worldObjects)
        ? object.worldObjects.map((e: any) => WorldObject.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListWorldObjectResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.worldObjects) {
      obj.worldObjects = message.worldObjects.map((e) =>
        e ? WorldObject.toJSON(e) : undefined
      );
    } else {
      obj.worldObjects = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListWorldObjectResponse>, I>>(
    object: I
  ): ListWorldObjectResponse {
    const message = createBaseListWorldObjectResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.worldObjects =
      object.worldObjects?.map((e) => WorldObject.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMutateWorldObjectRequest(): MutateWorldObjectRequest {
  return { header: undefined, mutation: undefined };
}

export const MutateWorldObjectRequest = {
  encode(
    message: MutateWorldObjectRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.mutation !== undefined) {
      MutateWorldObjectRequest_Mutation.encode(
        message.mutation,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MutateWorldObjectRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMutateWorldObjectRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.mutation = MutateWorldObjectRequest_Mutation.decode(
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

  fromJSON(object: any): MutateWorldObjectRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      mutation: isSet(object.mutation)
        ? MutateWorldObjectRequest_Mutation.fromJSON(object.mutation)
        : undefined,
    };
  },

  toJSON(message: MutateWorldObjectRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.mutation !== undefined &&
      (obj.mutation = message.mutation
        ? MutateWorldObjectRequest_Mutation.toJSON(message.mutation)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MutateWorldObjectRequest>, I>>(
    object: I
  ): MutateWorldObjectRequest {
    const message = createBaseMutateWorldObjectRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.mutation =
      object.mutation !== undefined && object.mutation !== null
        ? MutateWorldObjectRequest_Mutation.fromPartial(object.mutation)
        : undefined;
    return message;
  },
};

function createBaseMutateWorldObjectRequest_Mutation(): MutateWorldObjectRequest_Mutation {
  return { action: 0, object: undefined };
}

export const MutateWorldObjectRequest_Mutation = {
  encode(
    message: MutateWorldObjectRequest_Mutation,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.action !== 0) {
      writer.uint32(8).int32(message.action);
    }
    if (message.object !== undefined) {
      WorldObject.encode(message.object, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MutateWorldObjectRequest_Mutation {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMutateWorldObjectRequest_Mutation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.action = reader.int32() as any;
          break;
        case 2:
          message.object = WorldObject.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MutateWorldObjectRequest_Mutation {
    return {
      action: isSet(object.action)
        ? mutateWorldObjectRequest_ActionFromJSON(object.action)
        : 0,
      object: isSet(object.object)
        ? WorldObject.fromJSON(object.object)
        : undefined,
    };
  },

  toJSON(message: MutateWorldObjectRequest_Mutation): unknown {
    const obj: any = {};
    message.action !== undefined &&
      (obj.action = mutateWorldObjectRequest_ActionToJSON(message.action));
    message.object !== undefined &&
      (obj.object = message.object
        ? WorldObject.toJSON(message.object)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<MutateWorldObjectRequest_Mutation>, I>
  >(object: I): MutateWorldObjectRequest_Mutation {
    const message = createBaseMutateWorldObjectRequest_Mutation();
    message.action = object.action ?? 0;
    message.object =
      object.object !== undefined && object.object !== null
        ? WorldObject.fromPartial(object.object)
        : undefined;
    return message;
  },
};

function createBaseMutateWorldObjectResponse(): MutateWorldObjectResponse {
  return { header: undefined, status: 0, mutatedObjectId: 0 };
}

export const MutateWorldObjectResponse = {
  encode(
    message: MutateWorldObjectResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.mutatedObjectId !== 0) {
      writer.uint32(32).int32(message.mutatedObjectId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MutateWorldObjectResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMutateWorldObjectResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        case 4:
          message.mutatedObjectId = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MutateWorldObjectResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      status: isSet(object.status)
        ? mutateWorldObjectResponse_StatusFromJSON(object.status)
        : 0,
      mutatedObjectId: isSet(object.mutatedObjectId)
        ? Number(object.mutatedObjectId)
        : 0,
    };
  },

  toJSON(message: MutateWorldObjectResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.status !== undefined &&
      (obj.status = mutateWorldObjectResponse_StatusToJSON(message.status));
    message.mutatedObjectId !== undefined &&
      (obj.mutatedObjectId = Math.round(message.mutatedObjectId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MutateWorldObjectResponse>, I>>(
    object: I
  ): MutateWorldObjectResponse {
    const message = createBaseMutateWorldObjectResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.status = object.status ?? 0;
    message.mutatedObjectId = object.mutatedObjectId ?? 0;
    return message;
  },
};

function createBaseImageProperties(): ImageProperties {
  return {
    cameraSource: "",
    coordinates: undefined,
    keypoints: undefined,
    imageSource: undefined,
    imageCapture: undefined,
    frameNameImageCoordinates: "",
  };
}

export const ImageProperties = {
  encode(
    message: ImageProperties,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.cameraSource !== "") {
      writer.uint32(10).string(message.cameraSource);
    }
    if (message.coordinates !== undefined) {
      Polygon.encode(message.coordinates, writer.uint32(18).fork()).ldelim();
    }
    if (message.keypoints !== undefined) {
      KeypointSet.encode(message.keypoints, writer.uint32(34).fork()).ldelim();
    }
    if (message.imageSource !== undefined) {
      ImageSource.encode(
        message.imageSource,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.imageCapture !== undefined) {
      ImageCapture.encode(
        message.imageCapture,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.frameNameImageCoordinates !== "") {
      writer.uint32(26).string(message.frameNameImageCoordinates);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImageProperties {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImageProperties();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cameraSource = reader.string();
          break;
        case 2:
          message.coordinates = Polygon.decode(reader, reader.uint32());
          break;
        case 4:
          message.keypoints = KeypointSet.decode(reader, reader.uint32());
          break;
        case 5:
          message.imageSource = ImageSource.decode(reader, reader.uint32());
          break;
        case 6:
          message.imageCapture = ImageCapture.decode(reader, reader.uint32());
          break;
        case 3:
          message.frameNameImageCoordinates = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ImageProperties {
    return {
      cameraSource: isSet(object.cameraSource)
        ? String(object.cameraSource)
        : "",
      coordinates: isSet(object.coordinates)
        ? Polygon.fromJSON(object.coordinates)
        : undefined,
      keypoints: isSet(object.keypoints)
        ? KeypointSet.fromJSON(object.keypoints)
        : undefined,
      imageSource: isSet(object.imageSource)
        ? ImageSource.fromJSON(object.imageSource)
        : undefined,
      imageCapture: isSet(object.imageCapture)
        ? ImageCapture.fromJSON(object.imageCapture)
        : undefined,
      frameNameImageCoordinates: isSet(object.frameNameImageCoordinates)
        ? String(object.frameNameImageCoordinates)
        : "",
    };
  },

  toJSON(message: ImageProperties): unknown {
    const obj: any = {};
    message.cameraSource !== undefined &&
      (obj.cameraSource = message.cameraSource);
    message.coordinates !== undefined &&
      (obj.coordinates = message.coordinates
        ? Polygon.toJSON(message.coordinates)
        : undefined);
    message.keypoints !== undefined &&
      (obj.keypoints = message.keypoints
        ? KeypointSet.toJSON(message.keypoints)
        : undefined);
    message.imageSource !== undefined &&
      (obj.imageSource = message.imageSource
        ? ImageSource.toJSON(message.imageSource)
        : undefined);
    message.imageCapture !== undefined &&
      (obj.imageCapture = message.imageCapture
        ? ImageCapture.toJSON(message.imageCapture)
        : undefined);
    message.frameNameImageCoordinates !== undefined &&
      (obj.frameNameImageCoordinates = message.frameNameImageCoordinates);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ImageProperties>, I>>(
    object: I
  ): ImageProperties {
    const message = createBaseImageProperties();
    message.cameraSource = object.cameraSource ?? "";
    message.coordinates =
      object.coordinates !== undefined && object.coordinates !== null
        ? Polygon.fromPartial(object.coordinates)
        : undefined;
    message.keypoints =
      object.keypoints !== undefined && object.keypoints !== null
        ? KeypointSet.fromPartial(object.keypoints)
        : undefined;
    message.imageSource =
      object.imageSource !== undefined && object.imageSource !== null
        ? ImageSource.fromPartial(object.imageSource)
        : undefined;
    message.imageCapture =
      object.imageCapture !== undefined && object.imageCapture !== null
        ? ImageCapture.fromPartial(object.imageCapture)
        : undefined;
    message.frameNameImageCoordinates = object.frameNameImageCoordinates ?? "";
    return message;
  },
};

function createBaseDockProperties(): DockProperties {
  return {
    dockId: 0,
    type: 0,
    frameNameDock: "",
    unavailable: false,
    fromPrior: false,
  };
}

export const DockProperties = {
  encode(
    message: DockProperties,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.dockId !== 0) {
      writer.uint32(8).uint32(message.dockId);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    if (message.frameNameDock !== "") {
      writer.uint32(26).string(message.frameNameDock);
    }
    if (message.unavailable === true) {
      writer.uint32(32).bool(message.unavailable);
    }
    if (message.fromPrior === true) {
      writer.uint32(40).bool(message.fromPrior);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DockProperties {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDockProperties();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dockId = reader.uint32();
          break;
        case 2:
          message.type = reader.int32() as any;
          break;
        case 3:
          message.frameNameDock = reader.string();
          break;
        case 4:
          message.unavailable = reader.bool();
          break;
        case 5:
          message.fromPrior = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DockProperties {
    return {
      dockId: isSet(object.dockId) ? Number(object.dockId) : 0,
      type: isSet(object.type) ? dockTypeFromJSON(object.type) : 0,
      frameNameDock: isSet(object.frameNameDock)
        ? String(object.frameNameDock)
        : "",
      unavailable: isSet(object.unavailable)
        ? Boolean(object.unavailable)
        : false,
      fromPrior: isSet(object.fromPrior) ? Boolean(object.fromPrior) : false,
    };
  },

  toJSON(message: DockProperties): unknown {
    const obj: any = {};
    message.dockId !== undefined && (obj.dockId = Math.round(message.dockId));
    message.type !== undefined && (obj.type = dockTypeToJSON(message.type));
    message.frameNameDock !== undefined &&
      (obj.frameNameDock = message.frameNameDock);
    message.unavailable !== undefined &&
      (obj.unavailable = message.unavailable);
    message.fromPrior !== undefined && (obj.fromPrior = message.fromPrior);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DockProperties>, I>>(
    object: I
  ): DockProperties {
    const message = createBaseDockProperties();
    message.dockId = object.dockId ?? 0;
    message.type = object.type ?? 0;
    message.frameNameDock = object.frameNameDock ?? "";
    message.unavailable = object.unavailable ?? false;
    message.fromPrior = object.fromPrior ?? false;
    return message;
  },
};

function createBaseAprilTagProperties(): AprilTagProperties {
  return {
    tagId: 0,
    dimensions: undefined,
    frameNameFiducial: "",
    fiducialPoseStatus: 0,
    frameNameFiducialFiltered: "",
    fiducialFilteredPoseStatus: 0,
    frameNameCamera: "",
    detectionCovariance: undefined,
    detectionCovarianceReferenceFrame: "",
  };
}

export const AprilTagProperties = {
  encode(
    message: AprilTagProperties,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.tagId !== 0) {
      writer.uint32(8).int32(message.tagId);
    }
    if (message.dimensions !== undefined) {
      Vec2.encode(message.dimensions, writer.uint32(18).fork()).ldelim();
    }
    if (message.frameNameFiducial !== "") {
      writer.uint32(26).string(message.frameNameFiducial);
    }
    if (message.fiducialPoseStatus !== 0) {
      writer.uint32(64).int32(message.fiducialPoseStatus);
    }
    if (message.frameNameFiducialFiltered !== "") {
      writer.uint32(34).string(message.frameNameFiducialFiltered);
    }
    if (message.fiducialFilteredPoseStatus !== 0) {
      writer.uint32(72).int32(message.fiducialFilteredPoseStatus);
    }
    if (message.frameNameCamera !== "") {
      writer.uint32(58).string(message.frameNameCamera);
    }
    if (message.detectionCovariance !== undefined) {
      SE3Covariance.encode(
        message.detectionCovariance,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.detectionCovarianceReferenceFrame !== "") {
      writer.uint32(50).string(message.detectionCovarianceReferenceFrame);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AprilTagProperties {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAprilTagProperties();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tagId = reader.int32();
          break;
        case 2:
          message.dimensions = Vec2.decode(reader, reader.uint32());
          break;
        case 3:
          message.frameNameFiducial = reader.string();
          break;
        case 8:
          message.fiducialPoseStatus = reader.int32() as any;
          break;
        case 4:
          message.frameNameFiducialFiltered = reader.string();
          break;
        case 9:
          message.fiducialFilteredPoseStatus = reader.int32() as any;
          break;
        case 7:
          message.frameNameCamera = reader.string();
          break;
        case 5:
          message.detectionCovariance = SE3Covariance.decode(
            reader,
            reader.uint32()
          );
          break;
        case 6:
          message.detectionCovarianceReferenceFrame = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AprilTagProperties {
    return {
      tagId: isSet(object.tagId) ? Number(object.tagId) : 0,
      dimensions: isSet(object.dimensions)
        ? Vec2.fromJSON(object.dimensions)
        : undefined,
      frameNameFiducial: isSet(object.frameNameFiducial)
        ? String(object.frameNameFiducial)
        : "",
      fiducialPoseStatus: isSet(object.fiducialPoseStatus)
        ? aprilTagProperties_AprilTagPoseStatusFromJSON(
            object.fiducialPoseStatus
          )
        : 0,
      frameNameFiducialFiltered: isSet(object.frameNameFiducialFiltered)
        ? String(object.frameNameFiducialFiltered)
        : "",
      fiducialFilteredPoseStatus: isSet(object.fiducialFilteredPoseStatus)
        ? aprilTagProperties_AprilTagPoseStatusFromJSON(
            object.fiducialFilteredPoseStatus
          )
        : 0,
      frameNameCamera: isSet(object.frameNameCamera)
        ? String(object.frameNameCamera)
        : "",
      detectionCovariance: isSet(object.detectionCovariance)
        ? SE3Covariance.fromJSON(object.detectionCovariance)
        : undefined,
      detectionCovarianceReferenceFrame: isSet(
        object.detectionCovarianceReferenceFrame
      )
        ? String(object.detectionCovarianceReferenceFrame)
        : "",
    };
  },

  toJSON(message: AprilTagProperties): unknown {
    const obj: any = {};
    message.tagId !== undefined && (obj.tagId = Math.round(message.tagId));
    message.dimensions !== undefined &&
      (obj.dimensions = message.dimensions
        ? Vec2.toJSON(message.dimensions)
        : undefined);
    message.frameNameFiducial !== undefined &&
      (obj.frameNameFiducial = message.frameNameFiducial);
    message.fiducialPoseStatus !== undefined &&
      (obj.fiducialPoseStatus = aprilTagProperties_AprilTagPoseStatusToJSON(
        message.fiducialPoseStatus
      ));
    message.frameNameFiducialFiltered !== undefined &&
      (obj.frameNameFiducialFiltered = message.frameNameFiducialFiltered);
    message.fiducialFilteredPoseStatus !== undefined &&
      (obj.fiducialFilteredPoseStatus =
        aprilTagProperties_AprilTagPoseStatusToJSON(
          message.fiducialFilteredPoseStatus
        ));
    message.frameNameCamera !== undefined &&
      (obj.frameNameCamera = message.frameNameCamera);
    message.detectionCovariance !== undefined &&
      (obj.detectionCovariance = message.detectionCovariance
        ? SE3Covariance.toJSON(message.detectionCovariance)
        : undefined);
    message.detectionCovarianceReferenceFrame !== undefined &&
      (obj.detectionCovarianceReferenceFrame =
        message.detectionCovarianceReferenceFrame);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AprilTagProperties>, I>>(
    object: I
  ): AprilTagProperties {
    const message = createBaseAprilTagProperties();
    message.tagId = object.tagId ?? 0;
    message.dimensions =
      object.dimensions !== undefined && object.dimensions !== null
        ? Vec2.fromPartial(object.dimensions)
        : undefined;
    message.frameNameFiducial = object.frameNameFiducial ?? "";
    message.fiducialPoseStatus = object.fiducialPoseStatus ?? 0;
    message.frameNameFiducialFiltered = object.frameNameFiducialFiltered ?? "";
    message.fiducialFilteredPoseStatus = object.fiducialFilteredPoseStatus ?? 0;
    message.frameNameCamera = object.frameNameCamera ?? "";
    message.detectionCovariance =
      object.detectionCovariance !== undefined &&
      object.detectionCovariance !== null
        ? SE3Covariance.fromPartial(object.detectionCovariance)
        : undefined;
    message.detectionCovarianceReferenceFrame =
      object.detectionCovarianceReferenceFrame ?? "";
    return message;
  },
};

function createBaseRayProperties(): RayProperties {
  return { ray: undefined, frame: "" };
}

export const RayProperties = {
  encode(
    message: RayProperties,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.ray !== undefined) {
      Ray.encode(message.ray, writer.uint32(10).fork()).ldelim();
    }
    if (message.frame !== "") {
      writer.uint32(18).string(message.frame);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RayProperties {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRayProperties();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ray = Ray.decode(reader, reader.uint32());
          break;
        case 2:
          message.frame = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RayProperties {
    return {
      ray: isSet(object.ray) ? Ray.fromJSON(object.ray) : undefined,
      frame: isSet(object.frame) ? String(object.frame) : "",
    };
  },

  toJSON(message: RayProperties): unknown {
    const obj: any = {};
    message.ray !== undefined &&
      (obj.ray = message.ray ? Ray.toJSON(message.ray) : undefined);
    message.frame !== undefined && (obj.frame = message.frame);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RayProperties>, I>>(
    object: I
  ): RayProperties {
    const message = createBaseRayProperties();
    message.ray =
      object.ray !== undefined && object.ray !== null
        ? Ray.fromPartial(object.ray)
        : undefined;
    message.frame = object.frame ?? "";
    return message;
  },
};

function createBaseBoundingBoxProperties(): BoundingBoxProperties {
  return { sizeEwrtFrame: undefined, frame: "" };
}

export const BoundingBoxProperties = {
  encode(
    message: BoundingBoxProperties,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sizeEwrtFrame !== undefined) {
      Vec3.encode(message.sizeEwrtFrame, writer.uint32(10).fork()).ldelim();
    }
    if (message.frame !== "") {
      writer.uint32(18).string(message.frame);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): BoundingBoxProperties {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBoundingBoxProperties();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sizeEwrtFrame = Vec3.decode(reader, reader.uint32());
          break;
        case 2:
          message.frame = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BoundingBoxProperties {
    return {
      sizeEwrtFrame: isSet(object.sizeEwrtFrame)
        ? Vec3.fromJSON(object.sizeEwrtFrame)
        : undefined,
      frame: isSet(object.frame) ? String(object.frame) : "",
    };
  },

  toJSON(message: BoundingBoxProperties): unknown {
    const obj: any = {};
    message.sizeEwrtFrame !== undefined &&
      (obj.sizeEwrtFrame = message.sizeEwrtFrame
        ? Vec3.toJSON(message.sizeEwrtFrame)
        : undefined);
    message.frame !== undefined && (obj.frame = message.frame);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BoundingBoxProperties>, I>>(
    object: I
  ): BoundingBoxProperties {
    const message = createBaseBoundingBoxProperties();
    message.sizeEwrtFrame =
      object.sizeEwrtFrame !== undefined && object.sizeEwrtFrame !== null
        ? Vec3.fromPartial(object.sizeEwrtFrame)
        : undefined;
    message.frame = object.frame ?? "";
    return message;
  },
};

function createBaseDrawableProperties(): DrawableProperties {
  return {
    color: undefined,
    label: "",
    wireframe: false,
    frame: undefined,
    sphere: undefined,
    box: undefined,
    arrow: undefined,
    capsule: undefined,
    cylinder: undefined,
    linestrip: undefined,
    points: undefined,
    frameNameDrawable: "",
  };
}

export const DrawableProperties = {
  encode(
    message: DrawableProperties,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.color !== undefined) {
      DrawableProperties_Color.encode(
        message.color,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.label !== "") {
      writer.uint32(18).string(message.label);
    }
    if (message.wireframe === true) {
      writer.uint32(24).bool(message.wireframe);
    }
    if (message.frame !== undefined) {
      DrawableFrame.encode(message.frame, writer.uint32(34).fork()).ldelim();
    }
    if (message.sphere !== undefined) {
      DrawableSphere.encode(message.sphere, writer.uint32(42).fork()).ldelim();
    }
    if (message.box !== undefined) {
      DrawableBox.encode(message.box, writer.uint32(50).fork()).ldelim();
    }
    if (message.arrow !== undefined) {
      DrawableArrow.encode(message.arrow, writer.uint32(58).fork()).ldelim();
    }
    if (message.capsule !== undefined) {
      DrawableCapsule.encode(
        message.capsule,
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.cylinder !== undefined) {
      DrawableCylinder.encode(
        message.cylinder,
        writer.uint32(74).fork()
      ).ldelim();
    }
    if (message.linestrip !== undefined) {
      DrawableLineStrip.encode(
        message.linestrip,
        writer.uint32(82).fork()
      ).ldelim();
    }
    if (message.points !== undefined) {
      DrawablePoints.encode(message.points, writer.uint32(90).fork()).ldelim();
    }
    if (message.frameNameDrawable !== "") {
      writer.uint32(98).string(message.frameNameDrawable);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DrawableProperties {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDrawableProperties();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.color = DrawableProperties_Color.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.label = reader.string();
          break;
        case 3:
          message.wireframe = reader.bool();
          break;
        case 4:
          message.frame = DrawableFrame.decode(reader, reader.uint32());
          break;
        case 5:
          message.sphere = DrawableSphere.decode(reader, reader.uint32());
          break;
        case 6:
          message.box = DrawableBox.decode(reader, reader.uint32());
          break;
        case 7:
          message.arrow = DrawableArrow.decode(reader, reader.uint32());
          break;
        case 8:
          message.capsule = DrawableCapsule.decode(reader, reader.uint32());
          break;
        case 9:
          message.cylinder = DrawableCylinder.decode(reader, reader.uint32());
          break;
        case 10:
          message.linestrip = DrawableLineStrip.decode(reader, reader.uint32());
          break;
        case 11:
          message.points = DrawablePoints.decode(reader, reader.uint32());
          break;
        case 12:
          message.frameNameDrawable = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DrawableProperties {
    return {
      color: isSet(object.color)
        ? DrawableProperties_Color.fromJSON(object.color)
        : undefined,
      label: isSet(object.label) ? String(object.label) : "",
      wireframe: isSet(object.wireframe) ? Boolean(object.wireframe) : false,
      frame: isSet(object.frame)
        ? DrawableFrame.fromJSON(object.frame)
        : undefined,
      sphere: isSet(object.sphere)
        ? DrawableSphere.fromJSON(object.sphere)
        : undefined,
      box: isSet(object.box) ? DrawableBox.fromJSON(object.box) : undefined,
      arrow: isSet(object.arrow)
        ? DrawableArrow.fromJSON(object.arrow)
        : undefined,
      capsule: isSet(object.capsule)
        ? DrawableCapsule.fromJSON(object.capsule)
        : undefined,
      cylinder: isSet(object.cylinder)
        ? DrawableCylinder.fromJSON(object.cylinder)
        : undefined,
      linestrip: isSet(object.linestrip)
        ? DrawableLineStrip.fromJSON(object.linestrip)
        : undefined,
      points: isSet(object.points)
        ? DrawablePoints.fromJSON(object.points)
        : undefined,
      frameNameDrawable: isSet(object.frameNameDrawable)
        ? String(object.frameNameDrawable)
        : "",
    };
  },

  toJSON(message: DrawableProperties): unknown {
    const obj: any = {};
    message.color !== undefined &&
      (obj.color = message.color
        ? DrawableProperties_Color.toJSON(message.color)
        : undefined);
    message.label !== undefined && (obj.label = message.label);
    message.wireframe !== undefined && (obj.wireframe = message.wireframe);
    message.frame !== undefined &&
      (obj.frame = message.frame
        ? DrawableFrame.toJSON(message.frame)
        : undefined);
    message.sphere !== undefined &&
      (obj.sphere = message.sphere
        ? DrawableSphere.toJSON(message.sphere)
        : undefined);
    message.box !== undefined &&
      (obj.box = message.box ? DrawableBox.toJSON(message.box) : undefined);
    message.arrow !== undefined &&
      (obj.arrow = message.arrow
        ? DrawableArrow.toJSON(message.arrow)
        : undefined);
    message.capsule !== undefined &&
      (obj.capsule = message.capsule
        ? DrawableCapsule.toJSON(message.capsule)
        : undefined);
    message.cylinder !== undefined &&
      (obj.cylinder = message.cylinder
        ? DrawableCylinder.toJSON(message.cylinder)
        : undefined);
    message.linestrip !== undefined &&
      (obj.linestrip = message.linestrip
        ? DrawableLineStrip.toJSON(message.linestrip)
        : undefined);
    message.points !== undefined &&
      (obj.points = message.points
        ? DrawablePoints.toJSON(message.points)
        : undefined);
    message.frameNameDrawable !== undefined &&
      (obj.frameNameDrawable = message.frameNameDrawable);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DrawableProperties>, I>>(
    object: I
  ): DrawableProperties {
    const message = createBaseDrawableProperties();
    message.color =
      object.color !== undefined && object.color !== null
        ? DrawableProperties_Color.fromPartial(object.color)
        : undefined;
    message.label = object.label ?? "";
    message.wireframe = object.wireframe ?? false;
    message.frame =
      object.frame !== undefined && object.frame !== null
        ? DrawableFrame.fromPartial(object.frame)
        : undefined;
    message.sphere =
      object.sphere !== undefined && object.sphere !== null
        ? DrawableSphere.fromPartial(object.sphere)
        : undefined;
    message.box =
      object.box !== undefined && object.box !== null
        ? DrawableBox.fromPartial(object.box)
        : undefined;
    message.arrow =
      object.arrow !== undefined && object.arrow !== null
        ? DrawableArrow.fromPartial(object.arrow)
        : undefined;
    message.capsule =
      object.capsule !== undefined && object.capsule !== null
        ? DrawableCapsule.fromPartial(object.capsule)
        : undefined;
    message.cylinder =
      object.cylinder !== undefined && object.cylinder !== null
        ? DrawableCylinder.fromPartial(object.cylinder)
        : undefined;
    message.linestrip =
      object.linestrip !== undefined && object.linestrip !== null
        ? DrawableLineStrip.fromPartial(object.linestrip)
        : undefined;
    message.points =
      object.points !== undefined && object.points !== null
        ? DrawablePoints.fromPartial(object.points)
        : undefined;
    message.frameNameDrawable = object.frameNameDrawable ?? "";
    return message;
  },
};

function createBaseDrawableProperties_Color(): DrawableProperties_Color {
  return { r: 0, g: 0, b: 0, a: 0 };
}

export const DrawableProperties_Color = {
  encode(
    message: DrawableProperties_Color,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.r !== 0) {
      writer.uint32(8).int32(message.r);
    }
    if (message.g !== 0) {
      writer.uint32(16).int32(message.g);
    }
    if (message.b !== 0) {
      writer.uint32(24).int32(message.b);
    }
    if (message.a !== 0) {
      writer.uint32(33).double(message.a);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DrawableProperties_Color {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDrawableProperties_Color();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.r = reader.int32();
          break;
        case 2:
          message.g = reader.int32();
          break;
        case 3:
          message.b = reader.int32();
          break;
        case 4:
          message.a = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DrawableProperties_Color {
    return {
      r: isSet(object.r) ? Number(object.r) : 0,
      g: isSet(object.g) ? Number(object.g) : 0,
      b: isSet(object.b) ? Number(object.b) : 0,
      a: isSet(object.a) ? Number(object.a) : 0,
    };
  },

  toJSON(message: DrawableProperties_Color): unknown {
    const obj: any = {};
    message.r !== undefined && (obj.r = Math.round(message.r));
    message.g !== undefined && (obj.g = Math.round(message.g));
    message.b !== undefined && (obj.b = Math.round(message.b));
    message.a !== undefined && (obj.a = message.a);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DrawableProperties_Color>, I>>(
    object: I
  ): DrawableProperties_Color {
    const message = createBaseDrawableProperties_Color();
    message.r = object.r ?? 0;
    message.g = object.g ?? 0;
    message.b = object.b ?? 0;
    message.a = object.a ?? 0;
    return message;
  },
};

function createBaseDrawableFrame(): DrawableFrame {
  return { arrowLength: 0, arrowRadius: 0 };
}

export const DrawableFrame = {
  encode(
    message: DrawableFrame,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.arrowLength !== 0) {
      writer.uint32(9).double(message.arrowLength);
    }
    if (message.arrowRadius !== 0) {
      writer.uint32(17).double(message.arrowRadius);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DrawableFrame {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDrawableFrame();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.arrowLength = reader.double();
          break;
        case 2:
          message.arrowRadius = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DrawableFrame {
    return {
      arrowLength: isSet(object.arrowLength) ? Number(object.arrowLength) : 0,
      arrowRadius: isSet(object.arrowRadius) ? Number(object.arrowRadius) : 0,
    };
  },

  toJSON(message: DrawableFrame): unknown {
    const obj: any = {};
    message.arrowLength !== undefined &&
      (obj.arrowLength = message.arrowLength);
    message.arrowRadius !== undefined &&
      (obj.arrowRadius = message.arrowRadius);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DrawableFrame>, I>>(
    object: I
  ): DrawableFrame {
    const message = createBaseDrawableFrame();
    message.arrowLength = object.arrowLength ?? 0;
    message.arrowRadius = object.arrowRadius ?? 0;
    return message;
  },
};

function createBaseDrawableSphere(): DrawableSphere {
  return { radius: 0 };
}

export const DrawableSphere = {
  encode(
    message: DrawableSphere,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.radius !== 0) {
      writer.uint32(9).double(message.radius);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DrawableSphere {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDrawableSphere();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.radius = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DrawableSphere {
    return {
      radius: isSet(object.radius) ? Number(object.radius) : 0,
    };
  },

  toJSON(message: DrawableSphere): unknown {
    const obj: any = {};
    message.radius !== undefined && (obj.radius = message.radius);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DrawableSphere>, I>>(
    object: I
  ): DrawableSphere {
    const message = createBaseDrawableSphere();
    message.radius = object.radius ?? 0;
    return message;
  },
};

function createBaseDrawableBox(): DrawableBox {
  return { size: undefined };
}

export const DrawableBox = {
  encode(
    message: DrawableBox,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.size !== undefined) {
      Vec3.encode(message.size, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DrawableBox {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDrawableBox();
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

  fromJSON(object: any): DrawableBox {
    return {
      size: isSet(object.size) ? Vec3.fromJSON(object.size) : undefined,
    };
  },

  toJSON(message: DrawableBox): unknown {
    const obj: any = {};
    message.size !== undefined &&
      (obj.size = message.size ? Vec3.toJSON(message.size) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DrawableBox>, I>>(
    object: I
  ): DrawableBox {
    const message = createBaseDrawableBox();
    message.size =
      object.size !== undefined && object.size !== null
        ? Vec3.fromPartial(object.size)
        : undefined;
    return message;
  },
};

function createBaseDrawableArrow(): DrawableArrow {
  return { direction: undefined, radius: 0 };
}

export const DrawableArrow = {
  encode(
    message: DrawableArrow,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.direction !== undefined) {
      Vec3.encode(message.direction, writer.uint32(10).fork()).ldelim();
    }
    if (message.radius !== 0) {
      writer.uint32(17).double(message.radius);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DrawableArrow {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDrawableArrow();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.direction = Vec3.decode(reader, reader.uint32());
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

  fromJSON(object: any): DrawableArrow {
    return {
      direction: isSet(object.direction)
        ? Vec3.fromJSON(object.direction)
        : undefined,
      radius: isSet(object.radius) ? Number(object.radius) : 0,
    };
  },

  toJSON(message: DrawableArrow): unknown {
    const obj: any = {};
    message.direction !== undefined &&
      (obj.direction = message.direction
        ? Vec3.toJSON(message.direction)
        : undefined);
    message.radius !== undefined && (obj.radius = message.radius);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DrawableArrow>, I>>(
    object: I
  ): DrawableArrow {
    const message = createBaseDrawableArrow();
    message.direction =
      object.direction !== undefined && object.direction !== null
        ? Vec3.fromPartial(object.direction)
        : undefined;
    message.radius = object.radius ?? 0;
    return message;
  },
};

function createBaseDrawableCapsule(): DrawableCapsule {
  return { direction: undefined, radius: 0 };
}

export const DrawableCapsule = {
  encode(
    message: DrawableCapsule,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.direction !== undefined) {
      Vec3.encode(message.direction, writer.uint32(10).fork()).ldelim();
    }
    if (message.radius !== 0) {
      writer.uint32(17).double(message.radius);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DrawableCapsule {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDrawableCapsule();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.direction = Vec3.decode(reader, reader.uint32());
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

  fromJSON(object: any): DrawableCapsule {
    return {
      direction: isSet(object.direction)
        ? Vec3.fromJSON(object.direction)
        : undefined,
      radius: isSet(object.radius) ? Number(object.radius) : 0,
    };
  },

  toJSON(message: DrawableCapsule): unknown {
    const obj: any = {};
    message.direction !== undefined &&
      (obj.direction = message.direction
        ? Vec3.toJSON(message.direction)
        : undefined);
    message.radius !== undefined && (obj.radius = message.radius);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DrawableCapsule>, I>>(
    object: I
  ): DrawableCapsule {
    const message = createBaseDrawableCapsule();
    message.direction =
      object.direction !== undefined && object.direction !== null
        ? Vec3.fromPartial(object.direction)
        : undefined;
    message.radius = object.radius ?? 0;
    return message;
  },
};

function createBaseDrawableCylinder(): DrawableCylinder {
  return { direction: undefined, radius: 0 };
}

export const DrawableCylinder = {
  encode(
    message: DrawableCylinder,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.direction !== undefined) {
      Vec3.encode(message.direction, writer.uint32(10).fork()).ldelim();
    }
    if (message.radius !== 0) {
      writer.uint32(17).double(message.radius);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DrawableCylinder {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDrawableCylinder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.direction = Vec3.decode(reader, reader.uint32());
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

  fromJSON(object: any): DrawableCylinder {
    return {
      direction: isSet(object.direction)
        ? Vec3.fromJSON(object.direction)
        : undefined,
      radius: isSet(object.radius) ? Number(object.radius) : 0,
    };
  },

  toJSON(message: DrawableCylinder): unknown {
    const obj: any = {};
    message.direction !== undefined &&
      (obj.direction = message.direction
        ? Vec3.toJSON(message.direction)
        : undefined);
    message.radius !== undefined && (obj.radius = message.radius);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DrawableCylinder>, I>>(
    object: I
  ): DrawableCylinder {
    const message = createBaseDrawableCylinder();
    message.direction =
      object.direction !== undefined && object.direction !== null
        ? Vec3.fromPartial(object.direction)
        : undefined;
    message.radius = object.radius ?? 0;
    return message;
  },
};

function createBaseDrawableLineStrip(): DrawableLineStrip {
  return { points: undefined };
}

export const DrawableLineStrip = {
  encode(
    message: DrawableLineStrip,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.points !== undefined) {
      Vec3.encode(message.points, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DrawableLineStrip {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDrawableLineStrip();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.points = Vec3.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DrawableLineStrip {
    return {
      points: isSet(object.points) ? Vec3.fromJSON(object.points) : undefined,
    };
  },

  toJSON(message: DrawableLineStrip): unknown {
    const obj: any = {};
    message.points !== undefined &&
      (obj.points = message.points ? Vec3.toJSON(message.points) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DrawableLineStrip>, I>>(
    object: I
  ): DrawableLineStrip {
    const message = createBaseDrawableLineStrip();
    message.points =
      object.points !== undefined && object.points !== null
        ? Vec3.fromPartial(object.points)
        : undefined;
    return message;
  },
};

function createBaseDrawablePoints(): DrawablePoints {
  return { points: [] };
}

export const DrawablePoints = {
  encode(
    message: DrawablePoints,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.points) {
      Vec3.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DrawablePoints {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDrawablePoints();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.points.push(Vec3.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DrawablePoints {
    return {
      points: Array.isArray(object?.points)
        ? object.points.map((e: any) => Vec3.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DrawablePoints): unknown {
    const obj: any = {};
    if (message.points) {
      obj.points = message.points.map((e) => (e ? Vec3.toJSON(e) : undefined));
    } else {
      obj.points = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DrawablePoints>, I>>(
    object: I
  ): DrawablePoints {
    const message = createBaseDrawablePoints();
    message.points = object.points?.map((e) => Vec3.fromPartial(e)) || [];
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
