// Focus on Text bar on load
window.addEventListener("load", function() {
  const memoInput = document.querySelector("#memo-input");
  memoInput.focus();
});

// Close the modal
var modal = document.getElementById("modal");
var good_modal = document.getElementById("success");
var closeBtn = document.getElementsByClassName("close")[0];

closeBtn.onclick = function() {
  modal.style.display = "none";
  good_modal.style.display = "none";
};

// Confetti function
function runConfetti() {
  var duration = 1.75 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
  
  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }
  var interval = setInterval(function() {
    var timeLeft = animationEnd - Date.now();
  
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
  
    var particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
  }, 250);
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
      runConfetti();
      document.getElementById("memo-input").value = ""; // clear the text box
      const targetElement = document.querySelector(".input-container"); // remove green bolt
      targetElement.classList.remove("active");
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
    if (!postsContainer.hasChildNodes()) {
      const pubby = xml.querySelectorAll('pubDate');
      const pubbydate = pubby[0].innerHTML
      const nopost = document.createElement('div');
      nopost.className = 'nopost';
      nopost.innerHTML =
      
      `<p style="text-align:center;">
      <i class="fa-regular fa-thumbs-down"></i>
      <br /><br />
      No Posts
      <br /><br />
      Last Checked: ${pubbydate}</p>`;

      postsContainer.appendChild(nopost);
    }
})
.catch(error => {
    console.log(error);
});


// When text is present, allow resizing up to 50% height
// change color of bolt to green
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

// create the meta tag with the unique ID and formatted last modified date
var meta = document.createElement('meta');
meta.setAttribute('name', 'version');
var lastModifiedDate = new Date(document.lastModified);
meta.setAttribute('content', lastModifiedDate.toISOString());

// append the meta tag to the head of the document
var head = document.getElementsByTagName('head')[0];
head.appendChild(meta);

