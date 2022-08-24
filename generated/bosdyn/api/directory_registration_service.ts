/* eslint-disable */
import {
  RegisterServiceResponse,
  UnregisterServiceResponse,
  UpdateServiceResponse,
  RegisterServiceRequest,
  UnregisterServiceRequest,
  UpdateServiceRequest,
} from "./directory_registration";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/**
 * DirectoryRegistrationService is a private class that lets services be
 * discovered by clients by adding them to a discovery database.  Services
 * can live on robot, payload, or other accessible cloud-based locations.
 * Each service is responsible for registering itself with this service.
 */
export interface DirectoryRegistrationService {
  /**
   * Called by a producer to register as a provider with the application.  Returns the
   * record for that provider.  Requires unique name and correctly filled out service
   * record in request.
   */
  RegisterService(
    request: RegisterServiceRequest
  ): Promise<RegisterServiceResponse>;
  /** Called by a producer to remove its registration from the DirectoryManager. */
  UnregisterService(
    request: UnregisterServiceRequest
  ): Promise<UnregisterServiceResponse>;
  /** Update the ServiceEntry for a producer on the server. */
  UpdateService(request: UpdateServiceRequest): Promise<UpdateServiceResponse>;
}

export class DirectoryRegistrationServiceClientImpl
  implements DirectoryRegistrationService
{
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.RegisterService = this.RegisterService.bind(this);
    this.UnregisterService = this.UnregisterService.bind(this);
    this.UpdateService = this.UpdateService.bind(this);
  }
  RegisterService(
    request: RegisterServiceRequest
  ): Promise<RegisterServiceResponse> {
    const data = RegisterServiceRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.DirectoryRegistrationService",
      "RegisterService",
      data
    );
    return promise.then((data) =>
      RegisterServiceResponse.decode(new _m0.Reader(data))
    );
  }

  UnregisterService(
    request: UnregisterServiceRequest
  ): Promise<UnregisterServiceResponse> {
    const data = UnregisterServiceRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.DirectoryRegistrationService",
      "UnregisterService",
      data
    );
    return promise.then((data) =>
      UnregisterServiceResponse.decode(new _m0.Reader(data))
    );
  }

  UpdateService(request: UpdateServiceRequest): Promise<UpdateServiceResponse> {
    const data = UpdateServiceRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.DirectoryRegistrationService",
      "UpdateService",
      data
    );
    return promise.then((data) =>
      UpdateServiceResponse.decode(new _m0.Reader(data))
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
