import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/admin/UserRedux';
import ManageDoctor from '../containers/System/admin/manageDoctor';
import Header from '../containers/Header/Header';
import manageSpecialty from '../containers/System/specialty/manage-specialty';
import manageClinic from '../containers/System/clinic/manage-clinic';
import manageSchedule from '../containers/System/admin/manageSchedule';
class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/system/user-manage" component={UserManage} />
              <Route path="/system/manage-doctor" component={ManageDoctor} />
              <Route path="/system/user-redux" component={UserRedux} />
              <Route
                path="/system/schedule-manage"
                component={manageSchedule}
              />

              <Route
                path="/system/manage-specialty"
                component={manageSpecialty}
              />
              <Route path="/system/manage-clinic" component={manageClinic} />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
