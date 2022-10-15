import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { createClinic } from '../../../services/userService';
import { toast } from 'react-toastify';
const mdParser = new MarkdownIt();

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imgBase64: '',
      address: '',
      description: '',
      descriptionHTML: '',
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {}
  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      description: text,
    });
  };

  handleOnChangeImage = async (event) => {
    let file = event.target.files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objUrl = URL.createObjectURL(file);
      this.setState({
        previewImg: objUrl,
        imgBase64: base64,
      });
    }
  };
  handleSaveSpecialty = async () => {
    let res = await createClinic(this.state);
    if (res && res.errCode === 0) {
      toast.success('Create specialty successfully');
      this.setState({
        name: '',
        imgBase64: '',
        address: '',
        description: '',
        descriptionHTML: '',
      });
    } else {
      toast.error('Create specialty error');
    }
  };
  render() {
    return (
      <div className="m-5">
        <div className="text-center">
          <h1>Quản lý cơ sở khám chữa bệnh</h1>
        </div>
        <div className="row my-5">
          <div className="mb-3 col-4">
            <label htmlFor="specialtyInput" className="form-label">
              Tên cơ sở khám chữa bệnh
            </label>
            <input
              type="text"
              className="form-control"
              id="specialtyInput"
              value={this.state.name}
              onChange={(event) => this.handleOnChangeInput(event, 'name')}
            />
          </div>
          <div className="mb-3 col-4">
            <label htmlFor="specialtyInput" className="form-label">
              Địa chỉ
            </label>
            <input
              type="text"
              className="form-control"
              id="specialtyInput"
              value={this.state.address}
              onChange={(event) => this.handleOnChangeInput(event, 'address')}
            />
          </div>
          <div className="mb-3 col-4 row">
            <label htmlFor="formFile" className="form-label">
              Ảnh minh họa
            </label>
            <input
              type="file"
              id="formFile"
              onChange={(event) => this.handleOnChangeImage(event)}
            />
          </div>
        </div>
        <MdEditor
          style={{ height: '500px' }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={this.handleEditorChange}
          value={this.state.description}
        />
        <button
          className="btn btn-success my-3 px-3 d-flex align-items-center"
          onClick={() => this.handleSaveSpecialty()}
        >
          Lưu
        </button>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
