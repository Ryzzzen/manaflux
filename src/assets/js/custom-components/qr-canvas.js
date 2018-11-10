const QRCode = require('qrcode');

module.exports = {
  clientLoaded: function() {
    let canvas = document.getElementById('qrcode');

    QRCode.toCanvas(canvas, 'http://' + Mana.remoteConnectionHandler.address, { width: 64 }, error => {
      if (error) return console.error(error);
      console.log('[UI] Successfuly generated QR code');
    });
  }
}
