import { renderAddRSSFeedForm } from "./FormAddRssFeed";

const APP_TITLE = "RSS reader";

function app() {
  document.title = APP_TITLE;
  const mountPoint = document.querySelector("#point");
  mountPoint.innerHTML = renderAddRSSFeedForm();
}

export { app };
