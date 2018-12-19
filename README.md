# Chrome extension: links from GitHub.com repositories to LGTM.com

This extension for Google Chrome automatically inserts links to LGTM.com project pages from GitHub.com repositories. This is what that looks like:

![Screenshot](screenshot.png "Screenshot")

## Installation

The extension is currently **not** packaged or available from the Chrome Web Store. You can install the extension by following the following process:

1. Create a local clone of this repository
2. Go to `chrome://extensions`
3. Enable "Developer mode" (top right)
4. Click "Load unpacked", and navigate to the location of your local clone of this repository


## Ideas for future work

 - If a repository hasn't been analysed by LGTM yet, give the user the option to add it to LGTM.com
 - Support for forks: use the GitHub API to resolve a fork to its source, and then use that when linking to LGTM.com

Pull requests are more than welcome!


## License

Unless [stated otherwise](lib/README.md), the code in this repository is licensed under the [Apache License, version 2.0](LICENSE.txt).
