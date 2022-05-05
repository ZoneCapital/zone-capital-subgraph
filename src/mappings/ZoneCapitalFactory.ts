import { BigInt } from "@graphprotocol/graph-ts";

import { Portfolio } from "../../generated/schema";
import { NftCreated } from "../../generated/ZoneCapitalFactory/ZoneCapitalFactory";

export function handleNftCreated(event: NftCreated): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let portfolio = Portfolio.load(event.params.nftId.toHex());

  if (portfolio) {
    // Entity fields can be set based on event parameters
    if (BigInt.compare(event.params.originalNftId, BigInt.fromI32(0)) !== 0) {
      const originalNft = Portfolio.load(event.params.originalNftId.toHex());
      if (originalNft) {
        originalNft.copied += 1;
        portfolio.original = originalNft.id;
      }
    }
    portfolio.save();
  }
}
