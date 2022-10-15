import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux';
import { ToastContainer } from 'react-toastify';
import DetailsDoctor from './HomePage/Patient/Doctors/DetailsDoctor';
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from '../hoc/authentication';
import { path } from '../utils';
import Home from '../routes/Home';
// import Login from '../routes/Login';
import Login from './Auth/Login';
import System from '../routes/System';
import { CustomToastCloseButton } from '../components/CustomToast';
import HOMEPAGE from './HomePage/HomePage';
import CustomScrollbars from '../components/CustomScrollbars';
import Doctor from '../routes/Doctor';
import verifyEmail from './HomePage/Patient/verifyEmail';
import detailSpecialty from './HomePage/Patient/Doctors/Schedule/detailSpecialty';
import detailClinic from './HomePage/Patient/Doctors/Schedule/detailClinic';

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Router history={history}>
        <div className="main-container">
          <div className="content-container">
            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
              <Switch>
                <Route path={path.HOME} exact component={Home} />
                <Route
                  path={path.LOGIN}
                  component={userIsNotAuthenticated(Login)}
                />
                <Route
                  path={path.SYSTEM}
                  component={userIsAuthenticated(System)}
                />
                <Route path={path.HOMEPAGE} component={HOMEPAGE} />
                <Route path={path.DETAIL_DOCTOR} component={DetailsDoctor} />
                <Route
                  path={path.DETAIL_SPECIALTY}
                  component={detailSpecialty}
                />
                <Route path={path.DETAIL_CLINIC} component={detailClinic} />
                <Route
                  path={'/doctor/'}
                  component={userIsAuthenticated(Doctor)}
                />
                <Route
                  path={path.VERIFY_EMAIL_BOOKING}
                  component={verifyEmail}
                />
              </Switch>
            </CustomScrollbars>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
