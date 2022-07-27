<template>
  <section>
    <h1>Hola Usuario</h1>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      msg: [{}],
    };
  },
  mounted() {
    axios.get("http://localhost:3080/api/users/signin/").then((data) => {
      if (data.data.text)
        return this.$router.push({
          name: "home",
          params: {
            msgs: data.data.text,
          },
        });
    });
  },
};
</script>

<style></style>
