import axios from '../axios';

const handleLoginApi = (email, password) => {
  return axios.post('api/login', { email, password });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/users?id=${inputId}`);
  //   return axios.get("/api/users?id=$", {
  //     data:{
  //         id: inputId,
  //     }
  //   });
};
const createNewUser = (data) => {
  return axios.post('/api/create-new-user', data);
};

const deleteUser = (userId) => {
  // return axios.delete("/api/delete-user", { id: id });
  return axios.delete('/api/delete-user', {
    data: {
      id: userId,
    },
  });
};

const editUserService = (inputData) => {
  return axios.put('/api/edit-user', inputData);
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const getDoctorService = (limit) => {
  return axios.get(`/api/doctor?limit=${limit}`);
};
const getAllDoctorService = () => {
  return axios.get('/api/get-all-doctors');
};
const saveDoctorDetails = (data) => {
  return axios.post('/api/info-doctors', data);
};
const getDetailsDoctor = (id) => {
  return axios.get(`/api/get-details-doctors?id=${id}`);
};
const saveBulkSchedules = (data) => {
  return axios.post('/api/bulk-create-schedules', data);
};
const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-by-date?doctorId=${doctorId}&date=${date}`
  );
};

const getExtraInfoById = (doctorId) => {
  return axios.get(`/api/get-extra-info-by-id?doctorId=${doctorId}`);
};

const getProfile = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

const postPatientBookAppointment = (data) => {
  return axios.post(`/api/patient-book-appointment`, data);
};

const postVerifyBookAppointment = (data) => {
  return axios.post(`/api/verify-booking`, data);
};

const createSpecialty = (data) => {
  return axios.post(`/api/create-specialty`, data);
};

const getAllSpecialty = () => {
  return axios.get(`/api/get-all-specialty`);
};

const getDetailSpecialty = (id) => {
  return axios.get(`api/get-detail-specialty?id=${id}`);
};

const createClinic = (data) => {
  return axios.post(`/api/create-clinic`, data);
};

const getAllClinic = () => {
  return axios.get(`/api/get-all-clinic`);
};

const getDetailClinic = (id) => {
  return axios.get(`api/get-detail-clinic?id=${id}`);
};

const getPatientAppointment = (data) => {
  return axios.get(
    `api/get-patient-booking?doctorId=${data.doctorId}&date=${data.date}`
  );
};

const updateStatusBooking = (data) => {
  return axios.put(`api/update-status-booking`, data);
};
export {
  handleLoginApi,
  getAllUsers,
  createNewUser,
  deleteUser,
  editUserService,
  getAllCodeService,
  getDoctorService,
  getAllDoctorService,
  saveDoctorDetails,
  getDetailsDoctor,
  saveBulkSchedules,
  getScheduleDoctorByDate,
  getExtraInfoById,
  getProfile,
  postPatientBookAppointment,
  postVerifyBookAppointment,
  createSpecialty,
  getAllSpecialty,
  getDetailSpecialty,
  createClinic,
  getAllClinic,
  getDetailClinic,
  getPatientAppointment,
  updateStatusBooking,
};
