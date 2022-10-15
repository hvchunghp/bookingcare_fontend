import actionTypes from '../actions/actionTypes';

const initialState = {
  isLoadingGender: false,
  genders: [],
  // roles: [],
  users: [],
  doctors: [],
  allDoctors: [],
  allSchedules: [],

  allRequiredDoctorInfo: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      state.isLoadingGender = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      state.isLoadingGender = false;
      state.genders = [];
      return {
        ...state,
      };
    // case actionTypes.FETCH_ROLE_SUCCESS:
    //   state.roles = action.data;
    //   return {
    //     ...state,
    //   };
    // case actionTypes.FETCH_ROLE_FAILED:
    //   state.roles = [];
    //   return {
    //     ...state,
    //   };
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_USERS_FAILED:
      state.users = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_DOCTOR_SUCCESS:
      state.doctors = action.data;
      return {
        ...state,
      };

    case actionTypes.FETCH_DOCTOR_FAILED:
      state.doctors = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      state.allDoctors = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_FAILED:
      state.allDoctors = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLCODE_SCHEDULE_SUCCESS:
      state.allSchedules = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLCODE_SCHEDULE_FAILED:
      state.allSchedules = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:
      state.allRequiredDoctorInfo = action.data;

      console.log('check required doctor data', action);
      return {
        ...state,
      };

    case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED:
      state.allRequiredDoctorInfo = [];
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReducer;
