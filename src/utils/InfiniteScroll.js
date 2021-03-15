const infiniteScroll = callback => {
    const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    const { clientHeight } = document.documentElement;

    if (scrollTop + clientHeight > scrollHeight - 300) {
        callback();
    }
};

export default infiniteScroll;
