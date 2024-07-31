const express = require("express");
const axios = require("axios");
const { parseString } = require('xml2js');
const router = express.Router();

async function parseXMLRSS(xmlData) {
    return new Promise((resolve, reject) => {
        let news_articles = [];
        parseString(xmlData, (err, result) => {
            if (err) {
                console.error("Error", err);
                reject(err);
            }
            if (result && result['rss'] && result['rss']['channel'] && result['rss']['channel'][0]['item']) {
                news_articles = result['rss']['channel'][0]['item'];
            }
            // returns promise value
            resolve(news_articles);
        });
    });
}

async function getArticles(sources, route) {
    try {
        const requests = sources.map(i => axios.get(i));
        const out = await Promise.all(requests);
        let categoryArticles = [];
        for (let i = 0; i < out.length; i++) {
            const parsedArticles = await parseXMLRSS(out[i].data);
            categoryArticles.push(parsedArticles);
        }
        //categoryArticles = categoryArticles.sort(() => Math.random() - 0.5);
        router.get(route, (req, res) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Max-Age", "1800");
            res.setHeader("Access-Control-Allow-Headers", "content-type");
            res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
            res.send(categoryArticles);
        });
    } catch (error) {
        console.error("Error fetching articles:", error);
    }
}

const usaSources = [
    'https://www.defense.gov/DesktopModules/ArticleCS/RSS.ashx?max=10&ContentType=1&Site=945',
    'https://feeds.npr.org/1003/rss.xml',
];

const techSources = [
    'https://feeds.npr.org/1019/rss.xml'
];

const businessSources =[
//'https://finance.yahoo.com/news/rssindex'
    'https://feeds.npr.org/1006/rss.xml'  
];

const politicsSources = [
    'https://feeds.npr.org/1014/rss.xml'
]

getArticles(usaSources, "/usa");
getArticles(techSources, "/technology");
getArticles(businessSources, "/business");
getArticles(politicsSources, "/politics");

router.get("/", (req, res) => {
    res.send("News Articles API");
});

module.exports = router;
