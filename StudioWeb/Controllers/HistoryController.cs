using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using StudioWeb.Models;
using System.Data.Entity.Infrastructure;
using System.Threading;

namespace StudioWeb.Controllers
{
    public class HistoryController : Controller
    {
        static StudioContext db = StudioWeb.Controllers.HomeController.db;
        static DbQuery<Product> prob = db.Products.Include("Customer").Include("Price");
        public ActionResult History()
        {
            ViewBag.Count = db.Products.ToList().Count();
            HomeController.AddData();
            return View();
        }
        public ActionResult MainHistory(int id = 1)
        {
            return PartialView(HomeController.inc.ToList().FirstOrDefault(s => s.ProductId == id));

        }
    }
}