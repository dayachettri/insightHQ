import Message from '../components/Message';
import { useEffect, useState, useMemo } from 'react';
import { db } from '../utils/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Home() {
  // Create a state with all the posts
  const [allPosts, setAllPosts] = useState([]);
  console.log(allPosts);

  const getposts = async () => {
    const collectionRef = collection(db, 'posts');
    const q = query(collectionRef, orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, snapshop => {
      setAllPosts(snapshop.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });

    return unsubscribe;
  };

  useEffect(() => {
    getposts();
  }, []);

  return (
    <div className="my-12 ">
      <h2 className="text-lg font-medium">Discover posts...</h2>

      {allPosts.map(post => {
        return (
          <Message key={post.id} {...post}>
            <Link to={post.id} state={post}>
              <button className="px-2 py-2 rounded-lg bg-gray-900 text-white">
                {post.comments?.length > 0 ? post.comments?.length : 0} comments
              </button>
            </Link>
          </Message>
        );
      })}
    </div>
  );
}

export default Home;
