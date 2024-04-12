// pages/_app.js
import React from 'react';
import '../tailwind.css'; // Importe seu arquivo CSS global aqui

function MyApp({ Component, pageProps }) {
  return (<Component {...pageProps} />);
}

export default MyApp;