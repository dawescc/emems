// get the modal element
var modal = document.getElementById("myModal");

// get the close button for the modal
var closeBtn = document.getElementsByClassName("close")[0];

// when the user clicks on the close button, close the modal
closeBtn.onclick = function() {
  modal.style.display = "none";
};

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
  }}

const input = document.getElementById('memo-input');
const button = document.getElementById('submit');

input.addEventListener('keydown', event => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    button.style.setProperty("background-color", "rgba(0,0,0, .25)", "important");
  }
});

input.addEventListener('keyup', event => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    button.click();
    button.style.setProperty("background-color", "rgba(0,0,0, .00)", "important");
  }
});

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

window.addEventListener("load", function() {
  const memoInput = document.querySelector("#memo-input");
  memoInput.focus();
});

