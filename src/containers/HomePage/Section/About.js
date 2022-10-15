import React, { Component } from 'react';
import { connect } from 'react-redux';
import './about.scss';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
class about extends Component {
  render() {
    return (
      <div className="section about">
        <div className="container">
          <div className="d-flex justify-content-between">
            <h1 className="d-flex justify-content-start pt-3">
              Truyền thông nói về BookingCare
            </h1>
          </div>
          <div className="row">
            <div className="col-lg-6 col-12">
              <iframe
                width={'100%'}
                height={315}
                src="https://www.youtube.com/embed/mstAc81lpMc"
                title="YouTube video player"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="col-6"></div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(about);
