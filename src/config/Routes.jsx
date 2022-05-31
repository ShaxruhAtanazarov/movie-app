import React from "react";
import { Routes as Router, Route } from "react-router-dom";

import Home from "pages/Home";
import Catalog from "pages/Catalog";
import Detail from "pages/Detail";

const Routes = () => {
  return (
    <Router>
      <Route path="/" index element={<Home />} />
      <Route path="/:category/:id" element={<Detail />} />
      <Route path="/:category" element={<Catalog />} />
      <Route path="/:category/search/:keyword" element={<Catalog />} />
    </Router>
  );
};

export default Routes;
