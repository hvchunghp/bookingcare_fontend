import actionTypes from './actionTypes';
import {
  getAllCodeService,
  createNewUser,
  getAllUsers,
  deleteUser,
  editUserService,
  getDoctorService,
  getAllDoctorService,
  saveDoctorDetails,
  getAllSpecialty,
  getAllClinic,
} from '../../services/userService';
import { toast } from 'react-toastify';

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await getAllCodeService('GENDER');
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      dispatch(fetchGenderFailed());
      console.log(error);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

// export const fetchRoleSuccess = (roleData) => ({
//   type: actionTypes.FETCH_ROLE_SUCCESS,
//   data: roleData,
// });

// export const fetchRoleFailed = () => ({
//   type: actionTypes.FETCH_ROLE_FAILED,
// });

// export const fetchRoleStart = () => {
//   return async (dispatch, getState) => {
//     try {
//       let res = await getAllCodeService('ROLE');
//       if (res && res.errCode === 0) {
//         dispatch(fetchRoleSuccess(res.data));
//       } else {
//         dispatch(fetchRoleFailed());
//       }
//     } catch (error) {
//       dispatch(fetchRoleFailed());
//       console.log(error);
//     }
//   };
// };

export const saveNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUser(data);
      if (res && res.errCode === 0) {
        toast.success('Create new user success');
        dispatch(saveUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error(res.errMessage);
        dispatch(saveUserFailed());
      }
    } catch (e) {
      dispatch(saveUserFailed());
      console.log(e);
    }
  };
};

export const saveUserSuccess = () => ({
  type: actionTypes.SAVE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
  type: actionTypes.SAVE_USER_FAILED,
});

export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers('All');
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users));
      } else {
        dispatch(fetchAllUsersFailed());
      }
    } catch (error) {
      dispatch(fetchAllUsersFailed());
      console.log(error);
    }
  };
};

export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});

export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const DeleteAUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUser(userId);
      if (res && res.errCode === 0) {
        toast.success('Delete user success');
        dispatch(DeleteAUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.success('Delete user fail');
        dispatch(DeleteAUserFailed());
      }
    } catch (e) {
      dispatch(DeleteAUserFailed());
      console.log(e);
    }
  };
};

export const DeleteAUserSuccess = () => ({
  type: actionTypes.FETCH_DELETE_USERS_SUCCESS,
});

export const DeleteAUserFailed = () => ({
  type: actionTypes.FETCH_DELETE_USERS_FAILED,
});

export const UpdateAUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      if (res && res.errCode === 0) {
        toast.success('Update user success');
        dispatch(UpdateAUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        // toast.error('Update user fail');
        toast.error(res.errMessage);
        dispatch(UpdateAUserFailed());
      }
    } catch (e) {
      dispatch(UpdateAUserFailed());
      console.log(e);
    }
  };
};

export const UpdateAUserSuccess = () => ({
  type: actionTypes.FETCH_UPDATE_USERS_SUCCESS,
});

export const UpdateAUserFailed = () => ({
  type: actionTypes.FETCH_UPDATE_USERS_FAILED,
});

export const fectchDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getDoctorService('5');
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_DOCTOR_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_DOCTOR_FAILED,
        });
      }
    } catch (e) {
      console.log('FETCH_DOCTOR_FAILED: ', e);
    }
  };
};

export const fectchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctorService();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
        });
      }
    } catch (e) {
      console.log('FETCH_ALL_DOCTOR_FAILED: ', e);
    }
  };
};

export const saveDetailsDoctors = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDoctorDetails(data);
      if (res && res.errCode === 0) {
        toast.success('Save info doctor success');
        dispatch({
          type: actionTypes.SAVE_DETAILS_DOCTOR_SUCCESS,
        });
      } else {
        toast.error('Save info doctor failed');
        dispatch({
          type: actionTypes.SAVE_DETAILS_DOCTOR_FAILED,
        });
      }
    } catch (e) {
      console.log('SAVE_DETAILS_DOCTOR_FAILED: ', e);
    }
  };
};

export const fectchAllSchedules = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService('TIME');
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_FAILED,
        });
      }
    } catch (e) {
      console.log('FETCH_ALLCODE_SCHEDULE_FAILED: ', e);
    }
  };
};

export const getRequiredDoctorInfo = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START,
      });

      let resProvince = await getAllCodeService('PROVINCE');
      let resSpecialty = await getAllSpecialty();
      let resClinic = await getAllClinic();

      if (
        resProvince &&
        resProvince.errCode === 0 &&
        resSpecialty &&
        resSpecialty.errCode === 0 &&
        resClinic &&
        resClinic.errCode === 0
      ) {
        let data = {
          resProvince: resProvince.data,
          resSpecialty: resSpecialty.data,
          resClinic: resClinic.data,
        };
        dispatch(fetchAllRequiredDoctorInfoSuccess(data));
      } else {
        dispatch(fetchAllRequiredDoctorInfoFailed());
      }
    } catch (error) {
      dispatch(fetchAllRequiredDoctorInfoFailed());
      console.log(error);
    }
  };
};

export const fetchAllRequiredDoctorInfoSuccess = (allRequiredData) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
  data: allRequiredData,
});

export const fetchAllRequiredDoctorInfoFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED,
});
