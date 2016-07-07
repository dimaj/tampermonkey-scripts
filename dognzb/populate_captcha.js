// ==UserScript==
// @name         Dognzb captcha populator
// @namespace    http://blog.dimaj.net
// @website      http://blog.dimaj.net
// @version      0.1
// @description  Use an online OCR service to pre-populate captcha field
//               You'll need to create a file someplace on your HDD and
//               write a single line in there with the api key you got from http://ocr.space
//               Once that's done, update 'apikey' resource with path to your file
// @author       Dmitry Jerusalimsky
// @match        https://dognzb.cr/login*
// @grant        GM_getResourceText
// @resource     apikey file:///absolute/path/to/your/apikey/file
// ==/UserScript==

(function() {
    'use strict';

    var OCR_URL = 'https://api.ocr.space/parse/image';
    var OCR_API_KEY = GM_getResourceText('apikey');

    // find the captcha element and get URL
    var icaptcha = $('#i_captcha');
    if (undefined !== icaptcha) {
        var xhr = new XMLHttpRequest();

        xhr.addEventListener('load', function(event) {
            var pr = JSON.parse(xhr.response).ParsedResults[0];
            if (pr.ParsedText) {
                var pt = pr.ParsedText.trim().substring(0, 6);
                if (pt.length != 6) {
                    console.log('There was an error getting captcha code.', pr);
                    return;
                }

                var tcaptcha = $('#captcha');
                if (undefined !== tcaptcha && tcaptcha.length > 0) {
                    $(tcaptcha)[0].value = pt;
                }
                else {
                    console.error('Could not find captcha element');
                }
            }
            else {
                console.error('Could not find ParsedText in response', pr);
            }
        });

        xhr.addEventListener('error', function(event) {
        });

        var formData = new FormData();
        formData.append('apikey', GM_getResourceText('apikey'));
        formData.append('url', $(icaptcha).prop('src'));
        formData.append('lang', 'eng');

        xhr.open('POST', OCR_URL);
        xhr.send(formData);
    }
})();
