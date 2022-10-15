import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './userRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import { toast } from 'react-toastify';
import TableUserManage from './tableManageUser';
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      roleArr: [],
      positionArr: [],
      previewImg: '',
      isOpen: false,

      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
      gender: '',
      role: '',
      position: '',
      avatar: '',

      action: '',
      editUserId: '',
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    // this.props.getRoleStart();
    // this.props.dispatch(actions.getGenderStart());
    try {
      // let gender = await getAllCodeService('gender');
      let role = await getAllCodeService('role');
      let position = await getAllCodeService('position');
      if (role && role.errCode === 0 && position && position.errCode === 0) {
        this.setState({
          roleArr: role.data,
          positionArr: position.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({
        genderArr: this.props.genderRedux,
      });
    }
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
        phoneNumber: '',
        gender: '',
        role: '',
        position: '',
        avatar: '',

        action: CRUD_ACTIONS.CREATE,
        previewImg: '',
      });
    }
    //   if (prevProps.roleRedux !== this.props.roleRedux) {
    //     this.setState({
    //       roleArr: this.props.roleRedux,
    //     });
    //   }
  }
  handleOnChangeImage = async (event) => {
    let file = event.target.files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objUrl = URL.createObjectURL(file);
      this.setState({
        previewImg: objUrl,
        avatar: base64,
      });
    }
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = () => {
    let arrCheck = [
      'email',
      'password',
      'firstName',
      'lastName',
      'address',
      'phoneNumber',
      'gender',
      'role',
      'position',
    ];
    let isValid = true;
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        toast.error('Missing input: ' + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid) {
      let { action } = this.state;
      if (action === CRUD_ACTIONS.EDIT) {
        this.props.editAUserRedux({
          id: this.state.editUserId,
          email: this.state.email,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          address: this.state.address,
          phoneNumber: this.state.phoneNumber,
          gender: this.state.gender,
          roleId: this.state.role,
          positionId: this.state.position,
          avatar: this.state.avatar,
        });
      }
      if (action === CRUD_ACTIONS.CREATE) {
        this.props.saveNewUser({
          email: this.state.email,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          address: this.state.address,
          phoneNumber: this.state.phoneNumber,
          gender: this.state.gender,
          roleId: this.state.role,
          positionId: this.state.position,
          avatar: this.state.avatar,
        });
      }
    }
  };
  handleEditUserFromParent = (user) => {
    let imageBase64 = '';
    if (user.image) {
      imageBase64 = new Buffer(user.image, 'base64').toString('binary');
    }
    this.setState({
      email: user.email,
      password: 'HIDEPASSWORD',
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      role: user.roleId,
      position: user.positionId,
      avatar: imageBase64,
      previewImg: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      editUserId: user.id,
    });
  };
  render() {
    // console.log('check props from redux:', this.props.genderRedux);
    let genders = this.state.genderArr;
    let language = this.props.language;
    let roles = this.state.roleArr;
    let positions = this.state.positionArr;
    let { previewImg } = this.state;
    let { isLoadingGender } = this.props;
    let {
      email,
      password,
      firstName,
      lastName,
      address,
      phoneNumber,
      gender,
      role,
      position,
    } = this.state;
    // console.log('check state', this.state);
    return (
      <div className="d-flex justify-content-center w-100 h-100">
        {isLoadingGender ? (
          <>
            <div
              className="position-absolute d-flex align-items-center justify-content-center bg-dark"
              style={{ width: '100vw', height: 'calc(100vh - 40px)' }}
            >
              <div
                className="spinner-border text-light position-absolute"
                style={{ width: '15rem', height: '15rem' }}
                role="status"
              ></div>
              <h1 className="text-light">Loading...</h1>
            </div>
          </>
        ) : (
          <div className="container">
            <div className="title">react redux</div>
            <div className="body">
              <div className="add container">
                <div className="row align-center">
                  <div className="col-12 mt-3">
                    <h3>
                      <FormattedMessage id="manage-user.add" />
                    </h3>
                  </div>
                  <div className="form-group col-6">
                    <label>
                      <FormattedMessage id="manage-user.email" />
                    </label>
                    {this.state.action === CRUD_ACTIONS.EDIT ? (
                      <input
                        disabled
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event) => this.onChangeInput(event, 'email')}
                      />
                    ) : (
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event) => this.onChangeInput(event, 'email')}
                      />
                    )}
                  </div>
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <div className="form-group col-6">
                      <label>
                        <FormattedMessage id="manage-user.password" />
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        disabled
                        value={password}
                        onChange={(event) =>
                          this.onChangeInput(event, 'password')
                        }
                      />
                    </div>
                  ) : (
                    <div className="form-group col-6">
                      <label>
                        <FormattedMessage id="manage-user.password" />
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) =>
                          this.onChangeInput(event, 'password')
                        }
                      />
                    </div>
                  )}
                  <div className="form-group col-6">
                    <label>
                      <FormattedMessage id="manage-user.firstName" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      placeholder="First name"
                      value={firstName}
                      onChange={(event) =>
                        this.onChangeInput(event, 'firstName')
                      }
                    />
                  </div>
                  <div className="form-group col-6">
                    <label>
                      <FormattedMessage id="manage-user.lastName" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      placeholder="Last name"
                      value={lastName}
                      onChange={(event) =>
                        this.onChangeInput(event, 'lastName')
                      }
                    />
                  </div>
                  <div className="form-group col-9">
                    <label>
                      <FormattedMessage id="manage-user.address" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      placeholder="1234 Main St"
                      value={address}
                      onChange={(event) => this.onChangeInput(event, 'address')}
                    />
                  </div>
                  <div className="form-group col-3">
                    <label>
                      <FormattedMessage id="manage-user.phoneNumber" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={(event) =>
                        this.onChangeInput(event, 'phoneNumber')
                      }
                    />
                  </div>
                  <div className="form-group col-3">
                    <label>
                      <FormattedMessage id="manage-user.gender" />
                    </label>
                    <select
                      name="gender"
                      className="form-control"
                      onChange={(event) => this.onChangeInput(event, 'gender')}
                      value={gender}
                    >
                      <option selected disabled hidden value="">
                        {language === LANGUAGES.VI
                          ? 'Chọn giới tính'
                          : 'Choose the gender'}
                      </option>
                      {genders &&
                        genders.length > 0 &&
                        genders.map((item, index) => {
                          return (
                            <>
                              <option keyMap={index} value={item.keyMap}>
                                {language === LANGUAGES.VI
                                  ? item.valueVi
                                  : item.valueEn}
                              </option>
                            </>
                          );
                        })}
                    </select>
                  </div>
                  {/* roleArr */}
                  <div className="form-group col-3">
                    <label>
                      <FormattedMessage id="manage-user.role" />
                    </label>
                    <select
                      name="roleId"
                      className="form-control"
                      onChange={(event) => this.onChangeInput(event, 'role')}
                      value={role}
                    >
                      <option selected disabled hidden value="">
                        {language === LANGUAGES.VI
                          ? 'Chọn vai trò'
                          : 'Choose the role'}
                      </option>

                      {roles &&
                        roles.length > 0 &&
                        roles.map((item, index) => {
                          return (
                            <option keyMap={index} value={item.keyMap}>
                              {language === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="form-group col-3">
                    <label>
                      <FormattedMessage id="manage-user.position" />
                    </label>
                    <select
                      name="positionId"
                      className="form-control"
                      onChange={(event) =>
                        this.onChangeInput(event, 'position')
                      }
                      value={position}
                    >
                      <option selected disabled hidden value="">
                        {language === LANGUAGES.VI
                          ? 'Chọn chức vụ'
                          : 'Choose the position'}
                      </option>

                      {positions &&
                        positions.length > 0 &&
                        positions.map((item, index) => {
                          return (
                            <option keyMap={index} value={item.keyMap}>
                              {language === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="form-group col-3">
                    <div>Image</div>
                    <div className="privew-img-container row">
                      <div>
                        <input
                          type="file"
                          className="form-control"
                          name="image"
                          id="avatar"
                          hidden
                          onChange={(event) => this.handleOnChangeImage(event)}
                        />
                        <label
                          htmlFor="avatar"
                          className="label-upload"
                          style={{ width: '95px' }}
                        >
                          Tải ảnh <i className="fa-solid fa-upload" />
                        </label>
                      </div>
                      <div className="privew-img">
                        {previewImg ? (
                          <img
                            src={previewImg}
                            alt=""
                            onClick={() => this.setState({ isOpen: true })}
                          />
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <button
                  onClick={() => this.handleSaveUser()}
                  className={
                    this.state.action === CRUD_ACTIONS.EDIT
                      ? 'btn btn-warning d-flex align-items-center'
                      : 'btn btn-primary d-flex align-items-center'
                  }
                >
                  <FormattedMessage id="manage-user.save" />
                </button>
              </div>
            </div>
            {this.state.isOpen === true && (
              <Lightbox
                mainSrc={previewImg}
                onCloseRequest={() => this.setState({ isOpen: false })}
              />
            )}
            <div className="py-5">
              <TableUserManage
                handleEditUserFromParent={this.handleEditUserFromParent}
                action={this.state.action}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    // roleRedux: state.admin.roles,
    isLoadingGender: state.admin.isLoadingGender,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    // getRoleStart: () => dispatch(actions.fetchRoleStart()),
    saveNewUser: (data) => dispatch(actions.saveNewUser(data)),
    fetchUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
    editAUserRedux: (data) => dispatch(actions.UpdateAUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
