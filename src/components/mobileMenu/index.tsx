import { FC, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
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
  const location = useLocation();

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
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`${styles.mobileLink} ${isActive ? styles.active : ""}`}
              onClick={onClose}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileMenu;
