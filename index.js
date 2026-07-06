const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const client = new Client({
  authStrategy: new LocalAuth(),
});

const GRUPOS_CONFIGURADOS = process.env.GRUPOS_IDS ? process.env.GRUPOS_IDS.split(',') : [];

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
  console.log('\n📱 Escanea el código QR con tu WhatsApp');
});

client.on('ready', () => {
  console.log('✅ Bot conectado correctamente');
  console.log(`👥 Grupos monitoreados: ${GRUPOS_CONFIGURADOS.length}`);
});

client.on('message', async (message) => {
  try {
    // Solo procesar mensajes de grupos
    if (message.from.includes('@g.us')) {
      // Es un grupo
      const groupId = message.from;
      
      // Procesar comandos
      if (message.body.startsWith('!')) {
        await procesarComando(message, client);
      }
    }
  } catch (error) {
    console.error('Error procesando mensaje:', error);
  }
});

async function procesarComando(message, client) {
  const comando = message.body.toLowerCase().split(' ')[0];
  const args = message.body.split(' ').slice(1).join(' ');

  switch (comando) {
    case '!bienvenida':
      await comando_bienvenida(message, client);
      break;
    
    case '!despedida':
      await comando_despedida(message, client);
      break;
    
    case '!musica':
    case '!cancion':
      if (args) {
        await comando_musica(message, client, args);
      } else {
        message.reply('❌ Uso: !musica <nombre de la canción>');
      }
      break;
    
    case '!ayuda':
      await comando_ayuda(message, client);
      break;
    
    case '!ping':
      await message.reply('🏓 Pong!');
      break;
    
    default:
      break;
  }
}

async function comando_bienvenida(message, client) {
  const contact = await message.getContact();
  
  const bienvenida = `
🎉 ¡Bienvenido @${contact.number}!

Soy tu bot musical de WhatsApp. Aquí puedo ayudarte:

🎵 Comandos disponibles:
• !musica <nombre> - Descarga una canción de SoundCloud
• !cancion <nombre> - Alias para !musica
• !bienvenida - Mensaje de bienvenida
• !despedida - Mensaje de despedida
• !ayuda - Muestra esta ayuda
• !ping - Verifica que estoy activo

¿Qué necesitas?
  `;
  
  await message.reply(bienvenida);
}

async function comando_despedida(message, client) {
  const contact = await message.getContact();
  
  const despedida = `
👋 ¡Hasta luego @${contact.number}!

Gracias por usar el bot. Si necesitas más canciones, solo escribe !musica <nombre>

¡Que disfrutes la música! 🎵
  `;
  
  await message.reply(despedida);
}

async function comando_musica(message, client, nombreCancion) {
  try {
    await message.reply('🔍 Buscando canción en SoundCloud...');
    
    const scdl = require('soundcloud-downloader').default;
    
    // Buscar la canción
    const tracks = await scdl.search(nombreCancion, 'tracks', 5);
    
    if (!tracks || tracks.length === 0) {
      await message.reply(`❌ No encontré "${nombreCancion}" en SoundCloud`);
      return;
    }
    
    const track = tracks[0];
    
    await message.reply(`📥 Descargando: ${track.title}...`);
    
    // Descargar la canción
    const downloadPath = path.join(__dirname, 'descargas', `${track.id}.mp3`);
    
    // Crear carpeta si no existe
    if (!fs.existsSync(path.join(__dirname, 'descargas'))) {
      fs.mkdirSync(path.join(__dirname, 'descargas'), { recursive: true });
    }
    
    // Descargar
    await scdl.downloadTrack(track, downloadPath);
    
    // Enviar archivo
    const { MessageMedia } = require('whatsapp-web.js');
    const media = MessageMedia.fromFilePath(downloadPath);
    await client.sendMessage(message.from, media, { caption: `🎵 ${track.title}\n🎤 ${track.user.username}` });
    
    // Limpiar archivo después de enviar
    setTimeout(() => {
      if (fs.existsSync(downloadPath)) {
        fs.unlinkSync(downloadPath);
      }
    }, 5000);
    
    await message.reply('✅ ¡Canción enviada!');
    
  } catch (error) {
    console.error('Error descargando canción:', error);
    await message.reply('❌ Error al descargar la canción. Intenta más tarde.');
  }
}

async function comando_ayuda(message, client) {
  const ayuda = `
📚 *COMANDOS DISPONIBLES*

🎵 *Música*
• !musica <nombre> - Busca y descarga de SoundCloud
• !cancion <nombre> - Alias de !musica

👋 *Saludos*
• !bienvenida - Mensaje de bienvenida
• !despedida - Mensaje de despedida

❓ *Info*
• !ayuda - Muestra esta información
• !ping - Verifica que estoy activo

💡 *Ejemplo*:
!musica Despacito
  `;
  
  await message.reply(ayuda);
}

client.initialize();

module.exports = client;
