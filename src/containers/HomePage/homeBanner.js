import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';
class HomeBanner extends React.Component {
  render() {
    let language = this.props.lang;
    return (
      <>
        <div style={{ overflow: 'hidden' }}>
          <div className="home-header-banner d-flex row">
            <div className="banner-content">
              <div className="content-up d-flex align-content-center row">
                <div className="title1">
                  {' '}
                  <FormattedMessage id="homeBanner.medical-foundation" />
                </div>
                <div className="title2">
                  <b>
                    <FormattedMessage id="homeBanner.health-care" />
                  </b>
                </div>
                <div className="search d-flex justify-content-center align-items-center mt-5">
                  <i className="fa-solid fa-magnifying-glass" />
                  {language === LANGUAGES.VI ? (
                    <input
                      type="text"
                      placeholder="Tìm kiếm phòng khám, bác sĩ, bệnh..."
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder="Search for clinics, doctors, disease symptoms..."
                    />
                  )}
                </div>
              </div>
              <div className="content-down d-flex justify-content-center">
                <ul className="options row d-flex justify-content-center container">
                  <li className="row d-flex justify-content-center col-lg col-md-4 col-4">
                    <i className="fa-regular fa-hospital" />
                    <span>
                      <FormattedMessage id="homeBanner.opt-1" />
                    </span>
                  </li>
                  <li className="row d-flex justify-content-center col-lg col-md-4 col-4">
                    <i className="fa-solid fa-mobile-screen" />
                    <span>
                      <FormattedMessage id="homeBanner.opt-2" />
                    </span>
                  </li>
                  <li className="row d-flex justify-content-center col-lg col-md-4 col-4">
                    <i className="fa-solid fa-ballot" />
                    <span>
                      <FormattedMessage id="homeBanner.opt-3" />
                    </span>
                  </li>
                  <li className="row d-flex justify-content-center col-lg col-md-4 col-4">
                    <i className="fa-regular fa-microscope" />
                    <span>
                      <FormattedMessage id="homeBanner.opt-4" />
                    </span>
                  </li>
                  <li className="row d-flex justify-content-center col-lg col-md-4 col-4">
                    <i className="fa-regular fa-brain" />
                    <span>
                      <FormattedMessage id="homeBanner.opt-5" />
                    </span>
                  </li>
                  <li className="row d-flex justify-content-center col-lg col-md-4 col-4">
                    <i className="fa-regular fa-tooth" />
                    <span>
                      <FormattedMessage id="homeBanner.opt-6" />
                    </span>
                  </li>
                  <li className="row d-flex justify-content-center col-lg col-md-4 col-4">
                    <i className="fa-regular fa-scalpel" />
                    <span>
                      <FormattedMessage id="homeBanner.opt-7" />
                    </span>
                  </li>
                  <li className="row d-flex justify-content-center col-lg col-md-4 col-4">
                    <i className="fa-regular fa-truck-medical" />
                    <span>
                      <FormattedMessage id="homeBanner.opt-8" />
                    </span>
                  </li>
                  <li className="row d-flex justify-content-center col-lg col-md-4 col-4">
                    <i className="fa-regular fa-briefcase-medical" />
                    <span>
                      <FormattedMessage id="homeBanner.opt-9" />
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeBanner);
