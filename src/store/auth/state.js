import { getToken, getUser } from "@/utils/utils";

export default {
  tokenAuth: getToken() || '',
  user: getUser || {}
}