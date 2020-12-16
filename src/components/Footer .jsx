import React from 'react';

export default function Footer() {
  return (
    <footer>
      <p className="center">
        &copy; <span style={{ color: 'var(--red)' }}>Twa'</span>Genes{' '}
        {new Date().getFullYear()}
      </p>
    </footer>
  );
}
