/**
 * Name: TommyTwoTimes
 * Description: Launches action (modal) on X page view, and ONLY once per Lifetime (X Days).
 * Author:    Grant Kimball
 * Company:    Your Local Webmaster
 * version: 1.0
 **/
var TommyTwoTimes = {

    /******************/
    /** Edit here.   **/
    /******************/
    theContent: "<h2>SomeContentHere</h2>",
    adTags: function(){ //if return null, use theContent for the content...
        return null;
    },
    cookieName: "CustomNameOfCookie_DomainDependent",
    totalNumberOfPages: 2,
    cookieLife: 7, // 7 days
    desktopOnly: true, // only show on desktop?
    debug: true,  // show console output?
    customModalClass: 'tommy_two_times_modal', // give the modal a class so you can style

    /*************/
    /** Ideas.  **/
    /*************/
    //timeoutBeforeLaunch: 5, // Wait 5 seconds before launchingAction on applicable page?


    /**********************************/
    /** Do not edit below this line. **/
    /**********************************/

    optOutCookie: this.cookieName+"_opt_out",
    alreadyRanCookie: this.cookieName+"_already_ran",

    init: function(){
        if(this.debug)  console.log('initializing...');
        if(this.debug)  console.log('device width: '+ document.body.offsetWidth);
        if(this.desktopOnly && document.body.offsetWidth <= 749){
            if(this.debug) console.log('no can do bro, youre on mobile.');
            return false;
        }
        //is this ok to run?
        if(this.okToRun() === false){
            if(this.debug)  console.log('this is not ok to run.');
            return false;
        }

        var today = new Date();
        var expiry = new Date(today.getTime() + this.cookieLife * 24 * 3600 * 1000);


        // check if the cookie exists..
        if(this.getCookie(this.cookieName) <= 0 ){
            if(this.debug)  console.log('setting cookie init')
            document.cookie = this.cookieName + "=" + 0 + "; path=/; expires=" + expiry.toGMTString();
            if(this.debug) console.log('cookie init to : '+this.getCookie(this.cookieName));
        }else{
            if(this.debug)  console.log('cookie already set: '+this.getCookie(this.cookieName));
        }

        if(this.getCookie(this.cookieName) < (this.totalNumberOfPages - 1))
            this.incrementCookie();
        else this.launchAction();
    },
    launchAction: function(){
        var injectContent;
        if(this.adTags() != null) injectContent = this.adTags();
        else injectContent = this.theContent;
        this.writeModal(injectContent);
        this.setAlreadyRan();
    },
    getCookie: function(name){
        var re = new RegExp(name + "=([^;]+)");
        var value = re.exec(document.cookie);
        return (value != null) ? unescape(value[1]) : 0;
    },
    okToRun: function(){
        // check for DON'T RUN! cookie...
        if(this.userOptedOut()) return false;
        // Has it already run?...
        if(this.alreadyRan()) return false;
        // checks cleared, launch it!
        return true;
    },
    userOptedOut: function(){
        // check to see if the user opted out
        if(this.getCookie(this.optOutCookie) > 0) {
            if(this.debug) console.log('user IS optted out.');
            return true;
        }

        else{ return false;}
    },
    setOptOut: function(){
        //var modal = document.getElementById('ttt_modal');
        //modal.style.display = "none";

        if(this.debug) console.log('user has opted out.');
        var today = new Date();
        var expiry = new Date(today.getTime() + 999 * 24 * 3600 * 1000); // 999 days
        document.cookie = this.optOutCookie + "=" + 1 + "; path=/; expires=" + expiry.toGMTString();
    },
    alreadyRan: function(){
        if(this.getCookie(this.alreadyRanCookie) > 0) {
            if(this.debug) console.log('the alert already ran.');
            return true;
        }
        else {
            return false;
        }
    },
    setAlreadyRan: function(){
        var today = new Date();
        var expiry = new Date(today.getTime() + this.cookieLife * 24 * 3600 * 1000);
        document.cookie = this.alreadyRanCookie + "=" + 1 + "; path=/; expires=" + expiry.toGMTString();
    },
    incrementCookie: function () {
        if(this.debug) console.log('incrementing cookie');
        var today = new Date();
        var expiry = new Date(today.getTime() + this.cookieLife * 24 * 3600 * 1000);
        document.cookie = this.cookieName + "=" + (parseInt(this.getCookie(this.cookieName)) + 1) + "; path=/; expires=" + expiry.toGMTString();
    },
    openModal: function(){
        // Get the modal
        var modal = document.getElementById('ttt_modal');
        var span = document.getElementsByClassName("ttt_close")[0];
        var optout = document.getElementById('ttt_optout');
        modal.style.display = "block";
        span.onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        optout.onclick = function(event){ // throws error > optout is null
            if(event.target == optout){
                // hide it.
                modal.style.display = "none";
                // instantiate another class for use of method use..
                TommyTwoTimes.setOptOut();
            }
        }
    },
    writeModal: function(theContent){
        document.write('<style type="text/css">#ttt_modal{display:none;position:fixed;z-index:1;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:#000;background-color:rgba(0,0,0,.4)}.ttt_modal-content{background-color:#fefefe;margin:15% auto;padding:20px;border:1px solid #888;width:80%}.ttt_close{color:#aaa;float:right;font-size:28px;font-weight:700}.ttt_close:focus,.ttt_close:hover{color:#000;text-decoration:none;cursor:pointer}</style><div id="ttt_modal"><div class="ttt_modal-content '+this.customModalClass+'"><div class="ttt_modal-header"><span class="ttt_close">X</span></div><div class="ttt_modal-body">'+theContent+'</div><div class="ttt_modal-footer"><button id="ttt_optout">Dont show me this again</button></div></div></div><script type="text/javascript">TommyTwoTimes.openModal();</script>');

    }
};

TommyTwoTimes.init();