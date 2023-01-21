import { axiosInstance } from '@/plugins/axios';
import { getToken } from '@/utils/utils';

axiosInstance.defaults.headers.common['x-token'] = getToken()

export async function lister(__, parm) {
  //console.log("jhbjhljhu", parm)
  const res = await axiosInstance.get(`/user?limit=${parm.limit}&skip=${parm.skip}`);
  return res.data;
}
export async function update_user(__, parm) {
  //console.log("jhbjhljhu", parm)
  const res = await axiosInstance.put(`/user/${parm.uid}`, {
    role: parm.role,
    name: parm.name,
  });
  return res.data;
}
export async function remove_user(__, parm) {
  //console.log("remve", parm)
  const res = await axiosInstance.delete(`/user/${parm.uid}`);
  return res.data;
}

export async function add_user(__, {parm,psw}) {
  //console.log("jhbjhljhu", parm,psw)
  const res = await axiosInstance.post(`/user/`, {
    role: parm.role,
    name: parm.name,
    email: parm.email,
    password: psw
  });
  return res.data;
}

