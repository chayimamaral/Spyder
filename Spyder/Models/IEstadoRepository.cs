using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spyder.Models
{
  public interface IEstadoRepository
  {
    IEnumerable<Estado> GetEstados();
    Estado GetEstadoById(int id);
    void InsertEstado(Estado estado);
    void DeleteEstado(int id);
    void EditEstado(Estado estado);
  }
}
