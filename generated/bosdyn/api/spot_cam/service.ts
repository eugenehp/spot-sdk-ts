/* eslint-disable */
import {
  SetScreenResponse,
  GetScreenResponse,
  ListScreensResponse,
  GetVisibleCamerasResponse,
  SetIrColormapResponse,
  GetIrColormapResponse,
  SetIrMeterOverlayResponse,
  SetScreenRequest,
  GetScreenRequest,
  ListScreensRequest,
  GetVisibleCamerasRequest,
  SetIrColormapRequest,
  GetIrColormapRequest,
  SetIrMeterOverlayRequest,
} from "./compositor";
import {
  SetStreamParamsResponse,
  GetStreamParamsResponse,
  EnableCongestionControlResponse,
  SetStreamParamsRequest,
  GetStreamParamsRequest,
  EnableCongestionControlRequest,
} from "./streamquality";
import {
  SetPowerStatusResponse,
  GetPowerStatusResponse,
  CyclePowerResponse,
  SetPowerStatusRequest,
  GetPowerStatusRequest,
  CyclePowerRequest,
} from "./power";
import {
  SetLEDBrightnessResponse,
  GetLEDBrightnessResponse,
  SetLEDBrightnessRequest,
  GetLEDBrightnessRequest,
} from "./LED";
import {
  StoreResponse,
  GetStatusResponse,
  TagResponse,
  DebugResponse,
  ListCamerasResponse,
  RetrieveRawDataResponse,
  RetrieveResponse,
  DeleteResponse,
  ListLogpointsResponse,
  SetPassphraseResponse,
  StoreRequest,
  GetStatusRequest,
  TagRequest,
  DebugRequest,
  ListCamerasRequest,
  RetrieveRawDataRequest,
  RetrieveRequest,
  DeleteRequest,
  ListLogpointsRequest,
  SetPassphraseRequest,
} from "./logging";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  SetPtzPositionResponse,
  GetPtzPositionResponse,
  SetPtzVelocityResponse,
  GetPtzVelocityResponse,
  ListPtzResponse,
  InitializeLensResponse,
  SetPtzPositionRequest,
  GetPtzPositionRequest,
  SetPtzVelocityRequest,
  GetPtzVelocityRequest,
  ListPtzRequest,
  InitializeLensRequest,
} from "./ptz";
import {
  PlaySoundResponse,
  LoadSoundResponse,
  DeleteSoundResponse,
  ListSoundsResponse,
  SetVolumeResponse,
  GetVolumeResponse,
  SetAudioCaptureChannelResponse,
  GetAudioCaptureChannelResponse,
  SetAudioCaptureGainResponse,
  GetAudioCaptureGainResponse,
  PlaySoundRequest,
  DeleteSoundRequest,
  ListSoundsRequest,
  SetVolumeRequest,
  GetVolumeRequest,
  SetAudioCaptureChannelRequest,
  GetAudioCaptureChannelRequest,
  SetAudioCaptureGainRequest,
  GetAudioCaptureGainRequest,
  LoadSoundRequest,
} from "./audio";
import {
  GetTemperatureResponse,
  GetBITStatusResponse,
  ClearBITEventsResponse,
  GetSystemLogResponse,
  GetTemperatureRequest,
  GetBITStatusRequest,
  ClearBITEventsRequest,
  GetSystemLogRequest,
} from "./health";
import {
  SetICEConfigurationResponse,
  GetICEConfigurationResponse,
  SetICEConfigurationRequest,
  GetICEConfigurationRequest,
} from "./network";
import {
  GetSoftwareVersionResponse,
  GetSoftwareVersionRequest,
} from "./version";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bosdyn.api.spot_cam";

