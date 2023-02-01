

export const ImageGalleryItem = ({img}) => {
  return (
    <li className="Gallery-item">
      <img src={img.previewURL} alt={img.tags} />
    </li>
  )
}

