
import { Button } from "components/Button/Button"
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"
import { Loader } from "components/Loader/Loader"
import { Component } from "react"
import { fetchImgs } from "js/fetchSearch"



export class ImageGallery extends Component {
  state = {
    imgs: null,
    status: 'idel',
    page: 2
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.tagImg !== this.props.tagImg) {
      console.log('!==')
      const KEY = '31737650-012dbd0b1d73fc9a5bf6ca0f4'
      const page = 1
      this.setState({status: 'pending'})
      fetchImgs(this.props.tagImg, page)
      .then(imgs => this.setState({imgs: imgs.hits, status: 'resolved'}))
    }
  }

  loadMore = () => {
    console.log('Load more')
    this.setState(({page}) => {return {page: page+1}})
    fetchImgs(this.props.tagImg, this.state.page)
      .then(imgs => this.setState(prevState => {
        // console.dir(imgs)
        return {imgs: [...prevState.imgs, ...imgs.hits], status: 'resolved'}
      }
    ))
  }

  render () {

    if (this.state.status === 'pending') {
      return <Loader />
    }
    
    if (this.state.status === 'resolved') {
      return (
        <>
          <ul className="Gallery">
            {this.state.imgs.map(img => <ImageGalleryItem img={img}  key={img.id}/>)}
          </ul>
          <Button onClick={this.loadMore}/>
        </>
      )
    }
    
  }
  
}
