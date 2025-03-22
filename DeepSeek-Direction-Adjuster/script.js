(function() {

    function createButton() {
        const btn = document.createElement('button');
        btn.innerHTML = `
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.71,11.29l-3-3a1,1,0,0,0-1.42,1.42L18.59,11H5.41l1.3-1.29A1,1,0,0,0,5.29,8.29l-3,3a1,1,0,0,0,0,1.42l3,3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L5.41,13H18.59l-1.3,1.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l3-3A1,1,0,0,0,21.71,11.29Z" fill="#c4cbd5"/>
        </svg>
    `;

        btn.style.cssText = `
        cursor: pointer;
        background: transparent;
        border: none;
        padding: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.2s ease, transform 0.2s ease;
        margin-left: auto;
        position: relative;
    `;

        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.innerHTML = `
        <div class="tooltip-content">
            Direction Adjuster
            <div class="tooltip-arrow">
                <svg viewBox="0 0 24 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 18L10.29 20.29C10.514 20.5156 10.7804 20.6946 11.0739 20.8168C11.3674 20.9389 11.6821 21.0018 12 21.0018C12.3179 21.0018 12.6326 20.9389 12.9261 20.8168C13.2196 20.6946 13.486 20.5156 13.71 20.29L16 18H18C19.0609 18 20.0783 17.5786 20.8284 16.8285C21.5786 16.0783 22 15.0609 22 14V7C22 5.93913 21.5786 4.92178 20.8284 4.17163C20.0783 3.42149 19.0609 3 18 3H6C4.93913 3 3.92172 3.42149 3.17157 4.17163C2.42142 4.92178 2 5.93913 2 7V14C2 15.0609 2.42142 16.0783 3.17157 16.8285C3.92172 17.5786 4.93913 18 6 18H8Z" fill="#111111"/>
                </svg>
            </div>
        </div>
    `;

        btn.appendChild(tooltip);

        const style = document.createElement('style');
        style.textContent = `
        .custom-tooltip {
            visibility: hidden;
            position: absolute;
            z-index: 1024;
            bottom: calc(100% + 8px);
            left: 50%;
            transform: translateX(-50%);
            opacity: 0;
            transition: opacity 0.2s ease;
        }

        .tooltip-content {
            background: #080000;
            color: #ffffff;
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 14px;
            position: relative;
            white-space: nowrap;
            font-family: Arial, sans-serif;
        }

        .tooltip-arrow {
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            width: 24px;
            height: 8px;
        }

        .tooltip-arrow svg {
            display: block;
            width: 100%;
            height: 100%;
        }

        button:hover .custom-tooltip {
            visibility: visible;
            opacity: 1;
        }
    `;
        document.head.appendChild(style);

        return btn;
    }

    function toggleDirection(block) {
        const elementsToToggle1 = block.querySelectorAll('.ds-markdown.ds-markdown--block');
        const elementsToToggle2 = block.querySelectorAll('.md-code-block, code');
        const elementsToToggle3 = block.querySelectorAll('ol, th');
        const elementsToToggle4 = block.querySelectorAll('.katex');

        elementsToToggle1.forEach(el => {
            const currentDirection = el.getAttribute('dir') || 'ltr';
            const newDirection = currentDirection === 'ltr' ? 'rtl' : 'ltr';
            el.setAttribute('dir', newDirection);
        });

        elementsToToggle2.forEach(el => {
            el.style.textAlign = 'left';
            el.setAttribute('dir', 'ltr');
        });

        elementsToToggle3.forEach(el => {
            const currentAlign = el.style.textAlign || 'left';
            const newAlign = currentAlign === 'left' ? 'right' : 'left';
            el.style.textAlign = newAlign;
        });

        elementsToToggle4.forEach(el => {
            el.setAttribute('dir', 'ltr');
        });
    }

    function addButtons() {
        document.querySelectorAll('._4f9bf79.d7dc56a8._43c05b5, ._4f9bf79._43c05b5').forEach(block => {
            const dsFlexContainer = block.querySelector('.ds-flex._965abe9');

            if (dsFlexContainer && !dsFlexContainer.hasAttribute('data-processed')) {
                dsFlexContainer.setAttribute('data-processed', 'true');

                const btn = createButton();
                dsFlexContainer.appendChild(btn);

                btn.addEventListener('click', () => {
                    toggleDirection(block);
                    btn.style.transform = `rotate(${block.getAttribute('dir') === 'rtl' ? '180deg' : '0deg'})`;
                });
            }
        });
    }

    window.addEventListener('load', function() {
        addButtons();

        if (document.body) {
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
        } else {
            console.error('document.body is not available.');
        }
    });
})();
