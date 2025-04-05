import { type NextPage } from 'next';
import { useState } from 'react';
import { CVEditor } from '@/components/layout/CVEditor';

const Home: NextPage = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <CVEditor />
    </main>
  );
};

export default Home;
