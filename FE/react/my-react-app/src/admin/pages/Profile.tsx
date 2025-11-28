import "../assets/css/Profile.css";
const Profile = () => {
  return (
    <div className="profile-page p-6">
      <h1 className="text-2xl font-bold mb-6">Hồ sơ cá nhân</h1>

      <div className="profile-card bg-white shadow-md rounded-2xl p-6 max-w-xl">
        <div className="flex items-center gap-4 border-b pb-4 mb-4">
          <img
            src="https://via.placeholder.com/90"
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">Nguyễn Văn Admin</h2>
            <p className="text-gray-600">admin@yourdomain.com</p>
          </div>
        </div>

        <div className="info-grid grid grid-cols-1 gap-4">
          <div className="info-item">
            <label className="label">Họ và tên</label>
            <input
              type="text"
              className="input"
              value="Nguyễn Văn Admin"
              readOnly
            />
          </div>

          <div className="info-item">
            <label className="label">Email</label>
            <input
              type="text"
              className="input"
              value="admin@yourdomain.com"
              readOnly
            />
          </div>

          <div className="info-item">
            <label className="label">Số điện thoại</label>
            <input type="text" className="input" value="0123456789" readOnly />
          </div>

          <div className="info-item">
            <label className="label">Vai trò</label>
            <input
              type="text"
              className="input"
              value="Quản trị viên"
              readOnly
            />
          </div>
        </div>

        <button className="update-btn w-full mt-6 py-2 rounded-xl font-semibold">
          Chỉnh sửa thông tin
        </button>
      </div>
    </div>
  );
};

export default Profile;
