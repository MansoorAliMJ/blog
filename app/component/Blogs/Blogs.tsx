"use client";
import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useGetBlogPostsQuery } from "@/app/redux/apis/blogsApi";
import { blog } from "@/app/component/types/types";
import style from "./blog.module.css";

const Blogs = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(0);
  const { data, isLoading, isFetching, isSuccess } = useGetBlogPostsQuery({
    page,
  });

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY + 1 >= document.body.offsetHeight;
      if (scrolledToBottom) {
        setPage(page + 1);
      }
    };

    document.addEventListener("scroll", onScroll);

    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [page]);

  return (
    <Fragment>
      <div className={style.blogWrapper}>
        {isSuccess &&
          data.blogs.map((blog: blog, index: number) => {
            return (
              <div
                key={blog.id ? +blog.id + index : index}
                onClick={() => {
                  router.push(`/post/${blog.id}`);
                }}
                className={style.blogPost}
              >
                <img
                  src={blog.photo_url}
                  alt={blog.title + index}
                  style={{ width: "100%" }}
                />
                <div className={style.blogDescWrapper}>
                  <div
                    className={style.blogCatgeory}
                  >{`Post: ${blog.category}`}</div>
                  <div className={style.blogTitle}>{blog.title}</div>

                  <div className={style.blogDescription}>
                    {blog.content_text}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {(isLoading || isFetching) && (
        <div className="display-flex-item-center">
          <span className="loader-spiner"></span>
        </div>
      )}
    </Fragment>
  );
};

export default Blogs;
