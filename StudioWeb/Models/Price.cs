using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StudioWeb.Models
{
    //Цена
    public class Price
    {
        [Key]
        [ForeignKey("Product")]
        public int PriceId { get; set; }
        public float PriceCount { get; set; }
        public float Profit { get; set; }
        public float PriceMaterial { get; set; }
        public float PriceWorkInner { get; set; }
        public float PriceWorkOuter { get; set; }

        public Product Product { get; set; }
    }
}