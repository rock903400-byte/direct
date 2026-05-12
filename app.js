(function () {
    // ── 深色模式切換 ──────────────────────────────────────────
    const html = document.documentElement;
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    applyTheme(localStorage.getItem('theme') || 'light');

    themeBtn.addEventListener('click', () => {
        const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem('theme', next);
    });

    function applyTheme(theme) {
        html.dataset.theme = theme;
        themeIcon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
    }

    // ── 搜尋 / 篩選 ──────────────────────────────────────────
    const searchInput = document.getElementById('search-input');
    const searchClear = document.getElementById('search-clear');
    const noResults   = document.getElementById('no-results');
    const searchTerm  = document.getElementById('search-term');
    const items       = document.querySelectorAll('.feature-item');

    searchInput.addEventListener('input', filterItems);
    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        filterItems();
        searchInput.focus();
    });

    function filterItems() {
        const q = searchInput.value.trim().toLowerCase();
        searchClear.classList.toggle('visible', q.length > 0);
        let visible = 0;

        items.forEach(item => {
            const text = [
                item.dataset.keywords || '',
                item.querySelector('.feature-name')?.textContent || '',
                item.querySelector('.feature-desc')?.textContent || ''
            ].join(' ').toLowerCase();

            const match = !q || text.includes(q);
            item.classList.toggle('hidden', !match);
            if (match) visible++;
        });

        noResults.style.display = visible === 0 ? 'block' : 'none';
        searchTerm.textContent = q;
    }

    // ── 進場動畫（交錯） ─────────────────────────────────────
    items.forEach((item, i) => {
        setTimeout(() => item.classList.add('animate-in'), 80 + i * 80);
    });

    // ── 點擊漣漪效果 ─────────────────────────────────────────
    items.forEach(item => {
        item.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.cssText =
                `width:${size}px;height:${size}px;` +
                `left:${e.clientX - rect.left - size / 2}px;` +
                `top:${e.clientY - rect.top - size / 2}px;`;
            this.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());
        });
    });
})();
