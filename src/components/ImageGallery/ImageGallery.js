import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"



export const ImageGallery = ({imgs}) => {
  return (
    <ul className="gallery">
      {imgs.map(img => <ImageGalleryItem img={img} />)}
    </ul>
  )
}

