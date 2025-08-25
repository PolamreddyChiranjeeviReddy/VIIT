// src/components/RedirectPage.js

import React from 'react';
import { useSearchParams } from 'react-router-dom';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'sans-serif',
    padding: '20px',
    textAlign: 'center'
  },
  card: {
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    maxWidth: '600px',
    borderTop: '5px solid #d9534f' // A red/warning color
  },
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '15px'
  },
  text: {
    marginBottom: '20px',
    color: '#555',
    lineHeight: '1.6'
  },
  url: {
    wordBreak: 'break-all',
    marginBottom: '30px',
    backgroundColor: '#f5f5f5',
    padding: '10px',
    borderRadius: '4px',
    color: '#333'
  },
  link: {
    display: 'inline-block',
    padding: '12px 25px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold'
  }
};

const RedirectPage = () => {
  const [searchParams] = useSearchParams();
  const externalUrl = searchParams.get('url');

  // Basic security check: if no URL, don't render a link
  if (!externalUrl) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.header}>Invalid Redirect</h1>
          <p style={styles.text}>No destination URL was provided.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.header}>You are now leaving our website</h1>
        <p style={styles.text}>
          You are being redirected to an external website. We are not responsible for the content of external sites.
        </p>
        <p style={styles.text}><strong>Destination:</strong></p>
        <p style={styles.url}>{externalUrl}</p>
        <a href={externalUrl} style={styles.link} rel="noopener noreferrer">
          Continue to External Site
        </a>
      </div>
    </div>
  );
};

export default RedirectPage;