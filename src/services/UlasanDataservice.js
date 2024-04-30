import http from "../http-common";

class UlasanDataService {
  get(id) {
    return http.get(`/home/${id}`);
  }

  create(id, data) {
    return http.post(`/home/${id}`, data);
  }

  update(id, data) {
    return http.put(`/home/${id}`, data);
  }

  delete(userId, layanansId) {
    return http.delete(`/home/profile/`, {
      data: {
        userId: userId,
        layanansId: layanansId
      }
    });
  }
}

export default new UlasanDataService();