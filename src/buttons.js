import $ from 'jquery';

function addButtonListener() {
  $('#js-add-new-bookmark').on('click', function (event) {
    event.preventDefault();
    console.log('Add bookmark');
  });
}

function filterButtonListener() {
  $('#js-filter-bookmarks').on('click', function (event) {
    event.preventDefault();
    console.log('Filter bookmarks');
  });
}

function bookmarkClickListener() {
  $('.js-bookmark').on('click', function (event) {
    console.log('You clicked the thing!');
  });
}

export default {
  addButtonListener,
  filterButtonListener,
  bookmarkClickListener,
};
