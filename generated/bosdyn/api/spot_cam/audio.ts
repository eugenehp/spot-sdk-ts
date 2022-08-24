/* eslint-disable */
import { RequestHeader, ResponseHeader } from "../header";
import { DataChunk } from "../data_chunk";
import _m0 from "protobufjs/minimal";
import { FloatValue } from "../../../google/protobuf/wrappers";

export const protobufPackage = "bosdyn.api.spot_cam";

/** Audio capture channel */
export enum AudioCaptureChannel {
  AUDIO_CHANNEL_UNKNOWN = 0,
  AUDIO_CHANNEL_INTERNAL_MIC = 1,
  AUDIO_CHANNEL_EXTERNAL_MIC = 2,
  UNRECOGNIZED = -1,
}

export function audioCaptureChannelFromJSON(object: any): AudioCaptureChannel {
  switch (object) {
    case 0:
    case "AUDIO_CHANNEL_UNKNOWN":
      return AudioCaptureChannel.AUDIO_CHANNEL_UNKNOWN;
    case 1:
    case "AUDIO_CHANNEL_INTERNAL_MIC":
      return AudioCaptureChannel.AUDIO_CHANNEL_INTERNAL_MIC;
    case 2:
    case "AUDIO_CHANNEL_EXTERNAL_MIC":
      return AudioCaptureChannel.AUDIO_CHANNEL_EXTERNAL_MIC;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AudioCaptureChannel.UNRECOGNIZED;
  }
}

export function audioCaptureChannelToJSON(object: AudioCaptureChannel): string {
  switch (object) {
    case AudioCaptureChannel.AUDIO_CHANNEL_UNKNOWN:
      return "AUDIO_CHANNEL_UNKNOWN";
    case AudioCaptureChannel.AUDIO_CHANNEL_INTERNAL_MIC:
      return "AUDIO_CHANNEL_INTERNAL_MIC";
    case AudioCaptureChannel.AUDIO_CHANNEL_EXTERNAL_MIC:
      return "AUDIO_CHANNEL_EXTERNAL_MIC";
    case AudioCaptureChannel.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Identifier for a playable sound. */
export interface Sound {
  /**
   * internally, sounds are stored in a flat table. This name is the
   * identifier of a sound effect
   */
  name: string;
}

/** Request for all sounds present on the robot. */
export interface ListSoundsRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/** List of all sounds present on the robot. */
export interface ListSoundsResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** All sounds currently loaded. */
  sounds: Sound[];
}

/** Set the desired volume level of the system. */
export interface SetVolumeRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** volume, as a percentage of maximum. */
  volume: number;
}

/** Result of changing the system volume level. */
export interface SetVolumeResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
}

/** Query the current volume level of the system. */
export interface GetVolumeRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
}

/** Provides the current volume level of the system. */
export interface GetVolumeResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
  /** volume, as a percentage of maximum. */
  volume: number;
}

/** Begin playing a loaded sound from the robot's speakers. */
export interface PlaySoundRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** The sound identifier as uploaded by LoadSoundRequest or listed in ListSoundsResponse. */
  sound: Sound | undefined;
  /**
   * If the gain field is populated, then volume of the sound is
   * multiplied by this value.  Does not modify the system volume level.
   */
  gain: number | undefined;
}

/** Result of staring playback of a sound. */
export interface PlaySoundResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
}

/** Remove a loaded sound from the library of loaded sounds. */
export interface DeleteSoundRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /** The sound identifier as uploaded by LoadSoundRequest or listed in ListSoundsResponse. */
  sound: Sound | undefined;
}

/** Result of deleting a sound from the library. */
export interface DeleteSoundResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
}

/** Load a new sound onto the robot for future playback. */
export interface LoadSoundRequest {
  /** Common request header. */
  header: RequestHeader | undefined;
  /**
   * Identifier for the sound.
   * If the same identifier is used as a previously loaded sound, that sound will be overwritten with the new data.
   */
  sound: Sound | undefined;
  /** WAV bytes to be joined. */
  data: DataChunk | undefined;
}

/** Result of uploading a sound. */
export interface LoadSoundResponse {
  /** Common response header. */
  header: ResponseHeader | undefined;
}

