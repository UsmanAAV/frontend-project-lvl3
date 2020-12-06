import { FORM_ID } from './constants';

function renderAddRSSFeedForm() {
  const inputId = 'rss-url-input';
  return `
    <div class="jumbotron jumbotron-fluid">
      <div class="container-xl">
        <div class="row">
          <div class="col-md-10 col-lg-8 mx-auto">
            <h1 class="display-3">RSS Reader</h1>
            <p class="lead">Start reading RSS today! It is easy, it is nicely.</p>
            <label for="${inputId}">RSS link. Example: https://ru.hexlet.io/lessons.rss</label>
            <form id="${FORM_ID}">
              <div class="form-row">
                <div class="col">
                  <input type="text" class="form-control form-control-lg w-100" id="${inputId}">
                </div>
                <div class="col-auto">
                  <button type="submit" class="btn btn-lg btn-primary px-sm-5">Add</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
}

export { renderAddRSSFeedForm };
