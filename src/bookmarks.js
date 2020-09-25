import $ from 'jquery';
import templates from './templates';
import store from './store';
import api from './api';

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
    if (desc === '' || desc === undefined) {
      desc = 'No description entered.';
    }
    let dataObj = { title: title, url: url, desc: desc, rating: rating, desc: desc };
    if (title === '' || title === undefined || url === '' || url === undefined || rating === undefined) {
      $('#js-add-bookmark-form').addClass('error-container');
      $('.error-text').removeClass('hidden');
    } else if (url[4] != 's' || url[5] != ':') {
      $('.https-error').addClass('error-container');
      $('.https-text').removeClass('hidden');
    } else {
      api.addItem(dataObj).then(() =>
        api
          .fetchBookmarks()
          .then((res) => res.json())
          .then((items) => {
            store.STORE = [];
            items.forEach((item) => store.localPushItem(item));
            render();
          })
      );
      console.log('Did we make it here?');
    }
  });
}

/* function filterButtonListener() {
  $('#bookmarks-toolbar').on('click', '#js-filter-bookmarks', function (event) {
    event.preventDefault();
    console.log('Filter bookmarks');
  });
} */

function filterSelectorListener() {
  $('#bookmarks-toolbar').on('change', function () {
    let rateVal = `${$(this).find(':selected').val()}`;
    store.filterResultsBy(rateVal);
    $(this).val(rateVal);
  });
}

function bookmarkClickListener() {
  $('#bookmarks-list').on('click', '#js-expand-bookmark', (event) => {
    const id = getItemIdFromElement(event.currentTarget);
    store.collapseElement(id);
    render();
  });
}

function bookmarkDeleteListener() {
  $('#bookmarks-list').on('click', '#js-delete-bookmark', function (event) {
    event.preventDefault();
    let id = getItemIdFromElement(event.currentTarget);
    api.deleteItem(id).then(() => {
      store.deleteElement(id);
      render();
    });
  });
}

function bookmarkEditListener() {
  $('#bookmarks-list').on('click', '#js-edit-bookmark', (event) => {
    event.preventDefault();
    let id = getItemIdFromElement(event.currentTarget);
    store.editElement(id);
    console.log('Clicked edit!');
    render();
  });
}

function bookmarkSubmitEditListner() {
  $('#bookmarks-list').on('click', '.js-submit-edit', (event) => {
    event.preventDefault();
    let title = $('.js-bookmark-title-edit').val();
    let url = $('.js-bookmark-url-edit').val();
    let rating = $('.rating-edit').val();
    if (rating > 5) {
      rating = 5;
    } else if (rating < 1) {
      rating = 1;
    }
    let desc = $('.js-bookmark-description-edit').val();
    if (desc === '' || desc === undefined) {
      desc = 'No description entered.';
    }
    let dataObj = { title: title, url: url, desc: desc, rating: rating, desc: desc };
    if (title === '' || title === undefined || url === '' || url === undefined || rating === undefined) {
      $('.bookmark-body-edit').addClass('error-container');
      $('.bookmark-error-text').removeClass('hidden');
    } else if (url[4] != 's' || url[5] != ':') {
      $('.bookmark-body-edit').addClass('error-container');
      $('.https-edit-error').removeClass('hidden');
    } else {
      let id = getItemIdFromElement(event.currentTarget);
      api.editItem(dataObj, id).then(() =>
        api
          .fetchBookmarks()
          .then((res) => res.json())
          .then((items) => {
            store.STORE = [];
            items.forEach((item) => store.localPushItem(item));
            render();
          })
      );
      // Reserved for API PATCH call.
    }
  });
}

function getItemIdFromElement(item) {
  return $(item).closest('.bookmarks-container').data('item-id');
}

function render() {
  $('#js-filter-bookmarks').val(`${store.sortedBy}`);
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

function bindListeners() {
  addButtonListener();
  submitButtonListener();
  // filterButtonListener();
  filterSelectorListener();
  bookmarkClickListener();
  bookmarkDeleteListener();
  bookmarkEditListener();
  bookmarkSubmitEditListner();
}

export default {
  bindListeners,
  getItemIdFromElement,
  render,
  generateBookmarkString,
};
