import { async } from '@firebase/util';
import {
  arrayUnion,
  updateDoc,
  doc,
  Timestamp,
  getDoc,
  onSnapshot,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import { auth, db } from '../utils/firebase';

function CurrentPost() {
  const navigate = useNavigate();
  const location = useLocation();
  const routeData = location.state;
  const [message, setMessage] = useState('');
  const [allMessage, setallMessage] = useState([]);
  console.log(allMessage);

  // Submit a message
  const submitMessage = async () => {
    if (!auth.currentUser) return navigate('/auth/login');

    if (!message) {
      toast.error('Cannot submit an empty comment', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }

    const docRef = doc(db, 'posts', routeData.id);
    await updateDoc(docRef, {
      comments: arrayUnion({
        message,
        avatar: auth.currentUser.photoURL,
        userName: auth.currentUser.displayName,
        time: Timestamp.now(),
      }),
    });

    setMessage('');
  };

  //Get Comments
  const getComments = async () => {
    const docRef = doc(db, 'posts', routeData.id);
    const unsubscribe = onSnapshot(docRef, snapshot => {
      setallMessage(snapshot.data().comments);
    });

    return unsubscribe;
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div>
      <Message {...routeData}></Message>
      <div className="my-4">
        <div className="flex">
          <input
            onChange={e => setMessage(e.target.value)}
            type="text"
            value={message}
            placeholder="Add a comment"
            className="bg-gray-800 w-full p-2 text-white text-sm rounded-l-lg outline-0"
          />
          <button
            onClick={submitMessage}
            className="bg-cyan-500 text-white py-2 px-4 rounded-r-lg text-sm"
          >
            Submit
          </button>
        </div>
        <div className="py-6">
          <h2 className="font-bold">Comments</h2>
          {allMessage?.map(message => {
            return (
              <div
                key={message.time}
                className="bg-white p-4 border-2 rounded-lg shadow-lg mb-3"
              >
                <div className="flex items-center gap-2 mb-4">
                  <img
                    src={message.avatar}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-10 rounded-full"
                  />
                  <h2>{message.userName}</h2>
                </div>
                <h2>{message.message}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CurrentPost;
