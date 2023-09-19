import { axiosApiInstance } from 'utils/services/axiosService';

export async function signupWithPhoneService(
  phone: string,
  name: string,
  password: string
) {
  const response = await axiosApiInstance.post('/auth/register', {
    phone,
    first_name: name,
    password,
  });
  return response;
}

export async function signupWithEmailService(
  email: string,
  name: string,
  password: string
) {
  const response = await axiosApiInstance.post('/auth/register', {
    email,
    first_name: name,
    password,
  });

  return response;
}

export async function signInService(id: string, password: string) {
  const response = await axiosApiInstance.post('/auth/login', {
    id,
    password,
  });

  return response;
}

export async function userSessionService() {
  try {
    const response = await axiosApiInstance.post('/auth/check');
    if (response.data) return response.data.isLoggedIn;
    else return false;
  } catch (error: any) {
    return false;
  }
}

export async function signOutService() {
  const response = await axiosApiInstance.post('/auth/logout');
  return response;
}
