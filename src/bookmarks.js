import $ from 'jquery';
import css from './index.css';
import cuid from 'cuid';
import templates from './templates';
import store from './store';

function addButtonListener() {
  $('#bookmarks-toolbar').on('click', '#js-add-new-bookmark', function (event) {
    event.preventDefault();
    store.addingBookmark = !store.addingBookmark;
    render();
  });
}

function submitButtonListener() {
  $('#bookmarks-toolbar').on('click', '#js-submit-bookmark', function (event) {
    event.preventDefault();
    let title = $('#js-bookmark-title').val();
    let url = $('#js-bookmark-url').val();
    let rating = $('#js-rating').val();
    if (rating > 5) {
      rating = 5;
    } else if (rating < 1) {
      rating = 1;
    }
    let desc = $('#js-bookmark-description').val();
    let dataObj = { id: cuid(), name: title, url: url, rating: rating, description: desc, collapsed: true };
    store.addElement(dataObj);
    render();
  });
}

function filterButtonListener() {
  $('#bookmarks-toolbar').on('click', '#js-filter-bookmarks', function (event) {
    event.preventDefault();
    console.log('Filter bookmarks');
  });
}

function bookmarkClickListener() {
  $('#bookmarks-list').on('click', '.js-bookmark', (event) => {
    const id = getItemIdFromElement(event.currentTarget);
    store.collapseElement(id);
    render();
  });
}

function bookmarkDeleteListener() {
  $('#bookmarks-list').on('click', '#js-delete-bookmark', function (event) {
    event.preventDefault();
    let id = getItemIdFromElement(event.currentTarget);
    store.deleteElement(id);
    render();
  });
}

const getItemIdFromElement = function (item) {
  return $(item).closest('.bookmarks-container').data('item-id');
};

function render() {
  $('#bookmarks-toolbar').html(templates.toolbarTemplate());
  $('#bookmarks-list').html(generateBookmarkString(store.STORE));
}

function generateBookmarkString(store) {
  let stringArray = [];
  for (let i = 0; i < store.length; i++) {
    stringArray.push(templates.bookmarksList(store[i]));
  }
  return stringArray.join('');
}

export default {
  addButtonListener,
  filterButtonListener,
  bookmarkClickListener,
  getItemIdFromElement,
  render,
  generateBookmarkString,
  bookmarkDeleteListener,
  submitButtonListener,
};
