import React, { Component } from "react";
import { connect } from "react-redux";
import "./ads.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class ads extends Component {
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
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            pauseOnHover: true,
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
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        return (
            <div className="section ads" >
                <div className="container">
                    <Slider {...settings}>
                        <div className="slide-content">
                            <a>
                                <div className="bg-img"></div>
                                <h6>Kit test covid bằng nước bọt</h6>
                                <li>Kit test nhanh bằng nước bọt</li>
                                <li>Đơn giản tiện lợi và chính xác</li>
                                <li>Bộ y tế Việt Nam chứng nhận</li>
                                <button>Mua ngay <i className="fa-solid fa-chevron-right" /></button>
                            </a>
                        </div>
                        <div className="slide-content">
                            <a>
                                <div className="bg-img"></div>
                                <h6>Kit test covid bằng nước bọt</h6>
                                <li>Kit test nhanh bằng nước bọt</li>
                                <li>Đơn giản tiện lợi và chính xác</li>
                                <li>Bộ y tế Việt Nam chứng nhận</li>
                                <button>Mua ngay <i className="fa-solid fa-chevron-right" /></button>
                            </a>
                        </div><div className="slide-content">
                            <a>
                                <div className="bg-img"></div>
                                <h6>Kit test covid bằng nước bọt</h6>
                                <li>Kit test nhanh bằng nước bọt</li>
                                <li>Đơn giản tiện lợi và chính xác</li>
                                <li>Bộ y tế Việt Nam chứng nhận</li>
                                <button>Mua ngay <i className="fa-solid fa-chevron-right" /></button>
                            </a>
                        </div><div className="slide-content">
                            <a>
                                <div className="bg-img"></div>
                                <h6>Kit test covid bằng nước bọt</h6>
                                <li>Kit test nhanh bằng nước bọt</li>
                                <li>Đơn giản tiện lợi và chính xác</li>
                                <li>Bộ y tế Việt Nam chứng nhận</li>
                                <button>Mua ngay <i className="fa-solid fa-chevron-right" /></button>
                            </a>
                        </div><div className="slide-content">
                            <a>
                                <div className="bg-img"></div>
                                <h6>Kit test covid bằng nước bọt</h6>
                                <li>Kit test nhanh bằng nước bọt</li>
                                <li>Đơn giản tiện lợi và chính xác</li>
                                <li>Bộ y tế Việt Nam chứng nhận</li>
                                <button>Mua ngay <i className="fa-solid fa-chevron-right" /></button>
                            </a>
                        </div><div className="slide-content">
                            <a>
                                <div className="bg-img"></div>
                                <h6>Kit test covid bằng nước bọt</h6>
                                <li>Kit test nhanh bằng nước bọt</li>
                                <li>Đơn giản tiện lợi và chính xác</li>
                                <li>Bộ y tế Việt Nam chứng nhận</li>
                                <button>Mua ngay <i className="fa-solid fa-chevron-right" /></button>
                            </a>
                        </div><div className="slide-content">
                            <a>
                                <div className="bg-img"></div>
                                <h6>Kit test covid bằng nước bọt</h6>
                                <li>Kit test nhanh bằng nước bọt</li>
                                <li>Đơn giản tiện lợi và chính xác</li>
                                <li>Bộ y tế Việt Nam chứng nhận</li>
                                <button>Mua ngay <i className="fa-solid fa-chevron-right" /></button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ads);
