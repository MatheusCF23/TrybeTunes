import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Load from './Load';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      load: true,
      album: '',
      fav: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const searchMusic = await getMusics(params.id);
    const music = await getFavoriteSongs();
    this.setState(
      { album: searchMusic, favorites: music },
      () => this.setState({ load: false }),
    );
  }

  render() {
    const { album, load } = this.state;
    const checkFavorite = async (_item, index) => {
      this.setState({ load: true });
      await addSong(index);
      this.setState((element) => ({ load: false,
        fav: [...element.fav, index] }));
    };

    const checked = (item) => {
      const { fav } = this.state;
      return fav.some((favorit) => favorit.trackId === item.trackId);
    };

    return (
      <>
        <Header />
        { load && <Load /> }
        { !load
        && (
          <div data-testid="page-album">
            { album && (
              <>
                {album.map((element, index) => (index === 0 ? (
                  <div key="test">
                    <p
                      key={ album[0].artistName }
                      data-testid="artist-name"
                    >
                      {album[0].artistName}
                    </p>
                    <p
                      key={ album[0].collectionName }
                      data-testid="album-name"
                    >
                      {album[0].collectionName}
                    </p>
                  </div>
                ) : (
                  <MusicCard
                    { ...element }
                    key={ album[index].trackName }
                    checked={ checked(element) }
                    checkboxFav={ checkFavorite }
                  />
                )))}
              </>
            )}
          </div>)}
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
