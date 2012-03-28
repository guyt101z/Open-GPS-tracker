Open GPS-tracker
========

Open GPS-tracker is a gps-tracking-thing written in JavaScript and some PHP.

Note! There may be various security problems with these scripts. Use with caution.

##Files

###Tracking app:

`gps.htm` & `gps.js` - the tracking app, to be run on a GPS-enabled device. Sends location data on a set interval to:

`save.php` - recieves tracking data and puts it in a file. The filename becomes whatever the user sets as "runner id" in gps.htm.

###Viewer:

`serve.php` - reads tracking data and returns it in a format readable by the viewer.

`/viewer/viewer.php` & `/viewer/viewer.js` - reads `serve.php` repeatedly and puts its contents on a map.

##Instructions

What you need: a web server with PHP-support.

###Installation:
1.	Upload the files to your server.
2.	Edit `viewer.php` and enter your Google maps API-key at line 11.
3.	Make sure the `tracks`-directory is writeable by the server.

###Tracking:
1.	Browse to `gps.htm` on your GPS-enabled device. Enter an ID and start tracking.
2.	The track will be saved to /tracks/*your ID*.xml

###Viewing a track:
Go to `/viewer/viewer.php?runner=*your ID*` - change *your ID* to whatever you entered in the tracker.