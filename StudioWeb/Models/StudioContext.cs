using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace StudioWeb.Models
{
    public class StudioContext : DbContext
    {
        public StudioContext() : base("StudioConnection") { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Material> Materials { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Price> Prices { get; set; }
    }
}