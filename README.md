# 🎵 WhatsApp SoundCloud Bot

Bot de WhatsApp que descarga audios de canciones de SoundCloud con soporte para múltiples grupos.

## ✨ Características

- 🎵 Descarga canciones de SoundCloud
- 👋 Comandos de bienvenida y despedida
- 👥 Soporte para múltiples grupos
- 🔍 Búsqueda de canciones
- 📱 Interfaz interactiva
- 🛡️ Autenticación segura con LocalAuth

## 📋 Requisitos

- Node.js v14 o superior
- npm o yarn
- Cuenta de WhatsApp

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/noemijuan1211-bot/whatsapp-soundcloud-bot.git
cd whatsapp-soundcloud-bot
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita el archivo `.env` y agrega los IDs de los grupos:

```
GRUPOS_IDS=120363xxx@g.us,120363yyy@g.us
```

### 4. Iniciar el bot

```bash
npm start
```

Escanea el código QR con tu teléfono y ¡listo!

## 📱 Comandos

### Música
- `!musica <nombre>` - Busca y descarga una canción
- `!cancion <nombre>` - Alias de !musica

### Saludos
- `!bienvenida` - Muestra un mensaje de bienvenida
- `!despedida` - Muestra un mensaje de despedida

### Información
- `!ayuda` - Muestra todos los comandos
- `!ping` - Verifica que el bot está activo

## 📝 Ejemplos de uso

```
!musica Despacito
!cancion Shape of You
!bienvenida
!despedida
!ayuda
!ping
```

## 🔧 Configuración avanzada

### Obtener el ID de un grupo

1. En WhatsApp, abre el grupo
2. Usa el comando `!ping` en el grupo
3. El ID aparecerá en los logs de la consola

### Ejecutar en desarrollo

```bash
npm run dev
```

Esto usa `nodemon` para reiniciar automáticamente.

## ⚠️ Notas importantes

- Los archivos se descargan temporalmente en la carpeta `descargas/`
- Se limpian automáticamente después de ser enviados
- El bot necesita estar conectado a WhatsApp Web
- Respeta los derechos de autor al descargar música
- SoundCloud tiene límites de descarga, úsalos responsablemente

## 🐛 Troubleshooting

### Error: "whatsapp-web.js not found"
```bash
npm install whatsapp-web.js
```

### Error: "No se puede conectar a WhatsApp"
- Asegúrate de que tu WhatsApp está conectado
- Escanea el código QR nuevamente
- Revisa tu conexión a internet

### El bot no responde
- Verifica que los IDs de grupo en `.env` son correctos
- Usa `!ping` para verificar que está activo
- Revisa los logs de la consola

## 📁 Estructura del proyecto

```
.
├── index.js              # Archivo principal del bot
├── package.json          # Dependencias
├── .env.example          # Variables de entorno ejemplo
├── .env                  # Variables de entorno (no commitear)
├── .gitignore            # Archivos a ignorar
├── descargas/            # Carpeta temporal de descargas
└── README.md             # Este archivo
```

## 🤝 Contribuir

Siéntete libre de hacer fork, abrir issues y enviar pull requests.

## 📄 Licencia

MIT

## ⚖️ Disclaimer

Este bot es con fines educativos. El usuario es responsable del uso correcto y legal del mismo. Respeta los derechos de autor y los términos de servicio de SoundCloud y WhatsApp.
