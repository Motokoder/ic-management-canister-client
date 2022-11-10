// created with Canlista from ic.did
// https://k7gat-daaaa-aaaae-qaahq-cai.ic0.app/
import type { Principal } from '@dfinity/principal';
export type bitcoin_address = string;
export type bitcoin_network = { 'mainnet' : null } |
  { 'testnet' : null };
export type block_hash = Array<number>;
export type canister_id = Principal;
export interface canister_settings {
  'freezing_threshold' : [] | [bigint],
  'controllers' : [] | [Array<Principal>],
  'memory_allocation' : [] | [bigint],
  'compute_allocation' : [] | [bigint],
}
export interface definite_canister_settings {
  'freezing_threshold' : bigint,
  'controllers' : Array<Principal>,
  'memory_allocation' : bigint,
  'compute_allocation' : bigint,
}
export type ecdsa_curve = { 'secp256k1' : null };
export interface get_balance_request {
  'network' : bitcoin_network,
  'address' : bitcoin_address,
  'min_confirmations' : [] | [number],
}
export interface get_current_fee_percentiles_request {
  'network' : bitcoin_network,
}
export interface get_utxos_request {
  'network' : bitcoin_network,
  'filter' : [] | [
    { 'page' : Array<number> } |
      { 'min_confirmations' : number }
  ],
  'address' : bitcoin_address,
}
export interface get_utxos_response {
  'next_page' : [] | [Array<number>],
  'tip_height' : number,
  'tip_block_hash' : block_hash,
  'utxos' : Array<utxo>,
}
export interface http_header { 'value' : string, 'name' : string }
export interface http_response {
  'status' : bigint,
  'body' : Array<number>,
  'headers' : Array<http_header>,
}
export type millisatoshi_per_byte = bigint;
export interface outpoint { 'txid' : Array<number>, 'vout' : number }
export type satoshi = bigint;
export interface send_transaction_request {
  'transaction' : Array<number>,
  'network' : bitcoin_network,
}
export type user_id = Principal;
export interface utxo {
  'height' : number,
  'value' : satoshi,
  'outpoint' : outpoint,
}
export type wasm_module = Array<number>;
export interface _SERVICE {
  'bitcoin_get_balance' : (arg_0: get_balance_request) => Promise<satoshi>,
  'bitcoin_get_current_fee_percentiles' : (
      arg_0: get_current_fee_percentiles_request,
    ) => Promise<Array<millisatoshi_per_byte>>,
  'bitcoin_get_utxos' : (arg_0: get_utxos_request) => Promise<
      get_utxos_response
    >,
  'bitcoin_send_transaction' : (arg_0: send_transaction_request) => Promise<
      undefined
    >,
  'canister_status' : (arg_0: { 'canister_id' : canister_id }) => Promise<
      {
        'status' : { 'stopped' : null } |
          { 'stopping' : null } |
          { 'running' : null },
        'memory_size' : bigint,
        'cycles' : bigint,
        'settings' : definite_canister_settings,
        'idle_cycles_burned_per_day' : bigint,
        'module_hash' : [] | [Array<number>],
      }
    >,
  'create_canister' : (
      arg_0: { 'settings' : [] | [canister_settings] },
    ) => Promise<{ 'canister_id' : canister_id }>,
  'delete_canister' : (arg_0: { 'canister_id' : canister_id }) => Promise<
      undefined
    >,
  'deposit_cycles' : (arg_0: { 'canister_id' : canister_id }) => Promise<
      undefined
    >,
  'ecdsa_public_key' : (
      arg_0: {
        'key_id' : { 'name' : string, 'curve' : ecdsa_curve },
        'canister_id' : [] | [canister_id],
        'derivation_path' : Array<Array<number>>,
      },
    ) => Promise<
      { 'public_key' : Array<number>, 'chain_code' : Array<number> }
    >,
  'http_request' : (
      arg_0: {
        'url' : string,
        'method' : { 'get' : null } |
          { 'head' : null } |
          { 'post' : null },
        'max_response_bytes' : [] | [bigint],
        'body' : [] | [Array<number>],
        'transform' : [] | [
          { 'function' : [Principal, string], 'context' : Array<number> }
        ],
        'headers' : Array<http_header>,
      },
    ) => Promise<http_response>,
  'install_code' : (
      arg_0: {
        'arg' : Array<number>,
        'wasm_module' : wasm_module,
        'mode' : { 'reinstall' : null } |
          { 'upgrade' : null } |
          { 'install' : null },
        'canister_id' : canister_id,
      },
    ) => Promise<undefined>,
  'provisional_create_canister_with_cycles' : (
      arg_0: {
        'settings' : [] | [canister_settings],
        'amount' : [] | [bigint],
      },
    ) => Promise<{ 'canister_id' : canister_id }>,
  'provisional_top_up_canister' : (
      arg_0: { 'canister_id' : canister_id, 'amount' : bigint },
    ) => Promise<undefined>,
  'raw_rand' : () => Promise<Array<number>>,
  'sign_with_ecdsa' : (
      arg_0: {
        'key_id' : { 'name' : string, 'curve' : ecdsa_curve },
        'derivation_path' : Array<Array<number>>,
        'message_hash' : Array<number>,
      },
    ) => Promise<{ 'signature' : Array<number> }>,
  'start_canister' : (arg_0: { 'canister_id' : canister_id }) => Promise<
      undefined
    >,
  'stop_canister' : (arg_0: { 'canister_id' : canister_id }) => Promise<
      undefined
    >,
  'uninstall_code' : (arg_0: { 'canister_id' : canister_id }) => Promise<
      undefined
    >,
  'update_settings' : (
      arg_0: { 'canister_id' : Principal, 'settings' : canister_settings },
    ) => Promise<undefined>,
}