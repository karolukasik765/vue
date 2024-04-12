<template>
  <div class="py-5 w-50 mx-auto my-5">
    <h3 class="text-center">Dodaj nowego autora</h3>

    <div v-if="error && error.message" class="alert alert-danger">
      {{ error.message }}
    </div>

    <div v-if="success" class="alert alert-success mt-3">
      Nowy autor został dodany.
    </div>

    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="firstName" class="form-label">Imię</label>
        <input type="text" v-model="author.firstName" class="form-control" id="firstName" placeholder="Wpisz imię">
      </div>

      <div class="mb-3">
        <label for="lastName" class="form-label">Nazwisko</label>
        <input type="text" v-model="author.lastName" class="form-control" id="lastName" placeholder="Wpisz nazwisko">
      </div>


      <div class="d-flex justify-content-between">
        <router-link :to="{ name: 'HomePage' }" class="btn btn-outline-danger">
          Powrót
        </router-link>
        <button type="submit" class="btn btn-success">Dodaj autora</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      author: {
        firstName: "",
        lastName: "",
      },
      error: null,
      success: false,
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await fetch("http://localhost:8080/v1/authors/authors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.author)
        });

        if (!response.ok) {
          const resData = await response.json();
          throw new Error(resData.message || 'Failed to add the author');
        }

        this.success = true;
        this.resetForm();
        setTimeout(() => this.success = false, 3000);  // Clear success message after 3 seconds
      } catch (error) {
        this.error = error;
        console.error(error);
      }
    },
    resetForm() {
      this.author.firstName = "";
      this.author.lastName = "";
    }
  },
};
</script>
