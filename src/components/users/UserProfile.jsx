// UserProfile.jsx
import React from "react";
import { useSelector } from "react-redux";
import "./userProfile.css";

const UserProfile = () => {
  const { userInfo, posts } = useSelector((state) => state.auth);

  return (
    <div className="full-width-div bg-white">
      <div className="row">
        <div className="col-12 col-md-4 mb-4 bg-white mt-4">
          <div className="card border-none bg-white">
            <div className="card-body" style={{ lineHeight: "2rem" }}>
              <img
                src={
                  userInfo?.profilePicture?.url ||
                  "https://cdn.pixabay.com/photo/2015/12/13/20/43/doll-1091702_1280.jpg"
                }
                className="rounded-circle mb-3 img-fluid"
                style={{
                  width: "150px",
                  height: "150px",
                  display: "block",
                  margin: "0 auto",
                }}
                alt="Profile"
              />
              <h4 className="card-title font-bold text-2xl">
                {userInfo?.username}
              </h4>
              <p className="card-text">
                <strong>Email:</strong> {userInfo?.email}
              </p>
              <p className="card-text">
                <strong>Phone:</strong> {userInfo?.phone || "Not Available"}
              </p>

              <div className="d-grid gap-2 col-12 mx-auto mt-3">
                <button type="button" className="profile-btn">
                  <i className="fa-solid fa-pen-to-square bold m-2"></i>
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-8 mt-6 mb-6">
          <h2 className="mb-4 text-4xl font-bold text-center text-md-start">
            Your Posts
          </h2>
          <div className="row g-3 m-7">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <div className="col-12 col-sm-6" key={index}>
                  <div className="card">
                    <img
                      src={post.images[0] || "https://via.placeholder.com/150"}
                      className="card-img-top"
                      alt={post.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{post.name}</h5>
                      <p className="card-text">{post.description}</p>
                      <a href="#" className="btn btn-primary mt-2">
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No posts available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
