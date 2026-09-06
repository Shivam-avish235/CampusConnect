import api from "./axios";

const crud = (path) => ({
  list: async () => (await api.get(path)).data,
  get: async (id) => (await api.get(`${path}/${id}`)).data,
  create: async (payload) => (await api.post(path, payload)).data,
  update: async (id, payload) => (await api.put(`${path}/${id}`, payload)).data,
  remove: async (id) => (await api.delete(`${path}/${id}`)).data,
});

export const announcementsApi = crud("/announcements");
export const eventsApi = crud("/events");
export const placementsApi = crud("/placements");
export const attendanceApi = crud("/attendance");
export const assignmentsApi = crud("/assignments");
export const materialsApi = crud("/materials");
export const timetableApi = crud("/timetable");
export const notificationsApi = crud("/notifications");
export const coursesApi = crud("/courses");
export const departmentsApi = crud("/departments");
export const sectionsApi = crud("/sections");
export const resultsApi = crud("/results");
export const marksApi = crud("/marks");

export const placementApplicationsApi = {
  list: async () => (await api.get("/placement-applications")).data,
  create: async (payload) => (await api.post("/placement-applications", payload)).data,
  update: async (id, payload) => (await api.put(`/placement-applications/${id}`, payload)).data,
};

export const eventRegistrationsApi = {
  list: async () => (await api.get("/event-registrations")).data,
  create: async (payload) => (await api.post("/event-registrations", payload)).data,
  update: async (id, payload) => (await api.put(`/event-registrations/${id}`, payload)).data,
};

export const submissionsApi = {
  list: async () => (await api.get("/submissions")).data,
  create: async (payload) => (await api.post("/submissions", payload)).data,
  update: async (id, payload) => (await api.put(`/submissions/${id}`, payload)).data,
};

export const dashboardApi = {
  admin: async () => (await api.get("/dashboard/admin")).data,
  faculty: async () => (await api.get("/dashboard/faculty")).data,
  student: async () => (await api.get("/dashboard/student")).data,
};

export const getCurrentSession = () => {
  try {
    const value = JSON.parse(
      localStorage.getItem("campusconnect.session") || localStorage.getItem("user") || "null",
    );
    return value;
  } catch {
    return null;
  }
};

export const userApi = {
  me: async () => (await api.get("/users/me")).data,
  updateProfile: async (payload) => (await api.put("/users/me/profile", payload)).data,
  changePassword: async (payload) => (await api.put("/users/me/password", payload)).data,
};
