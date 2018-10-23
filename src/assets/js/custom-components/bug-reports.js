const { BrowserWindow } = require('electron').remote;
const rp = require('request-promise-native');

ipcRenderer.on('bug-report', async (event, data) => {
  console.log('[Bug Report] Sending one..');

  try {
    const d = await rp({
      method: 'POST',
      uri: 'https://manaflux-server.herokuapp.com/reports/v1',
      body: console.dir(3, {...data, summonerId: Mana.user.getSummonerId(), summonerName: Mana.user.getDisplayName() }),
      json: true
    });

    if (d.message && d.error) UI.error(d.message);
    else if (d.error) throw UI.error(Error(d.error));
    else if (d.statusCode === 200) UI.success(i18n.__('bug-report-sent'));
  }
  catch(err) {
    UI.error(err);
  }
});

let opened = false;
module.exports = {
  click: function() {
    if (opened) return;
    if (!Mana.user || !Mana.user.getSummonerId()) throw UI.error('status-please-login');

    opened = true;
    const win = new BrowserWindow({ parent: require('electron').remote.getCurrentWindow(), width: 350, height: 550, frame: false, icon: __dirname + '/build/icon.' + (process.platform === 'win32' ? 'ico' : 'png'), backgroundColor: '#000A13', maximizable: false, resizable: false, modal: true, show: false });

    win.loadURL(`file://${__dirname}/../../../bugreports.html`);
    win.setMenu(null);

    win.once('ready-to-show', () => win.show());
    win.on('closed', () => opened = false);

    if (Mana.devMode) win.webContents.openDevTools({ mode: 'detach' });
  }
};
