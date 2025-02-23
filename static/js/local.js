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
                const copyDiv = document.createElement('div');
                copyDiv.className = 'copy-button';
                copyDiv.textContent = 'Copy';
                
                /* Position the div */
                codeBlock.style.position = 'relative';
                copyDiv.style.position = 'absolute';
                copyDiv.style.right = '0';
                copyDiv.style.top = '0';
                copyDiv.style.cursor = 'pointer';
                
                /* Add click handler */
                copyDiv.addEventListener('click', function() {
                    try {
                        /* Get text content directly from pre element if no code element exists */
                        const codeElement = codeBlock.querySelector('code');
                        const textToCopy = codeElement ? codeElement.textContent : codeBlock.textContent;
                        
                        navigator.clipboard.writeText(textToCopy).then(function() {
                            copyDiv.textContent = 'Copied!';
                            setTimeout(function() {
                                copyDiv.textContent = 'Copy';
                            }, 2000);
                        }).catch(function(err) {
                            console.error('Failed to copy text: ', err);
                            copyDiv.textContent = 'Error!';
                            setTimeout(function() {
                                copyDiv.textContent = 'Copy';
                            }, 2000);
                        });
                    } catch (err) {
                        console.error('Error in copy button click handler:', err);
                    }
                });
                
                /* Add div to the code block */
                codeBlock.appendChild(copyDiv);
            } catch (err) {
                console.error('Error setting up copy button:', err);
            }
        });
    }
});
