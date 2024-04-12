<template>
  <div class="container mt-5">
    <p v-if="!selectedBook">Ta książka nie została znaleziona.</p>
    <p v-if="error && error.message">Wystąpił błąd: {{ error.message }}</p>
    <div v-if="selectedBook" class="detail-view">
      <header>
        <h2 class="title">{{ selectedBook.title }}</h2>
        <router-link :to="{ name: 'EditBook', params: { id: selectedBook.id } }" class="edit-link">
          Edytuj
        </router-link>
      </header>
      <span class="pages">Liczba stron: {{ selectedBook.pages }}</span>
      <section v-if="bookAuthor" class="author-info">
        <p>Autor:</p>
        <h4>{{ bookAuthor.firstName }} {{ bookAuthor.lastName }}</h4>
      </section>
      <router-link :to="{ name: 'HomePage' }" class="btn-back">Powrót</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedBook: null,
      bookAuthor: null,
      isLoading: true,
      error: null,
    };
  },
  async mounted() {
    await this.loadBookDetails();
  },
  methods: {
    async loadBookDetails() {
      try {
        const responseBook = await fetch(`http://localhost:8080/v1/books/books/${this.$route.params.id}`);
        if (!responseBook.ok) throw new Error('Nie udało się załadować danych książki.');
        const bookData = await responseBook.json();
        this.selectedBook = bookData;

        const responseAuthor = await fetch(`http://localhost:8080/v1/authors/authors/${bookData.author.id}`);
        if (!responseAuthor.ok) throw new Error('Nie udało się załadować danych autora.');
        const authorData = await responseAuthor.json();
        this.bookAuthor = authorData;
      } catch (error) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>