/** Change the layout of of the video stream between available presets. */
export interface CompositorService {
  /** SetScreen changes the current view that is streamed over the network */
  SetScreen(request: SetScreenRequest): Promise<SetScreenResponse>;
  /** GetScreen returns the currently-selected screen */
  GetScreen(request: GetScreenRequest): Promise<GetScreenResponse>;
  /** ListScreens returns a list of available screens */
  ListScreens(request: ListScreensRequest): Promise<ListScreensResponse>;
  /** GetVisibleCameras returns a list of currently visible windows, with any available metadata */
  GetVisibleCameras(
    request: GetVisibleCamerasRequest
  ): Promise<GetVisibleCamerasResponse>;
  /** set the mapping between radiometric IR samples to color, for video */
  SetIrColormap(request: SetIrColormapRequest): Promise<SetIrColormapResponse>;
  /** get the mapping between radiometric IR samples to color, for video */
  GetIrColormap(request: GetIrColormapRequest): Promise<GetIrColormapResponse>;
  /** apply settings for the 'ir meter overlay' */
  SetIrMeterOverlay(
    request: SetIrMeterOverlayRequest
  ): Promise<SetIrMeterOverlayResponse>;
}

export class CompositorServiceClientImpl implements CompositorService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.SetScreen = this.SetScreen.bind(this);
    this.GetScreen = this.GetScreen.bind(this);
    this.ListScreens = this.ListScreens.bind(this);
    this.GetVisibleCameras = this.GetVisibleCameras.bind(this);
    this.SetIrColormap = this.SetIrColormap.bind(this);
    this.GetIrColormap = this.GetIrColormap.bind(this);
    this.SetIrMeterOverlay = this.SetIrMeterOverlay.bind(this);
  }
  SetScreen(request: SetScreenRequest): Promise<SetScreenResponse> {
    const data = SetScreenRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.CompositorService",
      "SetScreen",
      data
    );
    return promise.then((data) =>
      SetScreenResponse.decode(new _m0.Reader(data))
    );
  }

  GetScreen(request: GetScreenRequest): Promise<GetScreenResponse> {
    const data = GetScreenRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.CompositorService",
      "GetScreen",
      data
    );
    return promise.then((data) =>
      GetScreenResponse.decode(new _m0.Reader(data))
    );
  }

  ListScreens(request: ListScreensRequest): Promise<ListScreensResponse> {
    const data = ListScreensRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.CompositorService",
      "ListScreens",
      data
    );
    return promise.then((data) =>
      ListScreensResponse.decode(new _m0.Reader(data))
    );
  }

  GetVisibleCameras(
    request: GetVisibleCamerasRequest
  ): Promise<GetVisibleCamerasResponse> {
    const data = GetVisibleCamerasRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.CompositorService",
      "GetVisibleCameras",
      data
    );
    return promise.then((data) =>
      GetVisibleCamerasResponse.decode(new _m0.Reader(data))
    );
  }

  SetIrColormap(request: SetIrColormapRequest): Promise<SetIrColormapResponse> {
    const data = SetIrColormapRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.CompositorService",
      "SetIrColormap",
      data
    );
    return promise.then((data) =>
      SetIrColormapResponse.decode(new _m0.Reader(data))
    );
  }

  GetIrColormap(request: GetIrColormapRequest): Promise<GetIrColormapResponse> {
    const data = GetIrColormapRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.CompositorService",
      "GetIrColormap",
      data
    );
    return promise.then((data) =>
      GetIrColormapResponse.decode(new _m0.Reader(data))
    );
  }

  SetIrMeterOverlay(
    request: SetIrMeterOverlayRequest
  ): Promise<SetIrMeterOverlayResponse> {
    const data = SetIrMeterOverlayRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.CompositorService",
      "SetIrMeterOverlay",
      data
    );
    return promise.then((data) =>
      SetIrMeterOverlayResponse.decode(new _m0.Reader(data))
    );
  }
}

/** Set quality parameters for the stream, such as compression and image postprocessing settings. */
export interface StreamQualityService {
  SetStreamParams(
    request: SetStreamParamsRequest
  ): Promise<SetStreamParamsResponse>;
  GetStreamParams(
    request: GetStreamParamsRequest
  ): Promise<GetStreamParamsResponse>;
  EnableCongestionControl(
    request: EnableCongestionControlRequest
  ): Promise<EnableCongestionControlResponse>;
}

