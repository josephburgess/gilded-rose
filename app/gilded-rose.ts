export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      this.updateItemQuality(item);
      this.adjustSellIn(item);
    });
    return this.items;
  }

  private updateItemQuality(item: Item) {
    switch (item.name) {
      case 'Aged Brie':
        this.updateAgedBrieQuality(item);
        break;
      case 'Backstage passes to a TAFKAL80ETC concert':
        this.updateConcertTicketsQuality(item);
        break;
      case 'Sulfuras, Hand of Ragnaros':
        break;
      default:
        if (item.name.startsWith('Conjured')) {
          this.updateConjuredItemQuality(item);
        } else {
          this.updateNormalItemQuality(item);
        }
        break;
    }
  }

  private updateNormalItemQuality(item: Item) {
    const qualityChange = item.sellIn > 0 ? -1 : -2;
    item.quality = Math.max(0, item.quality + qualityChange);
  }

  private updateAgedBrieQuality(item: Item) {
    const qualityChange = item.sellIn > 0 ? 1 : 2;
    item.quality = Math.min(50, item.quality + qualityChange);
  }

  private updateConcertTicketsQuality(item: Item) {
    let qualityChange = 1;
    if (item.sellIn <= 10) qualityChange++;
    if (item.sellIn <= 5) qualityChange++;

    if (item.sellIn <= 0) {
      item.quality = 0;
    } else {
      item.quality = Math.min(50, item.quality + qualityChange);
    }
  }

  private updateConjuredItemQuality(item: Item) {
    const qualityChange = item.sellIn > 0 ? -2 : -4;
    item.quality = Math.max(0, item.quality + qualityChange);
  }

  private adjustSellIn(item: Item) {
    if (item.name !== 'Sulfuras, Hand of Ragnaros') {
      item.sellIn--;
    }
  }
}
