import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    speed={1}
    width={157}
    height={239}
    viewBox="0 0 157 239"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="-8" y="2" rx="0" ry="0" width="168" height="166" />
  </ContentLoader>
);

export default MyLoader;
