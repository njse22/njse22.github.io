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

    // New DOM Elements
    const articlesSection = document.getElementById('articles-section');
    const articlesLink = document.getElementById('articles-link');
    const articlesSearchInput = document.getElementById('articles-search-input');
    const articlesTagsContainer = document.getElementById('articles-tags-container');
    const articlesList = document.getElementById('articles-list');
    
    const enBtn = document.getElementById('en-btn');
    const esBtn = document.getElementById('es-btn');
    const headerTitle = document.querySelector('header h1');
    const footerText = document.querySelector('footer p');

    let allPosts = [];
    let allArticles = [];
    let activeTag = null;
    let activeArticleTag = null;
    let currentLang = 'en';
    let translations = {};
    let profileData = null;
    let activePostId = null;

    // Set current year in footer
    currentYearSpan.textContent = new Date().getFullYear();

    // Marked.js setup for terminal-style code blocks with highlight.js
    marked.use({
        renderer: {
            code({ text, lang }) {
                const language = hljs.getLanguage(lang) ? lang : null;
                const highlighted = language 
                    ? hljs.highlight(text, { language: lang }).value 
                    : hljs.highlightAuto(text).value;
                return `<pre><code class="hljs language-${language || 'plaintext'}">${highlighted}</code></pre>`;
            }
        }
    });

    async function loadTranslations() {
        try {
            const response = await fetch('data/translations.json');
            translations = await response.json();
            updateUIStrings();
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }

    function updateUIStrings() {
        const langData = translations[currentLang];
        if (!langData) return;

        // Header Title
        if (headerTitle) headerTitle.textContent = langData.header_title;

        // Navigation
        if (homeLink) homeLink.textContent = langData.nav_home;
        if (aboutLink) aboutLink.textContent = langData.nav_about;
        if (articlesLink) articlesLink.textContent = langData.nav_articles;

        // Search inputs placeholders
        if (searchInput) searchInput.placeholder = langData.search_placeholder;
        if (articlesSearchInput) articlesSearchInput.placeholder = langData.search_articles_placeholder;

        // Back to posts button
        if (backToPostsButton) backToPostsButton.textContent = langData.back_to_posts;

        // Footer Text
        if (footerText) {
            footerText.innerHTML = `&copy; ${currentYearSpan.textContent} @njse22. ${langData.footer_rights}`;
        }

        // Active class on language buttons
        if (enBtn && esBtn) {
            if (currentLang === 'en') {
                enBtn.classList.add('active');
                esBtn.classList.remove('active');
            } else {
                esBtn.classList.add('active');
                enBtn.classList.remove('active');
            }
        }

        // Re-render components with the new language strings
        if (profileData) {
            renderProfile();
        }
        if (allPosts.length > 0) {
            renderPosts();
            renderTags();
        }
        if (allArticles.length > 0) {
            renderArticles();
            renderArticlesTags();
        }
        if (activePostId) {
            showPostDetail(activePostId);
        }
    }

    async function fetchAndRenderProfile() {
        try {
            const response = await fetch('data/profile.json');
            profileData = await response.json();
            renderProfile();
        } catch (error) {
            console.error('Error fetching profile:', error);
            const errorMsg = translations[currentLang]?.error_loading_profile || 'Error loading profile data.';
            profileSection.innerHTML = `<p class="error">${errorMsg}</p>`;
        }
    }

    function renderProfile() {
        if (!profileData) return;
        const title = profileData[`title_${currentLang}`] || profileData.title_en || profileData.title || '';
        const bio = profileData[`bio_${currentLang}`] || profileData.bio_en || profileData.bio || '';
        profileSection.innerHTML = `
            <h2>$ ${profileData.name}</h2>
            <h3>${title}</h3>
            <p>${bio}</p>
            <div class="social-links">
                ${profileData.social_links.map(link => `<a href="${link.url}" target="_blank">${link.name}</a>`).join('')}
            </div>
        `;
    }

    async function fetchAndRenderPosts() {
        try {
            const response = await fetch('data/posts.json');
            allPosts = await response.json();
            // Sort posts by date in descending order
            allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
            renderPosts();
            renderTags();
        } catch (error) {
            console.error('Error fetching posts:', error);
            const errorMsg = translations[currentLang]?.error_loading_posts || 'Error loading blog posts.';
            postsList.innerHTML = `<p class="error">${errorMsg}</p>`;
        }
    }

    function renderPosts() {
        postsList.innerHTML = '';
        let filteredPosts = allPosts;

        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filteredPosts = filteredPosts.filter(post => {
                const title = (post[`title_${currentLang}`] || post.title || '').toLowerCase();
                return title.includes(searchTerm);
            });
        }

        if (activeTag) {
            filteredPosts = filteredPosts.filter(post => post.tags.includes(activeTag));
        }

        // Sort by date descending
        filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Display only the first three posts
        const postsToDisplay = filteredPosts.slice(0, 3);

        if (postsToDisplay.length === 0) {
            const noMsg = translations[currentLang]?.no_posts_found || 'No posts found matching your criteria.';
            postsList.innerHTML = `<p>${noMsg}</p>`;
            return;
        }

        // Fetch content for excerpts and render posts asynchronously
        const postPromises = postsToDisplay.map(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post-item');

            const filePath = post[`filePath_${currentLang}`] || post.filePath_en || post.filePath;

            return fetch(filePath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(markdownContent => {
                    // Limit excerpt to 200 chars and parse
                    const excerpt = marked.parse(markdownContent.substring(0, 200) + '...').replace(/<p>/g, '').replace(/<\/p>/g, '');
                    const title = post[`title_${currentLang}`] || post.title_en || post.title || '';
                    
                    postElement.innerHTML = `
                        <h3><a href="#" data-id="${post.id}">${title}</a></h3>
                        <p class="post-meta">${post.date} | ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')}</p>
                        <p>${excerpt}</p>
                    `;
                    postsList.appendChild(postElement);
                })
                .catch(error => {
                    console.error(`Error fetching markdown for excerpt for post ${post.id}:`, error);
                    const errorMsg = translations[currentLang]?.error_loading_excerpt || 'Error loading post excerpt.';
                    postElement.innerHTML = `<p class="error">${errorMsg}</p>`;
                    postsList.appendChild(postElement);
                });
        });

        // Wait for all excerpt fetches and renders to complete
        Promise.allSettled(postPromises).then(() => {
            // Any finalizations after all posts are rendered, if needed.
        });
    }

    function renderTags() {
        tagsContainer.innerHTML = '';
        const uniqueTags = [...new Set(allPosts.flatMap(post => post.tags))];

        const allTagButton = document.createElement('span');
        allTagButton.classList.add('tag');
        const allText = translations[currentLang]?.all_tags || 'all';
        allTagButton.textContent = allText;
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
        document.querySelectorAll('#tags-container .tag').forEach(tagEl => {
            tagEl.classList.remove('active');
            const allText = translations[currentLang]?.all_tags || 'all';
            if (tagEl.textContent === (activeTag || allText)) {
                tagEl.classList.add('active');
            }
        });
    }

    async function showPostDetail(postId) {
        activePostId = postId;
        const post = allPosts.find(p => p.id === postId);
        if (post) {
            try {
                const filePath = post[`filePath_${currentLang}`] || post.filePath_en || post.filePath;
                const response = await fetch(filePath);
                const markdownContent = await response.text();
                
                const title = post[`title_${currentLang}`] || post.title_en || post.title || '';
                postDetailTitle.textContent = title;
                postDetailDate.textContent = post.date;
                postDetailTags.innerHTML = post.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ');
                postDetailContent.innerHTML = marked.parse(markdownContent);

                blogPostsSection.style.display = 'none';
                profileSection.style.display = 'none';
                articlesSection.style.display = 'none';
                blogPostDetailSection.style.display = 'block';
            } catch (error) {
                console.error(`Error loading post content for ${post.id}:`, error);
                const errorMsg = translations[currentLang]?.error_loading_post_content || 'Error loading post content.';
                postDetailContent.innerHTML = `<p class="error">${errorMsg}</p>`;
                showBlogPosts();
            }
        }
    }

    function showBlogPosts() {
        activePostId = null;
        blogPostDetailSection.style.display = 'none';
        articlesSection.style.display = 'none';
        profileSection.style.display = 'block';
        blogPostsSection.style.display = 'block';
    }

    // New "Articles" Section Methods
    async function fetchAndRenderArticles() {
        try {
            const response = await fetch('data/articles.json');
            allArticles = await response.json();
            allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
            renderArticles();
            renderArticlesTags();
        } catch (error) {
            console.error('Error fetching articles:', error);
            const errorMsg = translations[currentLang]?.error_loading_articles || 'Error loading articles.';
            articlesList.innerHTML = `<p class="error">${errorMsg}</p>`;
        }
    }

    function renderArticles() {
        articlesList.innerHTML = '';
        let filteredArticles = allArticles;

        const searchTerm = articlesSearchInput.value.toLowerCase();
        if (searchTerm) {
            filteredArticles = filteredArticles.filter(art => {
                const title = (art[`title_${currentLang}`] || art.title_en || '').toLowerCase();
                const venue = (art[`venue_${currentLang}`] || art.venue_en || '').toLowerCase();
                return title.includes(searchTerm) || venue.includes(searchTerm);
            });
        }

        if (activeArticleTag) {
            filteredArticles = filteredArticles.filter(art => art.tags.includes(activeArticleTag));
        }

        filteredArticles.sort((a, b) => new Date(b.date) - new Date(a.date));

        if (filteredArticles.length === 0) {
            const noMsg = translations[currentLang]?.no_articles_found || 'No articles found matching your criteria.';
            articlesList.innerHTML = `<p>${noMsg}</p>`;
            return;
        }

        filteredArticles.forEach(art => {
            const artElement = document.createElement('div');
            artElement.classList.add('post-item');

            const title = art[`title_${currentLang}`] || art.title_en || '';
            const venue = art[`venue_${currentLang}`] || art.venue_en || '';

            artElement.innerHTML = `
                <h3><a href="${art.url}" target="_blank">${title}</a></h3>
                <p class="post-meta">${art.date} | ${venue} | ${art.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')}</p>
            `;
            articlesList.appendChild(artElement);
        });
    }

    function renderArticlesTags() {
        articlesTagsContainer.innerHTML = '';
        const uniqueTags = [...new Set(allArticles.flatMap(art => art.tags))];

        const allTagButton = document.createElement('span');
        allTagButton.classList.add('tag');
        const allText = translations[currentLang]?.all_tags || 'all';
        allTagButton.textContent = allText;
        if (!activeArticleTag) {
            allTagButton.classList.add('active');
        }
        allTagButton.addEventListener('click', () => {
            activeArticleTag = null;
            updateArticleTagActiveClass();
            renderArticles();
        });
        articlesTagsContainer.appendChild(allTagButton);

        uniqueTags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.classList.add('tag');
            tagElement.textContent = tag;
            if (activeArticleTag === tag) {
                tagElement.classList.add('active');
            }
            tagElement.addEventListener('click', () => {
                activeArticleTag = tag;
                updateArticleTagActiveClass();
                renderArticles();
            });
            articlesTagsContainer.appendChild(tagElement);
        });
    }

    function updateArticleTagActiveClass() {
        document.querySelectorAll('#articles-tags-container .tag').forEach(tagEl => {
            tagEl.classList.remove('active');
            const allText = translations[currentLang]?.all_tags || 'all';
            if (tagEl.textContent === (activeArticleTag || allText)) {
                tagEl.classList.add('active');
            }
        });
    }

    function showArticles() {
        activePostId = null;
        blogPostDetailSection.style.display = 'none';
        profileSection.style.display = 'none';
        blogPostsSection.style.display = 'none';
        articlesSection.style.display = 'block';
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
    articlesSearchInput.addEventListener('input', renderArticles);

    homeLink.addEventListener('click', (event) => {
        event.preventDefault();
        showBlogPosts();
    });

    aboutLink.addEventListener('click', (event) => {
        event.preventDefault();
        showBlogPosts();
        profileSection.scrollIntoView({ behavior: 'smooth' });
    });

    articlesLink.addEventListener('click', (event) => {
        event.preventDefault();
        showArticles();
    });

    if (enBtn) {
        enBtn.addEventListener('click', () => {
            if (currentLang !== 'en') {
                currentLang = 'en';
                updateUIStrings();
            }
        });
    }

    if (esBtn) {
        esBtn.addEventListener('click', () => {
            if (currentLang !== 'es') {
                currentLang = 'es';
                updateUIStrings();
            }
        });
    }

    // Initial load - first translations, then components
    loadTranslations().then(() => {
        fetchAndRenderProfile();
        fetchAndRenderPosts();
        fetchAndRenderArticles();
    });
});