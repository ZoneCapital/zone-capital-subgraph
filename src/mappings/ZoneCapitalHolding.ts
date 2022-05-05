import { HoldingAsset, Portfolio } from "../../generated/schema";
import { PorfolioAssetStored } from "../../generated/ZoneCapitalHolding/ZoneCapitalHolding";

export function handlePorfolioAssetStored(event: PorfolioAssetStored): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let portfolio = Portfolio.load(event.params.nftId.toHex());

  if (portfolio) {
    // Entity fields can be set based on event parameters
    const holdingAssetId = `${event.params.nftId.toHex()}-${event.params.token.toHex()}`;
    let holdingAsset = HoldingAsset.load(holdingAssetId);
    if (!holdingAsset) {
      holdingAsset = new HoldingAsset(holdingAssetId);
    }
    holdingAsset.portfolio = portfolio.id;
    holdingAsset.token = event.params.token;
    holdingAsset.portfolioAddress = event.params.portfolio;
    holdingAsset.amount = event.params.amount;
    holdingAsset.save();
  }
}
