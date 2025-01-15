import React from "react";
import "./userProfile.css";

const UserProfile = () => {
  const user = {
    username: "Tanisha Jat",
    email: "tanisha@gmail.com",
    bio: "",
    createdAt: "2025-01-10T00:00:00Z",
    profilePicture: {
      url: "",
    },
  };

  const postCount = 1;

  return (
    <div className="full-width-div bg-white">
      <div className="row">
        <div className="col-12 col-md-4 mb-4 bg-white mt-4">
          <div className="card border-none bg-white">
            <div className="card-body " style={{ lineHeight: "2rem" }}>
              <img
                src={
                  user.profilePicture.url ||
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
              <h4 className="card-title font-bold text-2xl">{user.username}</h4>
              <p className="card-text">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="card-text">
                <strong>Bio:</strong> {user.bio || "Not provided"}
              </p>
              <p className="card-text">
                <strong>Date Joined:</strong>{" "}
                {new Date(user.createdAt).toDateString()}
              </p>
              <p className="card-text">
                <strong>Number of Posts:</strong> {postCount}
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
          <div className="row g-3">
            <div className="col-12 col-sm-6">
              <div className="card">
                <img
                  src="https://media.istockphoto.com/id/2165850543/photo/close-up-of-female-legs-in-hiking-boots-walks-on-ground-with-yellow-orange-dry-fall-leaves.jpg?s=2048x2048&w=is&k=20&c=u0IKbfsmzrXqET3AKMtkIRLIYIq_u5CMZZP7o-WYRfI="
                  className="card-img-top"
                  alt=""
                />
                <div className="card-body">
                  <h5 className="card-title">Card Title</h5>
                  <p className="card-text">Card Text</p>
                  <a href="#" className="btn btn-primary mt-2">
                    Read More
                  </a>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6">
              <div className="card">
                <img
                  src="https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg"
                  className="card-img-top"
                  alt=""
                />
                <div className="card-body">
                  <h5 className="card-title">Card Title</h5>
                  <p className="card-text">Card Text</p>
                  <a href="#" className="btn btn-primary mt-2">
                    Read More
                  </a>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6">
              <div className="card">
                <img
                  src="https://cdn.pixabay.com/photo/2025/01/10/01/50/butterfly-9322917_1280.jpg"
                  className="card-img-top"
                  alt=""
                />
                <div className="card-body">
                  <h5 className="card-title">Card Title</h5>
                  <p className="card-text">Card Text</p>
                  <a href="#" className="btn btn-primary mt-2">
                    Read More
                  </a>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6">
              <div className="card">
                <img
                  src="https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg"
                  className="card-img-top"
                  alt=""
                />
                <div className="card-body">
                  <h5 className="card-title">Card Title</h5>
                  <p className="card-text">Card Text</p>
                  <a href="#" className="btn btn-primary mt-2">
                    Read More
                  </a>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6">
              <div className="card">
                <img
                  src="https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg"
                  className="card-img-top"
                  alt=""
                />
                <div className="card-body">
                  <h5 className="card-title">Card Title</h5>
                  <p className="card-text">Card Text</p>
                  <a href="#" className="btn btn-primary mt-2">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
