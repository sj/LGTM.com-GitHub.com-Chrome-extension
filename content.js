var github_url_rx = /https:\/\/github\.com\/([a-z0-9\-_]*)\/([a-z0-9\-_]*)/gi;
var github_url_info = github_url_rx.exec(window.location)

if (github_url_info != null && github_url_info.length == 3) {
    // First element: whole URL
    // Second element: GitHub org
    // Third element: GitHub repo within org
    var github_org_repo = github_url_info[1] + "/" + github_url_info[2]
    
    console.log("GitHub organisation/user and repository: " + github_org_repo)
    
    img_disabled = chrome.runtime.getURL("tarsius-disabled.png")
    img_normal = chrome.runtime.getURL("tarsius.png")
    $(".pagehead-actions").prepend('<li><a target=_blank href="https://lgtm.com/projects/g/' + github_org_repo + '"><img class="lgtm-tarsius" src="' + img_disabled + '" /></a></li>')

    lgtm_api_url = "https://lgtm.com/api/v1.0/projects/g/" + github_org_repo
    $.ajax({
        url: lgtm_api_url,
        type: "GET",
        success: function(result){
            $(".lgtm-tarsius").attr("src", img_normal)
            $(".lgtm-tarsius").attr("title", "Repository has been analysed by LGTM.com!")
        },
        error: function(error){
            $(".lgtm-tarsius").attr("title", "Repository hasn't been analysed (yet) by LGTM")
        }
    })
} else {
    console.log("Couldn't parse URL: " + window.location)
    if (github_url_info == null){
        console.log("Got: NULL")
    } else {
        console.log("Got URL " + github_url_info.length + " components: " + github_url_info.toString())
    }
}


