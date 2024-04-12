<template>
    <div class="col mb-3">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title small">Pages: {{ book.pages }}</h5>
          <router-link
            :to="{ name: 'BookPage', params: { id: book.id } }"
            class="card-text text-dark"
          >
          {{ book.title.length > 55 ? book.title.substr(0, 55) + "..." : book.title }}

          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ["book"],
  };
  </script>