export class StreamQualityServiceClientImpl implements StreamQualityService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.SetStreamParams = this.SetStreamParams.bind(this);
    this.GetStreamParams = this.GetStreamParams.bind(this);
    this.EnableCongestionControl = this.EnableCongestionControl.bind(this);
  }
  SetStreamParams(
    request: SetStreamParamsRequest
  ): Promise<SetStreamParamsResponse> {
    const data = SetStreamParamsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.StreamQualityService",
      "SetStreamParams",
      data
    );
    return promise.then((data) =>
      SetStreamParamsResponse.decode(new _m0.Reader(data))
    );
  }

  GetStreamParams(
    request: GetStreamParamsRequest
  ): Promise<GetStreamParamsResponse> {
    const data = GetStreamParamsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.StreamQualityService",
      "GetStreamParams",
      data
    );
    return promise.then((data) =>
      GetStreamParamsResponse.decode(new _m0.Reader(data))
    );
  }

  EnableCongestionControl(
    request: EnableCongestionControlRequest
  ): Promise<EnableCongestionControlResponse> {
    const data = EnableCongestionControlRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.StreamQualityService",
      "EnableCongestionControl",
      data
    );
    return promise.then((data) =>
      EnableCongestionControlResponse.decode(new _m0.Reader(data))
    );
  }
}

/** Turn hardware components' power on or off. */
export interface PowerService {
  /**
   * Turn components' power on or off. This should not be used to power cycle a component
   * Turning PTZ power off for too long will cause the video stream to fail
   */
  SetPowerStatus(
    request: SetPowerStatusRequest
  ): Promise<SetPowerStatusResponse>;
  /** Get current status of a component */
  GetPowerStatus(
    request: GetPowerStatusRequest
  ): Promise<GetPowerStatusResponse>;
  /** Cycle power for a component */
  CyclePower(request: CyclePowerRequest): Promise<CyclePowerResponse>;
}

export class PowerServiceClientImpl implements PowerService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.SetPowerStatus = this.SetPowerStatus.bind(this);
    this.GetPowerStatus = this.GetPowerStatus.bind(this);
    this.CyclePower = this.CyclePower.bind(this);
  }
  SetPowerStatus(
    request: SetPowerStatusRequest
  ): Promise<SetPowerStatusResponse> {
    const data = SetPowerStatusRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.PowerService",
      "SetPowerStatus",
      data
    );
    return promise.then((data) =>
      SetPowerStatusResponse.decode(new _m0.Reader(data))
    );
  }

  GetPowerStatus(
    request: GetPowerStatusRequest
  ): Promise<GetPowerStatusResponse> {
    const data = GetPowerStatusRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.PowerService",
      "GetPowerStatus",
      data
    );
    return promise.then((data) =>
      GetPowerStatusResponse.decode(new _m0.Reader(data))
    );
  }

  CyclePower(request: CyclePowerRequest): Promise<CyclePowerResponse> {
    const data = CyclePowerRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.PowerService",
      "CyclePower",
      data
    );
    return promise.then((data) =>
      CyclePowerResponse.decode(new _m0.Reader(data))
    );
  }
}

/** Change the brightness level of individual LEDs. */
export interface LightingService {
  SetLEDBrightness(
    request: SetLEDBrightnessRequest
  ): Promise<SetLEDBrightnessResponse>;
  GetLEDBrightness(
    request: GetLEDBrightnessRequest
  ): Promise<GetLEDBrightnessResponse>;
}

export class LightingServiceClientImpl implements LightingService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.SetLEDBrightness = this.SetLEDBrightness.bind(this);
    this.GetLEDBrightness = this.GetLEDBrightness.bind(this);
  }
  SetLEDBrightness(
    request: SetLEDBrightnessRequest
  ): Promise<SetLEDBrightnessResponse> {
    const data = SetLEDBrightnessRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.LightingService",
      "SetLEDBrightness",
      data
    );
    return promise.then((data) =>
      SetLEDBrightnessResponse.decode(new _m0.Reader(data))
    );
  }

  GetLEDBrightness(
    request: GetLEDBrightnessRequest
  ): Promise<GetLEDBrightnessResponse> {
    const data = GetLEDBrightnessRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.LightingService",
      "GetLEDBrightness",
      data
    );
    return promise.then((data) =>
      GetLEDBrightnessResponse.decode(new _m0.Reader(data))
    );
  }
}

