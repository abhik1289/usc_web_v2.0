import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
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
      We're thrilled to invite you to join our vibrant community. As a member
      of USC KIIT, you'll gain access to exclusive resources, events, and
      opportunities to grow and connect.
    </p>
    <p>
      To complete your registration, please set up your account within the next
      <strong> 1 hour</strong>. After this time, the link will expire.
    </p>
    <p style={{ color: '#D32F2F' }}>
      <strong>Important:</strong> Do not share this link with anyone. It is
      uniquely generated for you to set up your credentials securely.
    </p>
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <a
        href="https://usc-kiit.example.com/setup" // Replace with the actual setup URL
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
