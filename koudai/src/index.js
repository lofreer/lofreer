import { Simple, Router } from 'components';
import routes from './routes';

import './js/components/style.less'

Simple.render(Simple.createElement(Router, {history: 'hash', routes: routes()}), document.querySelector('#root'));

