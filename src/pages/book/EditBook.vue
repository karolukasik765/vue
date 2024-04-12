<template>
  <div class="py-5 w-50 mx-auto my-5">
    <h3 class="text-center">Aktualizacja danych książki</h3>

    <div v-if="error && error.message" class="alert alert-danger">
      Wystąpił błąd: {{ error.message }}
    </div>

    <div v-if="success" class="alert alert-success mt-3">
      Informacje o książce zaktualizowane pomyślnie.
    </div>

    <form @submit.prevent="updateBook">
      <div class="form-group">
        <label for="bookTitle">Nazwa książki</label>
        <input v-model="bookData.title" type="text" id="bookTitle" class="form-control" placeholder="Podaj tytuł książki">
      </div>

      <div class="form-group">
        <label for="bookPages">Ilość stron</label>
        <input v-model.number="bookData.pages" type="number" id="bookPages" class="form-control" placeholder="Podaj ilość stron">
      </div>

      <div class="form-group">
        <label for="bookAuthor">ID autora</label>
        <input v-model="bookData.authorId" type="text" id="bookAuthor" class="form-control" placeholder="Podaj ID autora">
      </div>

      <div class="d-flex justify-content-between">
        <router-link to="{ name: 'BookPage', params: { id: $route.params.id } }" class="btn btn-outline-secondary">
          Anuluj
        </router-link>
        <button type="submit" class="btn btn-primary">Zapisz zmiany</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookData: {
        title: '',
        pages: 0,
        authorId: ''
      },
      error: null,
      success: false,
    };
  },
  created() {
    this.loadBookDetails();
  },
  methods: {
    async loadBookDetails() {
      try {
        const response = await fetch(`http://localhost:8080/v1/books/books/${this.$route.params.id}`);
        if (!response.ok) throw new Error('Nie udało się załadować książki.');
        const data = await response.json();
        this.bookData = { title: data.title, pages: data.pages, authorId: data.author };
      } catch (err) {
        this.error = { message: err.message };
      }
    },
    async updateBook() {
      try {
        const response = await fetch(`http://localhost:8080/v1/books/books/${this.$route.params.id}`, {
          method: 'PUT',
          body: JSON.stringify({
            title: this.bookData.title,
            pages: this.bookData.pages,
            authorId: this.bookData.authorId
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Aktualizacja nie powiodła się.');
        this.success = true;
        setTimeout(() => this.success = false, 3000); // Usuń komunikat po 3 sekundach
      } catch (err) {
        this.error = { message: err.message };
      }
    }
  }
}
</script>
