import { FC, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import styles from "./mobileMenu.module.css";

export type MenuItem = {
  to: string;
  label: string;
};

type MobileMenuProps = {
  items: MenuItem[];
  isOpen: boolean;
  onClose: () => void;
};

const MobileMenu: FC<MobileMenuProps> = ({ items, isOpen, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (target.closest("[data-burger-button]")) return;

      if (menuRef.current && !menuRef.current.contains(target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}>
      <div ref={menuRef} className={styles.mobileMenuContent}>
        {items.map((item) => {
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${styles.mobileLink} ${isActive ? styles.activeLink : ""}`
              }
              onClick={onClose}
            >
              {item.label}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default MobileMenu;
