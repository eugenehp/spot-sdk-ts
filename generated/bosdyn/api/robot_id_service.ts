/* eslint-disable */
import { RobotIdResponse, RobotIdRequest } from "./robot_id";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api";

/**
 * RobotIdService provides mostly static identifying information about a robot.
 * User authentication is not required to access RobotIdService to assist with
 * early robot discovery.
 */
export interface RobotIdService {
  /**
   * Get the robot id information. The ID contains basic information about a robot
   * which is made available over the network as part of robot discovery without
   * requiring user authentication.
   */
  GetRobotId(request: RobotIdRequest): Promise<RobotIdResponse>;
}

export class RobotIdServiceClientImpl implements RobotIdService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetRobotId = this.GetRobotId.bind(this);
  }
  GetRobotId(request: RobotIdRequest): Promise<RobotIdResponse> {
    const data = RobotIdRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.RobotIdService",
      "GetRobotId",
      data
    );
    return promise.then((data) => RobotIdResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}
