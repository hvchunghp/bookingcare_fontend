import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './profileDoctor.scss';
import { LANGUAGES } from '../../../../utils';
import { Link } from 'react-router-dom';

import { getProfile } from '../../../../services/userService';
class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    let data = await this.getInforDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }

  getInforDoctor = async (id) => {
    let data = {};
    if (id) {
      let res = await getProfile(id);
      if (res && res.errCode === 0) {
        data = res.data;
      }
      return data;
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorId !== prevProps.doctorId) {
      //   this.getInforDoctor(this.props.doctorId);
    }
  }

  render() {
    let { dataProfile } = this.state;
    let imageBase64 = '';
    let { language } = this.props;
    let positionVi = '';
    let positionEn = '';
    if (dataProfile && dataProfile.positionData) {
      positionVi = `${dataProfile.positionData.valueVi}`;
      positionEn = `${dataProfile.positionData.valueEn}`;
    }
    if (dataProfile.image) {
      imageBase64 = new Buffer(dataProfile.image, 'base64').toString('binary');
    }
    return (
      <>
        <div className="intro-doctor d-flex py-2">
          <div className="content-left">
            <Link to={`/detail-doctor/${dataProfile.id}`}>
              <img style={{ cursor: 'pointer' }} src={imageBase64} alt="" />
            </Link>
          </div>
          <div className="mx-3 row content-right d-flex align-content-center">
            <div className="d-flex">
              <h2>
                {language === LANGUAGES.VI ? positionVi : positionEn}&nbsp;
                {dataProfile.lastName} {dataProfile.firstName}
              </h2>
            </div>
            <div className="row">
              <span>
                {dataProfile.Markdown && dataProfile.Markdown.description && (
                  <span>{dataProfile.Markdown.description}</span>
                )}
              </span>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