/** Trigger data acquisitions, and retrieve resulting data. */
export interface MediaLogService {
  /**
   * Store queues up a Logpoint, which is a bit of media that the user wishes to store to disk
   * (still images are supported for now, more media types will be supported in the future)
   */
  Store(request: StoreRequest): Promise<StoreResponse>;
  /**
   * GetStatus reads the 'name' field of the Logpoint contained in GetStatusRequest, and fills in
   * the rest of the fields. Mainly useful for getting the 'state' of the logpoint.
   */
  GetStatus(request: GetStatusRequest): Promise<GetStatusResponse>;
  /** Tag updates the 'tag' field of the Logpoint that's passed, which must exist. */
  Tag(request: TagRequest): Promise<TagResponse>;
  /** EnableDebug starts the periodic logging of health data to the database; this increases disk utilization, but will record data that is useful post-mortum */
  EnableDebug(request: DebugRequest): Promise<DebugResponse>;
  /** ListCameras returns a list of strings that identify valid cameras for logging */
  ListCameras(request: ListCamerasRequest): Promise<ListCamerasResponse>;
  /** Retrieve returns all raw data associated with a given logpoint */
  RetrieveRawData(
    request: RetrieveRawDataRequest
  ): Observable<RetrieveRawDataResponse>;
  /** Retrieve returns all data associated with a given logpoint */
  Retrieve(request: RetrieveRequest): Observable<RetrieveResponse>;
  /** Delete removes a Logpoint from the system */
  Delete(request: DeleteRequest): Promise<DeleteResponse>;
  /**
   * ListLogpoints returns a list of all logpoints in the database.
   * Warning: this may be a lot of data.
   */
  ListLogpoints(
    request: ListLogpointsRequest
  ): Observable<ListLogpointsResponse>;
  /**
   * SetPassphrase sets the eCryptFS passphrase used by the filesystem.
   * there is no symmetry here, because key material is write-only
   * This rpc is now deprecated as of the switch from EXT4 to NTFS and returns UnimplementedError
   */
  SetPassphrase(request: SetPassphraseRequest): Promise<SetPassphraseResponse>;
}

export class MediaLogServiceClientImpl implements MediaLogService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Store = this.Store.bind(this);
    this.GetStatus = this.GetStatus.bind(this);
    this.Tag = this.Tag.bind(this);
    this.EnableDebug = this.EnableDebug.bind(this);
    this.ListCameras = this.ListCameras.bind(this);
    this.RetrieveRawData = this.RetrieveRawData.bind(this);
    this.Retrieve = this.Retrieve.bind(this);
    this.Delete = this.Delete.bind(this);
    this.ListLogpoints = this.ListLogpoints.bind(this);
    this.SetPassphrase = this.SetPassphrase.bind(this);
  }
  Store(request: StoreRequest): Promise<StoreResponse> {
    const data = StoreRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.MediaLogService",
      "Store",
      data
    );
    return promise.then((data) => StoreResponse.decode(new _m0.Reader(data)));
  }

  GetStatus(request: GetStatusRequest): Promise<GetStatusResponse> {
    const data = GetStatusRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.MediaLogService",
      "GetStatus",
      data
    );
    return promise.then((data) =>
      GetStatusResponse.decode(new _m0.Reader(data))
    );
  }

  Tag(request: TagRequest): Promise<TagResponse> {
    const data = TagRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.MediaLogService",
      "Tag",
      data
    );
    return promise.then((data) => TagResponse.decode(new _m0.Reader(data)));
  }

  EnableDebug(request: DebugRequest): Promise<DebugResponse> {
    const data = DebugRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.MediaLogService",
      "EnableDebug",
      data
    );
    return promise.then((data) => DebugResponse.decode(new _m0.Reader(data)));
  }

  ListCameras(request: ListCamerasRequest): Promise<ListCamerasResponse> {
    const data = ListCamerasRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.MediaLogService",
      "ListCameras",
      data
    );
    return promise.then((data) =>
      ListCamerasResponse.decode(new _m0.Reader(data))
    );
  }

  RetrieveRawData(
    request: RetrieveRawDataRequest
  ): Observable<RetrieveRawDataResponse> {
    const data = RetrieveRawDataRequest.encode(request).finish();
    const result = this.rpc.serverStreamingRequest(
      "bosdyn.api.spot_cam.MediaLogService",
      "RetrieveRawData",
      data
    );
    return result.pipe(
      map((data) => RetrieveRawDataResponse.decode(new _m0.Reader(data)))
    );
  }

  Retrieve(request: RetrieveRequest): Observable<RetrieveResponse> {
    const data = RetrieveRequest.encode(request).finish();
    const result = this.rpc.serverStreamingRequest(
      "bosdyn.api.spot_cam.MediaLogService",
      "Retrieve",
      data
    );
    return result.pipe(
      map((data) => RetrieveResponse.decode(new _m0.Reader(data)))
    );
  }

  Delete(request: DeleteRequest): Promise<DeleteResponse> {
    const data = DeleteRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.MediaLogService",
      "Delete",
      data
    );
    return promise.then((data) => DeleteResponse.decode(new _m0.Reader(data)));
  }

  ListLogpoints(
    request: ListLogpointsRequest
  ): Observable<ListLogpointsResponse> {
    const data = ListLogpointsRequest.encode(request).finish();
    const result = this.rpc.serverStreamingRequest(
      "bosdyn.api.spot_cam.MediaLogService",
      "ListLogpoints",
      data
    );
    return result.pipe(
      map((data) => ListLogpointsResponse.decode(new _m0.Reader(data)))
    );
  }

  SetPassphrase(request: SetPassphraseRequest): Promise<SetPassphraseResponse> {
    const data = SetPassphraseRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.MediaLogService",
      "SetPassphrase",
      data
    );
    return promise.then((data) =>
      SetPassphraseResponse.decode(new _m0.Reader(data))
    );
  }
}

