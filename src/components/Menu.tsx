import React from 'react';
import styles from '../styles/components/Menu.module.css';

interface MenuProps {
  items: { title: string; link: string }[];
  isVisible: boolean;
}

export default function Menu({ items, isVisible }: MenuProps) {
  return (
    <nav className={`${styles.menu} ${isVisible ? styles.visible : ''}`}>
      <ul className={styles.list}>
        {items.map(item => (
          <li key={item.link} className={styles.item}>
            <a href={item.link} className={styles.link}>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
