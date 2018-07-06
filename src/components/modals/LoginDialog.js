import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Modal from '../modals/Modal';
import { hideModal } from '../../actions/modal';
import { loginUser } from '../../actions/user';

const LoginDiv = styled.div`
  border: 0.5vw inset grey;
  border-radius: 3%;
  background-color: #8FAECF;
`;

const Header = styled.div`
  height: 4vh;
  width: 100%;
  background-color: #000061;
  color: white;
  margin: 0;
  margin-bottom: 1vh;
  padding-top: 1vh;
  padding-left: 1vw;
  text-align: left;
  font-weight: bold;
`;

const LoginForm = styled.form`
  width: 80%;
  margin: 0 auto;
  padding-bottom: 2vh;
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
  color: darkblue;
  text-align: left;
`;

const Input = styled.input`
  font-size: 1.3rem;
  margin: 1vh 0;
`;

const Button = styled.button`
  width: 8vw;
  height: 4vh;
  margin: 2vh 1vw;
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

  onLoginClicked = e => {
    e.preventDefault();

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
          <LoginForm
            autoComplete='off'
            onSubmit={this.onLoginClicked}
          >
            {this.props.error && <ErrorMessage>{this.props.error}</ErrorMessage>}
            <Label htmlFor={usernameTag}>Username</Label>
            <Input
              name={usernameTag}
              type='text' placeholder='Enter username' value={this.state.username}
              autoComplete='off'
              onChange={e => {
                this.setState({ username: e.target.value });
              }}
            /><br/>
            <Label htmlFor={passwordTag}>Password</Label>
            <Input
              name={passwordTag}
              type='password' value={this.state.password}
              onChange={e => {
                this.setState({ password: e.target.value });
              }}
            /><br/>
            <Button onClick={this.onLoginClicked}>Login</Button>
            <Button onClick={this.onClose}>Cancel</Button>
          </LoginForm>
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