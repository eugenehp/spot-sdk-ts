/* eslint-disable */
import {
  RegisterPayloadResponse,
  UpdatePayloadVersionResponse,
  GetPayloadAuthTokenResponse,
  UpdatePayloadAttachedResponse,
  RegisterPayloadRequest,
  UpdatePayloadVersionRequest,
  GetPayloadAuthTokenRequest,
  UpdatePayloadAttachedRequest,
} from "./payload_registration";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/** This service provides a way to register new payloads. */
export interface PayloadRegistrationService {
  /** Register a payload with the directory. */
  RegisterPayload(
    request: RegisterPayloadRequest
  ): Promise<RegisterPayloadResponse>;
  /** Update the version for the registered payload. */
  UpdatePayloadVersion(
    request: UpdatePayloadVersionRequest
  ): Promise<UpdatePayloadVersionResponse>;
  /** Get the authentication token information associated with a given payload. */
  GetPayloadAuthToken(
    request: GetPayloadAuthTokenRequest
  ): Promise<GetPayloadAuthTokenResponse>;
  /** Tell the robot whether the specified payload is attached.. */
  UpdatePayloadAttached(
    request: UpdatePayloadAttachedRequest
  ): Promise<UpdatePayloadAttachedResponse>;
}

export class PayloadRegistrationServiceClientImpl
  implements PayloadRegistrationService
{
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.RegisterPayload = this.RegisterPayload.bind(this);
    this.UpdatePayloadVersion = this.UpdatePayloadVersion.bind(this);
    this.GetPayloadAuthToken = this.GetPayloadAuthToken.bind(this);
    this.UpdatePayloadAttached = this.UpdatePayloadAttached.bind(this);
  }
  RegisterPayload(
    request: RegisterPayloadRequest
  ): Promise<RegisterPayloadResponse> {
    const data = RegisterPayloadRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.PayloadRegistrationService",
      "RegisterPayload",
      data
    );
    return promise.then((data) =>
      RegisterPayloadResponse.decode(new _m0.Reader(data))
    );
  }

  UpdatePayloadVersion(
    request: UpdatePayloadVersionRequest
  ): Promise<UpdatePayloadVersionResponse> {
    const data = UpdatePayloadVersionRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.PayloadRegistrationService",
      "UpdatePayloadVersion",
      data
    );
    return promise.then((data) =>
      UpdatePayloadVersionResponse.decode(new _m0.Reader(data))
    );
  }

  GetPayloadAuthToken(
    request: GetPayloadAuthTokenRequest
  ): Promise<GetPayloadAuthTokenResponse> {
    const data = GetPayloadAuthTokenRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.PayloadRegistrationService",
      "GetPayloadAuthToken",
      data
    );
    return promise.then((data) =>
      GetPayloadAuthTokenResponse.decode(new _m0.Reader(data))
    );
  }

  UpdatePayloadAttached(
    request: UpdatePayloadAttachedRequest
  ): Promise<UpdatePayloadAttachedResponse> {
    const data = UpdatePayloadAttachedRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.PayloadRegistrationService",
      "UpdatePayloadAttached",
      data
    );
    return promise.then((data) =>
      UpdatePayloadAttachedResponse.decode(new _m0.Reader(data))
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
