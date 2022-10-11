import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Load from './Load';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const obj = {
  value: '',
  check: '',
  button: true,
  loading: false,
  album: false,
  responseValue: [],
};

class Search extends Component {
  state = { ...obj };

  handleInput = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      button: (value.length < 2),
    });
  };

  handleFetch = () => {
    const { value } = this.state;
    this.setState({ loading: true, album: true }, async () => {
      const API = await searchAlbumsAPI(value);
      this.setState({
        responseValue: API,
        check: value,
        loading: false }, () => {
        this.setState({ value: '' });
      });
    });
  };

  render() {
    const {
      value, button, loading, responseValue, album, check } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form action="" method="get">
          <input
            value={ value }
            name="value"
            type="text"
            placeholder="banda/artista"
            data-testid="search-artist-input"
            onChange={ this.handleInput }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ button }
            onClick={ this.handleFetch }
          >
            Pesquisar
          </button>
        </form>
        {loading && <Load />}
        {album && (
          <p>
            Resultado de álbuns de:
            {' '}
            {check}
          </p>
        )}
        {(responseValue.length === 0 && album) ? (
          <p>Nenhum álbum foi encontrado</p>)
          : (
            <ul>
              {responseValue
                .map((element, index) => (
                  <Link
                    data-testid={ `link-to-album-${element.collectionId}` }
                    key={ index }
                    to={ `/album/${element.collectionId}` }
                  >
                    {JSON.stringify(element)}
                  </Link>))}
            </ul>
          )}
      </div>
    );
  }
}

export default Search;
