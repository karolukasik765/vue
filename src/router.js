import { createWebHistory, createRouter } from "vue-router";

import HomePage from "./pages/home/HomePage";
import AddBook from "./pages/book/AddBook";
import EditBook from "./pages/book/EditBook";
import BookPage from "./pages/book/BookPage";
import AddAuthor from "./pages/author/AddAuthor";
import AuthorPage from "./pages/author/AuthorPage";

const routes = [
  { path: "/", name: 'HomePage', component: HomePage },
  { path: "/books/add", name: 'AddBook', component: AddBook },
  { path: "/books/edit/:id", name: 'EditBook', component: EditBook },
  { path: "/books/:id", name: 'BookPage', component: BookPage },
  { path: "/authors/add", name: 'AddAuthor', component: AddAuthor },
  { path: "/authors/:id", name: 'AuthorPage', component: AuthorPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
