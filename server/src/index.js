import app from "./app.js";

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Portfolio API is running on http://localhost:${port}`);
});
