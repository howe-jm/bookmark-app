import css from './index.css';
import buttons from './buttons';
import $ from 'jquery';

function main() {
  buttons.addButtonListener();
  buttons.filterButtonListener();
  buttons.bookmarkClickListener();
}

$(main());
