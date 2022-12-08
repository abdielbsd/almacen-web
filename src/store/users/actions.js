import { axiosInstance } from '@/plugins/axios';

export async function lister(__, parm) {
 console.log(parm)
  const res = await axiosInstance.get(`/user?limit=${parm.limit}&skip=${parm.skip}`);
return res.data;
}

