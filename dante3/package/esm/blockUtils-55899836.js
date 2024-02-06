function getUrl(url, domain) {
    if (!url)
        return;
    if (url.includes('://'))
        return url;
    if (!domain)
        return url;
    return "".concat(domain).concat(url);
}

export { getUrl as g };
