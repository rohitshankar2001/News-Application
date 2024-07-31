import { useState } from "react";
import axios from 'axios';

export const History = (props) =>{

}

const ChatBot = () => {
    const [text, setText] = useState('')
    const [chatResponses, setChatResponses] = useState('')
    const [loading, setLoading] = useState(false)

    return(
        <div className="chatBot">
            <textarea 
            className="chatScreen"
            disabled
            value={chatResponses}
            />
            <div className="chatInput">
                <form>
                    <label >
                        CHAT: 
                        <input type="text"  
                            size="30" 
                            disabled = {loading}
                            onChange= {(e)=>{setText(e.target.value)}}  
                            onKeyDown={(e) =>{
                                if(e.key === "Enter"){
                                    console.log(text)
                                    setLoading(true)
                                    e.preventDefault()
                                    
                                    axios.post("http://localhost:8000/chatbot/", {
                                        text_sent: text
                                    }).then(function(response){
                                        setChatResponses(response.data)
                                    }).finally(() =>{
                                        setLoading(false)
                                    })
                                }
                            }}
                        />
                    </label>
                </form>
            </div>
        </div>
    );
}


export default ChatBot 