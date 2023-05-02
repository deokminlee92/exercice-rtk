//  로딩화면 컴포넌트

import classNames from "classnames";

// className 을 props로 받으면서 다른 크기의 상자를 만들 수 있음
function Skeleton({ times, className }) {
  const outerClassNames = classNames(
    "relative",
    "overflow-hidden",
    "bg-gray-200",
    "rounded",
    "mb-2.5",
    className
  );
  const innerClassNames = classNames(
    "animate-shimmer",
    "absolute",
    "inset-0",
    "-translate-x-full",
    "bg-gradient-to-r",
    "from-gray-200",
    "via-white",
    "to-gray-200"
  );

  const boxes = Array(times)
    .fill(0)
    .map((_, i) => {
      return (
        <div key={i} className={outerClassNames}>
          <div className={innerClassNames} />
        </div>
      );
    });
  return boxes;

  // const boxes = [];
  // for (let i = 0; i < times; i++) {
  //   boxes.push(<div key={i} />);
  // }
  // return boxes;
}

export default Skeleton;
