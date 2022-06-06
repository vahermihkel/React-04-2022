import { Link } from "react-router-dom";

function AdminHome() {
  return (<div>
    <Link to="/admin/lisa-toode">
      <button>Toodet lisama</button>
    </Link>
    <Link to="/admin/tooted">
      <button>Halda tooteid</button>
    </Link>
    <Link to="/POODIDE_HALDAMISE_URL">
      <button>Halda poode</button>
    </Link>
    <Link to="/admin/kategooriad">
      <button>Halda kategooriaid</button>
    </Link>
  </div>)
}

export default AdminHome;