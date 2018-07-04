import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Modal from '../Modal';
import { hideModal } from '../../actions/modal';
import { loginUser } from '../../actions/user';

const LoginDiv = styled.div`
  border: 0.5vw inset grey;
  border-radius: 3%;
  background-color: white;
  padding: 4vw;
`;

const Header = styled.div`
  height: 7vh;
  width: 100%;
  background-color: #000061;
  color: white;
  margin: 0;
`;

const Label = styled.label`
`;

const Input = styled.input`
`;

const Button = styled.button`
  width: 8vw;
  height: 4vh;
  margin-top: 2vw;
  font-size: 1.1em;
`;

const ErrorMessage = styled.p`
  color: red;
`;

export const LOGIN_DIALOG = 'LOGIN_DIALOG';

class LoginDialog extends React.Component {
  state = {
    username: '',
    password: ''
  }

  onLoginClicked = () => {
    const { username, password } = this.state;
    this.props.loginUser(username, password, success => {
      if (success) {
        this.props.hideModal();
      }
    });
  }

  onClose = () => {
    this.props.hideModal();
  }

  render() {
    const usernameTag = `un${_.random(1, 1000000)}`;
    const passwordTag = `pw${_.random(1, 1000000)}`;

    return (
      <Modal onClose={this.onClose}>
        <LoginDiv>
          <Header>DSSS Login</Header>
          <form autoComplete='off'>
            {this.props.error && <ErrorMessage>{this.props.error}</ErrorMessage>}
            <Label htmlFor={usernameTag}>Username:</Label>
            <Input
              name={usernameTag}
              type='text' placeholder='Enter username' value={this.state.username}
              autoComplete='off'
              onChange={e => {
                this.setState({ username: e.target.value });
              }}
            />
            <Label htmlFor={passwordTag}>Password:</Label>
            <Input
              name={passwordTag}
              type='password' value={this.state.password}
              onChange={e => {
                this.setState({ password: e.target.value });
              }}
            />
          </form>
          <Button onClick={this.onLoginClicked}>Login</Button>
          <Button onClick={this.onClose}>Cancel</Button>
        </LoginDiv>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  loginUser: (username, password, callback) => dispatch(loginUser(username, password, callback))
});

const mapStateToProps = state => ({
  error: state.user.error
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog);