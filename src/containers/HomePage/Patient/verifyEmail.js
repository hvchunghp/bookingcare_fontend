import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { postVerifyBookAppointment } from '../../../services/userService';
import HomeHeader from '../../HomePage/HomeHeader';
import './verify.scss';
class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: 0,
    };
  }

  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get('token');
      let doctorId = urlParams.get('doctorId');
      let res = await postVerifyBookAppointment({
        token: token,
        doctorId: doctorId,
      });
      if (res && res.errCode === 0) {
        this.setState({
          statusVerify: true,
          errCode: res.errCode,
        });
      } else {
        this.setState({
          statusVerify: true,
          errCode: res && res.errCode ? res.errCode : -1,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { statusVerify, errCode } = this.state;
    return (
      <>
        <div className="header sticky-top">
          <HomeHeader />
        </div>
        {statusVerify === false ? (
          <div className="h-100 d-flex justify-content-center align-items-center">
            <div className="loader" />
          </div>
        ) : (
          <div>
            {errCode === 0 ? (
              <div className="container text-center verify">
                <div className="m-5 p-3">
                  <div
                    style={{
                      borderRadius: 200,
                      height: 200,
                      width: 200,
                      background: '#F8FAF5',
                      margin: '0 auto',
                    }}
                  >
                    <i className="checkmark">
                      <i className="fa-solid fa-check-to-slot" />
                    </i>
                  </div>
                  <h1>
                    <FormattedMessage id={'verify.titleSuccess'} />
                  </h1>
                  <p>
                    <FormattedMessage id={'verify.DescriptionSuccess'} />
                  </p>
                </div>
              </div>
            ) : (
              <div className="container text-center verify">
                <div className="m-5 p-3">
                  <div
                    style={{
                      height: 250,
                      width: 250,
                      margin: '0 auto',
                    }}
                  >
                    <i className="checkmark">
                      <i className="fa-solid fa-circle-exclamation text-danger" />
                    </i>
                  </div>
                  <h1 className="text-danger">
                    <FormattedMessage id={'verify.titleFailed'} />
                  </h1>
                  <p className="text-danger">
                    <FormattedMessage id={'verify.DescriptionFailed'} />
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
