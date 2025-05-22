import React, { useState } from 'react';
const Card = () => {
  const [input, setInput] = useState('');
  const [qr, setQr] = useState('');
  const [loading, setLoading] = useState(false);

  const generateQR = async (e) => {
    e.preventDefault();
    if (!input) return;
    setLoading(true);
    setQr('');
  
    try {
      // Using qrserver.com API to generate the QR code image URL
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(input)}&size=200x200`;
      setQr(qrUrl);
    } catch (err) {
      console.error('Failed to generate QR code', err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="form" onSubmit={generateQR}>
      <h1 className="title">QR Code Generator</h1>
      <input
        type="text"
        className="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
        placeholder="Enter URL or Text..."
      />
      {loading && (
        <div className="loading">
          <span></span>Loading...
        </div>
      )}
      {!loading && qr && (
        <>
          <img className="qr_code" src={qr} alt="QR Code" />
          <div className="loading">
            Generate Amazing QR Code for you & your friends!
          </div>
        </>
      )}
      <input type="submit" className="submit" value="Generate QR Code" />
    </form>
  );
};
export default Card;
