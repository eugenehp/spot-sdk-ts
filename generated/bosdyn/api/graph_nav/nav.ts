/* eslint-disable */
import { Timestamp } from "../../../google/protobuf/timestamp";
import { Edge_Id } from "./map";
import { SE3Pose } from "../geometry";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api.graph_nav";

/** Route that the robot should follow or is currently following. */
export interface Route {
  /** Ordered list of waypoints to traverse, starting from index 0. */
  waypointId: string[];
  /** Ordered list of edges to traverse between those waypoints. */
  edgeId: Edge_Id[];
}

/**
 * The localization state of the robot. This reports the pose of the robot relative
 * to a particular waypoint on the graph nav map.
 */
export interface Localization {
  /** Waypoint this localization is relative to. */
  waypointId: string;
  /** Pose of body in waypoint frame. */
  waypointTformBody: SE3Pose | undefined;
  /**
   * Pose of body in a common reference frame. The common reference frame defaults to the starting
   * fiducial frame, but can be changed. See Anchoring for more info.
   */
  seedTformBody: SE3Pose | undefined;
  /** Time (in robot time basis) that this localization was valid. */
  timestamp: Date | undefined;
}

function createBaseRoute(): Route {
  return { waypointId: [], edgeId: [] };
}

export const Route = {
  encode(message: Route, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.waypointId) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.edgeId) {
      Edge_Id.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Route {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRoute();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.waypointId.push(reader.string());
          break;
        case 3:
          message.edgeId.push(Edge_Id.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Route {
    return {
      waypointId: Array.isArray(object?.waypointId)
        ? object.waypointId.map((e: any) => String(e))
        : [],
      edgeId: Array.isArray(object?.edgeId)
        ? object.edgeId.map((e: any) => Edge_Id.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Route): unknown {
    const obj: any = {};
    if (message.waypointId) {
      obj.waypointId = message.waypointId.map((e) => e);
    } else {
      obj.waypointId = [];
    }
    if (message.edgeId) {
      obj.edgeId = message.edgeId.map((e) =>
        e ? Edge_Id.toJSON(e) : undefined
      );
    } else {
      obj.edgeId = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Route>, I>>(object: I): Route {
    const message = createBaseRoute();
    message.waypointId = object.waypointId?.map((e) => e) || [];
    message.edgeId = object.edgeId?.map((e) => Edge_Id.fromPartial(e)) || [];
    return message;
  },
};

function createBaseLocalization(): Localization {
  return {
    waypointId: "",
    waypointTformBody: undefined,
    seedTformBody: undefined,
    timestamp: undefined,
  };
}

export const Localization = {
  encode(
    message: Localization,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.waypointId !== "") {
      writer.uint32(10).string(message.waypointId);
    }
    if (message.waypointTformBody !== undefined) {
      SE3Pose.encode(
        message.waypointTformBody,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.seedTformBody !== undefined) {
      SE3Pose.encode(message.seedTformBody, writer.uint32(42).fork()).ldelim();
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestamp),
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Localization {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLocalization();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.waypointId = reader.string();
          break;
        case 2:
          message.waypointTformBody = SE3Pose.decode(reader, reader.uint32());
          break;
        case 5:
          message.seedTformBody = SE3Pose.decode(reader, reader.uint32());
          break;
        case 3:
          message.timestamp = fromTimestamp(
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

  fromJSON(object: any): Localization {
    return {
      waypointId: isSet(object.waypointId) ? String(object.waypointId) : "",
      waypointTformBody: isSet(object.waypointTformBody)
        ? SE3Pose.fromJSON(object.waypointTformBody)
        : undefined,
      seedTformBody: isSet(object.seedTformBody)
        ? SE3Pose.fromJSON(object.seedTformBody)
        : undefined,
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
    };
  },

  toJSON(message: Localization): unknown {
    const obj: any = {};
    message.waypointId !== undefined && (obj.waypointId = message.waypointId);
    message.waypointTformBody !== undefined &&
      (obj.waypointTformBody = message.waypointTformBody
        ? SE3Pose.toJSON(message.waypointTformBody)
        : undefined);
    message.seedTformBody !== undefined &&
      (obj.seedTformBody = message.seedTformBody
        ? SE3Pose.toJSON(message.seedTformBody)
        : undefined);
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Localization>, I>>(
    object: I
  ): Localization {
    const message = createBaseLocalization();
    message.waypointId = object.waypointId ?? "";
    message.waypointTformBody =
      object.waypointTformBody !== undefined &&
      object.waypointTformBody !== null
        ? SE3Pose.fromPartial(object.waypointTformBody)
        : undefined;
    message.seedTformBody =
      object.seedTformBody !== undefined && object.seedTformBody !== null
        ? SE3Pose.fromPartial(object.seedTformBody)
        : undefined;
    message.timestamp = object.timestamp ?? undefined;
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
