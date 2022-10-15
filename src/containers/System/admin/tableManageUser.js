import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './tableUserManage.scss';
import * as actions from '../../../store/actions';
import 'react-markdown-editor-lite/lib/index.css';

class TableUserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
    };
  }

  componentDidMount() {
    this.props.fetchUsersRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        usersRedux: this.props.listUsers,
      });
    }
  }
  handleDeleteUser = (user) => {
    this.props.DeleteAUserRedux(user.id);
  };
  handleEditUser = (user) => {
    this.props.handleEditUserFromParent(user);
  };
  render() {
    let { usersRedux } = this.state;
    return (
      <>
        <div className="users-table">
          <table id="customers2">
            <tbody>
              <tr>
                <th className="col-2"> Email </th>
                <th className="col-1"> First name </th>
                <th className="col-1"> Last name </th>
                <th className="col-1"> Gender </th>
                <th className="col-1"> Role </th>
                <th className="col-1"> Position </th>
                <th className="col-2"> Address </th>
                <th className="col-2"> Phone number </th>
                <th className="col-1"> Action </th>
              </tr>
              {usersRedux &&
                usersRedux.length > 0 &&
                usersRedux.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td> {item.email} </td>
                      <td> {item.firstName} </td>
                      <td> {item.lastName} </td>
                      <td> {item.gender} </td>
                      <td> {item.roleId} </td>
                      <td> {item.positionId} </td>
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
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
    DeleteAUserRedux: (id) => dispatch(actions.DeleteAUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUserManage);
