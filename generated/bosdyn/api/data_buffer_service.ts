/* eslint-disable */
import {
  RecordTextMessagesResponse,
  RecordOperatorCommentsResponse,
  RecordDataBlobsResponse,
  RecordEventsResponse,
  RegisterSignalSchemaResponse,
  RecordSignalTicksResponse,
  RecordTextMessagesRequest,
  RecordOperatorCommentsRequest,
  RecordDataBlobsRequest,
  RecordEventsRequest,
  RegisterSignalSchemaRequest,
  RecordSignalTicksRequest,
} from "./data_buffer";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/** DataBufferService allows adding information to the robot's log files. */

/** This service is a mechanism for adding information to the robot's log files. */
export interface DataBufferService {
  /** Add text messages to the log. */
  RecordTextMessages(
    request: RecordTextMessagesRequest
  ): Promise<RecordTextMessagesResponse>;
  /** Add a set of operator messages to the log. */
  RecordOperatorComments(
    request: RecordOperatorCommentsRequest
  ): Promise<RecordOperatorCommentsResponse>;
  /** Add message-style data to the log. */
  RecordDataBlobs(
    request: RecordDataBlobsRequest
  ): Promise<RecordDataBlobsResponse>;
  /** Add event data to the log. */
  RecordEvents(request: RecordEventsRequest): Promise<RecordEventsResponse>;
  /** Register a log tick schema, allowing client to later log tick data. */
  RegisterSignalSchema(
    request: RegisterSignalSchemaRequest
  ): Promise<RegisterSignalSchemaResponse>;
  /** Add signal data for registered signal schema to the log. */
  RecordSignalTicks(
    request: RecordSignalTicksRequest
  ): Promise<RecordSignalTicksResponse>;
}

export class DataBufferServiceClientImpl implements DataBufferService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.RecordTextMessages = this.RecordTextMessages.bind(this);
    this.RecordOperatorComments = this.RecordOperatorComments.bind(this);
    this.RecordDataBlobs = this.RecordDataBlobs.bind(this);
    this.RecordEvents = this.RecordEvents.bind(this);
    this.RegisterSignalSchema = this.RegisterSignalSchema.bind(this);
    this.RecordSignalTicks = this.RecordSignalTicks.bind(this);
  }
  RecordTextMessages(
    request: RecordTextMessagesRequest
  ): Promise<RecordTextMessagesResponse> {
    const data = RecordTextMessagesRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.DataBufferService",
      "RecordTextMessages",
      data
    );
    return promise.then((data) =>
      RecordTextMessagesResponse.decode(new _m0.Reader(data))
    );
  }

  RecordOperatorComments(
    request: RecordOperatorCommentsRequest
  ): Promise<RecordOperatorCommentsResponse> {
    const data = RecordOperatorCommentsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.DataBufferService",
      "RecordOperatorComments",
      data
    );
    return promise.then((data) =>
      RecordOperatorCommentsResponse.decode(new _m0.Reader(data))
    );
  }

  RecordDataBlobs(
    request: RecordDataBlobsRequest
  ): Promise<RecordDataBlobsResponse> {
    const data = RecordDataBlobsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.DataBufferService",
      "RecordDataBlobs",
      data
    );
    return promise.then((data) =>
      RecordDataBlobsResponse.decode(new _m0.Reader(data))
    );
  }

  RecordEvents(request: RecordEventsRequest): Promise<RecordEventsResponse> {
    const data = RecordEventsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.DataBufferService",
      "RecordEvents",
      data
    );
    return promise.then((data) =>
      RecordEventsResponse.decode(new _m0.Reader(data))
    );
  }

  RegisterSignalSchema(
    request: RegisterSignalSchemaRequest
  ): Promise<RegisterSignalSchemaResponse> {
    const data = RegisterSignalSchemaRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.DataBufferService",
      "RegisterSignalSchema",
      data
    );
    return promise.then((data) =>
      RegisterSignalSchemaResponse.decode(new _m0.Reader(data))
    );
  }

  RecordSignalTicks(
    request: RecordSignalTicksRequest
  ): Promise<RecordSignalTicksResponse> {
    const data = RecordSignalTicksRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.DataBufferService",
      "RecordSignalTicks",
      data
    );
    return promise.then((data) =>
      RecordSignalTicksResponse.decode(new _m0.Reader(data))
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
