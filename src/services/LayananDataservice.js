import http from "../http-common";

class LayananDataService {
  getAll(params) {
    return http.get("/home", {params});
  }

  get(id) {
    return http.get(`/home/${id}`);
  }

  create(data) {
    return http.post("/home", data);
  }

  update(id, data) {
    return http.put(`/home/${id}`, data);
  }

  delete(id) {
    return http.delete(`/home/${id}`);
  }

  deleteAll() {
    return http.delete(`/home`);
  }

  findByTitle(title) {
    return http.get(`/home?title=${title}`);
  }
}

export default new LayananDataService();