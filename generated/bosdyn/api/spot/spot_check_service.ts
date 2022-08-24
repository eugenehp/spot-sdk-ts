/* eslint-disable */
import {
  SpotCheckCommandResponse,
  SpotCheckFeedbackResponse,
  CameraCalibrationCommandResponse,
  CameraCalibrationFeedbackResponse,
  SpotCheckCommandRequest,
  SpotCheckFeedbackRequest,
  CameraCalibrationCommandRequest,
  CameraCalibrationFeedbackRequest,
} from "./spot_check";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api.spot";

/**
 * RPCs for monitoring robot health and recalibration various sensors. These procedures should be
 * run periodically in order to keep the system running in the best possible condition.
 */
export interface SpotCheckService {
  /**
   * Send a command to the SpotCheck service. The spotcheck service is responsible to both
   * recalibrating actuation sensors and checking camera health.
   */
  SpotCheckCommand(
    request: SpotCheckCommandRequest
  ): Promise<SpotCheckCommandResponse>;
  /**
   * Check the status of the spot check procedure. After procedure completes, this reports back
   * results for specific joints and cameras.
   */
  SpotCheckFeedback(
    request: SpotCheckFeedbackRequest
  ): Promise<SpotCheckFeedbackResponse>;
  /** Send a camera calibration command to the robot. Used to start or abort a calibration routine. */
  CameraCalibrationCommand(
    request: CameraCalibrationCommandRequest
  ): Promise<CameraCalibrationCommandResponse>;
  /** Check the status of the camera calibration procedure. */
  CameraCalibrationFeedback(
    request: CameraCalibrationFeedbackRequest
  ): Promise<CameraCalibrationFeedbackResponse>;
}

export class SpotCheckServiceClientImpl implements SpotCheckService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.SpotCheckCommand = this.SpotCheckCommand.bind(this);
    this.SpotCheckFeedback = this.SpotCheckFeedback.bind(this);
    this.CameraCalibrationCommand = this.CameraCalibrationCommand.bind(this);
    this.CameraCalibrationFeedback = this.CameraCalibrationFeedback.bind(this);
  }
  SpotCheckCommand(
    request: SpotCheckCommandRequest
  ): Promise<SpotCheckCommandResponse> {
    const data = SpotCheckCommandRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot.SpotCheckService",
      "SpotCheckCommand",
      data
    );
    return promise.then((data) =>
      SpotCheckCommandResponse.decode(new _m0.Reader(data))
    );
  }

  SpotCheckFeedback(
    request: SpotCheckFeedbackRequest
  ): Promise<SpotCheckFeedbackResponse> {
    const data = SpotCheckFeedbackRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot.SpotCheckService",
      "SpotCheckFeedback",
      data
    );
    return promise.then((data) =>
      SpotCheckFeedbackResponse.decode(new _m0.Reader(data))
    );
  }

  CameraCalibrationCommand(
    request: CameraCalibrationCommandRequest
  ): Promise<CameraCalibrationCommandResponse> {
    const data = CameraCalibrationCommandRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot.SpotCheckService",
      "CameraCalibrationCommand",
      data
    );
    return promise.then((data) =>
      CameraCalibrationCommandResponse.decode(new _m0.Reader(data))
    );
  }

  CameraCalibrationFeedback(
    request: CameraCalibrationFeedbackRequest
  ): Promise<CameraCalibrationFeedbackResponse> {
    const data = CameraCalibrationFeedbackRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot.SpotCheckService",
      "CameraCalibrationFeedback",
      data
    );
    return promise.then((data) =>
      CameraCalibrationFeedbackResponse.decode(new _m0.Reader(data))
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
