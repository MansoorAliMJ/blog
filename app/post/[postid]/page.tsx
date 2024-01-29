import React from "react";

type paramss = {
  params: {
    postid: number;
  };
};

export async function generateMetadata({ params }: paramss) {
  const postid = params.postid;
  const data = await fetchData(postid);

  if (!data.errorCode) {
    return {
      title: `${data.res.blog.title}`,
      description: `${data.res.blog.description} `,
      keywords: [
        `${data.res.blog.category}`,
        `${data.res.blog.title}`,
        "usedo blog",
      ],
      robots: {
        index: true,
        nocache: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: false,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  }
}

const fetchData = async (postid: number) => {
  const response = await fetch(
    `${process.env.APP_BACKEND_URL}/sample-data/blog-posts/${postid}`,
  );
  const res = await response.json();

  const errorCode = response.ok ? false : response.status;

  return { errorCode, res };
};

const page = async ({ params }: paramss) => {
  const postid = params.postid;
  const data = await fetchData(postid);
  console.log("dasd", data.res.blog);
  return <div>page</div>;
};

export default page;
