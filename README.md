# spot-sdk-ts

TypeScript bindings based on protobufs (proto3) provided by Boston Dynamics as a part of their [SDK](https://github.com/boston-dynamics/spot-sdk).

## Development

Check `build.ts` if you need to generate bindings compatible with [@grpc/grpc-js](https://www.npmjs.com/package/@grpc/grpc-js).

Each service genrated with `ts-proto` will require implementation of the `RPC` interface:

```typescript
interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}
```

## Helpful links

- [Boston Dynamics Spot Python SDK](https://github.com/-boston-dynamics/spot-sdk)
- [JavaScript port](https://github.com/TheoPierne/spot-sdk-js) JavaScript port of the Python SDK (proto2).
- [ts-proto](https://github.com/stephenh/ts-proto) library that generates TypeScript stubs for the [protobufs](https://developers.google.com/protocol-buffers).
- [gRPC](https://grpc.io) Remote Procedure Call framework, created by Google.

## License

Read full text of the license [here](/LICENSE).

## Sponsors

[<img width="300px" src="https://user-images.githubusercontent.com/1857263/114124204-c4e1eb80-98a8-11eb-80ab-64683c24bbc5.png" alt="Reactive Lions™" target="_blank">](https://www.reactivelions.com)

## Copyright

Copyright 2021 Boston Dynamics, Inc. All rights reserved.

Copyright 2022 Eugene Hauptmann. (TypeScript types, bindings, build scripts).
