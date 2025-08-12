const getUserRole = (): string | null => localStorage.getItem("userRole");

const mockUsers = [
  {
    email: "supervisor@eeu.com",
    password: "123456",
    role: "Customer Service Supervisor",
  },
  { email: "manager@eeu.com", password: "123456", role: "General Manager" },
  {
    email: "distribution@eeu.com",
    password: "123456",
    role: "Distribution Supervisor",
  },
];

const logout = () => {
  localStorage.removeItem("userRole");
  localStorage.removeItem("userEmail");
  window.location.href = "/admin-login";
};

export { logout, getUserRole, mockUsers };
