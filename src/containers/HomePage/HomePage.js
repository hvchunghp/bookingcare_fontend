import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import './home.scss';
import Ads from './Section/Ads';
import Facility from './Section/Facility';
import Doctor from './Section/Doctor';
import Handlebook from './Section/handbook';
import About from './Section/About';
import HomeBanner from './homeBanner';
class HomePage extends Component {
  render() {
    return (
      <div>
        <HomeHeader />
        <HomeBanner />
        <Ads />
        <Specialty />
        <Facility />
        <Doctor />
        <Handlebook />
        <About />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
