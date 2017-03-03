using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace geranium
{
    /// <summary>
    /// Summary description for handler
    /// </summary>
    public class handler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var query = context.Request.Params;

            if (query.AllKeys.Where(x => x == "integer").Count() > 0)
            {
                var _int = int.Parse(query["integer"]);
                context.Response.Write(_int * 37);
            }
            else
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