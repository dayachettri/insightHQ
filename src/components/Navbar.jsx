import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function Navbar() {
  const [user, loading] = useAuthState(auth);

  return (
    <nav className="flex justify-between items-center py-10">
      <Link to=".">
        <button className="text-lg font-medium">InsightHQ</button>
      </Link>
      <ul className="flex items-center gap-10">
        {!user ? (
          <Link
            to="auth/login"
            className="py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg font-medium ml-8"
          >
            Join Now
          </Link>
        ) : (
          <div className="flex items-center gap-6">
            <Link
              to="post"
              className="font-medium bg-cyan-500 text-white py-2 px-4 rounded-md text-sm"
            >
              <button>Post</button>
            </Link>
            <Link to="dashboard">
              <img
                src={user.photoURL}
                alt="user-image"
                referrerPolicy="no-referrer"
                className="w-12 rounded-full cursor-pointer"
              />
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
