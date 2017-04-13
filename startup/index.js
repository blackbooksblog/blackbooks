module.exports = function() {
    let modules = ['./add_bio'];

    modules.map(_ => {
        require(_)();
    });
}