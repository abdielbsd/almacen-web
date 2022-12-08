import { getToken } from "@/utils/utils";

export default {
  tokenAuth: getToken() || '',
}