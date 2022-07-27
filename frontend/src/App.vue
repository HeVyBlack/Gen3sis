<template>
  <section>
    <nav>
      |
      <router-link :to="{ name: 'home' }" class="btn btn-dark"
        >Home</router-link
      >
      |
      <router-link :to="{ name: 'signin' }" class="btn btn-dark"
        >SignIn</router-link
      >
      |
      <router-link :to="{ name: 'signup' }" class="btn btn-dark"
        >SignUp</router-link
      >
      |
    </nav>
    <router-view />
  </section>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}

nav a {
  margin: 0.5rem;
  text-decoration: none;
  font-weight: bold;
  color: black;
}

nav a.router-link-exact-active {
  border-radius: 0;
}
</style>
