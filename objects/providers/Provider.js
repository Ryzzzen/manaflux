class Provider {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  async getData(champion, preferredPosition, gameMode) {
    throw Error(`[ProviderHandler] ${this.name} ${i18n.__('providers-skipped')}: #getData`);
  }

  async getSummonerSpells(champion, position, gameMode) {
    throw Error(`[ProviderHandler] ${this.name} ${i18n.__('providers-skipped')}: #getSummonerSpells`);
  }

  async getItemSets(champion, position, gameMode) {
    throw Error(`[ProviderHandler] ${this.name} ${i18n.__('providers-skipped')}: #getItemSets`);
  }

  async getRunes(champion, position, gameMode) {
    throw Error(`[ProviderHandler] ${this.name} ${i18n.__('providers-skipped')}: #getRunes`);
  }

  _sendEverything(dl, position, data) {
    /* SummonerSpells */
    if (data.summonerspells && data.summonerspells.length === 2)
      dl.emit('summonerspells', position, data.summonerspells);

    /* Perks */
    for (let i = 0; i < data.runes.length; i++)
      dl.emit('runes', position, data.runes[i]);

    /* ItemSets */
    for (let i = 0; i < data.itemsets.length; i++)
      dl.emit('itemset', position, require('./ItemSetHandler').parse(champion.key, data.itemsets[i]._data, position));
  }
}

module.exports = Provider;