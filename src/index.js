import $ from 'jquery';
import css from './index.css';
import buttons from './buttons';
import render from './render';

function main() {
  buttons.addButtonListener();
  buttons.filterButtonListener();
  buttons.bookmarkClickListener();
  render.render();
}

$(main());
