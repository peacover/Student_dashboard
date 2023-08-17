import clsx from "clsx";
import { ReactNode } from "react";

export interface IChildrenClass{
    children : ReactNode,
    className? : string,
}

const GlassPane : React.FC<IChildrenClass> = ({ children, className })=> {
  return (
    <div
      className={clsx(
        "glass rounded-2xl border-solid border-2 border-gray-200",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassPane;