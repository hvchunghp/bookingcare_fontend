import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './userManage.scss';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';
import {
  getAllUsers,
  createNewUser,
  deleteUser,
  editUserService,
} from '../../services/userService';
import { reject } from 'lodash';
import { toast } from 'react-toastify';

class UserManage extends Component {
  constructor(props) {
    super(props);
    // props = property ;  nested
    this.state = {
      arrUsers: [],
      isOpenModal: false,
      isOpenEditModal: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUsers();
  }

  getAllUsers = async () => {
    let response = await getAllUsers('All');
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };

  toggleEditUserModal = () => {
    this.setState({
      isOpenEditModal: !this.state.isOpenEditModal,
    });
  };

  createNewUser = async (data) => {
    try {
      let response = await createNewUser(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUsers();
        this.setState({
          isOpenModal: false,
          isOpenEditModal: false,
        });
        emitter.emit('clear_modal_data');
      }
    } catch (error) {
      reject(error);
    }
  };
  handleDeleteUser = async (user) => {
    try {
      let res = await deleteUser(user.id);
      if (res && res.errCode === 0) {
        // alert('Delete user success!');
        await this.getAllUsers();
        toast.success('Delete success!');
      } else {
        toast.error(res.errMessage);
      }
    } catch (error) {
      reject(error);
    }
  };

  handleEditUser = (user) => {
    this.setState({
      isOpenEditModal: true,
      userEdit: user,
    });
  };

  handleSaveEditUser = async (user) => {
    try {
      let res = await editUserService(user);
      if (res && res.errCode === 0) {
        this.setState({
          isOpenEditModal: false,
        });

        await this.getAllUsers();
      } else {
        toast.error(res.errMessage);
      }
    } catch (error) {
      reject(error);
    }
  };
  /** Life cycle
   * Run component:
   * 1. run constructor -> init state
   * 2. did mount (set state): born; unmount
   * 3. render (re-render)
   */
  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <>
        <div className="container">
          <ModalUser
            //truyền props từ cha sang con
            isOpen={this.state.isOpenModal}
            toggleUserModal={this.toggleUserModal}
            createNewUser={this.createNewUser}
          />
          {this.state.isOpenEditModal && (
            <ModalEditUser
              isOpen={this.state.isOpenEditModal}
              toggleUserModal={this.toggleEditUserModal}
              userInfo={this.state.userEdit}
              editUser={this.handleSaveEditUser}
            />
          )}
          <div className="title text-center"> Manage users </div>
        </div>
        <div className="users-table container">
          <button
            className="btn btn-primary my-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fa-solid fa-plus" /> &nbsp; <b> Add new user </b>
          </button>
          <table id="customers">
            <tbody>
              <tr>
                <th className="col-2"> Email </th>
                <th className="col-1"> First name </th>
                <th className="col-1"> Last name </th>
                <th className="col-1"> Gender </th>
                <th className="col-1"> Role </th>
                <th className="col-2"> Address </th>
                <th className="col-2"> Phone number </th>
                <th className="col-1"> Action </th>
              </tr>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr>
                      <td> {item.email} </td>
                      <td> {item.firstName} </td>
                      <td> {item.lastName} </td>
                      <td> {item.gender} </td>
                      <td> {item.roleId} </td>
                      <td> {item.address} </td>
                      <td> {item.phoneNumber} </td>
                      <td>
                        <button
                          className="btn btn-edit"
                          onClick={() => this.handleEditUser(item)}
                        >
                          <i className="fa-solid fa-pencil" />
                        </button>
                        <button
                          className="btn btn-delete"
                          onClick={() => this.handleDeleteUser(item)}
                        >
                          <i className="fa-solid fa-trash-can" />
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
