using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Spyder.Models
{
  public class Estado
  {
    public Estado()
    {
      this.EstadoID = 0;
      this.Sigla = null;
      this.Descricao = null;      
    }

    public Estado(int estadoID, string sigla, string descricao )
    {
      this.EstadoID = estadoID;
      this.Sigla = sigla;
      this.Descricao = descricao;
    }

    public int EstadoID
    { get; set; }
    public string Sigla
    { get; set; }
    public string Descricao
    { get; set; }
  }
}