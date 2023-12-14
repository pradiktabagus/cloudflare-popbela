import styles from '../skeleton.module.scss';

type SkeletonProps = {
  className?: string;
};
const SkeletonBox = ({ className }: SkeletonProps) => {
  return (
    <div className={`${styles['skeleton-box']} ${className && className}`} />
  );
};
export { SkeletonBox };
