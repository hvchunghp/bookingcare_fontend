import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/images/logo.svg';
import flagVI from '../../assets/images/Flag_of_Vietnam.svg.png';
import flagEN from '../../assets/images/England_flag.png';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';
import { Link } from 'react-router-dom';
class HomeHeader extends Component {
  changLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    let language = this.props.lang;
    return (
      <React.Fragment>
        <div className="home-header-container sticky-top bg-light d-flex justify-content-center">
          <div className="home-header-content container row d-flex justify-content-center">
            <div className="left-content d-flex justify-content-start align-items-center col-6 col-md-6 col-lg-3">
              <i className="fa-solid fa-bars" />
              <Link to="/home">
                <img src={logo} alt="" />
              </Link>
            </div>
            <div className="center-content justify-content-between align-items-center d-none d-md-none d-lg-flex col-lg-6">
              <div className="child-content mx-1">
                <div>
                  <b>
                    <FormattedMessage id="homeHeader.specialist" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="homeHeader.findDoctors" />
                </div>
              </div>
              <div className="child-content mx-1">
                <div>
                  <b>
                    <FormattedMessage id="homeHeader.healthFacilities" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="homeHeader.chooseHospitalClinic" />
                </div>
              </div>
              <div className="child-content mx-1">
                <div>
                  <div>
                    <b>
                      <FormattedMessage id="homeHeader.doctor" />
                    </b>
                  </div>
                  <div className="sub-title">
                    <FormattedMessage id="homeHeader.chooseDoctor" />
                  </div>
                </div>
              </div>
              <div className="child-content mx-1">
                <div>
                  <div>
                    <b>
                      <FormattedMessage id="homeHeader.medicalPackage" />
                    </b>
                  </div>
                  <div className="sub-title">
                    <FormattedMessage id="homeHeader.generalHealthCheck" />
                  </div>
                </div>
              </div>
            </div>
            <div className="right-content d-flex justify-content-end align-items-center col-6 col-md-6 col-lg-3">
              <div className="support">
                <i className="fa-solid fa-circle-question" />
                <FormattedMessage id="homeHeader.support" />
              </div>
              <div className="language vi">
                <img
                  src={flagVI}
                  alt=""
                  width={30}
                  height={20}
                  onClick={() => this.changLanguage(LANGUAGES.VI)}
                />
              </div>
              <div className="language en">
                <img
                  src={flagEN}
                  alt=""
                  width={30}
                  height={20}
                  onClick={() => this.changLanguage(LANGUAGES.EN)}
                />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
