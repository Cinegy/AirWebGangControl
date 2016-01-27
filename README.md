# AirWebGangControl
An HTML5 page, hosted inside a NodeJS Express Project for easy development, to drive gangs of Cinegy Air Playout Engines.

>Uses the Cinegy Playout V11 REST API - if you have Air V10 (or an older prerelease V11) then only 'start cued' button will do anything!

#Running

* Install your NodeJS enviroment, then clone this repository into a folder
* Go into the folder, and then let npm fill in all the dependencies

>$ cd myapp

>$ npm install

* Start up Express to host the app:

_On MacOS or Linux, run the app with this command:_

> DEBUG=AirWebGangControl:* npm start

_On Windows, use this command:_

> set DEBUG=AirWebGangControl:* & npm start

Then load http://localhost:3000/ in your browser to access the app.

If you want to host this outside of the whole NodeJS thing (maybe as a static site, or inside IIS or something), then just grab the

/public 

folder, and copy the file /views/index.html into this folder - and deploy the contents of that 'public' folder how you wish!

The whole NodeJS / Express thing is really just for an easy life when debugging / adjusting the panel.

##Please note - only IE seems to work propery currently with the pre-release Air, this will go away once we implement OPTIONS HTTP headers into the integrated Air engine