/** Request to set the audio capture channel */
export interface SetAudioCaptureChannelRequest {
  header: RequestHeader | undefined;
  channel: AudioCaptureChannel;
}

/** Result of setting the audio capture channel */
export interface SetAudioCaptureChannelResponse {
  header: ResponseHeader | undefined;
}

/** Request to get the audio capture channel */
export interface GetAudioCaptureChannelRequest {
  header: RequestHeader | undefined;
}

/** Result of getting the audio capture channel */
export interface GetAudioCaptureChannelResponse {
  header: ResponseHeader | undefined;
  channel: AudioCaptureChannel;
}

/** Request to set the audio capture channel */
export interface SetAudioCaptureGainRequest {
  header: RequestHeader | undefined;
  channel: AudioCaptureChannel;
  /** Gain for microphone, range from 0.0 to 1.0 */
  gain: number;
}

/** Result of setting the audio capture gain */
export interface SetAudioCaptureGainResponse {
  header: ResponseHeader | undefined;
}

/** Request to get the audio capture channel */
export interface GetAudioCaptureGainRequest {
  header: RequestHeader | undefined;
  channel: AudioCaptureChannel;
}

/** Result of getting the audio capture gain */
export interface GetAudioCaptureGainResponse {
  header: ResponseHeader | undefined;
  /** Gain for microphone, range from 0.0 to 1.0 */
  gain: number;
}

function createBaseSound(): Sound {
  return { name: "" };
}

