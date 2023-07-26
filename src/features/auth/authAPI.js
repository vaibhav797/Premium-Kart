// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch("/auth/signup", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "content-type": "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        resolve({ data });
      } else {
        const error = await res.text();
        reject(error);
      }
    } catch (err) {
      reject(err);
    }
  });
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        resolve({ data });
      } else {
        const error = await res.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}
export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch("/auth/check");

      if (res.ok) {
        const data = await res.json();
        resolve({ data });
      } else {
        const error = await res.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}
export function signOutUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch("/auth/logout", {
        method: "POST",
        body: JSON.stringify({}),
        headers: { "content-type": "application/json" },
      });
      if (res.ok) {
        resolve({ data: "success" });
      } else {
        const error = await res.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function resetPasswordRequest(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch("/auth/reset-password-request", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "content-type": "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        resolve({ data });
      } else {
        const error = await res.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}
export function resetPassword(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        resolve({ data });
      } else {
        const error = await res.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}
