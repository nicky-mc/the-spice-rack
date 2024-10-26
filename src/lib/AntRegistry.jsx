"use client";

import React from "react";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import { useServerInsertedHTML } from "next/navigation";

const StyledComponentsRegistry = ({ children }) => {
  const [cache] = React.useState(() => createCache());
  const isServerInserted = React.useRef(false);

  useServerInsertedHTML(() => {
    isServerInserted.current = true;
    return (
      <style
        id="antd"
        dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
      />
    );
  });
  return <StyleProvider cache={cache}>{children}</StyleProvider>;
  if (isServerInserted.current) {
    return null;
  }
};
export default StyledComponentsRegistry;
