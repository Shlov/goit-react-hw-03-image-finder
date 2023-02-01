import { Component } from "react";
import { Toaster } from "react-hot-toast";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar"

export class App extends Component {
  state = {
    tagImg: null
  }

  handelFormSubmit = (tagImg) => {
    this.setState({tagImg: tagImg})
  }

  render () {

    return (
      <>
        {/* <Searchbar onSubmit = {onSubmit}/> */}
        <Searchbar onSubmit = {this.handelFormSubmit}/>
        <ImageGallery tagImg ={this.state.tagImg}/>
        
        <Toaster position="bottom-center"/>
      </>
    );
  }
};
