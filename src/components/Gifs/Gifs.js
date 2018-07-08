import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";

// actions
import { addFavorites, getFavorites } from "./../../actions";

// UI
import UI from './Gifs.ui';

class Search extends Component {
  componentDidMount() {
    const favoritesList = JSON.parse(localStorage.getItem('favorites'));
    if(favoritesList && favoritesList.length) {
      for(let i = 0, len = favoritesList.length; i < len; i += 1){
        this.props.getFavorites(favoritesList[i]);
      }
    }
  }


  favorites = (e, obj) => {
    e.preventDefault();
    this.props.addFavorites(obj);
  }

  render() {

    return(
      <UI
        data={this.props.data}
        favorites={this.favorites}
        favoritesList={this.props.favorites}
      />
    );
  };
};

const mapStateToProps = (state) => {
  return {
    data: state.gif,
    favorites: state.favorites,
  }
}

Search.propTypes = {
  addFavorites: PropTypes.func,
  getFavorites: PropTypes.func,
};

Search.defaultProps = {
  addFavorites: () => {},
  getFavorites: () => {},
}
  

export default connect(mapStateToProps, {
  addFavorites,
  getFavorites
})(Search);