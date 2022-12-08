import { axiosInstance } from "../../plugins/axios";

export async function login(/*{ commit }*/__, params) {
    const res = await axiosInstance.post(`/auth/login`, {
      email: params.email,
      password: params.password,
    });
  return res.data;
}
