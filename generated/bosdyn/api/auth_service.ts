/* eslint-disable */
import { GetAuthTokenResponse, GetAuthTokenRequest } from "./auth";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/**
 * The AuthService provides clients the ability to convert a user/password pair into a token. The
 * token can then be added to the http2 headers for future requests in order to establish the
 * identity of the requester.
 */
export interface AuthService {
  /** Request to get the auth token for the robot. */
  GetAuthToken(request: GetAuthTokenRequest): Promise<GetAuthTokenResponse>;
}

export class AuthServiceClientImpl implements AuthService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetAuthToken = this.GetAuthToken.bind(this);
  }
  GetAuthToken(request: GetAuthTokenRequest): Promise<GetAuthTokenResponse> {
    const data = GetAuthTokenRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.AuthService",
      "GetAuthToken",
      data
    );
    return promise.then((data) =>
      GetAuthTokenResponse.decode(new _m0.Reader(data))
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
