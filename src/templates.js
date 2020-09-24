import store from './store.js';

function toolbarTemplate() {
  if (store.addingBookmark === false) {
    return `<div class="button-container">
        <form><input type="button" id="js-add-new-bookmark" value="Add New" /><input type="button" id="js-filter-bookmarks" value="Filter By" /></form>
      </div>`;
  } else {
    return `
    <div class="button-container">
        <form><input type="button" id="js-add-new-bookmark" value="Add New" /><input type="button" id="js-filter-bookmarks" value="Filter By" /></form>
      </div>
    <div id="js-add-bookmark-form" class="add-bookmark-form">
        <h2>Add a bookmark:</h2>
        <form>
            <p><label for="bookmark-title">Give your bookmark a name:</label></p>
            <p><input type="text" name="bookmark-title" id="js-bookmark-title" placeholder="Bookmark title..." required></p>
            <p><label for="bookmark-url">Add your URL (must use HTTPS!):</label></p>
            <p><input type="url" name="bookmark-url" id="js-bookmark-url" placeholder="https://..." required></p>
            <p><label for="rating">Rating (between 1 and 5):</label></p>
            <p><input type="number" id="rating" name="rating" min="1" max="5" required></p>
            <p>Write a short description (optional)</p>
            <p><textarea name="bookmark-description" id="js-bookmark-description" placeholder="Description of website..."></textarea></p>
            <input type="submit" name="submit-bookmark" id="js-submit-bookmark" value="Submit Bookmark">
            </form> 
    </div>
    `;
  }
}

function bookmarksList(item) {
  if (item.collapsed) {
    return `
    <div class="bookmarks-container" data-item-id="${item.id}">
    <div class="bookmark js-bookmark"><p>${item.name}</p></div></div>
    `;
  } else {
    return `<div class="bookmarks-container" data-item-id="${item.id}">
        <div class="bookmark js-bookmark"><p>${item.name}</p></div>
        <div class="bookmark-body">
        <p><a href="${item.url}">${item.url}</a></p>
          <form><input type="button" id="js-visit-site" value="Visit Site" /><input type="button" id="js-delete-bookmark" value="Delete" /><span class="bookmark-rating js-bookmark-rating">5</span></form>
          <p>${item.description}</p>
          <form><input type="button" id="edit-bookmark" value="Edit" /></form>
          </div>
          </div>
          `;
  }
}

export default {
  toolbarTemplate,
  bookmarksList,
};
