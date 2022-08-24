/* eslint-disable */
import {
  AcquireDataResponse,
  GetStatusResponse,
  GetServiceInfoResponse,
  CancelAcquisitionResponse,
  AcquireDataRequest,
  GetStatusRequest,
  GetServiceInfoRequest,
  CancelAcquisitionRequest,
} from "./data_acquisition";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/**
 * The DataAcquisitionService is the main data acquisition service run on robot, which recieves
 * incoming requests and sends queries to all directory-registered DataAcquisitionPluginServices.
 */
export interface DataAcquisitionService {
  /**
   * Trigger a data acquisition to save data and metadata to the data buffer.
   * Sent by the tablet or a client to initiate a data acquisition and buffering process.
   */
  AcquireData(request: AcquireDataRequest): Promise<AcquireDataResponse>;
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

export class DataAcquisitionServiceClientImpl
  implements DataAcquisitionService
{
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.AcquireData = this.AcquireData.bind(this);
    this.GetStatus = this.GetStatus.bind(this);
    this.GetServiceInfo = this.GetServiceInfo.bind(this);
    this.CancelAcquisition = this.CancelAcquisition.bind(this);
  }
  AcquireData(request: AcquireDataRequest): Promise<AcquireDataResponse> {
    const data = AcquireDataRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.DataAcquisitionService",
      "AcquireData",
      data
    );
    return promise.then((data) =>
      AcquireDataResponse.decode(new _m0.Reader(data))
    );
  }

  GetStatus(request: GetStatusRequest): Promise<GetStatusResponse> {
    const data = GetStatusRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.DataAcquisitionService",
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
      "bosdyn.api.DataAcquisitionService",
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
      "bosdyn.api.DataAcquisitionService",
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
