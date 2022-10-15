import React, { Component } from "react";
import { connect } from "react-redux";
import "./handbook.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class handbook extends Component {
    render() {
        function CusArrow(props) {
            let { className, style, onClick } = props;
            return (
                <div
                    className={className}
                    style={{ ...style, display: "block" }}
                    onClick={onClick}
                />
            );
        }

        let settings = {
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: false,
            nextArrow: <CusArrow />,
            prevArrow: <CusArrow />,
            swipeToSlide: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }
            ]
        };
        return (
            <div className="section handbook" >
                <div className="container">
                    <Slider {...settings}>
                        <div className="slide-content">
                            <a className="row">
                                <div className="bg-img col-6"></div>
                                <div className="row col-6 d-flex align-items-center">
                                    <h5>Cắt Amidan có đau không? Có phải nằm viện không? Bao lâu hết đau?</h5>
                                    <span>Hầu như bệnh nhân phẫu thuật nào cũng lo lắng cắt amidan có đau không, bao lâu hết đau, có phải nằm viện không,...</span>
                                </div>
                            </a>
                        </div>
                        <div className="slide-content">
                            <a className="row">
                                <div className="bg-img col-6"></div>
                                <div className="row col-6 d-flex align-items-center">
                                    <h5>Cắt Amidan có đau không? Có phải nằm viện không? Bao lâu hết đau?</h5>
                                    <span>Hầu như bệnh nhân phẫu thuật nào cũng lo lắng cắt amidan có đau không, bao lâu hết đau, có phải nằm viện không,...</span>
                                </div>
                            </a>
                        </div>
                        <div className="slide-content">
                            <a className="row">
                                <div className="bg-img col-6"></div>
                                <div className="row col-6 d-flex align-items-center">
                                    <h5>Cắt Amidan có đau không? Có phải nằm viện không? Bao lâu hết đau?</h5>
                                    <span>Hầu như bệnh nhân phẫu thuật nào cũng lo lắng cắt amidan có đau không, bao lâu hết đau, có phải nằm viện không,...</span>
                                </div>
                            </a>
                        </div>
                        <div className="slide-content">
                            <a className="row">
                                <div className="bg-img col-6"></div>
                                <div className="row col-6 d-flex align-items-center">
                                    <h5>Cắt Amidan có đau không? Có phải nằm viện không? Bao lâu hết đau?</h5>
                                    <span>Hầu như bệnh nhân phẫu thuật nào cũng lo lắng cắt amidan có đau không, bao lâu hết đau, có phải nằm viện không,...</span>
                                </div>
                            </a>
                        </div>
                    </Slider>
                </div >
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(handbook);
