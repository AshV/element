import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const base = import.meta.env.BASE_URL;
  const manifest = {
    $schema: 'https://json.schemastore.org/web-manifest-combined.json',
    name: 'Element — Timeless Quotes, Reimagined',
    short_name: 'Element',
    description: "An immersive sanctuary of timeless reflections and philosophical wisdom from history's greatest thinkers.",
    start_url: base,
    scope: base,
    display: 'standalone',
    display_override: ['window-controls-overlay', 'standalone', 'minimal-ui'],
    orientation: 'any',
    background_color: '#0a0a0f',
    theme_color: '#0a0a0f',
    categories: ['lifestyle', 'education', 'books'],
    lang: 'en-US',
    dir: 'ltr',
    icons: [
      {
        src: `${base}icons/icon-192.png`,
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: `${base}icons/icon-512.png`,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: `${base}icons/icon-maskable-192.png`,
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: `${base}icons/icon-maskable-512.png`,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: `${base}icons/apple-touch-icon.png`,
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    shortcuts: [
      {
        name: 'Daily Reflection',
        short_name: 'Reflection',
        description: "Contemplate today's timeless thought",
        url: base,
        icons: [{ src: `${base}icons/icon-192.png`, sizes: '192x192' }],
      },
      {
        name: 'Explore Thinkers',
        short_name: 'Thinkers',
        description: 'Explore timeless philosophers and authors',
        url: `${base}#explore`,
        icons: [{ src: `${base}icons/icon-192.png`, sizes: '192x192' }],
      },
    ],
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' },
  });
};
