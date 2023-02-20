import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  let gildedRose;
  it('should initialise with an empty array', () => {
    gildedRose = new GildedRose();
    expect(gildedRose.items).toEqual([]);
  });

  describe('basic items', () => {
    beforeEach(() => {
      gildedRose = new GildedRose([new Item('+5 Dexterity Vest', 10, 20)]);
    });
    it('should add a single item', () => {
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe('+5 Dexterity Vest');
    });

    it('should degrade the value and sellin of a regular item by one after a day', () => {
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(19);
      expect(gildedRose.items[0].sellIn).toBe(9);
    });

    it('should degrade the value and sellin of a regular item by two after two days', () => {
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(18);
      expect(gildedRose.items[0].sellIn).toBe(8);
    });

    it('should not degrade the value of a regular item to less than zero', () => {
      for (let i = 0; i < 15; i++) {
        gildedRose.updateQuality();
      }
      expect(gildedRose.items[0].quality).toBe(0);
    });
  });

  describe('Aged Brie', () => {
    beforeEach(() => {
      gildedRose = new GildedRose([new Item('Aged Brie', 2, 0)]);
    });
    it('should increase in quality after a day', () => {
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(1);
    });

    it('should not increase quality beyond 50', () => {
      for (let i = 0; i < 30; i++) {
        gildedRose.updateQuality();
      }
      expect(gildedRose.items[0].quality).toBe(50);
    });
  });

  describe('Backstage Passes', () => {
    beforeEach(() => {
      gildedRose = new GildedRose([
        new Item('Backstage passes to a TAFKAL80ETC concert', 16, 20),
      ]);
    });

    it('should increase in value after a day', () => {
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(21);
    });

    it('should increase in value by two when ten days from concert', () => {
      for (let i = 0; i < 7; i++) {
        gildedRose.updateQuality();
      }
      expect(gildedRose.items[0].quality).toBe(28);
    });

    it('should increase in value by three when five days from concert', () => {
      for (let i = 0; i < 12; i++) {
        gildedRose.updateQuality();
      }
      expect(gildedRose.items[0].quality).toBe(39);
    });

    it('should not see its value go above 50', () => {
      for (let i = 0; i < 16; i++) {
        gildedRose.updateQuality();
      }
      expect(gildedRose.items[0].quality).toBe(50);
    });

    it('should drop its quality to zero once sellIn value reaches zero', () => {
      for (let i = 0; i < 17; i++) {
        gildedRose.updateQuality();
      }
      expect(gildedRose.items[0].quality).toBe(0);
    });
  });

  describe('Sulfuras', () => {
    beforeEach(() => {
      gildedRose = new GildedRose([
        new Item('Sulfuras, Hand of Ragnaros', 0, 80),
      ]);
    });

    it('should not change its quality or sellIn value', () => {
      for (let i = 0; i < 10; i++) {
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(80);
        expect(gildedRose.items[0].sellIn).toBe(0);
      }
    });
  });

  describe('Conjured items', () => {
    beforeEach(() => {
      gildedRose = new GildedRose([
        new Item('Conjured Mana Cake', 2, 8),
        new Item('Conjured Crystal Water', 5, 10),
      ]);
    });

    it('should degrade in quality by two in a day', () => {
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(6);
    });

    it('should degrade in quality by four in two days', () => {
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(4);
    });
    it('should degrade twice as fast when sellIn <0', () => {
      for (let i = 0; i < 3; i++) {
        gildedRose.updateQuality();
      }
      expect(gildedRose.items[0].quality).toBe(0);
    });
    it('should apply the same logic to other conjured items', () => {
      for (let i = 0; i < 3; i++) {
        gildedRose.updateQuality();
      }
      expect(gildedRose.items[1].quality).toBe(4);
    });
  });

  describe('edge cases', () => {
    beforeEach(() => {
      gildedRose = new GildedRose([new Item('+5 Dexterity Vest', -1, 1)]);
    });
    it('should have a minimum of zero even when reducing by 2 when 1 quality remaining', () => {
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(0);
    });
  });
});
