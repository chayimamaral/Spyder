using Spyder.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Spyder.Controllers
{
  public class EstadosController : Controller
  {
    EstadoRepository _estadoRepo = new EstadoRepository();
    // GET: Estados
    public ActionResult Index()
    {
      List<Estado> todosEstados = _estadoRepo.GetEstados().ToList();
      return View(todosEstados);
    }

    [HttpGet]
    public ActionResult CreatePartialView()
    {
      return PartialView("CreatePartialView");
    }

    [HttpGet]
    public JsonResult GetEstadoList()
    {
      var todosEstados = _estadoRepo.GetEstados().ToList();
      return Json(todosEstados, JsonRequestBehavior.AllowGet);
    }
    
    [HttpPost]
    public void Create(Estado estado)
    {
      _estadoRepo.InsertEstado(estado);
    }

    [HttpGet]
    public ActionResult EditPartialView(string id)
    {
      int selectedEstadoId = Convert.ToInt32(id);
      Estado selectedEstado = _estadoRepo.GetEstadoById(selectedEstadoId);
      return PartialView("EditPartialView", selectedEstado);
    }

    [HttpPost]
    public void Edit(Estado estado)
    {
      _estadoRepo.EditEstado(estado);
    }

    public void Delete(string id)
    {
      int selectedEstadoId = Convert.ToInt32(id);
      _estadoRepo.DeleteEstado(selectedEstadoId);
    }
  }
}
