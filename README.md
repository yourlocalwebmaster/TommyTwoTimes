# TommyTwoTimes
Launches action (modal) on X page view, and ONLY once per Lifetime (X Days)

##Usage

###Installation

Download the script to make changes. Then include the script in your page just above the closing </body> tag. It will run automatically. Include on every page you want the cookie to track.

`<script type="text/javascript" src="path/to/file/tommy2x.js"></script>`

###Options

*adTags:* 

Ad tags to write to modal. if it returns null "theContent" will be written to modal.

*theContent:*

This is the actual HTML content for the modal.

_i.e. `'<h2> My Name is Earl </h2>'`_

*cookieName:*

Custom name of the cookie. Unique for each site. 

i.e. `"CustomNameOfCookie_DomainDependent"`

*totalNumberOfPages:*

How many page views do you want until it launches? 

i.e. `2`

*cookieLife:*

How long should the cookie stay alive? (in days) 

i.e. `7`

*desktopOnly:*

Only show on desktop? 

i.e. `true`

*debug:*

A toggle to display console messages. Set to 'true' to view debug messages. 

i.e. `true`

*customModalClass:*

Give the modal a custom class. 

i.e. `'tommy_two_times_modal'`