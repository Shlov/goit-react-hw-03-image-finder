import { Component } from "react";
import { Toaster } from "react-hot-toast";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Modal } from "./Modal/Modal";
import { Searchbar } from "./Searchbar/Searchbar"

export class App extends Component {
  state = {
    tagImg: null,
    showModal: false,
    showImg: null
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

  render () {

    return (
      <>
        <Searchbar onSubmit = {this.handelFormSubmit}/>
        <ImageGallery tagImg ={this.state.tagImg} onOpenModal={this.openModal}/>
        {this.state.showModal && <Modal img = {this.state.showImg}/>}
        <Toaster position="bottom-center"/>
      </>
    );
  }
};
