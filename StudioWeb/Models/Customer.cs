using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StudioWeb.Models
{
    //Заказчик
    public class Customer
    {
        public int CustomerId { get; set; }
        public string FIO { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }

        public ICollection<Product> Products { get; set; }
    }
}