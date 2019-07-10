const config = require("./config");
const c = require('./_crawler');

const get = () => {
    return new Promise((resolve, reject) => {
        c.queue([{
            uri: config.defaultUrl,
            callback: (error, res, done)  => {
                    if (error){
                        reject(error);
                    } else {
                        const $ = res.$;
                        const editions = $(`${config.editionsContainer} option`).map((index, element) => {
                            return $(element).val();
                        });
                        resolve(editions.toArray().filter(edition => edition.length > 1));
                    }
                    done();
                
            }
        }]);
    });
}

module.exports = { get };