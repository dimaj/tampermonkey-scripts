# DOGnzb.cr Captcha Script

This is a simple script that would send the captcha image to a 3rd party OCR provider to get the captcha string out. Once string is received, it'll get auto-populated to the appropriate captche input field.

## How it works

To get this script to work, you'll need the following

 * Tampermonkey chrome extension (this should also work with Firefox's Greasemonkey)
 * API key from http://ocr.space
 * A file on your computer with the API key from http://ocr.space

Once you got all of the requirements above, just add this script to your tampermonkey dashboard and modify the ```@resource``` line to point to the api key file you've created earlier.


