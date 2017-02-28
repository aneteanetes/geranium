using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace geranium
{
    public class handler : IHttpHandler
    {
        public bool IsReusable
        {
            get { return true; }
        }

        public void ProcessRequest(HttpContext context)
        {
            var p = context.Request.Params;
            int number = int.Parse(p["n"]);

            context.Response.Write(number * 73);

            context.ApplicationInstance.CompleteRequest();
        }
    }
}