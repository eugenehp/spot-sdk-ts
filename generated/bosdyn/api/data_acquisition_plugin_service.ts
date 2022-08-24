/* eslint-disable */
import {
  AcquirePluginDataResponse,
  GetStatusResponse,
  GetServiceInfoResponse,
  CancelAcquisitionResponse,
  AcquirePluginDataRequest,
  GetStatusRequest,
  GetServiceInfoRequest,
  CancelAcquisitionRequest,
} from "./data_acquisition";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/**
 * The DataAcquisitionPluginService is a gRPC service that a payload developer implements to retrieve
 * data from a sensor (or more generally perform some payload action) and optionally store that data
 * on the robot via the DataAcquisitionStore service.
 */
export interface DataAcquisitionPluginService {
  /**
   * Trigger a data acquisition to save metadata and non-image data to the data buffer.
   * Sent by the main DAQ as a result of a data acquisition request from the tablet or a client.
   */
  AcquirePluginData(
    request: AcquirePluginDataRequest
  ): Promise<AcquirePluginDataResponse>;
  /** Query the status of a data acquisition. */
  GetStatus(request: GetStatusRequest): Promise<GetStatusResponse>;
  /** Get information from a DAQ service; lists acquisition capabilities. */
  GetServiceInfo(
    request: GetServiceInfoRequest
  ): Promise<GetServiceInfoResponse>;
  /** Cancel an in-progress data acquisition. */
  CancelAcquisition(
    request: CancelAcquisitionRequest
  ): Promise<CancelAcquisitionResponse>;
}

export class DataAcquisitionPluginServiceClientImpl
  implements DataAcquisitionPluginService
{
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.AcquirePluginData = this.AcquirePluginData.bind(this);
    this.GetStatus = this.GetStatus.bind(this);
    this.GetServiceInfo = this.GetServiceInfo.bind(this);
    this.CancelAcquisition = this.CancelAcquisition.bind(this);
  }
  AcquirePluginData(
    request: AcquirePluginDataRequest
  ): Promise<AcquirePluginDataResponse> {
    const data = AcquirePluginDataRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.DataAcquisitionPluginService",
      "AcquirePluginData",
      data
    );
    return promise.then((data) =>
      AcquirePluginDataResponse.decode(new _m0.Reader(data))
    );
  }

  GetStatus(request: GetStatusRequest): Promise<GetStatusResponse> {
    const data = GetStatusRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.DataAcquisitionPluginService",
      "GetStatus",
      data
    );
    return promise.then((data) =>
      GetStatusResponse.decode(new _m0.Reader(data))
    );
  }

  GetServiceInfo(
    request: GetServiceInfoRequest
  ): Promise<GetServiceInfoResponse> {
    const data = GetServiceInfoRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.DataAcquisitionPluginService",
      "GetServiceInfo",
      data
    );
    return promise.then((data) =>
      GetServiceInfoResponse.decode(new _m0.Reader(data))
    );
  }

  CancelAcquisition(
    request: CancelAcquisitionRequest
  ): Promise<CancelAcquisitionResponse> {
    const data = CancelAcquisitionRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.DataAcquisitionPluginService",
      "CancelAcquisition",
      data
    );
    return promise.then((data) =>
      CancelAcquisitionResponse.decode(new _m0.Reader(data))
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