/** Control real and virtual ptz mechanisms. */
export interface PtzService {
  /** SetPosition points the referenced camera to a given vector (in PTZ-space) */
  SetPtzPosition(
    request: SetPtzPositionRequest
  ): Promise<SetPtzPositionResponse>;
  /** GetPosition returns the current settings of the referenced camera */
  GetPtzPosition(
    request: GetPtzPositionRequest
  ): Promise<GetPtzPositionResponse>;
  SetPtzVelocity(
    request: SetPtzVelocityRequest
  ): Promise<SetPtzVelocityResponse>;
  GetPtzVelocity(
    request: GetPtzVelocityRequest
  ): Promise<GetPtzVelocityResponse>;
  ListPtz(request: ListPtzRequest): Promise<ListPtzResponse>;
  /** Reinitializes PTZ autofocus */
  InitializeLens(
    request: InitializeLensRequest
  ): Promise<InitializeLensResponse>;
}

export class PtzServiceClientImpl implements PtzService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.SetPtzPosition = this.SetPtzPosition.bind(this);
    this.GetPtzPosition = this.GetPtzPosition.bind(this);
    this.SetPtzVelocity = this.SetPtzVelocity.bind(this);
    this.GetPtzVelocity = this.GetPtzVelocity.bind(this);
    this.ListPtz = this.ListPtz.bind(this);
    this.InitializeLens = this.InitializeLens.bind(this);
  }
  SetPtzPosition(
    request: SetPtzPositionRequest
  ): Promise<SetPtzPositionResponse> {
    const data = SetPtzPositionRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.PtzService",
      "SetPtzPosition",
      data
    );
    return promise.then((data) =>
      SetPtzPositionResponse.decode(new _m0.Reader(data))
    );
  }

  GetPtzPosition(
    request: GetPtzPositionRequest
  ): Promise<GetPtzPositionResponse> {
    const data = GetPtzPositionRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.PtzService",
      "GetPtzPosition",
      data
    );
    return promise.then((data) =>
      GetPtzPositionResponse.decode(new _m0.Reader(data))
    );
  }

  SetPtzVelocity(
    request: SetPtzVelocityRequest
  ): Promise<SetPtzVelocityResponse> {
    const data = SetPtzVelocityRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.PtzService",
      "SetPtzVelocity",
      data
    );
    return promise.then((data) =>
      SetPtzVelocityResponse.decode(new _m0.Reader(data))
    );
  }

  GetPtzVelocity(
    request: GetPtzVelocityRequest
  ): Promise<GetPtzVelocityResponse> {
    const data = GetPtzVelocityRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.PtzService",
      "GetPtzVelocity",
      data
    );
    return promise.then((data) =>
      GetPtzVelocityResponse.decode(new _m0.Reader(data))
    );
  }

  ListPtz(request: ListPtzRequest): Promise<ListPtzResponse> {
    const data = ListPtzRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.PtzService",
      "ListPtz",
      data
    );
    return promise.then((data) => ListPtzResponse.decode(new _m0.Reader(data)));
  }

  InitializeLens(
    request: InitializeLensRequest
  ): Promise<InitializeLensResponse> {
    const data = InitializeLensRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.PtzService",
      "InitializeLens",
      data
    );
    return promise.then((data) =>
      InitializeLensResponse.decode(new _m0.Reader(data))
    );
  }
}

