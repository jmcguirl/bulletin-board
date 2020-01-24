import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

import textConstants from '../../constants/textConstants';
import routeConstants from '../../constants/routeConstants';
import * as bulletinService from '../../services/bulletinService';
import bulletinLogo from '../../assets/images/bulletin-board-login-image.png';

class GoogleLoginComponent extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: JSON.parse(localStorage.getItem('user')) ? true : false
    };
  }

  responseGoogle(response) {
    const profileObj = response.profileObj;
    const data = {
      tokenId: response.tokenId
    };

    bulletinService
      .validateAdmin(data)
      .then(async res => {
        const { tokens } = res.data.data;

        await localStorage.setItem('accessToken', tokens.accessToken);
        await localStorage.setItem('refreshToken', tokens.refreshToken);
        await localStorage.setItem('user', JSON.stringify(profileObj));

        this.setState({
          isLoggedIn: true
        });
      })
      .catch(err => err);
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    return (
      <div className="login-wrapper">
        {!isLoggedIn ? (
          <div className="login-dialog">
            <img src={bulletinLogo} alt="bulletin logo" className="bulletin-logo-big" />

            <GoogleLogin
              clientId={textConstants.GOOGLE_CLIENT_ID}
              buttonText={
                <div className="google-button">
                  <i className="fa fa-google"></i>
                  <span>Sign in with Google</span>
                </div>
              }
              className="login-button-style"
              onSuccess={this.responseGoogle.bind(this)}
              onFailure={this.responseGoogle.bind(this)}
            />
          </div>
        ) : (
          <Redirect
            to={{
              pathname: routeConstants.DASHBOARD
            }}
          />
        )}
      </div>
    );
  }
}

export default GoogleLoginComponent;
