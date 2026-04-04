'use client'

const images = [
  { src: '/assets/mountains-dog.jpg', alt: 'Mountains' },
  { src: '/assets/cb.jpg', alt: 'CB' },
  { src: '/assets/chess.jpg', alt: 'Chess' },
  { src: '/assets/football.jpg', alt: 'Football' },
  { src: '/assets/mountains-dog.jpg', alt: 'Mountains with dog' },
  { src: '/assets/surgery.jpg', alt: 'Surgery' },
]

// Duplicate for seamless loop
const allImages = [...images, ...images]

export default function PhotoStrip() {
  return (
    <div className="bg-card-bg border border-card-border rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden">
      <div className="overflow-hidden">
        <div className="flex gap-3 p-4 w-max animate-scroll">
          {allImages.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt}
              className="h-48 w-auto object-cover rounded-xl flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
