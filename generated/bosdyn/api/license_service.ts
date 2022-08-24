/* eslint-disable */
import {
  GetLicenseInfoResponse,
  GetFeatureEnabledResponse,
  GetLicenseInfoRequest,
  GetFeatureEnabledRequest,
} from "./license";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/** The LicenseService allows clients to query the currently installed license on robot. */
export interface LicenseService {
  /**
   * Get information, such as the license number, dates of validity, and features for the license
   * currently uploaded on the robot.
   */
  GetLicenseInfo(
    request: GetLicenseInfoRequest
  ): Promise<GetLicenseInfoResponse>;
  /**
   * Check if specific features (identified by string names) are enabled under the currently loaded
   * license for this robot.
   */
  GetFeatureEnabled(
    request: GetFeatureEnabledRequest
  ): Promise<GetFeatureEnabledResponse>;
}

export class LicenseServiceClientImpl implements LicenseService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetLicenseInfo = this.GetLicenseInfo.bind(this);
    this.GetFeatureEnabled = this.GetFeatureEnabled.bind(this);
  }
  GetLicenseInfo(
    request: GetLicenseInfoRequest
  ): Promise<GetLicenseInfoResponse> {
    const data = GetLicenseInfoRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.LicenseService",
      "GetLicenseInfo",
      data
    );
    return promise.then((data) =>
      GetLicenseInfoResponse.decode(new _m0.Reader(data))
    );
  }

  GetFeatureEnabled(
    request: GetFeatureEnabledRequest
  ): Promise<GetFeatureEnabledResponse> {
    const data = GetFeatureEnabledRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.LicenseService",
      "GetFeatureEnabled",
      data
    );
    return promise.then((data) =>
      GetFeatureEnabledResponse.decode(new _m0.Reader(data))
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
