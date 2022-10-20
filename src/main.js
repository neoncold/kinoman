import ProfileButton from './view/profile-button.js';
import MainNav from './view/main-nav.js';
import {render} from './render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

render(new ProfileButton(), siteHeaderElement);
render(new MainNav(), siteMainElement);