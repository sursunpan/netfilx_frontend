import store from "@/store";

const apiService = {
  get: async function (url: string): Promise<any> {
    let token = null;
    const { user } = store.getState();
    if (user?.token) {
      token = user.token;
    }
    console.log("token----->0000", token);
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:3000/api/v1${url}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          resolve(json);
        })
        .catch((error) => reject(error));
    });
  },
  postWithoutToken: async function (url: string, data: any): Promise<any> {
    console.log("post", url, data);
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:3000/api/v1${url}`, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("Response:", json);
          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  post: async function (url: string, data: any): Promise<any> {
    let token = null;
    const { user } = store.getState();
    if (user?.token) {
      token = user.token;
    }
    console.log("token----->0000", token);
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:3000/api/v1${url}`, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("Response:", json);
          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default apiService;
