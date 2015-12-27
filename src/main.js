import React from 'react';
import {render} from 'react-dom';
import Page from './components/Page';
import moment from 'moment'

var lang = (navigator.language || navigator.browserLanguage || 'en').split('-')[0];
console.log(lang)
moment.locale(lang)


var main = document.createElement('div');
main.id = 'main';
document.body.appendChild(main);
render(<Page/>, main);
