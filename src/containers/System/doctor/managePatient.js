import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { LANGUAGES, dateFormat } from '../../../utils';
import { toast } from 'react-toastify';
import _ from 'lodash';
import {
  getPatientAppointment,
  updateStatusBooking,
} from '../../../services/userService';
class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf('day').valueOf(),
      patientData: [],
    };
  }

  async componentDidMount() {
    let { currentDate } = this.state;
    let { userInfo } = this.props;
    let formattedDate = new Date(currentDate).getTime();
    this.getdataPatient(userInfo, formattedDate);
  }

  getdataPatient = async (userInfo, formattedDate) => {
    let res = await getPatientAppointment({
      doctorId: userInfo.id,
      date: formattedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        patientData: res.data,
      });
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {}
  handleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      () => {
        let { currentDate } = this.state;
        let { userInfo } = this.props;
        let formattedDate = new Date(currentDate).getTime();
        this.getdataPatient(userInfo, formattedDate);
      }
    );
  };
  convertDob = (dateInput) => {
    let ts = dateInput * 1000;
    let timeStamp = ts / 1000;
    let date_ob = new Date(timeStamp);
    let year = date_ob.getFullYear();
    var month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
    var date = ('0' + date_ob.getDate()).slice(-2);
    return date + '/' + month + '/' + year;
  };

  handleAction = async (data) => {
    try {
      let res = await updateStatusBooking(data);
      if (res && res.errCode === 0) {
        let { currentDate } = this.state;
        let { userInfo } = this.props;
        let formattedDate = new Date(currentDate).getTime();
        this.getdataPatient(userInfo, formattedDate);
      }
    } catch (error) {}
  };
  render() {
    let { patientData } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className="title">
          <FormattedMessage id={'menu.doctor.manage-patient'} />
        </div>
        <div className="container">
          <div className="col-6 form-group">
            <label htmlFor="">
              <FormattedMessage id={'manage-schedule.selectDate'} />
            </label>
            <DatePicker
              className="form-control"
              onChange={this.handleOnChangeDatePicker}
              value={this.state.currentDate}
            />
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">
                  <FormattedMessage id={'manage-schedule.PatientID'} />
                </th>
                <th scope="col">
                  <FormattedMessage id={'manage-schedule.PatientID'} />
                </th>
                <th scope="col">
                  <FormattedMessage id={'manage-schedule.fullname'} />
                </th>
                <th scope="col">
                  <FormattedMessage id={'manage-schedule.phoneNumber'} />
                </th>
                <th scope="col">
                  <FormattedMessage id={'manage-schedule.DoB'} />
                </th>
                <th scope="col">
                  <FormattedMessage id={'manage-schedule.gender'} />
                </th>
                <th scope="col">
                  <FormattedMessage id={'manage-schedule.time'} />
                </th>
                <th scope="col">
                  <FormattedMessage id={'manage-schedule.status'} />
                </th>
                <th scope="col">
                  <FormattedMessage id={'manage-schedule.action'} />
                </th>
              </tr>
            </thead>
            <tbody>
              {patientData &&
                patientData.length > 0 &&
                patientData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{item.patientId}</th>
                      <td>{item.fullname}</td>
                      <td>{item.email}</td>
                      <td>{item.phoneNumber}</td>
                      <td>{this.convertDob(item.dob)}</td>
                      {language === LANGUAGES.VI ? (
                        <>
                          <td>{item.timeTypeDataPatient.valueVi}</td>
                          <td>{item.genderDataPatient.valueVi}</td>
                          <td>{item.statusPatient.valueVi}</td>
                        </>
                      ) : (
                        <>
                          <td>{item.timeTypeDataPatient.valueEn}</td>
                          <td>{item.genderDataPatient.valueEn}</td>
                          <td>{item.statusPatient.valueEn}</td>
                        </>
                      )}
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            this.handleAction({ id: item.id, status: 'S3' })
                          }
                        >
                          <FormattedMessage id={'manage-schedule.done'} />
                        </button>
                        <button
                          className="btn btn-danger mx-2"
                          onClick={() =>
                            this.handleAction({ id: item.id, status: 'S4' })
                          }
                        >
                          <FormattedMessage id={'manage-schedule.cancel'} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allSchedules: state.admin.allSchedules,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fectchAllDoctors: () => dispatch(actions.fectchAllDoctors()),
    fectchAllSchedules: () => dispatch(actions.fectchAllSchedules()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
