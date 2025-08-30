import cx from "classnames";

interface MainContentProps extends React.ComponentProps<"main"> {}
const MainContent = ({ className, children, ...props }: MainContentProps) => {
  return (
    <main className={cx("mt-20 pb-20", className)} {...props}>
      {children}
    </main>
  );
};

export default MainContent;
