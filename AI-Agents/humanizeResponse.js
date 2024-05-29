const humanizeResponse = (messsage) => {
    const noPunctuation = messsage.replace(/[.,\/#!$@%\^&\*;:{}=\-_`~()"']/g,"");
    return noPunctuation.toLowerCase();
};

module.exports = { humanizeResponse };