/** Upload and play sounds over the SpotCam's speakers. */
export interface AudioService {
  /** Given a soundRequest that identifies a single sound present in the system's sound effects table, PlaySound executes the sound effect. */
  PlaySound(request: PlaySoundRequest): Promise<PlaySoundResponse>;
  /**
   * LoadSound loads a sound effect into the system's sound table. The stream must contain a wav file, with a RIFF header describing it.
   * The arguement is a stream, to allow for sounds that are bigger then the MTU of the network; in this case, the complete stream must
   * contain the entire sound. If the stream ends early, an error will be returned. The header and sound fields of the entire stream must
   * be the same.
   */
  LoadSound(request: Observable<LoadSoundRequest>): Promise<LoadSoundResponse>;
  /** Delete the sound identified in the argument from the system's sound table. */
  DeleteSound(request: DeleteSoundRequest): Promise<DeleteSoundResponse>;
  /** ListSounds returns a list of all of the sound effects that the system knows about. */
  ListSounds(request: ListSoundsRequest): Promise<ListSoundsResponse>;
  /** Set the overall volume level for playing sounds. */
  SetVolume(request: SetVolumeRequest): Promise<SetVolumeResponse>;
  /** Set the overall volume level for playing sounds. */
  GetVolume(request: GetVolumeRequest): Promise<GetVolumeResponse>;
  SetAudioCaptureChannel(
    request: SetAudioCaptureChannelRequest
  ): Promise<SetAudioCaptureChannelResponse>;
  GetAudioCaptureChannel(
    request: GetAudioCaptureChannelRequest
  ): Promise<GetAudioCaptureChannelResponse>;
  SetAudioCaptureGain(
    request: SetAudioCaptureGainRequest
  ): Promise<SetAudioCaptureGainResponse>;
  GetAudioCaptureGain(
    request: GetAudioCaptureGainRequest
  ): Promise<GetAudioCaptureGainResponse>;
}

