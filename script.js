function createPost() {
    const postInput = document.getElementById('postInput');
    const feed = document.getElementById('feed');

    if (postInput.value.trim() === "") return;

    // Create unique ID for this post
    const postId = Date.now();

    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.innerHTML = `
        <p class="post-text">${postInput.value}</p>
        
        <div class="post-actions">
            <button class="like-btn" onclick="toggleLike(this)">Like <span>0</span></button>
        </div>

        <div class="comment-section">
            <ul class="comment-list" id="comments-${postId}"></ul>
            <div class="comment-input-area">
                <input type="text" placeholder="Write a comment..." id="input-${postId}">
                <button onclick="addComment(${postId})">Reply</button>
            </div>
        </div>
    `;

    feed.prepend(postElement); // Adds new post to the top
    postInput.value = ""; // Clear input
}

function toggleLike(btn) {
    const span = btn.querySelector('span');
    let count = parseInt(span.innerText);
    
    btn.classList.toggle('liked');
    
    if (btn.classList.contains('liked')) {
        span.innerText = count + 1;
    } else {
        span.innerText = count - 1;
    }
}

function addComment(postId) {
    const input = document.getElementById(`input-${postId}`);
    const list = document.getElementById(`comments-${postId}`);

    if (input.value.trim() === "") return;

    // Buat ID unik untuk setiap komen supaya senang nak delete
    const commentId = 'comment-' + Date.now();

    const li = document.createElement('li');
    li.id = commentId; // Set ID pada element li
    li.innerHTML = `
        <span class="comment-text">${input.value}</span>
        <button class="delete-btn" onclick="removeComment('${commentId}')">Delete</button>
    `;
    
    list.appendChild(li);
    input.value = "";
}

// Fungsi baru untuk buang komen
function removeComment(commentId) {
    const commentElement = document.getElementById(commentId);
    if (commentElement) {
        commentElement.remove();
    }
}