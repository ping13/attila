// drop-in replacement for fitvids.js
document.querySelectorAll('iframe, video').forEach(el => {
    const ratio = el.height / el.width * 100;
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.width = '100%';
    wrapper.style.paddingTop = `${ratio}%`;
    el.style.position = 'absolute';
    el.style.top = 0;
    el.style.left = 0;
    el.style.width = '100%';
    el.style.height = '100%';
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
});

// add a copy-button in code sections
document.addEventListener('DOMContentLoaded', function() {
    // Add copy button to all highlight/codehilite blocks
    document.querySelectorAll('.codehilite pre').forEach(function(codeBlock) {
        // Create the copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.textContent = 'Copy';
        
        // Position the button
        codeBlock.style.position = 'relative';
        copyButton.style.position = 'absolute';
        copyButton.style.right = '0';
        copyButton.style.top = '0';
        
        // Add click handler
        copyButton.addEventListener('click', function() {
            const code = codeBlock.querySelector('code').textContent;
            navigator.clipboard.writeText(code).then(function() {
                copyButton.textContent = 'Copied!';
                setTimeout(function() {
                    copyButton.textContent = 'Copy';
                }, 2000);
            });
        });
        
        // Add button to the code block
        codeBlock.appendChild(copyButton);
    });
});
