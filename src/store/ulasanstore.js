import { defineStore } from 'pinia';
import UlasanDataService from '../services/UlasanDataservice';
import HistoryDataService from '../services/HistoryDataservice';
export const useUlasanStore = defineStore('ulasan', {
  state: () => ({
    currentUlasan: null,
    ulasans: [],
    newUlasanText: "",
    newUlasanRating: 0,
    file: null,
    messagefile: '',
    message: '',
    error: false,
    ulasanshist: [],
  }),
  actions: {
    async getUlasan(id) {
      try {
        const response = await UlasanDataService.get(id);
        this.currentUlasan = response.data;
      } catch (e) {
        console.error(e);
      }
    },
    async historyUlasan(id) {
      try {
        const response = await HistoryDataService.get(id);
        this.ulasanshist = response.data[0].us;
      } catch (e) {
        console.error(e);
      }
    },
    async addUlasan(id, data) {
      try {
        const response = await UlasanDataService.create(id, data);
        this.message = 'Review added successfully!';
        console.log(response.data)
    } catch (e) {
        console.error(e);
        this.message = 'Error adding review.';
      }
    },
    async updateUlasan(id, data) {
      try {
        const response = await UlasanDataService.update(id, data);
        this.message = 'Review updated successfully!';
        console.log(response.data)
      } catch (e) {
        console.error(e);
        this.message = 'Error updating review.';
      }
    },
    async deleteUlasan(userId, layanansId) {
      try {
        await UlasanDataService.delete(userId,layanansId);
        this.message = 'Review deleted successfully!';
      } catch (e) {
        console.error(e);
        this.message = 'Error deleting review.';
      }
    },
    selectFile(file) {
      this.file = file;
      this.error = false;
      this.messagefile = "";
    },
    async sendFile() {
      const formData = new FormData();
      formData.append('file', this.file);
    },
  },
});
