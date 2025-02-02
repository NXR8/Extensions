(function() {
    'use strict';

    function createButton() {
        const btn = document.createElement('button');
        btn.innerHTML = '↔';
        btn.style.cssText = `
            position: sticky;
            top: 10px;
            float: right;
            margin-right: -35px;
            cursor: pointer;
            background: #4D6BFE;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 5px 10px;
            z-index: 1000;
            transition: transform 0.3s;
        `;
        return btn;
    }

    function toggleDirection(block) {
        const currentDirection = block.getAttribute('dir') || 'ltr';
        const newDirection = currentDirection === 'ltr' ? 'rtl' : 'ltr';

        block.setAttribute('dir', newDirection);
        block.querySelectorAll('.md-code-block, .katex').forEach(el => {
            el.setAttribute('dir', newDirection === 'ltr' ? 'ltr' : 'ltr');
        });
    }

    function addButtons() {
        document.querySelectorAll('.ds-markdown.ds-markdown--block:not([data-processed])').forEach(block => {

            block.setAttribute('data-processed', 'true');

            const btn = createButton();
            const container = document.createElement('div');
            container.style.cssText = `
                position: relative;
                margin-right: 40px;
            `;


            if (block.parentNode) {
                block.parentNode.insertBefore(container, block);
                container.appendChild(block);
                container.appendChild(btn);
            }

            btn.addEventListener('click', () => {
                toggleDirection(block);
                btn.style.transform = `rotate(${block.getAttribute('dir') === 'rtl' ? '180deg' : '0deg'})`;
            });
        });
    }


    const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                addButtons();
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });


    addButtons();
})();
