document.addEventListener('DOMContentLoaded', () => {
    const profileSection = document.getElementById('profile-section');
    const blogPostsSection = document.getElementById('blog-posts-section');
    const postsList = document.getElementById('posts-list');
    const blogPostDetailSection = document.getElementById('blog-post-detail-section');
    const postDetailTitle = document.getElementById('post-detail-title');
    const postDetailDate = document.getElementById('post-detail-date');
    const postDetailTags = document.getElementById('post-detail-tags');
    const postDetailContent = document.getElementById('post-detail-content');
    const backToPostsButton = document.getElementById('back-to-posts');
    const searchInput = document.getElementById('search-input');
    const tagsContainer = document.getElementById('tags-container');
    const currentYearSpan = document.getElementById('current-year');
    const homeLink = document.getElementById('home-link');
    const aboutLink = document.getElementById('about-link');

    let allPosts = [];
    let activeTag = null;

    // Set current year in footer
    currentYearSpan.textContent = new Date().getFullYear();

    // Marked.js setup for terminal-style code blocks
    const renderer = new marked.Renderer();
    renderer.code = (code, language) => {
        const highlighted = hljs.highlightAuto(code, language ? [language] : undefined).value;
        return `<pre><code>${highlighted}</code></pre>`;
    };
    marked.setOptions({
        renderer: renderer,
        highlight: function(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        },
        langPrefix: 'hljs language-'
    });


    async function fetchAndRenderProfile() {
        try {
            const response = await fetch('data/profile.json');
            const profile = await response.json();
            profileSection.innerHTML = `
                <h2>$ ${profile.name}</h2>
                <h3>${profile.title}</h3>
                <p>${profile.bio}</p>
                <div class="social-links">
                    ${profile.social_links.map(link => `<a href="${link.url}" target="_blank">${link.name}</a>`).join('')}
                </div>
            `;
        } catch (error) {
            console.error('Error fetching profile:', error);
            profileSection.innerHTML = '<p class="error">Error loading profile data.</p>';
        }
    }

    async function fetchAndRenderPosts() {
        try {
            const response = await fetch('data/posts.json');
            allPosts = await response.json(); // allPosts now contains metadata including filePath
            // Sort posts by date in descending order
            allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
            renderPosts();
            renderTags();
        } catch (error) {
            console.error('Error fetching posts:', error);
            postsList.innerHTML = '<p class="error">Error loading blog posts.</p>';
        }
    }

    function renderPosts() {
        postsList.innerHTML = '';
        // Filter posts based on search and active tag, then sort by date
        let filteredPosts = allPosts;

        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filteredPosts = filteredPosts.filter(post =>
                post.title.toLowerCase().includes(searchTerm)
            );
        }

        if (activeTag) {
            filteredPosts = filteredPosts.filter(post => post.tags.includes(activeTag));
        }

        // Sort by date descending
        filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Display only the first three posts
        const postsToDisplay = filteredPosts.slice(0, 3);

        if (postsToDisplay.length === 0) {
            postsList.innerHTML = '<p>No posts found matching your criteria.</p>';
            return;
        }

        // Fetch content for excerpts and render posts asynchronously
        const postPromises = postsToDisplay.map(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post-item');

            return fetch(post.filePath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(markdownContent => {
                    // Limit excerpt to 200 chars and parse
                    const excerpt = marked.parse(markdownContent.substring(0, 200) + '...').replace(/<p>/g, '').replace(/<\/p>/g, '');
                    
                    postElement.innerHTML = `
                        <h3><a href="#" data-id="${post.id}">${post.title}</a></h3>
                        <p class="post-meta">${post.date} | ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')}</p>
                        <p>${excerpt}</p>
                    `;
                    postsList.appendChild(postElement);
                })
                .catch(error => {
                    console.error(`Error fetching markdown for excerpt for post ${post.id}:`, error);
                    postElement.innerHTML = `<p class="error">Error loading post excerpt.</p>`;
                    postsList.appendChild(postElement);
                });
        });

        // Wait for all excerpt fetches and renders to complete (optional, but good for coordination)
        Promise.allSettled(postPromises).then(() => {
            // Any finalizations after all posts are rendered, if needed.
        });
    }

    function renderTags() {
        tagsContainer.innerHTML = '';
        const uniqueTags = [...new Set(allPosts.flatMap(post => post.tags))];

        const allTagButton = document.createElement('span');
        allTagButton.classList.add('tag');
        allTagButton.textContent = 'all';
        if (!activeTag) {
            allTagButton.classList.add('active');
        }
        allTagButton.addEventListener('click', () => {
            activeTag = null;
            updateTagActiveClass();
            renderPosts();
        });
        tagsContainer.appendChild(allTagButton);

        uniqueTags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.classList.add('tag');
            tagElement.textContent = tag;
            if (activeTag === tag) {
                tagElement.classList.add('active');
            }
            tagElement.addEventListener('click', () => {
                activeTag = tag;
                updateTagActiveClass();
                renderPosts();
            });
            tagsContainer.appendChild(tagElement);
        });
    }

    function updateTagActiveClass() {
        document.querySelectorAll('.tags-list .tag').forEach(tagEl => {
            tagEl.classList.remove('active');
            if (tagEl.textContent === (activeTag || 'all')) {
                tagEl.classList.add('active');
            }
        });
    }

    async function showPostDetail(postId) {
        const post = allPosts.find(p => p.id === postId);
        if (post) {
            try {
                const response = await fetch(post.filePath);
                const markdownContent = await response.text();
                
                postDetailTitle.textContent = post.title;
                postDetailDate.textContent = post.date;
                postDetailTags.innerHTML = post.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ');
                postDetailContent.innerHTML = marked.parse(markdownContent);

                blogPostsSection.style.display = 'none';
                profileSection.style.display = 'none';
                blogPostDetailSection.style.display = 'block';
            } catch (error) {
                console.error(`Error loading post content for ${post.id}:`, error);
                postDetailContent.innerHTML = '<p class="error">Error loading post content.</p>';
                // Optionally, show blog posts section again if detail fails to load
                showBlogPosts();
            }
        }
    }

    function showBlogPosts() {
        blogPostDetailSection.style.display = 'none';
        profileSection.style.display = 'block';
        blogPostsSection.style.display = 'block';
    }

    // Event Listeners
    postsList.addEventListener('click', (event) => {
        if (event.target.tagName === 'A' && event.target.dataset.id) {
            event.preventDefault();
            showPostDetail(event.target.dataset.id);
        }
    });

    backToPostsButton.addEventListener('click', (event) => {
        event.preventDefault();
        showBlogPosts();
    });

    searchInput.addEventListener('input', renderPosts);

    homeLink.addEventListener('click', (event) => {
        event.preventDefault();
        showBlogPosts();
        // Optionally scroll to top or specific section
    });

    aboutLink.addEventListener('click', (event) => {
        event.preventDefault();
        // For now, this just scrolls to the profile section. 
        // In a more complex setup, this might reveal a dedicated 'about' page.
        showBlogPosts(); // Ensure main sections are visible
        profileSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Initial load
    fetchAndRenderProfile();
    fetchAndRenderPosts();
});
