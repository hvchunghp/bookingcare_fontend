import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailsDoctor } from '../../../services/userService';

const mdParser = new MarkdownIt();
class manageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHTML: '',
      contentMarkdown: '',
      selectedDoctor: '',
      description: '',
      listDoctors: [],
      hasOldData: false,

      listProvince: [],
      listSpecialty: [],
      listClinic: [],

      selectedProvince: '',
      price: '',
      note: '',
      count: '',
      speicialtyId: '',
      selectedSpecialty: '',
      selectedClinic: '',
    };
  }
  componentDidMount() {
    this.props.fectchAllDoctors();
    this.props.getRequiredDoctorInfo();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      // let dataSelect = this.buildDataSelect(this.props.allDoctors);
      this.setState({
        listDoctors: this.buildDataSelect(this.props.allDoctors, 'USERS'),
      });
    }
    if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
      let { resProvince, resSpecialty, resClinic } =
        this.props.allRequiredDoctorInfo;
      let dataSelectProvince = this.buildDataSelect(resProvince, 'PROVINCE');
      let dataSelectSpecialty = this.buildDataSelect(resSpecialty, 'SPECIALTY');
      let dataSelectClinic = this.buildDataSelect(resClinic, 'CLINIC');
      this.setState({
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty,
        listClinic: dataSelectClinic,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };

  handleSaveContentMD = () => {
    let { hasOldData } = this.state;
    this.props.saveDetailsDoctors({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
      action: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

      selectedProvince: this.state.selectedProvince.value,
      price: this.state.price,
      note: this.state.note,
      count: this.state.count,
      specialtyId: this.state.selectedSpecialty.value,
      clinicId: this.state.selectedClinic.value,
    });
  };

  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
    let res = await getDetailsDoctor(selectedDoctor.value);
    let { listProvince, listSpecialty, listClinic } = this.state;
    if (
      res &&
      res.errCode === 0 &&
      res.data &&
      res.data.Markdown &&
      res.data.Markdown.description &&
      res.data.Markdown.contentMarkdown &&
      res.data.Markdown.contentHTML
    ) {
      let markdown = res.data.Markdown;

      let info = res.data.Doctor_info;

      let selectedProvince = '',
        selectedSpecialty = '',
        selectedClinic = '',
        price = '',
        note = '',
        count = '',
        provinces = '',
        specialty = '',
        clinic = '';

      if (info) {
        price = info.price;
        note = info.note;
        count = info.count;
        specialty = info.specialtyId;
        clinic = info.clinicId;
        provinces = info.provinces;
        selectedProvince = listProvince.find((item) => {
          return item && item.value === provinces;
        });
        selectedSpecialty = listSpecialty.find((item) => {
          return item && item.value === specialty;
        });
        selectedClinic = listClinic.find((item) => {
          return item && item.value === clinic;
        });
      }

      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,

        selectedProvince: selectedProvince,
        selectedSpecialty: selectedSpecialty,
        selectedClinic: selectedClinic,
        price: price,
        note: note,
        count: count,
      });
    } else {
      this.setState({
        contentHTML: '',
        contentMarkdown: '',
        description: '',
        hasOldData: false,

        selectedProvince: '',
        selectedSpecialty: '',
        selectedClinic: '',
        price: '',
        note: '',
        count: '',
      });
    }
  };

  handleChangeSelectDoctorInfo = async (selectedOpt, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOpt;
    this.setState({ ...stateCopy });
  };

  buildDataSelect = (inputData, type) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      if (type === 'USERS') {
        inputData.map((item, index) => {
          let object = {};
          object.label = `${item.lastName} ${item.firstName}`;
          object.value = item.id;
          result.push(object);
        });
      }

      if (type === 'PROVINCE') {
        inputData.map((item, index) => {
          let object = {};
          object.label = `${item.valueVi}`;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === 'SPECIALTY') {
        inputData.map((item, index) => {
          let object = {};
          object.label = `${item.name}`;
          object.value = item.id;
          result.push(object);
        });
      }

      if (type === 'CLINIC') {
        inputData.map((item, index) => {
          let object = {};
          object.label = `${item.name}`;
          object.value = item.id;
          result.push(object);
        });
      }
    }
    return result;
  };
  handleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  render() {
    let { hasOldData } = this.state;
    return (
      <div className="px-3">
        <div className="title pb-5">
          <FormattedMessage id={'manage-doctor.title'} />
        </div>
        <div className="more-info row">
          <div className="col-6 my-1">
            <label htmlFor="">
              <FormattedMessage id={'manage-doctor.selectDoctor'} />
            </label>
            <Select
              value={this.state.selectedDoctor}
              onChange={this.handleChangeSelect}
              options={this.state.listDoctors}
              placeholder={
                <FormattedMessage id={'manage-doctor.selectDoctor'} />
              }
            />
          </div>
          <div className="col-6 my-1">
            <label htmlFor="">
              <FormattedMessage id={'manage-doctor.introductionInformation'} />
            </label>
            <textarea
              name=""
              id=""
              rows="5"
              className="form-control"
              onChange={(event) =>
                this.handleOnChangeText(event, 'description')
              }
              value={this.state.description}
            ></textarea>
          </div>
          <div className="col-4 my-1">
            <label htmlFor="">
              <FormattedMessage id={'manage-doctor.examinationPrice'} />
            </label>
            <input
              type="number"
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, 'price')}
              value={this.state.price}
            />
          </div>
          <div className="col-4 my-1">
            <label htmlFor="">
              <FormattedMessage id={'manage-doctor.province'} />
            </label>
            <Select
              value={this.state.selectedProvince}
              onChange={this.handleChangeSelectDoctorInfo}
              options={this.state.listProvince}
              name="selectedProvince"
            />
          </div>
          <div className="col-4 my-1">
            <label htmlFor="">
              <FormattedMessage id={'manage-doctor.clinicName'} />
            </label>
            <Select
              value={this.state.selectedClinic}
              onChange={this.handleChangeSelectDoctorInfo}
              options={this.state.listClinic}
              name="selectedClinic"
            />
          </div>
          <div className="col-4 my-1">
            <label htmlFor="">
              <FormattedMessage id={'manage-doctor.specialty'} />
            </label>
            <Select
              value={this.state.selectedSpecialty}
              onChange={this.handleChangeSelectDoctorInfo}
              options={this.state.listSpecialty}
              name="selectedSpecialty"
            />
          </div>
          <div className="col-4 my-1">
            <label htmlFor="">
              <FormattedMessage id={'manage-doctor.note'} />
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, 'note')}
              value={this.state.note}
            />
          </div>
          <div className="col-4 my-1">
            <label htmlFor="">
              <FormattedMessage id={'manage-doctor.count'} />
            </label>
            <input
              type="number"
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, 'count')}
              value={this.state.count}
            />
          </div>
        </div>

        <br />
        <MdEditor
          style={{ height: '300px' }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={this.handleEditorChange}
          value={this.state.contentMarkdown}
        />
        {hasOldData ? (
          <button
            className="btn btn-warning my-3"
            onClick={() => this.handleSaveContentMD()}
          >
            Sửa thông tin
          </button>
        ) : (
          <button
            className="btn btn-primary my-3"
            onClick={() => this.handleSaveContentMD()}
          >
            Thêm thông tin
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
    fectchAllDoctors: () => dispatch(actions.fectchAllDoctors()),
    saveDetailsDoctors: (data) => dispatch(actions.saveDetailsDoctors(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(manageDoctor);
