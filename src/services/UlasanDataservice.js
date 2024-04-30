import http from "../http-common";

class UlasanDataService {
  getAll(params) {
    return http.get("/home/ulas", {params});
  }

  get(id) {
    return http.get(`/home/ulas/${id}`);
  }

  create(data) {
    return http.post("/home/ulas", data);
  }

  update(id, data) {
    return http.put(`/home/ulas/${id}`, data);
  }

  delete(id) {
    return http.delete(`/home/ulas/${id}`);
  }
}

export default new UlasanDataService();