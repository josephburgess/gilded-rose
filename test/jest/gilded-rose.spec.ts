import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should initialise with an empty array', () => {
    const gildedRose = new GildedRose()
    expect(gildedRose.items).toEqual([])
  });

  describe('basic items', () => {
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
    it('should not degrade the value of a regular item to less than zero', () => {
      const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", 10, 20)])
      for(let i = 0; i < 15; i++ ){
        gildedRose.updateQuality();}
      expect(gildedRose.items[0].quality).toBe(0)
    });
  });

  describe('aged brie', () => {
    it('should increase in quality after a day', () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 2, 0)])
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(1)
    });
    it('should not increase quality beyond 50', () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 2, 0)])
      for(let i = 0; i < 30; i++ ){
        gildedRose.updateQuality();}
      expect(gildedRose.items[0].quality).toBe(50)
    });
  });
  
});
