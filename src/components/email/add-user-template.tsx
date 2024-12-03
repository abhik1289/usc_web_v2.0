import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  role: string;
  setupUrl: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  role,
  setupUrl,
}) => (
  <div
    style={{
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      padding: '20px',
      lineHeight: '1.6',
    }}
  >
    <h1 style={{ color: '#4CAF50' }}>Welcome to USC KIIT, {firstName}!</h1>
    <p>
      Congratulations on being invited to join as a <strong>{role}</strong> at
      USC KIIT! This role opens up exciting opportunities to collaborate,
      innovate, and grow within our dynamic community.
    </p>
    <p>
      To get started, please set up your account within the next
      <strong> 1 hour</strong>. After this time, the link will expire.
    </p>
    <p style={{ color: '#D32F2F' }}>
      <strong>Important:</strong> Do not share this link with anyone. It is
      uniquely generated for you to set up your credentials securely.
    </p>
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <a
        href={setupUrl}
        style={{
          textDecoration: 'none',
          backgroundColor: '#4CAF50',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '5px',
          fontSize: '16px',
          display: 'inline-block',
        }}
      >
        Set Up Your Account
      </a>
    </div>
    <p style={{ marginTop: '20px', fontSize: '14px', color: '#555' }}>
      If you encounter any issues, feel free to reach out to our support team.
    </p>
  </div>
);
