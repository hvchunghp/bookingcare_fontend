import React, { Component } from 'react';
import { connect } from 'react-redux';
import './doctor.scss';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';

class doctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
      avatar: '',
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.DoctorsRedux !== this.props.DoctorsRedux) {
      this.setState({
        arrDoctors: this.props.DoctorsRedux,
      });
    }
  }
  componentDidMount() {
    this.props.loadDoctors();
  }
  handleViewDetailsDoctor = (doctor) => {
    this.props.history.push(`/detail-doctor/${doctor.id}`);
  };
  render() {
    function CusArrow(props) {
      let { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{ ...style, display: 'block' }}
          onClick={onClick}
        />
      );
    }

    let settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: false,
      pauseOnHover: false,
      autoplaySpeed: 2500,
      nextArrow: <CusArrow />,
      prevArrow: <CusArrow />,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    };
    let { arrDoctors } = this.state;
    let { language } = this.props;
    return (
      <div className="section doctor">
        <div className="container">
          <div className="d-flex justify-content-between">
            <h1 className="d-flex justify-content-start pt-3">
              <FormattedMessage id={'homepage.doctors'} />
            </h1>
            <div className="d-flex justify-content-end align-items-center">
              <button className="btn btn-secondary d-flex align-items-center">
                <FormattedMessage id={'homepage.more'} />
              </button>
            </div>
          </div>
          <div className="slide-content">
            <Slider {...settings}>
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let imageBase64 = '';
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, 'base64').toString(
                      'binary'
                    );
                  }
                  return (
                    <div
                      className="slide-item"
                      key={index}
                      onClick={() => this.handleViewDetailsDoctor(item)}
                    >
                      <div
                        className="bg-img"
                        style={{ backgroundImage: `url(${imageBase64})` }}
                      ></div>
                      <h6>
                        {item.lastName} {item.firstName}
                      </h6>
                      {language === LANGUAGES.VI ? (
                        <p>{item.positionData.valueVi}</p>
                      ) : (
                        <p>{item.positionData.valueEn}</p>
                      )}
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    DoctorsRedux: state.admin.doctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadDoctors: () => dispatch(actions.fectchDoctor()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(doctor));
