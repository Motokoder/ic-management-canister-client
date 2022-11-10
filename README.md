# IC Management Canister Client

Node script with an actor reference to the the IC Management Canister.

The `getCanisterStatus` function returns the canister status response if identity.pem contains
the private key of a controller.

```
{
  status: { running: null },
  memory_size: 52424781n,
  cycles: 3704633078607n,
  settings: {
    freezing_threshold: 2592000n,
    controllers: [ [Principal], [Principal] ],
    memory_allocation: 0n,
    compute_allocation: 0n
  },
  idle_cycles_burned_per_day: 535740179n,
  module_hash: [
    Uint8Array(32) [
      211,  45, 212,  90, 116,  26,  99, 157,
      209, 100,  22, 229, 229, 191,   0,  99,
      232,  75, 189, 111, 137, 221, 189, 225,
      179, 119,   0, 253,  76,  86,   4, 192
    ]
  ]
}
```

## Prerequisites

Node 16+

## Getting Started

- Install npm modules.

  ```console
  npm i
  ```

- Export an identity that is a controller of the canister you want the status from.

  ```
  dfx identity export your-identity-name > identity.pem
  ```

- Update the `start` script in package.json with your canister id.

- Build and run the script.

  ```console
  npm start
  ```