import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import flagVI from '../../assets/images/Flag_of_Vietnam.svg.png';
import flagEN from '../../assets/images/England_flag.png';
import { LANGUAGES, USER_ROLE } from '../../utils';
import { changeLanguageApp } from '../../store/actions';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }
  changLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  componentDidMount() {
    let { userInfo } = this.props;
    let menu = '';
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      }
      if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }
    }
    this.setState({
      menuApp: menu,
    });
  }
  render() {
    const { processLogout, language, userInfo } = this.props;
    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>
        <div className="right-header d-flex align-items-center">
          <span className="welcome px-3">
            <FormattedMessage id="homeHeader.welcome" />
            ,&ensp;
            <b>{userInfo && userInfo.firstName ? userInfo.firstName : ''}</b>
          </span>
          <div className="change-language d-flex pr-3">
            <div className="language">
              <img
                src={flagVI}
                alt=""
                width={30}
                height={20}
                onClick={() => this.changLanguage(LANGUAGES.VI)}
              />
            </div>
            <div className="language">
              <img
                src={flagEN}
                alt=""
                width={30}
                height={20}
                onClick={() => this.changLanguage(LANGUAGES.EN)}
              />
            </div>
          </div>
          {/* nút logout */}
          <div className="btn btn-logout" onClick={processLogout}>
            <i className="fas fa-sign-out-alt"> </i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    lang: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
