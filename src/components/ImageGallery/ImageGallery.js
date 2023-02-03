
import { Component } from "react"
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"

import { ImageGalleryEl } from './ImageGallery.styled'

import { Loader } from "components/Loader/Loader"


export const ImageGallery = ({imgs, onOpenModal}) => {

  return (
    <>
      <ImageGalleryEl>
        {imgs.map(img => <ImageGalleryItem img={img} onClick={onOpenModal}  key={img.id}/>)}
      </ImageGalleryEl>
    </>
  )
}

// 'resolved' 'pendingMore' 'idel' 'pendingMore' 'end'
