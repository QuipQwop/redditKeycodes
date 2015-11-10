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