export const Sound = {
  encode(message: Sound, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Sound {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSound();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Sound {
    return {
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: Sound): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Sound>, I>>(object: I): Sound {
    const message = createBaseSound();
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseListSoundsRequest(): ListSoundsRequest {
  return { header: undefined };
}

export const ListSoundsRequest = {
  encode(
    message: ListSoundsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListSoundsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListSoundsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListSoundsRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: ListSoundsRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListSoundsRequest>, I>>(
    object: I
  ): ListSoundsRequest {
    const message = createBaseListSoundsRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseListSoundsResponse(): ListSoundsResponse {
  return { header: undefined, sounds: [] };
}

export const ListSoundsResponse = {
  encode(
    message: ListSoundsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.sounds) {
      Sound.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListSoundsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListSoundsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.sounds.push(Sound.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListSoundsResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      sounds: Array.isArray(object?.sounds)
        ? object.sounds.map((e: any) => Sound.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListSoundsResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    if (message.sounds) {
      obj.sounds = message.sounds.map((e) => (e ? Sound.toJSON(e) : undefined));
    } else {
      obj.sounds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListSoundsResponse>, I>>(
    object: I
  ): ListSoundsResponse {
    const message = createBaseListSoundsResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.sounds = object.sounds?.map((e) => Sound.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSetVolumeRequest(): SetVolumeRequest {
  return { header: undefined, volume: 0 };
}

export const SetVolumeRequest = {
  encode(
    message: SetVolumeRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.volume !== 0) {
      writer.uint32(21).float(message.volume);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetVolumeRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetVolumeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.volume = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetVolumeRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      volume: isSet(object.volume) ? Number(object.volume) : 0,
    };
  },

  toJSON(message: SetVolumeRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.volume !== undefined && (obj.volume = message.volume);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetVolumeRequest>, I>>(
    object: I
  ): SetVolumeRequest {
    const message = createBaseSetVolumeRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.volume = object.volume ?? 0;
    return message;
  },
};

function createBaseSetVolumeResponse(): SetVolumeResponse {
  return { header: undefined };
}

export const SetVolumeResponse = {
  encode(
    message: SetVolumeResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetVolumeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetVolumeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetVolumeResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: SetVolumeResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetVolumeResponse>, I>>(
    object: I
  ): SetVolumeResponse {
    const message = createBaseSetVolumeResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseGetVolumeRequest(): GetVolumeRequest {
  return { header: undefined };
}

export const GetVolumeRequest = {
  encode(
    message: GetVolumeRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetVolumeRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetVolumeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetVolumeRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: GetVolumeRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetVolumeRequest>, I>>(
    object: I
  ): GetVolumeRequest {
    const message = createBaseGetVolumeRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseGetVolumeResponse(): GetVolumeResponse {
  return { header: undefined, volume: 0 };
}

export const GetVolumeResponse = {
  encode(
    message: GetVolumeResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.volume !== 0) {
      writer.uint32(21).float(message.volume);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetVolumeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetVolumeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.volume = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetVolumeResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      volume: isSet(object.volume) ? Number(object.volume) : 0,
    };
  },

  toJSON(message: GetVolumeResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.volume !== undefined && (obj.volume = message.volume);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetVolumeResponse>, I>>(
    object: I
  ): GetVolumeResponse {
    const message = createBaseGetVolumeResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.volume = object.volume ?? 0;
    return message;
  },
};

function createBasePlaySoundRequest(): PlaySoundRequest {
  return { header: undefined, sound: undefined, gain: undefined };
}

export const PlaySoundRequest = {
  encode(
    message: PlaySoundRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.sound !== undefined) {
      Sound.encode(message.sound, writer.uint32(18).fork()).ldelim();
    }
    if (message.gain !== undefined) {
      FloatValue.encode(
        { value: message.gain! },
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PlaySoundRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlaySoundRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.sound = Sound.decode(reader, reader.uint32());
          break;
        case 3:
          message.gain = FloatValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PlaySoundRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      sound: isSet(object.sound) ? Sound.fromJSON(object.sound) : undefined,
      gain: isSet(object.gain) ? Number(object.gain) : undefined,
    };
  },

  toJSON(message: PlaySoundRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.sound !== undefined &&
      (obj.sound = message.sound ? Sound.toJSON(message.sound) : undefined);
    message.gain !== undefined && (obj.gain = message.gain);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PlaySoundRequest>, I>>(
    object: I
  ): PlaySoundRequest {
    const message = createBasePlaySoundRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.sound =
      object.sound !== undefined && object.sound !== null
        ? Sound.fromPartial(object.sound)
        : undefined;
    message.gain = object.gain ?? undefined;
    return message;
  },
};

function createBasePlaySoundResponse(): PlaySoundResponse {
  return { header: undefined };
}

export const PlaySoundResponse = {
  encode(
    message: PlaySoundResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PlaySoundResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlaySoundResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PlaySoundResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: PlaySoundResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PlaySoundResponse>, I>>(
    object: I
  ): PlaySoundResponse {
    const message = createBasePlaySoundResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseDeleteSoundRequest(): DeleteSoundRequest {
  return { header: undefined, sound: undefined };
}

export const DeleteSoundRequest = {
  encode(
    message: DeleteSoundRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.sound !== undefined) {
      Sound.encode(message.sound, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteSoundRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteSoundRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.sound = Sound.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteSoundRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      sound: isSet(object.sound) ? Sound.fromJSON(object.sound) : undefined,
    };
  },

  toJSON(message: DeleteSoundRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.sound !== undefined &&
      (obj.sound = message.sound ? Sound.toJSON(message.sound) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeleteSoundRequest>, I>>(
    object: I
  ): DeleteSoundRequest {
    const message = createBaseDeleteSoundRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.sound =
      object.sound !== undefined && object.sound !== null
        ? Sound.fromPartial(object.sound)
        : undefined;
    return message;
  },
};

function createBaseDeleteSoundResponse(): DeleteSoundResponse {
  return { header: undefined };
}

export const DeleteSoundResponse = {
  encode(
    message: DeleteSoundResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteSoundResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteSoundResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteSoundResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: DeleteSoundResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeleteSoundResponse>, I>>(
    object: I
  ): DeleteSoundResponse {
    const message = createBaseDeleteSoundResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseLoadSoundRequest(): LoadSoundRequest {
  return { header: undefined, sound: undefined, data: undefined };
}

export const LoadSoundRequest = {
  encode(
    message: LoadSoundRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.sound !== undefined) {
      Sound.encode(message.sound, writer.uint32(18).fork()).ldelim();
    }
    if (message.data !== undefined) {
      DataChunk.encode(message.data, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoadSoundRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoadSoundRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.sound = Sound.decode(reader, reader.uint32());
          break;
        case 3:
          message.data = DataChunk.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LoadSoundRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      sound: isSet(object.sound) ? Sound.fromJSON(object.sound) : undefined,
      data: isSet(object.data) ? DataChunk.fromJSON(object.data) : undefined,
    };
  },

  toJSON(message: LoadSoundRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.sound !== undefined &&
      (obj.sound = message.sound ? Sound.toJSON(message.sound) : undefined);
    message.data !== undefined &&
      (obj.data = message.data ? DataChunk.toJSON(message.data) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LoadSoundRequest>, I>>(
    object: I
  ): LoadSoundRequest {
    const message = createBaseLoadSoundRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.sound =
      object.sound !== undefined && object.sound !== null
        ? Sound.fromPartial(object.sound)
        : undefined;
    message.data =
      object.data !== undefined && object.data !== null
        ? DataChunk.fromPartial(object.data)
        : undefined;
    return message;
  },
};

function createBaseLoadSoundResponse(): LoadSoundResponse {
  return { header: undefined };
}

export const LoadSoundResponse = {
  encode(
    message: LoadSoundResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoadSoundResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoadSoundResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LoadSoundResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: LoadSoundResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LoadSoundResponse>, I>>(
    object: I
  ): LoadSoundResponse {
    const message = createBaseLoadSoundResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseSetAudioCaptureChannelRequest(): SetAudioCaptureChannelRequest {
  return { header: undefined, channel: 0 };
}

export const SetAudioCaptureChannelRequest = {
  encode(
    message: SetAudioCaptureChannelRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.channel !== 0) {
      writer.uint32(16).int32(message.channel);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SetAudioCaptureChannelRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetAudioCaptureChannelRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.channel = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetAudioCaptureChannelRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      channel: isSet(object.channel)
        ? audioCaptureChannelFromJSON(object.channel)
        : 0,
    };
  },

  toJSON(message: SetAudioCaptureChannelRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.channel !== undefined &&
      (obj.channel = audioCaptureChannelToJSON(message.channel));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetAudioCaptureChannelRequest>, I>>(
    object: I
  ): SetAudioCaptureChannelRequest {
    const message = createBaseSetAudioCaptureChannelRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.channel = object.channel ?? 0;
    return message;
  },
};

function createBaseSetAudioCaptureChannelResponse(): SetAudioCaptureChannelResponse {
  return { header: undefined };
}

export const SetAudioCaptureChannelResponse = {
  encode(
    message: SetAudioCaptureChannelResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SetAudioCaptureChannelResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetAudioCaptureChannelResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetAudioCaptureChannelResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: SetAudioCaptureChannelResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetAudioCaptureChannelResponse>, I>>(
    object: I
  ): SetAudioCaptureChannelResponse {
    const message = createBaseSetAudioCaptureChannelResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseGetAudioCaptureChannelRequest(): GetAudioCaptureChannelRequest {
  return { header: undefined };
}

export const GetAudioCaptureChannelRequest = {
  encode(
    message: GetAudioCaptureChannelRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetAudioCaptureChannelRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAudioCaptureChannelRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetAudioCaptureChannelRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: GetAudioCaptureChannelRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetAudioCaptureChannelRequest>, I>>(
    object: I
  ): GetAudioCaptureChannelRequest {
    const message = createBaseGetAudioCaptureChannelRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseGetAudioCaptureChannelResponse(): GetAudioCaptureChannelResponse {
  return { header: undefined, channel: 0 };
}

export const GetAudioCaptureChannelResponse = {
  encode(
    message: GetAudioCaptureChannelResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.channel !== 0) {
      writer.uint32(16).int32(message.channel);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetAudioCaptureChannelResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAudioCaptureChannelResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.channel = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetAudioCaptureChannelResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      channel: isSet(object.channel)
        ? audioCaptureChannelFromJSON(object.channel)
        : 0,
    };
  },

  toJSON(message: GetAudioCaptureChannelResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.channel !== undefined &&
      (obj.channel = audioCaptureChannelToJSON(message.channel));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetAudioCaptureChannelResponse>, I>>(
    object: I
  ): GetAudioCaptureChannelResponse {
    const message = createBaseGetAudioCaptureChannelResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.channel = object.channel ?? 0;
    return message;
  },
};

function createBaseSetAudioCaptureGainRequest(): SetAudioCaptureGainRequest {
  return { header: undefined, channel: 0, gain: 0 };
}

export const SetAudioCaptureGainRequest = {
  encode(
    message: SetAudioCaptureGainRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.channel !== 0) {
      writer.uint32(16).int32(message.channel);
    }
    if (message.gain !== 0) {
      writer.uint32(25).double(message.gain);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SetAudioCaptureGainRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetAudioCaptureGainRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.channel = reader.int32() as any;
          break;
        case 3:
          message.gain = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetAudioCaptureGainRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      channel: isSet(object.channel)
        ? audioCaptureChannelFromJSON(object.channel)
        : 0,
      gain: isSet(object.gain) ? Number(object.gain) : 0,
    };
  },

  toJSON(message: SetAudioCaptureGainRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.channel !== undefined &&
      (obj.channel = audioCaptureChannelToJSON(message.channel));
    message.gain !== undefined && (obj.gain = message.gain);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetAudioCaptureGainRequest>, I>>(
    object: I
  ): SetAudioCaptureGainRequest {
    const message = createBaseSetAudioCaptureGainRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.channel = object.channel ?? 0;
    message.gain = object.gain ?? 0;
    return message;
  },
};

function createBaseSetAudioCaptureGainResponse(): SetAudioCaptureGainResponse {
  return { header: undefined };
}

export const SetAudioCaptureGainResponse = {
  encode(
    message: SetAudioCaptureGainResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SetAudioCaptureGainResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetAudioCaptureGainResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetAudioCaptureGainResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
    };
  },

  toJSON(message: SetAudioCaptureGainResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetAudioCaptureGainResponse>, I>>(
    object: I
  ): SetAudioCaptureGainResponse {
    const message = createBaseSetAudioCaptureGainResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    return message;
  },
};

function createBaseGetAudioCaptureGainRequest(): GetAudioCaptureGainRequest {
  return { header: undefined, channel: 0 };
}

export const GetAudioCaptureGainRequest = {
  encode(
    message: GetAudioCaptureGainRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      RequestHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.channel !== 0) {
      writer.uint32(16).int32(message.channel);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetAudioCaptureGainRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAudioCaptureGainRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = RequestHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.channel = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetAudioCaptureGainRequest {
    return {
      header: isSet(object.header)
        ? RequestHeader.fromJSON(object.header)
        : undefined,
      channel: isSet(object.channel)
        ? audioCaptureChannelFromJSON(object.channel)
        : 0,
    };
  },

  toJSON(message: GetAudioCaptureGainRequest): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? RequestHeader.toJSON(message.header)
        : undefined);
    message.channel !== undefined &&
      (obj.channel = audioCaptureChannelToJSON(message.channel));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetAudioCaptureGainRequest>, I>>(
    object: I
  ): GetAudioCaptureGainRequest {
    const message = createBaseGetAudioCaptureGainRequest();
    message.header =
      object.header !== undefined && object.header !== null
        ? RequestHeader.fromPartial(object.header)
        : undefined;
    message.channel = object.channel ?? 0;
    return message;
  },
};

function createBaseGetAudioCaptureGainResponse(): GetAudioCaptureGainResponse {
  return { header: undefined, gain: 0 };
}

export const GetAudioCaptureGainResponse = {
  encode(
    message: GetAudioCaptureGainResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      ResponseHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.gain !== 0) {
      writer.uint32(17).double(message.gain);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetAudioCaptureGainResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAudioCaptureGainResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = ResponseHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.gain = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetAudioCaptureGainResponse {
    return {
      header: isSet(object.header)
        ? ResponseHeader.fromJSON(object.header)
        : undefined,
      gain: isSet(object.gain) ? Number(object.gain) : 0,
    };
  },

  toJSON(message: GetAudioCaptureGainResponse): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? ResponseHeader.toJSON(message.header)
        : undefined);
    message.gain !== undefined && (obj.gain = message.gain);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetAudioCaptureGainResponse>, I>>(
    object: I
  ): GetAudioCaptureGainResponse {
    const message = createBaseGetAudioCaptureGainResponse();
    message.header =
      object.header !== undefined && object.header !== null
        ? ResponseHeader.fromPartial(object.header)
        : undefined;
    message.gain = object.gain ?? 0;
    return message;
  },
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & {
      [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
    };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
