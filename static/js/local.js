document.addEventListener('DOMContentLoaded', function() {
    /* drop-in replacement for fitvids.js */
    const mediaElements = document.querySelectorAll('iframe, video');
    if (mediaElements.length > 0) {
        mediaElements.forEach(el => {
            if (el.height && el.width) {  /* Only process if dimensions exist */
                const ratio = el.height / el.width * 100;
                const wrapper = document.createElement('div');
                wrapper.style.position = 'relative';
                wrapper.style.width = '100%';
                wrapper.style.paddingTop = `${ratio}%`;
                el.style.position = 'absolute';
                el.style.top = '0';
                el.style.left = '0';
                el.style.width = '100%';
                el.style.height = '100%';
                el.parentNode.insertBefore(wrapper, el);
                wrapper.appendChild(el);
            }
        });
    }

    /* Add copy button to all highlight/codehilite blocks */
    const codeBlocks = document.querySelectorAll('.codehilite pre');
    if (codeBlocks.length > 0) {
        codeBlocks.forEach(function(codeBlock) {
            try {
                /* Create the copy button */
                const copyButton = document.createElement('button');
                copyButton.className = 'copy-button';
                copyButton.textContent = 'Copy';
                
                /* Position the button */
                codeBlock.style.position = 'relative';
                copyButton.style.position = 'absolute';
                copyButton.style.right = '0';
                copyButton.style.top = '0';
                
                /* Add click handler */
                copyButton.addEventListener('click', function() {
                    try {
                        /* Get text content directly from pre element if no code element exists */
                        const codeElement = codeBlock.querySelector('code');
                        const textToCopy = codeElement ? codeElement.textContent : codeBlock.textContent;
                        
                        navigator.clipboard.writeText(textToCopy).then(function() {
                            copyButton.textContent = 'Copied!';
                            setTimeout(function() {
                                copyButton.textContent = 'Copy';
                            }, 2000);
                        }).catch(function(err) {
                            console.error('Failed to copy text: ', err);
                            copyButton.textContent = 'Error!';
                            setTimeout(function() {
                                copyButton.textContent = 'Copy';
                            }, 2000);
                        });
                    } catch (err) {
                        console.error('Error in copy button click handler:', err);
                    }
                });
                
                /* Add button to the code block */
                codeBlock.appendChild(copyButton);
            } catch (err) {
                console.error('Error setting up copy button:', err);
            }
        });
    }
});
