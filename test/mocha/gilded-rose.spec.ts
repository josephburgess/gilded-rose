import { expect } from 'chai';
import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  describe('items', () => {
    
    it('should initialise with an empty array for items', () => {
      const gilded
    });

    it('should add foo to the inventory', () => {
      const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).to.equal('foo');
    });
  });
  

});
