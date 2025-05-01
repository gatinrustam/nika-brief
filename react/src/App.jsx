import React, { useEffect } from 'react';

import briefSteps from '@/data/briefSteps';
import { validateBriefSteps } from '@/utils/validateBriefSteps';

import { Header, Footer } from '@/components/layout';
import StepRenderer from '@/components/StepRenderer/StepRenderer';
import Modal from '@/components/Modal/Modal';
import InitialModal from '@/components/InitialModal/InitialModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';

function App() {
  useEffect(() => {
    validateBriefSteps(briefSteps);
  }, []);

  return (
    <main className="app ui-container ui-grid-container ui-grid-gap">
      <div className="ui-col-md-12 ui-start-xxl-3 ui-end-xxl-11 ui-start-xxxl-3 ui-end-xxxl-11">
        <Header />
        <StepRenderer />
        <Footer />
      </div>
      <Modal modalKey="briefIntro">
        <InitialModal />
      </Modal>
      <ToastContainer />
    </main>
  );
}

export default App;