export class AudioServiceClientImpl implements AudioService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.PlaySound = this.PlaySound.bind(this);
    this.LoadSound = this.LoadSound.bind(this);
    this.DeleteSound = this.DeleteSound.bind(this);
    this.ListSounds = this.ListSounds.bind(this);
    this.SetVolume = this.SetVolume.bind(this);
    this.GetVolume = this.GetVolume.bind(this);
    this.SetAudioCaptureChannel = this.SetAudioCaptureChannel.bind(this);
    this.GetAudioCaptureChannel = this.GetAudioCaptureChannel.bind(this);
    this.SetAudioCaptureGain = this.SetAudioCaptureGain.bind(this);
    this.GetAudioCaptureGain = this.GetAudioCaptureGain.bind(this);
  }
  PlaySound(request: PlaySoundRequest): Promise<PlaySoundResponse> {
    const data = PlaySoundRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.AudioService",
      "PlaySound",
      data
    );
    return promise.then((data) =>
      PlaySoundResponse.decode(new _m0.Reader(data))
    );
  }

  LoadSound(request: Observable<LoadSoundRequest>): Promise<LoadSoundResponse> {
    const data = request.pipe(
      map((request) => LoadSoundRequest.encode(request).finish())
    );
    const promise = this.rpc.clientStreamingRequest(
      "bosdyn.api.spot_cam.AudioService",
      "LoadSound",
      data
    );
    return promise.then((data) =>
      LoadSoundResponse.decode(new _m0.Reader(data))
    );
  }

  DeleteSound(request: DeleteSoundRequest): Promise<DeleteSoundResponse> {
    const data = DeleteSoundRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.AudioService",
      "DeleteSound",
      data
    );
    return promise.then((data) =>
      DeleteSoundResponse.decode(new _m0.Reader(data))
    );
  }

  ListSounds(request: ListSoundsRequest): Promise<ListSoundsResponse> {
    const data = ListSoundsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.AudioService",
      "ListSounds",
      data
    );
    return promise.then((data) =>
      ListSoundsResponse.decode(new _m0.Reader(data))
    );
  }

  SetVolume(request: SetVolumeRequest): Promise<SetVolumeResponse> {
    const data = SetVolumeRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.AudioService",
      "SetVolume",
      data
    );
    return promise.then((data) =>
      SetVolumeResponse.decode(new _m0.Reader(data))
    );
  }

  GetVolume(request: GetVolumeRequest): Promise<GetVolumeResponse> {
    const data = GetVolumeRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.AudioService",
      "GetVolume",
      data
    );
    return promise.then((data) =>
      GetVolumeResponse.decode(new _m0.Reader(data))
    );
  }

  SetAudioCaptureChannel(
    request: SetAudioCaptureChannelRequest
  ): Promise<SetAudioCaptureChannelResponse> {
    const data = SetAudioCaptureChannelRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.AudioService",
      "SetAudioCaptureChannel",
      data
    );
    return promise.then((data) =>
      SetAudioCaptureChannelResponse.decode(new _m0.Reader(data))
    );
  }

  GetAudioCaptureChannel(
    request: GetAudioCaptureChannelRequest
  ): Promise<GetAudioCaptureChannelResponse> {
    const data = GetAudioCaptureChannelRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.AudioService",
      "GetAudioCaptureChannel",
      data
    );
    return promise.then((data) =>
      GetAudioCaptureChannelResponse.decode(new _m0.Reader(data))
    );
  }

  SetAudioCaptureGain(
    request: SetAudioCaptureGainRequest
  ): Promise<SetAudioCaptureGainResponse> {
    const data = SetAudioCaptureGainRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.AudioService",
      "SetAudioCaptureGain",
      data
    );
    return promise.then((data) =>
      SetAudioCaptureGainResponse.decode(new _m0.Reader(data))
    );
  }

  GetAudioCaptureGain(
    request: GetAudioCaptureGainRequest
  ): Promise<GetAudioCaptureGainResponse> {
    const data = GetAudioCaptureGainRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.AudioService",
      "GetAudioCaptureGain",
      data
    );
    return promise.then((data) =>
      GetAudioCaptureGainResponse.decode(new _m0.Reader(data))
    );
  }
}

/** Query temperature and built-in test results. */
export interface HealthService {
  /** GetTemperature returns a list of thermometers in the system, and the temperature that they measure. */
  GetTemperature(
    request: GetTemperatureRequest
  ): Promise<GetTemperatureResponse>;
  /**
   * GetBitStatus returns two lists; a list of system events, and a list of ways that the system is degraded;
   * for instance, a degredation may include a missing PTZ unit, or a missing USB storage device.
   */
  GetBITStatus(request: GetBITStatusRequest): Promise<GetBITStatusResponse>;
  /** ClearBitEvents clears out the events list of the BITStatus structure. */
  ClearBITEvents(
    request: ClearBITEventsRequest
  ): Promise<ClearBITEventsResponse>;
  /**
   * GetSystemLog retrieves an encrypted log of system events, for factory diagnosis of possible issues.
   * The data streamed back should be concatenated to a single file, before sending to the manufacturer.
   */
  GetSystemLog(request: GetSystemLogRequest): Observable<GetSystemLogResponse>;
}

