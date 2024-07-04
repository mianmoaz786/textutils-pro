// import React, { useState } from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';

// export default function Textform(props) {
//     const handleOnChange = (event) => {
//         setText(event.target.value);
//     };

//     const upperCase = () => {
//         setText(text.toUpperCase());
//     };

//     const lowerCase = () => {
//         setText(text.toLowerCase());
//     };

//     const clearText = () => {
//         setText('');
//     };

//     const [text, setText] = useState("");

//     return (
//         <div className='container my-3'>
//             <h2>{props.TextHeading}</h2>
//             <div className="form-group">
//                 <textarea 
//                     className="form-control" 
//                     id="text-box" 
//                     rows="8" 
//                     value={text} 
//                     onChange={handleOnChange}>
//                 </textarea>
//             </div>
//             <div className="d-flex flex-wrap">
//                 <button className="btn btn-primary my-3 me-2" onClick={upperCase}>Convert to Upper Case</button>
//                 <button className="btn btn-secondary my-3 me-2" onClick={lowerCase}>Convert to Lower Case</button>
//                 <button className="btn btn-danger my-3" onClick={clearText}>Clear Text</button>
//             </div>
//             <div className="container my-3">
// <h2>Text Summary</h2>
// <p> {text.split(" ").length-1} words and  {text.length} characters</p>
// <p>{0.008  * text.split(" ").length} Minutes read</p>
//                 <h2>Preview </h2>
//             <p>{text}</p>
//             </div>
            
//         </div>
//     );
// }































import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function Textform(props) {
    const [text, setText] = useState("");
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const [sentenceCount, setSentenceCount] = useState(0);
    const [totalWordTime, setTotalWordTime] = useState(0);
    const [lastWordTime, setLastWordTime] = useState(Date.now()); // Define lastWordTime
    const [copied, setCopied] = useState(false);

    // Update statistics whenever 'text' changes
    useEffect(() => {
        // Count words, characters, and sentences
    const updateStatistics = (newText) => {
        setWordCount(countWords(newText));
        setCharCount(countChars(newText));
        setSentenceCount(countSentences(newText));
    };

        updateStatistics(text);
    }, [text]);

    
    const countWords = (text) => {
        return text.split(/\s+/).filter(word => word.length > 0).length;
    };

    const countChars = (text) => {
        return text.replace(/\s/g, '').length;
    };

    const countSentences = (text) => {
        return text.split(/[.!?]+/).filter(sentence => sentence.length > 0).length;
    };

    // Handle text area change
    const handleOnChange = (event) => {
        const newText = event.target.value;
        setText(newText);

        // Calculate word time for average word time
        const currentWordCount = countWords(newText);
        if (currentWordCount > wordCount) {
            const wordTime = Date.now() - lastWordTime;
            setTotalWordTime(totalWordTime + wordTime);
            setLastWordTime(Date.now()); // Update lastWordTime
        }
    };

    // Convert text functions
    const upperCase = () => {
        setText(text.toUpperCase());
    };

    const lowerCase = () => {
        setText(text.toLowerCase());
    };

    // Clear text and reset counts
    const clearText = () => {
        setText('');
        setWordCount(0);
        setCharCount(0);
        setSentenceCount(0);
        setTotalWordTime(0);
        setLastWordTime(Date.now()); // Reset lastWordTime
    };

    // Handle copy to clipboard
    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied status after 2 seconds
    };

    // Calculate average word time and reading time
    const averageWordTime = wordCount > 0 ? (totalWordTime / wordCount / 1000).toFixed(2) : 0;
    const readingTime = (wordCount / 200).toFixed(2); // Assuming 200 words per minute reading speed

    return (
        <div className='container my-3'>
            <h2 className="animated-heading">{props.TextHeading}</h2>
            <div className="form-group">
                <textarea 
                    className="form-control animated-textarea" 
                    id="text-box" 
                    rows="8" 
                    value={text} 
                    onChange={handleOnChange}>
                </textarea>
            </div>
            <div className="d-flex flex-wrap">
                <button className="btn btn-primary my-3 me-2" onClick={upperCase}>Convert to Upper Case</button>
                <button className="btn btn-secondary my-3 me-2" onClick={lowerCase}>Convert to Lower Case</button>
                <CopyToClipboard text={text} onCopy={handleCopy}>
                    <button className="btn btn-info my-3 me-2">Copy Text</button>
                </CopyToClipboard>
                <button className="btn btn-danger my-3 me-2" onClick={clearText}>Clear Text</button>
            </div>
            {copied && <div className="alert alert-success animated-alert">Text Copied!</div>}
            <div className="preview-box">
                <h2 className="summary-heading">Preview</h2>
                <p>{text}</p>
            </div>
            <div className="summary-box">
                <h2 className="summary-heading">Text Summary</h2>
                <div className="summary-item">
                    <span className="summary-label">Word Count:</span>
                    <span className="summary-value">{wordCount}</span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">Character Count (excluding spaces):</span>
                    <span className="summary-value">{charCount}</span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">Sentence Count:</span>
                    <span className="summary-value">{sentenceCount}</span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">Average Time per Word:</span>
                    <span className="summary-value">{averageWordTime} seconds</span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">Estimated Reading Time:</span>
                    <span className="summary-value">{readingTime} minutes</span>
                </div>
            </div>
        </div>
    );
}
