/* ════════════════════════════════════════════════════════════════
   TUS VIDEOS — edita solo este archivo.
   En "url" puedes pegar:
     · un enlace de YouTube (watch?v=..., youtu.be/..., o /shorts/...)
     · o un enlace directo a un .mp4
   Para quitar una tarjeta, borra su bloque { ... }.
   ════════════════════════════════════════════════════════════════ */

window.PORTFOLIO = {

  /* Fondo de la portada.
     poster: 'auto' usa la miniatura del primer trabajo Full HD (o pega la URL de una imagen).
     video : opcional, un .mp4 corto (10–20 s) para que se reproduzca de fondo. */
  hero: { poster: 'auto', video: '' },

  /* Trabajos Full HD. El PRIMERO es el destacado (ancho completo).
     title / catLabel: textos que se ven en la tarjeta.
     cat (opcional): 'campanas' | 'motion' | 'elearning'. Si asignas categorías
        a los trabajos, aparecen solos los botones de filtro; si no, se ocultan.
     dur (opcional): duración, ej. '01:12'. */
  works: [
    { url: 'https://youtu.be/A79-J2PRres', title: 'Proyecto destacado', catLabel: 'Producción audiovisual · Full HD' },
    { url: 'https://youtu.be/_gk56k6Jopo', title: 'Producción audiovisual 02', catLabel: 'Full HD' },
    { url: 'https://youtu.be/IZh8Hqk-2L0', title: 'Producción audiovisual 03', catLabel: 'Full HD' },
    { url: 'https://youtu.be/gs9xtX-mn3k', title: 'Producción audiovisual 04', catLabel: 'Full HD' }
  ],

  /* Reels verticales (YouTube Shorts). views: línea pequeña bajo el título. */
  reels: [
    { url: 'https://youtube.com/shorts/VnviiVSDKGY', title: 'Lanyard', views: 'YouTube Shorts · 0:14' },
    { url: 'https://youtube.com/shorts/Jo9S-rAxBbY', title: 'Clippers', views: 'YouTube Shorts · 0:13' },
    { url: 'https://youtube.com/shorts/c2ctjYe9NGA', title: 'DBCloud', views: 'YouTube Shorts · 0:29' },
    { url: 'https://youtube.com/shorts/nFFy6y5UAJI', title: 'Terpy', views: 'YouTube Shorts · 0:15' },
    { url: 'https://youtube.com/shorts/LQ_VB6hFzSM', title: 'Huevo: se puede romper', views: 'YouTube Shorts · 0:15' },
    { url: 'https://youtube.com/shorts/cmmCmHY4Erc', title: 'Lighter Leash', views: 'YouTube Shorts · 0:18' }
  ]
};
