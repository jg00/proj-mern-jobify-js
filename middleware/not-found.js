const notFoundMiddleware = (req, res) => {
  // console.log("at not-found middleware");
  res.status(404).send("Route does not exist");
};

export default notFoundMiddleware;
