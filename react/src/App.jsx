import React, { useEffect } from 'react';

import briefSteps from '@/data/briefSteps';
import { validateBriefSteps } from '@/utils/validateBriefSteps';

import { Header, Footer } from '@/components/layout';
import StepRenderer from '@/components/StepRenderer/StepRenderer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';

function App() {
  useEffect(() => {
    validateBriefSteps(briefSteps);
  }, []);

  return (
    <main className="app ui-container ui-grid-container ui-grid-gap">
      <div className="ui-col-md-12 ui-start-xl-3 ui-end-xl-11 ui-start-xxxl-5 ui-end-xxxl-9">
        <Header />
        <StepRenderer />
        <Footer />
      </div>
      <ToastContainer />
    </main>
  );
}

export default App;
