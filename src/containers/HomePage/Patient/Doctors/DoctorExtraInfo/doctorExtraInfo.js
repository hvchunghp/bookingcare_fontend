import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getExtraInfoById } from '../../../../../services/userService';
import './doctorExtraInfo.scss';
class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      extraInfo: [],
      clinicData: [],
    };
  }

  async componentDidMount() {
    if (this.props.doctorId) {
      let res = await getExtraInfoById(this.props.doctorId);

      if (res && res.errCode === 0) {
        this.setState({
          extraInfo: res.data,
          clinicData: res.clinicData,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorId !== prevProps.doctorId) {
      let res = await getExtraInfoById(this.props.doctorId);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfo: res.data,
          clinicData: res.clinicData,
        });
      }
    }
  }

  render() {
    let { extraInfo, clinicData } = this.state;
    return (
      <>
        <div className="container">
          <div className="content-up row border-bottom p-1">
            <h5 className="title-clinic">
              <FormattedMessage id={'manage-schedule.titleAddress'} />
            </h5>
            <h5>{clinicData.name}</h5>
            <span>
              {' '}
              <FormattedMessage id={'manage-schedule.clinicAddress'} />:{' '}
              {clinicData.address}
            </span>
          </div>
          <div className="content-down p-1">
            <div className="cost ">
              <span>
                {' '}
                <FormattedMessage id={'manage-schedule.cost'} />:{' '}
              </span>
              <b>
                {new Intl.NumberFormat('vn-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(extraInfo.price)}
              </b>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
