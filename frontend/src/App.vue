<template>
  <section>
    <nav>
      | <router-link :to="{ name: 'home' }">Home</router-link> |
      <router-link :to="{ name: 'signin' }">SignIn</router-link> |
      <router-link :to="{ name: 'signup' }">SignUp</router-link> |
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
  padding: 0.5rem;
  color: white;
  background-color: black;
}
</style>
