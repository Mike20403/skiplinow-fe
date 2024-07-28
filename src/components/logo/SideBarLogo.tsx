import SideBarLogoSvg from '../../assets/logo/whale-favicon-black.svg?react';

export interface SideBarLogoProps {
  className?: string;
  fill?: string;
}
export const SideBarLogo = (props: SideBarLogoProps) => {
  const { fill } = props;
  return <SideBarLogoSvg fill={fill} {...props} />;
};
