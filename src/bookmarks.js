import $ from 'jquery';
import templates from './templates';
import store from './store';
import api from './api';

function addButtonListener() {
  $('#js-main').on('click', '#js-add-new-bookmark', function (event) {
    event.preventDefault();
    store.addingBookmark = !store.addingBookmark;
    render();
  });
}

function submitButtonListener() {
  $('#js-main').on('click', '#js-submit-bookmark', function (event) {
    event.preventDefault();
    store.FORMDATA.title = $('#js-bookmark-title').val();
    store.FORMDATA.url = $('#js-bookmark-url').val();
    store.FORMDATA.rating = $('#js-rating').val();
    if (store.FORMDATA.rating > 5) {
      store.FORMDATA.rating = 5;
    } else if (store.FORMDATA.rating < 1) {
      store.FORMDATA.rating = 1;
    }
    store.FORMDATA.desc = $('#js-bookmark-description').val();
    if (store.FORMDATA.desc === '' || store.FORMDATA.desc === undefined) {
      store.FORMDATA.desc = 'No description entered.';
    }
    if (store.FORMDATA.title === '' || store.FORMDATA.title === undefined || store.FORMDATA.url === '' || store.FORMDATA.url === undefined || store.FORMDATA.rating === undefined) {
      store.incompleteForm = true;
      render();
    } else if (store.FORMDATA.url[4] != 's' || store.FORMDATA.url[5] != ':') {
      store.httpsError = true;
      render();
    } else {
      store.incompleteForm = 0;
      store.httpsError = 0;
      api.addItem(store.FORMDATA).then(() =>
        api
          .fetchBookmarks()
          .then((res) => res.json())
          .then((items) => {
            store.STORE = [];
            items.forEach((item) => store.localPushItem(item));
            store.addingBookmark = !store.addingBookmark;
            store.FORMDATA = {
              title: '',
              url: '',
              rating: 1,
              desc: '',
            };
            render();
          })
      );
    }
  });
}

function filterSelectorListener() {
  $('#js-main').on('change', '#select-rating', function () {
    let rateVal = `${$(this).find(':selected').val()}`;
    store.sortedBy = rateVal;
    store.filterResultsBy();
    api
      .fetchBookmarks()
      .then((res) => res.json())
      .then((items) => {
        store.STORE = [];
        items.forEach((item) => store.localPushItem(item));
      });
    render();
  });
}

function bookmarkClickListener() {
  $('#js-main').on('click', '#js-expand-bookmark', (event) => {
    const id = getItemIdFromElement(event.currentTarget);
    store.collapseElement(id);
    render();
  });
}

function bookmarkDeleteListener() {
  $('#js-main').on('click', '#js-delete-bookmark', function (event) {
    event.preventDefault();
    let id = getItemIdFromElement(event.currentTarget);
    api.deleteItem(id).then(() => {
      store.deleteElement(id);
      render();
    });
  });
}

function bookmarkVisitSiteListner() {
  $('#js-main').on('click', '.js-visit-site', (event) => {
    event.preventDefault();
    const id = getItemIdFromElement(event.currentTarget);
    const url = store.getItemURL(id);
    window.open(`${url}`);
  });
}

function bookmarkEditListener() {
  $('#js-main').on('click', '#js-edit-bookmark', (event) => {
    event.preventDefault();
    let id = getItemIdFromElement(event.currentTarget);
    store.editElement(id);
    render();
  });
}

function bookmarkSubmitEditListner() {
  $('#js-main').on('click', '.js-submit-edit', (event) => {
    event.preventDefault();
    store.EDITFORMDATA.title = $('.js-bookmark-title-edit').val();
    store.EDITFORMDATA.url = $('.js-bookmark-url-edit').val();
    store.EDITFORMDATA.rating = $('.rating-edit').val();
    if (store.EDITFORMDATA.rating > 5) {
      store.EDITFORMDATA.rating = 5;
    } else if (store.EDITFORMDATA.rating < 1) {
      store.EDITFORMDATA.rating = 1;
    }
    store.EDITFORMDATA.desc = $('.js-bookmark-description-edit').val();
    if (store.EDITFORMDATA.desc === '' || store.EDITFORMDATA.desc === undefined) {
      store.EDITFORMDATA.desc = 'No description entered.';
    }
    if (store.EDITFORMDATA.title === '' || store.EDITFORMDATA.title === undefined || store.EDITFORMDATA.url === '' || store.EDITFORMDATA.url === undefined || store.EDITFORMDATA.rating === undefined) {
      store.editIncompleteForm = true;
      render();
    } else if (store.EDITFORMDATA.url[4] != 's' || store.EDITFORMDATA.url[5] != ':') {
      store.editHttpsError = true;
      render();
    } else {
      let id = getItemIdFromElement(event.currentTarget);
      api.editItem(store.EDITFORMDATA, id).then(() =>
        api
          .fetchBookmarks()
          .then((res) => res.json())
          .then((items) => {
            store.STORE = [];
            items.forEach((item) => store.localPushItem(item));
            store.EDITFORMDATA = {
              title: '',
              url: '',
              rating: 1,
              desc: '',
            };
            render();
          })
      );
    }
  });
}

function getItemIdFromElement(item) {
  return $(item).closest('.bookmarks-container').data('item-id');
}

function render() {
  store.filterResultsBy(store.sortedBy);
  $('#js-main').html(templates.frameworkTemplate());
  $('#bookmarks-toolbar').html(templates.toolbarTemplate());
  $('#bookmarks-list').html(generateBookmarkString(store.STORE));
  $('#select-rating').val(`${store.sortedBy}`);
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
  bookmarkVisitSiteListner();
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
