import ProfileButton from './view/profile-button.js';
import {render} from './render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

render(new ProfileButton(), siteHeaderElement);