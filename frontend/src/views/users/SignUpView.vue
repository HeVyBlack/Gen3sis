<template>
  <div class="signup">
    <SignUpForm />
  </div>
</template>

<script>
import SignUpForm from "@/components/users/SignUpForm.vue";
export default {
  name: "SignUpView",
  components: {
    SignUpForm,
  },
};
</script>
