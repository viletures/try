function createPost() {
    const postInput = document.getElementById('postInput');
    const feed = document.getElementById('feed');

    if (postInput.value.trim() === "") return;

    const postId = 'post-' + Date.now(); // Improved ID naming

    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.id = postId;
    postElement.innerHTML = `
        <div style="display: flex; justify-content: space-between;">
            <p class="post-text">${postInput.value}</p>
            <button class="delete-btn" onclick="removePost('${postId}')">Remove Post</button>
        </div>
        
        <div class="post-actions">
            <button class="like-btn" onclick="toggleLike(this)">Like <span>0</span></button>
        </div>

        <div class="comment-section">
            <ul class="comment-list" id="comments-${postId}"></ul>
            <div class="comment-input-area">
                <input type="text" placeholder="Write a comment..." id="input-${postId}" 
                       onkeypress="if(event.key === 'Enter') addComment('${postId}')">
                <button onclick="addComment('${postId}')">Reply</button>
            </div>
        </div>
    `;

    feed.prepend(postElement);
    postInput.value = "";
}

function toggleLike(btn) {
    const span = btn.querySelector('span');
    let count = parseInt(span.innerText);
    
    btn.classList.toggle('liked');
    span.innerText = btn.classList.contains('liked') ? count + 1 : count - 1;
}

function addComment(postId) {
    const input = document.getElementById(`input-${postId}`);
    const list = document.getElementById(`comments-${postId}`);

    if (input.value.trim() === "") return;

    const commentId = 'comment-' + Date.now();

    const li = document.createElement('li');
    li.id = commentId;
    li.innerHTML = `
        <span class="comment-text">${input.value}</span>
        <button class="delete-btn" onclick="removeComment('${commentId}')">Delete</button>
    `;
    
    list.appendChild(li);
    input.value = "";
}

function removeComment(commentId) {
    const el = document.getElementById(commentId);
    if (el) el.remove();
}

// New function to remove the whole post
function removePost(postId) {
    if(confirm("Delete this post?")) {
        const el = document.getElementById(postId);
        if (el) el.remove();
    }
}