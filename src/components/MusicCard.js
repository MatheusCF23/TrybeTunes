import PropTypes from 'prop-types';
import React from 'react';

class MusicCard extends React.Component {
  render() {
    const {
      trackName,
      previewUrl,
      trackId,
      checkboxFav,
      checked,
    } = this.props;
    return (
      <>
        <p>{ trackName }</p>
        <label htmlFor="favoritos">
          Favorita
          <input
            name="favoritos"
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            onChange={ (event) => checkboxFav(event, this.props) }
            checked={ checked }
          />
        </label>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
        </audio>
      </>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  checkboxFav: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default MusicCard;
