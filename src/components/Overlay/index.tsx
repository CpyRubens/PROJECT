import React from "react";
import * as S from "./style";

export type OverlayProps = {
  children: React.ReactNode;
};

const Overlays: React.FC<OverlayProps> = ({ children }) => {
  return <S.Overlay>{children}</S.Overlay>;
};

export default Overlays;