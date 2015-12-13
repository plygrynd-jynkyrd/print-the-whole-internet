'use strict';

let logger = require('winston');

let queue = require('./../queue');
let pageReader = require('./../page-reader');
let htmlParser = require('./../html-parser')




let readUrlAndSaveItsLinks = url => {
  pageReader
  .readUrl(url)
  .then(body => {

    queue.setContent('page', url, body)
    .then(() => {
      logger.log('info', '> read ' + url);

      let links = htmlParser.findLinksInPage(url, body);



      let saveLinksFunctions = links.map(link => {
        return queue.set('link', link);
      })

      Promise.all(saveLinksFunctions).then(a => {
        logger.log('info', '> > ' + links.length + ' saved ');
      })
    })
    .catch(e => {
      console.log("EAE", e)

    })
  })
  .catch(e => console.log("erro while reading dasdsadaulr " + url, e.stack))
};

readUrlAndSaveItsLinks("https://en.wikipedia.org/wiki/Main_Page");


//let getUrlContent = url => {
//
//  return readUrl(url)
//    .then(links => {
//      winston.log('info', '>> found: ' + links.length + ' links from ' + url);
//      return links.map(link => getLinksFromUrl(link));
//    })
//    .catch(e =>  winston.log('error', e));
//};
//
//getLinksFromUrl()
//  .then(links => {
//    //console.log("moar links", links.length)
//    links.forEach(link => getLinksFromUrl(link))
//  })
//  .catch(err => console.log("erro2", err));