import { axiosInstance } from '@/plugins/axios';
import { getToken } from '@/utils/utils';

axiosInstance.defaults.headers.common['x-token'] = getToken()

export async function lister(__, parm) {
 //console.log(parm)

 
  const res = await axiosInstance.get(`/user?limit=${parm.limit}&skip=${parm.skip}`);
return res.data;
}

