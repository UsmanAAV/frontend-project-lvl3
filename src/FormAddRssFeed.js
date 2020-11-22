function renderAddRSSFeedForm() {
  return `
    <div class="jumbotron">
      <form class="form-inline">
        <label class="sr-only" for="inlineFormInputName2">RSS-поток</label>
        <input type="text" class="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="RSS-поток">

        <button type="submit" class="btn btn-primary mb-2">Добавить</button>
      </form>
    </div>
  `;
}

export { renderAddRSSFeedForm };
