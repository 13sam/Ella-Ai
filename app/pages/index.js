import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import { useState } from 'react';

const Home = () => {
  const [reasonInput, setReasonInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerating2, setIsGenerating2] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log('Calling OpenAI...');
    const response = await fetch('/api/summaryWrite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reasonInput}),
    });

    const data = await response.json();
    const { output } = data;
    console.log('OpenAI replied...', output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };

  const callGenerateEndpoint2 = async () => {
    setIsGenerating2(true);

    console.log('Calling OpenAI...');
    const response = await fetch('/api/flashcardsWrite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reasonInput}),
    });

    const data = await response.json();
    const { output } = data;
    console.log('OpenAI replied...', output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating2(false);
  };

  

  const onChangedReason = (event) => {
    setReasonInput(event.target.value);
  };

  

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>👋🏻 Get detailed summary in seconds by Ella.</h1>
          </div>
          <div className="header-subtitle">
            <h2>
            Instantly distill lengthy content into concise summaries and flashcards
            </h2>
          </div>
        </div>
        <div className="prompt-container">
        
          <textarea
            className="prompt-box"
            placeholder="Paste the url from a webpage, a pdf file or even a course page"
            value={reasonInput}
            onChange={onChangedReason}
          />
          <div className="prompt-buttons">
            <a
              className={
                isGenerating ? 'generate-button loading' : 'generate-button'
              }
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? <span className="loader"></span> : <p>Generate Summary</p>}
              </div>
            </a>
            <a
              className={
                isGenerating2 ? 'generate-button-two loading' : 'generate-button-two'
              }
              onClick={callGenerateEndpoint2}
            >
              <div className="generate">
                {isGenerating2 ? <span className="loader"></span> : <p>Generate Flashcards</p>}
              </div>
            </a>
          </div>
        </div>
        {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Your Content</h3>
              </div>
            </div>
           
            {apiOutput.split('\n\n').map((flashcard, index) => (
      <div key={index} className="output-box" id="outputBox">
        <p>{flashcard}</p>
        <button id="copyButton" className="generate-button-two">Copy Text</button>
      </div>
      
    ))}
          </div>
        
        )}
      </div>
      <div className="badge-container grow">
        <a
          href="https://twitter.com/SamreedhiSammy"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
          
            <p>Created with 💙 by Samreedhi</p>
          </div>
        </a>
      </div>
    </div>


  );
};

export default Home;



