# compressed_js_code


This test project seeks to optimize server side bandwidth usage by downloading javascript code to the browser compressed in a zip file. It uses jszip to decompress the code. You can test it by opening it using any http server and opening the index.html in the browser.


The "files" folder contains the testing files, which are compressed into the "files.zip" file.
The "lib" folder contains jszip, a library that allows the browser to unzip the test files.
You can check the code in the "unzip_and_run.js" file.


The project successfully compresses a 364KB transfer down to 128KB. The project also reduces the amount of GET calls to the server from 5 down to 1. Next step is to create a system to compress image transfers using the same system (Coming soon).


Libraries used:

https://stuk.github.io/jszip/


Libraries used to test the code:

https://d3js.org/

https://jquery.com/
