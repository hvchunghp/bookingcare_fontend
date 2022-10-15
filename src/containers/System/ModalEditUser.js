import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputGroupText,
  Input,
  Row,
  Col,
} from 'reactstrap';
import _ from 'lodash';
import { toast } from 'react-toastify';
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
      gender: '',
      roleId: '',
    };
  }

  componentDidMount() {
    let user = this.props.userInfo;
    console.log(user);
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: 'password cannot be displayed for security reasons',
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
        roleId: user.roleId,
      });
    }
  }

  toggle = () => {
    this.props.toggleUserModal();
  };

  handleOnChangeInput = (event, id) => {
    //bad code
    // this.state[id] = event.target.value;
    // this.setState(
    //   {
    //     ...this.state,
    //   },
    //   () => {
    //     console.log(this.state);
    //   }
    // );

    //good code
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({ ...copyState }, () => {
      console.log(this.state);
    });
  };

  checkValidateInput = (event) => {
    let isValid = true;
    let arrInput = [
      'email',
      'password',
      'firstName',
      'lastName',
      'address',
      'phoneNumber',
      'gender',
      'roleId',
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        toast.error('Missing parameter: ' + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      //call api create modal
      this.props.editUser(this.state);
      toast.success('Update success');
    }
  };

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.toggle} size="xl" centered>
        <ModalHeader toggle={this.toggle}> Edit new user </ModalHeader>
        <ModalBody className="p-5">
          <Row xs="2">
            <Col className="pb-3">
              <InputGroup>
                <InputGroupText> Email </InputGroupText>
                <Input
                  disabled
                  placeholder="Enter your email"
                  onChange={(event) => this.handleOnChangeInput(event, 'email')}
                  value={this.state.email}
                />
              </InputGroup>
            </Col>
            <Col className="pb-3">
              <InputGroup>
                <InputGroupText> Password </InputGroupText>
                <Input
                  disabled
                  type="password"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, 'password')
                  }
                  value={this.state.password}
                />
              </InputGroup>
            </Col>
            <Col className="pb-3">
              <InputGroup>
                <InputGroupText> First name </InputGroupText>
                <Input
                  placeholder="Enter your first name"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, 'firstName')
                  }
                  value={this.state.firstName}
                />
              </InputGroup>
            </Col>
            <Col className="pb-3">
              <InputGroup>
                <InputGroupText> Last name </InputGroupText>
                <Input
                  placeholder="Enter your last name"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, 'lastName')
                  }
                  value={this.state.lastName}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className="pb-3">
            <InputGroup>
              <InputGroupText> Address </InputGroupText>
              <Input
                placeholder="Enter your address"
                onChange={(event) => this.handleOnChangeInput(event, 'address')}
                value={this.state.address}
              />
            </InputGroup>
          </Row>
          <Row>
            <Col xs={6} md={12} className="pb-3">
              <InputGroup>
                <InputGroupText> Phone number </InputGroupText>
                <Input
                  placeholder="Enter your phone number"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, 'phoneNumber')
                  }
                  value={this.state.phoneNumber}
                />
              </InputGroup>
            </Col>
            <Col xs={3} md={6}>
              <InputGroup>
                <InputGroupText> Gender </InputGroupText>
                <Input
                  name="gender"
                  type="select"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, 'gender')
                  }
                  value={this.state.gender}
                >
                  <option hidden selected>
                    Choose your gender
                  </option>
                  <option value="M"> Male </option>
                  <option value="F"> Female </option>
                </Input>
              </InputGroup>
            </Col>
            <Col xs={3} md={6} className="pb-3">
              <InputGroup>
                <InputGroupText> Role </InputGroupText>
                <Input
                  name="roleId"
                  type="select"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, 'roleId')
                  }
                  value={this.state.roleId}
                >
                  <option hidden selected>
                    Choose role
                  </option>
                  <option value="R1"> Admin </option>
                  <option value="R2"> Doctor </option>
                  <option value="R3"> Patient </option>
                </Input>
              </InputGroup>
            </Col>
          </Row>
          <a href="!" style={{ textDecoration: 'none' }}>
            Forgot password
          </a>
        </ModalBody>
        <ModalFooter>
          <Button
            className="close-btn"
            color="primary"
            onClick={() => {
              this.handleSaveUser();
            }}
          >
            Save changes
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
