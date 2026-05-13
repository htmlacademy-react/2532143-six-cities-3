type OfferGalleryProps = {
  images: string[]
}

function OfferGallery({ images }: OfferGalleryProps): JSX.Element {
  const galleryImages = images.slice(0, 6)

  return (
    <div className="offer__gallery">
      {galleryImages.map((src) => (
        <div key={src} className="offer__image-wrapper">
          <img className="offer__image" src={src} alt="" />
        </div>
      ))}
    </div>
  )
}

export { OfferGallery }
