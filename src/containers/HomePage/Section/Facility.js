import React, { Component } from 'react';
import { connect } from 'react-redux';
import './facility.scss';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getAllClinic } from '../../../services/userService';
import { withRouter } from 'react-router';
class facility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clinicArr: [],
    };
  }
  async componentDidMount() {
    let res = await getAllClinic();

    if (res && res.errCode === 0) {
      this.setState({
        clinicArr: res.data,
      });
    }
  }
  handleViewDetailsClinic = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${item.id}`);
    }
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
    let { clinicArr } = this.state;
    return (
      <div className="section facility">
        <div className="container">
          <div className="d-flex justify-content-between">
            <h1 className="d-flex justify-content-start pt-3">
              <FormattedMessage id={'homepage.facility'} />
            </h1>
            <div className="d-flex justify-content-end align-items-center">
              <button className="btn btn-secondary d-flex align-items-center">
                <FormattedMessage id={'homepage.more'} />
              </button>
            </div>
          </div>
          <Slider {...settings}>
            {clinicArr &&
              clinicArr.length > 0 &&
              clinicArr.map((item, index) => {
                return (
                  <div
                    className="slide-content"
                    key={index}
                    onClick={() => this.handleViewDetailsClinic(item)}
                  >
                    <a>
                      <div
                        className="bg-img"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                      <h4 className="mx-2">{item.name}</h4>
                    </a>
                  </div>
                );
              })}
          </Slider>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(facility)
);
