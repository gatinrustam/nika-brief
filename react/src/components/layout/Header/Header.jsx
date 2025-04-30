import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentStep, setCurrentStep } from '@/store/slices/formSlice';
import './Header.scss';

const Header = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);

  const isFirstStep = currentStep === 0;

  const handleBack = () => {
    if (!isFirstStep) {
      dispatch(setCurrentStep(currentStep - 1));
    }
  };

  return (
    <header className="header">
      <div className="header__inner">
      {!isFirstStep && 
        (<button className="button button--gray button--rounded button--small button--icon button--back" onClick={handleBack}>
            <svg width="21" height="23" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M9.95362 21.4409C10.1993 21.7596 10.1996 22.2038 9.95445 22.5229C9.59978 22.9844 8.90416 22.985 8.54873 22.524L1.52588e-05 11.4366L8.55227 0.344532C8.90627 -0.114595 9.5988 -0.114893 9.95319 0.343927C10.199 0.662178 10.1993 1.10617 9.9539 1.42474L3.01185 10.4366L20 10.4359C20.5523 10.4359 21.0001 10.8836 21.0001 11.4359C21.0001 11.9881 20.5524 12.4359 20.0001 12.4359H3.01185L9.95362 21.4409Z" />
            </svg>
            {/* <span>Назад</span> */}
          </button>)}
        <img src="./images/logo.svg" className="header__logo" />
        <h1 className="header__title">Бриф<span className="header__title-desktop"> на разработку сайта</span></h1>
      </div>
    </header>
  );
};

export default Header;