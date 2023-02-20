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
      if (item.name != 'Sulfuras, Hand of Ragnaros') {
        this.adjustSellIn(item);
      }
    });

    return this.items;
  }

  private decreaseQuality(item: Item, amount: number = 1) {
    if (item.quality > 0) {
      item.quality = item.quality - amount;
    }
  }

  private increaseQuality(item: Item, amount: number = 1) {
    if (item.quality < 50) item.quality = Math.min(item.quality + amount, 50);
  }

  private updateNormalItemQuality(item: Item) {
    if (item.sellIn <= 0) {
      this.decreaseQuality(item, 2);
    } else {
      this.decreaseQuality(item);
    }
  }

  private updateAgedBrieQuality(item: Item) {
    if (item.sellIn < 0) {
      this.increaseQuality(item, 2);
    } else {
      this.increaseQuality(item);
    }
  }

  private updateConcertTicketsQuality(item: Item) {
    if (item.sellIn <= 0) {
      item.quality = 0;
    } else if (item.sellIn <= 5) {
      this.increaseQuality(item, 3);
    } else if (item.sellIn <= 10) {
      this.increaseQuality(item, 2);
    } else {
      this.increaseQuality(item);
    }
  }

  private updateConjuredItemQuality(item: Item) {
    if (item.sellIn <= 0) {
      this.decreaseQuality(item, 4);
    } else {
      this.decreaseQuality(item, 2);
    }
  }

  private adjustSellIn(item: Item) {
    item.sellIn--;
  }
}
