export const getUrl = (): string => {
    if (document.location.host === 'localhost') {
        return 'http://localhost:5000/';
    }
    return ""//server url;
}
