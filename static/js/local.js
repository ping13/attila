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
