// ===== Mini Social Feed (XSS Safe) =====

// Utility: create element with class
function el(tag, className) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    return element;
}

// Create Post
function createPost() {
    const postInput = document.getElementById('postInput');
    const feed = document.getElementById('feed');

    const content = postInput.value.trim();
    if (!content) return;

    const postId = Date.now();

    const post = el('div', 'post');

    // Post text (XSS SAFE)
    const postText = el('p', 'post-text');
    postText.textContent = content;

    // Actions
    const actions = el('div', 'post-actions');

    const likeBtn = el('button', 'like-btn');
    likeBtn.innerHTML = 'Like <span>0</span>'; // static HTML only
    likeBtn.addEventListener('click', () => toggleLike(likeBtn));

    actions.appendChild(likeBtn);

    // Comment section
    const commentSection = el('div', 'comment-section');

    const commentList = el('ul', 'comment-list');
    commentList.id = `comments-${postId}`;

    const inputArea = el('div', 'comment-input-area');

    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.placeholder = 'Write a comment...';
    commentInput.id = `input-${postId}`;

    const replyBtn = document.createElement('button');
    replyBtn.textContent = 'Reply';
    replyBtn.addEventListener('click', () => addComment(postId));

    inputArea.append(commentInput, replyBtn);
    commentSection.append(commentList, inputArea);

    post.append(postText, actions, commentSection);
    feed.prepend(post);

    postInput.value = '';
}

// Like toggle
function toggleLike(btn) {
    const span = btn.querySelector('span');
    let count = Number(span.textContent);

    btn.classList.toggle('liked');
    span.textContent = btn.classList.contains('liked') ? count + 1 : count - 1;
}

// Add comment
function addComment(postId) {
    const input = document.getElementById(`input-${postId}`);
    const list = document.getElementById(`comments-${postId}`);

    const content = input.value.trim();
    if (!content) return;

    const commentId = `comment-${Date.now()}`;

    const li = document.createElement('li');
    li.id = commentId;

    // Comment text (XSS SAFE)
    const text = document.createElement('span');
    text.className = 'comment-text';
    text.textContent = content;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => removeComment(commentId));

    li.append(text, deleteBtn);
    list.appendChild(li);

    input.value = '';
}

// Remove comment
function removeComment(commentId) {
    const el = document.getElementById(commentId);
    if (el) el.remove();
}

// Expose createPost globally (for HTML button)
window.createPost = createPost;