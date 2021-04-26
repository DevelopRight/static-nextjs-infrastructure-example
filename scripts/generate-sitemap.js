const sitemap = require('nextjs-sitemap-generator');
const path = require('path');

sitemap({
    baseUrl: 'staticnextjs.developright.co.uk',
    pagesDirectory: path.resolve(__dirname, '../out/'),
    targetDirectory: path.resolve(__dirname, '../out/'),
    ignoredExtensions: ["js", "map", "json", "xml", "png", "css", "jpeg", "jpg", "icon"],
    ignoredPaths: [
        "404",
        "favicon",
        "index",
    ],
    extraPaths: [
        "/"
    ]
});