import { Link } from "react-router-dom";

function AdminHome() {
  return (<div>
    <Link to="/ADMINI_LISAMISE_URL">
      <button>Toodet lisama</button>
    </Link>
    <Link to="/ADMINI_TOODETE_HALDAMISE_URL">
      <button>Halda tooteid</button>
    </Link>
    <Link to="/POODIDE_HALDAMISE_URL">
      <button>Halda poode</button>
    </Link>
  </div>)
}

export default AdminHome;