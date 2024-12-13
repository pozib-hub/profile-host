import React, { FC, memo } from "react";
import { useTranslation } from "react-i18next";

interface IAppProps {
  className?: string;
}
export const App: FC<IAppProps> = memo(function App(props) {
  const { className } = props;

  const { t } = useTranslation();

  return <div className={""}>YEA</div>;
});
