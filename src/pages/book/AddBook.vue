<template>
  <div class="py-5 w-50 mx-auto my-5">
    <h3 class="text-center">Dodaj nową książkę</h3>
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>
    <form @submit.prevent="addBook">
      <div class="mb-3">
        <label for="title" class="form-label">Tytuł</label>
        <input v-model="newBook.title" type="text" class="form-control" id="title" placeholder="Wpisz tytuł książki">
      </div>
      <div class="mb-3">
        <label for="pages" class="form-label">Liczba stron</label>
        <input v-model.number="newBook.pages" type="number" class="form-control" id="pages" placeholder="Wpisz liczbę stron">
      </div>
      <div class="mb-3">
        <label for="author" class="form-label">Autor</label>
        <select v-model="newBook.author" class="form-select" id="author">
          <option disabled value="">Wybierz autora</option>
          <option v-for="author in authors" :key="author.id" :value="author.id">
            {{ author.firstName }} {{ author.lastName }}
          </option>
        </select>
      </div>
      <div class="d-flex justify-content-between">
        <router-link :to="{ name: 'HomePage' }" class="btn btn-outline-danger">
          Powrót
        </router-link>
        <button type="submit" class="btn btn-primary">Dodaj książkę</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newBook: {
        title: '',
        pages: 0,
        author: '', 
      },
      authors: [],
      error: '',
    };
  },
  created() {
    this.fetchAuthors();
  },
  methods: {
    fetchAuthors() {
      fetch('http://localhost:8080/v1/authors/authors')
        .then(response => {
          if (!response.ok) {
            throw new Error('Problem przy ładowaniu autorów');
          }
          return response.json();
        })
        .then(data => {
          this.authors = data;
        })
        .catch(error => {
          this.error = error.message;
        });
    },
    addBook() {
      fetch('http://localhost:8080/v1/books/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.newBook)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Problem przy dodawaniu książki');
          }
          return response.json();
        })
        .then(() => {
          this.$router.push({ name: 'BookList' }); 
        })
        .catch(error => {
          this.error = error.message;
        });
    },
  },
};
</script>
