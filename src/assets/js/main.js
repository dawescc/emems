      // get the modal element
      var modal = document.getElementById("myModal");

      // get the close button for the modal
      var closeBtn = document.getElementsByClassName("close")[0];

      // when the user clicks on the close button, close the modal
      closeBtn.onclick = function() {
        modal.style.display = "none";
      };

      // when the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };

      function sendMemo() {
        var memoContent = document.getElementById("memo-input").value;
        if (memoContent === "") {
          // if the text input field is empty, show the modal pop up
          modal.style.display = "block";
        } else {
          // otherwise, send the memo data via HTTP POST request
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
    button.click();
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
        post.innerHTML = `<a href="${link}"><p>${description}</p></a>`;
        postsContainer.appendChild(post);
    });
})
.catch(error => {
    console.log(error);
});