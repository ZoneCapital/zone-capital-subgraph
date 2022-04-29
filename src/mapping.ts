import { BigInt } from "@graphprotocol/graph-ts";

import { ZoneCapitalNFT } from "../generated/schema";
import {
  Approval,
  ApprovalForAll,
  FactoryAdded,
  FactoryRemoved,
  OwnershipTransferred,
  Transfer,
} from "../generated/ZoneCapitalNFT/ZoneCapitalNFT";

export function handleApproval(event: Approval): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleFactoryAdded(event: FactoryAdded): void {}

export function handleFactoryRemoved(event: FactoryRemoved): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleTransfer(event: Transfer): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ZoneCapitalNFT.load(event.params.tokenId.toHex());

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ZoneCapitalNFT(event.params.tokenId.toHex());

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0);
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count.plus(BigInt.fromI32(1));

  // Entity fields can be set based on event parameters
  entity.owner = event.params.to;
  entity.approved = event.params.from;

  // Entities can be written to the store with `.save()`
  entity.save();
}
