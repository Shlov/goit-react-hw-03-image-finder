import { Component } from "react";
import toast from 'react-hot-toast';

export class Searchbar extends Component {
  state = {
    tagImg: ''
  }

  handleTagChange = (evnt) => {
    this.setState({tagImg: evnt.currentTarget.value.toLowerCase()})
  }

  handleSubmit = (evnt) => {
    evnt.preventDefault()
    if (this.state.tagImg.trim() === '') {
      return toast.error('Enter a search query')
    }
    this.props.onSubmit(this.state.tagImg)
    this.setState({tagImg: ''})
  }

  render () {
    return (
      <header className="Searchbar">
        <form className="Form" onSubmit={this.handleSubmit}>
          <button type="submit" className="Button">
            <span className="Button-label">Search</span>
          </button>
          <input
            onChange={this.handleTagChange}
            className="Input"
            type="text"
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    )
  }
}

