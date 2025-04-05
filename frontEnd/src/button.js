// import * as React from "react";

// const Button = React.forwardRef(({ className, ...props }, ref) => {
//   return (
//     <button
//       className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors ${className}`}
//       ref={ref}
//       {...props}
//     />
//   );
// });
// Button.displayName = "Button";

// export { Button };


import * as React from "react";

const Button = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-all shadow-md px-4 py-2 ${className}`}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button };
