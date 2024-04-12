<template>
  <div>Author: {{ $route.params.id }}</div>
</template>

<script>
export default {
  data() {
    return {
      author: {
        id: "",
        firstName: "",
        lastName: "", 
      },
    };
  },
};
</script>
