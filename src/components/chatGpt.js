import React, { useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Import GoogleGenerativeAI
import "../CSS/Gpt.css";

const API_KEY ="AIzaSyC06yTVxLN58CL2_7-IfzV8vOEojxehIlU"; // Use environment variable for API key
const genAI = new GoogleGenerativeAI(API_KEY);

const ChatGpt = () => {
    const [isDark, setIsDark] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const textareaRef = useRef(null);
    const lightMode = (
        <svg width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="light-mode">
            <path d="M7 12c0 2.8 2.2 5 5 5s5-2.2 5-5-2.2-5-5-5-5 2.2-5 5zm5-3c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3zm1-4V3c0-.6-.4-1-1-1s-1 .4-1 1v2c0 .6.4 1 1 1s1-.4 1-1zm6.1-.1c-.4-.4-1-.4-1.4 0l-1.4 1.4c-.4.4-.4 1 0 1.4.2.2.5.3.7.3s.5-.1.7-.3l1.4-1.4c.4-.3.4-1 0-1.4zM21 11h-2c-.6 0-1 .4-1 1s.4 1 1 1h2c.6 0 1-.4 1-1s-.4-1-1-1zm-3.3 5.2c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l1.4 1.4c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4l-1.4-1.4zM11 19v2c0 .6.4 1 1 1s1-.4 1-1v-2c0-.6-.4-1-1-1s-1 .4-1 1zm-6.1.1c.2.2.5.3.7.3s.5-.1.7-.3l1.4-1.4c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-1.4 1.4c-.4.3-.4 1 0 1.4zM2 12c0 .6.4 1 1 1h2c.6 0 1-.4 1-1s-.4-1-1-1H3c-.6 0-1 .4-1 1zm4.3-7.1c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l1.4 1.4c.2.3.5.4.8.4s.5-.1.7-.3c.4-.4.4-1 0-1.4L6.3 4.9z"></path>
        </svg>
    );
    const darkMode = (
        <svg width="30px" height="30px" viewBox="0 0 48 48" id="a" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <style>fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;</style>
            </defs>
            <path className="b" d="M31.75,6.479c6.7339,3.8881,10.3177,11.5721,8.969,19.23-1.3496,7.6616-7.3484,13.6604-15.01,15.01-7.6579,1.3487-15.3419-2.2351-19.23-8.969"/>
            <path className="b" d="M32.02,6.75c4.1858,7.2511,2.98,16.4095-2.94,22.33-5.9205,5.92-15.0789,7.1258-22.33,2.94"/>
            <path className="b" d="M10,8v4"/>
            <path className="b" d="M8,10h4"/>
            <path className="b" d="M12,18v3"/>
            <path className="b" d="M10.5,19.5h3"/>
            <path className="b" d="M30.5,14v3"/>
            <path className="b" d="M29,15.5h3"/>
            <path className="b" d="M38.5,5.5v3"/>
            <path className="b" d="M37,7h3"/>
            <path className="b" d="M7.5,41h3"/>
            <path className="b" d="M9,39.5v3"/>
            <path className="b" d="M39.5,36h3"/>
            <path className="b" d="M41,34.5l.02,3"/>
        </svg>
    );

    const handleToggle = () => {
        setIsDark((prev) => !prev);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        adjustHeight(event.target);
    };

    const adjustHeight = (element) => {
        element.style.height = "auto"; // Reset height to auto
        element.style.height = `${element.scrollHeight}px`; // Set height to scrollHeight
    };

    const handleSend = async (e) => {
        e.preventDefault();
        const userMessage = { role: "user", content: inputValue };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInputValue("");
        setLoading(true);
        setError(null);

        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // Reset height
        }

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Replace with the appropriate model
            const result = await model.generateContent([inputValue]);
            const botMessage = { role: "assistant", content: result.response.text() }; // Adjust based on the response structure
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to fetch response. Please try again.");
        } finally {
            setLoading(false);
            // Reset the height of the textarea after sending the message
            if (textareaRef.current) {
                textareaRef.current.style.height = "auto"; // Reset height to auto
            }
        }
    };

    return (
        <div
            className="chat-container"
            style={isDark ? { backgroundColor: "#333", color: "#fff" } : { backgroundColor: "#fff", color: "#000" }}
        >
            <header className="chat-header">
                <button onClick={handleToggle}>
                    {isDark ? darkMode : lightMode}
                </button>
            </header>
            <footer className="chat-footer" style={isDark ? { backgroundColor: "#333", color: "#fff" } : { backgroundColor: "#fff", color: "#000" }}>
                <form className="search-form" onSubmit={handleSend}>
                    <textarea
                        ref={textareaRef}
                        className="search-input"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Talk to Assistant"
                        rows={1} // Start with a single row
                    />
                    <button className="submit-button" type="submit" disabled={loading}>
                        Send
                    </button>
                </form>
                {error && <div className="error-message">{error}</div>}
            </footer>
            <div className="chat-body">
                {messages.map((msg, index) => (
                    <p key={index}>
                        <strong>{msg.role === "user" ? "You" : "Assistant"}:</strong> {msg.content}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default ChatGpt;