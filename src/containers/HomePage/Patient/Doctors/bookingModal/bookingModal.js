import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './bookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../profileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../../components/Input/DatePicker';
import * as actions from '../../../../../store/actions';
import { LANGUAGES } from '../../../../../utils';
import Select from 'react-select';
import { postPatientBookAppointment } from '../../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment/moment';
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      phoneNumber: '',
      email: '',
      address: '',
      reason: '',
      birthDate: '',
      selectedGender: '',
      gender: '',
      doctorId: '',
      timeType: '',
    };
  }

  async componentDidMount() {
    this.props.getGender();
  }
  builDataGender = (data) => {
    let result = [];
    let language = this.props.language;

    if (data && data.length > 0) {
      data.map((item) => {
        let obj = {};
        obj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        obj.value = item.keyMap;
        result.push(obj);
      });
    }
    return result;
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        gender: this.builDataGender(this.props.gender),
      });
    }
    if (this.props.gender !== prevProps.gender) {
      this.setState({
        gender: this.builDataGender(this.props.gender),
      });
    }
    if (this.props.dataScheduleTime !== prevProps.dataScheduleTime) {
      if (
        this.props.dataScheduleTime &&
        !_.isEmpty(this.props.dataScheduleTime)
      ) {
        let doctorId = this.props.dataScheduleTime.doctorId;
        let timeType = this.props.dataScheduleTime.timeType;
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        });
      }
    }
  }
  handleOnChangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      birthDate: date[0],
    });
  };

  handleConfirmBooking = async () => {
    let timeString = this.buildTimeBooking(this.props.dataScheduleTime);
    let doctorName = this.buildDoctorName(this.props.dataScheduleTime);
    let dob = new Date(this.state.birthDate).getTime();
    let res = await postPatientBookAppointment({
      fullname: this.state.fullname,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: this.props.dataScheduleTime.date,
      dob: dob,
      gender: this.state.selectedGender.value,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
    });
    if (res && res.errCode === 0) {
      toast.success('Booking a new appointment successfully');
      this.props.closeModal();
      this.setState({
        fullname: '',
        phoneNumber: '',
        email: '',
        address: '',
        reason: '',
        birthDate: '',
        selectedGender: '',
      });
    } else {
      toast.error('Booking a new appointment failed');
    }
  };
  handleChangeSelect = (selectOpt) => {
    this.setState({
      selectedGender: selectOpt,
    });
  };

  buildTimeBooking = (dataScheduleTime) => {
    let { language } = this.props;
    if (dataScheduleTime && !_.isEmpty(dataScheduleTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataScheduleTime.timeTypeData.valueVi
          : dataScheduleTime.timeTypeData.valueEn;

      let date =
        language === LANGUAGES.VI
          ? moment
              .unix(+dataScheduleTime.date / 1000)
              .format('dddd - DD/MM/YYYY')
          : moment
              .unix(+dataScheduleTime.date / 1000)
              .locale('en')
              .format('dddd - DD/MM/YYYY');

      return `${time} - ${date}`;
    }
    return ``;
  };
  buildDoctorName = (dataScheduleTime) => {
    if (dataScheduleTime && !_.isEmpty(dataScheduleTime)) {
      let name = `${dataScheduleTime.doctorData.lastName} ${dataScheduleTime.doctorData.firstName}`;
      return `${name}`;
    }
    return ``;
  };

  convertTime = (time) => {
    let timeStamp = time / 1000;
    let date = new Date(timeStamp * 1000);
    let currentMonth = date.getMonth() + 1;
    let formatted_date =
      date.getDate() + '/' + currentMonth + '/' + date.getFullYear();
    return formatted_date;
  };
  render() {
    let { isOpenModal, closeModal, dataScheduleTime, language } = this.props;
    let doctorId = ``;
    if (dataScheduleTime && !_.isEmpty(dataScheduleTime)) {
      doctorId = dataScheduleTime.doctorId;
    } else {
      doctorId = ``;
    }

    return (
      <>
        <Modal
          isOpen={isOpenModal}
          className="booking-modal-container"
          size="lg"
          centered
        >
          <div className="p-2 booking-modal-header bg-primary text-white d-flex justify-content-between align-items-center">
            <b className="">
              <FormattedMessage id={'booking-appointment.title'} />
            </b>
            <button className="btn text-white border-0" onClick={closeModal}>
              <i className="fa-solid fa-x" />
            </button>
          </div>

          <div className="booking-modal-content p-3">
            <div className="doctor-info">
              <ProfileDoctor
                doctorId={doctorId}
                dataScheduleTime={dataScheduleTime}
              />
            </div>
            <div className="d-flex">
              <b>
                <FormattedMessage id={'booking-appointment.time'} />: &ensp;
              </b>
              {language === LANGUAGES.VI ? (
                <b className="text-secondary">
                  {dataScheduleTime && dataScheduleTime.timeTypeData
                    ? dataScheduleTime.timeTypeData.valueVi
                    : ''}
                </b>
              ) : (
                <b className="text-secondary">
                  {dataScheduleTime && dataScheduleTime.timeTypeData
                    ? dataScheduleTime.timeTypeData.valueEn
                    : ''}
                </b>
              )}
              <span className="mx-2"></span>
              <b className="text-secondary">
                {this.convertTime(dataScheduleTime.date)}
              </b>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-6 my-1">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInputGrid"
                    placeholder="..."
                    value={this.state.fullname}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, 'fullname')
                    }
                  />
                  <label htmlFor="floatingInputGrid">
                    <FormattedMessage id={'booking-appointment.fullname'} />
                  </label>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-6 my-1">
                <div className="form-floating">
                  <input
                    type="tel"
                    className="form-control"
                    id="floatingInputGrid"
                    placeholder="..."
                    value={this.state.phoneNumber}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, 'phoneNumber')
                    }
                  />
                  <label htmlFor="floatingInputGrid">
                    <FormattedMessage id={'booking-appointment.phoneNumber'} />
                  </label>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-6 my-1">
                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInputGrid"
                    placeholder="..."
                    value={this.state.email}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, 'email')
                    }
                  />
                  <label htmlFor="floatingInputGrid">
                    <FormattedMessage id={'booking-appointment.email'} />
                  </label>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-6 my-1">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInputGrid"
                    placeholder="..."
                    value={this.state.address}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, 'address')
                    }
                  />
                  <label htmlFor="floatingInputGrid">
                    <FormattedMessage id={'booking-appointment.address'} />
                  </label>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-6 my-1">
                <div className="form-floating">
                  <DatePicker
                    className="form-control"
                    onChange={this.handleOnChangeDatePicker}
                    value={this.state.birthDate}
                  />
                  <label htmlFor="floatingSelectGrid">
                    <FormattedMessage id={'booking-appointment.dob'} />
                  </label>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-6 my-1">
                <div className="form-floating">
                  <div className="form-floating">
                    <Select
                      value={this.state.selectedGender}
                      onChange={this.handleChangeSelect}
                      options={this.state.gender}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 my-1">
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="..."
                    id="floatingTextarea2"
                    style={{ height: 100 }}
                    value={this.state.reason}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, 'reason')
                    }
                  />
                  <label htmlFor="floatingTextarea2">
                    <FormattedMessage id={'booking-appointment.Description'} />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="booking-modal-footer p-2 border border-black d-flex justify-content-end">
            <div className="d-flex">
              <button
                className="mx-2 btn btn-primary d-flex align-items-center"
                onClick={() => this.handleConfirmBooking()}
              >
                <FormattedMessage id={'booking-appointment.confirm'} />
              </button>
              <button
                onClick={closeModal}
                className="btn btn-secondary d-flex align-items-center"
              >
                <FormattedMessage id={'booking-appointment.close'} />
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    gender: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGender: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
