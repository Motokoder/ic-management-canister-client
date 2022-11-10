import { Principal } from '@dfinity/principal';
import { getIdentity } from './identity.js';
import { getManagementCanisterActor } from './actor.js';

const canisterId = process.argv[2];
const pemFile = process.argv[3];

const getCanisterStatus = async (canisterId: string) => {
  const identity = await getIdentity(pemFile);

  console.log(identity.getPrincipal().toString());

  const actor = await getManagementCanisterActor(identity, false);

  return await actor.canister_status({
    canister_id: Principal.fromText(canisterId)
  })
};

const status = await getCanisterStatus(canisterId);
console.log(status);

