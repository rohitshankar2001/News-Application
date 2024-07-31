import React, { useState, useEffect } from "react";
import axios from 'axios';

export const NewsCard = (props) =>{
    return(
        <div className="panel">
            <h1><a href = {props.link} target="_blank">{props.title}</a></h1>
            <div className = "panelImageDescription">
                <img src={props.path}></img>
                <p>{props.description}</p>
            </div>
        </div>
    );
} 

const Content = (props) => {
    const [articles, setArticles] = useState(null)
   
    useEffect(() =>{
        axios.get("http://localhost:8000/articles/".concat(props.category)).then((result) => {
          console.log(result['data'][0])
          //setArticles(result['data'][0][0]['title'])
          setArticles(result['data'])

        })
    }, [])
    return (
        <div>
            <h1>{props.category.toUpperCase()}</h1>
            {articles && articles.map((newsOrg, orgIndex) => {
                return (
                    <div key={orgIndex}>
                        {newsOrg.map((articleInfo, articleIndex) => {
                            
                            //Specific parsing for RSS feeds
                            let imagePath = ""
                            let title = ""
                            let description = ""
                            let link = ""

                            //NPR USA RSS pre processing
                            if (props.category === "usa" && orgIndex === 1){
                                var html_snippet = articleInfo["content:encoded"][0]
                                var doc = document.createElement('html');
                                doc.innerHTML = html_snippet
                                imagePath = doc.getElementsByTagName('img')[0]['src'];
                                title = articleInfo["title"][0]
                                description = articleInfo["description"][0].replace(/<[^>]*>/g, '')
                                link = articleInfo["link"][0]
                                
                                if (imagePath.substring(0,63) === "https://media.npr.org/include/images/tracking/npr-rss-pixel.png"){
                                    imagePath = "https://www.cincinnatiport.org/wp-content/uploads/NPR-logo.png"

                                }
                            }

                            //DOD USA RSS pre processing
                            if (props.category === "usa" && orgIndex === 0){
                                imagePath = articleInfo["enclosure"][0]['$']["url"]
                                title = articleInfo["title"][0]
                                description = articleInfo["description"][0].replace(/<[^>]*>/g, '')
                                link = articleInfo["link"][0]
                            }

                            // NPR Technology
                            if (props.category === "technology" && orgIndex === 0){
                                var html_snippet = articleInfo["content:encoded"][0]
                                var doc = document.createElement('html');
                                doc.innerHTML = html_snippet
                                imagePath = doc.getElementsByTagName('img')[0]['src'];
                                title = articleInfo["title"][0]
                                description = articleInfo["description"][0].replace(/<[^>]*>/g, '')
                                link = articleInfo["link"][0]
                                
                                if (imagePath.substring(0,63) === "https://media.npr.org/include/images/tracking/npr-rss-pixel.png"){
                                    imagePath = "https://www.cincinnatiport.org/wp-content/uploads/NPR-logo.png"

                                }
                            }

                            // Yahoo Business 
                            // if (props.category === "business" && orgIndex === 0){
                            //     try{
                            //         imagePath = articleInfo["media:content"][0]["$"]["url"] ;
                            //     }catch (error){
                            //         imagePath = "https://upload.wikimedia.org/wikipedia/commons/8/8f/Yahoo%21_Finance_logo_2021.png"
                            //     }
                            //     title = articleInfo["title"][0]
                            //     link = articleInfo["link"][0]
                            // }
                            
                            // NPR Business
                            if (props.category === "business" && orgIndex === 0){
                                var html_snippet = articleInfo["content:encoded"][0]
                                var doc = document.createElement('html');
                                doc.innerHTML = html_snippet
                                imagePath = doc.getElementsByTagName('img')[0]['src'];
                                title = articleInfo["title"][0]
                                description = articleInfo["description"][0].replace(/<[^>]*>/g, '')
                                link = articleInfo["link"][0]
                                
                                if (imagePath.substring(0,63) === "https://media.npr.org/include/images/tracking/npr-rss-pixel.png"){
                                    imagePath = "https://www.cincinnatiport.org/wp-content/uploads/NPR-logo.png"

                                }
                            }
                            // NPR Politics
                            if (props.category === "politics" && orgIndex === 0){
                                    
                                var html_snippet = articleInfo["content:encoded"][0]
                                var doc = document.createElement('html');
                                doc.innerHTML = html_snippet
                                imagePath = doc.getElementsByTagName('img')[0]['src'];
                                title = articleInfo["title"][0]
                                description = articleInfo["description"][0].replace(/<[^>]*>/g, '')
                                link = articleInfo["link"][0]

                                if (imagePath.substring(0,63) === "https://media.npr.org/include/images/tracking/npr-rss-pixel.png"){
                                    imagePath = "https://www.cincinnatiport.org/wp-content/uploads/NPR-logo.png"

                                }
                            }

                            return (
                                <div key={articleIndex}>
                                    <NewsCard title = {title} description = {description} path = {imagePath} link = {link}/>
                                    <br></br>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
    
}

export default Content 