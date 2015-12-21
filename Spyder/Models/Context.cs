using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Spyder.Models
{
  public class Context
  {
    private static List<Cliente> clientes;

    public static List<Cliente> Clientes
    {
      get
      {
        if (clientes == null)
          IniciarClientes();
        return Context.clientes;
      }
      set
      {
        Context.clientes = value;
      }
    }

    private static void IniciarClientes()
    {
      clientes = new List<Cliente>();
      clientes.Add(new Cliente() { Codigo = 1, Nome = "Cliente 0000000000000001", Telefone = "1122-3344" });
      clientes.Add(new Cliente() { Codigo = 2, Nome = "Cliente 0000000000000002", Telefone = "2222-3344" });
      clientes.Add(new Cliente() { Codigo = 3, Nome = "Cliente 0000000000000003", Telefone = "3322-3344" });
    }
  }
}