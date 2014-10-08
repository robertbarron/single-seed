JPLoad = {
    doRequest : function (url, callback) {
        var _this = this,
            xhr;

        if (typeof XMLHttpRequest !== 'undefined') {
            xhr = new XMLHttpRequest();
        } else {
            var versions = [
                "MSXML2.XmlHttp.5.0", 
                "MSXML2.XmlHttp.4.0",
                "MSXML2.XmlHttp.3.0", 
                "MSXML2.XmlHttp.2.0",
                "Microsoft.XmlHttp"
            ];
 
            for (var i = 0, len = versions.length; i < len; i++) {
                try {
                    xhr = new ActiveXObject(versions[i]);
                    break;
                }
                catch(e){
                    console.log('Error when trying to initiate an Ajax Call');
                }
             }
        }
         
        xhr.onreadystatechange = safeRead;
         
        function safeRead () {
            if (xhr.readyState < 4) {
                return;
            }
            if (xhr.status !== 200) {
                return;
            }
            if (xhr.readyState === 4) {
                callback(xhr.responseText);
            }           
        }
        xhr.open('GET', url, true);
        xhr.send('');
    },

    getTemplate : function (templateURL, callback) {
        var _this = this;
        _this.doRequest(templateURL, function (response) {
            if (response) {
                callback(response);
            }
        });
    },

    escapeRegExp: function (str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    },

    injectData : function (templateData, find, replace) {
        var _this = this;
        return templateData.replace(new RegExp(_this.escapeRegExp(find), 'g'), replace);
    },

    parseObject : function (pObject, htmlData, elementID, callback) {
        var _this = this,
            elementsInData = Object.keys(pObject).length,
            counted = 0;

        var waitForIt = function () {
            for (var key in pObject) {
                htmlData = _this.injectData(htmlData, '{{' + key + '}}', pObject[key]);
                counted++;
            }
            if (counted >= elementsInData) {
                document.getElementById(elementID).innerHTML = htmlData;
                callback(true);
            } else {
                setTimeout(function () {
                    waitForIt();
                },20);
            }
        };
        waitForIt();
    },
    loadTemplate : function (htmlData, elementID, oData, callback) {
        var _this = this;

        if (oData !== undefined) {
            _this.parseObject(oData, htmlData, elementID, function (response) {
                if (response) {
                    if (callback) {
                        callback(true);
                    }
                }
            });
        } else {
            document.getElementById(elementID).innerHTML = htmlData;
            if (callback) {
                callback(true);
            }
        }
    },
};