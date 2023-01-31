import { Component } from "react";
import { Toaster } from "react-hot-toast";
// import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { Searchbar } from "./Searchbar/Searchbar"

export class App extends Component {
  state = {
    imgs: null
  }

  handelFormSubmit = (tagImg) => {
    console.log(tagImg)
  }

  render () {

    return (
      <>
        {/* <Searchbar onSubmit = {onSubmit}/> */}
        <Searchbar onSubmit = {this.handelFormSubmit}/>
        {/* <ImageGallery /> */}
        <Loader />
        <Toaster position="bottom-center"/>
      </>
    );
  }
};
