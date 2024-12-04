import axios from 'axios';

const BASE_URL = 'https://easy-hr-backend.onrender.com/api';

const api = axios.create({
  baseURL: BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const getAllEmployees = async () => {
  const response = await api.get('/employees');
  return response.data;
};

export const createEmployee = async (employeeData: any) => {
  // Generate default password using part of name and current year
  const defaultPassword = `${employeeData.firstName.toLowerCase()}${new Date().getFullYear()}`;
  const response = await api.post('/employees', {
    ...employeeData,
    password: defaultPassword,
  });
  return response.data;
};

export const updateEmployee = async (id: string, data: any) => {
  const response = await api.put(`/employees/${id}`, data);
  return response.data;
};

export const deleteEmployee = async (id: string) => {
  const response = await api.delete(`/employees/${id}`);
  return response.data;
};

export const getDepartmentHeadcount = async () => {
  const response = await api.get('/analytics/headcount');
  return response.data;
};

export const getTotalEmployees = async () => {
  const response = await api.get('/analytics/total');
  return response.data;
};

export const getEmployeeProfile = async () => {
  const response = await api.get('/employees/me');
  return response.data;
};

export const updateEmployeeProfile = async (data: any) => {
  const response = await api.put('/employees/me', data);
  return response.data;
};

export default api;