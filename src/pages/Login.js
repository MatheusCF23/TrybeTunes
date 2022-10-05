import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Load from './Load';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      disable: true,
      loading: false,
    };
  }

  hadleDisable = (event) => {
    const { name, value } = event.target;
    const num = 3;
    this.setState({
      [name]: value,
    });
    const load = value.length < num;
    if (name === 'name') {
      this.setState({
        disable: load,
      });
    }
  };

  handleClick = async () => {
    const { name } = this.state;
    const { history } = this.props;
    const nome = name;
    this.setState({ loading: true });
    await createUser({ name: nome });
    history.push('/search');
  };

  render() {
    const { name, loading, disable } = this.state;
    return (

      <div data-testid="page-login">
        {
          loading
            ? <Load />
            : (
              <form>
                <label htmlFor="login-name-input">
                  Nome:
                  <input
                    type="text"
                    data-testid="login-name-input"
                    value={ name }
                    name="name"
                    onChange={ this.hadleDisable }
                  />
                </label>
                <button
                  type="button"
                  data-testid="login-submit-button"
                  onClick={ this.handleClick }
                  disabled={ disable }
                >
                  Entrar
                </button>
              </form>)
        }
      </div>
    );
  }
}

export default Login;

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};
