import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getScheduleDoctorByDate } from '../../../../../services/userService';
import { FormattedMessage } from 'react-intl';
import BookingModal from '../bookingModal/bookingModal';
import './doctorSchedules.scss';
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      schedules: [],
      isOpenModal: false,
      dataScheduleTime: [],
    };
  }

  async componentDidMount() {
    let { language } = this.props;
    let allDays = this.getArrDays(language);
    if (this.props.doctorId) {
      let res = await getScheduleDoctorByDate(
        this.props.doctorId,
        allDays[0].value
      );
      this.setState({
        schedules: res.data ? res.data : [],
      });
    }

    this.setState({
      allDays: allDays,
    });
  }

  getArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (this.props.language === LANGUAGES.VI) {
        if (i === 0) {
          let labelVi = moment(new Date()).add(i, 'days').format('DD/MM');
          object.label = `Hôm nay - ${labelVi}`;
        } else {
          let labelVi = this.capitalize(
            moment(new Date()).add(i, 'days').format('dddd - DD/MM')
          );
          object.label = labelVi;
        }
      } else {
        if (i === 0) {
          let labelVi = moment(new Date()).add(i, 'days').format('DD/MM');
          object.label = `Today - ${labelVi}`;
        } else {
          object.label = moment(new Date())
            .add(i, 'days')
            .locale('en')
            .format('ddd - DD/MM');
        }
      }
      object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
      allDays.push(object);
    }

    return allDays;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      let allDays = this.getArrDays(this.props.language);
      this.setState({
        allDays: allDays,
      });
    }
    if (this.props.doctorId !== prevProps.doctorId) {
      let allDays = this.getArrDays(this.props.language);
      let res = await getScheduleDoctorByDate(
        this.props.doctorId,
        allDays[0].value
      );
      this.setState({
        schedules: res.data ? res.data : [],
      });
    }
  }

  handleOnChangeSelect = async (event) => {
    if (this.props.doctorId && this.doctorId !== -1) {
      let date = event.target.value;
      let doctorId = this.props.doctorId;
      let res = await getScheduleDoctorByDate(doctorId, date);
      if (res && res.errCode === 0) {
        this.setState({
          schedules: res.data ? res.data : [],
        });
      }
    }
  };
  capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
  }
  handleClickChooseTime = (data) => {
    this.setState({
      isOpenModal: true,
    });
    this.setState({
      dataScheduleTime: data,
    });
  };
  closeModal = () => {
    this.setState({
      isOpenModal: false,
    });
  };
  render() {
    let { language } = this.props;
    let { allDays, schedules, isOpenModal, dataScheduleTime } = this.state;

    return (
      <>
        <div className="container">
          <div className="all-schedule">
            <select
              name=""
              id=""
              onChange={(event) => this.handleOnChangeSelect(event)}
            >
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-avalable-time">
            <div className="calendar py-3">
              <i className="fa-solid fa-calendar-days" />
              &nbsp;
              <span>
                <FormattedMessage id={'manage-schedule.examination-schedule'} />
              </span>
              <p>
                {schedules && schedules.length > 0 ? (
                  schedules.map((item, index) => {
                    let timeDisplay =
                      language === LANGUAGES.EN
                        ? item.timeTypeData.valueEn
                        : item.timeTypeData.valueVi;
                    return (
                      <>
                        <button
                          className="btn btn-warning p-3"
                          key={index}
                          onClick={() => {
                            this.handleClickChooseTime(item);
                          }}
                        >
                          {timeDisplay}
                        </button>
                      </>
                    );
                  })
                ) : (
                  <label className="py-3">
                    <FormattedMessage id={'manage-schedule.no-calendar'} />
                  </label>
                )}
              </p>
            </div>
          </div>
        </div>
        <BookingModal
          isOpenModal={isOpenModal}
          closeModal={this.closeModal}
          dataScheduleTime={dataScheduleTime}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
