import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/Users.css";
import { deleteUser, fetchUsers, updateUser } from "../api/userApi";
import {
  IUser,
  UserFormPayload,
  UserRole,
  UserStatus,
} from "../../interface/IUser";

const PAGE_SIZE = 8;

const Usermanager = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | UserRole>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | UserStatus>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [actionUserId, setActionUserId] = useState<number | null>(null);

  const buildPayload = (user: IUser): UserFormPayload => ({
    name: user.name,
    email: user.email,
    phone: user.phone ?? undefined,
    role: user.role,
    status: user.status,
  });

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể tải người dùng.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const filteredUsers = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    return users.filter((user) => {
      const matchesSearch =
        !keyword ||
        user.name.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword) ||
        user.phone?.toLowerCase().includes(keyword);

      const matchesRole =
        roleFilter === "all" ? true : user.role === roleFilter;

      const matchesStatus =
        statusFilter === "all" ? true : user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const pageUsers = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleToggleStatus = async (user: IUser) => {
    const nextStatus: UserStatus = user.status === "active" ? "unactive" : "active";
    setActionUserId(user.id);
    setError(null);
    try {
      const updated = await updateUser(user.id, {
        ...buildPayload(user),
        status: nextStatus,
      });

      setUsers((prev) =>
        prev.map((item) => (item.id === user.id ? updated : item)),
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Không thể cập nhật trạng thái người dùng.",
      );
    } finally {
      setActionUserId(null);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn xóa người dùng này?",
    );
    if (!confirmed) return;

    setActionUserId(id);
    setError(null);

    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Không thể xóa người dùng.",
      );
    } finally {
      setActionUserId(null);
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setRoleFilter("all");
    setStatusFilter("all");
  };

  return (
    <div className="user-page">
      <div className="main">
        <div className="page-header">
          <h2>Quản lý người dùng</h2>
        </div>

        {error && <div className="error-banner">{error}</div>}

        <div className="filter-box">
          <input
            type="text"
            placeholder="Tìm người dùng..."
            className="filter-input"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          <select
            className="filter-select"
            value={roleFilter}
            onChange={(event) =>
              setRoleFilter(event.target.value as "all" | UserRole)
            }
          >
            <option value="all">Tất cả quyền</option>
            <option value="user">Khách hàng</option>
            <option value="admin">Quản trị viên</option>
          </select>

          <select
            className="filter-select"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as "all" | UserStatus)
            }
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Hoạt động</option>
            <option value="unactive">Đã khóa</option>
          </select>

          <button type="button" className="btn" onClick={resetFilters}>
            Đặt lại
          </button>
          <button type="button" className="btn" onClick={loadUsers}>
            Làm mới
          </button>

          <Link to="/admin/adduser">
            <button className="btn primary add-user-btn">
              + Thêm người dùng
            </button>
          </Link>
        </div>

        <div className="table-box">
          <table className="user-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Ảnh đại diện</th>
                <th>Tên người dùng</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Quyền</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={8} className="table-message">
                    Đang tải dữ liệu...
                  </td>
                </tr>
              )}

              {!loading && pageUsers.length === 0 && (
                <tr>
                  <td colSpan={8} className="empty-state">
                    Không có người dùng phù hợp với bộ lọc hiện tại.
                  </td>
                </tr>
              )}

              {!loading &&
                pageUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td>{(currentPage - 1) * PAGE_SIZE + index + 1}</td>
                    <td>
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.name,
                        )}&background=3b82f6&color=fff`}
                        alt={user.name}
                        className="user-avatar"
                      />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone ?? "--"}</td>
                    <td>
                      {user.role === "admin" ? "Quản trị viên" : "Khách hàng"}
                    </td>
                    <td>
                      <span
                        className={`status ${
                          user.status === "active" ? "active" : "banned"
                        }`}
                      >
                        {user.status === "active" ? "Hoạt động" : "Đã khóa"}
                      </span>
                    </td>
                    <td>
                      <Link to={`/admin/edituser/${user.id}`}>
                        <button className="action-btn edit">Sửa</button>
                      </Link>
                      <button
                        type="button"
                        className="action-btn toggle"
                        onClick={() => handleToggleStatus(user)}
                        disabled={actionUserId === user.id}
                      >
                        {user.status === "active" ? "Khóa" : "Mở khóa"}
                      </button>
                      <button
                        type="button"
                        className="action-btn delete"
                        onClick={() => handleDelete(user.id)}
                        disabled={actionUserId === user.id}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="pagination right">
          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
            (page) => (
              <button
                key={page}
                className={`page-btn ${page === currentPage ? "active" : ""}`}
                onClick={() => setCurrentPage(page)}
                disabled={page === currentPage}
              >
                {page}
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default Usermanager;
