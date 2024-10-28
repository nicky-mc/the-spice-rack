import React, { Suspense } from "react";
import css from "@/styles/HomeView.module.css";
import PostGenerator from "@/components/posts/PostGenerator";
import Posts from "@/components/posts/Posts";
import PopularTrends from "@/components/PopularTrends";
import { Space, Spin, Typography } from "antd";

const HomeView = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.postsArea}>
        {/* post generator on top */}
        <PostGenerator />

        {/* posts */}
        <Posts />
      </div>

      <div className={css.rightSide}>
        <Suspense
          fallback={
            <Space direction="vertical">
              <Spin />
              <Typography className="typoH4">Loading trends...</Typography>
            </Space>
          }
        >
          <PopularTrends />
        </Suspense>
      </div>
    </div>
  );
};

export default HomeView;
