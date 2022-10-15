import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { getDetailsDoctor } from '../../../services/userService';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { LANGUAGES, dateFormat } from '../../../../src/utils';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { saveBulkSchedules } from '../../../services/userService';
class DoctorManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      currenDoctorId: this.props.userInfo.id,
      currentDate: '',
      rangeTime: [],
    };
  }

  componentDidMount() {
    this.props.fectchAllDoctors();
    this.props.fectchAllSchedules();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      // let dataSelect = this.buildDataSelect(this.props.allDoctors);
      this.setState({
        listDoctors: this.buildDataSelect(this.props.allDoctors),
      });
    }
    if (prevProps.allSchedules !== this.props.allSchedules) {
      let data = this.props.allSchedules;
      if (data && data.length > 0) {
        // data = data.map(item => {
        //     item.isSelected = false;
        //     return item;
        // })
        data = data.map((item) => ({ ...item, isSelected: false }));
      }

      this.setState({
        rangeTime: data,
      });
    }
  }

  buildDataSelect = (inputData) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        object.label = `${item.lastName} ${item.firstName}`;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };

  handleClickButton = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.keyMap === time.keyMap) item.isSelected = !item.isSelected;
        return item;
      });
      this.setState({
        rangeTime: rangeTime,
      });
    }
  };

  handleSaveShedule = async () => {
    let { rangeTime, currenDoctorId, currentDate } = this.state;
    console.log(currenDoctorId);
    let result = [];
    let formatedDate = new Date(currentDate).getTime();

    // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);

    if (!currenDoctorId) {
      toast.error('Please choose doctor!!!');
      return;
    } else if (!currentDate) {
      toast.error('Missing date!!!');
      return;
    } else if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected);
      if (selectedTime && selectedTime.length >= 0) {
        selectedTime.map((schedule, index) => {
          let object = {};
          object.doctorId = currenDoctorId;
          object.date = formatedDate;
          object.timeType = schedule.keyMap;
          result.push(object);
        });
        toast.success('Updated successfully');
      } else {
        toast.error('Updated failed');
        return;
      }
      let res = await saveBulkSchedules({
        arrSchedules: result,
        doctorId: currenDoctorId,
        formatedDate: formatedDate,
      });
    }
  };

  render() {
    let { rangeTime } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className="title">
          <FormattedMessage id={'manage-schedule.title'} />
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-3 form-group">
              <label htmlFor="">
                <FormattedMessage id={'manage-schedule.selectDate'} />
              </label>
              <DatePicker
                className="form-control"
                onChange={this.handleOnChangeDatePicker}
                value={this.state.currentDate}
                minDate={new Date().setDate(new Date().getDate() - 1)}
              />
            </div>
            <div className="col-9 pick-hour my-3 d-flex flex-wrap">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button
                      className={
                        item.isSelected
                          ? 'btn btn-success m-2 d-flex align-items-center justify-content-center'
                          : 'btn btn-secondary m-2 d-flex align-items-center justify-content-center'
                      }
                      key={index}
                      onClick={() => this.handleClickButton(item)}
                    >
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </button>
                  );
                })}
            </div>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => this.handleSaveShedule()}
          >
            <FormattedMessage id={'manage-schedule.buttonSave'} />
          </button>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DoctorManageSchedule);
