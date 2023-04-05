// Version Meta Tag
const crypto = require('crypto');

function tagit() {
  // create the meta tag with the unique ID and formatted last modified date
  const meta = document.createElement('meta');
  meta.setAttribute('name', 'version');

  // generate MD5 hash of the lastModifiedDate
  const lastModifiedDate = new Date(document.lastModified);
  const hash = crypto.createHash('md5').update(lastModifiedDate.toISOString()).digest('hex').substr(-9);

  // set the content attribute to the MD5 hash
  meta.setAttribute('content', hash);

  // append the meta tag to the head of the document
  const head = document.getElementsByTagName('head')[0];
  head.appendChild(meta);
} 
tagit();
