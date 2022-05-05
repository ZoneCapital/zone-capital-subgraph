import { BigInt } from "@graphprotocol/graph-ts";

import { ZoneCapitalNFT } from "../../generated/schema";
import {
  Approval,
  ApprovalForAll,
  FactoryAdded,
  FactoryRemoved,
  OwnershipTransferred,
  Transfer,
} from "../../generated/ZoneCapitalNFT/ZoneCapitalNFT";

export function handleApproval(event: Approval): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleFactoryAdded(event: FactoryAdded): void {}

export function handleFactoryRemoved(event: FactoryRemoved): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleTransfer(event: Transfer): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let nft = ZoneCapitalNFT.load(event.params.tokenId.toHex());

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!nft) {
    nft = new ZoneCapitalNFT(event.params.tokenId.toHex());
    nft.copied = 0;
    nft.createdAt = event.block.timestamp;
  }

  // Entity fields can be set based on event parameters
  nft.owner = event.params.to;
  nft.approved = event.params.from;

  // Entities can be written to the store with `.save()`
  nft.save();
}
