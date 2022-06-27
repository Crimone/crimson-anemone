// ==UserScript==
// @name replace sigma9
// @version 1.0.0
// @author Mercuresphere
// @description 修复 sigma9 无法加载的问题
// @homepage
// @supportURL
// @match *://scp-wiki-cn.wikidot.com
// @match *://scp-wiki-cn.wikidot.com/*
// @match *://*.wikidot.com/*
// @license MIT
// @run-at document-start
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==

((document) => {
  'use strict';
  const fastNode = 'fastly.jsdelivr.net/gh/scp-cn-tech/sigma9@1.0.9/cn/sigma9_ch.min.css';
  let failed;
  let isRunning;
  const DEST_LIST = [
    'sigma9.zokhoi.com/cn/cn/sigma9_ch.min.css'
  ];
  const PREFIX = '//';
  const SOURCE = DEST_LIST[0];
  const starTime = Date.now();
  const TIMEOUT = 2000;
  const shouldReplace = (text) => text && text.includes(PREFIX + SOURCE);
  const replace = (text) => text.replace(PREFIX + SOURCE, PREFIX + fastNode);
  const setTimeout = window.setTimeout;
  const $ = document.querySelectorAll.bind(document);
  let element;
  let value;
  for (element of $('link[rel="stylesheet"]')) {
      value = element.href;
      if (shouldReplace(value)) {
          element.href = replace(value);
      }
  }
  for (element of $('script')) {
      value = element.src;
      if (shouldReplace(value)) {
          const newNode = document.createElement('script');
          newNode.src = replace(value);
          element.defer = true;
          element.src = '';
          element.before(newNode);
          element.remove();
      }
  }
  for (element of $('img')) {
      value = element.src;
      if (shouldReplace(value)) {
          // Used to cancel loading. Without this line it will remain pending status.
          element.src = '';
          element.src = replace(value);
      }
  }
  // All elements that have a style attribute
  for (element of $('*[style]')) {
      value = element.getAttribute('style');
      if (shouldReplace(value)) {
          element.setAttribute('style', replace(value));
      }
  }
  for (element of $('style')) {
      value = element.innerHTML;
      if (shouldReplace(value)) {
          element.innerHTML = replace(value);
      }
  }
})(document);