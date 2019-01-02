/**
 * Patches the current GitHub webpage with an LGTM Tarsier icon. The state of the icon is determined by
 * the response provided by the LGTM.com API: if a project is not known by LGTM, then the Tarsier will
 * appear to be disabled.
 */
function patch_page(github_org_repo){
    img_disabled = chrome.runtime.getURL("tarsius-disabled.png")
    img_normal = chrome.runtime.getURL("tarsius.png")
    $(".pagehead-actions").prepend('<li><a target=_blank href="https://lgtm.com/projects/g/' + github_org_repo + '"><img class="lgtm-tarsius" src="' + img_disabled + '" /></a></li>')

    lgtm_api_url = "https://lgtm.com/api/v1.0/projects/g/" + github_org_repo
    console.log("Querying LGTM API: " + lgtm_api_url)
    
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
}

var github_url_rx = /https:\/\/github\.com\/([a-zA-Z0-9\-_\.]*)\/([a-zA-Z0-9\-_\.]*)/g;
var github_url_info = github_url_rx.exec(window.location)

if (github_url_info != null && github_url_info.length == 3) {
    // First element: whole URL
    // Second element: GitHub org
    // Third element: GitHub repo within org
    var github_org_repo = github_url_info[1] + "/" + github_url_info[2]
    console.log("GitHub organisation/user and repository from URL: " + github_org_repo)
    
    // Try to fetch details from GitHub API. That'll get us around issues with case-sensitivity of
    // projects and organisations in LGTM, and will also make it possible to refer to the origiinal
    // source of a forked repository.
    const gh = new GitHub();
    gh_repo = gh.getRepo(github_url_info[1], github_url_info[2])
    
    gh_repo.getDetails(function(err, details){
        if (err === null){
            // Data available from GitHub
            console.log("Details provided by GitHub API: ")
            console.log(details)
            
            // Use GitHub API data
            if ('source' in details){
                // We're looking at a fork; query LGTM for the source of the fork
                patch_page(details['source']['full_name']);
            } else {
                patch_page(details['full_name']);
            }
        } else {
            // No data available. Could be API rate limiting, or invalid URL, or ....
            console.log("Falling back to simple behaviour, becaulse GitHub API returned error:")
            console.log(err)
            
            // Use URL
            patch_page(github_org_repo);
        }
    });
} else {
    console.log("Couldn't parse URL: " + window.location)
    if (github_url_info == null){
        console.log("Got: NULL")
    } else {
        console.log("Got URL " + github_url_info.length + " components: " + github_url_info.toString())
    }
}


