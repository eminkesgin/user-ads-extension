const userId = "emin";

document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        var url = document.URL;// hangi siteden reklamları çektiğimiz bilgisi//

        if (url.includes("www.google.com")) {
            let params = new URLSearchParams(location.search);
            sendUserHistory(params.get("q"));

        }

        var ads = RetrieveAds(url);
        console.log(ads);
        sendAds(ads);
    }
};

function sendUserHistory(query) {
    let userHistoryData = {
        userId :userId,
        searchText: query
    }

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "https://user-ads-api.herokuapp.com/user-search-history",
       // url: "http://127.0.0.1:8080/user-search-history",
        crossDomain: true,
        headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        data: JSON.stringify(userHistoryData),
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


function sendAds(ads) {
    for (let index = 0; index < ads.length; index++) {
        const element = ads[index];
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "https://user-ads-api.herokuapp.com/userAds",
            //url: "http://127.0.0.1:8080/userAds",
            crossDomain: true,
            headers: {
                "accept": "application/json",
                "Access-Control-Allow-Origin": "*"
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

                Ads.push(Ad);
            } catch (e) {

            }
        }
    } else {
        console.log("There is no Google Ads in this page!");
    }

    return Ads;
}






