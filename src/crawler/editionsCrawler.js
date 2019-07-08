const config = require("./config");
const c = require('./crawler');

const getEditions = () => {
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
                        resolve(editions);
                    }
                    done();
                
            }
        }]);
    });
}

module.exports = { getEditions };