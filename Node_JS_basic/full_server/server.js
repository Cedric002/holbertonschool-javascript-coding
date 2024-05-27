import express from "express";
import routes from "./routes";

const app = express();
app.use(routes);

app.listen(1245, () => {
  console.log("Server running on port 1245");
});

export default app;
