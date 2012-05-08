Open GPS-tracker
========

Open GPS-tracker is a GPS-tracking-thing written in JavaScript and some PHP. It uses a MySQL database to save tracking data.

##Files

###Tracking app:

`gps.htm` & `gps.js` - the tracking app, to be run on a GPS-enabled device. Sends location data on a set interval to:

`save.php` - recieves tracking data and puts it in the database.

###Viewer:

`serve.php` - reads tracking data and returns it in a format readable by the viewer.

`/viewer/viewer.php` & `/viewer/viewer.js` - reads `serve.php` repeatedly and puts its contents on the map.

##Instructions

What you need: a web server with PHP-support.

###Installation:
1.	Upload the files to your server.
2.	Edit `config.php` with your config.
3.	Create a table as per database.sql

###Tracking:
1.	Browse to `gps.htm` on your GPS-enabled device. Enter an ID and start tracking.

###Viewing a track:
1.	Custom maps (optional): Custom maps can be added. You need to reproject the map to spherical mercator with gdalwarp. Edit viewer.js to match your map. If you don't want a custom map you will have to comment out various lines.
2.	Go to /viewer/viewer.php and enjoy the tracking goodness.