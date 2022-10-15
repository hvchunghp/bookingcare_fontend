import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './detailClinic.scss';
import HomeHeader from '../../../HomeHeader';
import DoctorSchedule from './doctorSchedule';
import DoctorExtraInfo from '../DoctorExtraInfo/doctorExtraInfo';
import ProfileDoctor from '../profileDoctor';
import { getDetailClinic } from '../../../../../services/userService';
import _ from 'lodash';

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      clinicDes: '',
      imageClinic: '',
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailClinic(id);
      if (res && res.errCode === 0) {
        let arrDoctor = res.arrDoctor;
        let arrDoctorId = [];
        if (arrDoctor && arrDoctor.length > 0) {
          arrDoctor.map((item) => {
            arrDoctorId.push(item.doctorId);
          });
        }
        this.setState({
          arrDoctorId: arrDoctorId,
          clinicDes: res.data.descriptionHTML,
          imageClinic: res.data.image,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { arrDoctorId, clinicDes, imageClinic } = this.state;

    return (
      <>
        <div style={{ backgroundColor: '#f5f5f5' }}>
          <div className="header sticky-top">
            <HomeHeader />
          </div>
          {clinicDes && !_.isEmpty(clinicDes) && (
            <>
              <div className="container my-5">
                <div className="d-flex align-items-center image-clinic border border-black rounded">
                  {imageClinic && (
                    <img src={imageClinic} alt="" style={{ width: '100%' }} />
                  )}
                </div>
              </div>
              <div
                className="container mt-3 p-3 bg-light border border-black rounded"
                dangerouslySetInnerHTML={{
                  __html: clinicDes,
                }}
              ></div>
            </>
          )}
          <div className="container py-5">
            {arrDoctorId &&
              arrDoctorId.length > 0 &&
              arrDoctorId.map((item, index) => {
                return (
                  <div
                    className="row border border-black rounded my-3 py-3 bg-light"
                    key={index}
                  >
                    <div className="col-lg-6 col-md-12 col-12">
                      <ProfileDoctor
                        doctorId={item}
                        // dataScheduleTime={dataScheduleTime}
                      />
                    </div>
                    <div className="col-lg-6 col-md-12 col-12">
                      <DoctorSchedule doctorId={item} />
                      <DoctorExtraInfo doctorId={item} />
                    </div>
                  </div>
                );
              })}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
