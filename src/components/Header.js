import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Load from '../pages/Load';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: true,
    };
  }

  async componentDidMount() {
    const acess = await getUser();
    this.setState({ loading: false, user: acess });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <>
        <div data-testid="header-component">
          {loading ? <Load /> : (
            <div data-testid="header-user-name">{user.name}</div>
          )}
        </div>
        <nav>
          <Link to="/search" data-testid="link-to-search">
            Login
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites">
            Favorites
          </Link>
          <Link to="/profile" data-testid="link-to-profile">
            Profile
          </Link>
        </nav>
      </>
    );
  }
}

export default Header;
