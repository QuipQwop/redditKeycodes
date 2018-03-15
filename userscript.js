
/*
Copyright 2015

This file is part of Reddit Shortcut Keys.
Reddit Shortcut Keys is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
Reddit Shortcut Keys is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with Reddit Shortcut Keys.  If not, see <http://www.gnu.org/licenses/>.
*/

// ==UserScript==
// @name         Reddit Keycodes
// @version      1.0
// @description  see README
// @author       Zack Baker
// @match        https://www.reddit.com/*
// @match        https://www.redditgifts.com/*
// @grant        none
// ==/UserScript==
'use strict';

setTimeout(function(){$("body").append("<script type='text/javascript' src='https://rawgit.com/QuipQwop/redditKeycodes/master/redditKeycodes.js'></script>")}, 200)//set a timeout of 500 ms to let jquery load properly