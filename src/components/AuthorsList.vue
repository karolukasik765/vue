<template>
  <div class="container py-5">
    <h3 class="text-center mb-4">Autorzy</h3>

    <router-link :to="{ name: 'AddAuthor' }" class="btn btn-primary mb-3">
      <i class="bi bi-plus-square mr-2"></i> Dodaj autora
    </router-link>
    
    <div v-if="message" class="alert alert-success" role="alert">
      {{ message }}
    </div>

    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <div v-if="authors && authors.length > 0" class="list-group">
      <a
        v-for="author in authors"
        :key="author.id"
        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        @click="deleteAuthor(author.id)"
      >
        {{ author.firstName }} {{ author.lastName }}
        <i class="bi bi-trash"></i>
      </a>
    </div>
    <div v-else class="alert alert-info">Brak zapisanych autorów.</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      authors: [],
      error: null,
      message: ''
    };
  },
  created() {
    this.fetchAuthors();
  },
  methods: {
    fetchAuthors() {
      fetch("http://localhost:8080/v1/authors/authors")
        .then(response => {
          if (!response.ok) throw new Error('Nie udało się załadować autorów');
          return response.json();
        })
        .then(data => {
          this.authors = data;
        })
        .catch(error => {
          this.error = error.message;
        });
    },
    deleteAuthor(id) {
      if (!confirm('Czy na pewno chcesz usunąć tego autora?')) return;
      
      fetch(`http://localhost:8080/v1/authors/authors/${id}`, {
        method: "DELETE",
      })
        .then(response => {
          if (!response.ok) throw new Error('Nie udało się usunąć autora');
          this.authors = this.authors.filter(author => author.id !== id);
          this.message = "Autor został usunięty.";
        })
        .catch(error => {
          this.error = error.message;
        });
    },
  },
};
</script>

<style scoped>
.bi-trash {
  cursor: pointer;
}
.bi-plus-square {
  vertical-align: bottom;
}
</style>
