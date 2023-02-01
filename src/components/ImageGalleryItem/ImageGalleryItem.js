import { Item, Image } from "./ImageGalleryItem.styled"


export const ImageGalleryItem = ({img}) => {
  return (
    <Item>
      <Image src={img.largeImageURL} alt={img.tags} />
    </Item>
  )
}

