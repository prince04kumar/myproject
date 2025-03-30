// /pages/admin/projects.js
'use client'
import React from 'react';
import CMSDashboard from '../../components/CMSDashboard';
import Head from 'next/head';

export default function ProjectsAdmin() {
  return (
    <>
      <Head>
        <title>Project Showcase CMS</title>
        <meta name="description" content="Admin panel for Project Showcase" />
      </Head>
      <CMSDashboard />
    </>
  );
}

// Add simple authentication for the admin page
export async function getServerSideProps(context) {
  // This is a basic authentication check
  // In a real app, you'd want to implement proper authentication
  const { req } = context;
  const authHeader = req.headers.authorization;

  // Very simple auth check - in production use a proper auth system
  if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}