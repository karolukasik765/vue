<template>
  <div class="pt-5 pb-3 container">
    <h3 class="text-center display-4 mb-4 font-weight-bold">Wyszukaj książkę</h3>

    <div class="mt-3 alert alert-warning alert-dismissible fade show" role="alert" v-if="message">
      {{ message }}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  </div>

  <div class="row mx-0">
    <div class="col-md-8">
      
    <input
      type="text"
      @input="findBooks"
      class="form-control form-control-lg"
      placeholder="Zacznij pisać..."
    />
      <p v-if="filteredBooks.length === 0">Nie znaleziono żadnych książek.</p>
      <div v-else class="row row-cols-1 row-cols-md-2 g-4">
        <BookItem
          v-for="book in filteredBooks"
          :key="book.id"
          :book="book"
        />
      </div>
    </div>
    <div class="col-md-4">
      <router-link :to="{ name: 'AddBook' }" class="btn btn-outline-primary mb-3 w-100 rounded">
        Dodaj książkę
      </router-link>
      <AuthorsList />
    </div>
  </div>
</template>

<script>
import AuthorsList from "../../components/AuthorsList";
import BookItem from "../../components/BookItem";

export default {
  data() {
    return {
      filteredBooks: [],
      loading: false,
      books: [],
      error: null,
      message: ''
    };
  },
  mounted() {
    this.fetchBooks();
  },
  components: {
    AuthorsList,
    BookItem,
  },
  methods: {
    fetchBooks() {
      this.loading = true;
      fetch("http://localhost:8080/v1/books/books")
        .then(response => {
          if (!response.ok) {
            throw new Error('Problem z załadowaniem książek');
          }
          return response.json();
        })
        .then(data => {
          this.books = data;
          this.filteredBooks = data;
        })
        .catch(error => {
          this.error = 'Błąd podczas ładowania danych: ' + error.message;
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    findBooks(event) {
      const query = event.target.value.toLowerCase();
      this.filteredBooks = this.books.filter(book =>
        book.title.toLowerCase().includes(query)
      );
    },
  },
};
</script>

<style scoped>
h5 {
  color: #aaa;
}
</style>
