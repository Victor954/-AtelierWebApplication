using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StudioWeb.Models
{
    //Продукт
    public class Product
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }
        public DateTime DateRegister { get; set; }
        public float PriceCustomer { get; set; }
        public bool CheckPay { get; set; }

        public int? CustomerId { get; set; }
        public Customer Customer { get; set; }

        public ICollection<Material> Materials { get; set; }

        public Price Price { get; set; }
    }
}