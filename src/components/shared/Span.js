import React from "react";

const Span = (props) => {
  let spanDisabledDeleteButton = props.disabledButton
    ? props.disabledClass
    : "";
  //let spanOnClick = onClick ? onClick : () => {};

  let spanOnClick;

  if (!props.onClick) {
    spanOnClick = () => {};
  } else {
    spanOnClick = props.onClick;
  }

  return (
    <span
      className={`${props.className} ${spanDisabledDeleteButton}`}
      onClick={() => spanOnClick(props.id)}
    >
      {props.value}
    </span>
  );
};

export default Span;

// import React from "react";

// const Span = ({
//   value,
//   id,
//   onClick,
//   className,
//   disabledClass,
//   disabledButton,
// }) => {
//   let spanDisabledDeleteButton = disabledButton ? disabledClass : "";
//   //let spanOnClick = onClick ? onClick : () => {};

//   let spanOnClick;

//   if (!onClick) {
//     spanOnClick = () => {};
//   } else {
//     spanOnClick = onClick;
//   }

//   return (
//     <span
//       className={`${className} ${spanDisabledDeleteButton}`}
//       onClick={() => spanOnClick(id)}
//     >
//       {value}
//     </span>
//   );
// };

// export default Span;
