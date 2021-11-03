import { useAuth } from "context/auth-context";
import qs from "qs";
import * as auth from "../auth-provider";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  //endpoint是一些url后面的参数，第二个参数是fetch的配置，data和token不属于fetch的标准API
  const config = {
    method: "GET", //只是默认为get
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig, //会覆盖前面的参数，传post类型
  };
  // 在get的请求里，我们所传的参数是要带到url里的，而post等是直接放到body里面的
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  // fetch和axios的表现不一样，axios可以在401和500的情况下捕捉到异常，只会在断网或网络连接失败时报出异常
  // 但是fetch不行，因此在response未成功获取时，需要手动判断else
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

export const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
