/* eslint-disable */
import {
  ManipulationApiResponse,
  ManipulationApiFeedbackResponse,
  ApiGraspOverrideResponse,
  ManipulationApiRequest,
  ManipulationApiFeedbackRequest,
  ApiGraspOverrideRequest,
} from "./manipulation_api";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

export interface ManipulationApiService {
  ManipulationApi(
    request: ManipulationApiRequest
  ): Promise<ManipulationApiResponse>;
  ManipulationApiFeedback(
    request: ManipulationApiFeedbackRequest
  ): Promise<ManipulationApiFeedbackResponse>;
  OverrideGrasp(
    request: ApiGraspOverrideRequest
  ): Promise<ApiGraspOverrideResponse>;
}

export class ManipulationApiServiceClientImpl
  implements ManipulationApiService
{
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ManipulationApi = this.ManipulationApi.bind(this);
    this.ManipulationApiFeedback = this.ManipulationApiFeedback.bind(this);
    this.OverrideGrasp = this.OverrideGrasp.bind(this);
  }
  ManipulationApi(
    request: ManipulationApiRequest
  ): Promise<ManipulationApiResponse> {
    const data = ManipulationApiRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.ManipulationApiService",
      "ManipulationApi",
      data
    );
    return promise.then((data) =>
      ManipulationApiResponse.decode(new _m0.Reader(data))
    );
  }

  ManipulationApiFeedback(
    request: ManipulationApiFeedbackRequest
  ): Promise<ManipulationApiFeedbackResponse> {
    const data = ManipulationApiFeedbackRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.ManipulationApiService",
      "ManipulationApiFeedback",
      data
    );
    return promise.then((data) =>
      ManipulationApiFeedbackResponse.decode(new _m0.Reader(data))
    );
  }

  OverrideGrasp(
    request: ApiGraspOverrideRequest
  ): Promise<ApiGraspOverrideResponse> {
    const data = ApiGraspOverrideRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.ManipulationApiService",
      "OverrideGrasp",
      data
    );
    return promise.then((data) =>
      ApiGraspOverrideResponse.decode(new _m0.Reader(data))
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
