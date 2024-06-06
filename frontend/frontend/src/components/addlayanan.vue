<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="layanan.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="layanan.description"
          name="description"
        />
      </div>

      <div class="form-group">
        <label for="jenis">jenis</label>
        <input
          class="form-control"
          id="jenis"
          required
          v-model="layanan.jenis"
          name="jenis"
        />
      </div>

      <div class="form-group">
        <label for="linkImg">Link Image</label>
        <input
          class="form-control"
          id="linkImg"
          required
          v-model="layanan.linkImg"
          name="linkImg"
        />
      </div>

       <div class="form-group">
        <label for="alamat">alamat</label>
        <input
          class="form-control"
          id="alamat"
          required
          v-model="layanan.alamat"
          name="alamat"
        />
      </div>

       <div class="form-group">
        <label for="phone">phone</label>
        <input
          class="form-control"
          id="phone"
          required
          v-model="layanan.phone"
          name="phone"
        />
      </div>


      <button @click="saveLayanan" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newLayanan">Add</button>
    </div>
  </div>
</template>

<script>
import LayananDataService from "../services/LayananDataservice";

export default {
  name: "add-layanan",
  data() {
    return {
      layanan: {
        id: null,
        title: "",
        description: "",
        jenis: "",
        published: false,
        linkImg: "",
        alamat: "",
        phone:"",
      },
      submitted: false
    };
  },
  methods: {
    saveLayanan() {
      var data = {
        title: this.layanan.title,
        description: this.layanan.description,
        jenis: this.layanan.jenis,
        linkImg: this.layanan.linkImg,
        alamat: this.layanan.alamat,
        phone: this.layanan.phone
      };

      LayananDataService.create(data)
        .then(response => {
          this.layanan.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newLayanan() {
      this.submitted = false;
      this.layanan = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>