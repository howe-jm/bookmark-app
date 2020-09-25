import store from './store.js';
import api from './api';

function toolbarTemplate() {
  if (store.addingBookmark === false) {
    return `
    <div class="button-container">
      <form>
        <input type="button" id="js-add-new-bookmark" value="Add New" />
        <label for="select-rating">Minimum Rating: </label>
        <select name="select-rating" id="js-filter-bookmarks" />
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </form>
    </div>
    `;
  } else {
    return `
    <div class="button-container">
      <form>
        <input type="button" id="js-add-new-bookmark" value="Add New" /><label for="select-rating">Minimum Rating: </label>
        <select name="select-rating" id="js-filter-bookmarks" value="Filter By" />
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </form>
    </div>
    <div id="js-add-bookmark-form" class="add-bookmark-form">
      <h2>Add a bookmark:</h2>
        <form>
          <p><label for="bookmark-title">Give your bookmark a name:</label></p>
          <p><input type="text" name="bookmark-title" id="js-bookmark-title" placeholder="Google" required></p>
          <div class="https-error">
            <p><label for="bookmark-url">Add your URL:</label></p>
            <p>(e.g.: https://www.google.com)</p>
            <p><input type="url" name="bookmark-url" id="js-bookmark-url" placeholder="https://www.google.com/" required></p>
            <p class="https-text hidden">Must use 'https://'!</p>
          </div>
          <p><label for="rating">Rating (between 1 and 5):</label><input type="number" id="js-rating" name="rating" min="1" max="5" value="1" required></p>
          <p>Write a short description (optional)</p>
          <p><textarea name="bookmark-description" id="js-bookmark-description" placeholder="Google, the world's most ubiquitous search engine!"></textarea></p>
          <input type="submit" name="submit-bookmark" id="js-submit-bookmark" value="Submit Bookmark">
        </form> 
        <p class="error-text hidden">Title, URL, and Rating must be filled out!</p>
    </div>
    `;
  }
}

function bookmarksList(item) {
  if (item.collapsed) {
    return `
    <div class="bookmarks-container" data-item-id="${item.id}">
      <div class="bookmark js-bookmark">
          <span>
            ${item.title}
            <p>Rating: ${item.rating}</p>
          </span>
          <span>
            <input type="button" id="js-expand-bookmark" value="Expand" />
          </span>
        </div>
      </div>
    `;
  } else if (item.editing === true) {
    return `
    <div class="bookmarks-container" data-item-id="${item.id}">
        <form>
          <div class="bookmark js-bookmark">
            <p><label for="bookmark-title-edit">Give your bookmark a name:</label></p>
            <p><input type="text" name="bookmark-title-edit" class="js-bookmark-title-edit" value="${item.title}" placeholder="Bookmark title..." required></p>
          </div>
          <div class="bookmark-body-edit">
            <p><label for="rating-edit">Rating (between 1 and 5):</label></p>
            <p><input type="number" class="rating-edit" name="rating-edit" min="1" max="5" value="${item.rating}" required></p>
            <p><label for="bookmark-url-edit">Edit your URL:</label></p>
            <p><input type="url" name="bookmark-url-edit" class="js-bookmark-url-edit" value="${item.url}" placeholder="https://..." required></p>
            <p class="https-edit-error hidden">Must use https!</p>
            <p>Write a short description (optional)</p>
            <p><textarea name="bookmark-description-edit" class="js-bookmark-description-edit" placeholder="Description of website...">${item.desc}</textarea></p>
            <p class="bookmark-error-text hidden">Title, URL, and Rating must be filled out!</p> 
            <input type="submit" name="submit-bookmark" class="js-submit-edit" value="Submit Edited Bookmark">
          </form>
        </div>
      </div>
    `;
  } else {
    return `
    <div class="bookmarks-container" data-item-id="${item.id}">
      <div class="bookmark js-bookmark">
        <span>
          ${item.title}
          <p>Rating: ${item.rating}</p>
        </span>
        <span>
          <input type="button" id="js-expand-bookmark" value="Collapse" />
        </span>
      </div>
      <div class="bookmark-body">
        <form><input type="button" class="js-visit-site" value="Visit Site" /></form>
        <p class="desc-header"><h3>Description:</h3></div>
        <div class="bookmark-description">
        <p>${item.desc}</p>
        </div>
        <div class="lower-button-container">
        <p><input type="button" id="js-delete-bookmark" value="Delete" /></p><p><input type="button" id="js-edit-bookmark" value="Edit" /></p>
        </div>
      </div>
    </div>
      `;
  }
}

export default {
  toolbarTemplate,
  bookmarksList,
};
