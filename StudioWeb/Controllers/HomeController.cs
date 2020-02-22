using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using StudioWeb.Models;
using System.Data.Entity.Infrastructure;
using System.Data.Entity;
using System.Collections.Specialized;

namespace StudioWeb.Controllers
{
    public class HomeController : Controller
    {
        public static StudioContext db = new StudioContext();
        public static DbQuery<Material> material = db.Materials;
        static int count = db.Products.ToList().Count();
        public static DbQuery<Product> inc = db.Products.Include("Customer").Include("Materials").Include("Price");
        public static string nameMainView;
        static int pageOfSet = 0;
        static DbQuery<Customer> customers = db.Customers;


        public ActionResult Index()
        {
            ViewBag.Count = db.Products.ToList().Count();
            AddData();
            return View();
        }

        public void setParam(string nameMainView)
        {
            HomeController.nameMainView = nameMainView;
        }

        [HttpPost]
        public ActionResult MainForm(int productId)
        {
            SidebarController.id = productId;
            return PartialView(inc.ToList().FirstOrDefault(s => s.ProductId == productId));
        }

        public ActionResult AddForm()
        {
            SidebarController.id = 0;
            int idLast = (int)db.Database.SqlQuery<decimal>("SELECT IDENT_CURRENT('Products') + 1").First();

            ViewBag.Materials = material.Where(s => s.ProductId == null).ToList();
            ViewBag.MaterialsCount = (material.ToList().LastOrDefault() == null) ? 1 : material.ToList().LastOrDefault().MaterialId;
            ViewBag.Count = idLast;

            return PartialView();
        }

        /**
         *CUD
         **/

        public RedirectToRouteResult AddDbTables(Product p, Customer c, Price pr)
        {
            if (!db.Customers.Any(s => s.Email == c.Email || s.PhoneNumber == c.PhoneNumber))
            {
                db.Customers.Add(c);
                db.SaveChanges();
            }

            p.CustomerId = db.Customers.ToList().Find(s => s.Email == c.Email || s.PhoneNumber == c.PhoneNumber).CustomerId;


            db.Products.Add(p);
            db.Prices.Add(pr);

            db.SaveChanges();

            ICollection<Material> m1 = db.Materials.Where(s => s.ProductId == null).ToList();

            foreach (Material m in m1)
            {
                m.ProductId = db.Products.ToList().LastOrDefault().ProductId;
            }
            return SetBdEd(db.Products.ToList().LastOrDefault().ProductId);
        }

        public RedirectToRouteResult EditDbTables(Product p, Customer c, Price pr)
        {
            Product bs = inc.Single(s => s.ProductId == p.ProductId);

            bs.ProductName = p.ProductName;
            bs.PriceCustomer = p.PriceCustomer;
            bs.DateStart = p.DateStart;
            bs.DateEnd = p.DateEnd;
            bs.DateRegister = p.DateRegister;
            bs.CheckPay = p.CheckPay;

            bs.Price.PriceCount = pr.PriceCount;
            bs.Price.PriceMaterial = pr.PriceMaterial;
            bs.Price.PriceWorkInner = pr.PriceWorkInner;
            bs.Price.PriceWorkOuter = pr.PriceWorkOuter;
            bs.Price.Profit = pr.Profit;

            bs.Customer.Email = c.Email;
            bs.Customer.FIO = c.FIO;
            bs.Customer.PhoneNumber = c.PhoneNumber;

            return SetBdEd(p.ProductId);
        }

        public RedirectToRouteResult DeleteDbTables(int id)
        {
            Product p1 = inc.ToList().FirstOrDefault(s => s.ProductId == id);
            Customer c1 = p1.Customer;
            Price pr1 = p1.Price;

            ICollection<Material> m1 = db.Materials.Where(s => s.ProductId == id).ToList();

            foreach (Material m in m1)
            {
                db.Materials.Remove(m);
            }

            db.Prices.Remove(pr1);
            db.Products.Remove(p1);

            db.SaveChanges();

            int cp1 = c1.Products.Count;

            if (cp1 == 0)
            {
                db.Customers.Remove(c1);
            }
            return SetBdEd(0);
        }
        [HttpPost]
        public int AddMaterialsDb(Material m)
        {
            db.Materials.Add(m);
            db.SaveChanges();

            return db.Materials.ToList().Last().MaterialId;
        }
        [HttpPost]
        public void DeleteMaterialsDb(int Id)
        {
            Material m1 = material.ToList().Single(s => s.MaterialId == Id);

            db.Materials.Remove(m1);
            db.SaveChanges();
        }
        [HttpPost]
        public void SaveMaterialsDb(Material m)
        {
            Material m2  = material.ToList().Single(s => s.MaterialId == m.MaterialId); 

            m2.NameMaterial = m.NameMaterial;
            m2.PriceMaterial = m.PriceMaterial;
            m2.CountMaterial = m.CountMaterial;
            m2.Coment = m.Coment;

            db.SaveChanges();
        }
        public static void AddData()
        {
            if(pageOfSet <= count)
            {
            List<Product> products = db.Database.SqlQuery<Product>("SELECT * FROM Products ORDER BY ProductId OFFSET " + pageOfSet.ToString() + " ROWS FETCH NEXT 12 ROWS ONLY").ToList();
                foreach (Product p in products)
                {
                    p.Customer = customers.ToList().FirstOrDefault(s => s.CustomerId == p.CustomerId);
                    if (!SidebarController.cusPod.Any(s => s.ProductId == p.ProductId))
                    {
                        SidebarController.cusPod.Add(p);
                    }
                }
            }
        }

        [HttpPost]
        public RedirectToRouteResult pageCount(bool start)
        {
            if (start)
            {
                pageOfSet += 12;
            }
            AddData();
            return RedirectToAction(nameMainView, "Sidebar");
        }
        private RedirectToRouteResult SetBdEd(int _id)
        {
            db.SaveChanges();

            SidebarController.cusPod.Clear();
            SidebarController.id = _id;
            pageOfSet = 0;

            AddData();

            return RedirectToAction(nameMainView, "Sidebar");
        }
    }
}