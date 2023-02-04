import { Component } from "react";
import { Toaster } from "react-hot-toast";
import { Loader } from "components/Loader/Loader"
import { Button } from "components/Button/Button"
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Modal } from "./Modal/Modal";
import { Searchbar } from "./Searchbar/Searchbar"
import { fetchImgs } from "js/fetchSearch"
import toast from 'react-hot-toast';

export class App extends Component {
  state = {
    tagImg: null,
    imgs: null,
    responseApi: null,
    status: 'idel',
    page: 2,
    error: null,
    showModal: false,
    showImg: null
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tagImg !== this.state.tagImg) {
      this.setState({page: 2, status: 'pending'})
      fetchImgs(this.state.tagImg, 1)
      .then(imgs => this.setState(prevState => {
        if (!imgs.total) {
          return {imgs: null, status: 'absent'}
        }
        if (Math.ceil(imgs.totalHits / 12) === 1) {
          return {imgs: imgs.hits, status: 'end'}
        }
        return {imgs: imgs.hits, responseApi: imgs, status: 'resolved'}}))
      .catch(error => this.setState({error, status: 'rejected'}))
    }
  }

  loadMore = () => {
    this.setState(({page}) => {return {page: page+1, status: 'pending'}})
    fetchImgs(this.state.tagImg, this.state.page)
      .then(imgs => this.setState(prevState => {
        if (Math.ceil(this.state.responseApi.totalHits / 8) === this.state.page) {
          return {imgs: [...prevState.imgs, ...imgs.hits], status: 'end'}
        }
        return {imgs: [...prevState.imgs, ...imgs.hits], status: 'resolved'}
      }))
  }

  toggleModal = () => {
    this.setState(({showModal}) => ({showModal: !showModal}))
    // this.setState(state => ({showModal: !state.showModal}))
  }

  handelFormSubmit = (tagImg) => {
    this.setState({tagImg: tagImg})
  }

  openModal = (img) => {
    this.toggleModal()
    this.setState({showImg: img})
  }

  closeModal = () => {
    this.toggleModal()
  }

  render () {

    const {imgs, showModal, status, tagImg, showImg} = this.state

    return (
      <>
        <Searchbar onSubmit = {this.handelFormSubmit}/>
        {imgs && <ImageGallery imgs ={imgs} onOpenModal={this.openModal}/>}
        {showModal && <Modal img = {showImg} onClose = {this.closeModal}/>}
        {status === 'pending' && <Loader />}
        {status === 'end' && <h3>Це всі зображення, що знайшли 🙃</h3>}
        {status === 'resolved' && <Button onClick={this.loadMore}/>}
        {status === 'absent' && <h3>No results found for {tagImg}.</h3>}
        {status === 'rejected' && <h3>ERROR</h3>}
        
        <Toaster position="bottom-center"/>
      </>
    );
  }
};

// 'resolved' 'pendingMore' 'idel' 'pendingMore' 'end'
