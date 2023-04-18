import { useEffect, useState } from 'react';

function HomePage() {
  const [memoInputValue, setMemoInputValue] = useState('');
  const [recentMemos, setRecentMemos] = useState([]);

  useEffect(() => {
    getRSS();
  }, []);

  function autoFocus() {
    const memoInput = document.querySelector("#bolt");
    useEffect(() => {
      memoInput.focus();
    }, []);
  }

  function vibrate() {
    const bolt = document.querySelector("#bolt");
    if (bolt) {
      bolt.classList.add("wiggle");
      setTimeout(function() {
        bolt.classList.remove("wiggle");
      }, 250);
    }
  }

  function runModal() {
    vibrate();
    const modal = document.querySelector("#modal");
    modal.style.display = "block";
    setTimeout(function() {
      closeModal();
    }, 3000);
  }

  function closeModal() {
    const modal = document.querySelector("#modal");
    modal.style.display = "none";
  }

  function runConfetti() {
    const confetti = require('canvas-confetti');
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
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  }

  function fly() {
    const button = document.querySelector("#submit");
    if (button) {
      button.classList.add("fly");
      setTimeout(function() {
        button.classList.remove("fly");
      }, 1200);
    }
  }

  function sendMemo() {
    var memoContent = document.getElementById("memo-input").value;
    if (memoContent === "") {
      runModal();
    } else {
      fly();
      const modal = document.querySelector("#modal");
      modal.style.display = "none";
      var memoData = {
        "content": memoContent
      };
      fetch('/api/memos/', {
        method: 'POST',
        body: JSON.stringify(memoData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.ok) {
            document.getElementById("memo-input").value = "";
            setMemoInputValue('');
            refreshRSS();
            runConfetti();
          } else {
            console.error('Failed to add memo');
          }
        })
        .catch(error => console.error(error));
    }
  }
  
  function deleteMemo(id) {
    const url = `/api/memos/${id}`;

    fetch(url, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        refreshRSS();
      } else {
        console.error(`Error deleting item ${id}: ${response.status} ${response.statusText}`);
      }
    })
    .catch(error => {
      console.error(`Error deleting item ${id}: ${error}`);
    });
  }

  function getRSS() {
    fetch('/api/memos/')
    .then(response => response.json())
    .then(data => {
      setRecentMemos(data);
    })
    .catch(error => {
        console.log(error);
    });
  }

  function refreshRSS() {
    getRSS();
  }

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
    return (
        <>
        <div id="modal" className="modal">
          <div className="modal-content">Add some text to send your memo!</div>
        </div>
        <div className="container">
          <div className="content-wrapper">
            <div className="input-container">
              <i id="bolt" className="fa-solid fa-bolt-lightning"></i>
              <textarea
                id="memo-input"
                className="memo-input"
                rows="1"
                value={memoInputValue}
                onChange={(e) => setMemoInputValue(e.target.value)}
              ></textarea>
              <i onClick={sendMemo} id="submit" className="send-button fa-solid fa-paper-plane"></i>
            </div>
            <div id="after-input">
              <h3 id="recents">
                Recent:
                <i onClick={refreshRSS} id="refresh" className="fa-solid fa-arrows-rotate"></i>
              </h3>
              <div id="posts"></div>
            </div>
          </div>
        </div>
        <div className="footer">
          <a href="https://github.com/dawescc/emems">
            <i className="fa-solid fa-rocket"></i> Github
          </a>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
      </>
    )
}

export default HomePage
  