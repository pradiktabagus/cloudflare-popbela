import styles from '../ads.module.scss';

type PredefineProps = {
  children: React.ReactNode;
  classNames?: string;
};
export const PredefinedSpaceAd = ({ children, classNames }: PredefineProps) => {
  return (
    <div className={`${styles['wrapper-ads-predefine']} mx-auto ${classNames}`}>
      {children}
    </div>
  );
};
