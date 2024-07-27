import WhaleLogoSvg from '../../assets/logo/whale-favicon-black.svg?react';

export interface WhaleLogoProps {
  className?: string;
  fill?: string;
}
export const WhaleLogo = (props: WhaleLogoProps) => {
  const { fill } = props;
  return <WhaleLogoSvg fill={fill} {...props} />;
};
