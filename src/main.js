import React from 'react';
import {render} from 'react-dom';
import Page from './components/Page';


var main = document.createElement('div');
main.id = 'main';
document.body.appendChild(main);
render(<Page/>, main);
