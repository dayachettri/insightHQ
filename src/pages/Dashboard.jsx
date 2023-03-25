import { auth, db } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import Message from '../components/Message';
import { BsTrash2Fill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';

function Dashboard() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [posts, setPosts] = useState([]);

  // See if user is logged
  const getData = async () => {
    if (loading) return;
    if (!user) return navigate('/auth/login');

    const collectionRef = collection(db, 'posts');
    const q = query(collectionRef, where('user', '==', user.uid));
    const unsubscribe = onSnapshot(q, snapshot => {
      setPosts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  };

  //Delete Post
  const deletePost = async id => {
    const docRef = doc(db, 'posts', id);
    await deleteDoc(docRef);
  };

  //Get users data
  useEffect(() => {
    getData();
  }, [user, loading]);

  return (
    <div>
      <h1>Your posts</h1>
      <div>
        {posts.map(post => {
          return (
            <Message {...post} key={post.id}>
              <div className="flex gap-4">
                <button
                  onClick={() => deletePost(post.id)}
                  className="text-pink-600 flex items-center justify-center gap-2 py-2 text-sm"
                >
                  <BsTrash2Fill className="text-2xl" /> Delete
                </button>
                <Link to="/post" state={post}>
                  <button className="text-teal-600 flex items-center justify-center gap-2 py-2 text-sm">
                    <AiFillEdit className="text-2xl" />
                    Edit
                  </button>
                </Link>
              </div>
            </Message>
          );
        })}
      </div>
      <button
        className="font-medium text-white bg-gray-800 py-2 px-4 my-6 rounded-lg"
        onClick={() => auth.signOut()}
      >
        Sign out
      </button>
    </div>
  );
}

export default Dashboard;
