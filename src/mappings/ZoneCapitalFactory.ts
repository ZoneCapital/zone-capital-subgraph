import { BigInt } from "@graphprotocol/graph-ts";

import { ZoneCapitalNFT } from "../../generated/schema";
import { NftCreated } from "../../generated/ZoneCapitalFactory/ZoneCapitalFactory";

export function handleNftCreated(event: NftCreated): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let nft = ZoneCapitalNFT.load(event.params.nftId.toHex());

  if (nft) {
    // Entity fields can be set based on event parameters
    if (BigInt.compare(event.params.originalNftId, BigInt.fromI32(0)) !== 0) {
      const originalNft = ZoneCapitalNFT.load(
        event.params.originalNftId.toHex()
      );
      if (originalNft) {
        originalNft.copied += 1;
        nft.originalNft = originalNft.id;
      }
    }
    nft.save();
  }
}
