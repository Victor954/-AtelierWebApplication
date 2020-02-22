using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StudioWeb
{
    public class FilterParam
    {
        public string nameProduct { get; set; }
        public int number { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public DateTime DateRegister { get; set; }
        public string CustomerFio { get; set; }
        public int min { get; set; }
        public int max { get; set; }

        public FilterParam()
        {
            min = 500;
            max = 1000000;
            DateTo = DateTime.MaxValue;
            CustomerFio = "";
            nameProduct = "";
        }
    }
}