import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  describe('basic items', () => {
    it('should initialise with an empty array', () => {
      const gildedRose = new GildedRose()
      expect(gildedRose.items).toEqual([])
    });
    it('should add a single item, foo', () => {
      const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe('foo');
    });
    it('should degrade the value and sellin of a regular item by one after a day', () => {
      const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", 10, 20)])
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(19)
      expect(gildedRose.items[0].sellIn).toBe(9)
    });
    it('should degrade the value and sellin of a regular item by two after two days', () => {
      const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", 10, 20)])
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(18)
      expect(gildedRose.items[0].sellIn).toBe(8)
    });
  });
  
});
