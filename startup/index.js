module.exports = function() {
    let modules = ['./add_bio', './text_index', './create_images_dir'];

    modules.map(_ => {
        require(_)();
    });
}