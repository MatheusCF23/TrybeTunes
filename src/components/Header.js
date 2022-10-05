import React from 'react';
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
      <div data-testid="header-component">
        {loading ? <Load /> : (
          <div data-testid="header-user-name">{user.name}</div>
        )}
      </div>
    );
  }
}

export default Header;
