import React from 'react';
import Tippy from '@tippyjs/react';
import './Footer.scss';

const Footer = () => {

  return (
    <div className="footer">
        <Tippy content="Разработка удобных квизов" placement="top" trigger="mouseenter focus">
          <a href="https://undercore.ru" target="_blank">Сделано в Undercore</a>
        </Tippy>
    </div>
  );
};

export default Footer;