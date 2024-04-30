<!-- <template>
  <div id="app">
    <nav class="navbar navbar-expand" style="background-color: rgba(150,30,40, 0.8); width: 100%
">
      <div class="navbar-nav mr-auto">
        <router-link to="/home">
        <img src="../src/assets/images.png" alt="" style="width: 30px;"></router-link>
        <li class="nav-item" v-if="currentUser">
          <router-link to="/home" class="nav-link" style="color: azure;">
            <font-awesome-icon/> H8 Group User
          </router-link>
        </li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/admin/edit" class="nav-link"> Edit </router-link>
        </li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link v-if="showAdminBoard" to="/admin/add" class="nav-link">Add</router-link>
        </li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link v-if="showAdminBoard" to="/admin/delete" class="nav-link">Delete</router-link>
        </li>

      </div>

      <div v-if="!currentUser" class="navbar-nav nav-pills ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link" active-class="active">
            <font-awesome-icon icon="user-plus" /> Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link" active-class="active">
            <font-awesome-icon icon="sign-in-alt" /> Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link" style="color: beige;">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link" @click.prevent="logOut" style="color: bisque;">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </router-link>
        </li>
      </div>
    </nav>

    <div class="container-fluid-xl" style="padding: 0px; margin: 0px; max-width: 1200px">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_MODERATOR');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
    }
  }
};
</script>

<style>
#app {
  width: 100%;
}
.nav-item{
  --clr: rgb(247, 197, 159);
  --clr-alpha: rgb(247, 197, 159,.1);
  animation: spinner 1.6s infinite ease;
  transform-style: preserve-3d;
}
.nav-link:hover{
  transform: translateX(10px);
  opacity: 0.9;
}
</style> -->

<template>
  <div id="app">
    <nav class="navbar navbar-expand" style="background-color: rgba(150,30,40, 0.8); width: 100%">
      <div class="navbar-nav mr-auto">
        <router-link to="/home">
          <img src="../src/assets/images.png" alt="" style="width: 30px;" />
        </router-link>
        <li class="nav-item" v-if="currentUser">
          <router-link to="/home" class="nav-link" style="color: azure;">
            <font-awesome-icon /> H8 Group User
          </router-link>
        </li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/admin/edit" class="nav-link"> Edit </router-link>
        </li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link v-if="showAdminBoard" to="/admin/add" class="nav-link">Add</router-link>
        </li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link v-if="showAdminBoard" to="/admin/delete" class="nav-link">Delete</router-link>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav nav-pills ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link" active-class="active">
            <font-awesome-icon icon="user-plus" /> Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link" active-class="active">
            <font-awesome-icon icon="sign-in-alt" /> Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link" style="color: beige;">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link" @click.prevent="logOut" style="color: bisque;">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </router-link>
        </li>
      </div>
    </nav>

    <div class="container-fluid-xl" style="padding: 0px; margin: 0px; max-width: 1200px">
      <router-view />
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/store/auth.module'; // Import the Pinia store
import { computed } from 'vue';

export default {
  setup() {
    const authStore = useAuthStore();

    const currentUser = computed(() => authStore.user);
    const showAdminBoard = computed(() => currentUser.value && currentUser.value.roles && currentUser.value.roles.includes('ROLE_ADMIN'));
    const showModeratorBoard = computed(() => currentUser.value && currentUser.value.roles && currentUser.value.roles.includes('ROLE_MODERATOR'));

    const logOut = () => {
      authStore.logout();
    };

    return {
      currentUser,
      showAdminBoard,
      showModeratorBoard,
      logOut,
    };
  },
};
</script>

<style>
#app {
  width: 100%;
}
.nav-item {
  --clr: rgb(247, 197, 159);
  --clr-alpha: rgb(247, 197, 159, 0.1);
  animation: spinner 1.6s infinite ease;
  transform-style: preserve-3d;
}
.nav-link:hover {
  transform: translateX(10px);
  opacity: 0.9;
}
</style>
