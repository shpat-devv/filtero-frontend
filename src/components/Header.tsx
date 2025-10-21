import React, { useState } from 'react';
import styles from '../styles/components/Header.module.css'
import Menu from '../components/Menu.js';

interface HeaderProps {
  title: string;
  subtitle: string;
  buttonText: string;
  menuItems: { title: string; link: string }[];
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, buttonText, menuItems }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <header className={styles['main-header']}>
      <div className={styles['header-left']}>
        <h1 className={styles['title']}>{title}</h1>
        <p className={styles['subtitle']}>{subtitle}</p>
      </div>

      <div className={styles['header-right']}>
        <button
          className={styles['menu-btn']}
          onClick={() => setMenuVisible(!menuVisible)}
        >
          <span className={styles['icon']}>
            <svg viewBox="0 0 175 80" width={40} height={40}>
              <rect width={80} height={15} fill="#f0f0f0" rx={10} />
              <rect y={30} width={80} height={15} fill="#f0f0f0" rx={10} />
              <rect y={60} width={80} height={15} fill="#f0f0f0" rx={10} />
            </svg>
          </span>
          <span className={styles['text']}>{buttonText}</span>
        </button>

        <Menu items={menuItems} isVisible={menuVisible} />
      </div>
    </header>
  );
};

export default Header;
