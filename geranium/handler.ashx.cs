using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace geranium
{
    public class handler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.Write("{\"time\":\"" + DateTime.Now.ToString("HH:mm:ss") + "\"}");
            context.ApplicationInstance.CompleteRequest();
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}