// Focus on Text bar on load
window.addEventListener("load", function() {
  const memoInput = document.querySelector("#memo-input");
  memoInput.focus();
});

// Close the modal
var modal = document.getElementById("modal");
var closeBtn = document.getElementsByClassName("close")[0];

closeBtn.onclick = function() {
  modal.style.display = "none";
};

// Send Memo function
function sendMemo() {
  var memoContent = document.getElementById("memo-input").value;
  if (memoContent === "") {
    // if the text input field is empty, show the modal pop up
    modal.style.display = "block";
  } else {
    // otherwise, send the memo data via HTTP POST request
    modal.style.display = "none";
    var memoData = {
      "content": memoContent
    };
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "https://memos.dawes.casa/api/memo?openId=05d3578b-8672-447c-8fff-dec4db3df6dc");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(memoData));
      document.getElementById("memo-input").value = ""; // clear the text box
  }
}

// Enter = sendMemo()
// Shift + Enter = New Line
const input = document.getElementById('memo-input');
const button = document.getElementById('submit');
  // When button is pressed down
input.addEventListener('keydown', event => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    button.style.setProperty("background-color", "rgba(0,0,0, .25)", "important");
  }
});
  // When button is released
input.addEventListener('keyup', event => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    button.click();
    button.style.setProperty("background-color", "rgba(0,0,0, .00)", "important");
  }
});

// RSS Feed for Recent Posts
fetch('https://memos.dawes.casa/explore/rss.xml')
.then(response => response.text())
.then(xmlString => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlString, 'application/xml');
    const items = xml.querySelectorAll('item');
    const postsContainer = document.getElementById('posts');
    items.forEach(item => {
        const title = item.querySelector('title').textContent;
        const link = item.querySelector('link').textContent;
        const description = item.querySelector('description').textContent;
        const post = document.createElement('div');
        post.className = 'post';
        post.innerHTML = `<a target="_blank" href="${link}"><p>${description}</p></a>`;
        postsContainer.appendChild(post);
    });
})
.catch(error => {
    console.log(error);
});


// When text is present, allow resizing up to 50% height
const memoInput = document.querySelector("#memo-input");
const targetElement = document.querySelector(".input-container");

memoInput.addEventListener("input", function() {
  if (memoInput.value.trim() !== "") {
    targetElement.classList.add("active");
    memoInput.classList.add("sizeable");
  } else {
    targetElement.classList.remove("active");
    memoInput.classList.remove("sizeable");
  }
});

// Version Meta Tag
function addMetaTagWithUniqueId() {
  // generate a random ID string
  var id = 'meta-' + Math.random().toString(36).substr(2, 9);

  // create the meta tag with the unique ID and formatted last modified date
  var meta = document.createElement('meta');
  meta.setAttribute('name', 'version');
  var lastModifiedDate = new Date(document.lastModified);
  meta.setAttribute('content', lastModifiedDate.toISOString().substr(0, 10));

  // append the meta tag to the head of the document
  var head = document.getElementsByTagName('head')[0];
  head.appendChild(meta);
}

addMetaTagWithUniqueId()

//
