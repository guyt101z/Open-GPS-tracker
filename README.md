Open GPS-tracker
========

Open GPS-tracker is a gps-tracking-thing written in JavaScript and some PHP.

##Files

`gps.htm` & `gps.js` - the tracking app, to be run on a GPS-enabled device. Sends location data on a set interval to:

`save.php` - recieves tracking data and puts it in a file (coords.xml).

`serve.php` - reads tracking data and returns it in a format readable by the viewer.

`/viewer/viewer.htm` & `/viewer/viewer.js` - reads `serve.php` repeatedly and puts its contents on a map.

##Instructions

What you need: a web server with PHP-support.

1.	Upload the files to your server.
2.	Edit `viewer.htm` and enter your Google maps API-key.
3.	Make sure `coords.xml` is writeable by the server, empty the file.
4.	Browse to `gps.htm` on your GPS-enabled device and start tracking! Your movements will be shown in the viewer.