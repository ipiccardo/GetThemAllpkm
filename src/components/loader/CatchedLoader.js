import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    speed={1}
    width={10000}
    height={500}
    viewBox="0 0 10000 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="19" y="35" rx="0" ry="0" width="800" height="500" />
  </ContentLoader>
);

export default MyLoader;
