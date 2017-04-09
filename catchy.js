Function.prototype.catchy = function () {
    return async (req, res, next) => {
        try {
            await this(req, res, next);
        } catch (e) {
            next(e);
        }
    }
}