"use client";
import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useGetReltedBlogPostsQuery } from "@/app/redux/apis/blogsApi";
import { blog } from "@/app/component/types/types";
import style from "./blog.module.css";
const ReletedPosts = () => {
  const router = useRouter();
  const { data, isLoading, isFetching, isSuccess } =
    useGetReltedBlogPostsQuery();
  return (
    <div>
      {isSuccess &&
        data.blogs.map((blog: blog, index: number) => {
          return (
            <div
              key={blog.id}
              onClick={() => {
                router.push(`/post/${blog.id}`);
              }}
              className={`${style.blogPost} cursor-pointer`}
            >
              <div className={style.blogDescWrapper}>
                <div
                  className={style.blogCatgeory}
                >{`Post: ${blog.category}`}</div>
                <div className={style.blogTitle}>{blog.title}</div>

                <div className={style.blogDescription}>{blog.content_text}</div>
              </div>
            </div>
          );
        })}
      {(isLoading || isFetching) && (
        <div className="display-flex-item-center">
          <span className="loader-spiner"></span>
        </div>
      )}
    </div>
  );
};

export default ReletedPosts;
