import { makeApp } from './app';

// se divide el makeApp() del servidor
const PORT = process.env.PORT || 3000;
const app = makeApp();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
