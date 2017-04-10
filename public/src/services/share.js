let copy = {};


copy.clip = function(text) {

    let listener = function(e) {
        e.clipboardData.setData('text/plain', text);
        e.preventDefault(); 
        document.removeEventListener('copy', listener);
    }

    document.addEventListener('copy', listener);
    document.execCommand('copy');

}

copy.click = function(link) {
    window.open(link, '_blank');
}

module.exports = copy;