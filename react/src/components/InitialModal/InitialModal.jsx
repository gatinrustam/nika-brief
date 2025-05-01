import { useDispatch } from 'react-redux';
import { closeModal } from '@/store/slices/uiSlice';

import './InitialModal.scss';

export default function InitialModal() {
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeModal('briefIntro'));
    };
    return (
        <>
        <h2 className="title title--heading-2">Привет! 👋</h2>
        <div className="initial-block ui-grid-container ui-grid-gap">
            <div className="initial-block__item ui-col-xxs-2 ui-col-md-6">
                <img src="/images/icons/brief.svg" alt="brief" loading="lazy" />
                <div className="initial-block__item-content">
                    Этот бриф поможет нам понять, как сделать ваш сайт эффективным и удобным.
                </div>
            </div>
            <div className="initial-block__item ui-col-xxs-2 ui-col-md-6">
                <img src="/images/icons/question.svg" alt="question" loading="lazy" />
                <div className="initial-block__item-content">
                    Мы зададим вам несколько вопросов, чтобы понять ваши цели и задачи.
                </div>
            </div>
            <div className="initial-block__item ui-col-xxs-2 ui-col-md-6">
                <img src="/images/icons/memo.svg" alt="memo" loading="lazy" />
                <div className="initial-block__item-content">
                    Бриф запоминает ваши ответы, так что вы можете вернуться когда удобно.
                </div>
            </div>
            <div className="initial-block__item ui-col-xxs-2 ui-col-md-6">
                <img src="/images/icons/pdf.svg" alt="pdf" loading="lazy" />
                <div className="initial-block__item-content">
                    В конце вы сможете скачать PDF с вашими ответами и отправить его нам.
                </div>
            </div>
        </div>
        <div className="button-wrap button-wrap--center">
            <button className="button button--green" onClick={handleClose}>Приступить</button>
        </div>
        </>
    )
}