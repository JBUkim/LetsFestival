import { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Post(props) {
  const [post, setPost] = useState(props.data);

  const getAll = async () => {
    const res = await fetch('https://json-jbupark21.vercel.app/posts');
    const data = await res.json();

    setPost(data);
  };

  const deletePost = async (id) => {
    console.log('tes');
    await fetch('https://json-jbupark21.vercel.app/posts' + id, {
      method: 'DELETE',
    });
    getAll();
  };

  const loppPost = (post) => {
    console.log(post);
    return post.map((item, index) => {
      return (
        <div key={item.id}>
          <div className="bg-gray-100 shadow-md px-4 py-2 rounded-md">
            <div>
              <h1 className="text-xl font-medium">{item.title}</h1>
              <p className="text-sm">{item.author}</p>
            </div>
            <div className="my-2">
              <Link href={`/post/${encodeURIComponent(item.id)}`}>
                <button className="px-2 py-1 bg-blue-800 rounded-sm text-white outline-none focus:ring-4 shadow-lg text-sm mr-1">
                  수정
                </button>
              </Link>
              <button
                onClick={(e) => deletePost(item.id)}
                className="px-2 py-1 bg-red-800 rounded-sm text-white outline-none focus:ring-4 shadow-lg text-sm mr-1"
              >
                삭제
              </button>
            </div>
          </div>
          <br />
        </div>
      );
    });
  };

  return (
    <Layout title="Board">
      <div>
        <div className="container mx-auto px-4 max-w-screen-sm">
          <div>
            <Link href="/Boardcreate">
              <div className="bg-red-600 mt-20 text-center text-white px-4  py-2 my-4 inline-block">
                게시물 올리기
              </div>
            </Link>
          </div>
          <div>{loppPost(post)}</div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch('https://json-jbupark21.vercel.app/posts');
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
  };
}
