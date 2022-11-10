import { Actor, ActorSubclass, HttpAgent, Identity, CallConfig } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { IDL } from '@dfinity/candid';
import fetch from 'node-fetch';
import { idlFactory as ManagementCanisterIdlFactory } from './ic-idl.js';
import { _SERVICE as ManagmentCanisterService } from './ic.did.js';

const MANAGEMENT_CANISTER_ID = 'aaaaa-aa';

export type ActorOptions = {
  canisterId: string,
  canisterIdlFactory: IDL.InterfaceFactory,
  identity?: Identity,
  isLocal?: boolean,
}

export const getActor = async <T>(options: ActorOptions): Promise<ActorSubclass<T>> => {

  const agent = new HttpAgent({
    fetch: fetch as any,
    host: options.isLocal ? 'http://localhost:8000' : 'https://boundary.ic0.app',
    identity: options.identity,
  });

  if (options.isLocal) {
    agent.fetchRootKey();
  }

  const actor: ActorSubclass<T> = Actor.createActor(options.canisterIdlFactory, {
    agent,
    canisterId: Principal.fromText(options.canisterId),
  });

  return actor;
}

export const getManagementCanisterActor = async (identity: Identity, isLocal: boolean = false): 
  Promise<ActorSubclass<ManagmentCanisterService>> => {

  const agent = new HttpAgent({
    fetch: fetch as any,
    host: isLocal ? 'http://localhost:8000' : 'https://boundary.ic0.app',
    identity: identity,
  });

  if (isLocal) {
    agent.fetchRootKey();
  }

  const actor: ActorSubclass<ManagmentCanisterService> = Actor.createActor(
    ManagementCanisterIdlFactory,
    {
      agent,
      canisterId: Principal.fromText(MANAGEMENT_CANISTER_ID),
      callTransform: transform,
      queryTransform: transform
    }
  );

  return actor;
}

// Thanks David Busco:
// https://forum.dfinity.org/t/how-to-make-ic-management-api-canister-status-call-with-dfinity-agent/7139/2
// Source nns-dapp - dart -> JS bridge
const transform = (_methodName: string, args: unknown[], _callConfig: CallConfig) => {
  const first = args[0] as any;
  let effectiveCanisterId = Principal.fromText(MANAGEMENT_CANISTER_ID);
  if (first && typeof first === 'object' && first.canister_id) {
    effectiveCanisterId = Principal.from(first.canister_id as unknown);
  }
  return {effectiveCanisterId};
};
