import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomeHeader';
import DoctorSchedule from './Schedule/doctorSchedule';
import DoctorExtraInfo from './DoctorExtraInfo/doctorExtraInfo';

import './DetailsDoctor.scss';
import { getDetailsDoctor } from '../../../../services/userService';
import { LANGUAGES } from '../../../../utils';
import LikeAndShare from '../SocialPlugin/LikeAndShare';
import Comment from '../SocialPlugin/comment';
class DetailsDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailsDoctor: {},
      currentDoctorId: -1,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        currentDoctorId: id,
      });
      let res = await getDetailsDoctor(id);
      if (res && res.errCode === 0) {
        this.setState({
          detailsDoctor: res.data,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}
  render() {
    let { detailsDoctor } = this.state;
    let imageBase64 = '';
    if (detailsDoctor.image) {
      imageBase64 = new Buffer(detailsDoctor.image, 'base64').toString(
        'binary'
      );
    }
    let { language } = this.props;
    let positionVi = '';
    let positionEn = '';
    if (detailsDoctor && detailsDoctor.positionData) {
      positionVi = `${detailsDoctor.positionData.valueVi}`;
      positionEn = `${detailsDoctor.positionData.valueEn}`;
    }
    let currentURL =
      +process.env.REACT_APP_IS_LOCALHOST === 1
        ? 'https://reactjs-tutorial-orcin.vercel.app/'
        : window.location.href;
    return (
      <>
        <div className="header sticky-top">
          <HomeHeader />
        </div>
        <div className="container">
          <div className="intro-doctor row py-5">
            <div className="content-left col-4 col-md-2 col-lg-1">
              <img src={imageBase64} alt="" />
            </div>
            <div className="col-8 col-md-6 col-lg-6 row content-right d-flex align-content-center">
              <div className="d-flex">
                <h2>
                  {language === LANGUAGES.VI ? positionVi : positionEn}&nbsp;
                  {detailsDoctor.lastName} {detailsDoctor.firstName}
                </h2>
              </div>
              {detailsDoctor.Markdown && detailsDoctor.Markdown.description && (
                <p>{detailsDoctor.Markdown.description}</p>
              )}
            </div>
            <div className="like-share">
              <LikeAndShare dataHref={currentURL} />
            </div>
          </div>
          <div className="schedule-doctor row my-3">
            <div className="col-lg-6 col-md-8 col-12 content-left">
              <DoctorSchedule doctorId={this.state.currentDoctorId} />
            </div>
            <div className="col-lg-6 col-md-4 col-12">
              <DoctorExtraInfo doctorId={this.state.currentDoctorId} />
            </div>
          </div>
        </div>

        <div className="detail-info-doctor py-5">
          <div className="container">
            {detailsDoctor.Markdown && detailsDoctor.Markdown.contentHTML && (
              <p
                dangerouslySetInnerHTML={{
                  __html: detailsDoctor.Markdown.contentHTML,
                }}
              ></p>
            )}
          </div>
        </div>
        <div className="comment container">
          <Comment dataHref={currentURL} />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsDoctor);
