import { Simple, Router } from 'components';
import routes from './routes';

import './css/initialization.css';
import './css/style.less'

Simple.render(Simple.createElement(Router, {history: 'hash', routes: routes()}), document.querySelector('#root'));

