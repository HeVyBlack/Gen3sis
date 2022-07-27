<template>
  <div class="home">
    <div
      class="alert alert-danger alert-dismissible fade show container px-5"
      role="alert"
      v-if="msgs"
    >
      <strong>{{ msgs }}</strong>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  props: {
    // Set variable, for posible messages
    msgs: String,
  },
};
</script>
