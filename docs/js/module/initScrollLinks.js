export function initScrollLinks(root = document) {
    const scrollLinks = root.querySelectorAll('.js-scroll-link');

    if (!scrollLinks.length) return;

    scrollLinks.forEach(link => {
        // защита от повторного навешивания
        if (link.dataset.scrollInit) return;
        link.dataset.scrollInit = 'true';

        link.addEventListener('click', function (e) {
            e.preventDefault();

            const href = this.getAttribute('href');
            if (!href || !href.startsWith('#')) return;

            const targetId = href.slice(1);
            const scrollTarget = document.querySelector(`[data-id="${targetId}"]`);
            if (!scrollTarget) return;

            const elementPosition = scrollTarget.getBoundingClientRect().top;

            window.scrollBy({
                top: elementPosition,
                behavior: 'smooth'
            });
        });
    });
}

/* самовызывание — важно для ajax */
initScrollLinks();
