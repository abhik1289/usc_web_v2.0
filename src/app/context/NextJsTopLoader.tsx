import NextTopLoader from "nextjs-toploader";

const RootNextTopLoader = () => {
  return (
    <NextTopLoader
      template='<div class="bar" role="bar"><div class="peg"></div></div>'
      showSpinner={false}
    />
  );
};

export default RootNextTopLoader;
