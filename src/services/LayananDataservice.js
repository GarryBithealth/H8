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
    return http.put(`/home/edit/${id}`, data);
  }

  delete(id) {
    return http.delete(`/home/${id}`);
  }

  deleteAll() {
    return http.delete(`/home`);
  }

  findBy(value,params) {
    return http.get(`/home?${params}=${value}`);
  }

  paginated(value) {
    return http.get(`/home?page=${value}`);
  }
}

export default new LayananDataService();