module.exports = function() {
    let modules = ['./add_bio', './text_index'];

    modules.map(_ => {
        require(_)();
    });
}