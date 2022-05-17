
document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        var url = document.URL;
        var ads = RetrieveAds(url);
        console.log(ads);
        sendAds(ads);
    }

};
const userId = "emin";


function sendAds(ads) {

    console.log(ads);
   for (let index = 0; index < ads.length; index++) {
       const element = ads[index];
       $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://127.0.0.1:8080/userAds",
        crossDomain: true,
        headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
        },
        data: JSON.stringify(element),
        dataType: 'json',
        cache: false,
        timeout: 100000,
        success: function (data) {
            console.log("send success data");
            console.log(data);
        },
        error: function (e) {
            console.log("send error " + e)
        }
    });
   }
}


function RetrieveAds (url) {
    var Ads = [];
    var iFrameList = document.querySelectorAll('iframe[id^="google_ads_iframe"], iframe[id^="aswift"]');

    for (var i = 0; i < iFrameList.length > 0; i++) {
        console.log(iFrameList[i])
    }

    if (iFrameList && iFrameList.length > 0) {
        for (var i = 0; i < iFrameList.length; i++) {
            var iFrame = iFrameList[i];
            try {

                var AElement = iFrame.contentWindow.document.querySelector('#google_image_div > a[id="aw0"]');
                //console.log("AElement -> " + AElement);

                var ImageUrl = AElement.querySelector("img").src;
                //console.log("image url -> " +  ImageUrl);


                var Ad = {
                    iFrame,
                    adUrl: AElement.href,
                    ImageUrl,
                    userId,
                    url
                }

                Ads.push(Ad);// ajax kütüphanesini kullanarak rest apimize istek atıcaz //
            } catch (e) {

            }
           
        }
    }
    else {
        console.log("There is no Google Ads in this page!");
    }

    return Ads;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}






