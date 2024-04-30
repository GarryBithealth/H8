import http from "../http-common";

class HistoryDataService {
  get(id) {
    return http.get(`/home/profile/${id}`);
  }
}

export default new HistoryDataService();