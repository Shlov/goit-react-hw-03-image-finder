
import { Button } from "components/Button/Button"
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"
import { Loader } from "components/Loader/Loader"
import { Component } from "react"
import { fetchImgs } from "js/fetchSearch"
import { ImageGalleryEl } from './ImageGallery.styled'



export class ImageGallery extends Component {
  state = {
    imgs: null,
    status: 'idel',
    page: 2,
    error: null
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.tagImg !== this.props.tagImg) {
      const firstPage = 1
      this.setState({page: 2})
      this.setState({status: 'pending'})
      fetchImgs(this.props.tagImg, firstPage)
      .then(imgs => {
        if (!imgs.total) {
          return this.setState({status: 'absent'})
        }
        return this.setState({imgs: imgs.hits, status: 'resolved'})})
      .catch(error => this.setState({error, status: 'rejected'}))
    }
  }

  loadMore = () => {
    this.setState(({page}) => {return {page: page+1, status: 'pendingMore'}})
    fetchImgs(this.props.tagImg, this.state.page)
      .then(imgs => this.setState(prevState => {
        return {imgs: [...prevState.imgs, ...imgs.hits], status: 'resolved'}
      }))
  }

  render () {

    if (this.state.status === 'pending') {
      return <Loader />
    }
    
    if (this.state.status === 'resolved') {
      return (
        <>
          <ImageGalleryEl>
            {this.state.imgs.map(img => <ImageGalleryItem img={img} onClick={this.props.onOpenModal}  key={img.id}/>)}
          </ImageGalleryEl>
          <Button onClick={this.loadMore}/>
        </>
      )
    }

    if (this.state.status === 'pendingMore') {
      return (
        <>
          <ImageGalleryEl>
            {this.state.imgs.map(img => <ImageGalleryItem img={img}  key={img.id}/>)}
          </ImageGalleryEl>
          <Loader />
        </>
      )
    }

    if (this.state.status === 'absent') {
      return <p>No results found for {this.props.tagImg}.</p>
    }

    if (this.state.status === 'rejected') {
      console.dir(this.state.error)
      return <h3>ERROR</h3>
    }
    
  }
  
}
