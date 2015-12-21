using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace Spyder.Models
{
  public class EstadoRepository: IEstadoRepository
  {
    private List<Estado> todosEstados;
    private XDocument estadoData;

    public EstadoRepository()
    {
      todosEstados = new List<Estado>();
      estadoData = XDocument.Load(HttpContext.Current.Server.MapPath("~/App_Data/Estados.xml"));

      var estados = from e in estadoData.Descendants("item")
                    select new Estado(
                      (int)e.Element("id"),
                      (string)e.Element("sigla").Value,
                      (string)e.Element("descricao").Value);
      todosEstados.AddRange(estados.ToList<Estado>());
    }

    public IEnumerable<Estado> GetEstados()
    {
      return todosEstados;
    }

    public Estado GetEstadoById(int id)
    {
      return todosEstados.Find(e => e.EstadoID == id);
    }

    public void InsertEstado(Estado estado)
    {
      estado.EstadoID = (int)(from b in estadoData.Descendants("item") orderby (int)b.Element("id") descending select (int)b.Element("id")).FirstOrDefault() + 1;
      estadoData.Root.Add(new XElement("item",
                          new XElement("id", estado.EstadoID),
                          new XElement("sigla", estado.Sigla),
                          new XElement("descricao", estado.Descricao)));
      estadoData.Save(HttpContext.Current.Server.MapPath("~App_Data/Estados.xml"));
    }

    public void DeleteEstado(int id)
    {
      estadoData.Root.Elements("item").Where(i => (int)i.Element("id") == id).Remove();

      estadoData.Save(HttpContext.Current.Server.MapPath("~/App_Data/Estados.xml"));
    }

    public void EditEstado(Estado estado)
    {
      XElement node = estadoData.Root.Elements("item").Where(i => (int)i.Element("id") == estado.EstadoID).FirstOrDefault();
      node.SetElementValue("sigla", estado.Sigla);
      node.SetElementValue("descricao", estado.Descricao);
      estadoData.Save(HttpContext.Current.Server.MapPath("~/App_Data/Estados.xml"));
    }
  }
}