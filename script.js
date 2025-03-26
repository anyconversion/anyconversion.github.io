document.addEventListener('DOMContentLoaded', () => {

    // Existing navigation logic (ensure this calls loadContent with the page param)
    document.addEventListener('DOMContentLoaded', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const page = urlParams.get('page') || 'home';
        loadContent(page);

        document.querySelectorAll('.nav-link, .sidebar-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const newPage = link.getAttribute('data-page');
                window.history.pushState({}, '', `index.html?page=${newPage}`);
                loadContent(newPage);
            });
        });
    });
    // Sidebar accordion behavior (consolidated)
    document.querySelectorAll('.category-link').forEach(link => {
        console.log('Found category link:', link.textContent); // Debug: Confirm links are found
        link.addEventListener('click', function(e) {
            const subcategoryList = this.nextElementSibling;
            console.log('Clicked:', this.textContent, 'Next sibling:', subcategoryList); // Debug: Check click and sibling

            if (subcategoryList && subcategoryList.classList.contains('subcategory-list')) {
                e.preventDefault(); // Prevent navigation if toggling dropdown
                console.log('Prevented navigation, toggling subcategory'); // Debug

                // Close all other subcategories
                document.querySelectorAll('.subcategory-list').forEach(list => {
                    if (list !== subcategoryList) {
                        list.classList.remove('active');
                    }
                });

                // Toggle the clicked subcategory
                subcategoryList.classList.toggle('active');
                console.log('Subcategory active state:', subcategoryList.classList.contains('active')); // Debug: Check toggle result
            }
        });
    });
    function loadContent(page) {
        const contentDiv = document.getElementById('content');
        const url = contentMap[page] || contentMap['home'];
        const isBingbot = navigator.userAgent.includes('Bingbot');
        
        if (isBingbot) {
            contentDiv.innerHTML = '<h1>' + page.replace(/-/g, ' ') + '</h1><p>Convert ' + page + ' here.</p>'; // Static fallback
            updateMetaTags(page);
        } else {
            fetch(url)
                .then(response => response.text())
                .then(data => {
                    contentDiv.innerHTML = data;
                    updateMetaTags(page);
                });
        }
    }
});