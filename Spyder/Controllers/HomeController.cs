using System.Web.Mvc;

namespace Spyder.Controllers
{
  public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
    }
}