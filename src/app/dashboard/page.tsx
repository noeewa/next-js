import Link from "next/link";

export default function DashboardPage() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh"
    }}>
      <h1>Dashboard</h1>
      <Link href="/dashboard/create">
        Go to Create Project
      </Link>
    </div>
  );
}
