<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="navbar-nav mr-aut">
        <li class="navbar-brand">
          <strong>Attendance</strong>
        </li>
      </div>
      <div v-if="currentUser && !adminCheck"  class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/modules" class="nav-link">Modules</router-link>
        </li>
      </div>
      <div v-if="currentUser && adminCheck"  class="navbar-nav mr-auto">
      <li class="nav-item">
          <router-link to="/users" class="nav-link">List Users</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add-user" class="nav-link">Add Users</router-link>
        </li>
      </div>
      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" />Login
          </router-link>
        </li>
      </div>
      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" />LogOut
          </a>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <h2>Attendance Vue 3 prototype</h2>
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
    protectedContent() {
      return (this.currentUser?true:false); 
    },
    adminCheck() {
      if (this.currentUser){
        let user = JSON.parse(localStorage.getItem('user'))
        if ( user.roleType  == 4) {
          return true;
        }
        else {
          return false;
        }
      }
      else {
        return false;
      }
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(241, 239, 239);
  margin-top: 60px;
}
</style>

<style scoped>
  .container h2 {
    text-align: center;
    margin: 25px auto;
  }
  </style>
