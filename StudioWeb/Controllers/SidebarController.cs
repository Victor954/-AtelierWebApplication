using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using StudioWeb.Models;

namespace StudioWeb.Controllers
{
    public class SidebarController : Controller
    {
        public static List<Product> cusPod = new List<Product>();
        public static int id = 0;

        public ActionResult ListItems()
        {
            ViewBag.idSelect = id;

            return PartialView(cusPod);
        }

        public ActionResult ListHistory()
        {
            return PartialView(cusPod);
        }

        [HttpPost]
        public ActionResult FilterString(FilterParam p)
        {
            return PartialView(HomeController.nameMainView, cusPod.Where(s => s.ProductName.IndexOf(p.nameProduct ?? "") != -1 && BaseLinq(s, p)).ToList());
        }

        [HttpPost]
        public ActionResult FilterNum(FilterParam p)
        {
            return PartialView(HomeController.nameMainView, cusPod.Where(s => s.ProductId == p.number && BaseLinq(s,p)).ToList());
        }

        private bool BaseLinq(Product s , FilterParam p)
        {
            return s.PriceCustomer >= p.min && s.PriceCustomer <= p.max &&
                                                        s.DateStart >= p.DateFrom && s.DateEnd <= p.DateTo &&
                                                        Reg(s.DateRegister, p.DateRegister) &&
                                                        s.Customer.FIO.IndexOf(p.CustomerFio ?? "") != -1;
        }

        private bool Reg(DateTime s, DateTime data)
        {
            return (data != DateTime.MinValue) ? s == data : true;
        }
    }
}