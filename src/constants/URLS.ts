const BASEURL = `https://upskilling-egypt.com:3003/api/v1`;
export const BASE_IMG_URL = "https://upskilling-egypt.com:3003";

export const requestHeader = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

export const AUTHURLS = {
  loginUrl: `${BASEURL}/Users/Login`,
  forgetUrl: `${BASEURL}/Users/Reset/Request`,
  resetUrl: `${BASEURL}/Users/Reset`,
  changePassUrl: `${BASEURL}/Users/ChangePassword`,
  registerUrl: `${BASEURL}/Users/Register`,
  verifyAccountUrl: `${BASEURL}/Users/verify`,
};

export const PROJECTSURLS = {
  getAll: `${BASEURL}/Project/manager`,
  addUrl: `${BASEURL}/Project`,
  // deleteUrl(id) :`${BASEURL}/Project/${id}`,
};
export const TASKSURLS = {
  getAll: `${BASEURL}/Task/manager`,
  addUrl: `${BASEURL}/Task`,
  updateUrl: (id: string) => `${BASEURL}/Task/${id}`,
};
export const USERSSURLS = {
  getUsersUrl: `${BASEURL}/Users/Manager`,
  toggleStatusUrl: (id: string) => `${BASEURL}/Users/${id}`,
  getAllMyAssignedTasks: `${BASEURL}/Task`,
};