export class HealthServiceClientImpl implements HealthService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetTemperature = this.GetTemperature.bind(this);
    this.GetBITStatus = this.GetBITStatus.bind(this);
    this.ClearBITEvents = this.ClearBITEvents.bind(this);
    this.GetSystemLog = this.GetSystemLog.bind(this);
  }
  GetTemperature(
    request: GetTemperatureRequest
  ): Promise<GetTemperatureResponse> {
    const data = GetTemperatureRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.HealthService",
      "GetTemperature",
      data
    );
    return promise.then((data) =>
      GetTemperatureResponse.decode(new _m0.Reader(data))
    );
  }

  GetBITStatus(request: GetBITStatusRequest): Promise<GetBITStatusResponse> {
    const data = GetBITStatusRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.HealthService",
      "GetBITStatus",
      data
    );
    return promise.then((data) =>
      GetBITStatusResponse.decode(new _m0.Reader(data))
    );
  }

  ClearBITEvents(
    request: ClearBITEventsRequest
  ): Promise<ClearBITEventsResponse> {
    const data = ClearBITEventsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.HealthService",
      "ClearBITEvents",
      data
    );
    return promise.then((data) =>
      ClearBITEventsResponse.decode(new _m0.Reader(data))
    );
  }

  GetSystemLog(request: GetSystemLogRequest): Observable<GetSystemLogResponse> {
    const data = GetSystemLogRequest.encode(request).finish();
    const result = this.rpc.serverStreamingRequest(
      "bosdyn.api.spot_cam.HealthService",
      "GetSystemLog",
      data
    );
    return result.pipe(
      map((data) => GetSystemLogResponse.decode(new _m0.Reader(data)))
    );
  }
}

/** Modify or query network settings of the SpotCam and ICE resolution servers. */
export interface NetworkService {
  /** SetICEConfiguration sets up parameters for ICE, including addresses for STUN and TURN services */
  SetICEConfiguration(
    request: SetICEConfigurationRequest
  ): Promise<SetICEConfigurationResponse>;
  /** GetICEConfiguration retrieves currently set parameters for ICE, including addresses for STUN and TURN services */
  GetICEConfiguration(
    request: GetICEConfigurationRequest
  ): Promise<GetICEConfigurationResponse>;
}

export class NetworkServiceClientImpl implements NetworkService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.SetICEConfiguration = this.SetICEConfiguration.bind(this);
    this.GetICEConfiguration = this.GetICEConfiguration.bind(this);
  }
  SetICEConfiguration(
    request: SetICEConfigurationRequest
  ): Promise<SetICEConfigurationResponse> {
    const data = SetICEConfigurationRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.NetworkService",
      "SetICEConfiguration",
      data
    );
    return promise.then((data) =>
      SetICEConfigurationResponse.decode(new _m0.Reader(data))
    );
  }

  GetICEConfiguration(
    request: GetICEConfigurationRequest
  ): Promise<GetICEConfigurationResponse> {
    const data = GetICEConfigurationRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.NetworkService",
      "GetICEConfiguration",
      data
    );
    return promise.then((data) =>
      GetICEConfigurationResponse.decode(new _m0.Reader(data))
    );
  }
}

/** Query the version of the software release running on the SpotCam. */
export interface VersionService {
  GetSoftwareVersion(
    request: GetSoftwareVersionRequest
  ): Promise<GetSoftwareVersionResponse>;
}

export class VersionServiceClientImpl implements VersionService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetSoftwareVersion = this.GetSoftwareVersion.bind(this);
  }
  GetSoftwareVersion(
    request: GetSoftwareVersionRequest
  ): Promise<GetSoftwareVersionResponse> {
    const data = GetSoftwareVersionRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bosdyn.api.spot_cam.VersionService",
      "GetSoftwareVersion",
      data
    );
    return promise.then((data) =>
      GetSoftwareVersionResponse.decode(new _m0.Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
  clientStreamingRequest(
    service: string,
    method: string,
    data: Observable<Uint8Array>
  ): Promise<Uint8Array>;
  serverStreamingRequest(
    service: string,
    method: string,
    data: Uint8Array
  ): Observable<Uint8Array>;
  bidirectionalStreamingRequest(
    service: string,
    method: string,
    data: Observable<Uint8Array>
  ): Observable<Uint8Array>;
}
