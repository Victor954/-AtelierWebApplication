using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StudioWeb.Models
{
    //Материал
    public class Material
    {
        public int MaterialId { get; set; }
        public string NameMaterial { get; set; }
        public int CountMaterial { get; set; }
        public float PriceMaterial { get; set; }
        public string Coment { get; set; }

        public int? ProductId { get; set; }
        public Product Product { get; set; }
    }
}