const inputCon = document.querySelector(".input-container");
const bolt = document.querySelector("#bolt");
const memoInput = document.querySelector("#memo-input");
const button = document.querySelector("#submit");
const modal = document.querySelector("#modal");

// Focus on Text bar on load
function autoFocus() {
  window.addEventListener("load", function() {
    memoInput.focus();
  });
} autoFocus();

// No Input - Vibrate
function vibrate() {
  if (bolt) {
    bolt.classList.add("wiggle");
    setTimeout(function() {
      bolt.classList.remove("wiggle");
    }, 250); // Remove the wiggle class after .25 seconds
  }
}

// No Input - Modal Function
function runModal() {
  vibrate();
  modal.style.display = "block";
  setTimeout(function() {
    closeModal();
  }, 3000);
}
// No Input - Close Modal Function
function closeModal() {
  modal.style.display = "none";
}

// Succesful Input Confetti Function
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
}

// Succesful Input - Fly
function fly() {
  if (button) {
    button.classList.add("fly");
    setTimeout(function() {
      button.classList.remove("fly");
    }, 1200); // Remove the fly class after 1.5 seconds
  }
}

// Send Memo function
function sendMemo() {
  var memoContent = document.getElementById("memo-input").value;
  if (memoContent === "") {
  // Field Empty
    // show modal
    runModal();
    } else {
      // Field not Empty
    fly();
    // hide modal (if open)
    modal.style.display = "none";
    // set content to input data
    var memoData = {
      "content": memoContent
    };
    // Send HTTP Request
    fetch('http://localhost:3000/memos', {
      method: 'POST',
      body: JSON.stringify(memoData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        // Successful
        if (response.ok) {
          console.log('Memo added successfully');
          // clear the text box
          document.getElementById("memo-input").value = "";
          // remove indicators
          bolt.classList.remove("active");
          // celebrate!
          // update the feed
          refreshRSS();
          runConfetti();
        // Unsuccessful
        } else {
          // log it
          console.error('Failed to add memo');
        }
      })
      // if any error, log it
      .catch(error => console.error(error));
    }

}
// Delete Memo Function
function deleteMemo(id) {
  // Construct the URL with the ID parameter
  const url = `http://localhost:3000/memos/${id}`;
  
  // Send the DELETE request with fetch()
  fetch(url, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      console.log(`Item ${id} deleted successfully.`);
      refreshRSS();
    } else {
      console.error(`Error deleting item ${id}: ${response.status} ${response.statusText}`);
    }
  })
  .catch(error => {
    console.error(`Error deleting item ${id}: ${error}`);
  });
}

// Enter = sendMemo()
// Shift + Enter = New Line
  // When button is pressed down
memoInput.addEventListener('keydown', event => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
  }
});
  // When button is released
memoInput.addEventListener('keyup', event => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    button.click();
  }
});

// RSS Feed for Recent Posts
function getRSS() {
  fetch('http://localhost:3000/memos/')
  .then(response => response.json())
  .then(data => {
      const postsContainer = document.getElementById('posts');
      data.forEach(memo => {
          const link = memo.link;
          const id = memo.memo_num;
          const description = memo.content;
          const post = document.createElement('div');
          post.className = 'post';
          post.id = `${id}`;
          const posttxtid =`${id}_text`
          console.log(posttxtid)
          post.innerHTML = 
          `<a id="${id}" target="_blank" href="${link}">
          <i id="linky" class="fa-solid fa-external-link"></i>
          </a>
          <p id="${id}_text">${description}</p>
          <i id="trash" onclick="deleteMemo(${id})" class="fa-solid fa-trash-can"></i>`;
          postsContainer.appendChild(post);
      });

      if (!postsContainer.hasChildNodes()) {
        const nopost = document.createElement('div');
        nopost.className = 'nopost';
        nopost.innerHTML = 
        `<p><i class="fa-regular fa-thumbs-down"></i>
        ${getRandomEmptyText()}</p>`;
  
        postsContainer.appendChild(nopost);
      }
  })
  .catch(error => {
      console.log(error);
  });
} getRSS();

// Refresh Posts
function refreshRSS() {
  const postsContainer = document.querySelector('#posts');
  postsContainer.innerHTML = ``; // Clear existing posts

  // Call the getRSS() function to fetch and render new posts
  getRSS();
}

// Refresh Button Animation
const refButton = document.getElementById("refresh");

refButton.addEventListener("mouseup", function() {
  refButton.classList.toggle("clicked");
  setTimeout(function() {
    refButton.classList.toggle("clicked");
  }, 350);
});

// When text is present, allow resizing up to 50% height
// change color of bolt to green
memoInput.addEventListener("input", function() {
  if (memoInput.value.trim() !== "") {
    bolt.classList.add("active");
    memoInput.classList.add("sizeable");
  } else {
    bolt.classList.remove("active");
    memoInput.classList.remove("sizeable");
  }
});

// Version Meta Tag
function tagit() {
  // create the meta tag with the unique ID and formatted last modified date
  var meta = document.createElement('meta');
  meta.setAttribute('name', 'version');
  var lastModifiedDate = new Date(document.lastModified);
  meta.setAttribute('content', lastModifiedDate.toISOString());
  
  // append the meta tag to the head of the document
  var head = document.getElementsByTagName('head')[0];
  head.appendChild(meta);
} tagit();

//Random Phrases
function getRandomEmptyText() {
  const emptyTexts = [
    "There ain't shit here, chief.",
    "Looks like a barren wasteland, partner.",
    "This page is about as empty as my bank account.",
    "Nothing to see here, move along.",
    "You've stumbled upon a void, my friend.",
    "This is not the web page you're looking for.",
    "404: Page not found, but at least the background is pretty.",
    "Looks like this page is taking a long nap.",
    "Sorry, this page is on vacation.",
    "The page you are looking for has left the building.",
    "Looks like we hit a dead end.",
    "You've reached the end of the internet, try again later.",
    "This page is feeling a little empty today.",
    "Looks like this page is on sabbatical.",
    "You've entered the abyss of the internet.",
    "Looks like someone forgot to put content here.",
    "Nothing to do here, except leave.",
    "Seems like this page is taking a break.",
    "Oops! The page you are looking for is MIA.",
    "The place is drier than a bone in the desert.",
    "One might as well be walking through an empty void, because that's exactly what it is.",
    "The area is about as lively as a funeral procession.",
    "One could be forgiven for thinking it's just an elaborate prank, because there's nothing there.",
    "The chance of finding something interesting there is like finding a needle in a haystack.",
    "It's like someone took a vacuum cleaner to the area and sucked all the life out of it.",
    "A tumbleweed could roll by, that's how empty it is.",
    "The place is about as exciting as watching paint dry.",
    "One could host a party there, but the only guests would be crickets.",
    "It's a ghost town, and there are no ghosts except for the emptiness.",
    "The area is where dreams come to die.",
    "The chance of finding something of interest there is like finding a pot of gold at the end of a rainbow.",
    "The place is about as happening as a nursing home on bingo night.",
    "A sloth would find the place boring.",
    "There is nothing there to excite even the most adventurous souls."
  ];
  const randomIndex = Math.floor(Math.random() * emptyTexts.length);
  return emptyTexts[randomIndex];
}
