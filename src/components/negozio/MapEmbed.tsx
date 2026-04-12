// src/components/negozio/MapEmbed.tsx
interface MapEmbedProps {
  src: string
}

export function MapEmbed({ src }: MapEmbedProps) {
  return (
    <div className="aspect-video w-full rounded-sm overflow-hidden border border-gray-100">
      <iframe
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Posizione Profumeria Wanda su Google Maps"
      />
    </div>
  )
}
