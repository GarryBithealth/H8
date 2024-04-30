<template>
  <div class="container">
    <header class="jumbotron mt-4">
      <h2>Profile</h2>
      <h3>
        <strong>{{currentUser.username}}</strong>
      </h3>
    </header>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    <div class="history mt-5">
      <h3>History</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  methods: {
    cekparam() {
    // console.log(req.params.id)
  }
},
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    // this.cekparam()
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>
